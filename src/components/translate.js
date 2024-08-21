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

  export default translateKind;