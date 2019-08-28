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
    maxWidth: 400,
    margin: 'auto',
    minHeight: 'auto',
    [theme.breakpoints.up(630)]: {
      margin: theme.spacing(0, 3),
      minHeight: 300,
    },
  },
  paper: {
    padding: theme.spacing(3, 2),
    marginTop: 36,
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 0
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
  const { API, isSupportWebp, accountData } = props

  React.useEffect(()=>{
    //console.log(props.accountData);
  },[ ])

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <div className={classes.imageGrid}>
          { accountData.photopath ?
            /*
            <Avatar className={classes.avatarImage}
              src={API.getPictureUrl(accountData.photopath) + ( isSupportWebp? '.webp' : '.jpg' )}/>*/
            <Avatar className={classes.avatarImage}
              src={API.getPictureUrl(accountData.photopath) + ( '.jpg' )}/>
            :
            <AccountCircleIcon classes={{ root: classes.avatar }} />
          }
        </div>
        <Typography variant="h5" className={classes.name}>
          {accountData.fullname} {accountData.lastname}
        </Typography>
        { accountData.nickname !== '-' &&
          <Typography gutterBottom variant="h6" className={classes.name}>
            ({accountData.nickname})
          </Typography>
        }
        <Typography gutterBottom variant="subtitle2" className={classes.email}>
          {accountData.email}
        </Typography>
      </Paper>
    </div>
  );
}
