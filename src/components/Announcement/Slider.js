import React from 'react';
import Loadable from 'react-loadable';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import { makeStyles, fade } from '@material-ui/core/styles';
import { Link } from "react-router-dom";
import * as API from './../../api'
import { primary, grey } from './../../api/palette'

import IconButton from '@material-ui/core/IconButton';

import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';

const Pagination = Loadable({
  loader: () => import(/* webpackChunkName: "Pagination" */'./Pagination'),
  loading: () => null
});

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
    color: primary[700]
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
  label: {
    position: 'absolute', bottom: 0, width: '100%', color: grey[50],
    backgroundColor: grey[900], opacity: .8,
    fontSize: 16, fontWeight: 500, cursor: 'pointer',
    fontFamily: 'monospace', textAlign: 'center', padding: '8px 16px',
    '&:hover': {
      backgroundColor: grey[300],
    },
  },

}))

function Slider(props) {
  const classes = useStyles();
  const { token, setCSRFToken, handleSnackBar, isSupportWebp } = props
  const [ index, setIndex ] = React.useState(0)
  const [ data, setData ] = React.useState(null)
  const hd = ( window.location.href.substring(0, 25) === 'https://www.' + API.webURL() )? 'https://www.' : 'https://'
  const currentWebURL = hd + API.webURL()

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

  async function handleFetch(){
    const d = await API.xhrGet('loadgeneral',
    `?_csrf=${token? token : await API.xhrGet('getcsrf').token}&action=announcelist`
    )
    setCSRFToken(d.token)
    setData(d.response)
  }

  React.useEffect(()=>{
    //handleFetch()
  },[ ])

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
        data.map( d =>
          d &&
          <div key={d.announceid}>
            <Link to={`/announce/${d.announceid}`} style={{ textDecoration: 'none'}}>
              <img className={classes.slide} style={{ height: window.innerWidth * .45 }}
                src={
                  isSupportWebp?
                  currentWebURL + d.picture + '.webp'
                  :
                  currentWebURL + d.picture + '.jpg'
                } />
            </Link>
            <Link to={`/announce/${d.announceid}`} style={{ textDecoration: 'none'}}>
              <div className={classes.label}>{d.title}</div>
            </Link>
          </div>
        )
        :
        <div style={{ width: '100%', height: window.innerWidth * .45, display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
          <div style={{ textAlign: 'center', fontWeight: 600, fontSize: 36, opacity: .7 }}>No announce</div>
        </div>
      }

      </AutoPlaySwipeableViews>
      <Pagination dots={ data ? data.length : 0 } index={index} onChangeIndex={handleChangeIndex} />
      {
        window.innerWidth > 500 && data &&
        <IconButton classes={{ root: classes.iconButton }} className={classes.leftArrow} onClick={backHandler}>
          <KeyboardArrowLeftIcon classes={{ root: classes.arrow }}/>
        </IconButton>
      }
      {
        window.innerWidth > 500 && data &&
        <IconButton classes={{ root: classes.iconButton }} className={classes.rightArrow} onClick={nextHandler}>
          <KeyboardArrowRightIcon classes={{ root: classes.arrow }}/>
        </IconButton>
      }
    </div>
  );
}

export default Slider;
