import React, { Component } from "react";
import axios from "axios";
import { Table, Icon, Button, Modal } from "antd";
import { Route, Link } from "react-router-dom";
import { updateStateData } from "./../../actions/index";
import { API } from "./../../API/API";
import { account } from "./../../constants/config";

class InfoAccount extends Component {
  state = {
    info: null,
    packages: [],
    exams: [],
    visible: false,
  };

  componentDidMount() {
    var token = localStorage.getItem("token");
    let data = { token: token };
    this.onShowData(data);
  }

  onShowData = async (data) => {
    var json = await axios({
      method: "POST",
      url: `${API}/profile/GetUserId`,
      data: data,
    }).catch((err) => {
      console.error(err);
    });
    if (json && json.data) {
      let packages = json.data.groups.map((g, index) => {
        return {
          stt: index + 1,
          ...g,
        };
      });
      this.setState({
        info: json.data,
        packages,
      });
    }
  };

  onClickView = async (id) => {
    this.setState({
      visible: true,
    });
    var json = await axios({
      method: "POST",
      url: `${API}/SelectAccountGroupId`,
      data: { id: id },
    }).catch((err) => {
      console.error(err);
    });
    if (json.data) {
      let { data } = json.data;
      data = data.map((g, index) => {
        return {
          stt: index + 1,
          ...g,
        };
      });
      this.setState({ exams: data });
    }
  };

  render() {
    const columns = [
      {
        title: "STT",
        dataIndex: "stt",
        key: "stt",
        width: "70px",
      },
      {
        title: "Tên gói",
        dataIndex: "name",
        key: "name",
        ellipsis: true,
        width: "30%",
      },
      {
        title: "Lần thi",
        dataIndex: "limit",
        key: "limit", 
        width: "80px",
      },
      {
        title: "Đã thi",
        dataIndex: "doing",
        key: "doing", 
        width: "80px",
      },
      {
        title: "Ngày bắt đầu",
        dataIndex: "create_on",
        key: "create_on",
        ellipsis: true,
      },
      {
        title: "Trạng thái",
        key: "answerSussess",
        width: "120px",
        render: (text, record) => (
          <span>
            {record.status == "1" && (
              <span>
                <div className="dot-green" /> Hoạt động
              </span>
            )}
            {record.status == "0" && (
              <span>
                <div className="dot-expired" /> Hết hạn
              </span>
            )}
          </span>
        ),
      },
      {
        title: "Hành động",
        key: "action",
        render: (text, record) => (
          <span>
            <Button
              type="primary"
              shape="round"
              onClick={() => this.onClickView(record.id)}
            >
              Chi tiết
            </Button>
          </span>
        ),
      },
    ];
    const cols = [
      {
        title: "STT",
        dataIndex: "stt",
        key: "stt",
        width: "70px",
      },
      {
        title: "Tên đề",
        dataIndex: "name",
        key: "name",
        width: "30%",
      },
      {
        title: "Môn thi",
        dataIndex: "subject",
        key: "subject",
        ellipsis: true,
      },
      {
        title: "Thời gian",
        dataIndex: "time",
        key: "time",
        ellipsis: true,
        width: "100px",
      },
      {
        title: "Hành động",
        key: "action",
        width: "150px",
        render: (text, record) => (
          <span>
            <Link to={`/detail-exam/${record.id_exam}`}>
              <Button type="primary" shape="round">
                Chi tiết
              </Button>
            </Link>
          </span>
        ),
      },
    ];
    const { info, packages, visible, exams } = this.state;
    return (
      <div>
        {info && (
          <div>
            <div>
              <div className="user-image">
                <img src={info.imageUrl} alt="" />
                {/* <img
                  src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png"
                  alt=""
                /> */}
              </div>
              <h3 style={{ textAlign: "center" }}>{info.name}</h3>
            </div>

            <div className="account-user-content row">
              <div className="col-md-6">
                <p>
                  Loại tài khoản:{" "}
                  <span>
                    {info.type
                      ? account.filter((ac) => ac.key == info.type)[0].name
                      : ""}
                  </span>
                </p>
              </div>
              <div className="col-md-12">
                <p>
                  Email: <span>{info.email}</span>
                </p>
              </div>
              <div className="col-md-6">
                <p>
                  {" "}
                  Tổng Số lần thi: <span>{info.do_limit}</span>
                </p>
              </div>
              <div className="col-md-6">
                <p>
                  Số lần đã thi: <span>{info.do_number}</span>
                </p>
              </div>
            </div>
            <Table bordered columns={columns} dataSource={packages} />

            <Modal
              title="Tất cả các đề thi"
              visible={visible}
              width={1000}
              footer={null}
              onCancel={() => this.setState({ visible: false })}
            >
              <Table bordered columns={cols} dataSource={exams} />
            </Modal>
          </div>
        )}
      </div>
    );
  }
}

export default InfoAccount;
