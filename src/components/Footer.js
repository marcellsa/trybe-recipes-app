import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import '../App.css';

function Footer() {
  return (
    <footer
      data-testid="footer"
      className="footer"
    >
      <Link to="/drinks">
        <button data-testid="drinks-bottom-btn" type="button">
          <img src={ drinkIcon } alt="ícone de bebidas" />
        </button>
      </Link>

      <Link to="/meals">
        <button data-testid="meals-bottom-btn" type="button">
          <img src={ mealIcon } alt="ícone de comidas" />
        </button>
      </Link>
    </footer>
  );
}

export default Footer;
