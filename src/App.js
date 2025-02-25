import React from 'react';
import HomePage from './components/HomePage';
import { Provider } from 'react-redux';
import configureStore from './application/store';
import services from './infrastructure/services';

function App() {
  return (
    <>
      <Provider store={configureStore(services)}>
        <HomePage/>
      </Provider>
    </>
  );
}

export default App;
