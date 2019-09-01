import React, { Component } from "react";
import { connect } from "react-redux";
import Pagination from "react-js-pagination";
import { updateStateData } from "./../../actions/index";
import { API } from "./../../API/API";
import {account} from './../../constants/config';
import axios from "axios";
import {
  Breadcrumb,
  TableWrap,
  HeaderTable,
  ContentManage,
  ModalBackground,
  Loading
} from "./BaseManage";
const UserManageContext = React.createContext();

const ContentTable = () => {
  return (
    <React.Fragment>
      <UserManageContext.Consumer>
        {({ mainState, handlePageChange }) => (
          <React.Fragment>
            <TableWrap
              columns={[
                "STT",
                "Email",
                "UserName",
                "Họ tên",
                "Số LT",
                "Số GH",
                "GT",
                "Ngày tạo",
                "Loại TK",
                "Status",
                "Actions"
              ]}
            >
              {mainState.UserManage
                ? mainState.UserManage.map((user, index) => {
                    return (mainState.pageMainNumber - 1) * 20 <= index &&
                      index < mainState.pageMainNumber * 20 ? (
                      <RowTable key={index} user={user} index={index} />
                    ) : (
                      ""
                    );
                  })
                : ""}
            </TableWrap>
            <Pagination
              activePage={mainState.pageMainNumber}
              itemsCountPerPage={20}
              totalItemsCount={
                mainState.UserManage ? mainState.UserManage.length : 0
              }
              pageRangeDisplayed={5}
              onChange={handlePageChange}
            />
          </React.Fragment>
        )}
      </UserManageContext.Consumer>
    </React.Fragment>
  );
};

const RowTable = ({ user, index }) => {
  const {
    IDUSER,
    do_number,
    do_limit,
    LASTNAME,
    FIRSTNAME,
    USERNAME,
    EMAIL,
    affiliate,
    create_on,
    status,
    role_account
  } = user;
  return (
    <React.Fragment>
      <UserManageContext.Consumer>
        {({ onDetailUser }) => (
          <tr>
            <td>{index + 1}</td>
            <td>{EMAIL}</td>
            <td>{USERNAME}</td>
            <td>{FIRSTNAME + " " + LASTNAME}</td>
            <td>{do_number}</td>
            <td>{do_limit}</td>
            <td>{affiliate}</td>
            <td>{create_on}</td>
            <td>{role_account?account.filter((ac) => ac.key == role_account)[0].name:''}</td>
            <td>
              <div className={status == 1 ? "circle green" : "circle red"} />
            </td>
            <td>
              <button
                style={{ padding: "0 5px" }}
                onClick={() => onDetailUser(IDUSER)}
                className="btn btn_primary"
              >
                Chi tiết
              </button>
            </td>
          </tr>
        )}
      </UserManageContext.Consumer>
    </React.Fragment>
  );
};

const UserModalManage = ({ onClick }) => {
  return (
    <ModalBackground
      width={1000}
      onClick={onClick}
      title="Thông tin chi tiết các thành viên"
    >
      <React.Fragment>
        <UserManageContext.Consumer>
          {({ mainState }) => (
            <React.Fragment>
              <p>1/ Thông tin thành viên giới thiệu </p>
              {mainState.UserInformationManage.introduced ? (
                <TableWrap
                  columns={[
                    "Email",
                    "UserName",
                    "Họ tên",
                    "Ngày tạo",
                    "Status"
                  ]}
                >
                  {mainState.UserInformationManage.introduced.map(
                    (info, index) => {
                      return <IntroducedRowTable key={index} info={info} />;
                    }
                  )}
                </TableWrap>
              ) : (
                <p style={{ textAlign: "center" }}>Không có người giới thiệu</p>
              )}

              <p>2/ Thông tin các thành viên đã được bạn giới thiệu</p>
              {mainState.UserInformationManage.affiliate ? (
                <TableWrap
                  columns={[
                    "Email",
                    "UserName",
                    "Họ tên",
                    "Ngày tạo",
                    "Status"
                  ]}
                >
                  {mainState.UserInformationManage.affiliate.map(
                    (info, index) => {
                      return <IntroducedRowTable key={index} info={info} />;
                    }
                  )}
                </TableWrap>
              ) : (
                <p style={{ textAlign: "center" }}>
                  Bạn chưa giới thiệu được thành viên nào
                </p>
              )}
            </React.Fragment>
          )}
        </UserManageContext.Consumer>
      </React.Fragment>
    </ModalBackground>
  );
};

const IntroducedRowTable = ({ info }) => {
  const { create_on, EMAIL, USERNAME, FIRSTNAME, LASTNAME, status } = info;
  return (
    <tr>
      <td>{EMAIL}</td>
      <td>{USERNAME}</td>
      <td>{FIRSTNAME + " " + LASTNAME}</td>
      <td>{create_on}</td>
      <td>
        <div className={status == 1 ? "circle green" : "circle red"} />
      </td>
    </tr>
  );
};

class UserManage extends Component {
  state = {
    status: false
  };

  componentDidMount() {
    this.onShowData();
  }

  async onShowData() {
    var json = await axios({
      method: "POST",
      url: `${API}/display_user`
    }).catch(err => {
      console.error(err);
    });
    if (json.data) {
      this.props.dispatch(
        updateStateData({
          ...this.props.mainState,
          UserManage: json.data,
          pageMainNumber: 1
        })
      );
    }
  }

  handlePageChange = pageNumber => {
    this.props.dispatch(
      updateStateData({
        ...this.props.mainState,
        pageMainNumber: pageNumber
      })
    );
  };

  onDetailUser = id => {
    if (id) {
      this.setState({
        status: true
      });
      this.onShowInfoUser(id);
    }
  };

  onShowInfoUser = async id => {
    var json = await axios({
      method: "POST",
      url: `${API}/GetInfomationUserId`,
      data: { id: id }
    }).catch(err => {
      console.error(err);
    });
    if (json) {
      const { data } = json.data;
      this.props.dispatch(
        updateStateData({
          ...this.props.mainState,
          UserInformationManage: {
            affiliate: data.affiliate.length != 0 ? data.affiliate : "",
            introduced: data.introduced.length != 0 ? data.introduced : ""
          }
        })
      );
    }
  };

  render() {
    const { status } = this.state;
    console.log(this.props.mainState);
    return (
      <React.Fragment>
        <UserManageContext.Provider
          value={{
            dispatch: this.props.dispatch,
            mainState: this.props.mainState,
            handlePageChange: this.handlePageChange,
            onDetailUser: id => this.onDetailUser(id)
          }}
        >
          <div className="table-fx-left">
            <Breadcrumb home={"Manage"} manage={"User Management"} />
            <ContentManage>
              <HeaderTable />
              <ContentTable />
            </ContentManage>
          </div>
          {status ? (
            <UserModalManage
              onClick={() => {
                this.setState({ status: false });
              }}
            />
          ) : (
            ""
          )}
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
