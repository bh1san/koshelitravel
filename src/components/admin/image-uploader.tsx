
'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { UploadCloud, CheckCircle, AlertTriangle, Loader2 } from 'lucide-react';
import { Label } from '@/components/ui/label';

interface ImageUploaderProps {
  onUploadComplete: (url: string) => void;
  currentImageUrl?: string;
  folder?: string; // e.g., 'banners', 'blogs'
}

export function ImageUploader({ onUploadComplete, currentImageUrl, folder = 'general' }: ImageUploaderProps) {
  const [file, setFile] = useState<File | null>(null);
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

  const handleUpload = async () => {
    if (!file) return;

    setUploadStatus('uploading');
    setError(null);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', folder);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (response.ok && result.success) {
        onUploadComplete(result.url);
        setUploadStatus('success');
        setFile(null);
      } else {
        // This will now throw an error with the server's message
        throw new Error(result.message || 'Upload failed due to an unknown server issue.');
      }
    } catch (err: any) {
      console.error('Upload failed:', err);
      // The user will see the specific error from the server
      setError(err.message || 'A client-side error occurred. Please try again.');
      setUploadStatus('error');
    }
  };

  return (
    <div className="space-y-3 p-3 border rounded-md bg-muted/20">
      <div>
        <div className="flex items-center gap-2">
            <Input type="file" accept="image/png, image/jpeg, image/webp, image/gif" onChange={handleFileChange} className="flex-grow bg-background" />
            <Button onClick={handleUpload} disabled={!file || uploadStatus === 'uploading'} type="button" variant="secondary">
                {uploadStatus === 'uploading' ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <UploadCloud className="mr-2 h-4 w-4" />
                )}
                {uploadStatus === 'uploading' ? 'Uploading...' : 'Upload'}
            </Button>
        </div>
      </div>

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
                      key={currentImageUrl}
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
