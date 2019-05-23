import React, { Component } from "react";
import {
  Button,
  Container,
  Row,
  Col,
  Alert,
  Breadcrumb,
  BreadcrumbItem
} from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import itemImg from "../../img/icon-3.png";
import axios from "axios";
import { API } from "./../../API/API";

const SecBreadcrumb = ({ Title }) => {
  return (
    <div className="ol-breadcrumb">
      <Container>
        <Breadcrumb className="breadcrumb__content">
          <BreadcrumbItem href="/home">Trang chủ</BreadcrumbItem>
          <BreadcrumbItem href="/chu-de-trac-nghiem">
            Chủ đề trắc nghiệm
          </BreadcrumbItem>
          <BreadcrumbItem active>{Title.SUBTEXT}</BreadcrumbItem>
        </Breadcrumb>
      </Container>
    </div>
  );
};
const ShowListSubject = ({ Title, Exams }) => {
  return (
    <Container>
      <div className="page__wrapper">
        <TitleSubject Title={Title} />
        {Exams.length > 0 ? <SearchExam /> : ""}
        <ListExams Exams={Exams} />
      </div>
    </Container>
  );
};
const TitleSubject = ({ Title }) => {
  return (
    <div className="heading__box ">
      <h1 className="page__heading">Môn {Title.SUBTEXT}</h1>
      <p>{Title.DESCRIPT}</p>
    </div>
  );
};
const SearchExam = () => {
  return (
    <Row className="justify-content-center">
      <Col md={8}>
        <div className="form__search">
          <div className="input-group pad10 padLR15">
            <input
              className="form-control Border0"
              placeholder="Tìm kiếm đề thi"
            />
            <div className="input-group-btn">
              <Button className="Border0">
                <i className="fa fa-search" />
              </Button>
            </div>
          </div>
        </div>
      </Col>
    </Row>
  );
};

const ListExams = ({ Exams }) => {
  return (
    <Row className="shop__list">
      {Exams.length > 0 ? (
        Exams.map((exam, index) => {
          return <ItemExam key={index} exam={exam} index={index} />;
        })
      ) : (
        <Alert variant="success">
          <i className="fa fa-check-circle" /> Nội dung đang được cập nhật!
        </Alert>
      )}
    </Row>
  );
};
const ItemExam = ({ exam, index }) => {
  return (
    <Col md={12} className="_item_subject">
      <div className="item_grid">
        <div className="item__left grid_left">
          <div className="item_left_img">
            <img src={itemImg} alt="" />
          </div>
          <div className="item_left_text">
            <h3 className="list__title">
              Bài {index + 1}: {exam.EXAMTEXT}
            </h3>
            <p>
              Số câu: {exam.RANDOMEXAM} - chế
              độ: {exam.status == 1 ? "Công khai" : "Riêng tư"}
            </p>
          </div>
        </div>
        <div className="item__right">
          <div className="list_right_time">
            <span>Thời gian</span>
            <span className="number_time"> {exam.EXTIME} </span>
            <span>Phút</span>
          </div>
          <div className="start_thi btn-primary">
            <Link to={`/detail-exam/${exam.IDEXAM}`}>Vào thi</Link>
          </div>
        </div>
      </div>
    </Col>
  );
};

class DetailSubject extends Component {
  constructor() {
    super();
    this.state = {
      Title: {},
      Exams: {}
    };
  }
  componentDidMount() {
    // var check = localStorage.getItem("user");
    let { match } = this.props.match;
    if (match.params.id) {
      var data = { id: match.params.id };
      this.GetExamSubjectId(data);
    }
  }
  GetExamSubjectId(data) {
    return axios({
      method: "POST",
      url: `${API}/GetExamSubjectId`,
      data: data
    })
      .then(json => {
        this.setState({
          Title: json.data[0].title,
          Exams: json.data[0].exams
        });
      })
      .catch(err => {
        console.error(err);
      });
  }
  render() {
    var { Exams, Title } = this.state;
    return (
      <section className="ol-content">
        <SecBreadcrumb Title={Title} />
        <ShowListSubject Title={Title} Exams={Exams} />
      </section>
    );
  }
}

export default DetailSubject;
