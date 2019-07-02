import React from 'react';
import Loadable from 'react-loadable';
import { Route } from "react-router-dom";
import { makeStyles, fade } from '@material-ui/core/styles';
import socketIOClient from 'socket.io-client'
import * as API from '../../api'

import { LDCircular } from '../loading/LDCircular'

const MatchDetailBody = Loadable({
  loader: () => import(/* webpackChunkName: "MatchDetailBody" */'./MatchDetailBody'),
  loading: () => <LDCircular />
});

class MatchDetail extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      endpoint: "https://thai-pga.com",
      csrfToken: null,
      data: null,
      userscore: null
    }
  }
  handleFetch = async () =>{
    const res = await this.props.token? this.props.token : API.xhrGet('getcsrf')
    await API.xhrPost(
      this.props.token? this.props.token : res.token,
      'loadmatchsystem', {
        action: 'userscore',
        matchid: parseInt(this.props.computedMatch.params.matchparam)
    }, (csrf, d) =>{
      this.props.setCSRFToken(csrf)
      this.setState({
        data: d,
        userscore: d.userscore
      })
    })
  }

  response = () => {
    const { endpoint, userscore } = this.state
    const socket = socketIOClient(endpoint)
    socket.on('server-message', (messageNew) => {
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
          variant: messageNew.status === 'success' ? 'success' : 'error'
        })*/
      }
    })
  }

  componentDidMount = () => {
    this.response()
    this.handleFetch()
  }

  render(){
    const { message, data, userscore } = this.state

    const style = { marginTop: 20, paddingLeft: 50 }
    return <MatchDetailBody data={data} userscore={userscore}/>;
  }
}
export default MatchDetail;
