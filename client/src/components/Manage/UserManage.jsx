import React, { Component } from "react";
import { connect } from "react-redux";
import Pagination from "react-js-pagination";
import { updateStateData } from "./../../actions/index";
import { API } from "./../../API/API";
import axios from "axios";
import {
  Breadcrumb,
  TableWrap,
  HeaderTable,
  ContentManage,
  ModalBackground,
  Loading
} from "./BaseManage";
import { account } from './../../constants/config';
const UserManageContext = React.createContext();

export const Select = ({ name, data, Value, onChange }) => {
  return (
    <div style={{ margin: "0px" }}>
      <select onChange={onChange} name={name} defaultValue={Value}>
        {data
          ? data.map((uni, index) => {
            return (
              <option value={uni.key} key={index}>
                {uni.name}
              </option>
            );
          })
          : ""}
      </select>
    </div>
  );
};

const ContentTable = () => {
  return (
    <React.Fragment>
      <UserManageContext.Consumer>
        {({ mainState, handlePageChange }) => (
          <React.Fragment>
            <TableWrap
              columns={[
                "STT",
                "Avt",
                "Email",
                "Họ tên",
                "Trường",
                "Loại",
                "Số LT",
                "Số GH",
                // "Ngày tạo",
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
    id,
    do_number,
    do_limit,
    name,
    email,
    imageUrl,
    university,
    type,
    term,
    create_on,
    status,
  } = user;
  return (
    <React.Fragment>
      <UserManageContext.Consumer>
        {({ onDetailUser, onChangeSelect }) => (
          <tr>
            <td>{index + 1}</td>
            <td><img src={imageUrl} className="imageUrl" alt="" /></td>
            <td>{email}</td>
            <td>{name}</td>
            <td>{university}</td>
            {/* <td>{ account.filter(ac => ac.key == type)[0].name}</td> */}
            <td>
              <Select
                name="type"
                data={account}
                Value={type}
                onChange={(e) => onChangeSelect(e, id)}
              />
            </td>
            <td>{do_number}</td>
            <td>{do_limit}</td>
            {/* <td>{create_on}</td> */}
            {/* <td>{role_account?account.filter((ac) => ac.key == role_account)[0].name:''}</td>
            <td>
              <div className={status == 1 ? "circle green" : "circle red"} />
            </td> */}
            <td>
              <button
                style={{ padding: "0 5px" }}
                onClick={() => onDetailUser(id)}
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
                    "Avt",
                    "Email",
                    "Họ tên",
                    "Trường",
                    "Ngày tạo"
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
                    "Avt",
                    "Email",
                    "Họ tên",
                    "Trường",
                    "Ngày tạo"
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
  const { create_on, email, university, name, imageUrl } = info;
  return (
    <tr>
      <td><img src={imageUrl} alt="" className="imageUrl" /></td>
      <td>{email}</td>
      <td>{name}</td>
      <td>{university}</td>
      <td>{create_on}</td>
    </tr>
  );
};

class UserManage extends Component {
  state = {
    status: false,
    total: 0
  };

  componentDidMount() {
    this.onShowData();
  }

  async onShowData() {
    var json = await axios({
      method: "GET",
      url: `${API}/login-google/display_user`
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
      this.setState({ total: json.data.length })
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

  onChangeSelect = async (event, id) => {
    const { value } = event.target;
    var json = await axios({
      method: "POST",
      url: `${API}/login-google/updateAccount`,
      data: { id: id, type: value }
    }).catch(err => {
      console.error(err);
    });
    if (json) {
      const { message, status } = json.data;
      alert(message)
    }
  }

  render() {
    const { status, total } = this.state;
    return (
      <React.Fragment>
        <UserManageContext.Provider
          value={{
            dispatch: this.props.dispatch,
            mainState: this.props.mainState,
            handlePageChange: this.handlePageChange,
            onDetailUser: id => this.onDetailUser(id),
            onChangeSelect: this.onChangeSelect
          }}
        >
          <div className="table-fx-left">
            <Breadcrumb home={"Manage"} manage={"User Management"} />
            <ContentManage>
              <p>Tổng số người dùng: {total}</p>
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
