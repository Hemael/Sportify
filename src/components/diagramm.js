import React, { useEffect, useState } from 'react';
import apiService from '../services/apiService';
import ConsoItem from '../components/consoItem.js'; 



import energy from '../data/energy.svg';
import apple from '../data/apple.svg';
import cheesburger from '../data/cheeseburger.svg';
import chicken from '../data/chicken.svg';

const Diagr = ({ userId }) => {
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

    const { calorieCount, proteinCount, carbohydrateCount, lipidCount } = user.keyData;

    return (
        <div id="groupDia">
          <div>
            <p className='Hello'>Bonjours  <span className="firstName">{user.userInfos.firstName}</span></p>
            <p>Félicitation ! Vous avez explosé vos objectifs hier 👏</p>
          </div>
    
          <div className='consoList'>
            <ConsoItem image={energy} value={`${calorieCount}kCal`} label="Calories" className="boiteImgCalo" />
            <ConsoItem image={chicken} value={`${proteinCount}g`} label="Proteines" className="boiteImgPro" />
            <ConsoItem image={apple} value={`${carbohydrateCount}g`} label="Glucides" className="boiteImgGlu" />
            <ConsoItem image={cheesburger} value={`${lipidCount}g`} label="Lipides" className="boiteImgLip" />
          </div>
        </div>
      );
    };
 



export default Diagr;


