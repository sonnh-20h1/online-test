import React, { Component } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { updateStateData } from "./../../actions/index";
import axios from "axios";
import { API } from "./../../API/API";
import item_img from "../../img/yhoc.png";
import Pagination from "react-js-pagination";

const SubjectContext = React.createContext();

class HeaderSearch extends Component {
  render() {
    return (
      <Row className="justify-content-center text-center">
        <Col md={8} className="page__heading">
          <h1>Chủ đề trắc nghiệm</h1>

        </Col>
      </Row>
    );
  }
}

class ListSubject extends Component {
  render() {
    return (
      <Row className="justify-content-center">
        <SubjectContext.Consumer>
          {({ mainState, handlePageChange }) => (
            <React.Fragment>
              <Col md={12}>
                <Row className="list__subject">
                  {mainState.ListSubject.data
                    ? mainState.ListSubject.data.map((subject, index) => {
                      return (
                        <ItemSubject
                          key={index}
                          SubName={subject.SUBTEXT}
                          id={subject.SUBID}
                        />
                      );
                    })
                    : ""}
                </Row>
                {/* <Row style={{ textAlign: "center" }}>
                  <Pagination
                    activePage={mainState.ListSubject.page}
                    itemsCountPerPage={mainState.ListSubject.CountPerPage}
                    totalItemsCount={mainState.ListSubject.pageSize}
                    pageRangeDisplayed={5}
                    onChange={handlePageChange}
                  />
                </Row> */}
              </Col>
            </React.Fragment>
          )}
        </SubjectContext.Consumer>
      </Row>
    );
  }
}
class ItemSubject extends Component {
  render() {
    var { SubName, id } = this.props;
    return (
      <Col md={3} className="item__subject">
        <div className="item_item green">
          <div className="item__brief-wrapper">
            <h3>{SubName}</h3>
            <Link to={`/chu-de-trac-nghiem/${id}`}>Chi tiết</Link>
          </div>
          <div className="item_img__cover">
            <img src={item_img} alt="" />
          </div>
        </div>
      </Col>
    );
  }
}
class Subject extends Component {
  state = {
    search: "",
  };
  componentDidMount() {
    this.getSubject();
  }

  getSubject = async () => {
    var json = await axios({
      method: "GET",
      url: `${API}/getSubject`,
    }).catch((err) => {
      console.error(err);
    });
    if (json) {
      const { data } = json.data;
      this.props.dispatch(
        updateStateData({
          ...this.props.mainState,
          ListSubject: {
            data,
          },
        })
      );
    }
  };
  render() {
    return (
      <div className="vk-content" data-layout="full-height">
        <SubjectContext.Provider
          value={{
            dispatch: this.props.dispatch,
            mainState: this.props.mainState
          }}
        >
          <Container>
            <div className="page__wrapper">
              <HeaderSearch />
              <ListSubject />
            </div>
          </Container>
        </SubjectContext.Provider>
      </div>
    );
  }
}

export default connect((state) => {
  return {
    mainState: state.updateStateData,
  };
})(Subject);
