import React from 'react';
import clsx from "clsx";
import { Link } from "react-router-dom";
import Loadable from 'react-loadable';
import { matchPath } from 'react-router'
import { makeStyles } from '@material-ui/core/styles';
import * as COLOR from './../../api/palette'

import {
  Paper,
} from '@material-ui/core';

import { LDCircular } from './../loading/LDCircular'

const OverviewProfile = Loadable({
  loader: () => import(/* webpackChunkName: "OverviewProfile" */ './OverviewProfile'),
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
  const { API, sess, token, setCSRFToken } = props
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
            <Upcoming userid={param} {...props} userData={data} />
            <History userid={param} {...props} open={open} userData={data} />
          </React.Fragment>
        )
        break;
      case data.privacy === 'friend':
        return friend.some( item =>{ return item.userid === data.userid }) && (
          <React.Fragment>
            <Upcoming userid={param} {...props} userData={data} />
            <History userid={param} {...props} open={open} userData={data} />
          </React.Fragment>
        )
        break;
      default:
      return(
        <React.Fragment>
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
    setData(null)
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

  return (
    <React.Fragment>
      { param &&
        <div className={classes.root}>
          { ( data && friend ) ?
            ( ('status' in data) ?
              <div>
                <h3 style={{ textAlign: 'center', fontSize: 28 , marginTop: 72 }}>
                  { API._getWord(sess && sess.language).No_user }
                  <code>{' ' + parseInt(param)}</code>
                </h3>
                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                  { window.history.length > 1 ?
                    <span onClick={()=>window.history.back()}
                      style={{
                        textAlign: 'center', fontSize: 24, margin: '24px 0', cursor: 'pointer',
                        color: '#1e88e5', textDecoration: 'underline'
                      }}>{ API._getWord(sess && sess.language).Go_back }
                    </span>
                    :
                    <Link to='/'
                      style={{
                        textAlign: 'center', fontSize: 24, margin: '24px 0',
                        color: '#1e88e5'
                      }}>{ API._getWord(sess && sess.language).Go_to_home }
                    </Link>
                  }
                </div>
              </div>
              :
              <React.Fragment>
                <OverviewProfile {...props} userid={param} userData={data} />
                {getComponent()}
              </React.Fragment>
            )
            :
            <LDCircular />
          }
        </div>
      }
    </React.Fragment>
  );
}
