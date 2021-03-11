import React from 'react';
import ReactDOM from 'react-dom';

import App from './app';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App name="John Doe" />, div);
  ReactDOM.unmountComponentAtNode(div);
});
