import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';

import todoListReducer from '../features/todolist/todoListSlice';

import { todoApi } from '../features/todolist/todoApi';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    todoList: todoListReducer,
    [todoApi.reducerPath]: todoApi.reducer,
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
