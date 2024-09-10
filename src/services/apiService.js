import mockData from "./mockData.json";
import { User, Activity, AverageSession, Performance } from './models';

class ApiService {
  constructor() {
    this.baseUrl = `${process.env.REACT_APP_API_URL_DEV}user/${process.env.REACT_APP_USER_ID}`;
    this.mockUser = this.getMockUser();
  }

  getMockUser() {
    return mockData.users.find(user => parseInt(user.id) === parseInt(process.env.REACT_APP_USER_ID));
  }

  async fetchFromApi(endpoint) {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      return await response.json();
    } catch (error) {
      console.error(error);
      return { error: true };
    }
  }

  // Méthode générique pour gérer prod/mock
  async fetchDataOrMock(fetchFn, mockData) {
    if (process.env.REACT_APP_ENVIRONNEMENT === "prod") {
      const result = await fetchFn();
      if (result.error) {
        return null; 
      }
      return result;
    }
    return mockData;
  }


  async getUserData() {
    return this.fetchDataOrMock(
      async () => {
        const result = await this.fetchFromApi("");
        if (result.data.score && !result.data.todayScore) {
          result.data.todayScore = result.data.score;
        }
        return new User(result.data.id, result.data.userInfos, result.data.todayScore, result.data.keyData);
      },
      new User(this.mockUser.id, this.mockUser.userInfos, this.mockUser.todayScore, this.mockUser.keyData)
    );
  }


  async getUserActivity() {
    return this.fetchDataOrMock(
      async () => {
        const result = await this.fetchFromApi("/activity");
        return new Activity(result.data.userId, result.data.sessions);
      },
      new Activity(this.mockUser.id, this.mockUser.activity)
    );
  }

 
  async getUserAverageSessions() {
    return this.fetchDataOrMock(
      async () => {
        const result = await this.fetchFromApi("/average-sessions");
        return new AverageSession(result.data.userId, result.data.sessions);
      },
      new AverageSession(this.mockUser.id, this.mockUser.averageSessions)
    );
  }


  async getUserPerformance() {
    return this.fetchDataOrMock(
      async () => {
        const result = await this.fetchFromApi("/performance");
        return new Performance(result.data.userId, result.data.kind, result.data.data);
      },
      new Performance(this.mockUser.id, this.mockUser.performance.kind, this.mockUser.performance.data)
    );
  }
}

export default ApiService;
