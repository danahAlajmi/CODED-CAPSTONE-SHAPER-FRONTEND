import { makeAutoObservable } from "mobx";
import instance from "./instance";
import jwt_decode from "jwt-decode";
import * as SecureStore from "expo-secure-store";
import profileStore from "./profileStore";

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
      this.user = jwt_decode(response.data.token);
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
      this.profile = decodedUser.profile;
      await SecureStore.setItemAsync("token", response.data.token);
      setIsSigned(true);
    } catch (error) {
      console.log(error);
      setShowErrorin(true);
    }
  };
  signout = async () => {
    try {
      this.user = null;
      this.profile = null;
      instance.defaults.headers.common.Authorization = null;
      SecureStore.deleteItemAsync("token");
    } catch (error) {}
  };

  checkForToken = async () => {
    const userToken = await SecureStore.getItemAsync("token");
    //console.log(userToken);
    if (userToken) {
      const newUser = jwt_decode(userToken);
      this.user = newUser;
    }
  };
  fetchTrainers = async () => {
    try {
      const response = await instance.get("/api/users/trainers");
      this.trainers = response.data;
    } catch (error) {
      console.log(error);
    }
  };

  fetchUsers = async () => {
    try {
      const response = await instance.get("/api/users");
      this.users = response.data;
    } catch (error) {
      console.log(error);
    }
  };
  getUserById = (id) => {
    return this.users.find((user) => user._id === id);
  };
}

const userStore = new UserStore();
userStore.checkForToken();
userStore.fetchTrainers();
userStore.fetchUsers();
export default userStore;
