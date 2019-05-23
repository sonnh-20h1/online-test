import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import axios from "axios";
import { API } from "./../../API/API";
import fakeAuth from "./fakeAuth";
import { LoginWrapper } from "./BaseLogin";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      RedirectToRender: false,
      errors: "",
      txtUser: "",
      txtPass: "",
      UserData: "",
      PassData: ""
    };
  }
  onChange = e => {
    var target = e.target;
    var name = target.name;
    var value = target.value;
    this.setState({
      [name]: value
    });
  };
  onLogin = () => {
    const { txtUser, txtPass } = this.state;
    const {history} = this.props;
    if (txtUser != "" && txtPass != "") {
      var data = {
        Username: txtUser,
        Password: txtPass
      };
      axios({
        method: "POST",
        url: `${API}/Login_User`,
        data: data
      })
        .then(json => {
          const { error } = json.data;
          if (error) {
            this.setState({
              errors: error
            });
          } else {
            localStorage.setItem("user",json.data);
            history.push("/home");
          }
        })
        .catch(err => {
          console.error(err);
        });
    } else {
      this.setState({
        errors: "Vui lòng điền đầy đủ thông tin!"
      });
    }
  };
  render() {
    const { txtUser, txtPass, RedirectToRender } = this.state;
    return (
      <LoginWrapper>
        <section className="login_content MinHeight padTopLogin">
          <div className="Login_title pad-10">
            <h3 className="border-title text_cursive">Đăng nhập</h3>
          </div>
          <div className="pad-10">
            <span className="text_cursive">Username</span>
            <input
              type="text"
              className="form-control pd-cl-10"
              name="txtUser"
              placeholder="Username"
              value={txtUser}
              onChange={this.onChange}
            />
          </div>
          <div className="pad-10">
            <span className="text_cursive">Password</span>
            <input
              type="password"
              className="form-control pd-cl-10"
              name="txtPass"
              placeholder="Password"
              value={txtPass}
              onChange={this.onChange}
            />
          </div>
          <div className="pad-10 btn-10">
            <div>
              <span style={{ color: "red" }}>{this.state.errors}</span>
            </div>
            <button
              onClick={this.onLogin}
              className="btn btn-default submit text_cursive"
            >
              Đăng nhập
            </button>
          </div>
          <div className="text-center pad-10  sign-online">
            <p>Chưa có tài khoản? </p>
            <Link to="/sign-in" className="text_cursive">
              Đăng kí
            </Link>
          </div>
        </section>
      </LoginWrapper>
    );
  }
}

export default Login;
