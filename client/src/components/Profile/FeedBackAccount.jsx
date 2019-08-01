import React, { Component } from "react";
import Pagination from "react-js-pagination";
import { Route, Link } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import { updateStateData } from "./../../actions/index";
import { API } from "./../../API/API";
import { WrapMaxTable } from "./BaseAccount";
import { Button, Container, Form, Row, Col } from "react-bootstrap";
import imgFeed from "./../../img/imgFeedBack.jpg";
import { toast } from "react-toastify";

const FeedBackAccountContext = React.createContext();

class FeedBackAccount extends React.Component {
  state = {
    text: ""
  };
  componentDidMount() {
    // this.onShowHistory(data);
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
        text: json.data[3].text
      });
    }
  }
  onShowHistory = async data => {
    var json = await axios({
      method: "POST",
      url: `${API}/GetHistoryExamUser`,
      data: data
    }).catch(err => {
      console.error(err);
    });
    if (json) {
      const { data } = json;
      this.props.dispatch(
        updateStateData({
          ...this.props.mainState,
          ListAccountHistory: data
        })
      );
    }
  };
  onFeedBack = async e => {
    e.preventDefault();
    var form = new FormData(e.target);
    var contentFeedBack = form.get("feedback");
    var token = localStorage.getItem("user");
    let data = { token: token, content: contentFeedBack };

    var json = await axios({
      method: "POST",
      url: `${API}/add-feedbackwebsite`,
      data: data
    }).catch(err => {
      console.error(err);
    });
    if(json){
      const {data} = json
      if(data.status == 'success'){
        alert('Cám ơn bạn đã đóng góp ý kiến về website của chúng tôi.');
        window.location.reload();
      }else{
        alert(data.message);
      }
    }
  };
  render() {
    const { text } = this.state;
    return (
      <div className="section-test">
        <FeedBackAccountContext.Provider
          value={{
            dispatch: this.props.dispatch,
            mainState: this.props.mainState
          }}
        >
          <Row className="title_feedback">
            <h4>Thông tin đáng chú ý</h4>
            <Col md={2}>
              <img src={imgFeed} alt="anh feed back" />
            </Col>
            <Col md={10}>
              <p>{text}</p>
            </Col>
          </Row>
          <Row className="content_feedback">
            <Col md={12}>
              <h4>Nội dung phản hồi của bạn</h4>
            </Col>
            <Col md={12}>
              <Form onSubmit={this.onFeedBack}>
                <textarea
                  name="feedback"
                  placeholder="Nhập nội dung phản hồi của bạn về trang web của chúng tôi ..."
                  id=""
                  rows="6"
                />
                <button type="submit" className="btn btn_primary">
                  Gửi
                </button>
              </Form>
            </Col>
          </Row>
        </FeedBackAccountContext.Provider>
      </div>
    );
  }
}

export default connect(state => {
  return {
    mainState: state.updateStateData
  };
})(FeedBackAccount);
