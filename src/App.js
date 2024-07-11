import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import UsersPage from "./pages/UsersPage";
import UserVideosPage from "./pages/UserVideosPage";
import Navbar from "./pages/Navbar";
import PrivateRoute from "./components/security/PrivateRoute";
import OpenRoute from "./components/security/OpenRoute";

const App = () => {
  return (
    <>
      <div>
        <Navbar />
      </div>
      <Routes>
        <Route
          path="/login"
          element={
            <OpenRoute>
              <LoginPage />
            </OpenRoute>
          }
        />
        <Route
          path="/"
          element={
            <OpenRoute>
              <RegisterPage />
            </OpenRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/all-users"
          element={
            <PrivateRoute>
              <UsersPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/users/:firstName/videos"
          element={
            <PrivateRoute>
              <UserVideosPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
};

export default App;
