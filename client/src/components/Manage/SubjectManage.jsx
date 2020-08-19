import React, { Component } from "react";
import { connect } from "react-redux";
import { updateStateData } from "./../../actions/index";
import { API } from "./../../API/API";
import axios from "axios";
import { Table, Icon, Button, Modal, Form, Input, Select } from "antd";
import {
  Breadcrumb,
  ContentManage,
} from "./BaseManage";

const { Option } = Select;

class SubjectManage extends Component {
  constructor() {
    super();
    this.state = {
      status: false,
      loading: false,
      permission: 1
    };
  }
  componentDidMount() {
    this.ShowData(this.state.permission);
  }
  ShowData = (permission) => {
    axios({
      method: "POST",
      url: `${API}/display_sub`,
      data: { permission: permission }
    })
      .then(json => {
        let data = json.data.map((s, index) => {
          return {
            stt: index + 1,
            id: s.SUBID,
            name: s.SUBTEXT
          }
        })
        this.props.dispatch(
          updateStateData({
            ...this.props.mainState,
            SubjectManage: data
          })
        );
      })
      .catch(err => {
        console.error(err);
      });
  };
  handleSubmit = e => {
    e.preventDefault();
    // const data = new FormData();
    // console.log(data.get("NameSubject"))
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let formData = new FormData();
        formData.append('sub_id', values.sub_id);
        formData.append('sub_name', values.sub_name);
        formData.append('permission', 1);

        axios({
          method: "POST",
          url: `${API}/create_sub`,
          data: formData
        })
          .then(json => {
            if (json.data === "success") {
              this.setState({
                status: false,
                loading: false
              });
              this.ShowData();
            } else if (json.data === "already") {
              window.alert("This subject ID has already existed!");
            } else if (json.data === null) {
              window.alert("Please fill in all infomation!");
            }
          })
          .catch(err => {
            console.error(err);
          });
      }
    });

  };
  onDeleteSubject = (id) => {
    if (window.confirm("Do you want to delete this subject ?")) {
      var data = { id: id };
      this.setState({
        loading: true
      });
      axios({
        method: "POST",
        url: `${API}/del_sub`,
        data: data
      })
        .then(json => {
          this.ShowData();
          this.setState({
            loading: false
          });
        })
        .catch(err => {
          console.error(err);
        });
    }
  };
  onSelect = (value) => {
    this.ShowData(value);
    this.setState({ permission: value })
  }

  render() {

    const columns = [
      {
        title: "STT",
        dataIndex: "stt",
        key: "stt",
      },
      {
        title: "ID",
        dataIndex: "id",
        key: "id",
      },
      {
        title: "Tên chủ đề",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "Hành động",
        key: "action",
        render: (record) => (
          <Icon
            type="delete"
            style={{ color: "red" }}
            onClick={() => {
              this.onDeleteSubject(record.id);
            }}
          />
        ),
      },
    ];

    const { status, loading, permission } = this.state;
    const { SubjectManage } = this.props.mainState;
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="table-fx-left">
        <Breadcrumb home="Quản lý" manage="Quản lý các chủ đề" />
        <ContentManage>
          <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: "20px" }}>
            <Select value={permission} onChange={this.onSelect}>
              <Option value={1}>Quản trị viên</Option>
              <Option value={2}>Người dùng</Option>
            </Select>

            <Button
              type="primary"
              onClick={() => {
                this.setState({ status: true });
              }}
            >
              <Icon type="plus" />
                  Thêm chủ đề
              </Button>
          </div>
          <Table
            bordered
            pagination={{
              pageSize: 20,
            }}
            columns={columns}
            dataSource={SubjectManage}
          />
        </ContentManage>

        <Modal
          title="Tạo mã"
          centered
          visible={status}
          onCancel={() => this.setState({ status: false })}
          position="left"
          footer={
            <Button onClick={this.handleSubmit} type="primary" icon="save">
              Lưu
            </Button>
          }
        >
          <Form>
            <Form.Item label="ID">
              {getFieldDecorator("sub_id", {
                rules: [{ required: true, message: "Nhập id!" }],
              })(<Input />)}
            </Form.Item>
            <Form.Item label="Tên chủ đề">
              {getFieldDecorator("sub_name", {
                rules: [{ required: true, message: "Vui lòng nhập đủ" }],
              })(<Input />)}
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}

const WrappedSubjectManage = Form.create({ name: "normal_subject" })(
  SubjectManage
);

export default connect(state => {
  return {
    mainState: state.updateStateData
  };
})(WrappedSubjectManage);
