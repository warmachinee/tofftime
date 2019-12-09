import React from 'react';
import socketIOClient from 'socket.io-client'
import Loadable from 'react-loadable';
import { makeStyles } from '@material-ui/core/styles';

import {
  Button,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Typography,
  Box,
  Menu,

} from '@material-ui/core'

import {
  AccountCircle,

} from '@material-ui/icons';

const LabelText = Loadable({
  loader: () => import(/* webpackChunkName: "LabelText" */ './../Utils/LabelText'),
  loading: () => null
});

const TemplateDialog = Loadable({
  loader: () => import(/* webpackChunkName: "TemplateDialog" */ './../Utils/Dialog/TemplateDialog'),
  loading: () => null
});

const NotiOverview = Loadable({
  loader: () => import(/* webpackChunkName: "NotiOverview" */ './NotiOverview'),
  loading: () => null
});

const useStyles = makeStyles(theme => ({
  root: {
    
  },
  avatar: {
    fontSize: 64
  },
  avatarImage: {
    width: 64,
    height: 64,
  },

}));

export default function NotificationsDialog(props) {
  const classes = useStyles();
  const { API, sess, notiState, toggleNoti, notiData } = props

  return (
    <TemplateDialog maxWidth="sm" maxHeight="100%" open={notiState} handleClose={toggleNoti}
      title={<LabelText text={ API._getWord(sess && sess.language).Notifications } />}>
      <div className={classes.root}>
        <List>
          { notiData &&
            notiData.map( d => <ListNotiItem key={d.createdate} {...props} data={d} />)
          }
          { notiData && notiData.length === 0 &&
            <ListItem style={{ marginTop: 24 }}>
              <div style={{
                  width: '100%', padding: '36px 0', textAlign: 'center',
                  fontSize: 24, fontWeight: 600, borderRadius: 4, border: '1px solid', boxSizing: 'border-box' }}>No notification</div>
            </ListItem>
          }
        </List>
      </div>
    </TemplateDialog>
  );
}

