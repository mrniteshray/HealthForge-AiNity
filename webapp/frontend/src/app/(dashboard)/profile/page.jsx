"use client";

import { useState, useEffect, useRef } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Edit3,
  Save,
  X,
  Camera,
  CheckCircle,
  Weight,
  Ruler,
  Activity,
  Droplets,
  ArrowLeft
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const fileInputRef = useRef(null);
  const router = useRouter();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    dateOfBirth: '',
    age: '',
    weight: '',
    height: '',
    gender: '',
    activityLevel: '',
    medicalCondition: '',
    allergies: '',
    emergencyContact: '',
    bloodGroup: ''
  });

  useEffect(() => {
    loadProfileData();
  }, []);

  const loadProfileData = () => {
    const savedProfile = localStorage.getItem('healthProfile');
    const savedImage = localStorage.getItem('profileImage');
    
    if (savedProfile) {
      setFormData(JSON.parse(savedProfile));
    }
    
    if (savedImage) {
      setProfileImage(savedImage);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/') && file.size <= 5 * 1024 * 1024) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageDataUrl = e.target.result;
        setProfileImage(imageDataUrl);
        localStorage.setItem('profileImage', imageDataUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setIsLoading(true);
    localStorage.setItem('healthProfile', JSON.stringify(formData));
    
    setTimeout(() => {
      setIsEditing(false);
      setIsLoading(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 500);
  };

  const handleBack = () => {
    router.back();
  };

  const fields = [
    {
      section: 'Personal Info',
      icon: User,
      items: [
        { name: 'fullName', label: 'Full Name', type: 'text', icon: User },
        { name: 'email', label: 'Email', type: 'email', icon: Mail },
        { name: 'phone', label: 'Phone', type: 'tel', icon: Phone },
        { name: 'dateOfBirth', label: 'Date of Birth', type: 'date', icon: Calendar },
        { name: 'age', label: 'Age', type: 'number', icon: Calendar },
        { name: 'gender', label: 'Gender', type: 'select', icon: User, options: ['', 'male', 'female', 'other'] },
        { name: 'address', label: 'Address', type: 'textarea', icon: MapPin }
      ]
    },
    {
      section: 'Health Info',
      icon: Activity,
      items: [
        { name: 'weight', label: 'Weight (kg)', type: 'number', icon: Weight },
        { name: 'height', label: 'Height (cm)', type: 'number', icon: Ruler },
        { name: 'activityLevel', label: 'Activity Level', type: 'select', icon: Activity, 
          options: ['', 'sedentary', 'light', 'moderate', 'active', 'very-active'] },
        { name: 'bloodGroup', label: 'Blood Group', type: 'select', icon: Droplets,
          options: ['', 'A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'] },
        { name: 'medicalCondition', label: 'Medical Conditions', type: 'textarea', icon: Activity },
        { name: 'allergies', label: 'Allergies', type: 'textarea', icon: Activity },
        { name: 'emergencyContact', label: 'Emergency Contact', type: 'tel', icon: Phone }
      ]
    }
  ];

  const renderField = (field) => {
    const value = formData[field.name];
    
    if (!isEditing) {
      return (
        <div className="flex justify-between items-start py-3 border-b border-gray-100">
          <div className="flex items-start gap-3 flex-1">
            <field.icon className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {field.label}
              </label>
              <p className="text-gray-900">
                {value || (field.type === 'textarea' ? 'None' : 'Not provided')}
              </p>
            </div>
          </div>
        </div>
      );
    }

    if (field.type === 'textarea') {
      return (
        <div className="py-3 border-b border-gray-100">
          <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
            <field.icon className="h-4 w-4 mr-2" />
            {field.label}
          </label>
          <textarea
            name={field.name}
            value={value}
            onChange={handleInputChange}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary resize-none"
            placeholder={`Enter ${field.label.toLowerCase()}`}
          />
        </div>
      );
    }

    if (field.type === 'select') {
      return (
        <div className="py-3 border-b border-gray-100">
          <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
            <field.icon className="h-4 w-4 mr-2" />
            {field.label}
          </label>
          <select
            name={field.name}
            value={value}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
          >
            {field.options.map(option => (
              <option key={option} value={option}>
                {option === '' ? `Select ${field.label.toLowerCase()}` : 
                 option === 'sedentary' ? 'Sedentary' :
                 option === 'light' ? 'Light Activity' :
                 option === 'moderate' ? 'Moderate Activity' :
                 option === 'active' ? 'Active' :
                 option === 'very-active' ? 'Very Active' : option}
              </option>
            ))}
          </select>
        </div>
      );
    }

    return (
      <div className="py-3 border-b border-gray-100">
        <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
          <field.icon className="h-4 w-4 mr-2" />
          {field.label}
        </label>
        <input
          type={field.type}
          name={field.name}
          value={value}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
          placeholder={`Enter ${field.label.toLowerCase()}`}
          min={field.type === 'number' ? '1' : undefined}
          max={field.type === 'number' ? field.name === 'age' ? '120' : '300' : undefined}
        />
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Success Message */}
      {saveSuccess && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-in slide-in-from-right">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            <span>Profile updated successfully!</span>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto p-4">
        {/* Header */}
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back</span>
            </button>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
              <p className="text-gray-600 mt-1">Manage your personal and health information</p>
            </div>
            
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors w-full sm:w-auto justify-center"
              >
                <Edit3 className="h-4 w-4" />
                Edit Profile
              </button>
            ) : (
              <div className="flex gap-2 w-full sm:w-auto">
                <button
                  onClick={handleSave}
                  disabled={isLoading}
                  className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 flex-1 sm:flex-none justify-center"
                >
                  {isLoading ? (
                    <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                  ) : (
                    <Save className="h-4 w-4" />
                  )}
                  {isLoading ? 'Saving...' : 'Save'}
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="flex items-center gap-2 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors flex-1 sm:flex-none justify-center"
                >
                  <X className="h-4 w-4" />
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-6">
              {/* Profile Image */}
              <div className="text-center mb-6">
                <div className="relative inline-block">
                  <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mx-auto mb-4 overflow-hidden">
                    {profileImage ? (
                      <img 
                        src={profileImage} 
                        alt="Profile" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="h-12 w-12 text-white" />
                    )}
                  </div>
                  {isEditing && (
                    <>
                      <button 
                        onClick={() => fileInputRef.current?.click()}
                        className="absolute bottom-2 right-2 p-2 bg-white rounded-full shadow-lg hover:shadow-xl transition-all"
                      >
                        <Camera className="h-4 w-4 text-gray-600" />
                      </button>
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageUpload}
                        accept="image/*"
                        className="hidden"
                      />
                    </>
                  )}
                </div>
                <h2 className="text-xl font-bold text-gray-900">
                  {formData.fullName || 'Your Name'}
                </h2>
                <p className="text-gray-600 text-sm mt-1">
                  {formData.email || 'your.email@example.com'}
                </p>
              </div>

              {/* Quick Stats */}
              <div className="space-y-4">
                {formData.weight && formData.height && (
                  <div className="text-center p-4 bg-blue-50 rounded-xl">
                    <p className="text-2xl font-bold text-gray-900">
                      {((formData.weight / ((formData.height / 100) ** 2))).toFixed(1)}
                    </p>
                    <p className="text-sm text-gray-600">BMI</p>
                  </div>
                )}
                
                <div className="grid grid-cols-2 gap-3">
                  {formData.age && (
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <p className="font-bold text-gray-900">{formData.age}</p>
                      <p className="text-xs text-gray-600">Age</p>
                    </div>
                  )}
                  {formData.bloodGroup && (
                    <div className="text-center p-3 bg-orange-50 rounded-lg">
                      <p className="font-bold text-gray-900">{formData.bloodGroup}</p>
                      <p className="text-xs text-gray-600">Blood</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Form Sections */}
          <div className="lg:col-span-2 space-y-6">
            {fields.map((section, index) => {
              const SectionIcon = section.icon;
              return (
                <div key={index} className="bg-white rounded-2xl shadow-sm">
                  <div className="flex items-center gap-3 p-6 border-b border-gray-100">
                    <SectionIcon className="h-6 w-6 text-primary" />
                    <h3 className="text-lg font-semibold text-gray-900">
                      {section.section}
                    </h3>
                  </div>
                  
                  <div className="p-6 space-y-1">
                    {section.items.map((field, fieldIndex) => (
                      <div key={fieldIndex}>
                        {renderField(field)}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}