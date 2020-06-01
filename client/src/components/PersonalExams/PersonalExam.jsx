import React, { Component } from "react";
import { Container, Breadcrumb, BreadcrumbItem } from "react-bootstrap";
import { Button, Table, Icon, Divider, Input, notification } from "antd";
import axios from "axios";
import { connect } from "react-redux";
import { updateStateData } from "./../../actions/index";
import PersonalModal from "./PersonalModal";
import { API } from "./../../API/API";
import { Link, Redirect } from "react-router-dom";
import BraftEditor from "braft-editor";
import "antd/dist/antd.css";
const { Search } = Input;

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
  state = {
    data: [],
    edit: false,
    open: false,
    permission: false,
    exam_id: "",
    text: "",
    useDay: 0,
    status: 1,
    subjects: [],
  };
  componentDidMount() {
    var token = localStorage.getItem("token");
    let data = { token: token };
    this.onShowData(data);
    this.GetMessage();
    this.statusPerson(data);
    this.getSubject();
  }

  openNotification = (type) => {
    if (type == true) {
      notification.info({
        message: `Thông báo`,
        description: "Bạn đã nhập mã thành công!",
        placement: "topRight",
      });
    } else {
      notification.error({
        message: `Thông báo`,
        description: "Mã xác nhận đã dùng hoặc đã hết hạn hoặc chưa chính xác!",
        placement: "topRight",
      });
    }
  };

  statusPerson = async (data) => {
    var json = await axios({
      method: "POST",
      url: `${API}/personal/statusPerson`,
      data: data,
    }).catch((err) => {
      console.error(err);
    });
    if (json.data) {
      let { create_time, useDay, status } = json.data;
      let dayNow = Math.floor((Date.now() - create_time) / 1000 / 60 / 60 / 24);
      let day = 0;
      if (useDay - dayNow > 0) day = useDay - dayNow;
      this.setState({
        useDay: day,
        permission: true,
        status,
      });
    }
  };

  getSubject = async () => {
    var json = await axios({
      method: "POST",
      url: `${API}/display_sub`,
    }).catch((err) => {
      console.error(err);
    });
    if (json) {
      this.setState({
        subjects: json.data,
      });
    }
  };

  async GetMessage() {
    var json = await axios({
      method: "POST",
      url: `${API}/GetMessage`,
    }).catch((err) => {
      console.error(err);
    });
    if (json.data) {
      this.setState({
        text: json.data[4].text,
      });
    }
  }

  onShowData = async (data) => {
    var json = await axios({
      method: "POST",
      url: `${API}/personal/getExamByUserId`,
      data: data,
    }).catch((err) => {
      console.error(err);
    });
    if (json) {
      this.props.dispatch(
        updateStateData({
          ...this.props.mainState,
          personal_exams: json.data,
        })
      );
      if (json.data) {
        const data = json.data.map((ele, index) => {
          return {
            stt: index + 1,
            id: ele.IDEXAM,
            text: ele.EXAMTEXT,
            sub: ele.SUBID,
            time: ele.EXTIME,
          };
        });
        this.setState({ data });
      }
    }
  };

  getStart = (record) => {
    console.log(record);
  };
  openModel = (edit, exam_id) => {
    this.setState({ open: true, edit, exam_id });
  };

  onConfirm = async (value) => {
    var token = localStorage.getItem("token");
    const data = {
      token,
      code: value,
      datetime: Date.now(),
    };
    var json = await axios({
      method: "POST",
      url: `${API}/personal/confirmCode`,
      data: data,
    }).catch((err) => {
      console.error(err);
    });
    if (json.data) {
      this.statusPerson({ token });
      this.openNotification(true);
    } else {
      this.openNotification(false);
    }
  };
  render() {
    const {
      permission,
      data,
      open,
      edit,
      exam_id,
      text,
      useDay,
      status,
      subjects,
    } = this.state;
    const columns = [
      {
        title: "STT",
        dataIndex: "stt",
        key: "stt",
      },
      {
        title: "Tên đề",
        dataIndex: "text",
        key: "text",
      },
      {
        title: "Môn học",
        key: "sub",
        render: (record) => (
          <span>
            {this.state.subjects &&
              this.state.subjects.filter((ele) => ele.SUBID == record.sub)[0]
                .SUBTEXT}
          </span>
        ),
      },
      {
        title: "Thời gian",
        dataIndex: "time",
        key: "time",
      },
      {
        title: "Action",
        key: "action",
        render: (record) => (
          <span>
            {useDay > 0 && (
              <React.Fragment>
                <Link to={`/detail-exam/${record.id}`}>
                  <Button type="primary" shape="round">
                    Thi <Icon type="arrow-right" />
                  </Button>
                </Link>
                <Divider type="vertical" />
                <Icon
                  type="edit"
                  onClick={() => {
                    this.openModel(true, record.id);
                  }}
                />
              </React.Fragment>
            )}
          </span>
        ),
      },
    ];

    return (
      <section className="PersonalExam">
        <SecBreadcrumb />
        <Container>
          <div className="page__wrapper" style={{ paddingTop: "20px" }}>
            {!permission && (
              <React.Fragment>
                <BraftEditor
                  language="en"
                  id="editor-with-table"
                  readOnly
                  style={{ height: "auto" }}
                  contentStyle={{ height: "auto" }}
                  controlBarStyle={{ display: "none" }}
                  value={BraftEditor.createEditorState(text)}
                />
                <div className="ant-btn-confirm">
                  <Search
                    placeholder="Nhập mã"
                    enterButton="Xác nhận"
                    onSearch={this.onConfirm}
                  />
                </div>
              </React.Fragment>
            )}
            {permission &&
              subjects.length > 0 && (
                <div className="create-exams">
                  <div className="button-add">
                    <div>
                      <span>Thời gian sử dụng: {useDay} ngày </span>
                      <br />
                      <span>
                        Loại: {status == "1" ? "Miễn phí" : "Trả phí"}
                      </span>
                      <br />
                      <Button
                        type="primary"
                        onClick={() => this.setState({ permission: false })}
                      >
                        Nhập mã
                      </Button>
                    </div>
                    <div>
                      <Button
                        type="primary"
                        onClick={() => this.openModel(false, "")}
                      >
                        <Icon type="plus" /> Thêm đề thi
                      </Button>
                    </div>
                  </div>
                  <div style={{ paddingTop: "20px" }}>
                    <Table bordered columns={columns} dataSource={data} />
                  </div>
                </div>
              )}
          </div>
        </Container>
        {open && (
          <PersonalModal
            open={open}
            edit={edit}
            exam_id={exam_id}
            onCancel={() => this.setState({ open: false })}
          />
        )}
      </section>
    );
  }
}
export default connect((state) => {
  return {
    mainState: state.updateStateData,
  };
})(PersonalExam);
