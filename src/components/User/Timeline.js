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
  const { API } = props
  const [ param, setParam ] = React.useState(null)

  React.useEffect(()=>{
    window.scrollTo(0, 0)
    if(props.location){
      const match = matchPath( props.location.pathname, {
        path: "/user/timeline/:userid",
      });
      if(match){
        setParam(parseInt(match.params.userid))
      }else{
        if(window.location.pathname === '/user/timeline'){
          window.location.pathname = '/user'
        }
      }
    }
  }, [ props.location ])

  return param && (
    <div className={classes.root}>
      <OverviewProfile userid={param} {...props} />
      <Statistics userid={param} {...props} />
      <Upcoming userid={param} {...props} />
      <History userid={param} {...props} open={open}/>
    </div>
  );
}
