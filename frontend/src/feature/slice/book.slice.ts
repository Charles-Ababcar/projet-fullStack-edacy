import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { errorTrasform } from "./error_transformer"

export const bookApi = createApi({
    reducerPath:'books',
    baseQuery: fetchBaseQuery({baseUrl:'/v1'}),
    tagTypes:['books'],
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => '/books',
       transformErrorResponse:errorTrasform,
      providesTags: ['books'],
    }),
    createBook: builder.mutation({
      query: (bookData) => ({
        url: '/books',
        method: 'POST',
        body: bookData
      }),
      transformErrorResponse:errorTrasform,
      invalidatesTags: ['books']
    }),
    updateBook: builder.mutation({
      query: ({ id, ...bookData }) => ({
        url: `/books/${id}`,
        method: 'PATCH',
        body: bookData
      }),
      transformErrorResponse:errorTrasform,
      invalidatesTags: ['books']
    }),
    deleteBook: builder.mutation({
      query: (id) => ({
        url: `/books/${id}`,
        method: 'DELETE'
      }),
      transformErrorResponse:errorTrasform,
      invalidatesTags: ['books']
    })
  })
})

export const {
  useGetBooksQuery,
  useCreateBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation
} = bookApi