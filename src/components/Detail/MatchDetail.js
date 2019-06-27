import React from 'react';
import Loadable from 'react-loadable';
import { makeStyles, fade } from '@material-ui/core/styles';
import socketIOClient from 'socket.io-client'
import * as API from '../../api'

import { LDMatchDetail } from '../loading/LDMatchDetail'

const MatchDetailBody = Loadable.Map({
  loader: {
    MatchDetail: () => import(/* webpackChunkName: "MatchDetailBody" */'./MatchDetailBody'),
  },
  render(loaded, props) {
    let Component = loaded.MatchDetail.default;
    return (
      <Component {...props} />
    )
  },
  loading: () => <LDMatchDetail />
});

class MatchDetail extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      endpoint: "https://thai-pga.com",
      csrfToken: null,
      data: null
    }
  }
  handleFetch = async () =>{
    const token = await this.props.token? this.props.token : API.xhrGet('main')
    await API.xhrPost(
      this.props.token? this.props.token : token,
      'loadmatchsystem', {
        action: 'userscore',
        matchid: parseInt(this.props.computedMatch.params.matchparam)
    }, (csrf, d) =>{
      this.props.setCSRFToken(csrf)
      this.setState({ data: d })
    })
  }

  response = () => {
    const { endpoint, data } = this.state
    const socket = socketIOClient(endpoint)
    socket.on('server-message', (messageNew) => {
      this.setState({ data: messageNew })
    })
  }

  componentDidMount = () => {
    this.response()
    this.handleFetch()
  }

  render(){
    const { message, data } = this.state

    const style = { marginTop: 20, paddingLeft: 50 }
    if(data){
      return <MatchDetailBody data={data} />;
    }else{
      return <LDMatchDetail />;
    }
  }
}
export default MatchDetail;
