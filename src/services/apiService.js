import mockData from "./mockData.json"

class ApiService  {
  getMockUser(){
    return mockData.users.find(user => parseInt(user.id )=== parseInt(process.env.REACT_APP_USER_ID))
  }

  constructor() {
    this.baseUrl= `${process.env.REACT_APP_API_URL_DEV}user/${process.env.REACT_APP_USER_ID}`
    this.mockUser = this.getMockUser()
  }
  

  async getUserData() {
    if (process.env.REACT_APP_ENVIRONNEMENT === "prod"){
      const response = await fetch(`${this.baseUrl}`);
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const result = await response.json();
        return result.data;
        
    }
    else{
      return this.mockUser;
    }
  }

  async getUserActivity(userId) {
    if (process.env.REACT_APP_ENVIRONNEMENT === "prod"){
      const response = await fetch(`${this.baseUrl}`);
        if (!response.ok) {
          throw new Error('Failed to fetch user data activity');
        }
        const result = await response.json();
        return result.data.activity;
    
    }
    else{
      return this.mockUser.activity;
    }
  }

  async getUserAverageSessions(userId) {
    if (process.env.REACT_APP_ENVIRONNEMENT === "prod"){
      const response = await fetch(`${this.baseUrl}`);
        if (!response.ok) {
          throw new Error('Failed to fetch user data Average sessions');
        }
        const result = await response.json();
        return result.data.averageSessions;
    
    }
    else{
      return this.mockUser.averageSessions;
    }
  }

  async getUserPerformance(userId) {
    if (process.env.REACT_APP_ENVIRONNEMENT === "prod"){
      const response = await fetch(`${this.baseUrl}`);
        if (!response.ok) {
          throw new Error('Failed to fetch user data performance');
        }
        const result = await response.json();
        return result.data.performance;
    
    }
    else{
      return this.mockUser.performance;
    }
  }

};

export default ApiService;