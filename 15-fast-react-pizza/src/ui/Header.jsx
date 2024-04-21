import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <Link to={'/'}>Fast React Pizza Co.</Link>
      <p>Petr Kroutil</p>
    </header>
  );
};

export default Header;
