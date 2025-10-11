package com.niteshray.xapps.healthforge.core.notifications

import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.PendingIntent
import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.media.AudioAttributes
import android.media.RingtoneManager
import android.os.Build
import android.util.Log
import androidx.core.app.NotificationCompat
import androidx.core.app.NotificationManagerCompat
import com.niteshray.xapps.healthforge.MainActivity
import com.niteshray.xapps.healthforge.R

class TaskReminderReceiver : BroadcastReceiver() {

    companion object {
        const val TAG = "TaskReminderReceiver"
        const val CHANNEL_ID = "health_tasks_channel"
    }

    override fun onReceive(context: Context, intent: Intent) {
        Log.d(TAG, "Enhanced TaskReminderReceiver triggered")
        
        val taskId = intent.getIntExtra("TASK_ID", -1)
        val taskTitle = intent.getStringExtra("TASK_TITLE") ?: "Task Reminder"
        val taskDescription = intent.getStringExtra("TASK_DESCRIPTION") ?: ""
        val taskCategory = intent.getStringExtra("TASK_CATEGORY") ?: "GENERAL"
        val taskPriority = intent.getStringExtra("TASK_PRIORITY") ?: "MEDIUM"

        Log.d(TAG, "Enhanced task details - ID: $taskId, Title: '$taskTitle', Category: $taskCategory, Priority: $taskPriority")
        Log.d(TAG, "Description: '$taskDescription'")

        try {
            // Show enhanced notification
            showNotification(context, taskId, taskTitle, taskDescription)
            Log.d(TAG, "Enhanced notification shown successfully")
            
        } catch (e: Exception) {
            Log.e(TAG, "Error in enhanced onReceive", e)
        }
    }

