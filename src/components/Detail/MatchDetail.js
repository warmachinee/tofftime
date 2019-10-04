import React from 'react';
import Loadable from 'react-loadable';
import { Switch, Route } from "react-router-dom";
import { makeStyles, fade } from '@material-ui/core/styles';
import socketIOClient from 'socket.io-client'
import * as API from './../../api'

import { LDCircular } from './../loading/LDCircular'

const RouteMatchDetailBody = Loadable.Map({
  loader: {
    MatchDetailBody: () => import(/* webpackChunkName: "MatchDetailBody" */'./MatchDetailBody'),
  },
  render(loaded, props) {
    let Component = loaded.MatchDetailBody.default;
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

const RouteMiniGameMah = Loadable.Map({
  loader: {
    MiniGameMah: () => import(/* webpackChunkName: "MiniGameMah" */'./../Game/MiniGameMah'),
  },
  render(loaded, props) {
    let Component = loaded.MiniGameMah.default;
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

export default function MatchDetail(props){
  const { sess, token, setCSRFToken, isSupportWebp, handleSnackBar, handleSnackBarL } = props
  const [ data, setData ] = React.useState(null)
  const [ rawUserscore, setRawUserscore ] = React.useState(null)
  const [ userscore, setUserscore ] = React.useState(null)
  const [ sortBy, setSortBy ] = React.useState('net')

  async function handleFetch(){
    const resToken = token? token : await API.xhrGet('getcsrf')
    await API.xhrPost(
      token? token : resToken.token,
      'loadmatchsystem', {
        action: 'userscore',
        matchid: parseInt(props.computedMatch.params.matchid)
    }, (csrf, d) =>{
      setCSRFToken(csrf)
      if(d.status === 'wrong params'){
        handleSnackBar({
          state: true,
          message: d.status,
          variant: 'error',
          autoHideDuration: 5000
        })
      }else{
        setData(d)
        setUserscore(d.userscore)
        setRawUserscore(d)
      }
    })
  }

  function response(action){
    const matchid = parseInt(props.computedMatch.params.matchid)
    const socket = socketIOClient( API.getWebURL() )
    socket.on(`admin-match-${matchid}-server-message`, (messageNew) => {
      if(messageNew && messageNew.status === 'success'){
        if(messageNew.hostdetail){
          handleSnackBarL({
            state: true,
            sFULLNAME: messageNew.hostdetail.fullname,
            sLASTNAME: messageNew.hostdetail.lastname,
            sOUT: messageNew.hostdetail.sout,
            sIN: messageNew.hostdetail.sin,
            sTOTAL: messageNew.hostdetail.gross,
            sPAR: messageNew.hostdetail.par
          })
        }
        setUserscore(messageNew.result.userscore)
        setRawUserscore(messageNew.result)
      }
    })
  }

  React.useEffect(()=>{
    response()
    handleFetch()
  },[ ])

  React.useEffect(()=>{
    if(rawUserscore){
      setUserscore( sortBy === 'net' ? rawUserscore.userscore : rawUserscore.userscoreSortBySF)
    }
  },[ sortBy ])

  return(
    <Switch>
      <RouteMatchDetailBody
        exact
        path={`/match/${props.computedMatch.params.matchid}`}
        {...props}
        data={data}
        userscore={userscore}
        sortBy={sortBy}
        setSortBy={setSortBy}
        matchid={parseInt(props.computedMatch.params.matchid)} />
      <RouteMiniGameMah
        path={`/match/${props.computedMatch.params.matchid}/minigame/:gametype`}
        {...props} />
    </Switch>
  );
}
