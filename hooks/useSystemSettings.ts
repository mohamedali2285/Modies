import { useEffect, useState } from 'react';
import { Platform, NativeModules, PermissionsAndroid } from 'react-native';

export function useSystemSettings() {
  const [permissions, setPermissions] = useState({
    writeSettings: false,
    notificationPolicy: false,
    bluetooth: false,
    wifi: false,
  });

  useEffect(() => {
    async function requestSystemPermissions() {
      if (Platform.OS === 'android') {
        try {
          // Request WRITE_SETTINGS permission
          const writeSettingsGranted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_SETTINGS,
            {
              title: "System Settings Permission",
              message: "This app needs access to modify system settings to automate your routines.",
              buttonNeutral: "Ask Me Later",
              buttonNegative: "Cancel",
              buttonPositive: "OK"
            }
          );

          // Request notification policy access
          const notificationPolicyGranted = await PermissionsAndroid.request(
            'android.permission.ACCESS_NOTIFICATION_POLICY',
            {
              title: "Do Not Disturb Permission",
              message: "This app needs access to DND settings to automate your routines.",
              buttonNeutral: "Ask Me Later",
              buttonNegative: "Cancel",
              buttonPositive: "OK"
            }
          );

          // Request Bluetooth permissions
          const bluetoothGranted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
            {
              title: "Bluetooth Permission",
              message: "This app needs access to Bluetooth to automate your routines.",
              buttonNeutral: "Ask Me Later",
              buttonNegative: "Cancel",
              buttonPositive: "OK"
            }
          );

          // Request WiFi permissions
          const wifiGranted = await PermissionsAndroid.request(
            'android.permission.CHANGE_WIFI_STATE',
            {
              title: "WiFi Permission",
              message: "This app needs access to WiFi settings to automate your routines.",
              buttonNeutral: "Ask Me Later",
              buttonNegative: "Cancel",
              buttonPositive: "OK"
            }
          );

          setPermissions({
            writeSettings: writeSettingsGranted === 'granted',
            notificationPolicy: notificationPolicyGranted === 'granted',
            bluetooth: bluetoothGranted === 'granted',
            wifi: wifiGranted === 'granted',
          });
        } catch (err) {
          console.warn('Error requesting system permissions:', err);
        }
      }
    }

    requestSystemPermissions();
  }, []);

  const checkPermission = async (permission) => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.check(permission);
        return granted;
      } catch (err) {
        console.warn('Error checking permission:', err);
        return false;
      }
    }
    return false;
  };

  return {
    permissions,
    checkPermission,
  };
}