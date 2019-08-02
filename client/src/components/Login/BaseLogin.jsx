import React, { Component } from "react";
import { Redirect, Link, Route } from "react-router-dom";
import fakeAuth from "./fakeAuth";

function isLogged() {
  return !!localStorage.getItem("user");
}

export function ModalBackground(props) {
  return (
    <div className="modal-manage">
      <div className="modal_backdrop show" onClick={() => props.onClick()} />
      <div className="modal-main">
        <div className="modal_box" style={{ width: "" + props.width + "px" }}>
          <div className="modal_header row-title">
            <div className="modal_title">
              <p>{props.title}</p>
            </div>
            <div className="modal_close">
              <span onClick={() => props.onClick()}>Đóng</span>
            </div>
          </div>
          <div className="modal-container">
            <div className="modal_table">{props.children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      return isLogged() === true ? (
        <Component {...props} />
      ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        );
    }}
  />
);
export function LoginWrapper(props) {
  return (
    <div className="login_wrapper">
      <div className="max-wrapper">
        <div className="Login_banner row">
          <div className="background_left col-md-6">
            <div className="background_image MinHeight">
              <div className="background_border">
                <div className="left-text text-position padTopLogin">
                  <h3>Chưa có tài khoản?</h3>
                  <p>
                    Tạo một tài khoản bạn phải nhấp vào bên dưới vào nút đăng ký
                    lớn. Sau đó, nó sẽ mở trang đăng kí{" "}
                  </p>
                  <button>
                    <Link to="/sign-in"> Đăng kí</Link>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="background_right col-md-6">{props.children}</div>
        </div>
      </div>
    </div>
  );
}
