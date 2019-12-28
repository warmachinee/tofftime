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

import Simulator from './components/Simulator/Simulator'

class RenderApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      errMsg: null,
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
    const { hasError, errMsg, password, session } = this.state
    if (hasError) {
      return (
        <SomthingWrongPage errMsg={errMsg} />
      );
    }

    return (
      <Router>
        {/localhost/.test(window.location.href) ? <Simulator /> : <App />}
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

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
//serviceWorker.register();
