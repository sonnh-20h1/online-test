import React, { Component } from "react";
import { API } from "./../../API/API";
import axios from "axios";
import { Table, Icon, Divider, Modal } from "antd";
import { Breadcrumb } from "./BaseManage";
import PersonalModal from "./components/PersonModal";
import ExportExcel from "./components/ExportExcel";
class PersonManage extends Component {
  state = {
    data: [],
    open: false,
    exportEx: false,
    dataExport: [],
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
  exportExcel = async (record) => {
    let data = { id: record.IDEXAM };
    var json = await axios({
      method: "POST",
      url: `${API}/SelectExamId`,
      data: data,
    }).catch((err) => {
      console.error(err);
    });
    const { questions } = json.data[0];
    const convertQue = questions.map((que) => {
      let result = [];
      let answer = que.Answer.flatMap((item, index) => {
        if (item.CORRECT == "true") {
          if(index == 0) result.push("A");
          if(index == 1) result.push("B");
          if(index == 2) result.push("C");
          if(index == 3) result.push("D");
          if(index == 4) result.push("E");
          if(index == 5) result.push("F");
          if(index == 6) result.push("G");
          
        };
        return item.ANS_TEXT;
      });
      return {
        question: que.QUE_TEXT,
        result: result.join(","),
        answer,
      };
    });
    this.setState({ dataExport: convertQue, exportEx: true });
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
          <span>
            <Icon type="eye" onClick={() => this.onView(record)} />
            <Divider type="vertical" />
            <Icon type="export" onClick={() => this.exportExcel(record)} />
          </span>
        ),
      },
    ];
    const { data, record, open, exportEx, dataExport } = this.state;
    console.log(record);

    return (
      <React.Fragment>
        <div className="table-fx-left">
          <Breadcrumb home="Manage" manage="Tạo đề thi cá nhân" />
          <div style={{ margin: "20px", padding: "20px", background: "#fff" }}>
            <Table columns={columns} dataSource={data} />
          </div>
        </div>

        <Modal
          centered
          visible={exportEx}
          onCancel={() => this.setState({ exportEx: false })}
        >
          {exportEx && <ExportExcel dataExport={dataExport} />}
        </Modal>
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
