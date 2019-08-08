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

class MatchDetail extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      endpoint: API.webURL(),
      csrfToken: null,
      data: null,
      userscore: null
    }
  }

  handleFetch = async () =>{
    const res = await API.xhrGet('getcsrf')
    await API.xhrPost(
      res.token,
      'loadmatchsystem', {
        action: 'userscore',
        matchid: parseInt(this.props.computedMatch.params.matchparam)
    }, (csrf, d) =>{
      this.props.setCSRFToken(csrf)
      if(d.status === 'wrong params'){
        this.props.handleSnackBar({
          state: true,
          message: d.status,
          variant: 'error',
          autoHideDuration: 5000
        })
      }else{
        this.setState({
          data: d,
          userscore: d.userscore
        })
      }
    })
  }

  response = () => {
    const { endpoint, userscore } = this.state
    var hd = ( window.location.href.substring(0, 25) === 'https://www.' + API.webURL() )? 'https://www.' : 'https://'
    const socket = socketIOClient( hd + endpoint )
    socket.on('admin-match-server-message', (messageNew) => {
      if(messageNew && messageNew.status === 'success'){
        if(messageNew.hostdetail){
          this.props.handleSnackBarL({
            state: true,
            sFULLNAME: messageNew.hostdetail.fullname,
            sLASTNAME: messageNew.hostdetail.lastname,
            sOUT: messageNew.hostdetail.sout,
            sIN: messageNew.hostdetail.sin,
            sTOTAL: messageNew.hostdetail.gross,
            sPAR: messageNew.hostdetail.par
          })
        }
        this.setState({ userscore: messageNew.result })
        /*
        this.props.handleSnackBar({
          state: true,
          message: messageNew.status,
          variant: messageNew.status === 'success' ? 'success' : 'error',
          autoHideDuration: d.status === 'success'? 2000 : 5000
        })*/
      }
    })
  }

  componentDidMount = () => {
    this.response()
    this.handleFetch()
  }

  render(){
    const { token, setCSRFToken, isSupportWebp } = this.props
    const { message, data, userscore } = this.state

    return(
      /*
      <MatchDetailBody data={data} userscore={userscore} matchid={parseInt(this.props.computedMatch.params.matchparam)}
        token={token} setCSRFToken={setCSRFToken} isSupportWebp={isSupportWebp}/>
      */
      <MatchDetailBody data={data} userscore={userscore}
        token={token} setCSRFToken={setCSRFToken} isSupportWebp={isSupportWebp}/>
    );
  }
}
export default MatchDetail;
