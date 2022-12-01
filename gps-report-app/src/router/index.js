import { createBrowserRouter } from "react-router-dom";

import Home from "../views/Home";
import Detail from "../views/Detail";
import Login from "../views/Login";
import Register from "../views/Register";
import PrivateRoute from "../components/PrivateRoute";
import PageLayout from "../components/PageLayout";

const router = createBrowserRouter([
  {
    element: <PrivateRoute />,
    children: [
      {
        element: <PageLayout />,
        children: [
          {
            path: "/",
            element: <Home />,
          },
          {
            path: "/:id",
            element: <Detail />,
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

export default router;
