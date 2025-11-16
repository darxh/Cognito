import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import App from "../App.jsx";
import Login from "../pages/Login.jsx";
import Signup from "../pages/Signup.jsx";
import AuthLayout from "../components/AuthLayout/AuthLayout"; 

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/login" replace />;
  return children;
}

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <App />
            </ProtectedRoute>
          }
        />

        <Route 
          path="/login" 
          element={
            <AuthLayout>
              <Login />
            </AuthLayout>
          } 
        />

        <Route 
          path="/signup" 
          element={
            <AuthLayout>
              <Signup />
            </AuthLayout>
          } 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;