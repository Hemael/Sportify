import "./main.css";
import React from 'react';
import Header from '../components/header.js';
import Nav from '../components/nav.js';
import Diagr from '../components/diagramm.js';




const App = () => {
  return (
    <div className="body">
      <Header/>

      <div className="content" >
        <Nav/>
        <Diagr/>
        {/*<UserComponent userId="12" />*/}
      </div>

    </div>
  );
};

export default App;