import React, { Component } from "react";
import { API } from "./../../API/API";
import axios from "axios";
import { Table, Icon } from "antd";
import { Breadcrumb } from "./BaseManage";
class PersonManage extends Component {
  state = {
    data: [],
    open: false,
    record: "",
    editorState: null,
  };
  componentDidMount() {
    this.ShowData();
  }
  ShowData = () => {
    axios({
      method: "GET",
      url: `${API}/personal/selectPerson`,
    })
      .then((json) => {
        let data = json.data
        data.sort((a, b) => {
          return b.create_time - a.create_time;
        });
        data = data.map((item, index) => {
          let dayNow = Math.floor((Date.now() - item.create_time) / 1000 / 60 / 60 / 24);
          let day = 0;
          if (item.useDay - dayNow > 0) day = item.useDay - dayNow;
          return {
            ...item,
            usedDay: day,
            stt: index + 1,
          };
        });

        this.setState({
          data,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  timeConverter = (time) => {
    var a = new Date(Number(time));

    return `${a.getDate()}-${a.getMonth() +
      1}-${a.getFullYear()} ${a.getHours()}:${a.getMinutes()}`;
  };

  render() {
    const columns = [
      {
        title: "STT",
        dataIndex: "stt",
        key: "stt",
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "email",
      },
      {
        title: "Ngày sử dụng",
        dataIndex: "usedDay",
        key: "usedDay",
      },
      {
        title: "Ngày dùng",
        dataIndex: "useDay",
        key: "useDay",
      },
      {
        title: "Ngày bắt đầu",
        key: "create_time",
        render: (record) => (
          <span>{this.timeConverter(record.create_time)}</span>
        ),
      },
      {
        title: "Trạng thái",
        key: "status",
        render: (record) => (
          <span>
            {record.usedDay > 0 ? (
              <span>
                <div className="dot-green" /> Hoạt động
              </span>
            ) : (
                <span>
                  <div className="dot-expired" /> Hết hạn
                </span>
              )}
          </span>
        ),
      },
      {
        title: "Giao dịch",
        key: "gaiodich",
        render: (record) => (
          <span>{record.status == "1" ? "Miễn phí" : "Trả phí"}</span>
        ),
      },
    ];
    const { data } = this.state;
    console.log(data);

    return (
      <React.Fragment>
        <div className="table-fx-left">
          <Breadcrumb home="Manage" manage="Tạo đề thi cá nhân" />
          <div style={{ margin: "20px", padding: "20px", background: "#fff" }}>
            <Table columns={columns} dataSource={data} />
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default PersonManage;
