package com.niteshray.xapps.healthforge.feature.careconnect.presentation.viewmodel

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.niteshray.xapps.healthforge.feature.careconnect.data.models.*
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.*
import kotlinx.coroutines.launch
import javax.inject.Inject

data class CareConnectUiState(
    val isLoading: Boolean = false,
    val guardians: List<Guardian> = emptyList(),
    val guardees: List<Guardee> = emptyList(),
    val pendingRequests: List<GuardianRequest> = emptyList(),
    val stats: CareConnectStats = CareConnectStats(),
    val errorMessage: String? = null,
    val showAddGuardianDialog: Boolean = false,
    val selectedTab: CareConnectTab = CareConnectTab.OVERVIEW
)

enum class CareConnectTab(val displayName: String) {
    OVERVIEW("Overview"),
    GUARDIANS("My Guardians"),
    GUARDEES("I'm Guarding"),
    REQUESTS("Requests")
}

@HiltViewModel
class CareConnectViewModel @Inject constructor(
    // TODO: Inject repository when implemented
) : ViewModel() {

    private val _uiState = MutableStateFlow(CareConnectUiState())
    val uiState: StateFlow<CareConnectUiState> = _uiState.asStateFlow()

    init {
        loadData()
    }

    private fun loadData() {
        viewModelScope.launch {
            _uiState.value = _uiState.value.copy(isLoading = true, errorMessage = null)
            
            try {
                // TODO: Replace with actual API calls
                loadMockData()
                _uiState.value = _uiState.value.copy(isLoading = false)
            } catch (e: Exception) {
                _uiState.value = _uiState.value.copy(
                    isLoading = false,
                    errorMessage = e.message ?: "Failed to load data"
                )
            }
        }
    }

    private fun loadMockData() {
        // Mock data for demonstration
        val mockGuardians = listOf(
            Guardian(
                id = "1",
                name = "Dr. Sarah Johnson",
                email = "sarah.johnson@gmail.com",
                phoneNumber = "+1234567890",
                relationship = GuardianRelationship.DOCTOR,
                permissions = listOf(
                    PermissionType.VIEW_HEALTH_SUMMARY,
                    PermissionType.VIEW_MEDICAL_REPORTS,
                    PermissionType.RECEIVE_ALERTS
                ),
                lastActiveAt = System.currentTimeMillis() - 3600000 // 1 hour ago
            ),
            Guardian(
                id = "2",
                name = "Mom (Linda)",
                email = "linda.doe@gmail.com",
                phoneNumber = "+1234567891",
                relationship = GuardianRelationship.PARENT,
                permissions = listOf(
                    PermissionType.VIEW_HEALTH_SUMMARY,
                    PermissionType.VIEW_TASK_PROGRESS,
                    PermissionType.RECEIVE_ALERTS
                ),
                lastActiveAt = System.currentTimeMillis() - 1800000 // 30 minutes ago
            )
        )

        val mockGuardees = listOf(
            Guardee(
                id = "1",
                name = "John Doe Jr.",
                email = "john.jr@gmail.com",
                phoneNumber = "+1234567892",
                relationship = GuardianRelationship.CHILD,
                permissionsGranted = listOf(
                    PermissionType.VIEW_TASK_PROGRESS,
                    PermissionType.MANAGE_TASKS
                ),
                lastActiveAt = System.currentTimeMillis() - 7200000 // 2 hours ago
            )
        )

        val mockStats = CareConnectStats(
            totalGuardians = mockGuardians.size,
            totalGuardees = mockGuardees.size,
            activeConnections = mockGuardians.size + mockGuardees.size,
            pendingRequests = 1,
            recentActivity = listOf(
                ActivityItem(
                    id = "1",
                    type = ActivityType.GUARDIAN_ADDED,
                    title = "New Guardian Added",
                    description = "Dr. Sarah Johnson was added as your guardian",
                    timestamp = System.currentTimeMillis() - 86400000 // 1 day ago
                ),
                ActivityItem(
                    id = "2",
                    type = ActivityType.DATA_ACCESSED,
                    title = "Health Data Accessed",
                    description = "Linda viewed your health summary",
                    timestamp = System.currentTimeMillis() - 1800000 // 30 minutes ago
                )
            )
        )

        _uiState.value = _uiState.value.copy(
            guardians = mockGuardians,
            guardees = mockGuardees,
            stats = mockStats
        )
    }

    fun selectTab(tab: CareConnectTab) {
        _uiState.value = _uiState.value.copy(selectedTab = tab)
    }

    fun showAddGuardianDialog() {
        _uiState.value = _uiState.value.copy(showAddGuardianDialog = true)
    }

    fun hideAddGuardianDialog() {
        _uiState.value = _uiState.value.copy(showAddGuardianDialog = false)
    }

    fun addGuardian(
        email: String,
        relationship: GuardianRelationship,
        permissions: List<PermissionType>,
        message: String
    ) {
        viewModelScope.launch {
            try {
                // TODO: Implement API call to send guardian request
                
                // For now, just close the dialog
                hideAddGuardianDialog()
                
                // TODO: Show success message or update UI accordingly
            } catch (e: Exception) {
                _uiState.value = _uiState.value.copy(
                    errorMessage = e.message ?: "Failed to send guardian request"
                )
            }
        }
    }

    fun removeGuardian(guardianId: String) {
        viewModelScope.launch {
            try {
                // TODO: Implement API call to remove guardian
                
                val updatedGuardians = _uiState.value.guardians.filter { it.id != guardianId }
                _uiState.value = _uiState.value.copy(guardians = updatedGuardians)
            } catch (e: Exception) {
                _uiState.value = _uiState.value.copy(
                    errorMessage = e.message ?: "Failed to remove guardian"
                )
            }
        }
    }

    fun removeGuardee(guardeeId: String) {
        viewModelScope.launch {
            try {
                // TODO: Implement API call to remove guardee
                
                val updatedGuardees = _uiState.value.guardees.filter { it.id != guardeeId }
                _uiState.value = _uiState.value.copy(guardees = updatedGuardees)
            } catch (e: Exception) {
                _uiState.value = _uiState.value.copy(
                    errorMessage = e.message ?: "Failed to remove guardee"
                )
            }
        }
    }

    fun clearError() {
        _uiState.value = _uiState.value.copy(errorMessage = null)
    }

    fun refreshData() {
        loadData()
    }
}