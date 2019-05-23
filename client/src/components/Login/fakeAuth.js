import axios from "axios";
import { API } from "./../../API/API";

class fakeAuth {
  constructor() {
    if (localStorage.getItem("user")) {
      this.isAuthenticated = true
    }else{
      this.isAuthenticated = false
    }
  }

  authenticate(){
      this.isAuthenticated = true
  }

  signout(cb){
      this.isAuthenticated = false;
      cb()
  }
}

export default new fakeAuth();
