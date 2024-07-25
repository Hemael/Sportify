const fetchMockData = async () => {
  const response = await fetch('./mockData.json');
  if (!response.ok) {
    throw new Error('Failed to fetch mock data');
  }
  return await response.json();
};

const apiService = {
  data: null,

  async init() {
    this.data = await fetchMockData();
  },

  async getUserData(userId) {
    if (!this.data) {
      await this.init();
    }
    const user = this.data.users.find(user => user.id === userId);
    if (!user) throw new Error('User not found for user data');
    return user;
  },

  async getUserActivity(userId) {
    if (!this.data) {
      await this.init();
    }
    const user = this.data.users.find(user => user.id === userId);
    if (!user) throw new Error('User not found for activity');
    return user.activity;
  },

  async getUserAverageSessions(userId) {
    if (!this.data) {
      await this.init();
    }
    const user = this.data.users.find(user => user.id === userId);
    if (!user) throw new Error('User not found for average sessions');
    return user.averageSessions;
  },

  async getUserPerformance(userId) {
    if (!this.data) {
      await this.init();
    }
    const user = this.data.users.find(user => user.id === userId);
    if (!user) throw new Error('User not found for performance');
    return user.performance;
  },
};

export default apiService;