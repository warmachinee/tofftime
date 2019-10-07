import React from 'react';
import Loadable from 'react-loadable';
import socketIOClient from 'socket.io-client'
import { Scrollbars } from "react-custom-scrollbars";
import { Redirect, Link } from "react-router-dom";
import { fade, makeStyles } from '@material-ui/core/styles';
import * as API from './../api'
import * as COLOR from './../api/palette'

import {
  AppBar,
  Toolbar,
  Portal,
  Typography,
  CssBaseline,
  useScrollTrigger,
  Slide,
  IconButton,
  Button,
  Menu,
  MenuItem,
  InputBase,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Popover,
  Paper,
  Hidden,
} from '@material-ui/core';

import SearchIcon from '@material-ui/icons/Search';
import MoreIcon from '@material-ui/icons/MoreVert';
import AccountIcon from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';
import SettingsIcon from '@material-ui/icons/Settings';
import MenuIcon from '@material-ui/icons/Menu';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle'

import ic_logo from './img/logoX2.png'

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1,
  },
  appBar: {
    color: 'white'
  },
  toolbar: {
    padding: theme.spacing(0, 2),
    [theme.breakpoints.up('md')]: {
      maxWidth: 1200,
      width: '100%',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  title: {
    marginRight: theme.spacing(1),
    color: COLOR.grey[900],
    display: 'none',
    [theme.breakpoints.up(450)]: {
      display: 'block'
    },
  },
  loginBtn: {
    color: COLOR.grey[50],
    backgroundColor: COLOR.primary[600],
    '&:hover': {
      backgroundColor: COLOR.primary[700],
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
  avatar: {
    fontSize: 32
  },
  avatarImage: {
    width: 32,
    height: 32,
  },

}));

function HideOnScroll(props) {
  const { children, window, setCSRFToken } = props;
  const trigger = useScrollTrigger({ target: window ? window() : undefined });

  return (
    <Slide appear={true} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

function Header(props) {
  const classes = useStyles();
  const { sess, token, setCSRFToken, setResponse, handleSess, isSupportWebp , drawerOpen, accountData } = props
  const [ anchorEl, setAnchorEl ] = React.useState(null);
  const [ anchorNoti, setAnchorNoti] = React.useState(null);
  const [ notiState, setNotiState ] = React.useState(false);
  const container = React.useRef(null);

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
      menuCloseHandler()
      setCSRFToken(csrf)
      handleSess(d)
    })
  }

  async function handleLogout(){
    const data = await API.xhrGet('logout')
    setCSRFToken(data.token)
    if( data && data.response.status === 'success' ){
      handleGetUserinfo()
    }
  }

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
          id="el_header"
          style={{ backgroundColor: COLOR.grey[50] }}
          classes={{
            colorDefault: classes.appBar,
          }}>
          <Toolbar className={classes.toolbar}>
            { window.innerWidth < 600 &&
              <IconButton
                onClick={drawerOpen}>
                <MenuIcon />
              </IconButton>
            }
            { /*
              window.location.pathname === '/' ?
              (
                <IconButton
                  edge="start"
                  className={classes.logo}
                  onClick={()=>window.scrollTo(0, 0)}
                >
                  <img src={ic_logo} className={classes.logoImg} />
                </IconButton>
              )
              :
              (
                <Link to="/" style={{ textDecoration: 'none' }}>
                  <IconButton
                    edge="start"
                    className={classes.logo}
                  >
                    <img src={ic_logo} className={classes.logoImg} />
                  </IconButton>
                </Link>
              )*/
              <Link to="/" style={{ textDecoration: 'none' }}>
                <IconButton
                  edge="start"
                  className={classes.logo}
                >
                  <img src={ic_logo} className={classes.logoImg} />
                </IconButton>
              </Link>
            }
            { window.innerWidth < 600 && <div className={classes.grow} /> }
            <Typography className={classes.title} variant="h6" noWrap>
              { 'T-off Time' }
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
            { window.location.pathname === '/' && window.innerWidth >= 600 &&
              <React.Fragment>
                <Button size="small" onClick={()=>API.handleScrolllTo('match')}>
                  { ( sess && sess.language === 'TH' ) ? "การแข่งขัน" : 'Match' }
                </Button>
                <Button size="small" onClick={()=>API.handleScrolllTo('news')}>
                  { ( sess && sess.language === 'TH' ) ? "ข่าว" : 'News' }
                </Button>
                <Button size="small" onClick={()=>API.handleScrolllTo('organizer')}>
                  { ( sess && sess.language === 'TH' ) ? "ผู้จัดการแข่งขัน" : 'Organizer' }
                </Button>
                <div style={{ borderRight: '1px solid rgba(0, 0, 0, 0.12)', height: 32, marginRight: 16, marginLeft: 8 }}></div>
              </React.Fragment>
            }
            { ( sess && sess.status === 1 ) &&
              <React.Fragment>
                {
                  /*
                  <div className={classes.afterLoginIcon}>
                    <IconButton
                      style={{ padding: 8 }}
                      onClick={handleClickNoti}>
                      <NotificationsIcon />
                    </IconButton>
                  </div>*/
                }
                { ( accountData && sess.typeid !== 'admin' ) ?
                  <Link to={`/user` /*${sess.userid}*/} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <IconButton
                      style={{ padding: 8 }}>
                      { accountData.photopath ?
                        <Avatar className={classes.avatarImage}
                          src={API.getPictureUrl(accountData.photopath) + ( isSupportWebp? '.webp' : '.jpg' ) + '#' + new Date().toISOString()} />
                        :
                        <AccountIcon classes={{ root: classes.avatar }} />
                      }
                    </IconButton>
                  </Link>
                  :
                  <Link to={`/admin`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <IconButton
                      style={{ padding: 8 }}>
                      <SupervisedUserCircleIcon classes={{ root: classes.avatar }} />
                    </IconButton>
                  </Link>
                }
                <IconButton
                  style={{ padding: 8 }}
                  onClick={menuOpenHandler}>
                  <KeyboardArrowDownIcon />
                </IconButton>
              </React.Fragment>
            }
            { !( sess && sess.status === 1 ) &&
              <Button className={classes.loginBtn}
                onClick={handleLogin}>{ ( sess && sess.language === 'TH' ) ? "เข้าสู่ระบบ" : 'Login' }</Button>
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
          { sess && sess.status === 1 && sess.typeid !== 'admin' && window.innerWidth >= 600 &&
            !( window.location.pathname === '/' ) &&
            <Link to={`/`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <MenuItem onClick={menuCloseHandler}>
                { ( sess && sess.language === 'TH' ) ? "หน้าแรก" : 'Home' }
              </MenuItem>
            </Link>
          }

          { sess && sess.status === 1 && sess.typeid === 'admin' &&
            !/\/admin/.test(window.location.pathname) &&
            <Link to={`/admin`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <MenuItem onClick={menuCloseHandler}>
                { ( sess && sess.language === 'TH' ) ? "แอดมิน" : 'Admin' }
              </MenuItem>
            </Link>
          }

          { sess && sess.status === 1 && sess.typeid !== 'admin' &&
            !/\/user/.test(window.location.pathname) &&
            <Link to={`/user`/*${sess.userid}*/} style={{ textDecoration: 'none', color: 'inherit' }}>
              <MenuItem onClick={menuCloseHandler}>
                { ( sess && sess.language === 'TH' ) ? "ผู้ใช้งาน" : 'User' }
              </MenuItem>
            </Link>
          }

          { ( sess && sess.status === 1 ) &&
            <MenuItem onClick={handleLogout}>
              { ( sess && sess.language === 'TH' ) ? "ลงชื่อออก" : 'Log out' }
            </MenuItem>
          }

          {/* ( sess && sess.status === 1 ) && window.innerWidth < 600 &&
            <MenuItem onClick={handleClickNoti}>Notifications</MenuItem>*/
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
                        { ( sess && sess.language === 'TH' ) ? "การแจ้งเตือน" : 'Notifications' }
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
