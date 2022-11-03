import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

export default function ButtonFavoriteAndShare() {
  const [favorite, setFavorite] = useState(false);

  const checkIfIsFavorite = () => (favorite ? blackHeartIcon : whiteHeartIcon);

  const handleToggleFavorite = () => setFavorite((previous) => !previous);
  return (
    <div>
      <div>
        <button
          className="btn-favorite"
          data-testid="favorite-btn"
          type="button"
          onClick={ handleToggleFavorite }
        >
          <img src={ checkIfIsFavorite() } alt="favorite" />
        </button>
      </div>

      <Link to="/favorite-recipes">
        <img data-testid="share-btn" src={ shareIcon } alt="share" />
      </Link>
    </div>
  );
}
