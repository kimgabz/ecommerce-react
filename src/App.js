import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import Header from './components/navigation/Header';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Home from './pages/Home';
import RegisterComplete from "./pages/auth/RegisterComplete";

const App = () => {
  return (
    <>
      <Header/>
      <ToastContainer/>
      <Switch>
        <Route exact path="/register/complete" component={RegisterComplete} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route exact path="/" component={Home} />
      </Switch>
    </>
  );
};

export default App;
