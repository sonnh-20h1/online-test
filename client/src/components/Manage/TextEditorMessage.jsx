import React, { Component } from "react";
import { connect } from "react-redux";
import { API } from "./../../API/API";
import axios from "axios";
import { ContentManage, Menus, MenuItemTop } from "./BaseManage";
import { Table, Icon, Modal, Button } from "antd";
import BraftEditor from "braft-editor";
import "braft-editor/dist/index.css";
class TextEditorMessage extends Component {
  state = {
    editorState: null,
  };
  componentDidMount(){
    const { record } = this.props;
    this.setState({
      editorState: BraftEditor.createEditorState(record.text)
    })
  }
  onChange = (editorState) => {
    this.setState({ editorState }); 
  };
  handleSubmit = () => {
    const { editorState } =this.state;
    const { id } = this.props.record
    const htmlContent = editorState.toHTML();
    var formData = new FormData();
    formData.append('id',id);
    formData.append('text',htmlContent);
    this.EditMessage(formData);
    this.props.onCancel()
  }
  EditMessage = async (data) => {
    var json = await axios({
      method: "POST",
      url: `${API}/EditMessage`,
      data: data,
    });
    if (json.data) {
      const { message } = json.data;
      alert(message);
    }
  };
  render() {
    return (
      <div>
        <Modal
          title="Thông báo"
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
          <BraftEditor
            language="en"
            id="editor-with-table"
            value={this.state.editorState}
            onChange={this.onChange}
            controlBarStyle={{
              backgroundColor: "rgba(254,255,254,1)",
            }}
            contentStyle={{
              margin: "0",
              backgroundColor: "white",
              boxShadow: "0px 5px 9px 2px rgba(214,214,214,0.8)",
              padding: "60px",
              margin: "0",
              border: "solid 1px",
              borderColor: "#cdcdcd",
              borderRadius: "5px",
              backgroundColor: "white",
              boxShadow: "none",
              padding: "10px",
            }}
          />
        </Modal>
      </div>
    );
  }
}

export default TextEditorMessage;
