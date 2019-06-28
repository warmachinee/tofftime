import React from 'react';
import Loadable from 'react-loadable';
import { Route, Redirect } from "react-router-dom";

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
  loading: () => null
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
  loading: () => null
});

export default function Match(props){
  const { token, setCSRFToken } = props
  const [ selected, handleSelected ] = React.useState(null)

  return(
    <React.Fragment>

      <RouteMatchBody exact path='/user/match' token={token} setCSRFToken={setCSRFToken}
        handleSelected={handleSelected} selected={selected}/>
      <RouteMatchEditor path='/user/match/editor' token={token} setCSRFToken={setCSRFToken}
        handleSelected={handleSelected} selected={selected}/>
    </React.Fragment>
  );
}
