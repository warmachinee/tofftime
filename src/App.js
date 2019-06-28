import React from 'react';
import Loadable from 'react-loadable';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";
import * as API from './api'

import TestSocket from './TestSocket'
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

const RouteDashboard = Loadable.Map({
  loader: {
    Dashboard: () => import(/* webpackChunkName: "Dashboard" */'./components/Dashboard/Dashboard'),
  },
  render(loaded, props) {
    let Component = loaded.Dashboard.default;
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

const Dialog = Loadable({
  loader: () => import(/* webpackChunkName: "Dialog" */'./components/Account/Dialog'),
  loading: () => null
});

const SnackBarAlert = Loadable({
  loader: () => import(/* webpackChunkName: "SnackBarAlert" */'./components/SnackBarAlert'),
  loading: () => null
});

//import Dashboard from './components/Dashboard/Dashboard'

function App() {
  const [ csrfToken, setCSRFToken ] = React.useState(null)
  const [ snackBar, handleSnackBar ] = React.useState({
    state: false,
    message: null,
    variant: null
  })
  const [ open, setOpen ] = React.useState(false);
  const [ response, setResponse ] = React.useState(null)

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
      <Link to='/user'>User</Link>

      <Switch>
        <RouteMain exact path="/" token={csrfToken} />
        <RouteMatchDetail path="/match/:matchparam" token={csrfToken} setCSRFToken={setCSRFToken}/>
        <RouteDashboard path="/user" token={csrfToken} setCSRFToken={setCSRFToken}/>
        <Route component={NoMatch} />
      </Switch>


      {/*

        <Route path='/user' component={Dashboard} />
      */}
      <Dialog open={open} handleClose={handleClose}
        token={csrfToken} setCSRFToken={setCSRFToken}
        setResponse={setResponse}
        handleSnackBar={handleSnackBar}/>
      <SnackBarAlert
        variant={snackBar.variant}
        autoHideDuration={2000}
        open={snackBar.state}
        onClose={()=>handleSnackBar({
          state: false,
          message: snackBar.message,
          variant: snackBar.variant
        })}
        message={snackBar.message}/>
      { !response &&
        !( response && response.status === 'success' ) &&
        <Redirect to='/' />
      }
    </div>
  );
}

export default App;
