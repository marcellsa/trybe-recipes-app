import React from 'react';
import Recipes from '../components/Recipes';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RenderRecipesMeals from '../components/RenderRecipesMeals';

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
