import React from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { fade, makeStyles } from '@material-ui/core/styles';
import * as API from '../api'

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

import SearchIcon from '@material-ui/icons/Search';
import MoreIcon from '@material-ui/icons/MoreVert';
import AccountIcon from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';

import blue from '@material-ui/core/colors/blue';

import ic_logo from './img/logoX2.png'

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1,
  },
  appBar: {
    backgroundColor: blue['600'],
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
    [theme.breakpoints.up(500)]: {
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
    [theme.breakpoints.up(500)]: {
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
    [theme.breakpoints.down(500)]: {
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
}));

function HideOnScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({ target: window ? window() : undefined });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.node.isRequired,
  window: PropTypes.func,
};

function Header(props) {
  const classes = useStyles();
  const { response, sess } = props
  const [ anchorEl, setAnchorEl ] = React.useState(null);
  const container = React.useRef(null);
  const auth = response && response.status

  async function handleLogout(){
    const res = await API.xhrGet('logout')
    console.log(res);
    /*
    setCSRFToken(res.token)
    menuCloseHandler()*/
  }

  function menuOpenHandler(event) {
    setAnchorEl(event.currentTarget);
  }

  function menuCloseHandler() {
    setAnchorEl(null);
  }

  React.useEffect(()=>{

  }, [ window.location.pathname ])

  return (
    <React.Fragment>
      <CssBaseline />
      <HideOnScroll {...props}>
        <AppBar color="default"
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
            <Typography className={classes.title} variant="h6" noWrap>T-off Time</Typography>
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
            </div>
            <div className={classes.grow} />

            { (
              ( auth === 'success' ) || sess || sess.status === 1
              ) &&
              <React.Fragment>
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
                <div className={classes.afterLoginIcon}>
                  {/*<IconButton
                    color="inherit"
                  >
                    <NotificationsIcon />
                  </IconButton>*/}
                  <IconButton
                    color="inherit"
                    onClick={menuOpenHandler}
                  >
                    <AccountIcon />
                  </IconButton>
                </div>
              </React.Fragment>
            }
            { !( auth === 'success' || sess && sess.status === 1 ) &&
              <Button className={classes.loginBtn} color="inherit"
                onClick={props.handleOpen}>Login</Button>
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
          { ( window.location.pathname === '/user' ) && sess && ( sess.status === 1 ) &&
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              <MenuItem onClick={menuCloseHandler}>Home</MenuItem>
            </Link>
          }
          { ( window.location.pathname === '/' ) && sess && ( sess.status === 1 ) &&
            <Link to="/user" style={{ textDecoration: 'none', color: 'inherit' }}>
              <MenuItem onClick={menuCloseHandler}>User</MenuItem>
            </Link>
          }
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </Portal>
      <div ref={container} />
    </React.Fragment>
  );
}

export default Header;
