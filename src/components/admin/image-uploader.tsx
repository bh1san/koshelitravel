
'use client';

import { useState } from 'react';
import { storage } from '@/lib/firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { UploadCloud, CheckCircle, AlertTriangle } from 'lucide-react';
import { Label } from '@/components/ui/label';

interface ImageUploaderProps {
  onUploadComplete: (url: string) => void;
  currentImageUrl?: string;
  folder?: string; // Optional folder in Firebase Storage
}

export function ImageUploader({ onUploadComplete, currentImageUrl, folder = 'uploads' }: ImageUploaderProps) {
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.size > 5 * 1024 * 1024) { // 5MB limit
        setError('File is too large. Please select a file smaller than 5MB.');
        setUploadStatus('error');
        setFile(null);
        return;
      }
      setFile(selectedFile);
      setUploadStatus('idle');
      setError(null);
    }
  };

  const handleUpload = () => {
    if (!file) return;

    setUploadStatus('uploading');
    setUploadProgress(0);
    setError(null);

    const storageRef = ref(storage, `${folder}/${Date.now()}_${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        console.error('Upload failed:', error);
        setError('Upload failed. Please try again.');
        setUploadStatus('error');
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          onUploadComplete(downloadURL);
          setUploadStatus('success');
          setFile(null); // Clear file after successful upload
        });
      }
    );
  };

  return (
    <div className="space-y-3 p-3 border rounded-md bg-muted/20">
      <div>
        <div className="flex items-center gap-2">
            <Input type="file" accept="image/png, image/jpeg, image/webp, image/gif" onChange={handleFileChange} className="flex-grow bg-background" />
            <Button onClick={handleUpload} disabled={!file || uploadStatus === 'uploading'} type="button" variant="secondary">
                <UploadCloud className="mr-2 h-4 w-4" />
                Upload
            </Button>
        </div>
      </div>

      {uploadStatus === 'uploading' && (
        <div>
          <Progress value={uploadProgress} className="w-full" />
          <p className="text-xs text-muted-foreground mt-1">Uploading... {Math.round(uploadProgress)}%</p>
        </div>
      )}

      {uploadStatus === 'success' && (
        <div className="flex items-center gap-2 text-green-600">
          <CheckCircle className="h-4 w-4" />
          <p className="text-sm font-medium">Upload successful! Save changes to apply.</p>
        </div>
      )}

      {uploadStatus === 'error' && (
         <div className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="h-4 w-4" />
            <p className="text-sm font-medium">{error}</p>
        </div>
      )}
      
       {currentImageUrl && (
          <div className="mt-4">
              <Label>Current Image Preview:</Label>
              <div className="mt-2 border rounded-md p-2 flex justify-center items-center bg-background max-h-64 overflow-hidden">
                  <img 
                      src={currentImageUrl} 
                      alt="Current image preview" 
                      className="max-w-full max-h-56 object-contain rounded" 
                      onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const errorMsg = document.createElement('p');
                          errorMsg.textContent = 'Preview not available or URL is invalid.';
                          errorMsg.className = 'text-destructive text-xs';
                          if (target.parentNode) {
                            target.parentNode.appendChild(errorMsg);
                          }
                      }}
                  />
              </div>
          </div>
      )}
    </div>
  );
}
