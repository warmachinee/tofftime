import React from 'react';
import Loadable from 'react-loadable';
import { makeStyles, fade } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import * as API from './../../api'
import { primary } from './../../api/palette'

import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';

import { LDMatchCard } from './../loading/LDMatchCard'

const MatchCard = Loadable({
  loader: () => import(/* webpackChunkName: "MatchCard" */'./MatchCard'),
  loading: () => <LDMatchCard />
});

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
    color: primary[900],
    fontWeight: 600,
    fontVariant: 'petite-caps'
  },
  iconButton: {
    padding: 0
  },
  arrow: {
    fontSize: '3.5rem',
    color: primary[600]
  },
  leftArrow: {
    left: '2%',
    top: '50%',
    position: 'absolute',
    zIndex: '10',
    backgroundColor: 'white',
    '&:hover': {
      backgroundColor: fade(primary[600], 0.25),
    },
  },
  rightArrow: {
    right: '2%',
    top: '50%',
    position: 'absolute',
    zIndex: '10',
    backgroundColor: 'white',
    '&:hover': {
      backgroundColor: fade(primary[600], 0.25),
    },
  },
});

function MatchListBody(props) {
  const classes = useStyles();
  const { scale = 1, isSupportWebp, data, page, pageid } = props
  const [ gridRes, setGridRes ] = React.useState(
    window.innerWidth * scale >= 1080 * scale ? { width: '33.333333%', indicator: 3 }:
    window.innerWidth * scale >= 850 * scale ? { width: '50%', indicator: 2 }:{ width: '100%', indicator: 1 }
  );
  const [ sliderIndex, setSliderIndex ] = React.useState(0)

  function nextHandler(){
    if(data){
      if( (sliderIndex + 1) * gridRes.indicator < data.length ){
        setSliderIndex(sliderIndex + 1)
      }else{
        setSliderIndex(data.length/gridRes.indicator)
      }
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
    let wd = window.innerWidth * scale
    if( wd >= 1080 * scale  ){
      setGridRes({ width: '33.333333%', indicator: 3 })
    }
    else if( wd >= 850 * scale  ){
      setGridRes({ width: '50%', indicator: 2 })
    }
    else {
      setGridRes({ width: '100%', indicator: 1 })
    }
    setSliderIndex(0)
  }

  React.useEffect(()=>{
    window.addEventListener('resize', resizeHandler)
    return ()=>{
      window.removeEventListener('resize', resizeHandler)
    }
  },[ window.innerWidth ])

  return (
    <div className={classes.root}>
      <Typography classes={{ root: classes.title }} variant="h4">
        Match List
      </Typography>
      <div style={{ padding: '0 5%' }}>
        { data && data.length > 0 ?
          <SwipeableViews
            index={sliderIndex}
            style={{ padding: '0 30px' }}
            slideStyle={{ padding: '0 10px', width: gridRes.width }}
            >
            { data.map( d =>
              d && <MatchCard key={d.matchid} {...props} data={d} page={page}/>
            )}
          </SwipeableViews>
          :
          <div
            style={{ minHeight: 300, display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
            <div style={{ textAlign: 'center', fontWeight: 600, fontSize: 36, opacity: .7 }}>No match</div>
          </div>
        }

      </div>
      {
        (sliderIndex > 0) &&
        window.innerWidth * scale > 500 * scale  &&
        <IconButton classes={{ root: classes.iconButton }} className={classes.leftArrow} onClick={backHandler}>
          <KeyboardArrowLeftIcon classes={{ root: classes.arrow }}/>
        </IconButton>
      }
      { data &&
        (sliderIndex + 1) * gridRes.indicator < data.length &&
        window.innerWidth * scale > 500 * scale  &&
        <IconButton classes={{ root: classes.iconButton }} className={classes.rightArrow} onClick={nextHandler}>
          <KeyboardArrowRightIcon classes={{ root: classes.arrow }}/>
        </IconButton>
      }
    </div>
  );
}

function MatchList(props){
  const { sess, token, setCSRFToken, handleSnackBar, isSupportWebp, scale = 1, page, pageid } = props
  const [ data, setData ] = React.useState(null)

  async function handleFetchPage(){
    const resToken = token? token : await API.xhrGet('getcsrf')
    await API.xhrPost(
      token? token : resToken.token,
      'loadusersystem' , {
        action: 'upcoming'
    }, function(csrf, d){
      setCSRFToken(csrf)
      setData(d)
    })
  }
  
  async function handleFetch(){
    const resToken = token? token : await API.xhrGet('getcsrf')
    await API.xhrPost(
      token? token : resToken.token,
      'loadmatchsystem' , {
        action: 'matchlist'
    }, function(csrf, d){
      //console.log(d);
      setCSRFToken(csrf)
      setData(d)
    })
  }

  React.useEffect(()=>{
    if(page){
      handleFetchPage()
    }else{
      handleFetch()
    }
  },[ ])

  return <MatchListBody {...props} data={data} />
}

export default MatchList;
