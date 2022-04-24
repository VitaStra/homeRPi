import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import TemperaturesSection from './TemperaturesSection';
import HumiditySection from './HumiditySection';
import PlantsSection from './PlantsSection';
import SeparatorLine from './SeparatorLine';
import NavComponent from './NavComponent';

ReactDOM.render(
  <React.StrictMode>
    <NavComponent />
    <App />
    <TemperaturesSection />
    <SeparatorLine />
    <HumiditySection />
    <SeparatorLine />
    <PlantsSection />
  </React.StrictMode>,
  document.getElementById('root')
);
