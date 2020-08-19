import React, { Component } from "react";
import "./style.css";
import { Redirect, Route, Switch, Link } from "react-router-dom";

import AccountManage from "./AccountManage";
import UserManage from "./UserManage";
import ExamManage from "./ExamManage";
import SubjectManage from "./SubjectManage";
import LoginManage from "./LoginManage";
import GroupManage from "./GroupManage";
import MessageManage from "./MessageManage";
import FeelBackManage from "./FeelBackManage";
import UploadManage from "./UploadManage";
import FeedBackWebsite from "./FeedBackWebsite";
import { PrivateRoute, MenuManages } from "./BaseManage";
import CodeManage from "./CodeManage";
import PersonManage from "./PersonManage";
import ExamPersonManage from './ExamPersonManage'

const Menus = [
  {
    name: "Thông báo",
    to: "/manage/message",
    icon: "fa fa-bell-o",
    exact: false,
  },
  {
    name: "Người dùng",
    to: "/manage/users",
    icon: "fa fa-users",
    exact: false,
  },
  {
    name: "Chủ đề",
    to: "/manage/subjects",
    icon: "fa fa-address-book-o",
    exact: false,
  },
  {
    name: "Bộ đề thi",
    to: "/manage/exams",
    icon: "fa fa-cubes",
    exact: false,
  },
  {
    name: "Gói đề thi",
    to: "/manage/groups",
    icon: "fa fa-users",
    exact: false,
  },
  {
    name: "Đóng góp",
    to: "/manage/upload-file-question",
    icon: "fa fa-users",
    exact: false,
  },
  {
    name: "Tạo mã",
    to: "/manage/code",
    icon: "fa fa-address-book-o",
    exact: false,
  },
  {
    name: "Danh sách cá nhân",
    to: "/manage/person",
    icon: "fa fa-users",
    exact: false,
  },
  {
    name: "Các đề thi cá nhân",
    to: "/manage/exam-person",
    icon: "fa fa-users",
    exact: false,
  },
];

const ComponentManage = () => {
  return (
    <Switch>
      <PrivateRoute path="/manage/admin" component={AccountManage} />
      <PrivateRoute path="/manage/message" component={MessageManage} />
      <PrivateRoute
        path="/manage/upload-file-question"
        component={UploadManage}
      />
      <PrivateRoute path="/manage/feelback" component={FeelBackManage} />
      <PrivateRoute path="/manage/users" component={UserManage} />
      <PrivateRoute path="/manage/subjects" component={SubjectManage} />
      <PrivateRoute path="/manage/exams" component={ExamManage} />
      <PrivateRoute path="/manage/groups" component={GroupManage} />
      <PrivateRoute
        path="/manage/feelback-website"
        component={FeedBackWebsite}
      />
      <PrivateRoute path="/manage/code" component={CodeManage} />
      <PrivateRoute path="/manage/person" component={PersonManage} />
      <PrivateRoute path="/manage/exam-person" component={ExamPersonManage} />

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
      <Route
        path="/manage/login"
        render={(props) => <LoginManage {...props} />}
      />
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
