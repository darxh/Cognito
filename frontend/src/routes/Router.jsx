import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import App from "../App.jsx";
import Login from "../pages/Login.jsx";
import Signup from "../pages/Signup.jsx";
import AuthLayout from "../components/AuthLayout.jsx"; // Import the wrapper

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

        {/* Wrap Login in AuthLayout */}
        <Route 
          path="/login" 
          element={
            <AuthLayout>
              <Login />
            </AuthLayout>
          } 
        />

        {/* Wrap Signup in AuthLayout */}
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