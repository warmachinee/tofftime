import React from 'react';
import Loadable from 'react-loadable';
import { makeStyles, fade } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import teal from '@material-ui/core/colors/teal';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
  },
  title: {
    textAlign: 'center', color: teal[900],
    fontSize: 28,
    [theme.breakpoints.up(500)]: {
      fontSize: 32,
    },
  },
  back: {
    position: 'absolute',
    top: -12,
    left: 8,
    backgroundColor: 'white',
    '&:hover': {
      backgroundColor: fade(teal[600], 0.25),
    },
  },
  backIcon: {
    fontSize: '2rem',
    color: teal[800],
    [theme.breakpoints.up(500)]: {
      fontSize: '2.5rem',
    },
  },
}))

export default function Match(props){
  const classes = useStyles();

  return(
    <div className={classes.root}>
      <IconButton className={classes.back} >
        <ArrowBackIcon classes={{ root: classes.backIcon }}/>
      </IconButton>
      <Typography component="div">
        <Box className={classes.title} fontWeight={600} m={1}>
          Match
        </Box>
      </Typography>
    </div>
  );
}
