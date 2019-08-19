import React from 'react';
import Fuse from 'fuse.js';
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
import Collapse from '@material-ui/core/Collapse';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

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
    borderRadius: 4,
    border: `1.5px solid ${primary[600]}`,
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

function ListMenu(props) {
  const classes = useStyles();
  const { sess, admin, token, setCSRFToken, matchid, handleSnackBar, setData, value } = props
  const [ anchorEl, setAnchorEl ] = React.useState(null);

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  async function handleSelectRole(val, role){
    const resToken = token? token : await API.xhrGet('getcsrf')
    await API.xhrPost(
      token? token : resToken.token,
      sess.typeid === 'admin' ? 'matchsection' : 'mmatchsection', {
        action: 'setadmin',
        matchid: matchid,
        userid: val.userid,
        setaction: role
    }, (csrf, d) =>{
      setCSRFToken(csrf)
      try {
        handleLoadUser()
      }catch(err) { console.log(err.message) }
    })
  }

  async function handleLoadUser(){
    if(matchid){
      const resToken = token? token : await API.xhrGet('getcsrf')
      await API.xhrPost(
        token? token : resToken.token,
        sess.typeid === 'admin' ? 'loadmatch' : 'mloadmatch', {
          action: 'userlist',
          matchid: matchid
      }, (csrf, d) =>{
        setCSRFToken(csrf)
        if(
          d.status !== 'no data' ||
          d.status !== 'wrong action' ||
          d.status !== 'wrong params'
        ){
          handleClose()
          setData(d)
        }else{
          handleSnackBar({
            state: true,
            message: d.status,
            variant: 'error',
            autoHideDuration: 5000
          })
        }
      })
    }
  }

  return (
    <div>
      <React.Fragment>
        <ListItem role={undefined} dense button
          onClick={e => admin && admin.some( d =>{ return d.userid !== value.userid }) ? handleClick(e) : console.log() }>
          <ListItemIcon className={classes.listItemIcon}>
            { admin && admin.some( d =>{ return d.userid === value.userid }) ?
              <CheckCircleIcon classes={{ root: classes.addCircleIcon }}/>
              :
              <div style={{ width: 24, height: 24 }}/>
            }
          </ListItemIcon>
          <ListItemText className={classes.listText} primary={value.firstname} />
          <ListItemText className={classes.listText} primary={value.lastname} />
        </ListItem>
        <Divider />
      </React.Fragment>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={()=>handleSelectRole(value, 'set')}>Admin</MenuItem>
        <MenuItem onClick={()=>handleSelectRole(value, 'unset')}>Member</MenuItem>
      </Menu>
    </div>
  );
}

