import React, { Component } from "react";
import { API } from "./../../API/API";
import axios from "axios";
import { Table, Icon } from "antd";
import { Breadcrumb } from "./BaseManage";
class UserActionManage extends Component {
  state = {
    data: [],
    open: false,
    record: "",
    editorState: null,
    today: 0
  };
  componentDidMount() {
    this.ShowData();
  }
  ShowData = () => {
    axios({
      method: "GET",
      url: `${API}/GetUserAction`,
    })
      .then((json) => {
        let data = json.data.map((item, index) => {
          return {
            ...item,
            stt: index + 1,
          };
        });
        let today = data.filter(d => d.date == this.dayNow());
        this.setState({
          data,
          today: today.length
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  dayNow = () => {
    var currentDate = new Date();
    var year = currentDate.getFullYear();
    var month = currentDate.getMonth() + 1;
    if (month < 10) month = "0" + month;
    var day = currentDate.getDate();
    if (day < 10) day = "0" + day;
    return year + "-" + month + "-" + day;
  };

  render() {
    const columns = [
      {
        title: "STT",
        dataIndex: "stt",
        key: "stt",
      },
      {
        title: "Tên",
        key: "avatar",
        render: (record) => (
          <span>
            <img src={record.avatar} alt="" className="imageUrl" />
            <span style={{ paddingLeft: "10px" }}>{record.name}</span>
          </span>
        ),
      },
      {
        title: "Chủ đề",
        dataIndex: "subject_name",
        key: "subject_name",
      },
      {
        title: "Tên đề",
        dataIndex: "exam_name",
        key: "exam_name",
      },
      {
        title: "Thời gian",
        key: "start_date",
        dataIndex: "start_date",
      },
      {
        title: "Loại đề",
        key: "gaiodich",
        render: (record) => (
          <span>
            {record.exam_type == "1" && "Miễn phí"}
            {record.exam_type == "2" && "Trả phí"}
            {record.exam_type == "4" && "VIP"}
          </span>
        ),
      },
    ];
    const { data, today } = this.state;
    console.log(data);

    return (
      <React.Fragment>
        <div className="table-fx-left">
          <Breadcrumb home="Quản lý" manage="Hoạt động của người dùng" />
          <div style={{ margin: "20px", padding: "20px", background: "#fff" }}>
            <p>Tông số đề thi đã làm: {data.length}</p>
            <p>Tông số đề thi đã làm hôm nay: {today}</p>
            <div style={{ marginBottom: "30px" }}>
              <Table
                columns={columns}
                dataSource={data}
                pagination={{
                  pageSize: 30,
                }}
                bordered
                expandRowByClick={true}
                defaultExpandAllRows={true}
                expandedRowRender={(record) => (
                  <div>
                    <p>Email: {record.email}</p>
                    <p>Bắt đầu: {record.start_date}</p>
                    <p>Trạng thái: {record.submited == "true" ? "Đã nộp" : "Chưa nộp"}</p>
                    {record.submited == "true" && <p>Câu đúng: {record.score} / {record.random}</p>}


                  </div>
                )}
              />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default UserActionManage;
