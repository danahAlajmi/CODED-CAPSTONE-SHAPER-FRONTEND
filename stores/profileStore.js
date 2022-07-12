import { makeAutoObservable } from "mobx";
import instance from "./instance";
import sessionStore from "./sessionStore";

class ProfileStore {
  constructor() {
    makeAutoObservable(this);
  }
  profiles = [];
  isLoading = true;
  fetchProfile = async () => {
    try {
      const response = await instance.get("/api/profile");
      this.profiles = response.data;
      //console.log(this.profiles);
      this.isLoading = false;
    } catch (error) {
      console.log("ProfileStore -> fetchProfile -> error", error);
    }
  };

  updateProfile = async (updatedProfile, profileId,showError) => {
    try {
      const res = await instance.put(
        `/api/profile/${profileId}`,
        updatedProfile
      );
      // console.log(updatedProfile);
      // console.log(profileId);
      this.fetchProfile();
      const updateProfile = Object.assign(
        this.profiles.find((profile) => profile._id === profileId),
        updatedProfile
      );
      showError(false)
      this.fetchProfile();
    } catch (error) {
      console.log("ProfileStore -> updateProfile -> error", error);
      showError(false)
    }
  };
  getProfileById = (userId) => {
    return this.profiles.find((profile) => profile.user._id === userId);
  };

  getNumOfHours(profileId) {
    const profile = this.profiles.find((profile) => profile._id === profileId);
    const enrolledSessions = profile.user.enrolled;
    const ownerSissions = profile.user.owner;
    let allSessions = enrolledSessions.concat(ownerSissions);
    let allDurations = [];
    let numOfMin = 0;
    allSessions.map((id) => {
      sessionStore.sessions.forEach((session) => {
        if (session._id == id) {
          allDurations.push(session.duration);
        }
      });
    });
    if (allDurations.length == 0) {
      return 0;
    } else {
      for (let index = 0; index < allDurations.length; index++) {
        numOfMin += allDurations[index];
      }
      let numH = numOfMin / 60;
      return numH.toFixed(0);
    }
  }
}

const profileStore = new ProfileStore();
profileStore.fetchProfile();
export default profileStore;
