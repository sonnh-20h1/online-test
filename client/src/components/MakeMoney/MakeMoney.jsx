import React, { Component } from "react";
import { Container, Breadcrumb, BreadcrumbItem } from "react-bootstrap";
import { Layout, Menu } from "antd";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import { API } from "./../../API/API";
import PageData from "./PageData";

const { Header, Content, Sider } = Layout;

const SecBreadcrumb = () => {
  return (
    <div className="ol-breadcrumb">
      <Container>
        <Breadcrumb className="breadcrumb__content">
          <BreadcrumbItem active>
            <Link to="/home">Trang chủ</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>Kiếm tiền</BreadcrumbItem>
        </Breadcrumb>
      </Container>
    </div>
  );
};

class MakeMoney extends Component {
  state = {
    page: 1,
    data: [],
  };

  componentDidMount() {
    this.GetMessage();
  }
  async GetMessage() {
    var json = await axios({
      method: "POST",
      url: `${API}/GetMessage`,
    }).catch((err) => {
      console.error(err);
    });
    if (json.data) {
      this.setState({
        data: json.data,
      });
    }
  }

  render() {
    const { page, data } = this.state;
    console.log(page);

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
                    Phân loại tài khoản
                  </Menu.Item>
                  <Menu.Item
                    onClick={() => {
                      this.setState({ page: 2 });
                    }}
                    key="2"
                  >
                    Kiếm tiền
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
                  {page == 1 &&
                    data.length > 0 && <PageData text={data[7].text} />}
                  {page == 2 &&
                    data.length > 0 && <PageData text={data[8].text} />}
                </Content>
              </Layout>
            </Layout>
          </div>
        </Container>
      </section>
    );
  }
}

export default MakeMoney;
