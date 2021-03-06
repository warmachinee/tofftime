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
    fontSize: 100
  },
  avatarImage: {
    width: 100,
    height: 100,
  },
  userTitle: {
    display: '-webkit-box',
    overflow: 'hidden',
    whiteSpace: 'normal',
    textOverflow: 'ellipsis',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 1,
    lineHeight: 1.4,
    textAlign: 'center'
  },

});

export default function SideDrawer(props) {
  const classes = useStyles();
  const {
    COLOR, API, BTN, isSupportWebp, sess, handleSess, accountData, handleAccountData,
    token, setCSRFToken, drawerState, drawerClose
  } = props

  function handleScroll(element){
    API._handleScrolllTo(element)
    //setTimeout(()=>{ drawerClose() }, 1000)
  }

  async function handleGetUserinfo(){
    const resToken = await API._xhrGet('getcsrf')
    await API._xhrPost(
      resToken.token,
      'userinfo', {
    }, (csrf, d) =>{
      setCSRFToken(csrf)
      handleSess(d)
    })
  }

  async function handleLogout(){
    const data = await API._xhrGet('logout')
    setCSRFToken(data.token)
    if( data && /success/.test(data.response.status) ){
      handleGetUserinfo()
      drawerClose()
    }
  }

  async function handleFetchInfo(){
    const resToken = token? token : await API._xhrGet('getcsrf')
    await API._xhrPost(
      token? token : resToken.token,
      'loadusersystem', {
        action: 'info'
    }, (csrf, d) =>{
      setCSRFToken(csrf)
      handleAccountData({
        ...d,
        photopath: (
          d.photopath ?
          API._getPictureUrl(d.photopath) + ( isSupportWebp? '.webp' : '.jpg' ) + '#' + new Date().toISOString()
          :
          null
        )
      })
    })
  }

  React.useEffect(()=>{
    if(
      sess && sess.status === 1 && sess.typeid !== 'admin' &&
      !/\/user/.test(window.location.pathname)
    ){
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
              <BTN.NoStyleLink to={`/user`/*${sess.userid}*/}>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  { accountData.photopath ?
                    <Avatar className={classes.avatarImage}
                      onClick={drawerClose}
                      src={accountData.photopath} />
                    :
                    <AccountIcon onClick={drawerClose} classes={{ root: classes.avatar }} />
                  }
                </div>
              </BTN.NoStyleLink>
              <BTN.NoStyleLink to={`/user`/*${sess.userid}*/}>
                <Typography variant="body1" className={classes.userTitle} onClick={drawerClose}>
                  {accountData.fullname} {accountData.lastname}
                </Typography>
              </BTN.NoStyleLink>
              <BTN.NoStyleLink to={`/user`/*${sess.userid}*/}>
                <Typography variant="caption" className={classes.userTitle} onClick={drawerClose}>
                  {accountData.email}
                </Typography>
              </BTN.NoStyleLink>
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 16 }}>
                <BTN.Red onClick={handleLogout}>
                  { API._getWord(sess && sess.language).Log_out }
                </BTN.Red>
              </div>
            </div>
            <Divider />
          </React.Fragment>
        }
        <List>
          { window.location.pathname === '/' &&
            <React.Fragment>
              <ListItem button onClick={()=>handleScroll('match')}>
                <ListItemIcon>
                  <div style={{ width: 24 }} />
                </ListItemIcon>
                <ListItemText primary="Match" />
              </ListItem>
              <ListItem button onClick={()=>handleScroll('news')}>
                <ListItemIcon>
                  <div style={{ width: 24 }} />
                </ListItemIcon>
                <ListItemText primary="News" />
              </ListItem>
              <ListItem button onClick={()=>handleScroll('organizer')}>
                <ListItemIcon>
                  <div style={{ width: 24 }} />
                </ListItemIcon>
                <ListItemText primary="Organizer" />
              </ListItem>
              <Divider />
            </React.Fragment>
          }
        </List>
      </div>
    </Drawer>
  );
}