    private fun showNotification(
        context: Context,
        taskId: Int,
        title: String,
        descriptions: String
    ) {
        Log.d(TAG, "Creating enhanced notification for task: $taskId")
        
        try {
            val notificationManager = context.getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager

            // Create notification channel for Android O and above
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                val existingChannel = notificationManager.getNotificationChannel(CHANNEL_ID)
                if (existingChannel == null) {
                    val channel = NotificationChannel(
                        CHANNEL_ID,
                        "🏥 HealthForge Reminders",
                        NotificationManager.IMPORTANCE_HIGH
                    ).apply {
                        description = "Important health task reminders and medication alerts"
                        enableVibration(true)
                        enableLights(true)
                        lightColor = android.graphics.Color.BLUE
                        lockscreenVisibility = android.app.Notification.VISIBILITY_PUBLIC
                        setSound(
                            RingtoneManager.getDefaultUri(RingtoneManager.TYPE_NOTIFICATION),
                            AudioAttributes.Builder()
                                .setUsage(AudioAttributes.USAGE_NOTIFICATION_RINGTONE)
                                .setContentType(AudioAttributes.CONTENT_TYPE_SONIFICATION)
                                .build()
                        )
                    }
                    notificationManager.createNotificationChannel(channel)
                    Log.d(TAG, "Enhanced notification channel created")
                }
            }

            // Check if notifications are enabled
            if (!NotificationManagerCompat.from(context).areNotificationsEnabled()) {
                Log.w(TAG, "Notifications are disabled by user")
                return
            }

            // Get category-specific styling and content
            val categoryInfo = getCategoryNotificationInfo(title, descriptions)

            // Create intent for when notification is tapped
            val notificationIntent = Intent(context, MainActivity::class.java).apply {
                flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TASK
                putExtra("TASK_ID", taskId)
                putExtra("FROM_NOTIFICATION", true)
            }

            val pendingIntent = PendingIntent.getActivity(
                context,
                taskId,
                notificationIntent,
                PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE
            )

            // Create enhanced notification with rich styling
            val notification = NotificationCompat.Builder(context, CHANNEL_ID)
                .setContentTitle("${categoryInfo.emoji} ${categoryInfo.title}")
                .setContentText(categoryInfo.subtitle)
                .setStyle(
                    NotificationCompat.BigTextStyle()
                        .bigText("${categoryInfo.subtitle}\n\n💡 ${categoryInfo.actionHint}")
                        .setBigContentTitle("${categoryInfo.emoji} ${categoryInfo.title}")
                )
                .setSmallIcon(android.R.drawable.ic_dialog_alert)
                .setLargeIcon(createCategoryIcon(context, categoryInfo.color))
                .setPriority(NotificationCompat.PRIORITY_HIGH)
                .setCategory(NotificationCompat.CATEGORY_REMINDER)
                .setAutoCancel(true)
                .setContentIntent(pendingIntent)
                .setColor(categoryInfo.color)
                .setColorized(true)
                .setSound(RingtoneManager.getDefaultUri(RingtoneManager.TYPE_NOTIFICATION))
                .setVibrate(longArrayOf(0, 300, 200, 300, 200, 300))
                .setDefaults(NotificationCompat.DEFAULT_LIGHTS)
                .setTimeoutAfter(30 * 60 * 1000) // Auto-dismiss after 30 minutes
                .setOnlyAlertOnce(false)
                .build()

            notificationManager.notify(taskId, notification)
            Log.d(TAG, "Enhanced notification posted successfully for task: $taskId")
            
        } catch (e: Exception) {
            Log.e(TAG, "Failed to show enhanced notification", e)
        }
    }

    private fun getCategoryNotificationInfo(title: String, description: String): CategoryNotificationInfo {
        return when {
            // Medicine/Medication category
            title.contains("medicine", ignoreCase = true) || 
            title.contains("medication", ignoreCase = true) ||
            title.contains("pill", ignoreCase = true) ||
            title.contains("tablet", ignoreCase = true) ||
            title.contains("take", ignoreCase = true) -> {
                CategoryNotificationInfo(
                    emoji = "💊",
                    title = "Medication Reminder",
                    subtitle = "Time to take your medicine: $title",
                    actionHint = "Tap to mark as taken",
                    color = android.graphics.Color.parseColor("#2196F3")
                )
            }
            
            // Exercise category
            title.contains("exercise", ignoreCase = true) ||
            title.contains("workout", ignoreCase = true) ||
            title.contains("walk", ignoreCase = true) ||
            title.contains("run", ignoreCase = true) ||
            title.contains("gym", ignoreCase = true) -> {
                CategoryNotificationInfo(
                    emoji = "🏃‍♂️",
                    title = "Exercise Time",
                    subtitle = "Let's get moving: $title",
                    actionHint = "Tap to start your workout session",
                    color = android.graphics.Color.parseColor("#4CAF50")
                )
            }
            
            // Diet/Food category
            title.contains("eat", ignoreCase = true) ||
            title.contains("meal", ignoreCase = true) ||
            title.contains("food", ignoreCase = true) ||
            title.contains("drink", ignoreCase = true) ||
            title.contains("water", ignoreCase = true) -> {
                CategoryNotificationInfo(
                    emoji = "🍎",
                    title = "Nutrition Reminder",
                    subtitle = "Time for healthy eating: $title",
                    actionHint = "Tap to log your meal",
                    color = android.graphics.Color.parseColor("#FF9800")
                )
            }
            
            // Monitoring/Checkup category
            title.contains("check", ignoreCase = true) ||
            title.contains("monitor", ignoreCase = true) ||
            title.contains("measure", ignoreCase = true) ||
            title.contains("pressure", ignoreCase = true) ||
            title.contains("sugar", ignoreCase = true) -> {
                CategoryNotificationInfo(
                    emoji = "📊",
                    title = "Health Monitoring",
                    subtitle = "Time for health check: $title",
                    actionHint = "Tap to record your readings",
                    color = android.graphics.Color.parseColor("#9C27B0")
                )
            }
            
            // Sleep/Lifestyle category
            title.contains("sleep", ignoreCase = true) ||
            title.contains("rest", ignoreCase = true) ||
            title.contains("relax", ignoreCase = true) ||
            title.contains("meditation", ignoreCase = true) -> {
                CategoryNotificationInfo(
                    emoji = "😴",
                    title = "Wellness Reminder",
                    subtitle = "Time to focus on wellbeing: $title",
                    actionHint = "Tap to complete this activity",
                    color = android.graphics.Color.parseColor("#00BCD4")
                )
            }
            
            // General/Default category
            else -> {
                CategoryNotificationInfo(
                    emoji = "⚕️",
                    title = "Health Reminder",
                    subtitle = title,
                    actionHint = "Tap to mark as completed",
                    color = android.graphics.Color.parseColor("#607D8B")
                )
            }
        }
    }

    private fun createCategoryIcon(context: Context, color: Int): android.graphics.Bitmap {
        val size = 128
        val bitmap = android.graphics.Bitmap.createBitmap(size, size, android.graphics.Bitmap.Config.ARGB_8888)
        val canvas = android.graphics.Canvas(bitmap)
        
        // Create circular background
        val paint = android.graphics.Paint().apply {
            isAntiAlias = true
            this.color = color
        }
        
        val radius = size / 2f
        canvas.drawCircle(radius, radius, radius, paint)
        
        // Add white medical cross
        val crossPaint = android.graphics.Paint().apply {
            isAntiAlias = true
            this.color = android.graphics.Color.WHITE
        }
        
        val crossWidth = size * 0.15f
        val crossLength = size * 0.6f
        val centerX = size / 2f
        val centerY = size / 2f
        
        // Horizontal bar
        canvas.drawRect(
            centerX - crossLength / 2,
            centerY - crossWidth / 2,
            centerX + crossLength / 2,
            centerY + crossWidth / 2,
            crossPaint
        )
        
        // Vertical bar
        canvas.drawRect(
            centerX - crossWidth / 2,
            centerY - crossLength / 2,
            centerX + crossWidth / 2,
            centerY + crossLength / 2,
            crossPaint
        )
        
        return bitmap
    }

    private data class CategoryNotificationInfo(
        val emoji: String,
        val title: String,
        val subtitle: String,
        val actionHint: String,
        val color: Int
    )
}
