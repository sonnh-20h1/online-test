import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { SignUserRequest } from './../../actions/index';
class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            LastName: '',
            FirstName: '',
            Email: '',
            UserName: '',
            PassWord: '',
            errors: {}
        }
    }
    onSignUpUser = () => {
        const { LastName, FirstName, Email, UserName, PassWord } = this.state;
        let errors = {};
        var user = {};
        if (LastName === '') {
            errors['lastname'] = false;
        }
        if (FirstName === '') {
            errors['FirstName'] = false;
        }
        if (Email === '') {
            errors['Email'] = false;
        }
        if (UserName === '') {
            errors['UserName'] = false;
        }
        if (PassWord === '') {
            errors['PassWord'] = false;
        }
        if (LastName && FirstName && Email && UserName && PassWord) {
            user = {
                LastName: LastName,
                FirstName: FirstName,
                Email: Email,
                UserName: UserName,
                PassWord: PassWord
            }
            if (user) this.props.SignUser(user);
        }
        this.setState({
            errors: errors
        })
    }
    onChange = (e) => {
        var target = e.target;
        var name = target.name;
        var value = target.value;
        this.setState({
            [name]: value
        })
    }
    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
        let errors = {}
        if (nextProps) {
            var { checkUser } = nextProps;
            if (checkUser[0].error) {
                errors['err'] = checkUser[0].error
            }
            if (checkUser[0].success) {
                errors['success'] = checkUser[0].success;
            }
            this.setState({
                errors: errors
            })
        }
    }

    render() {
        const { LastName, FirstName, Email, UserName, PassWord, errors } = this.state;
        return (
            <div className="login_wrapper">
                <div className="max-wrapper">
                    <div className="Login_banner row">
                        <div className="background_left col-md-6">
                            <div className="background_image MinHeight">
                                <div className="background_border">
                                    <div className="left-text text-position padTopLogin">
                                        <h3>Allready have an account?</h3>
                                        <p>Click the log in button you will see a log in popup window</p>
                                        <button><Link to='/login' > Sign up</Link></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="background_right col-md-6">
                            <section className="login_content magTop20" >
                                <div className="Login_title pad-10">
                                    <h3 className="border-title text_cursive">Sign in</h3>
                                </div>
                                <div className="Sign-name grid-name">
                                    <div className="pad-10">
                                        <span className="text_cursive">LastName</span>
                                        <input
                                            type="text"
                                            className={errors['lastname'] === false ? "form-control pd-cl-10 borderErr" : "form-control pd-cl-10"}
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
                                            className={errors['FirstName'] === false ? "form-control pd-cl-10 borderErr" : "form-control pd-cl-10"}
                                            name="FirstName"
                                            placeholder="Firstname"
                                            value={FirstName}
                                            onChange={this.onChange}
                                        />
                                    </div>
                                </div>
                                <div className="pad-10">
                                    <span className="text_cursive">Email</span>
                                    <input
                                        type="email"
                                        className={errors['Email'] === false ? "form-control pd-cl-10 borderErr" : "form-control pd-cl-10"}
                                        name="Email"
                                        placeholder="email"
                                        value={Email}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <div className="pad-10">
                                    <span className="text_cursive">Username</span>
                                    <input
                                        type="text"
                                        className={errors['UserName'] === false ? "form-control pd-cl-10 borderErr" : "form-control pd-cl-10"}
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
                                        className={errors['PassWord'] === false ? "form-control pd-cl-10 borderErr" : "form-control pd-cl-10"}
                                        name="PassWord"
                                        placeholder="Password"
                                        value={PassWord}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <div className="pad-10 btn-10">
                                    <div>
                                        <span style={{ color: "red" }}>{this.state.errors["err"]}</span>
                                        <span style={{ color: "green" }}>{this.state.errors["success"]}</span>
                                    </div>
                                    <button onClick={this.onSignUpUser} className="btn btnFocus submit">sign in</button>
                                </div>
                                <div className="text-center pad-10  sign-online">
                                    <p>Allready have an account? </p>
                                    <Link to='/login' > Sign up</Link>
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
        checkUser: state.Login
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        SignUser: (user) => {
            dispatch(SignUserRequest(user))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SignIn);