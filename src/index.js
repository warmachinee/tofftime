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
import * as COLOR from './api/palette'
import * as BTN from './components/Button'

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
              {/localhost/.test(window.location.href) ? <TestFunction /> : <App />}
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

import MatchDetailBody from './components/Detail/MatchDetailBody'

function TestFunction() {
  const [ data, setData ] = React.useState(null)

  function getData(){
    var json = '{"title":"Amateur test class (Group)","date":"2019-12-10T17:00:00.000Z","hostid":812454,"message":null,"picture":"/matchs/32668289/32668289","location":"Northern Rangsit Golf Club","locationid":127238,"locationversion":1,"createdate":"2019-12-10T17:54:46.000Z","scorematch":0,"privacy":"public","matchtype":0,"display":1,"status":0,"views":1,"lownet":0,"lowgross":0,"booby":0,"member":false,"mainclass":[{"mainclass":1,"mainclassname":"amateur flight","type":"flight","values":[{"classno":1,"classname":"0","color":""},{"classno":2,"classname":"12","color":""}]}],"team":[],"chkadminpermission":{"status":true,"string":""},"playoff":[]}'
    return JSON.parse(json)
  }

  React.useEffect(()=>{
    /*
    const successObj = []
    const errorMsg = ''
    d.forEach(e =>{
      if(e.status === 'success'){
        successObj.push(e.status)
      }else{
        errorMsg = e.status
      }
    })
    if(successObj.every(d => d === 'success')){
      handleSnackBar({
        state: true,
        message: 'success',
        variant: 'success',
        autoHideDuration: 2000
      })
      handleClose()
    }else{
      handleSnackBar({
        state: true,
        message: errorMsg,
        variant: 'error',
        autoHideDuration: 5000
      })
    }
    */
  },[ ])

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
      <MatchDetailBody API={API} COLOR={COLOR} BTN={BTN}
        data={data}
        setData={setData}
        sess={{status:1}}
         />
    </div>
  );
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
//serviceWorker.register();
