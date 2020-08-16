import React, { Component } from "react";
import {
  Button,
  Container,
  Row,
  Col,
  Alert,
  Breadcrumb,
  BreadcrumbItem,
  Card,
} from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import itemImg from "../../img/exam.svg";
import { connect } from "react-redux";
import { updateStateData } from "./../../actions/index";
import axios from "axios";
import { API } from "./../../API/API";
import money from "../../img/money.jpg";
import Pagination from "react-js-pagination";

const SubjectDetailContext = React.createContext();

const SecBreadcrumb = ({ Title }) => {
  return (
    <div className="ol-breadcrumb">
      <Container>
        <Breadcrumb className="breadcrumb__content">
          <BreadcrumbItem active>
            <Link to="/home">Trang chủ</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>
            <Link to="/chu-de-trac-nghiem">Chủ đề trắc nghiệm</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>{Title ? Title.SUBTEXT : ""}</BreadcrumbItem>
        </Breadcrumb>
      </Container>
    </div>
  );
};
const ShowListSubject = () => {
  return (
    <Container>
      <SubjectDetailContext.Consumer>
        {({ ListExamBySubject, handlePageChange, onBackFolder, type }) => (
          <React.Fragment>
            {ListExamBySubject.exams ? (
              <div className="page__wrapper">
                {ListExamBySubject.title ? (
                  <TitleSubject
                    Title={ListExamBySubject.title}
                    onBackFolder={onBackFolder}
                  />
                ) : (
                  ""
                )}
                <SearchExam />
                <ListExams Exams={ListExamBySubject.exams} type={type} />
                <Row style={{ textAlign: "center" }}>
                  <Pagination
                    activePage={ListExamBySubject.page}
                    itemsCountPerPage={ListExamBySubject.CountPerPage}
                    totalItemsCount={ListExamBySubject.pageSize}
                    pageRangeDisplayed={5}
                    onChange={handlePageChange}
                  />
                </Row>
              </div>
            ) : (
              <div className="page__wrapper">
                {ListExamBySubject.title ? (
                  <TitleSubject
                    Title={ListExamBySubject.title}
                    onBackFolder={onBackFolder}
                  />
                ) : (
                  ""
                )}
                <SearchExam />
                <Row className="shop__list">
                  <Alert variant="success">
                    <i className="fa fa-check-circle" /> Đề thi trống !
                  </Alert>
                </Row>
              </div>
            )}
          </React.Fragment>
        )}
      </SubjectDetailContext.Consumer>
    </Container>
  );
};
const TitleSubject = ({ Title, onBackFolder }) => {
  return (
    <div className="heading__box ">
      <Button onClick={onBackFolder}>
        <i class="fa fa-step-backward" /> Quay lại
      </Button>
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
          <SubjectDetailContext.Consumer>
            {({ onSearch }) => (
              <form onSubmit={onSearch}>
                <div className="input-group pad10 padLR15">
                  <input
                    className="form-control Border0"
                    placeholder="Tìm kiếm đề thi"
                    name="search"
                  />
                  <div className="input-group-btn">
                    <Button className="Border0" type="submit">
                      <i className="fa fa-search" />
                    </Button>
                  </div>
                </div>
              </form>
            )}
          </SubjectDetailContext.Consumer>
        </div>
      </Col>
    </Row>
  );
};

const ListExams = ({ Exams, type }) => {
  let data = Exams.sort((a, b) => {
    return a.EXAMTEXT.localeCompare(b.EXAMTEXT);
  });
  return (
    <Row className="shop__list">
      {data.length > 0
        ? data.map((exam, index) => {
            return (
              <ItemExam key={index} type={type} exam={exam} index={index} />
            );
          })
        : ""}
    </Row>
  );
};
const ItemExam = ({ exam, index, type }) => {
  return (
    <React.Fragment>
      {exam.status == type ? (
        <Col md={12} className="_item_subject">
          <div className="item_grid">
            <div className="item__left grid_left">
              <div className="item_left_img">
                <img
                  style={{
                    width: "100%",
                  }}
                  src={itemImg}
                  alt=""
                />
              </div>
              <div
                className="item_left_text"
                style={{ display: "flex", alignItems: "center" }}
              >
                <div>
                  <h3 className="list__title">{exam.EXAMTEXT}</h3>
                  <p>
                    Số câu: {exam.RANDOMEXAM} - Trạng thái:{" "}
                    {exam.status == 1 ? "Đề miễn phí" : "Đề trả phí"}
                  </p>
                </div>
              </div>
            </div>
            <div className="item__right">
              <div className="list_right_time">
                <span>Thời gian</span>
                <span className="number_time"> {exam.EXTIME} </span>
                <span>Phút</span>
              </div>
              <div className="start_thi btn-primary">
                {exam.status == 1 ? (
                  <Link to={`/detail-exam/${exam.IDEXAM}`}>Vào thi</Link>
                ) : exam.permisson == 1 ? (
                  <Link to={`/detail-exam/${exam.IDEXAM}`}>Vào thi</Link>
                ) : (
                  <a>
                    <i class="fa fa-lock" style={{ fontSize: "30px" }} />
                  </a>
                )}
              </div>
            </div>
          </div>
        </Col>
      ) : (
        ""
      )}
    </React.Fragment>
  );
};

