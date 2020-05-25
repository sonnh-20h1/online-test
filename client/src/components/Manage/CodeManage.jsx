import React, { Component } from "react";
import { API } from "./../../API/API";
import axios from "axios";
import { Table, Icon, Button, Modal, Form, Input, Select } from "antd";
import { Breadcrumb } from "./BaseManage";
const { Option } = Select;
class CodeManage extends Component {
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
      url: `${API}/personal/selectCode`,
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

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let data = {
          ...values,
          createDate: Date.now(),
        };
        axios({
          method: "POST",
          url: `${API}/personal/createCode`,
          data: data,
        })
          .then((json) => {
            this.setState({
              open: false,
            });
            this.ShowData();
          })
          .catch((err) => {
            console.error(err);
          });
      }
    });
  };

  openDelete = (record) => {
    axios({
      method: "POST",
      url: `${API}/personal/deleteCode`,
      data: { id: record.id },
    })
      .then((json) => {
        this.ShowData();
      })
      .catch((err) => {
        console.error(err);
      });
  };
  onOpen = () => {
    this.setState({ open: true });
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
        title: "Mã",
        dataIndex: "code",
        key: "code",
      },
      {
        title: "Hạn sử dụng",
        dataIndex: "expiryDay",
        key: "expiryDay",
      },
      {
        title: "Ngày dùng",
        dataIndex: "useDay",
        key: "useDay",
      },
      {
        title: "Ngày tạo",
        key: "create_date",
        render: (record) => (
          <span>{this.timeConverter(record.create_date)}</span>
        ),
      },
      {
        title: "Loại mã",
        key: "type",
        render: (record) => (
          <span>{record.type == "1" ? "Miễn phí" : "Trả phí"}</span>
        ),
      },
      {
        title: "Action",
        key: "action",
        render: (record) => (
          <Icon
            type="delete"
            style={{ color: "red" }}
            onClick={() => {
              this.openDelete(record);
            }}
          />
        ),
      },
    ];
    const { data, open } = this.state;
    const { getFieldDecorator } = this.props.form;
    console.log(data);
    return (
      <React.Fragment>
        <div className="table-fx-left">
          <Breadcrumb home="Manage" manage="code" />
          <div style={{ margin: "20px", padding: "20px", background: "#fff" }}>
            <div style={{ textAlign: "right" }}>
              <Button type="primary" onClick={this.onOpen}>
                <Icon type="plus" />
                Tạo mã
              </Button>
            </div>
            <Table columns={columns} dataSource={data} />
          </div>
        </div>
        <Modal
          title="Tạo mã"
          centered
          visible={open}
          onCancel={() => this.setState({ open: false })}
          position="left"
          footer={
            <Button onClick={this.handleSubmit} type="primary" icon="save">
              Lưu
            </Button>
          }
        >
          <Form>
            <Form.Item label="Mã">
              {getFieldDecorator("code", {
                rules: [{ required: true, message: "Nhập mã!" }],
              })(<Input placeholder="code" />)}
            </Form.Item>
            <Form.Item label="Hạn sử dụng">
              {getFieldDecorator("expiryDay", {
                rules: [{ required: true, message: "Vui lòng nhập đủ" }],
              })(<Input type="number" />)}
            </Form.Item>
            <Form.Item label="Ngày sử dụng">
              {getFieldDecorator("useDay", {
                rules: [{ required: true, message: "Vui lòng nhập đủ" }],
              })(<Input type="number" />)}
            </Form.Item>
            <Form.Item label="Loại mã">
              {getFieldDecorator("type", {
                rules: [{ required: true, message: "Vui lòng nhập đủ" }],
              })(
                <Select>
                  <Option value="1">Miễn phí</Option>
                  <Option value="2">Trả phí</Option>
                </Select>
              )}
            </Form.Item>
          </Form>
        </Modal>
      </React.Fragment>
    );
  }
}
const WrappedNormalCodeManage = Form.create({ name: "normal_CodeManage" })(
  CodeManage
);
export default WrappedNormalCodeManage;
