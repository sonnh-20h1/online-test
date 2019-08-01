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
  Menus,
  MenuItemTop
} from "./BaseManage";

const UploadManageContext = React.createContext();

const ContentTable = () => {
  return (
    <React.Fragment>
      <UploadManageContext.Consumer>
        {({ mainState, handlePageChange }) => (
          <React.Fragment>
            <TableWrap
              columns={["STT", "Email", "Content", "Ngày"]}
            >
              {mainState.ListFeedBackWebsite
                ? mainState.ListFeedBackWebsite.map((feedback, index) => {
                    return (mainState.pageMainNumber - 1) * 10 <= index &&
                      index < mainState.pageMainNumber * 10 ? (
                      <RowTable key={index} feedback={feedback} index={index} />
                    ) : null;
                  })
                : ""}
            </TableWrap>
            <Pagination
              activePage={mainState.pageMainNumber}
              itemsCountPerPage={10}
              totalItemsCount={
                mainState.ListFeedBackWebsite ? mainState.ListFeedBackWebsite.length : 0
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
const RowTable = ({ feedback, index }) => {
  const { create_on, email, content } = feedback;
  return (
    <tr>
      <td>{index + 1}</td>
      <td>{email}</td>
      <td>{content}</td>
      <td>{create_on}</td>
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
      url: `${API}/getFeedBackWebsite`
    }).catch(err => {
      console.error(err);
    });
    if (json) {
      const { data } = json;
      this.props.dispatch(
        updateStateData({
          ...this.props.mainState,
          ListFeedBackWebsite: data,
          pageMainNumber:1
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
            <MenuItemTop menus={Menus} />
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
