import React from 'react';
import Loadable from 'react-loadable';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import './index.css';
import './style.css';
import App from './App'
import * as serviceWorker from './serviceWorker';
import { LDCircular } from './components/loading/LDCircular'

const SomthingWrongPage = Loadable({
  loader: () => import(/* webpackChunkName: "SomthingWrongPage" */'./components/Utils/SomthingWrongPage'),
  loading: () => <LDCircular />
});

class RenderApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      errMsg: null
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    this.setState({ errMsg : {
      error: error,
      stack: info.componentStack
    }})
  }

  render() {
    if (this.state.hasError) {
      return (
        <SomthingWrongPage errMsg={this.state.errMsg} />
      );
    }

    return (
      <Router>
        {/localhost/.test(window.location.href) ? <TestFunction /> : <App />}
      </Router>
    );
  }
}

/*
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/serviceWorker.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}*/

ReactDOM.render(<RenderApp />, document.getElementById('root'));

import PageOrganizerBody from './components/User/PageOrganizer/PageOrganizerBody'
import * as API from './api'
import * as COLOR from './api/palette'
import * as BTN from './components/Button'

function TestFunction() {

  function getPageId(){
    var json = '[{"pagename":"Golf Club 1","pagedetail":"","pagesponsor":"","hostid":926623,"color":null,"logo":"/pages/890008/890008","confirm":0,"view":64,"subscriber":0,"createdate":"2019-09-25T07:45:29.000Z"},{"subscribe":false}]'
    return {
      ...JSON.parse(json)[0],
      pageid: 890008
    }
  }

  return (
    <div style={{
      minHeight: window.innerHeight - 48,
      maxWidth: 1200,
      marginLeft: 'auto',
      marginRight: 'auto',
      padding: '24px 16px',
      overflow: 'auto',
      overflowScrolling: 'touch',
      WebkitOverflowScrolling: 'touch',
      backgroundColor: COLOR.grey[100]
    }}>
      <PageOrganizerBody API={API} COLOR={COLOR} BTN={BTN} pageData={getPageId()} />
    </div>
  );
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
//serviceWorker.register();
