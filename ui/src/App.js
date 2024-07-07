import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import Dashboard from "./scenes/Dashboard";
import Layout from "./scenes/Layout";
import Login from "./scenes/Login";
import Register from "./scenes/Register";
import Customers from "./scenes/Customers";
import Assets from "./scenes/Assets";
import Transports from "./scenes/Transports";
import NotFound from "./scenes/NotFound";
import Moves from "./scenes/Moves";
import Orders from "./scenes/Orders";
import Allocate from "./scenes/Allocate";
import Transactions from "./scenes/Transactions";
import Reports from "./scenes/Reports";
import Fuel from "./scenes/Fuel";
import Admin from "./scenes/Admin";
import Expenses from "./scenes/Expenses";
import FuelOrder from "./scenes/FuelOrder";
import Home from "./scenes/Home";

function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <div className="App">
      <Router>
        <CssBaseline />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route
            element={
              <ThemeProvider theme={theme}>
                <Layout />
              </ThemeProvider>
            }
          >
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/assets" element={<Assets />} />
            <Route path="/transport" element={<Transports />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/moves/:id" element={<Moves />} />
            <Route path="/transactions/" element={<Transactions />} />
            <Route path="/allocate/:id" element={<Allocate />} />
            <Route path="/overview" element={<Reports />} />
            <Route path="/fuel" element={<Fuel />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/expenses" element={<Expenses />} />
            <Route path="/fuel_order/:id" element={<FuelOrder />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
