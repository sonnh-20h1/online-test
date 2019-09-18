import React, { Component } from "react";
import { connect } from "react-redux";
import Pagination from "react-js-pagination";
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

const GroupManageContext = React.createContext();

const AddModalManage = ({ onClick }) => {
  return (
    <ModalBackground width={500} onClick={onClick} title="Thêm nhóm">
      <GroupManageContext.Consumer>
        {({ onCreateGroup }) => (
          <form onSubmit={onCreateGroup}>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Tên nhóm mới..."
                name="NameGroup"
              />
            </div>
            <div className="form-group">
              <textarea
                rows="4"
                cols="50"
                name="NoteGroup"
                className="form-control"
                placeholder="Ghi chú ..."
              />
            </div>
            <div className="title-add">
              <button type="submit" className="btn btn_primary">
                Tạo nhóm
              </button>
            </div>
          </form>
        )}
      </GroupManageContext.Consumer>
    </ModalBackground>
  );
};
const FormModalAddGroupManage = ({ onAdd, button, placeholder, name }) => {
  return (
    <React.Fragment>
      <GroupManageContext.Consumer>
        {({ mainState }) => (
          <React.Fragment>
            <h4>{mainState.ItemGroup.name}</h4>
            <form
              onSubmit={onAdd}
              style={{ display: "grid", gridTemplateColumns: "1fr 20%" }}
            >
              <input
                type="hidden"
                name="id_group"
                value={mainState.ItemGroup.id}
              />
              <Input name={name} placeholder={placeholder} type="text" />
              <div className="text-left" style={{ margin: "20px 0" }}>
                <ButtonPrimary>{button}</ButtonPrimary>
              </div>
            </form>
          </React.Fragment>
        )}
      </GroupManageContext.Consumer>
    </React.Fragment>
  );
};

const FormModalAddUser = ({ onAdd, button, nameEmail,nameNumber }) => {
  return (
    <React.Fragment>
      <GroupManageContext.Consumer>
        {({ mainState }) => (
          <React.Fragment>
            <h4>{mainState.ItemGroup.name}</h4>
            <form
              onSubmit={onAdd}
              style={{ display: "grid", gridTemplateColumns: "1fr 20% 20%" }}
            >
              <input
                type="hidden"
                name="id_group"
                value={mainState.ItemGroup.id}
              />
              <Input name={nameEmail} placeholder={"Chọn email ..."} type="email" />
              <Input name={nameNumber} placeholder={"Giới hạn"} type="number" />
              <div className="text-left" style={{ margin: "20px 0" }}>
                <ButtonPrimary>{button}</ButtonPrimary>
              </div>
            </form>
          </React.Fragment>
        )}
      </GroupManageContext.Consumer>
    </React.Fragment>
  );
};

const UserModalManage = ({ onClick }) => {
  return (
    <ModalBackground
      width={1000}
      onClick={onClick}
      title="Chi tiết các thành viên"
    >
      <GroupManageContext.Consumer>
        {({ mainState, onAddUser }) => (
          <React.Fragment>
            <FormModalAddUser
              onAdd={onAddUser}
              nameEmail="email"
              nameNumber="limit"
              button="Thêm thành viên"
            />
            {mainState.ListGroupUser != "" ? (
              <UserContentTable />
            ) : (
              <p className="text-center">Chưa có thành viên nào</p>
            )}
          </React.Fragment>
        )}
      </GroupManageContext.Consumer>
    </ModalBackground>
  );
};

const UserContentTable = () => {
  return (
    <TableWrap columns={["STT", "Email","Giới hạn","Đã làm", "Ngày thêm", "Actions"]}>
      <GroupManageContext.Consumer>
        {({ mainState }) => (
          <React.Fragment>
            {mainState.ListGroupUser
              ? mainState.ListGroupUser.map((gu, index) => {
                  return <UserRowTable key={index} gu={gu} index={index} />;
                })
              : ""}
          </React.Fragment>
        )}
      </GroupManageContext.Consumer>
    </TableWrap>
  );
};

