import React, { Component } from "react";
import "./App.css";

// React Router Setup
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Redux
import { Provider } from "react-redux";
import store from "./store";
import Navbar from "./layout/Navbar";
import ProgressBar from "./UI/ProgressBar";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <div className="container">
              <ProgressBar load={true} />
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}
export default App;
