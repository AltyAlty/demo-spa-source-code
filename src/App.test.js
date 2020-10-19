import React from 'react';
import { render } from '@testing-library/react';
import ReactDOM from 'react-dom';
import AppMain from "./App";

// this test finds the specified text in DOM
test('renders learn react link', () => {
  const { getByText } = render(<AppMain />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

// test
test('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AppMain />, div);
  ReactDOM.unmountComponentAtNode(div);
});