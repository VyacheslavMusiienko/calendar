import { combineReducers, configureStore } from '@reduxjs/toolkit';
import dateReducer from './reducer/dateSlice';

const rootReducer = combineReducers({
  dateReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppSore = ReturnType<typeof setupStore>;
export type AppDispatch = AppSore['dispatch'];
