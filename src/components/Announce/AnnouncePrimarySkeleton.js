import React from 'react';
import { makeStyles } from '@material-ui/core/styles'
import { primary, grey } from './../../api/palette'

import Skeleton from '@material-ui/lab/Skeleton';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    width: '100%',
    margin: 'auto',
    [theme.breakpoints.up(900)]: {
      width: '70%',
    },
  },
  skeleton: {
    boxSizing: 'border-box',
    margin: 16,
    backgroundColor: grey[300],
    maxHeight: 450
  },

}));

export default function AnnouncePrimarySkeleton(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div>
        <Skeleton
          className={classes.skeleton}
          style={{ height: ( window.innerWidth * .6 - 48), maxHeight: 500, backgroundColor: grey[300] }} />
        <Skeleton
          className={classes.skeleton}
          height={32}
          style={{ backgroundColor: grey[300] }}/>
      </div>
    </div>
  );
}
