import { configureStore } from '@reduxjs/toolkit';
import managerDateReducer from './redux/dataReduer';

export const store = configureStore({
  reducer: {
    managerDateReducer,
  },
});
