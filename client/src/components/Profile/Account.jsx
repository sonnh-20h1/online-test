import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { Layout, Menu } from "antd";
import "./style.css";
import { account } from "./../../constants/config";
import { Link, Redirect } from "react-router-dom";

import InfoAccount from "./InfoAccount";
import FeedBackAccount from "./FeedBackAccount";
import HistoryAccount from "./HistoryAccount";
import { Container, Breadcrumb, BreadcrumbItem } from "react-bootstrap";
const { Header, Content, Sider } = Layout;

const SecBreadcrumb = () => {
  return (
    <div className="ol-breadcrumb">
      <Container>
        <Breadcrumb className="breadcrumb__content">
          <BreadcrumbItem active>
            <Link to="/home">Trang chủ</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>Tài khoản</BreadcrumbItem>
        </Breadcrumb>
      </Container>
    </div>
  );
};

class Accounts extends Component {
  state = {
    page: 1,
  };

  render() {
    const { page } = this.state;
    return (
      <section className="PersonalExam">
        <SecBreadcrumb />
        <Container>
          <div className="page__wrapper" style={{ padding: 0 }}>
            <Layout style={{ height: "100%" }}>
              <Sider width={200} style={{ background: "#fff" }}>
                <Menu
                  mode="inline"
                  defaultSelectedKeys={["1"]}
                  style={{ height: "100%" }}
                >
                  <Menu.Item
                    onClick={() => {
                      this.setState({ page: 1 });
                    }}
                    key="1"
                  >
                    Thông tin tài khoản
                  </Menu.Item>
                  <Menu.Item
                    onClick={() => {
                      this.setState({ page: 2 });
                    }}
                    key="2"
                  >
                    Các đề thi đã làm
                  </Menu.Item>
                  <Menu.Item
                    onClick={() => {
                      this.setState({ page: 3 });
                    }}
                    key="3"
                  >
                    Phản hồi trang website
                  </Menu.Item>
                </Menu>
              </Sider>
              <Layout>
                <Content
                  style={{
                    background: "rgba(255, 255, 255, 0.9)",
                    padding: 24,
                    margin: 0,
                  }}
                >
                  {page == 1 && <InfoAccount />}
                  {page == 2 && <HistoryAccount />}
                  {page == 3 && <FeedBackAccount />}
                </Content>
              </Layout>
            </Layout>
          </div>
        </Container>
      </section>
    );
  }
}

export default connect((state) => {
  return {
    mainState: state.updateStateData,
  };
})(Accounts);
