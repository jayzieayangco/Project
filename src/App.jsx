import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/login/Login";
import Records from "./pages/records/Records";
import Register from "./pages/login/Register";
import AuthGuard from "./pages/Authguard";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <BrowserRouter>
      <AuthGuard>
        <Toaster />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/records" element={<Records />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </AuthGuard>
    </BrowserRouter>
  );
}

export default App;
