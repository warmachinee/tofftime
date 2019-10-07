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
  const { API, BTN, sess, token, setCSRFToken, isSupportWebp, pageid } = props
  const [ isFollow, setIsFollow ] = React.useState(false)
  const [ data, setData ] = React.useState(null)

  async function handleToggleFollow(){
    const resToken = token? token : await API.xhrGet('getcsrf')
    await API.xhrPost(
      token? token : resToken.token,
      'uusersystem' , {
        action: 'pagefollow',
        pageid: pageid,
    }, function(csrf, d){
      setCSRFToken(csrf)
    })
    await handleFetch()
  }

  async function handleFetch(){
    const resToken = token? token : await API.xhrGet('getcsrf')
    await API.xhrPost(
      token? token : resToken.token,
      ( sess && sess.status === 1 ) ? 'ploadpage' : 'mloadpage' , {
        action: 'detail',
        pageid: pageid,
    }, function(csrf, d){
      setCSRFToken(csrf)
      setData(d[0])
      if(d[1].subscribe){
        setIsFollow(true)
      }else{
        setIsFollow(false)
      }
    })
  }

  React.useEffect(()=>{
    handleFetch()
  },[ sess ])

  return (
    <div className={classes.root}>
      { data &&
        <Paper className={classes.paper}>
          <div className={classes.imageGrid}>
            { data.logo ?
              <Avatar className={classes.avatarImage}
                src={API.getPictureUrl(data.logo) + ( isSupportWebp? '.webp' : '.jpg' )} />
              :
              <AccountCircleIcon classes={{ root: classes.avatar }} />
            }
          </div>
          <div className={classes.pageDetailGrid}>
            <div className={classes.pageDetail}>
              <Typography gutterBottom variant="h5" className={classes.pageTitle}>
                {data.pagename}
              </Typography>
              <Typography gutterBottom variant="body2" className={classes.followers}>
                {data.subscriber} { (
                  ( sess && sess.language === 'TH' ) ? "ผู้ติดตาม" : 'follower'
                ) + ( data.subscriber > 1 ? ( ( sess && sess.language === 'TH' ) ? '' : 's' ) : '')}
              </Typography>
            </div>
          </div>
          { data && sess && ( data.hostid !== sess.userid ) &&
            <div className={classes.followButton}>
              { ( sess.status !== 1 )?
                <BTN.NoStyleLink to="/login">
                  <BTN.Primary size="large">
                    { ( sess && sess.language === 'TH' ) ? "ติดตาม" : 'Follow' }
                    <div style={{ marginLeft: 12 }}>
                      {data.subscriber}
                    </div>
                  </BTN.Primary>
                </BTN.NoStyleLink>
                :
                <React.Fragment>
                  { isFollow ?
                    <BTN.Following size="large" onClick={handleToggleFollow}>
                      { ( sess && sess.language === 'TH' ) ? "กำลังติดตาม" : 'Following' }
                    </BTN.Following>
                    :
                    <BTN.Primary size="large"
                      onClick={handleToggleFollow}>
                      { ( sess && sess.language === 'TH' ) ? "ติดตาม" : 'Follow' }
                      <div style={{ marginLeft: 12 }}>
                        {data.subscriber}
                      </div>
                    </BTN.Primary>
                  }
                </React.Fragment>
              }
            </div>
          }
        </Paper>
      }
    </div>
  );
}
