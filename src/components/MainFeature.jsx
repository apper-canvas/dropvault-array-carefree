import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { toast } from 'react-toastify';
import { getIcon } from '../utils/iconUtils';
import { format } from 'date-fns';

const MainFeature = () => {
  // Icons
  const UploadCloudIcon = getIcon('upload-cloud');
  const FileIcon = getIcon('file');
  const ImageIcon = getIcon('image');
  const FileTextIcon = getIcon('file-text');
  const FileSpreadsheetIcon = getIcon('file-spreadsheet');
  const FilePresentationIcon = getIcon('file-presentation');
  const FileArchiveIcon = getIcon('archive');
  const FileVideoIcon = getIcon('video');
  const FileAudioIcon = getIcon('file-audio');
  const FileXIcon = getIcon('file-x');
  const LoaderIcon = getIcon('loader');
  const CheckCircleIcon = getIcon('check-circle');
  const AlertCircleIcon = getIcon('alert-circle');
  const XIcon = getIcon('x');
  const PauseIcon = getIcon('pause');
  const PlayIcon = getIcon('play');
  const FolderIcon = getIcon('folder');
  const ClockIcon = getIcon('clock');
  const DownloadIcon = getIcon('download');
  const ShareIcon = getIcon('share');
  
  // States
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState({});
  const [uploadStatus, setUploadStatus] = useState({});
  const [fileActivities, setFileActivities] = useState({});
  const fileInputRef = useRef(null);
  
  // Drag and drop handlers
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  
  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };
  
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) {
      setIsDragging(true);
    }
  };
  
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };
  
  // File input handler
  const handleFileInputChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  };
  
  // Process files
  const handleFiles = (fileList) => {
    const newFiles = Array.from(fileList).map(file => ({
      id: `file-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      file,
      name: file.name,
      size: file.size,
      type: file.type,
      uploadedAt: new Date()
    }));
    
    setFiles(prevFiles => [...prevFiles, ...newFiles]);
    
    // Record the upload start activity for each file
    newFiles.forEach(fileObj => {
      const initialActivity = {
        id: `activity-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        type: 'upload-start',
        timestamp: new Date(),
        message: 'File upload started',
        details: `Started uploading ${fileObj.name} (${formatFileSize(fileObj.size)})`,
        icon: 'upload-cloud'
      };
      
      setFileActivities(prev => ({
        ...prev,
        [fileObj.id]: [initialActivity]
      }));
    });
    
    // Initialize upload for each file
    newFiles.forEach(fileObj => {
      simulateUpload(fileObj.id);
    });
  };
  
  // Simulate file upload with progress
  const simulateUpload = (fileId) => {
    setUploadStatus(prev => ({ ...prev, [fileId]: 'uploading' }));
    setUploadProgress(prev => ({ ...prev, [fileId]: 0 }));
    
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        const currentProgress = prev[fileId] || 0;
        const newProgress = Math.min(currentProgress + Math.random() * 10, 100);
        
        if (newProgress >= 100) {
          clearInterval(interval);

          // Simulate some random failures for demo purposes (10% chance)
          const success = Math.random() > 0.1;

          setTimeout(() => {
            if (success) {
              // Record completion activity
              const activityType = 'upload-complete';
              const activityMessage = 'File upload completed';
              const activityDetails = `Successfully uploaded ${files.find(f => f.id === fileId)?.name}`;
              const activityIcon = 'check-circle';
              
              setFileActivities(prev => {
                const fileActivity = prev[fileId] || [];
                return {
                  ...prev,
                  [fileId]: [...fileActivity, {
                    id: `activity-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                    type: activityType,
                    timestamp: new Date(),
                    message: activityMessage,
                    details: activityDetails,
                    icon: activityIcon
                  }]
                };
              });
              
              setUploadStatus(prevStatus => ({
                ...prevStatus,
                [fileId]: 'completed'
              }));
            } else {
              // Record failure activity
              const activityType = 'upload-fail';
              const activityMessage = 'File upload failed';
              const activityDetails = `Failed to upload ${files.find(f => f.id === fileId)?.name}. Please try again.`;
              const activityIcon = 'alert-circle';
              
              setFileActivities(prev => {
                const fileActivity = prev[fileId] || [];
                return {
                  ...prev,
                  [fileId]: [...fileActivity, {
                    id: `activity-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                    type: activityType,
                    timestamp: new Date(),
                    message: activityMessage,
                    details: activityDetails,
                    icon: activityIcon
                  }]
                };
              });
              
              setUploadStatus(prevStatus => ({
                ...prevStatus,
                [fileId]: 'failed'
              }));
              
              toast.error('File upload failed. Please try again.');
            }
          }, 500);
        }
        
        return { ...prev, [fileId]: newProgress };
      });
      
      // Record progress activity at 25%, 50%, and 75% milestones
      setUploadProgress(prev => {
        const currentProgress = prev[fileId] || 0;
        const newProgress = Math.min(currentProgress + Math.random() * 10, 100);
        
        // Record milestone activities
        if (Math.floor(currentProgress / 25) < Math.floor(newProgress / 25)) {
          const milestone = Math.floor(newProgress / 25) * 25;
          recordProgressMilestone(fileId, milestone);
        }
        
        if (newProgress >= 100) {
          clearInterval(interval);
        }
        
        return { ...prev, [fileId]: newProgress };
      });
    }, 300);
  };
  
  // Pause or resume upload
  const togglePauseUpload = (fileId) => {
    setUploadStatus(prev => {
      const newStatus = prev[fileId] === 'paused' ? 'uploading' : 'paused';
      
      // Record pause/resume activity
      setFileActivities(prevActivities => {
        const fileActivity = prevActivities[fileId] || [];
        return {
          ...prevActivities,
          [fileId]: [...fileActivity, {
            id: `activity-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            type: newStatus === 'paused' ? 'upload-pause' : 'upload-resume',
            timestamp: new Date(),
            message: newStatus === 'paused' ? 'Upload paused' : 'Upload resumed',
            details: `${newStatus === 'paused' ? 'Paused' : 'Resumed'} uploading ${files.find(f => f.id === fileId)?.name}`,
            icon: newStatus === 'paused' ? 'pause' : 'play'
          }]
        };
      });
      
      if (newStatus === 'paused') {
        toast.info('Upload paused');
      } else {
        toast.info('Upload resumed');
        // Re-simulate upload if resuming
        if (uploadProgress[fileId] < 100) {
          simulateUpload(fileId);
        }
      }
      
      return { ...prev, [fileId]: newStatus };
    });
  };
  
  // Cancel upload and remove file
  const cancelUpload = (fileId) => {
    // Record file removal activity
    setFileActivities(prevActivities => {
      const fileActivity = prevActivities[fileId] || [];
      const removedFile = files.find(f => f.id === fileId);
      const activityCopy = [...fileActivity, {
        id: `activity-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        type: 'file-removed',
        timestamp: new Date(),
        message: 'File removed',
        details: `Removed file ${removedFile?.name}`,
        icon: 'trash-2'
      }];
      
      // We'll keep the activities in memory for this demo even if file is removed
      return { ...prevActivities, [fileId]: activityCopy };
    });
    
    setFiles(prevFiles => prevFiles.filter(f => f.id !== fileId));
    
    // Clean up progress and status
    setUploadProgress(prev => {
      const newProgress = { ...prev };
      delete newProgress[fileId];
      return newProgress;
    });
    
    setUploadStatus(prev => {
      const newStatus = { ...prev };
      delete newStatus[fileId];
      return newStatus;
    });
    
    toast.info('File removed');
  };
  
  // Get appropriate icon based on file type
  const getFileIcon = (mimeType) => {
    if (mimeType.startsWith('image/')) {
      return ImageIcon;
    } else if (mimeType.startsWith('text/')) {
      return FileTextIcon;
    } else if (mimeType.includes('spreadsheet') || mimeType.includes('excel') || mimeType.includes('csv')) {
      return FileSpreadsheetIcon;
    } else if (mimeType.includes('presentation') || mimeType.includes('powerpoint')) {
      return FilePresentationIcon;
    } else if (mimeType.includes('compressed') || mimeType.includes('zip') || mimeType.includes('archive')) {
      return FileArchiveIcon;
    } else if (mimeType.startsWith('video/')) {
      return FileVideoIcon;
    } else if (mimeType.startsWith('audio/')) {
      return FileAudioIcon;
    } else {
      return FileIcon;
    }
  };
  
  // Format file size
  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else if (bytes < 1073741824) return (bytes / 1048576).toFixed(1) + ' MB';
    else return (bytes / 1073741824).toFixed(1) + ' GB';
  };
  
  // Record progress milestone for a file
  const recordProgressMilestone = (fileId, milestone) => {
  const recordProgressMilestone = (fileId, milestone) => {
    setFileActivities(prev => {
      const fileActivity = prev[fileId] || [];
      return {
        ...prev,
        [fileId]: [...fileActivity, {
          id: `activity-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          type: 'upload-progress',
          timestamp: new Date(),
          message: `Upload progress: ${milestone}%`,
          details: `${files.find(f => f.id === fileId)?.name} upload reached ${milestone}%`,
          icon: 'loader'
        }]
      };
    });
  // Simulate a download event for a file
  const simulateDownload = (fileId) => {
    const file = files.find(f => f.id === fileId);
    if (!file) return;
    
    toast.info(`Starting download for ${file.name}`);
    
    // Record download start activity
    setFileActivities(prev => {
      const fileActivity = prev[fileId] || [];
      return {
        ...prev,
        [fileId]: [...fileActivity, {
          id: `activity-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          type: 'download-start',
          timestamp: new Date(),
          message: 'File download started',
          details: `Started downloading ${file.name}`,
          icon: 'download'
        }]
      };
    });
    
    // Simulate download completion after a delay
    setTimeout(() => {
      // Record download completion
      setFileActivities(prev => {
        const fileActivity = prev[fileId] || [];
        return {
          ...prev,
          [fileId]: [...fileActivity, {
            id: `activity-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            type: 'download-complete',
            timestamp: new Date(),
            message: 'File download completed',
            details: `Successfully downloaded ${file.name}`,
            icon: 'check-circle'
          }]
        };
      });
      
      toast.success(`Downloaded ${file.name} successfully`);
    }, 2000);
  };
  
  // Simulate a share event for a file
  const simulateShare = (fileId) => {
    const file = files.find(f => f.id === fileId);
    if (!file) return;
    
    toast.info(`Generating share link for ${file.name}...`);
    
    // Record share activity
    setTimeout(() => {
      setFileActivities(prev => {
        const fileActivity = prev[fileId] || [];
        return {
          ...prev,
          [fileId]: [...fileActivity, {
            id: `activity-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            type: 'file-shared',
            timestamp: new Date(),
            message: 'File shared',
            details: `Shared ${file.name} (Link expires in 7 days)`,
            icon: 'share'
          }]
        };
      });
      
      toast.success(`Share link created for ${file.name}`);
    }, 1500);
  };
  
  // File detail panel states
  const [selectedFileId, setSelectedFileId] = useState(null);
  
  // Get selected file
  const selectedFile = files.find(file => file.id === selectedFileId);
  
  // Handler for clicking on a file
  const handleFileClick = (fileId) => {
    setSelectedFileId(prevId => prevId === fileId ? null : fileId);
  };
  
  return (
    <div className="flex flex-col space-y-6">
      {/* Upload Zone */}
      <div 
        className={`relative rounded-2xl transition-all duration-300 ease-in-out
          ${isDragging 
            ? 'bg-primary/10 border-primary border-2 shadow-lg' 
            : 'bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 shadow-card'
          }`}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input 
          type="file" 
          className="hidden" 
          ref={fileInputRef} 
          onChange={handleFileInputChange}
          multiple
        />
        
        <div className="p-8 text-center">
          <motion.div 
            initial={{ scale: 1 }}
            animate={{ scale: isDragging ? 1.05 : 1 }}
            className="mb-6 mx-auto w-20 h-20 flex items-center justify-center rounded-full bg-primary/10 text-primary dark:bg-primary/20"
          >
            <UploadCloudIcon className="h-10 w-10" />
          </motion.div>
          
          <h3 className="text-xl font-semibold mb-2">
            {isDragging ? 'Drop your files here' : 'Upload your files'}
          </h3>
          
          <p className="text-surface-600 dark:text-surface-400 mb-6">
            Drag and drop your files here, or click to browse
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={() => fileInputRef.current.click()}
              className="btn-primary flex items-center justify-center w-full sm:w-auto"
            >
              <UploadCloudIcon className="mr-2 h-4 w-4" />
              Choose Files
            </button>
            
            <div className="text-sm text-surface-500 dark:text-surface-400">
              Support for all file types
            </div>
          </div>
        </div>
        
        {/* Pulsing animation for drag state */}
        {isDragging && (
          <motion.div
            initial={{ opacity: 0.5, scale: 0.9 }}
            animate={{ 
              opacity: [0.5, 0.4, 0.5], 
              scale: [0.9, 0.92, 0.9] 
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 1.5,
              ease: "easeInOut" 
            }}
            className="absolute inset-0 rounded-2xl bg-primary/5 -z-10"
          />
        )}
      </div>
      
      {/* File List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Files Column */}
        <div className={`lg:col-span-${selectedFileId ? 2 : 3}`}>
          {files.length > 0 && (
            <motion.div 
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-surface-800 rounded-xl shadow-card overflow-hidden"
            >
              <div className="p-4 border-b border-surface-200 dark:border-surface-700 flex justify-between items-center">
                <h3 className="font-medium">Uploads ({files.length})</h3>
              </div>
              
              <div className="divide-y divide-surface-200 dark:divide-surface-700 max-h-96 overflow-y-auto">
                <AnimatePresence>
                  <LayoutGroup>
                    {files.map(fileObj => {
                      const progress = uploadProgress[fileObj.id] || 0;
                      const status = uploadStatus[fileObj.id] || 'pending';
                      const IconComponent = getFileIcon(fileObj.file.type);
                      const isSelected = selectedFileId === fileObj.id;
                      
                      return (
                        <motion.div 
                          key={fileObj.id}
                          layout
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className={`p-4 flex flex-col sm:flex-row sm:items-center gap-4 cursor-pointer ${
                            isSelected ? 'bg-primary/5 dark:bg-primary/10' : 'hover:bg-surface-50 dark:hover:bg-surface-700/50'
                          }`}
                          onClick={() => handleFileClick(fileObj.id)}
                        >
                          {/* File Icon and Info */}
                          <div className="flex items-center flex-1 min-w-0">
                            <div className={`h-10 w-10 rounded-lg flex items-center justify-center mr-3 flex-shrink-0 ${
                              isSelected 
                                ? 'bg-primary/20 text-primary' 
                                : 'bg-surface-100 dark:bg-surface-700 text-surface-600 dark:text-surface-300'
                            }`}>
                              <IconComponent className="h-5 w-5" />
                            </div>
                            
                            <div className="min-w-0 flex-1">
                              <h4 className="font-medium text-sm truncate mb-1" title={fileObj.name}>
                                {fileObj.name}
                              </h4>
                              <div className="flex items-center text-xs text-surface-500">
                                <span className="mr-3">{formatFileSize(fileObj.size)}</span>
                                <span>{format(fileObj.uploadedAt, 'MMM d, h:mm a')}</span>
                              </div>
                            </div>
                          </div>
                          
                          {/* Progress and Actions */}
                          <div className="flex flex-col sm:items-end gap-2 w-full sm:w-auto">
                            {/* Progress Bar */}
                            <div className="w-full sm:w-32 flex items-center">
                              <div className="flex-1 h-2 bg-surface-200 dark:bg-surface-700 rounded-full overflow-hidden">
                                <div 
                                  className={`h-full rounded-full ${
                                    status === 'completed' 
                                      ? 'bg-green-500' 
                                      : status === 'failed' 
                                        ? 'bg-red-500' 
                                        : 'bg-primary'
                                  }`}
                                  style={{ width: `${progress}%` }}
                                ></div>
                              </div>
                              <span className="ml-2 text-xs text-surface-500 w-9 text-right">
                                {status === 'completed' ? '100%' : `${Math.round(progress)}%`}
                              </span>
                            </div>
                            
                            {/* Status and Actions */}
                            <div className="flex items-center space-x-2">
                              {/* Status Indicator */}
                              <div className="flex items-center text-xs">
                                {status === 'uploading' && (
                                  <span className="text-primary flex items-center">
                                    <LoaderIcon className="h-3 w-3 mr-1 animate-spin" />
                                    Uploading
                                  </span>
                                )}
                                {status === 'paused' && (
                                  <span className="text-amber-500 flex items-center">
                                    <PauseIcon className="h-3 w-3 mr-1" />
                                    Paused
                                  </span>
                                )}
                                {status === 'completed' && (
                                  <span className="text-green-500 flex items-center">
                                    <CheckCircleIcon className="h-3 w-3 mr-1" />
                                    Complete
                                  </span>
                                )}
                                {status === 'failed' && (
                                  <span className="text-red-500 flex items-center">
                                    <AlertCircleIcon className="h-3 w-3 mr-1" />
                                    Failed
                                  </span>
                                )}
                              </div>
                              
                              {/* Action Buttons */}
                              <div className="flex space-x-1" onClick={(e) => e.stopPropagation()}>
                                {/* Pause/Resume Button */}
                                {(status === 'uploading' || status === 'paused') && (
                                  <button 
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      togglePauseUpload(fileObj.id);
                                    }}
                                    className="p-1 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700 text-surface-600 dark:text-surface-300"
                                    title={status === 'paused' ? 'Resume' : 'Pause'}
                                  >
                                    {status === 'paused' ? (
                                      <PlayIcon className="h-4 w-4" />
                                    ) : (
                                      <PauseIcon className="h-4 w-4" />
                                    )}
                                  </button>
                                )}
                                
                                {/* Download Button for completed files */}
                                {status === 'completed' && (
                                  <button 
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      simulateDownload(fileObj.id);
                                    }}
                                    className="p-1 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700 text-surface-600 dark:text-surface-300"
                                    title="Download"
                                  >
                                    <DownloadIcon className="h-4 w-4" />
                                  </button>
                                )}
                                
                                {/* Share Button for completed files */}
                                {status === 'completed' && (
                                  <button 
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      simulateShare(fileObj.id);
                                    }}
                                    className="p-1 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700 text-surface-600 dark:text-surface-300"
                                    title="Share"
                                  >
                                    <ShareIcon className="h-4 w-4" />
                                  </button>
                                )}
                                
                                {/* Cancel/Remove Button */}
                                <button 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    cancelUpload(fileObj.id);
                                    if (selectedFileId === fileObj.id) {
                                      setSelectedFileId(null);
                                    }
                                  }}
                                  className="p-1 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700 text-surface-600 dark:text-surface-300"
                                  title="Remove"
                                >
                                  <XIcon className="h-4 w-4" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </LayoutGroup>
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </div>
        
        {/* File Timeline Panel */}
        {selectedFileId && (
          <motion.div 
            layout
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="bg-white dark:bg-surface-800 rounded-xl shadow-card overflow-hidden lg:col-span-1"
          >
            <div className="p-4 border-b border-surface-200 dark:border-surface-700">
              <div className="flex justify-between items-center">
                <h3 className="font-medium flex items-center">
                  <ClockIcon className="h-4 w-4 mr-2" />
                  Activity Timeline
                </h3>
                <button 
                  onClick={() => setSelectedFileId(null)}
                  className="p-1 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700 text-surface-500"
                >
                  <XIcon className="h-4 w-4" />
                </button>
              </div>
              {selectedFile && (
                <div className="mt-2 text-sm text-surface-500">
                  {selectedFile.name}
                </div>
              )}
            </div>
            
            {/* Timeline */}
            <div className="p-4 max-h-96 overflow-y-auto">
              {selectedFile && (
                <div className="file-timeline">
                  {(fileActivities[selectedFileId] || []).sort((a, b) => 
                    new Date(b.timestamp) - new Date(a.timestamp)
                  ).map(activity => {
                    const ActivityIcon = getIcon(activity.icon);
                    
                    return (
                      <div key={activity.id} className="timeline-item">
                        <div className="timeline-icon">
                          <ActivityIcon className="h-4 w-4" />
                        </div>
                        <div className="timeline-content">
                          <h4 className="timeline-title">{activity.message}</h4>
                          <p className="timeline-details">{activity.details}</p>
                          <p className="timeline-time">
                            {format(new Date(activity.timestamp), 'MMM d, yyyy, h:mm:ss a')}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>
      
      {/* Storage Location Selection */}
      {files.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-surface-800 rounded-xl shadow-card p-4"
        >
          <h3 className="font-medium mb-4">Save to folder</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {/* Default Folder */}
            <div className="border border-primary rounded-lg p-4 flex items-center bg-primary/5 dark:bg-primary/10">
              <div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center text-primary mr-3">
                <FolderIcon className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-medium text-sm">My Files</h4>
                <p className="text-xs text-surface-500">Default storage</p>
              </div>
            </div>
            
            {/* Other Folders */}
            {['Documents', 'Images', 'Work'].map(folder => (
              <div 
                key={folder}
                className="border border-surface-200 dark:border-surface-700 rounded-lg p-4 flex items-center hover:border-primary hover:bg-primary/5 dark:hover:bg-primary/10 transition-colors cursor-pointer"
              >
                <div className="h-10 w-10 rounded-lg bg-surface-100 dark:bg-surface-700 flex items-center justify-center text-surface-600 dark:text-surface-300 mr-3">
                  <FolderIcon className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-medium text-sm">{folder}</h4>
                  <p className="text-xs text-surface-500">Selected storage</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default MainFeature;