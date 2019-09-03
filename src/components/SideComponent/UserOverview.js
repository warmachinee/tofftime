import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';

import {
  Avatar,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Typography,
  Menu,
} from '@material-ui/core'

import {
  AccountCircle,

} from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  name: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
  avatar: {
    fontSize: 120
  },
  avatarImage: {
    width: 120,
    height: 120,
  },

}));


export default function UserOverview(props) {
  const classes = useStyles();
  const {
    API, BTN, COLOR, isSupportWebp, anchorEl, handleClose,
    token, setCSRFToken,
    data, handleFriend, toggleDialog, pending, setPendingData
  } = props

  function handleDoneAndClose(userid){
    handleClose()
    toggleDialog()
    //window.location.href = `/user/timeline/${userid}`
  }

  function handleFriendClick(userid, action){
    handleClose()
    if(action === 'add'){
      handleFriend(userid, 'add')
    }else{
      handleFriend(userid, 'un')
    }
    setTimeout(()=>{
      handleFetch()
    },1000)
  }

  async function handleFetch(){
    const resToken = token? token : await API.xhrGet('getcsrf')
    await API.xhrPost(
      token? token : resToken.token,
      'loadusersystem', {
        action: 'friend',
        fstatus: 'pending'
    }, (csrf, d) =>{
      setCSRFToken(csrf)
      setPendingData(d)
    })
  }

  return (
    <Menu
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleClose}
    >
      <div style={{ padding: 16, width: 250 }}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <BTN.NoStyleLink to={`/user/timeline/${data.userid}`}>
            <IconButton style={{ padding: 4 }} onClick={handleDoneAndClose}>
              { data.photopath ?
                <Avatar className={classes.avatarImage}
                  src={API.getPictureUrl(data.photopath) + ( isSupportWebp? '.webp' : '.jpg' ) + '#' + new Date().toISOString()}/>
                :
                <AccountCircle classes={{ root: classes.avatar }} style={{ color: COLOR.grey[900] }}/>
              }
            </IconButton>
          </BTN.NoStyleLink>
        </div>
        <BTN.NoStyleLink to={`/user/timeline/${data.userid}`}>
          <Button style={{ textTransform: 'none', width: '100%', }} onClick={handleDoneAndClose}>
            <Typography component="div" variant="body1" style={{ textAlign: 'center' }}>
              {data.fullname} {data.lastname}
              { data.nickname && data.nickname !== '-' &&
                <Typography variant="body2" style={{ textAlign: 'center' }} color="textSecondary">({data.nickname})</Typography>
              }
            </Typography>
          </Button>
        </BTN.NoStyleLink>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 16 }}>
          <BTN.PrimaryText style={{ padding: 4, width: '100%' }} onClick={handleClose}>Cancel</BTN.PrimaryText>
          <BTN.Primary style={{ padding: 4, width: '100%' }}
            onClick={()=>pending ? handleFriendClick(data.userid, 'un') : handleFriendClick(data.userid, 'add')}>
            { pending ? 'Unfriend' : 'Add' }
          </BTN.Primary>
        </div>
      </div>
    </Menu>
  );
}