export default function AddAdmin(props){
  const classes = useStyles();
  const { sess, token, setCSRFToken, matchid, handleSnackBar, admin } = props
  const [ data, setData ] = React.useState(null)
  const [ dataSliced, setDataSliced ] = React.useState(10)
  const [ createState, setCreateState ] = React.useState(false)
  const [ searchUser, setSearchUser ] = React.useState('')
  const [ fullname, setFullname ] = React.useState('')
  const [ lastname, setLastname ] = React.useState('')

  function handleSearch(){
    if(data){
      var options = {
        shouldSort: true,
        caseSensitive: true,
        minMatchCharLength: 2,
        keys: [
          "fullname",
          "lastname"
        ]
      }
      var fuse = new Fuse(data, options)
      var result = fuse.search(searchUser)
      return result
    }
  }

  function handleMore(){
    if(data){
      if(searchUser){
        if( dataSliced >= handleSearch().length ){
          setDataSliced( 10 )
        }else{
          setDataSliced( dataSliced + 10 )
        }
      }else{
        if( dataSliced >= data.length ){
          setDataSliced( 10 )
        }else{
          setDataSliced( dataSliced + 10 )
        }
      }
    }
  }

  function handleMoreAll(){
    if(data){
      if(searchUser){
        if( dataSliced >= handleSearch().length ){
          setDataSliced( 10 )
        }else{
          setDataSliced( handleSearch().length )
        }
      }else{
        if( dataSliced >= data.length ){
          setDataSliced( 10 )
        }else{
          setDataSliced( data.length )
        }
      }
    }
  }

  async function handleCreatePlayer(){
    const resToken = token? token : await API.xhrGet('getcsrf')
    await API.xhrPost(
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
        variant: d.status === 'success' ? 'success' : 'error',
        autoHideDuration: d.status === 'success'? 2000 : 5000
      })
      try {
        handleLoadUser()
      }catch(err) { console.log(err.message) }
    })
  }
  
  async function handleLoadUser(){
    if(matchid){
      const resToken = token? token : await API.xhrGet('getcsrf')
      await API.xhrPost(
        token? token : resToken.token,
        sess.typeid === 'admin' ? 'loadmatch' : 'mloadmatch', {
          action: 'userlist',
          matchid: matchid
      }, (csrf, d) =>{
        setCSRFToken(csrf)
        if(
          d.status !== 'no data' ||
          d.status !== 'wrong action' ||
          d.status !== 'wrong params'
        ){
          setData(d)
        }else{
          handleSnackBar({
            state: true,
            message: d.status,
            variant: 'error',
            autoHideDuration: 5000
          })
        }
      })
    }
  }

  React.useEffect(()=>{
    handleLoadUser()
  },[ ])

  return(
    <div className={classes.root}>
      <div className={classes.createGrid}>
        <GreenTextButton
          variant="outlined"
          className={classes.createButton}
          onClick={()=>setCreateState(!createState)}>
          <ExpandMoreIcon
            className={classes.expandIcon}
            style={{ transform: createState?'rotate(180deg)':'rotate(0deg)' }} />
          Create Player
        </GreenTextButton>
      </div>
      <Collapse in={createState} timeout="auto" unmountOnExit>
        <div className={classes.textFieldGrid}>
          <ThemeProvider theme={theme}>
            <TextField
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
            <GreenButton className={classes.confirmButton} onClick={handleCreatePlayer}>Confirm</GreenButton>
          </div>
        </div>
      </Collapse>
      <ThemeProvider theme={theme}>
        <TextField
          autoFocus
          disabled={data === null}
          className={classes.searchBox}
          variant="outlined"
          placeholder={ !searchUser? "Search player" : '' }
          value={searchUser}
          onChange={e =>setSearchUser(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="primary"/>
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                { searchUser?
                  <IconButton onClick={()=>setSearchUser('')}>
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
          [
            ...searchUser? handleSearch() : data
          ].slice(0, dataSliced).map(value => {
              return value && (
                <ListMenu
                  key={value.firstname + `(${value.userid})`}
                  value={value}
                  setData={setData}
                  {...props}
                />
              );
          })
        }
        { searchUser && handleSearch().length === 0 &&
          <ListItem>
            <Typography component="div" style={{ width: '100%' }}>
              <Box style={{ textAlign: 'center', color: primary[900] }} fontWeight={500} fontSize={24} m={1}>
                No Reult
              </Box>
            </Typography>
          </ListItem>
        }
        <ListItem role={undefined} dense style={{ display: 'flex' }}>
          { data && data.length > 10 && !searchUser &&
            <React.Fragment>
              <Button fullWidth onClick={handleMore}>
                { dataSliced >= data.length ? 'Collapse':'More' }
              </Button>
              { data && dataSliced < data.length &&
                <Button fullWidth onClick={handleMoreAll}>More All</Button>
              }
            </React.Fragment>
          }
          { data && handleSearch().length > 10 && searchUser &&
            <React.Fragment>
              <Button fullWidth onClick={handleMore}>
                { dataSliced >= handleSearch().length ? 'Collapse':'More' }
              </Button>
              { data && dataSliced < handleSearch().length &&
                <Button fullWidth onClick={handleMoreAll}>More All</Button>
              }
            </React.Fragment>
          }
        </ListItem>
      </List>
    </div>
  );
}
