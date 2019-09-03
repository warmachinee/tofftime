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

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2)
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
    fontSize: 120
  },
  avatarImage: {
    width: 120,
    height: 120,
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
  const [ pendingData, setPendingData ] = React.useState(null)

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
        console.log("Person : ", messageNew.result.infolist);
        setData(messageNew.result.infolist)
      })
    }
  }

  async function handleFetch(){
    const resToken = token? token : await API.xhrGet('getcsrf')
    await API.xhrPost(
      token? token : resToken.token,
      'loadusersystem', {
        action: 'friend',
        fstatus: 'pending'
    }, (csrf, d) =>{
      setCSRFToken(csrf)
      setPendingData(d)
      //console.log('pending ', d);
    })
  }

  React.useEffect(()=>{
    handleFetch()
    responsePerson()
    /*
    var json = '["968694-person-search-server-message",{"status":"success","result":{"infolist":[{"userid":317246,"nickname":"-","fullname":"Akira","lastname":"Osaka","photopath":null},{"userid":123456,"nickname":"-","fullname":"thanapat","lastname":"taweerat","photopath":null},{"userid":317029,"nickname":"-","fullname":"CHO HAN","lastname":"JIN","photopath":null},{"userid":511165,"nickname":"-","fullname":"Jack","lastname":"Dawson","photopath":null},{"userid":784669,"nickname":"-","fullname":"Alexander","lastname":"Vincent Mckay","photopath":null},{"userid":169226,"nickname":"-","fullname":"Batman2","lastname":"Banmat","photopath":null},{"userid":166164,"nickname":"-","fullname":"Giovanni","lastname":"Palazzoli","photopath":null},{"userid":661186,"nickname":"meaw","fullname":"Thanapat","lastname":"Taweerat","photopath":"/general/661186.webp"},{"userid":812454,"nickname":"P.R.E.M.io","fullname":"Sippakorn","lastname":"Suppapinyo","photopath":"/general/812454.webp"},{"userid":294738,"nickname":"-","fullname":"Khiangduen","lastname":"Ponconbury","photopath":"/general/294738.webp"}]}}]'
    setData(JSON.parse(json)[1].result.infolist)*/
  },[ ])

  return (
    <div className={classes.root}>
      <ThemeProvider theme={theme}>
        <TextField
          autoFocus
          className={classes.searchBox}
          variant="outlined"
          placeholder={ !searchUser? "Search player" : '' }
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
        { pendingData &&
          pendingData.map( d => <ListPlayerItem pending key={d.userid} data={d} {...props} setPendingData={setPendingData}/> )
        }
        { data &&
          data.map( d => <ListPlayerItem key={d.userid} data={d} {...props} setPendingData={setPendingData}/> )
        }
      </List>
    </div>
  )
}

function ListPlayerItem(props) {
  const classes = useStyles();
  const { API, BTN, COLOR, sess, token, setCSRFToken, isSupportWebp, handleSnackBar, data, pending, setPendingData } = props
  const [ anchorEl, setAnchorEl ] = React.useState(null);

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
      const socket = socketIOClient( API.getWebURL() )
      console.log({
        action: action,
        userid: sess.userid,
        targetid: userid
      });
      socket.emit('friend-client-message', {
        action: action,
        userid: sess.userid,
        targetid: userid
      })
      setTimeout(()=>{
        handleFetch()
      },1000)
    }
  }

  async function handleFetch(){
    const resToken = token? token : await API.xhrGet('getcsrf')
    await API.xhrPost(
      token? token : resToken.token,
      'loadusersystem', {
        action: 'friend',
        fstatus: 'pending'
    }, (csrf, d) =>{
      setCSRFToken(csrf)
      setPendingData(d)
    })
  }

  return (
    <React.Fragment>
      <ListItem button>
        <ListItemText
          onClick={handleMenuClick}
          primary={
            <React.Fragment>
              <Typography className={classes.name} variant="body2">
                {data.fullname} {data.lastname}
              </Typography>
            </React.Fragment>
          }
          secondary={pending ? 'Pending' : '' }/>
        <ListItemIcon>
          <BTN.Primary
            style={{ padding: 4 }}
            onClick={()=>pending ? handleFriendClick(data.userid, 'un') : handleFriendClick(data.userid, 'add')}>
            { pending ? 'Unfriend' : 'Add' }
          </BTN.Primary>
        </ListItemIcon>
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
