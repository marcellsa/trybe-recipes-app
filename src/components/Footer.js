import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer() {
  return (
    <footer data-testid="footer">
      <Link to="/drinks">
        <button type="button">
          <img data-testid="drinks-bottom-btn" src={ drinkIcon } alt="ícone de bebidas" />
        </button>
      </Link>

      <Link to="/meals">
        <button type="button">
          <img data-testid="meals-bottom-btn" src={ mealIcon } alt="ícone de comidas" />
        </button>
      </Link>
    </footer>
  );
}

export default Footer;
