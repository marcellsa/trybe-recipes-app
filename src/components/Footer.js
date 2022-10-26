import React from 'react';

function Footer() {
  return (
    <footer data-testid="footer" >      
      Footer
      <button>
        <img data-testid="drinks-bottom-btn" src="src/images/drinkIcon.svg" alt="ícone de bebidas"/>
      </button>
      
      <button>
        <img data-testid="meals-bottom-btn" src="src/images/mealIcon.svg" alt="ícone de comidas"/>
      </button>
    </footer>
  )
}

export default Footer;