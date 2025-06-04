'use client';

import { useState } from 'react';
import Image from 'next/image';
import { FaUpload, FaSpinner, FaCheck, FaTimes, FaTrash } from 'react-icons/fa';
import { uploadFile } from '@/lib/database';

interface MediaUploaderProps {
  label: string;
  initialUrl?: string;
  type?: 'image' | 'video' | 'document';
  onFileUploaded: (url: string) => void;
  onFileRemoved?: () => void;
}

export default function MediaUploader({
  label,
  initialUrl = '',
  type = 'image',
  onFileUploaded,
  onFileRemoved
}: MediaUploaderProps) {
  const [fileUrl, setFileUrl] = useState<string>(initialUrl);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadError, setUploadError] = useState<string>('');
  const [isDragging, setIsDragging] = useState<boolean>(false);
  
  const handleFileChange = async (file: File) => {
    if (!file) return;
    
    setIsUploading(true);
    setUploadError('');
    
    try {
      const url = await uploadFile(file, type);
      
      if (url) {
        setFileUrl(url);
        onFileUploaded(url);
      } else {
        setUploadError('Failed to upload file. Please try again.');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      setUploadError('An error occurred during upload.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileChange(file);
    }
  };
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileChange(file);
    }
  };
  
  const handleRemove = () => {
    setFileUrl('');
    if (onFileRemoved) {
      onFileRemoved();
    }
  };
  
  const renderPreview = () => {
    if (!fileUrl) return null;
    
    if (type === 'image') {
      return (
        <div className="relative">
          <Image 
            src={fileUrl} 
            alt="Uploaded media" 
            width={300} 
            height={200} 
            className="object-cover rounded-md shadow-sm" 
          />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
            aria-label="Remove image"
          >
            <FaTrash size={14} />
          </button>
        </div>
      );
    }
    
    if (type === 'video') {
      return (
        <div className="relative">
          <video 
            src={fileUrl} 
            controls 
            className="max-w-full h-auto rounded-md shadow-sm" 
          />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
            aria-label="Remove video"
          >
            <FaTrash size={14} />
          </button>
        </div>
      );
    }
    
    return (
      <div className="relative">
        <div className="flex items-center p-3 bg-gray-100 rounded-md">
          <span className="truncate max-w-xs">{fileUrl.split('/').pop()}</span>
          <button
            type="button"
            onClick={handleRemove}
            className="ml-2 text-red-500 hover:text-red-600"
            aria-label="Remove file"
          >
            <FaTrash size={14} />
          </button>
        </div>
      </div>
    );
  };
  
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      
      {!fileUrl && (
        <div
          className={`border-2 border-dashed rounded-lg p-6 text-center ${
            isDragging ? 'border-primary bg-primary/10' : 'border-gray-300 hover:border-primary'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="space-y-3">
            <div className="flex justify-center">
              {isUploading ? (
                <FaSpinner className="h-10 w-10 text-primary animate-spin" />
              ) : (
                <FaUpload className="h-10 w-10 text-gray-400" />
              )}
            </div>
            
            <div className="text-sm text-gray-600">
              {isUploading 
                ? 'Uploading...' 
                : (
                  <>
                    <span className="block">Drag and drop your file here, or</span>
                    <label className="relative cursor-pointer mt-2">
                      <span className="inline-block px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors">
                        Browse files
                      </span>
                      <input
                        type="file"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        onChange={handleInputChange}
                        accept={
                          type === 'image' 
                            ? 'image/*' 
                            : type === 'video' 
                              ? 'video/*' 
                              : '*/*'
                        }
                      />
                    </label>
                  </>
                )
              }
            </div>
            
            {uploadError && (
              <div className="text-sm text-red-500 flex items-center justify-center">
                <FaTimes className="mr-1" /> {uploadError}
              </div>
            )}
          </div>
        </div>
      )}
      
      {renderPreview()}
    </div>
  );
} 