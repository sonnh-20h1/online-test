import React, { Component } from "react";
import { connect } from "react-redux";
import Pagination from "react-js-pagination";
import * as XLSX from "xlsx";
import axios from "axios";
import { updateStateData } from "./../../actions/index";
import { API } from "./../../API/API";
import {
  Breadcrumb,
  TableWrap,
  HeaderTable,
  ContentManage,
  ModalBackground,
  Loading,
  Input,
  ItemQuestion,
  ButtonReadFile,
  ButtonPrimary,
  Select
} from "./BaseManage";

import PersonalModal from "./createExams/PersonalModal";
const ExamManageContext = React.createContext();

const FormAddExam = ({ readonly }) => {
  return (
    <div className="row">
      <ExamManageContext.Consumer>
        {({ mainState }) => (
          <React.Fragment>
            <div className="col-md-4">
              <Input
                readonly={readonly}
                type="text"
                placeholder="Mã đề thi ..."
                name="IdExam"
                value={mainState.ItemExamManage.IdExam}
              />
            </div>
            <div className="col-md-4">
              <Input
                type="text"
                placeholder="Tên đề thi ..."
                name="NameExam"
                value={mainState.ItemExamManage.NameExam}
              />
            </div>
            <div className="col-md-4">
              <Input
                type="number"
                placeholder="Thời gian làm bài ..."
                name="TimeExam"
                value={mainState.ItemExamManage.TimeExam}
              />
            </div>
            <div className="col-md-4">
              <Input
                type="number"
                placeholder="Số câu chọn ngẫu nhiên ..."
                name="RandomNumber"
                value={mainState.ItemExamManage.RandomNumber}
              />
            </div>
            <div className="col-md-4">
              <Select
                name="SubjectExam"
                data={mainState.SubjectManage}
                Value={mainState.ItemExamManage.SubjectExam}
              />
            </div>
            <div className="col-md-4">
              <div className="form-group mag15">
                <select
                  className="form-control"
                  name="StatusExam"
                  defaultValue={mainState.ItemExamManage.status}
                >
                  <option value="1">Công khai</option>
                  <option value="2">Riêng tư</option>
                </select>
              </div>
            </div>
          </React.Fragment>
        )}
      </ExamManageContext.Consumer>
    </div>
  );
};

const TdAnswer = ({ answer, index, id, idQue }) => {
  return (
    <tr>
      <ExamManageContext.Consumer>
        {({ onChangeQuestion }) => (
          <React.Fragment>
            <td>
              <input
                type="radio"
                className="option_que radio_que"
                name={idQue ? idQue : index}
                onChange={() => onChangeQuestion(idQue, answer.ID_ANS)}
                defaultChecked={answer.CORRECT == "true" ? true : false}
                value={answer.ID_ANS}
              />
            </td>
            <td>
              <p>{answer.ANS_TEXT}</p>
            </td>
          </React.Fragment>
        )}
      </ExamManageContext.Consumer>
    </tr>
  );
};

const RowQuestion = ({ question, index }) => {
  return (
    <ItemQuestion index={index + 1} title={question.QUE_TEXT}>
      {question.Answer
        ? question.Answer.map((answer, id) => {
            return answer.ANS_TEXT ? (
              <TdAnswer
                answer={answer}
                key={id}
                idQue={question.ID_QUE}
                index={index}
              />
            ) : null;
          })
        : ""}
    </ItemQuestion>
  );
};

const FormAddQuestion = () => {
  return (
    <div className="pad border-wapper">
      <ExamManageContext.Consumer>
        {({ mainState }) => (
          <React.Fragment>
            {mainState.ListQuestions
              ? mainState.ListQuestions.map((question, index) => {
                  return (mainState.pageNumber - 1) * 20 <= index &&
                    index < mainState.pageNumber * 20 ? (
                    <RowQuestion
                      key={index}
                      question={question}
                      index={index}
                    />
                  ) : (
                    ""
                  );
                })
              : ""}
          </React.Fragment>
        )}
      </ExamManageContext.Consumer>
    </div>
  );
};