const UserRowTable = ({ gu, index }) => {
  const { id, email,limit, create_on,doing } = gu;
  return (
    <React.Fragment>
      <GroupManageContext.Consumer>
        {({ onDeleteUser }) => (
          <tr>
            <td>{index + 1}</td>
            <td>{email}</td>
            <td>{limit}</td>
            <td>{doing}</td>
            <td>{create_on}</td>
            <td>
              <span className="subject_del" onClick={() => onDeleteUser(id)}>
                <i className="fa fa-trash-o del_" />
              </span>
            </td>
          </tr>
        )}
      </GroupManageContext.Consumer>
    </React.Fragment>
  );
};

const ExamModalManage = ({ onClick }) => {
  return (
    <ModalBackground width={1000} onClick={onClick} title="Chi tiết các đề thi">
      <GroupManageContext.Consumer>
        {({ mainState, onAddExam }) => (
          <React.Fragment>
            <FormModalAddGroupManage
              onAdd={onAddExam}
              name="id_exam"
              button="Thêm đề"
              placeholder="Chọn mã đề cần thêm"
            />
            {mainState.ListGroupExam != "" ? (
              <ExamContentTable />
            ) : (
              <p className="text-center">Chưa có đề thi nào</p>
            )}
          </React.Fragment>
        )}
      </GroupManageContext.Consumer>
    </ModalBackground>
  );
};

const ExamContentTable = () => {
  return (
    <TableWrap columns={["STT", "Mã đề thi", "Tên đề", "Ngày thêm", "Actions"]}>
      <GroupManageContext.Consumer>
        {({ mainState }) => (
          <React.Fragment>
            {mainState.ListGroupExam
              ? mainState.ListGroupExam.map((gx, index) => {
                  return <ExamRowTable key={index} gx={gx} index={index} />;
                })
              : ""}
          </React.Fragment>
        )}
      </GroupManageContext.Consumer>
    </TableWrap>
  );
};
const ExamRowTable = ({ gx, index }) => {
  const { id, name, id_exam, create_on } = gx;
  return (
    <React.Fragment>
      <GroupManageContext.Consumer>
        {({ onDeleteExam }) => (
          <tr>
            <td>{index + 1}</td>
            <td>{id_exam}</td>
            <td>{name}</td>
            <td>{create_on}</td>
            <td>
              <span className="subject_del" onClick={() => onDeleteExam(id)}>
                <i className="fa fa-trash-o del_" />
              </span>
            </td>
          </tr>
        )}
      </GroupManageContext.Consumer>
    </React.Fragment>
  );
};

const ContentTable = () => {
  return (
    <React.Fragment>
      <GroupManageContext.Consumer>
        {({ mainState, handlePageChange }) => (
          <React.Fragment>
            <TableWrap
              columns={[
                "STT",
                "Tên nhóm",
                "Ghi chú",
                "Ngày tạo",
                "Đề thi",
                "Thành viên",
                "Actions"
              ]}
            >
              <React.Fragment>
                {mainState.ListGroups ? (
                  mainState.ListGroups.map((group, index) => {
                    return (mainState.pageMainNumber - 1) * 20 <= index &&
                      index < mainState.pageMainNumber * 20 ? (
                      <RowTable key={index} group={group} index={index} />
                    ) : null;
                  })
                ) : (
                  <p className="text-center">Chưa có nhóm nào</p>
                )}
              </React.Fragment>
            </TableWrap>
            {mainState.ListGroups ? (
              <Pagination
                activePage={mainState.pageMainNumber}
                itemsCountPerPage={20}
                totalItemsCount={mainState.ListGroups.length}
                pageRangeDisplayed={5}
                onChange={handlePageChange}
              />
            ) : (
              ""
            )}
          </React.Fragment>
        )}
      </GroupManageContext.Consumer>
    </React.Fragment>
  );
};

