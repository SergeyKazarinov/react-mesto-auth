import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import ProtectedRoute from "./components/ProtectedRoute";
import Register from './components/Register';
import Login from './components/Login';
import InfoTooltip from './components/popup/InfoTooltip';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  //<React.StrictMode>
  <div className="page">
    <BrowserRouter>
      <Switch>
        <ProtectedRoute exact path="/" loggedIn={true} component={App} />
        <Route path="/sign-up">
          <Register />
          <InfoTooltip name="info" isOpen={false} isRegistration={true}/>
        </Route>
        <Route path="/sign-in">
          <Login />
        </Route>
      </Switch>
    </BrowserRouter>
  </div>
  //</React.StrictMode>
      
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
