import React, { Component } from "react";
import Menu from "./Menu/Menu";
import { connect } from "react-redux";
import { updateStateData } from "./../actions/index";
import { API } from "./../API/API";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import DetailExams from "./DetailExam/DetailExams";
import ExamQuestion from "./Questions/ExamQuestion";
import { PrivateRoute } from "./Login/BaseLogin";
import Results from "./Result/Results";
import Reviews from "./Result/Reviews";
import Accounts from "./Profile/Account";
import Account from "./Profile";
import Home from "./Home/Home";
import Subject from "./Subject/Subject";
import SubjectDetail from "./Subject/SubjectDetail";

class Footer extends Component {
  state = {
    text: ""
  };
  componentDidMount() {
    this.GetMessage();
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
        text: json.data[0].text
      });
    }
  }
  render() {
    const { text } = this.state;
    return (
      <footer className="footer__test">
        <Container>
          <Row>
            <Col>
              <marquee>{text}</marquee>
            </Col>
          </Row>
        </Container>
      </footer>
    );
  }
}

class MainComponent extends Component {
  RenderMenu = () => {
    return (
      <Switch>
        <PrivateRoute path="/home" component={() => <Home />} />
        <PrivateRoute
          path="/chu-de-trac-nghiem/:id"
          component={match => <SubjectDetail match={match} />}
        />
        <PrivateRoute
          path="/chu-de-trac-nghiem"
          component={() => <Subject />}
        />
        <PrivateRoute
          path="/account/:name"
          component={match => <Account match={match} />}
        />
        <PrivateRoute
          path="/accounts/:name"
          component={match => <Accounts match={match} />}
        />
        <PrivateRoute
          path="/detail-exam/:id"
          component={({ match }) => <DetailExams match={match} />}
        />
        <PrivateRoute
          path="/online-test"
          component={location => <ExamQuestion location={location} />}
        />
        <PrivateRoute
          path="/result-test"
          component={location => <Results location={location} />}
        />
        <PrivateRoute
          path="/review-test"
          component={location => <Reviews location={location} />}
        />
        <Redirect to="/login" />
      </Switch>
    );
  };

  render() {
    return (
      <div className="test-online">
        <Menu />
        <div className="container-main">{this.RenderMenu()}</div>
        <Footer/>
      </div>
    );
  }
}
export default MainComponent;
