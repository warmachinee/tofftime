import React from 'react';
import Loadable from 'react-loadable';
import { makeStyles } from '@material-ui/core/styles'
import { primary, grey } from './../../api/palette'

import {
  Box, Typography, Paper
} from '@material-ui/core';

import Skeleton from '@material-ui/lab/Skeleton';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    margin: theme.spacing(1.5, 0),
    marginRight: theme.spacing(1),
    display: 'flex',
    boxSizing: 'border-box',
    transition: '.2s',
    flexDirection: 'column',
    WebkitFlexDirection: 'column',
    [theme.breakpoints.up(600)]: {
      flexDirection: 'row',
      WebkitFlexDirection: 'row',
      maxHeight: 300,
      height: window.innerWidth * .25,
    },
    [theme.breakpoints.up(1000)]: {
      maxHeight: 300,
      height: window.innerWidth * .2,
    },
  },
  box: {
    width: '100%',
    padding: theme.spacing(1.5, 0),
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(1.5),
    overflow: 'hidden',
    boxSizing: 'border-box',
    [theme.breakpoints.up(600)]: {
      width: '50%',
    },
  },
  imageGrid: {
    width: '100%',
    [theme.breakpoints.up(600)]: {
      width: '50%',
    },
  },
  image: {
    width: '100%',
    height: '100%',
    backgroundColor: grey[300],
    marginRight: theme.spacing(1.5),
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    objectFit: 'cover',
    cursor: 'pointer',
  },
  title: {
    display: '-webkit-box',
    overflow: 'hidden',
    whiteSpace: 'normal',
    textOverflow: 'ellipsis',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 2,
    lineHeight: 1.4,
    cursor: 'pointer'
  },
  date: {
    cursor: 'pointer'
  },
  subtitle: {
    display: '-webkit-box',
    overflow: 'hidden',
    whiteSpace: 'normal',
    textOverflow: 'ellipsis',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 2,
    lineHeight: 1.4,
    cursor: 'pointer',
    [theme.breakpoints.up(600)]: {
      WebkitLineClamp: 3,
    },
    [theme.breakpoints.up(720)]: {
      WebkitLineClamp: 4,
    },
    [theme.breakpoints.up(1000)]: {
      WebkitLineClamp: 5,
    },
  },
  skeleton: {
    boxSizing: 'border-box',
    backgroundColor: grey[300],
    margin: 0
  }
}));

export default function OrganizerNewsCard(props) {
  const classes = useStyles();
  const { API, BTN, isSupportWebp, data, loading } = props
  const [ paperHover, setPaperHover ] = React.useState(0)
  const [ pictureURL, setPictureURL ] = React.useState(data ? data.picture : null)
  
  return(
    <Paper
      className={classes.root}
      elevation={window.innerWidth >= 600 ? paperHover : 1}
      onMouseEnter={()=>setPaperHover(3)}
      onMouseLeave={()=>setPaperHover(0)}>
      <div className={classes.imageGrid}>
        { ( !loading && pictureURL ) ?
          <BTN.NoStyleLink to={`/news/${data.newsid}`}>
            {
              /*
              <img
                className={classes.image}
                src={API.getPictureUrl(pictureURL) + ( isSupportWebp? '.webp' : '.jpg' )}
                onError={()=>setPictureURL(null)} />*/
            }
            <img
              className={classes.image}
              src={pictureURL} />
          </BTN.NoStyleLink>
          :
          <Skeleton className={classes.skeleton} style={{ width: '100%', height: window.innerWidth >= 600 ? '100%' : 200 }}/>
        }
      </div>
      <Box className={classes.box}>
        { !loading ?
          <BTN.NoStyleLink to={`/news/${data.newsid}`}>
            <Typography gutterBottom variant="h6" className={classes.title}>
              {data.title}
            </Typography>
            <Typography gutterBottom display="block" variant="caption" color="textSecondary" className={classes.date}>
              { API.handleGetDate(data.createdate)}
            </Typography>
            <Typography variant="body2" color="textSecondary" className={classes.subtitle}>
              {data.subtitle}
            </Typography>
          </BTN.NoStyleLink>
          :
          <React.Fragment>
            <Skeleton width="100%" height={28}/>
            <Skeleton width="20%" height={14}/>
            <Skeleton width="70%"/>
            <Skeleton width="90%"/>
            <Skeleton width="90%"/>
          </React.Fragment>
        }
      </Box>
    </Paper>
  );
}
