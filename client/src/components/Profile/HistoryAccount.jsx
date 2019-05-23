import React, { Component } from "react";
import Pagination from "react-js-pagination";
import { Route, Link } from "react-router-dom";
import axios from "axios";
import { updateStateData } from "./../../actions/index";
import { API } from "./../../API/API";
import { WrapMaxTable } from "./BaseAccount";

const HistoryAccountContext = React.createContext();

const ContentTable = () => {
  return (
    <React.Fragment>
      <HistoryAccountContext.Consumer>
        {({ mainState, handlePageChangeMain }) => (
          <React.Fragment>
            <WrapMaxTable
              columns={[
                "STT",
                "Tên đề",
                "Câu đúng",
                "Bắt đầu",
                "Kết thúc",
                "Ngày thi",
                "Môn học",
                "Nộp bài"
              ]}
            >
              <React.Fragment>
                {mainState.ListAccountHistory
                  ? mainState.ListAccountHistory.map((ah, index) => {
                      return (mainState.pageMainNumber - 1) * 15 <= index &&
                        index < mainState.pageMainNumber * 15 ? (
                        <HistoryRowTable key={index} ah={ah} index={index} />
                      ) : null;
                    })
                  : ""}
              </React.Fragment>
            </WrapMaxTable>
            {mainState.ListAccountHistory ? (
              <Pagination
                activePage={mainState.pageMainNumber}
                itemsCountPerPage={15}
                totalItemsCount={mainState.ListAccountHistory.length}
                pageRangeDisplayed={5}
                onChange={handlePageChangeMain}
              />
            ) : (
              ""
            )}
          </React.Fragment>
        )}
      </HistoryAccountContext.Consumer>
    </React.Fragment>
  );
};

const HistoryRowTable = ({ ah, index }) => {
  const {
    CONFIRM,
    ID_UX,
    EXAMTEXT,
    SCORE,
    TIMESTART,
    TIMEEND,
    DATEEXAM,
    SUBTEXT
  } = ah;
  return (
    <tr>
      <td>{index + 1}</td>
      <td>
        {CONFIRM ? (
          <Link to={`/result-test?id=${ID_UX}`}>{EXAMTEXT}</Link>
        ) : (
          <p>{EXAMTEXT}</p>
        )}
      </td>
      <td>{SCORE > 0 ? SCORE : 0}</td>
      <td>{TIMESTART}</td>
      <td>{TIMEEND}</td>
      <td>{DATEEXAM}</td>
      <td>{SUBTEXT}</td>
      <td>{CONFIRM ? "Đã nộp" : "Chưa nộp"}</td>
    </tr>
  );
};

class HistoryAccount extends React.Component {
  componentDidMount() {
    var token = localStorage.getItem("user");
    let data = { token: token };
    this.onShowHistory(data);
  }
  onShowHistory = async data => {
    var json = await axios({
      method: "POST",
      url: `${API}/GetHistoryExamUser`,
      data: data
    }).catch(err => {
      console.error(err);
    });
    if (json) {
      const { data } = json;
      this.props.dispatch(
        updateStateData({
          ...this.props.mainState,
          ListAccountHistory: data
        })
      );
    }
  };
  handlePageChangeMain = pageNumber => {
    this.props.dispatch(
      updateStateData({
        ...this.props.mainState,
        pageMainNumber: pageNumber
      })
    );
  };
  render() {
    return (
      <div className="section-test">
        <HistoryAccountContext.Provider
          value={{
            dispatch: this.props.dispatch,
            mainState: this.props.mainState,
            handlePageChangeMain: this.handlePageChangeMain
          }}
        >
          <div className="account-section-header">
            <p>Các đề thi đã làm</p>
          </div>
          <ContentTable />
        </HistoryAccountContext.Provider>
      </div>
    );
  }
}

export default HistoryAccount;
