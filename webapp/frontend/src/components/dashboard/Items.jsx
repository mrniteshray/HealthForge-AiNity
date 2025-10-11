import { CheckCircle, Calendar, Pill, Flame, TrendingUp } from 'lucide-react';

export default function CompactDashboardItems() {
  const quickStats = [
    {
      title: "Health Score",
      value: "85%",
      change: "+5%",
      icon: TrendingUp,
      color: "text-green-600"
    },
    {
      title: "Task Completion",
      value: "2/10",
      change: "+20%",
      icon: CheckCircle,
      color: "text-blue-600"
    },
    {
      title: "Medication",
      value: "5/7",
      change: "+71%",
      icon: Pill,
      color: "text-purple-600"
    },
    {
      title: "Current Streak",
      value: "12 days",
      change: "+2 days",
      icon: Flame,
      color: "text-orange-600"
    }
  ];

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Today's Overview</h2>
      
      {/* Compact Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {quickStats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-center justify-between mb-2">
                <IconComponent className={`h-5 w-5 ${stat.color}`} />
                <span className="text-xs font-semibold text-green-600">
                  {stat.change}
                </span>
              </div>
              <p className="text-lg font-bold text-gray-900 mb-1">
                {stat.value}
              </p>
              <p className="text-xs text-gray-500">
                {stat.title}
              </p>
            </div>
          );
        })}
      </div>

      {/* Progress Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Daily Progress */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle className="h-5 w-5 text-primary" />
            <h3 className="font-semibold text-gray-900">Daily Goals</h3>
          </div>
          <div className="space-y-3">
            {[
              { name: "Water", progress: 80, current: "8/10 glasses" },
              { name: "Steps", progress: 65, current: "6,500/10,000" },
              { name: "Exercise", progress: 40, current: "20/30 mins" }
            ].map((goal, index) => (
              <div key={index}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-700">{goal.name}</span>
                  <span className="text-gray-500">{goal.current}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="h-2 rounded-full bg-primary transition-all duration-500"
                    style={{ width: `${goal.progress}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Appointments */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="h-5 w-5 text-primary" />
            <h3 className="font-semibold text-gray-900">Upcoming</h3>
          </div>
          <div className="space-y-3">
            {[
              { time: "10:00 AM", title: "Doctor Appointment", type: "medical" },
              { time: "2:30 PM", title: "Medication Reminder", type: "medication" },
              { time: "6:00 PM", title: "Therapy Session", type: "therapy" }
            ].map((appointment, index) => (
              <div key={index} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                <div className={`w-2 h-2 rounded-full ${
                  appointment.type === 'medical' ? 'bg-blue-500' :
                  appointment.type === 'medication' ? 'bg-purple-500' : 'bg-green-500'
                }`}></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{appointment.title}</p>
                  <p className="text-xs text-gray-500">{appointment.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}