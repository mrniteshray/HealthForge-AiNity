package com.niteshray.xapps.healthforge.feature.home.presentation.viewmodel

import android.app.AlarmManager
import android.app.PendingIntent
import android.content.Context
import android.content.Intent
import android.os.Build
import android.util.Log
import androidx.compose.runtime.mutableStateOf
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.google.gson.Gson
import com.google.gson.JsonElement
import com.google.gson.JsonObject
import com.google.gson.annotations.SerializedName
import com.niteshray.xapps.healthforge.core.di.CerebrasApi
import com.niteshray.xapps.healthforge.core.di.ChatRequest
import com.niteshray.xapps.healthforge.core.di.Message
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.launch
import kotlinx.serialization.Serializable
import javax.inject.Inject
import com.niteshray.xapps.healthforge.feature.home.data.models.TaskTemplate
import com.niteshray.xapps.healthforge.feature.home.data.models.DailyTaskRecord
import com.niteshray.xapps.healthforge.feature.home.data.models.TaskWithDailyRecord
import com.niteshray.xapps.healthforge.feature.home.domain.TaskTrackingRepository
import com.niteshray.xapps.healthforge.feature.home.domain.FirestoreTaskSyncService
import com.niteshray.xapps.healthforge.feature.home.presentation.compose.Task
import com.niteshray.xapps.healthforge.feature.home.presentation.compose.TaskCategory
import com.niteshray.xapps.healthforge.feature.home.presentation.compose.TimeBlock
import com.niteshray.xapps.healthforge.feature.home.presentation.compose.Priority
import com.niteshray.xapps.healthforge.feature.home.presentation.compose.toPresentationTask
import com.niteshray.xapps.healthforge.feature.home.presentation.compose.toDataTask
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.firestore.FirebaseFirestore
import dagger.hilt.android.qualifiers.ApplicationContext
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.catch
import kotlinx.coroutines.flow.map
import kotlinx.coroutines.launch
import kotlinx.coroutines.tasks.await
import kotlin.apply
import kotlin.collections.firstOrNull
import kotlin.collections.forEach
import kotlin.collections.isNotEmpty
import kotlin.collections.map
import kotlin.collections.mapIndexedNotNull
import kotlin.jvm.java
import kotlin.jvm.javaClass
import kotlin.text.contains
import kotlin.text.endsWith
import kotlin.text.indexOf
import kotlin.text.isNullOrBlank
import kotlin.text.lastIndexOf
import kotlin.text.lowercase
import kotlin.text.removePrefix
import kotlin.text.removeSuffix
import kotlin.text.split
import kotlin.text.startsWith
import kotlin.text.substring
import kotlin.text.toInt
import kotlin.text.trim
import kotlin.text.trimIndent
import kotlin.text.uppercase

