"use client";

import { useState } from "react";
import {
  Upload,
  Pill,
  BarChart3,
  Brain,
  X,
  FileText,
  Image,
  File,
  CheckCircle,
  Plus,
  Calendar,
  AlertCircle,
} from "lucide-react";

export default function DashboardCards() {
  const [activePopup, setActivePopup] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [medications, setMedications] = useState([]);
  const [analyticsData, setAnalyticsData] = useState(null);

  const cards = [
    {
      title: "Upload Report",
      description: "AI-powered analysis",
      subtext: "Upload prescription for AI analysis",
      icon: Upload,
      color: "bg-blue-500",
      onClick: () => setActivePopup("upload"),
    },
    {
      title: "Add Medication",
      description: "Manage your medications",
      subtext: "Track your daily medications",
      icon: Pill,
      color: "bg-green-500",
      onClick: () => setActivePopup("medication"),
    },
    {
      title: "View Analytics",
      description: "Health insights & trends",
      subtext: "Detailed health analytics",
      icon: BarChart3,
      color: "bg-purple-500",
      onClick: () => setActivePopup("analytics"),
    },
    {
      title: "NutriAI Coach",
      description: "Smart Indian Diet Coach",
      subtext: "Get personalized diet plans",
      icon: Brain,
      color: "bg-orange-500",
      onClick: () => (window.location.href = "/nutri-ai"),
    },
  ];

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("File size must be less than 5MB");
        return;
      }
      setSelectedFile(file);
    }
  };

  const handleUploadSubmit = () => {
    if (!selectedFile) {
      alert("Please select a file first");
      return;
    }

    // Simulate AI analysis
    setTimeout(() => {
      alert("AI analysis completed! Your report is being processed.");
      setActivePopup(null);
      setSelectedFile(null);
    }, 2000);
  };

  const addMedication = (medication) => {
    setMedications([...medications, { ...medication, id: Date.now() }]);
    setActivePopup(null);
  };

  const removeMedication = (id) => {
    setMedications(medications.filter((med) => med.id !== id));
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Health Tools</h2>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {cards.map((card, index) => {
          const IconComponent = card.icon;
          return (
            <button
              key={index}
              onClick={card.onClick}
              className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 hover:scale-105 text-left group"
            >
              <div
                className={`inline-flex items-center justify-center p-3 rounded-xl ${card.color} text-white mb-4 group-hover:scale-110 transition-transform duration-300`}
              >
                <IconComponent className="h-6 w-6" />
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {card.title}
              </h3>
              <p className="text-primary font-medium text-sm mb-1">
                {card.description}
              </p>
              <p className="text-gray-500 text-xs">{card.subtext}</p>
            </button>
          );
        })}
      </div>

      {/* Current Medications */}
      {medications.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Pill className="h-5 w-5 text-green-500" />
            Current Medications
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {medications.map((med) => (
              <div
                key={med.id}
                className="border border-gray-200 rounded-lg p-4 flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold text-gray-900">{med.name}</p>
                  <p className="text-sm text-gray-500">{med.dosage}</p>
                  <p className="text-xs text-gray-400">{med.frequency}</p>
                </div>
                <button
                  onClick={() => removeMedication(med.id)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Upload Report Popup */}
      {activePopup === "upload" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Upload className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Upload Medical Report
                  </h3>
                  <p className="text-sm text-gray-500">AI-powered analysis</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setActivePopup(null);
                  setSelectedFile(null);
                }}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="text-center mb-6">
                <div className="mx-auto w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                  <Brain className="h-8 w-8 text-blue-500" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  Upload Prescription for AI Analysis
                </h4>
                <p className="text-sm text-gray-500 mb-4">
                  Supports PDF, JPG, PNG files under 5MB
                </p>
              </div>

              {/* File Upload Area */}
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center mb-6 hover:border-primary transition-colors duration-300">
                <input
                  type="file"
                  id="file-upload"
                  onChange={handleFileUpload}
                  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                  className="hidden"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-sm text-gray-600 mb-2">
                    {selectedFile
                      ? selectedFile.name
                      : "Click to upload or drag and drop"}
                  </p>
                  <p className="text-xs text-gray-500">
                    PDF, JPG, PNG up to 5MB
                  </p>
                </label>
              </div>

              {/* File Icons */}
              <div className="flex justify-center gap-6 mb-6">
                <div className="text-center">
                  <File className="h-8 w-8 text-blue-500 mx-auto mb-1" />
                  <span className="text-xs text-gray-500">PDF</span>
                </div>
                <div className="text-center">
                  <Image className="h-8 w-8 text-green-500 mx-auto mb-1" />
                  <span className="text-xs text-gray-500">JPG/PNG</span>
                </div>
                <div className="text-center">
                  <FileText className="h-8 w-8 text-purple-500 mx-auto mb-1" />
                  <span className="text-xs text-gray-500">DOC</span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleUploadSubmit}
                disabled={!selectedFile}
                className="w-full bg-primary hover:bg-primary/90 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-3 px-4 rounded-lg font-semibold transition-colors duration-300 flex items-center justify-center gap-2"
              >
                <Brain className="h-5 w-5" />
                Start AI Analysis
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Medication Popup */}
      {activePopup === "medication" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Pill className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Add Medication
                  </h3>
                  <p className="text-sm text-gray-500">
                    Track your daily medications
                  </p>
                </div>
              </div>
              <button
                onClick={() => setActivePopup(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            <div className="p-6">
              <MedicationForm onSubmit={addMedication} />
            </div>
          </div>
        </div>
      )}

      {/* Analytics Popup */}
      {activePopup === "analytics" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <BarChart3 className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Health Analytics
                  </h3>
                  <p className="text-sm text-gray-500">
                    Detailed insights & trends
                  </p>
                </div>
              </div>
              <button
                onClick={() => setActivePopup(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            <div className="p-6">
              <AnalyticsDashboard />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Medication Form Component
function MedicationForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    name: "",
    dosage: "",
    frequency: "",
    time: "",
    notes: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.dosage) {
      alert("Please fill in medication name and dosage");
      return;
    }
    onSubmit(formData);
    setFormData({ name: "", dosage: "", frequency: "", time: "", notes: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Medication Name *
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="e.g., Metformin 500mg"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Dosage *
          </label>
          <input
            type="text"
            value={formData.dosage}
            onChange={(e) =>
              setFormData({ ...formData, dosage: e.target.value })
            }
            placeholder="e.g., 1 tablet"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Frequency
          </label>
          <select
            value={formData.frequency}
            onChange={(e) =>
              setFormData({ ...formData, frequency: e.target.value })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
          >
            <option value="">Select frequency</option>
            <option value="Once daily">Once daily</option>
            <option value="Twice daily">Twice daily</option>
            <option value="Three times daily">Three times daily</option>
            <option value="As needed">As needed</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Time
        </label>
        <input
          type="time"
          value={formData.time}
          onChange={(e) => setFormData({ ...formData, time: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Notes
        </label>
        <textarea
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          placeholder="Additional notes..."
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary resize-none"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-primary hover:bg-primary/90 text-white py-3 px-4 rounded-lg font-semibold transition-colors duration-300 flex items-center justify-center gap-2"
      >
        <Plus className="h-5 w-5" />
        Add Medication
      </button>
    </form>
  );
}

// Analytics Dashboard Component
function AnalyticsDashboard() {
  const healthMetrics = [
    {
      name: "Blood Pressure",
      current: "120/80",
      trend: "stable",
      color: "text-green-600",
    },
    {
      name: "Blood Sugar",
      current: "98 mg/dL",
      trend: "improving",
      color: "text-blue-600",
    },
    {
      name: "Weight",
      current: "70 kg",
      trend: "stable",
      color: "text-purple-600",
    },
    {
      name: "Sleep",
      current: "7.5 hrs",
      trend: "improving",
      color: "text-orange-600",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Health Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {healthMetrics.map((metric, index) => (
          <div key={index} className="bg-gray-50 rounded-lg p-4 text-center">
            <p className="text-sm text-gray-600 mb-1">{metric.name}</p>
            <p className="text-lg font-semibold text-gray-900 mb-1">
              {metric.current}
            </p>
            <p className={`text-xs font-medium ${metric.color}`}>
              {metric.trend}
            </p>
          </div>
        ))}
      </div>

      {/* Progress Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-4">
            Medication Adherence
          </h4>
          <div className="space-y-3">
            {[80, 95, 60, 100].map((percent, index) => (
              <div key={index}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-700">Medication {index + 1}</span>
                  <span className="text-gray-500">{percent}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="h-2 rounded-full bg-primary transition-all duration-500"
                    style={{ width: `${percent}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-4">Health Trends</h4>
          <div className="space-y-4">
            {[
              {
                trend: "Exercise Frequency",
                status: "Improving",
                color: "text-green-600",
              },
              {
                trend: "Water Intake",
                status: "Stable",
                color: "text-blue-600",
              },
              {
                trend: "Stress Levels",
                status: "Improving",
                color: "text-orange-600",
              },
              {
                trend: "Energy Levels",
                status: "Declining",
                color: "text-red-600",
              },
            ].map((item, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-sm text-gray-700">{item.trend}</span>
                <span className={`text-sm font-medium ${item.color}`}>
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-blue-50 rounded-lg p-4">
        <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-blue-600" />
          AI Recommendations
        </h4>
        <ul className="space-y-2 text-sm text-gray-700">
          <li>• Consider increasing water intake by 500ml daily</li>
          <li>• Try to maintain consistent sleep schedule</li>
          <li>• Light exercise recommended in the morning</li>
          <li>• Follow up with doctor in 2 weeks</li>
        </ul>
      </div>
    </div>
  );
}
