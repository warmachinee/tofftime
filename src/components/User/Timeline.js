import React from 'react';
import clsx from "clsx";
import Loadable from 'react-loadable';
import { matchPath } from 'react-router'
import { makeStyles } from '@material-ui/core/styles';
import * as COLOR from './../../api/palette'

import {
  Paper,
} from '@material-ui/core';

const OverviewProfile = Loadable({
  loader: () => import(/* webpackChunkName: "OverviewProfile" */ './OverviewProfile'),
  loading: () => null
});

const Statistics = Loadable({
  loader: () => import(/* webpackChunkName: "Statistics" */ './../Statistics/Statistics'),
  loading: () => null
});

const Upcoming = Loadable({
  loader: () => import(/* webpackChunkName: "Upcoming" */ './Upcoming'),
  loading: () => null
});

const History = Loadable({
  loader: () => import(/* webpackChunkName: "History" */ './History'),
  loading: () => null
});

const useStyles = makeStyles(theme => ({

}));

export default function Timeline(props) {
  const classes = useStyles();
  const { API, token, setCSRFToken } = props
  const [ param, setParam ] = React.useState(null)
  const [ data, setData ] = React.useState(null)
  const [ friend, setFriend ] = React.useState(null)

  function getComponent(){
    switch (true) {
      case data.privacy === 'private':
        return null
        break;
      case data.privacy === 'public':
        return (
          <React.Fragment>
            <Statistics userid={param} {...props} userData={data} />
            <Upcoming userid={param} {...props} userData={data} />
            <History userid={param} {...props} open={open} userData={data} />
          </React.Fragment>
        )
        break;
      case data.privacy === 'friend':
        return friend.some( item =>{ return item.userid === data.userid }) && (
          <React.Fragment>
            <Statistics userid={param} {...props} userData={data} />
            <Upcoming userid={param} {...props} userData={data} />
            <History userid={param} {...props} open={open} userData={data} />
          </React.Fragment>
        )
        break;
      default:
      return(
        <React.Fragment>
          <Statistics userid={param} {...props} userData={data} />
          <Upcoming userid={param} {...props} userData={data} />
          <History userid={param} {...props} open={open} userData={data} />
        </React.Fragment>
      )
    }
  }

  async function handleFetchInfo(userid){
    const resToken = token? token : await API._xhrGet('getcsrf')
    await API._xhrPost(
      token? token : resToken.token,
      'loadusersystem', {
        action: 'info',
        targetuser: userid
    }, (csrf, d) =>{
      setCSRFToken(csrf)
      setData(d)
    })
    await handleFetchFriend()
  }

  async function handleFetchFriend(){
    const resToken = token? token : await API._xhrGet('getcsrf')
    await API._xhrPost(
      token? token : resToken.token,
      'loadusersystem', {
        action: 'friend',
        fstatus: 'friend'
    }, (csrf, d) =>{
      setCSRFToken(csrf)
      setFriend(d)
    })
  }

  React.useEffect(()=>{
    window.scrollTo(0, 0)
    if(props.location){
      const match = matchPath( props.location.pathname, {
        path: "/user/timeline/:userid",
      });
      if(match){
        setParam(parseInt(match.params.userid))
        handleFetchInfo(parseInt(match.params.userid))
      }else{
        if(window.location.pathname === '/user/timeline'){
          window.location.pathname = '/user'
        }
      }
    }
  }, [ props.location ])

  return param && (
    <div className={classes.root}>
      { data && friend &&
        <React.Fragment>
          <OverviewProfile {...props} userid={param} userData={data} />
          {getComponent()}
        </React.Fragment>
      }
    </div>
  );
}
