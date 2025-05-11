import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BaseResponse } from "../models/base_response";
import { WsMessage } from "../models/ws_message.model";
import { SignUpDto } from "../models/login.model";
import { errorTrasform } from "./error_transformer";

export const userApi = createApi({
    reducerPath:"users",
    baseQuery:fetchBaseQuery({ baseUrl:'/v1'}),
    tagTypes:['users'],
    endpoints: (builder) => ({
        signup:builder.mutation<BaseResponse<WsMessage>,SignUpDto>({
          query: (credentials) => ({
            url: '/users/register',
            method: 'POST',
            body: credentials
          }),
          transformErrorResponse:errorTrasform,
          invalidatesTags: ['users']
        }),

    })
})

export const {useSignupMutation} = userApi