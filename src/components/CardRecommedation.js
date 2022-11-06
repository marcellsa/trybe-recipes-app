import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Carousel, CarouselItem } from 'react-bootstrap';
import Context from '../context/Context';

export default function CardRecommedation() {
  const { recommendation } = useContext(Context);

  const history = useHistory();
  const { pathname } = history.location;

  return (
    <div>
      <Carousel>
        {
          recommendation?.length !== 0
          && recommendation.map((e, i) => {
            const id = pathname.replace(/[^0-9]/g, '');
            const objNames = pathname === `/drinks/${id}` ? {
              id: 'idMeal',
              name: 'strMeal',
              image: 'strMealThumb',
            } : {
              id: 'idDrink',
              name: 'strDrink',
              image: 'strDrinkThumb',
            };

            return (
              <CarouselItem data-testid={ `${i}-recommendation-card` } key={ i }>
                <h5 data-testid={ `${i}-recommendation-title` }>
                  { e[objNames.name] }
                  <img
                    className="d-block w-100"
                    src={ e[objNames.image] }
                    alt={ `${e[objNames.name]} imagem` }
                  />
                </h5>
              </CarouselItem>
            );
          })
        }
      </Carousel>
    </div>
  );
}
