import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { updateStateData } from "./../../actions/index";
import { API } from "./../../API/API";
import ReactLoading from "react-loading";
import { Modal, Alert } from "react-bootstrap";
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

export const MainDetail = ({ DetailExam, GetStart }) => {
  return (
    <React.Fragment>
      <div className="panel-heading text-center bord0">
        <h3>{DetailExam.name}</h3>
      </div>
      <div className="panel-body text-center detail-exam">
        <h3>Môn học: {DetailExam.subject}</h3>
        <p>
          <em>Tổng số câu: {DetailExam.number} </em>
          <br />
          <em>Random: {DetailExam.random}</em>
          <br />
          <em>Thời gian: {DetailExam.time} phút</em>
        </p>
        <button onClick={GetStart} className="btn btn-primary get-start bord0">
          Bắt đầu
        </button>
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
      loading: false
    };
  }
  componentDidMount() {
    var { match } = this.props;
    if (match) {
      var id = match.params.id;
      const { DetailExam } = this.props.mainState;
      if (DetailExam.id == "") {
        this.viewDetail(id);
      }
    }
  }
  viewDetail = id => {
    return axios({
      method: "GET",
      url: `${API}/detail-exam/${id}`
    })
      .then(json => {
        const { status, data, message } = json.data;
        if (status == "success") {
          // console.log(data);
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
                status: data.status
              }
            })
          );
        }
      })
      .catch(err => {
        console.error(err);
      });
  };
  GetStart = () => {
    var data = JSON.parse(localStorage.getItem("user"));
    const {id} = this.props.mainState.DetailExam;
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
      idUser: data.IDUSER,
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
    return axios({
      method: "POST",
      url: `${API}/ChooseRandomExam`,
      data: data
    })
      .then(json => {
        if (json.status == 200) {
          const {data} = json.data;
          if (data) {
            this.setState({
              loading: false,
              idux: data,
              payload: true
            });
          }
          console.log(json.data)
        }
      })
      .catch(err => {
        console.error(err);
      });
  };
  render() {
    const { loading } = this.state;
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
                <MainDetail DetailExam={DetailExam} GetStart={this.GetStart} />
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
