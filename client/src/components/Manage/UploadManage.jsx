import React, { Component } from "react";
import { connect } from "react-redux";
import Pagination from "react-js-pagination";
import { updateStateData } from "./../../actions/index";
import { API,local } from "./../../API/API";
import axios from "axios";
import {
  Breadcrumb,
  TableWrap,
  HeaderTable,
  ContentManage,
  ModalBackground,
  Loading
} from "./BaseManage";

const UploadManageContext = React.createContext();

const ContentTable = () => {
  return (
    <React.Fragment>
      <UploadManageContext.Consumer>
        {({ mainState, handlePageChange }) => (
          <React.Fragment>
            <TableWrap
              columns={["STT", "Email", "Ngày upload", "File", "Actions"]}
            >
              {mainState.ListFileDownload
                ? mainState.ListFileDownload.map((download, index) => {
                    return (mainState.pageMainNumber - 1) * 10 <= index &&
                      index < mainState.pageMainNumber * 10 ? (
                      <RowTable key={index} download={download} index={index} />
                    ) : null;
                  })
                : ""}
            </TableWrap>
            <Pagination
              activePage={mainState.pageMainNumber}
              itemsCountPerPage={10}
              totalItemsCount={
                mainState.SubjectManage ? mainState.SubjectManage.length : 0
              }
              pageRangeDisplayed={5}
              onChange={handlePageChange}
            />
          </React.Fragment>
        )}
      </UploadManageContext.Consumer>
    </React.Fragment>
  );
};
const RowTable = ({ download, index }) => {
  const { create_on, email, fileName, path } = download;
  return (
    <tr>
      <td>{index + 1}</td>
      <td>{email}</td>
      <td>{create_on}</td>
      <td>{fileName}</td>
      <td>
        <span className="download_del">
          <a href={local+path}>
            <i className="fa fa-download del_" />
          </a>
        </span>
      </td>
    </tr>
  );
};
class UploadManage extends Component {
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
  async ShowData() {
    var json = await axios({
      method: "GET",
      url: `${API}/get-upload`
    }).catch(err => {
      console.error(err);
    });
    if (json) {
      const { data } = json;
      this.props.dispatch(
        updateStateData({
          ...this.props.mainState,
          ListFileDownload: data
        })
      );
    }
  }

  handlePageChange = pageNumber => {
    this.props.dispatch(
      updateStateData({
        ...this.props.mainState,
        pageMainNumber: pageNumber
      })
    );
  };
  render() {
    const { status, loading } = this.state;
    console.log(this.props.mainState);
    return (
      <React.Fragment>
        <UploadManageContext.Provider
          value={{
            dispatch: this.props.dispatch,
            mainState: this.props.mainState,
            handlePageChange: this.handlePageChange
          }}
        >
          <div className="table-fx-left">
            <Breadcrumb home="Manage" manage="Upload Management" />
            <ContentManage>
              <ContentTable />
            </ContentManage>
          </div>
        </UploadManageContext.Provider>
      </React.Fragment>
    );
  }
}

export default connect(state => {
  return {
    mainState: state.updateStateData
  };
})(UploadManage);
