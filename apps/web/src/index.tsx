import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ReportForm from "./pages/ReportForm";
import "./index.css";
// import demoAuthRouter from "./routes/demoAuth";

/**
 * Entry point for the web application.
 * - Sets up React Router for navigation.
 * - Renders the root component into the DOM.
 */

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/report-form" element={<ReportForm />} />
        <Route path="*" element={<Dashboard />} />
      </Routes>
    </Router>
  );
};
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
