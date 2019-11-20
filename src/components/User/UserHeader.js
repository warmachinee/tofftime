import React from 'react';
import socketIOClient from 'socket.io-client'
import { Link } from "react-router-dom";
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Avatar,
  Menu,
  MenuItem,
  Button,
  Badge,

} from '@material-ui/core';

import MenuIcon from '@material-ui/icons/Menu';

import {
  Add,
  AccountCircle,
  KeyboardArrowDown,
  Notifications,
  Translate,

} from '@material-ui/icons';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    [theme.breakpoints.up(601)]: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
  },
  appBarShiftClose: {
    [theme.breakpoints.up(601)]: {
      marginLeft: theme.spacing(9) + 1,
      width: `calc(100% - ${theme.spacing(9) + 1}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
  },
  logo: {
    padding: 'none',
    height: 56,
    width: 56,
    [theme.breakpoints.up('sm')]: {
      height: 64,
      width: 64,
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
  },
  logoImg: {
    height: '100%',
    width: '100%'
  },
  hide: {
    display: 'none',
  },
  accountTitle: {
    display: 'none',
    [theme.breakpoints.up(700)]: {
      display: 'block',
      width: 150,
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
    }
  },
  accountAvatar: {
    padding: 8,
    marginRight: 0,
    [theme.breakpoints.up('sm')]: {
      marginRight: 8,
    }
  },
  accountArrow: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
      padding: 8,
    }
  },
  avatar: {
    fontSize: 32
  },
  avatarImage: {
    width: 32,
    height: 32,
  },
  iconHidden: {
    [theme.breakpoints.down(900)]: {
      display: 'none',
    }
  },

}));

export default function UserHeader(props) {
  const classes = useStyles();
  const {
    API, BTN, COLOR, isSupportWebp, token, setCSRFToken, sess, handleSess,
    accountData, notiData, setNotiData, open, handleDrawerClick, toggleNoti,
    pageOrganizer, pageData
  } = props
  const [ anchorEl, setAnchorEl ] = React.useState(null);

  const theme = useTheme();
  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  async function handleLogout(){
    const data = await API._xhrGet('logout')
    setCSRFToken(data.token)
    if( data && /success/.test(data.response.status) ){
      handleGetUserinfo()
    }
  }

  async function handleGetUserinfo(){
    const resToken = await API._xhrGet('getcsrf')
    await API._xhrPost(
      resToken.token,
      'userinfo', {
    }, (csrf, d) =>{
      handleClose()
      setCSRFToken(csrf)
      handleSess(d)
    })
  }

  function handleNotifications(){
    const endpoint = API._getWebURL()
    const socket = socketIOClient(endpoint)
    socket.on(`${sess.userid}-noti-server-message`, (messageNew) => {
      if(messageNew){
        handleFetchNotifications()
      }
    })
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

  React.useEffect(()=>{
    if(sess && sess.status === 1){
      handleNotifications()
      handleFetchNotifications()
    }
  },[ sess, props.notiState ])

  const [ ,updateState ] = React.useState(null)

  function resizeHandler(){
    updateState({})
  }

  React.useEffect(()=>{
    window.addEventListener('resize', resizeHandler)
    return ()=>{
      window.removeEventListener('resize', resizeHandler)
    }
  },[ window.innerWidth ])

  return (
    <React.Fragment>
      <AppBar
        color="inherit"
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
          [classes.appBarShiftClose]: !open
        })}
      >
        <Toolbar>
          <IconButton
            onClick={handleDrawerClick}
            edge="start"
          >
            <MenuIcon />
          </IconButton>
          { ( open ? window.innerWidth >= 840 : window.innerWidth > 600 ) &&
            <Link to="/" style={{ textDecoration: 'none' }}>
              <IconButton
                edge="start"
                className={classes.logo}
              >
                <img src="https://file.thai-pga.com/system/image/logoX2.png" className={classes.logoImg} />
              </IconButton>
            </Link>
          }
          { /*
            <IconButton
              edge="start"
            >
              <Add />
            </IconButton>
            */
          }
          <div style={{ flex: 1 }} />
          <IconButton className={classes.iconHidden} onClick={toggleNoti}>
            { notiData && notiData.length > 0?
              <Badge badgeContent={
                  notiData.filter( item =>{
                    return item.read === 'unread'
                  }).length
                } color="secondary">
                <Notifications />
              </Badge>
              :
              <Notifications />
            }
          </IconButton>
          <div style={{ borderRight: '1px solid rgba(0, 0, 0, 0.12)', height: 32, marginRight: 16, marginLeft: 8 }}></div>
          { ( accountData || pageData ) &&
            <React.Fragment>
              { window.innerWidth < 600 ?
                <React.Fragment>
                  <IconButton className={classes.accountAvatar} onClick={handleClick}>
                    { pageOrganizer ?
                      (
                        pageData.logo ?
                        <Avatar className={classes.avatarImage}
                          src={API._getPictureUrl(pageData.logo) + ( isSupportWebp? '.webp' : '.jpg' ) + '#' + new Date().toISOString()} />
                        :
                        <AccountCircle classes={{ root: classes.avatar }} />
                      )
                      :
                      (
                        accountData.photopath ?
                        <Avatar className={classes.avatarImage}
                          src={API._getPictureUrl(accountData.photopath) + ( isSupportWebp? '.webp' : '.jpg' ) + '#' + new Date().toISOString()} />
                        :
                        <AccountCircle classes={{ root: classes.avatar }} />
                      )
                    }
                  </IconButton>
                  <Typography variant="subtitle1" noWrap className={classes.accountTitle} onClick={handleClick}
                    style={{
                      transition: '.2s', ...open? { width: 0 } : { width: 150 }
                    }}>
                    {accountData.fullname} {accountData.lastname}
                  </Typography>
                </React.Fragment>
                :
                <React.Fragment>
                  <Link
                    to={`/${ pageOrganizer ? `organizer/${pageData.pageid}` : 'user' }/profile/${ pageOrganizer? '' : accountData.userid}`}
                    style={{ textDecoration: 'none', color: 'inherit' }}>
                    <IconButton className={classes.accountAvatar}>
                      { pageOrganizer ?
                        (
                          pageData.logo ?
                          <Avatar className={classes.avatarImage}
                            src={API._getPictureUrl(pageData.logo) + ( isSupportWebp? '.webp' : '.jpg' ) + '#' + new Date().toISOString()} />
                          :
                          <AccountCircle classes={{ root: classes.avatar }} />
                        )
                        :
                        (
                          accountData.photopath ?
                          <Avatar className={classes.avatarImage}
                            src={API._getPictureUrl(accountData.photopath) + ( isSupportWebp? '.webp' : '.jpg' ) + '#' + new Date().toISOString()} />
                          :
                          <AccountCircle classes={{ root: classes.avatar }} />
                        )
                      }
                    </IconButton>
                  </Link>
                  <Link to={`/${ pageOrganizer ? `organizer/${pageData.pageid}` : 'user' }/profile/${ pageOrganizer? '' : accountData.userid}`}
                    style={{ textDecoration: 'none', color: 'inherit', }}>
                    <Typography variant="subtitle1" noWrap className={classes.accountTitle}
                      style={{
                        transition: '.2s', ...open? { width: 0 } : { width: 150 }
                      }}>
                      { pageOrganizer ?
                        <React.Fragment>{pageData.pagename}</React.Fragment>
                        :
                        <React.Fragment>{accountData.fullname} {accountData.lastname}</React.Fragment>
                      }
                    </Typography>
                  </Link>
                </React.Fragment>
              }
              <IconButton className={classes.accountArrow} onClick={handleClick}>
                <KeyboardArrowDown />
              </IconButton>
            </React.Fragment>
          }
        </Toolbar>
      </AppBar>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        { /\/organizer/.test(window.location.pathname) &&
          <Link to='/user'
            style={{ textDecoration: 'none', color: 'inherit' }}>
            <MenuItem onClick={handleClose}>
              { API._getWord(sess && sess.language).User }
            </MenuItem>
          </Link>
        }
        { ( accountData || pageData ) &&
          ( /\/user\/profile/.test(window.location.pathname) ?
          <Link to={`/${ pageOrganizer ? 'organizer' : 'user' }/${ pageOrganizer ? pageData.pageid : '' }`}
            style={{ textDecoration: 'none', color: 'inherit' }}>
            <MenuItem onClick={handleClose}>
              { API._getWord(sess && sess.language).Dashboard }
            </MenuItem>
          </Link>
          :
          <Link to={`/${ pageOrganizer ? `organizer/${pageData.pageid}` : 'user' }/profile/${ pageOrganizer? '' : accountData.userid}`}
            style={{ textDecoration: 'none', color: 'inherit' }}>
            <MenuItem onClick={handleClose}>
              { API._getWord(sess && sess.language).Profile }
            </MenuItem>
          </Link>
          )
        }
        <MenuItem onClick={handleLogout}>{ API._getWord(sess && sess.language).Log_out }</MenuItem>
      </Menu>
    </React.Fragment>
  );
}
