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
  const [ mainClassSelected, setMainClassSelected ] = React.useState('1')
  const [ scoringMethod, setScoringMethod ] = React.useState('flight')
  const [ value, setValue ] = React.useState(0);

  const passingProps = {
    ...props,
    data: data,
    setData: setData,
    userscore: userscore,
    setUserscore: setUserscore,
    setRawUserscore: setRawUserscore,
    sortBy: sortBy,
    setSortBy: setSortBy,
    scoringMethod: scoringMethod,
    setScoringMethod: setScoringMethod,
    mainClassSelected: mainClassSelected,
    setMainClassSelected: setMainClassSelected,
    matchid: parseInt(props.computedMatch.params.matchid),
    value: value,
    setValue: setValue,

  }

  async function handleFetch(){
    const resToken = token? token : await API._xhrGet('getcsrf')
    await API._xhrPost(
      token? token : resToken.token,
      'loadmatchsystem', {
        action: 'userscore',
        matchid: parseInt(props.computedMatch.params.matchid),
        mainclass: parseInt(mainClassSelected)
    }, (csrf, d) =>{
      setCSRFToken(csrf)
      setData(d)
      if(/wrong/.test(d.status)){
        handleSnackBar({
          state: true,
          message: d.status,
          variant: 'error',
          autoHideDuration: 5000
        })
        document.title = `No match`
      }else{
        setUserscore(d.userscore)
        setRawUserscore(d)
        if(d.scorematch !== 1){
          setSortBy(d.scorematch === 2? 'sf' : 'net')
        }
        document.title = `${d.title} - T-off Time`
      }
    })
  }

  function response(action){
    const matchid = parseInt(props.computedMatch.params.matchid)
    const socket = socketIOClient( API._getWebURL(), { transports: ['websocket', 'polling'] } )
    socket.on(`admin-match-${matchid}-server-message`, (messageNew) => {
      if(messageNew && /success/.test(messageNew.status)){
        const d = messageNew.result
        const dh = messageNew.hostdetail
        if(dh){
          handleSnackBarL({
            state: true,
            sFULLNAME: dh.fullname,
            sLASTNAME: dh.lastname,
            sOUT: dh.sout,
            sIN: dh.sin,
            sTOTAL: dh.gross,
            sPAR: dh.par
          })
        }
        setUserscore(d.userscore)
        setRawUserscore(d)
      }
    })
  }

  React.useEffect(()=>{
    response()
  },[ ])

  React.useEffect(()=>{
    handleFetch()
  },[ window.location.href, mainClassSelected ])

  React.useEffect(()=>{
    if(rawUserscore){//usersolo
      if(rawUserscore.scorematch !== 1){
        if(rawUserscore.scorematch === 2){
          setUserscore( sortBy === 'sf' ? rawUserscore.userscore : rawUserscore.userscoreSortBySF)
        }else{
          setUserscore( sortBy === 'net' ? rawUserscore.userscoreSortBySF : rawUserscore.userscore)
        }
      }
    }
  },[ scoringMethod, sortBy ])

  return(
    <Switch>
      <RouteMatchDetailBody
        exact
        path={`/match/${props.computedMatch.params.matchid}`}
        {...passingProps} />
      <RouteMiniGameMah
        path={`/match/${props.computedMatch.params.matchid}/minigame/:gametype`}
        {...props} />
    </Switch>
  );
}
