import React, { Component } from "react";
import "./App.css";

// checking if login
import jwt_decode from "jwt-decode";

// React Router Setup
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "./components/common/PrivateRoute";

// Redux
import { Provider } from "react-redux";
import store from "./store";

// Components
import Navbar from "./components/layout/Navbar";
import ProgressBar from "./components/UI/ProgressBar";
import AdminLogin from "./components/auth/AdminLogin";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <ProgressBar load={false} />
            <Route exact path="/admin-login" component={AdminLogin} />
          </div>
        </Router>
      </Provider>
    );
  }
}
export default App;
