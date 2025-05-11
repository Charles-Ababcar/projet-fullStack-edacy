import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../slice/auth.slice";
import { bookApi } from "../slice/book.slice";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [bookApi.reducerPath]: bookApi.reducer,
  },
  
  middleware: (_) =>
    _().concat([
        authApi.middleware,
        bookApi.middleware
     
    ]),

});

setupListeners(store.dispatch);
