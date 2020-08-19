import React, { Component } from "react";
import {
  Modal,
  Table,
  Button,
  Icon,
  Input,
  Select, 
  Form,
  Row,
  Col,
  notification,
} from "antd";
import { API } from "../../../API/API";
import axios from "axios";
import { connect } from "react-redux";
import { v4 as uuidv4 } from "uuid"; 
import ExpandedRowRender from "./ExpandedRowRender";
const { Option } = Select;

class PersonalModal extends Component {
  state = {
    data: [],
    loading: false,
    idExam: "",
    status: "3",
    subjects: [],
  };
  componentDidMount() {
    const { edit, exam_id } = this.props;
    this.getAllSubject();

    if (edit) {
      // let data = { id: "DC_TH_1" };
      let data = { id: exam_id };
      this.getExamId(data);
    }
  }
  openNotification = () => {
    notification.info({
      message: `Thông báo`,
      description: "Đề thi đã được cập nhật!",
      placement: "topRight",
    });
  };

  getAllSubject = async () => {
    var json = await axios({
      method: "POST",
      url: `${API}/getAllSubject`,
    }).catch((err) => {
      console.error(err);
    });
    if (json) {
      this.setState({
        subjects: json.data,
      });
    }
  };

  getExamId = async (data) => {
    var json = await axios({
      method: "POST",
      url: `${API}/SelectExamId`,
      data: data,
    }).catch((err) => {
      console.error(err);
    });
    if (json) {
      const questions = json.data[0].questions.map((item, index) => {
        return {
          stt: index + 1,
          key: index,
          ID_QUE: item.ID_QUE,
          QUE_TEXT: item.QUE_TEXT,
          type: item.type ? item.type : "",
          Answer: item.Answer,
        };
      });
      const {
        idExam,
        NameExam,
        SubjectExam,
        TimeExam,
        RandomQues,
      } = json.data[0];
      this.setState({
        idExam,
        data: questions,
      });
      this.props.form.setFieldsValue({
        NameExam,
        SubjectExam,
        TimeExam,
        RandomQues,
      });
    }
  };
  onChangeType = (type, record) => {
    const newData = [...this.state.data];
    const index = newData.findIndex((item) => record.key === item.key);
    if (index > -1) {
      const item = newData[index];
      newData.splice(index, 1, {
        ...item,
        type,
        Answer: item.Answer.map((ans) => {
          return {
            ...ans,
            CORRECT: "false",
          };
        }),
      });
    }
    this.setState({ data: newData });
  };
  onChangeQue = (text, record) => {
    const newData = [...this.state.data];
    const index = newData.findIndex((item) => record.key === item.key);
    if (index > -1) {
      const item = newData[index];
      newData.splice(index, 1, {
        ...item,
        QUE_TEXT: text,
      });
    }
    this.setState({ data: newData });
  };

