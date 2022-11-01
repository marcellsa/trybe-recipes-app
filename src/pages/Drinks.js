import React from 'react';
import Header from '../components/Header';
import Recipes from '../components/Recipes';
import Footer from '../components/Footer';
import RenderRecipesDrinks from '../components/RenderRecipesDrinks';

function Drinks() {
  return (
    <div>
      <Header>
        Drinks
      </Header>
      <Recipes />
      <RenderRecipesDrinks />
      <Footer />
    </div>
  );
}
export default Drinks;
