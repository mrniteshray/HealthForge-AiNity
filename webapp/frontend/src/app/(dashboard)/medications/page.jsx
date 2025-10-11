"use client";

import { useState, useEffect } from 'react';
import { 
  Pill, 
  Plus, 
  Clock, 
  Calendar,
  Bell,
  CheckCircle,
  X,
  Edit3,
  Trash2,
  Utensils,
  Sun,
  Moon,
  Watch,
  AlertCircle,
  History
} from 'lucide-react';

export default function Medication() {
  const [medications, setMedications] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [editingMed, setEditingMed] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  const [newMedication, setNewMedication] = useState({
    name: '',
    dosage: '',
    frequency: 'once',
    time: '',
    period: 'morning',
    withFood: false,
    instructions: '',
    startDate: new Date().toISOString().split('T')[0],
    endDate: ''
  });

  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Load medications from localStorage
  useEffect(() => {
    const savedMeds = localStorage.getItem('medications');
    if (savedMeds) {
      setMedications(JSON.parse(savedMeds));
    }
  }, []);

  const saveMedications = (meds) => {
    setMedications(meds);
    localStorage.setItem('medications', JSON.stringify(meds));
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewMedication(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const addMedication = () => {
    if (!newMedication.name || !newMedication.dosage || !newMedication.time) {
      alert('Please fill in required fields: Name, Dosage, and Time');
      return;
    }

    const medication = {
      id: editingMed ? editingMed.id : Date.now(),
      ...newMedication,
      completed: false,
      history: editingMed ? editingMed.history : []
    };

    let updatedMeds;
    if (editingMed) {
      updatedMeds = medications.map(med => 
        med.id === editingMed.id ? medication : med
      );
    } else {
      updatedMeds = [medication, ...medications];
    }

    saveMedications(updatedMeds);
    resetForm();
  };

  const resetForm = () => {
    setNewMedication({
      name: '',
      dosage: '',
      frequency: 'once',
      time: '',
      period: 'morning',
      withFood: false,
      instructions: '',
      startDate: new Date().toISOString().split('T')[0],
      endDate: ''
    });
    setEditingMed(null);
    setShowAddModal(false);
  };

  const deleteMedication = (id) => {
    if (confirm('Are you sure you want to delete this medication?')) {
      const updatedMeds = medications.filter(med => med.id !== id);
      saveMedications(updatedMeds);
    }
  };

  const toggleMedication = (id) => {
    const updatedMeds = medications.map(med => {
      if (med.id === id) {
        const updatedMed = {
          ...med,
          completed: !med.completed,
          lastTaken: !med.completed ? new Date().toISOString() : med.lastTaken
        };
        
        // Add to history if taken
        if (!med.completed) {
          updatedMed.history = [
            ...(med.history || []),
            {
              date: new Date().toISOString(),
              taken: true
            }
          ];
        }
        
        return updatedMed;
      }
      return med;
    });
    
    saveMedications(updatedMeds);
  };

  const editMedication = (med) => {
    setEditingMed(med);
    setNewMedication({
      name: med.name,
      dosage: med.dosage,
      frequency: med.frequency,
      time: med.time,
      period: med.period,
      withFood: med.withFood,
      instructions: med.instructions,
      startDate: med.startDate,
      endDate: med.endDate
    });
    setShowAddModal(true);
  };

  const getUpcomingMeds = () => {
    const now = currentTime;
    const currentHour = now.getHours();
    const currentMinutes = now.getMinutes();
    
    return medications.filter(med => {
      const [medHour, medMinutes] = med.time.split(':').map(Number);
      const medTime = medHour * 60 + medMinutes;
      const currentTime = currentHour * 60 + currentMinutes;
      
      return !med.completed && medTime >= currentTime - 30 && medTime <= currentTime + 60;
    });
  };

  const getPeriodMeds = (period) => {
    return medications.filter(med => med.period === period);
  };

  const getAdherenceRate = () => {
    const totalMeds = medications.length;
    if (totalMeds === 0) return 0;
    
    const takenMeds = medications.filter(med => med.completed).length;
    return Math.round((takenMeds / totalMeds) * 100);
  };

  const periods = [
    { name: 'morning', label: '🌅 Morning', time: '06:00 - 12:00', icon: Sun },
    { name: 'afternoon', label: '☀️ Afternoon', time: '12:00 - 17:00', icon: Sun },
    { name: 'evening', label: '🌇 Evening', time: '17:00 - 21:00', icon: Moon },
    { name: 'night', label: '🌙 Night', time: '21:00 - 06:00', icon: Moon }
  ];

  const frequencies = [
    { value: 'once', label: 'Once daily' },
    { value: 'twice', label: 'Twice daily' },
    { value: 'thrice', label: 'Three times daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'as_needed', label: 'As needed' }
  ];

  const upcomingMeds = getUpcomingMeds();
  const adherenceRate = getAdherenceRate();

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Medication</h1>
              <p className="text-gray-600 mt-1">Manage your medication schedule and tracking</p>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={() => setShowHistory(true)}
                className="flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <History className="h-4 w-4" />
                History
              </button>
              <button
                onClick={() => setShowAddModal(true)}
                className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
              >
                <Plus className="h-4 w-4" />
                Add Medication
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{medications.length}</div>
              <div className="text-sm text-blue-600">Total Medications</div>
            </div>
            <div className="bg-green-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-green-600">
                {medications.filter(m => m.completed).length}
              </div>
              <div className="text-sm text-green-600">Taken Today</div>
            </div>
            <div className="bg-purple-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">{adherenceRate}%</div>
              <div className="text-sm text-purple-600">Adherence Rate</div>
            </div>
            <div className="bg-orange-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">{upcomingMeds.length}</div>
              <div className="text-sm text-orange-600">Upcoming</div>
            </div>
          </div>
        </div>

        {/* Upcoming Medications */}
        {upcomingMeds.length > 0 && (
          <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <AlertCircle className="h-6 w-6 text-orange-600" />
              <h2 className="text-lg font-semibold text-orange-900">Upcoming Medications</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {upcomingMeds.map(med => (
                <div key={med.id} className="bg-white rounded-lg p-4 border border-orange-200">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-900">{med.name}</h3>
                    <span className="flex items-center gap-1 text-sm text-orange-600">
                      <Clock className="h-4 w-4" />
                      {med.time}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{med.dosage}</p>
                  <button
                    onClick={() => toggleMedication(med.id)}
                    className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition-colors font-medium"
                  >
                    Mark as Taken
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Medication Schedule by Period */}
        <div className="space-y-6">
          {periods.map(period => {
            const periodMeds = getPeriodMeds(period.name);
            const PeriodIcon = period.icon;

            if (periodMeds.length === 0) return null;

            return (
              <div key={period.name} className="bg-white rounded-2xl shadow-sm overflow-hidden">
                {/* Period Header */}
                <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-6 border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <PeriodIcon className="h-6 w-6 text-primary" />
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{period.label}</h3>
                        <p className="text-sm text-gray-500">{period.time}</p>
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">
                      {periodMeds.filter(m => m.completed).length}/{periodMeds.length} taken
                    </div>
                  </div>
                </div>

                {/* Medications List */}
                <div className="p-6">
                  <div className="space-y-4">
                    {periodMeds.map(medication => (
                      <div
                        key={medication.id}
                        className={`flex items-center gap-4 p-4 rounded-lg border transition-all duration-300 ${
                          medication.completed 
                            ? 'bg-green-50 border-green-200' 
                            : 'bg-white border-gray-200 hover:border-primary'
                        }`}
                      >
                        {/* Checkbox */}
                        <button
                          onClick={() => toggleMedication(medication.id)}
                          className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                            medication.completed
                              ? 'bg-primary border-primary text-white'
                              : 'border-gray-300 hover:border-primary'
                          }`}
                        >
                          {medication.completed && <CheckCircle className="h-4 w-4" />}
                        </button>

                        {/* Medication Icon */}
                        <div className="flex-shrink-0 p-2 rounded-lg bg-orange-500 text-white">
                          <Pill className="h-4 w-4" />
                        </div>

                        {/* Medication Details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className={`font-semibold ${
                              medication.completed ? 'text-gray-500 line-through' : 'text-gray-900'
                            }`}>
                              {medication.name}
                            </h4>
                            <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                              {medication.dosage}
                            </span>
                          </div>
                          
                          <div className="flex items-center gap-4 text-sm text-gray-600 flex-wrap">
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {medication.time}
                            </span>
                            <span>{medication.frequency.replace('_', ' ')}</span>
                            {medication.withFood && (
                              <span className="flex items-center gap-1 text-green-600">
                                <Utensils className="h-3 w-3" />
                                With food
                              </span>
                            )}
                            {medication.instructions && (
                              <span className="text-blue-600">💡 {medication.instructions}</span>
                            )}
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => editMedication(medication)}
                            className="p-2 text-gray-400 hover:text-primary transition-colors"
                          >
                            <Edit3 className="h-4 w-4" />
                          </button>
                          <button 
                            onClick={() => deleteMedication(medication.id)}
                            className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
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
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No medications added</h3>
            <p className="text-gray-500 mb-4">Add your first medication to start tracking</p>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-lg font-semibold transition-colors duration-300"
            >
              Add First Medication
            </button>
          </div>
        )}
      </div>

      {/* Add/Edit Medication Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary rounded-lg">
                  <Pill className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {editingMed ? 'Edit Medication' : 'Add Medication'}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {editingMed ? 'Update medication details' : 'Add new medication to schedule'}
                  </p>
                </div>
              </div>
              <button
                onClick={resetForm}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Medication Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={newMedication.name}
                    onChange={handleInputChange}
                    placeholder="e.g., Metformin"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Dosage *
                  </label>
                  <input
                    type="text"
                    name="dosage"
                    value={newMedication.dosage}
                    onChange={handleInputChange}
                    placeholder="e.g., 500mg"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Frequency
                </label>
                <select
                  name="frequency"
                  value={newMedication.frequency}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                >
                  {frequencies.map(freq => (
                    <option key={freq.value} value={freq.value}>
                      {freq.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Time *
                  </label>
                  <input
                    type="time"
                    name="time"
                    value={newMedication.time}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Period
                  </label>
                  <select
                    name="period"
                    value={newMedication.period}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  >
                    <option value="morning">Morning</option>
                    <option value="afternoon">Afternoon</option>
                    <option value="evening">Evening</option>
                    <option value="night">Night</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Start Date
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    value={newMedication.startDate}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    End Date
                  </label>
                  <input
                    type="date"
                    name="endDate"
                    value={newMedication.endDate}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="withFood"
                  name="withFood"
                  checked={newMedication.withFood}
                  onChange={handleInputChange}
                  className="rounded border-gray-300 text-primary focus:ring-primary"
                />
                <label htmlFor="withFood" className="text-sm text-gray-700">
                  Take with food
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Special Instructions
                </label>
                <textarea
                  name="instructions"
                  value={newMedication.instructions}
                  onChange={handleInputChange}
                  placeholder="Any special instructions..."
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary resize-none"
                />
              </div>

              <button
                onClick={addMedication}
                className="w-full bg-primary hover:bg-primary/90 text-white py-3 px-4 rounded-lg font-semibold transition-colors duration-300"
              >
                {editingMed ? 'Update Medication' : 'Add Medication'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* History Modal */}
      {showHistory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <History className="h-6 w-6 text-primary" />
                <h3 className="text-lg font-semibold text-gray-900">Medication History</h3>
              </div>
              <button
                onClick={() => setShowHistory(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            <div className="p-6">
              {medications.filter(med => med.history && med.history.length > 0).length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <History className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No medication history yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {medications.map(med => 
                    med.history && med.history.length > 0 && (
                      <div key={med.id} className="border border-gray-200 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-900 mb-3">{med.name} - {med.dosage}</h4>
                        <div className="space-y-2">
                          {med.history.slice(-10).reverse().map((entry, index) => (
                            <div key={index} className="flex items-center justify-between text-sm">
                              <span className="text-gray-600">
                                {new Date(entry.date).toLocaleDateString()} at{' '}
                                {new Date(entry.date).toLocaleTimeString()}
                              </span>
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                entry.taken 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-red-100 text-red-800'
                              }`}>
                                {entry.taken ? 'Taken' : 'Missed'}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}