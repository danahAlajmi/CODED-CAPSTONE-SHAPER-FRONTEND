import { makeAutoObservable, runInAction } from "mobx";
import instance from "./instance";
import userStore from "./userStore";
class SessionStore {
  constructor() {
    makeAutoObservable(this);
  }
  sessions = [];
  isLoading = true;
  fetchAllSessions = async () => {
    try {
      const response = await instance.get("/api/sessions");

      runInAction(() => {
        this.sessions = response.data;
      });
      //this.sessions = response.data;
    } catch (error) {
      console.log(error);
    }
  };

  joinSession = async (sessionId, userId) => {
    try {
      const res = await instance.post(
        `/api/sessions/${sessionId}/user/${userId}`
      );
      userStore.joinSessionAssist(sessionId);
      this.fetchAllSessions();
    } catch (error) {
      console.log(error);
    }
  };
  cancelSession = async (sessionId, userId) => {
    try {
      const res = await instance.post(
        `/api/sessions/cancel/${sessionId}/${userId}`
      );
      userStore.cancelSessionAssist(sessionId);

      this.fetchAllSessions();
    } catch (error) {
      console.log(error);
    }
  };
  getSessionById = (id) => {
    return this.sessions.find((session) => session._id === id);
  };

  CreateSession = async (session) => {
    try {
      const response = await instance.post("/api/sessions/create", session);
      runInAction(() => {
        this.sessions.push(response.data);
      });
      this.fetchAllSessions();
    } catch (error) {
      console.log(error);
    }
  };

  UpdateSession = async (session, sessionId) => {
    try {
      const response = await instance.put(
        `/api/sessions/update/${sessionId}`,
        session
      );
      this.fetchAllSessions();
    } catch (error) {
      console.log(error);
    }
  };

  DeleteSession = async (session, sessionId, showIsDeleted) => {
    try {
      const response = await instance.delete(
        `/api/sessions/delete/${sessionId}`,
        session
      );
      this.fetchAllSessions();
      showIsDeleted(true);
    } catch (error) {
      console.log(error);
    }
  };
}

const sessionStore = new SessionStore();
sessionStore.fetchAllSessions();
export default sessionStore;
