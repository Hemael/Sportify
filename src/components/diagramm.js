import React, { useEffect, useState } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, PieChart, Pie, Cell, Label, LineChart, Line, XAxis, Tooltip, BarChart, Bar, CartesianGrid, YAxis} from 'recharts';
import ApiService from '../services/apiService';
import ConsoItem from '../components/consoItem';

import energy from '../data/energy.svg';
import apple from '../data/apple.svg';
import cheesburger from '../data/cheeseburger.svg';
import chicken from '../data/chicken.svg';
import { CustomCursor, LineTooltip, renderTooltip } from './customCursorTooltip';


const translateKind = (kind, language = 'en') => {
  const translations = {
    en: {
      cardio: 'Cardio',
      energy: 'Energy',
      endurance: 'Endurance',
      strength: 'Strength',
      speed: 'Speed',
      intensity: 'Intensity',
    },
    fr: {
      cardio: 'Cardio',
      energy: 'Énergie',
      endurance: 'Endurance',
      strength: 'Force',
      speed: 'Vitesse',
      intensity: 'Intensité',
    },
  };

  return translations[language][kind];
};

const Diagr = () => {
  const [user, setUser] = useState(null);
  const [performance, setPerformance] = useState(null);
  const [averageSessions, setAverageSessions] = useState(null);
  const [activityData, setActivityData] = useState([]);
  const [error, setError] = useState(null);

  const isProd = process.env.REACT_APP_ENVIRONNEMENT === 'prod';

  useEffect(() => {
    const apiService = new ApiService();

    const fetchData = async () => {
      try {
        const userData = await apiService.getUserData();
        const userPerformance = await apiService.getUserPerformance();
        const userAverageSessions = await apiService.getUserAverageSessions();
        const userActivityData = await apiService.getUserActivity();

        if (isProd) {
          const kindMap = userPerformance.data.kind;
          const performanceData = userPerformance.data.data.map((item) => ({
            value: item.value,
            kind: translateKind(kindMap[item.kind], 'fr'), // Change 'fr' to 'en' for English
          }));
          setUser(userData);
          setPerformance(performanceData.reverse()); // Inverse l'ordre des données
          setAverageSessions(userAverageSessions.data.sessions);
          setActivityData(userActivityData.data); // Ajouté pour stocker les données d'activité
        } else {
          const kindMap = userPerformance.kind;
          const performanceData = userPerformance.data.map((item) => ({
            value: item.value,
            kind: translateKind(kindMap[item.kind], 'fr'), // Change 'fr' to 'en' for English
          }));
          setUser(userData);
          setPerformance(performanceData.reverse()); // Inverse l'ordre des données
          setAverageSessions(userAverageSessions);
          setActivityData(userActivityData); // Ajouté pour stocker les données d'activité
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
  if (!user || !performance || !averageSessions || !activityData) {
    return <div>Chargement...</div>;
  }

  const { calorieCount, proteinCount, carbohydrateCount, lipidCount } = user.keyData;
  const scorePercentage = (user.todayScore || user.score) * 100;
  const days = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
  const sessionsData = averageSessions.map((session) => ({ ...session, day: days[session.day - 1] }));
  const activityDataWithDayNumbers = activityData.map((data, index) => ({ ...data, day: index + 1 }));
  


  return (
    <div id="groupDia">
      <div className='textPeople'>
        <p className='Hello'>Bonjour <span className="firstName">{user.userInfos.firstName}</span></p>
        <p>Félicitations ! Vous avez explosé vos objectifs hier 👏</p>
      </div>

      <div className='diagram'>

        <div className='diagrCenter'>

          <div className='actifLine'>
            <div className='textLine'>
              <p className='actiText'> Activité quotidienne</p>
              <div className='expli'>
                <div className='boiteExpli'><div className='circleN'></div><p>Poids (kg)</p></div>
                <div className='boiteExpli'><div className='circleR'></div><p>Calories brûlées (kCal)</p></div>
              </div>
            </div>

            <BarChart height={250} width={680} barGap={-15} data={activityDataWithDayNumbers} margin={{top: 40,right: 30,left: 0,bottom: -10,}}>
            <Tooltip content={<LineTooltip />} fill='red' />
              <CartesianGrid horizontal={true} vertical={false} strokeDasharray="3 3" stroke="grey" />
              <XAxis dataKey="day" axisLine={false} tick={{ stroke: 'none', strokeDasharray: 'none' }}  tickLine={{ stroke: 'none' }}/> 
              <YAxis yAxisId="left" orientation="right" stroke="none" ticks={[0,50,100]} />
              <YAxis yAxisId="right" orientation="left" stroke="none" ticks={['']} />
              <Bar yAxisId="left" dataKey="kilogram" fill="black" radius={[20, 20, 0, 0]} maxBarSize={10} />
              <Bar yAxisId="right" dataKey="calories" fill="#FF0101" radius={[20, 20, 0, 0]} maxBarSize={10} />
            </BarChart>

          </div>

          <div className='cubeDiagr'>

            <div className='lineChart'>
              <p className='timeSession'>Durée moyenne des <br/>sessions</p>
              <LineChart className="lineSize" data={sessionsData} width={200} height={200}   margin={{ top: 20, right: 5, bottom: 10, left: -55 }}  >
                <XAxis dataKey="day"tick={{fill: 'white', fontSize: 12.5, tickSize: 13}} tickLine={false} axisLine={false} tickMargin={15} />
                <YAxis domain={[0, 80]} tick={false} axisLine={false} />
                <Tooltip content={renderTooltip} cursor={<CustomCursor />} />
                <Line type="monotone" dataKey="sessionLength" stroke="white" dot={false} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" activeDot={{ r: 4, fill: 'white', stroke: 'white', strokeOpacity: 0.5, strokeWidth: 5}} />
              </LineChart>
            </div>

            <div className='diagrPerf'>
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={performance} cx="50%" cy="50%" outerRadius="60%">
                  <PolarGrid gridType="polygon" radialLines={false} />
                  <PolarAngleAxis dataKey="kind" tick={{ fill: 'white', fontSize: 10.5 }} tickSize={13} />
                  <Radar name="Performance" dataKey="value" stroke="none" fill="#ff0101" fillOpacity={0.7} />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            <div className='donutChart'>
              <p className='scoreText'>Score</p>
              <PieChart width={180} height={180}>
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
                  cornerRadius={5}
                >
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
                    dy={30}
                  />
                  <Cell fill="#ff0101" />
                  <Cell fill="#FBFBFB" />
                </Pie>
              </PieChart>
            </div>

          </div>

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
