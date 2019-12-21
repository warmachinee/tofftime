import React from 'react';
import Loadable from 'react-loadable';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import './index.css';
import './style.css';
import App from './App'
import * as serviceWorker from './serviceWorker';
import { LDCircular } from './components/loading/LDCircular'

import * as API from './api'

import {
  TextField,

} from '@material-ui/core'

const SomthingWrongPage = Loadable({
  loader: () => import(/* webpackChunkName: "SomthingWrongPage" */'./components/Utils/SomthingWrongPage'),
  loading: () => <LDCircular />
});

class RenderApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      errMsg: null,
      password: /localhost/.test(window.location.href) ? 'catty15000' : '',
      session: /localhost/.test(window.location.href) ? {status: 1} : null
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

  handleGetUserinfo = async () =>{
    const resToken = await API._xhrGet('getcsrf')
    await API._xhrPost(
      resToken.token,
      'userinfo', {
    }, (csrf, d) =>{
      this.setState({ session: d })
    })
  }

  onChangePassword = (e) =>{
    this.setState({ password: e.target.value })
  }

  componentDidMount(){
    if(!/localhost/.test(window.location.href)){
      this.handleGetUserinfo()
    }
  }

  render() {
    const { hasError, errMsg, password, session } = this.state
    if (hasError) {
      return (
        <SomthingWrongPage errMsg={errMsg} />
      );
    }

    return (
      <React.Fragment>
        { session ?
          (
            ( password === 'catty15000' || session.status === 1 ) ?
            <Router>
              <App />
            </Router>
            :
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{ marginTop: 24 }}>
                <TextField
                  autoFocus={API._isDesktopBrowser()}
                  label="Password"
                  variant="outlined"
                  type="password"
                  onChange={e => this.onChangePassword(e)} />
              </div>
            </div>
          )
          :
          <LDCircular />
        }
      </React.Fragment>
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
