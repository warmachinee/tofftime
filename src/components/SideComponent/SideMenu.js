import React from 'react';
import Loadable from 'react-loadable';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import * as COLOR from './../../api/palette'
import ic_logo from './../img/logoX2.png'

import {
  Button,
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
  Badge,
  Collapse

} from '@material-ui/core'

import {
  Person,
  Notifications,
  ChevronLeft,
  ChevronRight,
  Home,
  ExitToApp,
  AccountCircle,
  Dashboard,
  History,
  Event,
  Flag,
  SettingsApplications,
  AddCircleOutline,
  Translate,

} from '@material-ui/icons';

const ListPage = Loadable({
  loader: () => import(/* webpackChunkName: "ListPage" */'./List/ListPage'),
  loading: () => null
});

const ListFriend = Loadable({
  loader: () => import(/* webpackChunkName: "ListFriend" */'./List/ListFriend'),
  loading: () => null
});

const ListFollow = Loadable({
  loader: () => import(/* webpackChunkName: "ListFollow" */'./List/ListFollow'),
  loading: () => null
});

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
    [theme.breakpoints.up(600)]: {
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
  logoImg: {
    height: 24,
    width: 24
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
  iconHidden: {
    [theme.breakpoints.up(900)]: {
      display: 'none',
    }
  },
  confirmButton: {
    padding: theme.spacing(1, 4.5)
  },
  userInfo: {
    width: '100%',
    padding: 16,
    boxSizing: 'border-box',
  },
  avatarInfo: {
    fontSize: 120
  },
  avatarImageInfo: {
    width: 120,
    height: 120,
  },
  userTitle: {
    display: '-webkit-box',
    overflow: 'hidden',
    whiteSpace: 'normal',
    textOverflow: 'ellipsis',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 1,
    lineHeight: 1.4,
    textAlign: 'center',
  },

}));

