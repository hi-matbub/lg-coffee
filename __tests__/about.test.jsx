import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import About from '../pages/info/about';

// needs to fetch data first
import { data } from '../utils/data';

it('About pages renders smoke test without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<About data={data} />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('About page renders unchanged', () => {
  const tree = renderer.create(<About data={data} />).toJSON();
  expect(tree).toMatchSnapshot();
});
