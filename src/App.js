import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import LoginForm from "./components/FormAuthentication/LoginForm";
import SignUpForm from "./components/FormAuthentication/SignUpForm";
import Home from "./components/layout/Home";
import Post from './components/layout/Post'
import SellCardsDetails from "./components/SellCards/SellCardsDetails";
import ToggleButton from './components/ToggleMode/ToggleButton'
import {ProtectedRoutes , ProtectedHome} from "./ProtectedRoutes";
import Footer from "./components/UI/Footer";



function App() {

  const [isLoggedIn,setLoggedIn] = useState(false)
  const [isNavigateHome, setNavigateHome] = useState(true)

  const logIn = () => {
    setLoggedIn(true)
    setNavigateHome(false)
    console.log(`for home authentication ${isNavigateHome}`);
  }

  const logOut = () => {
    setLoggedIn(false)
    setNavigateHome(true)
  }
  
  return (
    <>
      <Routes>
        <Route element={<ProtectedHome isAuthenticated = {isNavigateHome}/> }>
          <Route path="/" element={<LoginForm handleLogin = {logIn} />}></Route>
          <Route path="signup" element={<SignUpForm handleLogin = {logIn}/>}></Route>
        </Route>  
        <Route element={<ProtectedRoutes isAuthenticated = {isLoggedIn} />}>
          <Route path="home" element={<Home handleLogout = {logOut} />}></Route>
          <Route path="home/post" element={<Post />}></Route>
          <Route path="home/product/:id" element={<SellCardsDetails />}></Route>
        </Route>
      </Routes>
      <ToggleButton />
      <Footer />
    </>
  )
}

export default App;
