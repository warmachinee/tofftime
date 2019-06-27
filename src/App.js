import React from 'react';
import Loadable from 'react-loadable';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import * as API from './api'

import TestSocket from './TestSocket'
import SnackBarAlert from './components/SnackBarAlert'
import Dialog from './components/Dialog'
import { LDTopnav } from './components/loading/LDTopnav';

import blueGrey from '@material-ui/core/colors/blueGrey';

const Header = Loadable({
  loader: () => import(/* webpackChunkName: "Header" */'./components/Header'),
  loading() {
    return <LDTopnav />
  }
});

const RouteMain = Loadable.Map({
  loader: {
    MainPage: () => import(/* webpackChunkName: "MainPage" */'./page/MainPage'),
  },
  render(loaded, props) {
    let Component = loaded.MainPage.default;
    return (
      <Route
        {...props}
        render={()=> (
          <Component token={props.token}/>
        )}/>
    )
  },
  loading: () => null
});

const MatchList = Loadable({
  loader: () => import(/* webpackChunkName: "MatchList" */'./components/Match/MatchList'),
  loading: () => null
});

const RouteMatchDetail = Loadable.Map({
  loader: {
    MatchDetail: () => import(/* webpackChunkName: "MatchDetail" */'./components/Detail/MatchDetail'),
  },
  render(loaded, props) {
    let Component = loaded.MatchDetail.default;
    return (
      <Route
        {...props}
        render={()=> (
          <Component {...props} />
        )}/>
    )
  },
  loading: () => null
});

const NoMatch = Loadable({
  loader: () => import(/* webpackChunkName: "NoMatch" */'./components/loading/NoMatch'),
  loading: () => null
});

function App() {
  const [ csrfToken, setCSRFToken ] = React.useState(null)
  const [ snackBar, setSnackBar ] = React.useState({
    state: false,
    message: null,
    variant: null
  })
  const [ open, setOpen ] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function handleGetToken(){
    const token = await API.xhrGet('main')
    setCSRFToken(token)
  }
  React.useEffect(()=>{
    handleGetToken()
  },[ ])
  return (
    <div style={{ backgroundColor: blueGrey[50], minHeight: window.innerHeight }}>
      <Header handleOpen={handleOpen}/>
      <button onClick={handleOpen}>Modal</button>
      <button onClick={()=>setSnackBar({
        state: true,
        message: 'Please use admin account',
        variant: 'error'
      })}>error</button>
      <button onClick={()=>setSnackBar({
        state: true,
        message: 'Success',
        variant: 'success'
      })}>success</button>
    {/*
      <TestSocket /><MatchDetail />
      <Link to="/">Home</Link>
      <Link to="/nomatasdasdch">test</Link>
      <Link to="/match/12">match</Link>
  */}
      <Switch>
        <RouteMain exact path="/" token={csrfToken} />
        <RouteMatchDetail path="/match/:matchparam" token={csrfToken} setCSRFToken={setCSRFToken}/>
        <Route component={NoMatch} />
      </Switch>
      <Dialog open={!open} handleClose={handleClose} />
      <SnackBarAlert
        variant={snackBar.variant}
        autoHideDuration={2000}
        open={snackBar.state}
        onClose={()=>setSnackBar({
          state: false,
          message: snackBar.message,
          variant: snackBar.variant
        })}
        message={snackBar.message}/>
    </div>
  );
}

export default App;
