import React, { Component } from "react";
import "./style.css";
import { Redirect, Route, Switch, Link } from "react-router-dom";
import { connect } from "react-redux";
import { updateStateData } from "./../../actions/index";
import { API } from "./../../API/API";
import ReactLoading from "react-loading";
import axios from "axios";
import UserManage from "./UserManage";
import ExamManage from "./ExamManage";
import SubjectManage from "./SubjectManage";
import LoginManage from "./LoginManage";
import {PrivateRoute} from './BaseManage';

const Menus = [
  {
    name: "Dashboard",
    to: "/manage/dashboard",
    icon: "fa fa-bell-o",
    exact: false
  },
  {
    name: "Users",
    to: "/manage/users",
    icon: "fa fa-users",
    exact: false
  },
  {
    name: "Subjects",
    to: "/manage/subjects",
    icon: "fa fa-address-book-o",
    exact: false
  },
  {
    name: "Exams",
    to: "/manage/exams",
    icon: "fa fa-cubes",
    exact: false
  }
];

const MenuLink = ({ Label, to, active, icon }) => {
  return (
    <Route
      path={to}
      exact={active}
      children={({ match }) => (
        <li className={match ? "active" : ""}>
          <Link to={to}>
            <i className={icon} />
            {Label}
          </Link>
        </li>
      )}
    />
  );
};
export const MenuManages = ({ menus }) => {
  return (
    <div className="row-menu">
      <ul>
        {menus.map((item, index) => {
          return (
            <MenuLink
              key={index}
              Label={item.name}
              icon={item.icon}
              to={item.to}
            />
          );
        })}
      </ul>
    </div>
  );
};
const ComponentManage = () => {
  return (
    <Switch>
      <PrivateRoute path="/manage/users" component={UserManage} />
      <PrivateRoute path="/manage/subjects" component={SubjectManage} />
      <PrivateRoute path="/manage/exams" component={ExamManage} />
      <Redirect to="/manage/users" />
    </Switch>
  );
};
const AdminManage = () => {
  return (
    <React.Fragment>
      <HeaderManage />
      <ContentManage />
    </React.Fragment>
  );
};
const BoxManage = () => {
  return (
    <Switch>
      <Route path="/manage/login" render={props => <LoginManage {...props}/>} />
      <Route path="/manage" component={AdminManage} />
    </Switch>
  );
};
const ContentManage = () => {
  return (
    <div className="content-manage">
      <div className="row-content grid-main">
        <div className="column-left">
          <MenuManages menus={Menus} />
        </div>
        <div className="column-right">
          <ComponentManage />
        </div>
      </div>
    </div>
  );
};
const HeaderManage = () => {
  return (
    <div className="header-manage">
      <p>Header</p>
    </div>
  );
};

class MainManage extends Component {
  render() {
    return (
      <div className="main-manage">
        <BoxManage />
      </div>
    );
  }
}

export default MainManage;
