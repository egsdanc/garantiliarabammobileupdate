
// app/store/index.js
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../reducers';
import rootSaga from '../state/fetch/middleware'; // senin saga dosyan

// saga middleware oluştur
const createSagaMiddleware = require('redux-saga').default;
const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false, // saga kullanacağımız için thunk kapatılabilir
      serializableCheck: {
        ignoredActionPaths: ['resolve', 'reject'],
      },
    }).concat(sagaMiddleware), // saga middleware ekle
});

// sagaları çalıştır
sagaMiddleware.run(rootSaga);







// import { configureStore } from '@reduxjs/toolkit';
// import rootReducer from '../reducers';

// export const store = configureStore({
//   reducer: rootReducer,
// });



// app/store/index.js

// import { configureStore } from '@reduxjs/toolkit';
// import rootReducer from '../reducers';

// export const store = configureStore({
//   reducer: rootReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         // resolve ve reject fonksiyonlarını ignore ediyoruz
//         ignoredActionPaths: ['resolve', 'reject'],
//       },
//     }),
// });
