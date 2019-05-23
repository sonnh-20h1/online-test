import React, { Component } from "react";
import axios from "axios";
import { API } from "./../../API/API";
import {
  Loading
} from "./BaseManage";
class LoginManage extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      error: {},
      loading:false
    };
  }
  handleChange = e => {
    var target = e.target;
    var value = target.value;
    var name = target.name;
    this.setState({
      [name]: value
    });
  };
  onSubmit = e => {
    e.preventDefault();
    const { username, password, error } = this.state;
    const {history} = this.props;
  
    if (username == "") {
      error["user"] = false;
    }
    if (password == "") {
      error["pass"] = false;
    }
    this.setState({
      error
    })
    if (username && password) {
      this.setState({
        loading:true
      })
      var data = this.state;
      axios({
        method: "POST",
        url: `${API}/manage/login`,
        data: data
      })
        .then(json => {
          const {status,data,message} = json.data
          const { error } = this.state;
          if(status == 'success'){
            sessionStorage.setItem('OL_TOKEN',data)
            history.push("/manage/users");
          }else{
            error['message'] = message;
            this.setState({
              error
            })
            this.setState({
              loading:false
            })
          }
        })
        .catch(err => {
          console.error(err);
        });
    }
  };
  render() {
    const { error,loading } = this.state;
    return (
      <div className="login_box">
        {loading?<Loading />:""}
        <form
          className="form-horizontal"
          onSubmit={this.onSubmit}
          method="post"
        >
          <div className="form-group">
            <div className="text-center">
              <p>Admin</p>
            </div>
            <div className="form-group">
              <input
                className={error['user'] === false? "form-control borErr":"form-control"}
                type="text"
                placeholder="Username"
                name="username"
                value={this.state.username}
                onChange={this.handleChange}
              />
              <input
                className={error['pass'] === false? "form-control borErr":"form-control"}                
                type="password"
                name="password"
                placeholder="Password"
                value={this.state.password}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <p style={{color:'red'}}>{error['message']}</p>
            </div>
            <div className="form-group text-center">
              <button className="btn btn-primary btn_max " type="submit">
                Log In
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default LoginManage;
