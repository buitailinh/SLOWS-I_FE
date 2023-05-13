import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import authReducer from './state';
import { configureStore } from '@reduxjs/toolkit';
import App from './App'
import './index.css'
import  AppProvider  from './utils/context';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from "redux-persist"
import { CircularProgress } from "@mui/material";
import storage from 'redux-persist/lib/storage';


const persistConfiguration = {
  key: "root",
  storage,
  version: 1
}

const persistedReducer = persistReducer(persistConfiguration, authReducer); //Information we'd like to store in user local storage

const reduxStore = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   
      <BrowserRouter>
      <Provider store={reduxStore}>
      <AppProvider>
      <Suspense
        fallback={
          <CircularProgress
            style={{
              margin: 0,
              position: "absolute",
              top: "50%",
              left: "50%",
              color: "#b3befe",
            }}
          />
        }
      >
      <App />
      </Suspense>
      </AppProvider>
      </Provider>
      </BrowserRouter>
    
  </React.StrictMode>,
)
