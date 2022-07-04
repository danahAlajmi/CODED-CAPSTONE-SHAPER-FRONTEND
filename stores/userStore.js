import { makeAutoObservable } from "mobx";
import instance from "./instance";

class UserStore {
  constructor() {
    makeAutoObservable(this);
  }
  users = [];
  trainers = [];

  fetchTrainers = async () => {
    try {
      const response = await instance.get("/api/users/trainers");
      this.trainers = response.data;
      console.log(this.sessions);
    } catch (error) {
      console.log(error);
    }
  };
}

const userStore = new UserStore();
userStore.fetchTrainers();
export default userStore;
