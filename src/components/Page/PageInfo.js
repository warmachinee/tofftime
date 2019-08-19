import React from 'react';
import Loadable from 'react-loadable';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import * as API from './../../api'
import { primary } from './../../api/palette'

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import { LDCircular } from './../loading/LDMatchList';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2),
    width: '100%'
  },
  grid: {

  },
  title: {
    color: primary[900],
    fontSize: 24,
    fontWeight: 600
  },

}))

export default function PageInfo(props) {
  const classes = useStyles();
  const { sess, token, setCSRFToken, handleSnackBar, isSupportWebp, pageData } = props

  return (
    <Paper className={classes.root}>
      <div>
        <Typography component="div" className={classes.title}>
          { pageData? pageData.pagename : 'Page name'}
        </Typography>
      </div>
    </Paper>
  );
}
