import React from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register"
import './App.css';

function App() {
  return (
    <Router>
        <Navbar />
        <br/>
        <Route path="/" exact component={Login}/>
        <Route path="/login" exact component={Login}/>
        <Route path="/register" exact component={Register}/>
    </Router>
  );
}

export default App;
