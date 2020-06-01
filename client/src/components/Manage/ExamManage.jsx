import React, { Component } from "react";
import { connect } from "react-redux";
import * as XLSX from "xlsx";
import axios from "axios";
import { updateStateData } from "./../../actions/index";
import { API } from "./../../API/API";
import { Breadcrumb, ContentManage, Loading } from "./BaseManage";
import { Table, Button, Icon, Select, Divider } from "antd";

import PersonalModal from "./createExams/PersonalModal";
const { Option } = Select;

class ExamManage extends Component {
  constructor() {
    super();
    this.state = {
      status: false,
      loading: false,
      edit: false,
      exam_id: "",
      data: [],
      subjects: [],
      filterData: [],
    };
  }
  componentDidMount() {
    this.ShowData();
    this.ShowSubject();
  }
  ShowSubject = () => {
    axios({
      method: "POST",
      url: `${API}/display_sub`,
    })
      .then((json) => {
        this.setState({ subjects: json.data });
        this.props.dispatch(
          updateStateData({
            ...this.props.mainState,
            SubjectManage: json.data,
          })
        );
      })
      .catch((err) => {
        console.error(err);
      });
  };
  ShowData = () => {
    axios({
      method: "POST",
      url: `${API}/ShowExams`,
    })
      .then((json) => {
        const data = [];
        json.data.map((item, index) => {
          if (item.status != 3)
            data.push({
              stt: index + 1,
              ...item,
            });
        });
        console.log(data);

        this.setState({ data });
        this.props.dispatch(
          updateStateData({
            ...this.props.mainState,
            ExamManage: data,
            pageMainNumber: 1,
          })
        );
      })
      .catch((err) => {
        console.error(err);
      });
  };

  onDeleteExam = (id) => {
    if (window.confirm("Do you want to delete this exam ?")) {
      var data = { id: id };
      this.setState({
        loading: true,
      });
      axios({
        method: "POST",
        url: `${API}/DeleteExamId`,
        data: data,
      })
        .then((json) => {
          this.ShowData();
          alert(json.data.success);
          this.setState({
            loading: false,
          });
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };
  onEditExam = (id) => {
    console.log(id);
    this.setState({
      exam_id: id,
      edit: true,
      status: true,
    });
  };

  onChangeSubject = (value) => {
    const { data } = this.state;
    const filterData = data.filter((ele) => ele.SUBID == value);
    this.setState({ filterData });
  };
  render() {
    const columns = [
      { title: "STT", width: "8%", dataIndex: "stt", key: "stt" },
      { title: "Mã đề", dataIndex: "IDEXAM", key: "IDEXAM" },
      { title: "Tên đề", dataIndex: "EXAMTEXT", key: "EXAMTEXT" },
      { title: "Môn", dataIndex: "SUBTEXT", key: "SUBTEXT" },
      {
        title: "Trạng thái",
        key: "status",
        render: (record) => (
          <span>
            {record.status == "1"
              ? "Miễn phí"
              : record.status == "4"
                ? "VIP"
                : "Trả phí"}
          </span>
        ),
      },
      {
        title: "Action",
        key: "action",
        render: (record) => (
          <span>
            <Icon type="edit" onClick={() => this.onEditExam(record.IDEXAM)} />
            <Divider type="vertical" />
            <Icon
              type="delete"
              onClick={() => this.onDeleteExam(record.IDEXAM)}
            />
          </span>
        ),
      },
    ];
    const {
      status,
      loading,
      edit,
      exam_id,
      data,
      subjects,
      filterData,
    } = this.state;

    return (
      <React.Fragment>
        <div className="table-fx-left">
          <Breadcrumb home="Manage" manage="Exams Management" />
          <ContentManage>
            <div style={{ paddingBottom: "50px" }}>
              <div className="header-exams-flex">
                <Select
                  style={{ width: 200 }}
                  onChange={this.onChangeSubject}
                  placeholder="Select a subject"
                >
                  {subjects.length > 0 &&
                    subjects.map((sub, index) => (
                      <Option key={index} value={sub.SUBID}>
                        {sub.SUBTEXT}
                      </Option>
                    ))}
                </Select>
                <div>Tổng số đề: {data.length}</div>
                <Button
                  type="primary"
                  onClick={() => {
                    this.setState({ status: true, edit: false });
                  }}
                >
                  Thêm đề thi
                </Button>
              </div>
              <Table
                className="components-table-demo-nested"
                columns={columns}
                dataSource={filterData.length > 0 ? filterData : data}
                expandedRowRender={(record) => (
                  <div>
                    <p>Thời gian: {record.EXTIME} phút</p>
                    <p>Tổng số câu: {record.EXNUM}</p>
                    <p>Số câu ngẫu nhiên: {record.RANDOMEXAM}</p>
                  </div>
                )}
              />
            </div>
          </ContentManage>
        </div>
        {status && (
          <div>
            <PersonalModal
              open={status}
              edit={edit}
              exam_id={exam_id}
              onCancel={() => this.setState({ status: false })}
            />
          </div>
        )}
        {loading ? <Loading /> : ""}
      </React.Fragment>
    );
  }
}

export default connect((state) => {
  return {
    mainState: state.updateStateData,
  };
})(ExamManage);
