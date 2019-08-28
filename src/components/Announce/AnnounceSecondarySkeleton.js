import React from 'react';
import Loadable from 'react-loadable';
import { makeStyles } from '@material-ui/core/styles'
import * as API from './../../api'
import { primary, grey } from './../../api/palette'

import Skeleton from '@material-ui/lab/Skeleton';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    WebkitFlexDirection: 'column',
    justifyContent: 'space-between',
    [theme.breakpoints.up(500)]: {
      flexDirection: 'row',
      WebkitFlexDirection: 'row',
      width: '100%',
    },
    [theme.breakpoints.up(900)]: {
      flexDirection: 'column',
      WebkitFlexDirection: 'column',
      width: '30%',
    },
  },
  itemGrid: {
    position: 'relative',
    boxSizing: 'border-box',
    width: '100%',
    padding: theme.spacing(1, 0),
    height: window.innerWidth * .3,
    [theme.breakpoints.up(500)]: {
      padding: theme.spacing(2, 0),
    },
    [theme.breakpoints.up(900)]: {
      height: '100%',
      padding: theme.spacing(0, 2),
    },
  },
  skeleton: {
    boxSizing: 'border-box',
    height: '100%',
    width: '100%',
    backgroundColor: grey[300],
    margin: 0
  },

}));

export default function AnnounceSecondarySkeleton(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.itemGrid}
        style={{
          marginBottom: window.innerWidth >= 900? 24 : 0,
          marginRight: window.innerWidth >= 900? 0 : 24,
        }}>
        <Skeleton className={classes.skeleton} />
      </div>
      <div className={classes.itemGrid}>
        <Skeleton className={classes.skeleton} />
      </div>
    </div>
  );
}
