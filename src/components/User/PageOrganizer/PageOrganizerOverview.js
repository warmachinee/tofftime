import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { grey } from './../../../api/palette'

import {
  Paper,
  Avatar,
  Typography,
  Button
} from '@material-ui/core';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import {
  AddCircle,

} from '@material-ui/icons';

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
    justifyContent: 'center',
    cursor: 'pointer'
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
    cursor: 'pointer'
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
  const { API, BTN, sess, pageData, isSupportWebp, toggleSetAdmin, toggleCreatePost } = props
  const [ isFollow, setIsFollow ] = React.useState(false)

  return (
    <div className={classes.root}>
      { pageData &&
        <Paper className={classes.paper}>
          <BTN.NoStyleLink to={`/page/${pageData.pageid}`}>

          </BTN.NoStyleLink>
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
              <BTN.NoStyleLink to={`/page/${pageData.pageid}`}>
                <Typography gutterBottom variant="h5" className={classes.pageTitle}>
                  {pageData.pagename}
                </Typography>
              </BTN.NoStyleLink>
              <Typography gutterBottom variant="body2" className={classes.followers}>
                {pageData.subscriber} { 'follower' + ( pageData.subscriber > 1 ? 's' : '')}
              </Typography>
            </div>
          </div>
        </Paper>
      }
      <Paper className={classes.paper}>
        <BTN.Red className={classes.panelButton} style={{ paddingRight: 16 }} onClick={toggleCreatePost}>
          <AddCircle style={{ marginLeft: 4, marginRight: 8 }}/>
          Post
        </BTN.Red>
        <BTN.PrimaryOutlined className={classes.panelButton} onClick={toggleSetAdmin}>Set admin</BTN.PrimaryOutlined>
      </Paper>
    </div>
  );
}
