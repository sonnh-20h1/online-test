import React, { Component } from "react";
import { API } from "./API/API";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import axios from "axios";
import "./App.css";
import "./home.css";
import LoginUser from "./components/Login/LoginUser";
import Login_google from "./components/Login/SignUp";
import SignIn from "./components/Login/SignIn";
import MainManage from "./components/Manage/MainManage";
import MainComponents from "./components/MainComponent";

class App extends Component {
  componentDidMount() {
    if (localStorage.getItem("user")) {
      var data = { token: localStorage.getItem("user") };
      axios({
        method: "POST",
        url: `${API}/loading_login`,
        data: data
      })
        .then(json => {
          const { status } = json.data;
          if (status == "error") {
            window.localStorage.removeItem("user");
            window.location.reload();
          }
          console.log(json.data);
        })
        .catch(err => {
          console.error(err);
        });
    }
  }

  render() {
    return (
      <Router>
        <React.Fragment>
          <Switch>
            <Route
              path="/login"
              exact
              render={props => <LoginUser {...props} />}
            />
            <Route path="/login-google" component={() => <Login_google />} />
            <Route path="/sign-in" component={() => <SignIn />} />
            <Route path="/manage" component={MainManage} />
            <Route path="/" component={MainComponents} />
          </Switch>
        </React.Fragment>
      </Router>
    );
  }
}

export default App;
