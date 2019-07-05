import * as types from "./../constants/config";
var initialState = {
  Questions: [],
  Message:[],
  Exam: {
    id: "",
    name: "",
    time: 0,
    random: 0,
    List: []
  },
  DetailExam: {
    id: "",
    name: "",
    random: 0,
    time: 0,
    subject: "",
    status: 0
  },
  UserManage: [],
  UserInformationManage:{
    affiliate:[],
    introduced:[],
  },
  SubjectManage: [],
  ExamManage: [],
  ItemExamManage: {
    IdExam: "",
    NameExam: "",
    TimeExam: "",
    RandomNumber: "",
    SubjectExam: "",
    status: 1
  },
  ListQuestions: [],
  ShowUpdate: false,
  pageNumber: 1,
  pageMainNumber: 1,
  pageList: [],
  ListGroups: [],
  ItemGroup: {
    id: "",
    name: ""
  },
  ListGroupExam: [],
  ListGroupUser: [],
  ListAccountExam:[],
  ListAccountHistory:[],
  ProfileUser:[],
  FeelBacks:[],
  status: false
};

var updateStateData = (state = initialState, action) => {
  switch (action.type) {
    case types.UPDATE_STATE_DATA:
      state = action.updateData;
      return {
        ...state
      };
    default:
      return state;
  }
};

export default updateStateData;
