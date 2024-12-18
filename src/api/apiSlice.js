import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  tagTypes: ['Heroes'],
  endpoints: (builder) => ({
    getHeroes: builder.query({
      query: () => '/heroes',
      providesTags: ['Heroes'],
    }),
    addHero: builder.mutation({
      query: (hero) => ({
        url: '/heroes',
        method: 'POST',
        body: hero,
      }),
      invalidatesTags: ['Heroes'],
    }),
    deleteHero: builder.mutation({
      query: (id) => ({
        url: `/heroes/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Heroes'],
    }),
  }),
});

export const { useGetHeroesQuery, useAddHeroMutation, useDeleteHeroMutation } =
  apiSlice;