class SubjectDetail extends Component {
  constructor() {
    super();
    this.state = {
      Title: {},
      Exams: {},
      type: 0,
    };
  }
  componentDidMount() {
    let { match } = this.props.match;
    if (match.params.id) {
      console.log(match.params.id);
      this.props.dispatch(
        updateStateData({
          ...this.props.mainState,
          ListExamBySubject: {
            ...this.props.mainState.ListExamBySubject,
            id: match.params.id,
          },
        })
      );
      this.GetExamSubjectId(match.params.id);
    }
  }

  GetExamSubjectId = async (id, search, pageNumber) => {
    search = search ? `search=${search}` : ``;
    pageNumber = pageNumber ? `page=${pageNumber}` : ``;
    let token = `token=${localStorage.getItem("token")}`;

    var json = await axios({
      method: "GET",
      url: `${API}/getExamBySubjectId/${id}?${token}&${search}&${pageNumber}`,
    }).catch((err) => {
      console.error(err);
    });
    if (json) {
      let { exams, permisson } = json.data;
      exams = exams.map((item) => {
        let view = permisson.filter((p) => p.id_exam == item.IDEXAM);
        return {
          ...item,
          permisson: view.length > 0 ? 1 : 0,
        };
      });

      this.props.dispatch(
        updateStateData({
          ...this.props.mainState,
          ListExamBySubject: {
            ...this.props.mainState.ListExamBySubject,
            ...json.data,
            exams: exams,
          },
        })
      );
    }
  };
  onSearch = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    var search = data.get("search");
    this.props.dispatch(
      updateStateData({
        ...this.props.mainState,
        ListExamBySubject: {
          ...this.props.mainState.ListExamBySubject,
          search,
        },
      })
    );
    const { id } = this.props.mainState.ListExamBySubject;
    this.GetExamSubjectId(id, search);
  };
  handlePageChange = (pageNumber) => {
    const { search, id } = this.props.mainState.ListExamBySubject;
    this.GetExamSubjectId(id, search, pageNumber);
  };
  handleFilter = (type) => {
    this.setState({ type });
  };
  onBackFolder = () => {
    this.setState({ type: 0 });
  };
  render() {
    return (
      <section className="ol-content">
        <SubjectDetailContext.Provider
          value={{
            dispatch: this.props.dispatch,
            ListExamBySubject: this.props.mainState.ListExamBySubject,
            handlePageChange: this.handlePageChange,
            onSearch: this.onSearch,
            onBackFolder: this.onBackFolder,
            type: this.state.type,
          }}
        >
          <SecBreadcrumb Title={this.props.mainState.ListExamBySubject.title} />
          {this.state.type == 0 ? (
            <Container>
              <div className="page__wrapper">
                <div>
                  <Row style={{ display: "flex", justifyContent: "center" }}>
                    <Col md={3} className="item__subject">
                      <div className="item_item green">
                        <div className="item__brief-wrapper">
                          <h3>Bộ đề miễn phí</h3>
                          <a onClick={() => this.handleFilter(1)}>
                            Xem chi tiết
                          </a>
                        </div>
                        <div className="item_img__cover">
                          <img src={money} alt="" />
                        </div>
                      </div>
                    </Col>
                    <Col md={3} className="item__subject">
                      <div className="item_item green">
                        <div className="item__brief-wrapper">
                          <h3>Bộ đề trả phí</h3>
                          <a onClick={() => this.handleFilter(2)}>
                            Xem chi tiết
                          </a>
                        </div>
                        <div className="item_img__cover">
                          <img src={money} alt="" />
                        </div>
                      </div>
                    </Col>
                    <Col md={3} className="item__subject">
                      <div className="item_item green">
                        <div className="item__brief-wrapper">
                          <h3>Bộ đề VIP</h3>
                          <a onClick={() => this.handleFilter(3)}>
                            Xem chi tiết
                          </a>
                        </div>
                        <div className="item_img__cover">
                          <img src={money} alt="" />
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
            </Container>
          ) : (
            <ShowListSubject />
          )}
        </SubjectDetailContext.Provider>
      </section>
    );
  }
}

export default connect((state) => {
  return {
    mainState: state.updateStateData,
  };
})(SubjectDetail);