const RowTable = ({ group, index }) => {
  const { id, name, note, create_on } = group;
  return (
    <React.Fragment>
      <GroupManageContext.Consumer>
        {({ onShowExam, onShowUser, onDeleteGroup }) => (
          <tr>
            <td style={{ width: "50px" }}>{index + 1}</td>
            <td style={{ width: "200px" }}>{name}</td>
            <td>{note}</td>
            <td style={{ width: "100px" }}>{create_on}</td>
            <td style={{ width: "60px" }}>
              <ButtonPrimary onClick={() => onShowExam(id, name)}>
                Đề thi
              </ButtonPrimary>
            </td>
            <td style={{ width: "60px" }}>
              <ButtonPrimary onClick={() => onShowUser(id, name)}>
                Thành viên
              </ButtonPrimary>
            </td>
            <td style={{ width: "50px" }}>
              <span className="subject_del" onClick={() => onDeleteGroup(id)}>
                <i className="fa fa-trash-o del_" />
              </span>
            </td>
          </tr>
        )}
      </GroupManageContext.Consumer>
    </React.Fragment>
  );
};

class GroupManage extends Component {
  constructor() {
    super();
    this.state = {
      status: false,
      status_exam: false,
      status_user: false,
      loading: false
    };
  }
  componentDidMount() {
    this.ShowData();
  }
  ShowData = () => {
    axios({
      method: "GET",
      url: `${API}/SelectGroup`
    })
      .then(json => {
        this.props.dispatch(
          updateStateData({
            ...this.props.mainState,
            ListGroups: json.data,
            pageMainNumber: 1
          })
        );
      })
      .catch(err => {
        console.error(err);
      });
  };
  onCreateGroup = e => {
    e.preventDefault();
    this.setState({
      loading: true
    });
    const data = new FormData(e.target);
    var roleToken = sessionStorage.getItem("OL_TOKEN");
    var dataGroup = {
      id: "",
      name: data.get("NameGroup"),
      note: data.get("NoteGroup"),
      id_roles: roleToken
    };
    axios({
      method: "POST",
      url: `${API}/CreateGroup`,
      data: dataGroup
    })
      .then(json => {
        const { status, message } = json.data;
        this.setState({
          loading: false,
          status: false
        });
        if (status == "success") {
          alert(message);
          this.ShowData();
        }
      })
      .catch(err => {
        console.error(err);
      });
  };
  onShowDataExam = id => {
    axios({
      method: "POST",
      url: `${API}/SelectGroupId`,
      data: { id: id }
    })
      .then(json => {
        this.props.dispatch(
          updateStateData({
            ...this.props.mainState,
            ListGroupExam: json.data
          })
        );
      })
      .catch(err => {
        console.error(err);
      });
  };
  onShowDataUser = id => {
    axios({
      method: "POST",
      url: `${API}/SelectUserGroupId`,
      data: { id: id }
    })
      .then(json => {
        this.props.dispatch(
          updateStateData({
            ...this.props.mainState,
            ListGroupUser: json.data.data
          })
        );
      })
      .catch(err => {
        console.error(err);
      });
  };
  onShowExam = (id, name) => {
    if (id) {
      this.setState({
        status_exam: true
      });
      this.props.dispatch(
        updateStateData({
          ...this.props.mainState,
          ItemGroup: {
            id: id,
            name: name
          }
        })
      );
      this.onShowDataExam(id);
    }
  };
  onShowUser = (id, name) => {
    if (id) {
      this.setState({
        status_user: true
      });
      this.props.dispatch(
        updateStateData({
          ...this.props.mainState,
          ItemGroup: {
            id: id,
            name: name
          }
        })
      );
      this.onShowDataUser(id);
    }
  };
  onAddExam = e => {
    e.preventDefault();
    const data = new FormData(e.target);
    var id = data.get("id_group");
    axios({
      method: "POST",
      url: `${API}/onAddExamGroup`,
      data: data
    })
      .then(json => {
        const { message } = json.data;
        alert(message);
        this.onShowDataExam(id);
      })
      .catch(err => {
        console.error(err);
      });
  };
  onAddUser = e => {
    e.preventDefault();
    const data = new FormData(e.target);
    var id = data.get("id_group");
    axios({
      method: "POST",
      url: `${API}/onAddUserGroup`,
      data: data
    })
      .then(json => {
        const { message } = json.data;
        alert(message);
        this.onShowDataUser(id);
      })
      .catch(err => {
        console.error(err);
      });
  };
  handlePageChange = pageNumber => {
    this.props.dispatch(
      updateStateData({
        ...this.props.mainState,
        pageMainNumber: pageNumber
      })
    );
  };
  onDeleteUser = id => {
    if (window.confirm("Bạn chắc chắn muốn xóa tài khoản này khỏi nhóm?")) {
      axios({
        method: "POST",
        url: `${API}/DeleteUserGroupId`,
        data: { id: id }
      })
        .then(json => {
          const { message } = json.data;
          alert(message);
          this.onShowDataUser(this.props.mainState.ItemGroup.id);
        })
        .catch(err => {
          console.error(err);
        });
    }
  };
  onDeleteExam = id => {
    if (window.confirm("Bạn chắc chắn muốn xóa đề thi này khỏi nhóm?")) {
      axios({
        method: "POST",
        url: `${API}/DeleteExamGroupId`,
        data: { id: id }
      })
        .then(json => {
          const { message } = json.data;
          alert(message);
          this.onShowDataExam(this.props.mainState.ItemGroup.id);
        })
        .catch(err => {
          console.error(err);
        });
    }
  };
  onDeleteGroup = id => {
    if (window.confirm("Bạn chắc chắn muốn nhóm này?")) {
      axios({
        method: "POST",
        url: `${API}/onDeleteGroupId`,
        data: { id: id }
      })
        .then(json => {
          const { message } = json.data;
          alert(message);
          this.ShowData();
        })
        .catch(err => {
          console.error(err);
        });
    }
  };
  render() {
    const { status, status_exam, status_user, loading } = this.state;
    return (
      <React.Fragment>
        <GroupManageContext.Provider
          value={{
            dispatch: this.props.dispatch,
            mainState: this.props.mainState,
            onCreateGroup: this.onCreateGroup,
            handlePageChange: this.handlePageChange,
            onAddExam: this.onAddExam,
            onAddUser: this.onAddUser,
            onShowUser: (id, name) => this.onShowUser(id, name),
            onShowExam: (id, name) => this.onShowExam(id, name),
            onDeleteGroup: id => this.onDeleteGroup(id),
            onDeleteUser: id => this.onDeleteUser(id),
            onDeleteExam: id => this.onDeleteExam(id)
          }}
        >
          <div className="table-fx-left">
            <Breadcrumb home="Manage" manage="Groups Management" />
            <ContentManage>
              <HeaderTable>
                <ButtonPrimary
                  onClick={() => {
                    this.setState({ status: true });
                  }}
                >
                  Thêm nhóm
                </ButtonPrimary>
              </HeaderTable>
              <ContentTable />
            </ContentManage>
          </div>
          {status_user ? (
            <UserModalManage
              onClick={() => {
                this.setState({ status_user: false });
                this.props.dispatch(
                  updateStateData({
                    ...this.props.mainState,
                    ListGroupUser: [],
                    ItemGroup: {
                      id: "",
                      name: ""
                    }
                  })
                );
              }}
            />
          ) : (
            ""
          )}
          {status_exam ? (
            <ExamModalManage
              onClick={() => {
                this.setState({ status_exam: false });
                this.props.dispatch(
                  updateStateData({
                    ...this.props.mainState,
                    ListGroupExam: [],
                    ItemGroup: {
                      id: "",
                      name: ""
                    }
                  })
                );
              }}
            />
          ) : (
            ""
          )}
          {status ? (
            <AddModalManage
              onClick={() => {
                this.setState({ status: false });
              }}
            />
          ) : (
            ""
          )}
          {loading ? <Loading /> : ""}
        </GroupManageContext.Provider>
      </React.Fragment>
    );
  }
}

export default connect(state => {
  return {
    mainState: state.updateStateData
  };
})(GroupManage);
