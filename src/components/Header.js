import React from 'react';
import Loadable from 'react-loadable';
import socketIOClient from 'socket.io-client'
import { Scrollbars } from "react-custom-scrollbars";
import { Redirect, Link } from "react-router-dom";
import { fade, makeStyles } from '@material-ui/core/styles';
import * as API from './../api'
import * as COLOR from './../api/palette'

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Portal from '@material-ui/core/Portal';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Slide from '@material-ui/core/Slide';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import InputBase from '@material-ui/core/InputBase';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Popover from '@material-ui/core/Popover';
import Paper from '@material-ui/core/Paper';
import Hidden from '@material-ui/core/Hidden';

import SearchIcon from '@material-ui/icons/Search';
import MoreIcon from '@material-ui/icons/MoreVert';
import AccountIcon from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';
import SettingsIcon from '@material-ui/icons/Settings';

import ic_logo from './img/logoX2.png'

const ListRead = Loadable({
  loader: () => import(/* webpackChunkName: "listReadNoti" */'./List/listReadNoti'),
  loading() {
    return <LDTopnav />
  }
});

const ListUnRead = Loadable({
  loader: () => import(/* webpackChunkName: "listUnreadNoti" */'./List/listUnreadNoti'),
  loading() {
    return <LDTopnav />
  }
});

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1,
  },
  appBar: {
    color: 'white'
  },
  toolbar: {
    [theme.breakpoints.up('md')]: {
      maxWidth: 1200,
      width: '100%',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  title: {
    marginRight: theme.spacing(1),
    display: 'none',
    [theme.breakpoints.up(575)]: {
      display: 'block'
    },
  },
  moreIcon: {
    display: 'flex',
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  afterLoginIcon: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
    },
  },
  logo: {
    padding: 'none',
    height: 56,
    width: 56,
    [theme.breakpoints.up('sm')]: {
      height: 64,
      width: 64,
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(1),
    },
  },
  logoImg: {
    height: '100%',
    width: '100%'
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '100%',
    [theme.breakpoints.up(575)]: {
      width: '50%',
    },
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(2),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.down(575)]: {
      width: theme.spacing(5),
    },
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    [theme.breakpoints.down(500)]: {
      padding: theme.spacing(1, 1, 1, 5),
    },
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
  notiPaper: {
    height: 460,
    maxWidth: 300,
    width: 300,
    overflow: "hidden"
  },
  notiList: {
    height: '100%',
    maxHeight: 400,
    overflowX: "hidden",
    overflowY: 'inherit',
    scrollbarWidth: 0,
    padding: 0,
    margin: 0
  },

}));

