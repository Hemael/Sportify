import React, { useEffect, useState } from 'react';
import apiService from '../services/apiService';

const UserComponent = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Assurez-vous que userId est un nombre
        const userData = await apiService.getUserData(parseInt(userId, 10));
        setUser(userData);
        setError(null); // Effacez les erreurs précédentes
      } catch (error) {
        setError(error.message); // Définissez le message d'erreur si l'utilisateur n'est pas trouvé
      }
    };

    fetchUser();
  }, [userId]);

  if (error) {
    return <div>Erreur : {error}</div>; // Affichez le message d'erreur
  }

  if (!user) {
    return <div>Chargement...</div>;
  }

  return (
    <div className='test'>
      <h2>Utilisateur {user.id}</h2>
      <p>Nom : {user.userInfos.firstName} {user.userInfos.lastName}</p>
      <p>Âge : {user.userInfos.age}</p>
      <p>Score d'aujourd'hui : {user.todayScore}</p>
      <h3>Données clés</h3>
      <ul>
        <li>Calories : {user.keyData.calorieCount}</li>
        <li>Protéines : {user.keyData.proteinCount}</li>
        <li>Glucides : {user.keyData.carbohydrateCount}</li>
        <li>Lipides : {user.keyData.lipidCount}</li>
      </ul>
      <h3>Activité</h3>
      <ul>
        {user.activity.map((activity) => (
          <li key={activity.day}>
            {activity.day} : {activity.kilogram} kg, {activity.calories} calories
          </li>
        ))}
      </ul>
      <h3>Sessions moyennes</h3>
      <ul>
        {user.averageSessions.map((session) => (
          <li key={session.day}>
            Jour {session.day} : {session.sessionLength} minutes
          </li>
        ))}
      </ul>
      <h3>Performances</h3>
      <ul>
        {user.performance.data.map((performance) => (
          <li key={performance.kind}>
            {user.performance.kind[performance.kind]} : {performance.value}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserComponent;
