import React from 'react';
import Recipes from '../components/Recipes';
import Header from '../components/Header';

function Meals() {
  return (
    <div>
      <Header />
      <h1>Meals</h1>
      <Recipes />
    </div>
  );
}
export default Meals;