const ModalManage = ({ onClick }) => {
  return (
    <ModalBackground width={1200} onClick={onClick} title="Thêm đề thi">
      <ExamManageContext.Consumer>
        {({
          onChangeReadFile,
          mainState,
          handlePageChange,
          onSaveExam,
          onUpdateExam
        }) => (
          <React.Fragment>
            {mainState.ShowUpdate ? (
              <form onSubmit={onUpdateExam}>
                <FormAddExam readonly={true} />
                {mainState.ListQuestions == "" ? (
                  <ButtonReadFile onChangeReadFile={onChangeReadFile} />
                ) : (
                  <React.Fragment>
                    <FormAddQuestion />
                    <div
                      className="form-group mag15"
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr"
                      }}
                    >
                      <Pagination
                        activePage={mainState.pageNumber}
                        itemsCountPerPage={20}
                        totalItemsCount={mainState.ListQuestions.length}
                        pageRangeDisplayed={5}
                        onChange={handlePageChange}
                      />
                      <div className="text-right" style={{ margin: "13px 0" }}>
                        <ButtonPrimary>Sửa đề thi</ButtonPrimary>
                      </div>
                    </div>
                  </React.Fragment>
                )}
              </form>
            ) : (
              <form onSubmit={onSaveExam}>
                <FormAddExam />

                {mainState.ListQuestions == "" ? (
                  <ButtonReadFile onChangeReadFile={onChangeReadFile} />
                ) : (
                  <React.Fragment>
                    <FormAddQuestion />
                    <div
                      className="form-group mag15"
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr"
                      }}
                    >
                      <Pagination
                        activePage={mainState.pageNumber}
                        itemsCountPerPage={20}
                        totalItemsCount={mainState.ListQuestions.length}
                        pageRangeDisplayed={5}
                        onChange={handlePageChange}
                      />
                      <div className="text-right" style={{ margin: "13px 0" }}>
                        <ButtonPrimary>Tạo đề thi</ButtonPrimary>
                      </div>
                    </div>
                  </React.Fragment>
                )}
              </form>
            )}
          </React.Fragment>
        )}
      </ExamManageContext.Consumer>
    </ModalBackground>
  );
};
const ContentTable = () => {
  return (
    <React.Fragment>
      <ExamManageContext.Consumer>
        {({ mainState, onDeleteExam, onEditExam, handlePageChangeMain }) => (
          <React.Fragment>
            <TableWrap
              columns={[
                "STT",
                "Mã đề",
                "Tên đề",
                "Môn",
                "Thời gian",
                "Tổng số câu",
                "Random câu",
                "Trạng Thái",
                "Actions"
              ]}
            >
              <React.Fragment>
                {mainState.ExamManage
                  ? mainState.ExamManage.map((exam, index) => {
                      return (mainState.pageMainNumber - 1) * 20 <= index &&
                        index < mainState.pageMainNumber * 20 ? (
                        <RowTable
                          key={index}
                          exam={exam}
                          index={index}
                          onDeleteExam={onDeleteExam}
                          onEditExam={onEditExam}
                        />
                      ) : null;
                    })
                  : ""}
              </React.Fragment>
            </TableWrap>
            {mainState.ExamManage ? (
              <Pagination
                activePage={mainState.pageMainNumber}
                itemsCountPerPage={20}
                totalItemsCount={mainState.ExamManage.length}
                pageRangeDisplayed={5}
                onChange={handlePageChangeMain}
              />
            ) : (
              ""
            )}
          </React.Fragment>
        )}
      </ExamManageContext.Consumer>
    </React.Fragment>
  );
};
const RowTable = ({ exam, index, onDeleteExam, onEditExam }) => {
  const { SUBTEXT, EXAMTEXT, RANDOMEXAM, IDEXAM, EXTIME, EXNUM, status } = exam;
  return (
    <tr>
      <td>{index + 1}</td>
      <td>{IDEXAM}</td>
      <td>{EXAMTEXT}</td>
      <td>{SUBTEXT}</td>
      <td>{EXTIME}</td>
      <td>{EXNUM}</td>
      <td>{RANDOMEXAM}</td>
      <td>{status == 1 ? "Công khai" : "Riêng tư"}</td>
      <td>
        <span className="subject_edit" onClick={() => onEditExam(IDEXAM)}>
          <i className="fa fa-pencil edit_" />
        </span>
        <span className="subject_del" onClick={() => onDeleteExam(IDEXAM)}>
          <i className="fa fa-trash-o del_" />
        </span>
      </td>
    </tr>
  );
};

