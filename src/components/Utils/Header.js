import React from 'react';
import clsx from "clsx";
import Loadable from 'react-loadable';
import socketIOClient from 'socket.io-client'
import { Scrollbars } from "react-custom-scrollbars";
import { Redirect, Link } from "react-router-dom";
import { fade, makeStyles } from '@material-ui/core/styles';
import * as API from './../../api'
import * as COLOR from './../../api/palette'

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
  Popper,

} from '@material-ui/core';

import Autocomplete from '@material-ui/lab/Autocomplete';

import SearchIcon from '@material-ui/icons/Search';
import MoreIcon from '@material-ui/icons/MoreVert';
import AccountIcon from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';
import SettingsIcon from '@material-ui/icons/Settings';
import MenuIcon from '@material-ui/icons/Menu';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle'
import CloseIcon from '@material-ui/icons/Close'

const SearchMatchPage = Loadable({
  loader: () => import(/* webpackChunkName: "SearchMatchPage" */'./SearchMatchPage'),
  loading: () => null
});

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
    [theme.breakpoints.down(450)]: {
      display: 'none',
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
  moreThan700: {
    [theme.breakpoints.down(700)]: {
      display: 'none',
    },
  },
  lessThan700: {
    [theme.breakpoints.up(700)]: {
      display: 'none',
    },
  },
  moreThan500: {
    [theme.breakpoints.down(500)]: {
      display: 'none',
    },
  },
  lessThan500: {
    [theme.breakpoints.up(500)]: {
      display: 'none',
    },
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

export default function Header(props) {
  const classes = useStyles();
  const { sess, token, setCSRFToken, setResponse, handleSess, isSupportWebp , drawerOpen, accountData } = props
  const [ anchorEl, setAnchorEl ] = React.useState(null);
  const [ anchorNoti, setAnchorNoti] = React.useState(null);
  const [ searchState, setSearchState ] = React.useState(false);
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

  async function handleGetUserinfo(){
    const resToken = await API._xhrGet('getcsrf')
    await API._xhrPost(
      resToken.token,
      'userinfo', {
    }, (csrf, d) =>{
      menuCloseHandler()
      setCSRFToken(csrf)
      handleSess(d)
    })
  }

  async function handleLogout(){
    const data = await API._xhrGet('logout')
    setCSRFToken(data.token)
    if( data && /success/.test(data.response.status) ){
      handleGetUserinfo()
    }
  }

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
            { searchState ?
              <SearchMatchPage {...props} searchState={searchState} setSearchState={setSearchState} />
              :
              <React.Fragment>
                <IconButton
                  className={classes.lessThan700}
                  onClick={drawerOpen}>
                  <MenuIcon />
                </IconButton>
                <Link to="/" style={{ textDecoration: 'none' }} className={classes.moreThan500}>
                  <IconButton
                    edge="start"
                    className={classes.logo}
                  >
                    <img src="https://file.thai-pga.com/system/image/logoX2.png" className={classes.logoImg} />
                  </IconButton>
                </Link>
                <Typography className={clsx(classes.moreThan500, classes.title)} variant="h6" noWrap>
                  { 'T-off Time' }
                </Typography>
                { window.location.pathname === '/' &&
                  <React.Fragment>
                    <div className={classes.moreThan700} style={{ borderRight: '1px solid rgba(0, 0, 0, 0.12)', height: 32, marginRight: 16, marginLeft: 8 }} />
                    <Button className={classes.moreThan700} size="small" onClick={()=>API._handleScrolllTo('match')}>
                      Match
                    </Button>
                    <Button className={classes.moreThan700} size="small" onClick={()=>API._handleScrolllTo('news')}>
                      News
                    </Button>
                    <Button className={classes.moreThan700} size="small" onClick={()=>API._handleScrolllTo('organizer')}>
                      Organizer
                    </Button>
                  </React.Fragment>
                }
                <div className={clsx(classes.moreThan500, classes.grow)} />

                <Button variant="text" style={{ marginRight: 8 }} onClick={()=>setSearchState(!searchState)}>
                  <SearchIcon style={{ marginRight: 4 }} />
                  Search
                </Button>
                <div className={clsx(classes.lessThan500, classes.grow)} />
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
                    { sess ?
                      ( sess.typeid === 'admin' ?
                        <Link to={`/system_admin`} style={{ textDecoration: 'none', color: 'inherit' }}>
                          <IconButton
                            style={{ padding: 8 }}>
                            <SupervisedUserCircleIcon classes={{ root: classes.avatar }} />
                          </IconButton>
                        </Link>
                        :
                        <Link to={`/user`} style={{ textDecoration: 'none', color: 'inherit' }}>
                          <IconButton
                            style={{ padding: 8 }}>
                            { accountData && accountData.photopath ?
                              <Avatar className={classes.avatarImage}
                                src={
                                  API._getPictureUrl(accountData.photopath) +
                                  ( isSupportWebp? '.webp' : '.jpg' ) + '#' + new Date().toISOString()
                                } />
                              :
                              <AccountIcon classes={{ root: classes.avatar }} />
                            }
                          </IconButton>
                        </Link>
                      )
                      :
                      <IconButton
                        style={{ padding: 8 }}>
                        <AccountIcon classes={{ root: classes.avatar }} />
                      </IconButton>
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
                    onClick={handleLogin}>{ API._getWord(sess && sess.language).Login }</Button>
                }
              </React.Fragment>
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
          { sess && sess.status === 1 && sess.typeid !== 'admin' &&
            !( window.location.pathname === '/' ) &&
            <Link to={`/`} style={{ textDecoration: 'none', color: 'inherit' }} className={classes.moreThan700}>
              <MenuItem onClick={menuCloseHandler}>
                { API._getWord(sess && sess.language).Home }
              </MenuItem>
            </Link>
          }

          { sess && sess.status === 1 && sess.typeid === 'admin' &&
            !/\/system_admin/.test(window.location.pathname) &&
            <Link to={`/system_admin`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <MenuItem onClick={menuCloseHandler}>
                { API._getWord(sess && sess.language).Admin }
              </MenuItem>
            </Link>
          }

          { sess && sess.status === 1 && sess.typeid !== 'admin' &&
            !/\/user/.test(window.location.pathname) &&
            <Link to={`/user`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <MenuItem onClick={menuCloseHandler}>
                { API._getWord(sess && sess.language).User }
              </MenuItem>
            </Link>
          }

          { ( sess && sess.status === 1 ) &&
            <MenuItem onClick={handleLogout}>
              { API._getWord(sess && sess.language).Log_out }
            </MenuItem>
          }

          <div></div>
        </Menu>
      </Portal>
      <div ref={container} />
      {
        sess && sess.status !== 1 &&
        window.location.pathname !== '/' &&
        /.com\/system_admin/.test(window.location.href) && /.com\/match/.test(window.location.href) &&
        <Redirect to='/' />
      }
    </React.Fragment>
  );
}
