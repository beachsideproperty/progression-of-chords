import { configureStore } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import auth from './slices/auth';
import usersReducer from './slices/users';
import moodsReducer from './slices/moods';

const store = configureStore({
  reducer: {
    auth: auth,
    users: usersReducer,
    moods: moodsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(createLogger()),
});

export default store;
export * from './slices/auth';