export default function SideMenu(props) {
  const classes = useStyles();
  const {
    API, BTN, isSupportWebp, token, setCSRFToken, sess, handleSess, open,
    handleDrawerOpen, handleDrawerClose, accountData,
    notiData, toggleNoti, toggleHistory, toggleUpcoming, toggleCreatePage, toggleCreateMatch,
    pageOrganizer, pageData
  } = props
  const [ pageList, setPageList ] = React.useState(null)
  const [ confirmLogout, setConfirmLogout ] = React.useState(false)
  const [ expanded, setExpanded ] = React.useState({
    management: window.location.pathname.includes(`/${ pageOrganizer ? `organizer/${pageData.pageid}` : 'user' }/management`),
    friend: false,
    follow: false
  });

  function handleExpand(type) {
    setExpanded({ ...expanded, [type]: !expanded[type] });
  }

  function toggleConfirmLogout(){
    setConfirmLogout(!confirmLogout)
  }

  async function handleSwitchLanguage(){
    const resToken = token? token : await API._xhrGet('getcsrf')
    await API._xhrPost(
      token? token : resToken.token,
      'uusersystem', {
        action: 'switchlanguage'
    }, (csrf, d) =>{
      setCSRFToken(csrf)
      if(/success/.test(d.status)){
        setTimeout(()=>{
          window.location.pathname = window.location.pathname
        }, 1000)
      }
    })
  }

  async function handleLogout(){
    const data = await API._xhrGet('logout')
    setCSRFToken(data.token)
    if( data && data.response.status === 'success' ){
      handleGetUserinfo()
    }
  }

  async function handleGetUserinfo(){
    const resToken = await API._xhrGet('getcsrf')
    await API._xhrPost(
      resToken.token,
      'userinfo', {
    }, (csrf, d) =>{
      toggleConfirmLogout()
      handleDrawerClose()
      setCSRFToken(csrf)
      handleSess(d)
    })
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
        { /*
          <div className={classes.toolbar}>
            <IconButton onClick={()=>open ? handleDrawerClose() : handleDrawerOpen()}>
              {!open ? <ChevronRight /> : <ChevronLeft />}
            </IconButton>
          </div>*/
        }
        { ( accountData || pageData ) &&
          <React.Fragment>
            <div className={classes.userInfo}>
              <BTN.NoStyleLink
                to={`/${ pageOrganizer ? `organizer/${pageData.pageid}` : 'user' }/profile/${ pageOrganizer? '' : accountData.userid}`}>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <IconButton style={{ padding: 0 }}>
                    { pageOrganizer ?
                      (
                        pageData.logo ?
                        <Avatar
                          style={{ transition: '.2s' }}
                          className={clsx({
                            [classes.avatarImageInfo]: open,
                            [classes.avatarImage]: !open
                          })}
                          src={API._getPictureUrl(pageData.logo) + ( isSupportWebp? '.webp' : '.jpg' ) + '#' + new Date().toISOString()} />
                        :
                        <AccountCircle
                          style={{ transition: '.2s', color: COLOR.grey[900] }}
                          classes={{
                            root: clsx({
                              [classes.avatarInfo]: open,
                              [classes.avatar]: !open
                            })
                          }} />
                      )
                      :
                      (
                        accountData.photopath ?
                        <Avatar
                          style={{ transition: '.2s' }}
                          className={clsx({
                            [classes.avatarImageInfo]: open,
                            [classes.avatarImage]: !open
                          })}
                          src={API._getPictureUrl(accountData.photopath) + ( isSupportWebp? '.webp' : '.jpg' ) + '#' + new Date().toISOString()} />
                        :
                        <AccountCircle
                          style={{ transition: '.2s', color: COLOR.grey[900] }}
                          classes={{
                            root: clsx({
                              [classes.avatarInfo]: open,
                              [classes.avatar]: !open
                            })
                          }} />
                      )
                    }
                  </IconButton>
                </div>
              </BTN.NoStyleLink>
              { open &&
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <BTN.NoStyleLink
                    to={`/${ pageOrganizer ? `organizer/${pageData.pageid}` : 'user' }/profile/${ pageOrganizer? '' : accountData.userid}`}>
                    <Button style={{ width: '100%', textTransform: 'none', padding: 4 }}>
                      <Typography variant="body1" className={classes.userTitle}>
                        { pageOrganizer ?
                          <React.Fragment>{pageData.pagename}</React.Fragment>
                          :
                          <React.Fragment>{accountData.fullname} {accountData.lastname}</React.Fragment>
                        }
                      </Typography>
                    </Button>
                  </BTN.NoStyleLink>
                  { !pageOrganizer &&
                    <BTN.NoStyleLink
                      to={`/user/profile/${accountData.userid}`}>
                      <Button style={{ width: '100%', textTransform: 'none', padding: 4 }}>
                        <Typography variant="caption" className={classes.userTitle}>
                          {accountData.email}
                        </Typography>
                      </Button>
                    </BTN.NoStyleLink>
                  }
                  { sess &&
                    <div
                      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <IconButton onClick={handleSwitchLanguage}>
                        <Translate style={{ color: COLOR.primary[700] }} />
                      </IconButton>
                      <div style={{ fontSize: 16, fontWeight: 600, color: COLOR.grey[500], padding: 12  }}>
                        {sess.language}
                      </div>
                    </div>
                  }
                </div>
              }
            </div>
            <Divider />
          </React.Fragment>
        }
        <Divider />
        <List>
          <ListItem button onClick={toggleNoti} className={classes.iconHidden}>
            <ListItemIcon>
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
            </ListItemIcon>
            <ListItemText primary={ ( sess && sess.language === 'TH' ) ? "การแจ้งเตือน" : 'Notifications' } />
          </ListItem>
          <ListItem button onClick={toggleCreateMatch}>
            <ListItemIcon>
              <AddCircleOutline />
            </ListItemIcon>
            <ListItemText className={classes.listTitle}
              primary={ ( sess && sess.language === 'TH' ) ? "สร้างการแข่งขัน" : 'Create Match' } />
          </ListItem>
          <Divider />
        </List>
        { pageOrganizer && accountData &&
          <React.Fragment>
            <BTN.NoStyleLink to='/user'>
              <ListItem button>
                <ListItemIcon>
                  { accountData.photopath ?
                    <Avatar className={classes.avatarImage}
                      src={API._getPictureUrl(accountData.photopath) + ( isSupportWebp? '.webp' : '.jpg' ) + '#' + new Date().toISOString()} />
                    :
                    <AccountCircle classes={{ root: classes.avatar }} />
                  }
                </ListItemIcon>
                <ListItemText primary={ ( sess && sess.language === 'TH' ) ? "ผู้ใช้งาน" : 'User' } />
              </ListItem>
            </BTN.NoStyleLink>
            <Divider />
          </React.Fragment>
        }
        <List>
          <ListItem button onClick={toggleCreatePage}>
            <ListItemIcon>
              <Flag />
            </ListItemIcon>
            <ListItemText className={classes.listTitle}
              primary={ ( sess && sess.language === 'TH' ) ? "สร้างกลุ่ม" : 'Create Organizer' } />
          </ListItem>
          <ListPage {...props} />
        </List>
        <Divider />
        <List>
          { ( open ? window.innerWidth < 840 : window.innerWidth < 600 ) &&
            <BTN.NoStyleLink to='/'>
              <ListItem button>
                <ListItemIcon>
                  <img src={ic_logo} className={classes.logoImg} />
                </ListItemIcon>
                <ListItemText primary="ToffTime" />
              </ListItem>
            </BTN.NoStyleLink>
          }
          { sess &&
            <BTN.NoStyleLink to={`/${ pageOrganizer ? 'organizer' : 'user' }/${ pageOrganizer ? pageData.pageid : '' }`}>
              <ListItem button
                style={{
                  ...(window.location.pathname === `/${ pageOrganizer ? 'organizer' : 'user' }/${ pageOrganizer ? pageData.pageid : '' }`) &&
                  { backgroundColor: COLOR.grey[300] },
                }}>
                <ListItemIcon><Dashboard /></ListItemIcon>
                <ListItemText primary={ ( sess && sess.language === 'TH' ) ? "หน้าหลัก" : 'Dashboard' } />
              </ListItem>
            </BTN.NoStyleLink>
          }
          {/*
            <BTN.NoStyleLink to={`/${ pageOrganizer ? `organizer/${pageData.pageid}` : 'user' }/management`}>

            </BTN.NoStyleLink>*/
          }
          <ListItem button onClick={()=>handleExpand('management')}>
            <ListItemIcon><SettingsApplications /></ListItemIcon>
            <ListItemText primary={ ( sess && sess.language === 'TH' ) ? "ระบบการจัดการ" : 'Management' } />
          </ListItem>
          <Collapse in={expanded.management} timeout="auto" style={{ minHeight: 'auto' }}>
            <BTN.NoStyleLink to={`/${ pageOrganizer ? `organizer/${pageData.pageid}` : 'user' }/management/match`}>
              <ListItem button
                style={{
                  ...(window.location.pathname.includes(`/${ pageOrganizer ? `organizer/${pageData.pageid}` : 'user' }/management/match`)) &&
                  { backgroundColor: COLOR.grey[300] },
                }}>
                <ListItemText inset primary={ ( sess && sess.language === 'TH' ) ? "การแข่งขัน" : 'Match' } />
              </ListItem>
            </BTN.NoStyleLink>
            <BTN.NoStyleLink to={`/${ pageOrganizer ? `organizer/${pageData.pageid}` : 'user' }/management/course`}>
              <ListItem button
                style={{
                  ...(window.location.pathname.includes(`/${ pageOrganizer ? `organizer/${pageData.pageid}` : 'user' }/management/course`)) &&
                  { backgroundColor: COLOR.grey[300] },
                }}>
                <ListItemText inset primary={ ( sess && sess.language === 'TH' ) ? "สนาม" : 'Course' } />
              </ListItem>
            </BTN.NoStyleLink>
          </Collapse>
          <BTN.NoStyleLink to={`/${ pageOrganizer ? `organizer/${pageData.pageid}` : 'user' }/history`}>
            <ListItem button
              style={{
                ...(window.location.pathname === `/${ pageOrganizer ? `organizer/${pageData.pageid}` : 'user' }/history`) &&
                { backgroundColor: COLOR.grey[300] },
              }}>
              <ListItemIcon><History /></ListItemIcon>
              <ListItemText primary={ ( sess && sess.language === 'TH' ) ? "ประวัติ" : 'History' } />
            </ListItem>
          </BTN.NoStyleLink>
          <BTN.NoStyleLink to={`/${ pageOrganizer ? `organizer/${pageData.pageid}` : 'user' }/upcoming`}>
            <ListItem button
              style={{
                ...(window.location.pathname === `/${ pageOrganizer ? `organizer/${pageData.pageid}` : 'user' }/upcoming`) &&
                { backgroundColor: COLOR.grey[300] },
              }}>
              <ListItemIcon><Event /></ListItemIcon>
              <ListItemText primary={ ( sess && sess.language === 'TH' ) ? "เร็วๆนี้" : 'Upcoming' } />
            </ListItem>
          </BTN.NoStyleLink>
          {/*
            <ListItem button onClick={toggleHistory}>
              <ListItemIcon><History /></ListItemIcon>
              <ListItemText primary={ ( sess && sess.language === 'TH' ) ? "ประวัติ" : 'History' } />
            </ListItem>
            <ListItem button onClick={toggleUpcoming}>
              <ListItemIcon><Event /></ListItemIcon>
              <ListItemText primary={ ( sess && sess.language === 'TH' ) ? "เร็วๆนี้" : 'Upcoming' } />
            </ListItem>*/
          }
        </List>
        <ListFriend expanded={expanded} handleExpand={handleExpand} state={expanded.friend} {...props} />
        <ListFollow expanded={expanded} handleExpand={handleExpand} state={expanded.follow} {...props} />
        <Divider />
        <List>
          <ListItem button onClick={toggleConfirmLogout} className={classes.logout}>
            <ListItemIcon><ExitToApp classes={{ root: classes. logoutIcon }} /></ListItemIcon>
            <ListItemText className={classes.logoutTitle}
              primary={ ( sess && sess.language === 'TH' ) ? "ลงชื่อออก" : 'Log out' } />
          </ListItem>
        </List>
      </Drawer>
      <TemplateDialog maxWidth={400} open={confirmLogout} handleClose={toggleConfirmLogout}>
        {/*handleLogout*/}
        <Typography component="div">
          <Box className={classes.confirmTitle} fontWeight={600} m={1}>
            { ( sess && sess.language === 'TH' ) ? "ต้องการลงชื่อออกหรือไม่ ?" : 'Are you sure you want to Log out?' }
          </Box>
        </Typography>
        <Divider style={{ marginTop: 16, marginBottom: 16 }} />
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <BTN.PrimaryText fullWidth onClick={toggleConfirmLogout} className={classes.confirmButton}>
            { ( sess && sess.language === 'TH' ) ? "ยกเลิก" : 'Cancel' }
          </BTN.PrimaryText>
          <BTN.Red fullWidth onClick={handleLogout} className={classes.confirmButton}>
            { ( sess && sess.language === 'TH' ) ? "ลงชื่อออก" : 'Log out' }
          </BTN.Red>
        </div>
      </TemplateDialog>
    </React.Fragment>
  );
}
