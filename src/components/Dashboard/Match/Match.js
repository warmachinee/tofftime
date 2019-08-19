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
        )}/>
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
        )}/>
    )
  },
  loading: () => <LDCircular />
});

export default function Match(props){
  const { sess, token, setCSRFToken, handleSnackBar, isSupportWebp } = props

  const passingProps = {
    sess: sess,
    token: token,
    setCSRFToken: setCSRFToken,
    handleSnackBar: handleSnackBar,
    isSupportWebp: isSupportWebp
  }

  return(
    <Switch>
      <RouteMatchBody exact path={`/${sess.typeid}/match/:pageParam`} {...passingProps} />
      <RouteMatchEditor path={`/${sess.typeid}/match/:pageParam/:matchparam`} {...passingProps} />
    </Switch>
  );
}
