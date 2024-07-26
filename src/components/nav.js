import medi from '../data/medi.svg';
import swim from '../data/swim.svg';
import bike from '../data/bike.svg';
import muscu from '../data/muscu.svg';

const Nav = () => {
  return (
    <div className='navGroup'>
      <div id="nav">
        <nav className='navSport'><img src={medi} alt="img meditation" /> </nav>
        <nav className='navSport'><img src={swim} alt="img swim" /> </nav>
        <nav className='navSport'><img src={bike} alt="img bike" /> </nav>
        <nav className='navSport'><img src={muscu} alt="img muscu" /> </nav>
      </div>

      <div className='copyright'>
        <p>Copyright, SportSee 2020</p>
      </div>
    </div>
  );
};

export default Nav;
