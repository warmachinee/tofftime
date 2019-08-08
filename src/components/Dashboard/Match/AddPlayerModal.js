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

import AddCircleIcon from '@material-ui/icons/AddCircle';
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

export default function AddPlayerModal(props){
  const classes = useStyles();
  const { token, setCSRFToken, matchid, handleSnackBar, setMBData, setMBMatchDetail } = props

  const [ data, setData ] = React.useState(null)
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

  async function handleCreatePlayer(){
    await API.xhrPost(
      token? token : await API.xhrGet('getcsrf').token,
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
        handleFetchUserList()
      }catch(err) { console.log(err.message) }
    })
  }

  async function handleLoadUser(){
    await API.xhrPost(
      token? token : await API.xhrGet('getcsrf').token,
      'loaduser', {
        action: 'userlist'
    }, (csrf, d) =>{
      setCSRFToken(csrf)
      setData(d)
    })
  }

  async function handleAddUser(d){
    await API.xhrPost(
      token? token : await API.xhrGet('getcsrf').token,
      'matchmember', {
        action: 'add',
        matchid: matchid,
        userid: d.userid
    }, (csrf, d) =>{
      setCSRFToken(csrf)
      handleSnackBar({
        state: true,
        message: d.status,
        variant: d.status === 'add member success' ? 'success' : 'error',
        autoHideDuration: d.status === 'success'? 2000 : 5000
      })
      try {
        handleFetchUserList()
      }catch(err) { console.log(err.message) }
    })
  }

  async function handleFetchUserList(){
    if(matchid){
      await API.xhrPost(
        token? token : await API.xhrGet('getcsrf').token,
        'loadmatch', {
          action: 'userlist',
          matchid: matchid
      }, (csrf, d) =>{
        setCSRFToken(csrf)
        if(
          d.status !== 'no data' ||
          d.status !== 'wrong action' ||
          d.status !== 'wrong params'
        ){
          setMBData(d)
          try {
            handleFetchMatchDetail()
          }catch(err) { console.log(err.message) }
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

  async function handleFetchMatchDetail(){
    if(matchid){
      await API.xhrPost(
        token? token : await API.xhrGet('getcsrf').token,
        'loadmatch', {
          action: 'detail',
          matchid: matchid
      }, (csrf, d) =>{
        setCSRFToken(csrf)
        if(
          d.status !== 'class database error' ||
          d.status !== 'wrong matchid' ||
          d.status !== 'wrong action' ||
          d.status !== 'wrong params'
        ){
          setMBMatchDetail(d)
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
  },[ props.data ])

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
          handleSearch().map(value => {
              return value && (
                <React.Fragment key={value.firstname + `(${value.userid})`}>
                  <ListItem role={undefined} dense button
                    onClick={()=>handleAddUser(value)}>
                    <ListItemIcon className={classes.listItemIcon}>
                      <AddCircleIcon classes={{ root: classes.addCircleIcon }}/>
                    </ListItemIcon>
                    <ListItemText className={classes.listText} primary={value.fullname} />
                    <ListItemText className={classes.listText} primary={value.lastname} />
                  </ListItem>
                  <Divider />
                </React.Fragment>
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
      </List>
    </div>
  );
}
