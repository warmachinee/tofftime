import React from 'react';
import socketIOClient from 'socket.io-client'
import Loadable from 'react-loadable';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Typography,
  Collapse,
  Tooltip,

} from '@material-ui/core'

import {
  AccountCircle,
  ExpandLess,
  ExpandMore,
  Search,

} from '@material-ui/icons';

const TemplateDialog = Loadable({
  loader: () => import(/* webpackChunkName: "TemplateDialog" */'./../../Utils/Dialog/TemplateDialog'),
  loading: () => null
});

const AddFriend = Loadable({
  loader: () => import(/* webpackChunkName: "AddFriend" */'./../AddFriend'),
  loading: () => null
});

const UserOverview = Loadable({
  loader: () => import(/* webpackChunkName: "UserOverview" */'./../UserOverview'),
  loading: () => null
});

const useStyles = makeStyles(theme => ({
  avatar: {
    fontSize: 36
  },
  avatarImage: {
    width: 36,
    height: 36,
  },
  listTitle: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
  name: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },

}));

export default function ListFriend(props) {
  const classes = useStyles();
  const {
    API, BTN, COLOR, isSupportWebp, token, setCSRFToken, sess, handleSess,
    state, expanded, handleExpand, toggleAddFriend, handleAddFriendClose, addFriendState
  } = props
  const [ data, setData ] = React.useState(null)
  const [ open, setOpen ] = React.useState(false)

  function handleClickAddFriend(){
    toggleAddFriend()
    /*
    if(window.innerWidth <= 600){
      props.setOpen(false)
    }*/
  }

  async function handleFetch(){
    const resToken = token? token : await API._xhrGet('getcsrf')
    await API._xhrPost(
      token? token : resToken.token,
      'loadusersystem', {
        action: 'friend',
        fstatus: 'friend'
    }, (csrf, d) =>{
      setCSRFToken(csrf)
      setData(d)
    })
  }

  React.useEffect(()=>{
    handleFetch()
  },[ props.addFriendState, props.notiState ])

  return (
    <React.Fragment>
      <Divider />
      <List>
        <ListItem button
          onClick={()=>( data && data.length > 0 ) ? handleExpand('friend') : handleClickAddFriend()}>
          { ( data && data.length > 0 ) ?
            <ListItemIcon>
              { expanded.friend ? <ExpandLess /> : <ExpandMore /> }
            </ListItemIcon>
            :
            <Tooltip title={ API._getWord(sess && sess.language).Search_Friend } placement="right">
              <ListItemIcon>
                <Search />
              </ListItemIcon>
            </Tooltip>

          }
          <ListItemText
            primary={
              ( data && data.length > 0 ) ?
              ( API._getWord(sess && sess.language).Friend )
              :
              ( API._getWord(sess && sess.language).Add_friend )
            } />
        </ListItem>
      </List>
      <Collapse in={state} timeout="auto" style={{ minHeight: 'auto' }}>
        <List component="div" disablePadding>
          { data && data.length > 0 &&
            <ListItem button
              onClick={()=>handleClickAddFriend()}>
              <Tooltip title={ API._getWord(sess && sess.language).Search_Friend } placement="right">
                <ListItemIcon>
                  <Search />
                </ListItemIcon>
              </Tooltip>
              <ListItemText primary={ API._getWord(sess && sess.language).Add_friend } />
            </ListItem>
          }
          { data &&
            data.map( d =>
              <ListFriendItem key={d.userid} data={d} {...props} handleAddFriendClose={handleAddFriendClose} setData={setData} />
            )
          }
        </List>
      </Collapse>
      <TemplateDialog open={addFriendState} handleClose={handleAddFriendClose}>
        <AddFriend {...props} handleAddFriendClose={handleAddFriendClose} />
      </TemplateDialog>
    </React.Fragment>
  )
}

function ListFriendItem(props) {
  const classes = useStyles();
  const { API, BTN, COLOR, sess, token, setCSRFToken, isSupportWebp, handleSnackBar, data, setData } = props
  const [ anchorEl, setAnchorEl ] = React.useState(null);

  function handleMenuClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  function handleFriend(userid, action){
    if(sess){
      responseConfirmFriend(sess.userid, userid)
      setTimeout(()=>{
        const socket = socketIOClient( API._getWebURL(), { transports: ['websocket', 'polling'] } )
        socket.emit('friend-client-message', {
          action: action,
          userid: sess.userid,
          targetid: userid
        })
      },1000)
    }
  }

  function responseConfirmFriend(sessid, targetid){
    if(sessid && targetid){
      const socket = socketIOClient( API._getWebURL(), { transports: ['websocket', 'polling'] } )
      socket.on(`${sessid}-${targetid}-friend-request-server-message`, (messageNew) => {
        if(messageNew && /success/.test(messageNew.status) && messageNew.result && /success/.test(messageNew.result.status)){
          handleClose()
          setTimeout(()=>{
            handleFetch()
          }, 1000)
        }
      })
    }
  }

  async function handleFetch(){
    const resToken = token? token : await API._xhrGet('getcsrf')
    await API._xhrPost(
      token? token : resToken.token,
      'loadusersystem', {
        action: 'friend',
        fstatus: 'friend'
    }, (csrf, d) =>{
      setCSRFToken(csrf)
      setData(d)
    })
  }

  return (
    <React.Fragment>
      <ListItem button
        onClick={handleMenuClick}>
        <Tooltip
          title={`${data.fullname} ${data.lastname}${data.nickname !== '-'? ` (${data.nickname})` : ''}`}
          placement="right">
          <ListItemIcon>
            { data.photopath ?
              <Avatar className={classes.avatarImage}
                src={API._getPictureUrl(data.photopath) + ( isSupportWebp? '.webp' : '.jpg' ) + '#' + new Date().toISOString()} />
              :
              <AccountCircle classes={{ root: classes.avatar }} />
            }
          </ListItemIcon>
        </Tooltip>
        <ListItemText
          primary={
            <React.Fragment>
              <Typography className={classes.name} variant="body2">
                {data.fullname} {data.lastname}
              </Typography>
            </React.Fragment>
          }
          secondary={ data.nickname !== '-'? data.nickname : '' } />
      </ListItem>
      <UserOverview
        alreadyFriend
        {...props}
        anchorEl={anchorEl}
        handleClose={handleClose}
        handleFriend={handleFriend} />
    </React.Fragment>
  );
}
