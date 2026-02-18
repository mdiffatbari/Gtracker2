import React from 'react';
import {
  createBrowserRouter,
} from "react-router";
import Root from '../pages/Root/Root';
import Home from '../pages/Home/Home';
import ErrorPage from '../pages/ErrorPage/ErrorPage';
import AuthLayout from '../components/AuthLayout/AuthLayout';
import LogIn from '../pages/LogIn/LogIn';
import Register from '../pages/Register/Register';
import Dashboard from '../pages/Dashboard/Dashboard';
import MyTasks from '../pages/MyTasks/MyTasks';
import CompletedTasks from '../pages/CompletedTasks/CompletedTasks';
export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        index: true,
        path: "/",
        Component: Home
      },
      {
        path: "/dashboard",
        Component: Dashboard
      },
      {
        path: "/myTasks",
        Component: MyTasks
      },
      {
        path: "/completedTasks",
        Component: CompletedTasks
      },
      {
        path: "/auth",
        Component: AuthLayout,
        children: [
          {
            path: "/auth/login",
            Component: LogIn,
          },
          {
            path: "/auth/register",
            Component: Register
          }
        ]
      }
    ]
  },
]);