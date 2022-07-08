import { makeAutoObservable } from "mobx";
import instance from "./instance";
import userStrore from "./userStore";
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
  getSessionById = (sessionId) => {
    return this.sessions.find((session) => session._id === sessionId);
  };

  joinSession = async (sessionId, userId) => {
    // console.log(sessionId, userId);
    try {
      const res = await instance.post(
        `/api/sessions/${sessionId}/user/${userId}`
      );
      console.log(res.data);
      this.fetchAllSessions();
    } catch (error) {
      console.log(error);
    }
  };
}

const sessionStore = new SessionStore();
sessionStore.fetchAllSessions();
export default sessionStore;
