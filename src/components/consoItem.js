import React from 'react';

const consoItem = ({ image, value, label, className }) => {
  return (
    <div className='conso'>
      <div className={`boiteImg ${className}`}>
        <img src={image} alt={`img ${label}`} />
      </div>
      <div className='spent'>
        <p className='spentUser'>{value}</p>
        <p className='spentText'>{label}</p>
      </div>
    </div>
  );
};

export default consoItem;
