import React from 'react';
import userImage from './../img/user.svg';
import { Route, Link } from 'react-router-dom';
import { API} from './../API/API';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Lastname: '',
      Firstname: '',
      email: '',
      Username: ''
    }
    this.onChange = this.onChange.bind(this)
  }
  componentDidMount() {
    var user = JSON.parse(localStorage.getItem('user'));
    let data = { id: user.IDUSER }
    this.GetUserId(data);
  }
  GetUserId = (data) => {
    return fetch(`${API}/GetUserId`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
      .then(data => {
        if (data.error) {
          console.log(data)
        } else {
          this.setState({
            Lastname: data.LASTNAME,
            Firstname: data.FIRSTNAME,
            email: data.EMAIL,
            Username: data.USERNAME
          })
        }
      })
      .catch(err => {
        console.error(err)
      })
  }
  onChange = (e) => {
    var target = e.target;
    var name = target.name
    var value = target.value;
    this.setState({
      [name]: value
    })
  }
  render() {
    const { Firstname, Lastname, email, Username } = this.state;
    return (
      <div className="section-test">
        <div className="account-section-header">
          <p>Thông tin tài khoản</p>
        </div>
        <div className="account-user-content max600">
          <div className="Sign-name grid-name">
            <div className="pad-10">
              <span className="text_cursive">LastName</span>
              <input type="text" name="Lastname" value={Lastname} onChange={this.onChange} className="form-control pd-cl-10" placeholder="Lastname" />

            </div>
            <div className="pad-10">
              <span className="text_cursive">FirstName</span>
              <input type="text" value={Firstname} onChange={this.onChange} className="form-control pd-cl-10" name="FirstName" placeholder="Firstname" />
            </div>
          </div>
          <div className="pad-10">
            <span className="text_cursive">Email</span>
            <input type="email" value={email} onChange={this.onChange} className="form-control pd-cl-10" name="email" placeholder="email" />
          </div>
          <div className="pad-10">
            <span className="text_cursive">Username</span>
            <input type="text" value={Username} onChange={this.onChange} className="form-control pd-cl-10 not-allow" readOnly name="Username" placeholder="Username" />
          </div>
        </div>
      </div>
    )
  }
}
class ItemTest extends React.Component {
  render() {
    const { item, index } = this.props;
    return (
      <tr>
        <td>{index + 1}</td>
    <td>{item.CONFIRM?<Link to={`/result-test?id=${item.ID_UX}`}>{item.EXAMTEXT}</Link>:<p>{item.EXAMTEXT}</p> }</td>
        <td>{item.SUBTEXT}</td>
        <td>{item.TIMESTART}</td>
        <td>{item.TIMEEND}</td>
        <td>{item.DATEEXAM}</td>
        <td>{item.CONFIRM ? 'Đã nộp' : 'Chưa nộp'}</td>
        <td>{item.SCORE > 0 ? item.SCORE : 0}</td>
      </tr>
    )
  }
}
class Tested extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      DataUserExam: {}
    }
  }
  componentDidMount() {
    var user = JSON.parse(localStorage.getItem('user'));
    let data = { id: user.IDUSER }
    this.GetHistoryExamUser(data);
  }
  GetHistoryExamUser = (data) => {
    return fetch(`${API}/GetHistoryExamUser`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
      .then(data => {
        if (data.error) {
          console.log(data)
        } else {
          this.setState({
            DataUserExam: data
          })
        }
      })
      .catch(err => {
        console.error(err)
      })
  }
  ShowDataUserExam = (data) => {
    var result = null;
    if (data.length > 0) {
      result = data.map((item, index) => {
        return (
          <ItemTest
            key={index}
            item={item}
            index={index}
          />
        )
      })
    }
    // else {
    //   result = <p style={{ textAlign: "center", padding: "50px", fontSize: "20px" }}>Bạn chưa làm bài thi!</p>;
    // }
    return result;
  }
  render() {
    const { DataUserExam } = this.state;
    return (
      <div className="section-test">
        <div className="account-section-header">
          <p>Các đề thi đã làm</p>
        </div>
        <div className="account-section-content">
          {DataUserExam.length > 0 ?
          <table className="table table_list">
            <thead>
              <tr>
                <th>STT</th>
                <th>Tên đề</th>
                <th>Môn học</th>
                <th>Bắt đầu</th>
                <th>Kết thúc</th>
                <th>Ngày thi</th>
                <th>Nộp bài</th>
                <th>Câu đúng</th>
              </tr>
            </thead>
            <tbody className="list-user-exam">
              {this.ShowDataUserExam(DataUserExam)}
            </tbody>
          </table> :
          <p style={{ textAlign: "center", padding: "50px", fontSize: "20px" }}>Bạn chưa làm bài thi!</p>
          }
        </div>
      </div>
    )
  }
}
const MenuLink = ({ Lable, to, active }) => {
  return (
    <Route
      path={to}
      exact={active}
      children={({ match }) => (
        <li className={match ? 'active-account' : ''}>
          <Link to={to}>{Lable}</Link>
        </li>
      )}
    />
  )
}
class Account extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkTest: false,
      checkProfile: false,
      name: ''
    }
  }
  componentDidMount() {
    var name = '';
    var { match } = this.props;
    var user = JSON.parse(localStorage.getItem('user'));
    this.setState({
      name: user.LASTNAME + " " + user.FIRSTNAME
    })
    if (match) {
      name = match.match.params.name;
      if (name === 'user') {
        this.setState({
          checkTest: true
        })
      }
      if (name === "profile") {
        this.setState({
          checkProfile: true
        })
      }
    }
  }
  render() {
    const { checkTest, checkProfile, name } = this.state;
    return (
      <div className="Profile-user">
        <div className="container user-page-container">
          <div className="row user-info">
            <div className="menu-left col-md-2">
              <div className="account-infomation">
                <div className="user-image">
                  <img src={userImage} alt=""></img>
                </div>
                <div className="user-name-text">
                  <h6>{name}</h6>
                </div>
              </div>
              <div className="List-menu">
                <div className="dropdown-list">
                  <ul>
                    <MenuLink
                      Lable="Thông tin tài khoản"
                      to="/account/profile"
                      active={false}
                    />
                    <MenuLink
                      Lable="Các đề thi đã làm"
                      to="/account/user"
                      active={false}
                    />
                  </ul>
                </div>
              </div>
            </div>
            <div className="content-right col-md-10">
              <div className="exam-list">
                <div className="section-exam">
                  {checkTest ? <Tested /> : (checkProfile ? <Profile /> : "")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default Account;