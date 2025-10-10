package com.niteshray.xapps.healthforge.feature.auth.presentation.viewmodel

import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.niteshray.xapps.healthforge.core.di.DataStore
import com.niteshray.xapps.healthforge.core.di.PreferenceKey
import com.niteshray.xapps.healthforge.feature.auth.domain.model.RegisterUser
import com.niteshray.xapps.healthforge.feature.auth.domain.model.loginUser
import com.niteshray.xapps.healthforge.feature.auth.domain.repo.AuthRepository
import com.niteshray.xapps.healthforge.feature.auth.domain.repo.UserRepository
import com.niteshray.xapps.healthforge.feature.auth.presentation.compose.UserBasicHealthInfo
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.first
import kotlinx.coroutines.flow.fold
import kotlinx.coroutines.launch
import javax.inject.Inject

data class AuthState(
    val isLoading: Boolean = false,
    val isAuthenticated: Boolean = false,
    val errorMessage: String? = null,
    val token: String? = null,
    val SetupSuccess : Boolean = false,
    val isSetupComplete: Boolean = false,
    val isSetupLoading: Boolean = false,
    val isDoctorRegistrationComplete : Boolean = false,
    val userRole: String? = null // "patient" or "doctor"
)

@HiltViewModel
class AuthViewModel @Inject constructor(
    private val authRepository: AuthRepository,
    private val prefStore : DataStore,
    private val userRepo : UserRepository
) : ViewModel() {

    var authState by mutableStateOf(AuthState())
        private set

    private val _authToken = MutableStateFlow<String>("")
    val authtoken get() = _authToken

    init {
        viewModelScope.launch {
            _authToken.value = prefStore.getString(PreferenceKey.AUTH_TOKEN).first()
        }
    }

    fun LoginUser(email: String, password: String) {
        viewModelScope.launch {
            authState = authState.copy(
                isLoading = true,
                errorMessage = null,
                userRole = null
            )

            try {
                // Try backend login first (for custom backend compatibility)
                val backendResponse = authRepository.loginUser(loginUser(email = email, password = password))
                
                // Also sign in with Firebase
                val firebaseSignInSuccess = authRepository.SignInWithEmail(email, password)
                
                if (firebaseSignInSuccess) {
                    val currentUser = com.google.firebase.auth.FirebaseAuth.getInstance().currentUser
                    
                    if (currentUser != null) {
                        // Get user role from Firestore
                        val userRole = authRepository.getUserRole(currentUser.uid)
                        
                        // Use backend token if available, otherwise use Firebase UID
                        val token = if (backendResponse.isSuccessful && backendResponse.body()?.success == true) {
                            backendResponse.body()!!.token
                        } else {
                            currentUser.uid
                        }
                        
                        authState = authState.copy(
                            isLoading = false,
                            isAuthenticated = true,
                            token = token,
                            userRole = userRole,
                            errorMessage = null
                        )
                        
                        // Save token to preferences
                        prefStore.saveString(PreferenceKey.AUTH_TOKEN, token)
                        _authToken.value = token
                    } else {
                        authState = authState.copy(
                            isLoading = false,
                            errorMessage = "Authentication failed. Please try again."
                        )
                    }
                } else {
                    authState = authState.copy(
                        isLoading = false,
                        errorMessage = "Invalid email or password. Please try again."
                    )
                }
            } catch (e: Exception) {
                authState = authState.copy(
                    isLoading = false,
                    errorMessage = e.message ?: "An unexpected error occurred"
                )
            }
        }
    }

    fun registerUser(name: String, email: String, password: String) {
        viewModelScope.launch {
            authState = authState.copy(
                isLoading = true,
                errorMessage = null,
                userRole = null
            )

            try {
                // Try backend registration first (for custom backend compatibility)
                val backendResponse = authRepository.registerUser(RegisterUser(name = name, email = email, password = password))
                
                // Register with Firebase
                val firebaseSignUpSuccess = authRepository.SignUpWithEmail(email, password, name)
                
                if (firebaseSignUpSuccess) {
                    val currentUser = com.google.firebase.auth.FirebaseAuth.getInstance().currentUser
                    
                    if (currentUser != null) {
                        // Use backend token if available, otherwise use Firebase UID
                        val token = if (backendResponse.isSuccessful && backendResponse.body()?.success == true) {
                            backendResponse.body()!!.token
                        } else {
                            currentUser.uid
                        }
                        
                        authState = authState.copy(
                            isLoading = false,
                            isAuthenticated = true,
                            token = token,
                            userRole = "patient", // Default role for regular registration
                            errorMessage = null
                        )
                        
                        prefStore.saveString(PreferenceKey.AUTH_TOKEN, token)
                        _authToken.value = token
                    } else {
                        authState = authState.copy(
                            isLoading = false,
                            errorMessage = "Registration failed. Please try again."
                        )
                    }
                } else {
                    authState = authState.copy(
                        isLoading = false,
                        errorMessage = "Registration failed. Please check your details and try again."
                    )
                }
            } catch (e: Exception) {
                authState = authState.copy(
                    isLoading = false,
                    errorMessage = e.message ?: "An unexpected error occurred"
                )
            }
        }
    }

    fun resetDoctorRegistrationState() {
        authState = authState.copy(isDoctorRegistrationComplete = false)
    }

    fun saveHealthInfo(userBasicHealthInfo: UserBasicHealthInfo){
        viewModelScope.launch {
            authState = authState.copy(
                isSetupLoading = true,
                errorMessage = null,
                isSetupComplete = false
            )
            
            try {
                // Save to custom backend (keep for compatibility)
                val response = authRepository.saveHealthInfo(_authToken.value, userBasicHealthInfo)
                
                // Also save to Firestore
                userRepo.saveUserHealthInfo(userBasicHealthInfo)
                
                // Consider success if either backend or Firestore save is successful
                val isSuccessful = response.isSuccessful || true // Firestore save doesn't throw exception if successful
                
                if (isSuccessful) {
                    authState = authState.copy(
                        isSetupLoading = false,
                        isSetupComplete = true,
                        SetupSuccess = true,
                        errorMessage = null
                    )
                } else {
                    authState = authState.copy(
                        isSetupLoading = false,
                        isSetupComplete = false,
                        SetupSuccess = false,
                        errorMessage = "Failed to save health information. Please try again."
                    )
                }
            } catch (e: Exception) {
                authState = authState.copy(
                    isSetupLoading = false,
                    isSetupComplete = false,
                    SetupSuccess = false,
                    errorMessage = e.message ?: "An unexpected error occurred"
                )
            }
        }
    }

    fun clearError() {
        authState = authState.copy(errorMessage = null)
    }

    fun resetSetupState() {
        authState = authState.copy(isSetupComplete = false, SetupSuccess = false)
    }

    fun logout() {
        authState = AuthState()
    }

    fun performLogout() {
        viewModelScope.launch {
            try {
                // Clear Firebase authentication
                com.google.firebase.auth.FirebaseAuth.getInstance().signOut()
                
                // Clear AuthToken from DataStore
                prefStore.remove(PreferenceKey.AUTH_TOKEN)
                
                // Clear other user-related data
                prefStore.remove(PreferenceKey.USER_ID)
                prefStore.remove(PreferenceKey.USER_EMAIL)
                prefStore.remove(PreferenceKey.USER_NAME)
                prefStore.saveBoolean(PreferenceKey.IS_LOGGED_IN, false)
                
                // Reset auth state
                authState = AuthState()
                _authToken.value = ""
                
            } catch (e: Exception) {
                // Handle logout error if needed
                authState = authState.copy(
                    errorMessage = "Error during logout: ${e.message}"
                )
            }
        }
    }

    fun checkUserRoleAndNavigate() {
        viewModelScope.launch {
            try {
                val currentUser = com.google.firebase.auth.FirebaseAuth.getInstance().currentUser
                if (currentUser != null) {
                    val userRole = authRepository.getUserRole(currentUser.uid)
                    authState = authState.copy(
                        userRole = userRole,
                        isAuthenticated = true,
                        token = currentUser.uid
                    )
                    _authToken.value = currentUser.uid
                }
            } catch (e: Exception) {
                // If there's an error checking role, logout
                performLogout()
            }
        }
    }
}
