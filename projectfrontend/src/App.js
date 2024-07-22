import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Profile from "./pages/profile/Profile";
import Login from "./pages/authPages/login/Login";
import AuthRoute from "./pages/authPages/login/AuthRoute";
import PrivateRoute from "./pages/PrivateRoute";
import Home from "./pages/home/Home";
import Reels from "./pages/reels/Reels";
import Search from "./pages/search/Search";
import DefaultComponent from "./pages/default/DefaultComponent";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CreatePost from "./pages/createPost/CreatePost";

function App() {
  const router = createBrowserRouter([
    {
      path: "/login",
      element: (
        <AuthRoute>
          <Login />
        </AuthRoute>
      ),
    },
    {
      path: "",
      element: (
        <PrivateRoute>
          <Home />
        </PrivateRoute>
      ),
      children: [
        {
          path:"reels",
          element:<Reels/>,
          /* children:[
            {
              path:"create-post",
              element:<CreatePost/>
            }
        background:"red"
          ], */
        },
        {
          path: "profile/:id",
          element: <Profile />,
        },
        {
          path: "search",
          element: <Search />,
        },
        {
          path:"create-post",
          element: <CreatePost/>
        }
      ],
    },
    {
      path:"*",
      element: <DefaultComponent/>
    }
  ]);
  return (
    <div>
      <RouterProvider router={router}/>
      <ToastContainer position="top-right" />
    </div>
  );
}

export default App;
