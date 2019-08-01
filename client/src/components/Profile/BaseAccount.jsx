import React, { Component } from "react";
import { Route, Link } from "react-router-dom";

export const ListMenuItem = () => {
  return (
    <div className="List-menu">
      <div className="dropdown-list">
        <ul>
          <MenuLink
            Lable="Thông tin tài khoản"
            to="/accounts/user"
            active={false}
          />
          <MenuLink
            Lable="Các đề thi đã làm"
            to="/accounts/history"
            active={false}
          />
          <MenuLink
            Lable="Phản hồi trang web"
            to="/accounts/feedback-website"
            active={false}
          />
        </ul>
      </div>
    </div>
  );
};

export function ProfileContainer(props) {
  return (
    <div className="Profile-user">
      <div className="container user-page-container">
        <div className="row user-info">{props.children}</div>
      </div>
    </div>
  );
}

export function WrapContentProfile(props) {
  return (
    <div className="content-right col-md-10">
      <div className="exam-list">
        <div className="section-exam">{props.children}</div>
      </div>
    </div>
  );
}

export const MenuLink = ({ Lable, to, active }) => {
  return (
    <Route
      path={to}
      exact={active}
      children={({ match }) => (
        <li className={match ? "active-account" : ""}>
          <Link to={to}>{Lable}</Link>
        </li>
      )}
    />
  );
};

export function WrapMaxTable(props) {
  return (
    <div className="account-section-content">
      <table className="table table_list">
        <thead>
          <tr>
            {props.columns.map((col, index) => {
              return <th key={index}>{col}</th>;
            })}
          </tr>
        </thead>
        <tbody className="list-user-exam">{props.children}</tbody>
      </table>
    </div>
  );
}
export function WrapTable(props) {
  return (
    <table className="table table-management">
      <thead>
        <tr>
          {props.columns.map((col, index) => {
            return <th key={index}>{col}</th>;
          })}
        </tr>
      </thead>
      <tbody>{props.children}</tbody>
    </table>
  );
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
