package com.niteshray.xapps.healthforge

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.Scaffold
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.remember
import androidx.compose.ui.Modifier
import androidx.hilt.lifecycle.viewmodel.compose.hiltViewModel
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import androidx.navigation.NavType
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import androidx.navigation.navArgument
import com.niteshray.xapps.healthforge.feature.Assistant.presentation.AssistantScreen
import com.niteshray.xapps.healthforge.feature.auth.presentation.compose.DoctorSetupScreen
import com.niteshray.xapps.healthforge.feature.auth.presentation.compose.LoginScreen
import com.niteshray.xapps.healthforge.feature.auth.presentation.compose.SignupScreen
import com.niteshray.xapps.healthforge.feature.auth.presentation.compose.UserRole
import com.niteshray.xapps.healthforge.feature.auth.presentation.compose.UserSetupScreen
import com.niteshray.xapps.healthforge.feature.auth.presentation.viewmodel.AuthViewModel
import com.niteshray.xapps.healthforge.feature.home.presentation.compose.HomeScreen
import com.niteshray.xapps.healthforge.ui.theme.HealthForgeTheme
import dagger.hilt.android.AndroidEntryPoint
import okhttp3.Route


@AndroidEntryPoint
class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            HealthForgeTheme {
                    App()
            }
        }
    }
}

@Composable
fun App(){
    val navController = rememberNavController()
    val authViewModel: AuthViewModel = hiltViewModel()

    val authToken by authViewModel.authtoken.collectAsStateWithLifecycle()
    // Check authentication state on app start and navigate accordingly
    val authState = authViewModel.authState

    LaunchedEffect(authToken) {
        if (!authToken.isNullOrBlank()) {
            authViewModel.checkUserRoleAndNavigate()
        }
    }

    LaunchedEffect(authState.isAuthenticated, authState.userRole) {
        if (authState.isAuthenticated && authState.userRole != null) {
            when (authState.userRole) {
                "doctor" -> {
                    navController.navigate(Routes.DoctorDashboard.route) {
                        popUpTo(Routes.Login.route) { inclusive = true }
                    }
                }
                "patient" -> {
                    navController.navigate(Routes.Home.route) {
                        popUpTo(Routes.Login.route) { inclusive = true }
                    }
                }
            }
        }
    }

    val startDestination = Routes.Login.route
    NavHost(navController = navController , startDestination = startDestination){
        composable(Routes.Login.route){
            LoginScreen(
                onLoginSuccess = { userRole ->
                    when (userRole) {
                        UserRole.DOCTOR -> {
                            navController.navigate(Routes.DoctorDashboard.route) {
                                popUpTo(Routes.Login.route) { inclusive = true }
                            }
                        }
                        UserRole.PATIENT -> {
                            navController.navigate(Routes.Home.route) {
                                popUpTo(Routes.Login.route) { inclusive = true }
                            }
                        }
                    }
                },
                onSignUpClick = { userRole ->
                    navController.navigate(Routes.SignUp.route)
                },
                authViewModel = authViewModel
            )
        }

        composable(Routes.SignUp.route){
            SignupScreen(
                onLoginClick = {
                    navController.navigate(Routes.Login.route)
                },
                onPatientSignupSuccess = {
                    navController.navigate(Routes.UserSetup.route)
                },
                onDoctorNavigate = { name, email, password ->
                    // Navigate to DoctorSetup with user data
                    navController.navigate(Routes.DoctorSetup.createRoute(name, email, password))
                },
                authViewModel = authViewModel
            )
        }

        composable(Routes.UserSetup.route){
            UserSetupScreen(
                onProfileComplete = { userHealthInfo ->
                    authViewModel.saveHealthInfo(userHealthInfo)
                },
                authViewModel = authViewModel,
                onNavigateToHome = {
                    navController.navigate(Routes.Home.route) {
                        popUpTo(Routes.UserSetup.route) { inclusive = true }
                    }
                }
            )
        }

        composable(
            route = Routes.DoctorSetup.route,
            arguments = listOf(
                navArgument("name") { type = NavType.StringType },
                navArgument("email") { type = NavType.StringType },
                navArgument("password") { type = NavType.StringType }
            )
        ) { backStackEntry ->
            val name = backStackEntry.arguments?.getString("name") ?: ""
            val email = backStackEntry.arguments?.getString("email") ?: ""
            val password = backStackEntry.arguments?.getString("password") ?: ""

            DoctorSetupScreen(
                userName = name,
                userEmail = email,
                userPassword = password,
                onSetupComplete = {
                    navController.navigate(Routes.DoctorDashboard.route) {
                        popUpTo(Routes.DoctorSetup.route) { inclusive = true }
                    }
                },
                onBackClick = {
                    navController.popBackStack()
                },
                authViewModel = authViewModel
            )
        }

        composable(Routes.Home.route){
            HomeScreen(
                onLogout = {
                    authViewModel.performLogout()
                    navController.navigate(Routes.Login.route) {
                        popUpTo(Routes.Home.route) { inclusive = true }
                        launchSingleTop = true
                    }
                },
                onNavigateToAssistant = {
                    navController.navigate(Routes.Assistant.route)
                }
            )
        }

        composable(Routes.Assistant.route){
            AssistantScreen(
                onNavigateBack = {
                    navController.popBackStack()
                }
            )
        }

    }
}