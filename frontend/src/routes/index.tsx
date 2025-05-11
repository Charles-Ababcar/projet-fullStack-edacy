import { createBrowserRouter, Navigate } from "react-router-dom";

import { SecurityRouter } from "./security.router";
import { ErrorPage } from "../interface/pages/error/ErrorPage";
import { Base } from "../interface/pages/base/Base";
import { DashboardHome } from "../interface/pages/dashboard/dashboardHome";
import { BooksRouter } from "./books.router";



export const router = createBrowserRouter([
  SecurityRouter,
   {
    path: "/",
    element: <Navigate to="/dashboard" replace />,
    errorElement: <ErrorPage title={""} message={""} onRetry={function (): void {
      throw new Error("Function not implemented.");
    } } />,
  },
    {
      path:'public',
      element:<Base/>,
      children:[
        {
          path:'',
          index:true,
          element:<Navigate to="dashboard"  />
        },
        {
        path:'dashboard',
        element:<DashboardHome/>
      },
      BooksRouter

    ]
    }
  ])