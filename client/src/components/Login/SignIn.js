import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { SignUserRequest } from "./../../actions/index";
import { ModalBackground } from "./BaseLogin";
class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: false,
      LastName: "",
      FirstName: "",
      Email: "",
      PeopleEmail: "",
      UserName: "",
      PassWord: "",
      terms: false,
      errors: {}
    };
  }
  onSignUpUser = () => {
    const {
      LastName,
      FirstName,
      Email,
      UserName,
      PeopleEmail,
      PassWord
    } = this.state;
    let errors = {};
    var user = {};
    if (LastName === "") {
      errors["lastname"] = false;
    }
    if (FirstName === "") {
      errors["FirstName"] = false;
    }
    if (Email === "") {
      errors["Email"] = false;
    }
    if (UserName === "") {
      errors["UserName"] = false;
    }
    if (PassWord === "") {
      errors["PassWord"] = false;
    }
    if (Email === PeopleEmail) {
      errors["err"] = "Người giới thiệu không thể trùng email với bạn!";
    }
    if (
      LastName &&
      FirstName &&
      Email &&
      UserName &&
      PassWord &&
      Email != PeopleEmail
    ) {
      user = {
        LastName: LastName,
        FirstName: FirstName,
        Email: Email,
        PeopleEmail: PeopleEmail,
        UserName: UserName,
        PassWord: PassWord
      };
      if (user) this.props.SignUser(user);
    }
    this.setState({
      errors: errors
    });
  };
  onChange = e => {
    var target = e.target;
    var name = target.name;
    var value = target.type == "checkbox" ? target.checked : target.value;

    console.log();
    this.setState({
      [name]: value
    });
  };
  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    let errors = {};
    if (nextProps) {
      var { checkUser } = nextProps;
      if (checkUser[0].error) {
        errors["err"] = checkUser[0].error;
      }
      if (checkUser[0].success) {
        errors["success"] = checkUser[0].success;
      }
      this.setState({
        errors: errors
      });
    }
  }

  onTerm = () => {
    this.setState({
      terms: false
    });
  };

  render() {
    const {
      LastName,
      FirstName,
      Email,
      PeopleEmail,
      UserName,
      PassWord,
      terms,
      errors,
      status
    } = this.state;
    console.log(this.state);
    return (
      <div className="login_wrapper">
        <div className="max-wrapper">
          <div className="Login_banner row">
            <div className="background_left col-md-6">
              <div className="background_image" style={{ minHeight: "630px" }}>
                <div className="background_border">
                  <div className="left-text text-position padTopLogin">
                    <h3>Quy định đăng kí tài khoản</h3>
                    <p>Vui lòng nhập đầy đủ chính xác thông tin của bạn</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="background_right col-md-6">
              <section className="login_content magTop20">
                <div className="Login_title pad-10">
                  <h3 className="border-title text_cursive">Đăng kí</h3>
                </div>
                <div className="Sign-name grid-name">
                  <div className="pad-10">
                    <span className="text_cursive">LastName</span>
                    <input
                      type="text"
                      className={
                        errors["lastname"] === false
                          ? "form-control pd-cl-10 borderErr"
                          : "form-control pd-cl-10"
                      }
                      name="LastName"
                      placeholder="Lastname"
                      value={LastName}
                      onChange={this.onChange}
                    />
                  </div>
                  <div className="pad-10">
                    <span className="text_cursive">FirstName</span>
                    <input
                      type="text"
                      className={
                        errors["FirstName"] === false
                          ? "form-control pd-cl-10 borderErr"
                          : "form-control pd-cl-10"
                      }
                      name="FirstName"
                      placeholder="Firstname"
                      value={FirstName}
                      onChange={this.onChange}
                    />
                  </div>
                </div>
                <div className="pad-10">
                  <span className="text_cursive">Email</span>
                  <p>
                    <i style={{ fontSize: "12px" }}>
                      ( Chúng tôi sẽ liên hệ tới bạn qua email, vui lòng nhập
                      chính xác email )
                    </i>
                  </p>
                  <input
                    type="email"
                    className={
                      errors["Email"] === false
                        ? "form-control pd-cl-10 borderErr"
                        : "form-control pd-cl-10"
                    }
                    name="Email"
                    placeholder="Nhập email"
                    value={Email}
                    onChange={this.onChange}
                  />
                </div>
                <div className="pad-10">
                  <span className="text_cursive">Người giới thiệu bạn</span>
                  <input
                    type="email"
                    className="form-control pd-cl-10"
                    name="PeopleEmail"
                    placeholder="Nhập email"
                    value={PeopleEmail}
                    onChange={this.onChange}
                  />
                </div>
                <div className="pad-10">
                  <span className="text_cursive">Username</span>
                  <input
                    type="text"
                    className={
                      errors["UserName"] === false
                        ? "form-control pd-cl-10 borderErr"
                        : "form-control pd-cl-10"
                    }
                    name="UserName"
                    placeholder="Username"
                    value={UserName}
                    onChange={this.onChange}
                  />
                </div>
                <div className="pad-10">
                  <span className="text_cursive">Password</span>
                  <input
                    type="password"
                    className={
                      errors["PassWord"] === false
                        ? "form-control pd-cl-10 borderErr"
                        : "form-control pd-cl-10"
                    }
                    name="PassWord"
                    placeholder="Password"
                    value={PassWord}
                    onChange={this.onChange}
                  />
                </div>

                <div className="pad-10">
                  <input
                    type="checkbox"
                    name="terms"
                    checked={terms}
                    onChange={this.onChange}
                  />
                  <span className="text_cursive">
                    Đồng ý với các điều khoản trên
                  </span>
                </div>
                <div className="pad-10 btn-10">
                  <div>
                    <span style={{ color: "red" }}>
                      {this.state.errors["err"]}
                    </span>
                    <span style={{ color: "green" }}>
                      {this.state.errors["success"]}
                    </span>
                  </div>
                  <button
                    onClick={this.onSignUpUser}
                    className="btn btnFocus submit"
                  >
                    Đăng kí
                  </button>
                </div>
                <div className="text-center pad-10  sign-online">
                  <p>Đã có tài khoản? </p>
                  <Link to="/login"> Đăng nhập</Link>
                </div>
              </section>
            </div>
          </div>
        </div>
        {terms ? (
          <ModalBackground
            title="Các điều khoản đăng kí tài khoản"
            width={800}
            onClick={this.onTerm}
          >
            <p>
              {" "}
              Thời gian thực dân Pháp tiến hành khai thác thuộc địa lần thứ nhất
              ở Việt Nam khi nào? Trong đợt khai thác thuộc địa lần thứ nhất của
              thực dân Pháp ở nước ta có giai cấp mới nào được hình thành? Trước
              Chiến tranh thế giới thứ nhất, ở Việt Nam có những giai cấp nào?
              Dưới chế độ thực dân phong kiến, giai cấp nông dân Việt Nam có yêu
              cầu bức thiết nhất là gì? Mâu thuẫn cơ bản và chủ yếu ở Việt Nam
              đầu thế kỷ XX là mâu thuẫn nào? Đặc điểm ra đời của giai cấp công
              nhân Việt Nam như thế nào? Những giai cấp bị trị ở Việt Nam dưới
              chế độ thuộc địa của đế quốc Pháp là: Khi nào phong trào công nhân
              Việt Nam hoàn toàn trở thành một phong trào tự giác? Nguyễn ái
              Quốc lựa chọn con đường giải phóng dân tộc theo khuynh hướng chính
              trị vô sản vào thời gian nào? Báo Đời sống công{" "}
            </p>
            <div className="pad-10">
              <input
                type="checkbox"
                name="terms"
                checked={terms}
                onChange={this.onChange}
              />
              <span className="text_cursive">Đồng ý</span>
            </div>
          </ModalBackground>
        ) : (
          ""
        )}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    checkUser: state.Login
  };
};
const mapDispatchToProps = dispatch => {
  return {
    SignUser: user => {
      dispatch(SignUserRequest(user));
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn);
