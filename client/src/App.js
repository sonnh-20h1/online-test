import React, { Component } from "react";
import Menu from "./components/Menu/Menu";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import axios from "axios";
import { API } from "./API/API";
import { Container, Row, Col } from "react-bootstrap";
import "./App.css";
import "./home.css";
import Exam from "./components/Exams/Exams";
import DetailExam from "./components/DetailExam/DetailExam";
import DetailExams from "./components/DetailExam/DetailExams";
import ListQuestion from "./components/Questions/ListQuestion";
import ExamQuestion from './components/Questions/ExamQuestion';
import Login from "./components/Login/Login";
import PrivateRoute from "./components/Login/PrivateRoute";
import fakeAuth from "./components/Login/fakeAuth";
import SignIn from "./components/Login/SignIn";
import Result from "./components/Result/Result";
import ReviewQuestions from "./components/Result/Review";
import Account from "./components/Profile";
import Home from "./components/Home/Home";
import Subject from "./components/Subject/Subject";
import DetailSubject from "./components/Subject/DetailSubject";

class MainComponent extends Component {
  RenderMenu = () => {
    return (
      <Switch>
        <PrivateRoute path="/home" component={() => <Home />} />
        <PrivateRoute
          path="/chu-de-trac-nghiem/:id"
          component={match => <DetailSubject match={match} />}
        />
        <PrivateRoute
          path="/chu-de-trac-nghiem"
          component={() => <Subject />}
        />
        <PrivateRoute
          path="/account/:name"
          component={match => <Account match={match} />}
        />
        <PrivateRoute path="/exam/all" component={() => <Exam />} />
        <PrivateRoute
          path="/exam/:id"
          component={({ match }) => <Exam match={match} />}
        />
        <PrivateRoute
          path="/detail-exam/:id"
          component={({ match }) => <DetailExams match={match}  />}
        />
        <PrivateRoute
          path="/online-test"
          component={location => <ExamQuestion location={location} />}
        />
        <PrivateRoute
          path="/result-test"
          component={location => <Result location={location} />}
        />
        <PrivateRoute
          path="/review-test"
          component={location => <ReviewQuestions location={location} />}
        />
        <Redirect to="/home" />
      </Switch>
    );
  };
  render() {
    return (
      <div className="test-online">
        <Menu />
        <div className="container-main">{this.RenderMenu()}</div>
        <footer className="footer__test">
          <Container>
            <Row>
              <Col className="">
                <p>
                  Bạn đang sử dụng phiên bản GIỚI HẠN. admin luôn sẵn sàng giúp
                  bạn có nhiều trải nghiệm hơn. liên hệ: email:
                  onlinetesthup@gmail.com
                </p>
              </Col>
            </Row>
          </Container>
        </footer>
      </div>
    );
  }
}
class App extends Component {
  componentDidMount() {
    var data = JSON.parse(localStorage.getItem("user"));
    if (data != null) {
      axios({
        method: "POST",
        url: `${API}/loading_login`,
        data: { id: data.IDUSER }
      })
        .then(data => {
          if (data.data.error) {
            window.localStorage.removeItem("user");
            window.location.reload();
          } else {
            fakeAuth.authenticate(() => {
              this.setState({
                RedirectToRender: true
              });
            });
          }
        })
        .catch(err => {
          console.error(err);
        });
    }
  }
  render() {
    return (
      <Router>
        <React.Fragment>
          <Switch>
            <Route path="/login" exact render={props => <Login {...props} />} />
            <Route path="/sign-in" component={() => <SignIn />} />
            <Route path="/" component={MainComponent} />
          </Switch>
        </React.Fragment>
      </Router>
    );
  }
}
export default App;
