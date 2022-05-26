import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import LoginForm from "./components/form_authentication/LoginForm";
import SignUpForm from "./components/form_authentication/SignUpForm";

function App() {
  return (
    <Routes>
      <Route path="/" element={<SignUpForm />}></Route>
      <Route path="login" element={<LoginForm />}></Route>
    </Routes>
  )
}

export default App;
