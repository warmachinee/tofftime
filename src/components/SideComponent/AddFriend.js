import React from 'react';
import socketIOClient from 'socket.io-client'
import Loadable from 'react-loadable';
import { makeStyles, withStyles, createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { primary } from './../../api/palette'

import {
  Avatar,
  Button,
  Paper,
  TextField,
  InputAdornment,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Typography,
  Menu,
} from '@material-ui/core'

import {
  Add,
  Search,
  Clear,
  AccountCircle,

} from '@material-ui/icons';

const UserOverview = Loadable({
  loader: () => import(/* webpackChunkName: "UserOverview" */'./UserOverview'),
  loading: () => null
});

const LabelText = Loadable({
  loader: () => import(/* webpackChunkName: "LabelText" */ './../LabelText'),
  loading: () => null
});

const useStyles = makeStyles(theme => ({
  root: {

  },
  searchBox: {
    width: '100%',
    [theme.breakpoints.up(500)]: {
      width: 'auto'
    },
  },
  name: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
  avatar: {
    fontSize: 36
  },
  avatarImage: {
    width: 36,
    height: 36,
  },

}));

const theme = createMuiTheme({
  palette: {
    primary: primary,
  },
});

export default function AddFriend(props) {
  const classes = useStyles();
  const { API, BTN, sess, token, setCSRFToken } = props
  const [ searchUser, setSearchUser ] = React.useState('')
  const [ data, setData ] = React.useState(null)

  function handleChangePerson(e){
    if(e){
      setSearchUser(e.target.value)
      if(sess){
        const socket = socketIOClient( API.getWebURL() )
        socket.emit('search-client-message', {
          action: "person",
          userid: sess.userid,
          text: e.target.value
        })
      }
    }else{
      setSearchUser('')
    }
  }

  function responsePerson(){
    if(sess){
      const socket = socketIOClient( API.getWebURL() )
      socket.on(`${sess.userid}-person-search-server-message`, (messageNew) => {
        setData(messageNew.result.infolist)
      })
    }
  }

  React.useEffect(()=>{
    responsePerson()
  },[ ])

  return (
    <div className={classes.root}>
      <LabelText text={ ( sess && sess.language === 'TH' ) ? "ค้นหา" : 'Search' } />
      <ThemeProvider theme={theme}>
        <TextField
          autoFocus
          className={classes.searchBox}
          style={{ marginTop: 24 }}
          variant="outlined"
          placeholder={ !searchUser? ( ( sess && sess.language === 'TH' ) ? "ค้นหาเพื่อน" : 'Search' ) : '' }
          value={searchUser}
          onChange={handleChangePerson}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search color="primary"/>
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                { searchUser?
                  <IconButton onClick={()=>handleChangePerson(null)}>
                    <Clear color="inherit" fontSize="small"/>
                  </IconButton>
                  :
                  <div style={{ width: 44 }}></div>
                }
              </InputAdornment>
            )
          }}
        />
      </ThemeProvider>
      <List>
        { data &&
          data.map( d => <ListPlayerItem key={d.userid} data={d} {...props} /> )
        }
      </List>
    </div>
  )
}

function ListPlayerItem(props) {
  const classes = useStyles();
  const { API, BTN, COLOR, sess, token, setCSRFToken, isSupportWebp, handleSnackBar, data } = props
  const [ anchorEl, setAnchorEl ] = React.useState(null);
  const [ status, setStatus ] = React.useState(data.status);

  function getFriendStatus(status){
    switch (true) {
      case status === 'pending':
        return ( sess && sess.language === 'TH' ) ? "รอดำเนินการ" : 'Pending'
        break;
      case status === 'friend':
        return ( sess && sess.language === 'TH' ) ? "เพื่อน" : 'Friend'
        break;
      default:
        return ''
    }
  }

  function handleMenuClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  function handleFriendClick(userid, action){
    if(action === 'add'){
      handleFriend(userid, 'add')
    }else{
      handleFriend(userid, 'un')
    }
  }

  function handleFriend(userid, action){
    if(sess){
      responseConfirmFriend(sess.userid, userid)
      setTimeout(()=>{
        const socket = socketIOClient( API.getWebURL() )
        socket.emit('friend-client-message', {
          action: action,
          userid: sess.userid,
          targetid: userid
        })
      },1000)
    }
  }

  function responseConfirmFriend(sessid, targetid){
    if(sessid && targetid){
      const socket = socketIOClient( API.getWebURL() )
      socket.on(`${sessid}-${targetid}-friend-request-server-message`, (messageNew) => {
        if(messageNew && messageNew.status === 'success' && messageNew.result && messageNew.result.status === 'success'){
          handleClose()
          if(messageNew.result.notidetail){
            switch (messageNew.result.notidetail.action) {
              case 'add request':
                setStatus('pending')
                break;
              case 'un request':
                setStatus(null)
                break;
              default:
                setStatus(data.status)
            }
          }
        }else{
          setStatus(data.status)
        }
      })
    }
  }

  React.useEffect(()=>{
    responseConfirmFriend()
  },[ ])

  return (
    <React.Fragment>
      <ListItem button>
        <ListItemIcon onClick={handleMenuClick}>
          { data.photopath ?
            <Avatar className={classes.avatarImage}
              src={API.getPictureUrl(data.photopath) + ( isSupportWebp? '.webp' : '.jpg' ) + '#' + new Date().toISOString()} />
            :
            <AccountCircle classes={{ root: classes.avatar }} />
          }
        </ListItemIcon>
        <ListItemText
          onClick={handleMenuClick}
          primary={
            <React.Fragment>
              <Typography className={classes.name} variant="body2">
                {data.fullname} {data.lastname}
              </Typography>
            </React.Fragment>
          }
          secondary={getFriendStatus(status)} />
        { status !== 'friend' &&
          <ListItemIcon>
            { status === 'pending'?
              <BTN.Red style={{ padding: '4px 12px' }}
                onClick={()=>handleFriendClick(data.userid, 'un')}>
                { ( sess && sess.language === 'TH' ) ? "ลบเพื่อน" : 'Unfriend' }
              </BTN.Red>
              :
              <BTN.Primary
                style={{ padding: 4 }}
                onClick={()=>handleFriendClick(data.userid, 'add')}>
                { ( sess && sess.language === 'TH' ) ? "เพิ่มเพื่อน" : 'Add' }
              </BTN.Primary>
            }
          </ListItemIcon>
        }
      </ListItem>
      <Divider />
      <UserOverview
        {...props}
        anchorEl={anchorEl}
        handleClose={handleClose}
        handleFriend={handleFriend} />
    </React.Fragment>
  );
}
