// Modèle pour l'utilisateur
class User {
    constructor(id, userInfos, todayScore, keyData) {
      this.id = id;
      this.firstName = userInfos.firstName; // Extraire firstName depuis userInfos
      this.lastName = userInfos.lastName;   // Extraire lastName depuis userInfos
      this.todayScore = todayScore;
      this.calorieCount = keyData.calorieCount;
      this.proteinCount = keyData.proteinCount;
      this.carbohydrateCount = keyData.carbohydrateCount;
      this.lipidCount = keyData.lipidCount;
    }
  }
  
  // Modèle pour l'activité de l'utilisateur
  class Activity {
    constructor(userId, sessions) {
      this.userId = userId;
      this.sessions = sessions;
    }
  }
  
  // Modèle pour les sessions moyennes de l'utilisateur
  class AverageSession {
    constructor(userId, sessions) {
      this.userId = userId;
      this.sessions = sessions;
    }
  }
  
  // Modèle pour les performances de l'utilisateur
  class Performance {
    constructor(userId, kind, data) {
      this.userId = userId;
      this.kind = kind;
      this.data = data;
    }
  }
  
  // Exportation des modèles
  export { User, Activity, AverageSession, Performance };
  