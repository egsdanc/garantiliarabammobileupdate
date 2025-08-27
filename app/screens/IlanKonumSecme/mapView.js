import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import { withLoadingScreen } from '@hocs';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
const MapViewL = withLoadingScreen({})(MapView);
import styles from './styles';

const latitudeDelta = 0.008
const longitudeDelta = 0.008

export default function Map({
  setLocation,
  resetPage
}) {
  const [mapConfig, setMapConfig] = useState(null);
  const [loading, setLoading] = useState(true);
  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        setLoading(false);
        const { coords } = position;
        const config = {
          coordinate: {
            latitude: coords.latitude,
            longitude: coords.longitude
          },
          initialRegion: {
            latitude: coords.latitude,
            longitude: coords.longitude,
            latitudeDelta,
            longitudeDelta,
          },
        };
        setLocation(coords)
        setMapConfig(config);
      },
      error => {
        setLoading(false);
        Alert.alert(
          "Uyarı",
          error?.message,
          [
            {
              text: "Tamam",
              onPress: () => resetPage(),
              style: "cancel"
            }
          ]
        );
        const config = {
          coordinate: {
            latitude: 0,
            longitude: 0
          },
          initialRegion: {
            latitude: 0,
            longitude: 0,
            latitudeDelta,
            longitudeDelta,
          },
        };

        setMapConfig(config);
      },
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 1000 },
    );
  };
  useEffect(() => {
    getCurrentLocation();
  }, []);

  return mapConfig ? (
    <MapViewL
      loading={loading}
      provider={PROVIDER_GOOGLE}
      onPress={({ nativeEvent }) =>
        setMapConfig(s => ({ ...s, coordinate: nativeEvent.coordinate }))
      }
      style={styles.map}
      initialRegion={mapConfig.initialRegion}>
      <Marker coordinate={mapConfig.coordinate} />
    </MapViewL>
  ) : null;
}
