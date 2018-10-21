import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import App from './components/App';
import MobileError from './components/MobileError';
import IEError from './components/IEError';
import ConfirmBox from './components/reusable/ConfirmBox';
import './index.css';


const handleSiteUpdate = () => true;

class Site extends Component {
  state = {isSiteUpdated: false || handleSiteUpdate}

  // siteUpdated = () => this.setState({ isSiteUpdated: true });

  render(){
    return (
      <Router>
        <ConfirmBox
          open={this.state.isSiteUpdated} 
          header="The site has been updated"
          content={<p style={{padding: '10px'}}>Please refresh your browser to stay current</p>}
          confirmText="Refresh"
          cancelText="I don't like nice things."
          onConfirm={()=> window.location.reload()}
        />
        {window.innerWidth < 768
          ? <MobileError /> 
          : !!document.documentMode
            ? <IEError />
            : <App /> }
      </Router>
    )
  }
}
// const Site = () => (
//   <Router>
//     {window.innerWidth < 768
//       ? <MobileError /> 
//       : !!document.documentMode
//         ? <IEError />
//         : <App /> }
//   </Router>
// );

ReactDOM.render(<Site />, document.getElementById('root'));
registerServiceWorker(siteUpdated);