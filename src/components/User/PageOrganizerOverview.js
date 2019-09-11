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
    padding: 12,
    boxSizing: 'border-box'
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
  panelButton: {
    marginRight: 16
  },
}));

export default function PageOrganizerOverview(props) {
  const classes = useStyles();
  const { API, BTN, sess, pageData, isSupportWebp } = props
  const [ isFollow, setIsFollow ] = React.useState(false)

  return (
    <div className={classes.root}>
      { pageData &&
        <Paper className={classes.paper}>
          <div className={classes.imageGrid}>
            { pageData.logo ?
              <Avatar className={classes.avatarImage}
                src={API.getPictureUrl(pageData.logo) + ( isSupportWebp? '.webp' : '.jpg' )}/>
              :
              <AccountCircleIcon classes={{ root: classes.avatar }} />
            }
          </div>
          <div className={classes.pageDetailGrid}>
            <div className={classes.pageDetail}>
              <Typography gutterBottom variant="h5" className={classes.pageTitle}>
                {pageData.pagename}
              </Typography>
              <Typography gutterBottom variant="body2" className={classes.followers}>
                {pageData.subscriber} followers
              </Typography>
            </div>
          </div>
        </Paper>
      }
      <Paper className={classes.paper}>
        <BTN.PrimaryOutlined className={classes.panelButton}>Set admin</BTN.PrimaryOutlined>
        <BTN.PrimaryOutlined className={classes.panelButton}>Post</BTN.PrimaryOutlined>
      </Paper>
    </div>
  );
}
