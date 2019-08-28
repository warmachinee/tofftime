import React from 'react';
import { makeStyles } from '@material-ui/core/styles'
import { primary, grey } from './../../api/palette'

import {
  Paper, Box, Typography,
} from '@material-ui/core';

import Skeleton from '@material-ui/lab/Skeleton';

import LocationOnIcon from '@material-ui/icons/LocationOn';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginBottom: 24,
    marginRight: 4,
    [theme.breakpoints.up(600)]: {
      width: 300,
    },
  },
  box: {
    padding: theme.spacing(1.5)
  },
  image: {
    width: '100%',
    height: 160,
    backgroundColor: grey[300],
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    objectFit: 'cover',
    cursor: 'pointer',
  },
  title: {
    position: 'relative',
    display: '-webkit-box',
    overflow: 'hidden',
    whiteSpace: 'normal',
    textOverflow: 'ellipsis',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 2,
    lineHeight: 1.4,
    cursor: 'pointer',
    fontWeight: 600
  },
  location: {
    position: 'relative',
    display: '-webkit-box',
    overflow: 'hidden',
    whiteSpace: 'normal',
    textOverflow: 'ellipsis',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 2,
    lineHeight: 1.4,
    cursor: 'pointer',
    fontSize: 13
  },
  locationIcon: {
    position: 'relative',
    color: primary[600],
    top: 4,
    left: -4
  },

}));


export default function OrganizerMatchCard(props) {
  const classes = useStyles();
  const { data } = props
  const [ paperHover, setPaperHover ] = React.useState(0)

  return(
    <Paper
      onClick={()=>console.log(data)}
      className={classes.root}
      elevation={window.innerWidth >= 600 ? paperHover : 1}
      onMouseEnter={()=>setPaperHover(3)}
      onMouseLeave={()=>setPaperHover(0)}>
      <img src={data.pic} className={classes.image} />
      <Box className={classes.box}>
        <Typography gutterBottom variant="body1" className={classes.title}>
          {data.title}
        </Typography>
        <Typography gutterBottom display="block" variant="caption" className={classes.location}>
          <LocationOnIcon fontSize="small" className={classes.locationIcon}/>
          {data.location}
        </Typography>
        <Typography variant="caption" color="textSecondary">
          {`${data.views + 'views'} • ${data.date}`}
        </Typography>
      </Box>
    </Paper>
  );
}
