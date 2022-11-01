import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RenderRecipesDrinks from '../components/RenderRecipesDrinks';
import Recipes from '../components/Recipes';

export default function Drinks() {
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
