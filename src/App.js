import React from 'react';
import Loadable from 'react-loadable';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";
import * as API from './api'
import { blueGrey } from './api/palette'

import { LDCircular } from './components/loading/LDCircular';
import { LDTopnav } from './components/loading/LDTopnav';

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

const RouteOrganizer = Loadable.Map({
  loader: {
    Organizer: () => import(/* webpackChunkName: "Organizer" */'./page/Organizer'),
  },
  render(loaded, props) {
    let Component = loaded.Organizer.default;
    return (
      <Route
        {...props}
        render={()=> (
          <Component {...props} />
        )}/>
    )
  },
  loading: () => <LDCircular />
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

const RouteUserPage = Loadable.Map({
  loader: {
    UserPage: () => import(/* webpackChunkName: "UserPage" */'./page/UserPage'),
  },
  render(loaded, props) {
    let Component = loaded.UserPage.default;
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

import Organizer from './page/Organizer'
import PageEditor from './components/page/PageEditor'
import PagePost from './components/page/PagePost'
import EditPage from './components/page/EditPage'

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
  const [ sess, handleSess ] = React.useState(null)
  const [ isSupportWebp, handleSupportWebp ] = React.useState(false)
  const [ pageData, setPageData ] = React.useState(null)

  const passingProps = {
    sess: sess,
    token: csrfToken,
    setCSRFToken: setCSRFToken,
    handleSnackBar: handleSnackBar,
    isSupportWebp: isSupportWebp
  }

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

  async function handleGetUserinfo(){
    const resToken = await API.xhrGet('getcsrf')
    await API.xhrPost(
      resToken.token,
      'userinfo', {
    }, (csrf, d) =>{
      setCSRFToken(csrf)
      handleSess(d)
      console.log(d);
      if(d.status !== 1 && window.location.pathname !== '/'){
        handleSnackBar({
          state: true,
          message: d.status,
          variant: 'error',
          autoHideDuration: 5000
        })
      }
    })
    await detectWebp()
  }

  React.useEffect(()=>{
    handleGetUserinfo()
    /*
    const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
    console.log(/iPad|iPhone|iPod/.test(navigator.userAgent));
    */
  },[ ])

  return (
    <div style={{ backgroundColor: blueGrey[50], minHeight: window.innerHeight }}>
      <Header
        {...passingProps}
        pageData={pageData}
        handleOpen={handleOpen}
        handleSess={handleSess} />
      { true ?
        <Switch>
          <RouteMain exact path="/"
            {...passingProps} />

          <RouteOrganizer path={`/page/:pageParam`}
            {...passingProps}
            setPageData={setPageData} />

          <RouteAnnounceDetail path="/announce/:detailparam"
            {...passingProps} />
          <RouteNewsDetail path="/news/:detailparam"
            {...passingProps} />
          <RouteMatchDetail path="/match/:matchparam"
            {...passingProps}
            handleSnackBarL={handleSnackBarL} />

          <RouteDashboard path="/admin"
            {...passingProps} />
          <RouteUserPage path="/user"
            {...passingProps}
            setHPageData={setPageData} />

          <RouteScoreDisplay path="/display/:matchid/:userid"
            {...passingProps} />

          <Route component={NoMatch} />
        </Switch>
        :
        <div
          style={{
            minHeight: window.innerHeight * .8,
            maxWidth: 1200,
            marginLeft: 'auto',
            marginRight: 'auto',
            padding: '24px 16px',
            overflow: 'auto',
            overflowScrolling: 'touch',
            WebkitOverflowScrolling: 'touch',
          }}>
          <EditPage {...passingProps} />
        </div>
        //<MatchBody /><MatchEditor /><MatchDetailBody /><UserPage /><Dashboard /><User /><MatchDetail />
      }


      {/* sess && sess.status === 1 && sess.typeid === 'admin' &&
        <Redirect to='/user' />
        */
      }

      {
        sess && sess.status !== 1 &&
        /.com\/admin/.test(window.location.href) &&
        <Redirect to='/' />
      }

      {
        sess && sess.status !== 1 &&
        /.com\/user/.test(window.location.href) &&
        <Redirect to='/' />
      }

      <Dialog
        {...passingProps}
        open={open}
        handleClose={handleClose}
        handleSess={handleSess}/>

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
