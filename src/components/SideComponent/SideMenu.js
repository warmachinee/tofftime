import React from 'react';
import Loadable from 'react-loadable';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import * as COLOR from './../../api/palette'

import {
  Drawer,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Typography,
  Box,

} from '@material-ui/core'

import {
  Notifications,
  ChevronLeft,
  ChevronRight,
  Home,
  ExitToApp,
  AccountCircle,
  Dashboard
} from '@material-ui/icons';

const TemplateDialog = Loadable({
  loader: () => import(/* webpackChunkName: "TemplateDialog" */'./../TemplateDialog'),
  loading: () => null
});

const drawerWidth  = 240;

const useStyles = makeStyles(theme => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    [theme.breakpoints.up('sm')]: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: 'hidden',
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  logout: {
    '&:hover': {
      backgroundColor: COLOR.red[100],
    },
  },
  logoutIcon: {
    color: COLOR.red[600]
  },
  logoutTitle: {
    color: COLOR.red[600]
  },
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
  notiHidden: {
    [theme.breakpoints.up(900)]: {
      display: 'none',
    }
  },
  confirmButton: {
    padding: theme.spacing(1, 4.5)
  },

}));

export default function SideMenu(props) {
  const classes = useStyles();
  const { API, BTN, isSupportWebp, token, setCSRFToken, sess, handleSess, open, handleDrawerOpen, handleDrawerClose } = props
  const [ pageList, setPageList ] = React.useState(null)
  const [ confirmLogout, setConfirmLogout ] = React.useState(false)

  function toggleConfirmLogout(){
    setConfirmLogout(!confirmLogout)
  }

  async function handleLogout(){
    const data = await API.xhrGet('logout')
    setCSRFToken(data.token)
    if( data && data.response.status === 'success' ){
      handleGetUserinfo()
    }
  }

  async function handleGetUserinfo(){
    const resToken = await API.xhrGet('getcsrf')
    await API.xhrPost(
      resToken.token,
      'userinfo', {
    }, (csrf, d) =>{
      toggleConfirmLogout()
      handleDrawerClose()
      setCSRFToken(csrf)
      handleSess(d)
    })
  }

  async function handleFetchPage(){
    const resToken = token? token : await API.xhrGet('getcsrf')
    await API.xhrPost(
      token? token : resToken.token,
      'loadusersystem', {
        action: 'pagelist'
    }, (csrf, d) =>{
      setCSRFToken(csrf)
      setPageList(d)
    })
  }

  React.useEffect(()=>{
    handleFetchPage()
  },[ ])

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
      <Drawer
        variant={ window.innerWidth > 600 ? "permanent" : "temporary" }
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
        open={open}
        onClose={handleDrawerClose}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={()=>open ? handleDrawerClose() : handleDrawerOpen()}>
            {!open ? <ChevronRight /> : <ChevronLeft />}
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem button className={classes.notiHidden}>
            <ListItemIcon><Notifications /></ListItemIcon>
            <ListItemText primary="Notifications" />
          </ListItem>
          <BTN.NoStyleLink to='/'>
            <ListItem button>
              <ListItemIcon><Home /></ListItemIcon>
              <ListItemText primary="ToffTime" />
            </ListItem>
          </BTN.NoStyleLink>
          { sess &&
            <BTN.NoStyleLink to={`/user/${sess.userid}`}>
              <ListItem button>
                <ListItemIcon><Dashboard /></ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItem>
            </BTN.NoStyleLink>
          }
        </List>
        <Divider />
        { pageList &&
          <React.Fragment>
            <List>
              {
                pageList.map( d =>
                  <ListItem button key={d.pageid}>
                    <ListItemIcon>
                      { d.logo ?
                        <Avatar className={classes.avatarImage}
                          src={API.getPictureUrl(d.logo) + ( isSupportWebp? '.webp' : '.jpg' ) + '#' + new Date().toISOString()}/>
                        :
                        <AccountCircle classes={{ root: classes.avatar }} style={{ color: COLOR[d.color][600] }}/>
                      }
                    </ListItemIcon>
                    <ListItemText className={classes.listTitle} primary={d.pagename} />
                  </ListItem>
                )
              }
            </List>
            <Divider />
          </React.Fragment>
        }
        <div style={{ flex: 1 }} />
        <Divider />
        <List>
          <ListItem button onClick={toggleConfirmLogout} className={classes.logout}>
            <ListItemIcon><ExitToApp classes={{ root: classes. logoutIcon }}/></ListItemIcon>
            <ListItemText className={classes.logoutTitle} primary="Logout" />
          </ListItem>
        </List>
      </Drawer>
      <TemplateDialog maxWidth={400} open={confirmLogout} handleClose={toggleConfirmLogout}>
        {/*handleLogout*/}
        <Typography component="div">
          <Box className={classes.confirmTitle} fontWeight={600} m={1}>
            Are you sure you want to Log out?
          </Box>
        </Typography>
        <Divider style={{ marginTop: 16, marginBottom: 16 }}/>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <BTN.PrimaryText fullWidth onClick={toggleConfirmLogout} className={classes.confirmButton}>
            Cancel
          </BTN.PrimaryText>
          <BTN.Red fullWidth onClick={handleLogout} className={classes.confirmButton}>
            Log out
          </BTN.Red>
        </div>
      </TemplateDialog>
    </React.Fragment>
  );
}
