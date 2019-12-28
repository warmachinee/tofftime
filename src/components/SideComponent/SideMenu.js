import React from 'react';
import Loadable from 'react-loadable';
import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrophy, faCalculator } from '@fortawesome/free-solid-svg-icons'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import * as COLOR from './../../api/palette'

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
  Collapse,
  Tooltip,

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
  GolfCourse,
  Note as NoteIcon,
  Language as LanguageIcon,
  Help as HelpIcon,

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

const ConfirmDialog = Loadable({
  loader: () => import(/* webpackChunkName: "ConfirmDialog" */'./../Utils/Dialog/ConfirmDialog'),
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
  userInfo: {
    width: '100%',
    padding: '16px 16px 0 16px',
    boxSizing: 'border-box',
  },
  avatarInfo: {
    fontSize: 120,
    [theme.breakpoints.down(600)]: {
      fontSize: 64,
    },
  },
  avatarImageInfo: {
    width: 120,
    height: 120,
    [theme.breakpoints.down(600)]: {
      width: 64,
      height: 64,
    },
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
    notiData, toggleNoti,
    pageOrganizer, pageData
  } = props
  const [ pageList, setPageList ] = React.useState(null)
  const [ confirmLogout, setConfirmLogout ] = React.useState(false)
  const [ expanded, setExpanded ] = React.useState({
    management: window.location.pathname.includes(`/${ pageOrganizer ? `organizer/${pageData.pageid}` : 'user' }/management`),
    friend: false,
    follow: false
  });

  function handleClickNotiButton(){
    toggleNoti()
    if(window.innerWidth <= 600){
      props.setOpen(false)
    }
  }

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
          window.location.reload()
        }, 1000)
      }
    })
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
      toggleConfirmLogout()
      handleDrawerClose()
      setCSRFToken(csrf)
      handleSess(d)
    })
  }

  async function updateUserinfo(){
    const resToken = token? token : await API._xhrGet('getcsrf')
    await API._xhrPost(
      token? token : resToken.token,
      'userinfo', {
    }, (csrf, d) =>{
      setCSRFToken(csrf)
      handleSess(d)
    })
  }

  async function tutorialOpen(){
    const resToken = token? token : await API._xhrGet('getcsrf')
    await API._xhrPost(
      token? token : resToken.token,
      'tutorial', {
        action: 'loginfirst',
        toggle: 'true'
    }, (csrf, d) =>{
      setCSRFToken(csrf)
      updateUserinfo()
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
            <div className={classes.userInfo} style={{ ...( !open && window.innerWidth > 600 && {paddingBottom: 16}) }}>
              <BTN.NoStyleLink
                to={`/${ pageOrganizer ? `organizer/${pageData.pageid}` : 'user' }/profile/${ pageOrganizer? '' : accountData.userid}`}>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <IconButton style={{ padding: 0 }} onClick={()=>window.innerWidth <= 600 ? props.setOpen(false) : console.log()}>
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
                          src={accountData.photopath} />
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
                    <Button style={{ width: '100%', textTransform: 'none', padding: 4 }} onClick={()=>window.innerWidth <= 600 ? props.setOpen(false) : console.log()}>
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
                      <Button style={{ width: '100%', textTransform: 'none', padding: 4 }} onClick={()=>window.innerWidth <= 600 ? props.setOpen(false) : console.log()}>
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
                        <LanguageIcon style={{ color: COLOR.primary[700] }} />
                      </IconButton>
                      <div style={{ fontSize: 16, fontWeight: 600, color: COLOR.grey[500], padding: 12  }}>
                        {sess.language}
                      </div>
                    </div>
                  }
                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <IconButton onClick={tutorialOpen} style={{ padding: 4 }}>
                      <HelpIcon style={{ color: COLOR.primary[700] }} />
                    </IconButton>
                  </div>
                </div>
              }
            </div>
            <Divider />
          </React.Fragment>
        }
        <Divider />
        <List>
          <ListItem button onClick={handleClickNotiButton} className={classes.iconHidden}>
            <Tooltip title={ API._getWord(sess && sess.language).Notifications } placement="right">
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
            </Tooltip>
            <ListItemText primary={ API._getWord(sess && sess.language).Notifications } />
          </ListItem>
          <BTN.NoStyleLink to={`/${ pageOrganizer ? `organizer/${pageData.pageid}` : 'user' }/create_match`}>
            <ListItem button
               onClick={()=>window.innerWidth <= 600 ? props.setOpen(false) : console.log()}
              style={{
                ...(
                  window.location.pathname === `/${ pageOrganizer ? `organizer/${pageData.pageid}` : 'user' }/create_match`
                ) &&
                { backgroundColor: COLOR.grey[300] },
              }}>
              <Tooltip title={ API._getWord(sess && sess.language).Create_Match } placement="right">
                <ListItemIcon>
                  <AddCircleOutline />
                </ListItemIcon>
              </Tooltip>
              <ListItemText className={classes.listTitle}
                primary={ API._getWord(sess && sess.language).Create_Match } />
            </ListItem>
          </BTN.NoStyleLink>
          <Divider />
        </List>
        { pageOrganizer && accountData &&
          <React.Fragment>
            <BTN.NoStyleLink to='/user'>
              <ListItem button onClick={()=>window.innerWidth <= 600 ? props.setOpen(false) : console.log()}>
                <ListItemIcon>
                  { accountData.photopath ?
                    <Avatar className={classes.avatarImage}
                      src={accountData.photopath} />
                    :
                    <AccountCircle classes={{ root: classes.avatar }} />
                  }
                </ListItemIcon>
                <ListItemText primary={ API._getWord(sess && sess.language).User } />
              </ListItem>
            </BTN.NoStyleLink>
            <Divider />
          </React.Fragment>
        }
        <List>
          <BTN.NoStyleLink to={`/${ pageOrganizer ? `organizer/${pageData.pageid}` : 'user' }/create_page`}>
            <ListItem button
              onClick={()=>window.innerWidth <= 600 ? props.setOpen(false) : console.log()}
              style={{
                ...(
                  window.location.pathname === `/${ pageOrganizer ? `organizer/${pageData.pageid}` : 'user' }/create_page`
                ) &&
                { backgroundColor: COLOR.grey[300] },
              }}>
              <Tooltip title={ API._getWord(sess && sess.language).Create_Organizer } placement="right">
                <ListItemIcon>
                  <Flag />
                </ListItemIcon>
              </Tooltip>
              <ListItemText className={classes.listTitle}
                primary={ API._getWord(sess && sess.language).Create_Organizer } />
            </ListItem>
          </BTN.NoStyleLink>
          <ListPage {...props} />
        </List>
        <Divider />
        <List>
          { ( open ? window.innerWidth < 840 : window.innerWidth < 600 ) &&
            <BTN.NoStyleLink to='/'>
              <ListItem button onClick={()=>window.innerWidth <= 600 ? props.setOpen(false) : console.log()}>
                <ListItemIcon>
                  <img src={`https://file.${API._webURL()}/system/image/logoX2.png`} className={classes.logoImg} />
                </ListItemIcon>
                <ListItemText primary="ToffTime" />
              </ListItem>
            </BTN.NoStyleLink>
          }
          { sess &&
            <BTN.NoStyleLink to={`/${ pageOrganizer ? 'organizer' : 'user' }/${ pageOrganizer ? pageData.pageid : '' }`}>
              <ListItem button onClick={()=>window.innerWidth <= 600 ? props.setOpen(false) : console.log()}
                style={{
                  ...(window.location.pathname === `/${ pageOrganizer ? 'organizer' : 'user' }/${ pageOrganizer ? pageData.pageid : '' }`) &&
                  { backgroundColor: COLOR.grey[300] },
                }}>
                <Tooltip title={ API._getWord(sess && sess.language).Dashboard } placement="right">
                  <ListItemIcon><Dashboard /></ListItemIcon>
                </Tooltip>
                <ListItemText primary={ API._getWord(sess && sess.language).Dashboard } />
              </ListItem>
            </BTN.NoStyleLink>
          }
          {/*
            <BTN.NoStyleLink to={`/${ pageOrganizer ? `organizer/${pageData.pageid}` : 'user' }/management`}>

            </BTN.NoStyleLink>*/
          }
          <BTN.NoStyleLink to={`/user/simulator`}>
            <ListItem button onClick={()=>window.innerWidth <= 600 ? props.setOpen(false) : console.log()}>
              <Tooltip title={ API._getWord(sess && sess.language).Simulator } placement="right">
                <ListItemIcon><FontAwesomeIcon icon={faCalculator} style={{ marginLeft: 4, fontSize: 20 }} /></ListItemIcon>
              </Tooltip>
              <ListItemText primary={ API._getWord(sess && sess.language).Simulator } />
            </ListItem>
          </BTN.NoStyleLink>

          <ListItem button onClick={()=>handleExpand('management')}>
            <Tooltip title={ API._getWord(sess && sess.language).Management } placement="right">
              <ListItemIcon><SettingsApplications /></ListItemIcon>
            </Tooltip>
            <ListItemText primary={ API._getWord(sess && sess.language).Management } />
          </ListItem>
          <Collapse in={expanded.management} timeout="auto" style={{ minHeight: 'auto' }}>
            <BTN.NoStyleLink to={`/${ pageOrganizer ? `organizer/${pageData.pageid}` : 'user' }/management/match`}>
              <ListItem button onClick={()=>window.innerWidth <= 600 ? props.setOpen(false) : console.log()}
                style={{
                  ...(window.location.pathname.includes(`/${ pageOrganizer ? `organizer/${pageData.pageid}` : 'user' }/management/match`)) &&
                  { backgroundColor: COLOR.grey[300] },
                }}>
                {!open &&
                  <Tooltip
                    title={ API._getWord(sess && sess.language).Match_Management }
                    placement="right">
                    <ListItemIcon><FontAwesomeIcon icon={faTrophy} style={{ fontSize: 20 }} /></ListItemIcon>
                  </Tooltip>
                }
                <ListItemText inset={open} primary={ API._getWord(sess && sess.language).Match } />
              </ListItem>
            </BTN.NoStyleLink>
            <BTN.NoStyleLink to={`/${ pageOrganizer ? `organizer/${pageData.pageid}` : 'user' }/management/course`}>
              <ListItem button onClick={()=>window.innerWidth <= 600 ? props.setOpen(false) : console.log()}
                style={{
                  ...(window.location.pathname.includes(`/${ pageOrganizer ? `organizer/${pageData.pageid}` : 'user' }/management/course`)) &&
                  { backgroundColor: COLOR.grey[300] },
                }}>
                {!open &&
                  <Tooltip
                    title={ API._getWord(sess && sess.language).Course_Management }
                    placement="right">
                    <ListItemIcon><GolfCourse /></ListItemIcon>
                  </Tooltip>
                }
                <ListItemText inset={open} primary={ API._getWord(sess && sess.language).Course } />
              </ListItem>
            </BTN.NoStyleLink>
            { pageOrganizer &&
              <BTN.NoStyleLink to={`/${ pageOrganizer ? `organizer/${pageData.pageid}` : 'user' }/management/post`}>
                <ListItem button onClick={()=>window.innerWidth <= 600 ? props.setOpen(false) : console.log()}
                  style={{
                    ...(window.location.pathname.includes(`/${ pageOrganizer ? `organizer/${pageData.pageid}` : 'user' }/management/post`)) &&
                    { backgroundColor: COLOR.grey[300] },
                  }}>
                  {!open &&
                    <Tooltip
                      title={ API._getWord(sess && sess.language).Post_Management }
                      placement="right">
                      <ListItemIcon><NoteIcon /></ListItemIcon>
                    </Tooltip>
                  }
                  <ListItemText inset primary={ API._getWord(sess && sess.language).Post } />
                </ListItem>
              </BTN.NoStyleLink>
            }
          </Collapse>
          <BTN.NoStyleLink to={`/${ pageOrganizer ? `organizer/${pageData.pageid}` : 'user' }/upcoming`}>
            <ListItem button onClick={()=>window.innerWidth <= 600 ? props.setOpen(false) : console.log()}
              style={{
                ...(window.location.pathname === `/${ pageOrganizer ? `organizer/${pageData.pageid}` : 'user' }/upcoming`) &&
                { backgroundColor: COLOR.grey[300] },
              }}>
              <Tooltip title={ API._getWord(sess && sess.language).Upcoming } placement="right">
                <ListItemIcon><Event /></ListItemIcon>
              </Tooltip>
              <ListItemText primary={ API._getWord(sess && sess.language).Upcoming } />
            </ListItem>
          </BTN.NoStyleLink>
          <BTN.NoStyleLink to={`/${ pageOrganizer ? `organizer/${pageData.pageid}` : 'user' }/history`}>
            <ListItem button onClick={()=>window.innerWidth <= 600 ? props.setOpen(false) : console.log()}
              style={{
                ...(window.location.pathname === `/${ pageOrganizer ? `organizer/${pageData.pageid}` : 'user' }/history`) &&
                { backgroundColor: COLOR.grey[300] },
              }}>
              <Tooltip title={ API._getWord(sess && sess.language).History } placement="right">
                <ListItemIcon><History /></ListItemIcon>
              </Tooltip>
              <ListItemText primary={ API._getWord(sess && sess.language).History } />
            </ListItem>
          </BTN.NoStyleLink>
        </List>
        <ListFriend expanded={expanded} handleExpand={handleExpand} state={expanded.friend} {...props} />
        <ListFollow expanded={expanded} handleExpand={handleExpand} state={expanded.follow} {...props} />
        <Divider />
        {/*
          <List>
            <ListItem button onClick={toggleConfirmLogout} className={classes.logout}>
              <ListItemIcon><ExitToApp classes={{ root: classes. logoutIcon }} /></ListItemIcon>
              <ListItemText className={classes.logoutTitle}
                primary={ API._getWord(sess && sess.language).Log_out } />
            </ListItem>
          </List>*/
        }
      </Drawer>
      <ConfirmDialog
        sess={sess}
        open={confirmLogout}
        onClose={toggleConfirmLogout}
        icon="ExitToApp"
        iconColor={COLOR.red[600]}
        title={API._getWord(sess && sess.language)['Are you sure you want to Log out?']}
        onSubmit={handleLogout}
        submitButton="Red"
        submitText={API._getWord(sess && sess.language).Log_out} />
    </React.Fragment>
  );
}
