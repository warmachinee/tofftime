import React from 'react';
import Loadable from 'react-loadable';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Route, Link } from "react-router-dom";
import * as API from './../../api'
import { primary, grey } from './../../api/palette'

import { LDCircular } from './../loading/LDCircular';

const StatisticsCard = Loadable({
  loader: () => import(/* webpackChunkName: "StatisticsCard" */'./StatisticsCard'),
  loading: () => <LDCircular />
});

const useStyles = makeStyles(theme => ({


}))


export default function UserPageBody(props) {
  const classes = useStyles();
  const { sess, token, setCSRFToken, handleSnackBar, isSupportWebp } = props
  const [ stat, setStat ] = React.useState(null)

  async function handleFetch(){
    const resToken = token? token : await API.xhrGet('getcsrf')
    await API.xhrPost(
      token? token : resToken.token,
      'loadusersystem', {
        action: 'statavg'
    }, (csrf, d) =>{
      setCSRFToken(csrf)
      setStat(d)
    })
  }

  React.useEffect(()=>{
    handleFetch()
  },[ ])

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: window.innerWidth < 500? 'column' : 'row',
        marginBottom: 16
      }}>
      <StatisticsCard type="match" data={stat} />
      { window.innerWidth < 500?
        <div style={{ height: 16 }} />
        :
        <div style={{ width: 16 }} />

      }
      <StatisticsCard type="hc" data={stat}/>
    </div>
  );
}
