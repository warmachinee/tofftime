import React from 'react';
import socketIOClient from 'socket.io-client'
import { makeStyles, withStyles, createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import * as API from './../../../api'
import { primary, grey } from './../../../api/palette'

import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Avatar from '@material-ui/core/Avatar';

import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    width: '100%',
    backgroundColor: grey[50],
    cursor: 'pointer',
    marginTop: 36,
    maxHeight: '100%'
  },
  margin: {
    margin: theme.spacing(1),
    width: '100%'
  },
  listText:{
    width: '100%',
    textAlign: 'left'
  },
  searchBox: {
    width: '100%',
    [theme.breakpoints.up(500)]: {
      width: 'auto'
    },
  },
  notice: {
    fontFamily: 'monospace',
    color: grey[600],
    fontWeight: 600,
  },
  listItemIcon: {
    margin: theme.spacing(2, 0)
  },
  addCircleIcon: {
    color: primary[600]
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

}))

const theme = createMuiTheme({
  palette: {
    primary: primary,
  },
});

function ListMenu(props) {
  const classes = useStyles();
  const { sess, token, setCSRFToken, handleSnackBar, isSupportWebp, setAdminData, value, pageData, admin } = props
  const [ anchorEl, setAnchorEl ] = React.useState(null);

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  async function handleSelectRole(val, role){
    const resToken = token? token : await API._xhrGet('getcsrf')
    await API._xhrPost(
      token? token : resToken.token,
      'ppagesection', {
        action: 'setadmin',
        pageid: pageData.pageid,
        userid: val.userid,
        setadmin: role
    }, (csrf, d) =>{
      setCSRFToken(csrf)
      handleSnackBar({
        state: true,
        message: d.status,
        variant: /success/.test(d.status) ? d.status : 'error',
        autoHideDuration: /success/.test(d.status)? 2000 : 5000
      })
      if(/success/.test(d.status)){
        handleClose()
        handleFetch()
      }
    })
  }

  async function handleFetch(){
    const resToken = token? token : await API._xhrGet('getcsrf')
    await API._xhrPost(
      token? token : resToken.token,
      'ploadpage', {
        action: 'admin',
        pageid: pageData.pageid
    }, (csrf, d) =>{
      setCSRFToken(csrf)
      setAdminData(d)
    })
  }

  return (
    <div>
      <React.Fragment>
        <ListItem button
          onClick={e => ( admin && admin.some( d =>{ return d.userid === value.userid }) ) ? handleClick(e) : handleSelectRole(value, 'set') }>
          <ListItemIcon>
            { ( admin && admin.some( d =>{ return d.userid === value.userid }) ) ?
              <CheckCircleIcon style={{ color: primary[600] }} />
              :
              <div style={{ width: 24 }} />
            }
          </ListItemIcon>
          <ListItemIcon>
            { value.photopath ?
              <Avatar className={classes.avatarImage}
                src={API._getPictureUrl(value.photopath) + ( isSupportWebp? '.webp' : '.jpg' ) + '#' + new Date().toISOString()} />
              :
              <AccountCircleIcon classes={{ root: classes.avatar }} />
            }
          </ListItemIcon>
          <ListItemText
            primary={
              <React.Fragment>
                <Typography className={classes.name} variant="body2">
                  {value.fullname} {value.lastname}
                </Typography>
              </React.Fragment>
            }
            {
              ...value.nickname !== '-' && { secondary: value.nickname }
            } />
        </ListItem>
        <Divider />
      </React.Fragment>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={()=>handleSelectRole(value, 'unset')}>{ API._getWord(sess && sess.language).Remove }</MenuItem>
      </Menu>
    </div>
  );
}

export default function AddAdmin(props){
  const classes = useStyles();
  const { sess, token, setCSRFToken, handleSnackBar } = props
  const [ data, setData ] = React.useState(null)
  const [ createState, setCreateState ] = React.useState(false)
  const [ searchUser, setSearchUser ] = React.useState('')

  function handleChangePerson(e){
    if(e){
      setSearchUser(e.target.value)
      if(sess){
        const socket = socketIOClient( API._getWebURL(), { transports: ['websocket', 'polling'] } )
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
      const socket = socketIOClient( API._getWebURL(), { transports: ['websocket', 'polling'] } )
      socket.on(`${sess.userid}-person-search-server-message`, (messageNew) => {
        setData(messageNew.result.infolist)
      })
    }
  }

  React.useEffect(()=>{
    responsePerson()
  },[ ])

  return(
    <div className={classes.root}>
      <ThemeProvider theme={theme}>
        <TextField
          autoFocus={API._isDesktopBrowser()}
          className={classes.searchBox}
          variant="outlined"
          placeholder={ !searchUser? ( API._getWord(sess && sess.language).Search ) : '' }
          value={searchUser}
          onChange={handleChangePerson}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="primary"/>
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                { searchUser?
                  <IconButton onClick={()=>handleChangePerson(null)}>
                    <ClearIcon color="inherit" fontSize="small"/>
                  </IconButton>
                  :
                  <div style={{ width: 44 }}></div>
                }
              </InputAdornment>
            )
          }}
        />
      </ThemeProvider>
      <List className={classes.root}>
        { data && !data.status &&
          data.map(value => {
              return value && (
                <ListMenu
                  key={value.fullname + `(${value.userid})`}
                  value={value}
                  {...props}
                />
              );
          })
        }
        { searchUser && data && data.length === 0 &&
          <ListItem>
            <Typography component="div" style={{ width: '100%' }}>
              <Box style={{ textAlign: 'center', color: primary[900] }} fontWeight={500} fontSize={24} m={1}>
                No Result
              </Box>
            </Typography>
          </ListItem>
        }
      </List>
    </div>
  );
}
