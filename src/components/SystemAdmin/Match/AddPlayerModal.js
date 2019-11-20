import React from 'react';
import socketIOClient from 'socket.io-client'
import { makeStyles, withStyles, createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import * as API from './../../../api'
import { primary, grey } from './../../../api/palette'

import {
  IconButton,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  InputAdornment,
  TextField,
  Collapse,
  Typography,
  Box,
  Divider,
  Avatar,

} from '@material-ui/core';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AddIcon from '@material-ui/icons/Add';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    width: '100%',
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
  createGrid: {
    display: 'flex',
    flexDirection: 'flex-end',
    marginBottom: 24
  },
  createButton: {
    marginTop: 'auto',
    padding: '8px 16px 8px 0',
    width: '100%',
    [theme.breakpoints.up(500)]: {
      width: 'auto'
    },
  },
  expandIcon: {
    marginRight: 8,
    marginLeft: 12
  },
  textFieldGrid: {
    padding: 16,
    marginBottom: 24,
    border: `3px solid ${primary[800]}`,
  },
  buttonGrid: {
    display: 'flex',
  },
  confirmButton: {
    width: '100%',
    marginTop: 16,
    padding: theme.spacing(1, 3),
    [theme.breakpoints.up(500)]: {
      width: 'auto'
    },
  },
  textField: {
    width: '100%',
    margin: theme.spacing(1, 0)
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
  avatar: {
    fontSize: 36
  },
  avatarImage: {
    width: 36,
    height: 36,
  },
  name: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },

}))

const GreenButton = withStyles(theme => ({
  root: {
    color: theme.palette.getContrastText(primary[500]),
    backgroundColor: primary[500],
    '&:hover': {
      backgroundColor: primary[700],
    },
  },
}))(Button);

const GreenTextButton = withStyles(theme => ({
  root: {
    color: primary[600],
    '&:hover': {
      backgroundColor: primary[100],
    },
  },
}))(Button);

const theme = createMuiTheme({
  palette: {
    primary: primary,
  },
});