class ExamManage extends Component {
  constructor() {
    super();
    this.state = {
      status: false,
      loading: false,
      edit: false,
      exam_id: ""
    };
  }
  componentDidMount() {
    this.ShowData();
    this.ShowSubject();
  }
  ShowSubject = () => {
    axios({
      method: "POST",
      url: `${API}/display_sub`
    })
      .then(json => {
        this.props.dispatch(
          updateStateData({
            ...this.props.mainState,
            SubjectManage: json.data
          })
        );
      })
      .catch(err => {
        console.error(err);
      });
  };
  ShowData = () => {
    axios({
      method: "POST",
      url: `${API}/ShowExams`
    })
      .then(json => {
        this.props.dispatch(
          updateStateData({
            ...this.props.mainState,
            ExamManage: json.data,
            pageMainNumber: 1
          })
        );
      })
      .catch(err => {
        console.error(err);
      });
  };
  ChangeExcel = RowObject => {
    var data = [];
    RowObject.forEach(ele => {
      data.push({
        ID_QUE: "",
        QUE_TEXT: ele.questions,
        Answer: [
          ele.answer_a
            ? {
                ID_ANS: "",
                ANS_TEXT: ele.answer_a ? ele.answer_a : "",
                CORRECT: ele.answer_a
                  ? ele.da.toUpperCase() == "A"
                    ? "true"
                    : "false"
                  : ""
              }
            : "",
          ele.answer_b
            ? {
                ID_ANS: "",
                ANS_TEXT: ele.answer_b ? ele.answer_b : "",
                CORRECT: ele.answer_b
                  ? ele.da.toUpperCase() == "B"
                    ? "true"
                    : "false"
                  : ""
              }
            : "",
          ele.answer_c
            ? {
                ID_ANS: "",
                ANS_TEXT: ele.answer_c ? ele.answer_c : "",
                CORRECT: ele.answer_c
                  ? ele.da.toUpperCase() == "C"
                    ? "true"
                    : "false"
                  : ""
              }
            : "",
          ele.answer_d
            ? {
                ID_ANS: "",
                ANS_TEXT: ele.answer_d ? ele.answer_d : "",
                CORRECT: ele.answer_d
                  ? ele.da.toUpperCase() == "D"
                    ? "true"
                    : "false"
                  : ""
              }
            : "",
          ele.answer_e
            ? {
                ID_ANS: "",
                ANS_TEXT: ele.answer_e ? ele.answer_e : "",
                CORRECT: ele.answer_e
                  ? ele.da.toUpperCase() == "E"
                    ? "true"
                    : "false"
                  : ""
              }
            : ""
        ]
      });
    });
    return data;
  };
  onChangeReadFile = e => {
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
        this.props.dispatch(
          updateStateData({
            ...this.props.mainState,
            ListQuestions: dataExcel
          })
        );
      };
    }
  };

  handlePageChange = pageNumber => {
    this.props.dispatch(
      updateStateData({
        ...this.props.mainState,
        pageNumber: pageNumber
      })
    );
  };
  handlePageChangeMain = pageNumber => {
    this.props.dispatch(
      updateStateData({
        ...this.props.mainState,
        pageMainNumber: pageNumber
      })
    );
  };
  onSaveExam = e => {
    e.preventDefault();
    this.setState({
      loading: true
    });
    const data = new FormData(e.target);
    var dataExams = {
      IdExam: data.get("IdExam"),
      TimeExam: data.get("TimeExam"),
      NameExam: data.get("NameExam"),
      SubjectExam: data.get("SubjectExam"),
      RandomNumber: data.get("RandomNumber"),
      status: data.get("StatusExam"),
      data: this.props.mainState.ListQuestions
    };
    if (
      dataExams.IdExam &&
      dataExams.TimeExam &&
      dataExams.NameExam &&
      dataExams.RandomNumber
    ) {
      axios({
        method: "POST",
        url: `${API}/HanldingImportFileExcel`,
        data: dataExams
      })
        .then(json => {
          const { data } = json;
          if (data.error) {
            alert(data.error);
            this.setState({ loading: false });
          } else {
            alert(data.success);
            this.ShowData();
            this.setState({ status: false, loading: false });
            this.props.dispatch(
              updateStateData({
                ...this.props.mainState,
                ListQuestions: []
              })
            );
          }
        })
        .catch(err => {
          console.error(err);
        });
    } else {
      alert("vui lòng điền đầy đủ thông tin!");
    }
  };
  onDeleteExam = id => {
    if (window.confirm("Do you want to delete this exam ?")) {
      var data = { id: id };
      this.setState({
        loading: true
      });
      axios({
        method: "POST",
        url: `${API}/DeleteExamId`,
        data: data
      })
        .then(json => {
          this.ShowData();
          alert(json.data.success);
          this.setState({
            loading: false
          });
        })
        .catch(err => {
          console.error(err);
        });
    }
  };
  onEditExam = id => {
    console.log(id);
    this.setState({
      exam_id: id,
      edit: true,
      status: true
    });
  };
  onUpdateExam = e => {
    e.preventDefault();
    this.setState({
      loading: true
    });
    const data = new FormData(e.target);
    var dataExams = {
      IdExam: data.get("IdExam"),
      TimeExam: data.get("TimeExam"),
      NameExam: data.get("NameExam"),
      SubjectExam: data.get("SubjectExam"),
      RandomNumber: data.get("RandomNumber"),
      status: data.get("StatusExam")
    };
    if (
      dataExams.IdExam &&
      dataExams.TimeExam &&
      dataExams.NameExam &&
      dataExams.RandomNumber
    ) {
      axios({
        method: "POST",
        url: `${API}/UpdateExamId`,
        data: dataExams
      })
        .then(json => {
          const { data } = json;
          if (data.status.error) {
            alert(data.message);
            this.setState({ loading: false });
          } else {
            alert(data.message);
            this.ShowData();
            this.setState({ status: false, loading: false });
            this.props.dispatch(
              updateStateData({
                ...this.props.mainState,
                ListQuestions: []
              })
            );
          }
        })
        .catch(err => {
          console.error(err);
        });
    } else {
      alert("vui lòng điền đầy đủ thông tin!");
    }
  };
  onChangeQuestion = (idQue, idAns) => {
    var data = {
      idQue,
      idAns
    };
    this.setState({
      loading: true
    });
    axios({
      method: "POST",
      url: `${API}/UpdateQuestionId`,
      data: data
    })
      .then(json => {
        alert(json.data.message);
        this.setState({
          loading: false
        });
      })
      .catch(err => {
        console.error(err);
      });
  };
  render() {
    const { status, loading, edit, exam_id } = this.state;
    return (
      <React.Fragment>
        <ExamManageContext.Provider
          value={{
            dispatch: this.props.dispatch,
            mainState: this.props.mainState,
            onChangeReadFile: this.onChangeReadFile,
            onDeleteExam: id => this.onDeleteExam(id),
            onEditExam: id => this.onEditExam(id),
            onUpdateExam: this.onUpdateExam,
            onChangeQuestion: (id, idAns) => this.onChangeQuestion(id, idAns),
            handlePageChange: this.handlePageChange,
            handlePageChangeMain: this.handlePageChangeMain,
            onSaveExam: this.onSaveExam
          }}
        >
          <div className="table-fx-left">
            <Breadcrumb home="Manage" manage="Exams Management" />
            <ContentManage>
              <HeaderTable>
                <ButtonPrimary
                  onClick={() => {
                    this.setState({ status: true, edit: false });
                  }}
                >
                  Thêm đề thi
                </ButtonPrimary>
              </HeaderTable>
              <ContentTable />
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
          {/* <ModalManage
              onClick={() => {
                this.setState({ status: false });
                this.props.dispatch(
                  updateStateData({
                    ...this.props.mainState,
                    ItemExamManage: {
                      IdExam: "",
                      NameExam: "",
                      TimeExam: "",
                      RandomNumber: "",
                      SubjectExam: "",
                      status: 1
                    },
                    pageNumber: 1,
                    ShowUpdate: false,
                    ListQuestions: []
                  })
                );
              }}
            />  */}
          {loading ? <Loading /> : ""}
        </ExamManageContext.Provider>
      </React.Fragment>
    );
  }
}

export default connect(state => {
  return {
    mainState: state.updateStateData
  };
})(ExamManage);
