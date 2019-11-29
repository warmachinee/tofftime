import React from 'react';
import Loadable from 'react-loadable';
import { Switch, Route, Redirect } from "react-router-dom";

import { LDCircular } from './../../loading/LDCircular'

const RouteMatchBody = Loadable.Map({
  loader: {
    MatchBody: () => import(/* webpackChunkName: "MatchBody" */'./MatchBody'),
  },
  render(loaded, props) {
    let Component = loaded.MatchBody.default;
    return (
      <Route
        {...props}
        render={()=> (
          <Component {...props} />
        )} />
    )
  },
  loading: () => <LDCircular />
});

const RouteMatchEditor = Loadable.Map({
  loader: {
    MatchEditor: () => import(/* webpackChunkName: "MatchEditor" */'./MatchEditor'),
  },
  render(loaded, props) {
    let Component = loaded.MatchEditor.default;
    return (
      <Route
        {...props}
        render={()=> (
          <Component {...props} />
        )} />
    )
  },
  loading: () => <LDCircular />
});

export default function Match(props){
  const { API, sess, pageOrganizer, pageData } = props

  const passingProps = {
    API: props.API,
    COLOR: props.COLOR,
    BTN: props.BTN,
    sess: props.sess,
    handleSess: props.handleSess,
    accountData: props.accountData,
    handleAccountData: props.handleAccountData,
    token: props.token,
    setCSRFToken: props.setCSRFToken,
    isSupportWebp: props.isSupportWebp,
    handleSnackBar: props.handleSnackBar,
    location: props.location,
    pageid: props.pageid,
    pageOrganizer: props.pageOrganizer,
    pageData: props.pageData,
    ...(sess && sess.typeid !== 'admin' && {
      open: props.open,
      handleDrawerClick: props.handleDrawerClick,
      handleDrawerOpen: props.handleDrawerOpen,
      handleDrawerClose: props.handleDrawerClose,
      notiState: props.notiState,
      toggleNoti: props.toggleNoti,
    })
  }


  return(
    <Switch>
      { ( sess && sess.status === 1 && sess.typeid === 'admin' ) ?
        <React.Fragment>
          <RouteMatchBody exact path="/system_admin/match"
            {...passingProps} />
          <RouteMatchEditor path="/system_admin/match/:matchparam"
            {...passingProps} />
        </React.Fragment>
        :
        <React.Fragment>
          <RouteMatchBody exact
            path={`/${ pageOrganizer ? `organizer/${pageData.pageid}` : 'user' }/management/match`}
            {...passingProps} />
          <RouteMatchEditor
            path={`/${ pageOrganizer ? `organizer/${pageData.pageid}` : 'user' }/management/match/:matchparam`}
            {...passingProps} />
        </React.Fragment>
      }
    </Switch>
  );
}
