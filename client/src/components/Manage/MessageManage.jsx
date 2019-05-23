import React, { Component } from "react";
import { connect } from "react-redux";
import Pagination from "react-js-pagination";
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

const MessageManageContext = React.createContext();

const ContentTable = () => {
  return (
    <React.Fragment>
      <MessageManageContext.Consumer>
        {({ mainState }) => (
          <React.Fragment>
            {mainState.Message
              ? mainState.Message.map((me, index) => {
                  return <RowTable key={index} me={me} index={index} />;
                })
              : ""}
          </React.Fragment>
        )}
      </MessageManageContext.Consumer>
    </React.Fragment>
  );
};
const RowTable = ({ me, index }) => {
  const { text, id } = me;
  return (
    <div className="row" style={{ paddingTop: "10px" }}>
      <MessageManageContext.Consumer>
        {({ onSubmit }) => (
          <form onSubmit={onSubmit}>
            <span className="col-md-1">{index + 1}</span>
            <input type="hidden" defaultValue={id} name="id" />
            <span className="col-md-6">
              <textarea
                name="text"
                className="form-control"
                defaultValue={text}
                type="text"
              />
            </span>
            <span className="col-md-2">
              <button className="btn btn_primary" type="submit">
                Sửa
              </button>
            </span>
          </form>
        )}
      </MessageManageContext.Consumer>
    </div>
  );
};
class MessageManage extends Component {
  componentDidMount() {
    this.ShowData();
  }
  ShowData = () => {
    axios({
      method: "POST",
      url: `${API}/GetMessage`
    })
      .then(json => {
        this.props.dispatch(
          updateStateData({
            ...this.props.mainState,
            Message: json.data
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
    // console.log(data.get('text'))
    if (window.confirm("Bạn có chắc chăn muốn sửa ko?")) {
      this.EditMessage(data);
    }
  };

  EditMessage = async data => {
    var json = await axios({
      method: "POST",
      url: `${API}/EditMessage`,
      data: data
    });
    if (json.data) {
      const { message } = json.data;
      alert(message);
    }
  };
  render() {
    console.log(this.props.mainState);
    return (
      <React.Fragment>
        <MessageManageContext.Provider
          value={{
            dispatch: this.props.dispatch,
            mainState: this.props.mainState,
            onSubmit: this.onSubmit
          }}
        >
          <div className="table-fx-left">
            <Breadcrumb home="Manage" manage="Message Management" />
            <ContentManage>
              <ContentTable />
            </ContentManage>
          </div>
        </MessageManageContext.Provider>
      </React.Fragment>
    );
  }
}

export default connect(state => {
  return {
    mainState: state.updateStateData
  };
})(MessageManage);