  createRowAnswer = (record) => {
    console.log(record);
    const newData = [...this.state.data];
    const index = newData.findIndex((item) => record.key === item.key);
    if (index > -1) {
      const item = newData[index];
      let anwsers = item.Answer;
      anwsers.push({
        key: uuidv4(),
        ID_ANS: "",
        ID_QUE: item.ID_QUE,
        ANS_TEXT: "",
        CORRECT: "false",
      });
      newData.splice(index, 1, {
        ...item,
        Answer: anwsers,
      });
    }
    this.setState({ data: newData });
  };
  createRowQuestion = () => {
    const newQuestion = {
      ID_QUE: "",
      QUE_TEXT: "",
      type: "",
      Answer: [],
    };
    const newData = [...this.state.data];
    newData.splice(0, 0, newQuestion);
    const questions = newData.map((item, index) => {
      return {
        stt: index + 1,
        key: item.ID_QUE ? item.ID_QUE : uuidv4(),
        ID_QUE: item.ID_QUE,
        QUE_TEXT: item.QUE_TEXT,
        type: item.type ? item.type : "",
        Answer: item.Answer,
      };
    });
    this.setState({ data: questions, loading: true });
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevState.data.length !== this.state.data.length) {
      setTimeout(() => {
        this.setState({
          loading: false,
        });
      }, 0);
    }
  }
  onChangeText = (text, record, i) => {
    const newData = [...this.state.data];
    const index = newData.findIndex((item) => record.key === item.key);
    if (index > -1) {
      const item = newData[index];
      const answers = [...item.Answer];
      answers.splice(i, 1, {
        ...answers[i],
        ANS_TEXT: text,
      });
      newData.splice(index, 1, {
        ...item,
        Answer: answers,
      });
    }
    this.setState({ data: newData });
  };
  onChangeTypeAnswers = (checked, type, record, i) => {
    const newData = [...this.state.data];
    const index = newData.findIndex((item) => record.key === item.key);
    console.log(checked);

    if (index > -1) {
      const item = newData[index];
      let answers = [];
      if (type === "radio") {
        answers = item.Answer.map((ans) => {
          return {
            ...ans,
            CORRECT: "false",
          };
        });
        answers.splice(i, 1, {
          ...answers[i],
          CORRECT: "true",
        });
      } else if (type == "checkbox") {
        answers = [...item.Answer];
        if (checked) {
          answers.splice(i, 1, {
            ...answers[i],
            CORRECT: "true",
          });
        } else {
          answers.splice(i, 1, {
            ...answers[i],
            CORRECT: "false",
          });
        }
      }
      newData.splice(index, 1, {
        ...item,
        Answer: answers,
      });
    }
    this.setState({ data: newData });
  };
  onDeleteAnswer = (record, i) => {
    const newData = [...this.state.data];
    const index = newData.findIndex((item) => record.key === item.key);
    if (index > -1) {
      const item = newData[index];
      console.log(i);
      const newAnswer = [...item.Answer];
      newAnswer.splice(i, 1);
      console.log(newAnswer);

      newData.splice(index, 1, {
        ...item,
        Answer: newAnswer,
      });
    }
    this.setState({ data: newData });
  };
  onDeleteQue = (record) => {
    const newData = [...this.state.data];
    const index = newData.findIndex((item) => record.key === item.key);
    if (index > -1) {
      newData.splice(index, 1);
    }
    this.setState({ data: newData });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.handleSave(values);
      }
    });
  };
  handleSave = async (values) => {
    const { data, status, idExam } = this.state;
    var token = localStorage.getItem("token");
    let random =
      values.RandomQues > data.length ? data.length : values.RandomQues;
    const dataSave = {
      ...values,
      RandomQues: random,
      idExam: idExam ? idExam : uuidv4(),
      data,
      status,
      token,
    };
    var json = await axios({
      method: "POST",
      url: `${API}/personal/CreateExamPerson`,
      data: dataSave,
    }).catch((err) => {
      console.error(err);
    });
    if (json.status == 200) {
      this.openNotification();
      this.props.onCancel()
    }
  };
  render() {
    const columns = [
      { title: "STT", width: "8%", dataIndex: "stt", key: "stt" },
      {
        title: "Câu hỏi",
        key: "QUE_TEXT",
        width: "60%",
        render: (record) => (
        //   <Input
        //     placeholder="Câu hỏi"
        //     defaultValue={record.QUE_TEXT}
        //     onChange={(event) => this.onChangeQue(event.target.value, record)}
        //   />
        <span>{record.QUE_TEXT}</span>

        ),
      },
      {
        title: "Loại câu hỏi",
        key: "type",
        render: (record) => (
          <Select
            defaultValue={record.type}
            onChange={(event) => this.onChangeType(event, record)}
            style={{ width: 120 }}
          >
            <Option value="">Một đáp án</Option>
            <Option value={"2"}>Nhiều đáp án</Option>
          </Select>
        ),
      },
      {
        title: "Action",
        key: "operation",
        render: (record) => (
          <Icon
            type="delete"
            theme="twoTone"
            twoToneColor="red"
            onClick={() => this.onDeleteQue(record)}
          />
        ),
      },
    ];
    const { data, loading, subjects } = this.state;
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Modal
          title="Tạo đề thi"
          centered
          width={1000}
          visible={this.props.open}
          onCancel={this.props.onCancel}
          position="left"
          footer={<div></div>
            // <Button onClick={this.handleSubmit} type="primary" icon="save">
            //   Lưu
            // </Button>
          }
        >
          <div>
            <Form className="create-form-exam">
              <Row gutter={[16, 6]}>
                <Col span={12}>
                  <Form.Item label="Tên đề">
                    {getFieldDecorator("NameExam", {
                      rules: [
                        {
                          required: true,
                          message: "Vui lòng nhập thông tin!",
                        },
                      ],
                    })(<Input />)}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Môn">
                    {getFieldDecorator("SubjectExam", {
                      rules: [
                        {
                          required: true,
                          message: "Vui lòng nhập thông tin!",
                        },
                      ],
                    })(
                      <Select placeholder="Chọn môn học">
                        {subjects &&
                          subjects.map((sub, index) => (
                            <Option key={index} value={sub.SUBID}>
                              {sub.SUBTEXT}
                            </Option>
                          ))}
                      </Select>
                    )}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Thời gian làm bài">
                    {getFieldDecorator("TimeExam", {
                      rules: [
                        {
                          required: true,
                          message: "Vui lòng nhập thông tin!",
                        },
                      ],
                    })(<Input type="number" />)}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Số câu hiển thị ngẫu nhiên">
                    {getFieldDecorator("RandomQues", {
                      rules: [
                        {
                          required: true,
                          message: "Vui lòng nhập thông tin!",
                        },
                      ],
                    })(<Input type="number" />)}
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </div>
          <div className="text-align-right">
            {/* <Button type="primary" onClick={this.createRowQuestion}>
              <Icon type="plus" /> Thêm câu hỏi
            </Button> */}
          </div>
          <Table
            className="components-table-demo-nested"
            columns={columns}
            expandRowByClick
            defaultExpandAllRows={true}
            expandedRowRender={(record) => (
              <ExpandedRowRender
                record={record}
                createRowAnswer={() => this.createRowAnswer(record)}
                onChangeText={this.onChangeText}
                onDeleteAnswer={this.onDeleteAnswer}
                onChangeType={this.onChangeTypeAnswers}
              />
            )}
            loading={loading}
            dataSource={data}
          />
        </Modal>
      </div>
    );
  }
}

const WrappedPersonalModal = Form.create({ name: "normal_personal" })(
  PersonalModal
);
export default connect((state) => {
  return {
    mainState: state.updateStateData,
  };
})(WrappedPersonalModal);
