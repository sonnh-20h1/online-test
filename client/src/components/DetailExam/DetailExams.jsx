import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { DetailExamRequest, UserExamRequest } from "./../../actions/index";
import { API } from "./../../API/API";
import ReactLoading from "react-loading";
import { Modal } from "react-bootstrap";
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

class DetailExams extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      idux: "",
      nameExam: "",
      subject: "",
      number: 0,
      random: 0,
      time: 0,
      payload: false,
      status: false
    };
  }
  componentDidMount() {
    var { match } = this.props;
    if (match) {
      var id = match.params.id;
      this.props.DetailView(id);
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps) {
      var { ListExam } = nextProps;
      this.setState({
        id: ListExam[0].IDEXAM,
        nameExam: ListExam[0].EXAMTEXT,
        subject: ListExam[0].SUBTEXT,
        number: ListExam[0].EXNUM,
        time: ListExam[0].EXTIME,
        random: ListExam[0].RANDOMEXAM
      });
    }
  }
  GetStart = () => {
    var data = JSON.parse(localStorage.getItem("user"));
    const idExam = this.state.id;
    var currentDate = new Date();
    var timeNow = currentDate.getHours() + ":" + currentDate.getMinutes();
    var dateNow =
      currentDate.getFullYear() +
      "-" +
      (currentDate.getMonth() + 1) +
      "-" +
      currentDate.getDate();
    var dataExam = {
      idExam: idExam,
      idUser: data.IDUSER,
      timeNow: timeNow,
      dateNow: dateNow,
      score: 0
    };
    this.setState({
      status: true
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
      .then(data => {
        if (data.status == 200) {
          if (data.data.data) {
            this.setState({
              status: false,
              idux: data.data.data,
              payload: true
            });
          }
        }
      })
      .catch(err => {
        console.error(err);
      });
  };
  render() {
    const ListExams = this.state;
    const { status } = this.state;
    if (this.state.payload === true) {
      return (
        <Redirect
          to={`/online-test?id=${this.state.id}&idux=${this.state.idux}`}
        />
      );
    }
    return (
      <div className="next-start online-test">
        <div className="container">
          <div className="box-wrapper">
            {status ? <Loading /> : ""}
            <div className="panel panel-primary panel-quiz-info">
              <div className="panel-heading text-center bord0">
                <h3>{ListExams.nameExam}</h3>
              </div>
              <div className="panel-body text-center detail-exam">
                <h3>Môn học: {ListExams.subject}</h3>
                <p>
                  <em>Tổng số câu: {ListExams.number} </em>
                  <br />
                  <em>Random: {ListExams.random} câu</em>
                  <br />
                  <em>Thời gian: {ListExams.time} phút</em>
                </p>
                <button
                  onClick={this.GetStart}
                  className="btn btn-primary get-start bord0"
                >
                  Bắt đầu
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    ListExam: state.detailExam
  };
};
const mapDispatchToProps = dispatch => {
  return {
    DetailView: id => {
      dispatch(DetailExamRequest(id));
    },
    GetUserExam: data => {
      dispatch(UserExamRequest(data));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailExams);
