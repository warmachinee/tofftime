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
          <Component {...props}/>
        )}/>
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
          <Component {...props}/>
        )}/>
    )
  },
  loading: () => null
});

const Header = Loadable({
  loader: () => import(/* webpackChunkName: "Header" */'./components/Header'),
  loading: () => null
});

const NoMatch = Loadable({
  loader: () => import(/* webpackChunkName: "NoMatch" */'./components/NoMatch'),
  loading: () => null
});

const Dialog = Loadable({
  loader: () => import(/* webpackChunkName: "Dialog" */'./components/Account/Dialog'),
  loading: () => null
});

const SideDrawer = Loadable({
  loader: () => import(/* webpackChunkName: "SideDrawer" */'./components/SideDrawer'),
  loading: () => null
});

import UserPage from './page/UserPage'

export default function App() {
  const [ token, setCSRFToken ] = React.useState(null)
  const [ open, setOpen ] = React.useState(false);
  const [ drawerState, setDrawerState ] = React.useState(false);
  const [ sess, handleSess ] = React.useState(null)
  const [ accountData, handleAccountData ] = React.useState(null)
  const [ isSupportWebp, handleSupportWebp ] = React.useState(false)

  const passingProps = {
    API: API,
    COLOR: COLOR,
    BTN: BTN,
    sess: sess,
    handleSess: handleSess,
    accountData: accountData,
    handleAccountData: handleAccountData,
    token: token,
    setCSRFToken: setCSRFToken,
    isSupportWebp: isSupportWebp
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
    const resToken = await API.xhrGet('getcsrf')
    await API.xhrPost(
      resToken.token,
      'userinfo', {
    }, (csrf, d) =>{
      setCSRFToken(csrf)
      handleSess(d)
      console.log(d);
    })
    await detectWebp()
  }

  React.useEffect(()=>{
    handleGetUserinfo()
    //handleSess({ status: 1 })
  },[ ])

  return (
    <div>
      {/* !/\/user/.test(window.location.pathname) &&
        <Header
          {...passingProps}
          drawerOpen={toggleDrawer}
          handleOpen={toggleDialog}
          handleSess={handleSess} />*/
      }
      <Header
        {...passingProps}
        drawerOpen={toggleDrawer}
        handleOpen={toggleDialog}
        handleSess={handleSess} />

      {
        true ?
        <Switch>
          <RouteMain exact path="/"
            {...passingProps} />
          {/*-------------------- Detail --------------------*/}
          <RouteAnnounceDetail path="/announce/:detailparam"
            {...passingProps} />
          <RouteNewsDetail path="/news/:detailparam"
            {...passingProps} />
          {/*-------------------- Page --------------------*/}
          <RouteUserPage path="/user/:userid"
            {...passingProps} />

          <Route component={NoMatch} />
        </Switch>
        :
        <UserPage {...passingProps} />
      }

      { sess && sess.status === 1 && sess.typeid !== 'admin' &&
        <Redirect to={`/user/${sess.userid}`} />
      }

      <Dialog
        {...passingProps}
        open={open}
        handleClose={toggleDialog}
        handleSess={handleSess}/>
      <SideDrawer
        {...passingProps}
        drawerState={drawerState}
        drawerClose={toggleDrawer}/>
    </div>
  );
}
