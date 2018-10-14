import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import App from './components/App';
import './index.css';
require('dotenv').config();

const Site = () => (
  <Router>
    <App />
  </Router>
);

ReactDOM.render(<Site />, document.getElementById('root'));
registerServiceWorker();