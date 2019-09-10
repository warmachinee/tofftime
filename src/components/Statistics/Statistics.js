import React from 'react';
import clsx from 'clsx';
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
  rootDown: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    boxSizing: 'border-box',
    margin: 'auto',
    marginTop: 36,
    padding: 12
  },
  rootUp: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    boxSizing: 'border-box',
    margin: 'auto',
    marginTop: 36,
    padding: 12
  },
  paper: {
    boxSizing: 'border-box',
    width: '100%',
    padding: theme.spacing(3, 4),
    display: 'flex',
    borderRadius: 0,
    maxWidth: 350
  },
  statLabel: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  icon: {
    fontSize: 72,
    [theme.breakpoints.down(840)]: {
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
  const { API, isSupportWebp, accountData, token, setCSRFToken, open, userid } = props
  const [ data, setData ] = React.useState(null)

  async function handleFetch(){
    const resToken = token? token : await API.xhrGet('getcsrf')
    const sendObj = {
      action: 'statavg'
    }

    if(userid){
      Object.assign(sendObj, { targetuser: userid });
    }

    await API.xhrPost(
      token? token : resToken.token,
      'loadusersystem', {
        ...sendObj
    }, (csrf, d) =>{
      setCSRFToken(csrf)
      setData(d)
    })
  }

  React.useEffect(()=>{
    handleFetch()
  },[ props.userid ])

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
    <div
      className={clsx({
        [classes.rootDown]: open ? window.innerWidth < 790 : window.innerWidth < 550 ,
        [classes.rootUp]: !( open ? window.innerWidth < 790 : window.innerWidth < 550 )
      })}
      style={{
        ...( open ? window.innerWidth >= 1090 : window.innerWidth >= 850 )?
        {justifyContent: 'center' } : {justifyContent: 'space-between' } }}>
      <Paper className={classes.paper}
        style={{
          ...!( open ? window.innerWidth >= 790 : window.innerWidth >= 550 )?
          { marginLeft: 'auto', marginRight: 'auto' } : null,
        }}>
        <div className={classes.statLabel}>
          <GolfCourse className={classes.icon} />
          <Typography variant="body1" className={classes.typo}>Matches</Typography>
        </div>
        <div className={classes.valueGrid}>
          { data &&
            <Typography variant="h3" classes={{ root: classes.value }}>
              {/*data.matchcount ? data.matchcount : '-'*/}
              {data.matchcount}
            </Typography>
          }
        </div>
      </Paper>
      <Paper className={classes.paper}
        style={{
          ...( open ? window.innerWidth >= 790 : window.innerWidth >= 550 )?
          { marginLeft: 24 } : { marginTop: 16 },
          ...!( open ? window.innerWidth >= 790 : window.innerWidth >= 550 )?
          { marginLeft: 'auto', marginRight: 'auto' } : null,
        }}>
        <div className={classes.statLabel}>
          <AssignmentInd className={classes.icon} />
          <Typography variant="body1" className={classes.typo}>Handicap</Typography>
        </div>
        <div className={classes.valueGrid}>
          { data &&
            <Typography variant="h3" classes={{ root: classes.value }}>
              { data.hc ? data.hc.toFixed(2) : '-' }
            </Typography>
          }
        </div>
      </Paper>
    </div>
  );
}
