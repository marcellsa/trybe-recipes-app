import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RenderRecipesMeals from '../components/RenderRecipesMeals';
import Recipes from '../components/Recipes';

export default function Meals() {
  return (
    <div>
      <Header>
        Meals
      </Header>
      <Recipes />
      <RenderRecipesMeals />
      <Footer />
    </div>
  );
}
