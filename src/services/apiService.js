import mockData from "./mockData.json"

class ApiService  {
  getMockUser(){
    return mockData.users.find(user => parseInt(user.id )=== parseInt(process.env.REACT_APP_USER_ID))
  }

  constructor() {
    this.baseUrl = `${process.env.REACT_APP_API_URL_DEV}user/${process.env.REACT_APP_USER_ID}`
    this.mockUser = this.getMockUser()
  }
  
  /**
 * Fetches user data based on the environment and user ID.
 * If the environment is 'prod', it fetches data from the API.
 * If the environment is not 'prod', it returns mock data.
 *
 * @returns {Object} - The user data object.
 * @throws {Error} - Throws an error if the fetch operation fails.
 */

  async getUserData() {
    if (process.env.REACT_APP_ENVIRONNEMENT === "prod"){
      try {
        //throw "ma"
        const response = await fetch(`${this.baseUrl}`);
        if (!response.ok) {
          return {error : true}
        }
        const result = await response.json();
        // If today's score is not present, set it to the total score.
        if (result.data.score && !result.data.todayScore) {
          result.data.todayScore = result.data.score;
        }
        return result.data;
      }
      catch (error) {
        return {error : true}
      }
    }
    else{
      return this.mockUser;
    }
  }

  async getUserActivity() {
    if (process.env.REACT_APP_ENVIRONNEMENT === "prod"){
      try{
        const url = `${this.baseUrl}/activity`;
      const response = await fetch(url);
      if (!response.ok) {
        return {error : true}
      }
      const result = await response.json();
      return result;
      
      }
      catch(error){
        return {error : true}
      }
      
    }
    else{
      return this.mockUser.activity;
    }
  }

  async getUserAverageSessions() {
    if (process.env.REACT_APP_ENVIRONNEMENT === "prod"){
      try{
        const response = await fetch(`${this.baseUrl}/average-sessions`);
        if (!response.ok) {
          return {error : true}
        }
        const result = await response.json();
        return result;
      }
      catch(error){
        return {error : true}
      }
      
    }
    else{
      return this.mockUser.averageSessions;
    }
  }

  async getUserPerformance() {
    if (process.env.REACT_APP_ENVIRONNEMENT === "prod"){
      try{
        const response = await fetch(`${this.baseUrl}/performance`);
        if (!response.ok) {
          return {error : true}
        }
        const result = await response.json();
        return result;
      }
      catch(error){
        return {error : true}
      }

      
    }
    else{
      return this.mockUser.performance;
    }
  }

};

export default ApiService;