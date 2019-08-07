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

const RouteAnnounceDetail = Loadable.Map({
  loader: {
    AnnounceDetail: () => import(/* webpackChunkName: "AnnounceDetail" */'./components/Detail/AnnounceDetail'),
  },
  render(loaded, props) {
    let Component = loaded.AnnounceDetail.default;
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

const RouteNewsDetail = Loadable.Map({
  loader: {
    NewsDetail: () => import(/* webpackChunkName: "NewsDetail" */'./components/Detail/NewsDetail'),
  },
  render(loaded, props) {
    let Component = loaded.NewsDetail.default;
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

const RouteScoreDisplay = Loadable.Map({
  loader: {
    ScoreDisplay: () => import(/* webpackChunkName: "ScoreDisplay" */'./components/ScoreDisplay'),
  },
  render(loaded, props) {
    let Component = loaded.ScoreDisplay.default;
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
import News from './components/Dashboard/News/News'
import NewsDetail from './components/Detail/NewsDetail'
import Announcement from './components/Dashboard/Announcement/Announcement'
import Dashboard from './components/Dashboard/Dashboard'
import ScoreDisplay from './components/ScoreDisplay'

function App() {
  const [ csrfToken, setCSRFToken ] = React.useState(null)
  const [ snackBar, handleSnackBar ] = React.useState({
    state: false,
    message: null,
    variant: null,
    autoHideDuration: 2000
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
  const [ sess, handleSess ] = React.useState([])
  const [ isSupportWebp, handleSupportWebp ] = React.useState(false)

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function supportsWebp(){
    if (!self.createImageBitmap) return false;

    const webpData = 'data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=';
    const blob = await fetch(webpData).then(r => r.blob());
    return createImageBitmap(blob).then(() => true, () => false);
  }

  async function detectWebp(){
    if(await supportsWebp()) {
      handleSupportWebp(true)
    }
    else {
      handleSupportWebp(false)
    }
  }

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
    await detectWebp()
  }

  React.useEffect(()=>{
    //handleGetToken()
    handleGetUserinfo()
    /*
    const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
    console.log(/iPad|iPhone|iPod/.test(navigator.userAgent));*/
  },[ ])

  return (
    <div style={{ backgroundColor: blueGrey[50], minHeight: window.innerHeight }}>
      <Header
        sess={sess}
        handleOpen={handleOpen}
        handleSess={handleSess}
        setCSRFToken={setCSRFToken}/>

      { !true ?
        <Switch>
          <RouteMain exact path="/" token={csrfToken} setCSRFToken={setCSRFToken} handleSnackBar={handleSnackBar}
            isSupportWebp={isSupportWebp}/>
          <RouteAnnounceDetail path="/announce/:detailparam" token={csrfToken} setCSRFToken={setCSRFToken}
            handleSnackBar={handleSnackBar} isSupportWebp={isSupportWebp}/>
          <RouteNewsDetail path="/news/:detailparam" token={csrfToken} setCSRFToken={setCSRFToken}
            handleSnackBar={handleSnackBar} isSupportWebp={isSupportWebp}/>
          <RouteMatchDetail path="/match/:matchparam" token={csrfToken} setCSRFToken={setCSRFToken}
            handleSnackBar={handleSnackBar} handleSnackBarL={handleSnackBarL} isSupportWebp={isSupportWebp}/>
          <RouteDashboard path="/user" token={csrfToken} setCSRFToken={setCSRFToken}
            isSupportWebp={isSupportWebp}
            handleSnackBar={handleSnackBar} />
          <RouteScoreDisplay path="/display/:matchid/:userid" token={csrfToken} setCSRFToken={setCSRFToken}
            handleSnackBar={handleSnackBar} />
          <Route component={NoMatch} />
        </Switch>
        :
        <MatchBody handleSnackBar={handleSnackBar} />
        //<MatchBody /><MatchEditor /><MatchDetailBody /><MatchListB /><Dashboard />
      }

      {/* sess && sess.status === 1 && sess.typeid === 'admin' &&
        <Redirect to='/user' />
        */
      }
      { /*sess && sess.status !== 1 && sess.typeid !== 'admin' && window.location === '/user' &&
        <Redirect to='/' />
        */
      }

      <Dialog open={open} handleClose={handleClose}
        token={csrfToken} setCSRFToken={setCSRFToken}
        handleSess={handleSess}
        handleSnackBar={handleSnackBar}/>

      <SnackBarAlert
        variant={snackBar.variant}
        autoHideDuration={snackBar.autoHideDuration}
        open={snackBar.state}
        onClose={()=>handleSnackBar({
          state: false,
          message: '',
          variant: 'error',
          autoHideDuration: 2000
        })}
        message={snackBar.message}/>

      <SnackBarLong
        autoHideDuration={15000}
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
