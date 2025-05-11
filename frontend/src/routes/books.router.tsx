import { Navigate, RouteObject } from "react-router-dom";
import { BooksList } from "../interface/pages/books/list_books";


export enum BookPath {
    _ = "/public/books",
    CREATE = "/public/books/create",
    LIST = "/public/books/list",
    EDIT = "/public/books/edit/:id",
    DETAILS = "/public/books/details/:id",
  }

  export const BooksRouter : RouteObject = {
    path : BookPath._,
    children : [
        {
            path : BookPath._,
            element :  <Navigate to={BookPath.LIST} />, 
        },
        {
          path: BookPath.LIST,
          element: <BooksList />,
        },

    ]
  }