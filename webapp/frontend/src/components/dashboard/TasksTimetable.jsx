"use client";

import { useState } from 'react';
import { 
  CheckCircle, 
  Clock, 
  Plus, 
  Trash2, 
  Bell,
  Pill,
  Utensils,
  Activity,
  Heart,
  Sun,
  Moon
} from 'lucide-react';

export default function MedicationSchedule() {
  const [medications, setMedications] = useState([
    {
      id: 1,
      name: "Metformin 500mg",
      type: "Diabetes",
      time: "08:00",
      condition: "After breakfast",
      completed: false,
      icon: Pill,
      color: "bg-orange-500"
    },
    {
      id: 2,
      name: "BP Medicine",
      type: "Blood Pressure",
      time: "08:30",
      condition: "Empty stomach",
      completed: false,
      icon: Heart,
      color: "bg-red-500"
    },
    {
      id: 3,
      name: "Vitamin D",
      type: "Supplement",
      time: "13:00",
      condition: "With lunch",
      completed: false,
      icon: Pill,
      color: "bg-orange-500"
    },
    {
      id: 4,
      name: "Evening BP Check",
      type: "Monitoring",
      time: "19:00",
      condition: "Before dinner",
      completed: false,
      icon: Activity,
      color: "bg-blue-500"
    },
    {
      id: 5,
      name: "Sleep Medicine",
      type: "Sleep Aid",
      time: "22:00",
      condition: "Before bed",
      completed: false,
      icon: Pill,
      color: "bg-orange-500"
    }
  ]);

  const [showAddMedication, setShowAddMedication] = useState(false);
  const [newMedication, setNewMedication] = useState({
    name: '',
    type: 'medicine',
    time: '',
    condition: ''
  });

  const toggleMedicationCompletion = (medId) => {
    setMedications(medications.map(med => 
      med.id === medId ? { ...med, completed: !med.completed } : med
    ));
  };

  const addNewMedication = () => {
    if (!newMedication.name || !newMedication.time) {
      alert('Please fill in medication name and time');
      return;
    }

    const medication = {
      id: Date.now(),
      ...newMedication,
      completed: false,
      icon: getIconForType(newMedication.type),
      color: getColorForType(newMedication.type)
    };

    setMedications([...medications, medication]);
    setNewMedication({ name: '', type: 'medicine', time: '', condition: '' });
    setShowAddMedication(false);
  };

  const deleteMedication = (medId) => {
    setMedications(medications.filter(med => med.id !== medId));
  };

  const getIconForType = (type) => {
    const icons = {
      medicine: Pill,
      supplement: Pill,
      monitoring: Activity,
      injection: Activity,
      other: Pill
    };
    return icons[type] || Pill;
  };

  const getColorForType = (type) => {
    const colors = {
      medicine: 'bg-orange-500',
      supplement: 'bg-green-500',
      monitoring: 'bg-blue-500',
      injection: 'bg-red-500',
      other: 'bg-gray-500'
    };
    return colors[type] || 'bg-gray-500';
  };

  const getTimePeriod = (time) => {
    const hour = parseInt(time.split(':')[0]);
    if (hour >= 5 && hour < 12) return { label: '🌅 Morning', color: 'bg-yellow-100 text-yellow-800' };
    if (hour >= 12 && hour < 17) return { label: '☀️ Afternoon', color: 'bg-orange-100 text-orange-800' };
    if (hour >= 17 && hour < 21) return { label: '🌇 Evening', color: 'bg-purple-100 text-purple-800' };
    return { label: '🌙 Night', color: 'bg-blue-100 text-blue-800' };
  };

  const completedMeds = medications.filter(med => med.completed).length;
  const totalMeds = medications.length;

  // Sort medications by time
  const sortedMedications = [...medications].sort((a, b) => a.time.localeCompare(b.time));

  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Medication Schedule</h2>
          <p className="text-gray-600">Your daily medication and health monitoring timetable</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-4 text-center">
            <div className="text-2xl font-bold text-primary">
              {completedMeds}/{totalMeds}
            </div>
            <div className="text-sm text-gray-600">Taken Today</div>
          </div>
          <button
            onClick={() => setShowAddMedication(true)}
            className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-4 py-3 rounded-lg font-semibold transition-colors duration-300"
          >
            <Plus className="h-5 w-5" />
            Add Medication
          </button>
        </div>
      </div>

      {/* Medication Timeline */}
      <div className="space-y-4">
        {sortedMedications.map((medication) => {
          const IconComponent = medication.icon;
          const timePeriod = getTimePeriod(medication.time);
          
          return (
            <div
              key={medication.id}
              className={`bg-white rounded-xl shadow-lg border-2 p-4 transition-all duration-300 ${
                medication.completed 
                  ? 'border-green-200 bg-green-50' 
                  : 'border-gray-100 hover:border-primary hover:shadow-xl'
              }`}
            >
              <div className="flex items-start justify-between">
                {/* Left Section - Time */}
                <div className="flex items-start gap-4 flex-1">
                  <div className="text-center">
                    <div className="bg-primary text-white rounded-lg p-3 min-w-16">
                      <div className="font-bold text-lg">{medication.time}</div>
                      <div className="text-xs opacity-90">24H</div>
                    </div>
                    <div className={`text-xs px-2 py-1 rounded-full mt-2 ${timePeriod.color}`}>
                      {timePeriod.label}
                    </div>
                  </div>

                  {/* Medication Details */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`p-2 rounded-lg ${medication.color} text-white`}>
                        <IconComponent className="h-4 w-4" />
                      </div>
                      <div>
                        <h3 className={`font-semibold ${
                          medication.completed ? 'text-gray-500 line-through' : 'text-gray-900'
                        }`}>
                          {medication.name}
                        </h3>
                        <p className="text-sm text-gray-500 capitalize">{medication.type}</p>
                      </div>
                    </div>

                    {medication.condition && (
                      <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 rounded-lg px-3 py-2">
                        <Utensils className="h-4 w-4" />
                        <span>{medication.condition}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Section - Actions */}
                <div className="flex flex-col items-end gap-2">
                  <button
                    onClick={() => toggleMedicationCompletion(medication.id)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 ${
                      medication.completed
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-700 hover:bg-primary hover:text-white'
                    }`}
                  >
                    <CheckCircle className="h-4 w-4" />
                    <span className="text-sm font-medium">
                      {medication.completed ? 'Taken' : 'Mark Taken'}
                    </span>
                  </button>

                  <div className="flex items-center gap-1">
                    <button className="p-2 text-gray-400 hover:text-primary transition-colors">
                      <Bell className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={() => deleteMedication(medication.id)}
                      className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {medications.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Pill className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No medications scheduled</h3>
          <p className="text-gray-500 mb-4">Add your first medication to get started</p>
          <button
            onClick={() => setShowAddMedication(true)}
            className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-lg font-semibold transition-colors duration-300"
          >
            Add First Medication
          </button>
        </div>
      )}

      {/* Add Medication Popup */}
      {showAddMedication && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary rounded-lg">
                  <Pill className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Add Medication</h3>
                  <p className="text-sm text-gray-500">Schedule your medication or health check</p>
                </div>
              </div>
              <button
                onClick={() => setShowAddMedication(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Medication/Check Name *
                </label>
                <input
                  type="text"
                  value={newMedication.name}
                  onChange={(e) => setNewMedication({ ...newMedication, name: e.target.value })}
                  placeholder="e.g., Metformin 500mg or BP Check"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type
                </label>
                <select
                  value={newMedication.type}
                  onChange={(e) => setNewMedication({ ...newMedication, type: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                >
                  <option value="medicine">Medicine</option>
                  <option value="supplement">Supplement</option>
                  <option value="monitoring">Health Check</option>
                  <option value="injection">Injection</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Time *
                </label>
                <input
                  type="time"
                  value={newMedication.time}
                  onChange={(e) => setNewMedication({ ...newMedication, time: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Condition/Instructions
                </label>
                <select
                  value={newMedication.condition}
                  onChange={(e) => setNewMedication({ ...newMedication, condition: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                >
                  <option value="">Select condition</option>
                  <option value="Empty stomach">Empty stomach</option>
                  <option value="After breakfast">After breakfast</option>
                  <option value="With lunch">With lunch</option>
                  <option value="After lunch">After lunch</option>
                  <option value="Before dinner">Before dinner</option>
                  <option value="After dinner">After dinner</option>
                  <option value="With food">With food</option>
                  <option value="Before bed">Before bed</option>
                </select>
              </div>

              <button
                onClick={addNewMedication}
                className="w-full bg-primary hover:bg-primary/90 text-white py-3 px-4 rounded-lg font-semibold transition-colors duration-300"
              >
                Add to Schedule
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}