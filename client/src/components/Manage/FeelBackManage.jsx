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

const FeelBackManageContext = React.createContext();

const ContentTable = () => {
  return (
    <React.Fragment>
      <FeelBackManageContext.Consumer>
        {({ mainState, handlePageChange }) => (
          <React.Fragment>
            <TableWrap
              columns={["STT", "Ngày gửi","Email", "Nội dung","Chủ đề", "Mã đề","Câu hỏi"]}
            >
              {mainState.FeelBacks
                ? mainState.FeelBacks.map((feel, index) => {
                    return (mainState.pageMainNumber - 1) * 20 <= index &&
                      index < mainState.pageMainNumber * 20 ? (
                      <RowTable
                        key={index}
                        feel={feel}
                        index={index}
                      />
                    ) : null;
                  })
                : ""}
            </TableWrap>
            <Pagination
              activePage={mainState.pageMainNumber}
              itemsCountPerPage={20}
              totalItemsCount={
                mainState.FeelBacks ? mainState.FeelBacks.length : 0
              }
              pageRangeDisplayed={5}
              onChange={handlePageChange}
            />
          </React.Fragment>
        )}
      </FeelBackManageContext.Consumer>
    </React.Fragment>
  );
};
const RowTable = ({ feel, index }) => {
  const { SUBID, EMAIL,content,create_on,exam_id,QUE_TEXT } = feel;
  return (
    <tr>
      <td>{index + 1}</td>
      <td>{create_on}</td>
      <td>{EMAIL}</td>
      <td>{content}</td>
      <td>{SUBID}</td>
      <td>{exam_id}</td>
      <td>{QUE_TEXT}</td>
    </tr>
  );
};
class FeelBackManage extends Component {
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
  async ShowData(){
    var json = await axios({
      method: "get",
      url: `${API}/fetch_notification`
    }).catch(err => {
      console.error(err);
    });
    this.props.dispatch(
      updateStateData({
        ...this.props.mainState,
        FeelBacks: json.data,
        pageMainNumber: 1
      })
    );
  };
  handlePageChange = pageNumber => {
    this.props.dispatch(
      updateStateData({
        ...this.props.mainState,
        pageMainNumber: pageNumber
      })
    );
  };
  render() {
    console.log(this.props.mainState)
    return (
      <React.Fragment>
        <FeelBackManageContext.Provider
          value={{
            dispatch: this.props.dispatch,
            mainState: this.props.mainState,
            handlePageChange: this.handlePageChange
          }}
        >
          <div className="table-fx-left">
            <Breadcrumb home="Manage" manage="Feelback Management" />
            <ContentManage>
              <ContentTable />
            </ContentManage>
          </div>
        </FeelBackManageContext.Provider>
      </React.Fragment>
    );
  }
}

export default connect(state => {
  return {
    mainState: state.updateStateData
  };
})(FeelBackManage);
