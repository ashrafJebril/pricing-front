import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "./store";
import Login from "./pages/Login";
import DashboardLayout from "./components/Layout/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/products/productsList";

import Users from "./pages/users/Users";
import AddUsers from "./pages/users/AddUsers";
import AddProduct from "./pages/products/addProduct";
import Customers from "./pages/customers/customersList";
import AddCustomer from "./pages/customers/customersAdd";
import GenerateQuote from "./pages/qoutes/generateQuote";

import EditUser from "./pages/users/EditUser";
import "primereact/resources/themes/saga-blue/theme.css"; // Choose your theme
import "primereact/resources/primereact.min.css"; // Core CSS
import "primeicons/primeicons.css";
import { ToastProvider } from "./hooks/toast";

function PrivateRoute({ children }) {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return isAuthenticated ? children : <Navigate to="/login" />;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        }
      >
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="users" element={<Users />} />
        <Route path="users/add-user" element={<AddUsers />} />
        <Route path="users/edit-user" element={<EditUser />} />
        <Route path="products/add-product" element={<AddProduct />} />
        <Route path="products" element={<Products></Products>} />
        <Route path="customers" element={<Customers />} />
        <Route path="quotes" element={<GenerateQuote />} />

        <Route path="customers/add-customer" element={<AddCustomer />} />

        <Route path="settings" element={<div>Settings Page</div>} />
      </Route>
    </Routes>
  );
}

function App() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);

  useEffect(() => {
    dispatch.auth.loadAuthFromStorage();
  }, [dispatch]);

  if (loading) {
    // Show a loading spinner or blank screen until auth state is initialized
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <ToastProvider>
        <AppRoutes />
      </ToastProvider>
    </BrowserRouter>
  );
}

// Ensure RootApp remains the same

function RootApp() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

export default RootApp;
