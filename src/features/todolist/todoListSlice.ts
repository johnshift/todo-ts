import { createSlice } from '@reduxjs/toolkit';
import moment from 'moment';
import { Todo, TodoListState } from './types';

const initialState: TodoListState = {
  currentID: 3, // hardcode id autoincrement
  todoList: [
    {
      id: 0, description: 'desc 0', isDone: false, targetDate: moment(new Date()).toISOString(),
    },
    {
      id: 1, description: 'desc 1', isDone: false, targetDate: moment(new Date()).toISOString(),
    },
    {
      id: 2, description: 'desc 2', isDone: false, targetDate: moment(new Date()).toISOString(),
    },
    {
      id: 3, description: 'desc 3', isDone: false, targetDate: moment(new Date()).toISOString(),
    },
  ],
};

export const todoListSlice = createSlice({
  name: 'todoList',
  initialState,
  reducers: {
    addTodo: (state, { payload }: { payload: Todo }) => {
      // hardcode id autoincrement
      const newID = state.currentID + 1;
      const newTodo = {
        ...payload,
        id: newID,
      };
      state.currentID = newID;
      state.todoList.push(newTodo);
    },
    deleteTodo: (state, { payload }: {payload: Todo }) => {
      state.todoList = state.todoList.filter((todo) => todo.id !== payload.id);
    },
    updateTodo: (state, { payload }: { payload: Todo; }) => {
      for (let i = 0; i < state.todoList.length; i += 1) {
        if (payload.id === state.todoList[i].id) {
          state.todoList[i] = payload;
          break;
        }
      }
    },
  },
});

export const { addTodo, deleteTodo, updateTodo } = todoListSlice.actions;

export default todoListSlice.reducer;
