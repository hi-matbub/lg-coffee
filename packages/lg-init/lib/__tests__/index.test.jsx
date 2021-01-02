/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Index from '../pages/index';
import { testData } from '../utils/testData';

it('index renders smoke test without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Index 
      data={testData} 
      handleUpdatedCartInState={() => {}}
    />,
    div);
  ReactDOM.unmountComponentAtNode(div);
});

it('index renders unchanged', () => {
  const tree = renderer.create(
    <Index 
      data={testData} 
      handleUpdatedCartInState={() => {}}
    />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
