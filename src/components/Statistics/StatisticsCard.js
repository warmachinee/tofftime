import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { primary, grey } from './../../api/palette'

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import GolfCourseIcon from '@material-ui/icons/GolfCourse';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';

const useStyles = makeStyles(theme => ({
  paper: {
    width: '100%',
    borderRadius: 2,
    padding: theme.spacing(3, 1),
    [theme.breakpoints.up(500)]: {
      maxWidth: 300,
      width: window.innerWidth * .4
    }
  },
  icon: {
    color: primary[700],
    fontSize: 40,
    margin: "auto",
    [theme.breakpoints.up(600)]: {
      fontSize: 64,
    }
  },
  typo: {
    width: '60%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  label: {
    color: primary[600],
    textAlign: 'center',
    fontSize: 16,
    [theme.breakpoints.up(600)]: {
      fontSize: 20,
    }
  },
  value: {
    color: primary[900],
    fontWeight: 600,
    fontSize: 32,
    textAlign: 'right',
    [theme.breakpoints.up(600)]: {
      fontSize: 48,
    }
  },

}));

export default function StatisticsCard(props) {
  const classes = useStyles();
  const { data, type } = props
  
  return (
    <Paper className={classes.paper}>
      <div style={{ display: 'flex' }}>
        <div style={{ display: 'flex', flexDirection: 'column', width: '40%' }}>
          { type === 'match'?
            <PlayCircleFilledIcon className={classes.icon} />
            :
            <GolfCourseIcon className={classes.icon} />
          }
          <Typography className={classes.label}>
            { type === 'match'?  'Matches' : 'Handicap' }
          </Typography>
        </div>
        <Typography component="div" className={classes.typo}>
          <Box className={classes.value}>
            { data && type === 'match'?  ( data && data.matchcount ) :( data && data.hc? data.hc : '0' ) }
          </Box>
        </Typography>
      </div>
    </Paper>
  );
}
