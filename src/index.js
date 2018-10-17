import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import App from './components/App';
import MobileError from './components/MobileError';
import './index.css';

const Site = () => (
  <Router>
    { window.innerWidth > 768
      ? <App />
      : <MobileError /> }
  </Router>
);

ReactDOM.render(<Site />, document.getElementById('root'));
registerServiceWorker();