import React, { Component } from "react"; 
import BraftEditor from "braft-editor";

class PageData extends Component {
 
  render() {
    const { text } = this.props;
    return (
      <div>
        <BraftEditor
          language="en"
          id="editor-with-table"
          readOnly
          contentStyle={{ height: "auto" }}
          controlBarStyle={{ display: "none" }}
          value={BraftEditor.createEditorState(text)}
        />
      </div>
    );
  }
}

export default PageData;
