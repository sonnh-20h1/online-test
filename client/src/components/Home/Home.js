import React, { Component } from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import '../style.css';
import '../animate.css';
import axios from 'axios';
import { API } from './../../API/API';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      Redi: false
    }
  }
  LetGo = () => {
    this.setState({
      Redi: true
    })
  }
  componentDidMount() {
    var data = JSON.parse(localStorage.getItem('user'));
    if (data != null) {
      axios({
        method: 'POST',
        url: `${API}/loading_login`,
        data: { id: data.IDUSER }
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
  render() {
    var { Redi } = this.state;
    if (Redi) {
      return <Redirect to='/chu-de-trac-nghiem' />;
    }

    return (
      <Container>
        <Row>
          <Col className="flex_display">
            <div className="content_home">
              <h3>Chào mừng các anh hùng hảo hán đã ghé thăm</h3>
              <h4>Hãy cùng đọ sức và học hỏi với chúng tôi ở đây</h4>
              <Button
                className="btn_start animated-1 pulse"
                onClick={this.LetGo}
              >Bắt đầu ngay</Button>
            </div>
          </Col>
        </Row>
      </Container>
    )
  }
}
export default Home;