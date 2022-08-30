import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavbarComponent from "./components/NavbarComponent";
import Home from "./pages/Home";
import Sukses from "./pages/Sukses";

export default class App extends Component{
  render(){
    return(
      <Router>
        <NavbarComponent />
          <main>
            <Routes>
              <Route exact path="/" element={<Home/>} />
              <Route exact path="/sukses" element={<Sukses/>} />
            </Routes>
          </main>
      </Router>
    )
  }
}