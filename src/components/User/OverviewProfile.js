import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { grey } from './../../api/palette'

import {
  Paper,
  Avatar,
  Typography
} from '@material-ui/core';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  paper: {
    padding: theme.spacing(3, 2),
    margin: 'auto',
    marginTop: 36,
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 0,
    minHeight: 300,
    maxWidth: 450,
    boxSizing: 'border-box'
  },
  imageGrid: {
    margin: 16,
    display: 'flex',
    justifyContent: 'center'
  },
  avatar: {
    fontSize: 150
  },
  avatarImage: {
    width: 150,
    height: 150,
  },
  name: {
    textAlign: 'center'
  },
  email: {
    textAlign: 'center',
    color: grey[400]
  },

}));

export default function OverviewProfile(props) {
  const classes = useStyles();
  const { API, token, setCSRFToken, isSupportWebp, accountData, userid } = props
  const [ data, setData ] = React.useState(null)

  async function handleFetchInfo(){
    const resToken = token? token : await API.xhrGet('getcsrf')
    await API.xhrPost(
      token? token : resToken.token,
      'loadusersystem', {
        action: 'info',
        targetuser: userid
    }, (csrf, d) =>{
      setCSRFToken(csrf)
      setData(d[0])
    })
  }

  React.useEffect(()=>{
    if(userid){
      handleFetchInfo()
    }else{
      setData(accountData)
    }
  },[ props.userid ])

  return (
    <div className={classes.root}>
      { data?
        <Paper className={classes.paper}>
          <div className={classes.imageGrid}>
            { data.photopath ?
              <Avatar className={classes.avatarImage}
                src={API.getPictureUrl(data.photopath) + ( isSupportWebp? '.webp' : '.jpg' ) + '#' + new Date().toISOString()}/>
              :
              <AccountCircleIcon classes={{ root: classes.avatar }} />
            }
          </div>
          <Typography variant="h5" className={classes.name}>
            {data.fullname} {data.lastname}
          </Typography>
          { data.nickname !== '-' ?
            <Typography gutterBottom variant="h6" className={classes.name}>
              ({data.nickname})
            </Typography>
            :
            <div style={{ height: 32 }} />
          }
          { !userid &&
            <Typography gutterBottom variant="subtitle2" className={classes.email}>
              {data.email}
            </Typography>
          }
        </Paper>
        :
        <Paper className={classes.paper}>
          <div className={classes.imageGrid}>
            <AccountCircleIcon classes={{ root: classes.avatar }} />
          </div>
          <Typography variant="h5" className={classes.name}>
            Fullname Lastname
          </Typography>
          <Typography gutterBottom variant="h6" className={classes.name}>
            (Nickname)
          </Typography>
          <Typography gutterBottom variant="subtitle2" className={classes.email}>
            Email
          </Typography>
        </Paper>
      }
    </div>
  );
}
