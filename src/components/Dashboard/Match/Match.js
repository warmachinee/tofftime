import React from 'react';
import Loadable from 'react-loadable';
import { Switch, Route, Redirect } from "react-router-dom";

import { LDCircular } from '../../loading/LDCircular'

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
  const { token, setCSRFToken, handleSnackBar, isSupportWebp } = props
  return(
    <Switch>

      <RouteMatchBody exact path='/user/match' token={token} setCSRFToken={setCSRFToken}
        handleSnackBar={handleSnackBar} />
      <RouteMatchEditor path='/user/match/:matchparam' token={token} setCSRFToken={setCSRFToken}
        isSupportWebp={isSupportWebp}
        handleSnackBar={handleSnackBar} />
    </Switch>
  );
}
