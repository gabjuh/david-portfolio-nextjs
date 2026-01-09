// src/store.ts
import { configureStore } from '@reduxjs/toolkit';

// Példaként egy egyszerű slice (később bővítheted)
import dataReducer from '../slices/dataSlice';

export const store = configureStore({
  reducer: {
    data: dataReducer,
    // ide jöhetnek további slice-ok
  },
});

// Típusok későbbi egyszerűséghez:
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
