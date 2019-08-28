import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { grey } from './../../api/palette'

import {
  Paper,
  Avatar,
  Typography,
  Button
} from '@material-ui/core';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    maxWidth: 1200,
    width: '100%',
    margin: 'auto',
  },
  paper: {
    marginTop: 16,
    padding: theme.spacing(2),
    display: 'flex',
    borderRadius: 0
  },
  imageGrid: {
    margin: 12,
    display: 'flex',
    justifyContent: 'center'
  },
  avatar: {
    fontSize: 120
  },
  avatarImage: {
    width: 120,
    height: 120,
  },
  pageDetailGrid: {
    display: 'flex',
    flexGrow: 1,
    alignSelf: 'center',
    flexWrap: 'wrap',
    WebkitFlexWrap: 'wrap',
    boxSizing: 'border-box',
    justifyContent: 'space-between',
  },
  pageDetail: {
    marginLeft: 8,
  },
  pageTitle: {

  },
  followers: {
    color: grey[500]
  },
  followButton: {
    marginRight: 8,
    marginTop: 16
  },

}));

export default function OrganizerOverview(props) {
  const classes = useStyles();
  const { BTN, sess } = props
  const [ isFollow, setIsFollow ] = React.useState(false)

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <div className={classes.imageGrid}>
          { true ?
            /*
            <Avatar className={classes.avatarImage}
              src={API.getPictureUrl(accountData.photopath) + ( isSupportWebp? '.webp' : '.jpg' )}/>*/
            <Avatar className={classes.avatarImage}
              src="https://singhaelitegolf.com/wp-content/uploads/2014/03/SINGHA-Logo.jpg"/>
            :
            <AccountCircleIcon classes={{ root: classes.avatar }} />
          }
        </div>
        <div className={classes.pageDetailGrid}>
          <div className={classes.pageDetail}>
            <Typography gutterBottom variant="h5" className={classes.pageTitle}>
              SINGHA Golf Club
            </Typography>
            <Typography gutterBottom variant="body2" className={classes.followers}>
              3000 followers
            </Typography>
          </div>
          <div className={classes.followButton}>
            { isFollow ?
              <BTN.Following size="large" onClick={()=>setIsFollow(!isFollow)}>Following</BTN.Following>
              :
              <BTN.Primary size="large" onClick={()=>setIsFollow(!isFollow)}>Follow<div style={{ marginLeft: 12 }}>3000</div></BTN.Primary>
            }
          </div>
        </div>
      </Paper>
    </div>
  );
}
