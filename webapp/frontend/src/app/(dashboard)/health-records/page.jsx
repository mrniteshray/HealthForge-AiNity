"use client";

import { useState, useEffect } from 'react';
import { 
  Upload, 
  FileText, 
  Image, 
  File, 
  Download, 
  Eye, 
  Trash2, 
  Filter,
  Search,
  Calendar,
  User,
  Plus,
  X,
  CheckCircle
} from 'lucide-react';

export default function HealthRecords() {
  const [records, setRecords] = useState([]);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [viewRecord, setViewRecord] = useState(null);

  // Sample initial records
  useEffect(() => {
    const savedRecords = localStorage.getItem('healthRecords');
    if (savedRecords) {
      setRecords(JSON.parse(savedRecords));
    } else {
      // Sample data
      const sampleRecords = [
        {
          id: 1,
          name: 'Blood Test Report',
          type: 'lab',
          date: '2024-01-15',
          fileType: 'pdf',
          size: '2.4 MB',
          uploadedAt: '2024-01-15T10:30:00Z'
        },
        {
          id: 2,
          name: 'X-Ray Chest',
          type: 'scan',
          date: '2024-01-10',
          fileType: 'image',
          size: '4.1 MB',
          uploadedAt: '2024-01-10T14:20:00Z'
        },
        {
          id: 3,
          name: 'Doctor Prescription',
          type: 'prescription',
          date: '2024-01-08',
          fileType: 'pdf',
          size: '1.2 MB',
          uploadedAt: '2024-01-08T09:15:00Z'
        }
      ];
      setRecords(sampleRecords);
      localStorage.setItem('healthRecords', JSON.stringify(sampleRecords));
    }
  }, []);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }
      setSelectedFile(file);
    }
  };

  const uploadFile = async () => {
    if (!selectedFile) {
      alert('Please select a file first');
      return;
    }

    setUploading(true);

    // Simulate upload process
    setTimeout(() => {
      const newRecord = {
        id: Date.now(),
        name: selectedFile.name,
        type: getFileType(selectedFile.name),
        date: new Date().toISOString().split('T')[0],
        fileType: getFileExtension(selectedFile.name),
        size: formatFileSize(selectedFile.size),
        uploadedAt: new Date().toISOString()
      };

      const updatedRecords = [newRecord, ...records];
      setRecords(updatedRecords);
      localStorage.setItem('healthRecords', JSON.stringify(updatedRecords));

      setSelectedFile(null);
      setShowUploadModal(false);
      setUploading(false);
    }, 1500);
  };

  const deleteRecord = (recordId) => {
    const updatedRecords = records.filter(record => record.id !== recordId);
    setRecords(updatedRecords);
    localStorage.setItem('healthRecords', JSON.stringify(updatedRecords));
  };

  const getFileType = (fileName) => {
    if (fileName.toLowerCase().includes('blood') || fileName.toLowerCase().includes('test')) return 'lab';
    if (fileName.toLowerCase().includes('xray') || fileName.toLowerCase().includes('scan')) return 'scan';
    if (fileName.toLowerCase().includes('prescription')) return 'prescription';
    if (fileName.toLowerCase().includes('report')) return 'report';
    return 'other';
  };

  const getFileExtension = (fileName) => {
    return fileName.split('.').pop().toLowerCase();
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (fileType) => {
    switch (fileType) {
      case 'pdf': return <FileText className="h-6 w-6 text-red-500" />;
      case 'jpg':
      case 'jpeg':
      case 'png': return <Image className="h-6 w-6 text-green-500" />;
      default: return <File className="h-6 w-6 text-blue-500" />;
    }
  };

  const getTypeColor = (type) => {
    const colors = {
      lab: 'bg-blue-100 text-blue-800',
      scan: 'bg-green-100 text-green-800',
      prescription: 'bg-purple-100 text-purple-800',
      report: 'bg-orange-100 text-orange-800',
      other: 'bg-gray-100 text-gray-800'
    };
    return colors[type] || colors.other;
  };

  const filteredRecords = records.filter(record => {
    const matchesSearch = record.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || record.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const recordStats = {
    total: records.length,
    lab: records.filter(r => r.type === 'lab').length,
    scan: records.filter(r => r.type === 'scan').length,
    prescription: records.filter(r => r.type === 'prescription').length
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Health Records</h1>
              <p className="text-gray-600 mt-1">Manage your medical reports and documents</p>
            </div>
            
            <button
              onClick={() => setShowUploadModal(true)}
              className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors w-full lg:w-auto justify-center"
            >
              <Upload className="h-4 w-4" />
              Upload Record
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{recordStats.total}</div>
              <div className="text-sm text-blue-600">Total Records</div>
            </div>
            <div className="bg-green-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{recordStats.lab}</div>
              <div className="text-sm text-green-600">Lab Reports</div>
            </div>
            <div className="bg-purple-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">{recordStats.scan}</div>
              <div className="text-sm text-purple-600">Scans</div>
            </div>
            <div className="bg-orange-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">{recordStats.prescription}</div>
              <div className="text-sm text-orange-600">Prescriptions</div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search records..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                />
              </div>
            </div>

            {/* Filter */}
            <div className="w-full md:w-48">
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary appearance-none"
                >
                  <option value="all">All Types</option>
                  <option value="lab">Lab Reports</option>
                  <option value="scan">Scans</option>
                  <option value="prescription">Prescriptions</option>
                  <option value="report">Reports</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Records Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecords.map((record) => (
            <div
              key={record.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300"
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    {getFileIcon(record.fileType)}
                    <div>
                      <h3 className="font-semibold text-gray-900 line-clamp-1">
                        {record.name}
                      </h3>
                      <span className={`inline-block px-2 py-1 text-xs rounded-full ${getTypeColor(record.type)}`}>
                        {record.type}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(record.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    <span>{record.fileType.toUpperCase()} • {record.size}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-100">
                  <button
                    onClick={() => setViewRecord(record)}
                    className="flex items-center gap-1 text-primary hover:text-primary/80 transition-colors flex-1 justify-center py-2 rounded-lg hover:bg-primary/5"
                  >
                    <Eye className="h-4 w-4" />
                    <span className="text-sm font-medium">View</span>
                  </button>
                  
                  <button className="flex items-center gap-1 text-green-600 hover:text-green-700 transition-colors flex-1 justify-center py-2 rounded-lg hover:bg-green-50">
                    <Download className="h-4 w-4" />
                    <span className="text-sm font-medium">Download</span>
                  </button>
                  
                  <button
                    onClick={() => deleteRecord(record.id)}
                    className="flex items-center gap-1 text-red-600 hover:text-red-700 transition-colors flex-1 justify-center py-2 rounded-lg hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="text-sm font-medium">Delete</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredRecords.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {records.length === 0 ? 'No health records yet' : 'No records found'}
            </h3>
            <p className="text-gray-500 mb-4">
              {records.length === 0 
                ? 'Upload your first medical report to get started' 
                : 'Try adjusting your search or filter'
              }
            </p>
            {records.length === 0 && (
              <button
                onClick={() => setShowUploadModal(true)}
                className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-lg font-semibold transition-colors duration-300"
              >
                Upload First Record
              </button>
            )}
          </div>
        )}
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary rounded-lg">
                  <Upload className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Upload Health Record</h3>
                  <p className="text-sm text-gray-500">Add a new medical document</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setShowUploadModal(false);
                  setSelectedFile(null);
                }}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            <div className="p-6">
              {/* File Upload Area */}
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center mb-6 hover:border-primary transition-colors duration-300">
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
                    {selectedFile ? selectedFile.name : 'Click to upload or drag and drop'}
                  </p>
                  <p className="text-xs text-gray-500">
                    PDF, JPG, PNG, DOC up to 5MB
                  </p>
                </label>
              </div>

              {/* File Info */}
              {selectedFile && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-medium text-green-800">File selected</p>
                      <p className="text-sm text-green-600">
                        {selectedFile.name} • {formatFileSize(selectedFile.size)}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <button
                onClick={uploadFile}
                disabled={!selectedFile || uploading}
                className="w-full bg-primary hover:bg-primary/90 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-3 px-4 rounded-lg font-semibold transition-colors duration-300 flex items-center justify-center gap-2"
              >
                {uploading ? (
                  <>
                    <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="h-5 w-5" />
                    Upload Record
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Record Modal */}
      {viewRecord && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center gap-3">
                {getFileIcon(viewRecord.fileType)}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{viewRecord.name}</h3>
                  <p className="text-sm text-gray-500">
                    Uploaded on {new Date(viewRecord.uploadedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">
                  <Download className="h-4 w-4" />
                  Download
                </button>
                <button
                  onClick={() => setViewRecord(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="h-5 w-5 text-gray-500" />
                </button>
              </div>
            </div>

            <div className="p-6 max-h-[60vh] overflow-y-auto">
              {/* File Preview Placeholder */}
              <div className="bg-gray-50 rounded-lg p-12 text-center">
                <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h4 className="font-semibold text-gray-900 mb-2">Document Preview</h4>
                <p className="text-gray-600 text-sm">
                  This is a preview of your {viewRecord.fileType.toUpperCase()} file
                </p>
                <div className="mt-4 p-4 bg-white rounded-lg border border-gray-200">
                  <div className="space-y-2 text-sm text-gray-600 text-left">
                    <p><strong>File Name:</strong> {viewRecord.name}</p>
                    <p><strong>Type:</strong> {viewRecord.type}</p>
                    <p><strong>Date:</strong> {new Date(viewRecord.date).toLocaleDateString()}</p>
                    <p><strong>Size:</strong> {viewRecord.size}</p>
                    <p><strong>Format:</strong> {viewRecord.fileType.toUpperCase()}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}