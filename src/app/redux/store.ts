import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import { environment } from 'src/environments/environment';
import { issueTrackerSlice } from '../issue/slice';

export const store = configureStore({
  reducer: {
    issueTracker: issueTrackerSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    environment.production
      ? getDefaultMiddleware()
      : getDefaultMiddleware().concat(logger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
