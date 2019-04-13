import React, { Component } from 'react';
import { Button, Container, Row, Col, Alert, Breadcrumb, BreadcrumbItem } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import itemImg from '../../img/icon-3.png';
import axios from 'axios';
import { API } from './../../API/API';

class SecBreadcrumb extends Component {
  render() {
    var { Title } = this.props;
    return (
      <div className="ol-breadcrumb">
        <Container>
          <Breadcrumb className="breadcrumb__content">
            <BreadcrumbItem href="/home">Trang chủ</BreadcrumbItem>
            <BreadcrumbItem href="/chu-de-trac-nghiem">Chủ đề trắc nghiệm</BreadcrumbItem>
            <BreadcrumbItem active>{Title.SUBTEXT}</BreadcrumbItem>
          </Breadcrumb>
        </Container>
      </div>
    )
  }
}
class ShowListSubject extends Component {
  render() {
    var { Title, Exams } = this.props;
    return (
      <Container>
        <div className="page__wrapper">
          <TitleSubject Title={Title} />
          {Exams.length > 0 ? <SearchExam /> : ''}
          <ListExams Exams={Exams} />
        </div>
      </Container>
    )
  }
}
class TitleSubject extends Component {
  render() {
    var { Title } = this.props;
    return (
      <div className="heading__box ">
        <h1 className="page__heading">{Title.SUBTEXT}</h1>
        <p>{Title.DESCRIPT}</p>
      </div>
    )
  }
}
class SearchExam extends Component {
  render() {
    return (
      <Row className="justify-content-center">
        <Col md={8}>
          <div className="form__search">
            <div className="input-group pad10 padLR15">
              <input className="form-control Border0" placeholder="Tìm kiếm đề thi" />
              <div className="input-group-btn">
                <Button className="Border0"><i className="fa fa-search"></i></Button>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    )
  }
}
class ListExams extends Component {
  ShowItemExams = (Exams) => {
    var result = null;
    if (Exams.length > 0) {
      result = Exams.map((exam, index) => {
        return (
          <ItemExam
            key={index}
            exam={exam}
            index={index}
          />
        )
      })
    } else {
      result = <Alert variant="success"><i className="fa fa-check-circle"></i> Nội dung đang được cập nhật!</Alert>
    }
    return result;
  }
  render() {
    var { Exams } = this.props;
    return (
      <Row className="shop__list">
        {this.ShowItemExams(Exams)}
      </Row>
    )
  }
}
class ItemExam extends Component {
  render() {
    var { exam, index } = this.props;
    return (
      <Col md={12} className="_item_subject">
        <div className="item_grid">
          <div className="item__left grid_left">
            <div className="item_left_img"><img src={itemImg} alt="" /></div>
            <div className="item_left_text">
              <h3 className="list__title">Bài {index + 1}: {exam.EXAMTEXT}</h3>
              <p>Số câu: {exam.EXNUM} - chọn ngẫu nhiên: {exam.RANDOMEXAM}</p>
            </div>
          </div>
          <div className="item__right">
            <div className="list_right_time">
              <span>Thời gian</span>
              <span className="number_time"> {exam.EXTIME} </span>
              <span>Phút</span>
            </div>
            <div className="start_thi btn-primary">
              <a href={`/detail-exam/${exam.IDEXAM}`}>Vào thi</a>
            </div>
          </div>
        </div>
      </Col>
    )
  }
}

class DetailSubject extends Component {
  constructor() {
    super();
    this.state = {
      Title: {},
      Exams: {}
    }
  }
  componentDidMount() {
    var check = JSON.parse(localStorage.getItem('user'));
    let { match } = this.props.match;
    if (match.params.id) {
      var data = { id: match.params.id }
      this.GetExamSubjectId(data);
    }
    if (check != null) {
      axios({
        method: 'POST',
        url: `${API}/loading_login`,
        data: { id: check.IDUSER }
      })
        .then(data => {
          if (data.data.error) {
            window.localStorage.removeItem('user')
            window.location.reload()
          }
        })
        .catch(err => {
          console.error(err)
        })
    }
  }
  GetExamSubjectId(data) {
    return axios({
      method: 'POST',
      url: `${API}/GetExamSubjectId`,
      data: data
    })
      .then(data => {
        this.setState({
          Title: data.data[0].title,
          Exams: data.data[0].exams
        })
        // window.location.reload();
      })
      .catch(err => {
        console.error(err)
      })
  }
  render() {
    var { Exams, Title } = this.state;
    // console.log(Exams);
    return (
      <section className="ol-content">
        <SecBreadcrumb Title={Title} />
        <ShowListSubject Title={Title} Exams={Exams} />
      </section>
    )
  }
}

export default DetailSubject;