/* eslint-disable no-unused-vars */
import React, { createContext, useReducer } from 'react'
// !new pages without loading package
// * we use switch to show only that related page
import {Route, Switch} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Register from './components/Register';
import Login from './components/Login';
import Errorpage from './components/Errorpage';
import Logout from './components/Logout';
import { initialState, reducer } from "./reducer/UseReducer";

// *context <API>

export const UserContext = createContext();




const Routing = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>

      <Route exact path="/About">
        <About />
      </Route>

      <Route exact path="/Contact">
        <Contact />
      </Route>

      <Route exact path="/Login">
        <Login />
      </Route>

      <Route exact path="/signup">
        <Register />
      </Route>

      <Route exact path="/Register">
        <Logout />
      </Route>

      <Route exact path="/logout">
        <Logout />
      </Route>


      <Route>
        <Errorpage />
      </Route>
    </Switch>
  );
};
//  !reducer hook
const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <main>
      <UserContext.Provider value={{ state, dispatch }}>
        <Navbar />
        <Routing />
      </UserContext.Provider>
    </main>
  );
};

export default App;

