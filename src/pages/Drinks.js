import React from 'react';
import Header from '../components/Header';
import Recipes from '../components/Recipes';
import Footer from '../components/Footer';
import RenderRecipesDrinks from '../components/RenderRecipesDrinks';
import Recipes from '../components/Recipes';

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
