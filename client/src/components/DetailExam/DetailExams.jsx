import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { updateStateData } from "./../../actions/index";
import { API } from "./../../API/API";
import ReactLoading from "react-loading";
import { Modal, Alert } from "react-bootstrap";
import BraftEditor from "braft-editor";

import axios from "axios";

export const Loading = () => {
  return (
    <div className="show_ReactLoading">
      <div className="modal_backdrop show" />
      <div className="show_loading">
        <ReactLoading
          className="loading_inline"
          type={"spinningBubbles"}
          color="#fff"
        />
      </div>
    </div>
  );
};

export const MainDetail = ({ DetailExam, GetStart, text }) => {
  return (
    <React.Fragment>
      <div className="panel-heading text-center bord0">
        <h3>{DetailExam.name}</h3>
      </div>
      <div className="panel-body text-center detail-exam">
        <h3>Môn học: {DetailExam.subject}</h3>
        <p>
          <em>Tổng số câu: {DetailExam.random} </em>
          <br />
          <em>Thời gian: {DetailExam.time} phút</em>
        </p>
        {DetailExam.status == 1 ? (
          <button
            onClick={GetStart}
            className="btn btn-primary get-start bord0"
          >
            Bắt đầu
          </button>
        ) : (
          <p>
            <BraftEditor
            language="en"
            id="editor-with-table"
            readOnly
            contentStyle={{ height: "auto" }}
            controlBarStyle={{ display: "none" }}
            value={BraftEditor.createEditorState(text)}
          />
          </p>
        )}
      </div>
    </React.Fragment>
  );
};
class DetailExams extends Component {
  constructor() {
    super();
    this.state = {
      idux: "",
      payload: false,
      loading: false,
      text: ""
    };
  }
  componentDidMount() {
    var { match } = this.props;
    if (match) {
      var id = match.params.id;
      var data = {
        id: id,
        token: localStorage.getItem("token")
      };
      this.viewDetail(data);
      this.GetMessage();
    }
  }

  async GetMessage() {
    var json = await axios({
      method: "POST",
      url: `${API}/GetMessage`
    }).catch(err => {
      console.error(err);
    });
    if (json.data) {
      this.setState({
        text: json.data[1].text
      });
    }
  }

  viewDetail = async data => {
    var json = await axios({
      method: "POST",
      url: `${API}/detail-exam`,
      data: data
    }).catch(err => {
      console.error(err);
    });
    if (json.data) {
      const { data, correct } = json.data;
      this.props.dispatch(
        updateStateData({
          ...this.props.mainState,
          DetailExam: {
            id: data.IDEXAM,
            name: data.EXAMTEXT,
            number: data.EXNUM,
            random: data.RANDOMEXAM,
            time: data.EXTIME,
            subject: data.SUBTEXT,
            status: correct
          }
        })
      );
    }
  };
  GetStart = () => {
    var data = localStorage.getItem("token");
    const { id } = this.props.mainState.DetailExam;
    var currentDate = new Date();
    var timeNow = currentDate.getHours() + ":" + currentDate.getMinutes();
    var dateNow =
      currentDate.getFullYear() +
      "-" +
      (currentDate.getMonth() + 1) +
      "-" +
      currentDate.getDate();
    var dataExam = {
      idExam: id,
      token: data,
      timeNow: timeNow,
      dateNow: dateNow,
      score: 0
    };
    this.setState({
      loading: true
    });
    // this.props.GetUserExam(dataExam)
    this.CreateRandomExam(dataExam);
  };
  CreateRandomExam = data => {
    fetch(`${API}/ChooseRandomQuestion`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(json => {
        if (json.status == "success") {
          this.setState({
            loading: false,
            idux: json.data,
            payload: true
          });
        } else {
          console.log(json);
        }
      })
      .catch(err => {
        console.error(err);
      });
  };
  render() {
    const { loading, text } = this.state;
    const { DetailExam } = this.props.mainState;
    if (this.state.payload === true) {
      return (
        <Redirect
          to={`/online-test?id=${DetailExam.id}&idux=${this.state.idux}`}
        />
      );
    }
    return (
      <div className="next-start online-test">
        <div className="container">
          <div className="box-wrapper">
            {loading ? <Loading /> : ""}
            <div className="panel panel-primary panel-quiz-info">
              {DetailExam.id ? (
                <MainDetail
                  DetailExam={DetailExam}
                  text={text}
                  GetStart={this.GetStart}
                />
              ) : (
                <Alert variant="error">
                  <i className="fa fa-check-circle" /> Đề thi này không tồn tại!
                </Alert>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(state => {
  return {
    mainState: state.updateStateData
  };
})(DetailExams);
