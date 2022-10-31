import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RenderRecipesMeals from '../components/RenderRecipesMeals';

export default function Meals() {
  return (
    <div>
      <Header>
        Meals
      </Header>
      <RenderRecipesMeals />
      <Footer />
    </div>
  );
}
