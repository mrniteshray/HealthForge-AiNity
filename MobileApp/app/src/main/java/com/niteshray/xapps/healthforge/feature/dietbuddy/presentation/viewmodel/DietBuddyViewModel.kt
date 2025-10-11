package com.niteshray.xapps.healthforge.feature.dietbuddy.presentation.viewmodel

import android.net.Uri
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.niteshray.xapps.healthforge.feature.dietbuddy.data.api.DietBuddyApiService
import com.niteshray.xapps.healthforge.feature.dietbuddy.data.models.*
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch
import javax.inject.Inject

@HiltViewModel
class DietBuddyViewModel @Inject constructor(
    private val apiService: DietBuddyApiService
) : ViewModel() {

    private val _uiState = MutableStateFlow(DietBuddyUiState())
    val uiState: StateFlow<DietBuddyUiState> = _uiState.asStateFlow()

    fun uploadReportAndGeneratePlan(uri: Uri, reportName: String) {
        viewModelScope.launch {
            try {
                _uiState.value = _uiState.value.copy(
                    isLoading = true,
                    error = null
                )

                // Add the report to the list
                val newReport = MedicalReport(
                    id = System.currentTimeMillis().toString(),
                    name = reportName,
                    uri = uri,
                    isUploaded = true
                )

                val updatedReports = _uiState.value.uploadedReports + newReport
                _uiState.value = _uiState.value.copy(
                    uploadedReports = updatedReports
                )

                // Create a simple user input with minimal required data
                val simpleUserInput = UserDietInput(
                    name = "User",
                    age = 30,
                    gender = Gender.OTHER,
                    height = 170f,
                    weight = 70f,
                    targetWeight = 65f,
                    activityLevel = ActivityLevel.MODERATE,
                    dietType = DietType.VEGETARIAN
                )

                // Generate diet plan using the API
                val result = apiService.generatePersonalizedDietPlan(
                    userInput = simpleUserInput,
                    medicalReports = updatedReports
                )

                result.onSuccess { dietPlan ->
                    _uiState.value = _uiState.value.copy(
                        isLoading = false,
                        generatedPlan = dietPlan,
                        error = null
                    )
                }.onFailure { exception ->
                    _uiState.value = _uiState.value.copy(
                        isLoading = false,
                        error = exception.message ?: "Failed to generate diet plan"
                    )
                }

            } catch (e: Exception) {
                _uiState.value = _uiState.value.copy(
                    isLoading = false,
                    error = e.message ?: "An error occurred"
                )
            }
        }
    }

    fun removeMedicalReport(reportId: String) {
        _uiState.value = _uiState.value.copy(
            uploadedReports = _uiState.value.uploadedReports.filter { it.id != reportId }
        )
    }

    fun clearError() {
        _uiState.value = _uiState.value.copy(error = null)
    }

    fun regeneratePlan() {
        val currentReports = _uiState.value.uploadedReports
        if (currentReports.isNotEmpty()) {
            // Use the first report to regenerate
            val firstReport = currentReports.first()
            firstReport.uri?.let { uri ->
                uploadReportAndGeneratePlan(uri, firstReport.name)
            }
        }
    }
}