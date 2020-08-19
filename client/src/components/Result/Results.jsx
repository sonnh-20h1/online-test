import React, { Component } from "react";
import { Link } from "react-router-dom";

import {
  Container,
  Row,
  Col,
  Alert,
  Breadcrumb,
  BreadcrumbItem,
} from "react-bootstrap";
import { Table, Icon, Button } from "antd";

import { API } from "./../../API/API";
import icon_result from "../../img/result_2.webp";
class Result extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idux: "",
      idexam: "",
      Exam: "",
      Subject: "",
      TimeStart: 0,
      TimeEnd: 0,
      Score: 0,
      NumQuestion: 0,
      subId: "",
      status: 0,
    };
  }
  componentDidMount() {
    let { location } = this.props.location;
    let params = new URLSearchParams(location.search);
    let id = params.get("id");
    this.GetResultRequest(id);
  }

  GetResultRequest = (id) => {
    return fetch(`${API}/GetResultRequest/${id}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          idexam: data[0].IDEXAM,
          idux: data[0].ID_UX,
          Exam: data[0].EXAMTEXT,
          TimeStart: data[0].TIMESTART,
          TimeEnd: data[0].TIMEEND,
          Score: data[0].SCORE,
          NumQuestion: data[0].RANDOMEXAM,
          subId: data[0].SUBID,
          status: data[0].status,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  render() {
    const {
      Exam,
      TimeStart,
      TimeEnd,
      Score,
      NumQuestion,
      idexam,
      idux,
      subId,
      status,
    } = this.state;
    return (
      <section className="PersonalExam">
        <Container>
          <div className="page__wrapper">
            <div className="text-center">
              <img style={{ width: "125px" }} src={icon_result} alt="" />
            </div>
            <div className="panel-heading text-center" />
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div style={{ maxWidth: "500px" }}>
                <h3>Chúc mừng bạn đã hoàn thành bài thi</h3>
                <table className="detail-result">
                  <tbody>
                    <tr>
                      <td>Đề thi:</td>
                      <td>{Exam}</td>
                    </tr>
                    <tr>
                      <td>Bắt đầu:</td>
                      <td>{TimeStart}</td>
                    </tr>
                    <tr>
                      <td>Kết thúc: </td>
                      <td>{TimeEnd}</td>
                    </tr>
                    <tr>
                      <td>Đáp án đúng:</td>
                      <td>
                        {" "}
                        {Score}/{NumQuestion}
                      </td>
                    </tr>
                    <tr>
                      <td>Đáp án sai:</td>
                      <td>
                        {" "}
                        {NumQuestion - Score}/{NumQuestion}
                      </td>
                    </tr>
                    <tr>
                      <td>phần trăm đạt:</td>
                      <td> {((Score / NumQuestion) * 100).toFixed(2)}%</td>
                    </tr>
                  </tbody>
                </table>
                <div
                  style={{
                    display: "flex",
                    paddingTop: "30px",
                    justifyContent: "space-between",
                  }}
                >
                  <Button type="primary" shape="round">
                    <Link
                      to={
                        status == "3"
                          ? `/personal-exams`
                          : `/chu-de-trac-nghiem/${subId}`
                      }
                    >
                      Hoàn thành
                    </Link>
                  </Button>

                  <Button type="primary" shape="round">
                    <Link
                      to={{
                        pathname: "review-test",
                        search: `?id=${idexam}&idux=${idux}`,
                      }}
                    >
                      Xem chi tiết
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    );
  }
}

export default Result;
