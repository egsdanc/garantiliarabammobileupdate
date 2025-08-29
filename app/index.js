import React, { useEffect, useState } from 'react';
import { store } from './store'; // store'u doğru yerden import et
import { StatusBar, View, LogBox } from 'react-native';
import { BaseColor } from './config/color'; // config dosyanıza göre path ayarlayın
import { Provider } from 'react-redux';
import AppNavigator from './navigation/index'; // navigation ana component
import {
  withAlertModal,
  compose,
  withProps,
  withErrorHandler,
  withLoadingScreen,
} from './hocs'; // path'i kendi projenize göre ayarlayın

import NetInfo from '@react-native-community/netinfo';

// Firebase initialization with error handling
let firebaseInitialized = false;
try {
  const firebase = require('@react-native-firebase/app');

  // Check if Firebase is already initialized
  if (!firebase.apps.length) {
    // Try to initialize with default config
    firebase.initializeApp();
    firebaseInitialized = true;
    console.log('Firebase initialized successfully');
  } else {
    firebaseInitialized = true;
    console.log('Firebase already initialized');
  }
} catch (error) {
  console.warn('Firebase initialization failed:', error.message);
  firebaseInitialized = false;
}

// Export firebase status for use in other components
export { firebaseInitialized };

// Internet bağlantı kontrolü HOC
const InternetChecker = withProps(() => {
  const [isConnected, setIsConnected] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
      setError(state.isConnected ? '' : 'İnternete bağlı değilsiniz');
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return {
    error: error,
    loading: !isConnected,
  };
});

// Uyarı ve hata yönetimi için compose edilmiş App
let navigator = null;
const AppWithAlert = compose(
  InternetChecker,
  withErrorHandler,
  withLoadingScreen({}),
  withAlertModal,
  React.forwardRef,
)((props, _) =>
  props.loading ? (
    <View />
  ) : (
    <AppNavigator
      {...props}
      ref={ref => {
        navigator = ref;
      }}
    />
  ),
);

console.disableYellowBox = true; // eski sürüm için, yenisinde LogBox kullanılır
LogBox.ignoreLogs([
  'Warning: isMounted(...) is deprecated',
  'Module RCTImageLoader',
  'Require cycle:',
]);

export default () => {
  useEffect(() => {
    // StatusBar.setBackgroundColor(BaseColor.primaryColor, true);
  }, []);
  return (
    <Provider store={store}>
      <AppWithAlert />
    </Provider>
  );
};

export { navigator };