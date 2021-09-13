import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const todoApi = createApi({
  reducerPath: 'todoApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8080/',
  }),
  tagTypes: ['Todos'],
  endpoints: (builder) => ({
    getAllTodos: builder.mutation({
      query: (username: string) => ({
        url: `/users/${username}/todos`,
      }),
    }),
  }),
});

export const { useGetAllTodosMutation } = todoApi;
