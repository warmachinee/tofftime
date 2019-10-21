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
    API, BTN, COLOR, sess, isSupportWebp, anchorEl, handleClose,
    token, setCSRFToken,
    data, handleFriend, alreadyFriend, handleAddFriendClose
  } = props

  function handleDoneAndClose(userid){
    handleClose()
    handleAddFriendClose()
    //window.location.href = `/user/timeline/${userid}`
  }

  function handleFriendClick(userid, action){
    handleClose()
    if(action === 'add'){
      handleFriend(userid, 'add')
    }else{
      handleFriend(userid, 'un')
    }
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
                  src={API._getPictureUrl(data.photopath) + ( isSupportWebp? '.webp' : '.jpg' ) + '#' + new Date().toISOString()} />
                :
                <AccountCircle classes={{ root: classes.avatar }} style={{ color: COLOR.grey[900] }} />
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
          <BTN.PrimaryText style={{ padding: 4, width: '100%' }} onClick={handleClose}>
            { ( sess && sess.language === 'TH' ) ? "ยกเลิก" : 'Cancel' }
          </BTN.PrimaryText>
          <BTN.Primary style={{ padding: 4, width: '100%' }}
            onClick={()=>
              data.status === 'pending' ? handleFriendClick(data.userid, 'un') :
              alreadyFriend ? handleFriendClick(data.userid, 'un') : handleFriendClick(data.userid, 'add')
            }>
            {
              data.status === 'pending' ? ( ( sess && sess.language === 'TH' ) ? "ลบเพื่อน" : 'Unfriend' ) :
              ( alreadyFriend ?
                ( ( sess && sess.language === 'TH' ) ? "ลบเพื่อน" : 'Unfriend' )
                :
                ( ( sess && sess.language === 'TH' ) ? "เพิ่มเพื่อน" : 'Add' )
              )
            }
          </BTN.Primary>
        </div>
      </div>
    </Menu>
  );
}
