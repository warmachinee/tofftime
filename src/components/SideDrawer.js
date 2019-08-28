import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'

import AccountIcon from '@material-ui/icons/AccountCircle';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  userInfo: {
    width: '100%',
    padding: 16
  },
  avatar: {
    fontSize: 64
  },
  avatarImage: {
    width: 64,
    height: 64,
  },
  userTitle: {
    display: '-webkit-box',
    overflow: 'hidden',
    whiteSpace: 'normal',
    textOverflow: 'ellipsis',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 1,
    lineHeight: 1.4,
  },

});

export default function SideDrawer(props) {
  const classes = useStyles();
  const {
    COLOR, API, BTN, isSupportWebp, sess, handleSess, accountData, handleAccountData,
    token, setCSRFToken, drawerState, drawerClose
  } = props

  async function handleGetUserinfo(){
    const resToken = await API.xhrGet('getcsrf')
    await API.xhrPost(
      resToken.token,
      'userinfo', {
    }, (csrf, d) =>{
      setCSRFToken(csrf)
      handleSess(d)
    })
  }

  async function handleLogout(){
    const data = await API.xhrGet('logout')
    setCSRFToken(data.token)
    if( data && data.response.status === 'success' ){
      handleGetUserinfo()
      drawerClose()
    }
  }

  async function handleFetchInfo(){
    const resToken = token? token : await API.xhrGet('getcsrf')
    await API.xhrPost(
      token? token : resToken.token,
      'loadusersystem', {
        action: 'info'
    }, (csrf, d) =>{
      setCSRFToken(csrf)
      handleAccountData(d[0])
    })
  }

  React.useEffect(()=>{
    if(sess && sess.status === 1 && sess.typeid !== 'admin'){
      handleFetchInfo()
    }
  },[ sess ])

  return (
    <Drawer open={drawerState} onClose={drawerClose}>
      <div
        className={classes.list}
        role="presentation"
      >
        { sess && sess.status === 1 && sess.typeid !== 'admin' && accountData &&
          <React.Fragment>
            <div className={classes.userInfo}>
              <BTN.NoStyleLink to={`/user/${sess.userid}`}>
                { accountData.photopath ?
                  /*
                  <Avatar className={classes.avatarImage}
                    src={API.getPictureUrl(accountData.photopath) + ( isSupportWebp? '.webp' : '.jpg' )}/>*/
                  <Avatar className={classes.avatarImage}
                    src={API.getPictureUrl(accountData.photopath) + ( '.jpg' )}/>
                  :
                  <AccountIcon classes={{ root: classes.avatar }} />
                }
              </BTN.NoStyleLink>
              <BTN.NoStyleLink to={`/user/${sess.userid}`}>
                <Typography variant="body1" className={classes.userTitle}>
                  {accountData.fullname} {accountData.lastname}
                </Typography>
              </BTN.NoStyleLink>
              <BTN.NoStyleLink to={`/user/${sess.userid}`}>
                <Typography variant="caption" className={classes.userTitle}>
                  {accountData.email}
                </Typography>
              </BTN.NoStyleLink>
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 16 }}>
                <BTN.Red onClick={handleLogout}>Log out</BTN.Red>
              </div>
            </div>
            <Divider />
          </React.Fragment>
        }
        <List>
          { sess && sess.status === 1 &&
            <ListItem button>
              <ListItemIcon>
                <NotificationsIcon />
              </ListItemIcon>
              <ListItemText primary="Notification" />
            </ListItem>
            /*
            <ListItem button>
              <ListItemIcon>
                <MailIcon />
              </ListItemIcon>
              <ListItemText primary="Inbox" />
            </ListItem>*/
          }
        </List>
      </div>
    </Drawer>
  );
}
