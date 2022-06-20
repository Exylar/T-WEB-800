import React, {useState, useEffect} from 'react';
import useUser from "contexts/user";
import useAuth from "hooks/useAuth";
import {BrowserRouter as Router} from 'react-router-dom';

import Splash from 'Splash';
import Routes from "./Routes";

import 'react-toastify/dist/ReactToastify.css';
import "assets/css/global.css";
import 'assets/css/style.scss';

import AOS from 'aos';

const App = () => {
  useAuth();
  const [ctx] = useUser();

  useEffect(() => {
    AOS.init({
      once: true,
      disable: 'phone',
      duration: 700,
      easing: 'ease-out-cubic',
    });
  });

  return (
    <>
      {ctx.loading ? 
        <Splash /> 
      :
        <Router>
          <Routes />
        </Router>
      }
    </>
  );
}

export default App;


