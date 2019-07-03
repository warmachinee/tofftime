import React from 'react';
import Loadable from 'react-loadable';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";
import * as API from './api'

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
          <Component {...props}/>
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

const SnackBarLong = Loadable({
  loader: () => import(/* webpackChunkName: "SnackBarLong" */'./components/SnackBarLong'),
  loading: () => null
});

const Footer = Loadable({
  loader: () => import(/* webpackChunkName: "Footer" */'./components/Footer'),
  loading: () => null
});

import MatchEditor from './components/Dashboard/Match/MatchEditor'
import MatchBody from './components/Dashboard/Match/MatchBody'
import MatchDetail from './components/Detail/MatchDetail'
import MatchListB from './components/Dashboard/MatchList/MatchList'

function App() {
  const [ csrfToken, setCSRFToken ] = React.useState(null)
  const [ snackBar, handleSnackBar ] = React.useState({
    state: false,
    message: null,
    variant: null
  })
  const [ snackBarL, handleSnackBarL ] = React.useState({
    state: false,
    sFULLNAME: '',
    sLASTNAME: '',
    sOUT: 0,
    sIN: 0,
    sTOTAL: 0,
    sPAR: 0
  })
  const [ open, setOpen ] = React.useState(false);
  const [ response, setResponse ] = React.useState(null)
  const [ sess, handleSess ] = React.useState([])

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function handleGetToken(){
    const res = await API.xhrGet('getcsrf')
    setCSRFToken(res.token)
    await handleGetUserinfo()
  }

  async function handleGetUserinfo(){
    const res = await API.xhrGet('getcsrf')
    await API.xhrPost(
      res.token,
      'userinfo', {

    }, (csrf, d) =>{
      setCSRFToken(csrf)
      handleSess(d)
    })
  }

  React.useEffect(()=>{
    //handleGetToken()
    handleGetUserinfo()
  },[ ])

  return (
    <div style={{ backgroundColor: blueGrey[50], minHeight: window.innerHeight }}>
      <Header
        sess={sess}
        response={response}
        setResponse={setResponse}
        handleOpen={handleOpen}/>
      { true ?
        <Switch>
          <RouteMain exact path="/" token={csrfToken} setCSRFToken={setCSRFToken} handleSnackBar={handleSnackBar}/>
          <RouteMatchDetail path="/match/:matchparam" token={csrfToken} setCSRFToken={setCSRFToken}
            handleSnackBar={handleSnackBar} handleSnackBarL={handleSnackBarL}/>
          <RouteDashboard path="/user" token={csrfToken} setCSRFToken={setCSRFToken} handleSnackBar={handleSnackBar}/>
          <Route component={NoMatch} />
        </Switch>
        :
        <MatchEditor />


        //<MatchBody /><MatchEditor /><MatchDetailBody /><MatchList />
      }
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
      { response && response.status === 'success' &&
        <Redirect to='/user' />
      }
      <SnackBarLong
        autoHideDuration={5000}
        open={snackBarL.state}
        onClose={()=>handleSnackBarL({
          state: false,
          sFULLNAME: '',
          sLASTNAME: '',
          sOUT: 0,
          sIN: 0,
          sTOTAL: 0,
          sPAR: 0
        })}
        sFULLNAME={snackBarL.sFULLNAME}
        sLASTNAME={snackBarL.sLASTNAME}
        sOUT={snackBarL.sOUT}
        sIN={snackBarL.sIN}
        sTOTAL={snackBarL.sTOTAL}
        sPAR={snackBarL.sPAR}
        />
      <Footer />
    </div>
  );
}

export default App;
