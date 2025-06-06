import { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import * as Location from 'expo-location';
import * as Camera from 'expo-camera';

export function usePermissions() {
  const [permissions, setPermissions] = useState({
    location: false,
    camera: false,
  });

  useEffect(() => {
    async function getPermissions() {
      if (Platform.OS !== 'web') {
        // Request Location Permission
        const { status: locationStatus } = await Location.requestForegroundPermissionsAsync();
        
        // Request Camera Permission
        const { status: cameraStatus } = await Camera.requestCameraPermissionsAsync();

        setPermissions({
          location: locationStatus === 'granted',
          camera: cameraStatus === 'granted',
        });
      }
    }

    getPermissions();
  }, []);

  return permissions;
}