function HideOnScroll(props) {
  const { children, window, setCSRFToken } = props;
  const trigger = useScrollTrigger({ target: window ? window() : undefined });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

function Header(props) {
  const classes = useStyles();
  const { token, setCSRFToken, setResponse, sess, handleSess, isSupportWebp, pageData } = props
  const [ anchorEl, setAnchorEl ] = React.useState(null);
  const [ anchorNoti, setAnchorNoti] = React.useState(null);
  const [ notiState, setNotiState ] = React.useState(false);
  const [ userInfo, setUserInfo ] = React.useState(null);
  const container = React.useRef(null);
  const hd = ( /www/.test(window.location.href) )? 'https://www.' : 'https://'
  const currentWebURL = hd + API.webURL()

  function menuOpenHandler(event) {
    setAnchorEl(event.currentTarget);
  }

  function menuCloseHandler() {
    setAnchorEl(null);
  }

  function handleLogin(){
    if(anchorEl){
      menuCloseHandler()
      props.handleOpen()
    }else{
      props.handleOpen()
    }
  }

  function handleNotifications(){
    if(sess && sess.status === 1){
      const endpoint = API.webURL()
      var hd = ( /www/.test(window.location.href) )? 'https://www.' : 'https://'
      const socket = socketIOClient( hd + endpoint )
      socket.on(`${sess.userid}-noti-server-message`, (messageNew) => {
        console.log(messageNew);
      })
    }
  }

  function handleClickNoti(event) {
    setNotiState(!notiState)
    if (notiState== "false") {
      setAnchorNoti(null);
    } else {
      setAnchorNoti(event.currentTarget);
    }
  }

  async function handleGetUserinfo(){
    const resToken = await API.xhrGet('getcsrf')
    await API.xhrPost(
      resToken.token,
      'userinfo', {
    }, (csrf, d) =>{
      setCSRFToken(csrf)
      handleSess(d)
      menuCloseHandler()
    })
  }

  async function handleLogout(){
    const data = await API.xhrGet('logout')
    setCSRFToken(data.token)
    if( data && data.response.status === 'success' ){
      handleGetUserinfo()
    }
  }

  async function handleFetchNotifications(){
    const resToken = token? token : await API.xhrGet('getcsrf')
    await API.xhrPost(
      token? token : resToken.token,
      'loadusersystem', {
        action: 'notification'
    }, (csrf, d) =>{
      setCSRFToken(csrf)
      console.log('notification', d);
    })
  }

  async function handleFetchInfo(){
    const resToken = token? token : await API.xhrGet('getcsrf')
    await API.xhrPost(
      token? token : resToken.token,
      'loadusersystem', {
        action: 'info'
    }, (csrf, d) =>{
      setCSRFToken(csrf)
      setUserInfo(d)
    })
  }

  React.useEffect(()=>{
    if(sess && sess.status === 1 && sess.typeid === 'user'){
      handleNotifications()
      handleFetchNotifications()
      handleFetchInfo()
    }
    console.log(pageData);
  },[ sess ])

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
      <CssBaseline />
      <HideOnScroll {...props}>
        <AppBar
          style={{ backgroundColor: (pageData && pageData.color)? COLOR[pageData.color][900] : COLOR.primary[900] }}
          classes={{
            colorDefault: classes.appBar,
          }}>
          <Toolbar className={classes.toolbar}>
            <Link to="/" style={{ textDecoration: 'none' }}>
              <IconButton
                edge="start"
                className={classes.logo}
                color="inherit"
              >
                <img src={ic_logo} className={classes.logoImg}/>
              </IconButton>
            </Link>
            <Typography className={classes.title} variant="h6" noWrap>
              { pageData && window.location.pathname !== '/' && window.location.pathname !== '/user' ? pageData.pagename : 'T-off Time' }
            </Typography>
            { /*
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="Search"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{ 'aria-label': 'Search' }}
                />
              </div>*/
            }
            <div className={classes.grow} />
            <div className={classes.moreIcon}>
              <IconButton
                edge="end"
                aria-label="Show more"
                aria-haspopup="true"
                color="inherit"
                onClick={menuOpenHandler}
              >
                <MoreIcon />
              </IconButton>
            </div>
            { ( sess && sess.status === 1 ) &&
              <React.Fragment>
                <div className={classes.afterLoginIcon}>
                  <IconButton
                    color="inherit"
                    onClick={handleClickNoti}>
                    <NotificationsIcon />
                  </IconButton>
                  { userInfo && userInfo.photopath ?
                    <IconButton onClick={menuOpenHandler}>
                      <Avatar src={
                        isSupportWebp?
                        currentWebURL + data.picture + '.webp'
                        :
                        currentWebURL + data.picture + '.jpg'
                      }/>
                    </IconButton>
                    :
                    <IconButton
                      color="inherit"
                      onClick={menuOpenHandler}>
                      <AccountIcon />
                    </IconButton>
                  }

                </div>
              </React.Fragment>
            }
            { !( sess && sess.status === 1 ) && window.innerWidth > 600 &&
              <Button className={classes.loginBtn} color="inherit"
                onClick={handleLogin}>Login</Button>
            }
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar />
      <Portal container={container.current}>
        <Menu
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={menuCloseHandler}
        >
          { window.location.pathname === '/admin' && ( sess && sess.status === 1) &&
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              <MenuItem onClick={menuCloseHandler}>Home</MenuItem>
            </Link>
          }
          { window.location.pathname !== '/admin' && ( sess && sess.status === 1 ) &&
            <Link to={`/${sess.typeid}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <MenuItem onClick={menuCloseHandler} style={{ textTransform: 'capitalize' }}>{`${sess.typeid}`}</MenuItem>
            </Link>
          }
          {/* window.location.pathname !== '/organizer' && ( sess && sess.status === 1 && sess.typeid === 'user' ) &&
            <Link to="/organizer" style={{ textDecoration: 'none', color: 'inherit' }}>
              <MenuItem onClick={menuCloseHandler}>User</MenuItem>
            </Link>
          */}
          { ( sess && sess.status === 1 ) &&
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          }

          { !( sess && sess.status === 1 ) &&
            <MenuItem onClick={handleLogin}>Login</MenuItem>
          }
          { ( sess && sess.status === 1 ) && window.innerWidth < 600 &&
            <MenuItem onClick={handleClickNoti}>Notifications</MenuItem>
          }
          <div></div>
        </Menu>
      </Portal>
      <div ref={container} />
      {
        sess && sess.status !== 1 &&
        window.location.pathname !== '/' &&
        /.com\/admin/.test(window.location.href) && /.com\/match/.test(window.location.href) &&
        <Redirect to='/' />
      }
      <Popover
        open={notiState}
        onClose={handleClickNoti}
        anchorEl={anchorNoti}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center"
        }}>
        <Paper className={classes.notiPaper}>
          <List style={{ padding: 0 }}>
            <ListItem style={{ color: "white", background: COLOR.primary[700] }}>
              <ListItemText
                primary={
                  <React.Fragment>
                    <Button disabled>
                      <Typography
                        variant="body1"
                        style={{ color: "white" }}
                      >
                        Notifications
                      </Typography>
                    </Button>
                  </React.Fragment>
                }
              />
              <ListItemSecondaryAction>
                <IconButton style={{color: "white"}}>
                  <SettingsIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          </List>
          <List className={classes.notiList}>
            <Scrollbars autoHide>
              {/*itemNoti.map((item, i)=>
                <ListRead key={i} item={item} />
              )*/}
            </Scrollbars>
          </List>
        </Paper>
      </Popover>
    </React.Fragment>
  );
}

export default Header;
