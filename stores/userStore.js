import { makeAutoObservable } from "mobx";
import instance from "./instance";
import jwt_decode from "jwt-decode";
import * as SecureStore from "expo-secure-store";

class UserStore {
  constructor() {
    makeAutoObservable(this);
  }
  user = null;
  users = [];
  trainers = [];

  signin = async (newUser, setShowErrorin) => {
    try {
      const response = await instance.post("api/users/signin", newUser);
      instance.defaults.headers.common.Authorization = `Bearer${response.data.token}`;
      this.user = jwt_decode(response.data.token);
      await SecureStore.setItemAsync("token", response.data.token);
    } catch (error) {}
  };
  signup = async (newUser) => {
    try {
      const response = await instance.post("api/users/signup", newUser);
      instance.defaults.headers.common.Authorization = `Bearer${response.data.token}`;
      this.user = jwt_decode(response.data.token);
      await SecureStore.setItemAsync("token", response.data.token);
      profileStore.fetchProfile();
      userStore.getUsers();
    } catch (error) {}
  };
  signout = async () => {
    try {
      this.user = null;
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
      //console.log(this.sessions);
    } catch (error) {
      console.log(error);
    }
  };
}

const userStore = new UserStore();
userStore.checkForToken();
userStore.fetchTrainers();
export default userStore;
