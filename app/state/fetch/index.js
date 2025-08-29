// import React from 'react';
// import axios from 'axios';

// export const base = 'app.garantiliarabam.com/public';
// //export const base ='localhost:8000';

// export const host = `https://${base}/api/`;
// // export const host = "https://${base}/int/test";
// export const baseURL = `${host}`;
// const axiosInstance = axios.create({
//   timeout: 0,
// });
// axiosInstance.defaults.headers['Content-Type'] = 'application/json';
// axiosInstance.interceptors.request.use(config => {
//   config.baseURL = `${baseURL}`;

//   return config;
// });

// axiosInstance.interceptors.response.use(
//   response => {
//     return response.data;
//   },
//   error => {
//     return Promise.reject(error);
//   },
// );
// export default axiosInstance;

import axios from 'axios';
import { store } from '../../store';
import AsyncStorage from '@react-native-community/async-storage';

export const base = 'app.garantiliarabam.com/public';
export const host = `https://${base}/api/`;
export const baseURL = `${host}`;

const axiosInstance = axios.create({
  maxContentLength: Infinity,
  maxBodyLength: Infinity,
  timeout: 240000,
  baseURL: baseURL, // baseURL'i burada ayarlayabilirsiniz
});

axiosInstance.defaults.headers['Content-Type'] = 'application/json';

// async fonksiyon olarak tanımlayın
axiosInstance.interceptors.request.use(async (config) => {
  try {
    const token = await AsyncStorage.getItem('@token');
    console.log("Token:", token);
    // '@token' key'i ile kaydettiğinizi varsayıyorum
    config.baseURL = baseURL; // Zaten create anında ayarladık, gerek yok

    if (token) {
      // Daha standart bir authorization header formatı
      config.headers.token = `${token}`;

      // Veya mevcut yönteminiz
      // config.headers.token = token;
    }

    return config;
  } catch (error) {
    console.error('Token alınırken hata:', error);
    return config; // Hata olsa bile config'i döndür
  }
});

axiosInstance.interceptors.response.use(
  response => response.data,
  error => Promise.reject(error)
);

export default axiosInstance;