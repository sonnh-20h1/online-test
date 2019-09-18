import React, { Component } from "react";
import checkTrue from "../../img/check-symbol.svg";
import { API } from "./../../API/API";
import { Link } from "react-router-dom";
import {
  Button,
  Form,
  Container,
  Row,
  Col,
  Alert,
  Breadcrumb,
  BreadcrumbItem
} from "react-bootstrap";
import { connect } from "react-redux";
import { updateStateData } from "./../../actions/index";
import axios from "axios";
import ReactLoading from "react-loading";

class SecBreadcrumb extends Component {
  render() {
    var { Title } = this.props;
    return (
      <div className="ol-breadcrumb">
        <Container>
          <Breadcrumb className="breadcrumb__content">
            <BreadcrumbItem href="/home">Trang chủ</BreadcrumbItem>
            <BreadcrumbItem href="/chu-de-trac-nghiem">
              Chủ đề trắc nghiệm
            </BreadcrumbItem>
            <BreadcrumbItem active>
              Kết quả bài thi và đóng góp ý kiến
            </BreadcrumbItem>
          </Breadcrumb>
        </Container>
      </div>
    );
  }
}
class Answer extends Component {
  onChange = e => {};
  render() {
    const { answer, UserAnswer } = this.props;
    return (
      <tr>
        <td>
          <div className="image-check">
            <img src={answer.CORRECT === "true" ? checkTrue : ""} alt="" />
          </div>
        </td>
        <td>
          <input
            type="radio"
            name={answer.ID_QUE}
            onChange={this.onChange}
            value={answer.ID_ANS}
            checked={answer.ID_ANS === UserAnswer ? true : false}
            className="option_que radio_que"
          />
        </td>
        <td>
          <p
            className={
              answer.ID_ANS === UserAnswer
                ? answer.CORRECT === "true"
                  ? "true-green"
                  : "false_red"
                : ""
            }
          >
            {answer.ANS_TEXT}
          </p>
        </td>
      </tr>
    );
  }
}
class ItemQuestion extends Component {
  ListAnswer = question => {
    var ListAnswer = null;
    var Answers = question.Answer;
    var { UserAnswer } = question;
    if (Answers.length > 0) {
      ListAnswer = Answers.map((answer, index) => {
        return <Answer key={index} answer={answer} UserAnswer={UserAnswer} />;
      });
    }
    return ListAnswer;
  };
  render() {
    const { question } = this.props;
    return (
      <div>
        <div className="name-q">
          <p>{question.QUE_TEXT}</p>
        </div>
        <div>
          <p>Câu trả lời của bạn là:</p>
        </div>
        <div className="answer-q">
          <table>
            <tbody>{this.ListAnswer(question)}</tbody>
          </table>
        </div>
      </div>
    );
  }
}
class Question extends Component {
  state = {
    status: false,
    valueFeedback: "",
    validated: false,
    question: {}
  };
  componentDidMount() {
    this.setState({
      question: this.props.question
    });
  }
  showfeedback = () => {
    this.setState({
      status: !this.state.status
    });
  };
  sendFeedback = e => {
    e.preventDefault();
    const { valueFeedback, question } = this.state;
    const { exam_id } = this.props;
    var token = localStorage.getItem("token");
    if (this.state.valueFeedback == "") {
      this.setState({ validated: true });
    } else {
      var data = {
        id: "",
        token: token,
        exam_id: exam_id,
        valueFeedback,
        question_id: question.ID_QUE,
        time: this.getTime()
      };
      axios({
        method: "POST",
        url: `${API}/SaveFeedBack`,
        data: data
      })
        .then(data => {
          if (data.data.status == "success") {
            alert("Đã gửi thành công!");
            this.setState({
              status: false
            });
          }
        })
        .catch(err => {
          console.error(err);
        });
    }
  };
  getTime() {
    var date = new Date();
    var strTime =
      date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    return strTime;
  }
  handleChange = e => {
    this.setState({
      valueFeedback: e.target.value
    });
  };
  render() {
    var { validated } = this.state;

    const Feedback = (
      <Form onSubmit={e => this.sendFeedback(e)}>
        <Form.Row>
          <Form.Group controlId="validationCustom">
            <Form.Label />
            <Form.Control
              as="textarea"
              rows="3"
              value={this.state.valueFeedback}
              placeholder="Phản hồi"
              onChange={this.handleChange}
              required
            />
          </Form.Group>
        </Form.Row>
        <Button variant="primary" type="submit">
          Gửi
        </Button>
      </Form>
    );
    const { question, index } = this.props;
    const { status } = this.state;
    return (
      <div className="number-q">
        <div className="box-question">
          <div className="info-q">
            <h3>{index + 1}</h3>
          </div>
          <div className="content-q review_content">
            <ItemQuestion question={question} />
          </div>
        </div>
        <div className="feedback_question">
          <Button
            variant="danger"
            onClick={this.showfeedback}
            className="pad_size"
          >
            Đánh giá
          </Button>
        </div>
        {status ? Feedback : ""}
      </div>
    );
  }
}

class Feedback extends Component {
  render() {
    return (
      <Form.Group controlId="exampleForm.ControlTextarea1">
        <Form.Label>Đóng góp ý kiến của bạn</Form.Label>
        <Form.Control as="textarea" rows="3" />
      </Form.Group>
    );
  }
}

class ReviewQuestions extends Component {
  state = {
    ListQuestions: {},
    status: true,
    exam_id: "",
    subId:''
  };
  ShowQuestions = (ListQuestions, exam_id) => {
    var result = null;
    if (ListQuestions.length > 0) {
      result = ListQuestions.map((question, index) => {
        return (
          <Question
            key={index}
            question={question}
            index={index}
            exam_id={exam_id}
          />
        );
      });
    }
    return result;
  };
  componentDidMount() {
    const { location } = this.props.location;
    let params = new URLSearchParams(location.search);
    let id = params.get("id");
    let idux = params.get("idux");
    let data = {
      id: id,
      idux: idux
    };
    this.setState({
      exam_id: id
    });
    this.getQuestionData(data);
  }

  getQuestionData = async data => {
    var json = await axios({
      method: "POST",
      url: `${API}/get-exam-question`,
      data: data
    }).catch(err => {
      console.error(err);
    });

    var jsonSubject = await axios({
      method: "GET",
      url: `${API}/GetResultRequest/${data.idux}`,
    }).catch(err => {
      console.error(err);
    });

    if(jsonSubject.data){
      this.setState({
        subId:jsonSubject.data[0].SUBID
      })
    }

    if (json.data.error) {
      console.error(json.data);
    } else {
      this.props.dispatch(
        updateStateData({
          ...this.props.mainState,
          Questions: [...json.data]
        })
      );
      this.setState({
        status: false
      });
    }
  };
  render() {
    const { Questions } = this.props.mainState;
    const { status, exam_id,subId } = this.state;
    return (
      <div className="question-test online-test">
        <div className="ol-content">
          <SecBreadcrumb />
        </div>
        <div className="container">
          <div className=" page__wrapper">
            <div className="box-wrapper">
              <div className="the-questions Review-exam">
                {status ? (
                  <ReactLoading
                    className="loadingggg"
                    type={"spinningBubbles"}
                    color="#333"
                  />
                ) : (
                  ""
                )}
                {Questions ? this.ShowQuestions(Questions, exam_id) : ""}
              </div>
              <div className="btn_complete">
                <Link to={`/chu-de-trac-nghiem/${subId}`}>Quay về</Link>
              </div>
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
})(ReviewQuestions);
