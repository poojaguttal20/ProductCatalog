import React, { useEffect, useState } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Signup from "./pages/Signup.jsx";
import Routing from "./pages/Routing";
import Login from "./pages/Login.jsx";
import Admin from "./pages/Admin";
import User from "./pages/User";
import { DataProvider } from "./store/DataStore";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Whislist";
import Home from "./pages/Home";


function App() {
  const [authenticated, setAuthenticated] = useState(!!localStorage.getItem('LoggedInUser'));
  const [user, setUser] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem("LoggedInUser");
    setUser(null);
    setAuthenticated(false);
  };

  useEffect(() => {
    const LoggedInUser = localStorage.getItem("LoggedInUser");
    if (LoggedInUser) {
      setUser(JSON.parse(LoggedInUser));
      setAuthenticated(true);
    }
  }, []);

  const handleLogin = (userData) => {
    localStorage.setItem("LoggedInUser", JSON.stringify(userData));
    setUser(userData);
    setAuthenticated(true);
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Routing user={user} onLogout={handleLogout} />,
      children: [
        {path: "/home", element: <Home/>},
        { path: "/signup", element: <Signup /> },
        { path: "/login", element: <Login onLogin={handleLogin} /> },
        {
          path: "/user",
          element: authenticated ? (
            <User user={user} />
          ) : (
            <Navigate to="/login" />
          ),
        },
        {
          path: "/admin",
          element: authenticated ? (
            <Admin user={user} />
          ) : (
            <Navigate to="/login" />
          ),
        },
        {
          path: "/product/:productId",
          element: authenticated ? (<ProductDetail />) : (<Navigate to="/login" />),
        },
        {
          path: "/cart",
          element: authenticated ? (<Cart />) : (<Navigate to="/login"/>)
        },
        {
          path: "/wish",
          element: authenticated ? (<Wishlist/>) : (<Navigate to="/login"/>)
        },
      ],
    },
  ]);

  return (
    <DataProvider>
      <RouterProvider router={router} />
    </DataProvider>
  );
}

export default App;
