import React, { useEffect, useState } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, PieChart, Pie, Cell, Label, LineChart, Line, XAxis, Tooltip, BarChart, Bar, CartesianGrid, YAxis} from 'recharts';
import ApiService from '../services/apiService';
import ConsoItem from '../components/consoItem';
import { CustomCursor, LineTooltip, renderTooltip } from './customCursorTooltip';
import translateKind from './translate'

import energy from '../data/energy.svg';
import apple from '../data/apple.svg';
import cheesburger from '../data/cheeseburger.svg';
import chicken from '../data/chicken.svg';





const Diagr = () => {
  // stockage des données de l'utilisateur
  const [user, setUser] = useState(null);
  const [performance, setPerformance] = useState(null);
  const [averageSessions, setAverageSessions] = useState(null);
  const [activityData, setActivityData] = useState([]);
  const [calorieCount, setCalorieCount] = useState(0);
  const [proteinCount, setProteinCount] = useState(0);
  const [carbohydrateCount, setCarbohydrateCount] = useState(0);
  const [lipidCount, setLipidCount] = useState(0);
  const [scorePercentage, setScorePercentage] = useState(0);
  const [sessionData, setSessionData] = useState([])





  // détermination de l'api
  const isProd = process.env.REACT_APP_ENVIRONNEMENT === 'prod';

  // Récupération des données lors du chargement de la page
  useEffect(() => {
    const apiService = new ApiService();

      //const scorePercentage = (user.todayScore || user.score) * 100;
    const days = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

    const fetchData = async () => {
      try {
        const userData = await apiService.getUserData();
        const userPerformance = await apiService.getUserPerformance();
        const userAverageSessions = await apiService.getUserAverageSessions();
        const userActivityData = await apiService.getUserActivity();
        setScorePercentage(userData.todayScore * 100)
        const errors_ = {};
        if (userData.error){ errors_.user = true; }
        if (userPerformance.error){ errors_.performance = true; }
        if (userAverageSessions.error){ errors_.averageSessions = true; }
        if (userActivityData.error){ errors_.activityData = true; }
        if (userData.keyData){
          setCalorieCount(userData.keyData.calorieCount);
          setProteinCount(userData.keyData.proteinCount);
          setCarbohydrateCount(userData.keyData.carbohydrateCount);
          setLipidCount(userData.keyData.lipidCount);
        }

        
        
        // Traitement des données de l'api
        if (isProd) {
          if (!userPerformance.error) { 
            const kindMap = userPerformance.data.kind;
            const performanceData = userPerformance.data.data.map((item) => ({
              value: item.value,
              kind: translateKind(kindMap[item.kind], 'fr'), // Change 'fr' to 'en' for English
            }));
            setPerformance(performanceData.reverse()); // Inverse l'ordre des données
          }
          if (!userAverageSessions.error) {
            setAverageSessions(userAverageSessions.data.sessions);
            setSessionData(userAverageSessions.data.sessions.map((session) => ({ ...session, day: days[session.day - 1] }))); 
          }
          if (!userData.error){
            setUser(userData);
          }
          
          setActivityData(userActivityData.data); // Ajouté pour stocker les données d'activité

          // Traitement des données du mock
        } else {
          const kindMap = userPerformance.kind;
          const performanceData = userPerformance.data.map((item) => ({
            value: item.value,
            kind: translateKind(kindMap[item.kind], 'fr'), 
          }));
          setUser(userData);
          setPerformance(performanceData.reverse());
          setSessionData(userAverageSessions.map((session) => ({ ...session, day: days[session.day - 1] }))); 
          setAverageSessions(userAverageSessions);
          setActivityData(userActivityData); 
          
        }
      
      } catch (error) {
        console.error('Erreur lors de la récupération des données', error);
      }
    };

    fetchData();
  }, [isProd]);

  const firstOccurence = !user && !performance && !averageSessions

  if (firstOccurence) {
    return <div>Chargement...</div>;
  }
  var activityDataWithDayNumbers
  if (activityData){
    activityDataWithDayNumbers = Array.isArray(activityData) ? activityData.map((data, index) => ({ ...data, day: index + 1 })) : activityData.sessions.map((data, index) => ({ ...data, day: index + 1 }));  
  }
  
  
  return (
    <div id="groupDia">
      {!user ? <span className="">Impossible de charger les données</span> : 
        <div className='textPeople'>
          <p className='Hello'>Bonjour <span className="firstName">{user.userInfos.firstName}</span></p>
          <p>Félicitations ! Vous avez explosé vos objectifs hier 👏</p>
        </div>
      }

      <div className='diagram'>

        <div className='diagrCenter'>


          <div className='actifLine'>
            {!activityData ? <span className="">Impossible de charger les données</span> : 
            <div>
              
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
            }
          </div>

          <div className='cubeDiagr'>

            <div className='lineChart'>
              {!averageSessions ? <span className="">Impossible de charger les données</span> : 
              <div>
                <p className='timeSession'>Durée moyenne des <br/>sessions</p>
              <LineChart className="lineSize" data={sessionData} width={200} height={200}   margin={{ top: 20, right: 5, bottom: 10, left: -55 }}  >
                <XAxis dataKey="day"tick={{fill: 'white', fontSize: 12.5, tickSize: 13}} tickLine={false} axisLine={false} tickMargin={15} />
                <YAxis domain={[0, 80]} tick={false} axisLine={false} />
                <Tooltip content={renderTooltip} cursor={<CustomCursor />} />
                <Line type="monotone" dataKey="sessionLength" stroke="white" dot={false} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" activeDot={{ r: 4, fill: 'white', stroke: 'white', strokeOpacity: 0.5, strokeWidth: 5}} />
              </LineChart>
              </div>
              }
            </div>

            {!performance ? <span className="perfError">Impossible de charger les données</span> : 
              <div className='diagrPerf'>
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={performance} cx="50%" cy="50%" outerRadius="60%">
                    <PolarGrid gridType="polygon" radialLines={false} />
                    <PolarAngleAxis dataKey="kind" tick={{ fill: 'white', fontSize: 10.5 }} tickSize={13} />
                    <Radar name="Performance" dataKey="value" stroke="none" fill="#ff0101" fillOpacity={0.7} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            } 
            
            <div className='donutChart'>
            {!user ? <span className="">Impossible de charger les données</span> : 
              <div>
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
              }
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
