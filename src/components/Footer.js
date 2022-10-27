import React from 'react';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer() {
  return (
    <footer data-testid="footer">
      Footer
      <button type="button">
        <img data-testid="drinks-bottom-btn" src={ drinkIcon } alt="ícone de bebidas" />
      </button>

      <button type="button">
        <img data-testid="meals-bottom-btn" src={ mealIcon } alt="ícone de comidas" />
      </button>
    </footer>
  );
}

export default Footer;
