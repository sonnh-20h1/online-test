import React, { Component } from "react";
import { Button, Container, Breadcrumb, BreadcrumbItem } from "react-bootstrap";
import { Link } from "react-router-dom";
const SecBreadcrumb = () => {
  return (
    <div className="ol-breadcrumb">
      <Container>
        <Breadcrumb className="breadcrumb__content">
          <BreadcrumbItem active>
            <Link to="/home">Trang chủ</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>Đề thi cá nhân</BreadcrumbItem>
        </Breadcrumb>
      </Container>
    </div>
  );
};

class PersonalExam extends Component {
  render() {
    return (
      <section className="PersonalExam">
        <SecBreadcrumb />
        <Container>
          <div className="page__wrapper">Tính năng mới đang được cập nhật</div>
        </Container>
      </section>
    );
  }
}

export default PersonalExam;