@HiltViewModel
class NewHomeViewModel @Inject constructor(
    private val cerebrasApi: CerebrasApi,
    private val firebaseAuth: FirebaseAuth,
    private val taskTrackingRepository: TaskTrackingRepository,
    private val firestoreSyncService: FirestoreTaskSyncService,
    private val firestore: FirebaseFirestore
) : ViewModel()
{

    companion object {
        const val TAG = "NewHomeViewModel"
    }

    var errorMessage = mutableStateOf<String?>(null)
    var isLoading = mutableStateOf(false)

    private val _isTasksLoading = MutableStateFlow(true)
    val isTasksLoading: StateFlow<Boolean> = _isTasksLoading.asStateFlow()

    private val _tasks = MutableStateFlow<List<Task>>(emptyList())
    val tasks: StateFlow<List<Task>> = _tasks.asStateFlow()

    var generatedTasks = mutableStateOf<List<Task>>(emptyList())

    init {
        loadTasks()
        setupDailyReset()
    }

    private fun loadTasks() {
        viewModelScope.launch {
            _isTasksLoading.value = true
            Log.d(TAG, "Loading tasks from new tracking system")

            try {
                taskTrackingRepository.ensureTodayRecordsExist()
                val today = DailyTaskRecord.getTodayDateString()

                taskTrackingRepository.getTasksForDate(today)
                    .catch { e ->
                        Log.e(TAG, "Failed to load tasks from database", e)
                        errorMessage.value = "Failed to load tasks: ${e.message}"
                        _isTasksLoading.value = false
                    }
                    .map { taskWithRecordList ->
                        taskWithRecordList.map { it.toTask().toPresentationTask() }
                    }
                    .collect { taskList ->
                        Log.d(TAG, "Loaded ${taskList.size} tasks from database")
                        _tasks.value = taskList
                        generatedTasks.value = taskList
                        _isTasksLoading.value = false
                    }

            } catch (e: Exception) {
                Log.e(TAG, "Error in loadTasks", e)
                errorMessage.value = "Failed to load tasks: ${e.message}"
                _isTasksLoading.value = false
            }
        }
    }

    private fun setupDailyReset() {
        viewModelScope.launch {
            try {
                Log.d(TAG, "Setting up daily reset worker")
            } catch (e: Exception) {
                Log.e(TAG, "Failed to setup daily reset", e)
            }
        }
    }

    fun generateTasksFromReport(medicalReport: String, context: Context) {
        viewModelScope.launch {
            isLoading.value = true
            errorMessage.value = null

            Log.d(TAG, "Generating tasks from medical report")

            try {
                val prompt = """
                    Analyze this medical report and create a list of 8 health tasks. Return ONLY a JSON object:
                    {
                        "tasks": [
                            {
                                "title": "Take Medicine Name",
                                "description": "Brief description",
                                "time": "9:00 AM",
                                "category": "MEDICATION|EXERCISE|DIET|MONITORING|LIFESTYLE|GENERAL",
                                "priority": "HIGH|MEDIUM|LOW"
                            }
                        ]
                    }

                    Medical Report:
                    $medicalReport
                """.trimIndent()

                val request = ChatRequest(
                    messages = listOf(
                        Message(
                            role = "system",
                            content = "You are a healthcare assistant. Respond ONLY with valid JSON."
                        ),
                        Message(role = "user", content = prompt)
                    ),
                    temperature = 0.3f
                )

                val response = cerebrasApi.generateContent(request)
                val aiResponse = response.choices.firstOrNull()?.message?.content
                    ?: throw Exception("Empty response from AI service")

                val cleanedResponse = cleanAiResponse(aiResponse)
                val aiGeneratedTasks = parseJsonToTaskTemplates(cleanedResponse)

                if (aiGeneratedTasks.isNotEmpty()) {
                    aiGeneratedTasks.forEach { template ->
                        val templateId = taskTrackingRepository.insertTemplate(template)
                        firestoreSyncService.syncTaskTemplateToFirestore(template.copy(id = templateId.toInt()))
                    }
                    loadTasks()
                } else {
                    val fallbackTasks = createFallbackTasks(medicalReport)
                    if (fallbackTasks.isNotEmpty()) {
                        fallbackTasks.forEach { template ->
                            val templateId = taskTrackingRepository.insertTemplate(template)
                            Log.d(TAG, "Inserted fallback template: ${template.title} with ID: $templateId")
                        }
                        loadTasks()
                    } else {
                        errorMessage.value =
                            "Could not generate tasks from this report. Please try again or add tasks manually."
                    }
                }

            } catch (e: Exception) {
                Log.e(TAG, "Failed to generate tasks", e)
                errorMessage.value = "Failed to analyze report: ${e.message}"
            } finally {
                isLoading.value = false
            }
        }
    }

    fun addTask(task: Task) {
        viewModelScope.launch {
            Log.d(TAG, "Adding new task: ${task.title}")

            try {
                val template = TaskTemplate(
                    title = task.title,
                    description = task.description,
                    timeBlock = task.timeBlock,
                    time = task.time,
                    category = task.category,
                    priority = task.priority,
                    isActive = true,
                    createdAt = System.currentTimeMillis()
                )

                val templateId = taskTrackingRepository.insertTemplate(template)
                Log.d(TAG, "Task template saved with ID: $templateId")

                taskTrackingRepository.ensureTodayRecordsExist()
                firestoreSyncService.syncTaskTemplateToFirestore(template.copy(id = templateId.toInt()))

            } catch (e: Exception) {
                Log.e(TAG, "Failed to add task: ${task.title}", e)
                errorMessage.value = "Failed to add task: ${e.message}"
            }
        }
    }

    fun updateTask(updatedTask: Task) {
        viewModelScope.launch {
            Log.d(TAG, "Updating task: ${updatedTask.title}")

            try {
                val existingTemplate = taskTrackingRepository.getTemplateById(updatedTask.id) ?: return@launch

                val updatedTemplate = existingTemplate.copy(
                    title = updatedTask.title,
                    description = updatedTask.description,
                    timeBlock = updatedTask.timeBlock,
                    time = updatedTask.time,
                    category = updatedTask.category,
                    priority = updatedTask.priority
                )

                taskTrackingRepository.updateTemplate(updatedTemplate)
                firestoreSyncService.syncTaskTemplateToFirestore(updatedTemplate)

            } catch (e: Exception) {
                Log.e(TAG, "Failed to update task: ${updatedTask.title}", e)
                errorMessage.value = "Failed to update task: ${e.message}"
            }
        }
    }

    fun deleteTask(taskId: Int) {
        viewModelScope.launch {
            Log.d(TAG, "Deleting task: $taskId")

            try {
                val template = taskTrackingRepository.getTemplateById(taskId)
                taskTrackingRepository.deleteTemplateById(taskId)
                if (template != null) {
                    firestoreSyncService.deleteTaskTemplateFromFirestore(template)
                }
                errorMessage.value = null
            } catch (e: Exception) {
                Log.e(TAG, "Failed to delete task: $taskId", e)
                errorMessage.value = "Failed to delete task: ${e.message}"
            }
        }
    }

    fun toggleTaskCompletion(taskId: Int, isCompleted: Boolean) {
        viewModelScope.launch {
            Log.d(TAG, "Toggling task completion: $taskId -> $isCompleted")

            try {
                val today = DailyTaskRecord.getTodayDateString()
                if (isCompleted) {
                    taskTrackingRepository.completeTask(taskId, today)
                } else {
                    taskTrackingRepository.uncompleteTask(taskId, today)
                }

                val record = taskTrackingRepository.getRecordByTemplateAndDate(taskId, today)
                record?.let {
                    val template = taskTrackingRepository.getTemplateById(taskId)
                    if (template != null && template.firestoreId.isNullOrBlank()) {
                        firestoreSyncService.syncTaskTemplateToFirestore(template)
                    }
                    firestoreSyncService.syncDailyRecordToFirestore(it)
                }

            } catch (e: Exception) {
                Log.e(TAG, "Failed to toggle task completion: $taskId", e)
                errorMessage.value = "Failed to update task: ${e.message}"
            }
        }
    }

    fun resetTasks() {
        viewModelScope.launch {
            Log.d(TAG, "Resetting all tasks")

            try {
                val today = DailyTaskRecord.getTodayDateString()
                taskTrackingRepository.resetTasksForDate(today)
                errorMessage.value = null
            } catch (e: Exception) {
                Log.e(TAG, "Failed to reset tasks", e)
                errorMessage.value = "Failed to reset tasks: ${e.message}"
            }
        }
    }

    // Filtering helpers
    fun getTasksByCategory(category: TaskCategory) =
        taskTrackingRepository.getTasksByCategoryForDate(category, DailyTaskRecord.getTodayDateString())
            .map { list -> list.map { it.toTask().toPresentationTask() } }

    fun getTasksByTimeBlock(timeBlock: TimeBlock) =
        taskTrackingRepository.getTasksByTimeBlockForDate(timeBlock, DailyTaskRecord.getTodayDateString())
            .map { list -> list.map { it.toTask().toPresentationTask() } }

    fun getTasksByPriority(priority: Priority) =
        taskTrackingRepository.getTasksByPriorityForDate(priority, DailyTaskRecord.getTodayDateString())
            .map { list -> list.map { it.toTask().toPresentationTask() } }

    fun getCompletedTasks() =
        taskTrackingRepository.getTasksByCompletionStatusForDate(true, DailyTaskRecord.getTodayDateString())
            .map { list -> list.map { it.toTask().toPresentationTask() } }

    fun getPendingTasks() =
        taskTrackingRepository.getTasksByCompletionStatusForDate(false, DailyTaskRecord.getTodayDateString())
            .map { list -> list.map { it.toTask().toPresentationTask() } }

    // Utility methods (unchanged)
    private fun cleanAiResponse(response: String): String {
        var cleaned = response.trim()
        if (cleaned.startsWith("```json")) cleaned = cleaned.removePrefix("```json").trim()
        if (cleaned.startsWith("```")) cleaned = cleaned.removePrefix("```").trim()
        if (cleaned.endsWith("```")) cleaned = cleaned.removeSuffix("```").trim()
        val jsonStart = cleaned.indexOf('{')
        val jsonEnd = cleaned.lastIndexOf('}')
        return if (jsonStart != -1 && jsonEnd != -1 && jsonEnd > jsonStart)
            cleaned.substring(jsonStart, jsonEnd + 1)
        else cleaned
    }

    private fun parseJsonToTaskTemplates(jsonString: String): List<TaskTemplate> {
        return try {
            val gson = Gson()
            val jsonObject = gson.fromJson(jsonString, JsonObject::class.java)
            val tasksArray = jsonObject.getAsJsonArray("tasks") ?: return emptyList()
            tasksArray.mapIndexedNotNull { index, taskElement ->
                try {
                    val obj = taskElement.asJsonObject
                    val title = obj["title"]?.asString ?: "Health Task ${index + 1}"
                    val description = obj["description"]?.asString ?: ""
                    val time = obj["time"]?.asString ?: "9:00 AM"
                    val categoryStr = obj["category"]?.asString ?: "LIFESTYLE"
                    val priorityStr = obj["priority"]?.asString ?: "MEDIUM"

                    val category = TaskCategory.values().find { it.name == categoryStr.uppercase() } ?: TaskCategory.LIFESTYLE
                    val priority = Priority.values().find { it.name == priorityStr.uppercase() } ?: Priority.MEDIUM
                    val timeBlock = getTimeBlockFromTime(time)

                    TaskTemplate(
                        title = title,
                        description = description,
                        timeBlock = timeBlock,
                        time = time,
                        category = category,
                        priority = priority,
                        isActive = true,
                        createdAt = System.currentTimeMillis()
                    )
                } catch (e: Exception) {
                    Log.e(TAG, "Failed to parse task", e)
                    null
                }
            }
        } catch (e: Exception) {
            Log.e(TAG, "Failed to parse JSON: ${e.message}")
            emptyList()
        }
    }

    private fun getTimeBlockFromTime(time: String): TimeBlock {
        val hour = try {
            val (h, _) = time.split(":")
            val hourInt = h.toInt()
            when {
                time.contains("AM", true) && hourInt == 12 -> 0
                time.contains("PM", true) && hourInt != 12 -> hourInt + 12
                else -> hourInt
            }
        } catch (_: Exception) {
            9
        }
        return when (hour) {
            in 5..11 -> TimeBlock.MORNING
            in 12..16 -> TimeBlock.AFTERNOON
            in 17..20 -> TimeBlock.EVENING
            else -> TimeBlock.NIGHT
        }
    }

    private fun createFallbackTasks(medicalReport: String): List<TaskTemplate> {
        val report = medicalReport.lowercase()
        val tasks = mutableListOf<TaskTemplate>()

        when {
            report.contains("medicine") -> tasks.add(
                TaskTemplate(
                    title = "Take Prescribed Medication",
                    description = "Follow doctor's medicine schedule",
                    timeBlock = TimeBlock.MORNING,
                    time = "8:00 AM",
                    category = TaskCategory.MEDICATION,
                    priority = Priority.HIGH,
                    isActive = true,
                    createdAt = System.currentTimeMillis(),
                    firestoreId = null
                )
            )

            report.contains("blood pressure") -> tasks.add(
                TaskTemplate(
                    title = "Monitor Blood Pressure",
                    description = "Check BP daily",
                    timeBlock = TimeBlock.MORNING,
                    time = "9:00 AM",
                    category = TaskCategory.MONITORING,
                    priority = Priority.HIGH,
                    isActive = true,
                    createdAt = System.currentTimeMillis(),
                    firestoreId = null
                )
            )

            report.contains("exercise") -> tasks.add(
                TaskTemplate(
                    title = "Daily Exercise",
                    description = "Do light physical activity",
                    timeBlock = TimeBlock.EVENING,
                    time = "6:00 PM",
                    category = TaskCategory.EXERCISE,
                    priority = Priority.MEDIUM,
                    isActive = true,
                    createdAt = System.currentTimeMillis(),
                    firestoreId = null
                )
            )

            report.contains("diet") -> tasks.add(
                TaskTemplate(
                    title = "Follow Dietary Guidelines",
                    description = "Eat balanced meals",
                    timeBlock = TimeBlock.AFTERNOON,
                    time = "12:00 PM",
                    category = TaskCategory.DIET,
                    priority = Priority.MEDIUM,
                    isActive = true,
                    createdAt = System.currentTimeMillis(),
                    firestoreId = null
                )
            )
        }

        // Default fallback task if no keywords matched
        if (tasks.isEmpty()) {
            tasks.add(
                TaskTemplate(
                    title = "Follow Medical Recommendations",
                    description = "Follow general doctor advice",
                    timeBlock = TimeBlock.MORNING,
                    time = "9:00 AM",
                    category = TaskCategory.GENERAL,
                    priority = Priority.MEDIUM,
                    isActive = true,
                    createdAt = System.currentTimeMillis(),
                    firestoreId = null
                )
            )
        }

        return tasks
    }
}
