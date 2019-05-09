import React, { Component } from "react";
import { connect } from "react-redux";
import { updateStateData } from "./../../actions/index";
import { API } from "./../../API/API";
import axios from "axios";
import {
  Breadcrumb,
  TableWrap,
  HeaderTable,
  ContentManage,
  ModalBackground,
  Loading
} from "./BaseManage";

const SubjectManageContext = React.createContext();

function ModalManage(props) {
  return (
    <ModalBackground width={400} onClick={props.onClick} title="Thêm chủ đề">
      <form onSubmit={props.onSubmit}>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Mã chủ đề ..."
            name="sub_id"
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Tên chủ đề ..."
            name="sub_name"
          />
        </div>
        <div className="title-add">
          <button type="submit" className="btn btn_primary">
            Thêm
          </button>
        </div>
      </form>
    </ModalBackground>
  );
}

const ContentTable = () => {
  return (
    <TableWrap columns={["STT", "Subject ID", "Subject name", "Actions"]}>
      <SubjectManageContext.Consumer>
        {({ mainState, onDeleteSubject }) => (
          <React.Fragment>
            {mainState.SubjectManage
              ? mainState.SubjectManage.map((subject, index) => {
                  return (
                    <RowTable
                      key={index}
                      subject={subject}
                      index={index}
                      onDeleteSubject={onDeleteSubject}
                    />
                  );
                })
              : ""}
          </React.Fragment>
        )}
      </SubjectManageContext.Consumer>
    </TableWrap>
  );
};
const RowTable = ({ subject, index, onDeleteSubject }) => {
  const { SUBID, SUBTEXT } = subject;
  return (
    <tr>
      <td>{index + 1}</td>
      <td>{SUBID}</td>
      <td>{SUBTEXT}</td>
      <td>
        <span className="subject_del" onClick={() => onDeleteSubject(SUBID)}>
          <i className="fa fa-trash-o del_" />
        </span>
      </td>
    </tr>
  );
};
class SubjectManage extends Component {
  constructor() {
    super();
    this.state = {
      status: false,
      loading: false
    };
  }
  componentDidMount() {
    this.ShowData();
  }
  ShowData = () => {
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
  onSubmit = e => {
    e.preventDefault();
    const data = new FormData(e.target);
    // console.log(data.get("NameSubject"))
    this.setState({
      loading:true
    })
    axios({
      method: "POST",
      url: `${API}/create_sub`,
      data: data
    })
      .then(json => {
        if (json.data === "success") {
          this.setState({
            status: false,
            loading:false
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
  };
  onDeleteSubject = (id, mainState) => {
    if (window.confirm("Do you want to delete this subject ?")) {
      var data = { id: id };
      this.setState({
        loading:true
      })
      axios({
        method: "POST",
        url: `${API}/del_sub`,
        data:data
      })
        .then(json => {
          this.ShowData();
          this.setState({
            loading:false
          })
        })
        .catch(err => {
          console.error(err);
        });
    }
  };
  render() {
    const { status, loading } = this.state;
    return (
      <React.Fragment>
        <SubjectManageContext.Provider
          value={{
            dispatch: this.props.dispatch,
            mainState: this.props.mainState,
            onDeleteSubject: id =>
              this.onDeleteSubject(id, this.props.mainState)
          }}
        >
          <div className="table-fx-left">
            <Breadcrumb home="Manage" manage="Subject Management" />
            <ContentManage>
              <HeaderTable>
                <button
                  className="btn btn_primary"
                  onClick={() => {
                    this.setState({ status: true });
                  }}
                >
                  Thêm chủ đề
                </button>
              </HeaderTable>
              <ContentTable />
            </ContentManage>
          </div>
          {status ? (
            <ModalManage
              onClick={() => {
                this.setState({ status: false });
              }}
              onSubmit={this.onSubmit}
            />
          ) : (
            ""
          )}
          {loading ? <Loading /> : ""}
        </SubjectManageContext.Provider>
      </React.Fragment>
    );
  }
}

export default connect(state => {
  return {
    mainState: state.updateStateData
  };
})(SubjectManage);
