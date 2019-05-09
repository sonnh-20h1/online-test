import React, { Component } from "react";
import { connect } from "react-redux";
import { updateStateData } from "./../../actions/index";
import { API } from "./../../API/API";
import axios from "axios";
import { Breadcrumb } from "./BaseManage";

const UserManageContext = React.createContext();

const HeaderTable = () => {
  return (
    <div className="table_title">
      <div className="title-box row-title">
        <h2 className="header-title" />
        <div className="title-add">
          <button className="btn btn_primary">Thêm thông tin</button>
        </div>
      </div>
    </div>
  );
};
const ContentTable = () => {
  return (
    <table className="table table-management">
      <thead>
        <tr>
          <th>STT</th>
          <th>Email</th>
          <th>UserName</th>
          <th>Firstname</th>
          <th>Lastname</th>
          <th>Status</th>
          <th>TN</th>
        </tr>
      </thead>
      <tbody>
        <UserManageContext.Consumer>
          {({ mainState }) => (
            <React.Fragment>
              {mainState.UserManage
                ? mainState.UserManage.map((user, index) => {
                    return <RowTable key={index} user={user} index={index} />;
                  })
                : ""}
            </React.Fragment>
          )}
        </UserManageContext.Consumer>
      </tbody>
    </table>
  );
};
const RowTable = ({ user, index }) => {
  const { IDUSER, LASTNAME, FIRSTNAME, USERNAME, EMAIL, status } = user;
  return (
    <tr>
      <td>{index + 1}</td>
      <td>{EMAIL}</td>
      <td>{USERNAME}</td>
      <td>{FIRSTNAME}</td>
      <td>{LASTNAME}</td>
      <td>{status == 1 ? "Hoạt động" : "Chặn"}</td>
      <td>
        <button className="btn btn_primary">Chi tiết</button>
      </td>
    </tr>
  );
};
export const ContentManage = () => {
  return (
    <div className="content-table">
      <div className="table-box">
        <HeaderTable />
        <ContentTable />
      </div>
    </div>
  );
};

function ModalBackground(props ) {
  return (
    <div className="modal-manage">
      <div className="modal_backdrop show" />
      <div className="modal-main">
        <div className="modal_box">
          <div className="modal_header row-title">
            <div className="modal_title">
              <p>Thông tin chi tiết</p>
            </div>
            <div className="modal_close">
              <span>X</span>
            </div>
          </div>
          <div className="modal-container">
            <div className="modal_table">{props.children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ModalManage = () => {
  return (
    <ModalBackground>
      <div className="table_title">
        <div className="title-box">
          <div className="title-add">
            <button className="btn btn_primary">Thêm thông tin</button>
          </div>
        </div>
      </div>
      <ContentTable />
    </ModalBackground>
  );
};

class UserManage extends Component {
  componentDidMount() {
    axios({
      method: "POST",
      url: `${API}/display_user`
    })
      .then(json => {
        this.props.dispatch(
          updateStateData({
            ...this.props.mainState,
            UserManage: json.data
          })
        );
      })
      .catch(err => {
        console.error(err);
      });
  }
  render() {
    return (
      <React.Fragment>
        <UserManageContext.Provider
          value={{
            dispatch: this.props.dispatch,
            mainState: this.props.mainState
          }}
        >
          <div className="table-fx-left">
            <div>
              <Breadcrumb home={"Manage"} manage={"User Management"} />
              <ContentManage />
            </div>
          </div>
          {/* <ModalManage /> */}
        </UserManageContext.Provider>
      </React.Fragment>
    );
  }
}
export default connect(state => {
  return {
    mainState: state.updateStateData
  };
})(UserManage);
