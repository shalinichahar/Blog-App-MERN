import React, { useState, useEffect } from "react";
import { RouterProvider, createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

// Components
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Dashboard from "./components/Dashboard";
import Error from "./components/Error";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AddBlog from "./components/AddBlog"; // Import AddBlog component
import EditBlog from "./components/EditBlog"; // Import EditBlog component
import BlogList from "./components/BlogList"; // Import BlogList component
import ViewBlog from "./components/ViewBlog"; // Import ViewBlog component


// Function to check if user is authenticated
const checkAuth = async (setIsAuthenticated) => {
  try {
    const res = await fetch("http://localhost:5000/api/users/auth/verify", {
      method: "GET",
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });

    const parseRes = await res.json();
    console.log(`parseRes: ${parseRes}`);  //jwt token is valid

    setIsAuthenticated(parseRes === true);
  } catch (err) {
    console.error(err.message);
    setIsAuthenticated(false);
  }
};

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuth(setIsAuthenticated);
  }, []);

  const setAuth = boolean => {
    setIsAuthenticated(boolean);
  };

  const AppLayout = () => {
    return(
        
        <> 
            <Header/>
            <Outlet/>
            <Footer/>     
        </>    
    );
  };

  return (
    <>
      <RouterProvider router={createBrowserRouter(
        [
          { 
            path: "/",
            element: isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
          },
          {
            path: "/login",
            element: !isAuthenticated ? <Login setAuth={setAuth} /> : <Navigate to="/dashboard" />,
            errorElement: <Error />
          },
          {
            path: "/signup",
            element: !isAuthenticated ? <SignUp setAuth={setAuth} /> : <Navigate to="/login" />,
          },
          {
            path: "/dashboard",
            element: isAuthenticated ? <Dashboard setAuth={setAuth} /> : <Navigate to="/login" />,
            errorElement: <Error />
          },
          {
            path: "/add-blog",
            element: isAuthenticated ? <AddBlog /> : <Navigate to="/login" />,
            errorElement: <Error />
         },
         {
            path: "/edit-blog/:id",
            element: isAuthenticated ? <EditBlog /> : <Navigate to="/login" />,
            errorElement: <Error />
         },
         {
            path: "/blogs",
            element: isAuthenticated ? <BlogList /> : <Navigate to="/login" />,
            errorElement: <Error />
         },
         {
            path: "/view-blog/:id",
            element: isAuthenticated ? <ViewBlog /> : <Navigate to="/login" />,
            errorElement: <Error />
         },
        ]
      )} />
    </>
  );
};

export default App;
