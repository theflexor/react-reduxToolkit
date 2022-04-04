import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const userApi = createApi({
     reducerPath: 'userApi',
     tagTypes: ['People'],
     baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/' }),
     endpoints: (build) => ({
          getUsers: build.query({
               query: (limit = '') => `users${limit && `?_limit=${limit}`}`,
               providesTags: (result) => result
                    ?
                    [
                         ...result.map(({ id }) => ({ type: 'People', id })),
                         { type: 'People', id: 'LIST' }
                    ]
                    :
                    [{ type: 'People', id: 'LIST' }]
          }),
          addUser: build.mutation({
               query: (body) => ({
                    url: 'users',
                    method: 'POST',
                    body
               }),
               invalidatesTags: [{ type: 'People', id: 'LIST' }]
          }),
          deleteUser: build.mutation({
               query: (id) => ({
                    url: `users/${id}`,
                    method: 'DELETE'
               }),
               invalidatesTags: [{ type: 'People', id: 'LIST' }]
          })
     })
})

export const { useGetUsersQuery, useAddUserMutation , useDeleteUserMutation} = userApi