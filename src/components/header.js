
import logo from '../data/logo.svg';

const Header = () => {
  return (
    <div id="header">
    <img src={logo} alt="img SportSee" className="logo"/> 
      <nav>Accueil</nav>
      <nav>Profil</nav>
      <nav>Réglages</nav>
      <nav>Communauté</nav>

    </div>
  );
};

export default Header;