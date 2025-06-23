import { useState, useRef, useEffect } from 'react';
import { CameraStatus } from '../types';

export const useCamera = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [cameraStatus, setCameraStatus] = useState<CameraStatus>({
    isActive: false,
    isSupported: !!navigator.mediaDevices?.getUserMedia,
    error: null
  });

  const startCamera = async (retryCount = 0) => {
    console.log('Starting camera...');
    
    try {
      // Clear any previous errors
      setCameraStatus(prev => ({ ...prev, error: null }));
      
      // Check if getUserMedia is supported
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Camera not supported by this browser');
      }

      console.log('Requesting camera access...');
      
      // Request camera permissions with simpler constraints first
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: 'user'
        },
        audio: false
      });

      console.log('Camera stream obtained:', stream);

      if (videoRef.current && stream) {
        console.log('Setting video source...');
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        
        // Set up event listeners
        videoRef.current.onloadedmetadata = () => {
          console.log('Video metadata loaded');
          if (videoRef.current) {
            videoRef.current.play().then(() => {
              console.log('Video playing');
              setCameraStatus(prev => ({ ...prev, isActive: true }));
            }).catch(err => {
              console.error('Error playing video:', err);
              setCameraStatus(prev => ({ 
                ...prev, 
                error: 'Failed to start video playback' 
              }));
            });
          }
        };

        videoRef.current.onerror = (err) => {
          console.error('Video error:', err);
          setCameraStatus(prev => ({ 
            ...prev, 
            error: 'Video playback error' 
          }));
        };
      } else {
        if (retryCount < 5) {
          console.warn('Video element not available, retrying...', retryCount);
          setTimeout(() => startCamera(retryCount + 1), 100);
          return;
        } else {
          throw new Error('Video element not available');
        }
      }
    } catch (error) {
      console.error('Camera error:', error);
      let errorMessage = 'Failed to access camera';
      
      if (error instanceof Error) {
        console.log('Error name:', error.name);
        console.log('Error message:', error.message);
        
        switch (error.name) {
          case 'NotAllowedError':
            errorMessage = 'Camera permission denied. Please allow camera access and refresh the page.';
            break;
          case 'NotFoundError':
            errorMessage = 'No camera found. Please connect a camera and try again.';
            break;
          case 'NotReadableError':
            errorMessage = 'Camera is already in use by another application.';
            break;
          case 'OverconstrainedError':
            errorMessage = 'Camera constraints not supported. Trying with basic settings...';
            // Try again with minimal constraints
            setTimeout(() => startCameraBasic(), 1000);
            return;
          default:
            errorMessage = error.message || 'Unknown camera error';
        }
      }
      
      setCameraStatus(prev => ({ 
        ...prev, 
        isActive: false, 
        error: errorMessage 
      }));
    }
  };

  // Fallback method with minimal constraints
  const startCameraBasic = async () => {
    try {
      console.log('Trying basic camera access...');
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false
      });

      if (videoRef.current && stream) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        
        videoRef.current.onloadedmetadata = () => {
          if (videoRef.current) {
            videoRef.current.play().then(() => {
              setCameraStatus(prev => ({ ...prev, isActive: true, error: null }));
            });
          }
        };
      }
    } catch (error) {
      console.error('Basic camera access failed:', error);
      setCameraStatus(prev => ({ 
        ...prev, 
        error: 'Unable to access camera with any settings' 
      }));
    }
  };

  const stopCamera = () => {
    console.log('Stopping camera...');
    
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => {
        console.log('Stopping track:', track.kind);
        track.stop();
      });
      streamRef.current = null;
    }
    
    if (videoRef.current) {
      videoRef.current.srcObject = null;
      videoRef.current.onloadedmetadata = null;
      videoRef.current.onerror = null;
    }
    
    setCameraStatus(prev => ({ ...prev, isActive: false, error: null }));
  };

  const captureFrame = (): string | null => {
    if (!videoRef.current || !cameraStatus.isActive) {
      console.error('Video not ready for capture');
      return null;
    }

    try {
      const video = videoRef.current;
      
      // Check if video has valid dimensions
      if (video.videoWidth === 0 || video.videoHeight === 0) {
        console.error('Video dimensions not available');
        return null;
      }

      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      
      if (!context) {
        console.error('Could not get canvas context');
        return null;
      }

      // Set canvas dimensions to match video
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      console.log(`Capturing frame: ${canvas.width}x${canvas.height}`);
      
      // Draw the current video frame to canvas
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      // Convert to base64 image data
      const imageData = canvas.toDataURL('image/jpeg', 0.8);
      console.log('Frame captured successfully');
      return imageData;
    } catch (error) {
      console.error('Error capturing frame:', error);
      return null;
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  return {
    videoRef,
    cameraStatus,
    startCamera,
    stopCamera,
    captureFrame
  };
};