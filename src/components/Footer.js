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
        <button type="button">
          <img src={ drinkIcon } alt="ícone de bebidas" data-testid="drinks-bottom-btn" />
        </button>
      </Link>
/home/arthutepio/projetos-trybe/sd-024-b-project-recipes-app/src/components/Footer.js
      <Link to="/meals">
        <button type="button">
          <img src={ mealIcon } alt="ícone de comidas" data-testid="meals-bottom-btn" />
        </button>
      </Link>
    </footer>
  );
}

export default Footer;
