import React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import './App.css';
import Main from "./pages/Main/Main";
import Signin from "./pages/Sigin/Signin";
import SignUp from "./pages/SignUp/SignUp";
import Home from "./pages/Home/Home";
import UserEvents from "./pages/UserEvents/UserEvents";
import SignInAdmin from "./pages/SignInAdmin/SignInAdmin";
import Admin from "./pages/Admin/Admin";
import { useEffect } from "react";
import Profile from './pages/Profile/Profile';

function App() {

  useEffect(() => {
    document.title = 'Rievera';
  }, []);
  const router = createBrowserRouter([
    {
      path: "/",
      // element:<Navigate to="/signIn"/>        /// '/'
      element:<Main/>
    },

    {
      path: "/home",
      element:<Home/>,
    },

    {
      path: "/signUp",
      element:<SignUp/>
    },
    {
      path:"/signIn",
      element:<Signin/>
    },
    {
      path:"/registeredevents",
      element:<UserEvents />
    },
    {
      path:"/signin/admin",
      element:<SignInAdmin/>
    },
    {
      path:"/admin",
      element:<Admin/>
    },
    {
      path:"/profile",
      element:<Profile/>
    }
  ]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
