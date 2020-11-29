import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Nav from './Nav';
import Register from './Register';
import Login from './Login';
import Dashboard from './Dashboard';

function App() {
  return (
    <div>
      <Router>
        <Nav />

        <Route exact path="/">
        <Login />
        </Route>

        <Route path="/register">
        <Register />
        </Route> 

        <Route path="/dashboard">
        <Dashboard />
        </Route>
        
       </Router>
    </div>
  );
}

export default App;
