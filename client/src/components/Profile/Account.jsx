import React, { Component } from "react";
import Pagination from "react-js-pagination";
import { connect } from "react-redux";
import axios from "axios";
import './style.css';
import userImage from "./../../img/user.svg";
import { updateStateData } from "./../../actions/index";
import { API } from "./../../API/API";
import HistoryAccount from "./HistoryAccount";
import FeedBackAccount from "./FeedBackAccount";
import {
  WrapContentProfile,
  MenuLink,
  ProfileContainer,
  ListMenuItem,
  WrapTable,
  ModalBackground
} from "./BaseAccount";

const AccountContext = React.createContext();

const WrapMenuProfile = () => {
  return (
    <React.Fragment>
      <AccountContext.Consumer>
        {({ ProfileUser }) => (
          <div className="menu-left col-md-2">
            <div className="account-infomation">
              <div className="user-image">
                <img src={ProfileUser.imageUrl} alt="" />
              </div>
            </div>
            <ListMenuItem />
          </div>
        )}
      </AccountContext.Consumer>
    </React.Fragment>
  );
};

const ContentTableAlowExam = () => {
  return (
    <React.Fragment>
      <AccountContext.Consumer>
        {({ ProfileUser }) => (
          <React.Fragment>
            {ProfileUser.groups ? (
              <div>
                {ProfileUser.groups.length !== 0 ?
                  <WrapTable
                    columns={[
                      "STT",
                      "Tên nhóm",
                      "Email",
                      "Số lượt thi",
                      "Đã thi",
                      "Ngày vào",
                      "Đề thi"
                    ]}
                  >
                    {ProfileUser.groups.map((group, index) => {
                      return (
                        <RowTableGroup key={index} index={index} group={group} />
                      );
                    })}
                  </WrapTable> : <p>Bạn chưa tham gia nhóm nào</p>}
              </div>
            ) : ''}
          </React.Fragment>
        )}
      </AccountContext.Consumer>
    </React.Fragment>
  );
};

const RowTableGroup = ({ group, index }) => {
  const { id, name, email, doing, limit, create_on } = group;
  return (
    <React.Fragment>
      <AccountContext.Consumer>
        {({ onClickView }) => (
          <tr>
            <td>{index + 1}</td>
            <td>{name}</td>
            <td>{email}</td>
            <td>{limit}</td>
            <td>{doing}</td>
            <td>{create_on}</td>
            <td>
              <button
                style={{ padding: "0 5px" }}
                onClick={() => onClickView(id)}
                className="btn btn_primary"
              >
                xem
              </button>
            </td>
          </tr>
        )}
      </AccountContext.Consumer>
    </React.Fragment>
  );
};

const UserText = () => {
  return (
    <React.Fragment>
      <AccountContext.Consumer>
        {({ ProfileUser }) => (
          <div>
            <div className="account-section-header">
              <p>Thông tin tài khoản</p>
            </div>
            <div className="account-user-content row">
              <div className="col-md-6">
                <p>
                  Họ tên:{" "}
                  <span>
                    {ProfileUser.name}
                  </span>
                </p>
              </div>
              <div className="col-md-6">

              </div>
              <div className="col-md-12">
                <p>
                  Email: <span>{ProfileUser.email}</span>
                </p>
              </div>
              <div className="col-md-6">
                <p>
                  {" "}
                  Tổng Số lượt thi: <span>{ProfileUser.do_limit}</span>
                </p>
              </div>
              <div className="col-md-6">
                <p>
                  Số lượt đã thi: <span>{ProfileUser.do_number}</span>
                </p>
              </div>
            </div>
          </div>
        )}
      </AccountContext.Consumer>
    </React.Fragment>
  );
};

const ExamModalTable = ({ onClick }) => {
  return (
    <ModalBackground width={1000} onClick={onClick} title="Chi tiết các đề">
      <WrapTable
        columns={[
          "STT",
          "Mã đề thi",
          "Tên đề",
          "Môn",
          "Số câu",
          "Thời gian",
          "Ngày thêm"
        ]}
      >
        <AccountContext.Consumer>
          {({ mainState }) => (
            <React.Fragment>
              {mainState.ListAccountExam
                ? mainState.ListAccountExam.map((ae, index) => {
                  return <ExamRowTable key={index} ae={ae} index={index} />;
                })
                : ""}
            </React.Fragment>
          )}
        </AccountContext.Consumer>
      </WrapTable>
    </ModalBackground>
  );
};

const ExamRowTable = ({ ae, index }) => {
  const { create_on, subject, id_exam, number, time, name, random } = ae;
  return (
    <tr>
      <td>{index + 1}</td>
      <td>{id_exam}</td>
      <td>{name}</td>
      <td>{subject}</td>
      <td>{random}</td>
      <td>{time}</td>
      <td>{create_on}</td>
    </tr>
  );
};

const InfomationUser = () => {
  return (
    <React.Fragment>
      <UserText />
      <ContentTableAlowExam />
    </React.Fragment>
  );
};

class Accounts extends Component {
  state = {
    showUser: false,
    showHistory: false,
    showFeedback: false,
    status: false
  };
  componentDidMount() {
    var token = localStorage.getItem("token");
    let data = { token: token };
    this.onShowData(data);
    this.onCheckRoute();
  }
  onCheckRoute = () => {
    var { match } = this.props;
    var name = "";
    if (match) {
      name = match.match.params.name;
      if (name === "user") {
        this.setState({
          showUser: true
        });
      }
      if (name === "history") {
        this.setState({
          showHistory: true
        });
      }
      if (name === "feedback-website") {
        this.setState({
          showFeedback: true
        });
      }
    }
  };
  onShowData = async data => {
    var json = await axios({
      method: "POST",
      url: `${API}/profile/GetUserId`,
      data: data
    }).catch(err => {
      console.error(err);
    });
    if (json) {
      this.props.dispatch(
        updateStateData({
          ...this.props.mainState,
          ProfileUser: json.data
        })
      );
    }
  };
  onClickView = async id => {
    this.setState({
      status: true
    });
    var json = await axios({
      method: "POST",
      url: `${API}/SelectAccountGroupId`,
      data: { id: id }
    }).catch(err => {
      console.error(err);
    });
    if (json.data) {
      const { data } = json.data;
      this.props.dispatch(
        updateStateData({
          ...this.props.mainState,
          ListAccountExam: data
        })
      );
    }
  };
  render() {
    const { showUser, showHistory, showFeedback, status } = this.state;
    return (
      <ProfileContainer>
        <AccountContext.Provider
          value={{
            dispatch: this.props.dispatch,
            mainState: this.props.mainState,
            ProfileUser: this.props.mainState.ProfileUser,
            onClickView: id => this.onClickView(id)
          }}
        >
          <WrapMenuProfile />
          <WrapContentProfile>
            {showUser ? <InfomationUser /> : ""}
            {showFeedback ? <FeedBackAccount /> : ""}
            {showHistory ? (
              <HistoryAccount
                dispatch={this.props.dispatch}
                mainState={this.props.mainState}
              />
            ) : (
                ""
              )}
            {status ? (
              <ExamModalTable
                onClick={() => {
                  this.setState({ status: false });
                  this.props.dispatch(
                    updateStateData({
                      ...this.props.mainState,
                      ListAccountExam: []
                    })
                  );
                }}
              />
            ) : (
                ""
              )}
          </WrapContentProfile>
        </AccountContext.Provider>
      </ProfileContainer>
    );
  }
}

export default connect(state => {
  return {
    mainState: state.updateStateData
  };
})(Accounts);
