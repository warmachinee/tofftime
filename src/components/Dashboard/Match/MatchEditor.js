import React from 'react';
import Loadable from 'react-loadable';
import { makeStyles, fade } from '@material-ui/core/styles';
import * as API from '../../../api'

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import teal from '@material-ui/core/colors/teal';

import { LDCircular } from '../../loading/LDCircular'

const MBOverview = Loadable({
  loader: () => import(/* webpackChunkName: "MBOverview" */'./MBOverview'),
  loading: () => <LDCircular />
});

const MBPlayer = Loadable({
  loader: () => import(/* webpackChunkName: "MBPlayer" */'./MBPlayer'),
  loading: () => <LDCircular />
});

const MBPlayoff = Loadable({
  loader: () => import(/* webpackChunkName: "MBPlayoff" */'./MBPlayoff'),
  loading: () => <LDCircular />
});

const MBScoreEditor = Loadable({
  loader: () => import(/* webpackChunkName: "MBScoreEditor" */'./MBScoreEditor'),
  loading: () => <LDCircular />
});

const MBReward = Loadable({
  loader: () => import(/* webpackChunkName: "MBReward" */'./MBReward'),
  loading: () => <LDCircular />
});

const GoBack = Loadable({
  loader: () => import(/* webpackChunkName: "GoBack" */'../../GoBack'),
  loading: () => <LDCircular />
});

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
  },
  title: {
    textAlign: 'center', color: teal[900],
    fontSize: 28,
    [theme.breakpoints.up(500)]: {
      fontSize: 32,
    },
  },

}))

export default function MatchEditor(props){
  const classes = useStyles();
  const { token, setCSRFToken, handleSnackBar, isSupportWebp } = props
  const matchid = props.computedMatch && props.computedMatch.params.matchparam
  const [ data, setData ] = React.useState(null)

  async function handleFetch(){
    const res = await token? token : API.xhrGet('getcsrf')
    await API.xhrPost(
      token? token : res.token,
      'loadmatch', {
        action: 'detail',
        matchid: matchid
    }, (csrf, d) =>{
      setCSRFToken(csrf)
      if(
        d.status !== 'class database error' ||
        d.status !== 'wrong matchid' ||
        d.status !== 'wrong action' ||
        d.status !== 'wrong params'
      ){
        setData(d)
      }else{
        handleSnackBar({
          state: true,
          message: d.status,
          variant: 'error',
          autoHideDuration: 5000
        })
      }
    })
  }

  React.useEffect(()=>{
    handleFetch()
  },[ ])

  return(
    <div className={classes.root}>
      <GoBack />
      <Typography component="div">
        <Box className={classes.title} fontWeight={600} m={1}>
          {data && data.title}
        </Box>
      </Typography>
      <MBOverview token={token} setCSRFToken={setCSRFToken} setData={setData} data={data} matchid={matchid}
        isSupportWebp={isSupportWebp} handleSnackBar={handleSnackBar}/>
      <MBPlayer token={token} setCSRFToken={setCSRFToken} matchid={matchid} handleSnackBar={handleSnackBar} />
      <MBScoreEditor token={token} setCSRFToken={setCSRFToken} matchid={matchid} handleSnackBar={handleSnackBar}/>
      <MBPlayoff token={token} setCSRFToken={setCSRFToken} matchid={matchid} handleSnackBar={handleSnackBar}/>
      <MBReward token={token} setCSRFToken={setCSRFToken} matchid={matchid} handleSnackBar={handleSnackBar}/>
    </div>
  );
}
