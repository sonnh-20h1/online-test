import React, { Component } from "react";
import { API } from "./../../API/API";
import axios from "axios";
import { Table, Icon } from "antd";
import { Breadcrumb } from "./BaseManage";
import PersonalModal from './components/PersonModal'
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
      url: `${API}/personal/getExamPerson`,
    })
      .then((json) => {
        const data = json.data.map((item, index) => {
          return {
            ...item,
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
  onView = (record) => {
    this.setState({ record, open: true });
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
        title: "Tên đề",
        dataIndex: "EXAMTEXT",
        key: "EXAMTEXT",
      },
      {
        title: "Xem chi tiết",
        key: "status",
        render: (record) => (
          <Icon type="eye" onClick={() => this.onView(record)} />
        ),
      },
    ];
    const { data ,record ,open} = this.state;
    console.log(record);

    return (
      <React.Fragment>
        <div className="table-fx-left">
          <Breadcrumb home="Manage" manage="Tạo đề thi cá nhân" />
          <div style={{ margin: "20px", padding: "20px", background: "#fff" }}>
            <Table columns={columns} dataSource={data} />
          </div>
        </div>
        {open && (
          <PersonalModal
            open={open}
            edit={true}
            exam_id={record.IDEXAM}
            onCancel={() => this.setState({ open: false })}
          />
        )}
      </React.Fragment>
    );
  }
}
export default PersonManage;
