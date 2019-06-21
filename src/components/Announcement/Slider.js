import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import { makeStyles, fade } from '@material-ui/core/styles';

import IconButton from '@material-ui/core/IconButton';

import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';

import teal from '@material-ui/core/colors/teal';

import Pagination from './Pagination';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const useStyles = makeStyles( theme =>({
  root: {
    position: 'relative',
    maxWidth: 1200,
    width: '100%',
    margin: 'auto',
  },
  slide: {
    height: 200,
    width: '100%',
    color: 'black',
    backgroundColor: '#ccc',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    [theme.breakpoints.up(400)]: {
      height: 250,
    },
    [theme.breakpoints.up(500)]: {
      height: 300,
    },
    [theme.breakpoints.up(600)]: {
      height: 350,
    },
    [theme.breakpoints.up(750)]: {
      height: 300,
    },
    [theme.breakpoints.up(900)]: {
      height: 350,
    },
    [theme.breakpoints.up(1000)]: {
      height: 400,
    },
  },
  arrow: {
    fontSize: '2.75rem',
    color: teal[700]
  },
  leftArrow: {
    left: '2%',
    top: '40%',
    position: 'absolute',
    zIndex: '10',
    backgroundColor: 'white',
    opacity: .6,
    '&:hover': {
      backgroundColor: fade(teal[700], 0.25),
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
      backgroundColor: fade(teal[700], 0.25),
      opacity: 1,
    },
  },
}))
const styles = {


};

function Slider() {
  const classes = useStyles();
  const [ index, setIndex ] = React.useState(0)
  const data = [0,1,2,3,4]
  const matchPicture = 'null'

  function handleChangeIndex(index) {
    setIndex(index)
  };
  function backHandler(){
    if(index <= 0){
      setIndex(data.length - 1)
    }else{
      setIndex(index - 1)
    }
  }
  function nextHandler(){
    if(index >= data.length - 1){
      setIndex(0)
    }else{
      setIndex(index + 1)
    }
  }

  return (
    <div className={classes.root}>
      <AutoPlaySwipeableViews enableMouseEvents index={index} onChangeIndex={handleChangeIndex}>
      {matchPicture?
        data.map( d=>
          <img src="https://i.ytimg.com/vi/ZbofJucjkSU/maxresdefault.jpg" className={classes.slide} key={d} />
        )
      :
        data.map( d=>
          <div className={classes.slide} key={d}>Match {d}</div>

        )
      }
      </AutoPlaySwipeableViews>
      <Pagination dots={data.length} index={index} onChangeIndex={handleChangeIndex} />
      {
        window.innerWidth > 500 &&
        <IconButton classes={{ root: classes.iconButton }} className={classes.leftArrow} onClick={backHandler}>
          <KeyboardArrowLeftIcon classes={{ root: classes.arrow }}/>
        </IconButton>
      }
      {
        window.innerWidth > 500 &&
        <IconButton classes={{ root: classes.iconButton }} className={classes.rightArrow} onClick={nextHandler}>
          <KeyboardArrowRightIcon classes={{ root: classes.arrow }}/>
        </IconButton>
      }
    </div>
  );
}

export default Slider;
