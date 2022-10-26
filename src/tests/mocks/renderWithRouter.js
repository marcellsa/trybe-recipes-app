import React from 'react';
import { render } from '@testing-library/react';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';

export default function renderWithRouter(component) {
  const customHistory = createMemoryHistory();

  const returnFromRender = render(
    <Router history={ customHistory }>{component}</Router>,
  );

  return { history: customHistory, ...returnFromRender };
}
