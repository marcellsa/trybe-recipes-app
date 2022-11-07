import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import Context from '../context/Context';
import Provider from '../context/Provider';

const renderWithRouter = (component, path = '/') => {
  const history = createMemoryHistory({ initialEntries: [path] });
  return ({
    ...render(
      <Router history={ history }>
        <Provider value={ Context }>
          {component}
        </Provider>
      </Router>,
    ),
    history,
  });
};
export default renderWithRouter;
