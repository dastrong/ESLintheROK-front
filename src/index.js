import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import App from './components/App';
import MobileError from './components/MobileError';
import IEError from './components/IEError';
import './index.css';

const siteUpdated = () => (
  console.log('siteUpdated')
)

const Site = () => (
  <Router>
    {window.innerWidth < 768
      ? <MobileError /> 
      : !!document.documentMode
        ? <IEError />
        : <App /> }
  </Router>
);

ReactDOM.render(<Site />, document.getElementById('root'));
registerServiceWorker(siteUpdated);