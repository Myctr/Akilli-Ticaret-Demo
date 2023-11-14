import React from 'react';
import Navigations from './src/navigations';
import {Provider} from 'react-redux';

import store from './src/redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <Navigations />
    </Provider>
  );
};

export default App;
