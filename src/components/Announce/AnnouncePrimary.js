import React from 'react';
import Loadable from 'react-loadable';
import { makeStyles, fade } from '@material-ui/core/styles'
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import { primary, grey } from './../../api/palette'

import {
  Paper, Grid, Hidden, IconButton,
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
    [theme.breakpoints.up(900)]: {
      width: '70%',
    },
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  sliderItem: {
    maxHeight: 500,
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

export default function AnnouncePrimary(props) {
  const classes = useStyles();
  const { API, BTN, isSupportWebp, data } = props
  const [ index, setIndex ] = React.useState(0)

  //const [ data, setData ] = React.useState(null)

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

  async function fetchJsonPlaceholder(){
    /*
    const res = await fetch('https://jsonplaceholder.typicode.com/photos')
    const json = await res.json()
    */

    const d = [
      {
        id: 1,
        title: 'Sanford International Golf Tournament 15-17 Dec. 2019',
        pic: 'https://i.ytimg.com/vi/7aZotHcV6HQ/maxresdefault.jpg'
      },
      {
        id: 2,
        title: 'Rory brings the fight, wins the FedExCup McIlroy becomes the second player to earn multiple FedExCup titles',
        pic: 'https://pga-tour-res.cloudinary.com/image/upload/c_fill,f_auto,g_center,q_auto,w_1320/v1/pgatour/editorial/2019/08/25/mcilroy-trophy-1320-samgreenwood.jpg'
      },
      {
        id: 3,
        title: 'Brooks, Xander, JT come up short to Rory',
        pic: 'https://pga-tour-res.cloudinary.com/image/upload/c_fill,f_auto,g_center,h_478,q_auto,w_850/v1/pgatour/editorial/2019/08/25/koepka-847-streeterlecka.jpg'
      },
      {
        id: 4,
        title: 'Winner\'s bag: Rory McIlroy, TOUR Championship',
        pic: 'https://pga-tour-res.cloudinary.com/image/upload/c_fill,f_auto,g_center,h_478,q_auto,w_850/v1/pgatour/editorial/2019/08/25/mcilroy-witb-847-streeterlecka.jpg'
      },
      {
        id: 5,
        title: 'BMW continuing title sponsorship of BMW Championship',
        pic: 'https://pga-tour-res.cloudinary.com/image/upload/c_limit,q_auto,w_308/v1/pgatour/editorial/2019/08/16/bmwchampionship-847-stanbadz.jpg'
      },
    ]
    setData(d)
  }

  React.useEffect(()=>{
    //console.log(props);
    //fetchJsonPlaceholder()
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
        { data?
          data.map(d =>
            <div key={d.announceid}>
              <BTN.NoStyleLink to={`/announce/${d.announceid}`}>
                { d.picture ?
                  <img className={classes.sliderItem} style={{ height: window.innerWidth * .6 }}
                    src={API.getPictureUrl(d.picture) + ( isSupportWebp? '.webp' : '.jpg' )} />
                  :
                  <Skeleton
                    className={classes.skeleton}
                    style={{ height: ( window.innerWidth * .6 - 48), maxHeight: 500, backgroundColor: grey[300] }} />
                }
              </BTN.NoStyleLink>
              <BTN.NoStyleLink to={`/announce/${d.announceid}`}>
                <div className={classes.label} onClick={()=>console.log(data)}>{d.title}</div>
              </BTN.NoStyleLink>
            </div>
          )
          :
          <div>
            <Skeleton
              className={classes.skeleton}
              style={{ height: ( window.innerWidth * .6 - 48), maxHeight: 500, backgroundColor: grey[300] }} />
            <Skeleton
              className={classes.skeleton}
              height={32}
              style={{ backgroundColor: grey[300] }}/>
          </div>
        }
      </AutoPlaySwipeableViews>
      { data && data.length > 1 &&
        <Pagination dots={data.length} index={index} onChangeIndex={handleChangeIndex} />
      }
      {
        window.innerWidth > 500 && data && data.length > 1 &&
        <IconButton classes={{ root: classes.iconButton }} className={classes.leftArrow} onClick={backHandler}>
          <KeyboardArrowLeft classes={{ root: classes.arrow }}/>
        </IconButton>
      }
      {
        window.innerWidth > 500  && data && data.length > 1 &&
        <IconButton classes={{ root: classes.iconButton }} className={classes.rightArrow} onClick={nextHandler}>
          <KeyboardArrowRight classes={{ root: classes.arrow }}/>
        </IconButton>
      }
    </div>
  );
}
