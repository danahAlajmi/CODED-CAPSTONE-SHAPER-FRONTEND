import { runInAction, makeAutoObservable } from "mobx";
import instance from "./instance";
import jwt_decode from "jwt-decode";
import * as SecureStore from "expo-secure-store";

class UserStore {
  constructor() {
    makeAutoObservable(this);
  }
  user = null;
  profile = null;
  users = [];
  trainers = [];

  signin = async (newUser, setShowErrorin) => {
    try {
      const response = await instance.post("api/users/signin", newUser);
      instance.defaults.headers.common.Authorization = `Bearer${response.data.token}`;
      runInAction(() => {
        this.user = jwt_decode(response.data.token);
      });

      //this.user = jwt_decode(response.data.token);
      await SecureStore.setItemAsync("token", response.data.token);
    } catch (error) {
      setShowErrorin(true);
    }
  };
  signup = async (newUser, setShowErrorin, setIsSigned) => {
    try {
      const response = await instance.post("api/users/signup", newUser);
      instance.defaults.headers.common.Authorization = `Bearer${response.data.token}`;
      const decodedUser = jwt_decode(response.data.token);

      runInAction(() => {
        this.profile = decodedUser.profile;
      });

      await SecureStore.setItemAsync("token", response.data.token);
      userStore.fetchUsers();
      userStore.fetchTrainers();
      setIsSigned(true);
    } catch (error) {
      console.log(error);
      setShowErrorin(true);
    }
  };
  signout = async () => {
    try {
      runInAction(() => {
        this.user = null;
        this.profile = null;
      });
      instance.defaults.headers.common.Authorization = null;
      SecureStore.deleteItemAsync("token");
    } catch (error) {}
  };

  checkForToken = async () => {
    const userToken = await SecureStore.getItemAsync("token");
    //console.log(userToken);
    if (userToken) {
      const newUser = jwt_decode(userToken);
      runInAction(() => {
        this.user = newUser;
      });
      //this.user = newUser;
    }
  };
  fetchTrainers = async () => {
    try {
      const response = await instance.get("/api/users/trainers");
      //this.trainers = response.data;
      runInAction(() => {
        this.trainers = response.data;
      });
    } catch (error) {
      console.log(error);
    }
  };

  fetchUsers = async () => {
    try {
      const response = await instance.get("/api/users");
      //this.users = response.data;
      runInAction(() => {
        this.users = response.data;
      });
    } catch (error) {
      console.log(error);
    }
  };
  getUserById = (id) => {
    return this.users.find((user) => user._id === id);
  };

  joinSessionAssist = (sessionId) => {
    runInAction(() => {
      this.user.enrolled.push(sessionId);
    });
    this.fetchUsers();
  };
  cancelSessionAssist = (sessionId) => {
    runInAction(() => {
      this.user.enrolled.splice(this.user.enrolled.indexOf(sessionId), 1);
    });
    userStore.fetchUsers();
  };
}

const userStore = new UserStore();
userStore.checkForToken();
userStore.fetchTrainers();
userStore.fetchUsers();
export default userStore;
