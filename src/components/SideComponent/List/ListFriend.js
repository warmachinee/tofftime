import React from 'react';
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

} from '@material-ui/core'

import {
  AccountCircle,
  ExpandLess,
  ExpandMore,
  AddCircleOutline,

} from '@material-ui/icons';

const TemplateDialog = Loadable({
  loader: () => import(/* webpackChunkName: "TemplateDialog" */'./../../TemplateDialog'),
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
  const { API, BTN, COLOR, isSupportWebp, token, setCSRFToken, sess, handleSess, accountData, state, expanded, handleExpand } = props
  const [ data, setData ] = React.useState(null)
  const [ open, setOpen ] = React.useState(false)

  function toggleDialog(){
    setOpen(!open)
  }

  async function handleFetch(){
    const resToken = token? token : await API.xhrGet('getcsrf')
    await API.xhrPost(
      token? token : resToken.token,
      'loadusersystem', {
        action: 'friend'
    }, (csrf, d) =>{
      setCSRFToken(csrf)
      setData(d)
      console.log('ListFriend ', d);
    })
  }

  React.useEffect(()=>{
    handleFetch()
  },[ ])

  return (
    <React.Fragment>
      <Divider />
      <List>
        <ListItem button
          onClick={()=>( data && data.length > 0 ) ? handleExpand('friend') : toggleDialog()}>
          <ListItemIcon>
            { ( data && data.length > 0 ) ?
              (
                expanded.friend ? <ExpandLess /> : <ExpandMore />
              )
              :
              <AddCircleOutline />
            }
          </ListItemIcon>
          <ListItemText primary={( data && data.length > 0 ) ? 'Friend' : 'Add friend'} />
        </ListItem>
      </List>
      <Collapse in={state} timeout="auto" style={{ minHeight: 'auto' }}>
        <List component="div" disablePadding>
          <ListItem button
            onClick={()=>toggleDialog()}>
            <ListItemIcon>
              <AddCircleOutline />
            </ListItemIcon>
            <ListItemText primary="Add friend" />
          </ListItem>
          { data &&
            data.map( d =>
              <ListFriendItem key={d} data={d} {...props} toggleDialog={toggleDialog}/>
            )
          }
        </List>
      </Collapse>
      <TemplateDialog open={open} handleClose={toggleDialog}>
        <AddFriend {...props} toggleDialog={toggleDialog}/>
      </TemplateDialog>
    </React.Fragment>
  )
}

function ListFriendItem(props) {
  const classes = useStyles();
  const { API, BTN, COLOR, sess, token, setCSRFToken, isSupportWebp, handleSnackBar, data } = props
  const [ anchorEl, setAnchorEl ] = React.useState(null);

  function handleMenuClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  function handleFriend(userid, action){
    if(sess){
      const socket = socketIOClient( API.getWebURL() )
      console.log({
        action: action,
        userid: sess.userid,
        targetid: userid
      });
      socket.emit('friend-client-message', {
        action: action,
        userid: sess.userid,
        targetid: userid
      })
    }
  }

  return (
    <React.Fragment>
      <ListItem button
        onClick={handleMenuClick}>
        <ListItemIcon>
          { false ?
            <Avatar className={classes.avatarImage}
              src={API.getPictureUrl(false) + ( isSupportWebp? '.webp' : '.jpg' ) + '#' + new Date().toISOString()}/>
            :
            <AccountCircle classes={{ root: classes.avatar }} />
          }
        </ListItemIcon>
        <ListItemText
          primary={
            <React.Fragment>
              <Typography className={classes.name} variant="body2">
                {"fullnamefullname"} {"lastnamelastnamelastname"}
              </Typography>
            </React.Fragment>
          } />
      </ListItem>
      <UserOverview
        {...props}
        anchorEl={anchorEl}
        handleClose={handleClose}
        handleFriend={handleFriend} />
    </React.Fragment>
  );
}
