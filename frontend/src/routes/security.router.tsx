import { RouteObject } from "react-router-dom";
import { LoginPage } from "../interface/pages/security/Login";
import { SignupPage } from "../interface/pages/security/Register";


export const SecurityRouter: RouteObject = {
  path: "",
  children: [
    {
      path: "",
      index: true,
      element: (
          <LoginPage />
      ),
    },
    { path: "signup", element: <SignupPage /> },
  ],
};
