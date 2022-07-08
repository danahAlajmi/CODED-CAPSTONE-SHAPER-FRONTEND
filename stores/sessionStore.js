import { makeAutoObservable } from "mobx";
import instance from "./instance";

class SessionStore {
  constructor() {
    makeAutoObservable(this);
  }
  sessions = [];
  isLoading = true;

  fetchAllSessions = async () => {
    try {
      const response = await instance.get("/api/sessions");
      this.sessions = response.data;
    } catch (error) {
      console.log(error);
    }
  };
  CreateSession = async (session) => {
    try {
      const response = await instance.post("/api/sessions/create",session);
      this.sessions.push(response.data);
    } catch (error) {
      console.log(error);
    }
  };

}

const sessionStore = new SessionStore();
sessionStore.fetchAllSessions();
export default sessionStore;
