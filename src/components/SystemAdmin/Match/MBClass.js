import React from 'react';
import Loadable from 'react-loadable';
import { makeStyles, } from '@material-ui/core/styles';
import { primary, grey } from './../../../api/palette'

import Typography from '@material-ui/core/Typography';

import { LDCircular } from './../../loading/LDCircular'

const MatchClass = Loadable({
  loader: () => import(/* webpackChunkName: "MatchClass" */'./MatchClass'),
  loading: () => <LDCircular />
});

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    padding: theme.spacing(1, 2),
    width: '100%',
    marginTop: 24,
    boxSizing: 'border-box',
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: 900
  },

}))

export default function MBOverview(props){
  const classes = useStyles();
  const { API, sess, token, setCSRFToken, setData, data, matchid, handleSnackBar, isSupportWebp } = props

  async function handleFetch(){
    if(matchid){
      const resToken = token? token : await API._xhrGet('getcsrf')
      await API._xhrPost(
        token? token : resToken.token,
        sess.typeid === 'admin'? 'loadmatch' :'mloadmatch', {
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
  }

  React.useEffect(()=>{
    handleFetch()
  },[ ])

  return data && data.status !== 'wrong params' && (
    <div className={classes.root}>
      <MatchClass
        {...props}
        data={data && data.status !== 'class database error' && data}
        matchid={matchid} setData={setData} />
    </div>
  );
}
