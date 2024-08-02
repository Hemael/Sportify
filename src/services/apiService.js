import mockData from "./mockData.json"

class ApiService  {
  getMockUser(){
    return mockData.users.find(user => parseInt(user.id )=== parseInt(process.env.REACT_APP_USER_ID))
  }

  constructor() {
    this.baseUrl = `${process.env.REACT_APP_API_URL_DEV}user/${process.env.REACT_APP_USER_ID}`
    this.mockUser = this.getMockUser()
  }
  

  async getUserData() {
    if (process.env.REACT_APP_ENVIRONNEMENT === "prod"){
      const response = await fetch(`${this.baseUrl}`);
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const result = await response.json();
        console.log("UserData:", result.data);
        return result.data;
        
    }
    else{
      console.log("MockUserData:", this.mockUser);
      return this.mockUser;
    }
  }

  async getUserActivity() {
    if (process.env.REACT_APP_ENVIRONNEMENT === "prod"){
      const url = `${this.baseUrl}/activity`;
      console.log("Fetching activity from:", url);
      const response = await fetch(url);
      console.log("Response status:", response.status);
      if (!response.ok) {
        throw new Error('Failed to fetch user data activity');
      }
      const result = await response.json();
      console.log("UserActivity:", result);
      return result;
    }
    else{
      console.log("MockUserActivity:", this.mockUser.activity);
      return this.mockUser.activity;
    }
  }

  async getUserAverageSessions() {
    if (process.env.REACT_APP_ENVIRONNEMENT === "prod"){
      const response = await fetch(`${this.baseUrl}/average-sessions`);
        if (!response.ok) {
          throw new Error('Failed to fetch user data Average sessions');
        }
        const result = await response.json();
        console.log("UserAverageSessions:", result);
        return result;
    
    }
    else{
      console.log("MockUserAverageSessions:", this.mockUser.averageSessions);
      return this.mockUser.averageSessions;
    }
  }

  async getUserPerformance() {
    if (process.env.REACT_APP_ENVIRONNEMENT === "prod"){
      const response = await fetch(`${this.baseUrl}/performance`);
        if (!response.ok) {
          throw new Error('Failed to fetch user data performance');
        }
        const result = await response.json();
        console.log("UserPerformance:", result);
        return result;
    
    }
    else{
      console.log("MockUserPerformance:", this.mockUser.performance);
      return this.mockUser.performance;
    }
  }

};

export default ApiService;