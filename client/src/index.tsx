import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import Thunk from 'redux-thunk';
import App from './App';
import rootReducer from './modules';
import 'antd/dist/antd.css';

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(Thunk))
);
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
