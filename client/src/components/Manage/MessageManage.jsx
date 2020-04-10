import React, { Component } from "react";
import { connect } from "react-redux";
import { API } from "./../../API/API";
import axios from "axios";
import { ContentManage, Menus, MenuItemTop } from "./BaseManage";
import { Table, Icon } from "antd";
import TextEditor from "./TextEditorMessage";

class MessageManage extends Component {
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
      method: "POST",
      url: `${API}/GetMessage`,
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
  
  openEditor = (record) => {
    this.setState({
      open: true,
      record,
    });
  };

  render() {
    const columns = [
      {
        title: "STT",
        dataIndex: "stt",
        key: "stt",
      },
      {
        title: "Tên",
        dataIndex: "name",
        width: "80%",
        key: "name",
      },
      {
        title: "Action",
        key: "action",
        render: (record) => (
          <Icon
            type="edit"
            onClick={() => {
              this.openEditor(record);
            }}
          />
        ),
      },
    ];
    const { data, open, record } = this.state;

    console.log(data);
    return (
      <React.Fragment>
        <div className="table-fx-left">
          <MenuItemTop menus={Menus} />
          <ContentManage>
            <Table columns={columns} dataSource={data} />;
          </ContentManage>
        </div>
        {open && (
          <TextEditor
            record={record}
            open={open}
            onCancel={() =>{
              this.setState({ open: false }) 
              this.ShowData();
            }}
          />
        )}
      </React.Fragment>
    );
  }
}

export default MessageManage;
