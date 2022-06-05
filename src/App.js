import Modal from 'react-modal';
import React from "react";
import Home from "./component/Home";
import Navbar from "./component/Navbar";
import About from "./component/About";
import NoteState from "./context/notes/NoteState";
import Login from './component/Login';
import AuthState from './context/authentication/AuthState';
import AlertState from './context/Alert/AlertState';


import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Alert from "./component/Alert";
import SignUp from './component/SignUp';

Modal.setAppElement('#root');



function App() {
 
  return (
    
    <>
    <AlertState>
    <AuthState>
      <NoteState>
        <Router>
          <Navbar />
          <Alert/>
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
            <Routes>
              <Route path="/about" element={<About />} />
            </Routes>
            <Routes>
              <Route path="/login" element={<Login />} />
            </Routes>
            <Routes>
              <Route path="/sign-up" element={<SignUp />} />
            </Routes>
          </div>
        </Router>
      </NoteState>
      </AuthState>
      </AlertState>
    </>



  );
}

export default App;
