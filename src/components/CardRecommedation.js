import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import Context from '../context/Context';
import 'bootstrap/dist/css/bootstrap.css';

export default function CardRecommedation() {
  const { recommendation } = useContext(Context);
  console.log(recommendation);

  const history = useHistory();
  const { pathname } = history.location;
  console.log(pathname);
  return (
    <div>
      <div>
        {
          recommendation?.length !== 0
          && recommendation.map((e, i) => {
            const id = pathname.replace(/[^0-9]/g, '');
            // console.log('id', id);
            const objNames = pathname === `/drinks/${id}` ? {
              id: 'idMeal',
              name: 'strMeal',
              image: 'strMealThumb',
            } : {
              id: 'idDrink',
              name: 'strDrink',
              image: 'strDrinkThumb',
            };
            // console.log([objNames.image]);
            return (
              <div
                key={ e.idMeal }
                style={ { display: 'block', width: 700, padding: 30 } }
              >
                <Carousel>
                  <Carousel.Item>
                    <img
                      className="d-block w-100"
                      src={ e[objNames.image] }
                      alt={ `${e[objNames.name]} imagem` }
                    />
                  </Carousel.Item>
                </Carousel>
                <p data-testid={ `${i}-recommendation-title` }>{e[objNames.name]}</p>
              </div>
            );
          })
        }
      </div>
      <button
        className="btn-start-recipe"
        data-testid="start-recipe-btn"
        type="button"
      >
        Start Recipe

      </button>
    </div>
  );
}
