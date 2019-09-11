import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { GoogleLogin } from "react-google-login";
import { SignUserRequest } from "./../../actions/index";
import { API_GOOGLE, API } from '../../API/API';
import axios from "axios";
import { updateStateData } from "./../../actions/index";
import './style.css';
class SignIn extends Component {
  responseGoogle = async response => {
    if (window.gapi) {
      const auth2 = window.gapi.auth2.getAuthInstance();
      auth2.disconnect();
    }
    const accessToken = {
      accessToken: response.accessToken,
      ...response.profileObj
    };
    const {history} = this.props;
    var json = await axios({
      method: "POST",
      url: `${API}/login-google/login`,
      data: accessToken
    }).catch(err => {
      console.error(err);
    });
    var responseApi = json.data;
    if (responseApi.status == 'success') {
      localStorage.setItem("token", responseApi.data.token);
      localStorage.setItem("term", responseApi.data.term);
      history.push("/home");
    }

  }
  responseGoogleFail = (response) => {
    console.error(response);
  }
  render() {
    return (
      <div className="loginWrapper">
        <div className="viewWapper">
          <div className="viewLogin">
            <p>
              Test y dược online
          </p>
            <div className="viewWithEmail">
              <div className="viewWithEmailText">Đăng nhập bằng tài khoản google</div>
            </div>
            <div className="viewLoginButton">
              <GoogleLogin
                clientId={API_GOOGLE}
                buttonText=""
                onSuccess={(res) => this.responseGoogle(res)}
                onFailure={(res) => this.responseGoogleFail(res)}
                // cookiePolicy={'single_host_origin'}
                isSignedIn={false}
                autoLoad={false}
                icon={false}
              >
                <i className="fa fa-google-plus" />
              </GoogleLogin>
            </div>
          </div>
        </div>
        <div className="footerTest">
          <p>Test y dược online - Hệ thống thi trắc nghiệm y dược của Test y dược online</p>
        </div>
      </div>
    );
  }
}

export default connect(state => {
  return {
    mainState: state.updateStateData
  };
})(SignIn);
