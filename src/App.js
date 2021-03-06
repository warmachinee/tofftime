import React from 'react';
import Loadable from 'react-loadable';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";
import * as API from './api'
import * as COLOR from './api/palette'
import * as BTN from './components/Button'

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
          <Component {...props} />
        )} />
    )
  },
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
        )} />
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
        )} />
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
        )} />
    )
  },
  loading: () => null
});

const RouteOrganizerPostDetail = Loadable.Map({
  loader: {
    OrganizerPostDetail: () => import(/* webpackChunkName: "OrganizerPostDetail" */'./components/Detail/OrganizerPostDetail'),
  },
  render(loaded, props) {
    let Component = loaded.OrganizerPostDetail.default;
    return (
      <Route
        {...props}
        render={()=> (
          <Component {...props} />
        )} />
    )
  },
  loading: () => null
});

const RouteSchedule = Loadable.Map({
  loader: {
    Schedule: () => import(/* webpackChunkName: "Schedule" */'./components/Detail/Schedule'),
  },
  render(loaded, props) {
    let Component = loaded.Schedule.default;
    return (
      <Route
        {...props}
        render={()=> (
          <Component {...props} />
        )} />
    )
  },
  loading: () => null
});

const RouteMatchFormResult = Loadable.Map({
  loader: {
    MatchFormResult: () => import(/* webpackChunkName: "MatchFormResult" */'./components/Detail/MatchFormResult'),
  },
  render(loaded, props) {
    let Component = loaded.MatchFormResult.default;
    return (
      <Route
        {...props}
        render={()=> (
          <Component {...props} />
        )} />
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
        )} />
    )
  },
  loading: () => null
});

const RoutePageOrganizer = Loadable.Map({
  loader: {
    PageOrganizer: () => import(/* webpackChunkName: "PageOrganizer" */'./components/User/PageOrganizer/PageOrganizer'),
  },
  render(loaded, props) {
    let Component = loaded.PageOrganizer.default;
    return (
      <Route
        {...props}
        render={()=> (
          <Component {...props} />
        )} />
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
        )} />
    )
  },
  loading: () => null
});

const RouteSystemAdmin = Loadable.Map({
  loader: {
    SystemAdmin: () => import(/* webpackChunkName: "SystemAdmin" */'./page/SystemAdmin'),
  },
  render(loaded, props) {
    let Component = loaded.SystemAdmin.default;
    return (
      <Route
        {...props}
        render={()=> (
          <Component {...props} />
        )} />
    )
  },
  loading: () => null
});

const RouteSignIn = Loadable.Map({
  loader: {
    SignIn: () => import(/* webpackChunkName: "SignIn" */'./page/SignIn'),
  },
  render(loaded, props) {
    let Component = loaded.SignIn.default;
    return (
      <Route
        {...props}
        render={()=> (
          <Component {...props} />
        )} />
    )
  },
  loading: () => null
});

const RouteScoreDisplay = Loadable.Map({
  loader: {
    ScoreDisplay: () => import(/* webpackChunkName: "ScoreDisplay" */'./components/Utils/ScoreDisplay'),
  },
  render(loaded, props) {
    let Component = loaded.ScoreDisplay.default;
    return (
      <Route
        {...props}
        render={()=> (
          <Component {...props} />
        )} />
    )
  },
  loading: () => null
});

const Header = Loadable({
  loader: () => import(/* webpackChunkName: "Header" */'./components/Utils/Header'),
  loading: () => null
});

const NoMatch = Loadable({
  loader: () => import(/* webpackChunkName: "NoMatch" */'./components/Utils/NoMatch'),
  loading: () => null
});

const SnackBarAlert = Loadable({
  loader: () => import(/* webpackChunkName: "SnackBarAlert" */'./components/Utils/SnackBarAlert'),
  loading: () => null
});

const SnackBarLong = Loadable({
  loader: () => import(/* webpackChunkName: "SnackBarLong" */'./components/Utils/SnackBarLong'),
  loading: () => null
});

const Dialog = Loadable({
  loader: () => import(/* webpackChunkName: "Dialog" */'./components/Account/Dialog'),
  loading: () => null
});

const SideDrawer = Loadable({
  loader: () => import(/* webpackChunkName: "SideDrawer" */'./components/SideComponent/SideDrawer'),
  loading: () => null
});

const Footer = Loadable({
  loader: () => import(/* webpackChunkName: "Footer" */'./components/Utils/Footer'),
  loading: () => null
});

