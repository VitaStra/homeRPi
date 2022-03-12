import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import ShoppingList from './ShoppingList';
import reportWebVitals from './reportWebVitals';
// import { SampleChart } from './SampleChart';
// import { TemperatureChart } from './TemperatureChart';
import TemperaturesSection from './TemperaturesSection';

ReactDOM.render(
  <React.StrictMode>
    <App />
    <TemperaturesSection />
    <ShoppingList name="Mark" />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
