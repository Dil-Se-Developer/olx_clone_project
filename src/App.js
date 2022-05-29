import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import LoginForm from "./components/FormAuthentication/LoginForm";
import SignUpForm from "./components/FormAuthentication/SignUpForm";
import Home from "./components/layout/Home";
import Post from './components/layout/Post'
import SellCardsDetails from "./components/SellCards/SellCardsDetails";



function App() {

  return (
    <Routes>
      <Route path="/" element={<LoginForm />}></Route>
      <Route path="signup" element={<SignUpForm />}></Route>
      <Route path="home" element={<Home />}></Route>
      <Route path="home/post" element={<Post />}></Route>
      <Route path="home/product/:id" element={<SellCardsDetails />}></Route>
    </Routes>
  )
}

export default App;
