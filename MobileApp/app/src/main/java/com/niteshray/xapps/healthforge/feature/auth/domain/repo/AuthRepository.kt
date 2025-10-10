package com.niteshray.xapps.healthforge.feature.auth.domain.repo


import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.firestore.FirebaseFirestore
import com.niteshray.xapps.healthforge.feature.auth.data.Authentication
import com.niteshray.xapps.healthforge.feature.auth.domain.model.AuthResponse
import com.niteshray.xapps.healthforge.feature.auth.domain.model.RegisterUser
import com.niteshray.xapps.healthforge.feature.auth.domain.model.loginUser
import com.niteshray.xapps.healthforge.feature.auth.presentation.compose.UserBasicHealthInfo
import kotlinx.coroutines.tasks.await
import retrofit2.Response
import javax.inject.Inject
import javax.inject.Singleton

@Singleton
class AuthRepository @Inject constructor(
    private val authApiService: Authentication,
    private val firebasAuth : FirebaseAuth,
    private val firestore: FirebaseFirestore
) {
    suspend fun registerUser(registerUser: RegisterUser): Response<AuthResponse> {
        return authApiService.RegisterUser(registerUser)
    }


    suspend fun saveHealthInfo(userId : String,info : UserBasicHealthInfo) : Response<Authentication.ApiResponse>{
        val body = mapOf(
            "userId" to userId,
            "age" to info.age,
            "weight" to info.weight,
            "height" to info.height,
            "gender" to info.gender.name,
            "activityLevel" to info.activityLevel.name,
            "medicalCondition" to info.medicalCondition.name,
            "allergies" to info.allergies,
            "emergencyContact" to info.emergencyContact,
            "bloodType" to info.bloodType.name
        )

        return authApiService.updateHealthInfo(body)
    }

    suspend fun loginUser(loginUser: loginUser): Response<AuthResponse> {
        return authApiService.loginUser(loginUser)
    }

    suspend fun SignUpWithEmail(email: String, pass: String, displayName: String): Boolean {
        return try {
            val result = firebasAuth.createUserWithEmailAndPassword(email, pass).await()
            val user = result.user
            if (user != null) {
                val profileUpdates = com.google.firebase.auth.userProfileChangeRequest {
                    this.displayName = displayName
                }
                user.updateProfile(profileUpdates).await()
                
                // Store user role in Firestore for patients
                val userData = mapOf(
                    "uid" to user.uid,
                    "email" to email,
                    "name" to displayName,
                    "role" to "patient",
                    "createdAt" to System.currentTimeMillis()
                )
                firestore.collection("users").document(user.uid).set(userData).await()
                true
            } else {
                false
            }
        } catch (e: Exception) {
            false
        }
    }

    suspend fun SignInWithEmail(email: String, pass: String): Boolean {
        return try {
            firebasAuth.signInWithEmailAndPassword(email, pass).await()
            true
        } catch (e: Exception) {
            false
        }
    }
    
    suspend fun getUserRole(uid: String): String? {
        return try {
            val document = firestore.collection("users").document(uid).get().await()
            document.getString("role")
        } catch (e: Exception) {
            null
        }
    }
}
