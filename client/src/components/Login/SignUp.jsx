import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { GoogleLogin } from "react-google-login";
import { SignUserRequest } from "./../../actions/index";
class SignIn extends Component {
  responseGoogle = (response) =>{
    console.log(response)
  }
  render() {
    return (
      <div className="login_wrapper">
        <div className="max-wrapper">
          <div className="Login_banner row">
            <div className="background_left col-md-6">
              <div className="background MinHeight">
                <section className="login_content magTop20">
                  <div className="Login_title pad-10">
                    <h3 className="border-title text_cursive">Đăng nhập</h3>
                  </div>
                  <div className="Sign-name">
                    <GoogleLogin
                      clientId="886364506765-uanfnejqohmsfu34sajaukpttne1dvj1.apps.googleusercontent.com"
                      buttonText="Login"
                      onSuccess={(res) => this.responseGoogle(res)}
                      onFailure={(res) => this.responseGoogle(res)}
                    />
                  </div>
                </section>
              </div>
            </div>
            <div className="background_right col-md-6">
              <section className="login_content magTop20">
                <div className="Login_title pad-10">
                  <h3 className="border-title text_cursive">Đăng kí</h3>
                </div>
                <div className="Sign-name">
                  <p>
                    Nếu bạn chưa có tài khoản thì vui lòng đăng kí ở phía dưới
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SignIn;
