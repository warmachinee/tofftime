import React from 'react';
import Loadable from 'react-loadable';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';

import Grid from '@material-ui/core/Grid';

import MatchCard from './MatchCard'

const useStyles = makeStyles({
  root: {

  },
});

function MatchList() {
  const classes = useStyles();
  const [ gridRes, setGridRes ] = React.useState(
    window.innerWidth >= 1800? 'auto auto auto auto auto':
    window.innerWidth >= 1440? 'auto auto auto auto':
    window.innerWidth >= 1080? 'auto auto auto':
    window.innerWidth >= 720? 'auto auto':'auto'
  )

  function resizeHandler(){
    let wd = window.innerWidth
    if( wd >= 1800 ){
      setGridRes('auto auto auto auto auto')
    }
    else if( wd >= 1440 ){
      setGridRes('auto auto auto auto')
    }
    else if( wd >= 1080 ){
      setGridRes('auto auto auto')
    }
    else if( wd >= 720 ){
      setGridRes('auto auto')
    }
    else {
      setGridRes('auto')
    }
  }
  React.useEffect(()=>{
    window.addEventListener('resize',resizeHandler)
    return ()=>{
      window.removeEventListener('resize',resizeHandler)
    }
  },[ window.innerWidth ])

  return (
    <SwipeableViews enableMouseEvents>
      {[0,1,2,3,4].map( d =>
        <MatchCard key={d} />
      )}
    </SwipeableViews>
  );
}

export default MatchList;