function ListNotiItem(props) {
  const classes = useStyles();
  const { API, BTN, COLOR, sess, token, setCSRFToken, isSupportWebp, handleSnackBar, data, setNotiData } = props
  const [ anchorEl, setAnchorEl ] = React.useState(null);

  function handleMenuClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  function getNotiLabel(action, type){
    switch (true) {
      case type === 'friend' && action === 'add':
        return API._getWord(sess && sess.language).Friend_request
        break;
      case type === 'friend' && action === 'accept':
        return API._getWord(sess && sess.language)['Accepted your friend request']
        break;
      case type === 'match' && action === 'join':
        return API._getWord(sess && sess.language)['Match join request']
        break;
      case type === 'match' && action === 'invite':
        return API._getWord(sess && sess.language)['Match invite request']
        break;
      case type === 'match' && action === 'accept':
        return API._getWord(sess && sess.language).Joined_match
        break;
      case type === 'match' && action === 'acceptfrominvite':
        return API._getWord(sess && sess.language).Joined_match
        break;
      default:

    }
  }

  function getNotiButton(){
    switch (true) {
      case data.type === 'friend' && data.action === 'add':
        return(
          <React.Fragment>
            <BTN.Primary
              style={{ padding: '4px 12px' }}
              onClick={()=>handleConfirmFriend(data.fromdetail.userid, 'accept')}>
              { API._getWord(sess && sess.language).Confirm }
            </BTN.Primary>
            <BTN.PrimaryText
              style={{ padding: '4px 12px' }}
              onClick={()=>handleConfirmFriend(data.fromdetail.userid, 'reject')}>
              { API._getWord(sess && sess.language).Delete }
            </BTN.PrimaryText>
          </React.Fragment>
        )
        break;
      case data.type === 'friend' && data.action === 'accept':
        return null
        break;
      case data.type === 'match' && data.action === 'join':
        return (
          <React.Fragment>
            <BTN.Primary
              style={{ padding: '4px 12px', marginTop: 16 }}
              onClick={()=>handleJoinMatch(data.fromdetail.userid, 'accept', 'host')}>
              { API._getWord(sess && sess.language).Accept }
            </BTN.Primary>
            <BTN.PrimaryText
              style={{ padding: '4px 12px', marginTop: 16 }}
              onClick={()=>handleJoinMatch(data.fromdetail.userid, 'reject', 'host')}>
              { API._getWord(sess && sess.language).Reject }
            </BTN.PrimaryText>
          </React.Fragment>
        )
        break;
      case data.type === 'match' && data.action === 'invite':
        return (
          <React.Fragment>
            <BTN.Primary
              style={{ padding: '4px 12px', marginTop: 16 }}
              onClick={()=>handleJoinMatch(data.fromdetail.userid, 'acceptfrominvite', 'target')}>
              { API._getWord(sess && sess.language).Join }
            </BTN.Primary>
            <BTN.PrimaryText
              style={{ padding: '4px 12px', marginTop: 16 }}
              onClick={()=>handleJoinMatch(data.fromdetail.userid, 'reject', 'target')}>
              { API._getWord(sess && sess.language).Reject }
            </BTN.PrimaryText>
          </React.Fragment>
        )
        break;
      case data.type === 'match' && data.action === 'accept':
        return null
        break;
      case data.type === 'match' && data.action === 'acceptfrominvite':
        return null
        break;
      default:
        return null
    }
  }

  function handleJoinMatch(userid, action, side){
    if(sess){
      const socket = socketIOClient( API._getWebURL(), { transports: ['websocket', 'polling'] } )
      socket.emit('match-request-client-message', {
        action: 'confirm',
        matchid: data.typeid,
        userid: side === 'host' ? [ sess.userid, userid ] : [ userid, sess.userid ],
        confirmaction: action
      })
      setTimeout(()=>{
        handleFetchNotifications()
      },1000)
    }
  }

  function handleConfirmFriend(userid, action){
    if(sess){
      const socket = socketIOClient( API._getWebURL(), { transports: ['websocket', 'polling'] } )
      socket.emit('friend-client-message', {
        action: 'confirm',
        userid: sess.userid,
        targetid: userid,
        useraction: action
      })
      setTimeout(()=>{
        handleFetchNotifications()
      },1000)
    }
  }

  async function handleFetchNotifications(){
    const resToken = token? token : await API._xhrGet('getcsrf')
    await API._xhrPost(
      token? token : resToken.token,
      'loadusersystem', {
        action: 'notification'
    }, (csrf, d) =>{
      setCSRFToken(csrf)
      setNotiData(d)
    })
  }

  return data && (
    <React.Fragment>
      <ListItem>
        <ListItemIcon>
          { data.fromdetail.photopath ?
            <Avatar
              style={{ transition: '.2s' }}
              className={classes.avatarImage}
              src={API._getPictureUrl(data.fromdetail.photopath) + ( isSupportWebp? '.webp' : '.jpg' ) + '#' + new Date().toISOString()} />
            :
            <AccountCircle
              style={{ color: COLOR.grey[900] }}
              className={classes.avatar} />
          }
        </ListItemIcon>
        <ListItemText
          style={{ marginLeft: 16 }}
          primary={
            <React.Fragment>
              {/*onClick={handleMenuClick}*/}
              <Typography variant="body1" component="div">
                {data.fromdetail.fullname} {data.fromdetail.lastname}
                <div style={{ width: 16 }} />
                { data.fromdetail.nickname !== '-' && `(${data.fromdetail.nickname})` }
              </Typography>
              <Typography variant="subtitle2" color="textSecondary">
                {getNotiLabel(data.action, data.type)}
              </Typography>
              <Typography variant="caption" color="textSecondary">
                {API._getPostTime(data.createdate)}
              </Typography>
            </React.Fragment>
          }
          secondary={
            <React.Fragment>
              { window.innerWidth < 600 &&
                getNotiButton()
              }
            </React.Fragment>
          } />
        { window.innerWidth >= 600 &&
          <ListItemIcon>
            {
              getNotiButton() ?
              getNotiButton()
              :
              <div />
            }
          </ListItemIcon>
        }
      </ListItem>
      <Divider />
      <NotiOverview
        {...props}
        anchorEl={anchorEl}
        handleClose={handleClose} />
    </React.Fragment>
  );
}
