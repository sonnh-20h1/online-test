import React, { Component } from "react";
import axios from "axios";
import { API } from "./../../API/API";
import { Loading } from "./BaseManage";

class AccountManage extends Component {
  constructor(){
    super();
    this.state = {
      loading:false,
      error:"",
    }
  }
  onSubmit = e => {
    e.preventDefault();
    const data = new FormData(e.target);
    this.setState({
      loading:true
    })
    axios({
      method: "POST",
      url: `${API}/manage/UpdatePass`,
      data: data
    })
      .then(json => {
        const { status,message } = json.data;
        console.log(status,message)
        if(status == 'error'){
          this.setState({
            error:message
          })
        }else{
          alert(message);
          window.location.reload();
        }
      })
      .catch(err => {
        console.error(err);
      });
  };
  render() {
    const {error} = this.state;
    return (
      <div className="table-fx-left Password">
        <form
          className="form-horizontal"
          onSubmit={this.onSubmit}
          method="post"
        >
          <div className="form-group">
            <div className="text-center">
              <p>Đổi mật khẩu</p>
            </div>
            <div className="form-group">
              <input
                className="form-control"
                type="password"
                name="oldPass"
                placeholder="Mật khẩu cũ"
              />
              <input
                className="form-control"
                type="password"
                name="newPass"
                placeholder="Mật khẩu mới"
              />
              <input
                className="form-control"
                type="password"
                name="againPass"
                placeholder="Nhập lại mật khẩu mới"
              />
            </div>
            <div className="form-group">
              <p style={{ color: "red" }}>{error}</p>
            </div>
            <div className="form-group text-center">
              <button className="btn btn-primary btn_max " type="submit">
                Đổi mật khẩu
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
export default AccountManage;
