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
import LoginGoogle from "./components/Login/SignUp";
import SignIn from "./components/Login/SignIn";
import MainManage from "./components/Manage/MainManage";
import MainComponents from "./components/MainComponent";
import Term from "./components/Home/Term";

class App extends Component {
  componentDidMount() {
    if (localStorage.getItem("token")) {
      var data = { token: localStorage.getItem("token") };
      axios({
        method: "POST",
        url: `${API}/login-google/loadingLogin`,
        data: data
      })
        .then(json => {
          const { status,data } = json.data;
          if (status == "error") {
            window.localStorage.removeItem("token");
            window.localStorage.removeItem("term");
          }else{
            localStorage.setItem("term", data.term);
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
            <Route path="/login" render={props => <LoginUser {...props} />} />
            
            <Route
              path="/login-google"
              exact
              render={props => <LoginGoogle {...props} />}
            />
            <Route
              path="/term"
              render={props => <Term {...props} />}
            />
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
