import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import Select from './pages/Select';

function App() {
  return (
    <>
      <Provider store={store}>
        <Select />
      </Provider>
    </>
  );
}

export default App;
