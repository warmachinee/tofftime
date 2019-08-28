import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { grey } from './../../api/palette'

import {
  Container,
  Grid,
  Paper,
  Avatar,
  Typography
} from '@material-ui/core';

import {
  AssignmentInd,
  GolfCourse,
} from "@material-ui/icons";

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 400,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    boxSizing: 'border-box',
    margin: 'auto',
    marginTop: 36,
    [theme.breakpoints.up(630)]: {
      margin: theme.spacing(0, 3),
      marginTop: 36,
    },
  },
  paper: {
    padding: theme.spacing(3, 4),
    display: 'flex',
    borderRadius: 0
  },
  statLabel: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  icon: {
    fontSize: 72,
    [theme.breakpoints.down(600)]: {
      fontSize: 48,
      margin: "auto"
    }
  },
  typo: {
    textAlign: 'center',
    color: grey[500]
  },
  valueGrid: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end'
  },
  value: {
    alignSelf: 'center',
  },

}));

export default function Statistics(props) {
  const classes = useStyles();
  const { API, isSupportWebp, accountData, token, setCSRFToken } = props
  const [ data, setData ] = React.useState(null)

  async function handleFetch(){
    const resToken = token? token : await API.xhrGet('getcsrf')
    await API.xhrPost(
      token? token : resToken.token,
      'loadusersystem', {
        action: 'statavg'
    }, (csrf, d) =>{
      setCSRFToken(csrf)
      setData(d)
      console.log(d);
    })
  }

  React.useEffect(()=>{
    handleFetch()
  },[ ])

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <div className={classes.statLabel}>
          <GolfCourse className={classes.icon} />
          <Typography variant="body1" className={classes.typo}>Matches</Typography>
        </div>
        <div className={classes.valueGrid}>
          { data &&
            <Typography variant="h3" classes={{ root: classes.value }}>
              {data.matchcount}
            </Typography>
          }
        </div>
      </Paper>
      <Paper className={classes.paper} style={{ marginTop:  window.innerWidth < 630 ? 8 : 24 }}>
        <div className={classes.statLabel}>
          <AssignmentInd className={classes.icon} />
          <Typography variant="body1" className={classes.typo}>Handicap</Typography>
        </div>
        <div className={classes.valueGrid}>
          { data &&
            <Typography variant="h3" classes={{ root: classes.value }}>
              {data.hc ? data.hc : '0'}
            </Typography>
          }
        </div>
      </Paper>
    </div>
  );
}
