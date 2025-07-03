import { createBrowserRouter } from "react-router";
import Layout from "../Layouts/Layout";
import AuthLayout from "../Layouts/AuthLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import PrivateRoute from "../routes/PrivateRoute";
import SendParcel from "../pages/SendParcel/SendParcel";
import DashboardLayout from "../Layouts/DashboardLayout";
import MyParcels from "../pages/Backend/MyParcels";
import Body from "../pages/Backend/Body";
import Payment from "../pages/Backend/Payment/Payment";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "sendparcel",
        element: (
          <PrivateRoute>
            <SendParcel />
          </PrivateRoute>
        ),
        loader: () => fetch("./warehouses.json"),
      },
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
    ],
  },
    {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>,
      </PrivateRoute>
    ),
    children: [
            {
        index: true,
        Component: Body,
      },
      {
        path: 'myparcels',
        Component: MyParcels,

      }
      ,
      {
        path: 'payment/:id',
        Component: Payment,

      }
    ],
  },

]);
