import React, { Component } from "react";
import { Route, Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  Dropdown,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle
} from "reactstrap";
import fakeAuth from "./../Login/fakeAuth";

const menus = [
  {
    name: "Trang Chủ",
    to: "/home",
    exact: false
  },
  {
    name: "Chủ đề",
    to: "/chu-de-trac-nghiem",
    exact: false
  },
  {
    name: "Đóng góp",
    to: "/upload-question",
    exact: false
  }
];
class Profile extends Component {
  state = {
    showhide: false
  };
  Logout = () => {
    const { history } = this.props;
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("term");
    fakeAuth.signout(() => history.push("/login-google"));
  };
  show = () => {
    this.setState({
      showhide: !this.state.showhide
    });
  };
  render() {
    var { showhide } = this.state;
    return (
      <div className="header_profile">
        <Dropdown isOpen={showhide} toggle={this.show}>
          <DropdownToggle caret nav>
            <div className="icon_toggle">
              <i className="glyphicon glyphicon-user" />
            </div>
          </DropdownToggle>
          <DropdownMenu right>
            <div className="ans_quick_link_user">
              <Link to={`/accounts/user`}>Thông tin cá nhân</Link>
              <a type="primary" onClick={this.Logout}>
                {" "}
                Đăng xuất
              </a>
            </div>
          </DropdownMenu>
        </Dropdown>
      </div>
    );
  }
}
function isLogged() {
  var status = false;
  if (localStorage.getItem("token")) {
    status = true;
  }
  return status;
}
const AuthButton = withRouter(({ history }) =>
  isLogged() === true ? (
    <Profile history={history} />
  ) : (
    <li>
      <Link to="/login">Sign in</Link>
    </li>
  )
);
const MenuLink = ({ Label, to, active }) => {
  return (
    <Route
      path={to}
      exact={active}
      children={({ match }) => (
        <li className={match ? "active" : ""}>
          <Link to={to}>{Label}</Link>
        </li>
      )}
    />
  );
};

class MenuItemHeader extends Component {
  ShowMenu = menus => {
    var result = null;
    if (menus.length > 0) {
      result = menus.map((menu, index) => {
        return (
          <MenuLink
            key={index}
            Label={menu.name}
            to={menu.to}
            active={menu.exact}
          />
        );
      });
    }
    return result;
  };
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-2 menu-logo">
            <h3>Online test</h3>
          </div>
          <div className="col-md-10 menu-main grid_menu">
            <ul>{this.ShowMenu(menus)}</ul>
            <AuthButton />
          </div>
        </div>
      </div>
    );
  }
}

class Menu extends Component {
  render() {
    return (
      <div className="menu test-online">
        <MenuItemHeader />
        {/* <MenuItemLeft /> */}
      </div>
    );
  }
}
export default Menu;