export default function AddPlayerModal(props){
  const classes = useStyles();
  const { BTN, playerAction, sess, token, setCSRFToken, matchid, handleSnackBar, isSupportWebp, handleDummyOpen } = props

  const [ data, setData ] = React.useState(null)
  const [ createState, setCreateState ] = React.useState(false)
  const [ searchUser, setSearchUser ] = React.useState('')
  const [ fullname, setFullname ] = React.useState('')
  const [ lastname, setLastname ] = React.useState('')

  function handleInviteUser(d){
    const socket = socketIOClient( API._getWebURL() )//[0] : hostid , [1] : targetuserid

    socket.emit('match-request-client-message', {
      action: "invite",
      matchid: matchid,
      userid: [ sess.userid, d.userid ],
    })
  }

  async function handleCreatePlayer(){
    const resToken = token? token : await API._xhrGet('getcsrf')
    await API._xhrPost(
      token? token : resToken.token,
      'usersystem', {
        action: 'create',
        fullname: fullname,
        lastname: lastname
    }, (csrf, d) =>{
      setCSRFToken(csrf)
      handleSnackBar({
        state: true,
        message: d.status,
        variant: /success/.test(d.status) ? 'success' : 'error',
        autoHideDuration: /success/.test(d.status)? 2000 : 5000
      })
    })
  }

  async function handleCreateDummyPlayer(){
    if(matchid){
      const resToken = token? token : await API._xhrGet('getcsrf')
      await API._xhrPost(
        token? token : resToken.token,
        'mmatchmember', {
          action: 'dummy',
          matchid: matchid,
          fullname: fullname,
          lastname: lastname,
          dmaction: 'add'
      }, (csrf, d) =>{
        setCSRFToken(csrf)
        handleSnackBar({
          state: true,
          message: d.status,
          variant: /success/.test(d.status) ? 'success' : 'error',
          autoHideDuration: /success/.test(d.status)? 2000 : 5000
        })
      })
    }
  }

  async function handleAddUser(d){
    const resToken = token? token : await API._xhrGet('getcsrf')
    await API._xhrPost(
      token? token : resToken.token,
      sess.typeid === 'admin' ? 'matchmember' : 'mmatchmember', {
        action: 'add',
        matchid: matchid,
        userid: d.userid
    }, (csrf, d) =>{
      setCSRFToken(csrf)
      handleSnackBar({
        state: true,
        message: d.status,
        variant: d.status === 'add member success' ? 'success' : 'error',
        autoHideDuration: /success/.test(d.status)? 2000 : 5000
      })
    })
  }

  function handleChangePerson(e){
    if(e){
      setSearchUser(e.target.value)
      if(sess){
        const socket = socketIOClient( API._getWebURL() )
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

  function handleLoadPersonDefault(){
    if(sess){
      const socket = socketIOClient( API._getWebURL() )
      socket.emit('search-client-message', {
        action: "person",
        userid: sess.userid,
        text: ''
      })
    }
  }

  function responsePlayer(){
    if(sess){
      const socket = socketIOClient( API._getWebURL() )
      socket.on(`${sess.userid}-person-search-server-message`, (messageNew) => {
        setData(messageNew.result.infolist)
      })
    }
  }

  React.useEffect(()=>{
    responsePlayer()
    handleLoadPersonDefault()
  },[ ])

  return(
    <div className={classes.root}>
      { sess && sess.typeid === 'admin' &&
        <div className={classes.createGrid}>
          <GreenTextButton
            variant="outlined"
            className={classes.createButton}
            onClick={()=>setCreateState(!createState)}>
            <ExpandMoreIcon
              className={classes.expandIcon}
              style={{ transform: createState?'rotate(180deg)':'rotate(0deg)' }} />
            { API._getWord(sess && sess.language).Create_user }
          </GreenTextButton>
        </div>
      }
      <Collapse in={createState} timeout="auto" unmountOnExit>
        <div className={classes.textFieldGrid}>
          <ThemeProvider theme={theme}>
            <TextField
              autoFocus={createState}
              className={classes.textField}
              variant="outlined"
              label="Full name"
              value={fullname}
              onChange={e =>setFullname(e.target.value)}
              />
            <TextField
              className={classes.textField}
              variant="outlined"
              label="Last name"
              value={lastname}
              onChange={e =>setLastname(e.target.value)}
              />
          </ThemeProvider>
          <div className={classes.buttonGrid}>
            <Typography component="div">
              <Box className={classes.notice} m={1}>
                Fill the form and click confirm <br></br>to create a new player.
              </Box>
            </Typography>
            <div style={{ flex: 1 }} />
            <GreenButton
              className={classes.confirmButton}
              onClick={()=> sess.typeid === 'admin' ? handleCreatePlayer() : handleCreateDummyPlayer()}>
              Confirm
            </GreenButton>
          </div>
        </div>
      </Collapse>
      <ThemeProvider theme={theme}>
        <TextField
          autoFocus
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
        <GreenTextButton
          style={{ marginTop: 10 }}
          onClick={handleDummyOpen}>
          { API._getWord(sess && sess.language).Dummy }
        </GreenTextButton>
      </ThemeProvider>
      <List className={classes.root}>
        { data && !data.status &&
          data.map(value => {
              return value && (
                <React.Fragment key={value.firstname + `(${value.userid})`}>
                  <ListItem role={undefined} dense button
                    onClick={()=>playerAction === 'add' ? handleAddUser(value) : handleInviteUser(value)}>
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
                      secondary={ value.nickname !== '-'? value.nickname : '' } />
                  </ListItem>
                  <Divider />
                </React.Fragment>
              );
          })
        }
      </List>
      { data && data.length === 0 &&
        ( searchUser ?
          <Typography component="div" style={{ width: '100%' }}>
            <Box style={{ textAlign: 'center', color: primary[900] }} fontWeight={500} fontSize={24} m={1}>
              { API._getWord(sess && sess.language)['No Result? Create one.'] }
            </Box>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 16, marginBottom: 16, }}>
              <BTN.PrimaryOutlined onClick={handleDummyOpen/*()=>setCreateState(!createState)*/}>
                <AddIcon style={{ marginRight: 8 }} />
                { API._getWord(sess && sess.language).Create_New_User }
              </BTN.PrimaryOutlined>
            </div>
          </Typography>
          :
          <Typography component="div" style={{ width: '100%' }}>
            <Box style={{ textAlign: 'center', color: primary[900] }} fontWeight={500} fontSize={24} m={1}>
              { API._getWord(sess && sess.language)['Search player that you want to invite'] }
            </Box>
          </Typography>
        )
      }
    </div>
  );
}
