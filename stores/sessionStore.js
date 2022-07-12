import { makeAutoObservable } from "mobx";
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
      this.sessions = response.data;
    } catch (error) {
      console.log(error);
    }
  };
  // getSessionById = (sessionId) => {
  //   return this.sessions.find((session) => session._id === sessionId);
  // };

  joinSession = async (sessionId, userId) => {
    // console.log(sessionId, userId);
    try {
      const res = await instance.post(
        `/api/sessions/${sessionId}/user/${userId}`
      );
      const updateSession = Object.assign(
        this.sessions.find((session) => session._id === sessionId),
        res.data
      );
      userStore.user.enrolled.push(sessionId);
      userStore.fetchUsers();
      this.fetchAllSessions();
    } catch (error) {
      console.log(error);
    }
  };
  cancelSession = async (sessionId, userId) => {
    // console.log(sessionId, userId);
    try {
      const res = await instance.post(
        `/api/sessions/cancel/${sessionId}/${userId}`
      );
      const canclSession = Object.assign(
        this.sessions.find((session) => session._id === sessionId),
        res.data
      );
      userStore.user.enrolled.splice(
        userStore.user.enrolled.indexOf(sessionId),
        1
      );
      //console.log(res.data);
      userStore.fetchUsers();
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
      this.sessions.push(response.data);
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
