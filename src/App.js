import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Provider from './context/Provider';
import 'bootstrap/dist/css/bootstrap.min.css';
// Pages
import Login from './pages/Login';
import Meals from './pages/Meals';
import Drinks from './pages/Drinks';
import DetailsMeals from './pages/DetailsMeals';
import DetailsDrinks from './pages/DetailsDrinks';
import InProgressMeals from './pages/InProgressMeals';
import InProgressDrinks from './pages/InProgressDrinks';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import Favorite from './pages/Favorite';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Provider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/meals" component={ Meals } />
          <Route exact path="/drinks" component={ Drinks } />
          <Route exact path="/meals/:id" component={ DetailsMeals } />
          <Route exact path="/drinks/:id" component={ DetailsDrinks } />
          <Route
            exact
            path="/meals/:id/in-progress"
            component={ InProgressMeals }
          />
          <Route
            exact
            path="/drinks/:id/in-progress"
            component={ InProgressDrinks }
          />
          <Route exact path="/profile" component={ Profile } />
          <Route exact path="/done-recipes" component={ DoneRecipes } />
          <Route exact path="/favorite-recipes" component={ Favorite } />
          <Route path="*" component={ NotFound } />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
