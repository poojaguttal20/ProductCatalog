import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import './App.css';
import Signup from './pages/Signup.jsx';
import Routing from './pages/Routing';
import Login from './pages/Login.jsx';
import Admin from './pages/Admin';
import User from './pages/User';
import { useEffect, useState } from 'react';
 
function App() {
  const [authenticated, setAuthenticated] = useState(false);
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
      path: '/',
      element: <Routing user={user} onLogout={handleLogout} />,
      children: [
        { path: '/signup', element: <Signup /> },
        { path: '/login', element: <Login onLogin={handleLogin} /> },
        { path: '/user', element: authenticated ? <User user={user}/> : <Navigate to="/login" /> },
        { path: '/admin', element: authenticated ? <Admin user={user}/> : <Navigate to="/login" /> },
      ]
    }
  ]);
 
  return (
    <RouterProvider router={router} />
  );
}
 
export default App;

