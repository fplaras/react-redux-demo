import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import housingReducer from '../features/housing/housingSlice';

export const store = configureStore({
  reducer: {
    housing: housingReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
