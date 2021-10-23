import React from 'react';
import ReactDOM from 'react-dom';
import './components/app.css';
import App from './components/App';
import {Provider} from "react-redux";
import {store} from "./reducers";


ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>

          <App />
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