export default function App() {
  const [ token, setCSRFToken ] = React.useState(null)
  const [ open, setOpen ] = React.useState(false);
  const [ drawerState, setDrawerState ] = React.useState(false);
  const [ sess, handleSess ] = React.useState(null)
  const [ accountData, handleAccountData ] = React.useState(null)
  const [ pageData, handlePageData ] = React.useState(null)
  const [ isSupportWebp, handleSupportWebp ] = React.useState(false)
  const [ snackBar, handleSnackBar ] = React.useState({
    state: false,
    message: null,
    variant: null,
    autoHideDuration: 2000,
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
  const [ locationPath, setLocationPath ] = React.useState(null)
  const [ editPageRefresh, setEditPageRefresh ] = React.useState(new Date().toISOString())

  const passingProps = {
    API: API,
    COLOR: COLOR,
    BTN: BTN,
    sess: sess,
    handleSess: handleSess,
    accountData: accountData,
    pageData: pageData,
    handlePageData: handlePageData,
    handleAccountData: handleAccountData,
    token: token,
    setCSRFToken: setCSRFToken,
    isSupportWebp: isSupportWebp,
    handleSnackBar: handleSnackBar,
    locationPath: locationPath,
    setLocationPath: setLocationPath,
    editPageRefresh: editPageRefresh,
    setEditPageRefresh: setEditPageRefresh,

  }

  function toggleDrawer(){
    setDrawerState(!drawerState)
  }

  function toggleDialog(){
    setOpen(!open);
  }

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
    const resToken = await API._xhrGet('getcsrf')
    await API._xhrPost(
      resToken.token,
      'userinfo', {
    }, (csrf, d) =>{
      setCSRFToken(csrf)
      handleSess(d)
    })
    await detectWebp()
  }

  async function handleReportError(errMsg){
    const resToken = await API._xhrGet('getcsrf')
    await API._xhrPost(
      resToken.token,
      'report_error', {
        action: 'assign',
        type: 'normal',
        message: errMsg.message,
        url: errMsg.url,
        stack: errMsg.stack,
        file: errMsg.file,
        object: '',
    }, (csrf, d) =>{
      setCSRFToken(csrf)
      //console.log(d);
    })
  }

  function detectOnError(msg){
    if(msg){
      console.log(msg);
      const message = msg.message
      const url = msg.currentTarget.location.href
      const file = msg.filename
      const stack = msg.error.stack
      handleReportError({
        message: message,
        url: url,
        stack: stack,
        file: file,
      })
      //alert(alertMessage);
    }
  }

  React.useEffect(()=>{
    handleGetUserinfo()
    window.addEventListener("error", detectOnError)
    return()=>{
      window.removeEventListener("error", detectOnError)
    }
  },[ ])

  React.useEffect(()=>{
    if(window.location.pathname === '/'){
      document.title = 'T-off Time'
    }
  },[ window.location.pathname ])

  const [ ,updateState ] = React.useState(null)

  React.useEffect(()=>{
    updateState({})
  },[ locationPath ])

  return (
    <React.Fragment>
      <div style={{ backgroundColor: '#f5f7f8', minHeight: window.innerHeight }}>
        { !/\/user|\/organizer/.test(window.location.pathname) &&
          <Header
            {...passingProps}
            drawerOpen={toggleDrawer}
            handleOpen={toggleDialog} />
        }

        <Switch>
          <RouteMain exact path="/"
            {...passingProps} />
          <RouteOrganizer path="/page/:pageid"
            {...passingProps} />

          <RouteUserPage path="/user"
            {...passingProps} />
          <RoutePageOrganizer path="/organizer/:pageid"
            {...passingProps} />
          <RouteSystemAdmin path="/system_admin"
            {...passingProps} />

          <RouteAnnounceDetail path="/announce/:detailparam"
            {...passingProps} />
          <RouteNewsDetail path="/news/:detailparam"
            {...passingProps} />
          <RouteMatchDetail path="/match/:matchid"
            {...passingProps}
            handleSnackBarL={handleSnackBarL} />
          <RouteOrganizerPostDetail path="/post/:pageid/:postid"
            {...passingProps} />

          <RouteSchedule path="/schedule/:matchid"
            {...passingProps} />
          <RouteMatchFormResult path="/matchform/:matchid"
            {...passingProps} />
          <RouteSignIn path="/login"
            {...passingProps} />
          <RouteScoreDisplay path="/display/:matchid/:userid"
            {...passingProps} />
          <Route render={()=><NoMatch {...passingProps} />} />
        </Switch>

        { sess && sess.status !== 1 && /\/user|\/system_admin|\/organizer/.test(window.location.pathname) &&
          <Redirect to={`/`} />
        }

        { sess && sess.status === 1 && /\/login/.test(window.location.pathname) &&
          <Redirect to={`/`} />
        }

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
          message={snackBar.message} />

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

        <Dialog
          {...passingProps}
          open={open}
          handleClose={toggleDialog}
          handleSess={handleSess} />

        <SideDrawer
          {...passingProps}
          drawerState={drawerState}
          drawerClose={toggleDrawer} />

        { !/\/user|\/organizer/.test(window.location.pathname) &&
          <Footer />
        }

      </div>
    </React.Fragment>
  );
}
