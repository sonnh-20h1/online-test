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
import { API } from "./../../../API/API";
import axios from "axios";
import { connect } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import ExpandedRowRender from "./ExpandedRowRender";
import { ButtonReadFile } from "../BaseManage";
import * as XLSX from "xlsx";
const { Option } = Select;

class PersonalModal extends Component {
  state = {
    data: [],
    loading: false,
    idExam: "",
    status: "",
    subjects: [],
    importExcel: false,
  };
  componentDidMount() {
    const { edit, exam_id } = this.props;
    this.getSubject();

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

  getSubject = async () => {
    var json = await axios({
      method: "POST",
      url: `${API}/display_sub`,
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
        status,
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
        status,
        idExam,
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
    const { data, idExam } = this.state;
    this.setState({
      loading: true,
    });
    var token = localStorage.getItem("token");
    let random =
      values.RandomQues > data.length ? data.length : values.RandomQues;
    const dataSave = {
      ...values,
      RandomQues: random,
      idExam: idExam ? idExam : uuidv4(),
      data,
      token,
    };
    var json = await axios({
      method: "POST",
      url: `${API}/CreateExamAdmin`,
      data: dataSave,
    }).catch((err) => {
      console.error(err);
    });
    if (json.status == 200) {
      this.openNotification();
      this.props.onCancel();
    }
    this.setState({
      loading: false,
    });
  };
  importExcel = () => {
    this.setState({
      importExcel: true,
    });
  };

  filterAnswer = (answer, arrayCorrect, correct) => {
    return (
      answer && {
        ID_ANS: "",
        ANS_TEXT: answer,
        CORRECT:
          arrayCorrect.filter((ele) => ele == correct).length > 0
            ? "true"
            : "false",
      }
    );
  };

  convertAnswers = (ele, arrayCorrect) => {
    return [
      this.filterAnswer(ele.answer_a, arrayCorrect, "A"),
      this.filterAnswer(ele.answer_b, arrayCorrect, "B"),
      this.filterAnswer(ele.answer_c, arrayCorrect, "C"),
      this.filterAnswer(ele.answer_d, arrayCorrect, "D"),
      this.filterAnswer(ele.answer_e, arrayCorrect, "E"),
    ];
  };

  ChangeExcel = (RowObject) => {
    var data = [];
    RowObject.forEach((ele) => {
      let ans = ele.da.toUpperCase().split(",");
      if (ans.length > 1) {
        data.push({
          ID_QUE: "",
          type: "2",
          QUE_TEXT: ele.questions,
          Answer: this.convertAnswers(ele, ans),
        });
      } else {
        data.push({
          ID_QUE: "",
          type: "",
          QUE_TEXT: ele.questions,
          Answer: this.convertAnswers(ele, ans)
        });
      } 
    }); 

    return data;
  };
  onChangeReadFile = (e) => {
    var file = e.target.files[0];
    if (file.name.split(".")[1] == "xlsx") {
      var reader = new window.FileReader();
      reader.readAsArrayBuffer(file);
      reader.onload = () => {
        var data = new Uint8Array(reader.result);
        var wb = XLSX.read(data, { type: "array" });
        var RowObject = XLSX.utils.sheet_to_row_object_array(
          wb.Sheets["Sheet1"]
        );
        var dataExcel = this.ChangeExcel(RowObject);
        console.log(dataExcel);
        
        const dataMap = dataExcel.map((item, index) => {
          let Answers = [];
          item.Answer.forEach((ans) => {
            if (ans && typeof ans !== "undefined") {
              let obj = {
                ...ans,
                key: uuidv4(),
              };
              Answers.push(obj);
            }
          });
          return {
            stt: index + 1,
            key: index,
            ID_QUE: item.ID_QUE,
            QUE_TEXT: item.QUE_TEXT,
            type: item.type ? item.type : "",
            Answer: Answers,
          };
        });
        console.log(dataMap);

        this.setState({
          data: dataMap,
          importExcel: false,
        });
      };
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
          <Input
            placeholder="Câu hỏi"
            defaultValue={record.QUE_TEXT}
            onChange={(event) => this.onChangeQue(event.target.value, record)}
          />
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
    const { data, loading, subjects, importExcel } = this.state;
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
          footer={
            <Button onClick={this.handleSubmit} type="primary" icon="save">
              Lưu
            </Button>
          }
        >
          <div>
            <Form className="create-form-exam">
              <Row gutter={[16, 6]}>
                <Col span={8}>
                  <Form.Item label="Mã đề">
                    {getFieldDecorator("idExam", {})(<Input disabled />)}
                  </Form.Item>
                </Col>
                <Col span={8}>
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
                <Col span={8}>
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
                <Col span={8}>
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
                <Col span={8}>
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
                <Col span={8}>
                  <Form.Item label="Trạng Thái">
                    {getFieldDecorator("status", {
                      rules: [
                        {
                          required: true,
                          message: "Vui lòng nhập thông tin!",
                        },
                      ],
                    })(
                      <Select placeholder="Chọn trạng thái">
                        <Option value={"1"}>Đề miễn phí</Option>
                        <Option value={"2"}>Đề trả phí</Option>
                        <Option value={"4"}>Đề VIP</Option>
                      </Select>
                    )}
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </div>
          <div className="text-align-right">
            <div>
              <Button
                type="primary"
                style={{ marginRight: "20px" }}
                onClick={this.importExcel}
              >
                <Icon type="import" /> Import excel
              </Button>
              <Button type="primary" onClick={this.createRowQuestion}>
                <Icon type="plus" /> Thêm câu hỏi
              </Button>
            </div>
          </div>
          {importExcel ? (
            <ButtonReadFile onChangeReadFile={this.onChangeReadFile} />
          ) : (
            <Table
              className="components-table-demo-nested"
              columns={columns}
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
          )}
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
