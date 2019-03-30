import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import fakeAuth from './fakeAuth';
import { connect } from 'react-redux';
import { LoginUserRequest } from './../../actions/index';

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      RedirectToRender: false,
      errors: '',
      txtUser: '',
      txtPass: '',
      UserData: '',
      PassData: ''
    }
  }
  componentDidMount() {
    var data = JSON.parse(localStorage.getItem('user'));
    if (data != null) {
      fakeAuth.authenticate(() => {
        this.setState({
          RedirectToRender: true
        })
      })
    }
  }
  onChange = (e) => {
    var target = e.target;
    var name = target.name
    var value = target.value;
    this.setState({
      [name]: value
    })
  }
  onLogin = () => {
    const { txtUser, txtPass } = this.state;
    var data = {
      Username: txtUser,
      Password: txtPass
    }
    this.props.Login_user(data)
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.User) {
      var { User } = nextProps;
      if (User[0].error) {
        this.setState({
          errors: User[0].error
        })
        console.log(User)
      } else {
        this.setState({
          UserData: User[0].USERNAME,
          PassData: User[0].PASS
        })
        localStorage.setItem('user', JSON.stringify(User[0]));
        fakeAuth.authenticate(() => {
          this.setState({
            RedirectToRender: true
          })
        })
      }
    }
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: "/" } };
    const { txtUser, txtPass, RedirectToRender } = this.state;
    if (RedirectToRender === true) {
      return <Redirect to={from} />
    }
    return (
      <div className="login_wrapper">
        <div className="max-wrapper">
          <div className="Login_banner row">
            <div className="background_left col-md-6">
              <div className="background_image MinHeight">
                <div className="background_border">
                  <div className="left-text text-position padTopLogin">
                    <h3>Don't have an account?</h3>
                    <p>create an account you have to click below on big register button. Then it will open sign page </p>
                    <button><Link to='/sign-in'> Register</Link></button>
                  </div>
                </div>
              </div>
            </div>
            <div className="background_right col-md-6">
              <section className="login_content MinHeight padTopLogin">
                <div className="Login_title pad-10">
                  <h3 className="border-title text_cursive">Sign up</h3>
                </div>
                <div className="pad-10">
                  <span className="text_cursive">Username</span>
                  <input
                    type="text"
                    className="form-control pd-cl-10"
                    name="txtUser"
                    placeholder="Username"
                    value={txtUser}
                    onChange={this.onChange}
                  />
                </div>
                <div className="pad-10">
                  <span className="text_cursive">Password</span>
                  <input
                    type="password"
                    className="form-control pd-cl-10"
                    name="txtPass"
                    placeholder="Password"
                    value={txtPass}
                    onChange={this.onChange}
                  />
                </div>
                <div className="pad-10 btn-10">
                  <div>
                    <span style={{ color: "red" }}>{this.state.errors}</span>
                  </div>
                  <button onClick={this.onLogin} className="btn btn-default submit text_cursive">sign up</button>
                </div>
                <div className="text-center pad-10  sign-online">
                  <p>Don't have an account? </p>
                  <Link to='/sign-in' className="text_cursive" >Sign in</Link>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    User: state.Login
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    Login_user: (data) => {
      dispatch(LoginUserRequest(data))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);