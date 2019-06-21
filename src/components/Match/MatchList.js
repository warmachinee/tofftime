import React from 'react';
import Loadable from 'react-loadable';
import { makeStyles, fade } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';

import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';

import teal from '@material-ui/core/colors/teal';

import MatchCard from './MatchCard'

const useStyles = makeStyles({
  root: {
    maxWidth: 1200,
    position: 'relative',
    margin: '0 auto',
    borderRadius: 2,
    backgroundColor: 'white',
    borderTop: '1px solid #e1e1e1',
    borderBottom: '1px solid #e1e1e1'
  },
  title: {
    marginTop: 32,
    padding: '0 5%',
    color: teal[900],
    fontWeight: 600,
    fontVariant: 'petite-caps'
  },
  iconButton: {
    padding: 0
  },
  arrow: {
    fontSize: '3.5rem',
    color: teal[600]
  },
  leftArrow: {
    left: '2%',
    top: '50%',
    position: 'absolute',
    zIndex: '10',
    backgroundColor: 'white',
    '&:hover': {
      backgroundColor: fade(teal[600], 0.25),
    },
  },
  rightArrow: {
    right: '2%',
    top: '50%',
    position: 'absolute',
    zIndex: '10',
    backgroundColor: 'white',
    '&:hover': {
      backgroundColor: fade(teal[600], 0.25),
    },
  },
});

function MatchList() {
  const classes = useStyles();
  const [ gridRes, setGridRes ] = React.useState(
    window.innerWidth >= 1080? { width: '33.333333%', indicator: 3 }:
    window.innerWidth >= 850? { width: '50%', indicator: 2 }:{ width: '100%', indicator: 1 }
  );
  const [ sliderIndex, setSliderIndex ] = React.useState(0)
  const data = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]

  function nextHandler(){
    if( (sliderIndex + 1) * gridRes.indicator < data.length ){
      setSliderIndex(sliderIndex + 1)
    }else{
      setSliderIndex(data.length/gridRes.indicator)
    }
  }
  function backHandler(){
    if(sliderIndex <= 0){
      setSliderIndex(0)
    }else{
      setSliderIndex(sliderIndex - 1)
    }
  }
  function resizeHandler(){
    let wd = window.innerWidth
    if( wd >= 1080 ){
      setGridRes({ width: '33.333333%', indicator: 3 })
    }
    else if( wd >= 850 ){
      setGridRes({ width: '50%', indicator: 2 })
    }
    else {
      setGridRes({ width: '100%', indicator: 1 })
    }
    setSliderIndex(0)
  }
  React.useEffect(()=>{
    window.addEventListener('resize',resizeHandler)
    return ()=>{
      window.removeEventListener('resize',resizeHandler)
    }
  },[ window.innerWidth ])

  return (
    <div className={classes.root}>
      <Typography classes={{ root: classes.title }} variant="h4">
        Match List
      </Typography>
      <div style={{ padding: '0 5%' }}>
        <SwipeableViews index={sliderIndex} enableMouseEvents
           style={{ padding: '0 30px' }}
           slideStyle={{ padding: '0 10px', width: gridRes.width }}
          >
          {data.map( d =>
            <MatchCard key={d} index={d}/>
          )}
        </SwipeableViews>
      </div>
      {
        (sliderIndex > 0) &&
        window.innerWidth > 500 &&
        <IconButton classes={{ root: classes.iconButton }} className={classes.leftArrow} onClick={backHandler}>
          <KeyboardArrowLeftIcon classes={{ root: classes.arrow }}/>
        </IconButton>
      }
      {
        (sliderIndex + 1) * gridRes.indicator < data.length &&
        window.innerWidth > 500 &&
        <IconButton classes={{ root: classes.iconButton }} className={classes.rightArrow} onClick={nextHandler}>
          <KeyboardArrowRightIcon classes={{ root: classes.arrow }}/>
        </IconButton>
      }
    </div>
  );
}

export default MatchList;
