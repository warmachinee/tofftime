import React from 'react';
import Loadable from 'react-loadable';
import { Route } from "react-router-dom";
import { makeStyles, fade } from '@material-ui/core/styles';
import socketIOClient from 'socket.io-client'
import * as API from './../../api'

import { LDCircular } from './../loading/LDCircular'

const MatchDetailBody = Loadable({
  loader: () => import(/* webpackChunkName: "MatchDetailBody" */'./MatchDetailBody'),
  loading: () => <LDCircular />
});

export default function MatchDetail(props){
  const { sess, token, setCSRFToken, isSupportWebp, handleSnackBar, handleSnackBarL } = props
  const endpoint = API.webURL()
  const hd = ( /www/.test(window.location.href) )? 'https://www.' : 'https://'
  const [ data, setData ] = React.useState(null)
  const [ userscore, setUserscore ] = React.useState(null)

  async function handleFetch(){
    const resToken = token? token : await API.xhrGet('getcsrf')
    await API.xhrPost(
      token? token : resToken.token,
      'loadmatchsystem', {
        action: 'userscore',
        matchid: parseInt(props.computedMatch.params.matchparam)
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
      }
    })
  }

  function response(){
    const matchid = parseInt(props.computedMatch.params.matchparam)
    const socket = socketIOClient( hd + endpoint )
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
        setUserscore(messageNew.result)
      }
    })
  }

  React.useEffect(()=>{
    response()
    handleFetch()
  },[ ])

  return(
    <MatchDetailBody
      {...props}
      data={data}
      userscore={userscore}
      matchid={parseInt(props.computedMatch.params.matchparam)} />
  );
}
