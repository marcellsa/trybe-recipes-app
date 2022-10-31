import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RenderRecipesDrinks from '../components/RenderRecipesDrinks';

export default function Drinks() {
  return (
    <div>
      <Header>
        Drinks
      </Header>
      <RenderRecipesDrinks />
      <Footer />
    </div>
  );
}
