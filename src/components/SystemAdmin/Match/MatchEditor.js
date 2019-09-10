import React from 'react';
import Loadable from 'react-loadable';
import { matchPath } from 'react-router'
import { makeStyles, fade } from '@material-ui/core/styles';
import * as API from './../../../api'
import { primary } from './../../../api/palette'

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import { LDCircular } from './../../loading/LDCircular'

const MBOverview = Loadable({
  loader: () => import(/* webpackChunkName: "MBOverview" */'./MBOverview'),
  loading: () => <LDCircular />
});

const MBPlayer = Loadable({
  loader: () => import(/* webpackChunkName: "MBPlayer" */'./MBPlayer'),
  loading: () => <LDCircular />
});

const MBSchedule = Loadable({
  loader: () => import(/* webpackChunkName: "MBSchedule" */'./MBSchedule'),
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

const MBMatchAdmin = Loadable({
  loader: () => import(/* webpackChunkName: "MBMatchAdmin" */'./MBMatchAdmin'),
  loading: () => <LDCircular />
});

const GoBack = Loadable({
  loader: () => import(/* webpackChunkName: "GoBack" */'./../../GoBack'),
  loading: () => <LDCircular />
});

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
  },
  title: {
    textAlign: 'center', color: primary[900],
    fontSize: 28,
    [theme.breakpoints.up(500)]: {
      fontSize: 32,
    },
  },

}))

export default function MatchEditor(props){
  const classes = useStyles();
  const { BTN, sess, token, setCSRFToken, handleSnackBar, isSupportWebp } = props
  const [ param, setParam ] = React.useState(null)
  const [ data, setData ] = React.useState(null)
  const passingProps = {
    ...props,
    matchid: param
  }

  async function handleFetch(matchid){
    const resToken = token? token : await API.xhrGet('getcsrf')
    await API.xhrPost(
      token? token : resToken.token,
      sess.typeid === 'admin'? 'loadmatch' : 'mloadmatch', {
        action: 'detail',
        matchid: matchid,
    }, (csrf, d) =>{
      setCSRFToken(csrf)
      if(sess.typeid === 'admin'){
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
      }else{
        if(d.chkadminpermission.status){
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
        }else{
          handleSnackBar({
            state: true,
            message: 'You have no permission to access !!!',
            variant: 'error',
            autoHideDuration: 10000,
          })
          setTimeout(()=>{
            window.location.pathname = '/user'
          }, 11000)
        }
      }
    })
  }

  React.useEffect(()=>{
    if(props.location){
      const match = matchPath( props.location.pathname, {
        path: sess.typeid === 'admin' ? "/admin/match/:matchparam" : "/user/management/match/:matchparam",
      });
      if(match){
        handleFetch(parseInt(match.params.matchparam))
        setParam(parseInt(match.params.matchparam))
      }
      console.log(match);
      console.log(props);
    }

  },[ /*props.location*/ ])

  return param && (
    <div className={classes.root}>
      <GoBack />
      <Typography component="div">
        { BTN && param &&
          <BTN.NoStyleLink to={`/match/${param}`}>
            <Box className={classes.title} fontWeight={600} m={1} style={{ cursor: 'pointer' }}>
              {data && data.title}
            </Box>
          </BTN.NoStyleLink>
        }
      </Typography>
      <MBOverview {...passingProps} setData={setData} data={data} />
      <MBSchedule {...passingProps} />
      <MBPlayer {...passingProps} />
      <MBScoreEditor {...passingProps} />
      <MBPlayoff {...passingProps} />
      <MBReward {...passingProps} />
      <MBMatchAdmin {...passingProps} />
    </div>
  );
}
