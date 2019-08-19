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
  const { sess, token, setCSRFToken, handleSnackBar, isSupportWebp, scale = 1, page, pageid } = props
  const [ index, setIndex ] = React.useState(0)
  const [ data, setData ] = React.useState(null)
  const hd = ( /www/.test(window.location.href) )? 'https://www.' : 'https://'
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

  async function handleFetchPage(){
    const resToken = token? token : await API.xhrGet('getcsrf')
    await API.xhrPost(
      token? token : resToken.token,
      'ploadpage', {
        action: 'postlist',
        pageid: pageid,
        userid: sess.userid,
        type: 'announce'
    }, (csrf, d) =>{
      setCSRFToken(csrf)
      setData(d)
    })
  }

  async function handleFetch(){
    const resToken = token? token : await API.xhrGet('getcsrf')
    const d = await API.xhrGet('loadgeneral',
    `?_csrf=${token? token : resToken.token}&action=announcelist`
    )
    setCSRFToken(d.token)
    setData(d.response)
  }

  React.useEffect(()=>{
    if(page){
      handleFetchPage()
    }else{
      handleFetch()
    }
  },[ ])

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
      { data && data.length > 0?
        data.map( d =>
          d &&
          <div key={page ? d.postid : d.announceid}>
            <Link to={ page ? `/announce/${pageid + '-' + d.postid}` : `/announce/${d.announceid}`}
              style={{ textDecoration: 'none'}}>
              { page ?
                (
                  d.photopath ?
                  <img className={classes.slide} style={{ height: window.innerWidth * scale * .45 }}
                    src={
                      isSupportWebp?
                      currentWebURL + d.photopath + '.webp'
                      :
                      currentWebURL + d.photopath + '.jpg'
                    } />
                  :
                  <div
                    style={{
                      height: window.innerWidth * scale * .45, width: '100%',
                      backgroundColor: grey[300],
                      display: 'flex', flexDirection: 'column', justifyContent: 'space-around'
                    }}>
                    <div style={{ textAlign: 'center', fontWeight: 600, fontFamily: 'Monospace', fontSize: 16 * scale }}>No Image</div>
                  </div>
                )
                :
                (
                  d.picture ?
                  <img className={classes.slide} style={{ height: window.innerWidth * scale * .45 }}
                    src={
                      isSupportWebp?
                      currentWebURL + d.picture + '.webp'
                      :
                      currentWebURL + d.picture + '.jpg'
                    } />
                  :
                  <div
                    style={{
                      height: window.innerWidth * scale * .45, width: '100%',
                      backgroundColor: grey[300],
                      display: 'flex', flexDirection: 'column', justifyContent: 'space-around'
                    }}>
                    <div style={{ textAlign: 'center', fontWeight: 600, fontFamily: 'Monospace', fontSize: 16 * scale }}>No Image</div>
                  </div>
                )
              }
            </Link>
            <Link to={ page ? `/announce/${pageid + '-' + d.postid}` : `/announce/${d.announceid}`}
              style={{ textDecoration: 'none'}}>
              <div className={classes.label}>{page ? d.message : d.title}</div>
            </Link>
          </div>
        )
        :
        <div style={{
            width: '100%', height: window.innerWidth * scale * .45, maxHeight: 450,
            display: 'flex', flexDirection: 'column', justifyContent: 'space-around',
          }}>
          <div style={{ textAlign: 'center', fontWeight: 600, fontSize: 36, opacity: .7 }}>No announce</div>
        </div>
      }

      </AutoPlaySwipeableViews>
      <Pagination dots={ data ? data.length : 0 } index={index} onChangeIndex={handleChangeIndex} />
      {
        window.innerWidth * scale > 500 * scale && data && data.length > 0 &&
        <IconButton classes={{ root: classes.iconButton }} className={classes.leftArrow} onClick={backHandler}>
          <KeyboardArrowLeftIcon classes={{ root: classes.arrow }}/>
        </IconButton>
      }
      {
        window.innerWidth * scale > 500 * scale && data && data.length > 0 &&
        <IconButton classes={{ root: classes.iconButton }} className={classes.rightArrow} onClick={nextHandler}>
          <KeyboardArrowRightIcon classes={{ root: classes.arrow }}/>
        </IconButton>
      }
    </div>
  );
}

export default Slider;
