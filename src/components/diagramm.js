import React, { useEffect, useState } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, PieChart, Pie, Cell, Label } from 'recharts';
import ApiService from '../services/apiService';
import ConsoItem from '../components/consoItem.js';

import energy from '../data/energy.svg';
import apple from '../data/apple.svg';
import cheesburger from '../data/cheeseburger.svg';
import chicken from '../data/chicken.svg';

const translateKind = (kind, language = 'en') => {
  const translations = {
    en: {
      cardio: 'Cardio',
      energy: 'Energy',
      endurance: 'Endurance',
      strength: 'Strength',
      speed: 'Speed',
      intensity: 'Intensity'
    },
    fr: {
      cardio: 'Cardio',
      energy: 'Énergie',
      endurance: 'Endurance',
      strength: 'Force',
      speed: 'Vitesse',
      intensity: 'Intensité'
    }
  };

  return translations[language][kind];
};

const Diagr = () => {
  const [user, setUser] = useState(null);
  const [performance, setPerformance] = useState(null);
  const [error, setError] = useState(null);

  const isProd = process.env.REACT_APP_ENVIRONNEMENT === 'prod';

  useEffect(() => {
    const apiService = new ApiService();

    const fetchData = async () => {
      try {
        const userData = await apiService.getUserData();
        const userPerformance = await apiService.getUserPerformance();

        if (isProd) {
          const kindMap = userPerformance.data.kind;
          const performanceData = userPerformance.data.data.map(item => ({
            value: item.value,
            kind: translateKind(kindMap[item.kind], 'fr') // Change 'fr' to 'en' for English
          }));
          setUser(userData);
          setPerformance(performanceData.reverse()); // Inverse l'ordre des données
        } else {
          const kindMap = userPerformance.kind;
          const performanceData = userPerformance.data.map(item => ({
            value: item.value,
            kind: translateKind(kindMap[item.kind], 'fr') // Change 'fr' to 'en' for English
          }));
          setUser(userData);
          setPerformance(performanceData.reverse()); // Inverse l'ordre des données
        }
        setError(null);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, [isProd]);

  if (error) {
    return <div>Erreur : {error}</div>;
  }
  if (!user || !performance) {
    return <div>Chargement...</div>;
  }

  const { calorieCount, proteinCount, carbohydrateCount, lipidCount } = user.keyData;
  const scorePercentage = user.todayScore * 100;

  return (
    <div id="groupDia">
      <div>
        <p className='Hello'>Bonjour <span className="firstName">{user.userInfos.firstName}</span></p>
        <p>Félicitations ! Vous avez explosé vos objectifs hier 👏</p>
      </div>

      <div className='diagram'>

      <div className='other'>
      </div>

        <div className='diagrPerf'>
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={performance} cx="50%" cy="50%" outerRadius="70%">
              <PolarGrid gridType="polygon" radialLines={false} />
              <PolarAngleAxis dataKey="kind" tick={{ fill: 'white', fontSize: 10.5 }} tickSize={13} />
              <Radar name="Performance" dataKey="value" stroke="none" fill="#ff0101" fillOpacity={0.7} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        <div className='donutChart'>

          <p className='scoreText'>Score</p>
          <PieChart width={210} height={210}>

            <Pie
              data={[
                { name: 'Score', value: scorePercentage },
                { name: 'Remaining', value: 100 - scorePercentage }
              ]}
              startAngle={90} // Commence par le haut
              endAngle={450} 
              innerRadius="70%"
              outerRadius="80%"
              dataKey="value"
              labelLine={false}
              stroke="none"
              cornerRadius={5}>

              <Label
                value={`${scorePercentage}%`}
                fontSize={24}
                fontWeight="bold"
                className="textBlack"
                position="center"
                dy={-10}
              />

              <Label
                value="de votre"
                fontSize={16}
                className="textGrey"
                position="center"
                dy={10} // ajustez la valeur pour décaler le label vers le bas
              />

              <Label
                value="objectif"
                fontSize={16}
                className="textGrey"
                position="center"
                dy={30} // ajustez la valeur pour décaler le label vers le bas
              />
              <Cell fill="#ff0101" />
              <Cell fill="#FBFBFB" />
            </Pie>

          </PieChart>
        </div>

        <div className='consoList'>
          <ConsoItem image={energy} value={`${calorieCount}kCal`} label="Calories" className="boiteImgCalo" />
          <ConsoItem image={chicken} value={`${proteinCount}g`} label="Protéines" className="boiteImgPro" />
          <ConsoItem image={apple} value={`${carbohydrateCount}g`} label="Glucides" className="boiteImgGlu" />
          <ConsoItem image={cheesburger} value={`${lipidCount}g`} label="Lipides" className="boiteImgLip" />
        </div>

      </div>
    </div>
  );
};

export default Diagr;
