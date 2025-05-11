import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { errorTrasform } from "./error_transformer"
import { User } from "../models/user.model"
import { BaseResponse } from "../models/base_response"

export const authApi = createApi({
    reducerPath: 'auth',
    baseQuery: fetchBaseQuery({baseUrl:'/v1'}),
    tagTypes:['auth'],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials
      }),
      transformErrorResponse: errorTrasform,
      invalidatesTags: ['auth']
    }),
    getMe:builder.query<BaseResponse<User>,string>({
        query:()=>({url:'/auth/profile', method:"Get"}),
          transformErrorResponse: errorTrasform,
          providesTags:['auth']
          
    }),
    logout:builder.mutation<BaseResponse<User>,string>({
      query:()=>({url:'auth/logout', method:"POST"}),
        transformErrorResponse: errorTrasform,
        invalidatesTags:['auth']
  }),
  })
})

export const { useLoginMutation, useGetMeQuery } = authApi