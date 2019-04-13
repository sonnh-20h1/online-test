import React, { Component } from "react";
import { connect } from "react-redux";
import { GetExamRequest, GetQuestionUser } from "./../../actions/index";
import {
  Button,
  Container,
  Row,
  Col,
  Breadcrumb,
  BreadcrumbItem
} from "react-bootstrap";
import { Redirect, Prompt, Link } from "react-router-dom";
import { API } from "./../../API/API";
import axios from "axios";
class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 2,
      isCheck: false
    };
  }
  componentDidMount() {
    const { time } = this.props;
    var seconds = time * 60;
    this.setState({
      count: seconds
    });
    this.doIntervalChange();
  }
  doIntervalChange = () => {
    if (this.state.count > 0) {
      this.myInterval = setInterval(
        () =>
          this.setState({
            count: this.state.count - 1
          }),
        1000
      );
    }
  };
  minutes = () => {
    var min = Math.round((this.state.count - 30) / 60);
    return ("0" + min).slice(-2);
  };
  seconds = () => {
    return ("0" + (this.state.count % 60)).slice(-2);
  };
  SendResult = () => {
    this.props.IsCheck();
  };
  render() {
    const { count } = this.state;
    if (count === 0) {
      clearInterval(this.myInterval);
      this.SendResult();
    }
    return (
      <div className="get-time">
        <p>
          <span>{this.minutes()}</span>
          <span className="haicham">:</span>
          <span>{this.seconds()}</span>
        </p>
      </div>
    );
  }
}
export const Answer = ({ answer }) => {
  return (
    <tr>
      <td>
        <input
          type="radio"
          className="option_que radio_que"
          value={answer.ID_ANS}
          name={answer.ID_QUE}
        />
      </td>
      <td>
        <p>{answer.ANS_TEXT}</p>
      </td>
    </tr>
  );
};
class Question extends Component {
  showAnswer = ListAnswer => {
    var result = null;
    if (ListAnswer.length > 0) {
      result = ListAnswer.map((answer, index) => {
        return <Answer key={index} answer={answer} />;
      });
    }
    return result;
  };
  render() {
    const { question, index } = this.props;
    return (
      <div className="number-q">
        <div className="box-question">
          <div className="content-q">
            <div className="name-q">
              <div className="info-q">
                <h3>Câu {index + 1}</h3>
              </div>
              <p>{question.QUE_TEXT}</p>
            </div>
            <div className="answer-q">
              <table>
                <tbody>{this.showAnswer(question.Answer)}</tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export const ItemShortQuestion = ({ index, question }) => {
  return (
    <div
      data-index={question.ID_QUE}
      className="item-question-shortcut answered"
    >
      {index + 1}
    </div>
  );
};

class ListQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ListQuestion: [],
      idExam: "",
      isCheck: true,
      idResult: "",
      time: 0,
      todos: []
    };
  }
  showQuetion(ListQuestion) {
    var result = null;
    if (ListQuestion.length > 0) {
      result = ListQuestion.map((question, index) => {
        return <Question key={index} question={question} index={index} />;
      });
    }
    return result;
  }
  componentDidMount() {
    const { location } = this.props.location;
    let params = new URLSearchParams(location.search);
    let id = params.get("id");
    let idux = params.get("idux");
    this.GetExamMinuteId(id);
    this.setState({
      idExam: id
    });
    let data = {
      id: id,
      idux: idux
    };
    this.ListItem(data);
    // console.log(data);
  }
  ListItem = data => {
    return axios({
      method: "POST",
      url: `${API}/exam-question`,
      data: data
    })
      .then(data => {
        console.log(data.data);
        // this.setState({
        //   ListQuestion: data.data
        // });
      })
      .catch(err => {
        console.error(err);
      });
  };
  GetExamMinuteId = id => {
    var data = { id: id };
    return fetch(`${API}/GetExamMinuteId`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          console.log(data);
        } else {
          this.setState({
            time: data
          });
        }
      })
      .catch(err => {
        console.error(err);
      });
  };
  GetResult = () => {
    if (window.confirm("Bạn đã chắn chắn muốn nộp bài không?")) {
      this.GetAnswerUserId();
    }
  };
  GetAnswerUserId = () => {
    let inputs = document.getElementsByTagName("input");
    let result = [];
    if (inputs.length > 0) {
      for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].type === "radio" && inputs[i].checked === true) {
          result.push({
            idAns: inputs[i].value,
            idQue: inputs[i].name
          });
        }
      }
    }
    var currentDate = new Date();
    var timeNow = currentDate.getHours() + ":" + currentDate.getMinutes();
    var dataUser = JSON.parse(localStorage.getItem("user"));
    var Data = {
      idExam: this.state.idExam,
      idUser: dataUser.IDUSER,
      timeNow: timeNow,
      questions: result
    };
    this.props.GetQuestionUser(Data);
    this.GetUserExamId(Data);
  };
  GetUserExamId = data => {
    return fetch(`${API}/GetUserExamId`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          console.log(data);
        } else {
          this.setState({
            idResult: data,
            isCheck: false
          });
        }
      })
      .catch(err => {
        console.error(err);
      });
  };
  IsCheck = () => {
    this.GetAnswerUserId();
  };
  ListQuestionShortCut = questions => {
    var result = null;
    result = questions.map((question, index) => {
      return (
        <ItemShortQuestion key={index} question={question} index={index} />
      );
    });
    return result;
  };
  render() {
    var { ListQuestion, isCheck, idResult, time } = this.state;
    var timer = time;
    if (isCheck === false) {
      return (
        <Redirect
          to={{ pathname: `/result-test`, search: `?id=${idResult}` }}
        />
      );
    }
    return (
      <div className="question-test online-test">
        <SecBreadcrumb />
        <div className="container">
          <div className="exam-grid page__wrapper choose_exam">
            <div className="left-menu-exam">
              <div className="content-menu-exam">
                <div className="exam-time">
                  {time > 0 ? (
                    <Timer IsCheck={this.IsCheck} time={timer} />
                  ) : (
                    ""
                  )}
                </div>
                <div className="list-question-shortcut over-question">
                  {this.ListQuestionShortCut(ListQuestion)}
                </div>
                <div className="wrap-finish text-center">
                  <button className="btn btn-danger" onClick={this.GetResult}>
                    Finish
                  </button>
                </div>
              </div>
            </div>
            <div className="box-wrapper">
              <div className="the-questions">
                {this.showQuetion(ListQuestion)}
              </div>
            </div>
          </div>
        </div>
        <Prompt
          when={isCheck}
          message={() => "Bạn đã chắc chắn muốn thoát không?"}
        />
      </div>
    );
  }
}
export const SecBreadcrumb = () => {
  return (
    <div className="ol-breadcrumb">
      <Container>
        <Breadcrumb className="breadcrumb__content">
          <BreadcrumbItem href="/home">Trang chủ</BreadcrumbItem>
          <BreadcrumbItem active>Môn Toán</BreadcrumbItem>
        </Breadcrumb>
      </Container>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    ...state
  };
};
const mapDispatchToProps = dispatch => {
  return {
    GetQuestionUser: data => {
      dispatch(GetQuestionUser(data));
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListQuestion);
