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
import ReactLoading from "react-loading";
import axios from "axios";
import { API } from "./../../API/API";
import './upload.css';

const SecBreadcrumb = ({ Title }) => {
  return (
    <div className="ol-breadcrumb">
      <Container>
        <Breadcrumb className="breadcrumb__content">
          <BreadcrumbItem href="/home">Trang chủ</BreadcrumbItem>
          <BreadcrumbItem active>{Title}</BreadcrumbItem>
        </Breadcrumb>
      </Container>
    </div>
  );
};
export const Loading = () => {
  return (
    <div className="show_ReactLoading">
      <div className="modal_backdrop show" />
      <div className="show_loading">
        <ReactLoading
          className="loading_inline"
          type={"spinningBubbles"}
          color="#fff"
        />
      </div>
    </div>
  );
};

class UploadFileQuestion extends Component {
  state = {
    loading: false,
    text:''
  };
  componentDidMount(){
    this.GetMessage()
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
        text: json.data[2].text
      });
    }
  }
  onUploadQuestion = async e => {
    e.preventDefault();
    var formData = new FormData();
    var target = e.target;
    var token = localStorage.getItem("user");
    if (target.filename.files[0]) {
      formData.append("token", token);
      formData.append("filename", target.filename.files[0]);
      var json = await axios({
        method: "POST",
        url: `${API}/upload-question`,
        data: formData
      }).catch(err => {
        console.error(err);
      });
      if (json.data.status == "success") {
        alert("Đã gửi file thành công!");
        window.location.reload();
      }
    } else {
      alert("Bạn vui lòng chọn file!");
    }
  };
  render() {
    const { loading,text } = this.state;
    return (
      <section className="ol-content">
        <SecBreadcrumb Title={"Upload file"} />
        <Container>
          <div className="page__wrapper">
            <div className="heading__box">
              <p>{text}</p>
            </div>
            <div className="part_upload">
              <form
                method="post"
                onSubmit={this.onUploadQuestion}
                encType="multipart/form-data"
                className="form_upload"
              >
                <input type="file" name="filename" />
                <button
                  className="btn btn-primary get-start bord0"
                  type="submit"
                >
                  Gửi
                </button>
              </form>
            </div>
          </div>
        </Container>
        {loading ? <Loading /> : ""}
      </section>
    );
  }
}

export default UploadFileQuestion;
