import React from 'react';
import Loadable from 'react-loadable';
import { makeStyles, fade } from '@material-ui/core/styles'
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import { primary, grey } from './../../api/palette'

import {
  Paper, Grid, Hidden, IconButton, Typography, Box,
} from '@material-ui/core';

import Skeleton from '@material-ui/lab/Skeleton';

import {
  KeyboardArrowLeft, KeyboardArrowRight
} from '@material-ui/icons';

const Pagination = Loadable({
  loader: () => import(/* webpackChunkName: "Pagination" */'./Pagination'),
  loading: () => null
});

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    width: '100%',
    margin: 'auto',
    maxWidth: 1200,
    marginTop: 16
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  sliderItem: {
    maxHeight: 450,
    width: '100%',
    color: 'black',
    display: 'block',
    backgroundColor: grey[300],
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    objectFit: 'cover',
    cursor: 'pointer',
    '&:hover': {
      opacity: .7
    },
  },
  label: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    boxSizing: 'border-box',
    color: grey[50],
    backgroundColor: grey[900],
    opacity: .8,
    fontSize: 16,
    fontWeight: 500,
    cursor: 'pointer',
    fontFamily: 'monospace',
    textAlign: 'center',
    padding: theme.spacing(2, 1),
    maxHeight: 72,
    display: 'inherit',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 2,
    lineHeight: 1,
    '&:hover': {
      backgroundColor: grey[700],
    },
    [theme.breakpoints.up(500)]: {
      whiteSpace: 'normal',
      lineHeight: 1.8,
      display: '-webkit-box',
      padding: theme.spacing(1),
    },
  },
  leftArrow: {
    left: '2%',
    top: '40%',
    position: 'absolute',
    zIndex: '10',
    backgroundColor: 'white',
    opacity: .6,
    '&:hover': {
      backgroundColor: fade(primary[700], 0.25),
      opacity: 1,
    },
  },
  rightArrow: {
    right: '2%',
    top: '40%',
    position: 'absolute',
    zIndex: '10',
    backgroundColor: 'white',
    opacity: .6,
    '&:hover': {
      backgroundColor: fade(primary[700], 0.25),
      opacity: 1,
    },
  },
  skeleton: {
    boxSizing: 'border-box',
    margin: 16,
    backgroundColor: grey[300],
    maxHeight: 450
  },

}));

export default function AnnouncePrimaryPage(props) {
  const classes = useStyles();
  const { API, sess, BTN, isSupportWebp, data, pageid } = props
  const [ index, setIndex ] = React.useState(0)

  function handleChangeIndex(index) {
    setIndex(index)
  };

  function backHandler(){
    if(index <= 0 && data){
      setIndex(data.length - 1)
    }else{
      setIndex(index - 1)
    }
  }

  function nextHandler(){
    if(index >= data.length - 1 && data){
      setIndex(0)
    }else{
      setIndex(index + 1)
    }
  }

  const [ ,updateState ] = React.useState(null)

  function resizeHandler(){
    updateState({})
  }

  React.useEffect(()=>{
    window.addEventListener('resize', resizeHandler)
    return ()=>{
      window.removeEventListener('resize', resizeHandler)
    }
  },[ window.innerWidth ])

  return (
    <div className={classes.root}>
      <AutoPlaySwipeableViews
        interval={10000}
        enableMouseEvents index={index} onChangeIndex={handleChangeIndex}>
        { data ?
          ( data.length > 0 ?
            data.map(d =>
              <div key={d.postid}>
                <BTN.NoStyleLink to={`/post/${pageid}/${d.postid}`}>
                  { d.photopath ?
                    <img className={classes.sliderItem} style={{ height: window.innerWidth * .6 }}
                      src={API._getPictureUrl(d.photopath) + ( isSupportWebp? '.webp' : '.jpg' )} />
                    :
                    <Skeleton
                      className={classes.skeleton}
                      style={{ height: ( window.innerWidth * .6 - 48), maxHeight: 500, backgroundColor: grey[300] }} />
                  }
                </BTN.NoStyleLink>
                <BTN.NoStyleLink to={`/post/${pageid}/${d.postid}`}>
                  <div className={classes.label}>{d.message}</div>
                </BTN.NoStyleLink>
              </div>
            )
            :
            <Typography component="div" style={{ width: '100%', marginTop: 48 }}>
              <Box style={{ textAlign: 'center', color: primary[900] }} fontWeight={500} fontSize={24} m={1}>
                { API._getWord(sess && sess.language).No_data }
              </Box>
            </Typography>
          )
          :
          <div>
            <Skeleton
              className={classes.skeleton}
              style={{ height: ( window.innerWidth * .6 - 48), maxHeight: 500, backgroundColor: grey[300] }} />
            <Skeleton
              className={classes.skeleton}
              height={32}
              style={{ backgroundColor: grey[300] }} />
          </div>
        }
      </AutoPlaySwipeableViews>
      { data && data.length > 1 &&
        <Pagination dots={data.length} index={index} onChangeIndex={handleChangeIndex} />
      }
      {
        window.innerWidth > 500 && data && data.length > 1 &&
        <IconButton classes={{ root: classes.iconButton }} className={classes.leftArrow} onClick={backHandler}>
          <KeyboardArrowLeft classes={{ root: classes.arrow }} />
        </IconButton>
      }
      {
        window.innerWidth > 500  && data && data.length > 1 &&
        <IconButton classes={{ root: classes.iconButton }} className={classes.rightArrow} onClick={nextHandler}>
          <KeyboardArrowRight classes={{ root: classes.arrow }} />
        </IconButton>
      }
    </div>
  );
}
