import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import { makeStyles, fade } from '@material-ui/core/styles';
import { Link } from "react-router-dom";

import IconButton from '@material-ui/core/IconButton';

import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';

import teal from '@material-ui/core/colors/teal';
import grey from '@material-ui/core/colors/grey'

import Pagination from './Pagination';
import ic_slide1 from '../img/slide1.png'
import ic_slide2 from '../img/slide2.jpg'

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const useStyles = makeStyles( theme =>({
  root: {
    position: 'relative',
    maxWidth: 1200,
    width: '100%',
    margin: 'auto',
  },
  slide: {
    maxHeight: 450,
    width: '100%',
    color: 'black',
    display: 'block',
    backgroundColor: '#ccc',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    objectFit: 'cover',
    cursor: 'pointer',
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
  label: {
    position: 'absolute', bottom: 0, width: '100%', color: teal[900],
    backgroundColor: grey[50], opacity: .8,
    fontSize: 16, fontWeight: 500, cursor: 'pointer',
    fontFamily: 'monospace', textAlign: 'center', padding: '8px 16px',
    '&:hover': {
      backgroundColor: grey[300],
    },
  },

}))
const styles = {


};

function Slider() {
  const classes = useStyles();
  const [ index, setIndex ] = React.useState(0)
  const data = [
    {
      id: 1,
      label: ['ผู้ชนะ SNT 4-2019 วันที่ 4 กรกฎาคม 2562','ณ Watermill Golf Club & Resort'],
      picture: ic_slide2
    },
    {
      id: 2,
      label: ['SNT ระเบิดศึกดวลสวิงอาชีพอาวุโส วันที่ 4 กรกฎาคม 2562','ณ Watermill Golf Club & Resort'],
      picture: ic_slide1
    },
  ]
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
      {
        data.map( d =>
          d &&
          <div key={d.id}>
            <Link to={`/detail/${d.id}`} style={{ textDecoration: 'none'}}>
              <img src={d.picture} className={classes.slide} style={{ height: window.innerWidth * .45 }} />
            </Link>
            <Link to={`/detail/${d.id}`} style={{ textDecoration: 'none'}}>
              <div className={classes.label}>{
                  d.label.map(text=><React.Fragment key={text}>{text}<br /></React.Fragment>)
                }</div>
            </Link>
          </div>
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
