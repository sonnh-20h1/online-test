import React, { Component } from "react"; 
import { Route, Link } from "react-router-dom";
import axios from "axios";
import { Table, Icon, Button } from "antd"; 
import { API } from "./../../API/API";
 

class HistoryAccount extends React.Component {
  state = {
    data: [],
  };
  componentDidMount() {
    var token = localStorage.getItem("token");
    let data = { token: token };
    this.onShowHistory(data);
  }
  onShowHistory = async (data) => {
    var json = await axios({
      method: "POST",
      url: `${API}/profile/GetHistoryExamUser`,
      data: data,
    }).catch((err) => {
      console.error(err);
    });
    if (json) {
      let { data } = json;
      data = data.filter((d) => d.CONFIRM);
      data = data.map((d, index) => {
        return {
          ...d,
          stt: index + 1,
        };
      });
      this.setState({ data });
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
        title: "Tên đề",
        dataIndex: "EXAMTEXT",
        key: "EXAMTEXT",
        ellipsis: true,
        width: "30%",
      },
      {
        title: "Môn học",
        dataIndex: "SUBTEXT",
        key: "SUBTEXT",
        ellipsis: true,
      },
      {
        title: "Câu đúng",
        key: "answerSussess",
        width: "100px",
        render: (text, record) => (
          <span>
            {record.SCORE ? record.SCORE : 0} / {record.RANDOMEXAM}
          </span>
        ),
      },
      {
        title: "Ngày làm",
        dataIndex: "DATEEXAM",
        key: "DATEEXAM",
        ellipsis: true,
      },
      {
        title: "Hành động",
        key: "action",
        render: (text, record) => (
          <span>
            <Link to={`/result-test?id=${record.ID_UX}`}>
              <Button type="primary" shape="round">
                Xem <Icon type="arrow-right" />
              </Button>
            </Link>
          </span>
        ),
      },
    ];
    const { data } = this.state; 
    return (
      <div className="section-test">
        <div className="account-section-header">
          <h3 style={{ textAlign: "center" }}>Các đề thi đã làm</h3>
        </div>
        <Table bordered columns={columns} dataSource={data} />
      </div>
    );
  }
}

export default HistoryAccount;
