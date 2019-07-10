import React from 'react';
import Loadable from 'react-loadable';
import { makeStyles } from '@material-ui/core/styles';
import * as API from '../../../api'

import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';

import AddCircleIcon from '@material-ui/icons/AddCircle';
import SearchIcon from '@material-ui/icons/Search';

import grey from '@material-ui/core/colors/grey';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    padding: theme.spacing(1, 2),
    width: '100%',
    backgroundColor: grey[50],
    cursor: 'pointer',
    marginTop: 24,
    maxHeight: window.innerHeight * .8 , height: '100%'
  },
  margin: {
    margin: theme.spacing(1),
    width: '100%'
  },
  listText:{
    width: '100%',
    textAlign: 'left'
  },
}))

export default function AddPlayerModal(props){
  const classes = useStyles();
  const { token, setCSRFToken, matchid, handleSnackBar, setMBData, setMBMatchDetail } = props

  const [ data, setData ] = React.useState(null)
  const [ searchUser, setSearchUser ] = React.useState('')
  const [ dataSliced, setDataSliced ] = React.useState(10)
  const [ fullname, setFullname ] = React.useState('')
  const [ lastname, setLastname ] = React.useState('')

  function handleMore(){
    if(data){
      if( dataSliced >= data.length ){
        setDataSliced( 10 )
      }else{
        setDataSliced( dataSliced + 10 )
      }
    }
  }

  function handleMoreAll(){
    if(data){
      if( dataSliced >= data.length ){
        setDataSliced( 10 )
      }else{
        setDataSliced( data.length )
      }
    }
  }

  async function handleCreatePlayer(){
    const res = await token? token : API.xhrGet('getcsrf')
    await API.xhrPost(
      token? token : res.token,
      'usersystem', {
        action: 'create',
        fullname: fullname,
        lastname: lastname
    }, (csrf, d) =>{
      setCSRFToken(csrf)
      handleSnackBar({
        state: true,
        message: d.status,
        variant: d.status === 'success' ? 'success' : 'error'
      })
      try {
        handleFetchUserList()
      }
      catch(err) {
        console.log(err.message);
      }
    })
  }

  async function handleLoadUser(){
    const res = await token? token : API.xhrGet('getcsrf')
    await API.xhrPost(
      token? token : res.token,
      'loaduser', {
        action: 'userlist'
    }, (csrf, d) =>{
      setCSRFToken(csrf)
      setData(d)
    })
  }

  async function handleAddUser(d){
    const res = await token? token : API.xhrGet('getcsrf')
    await API.xhrPost(
      token? token : res.token,
      'matchmember', {
        action: 'add',
        matchid: matchid,
        userid: d.userid
    }, (csrf, d) =>{
      setCSRFToken(csrf)
      handleSnackBar({
        state: true,
        message: d.status,
        variant: d.status === 'add member success' ? 'success' : 'error'
      })
      try {
        handleFetchUserList()
      }
      catch(err) {
        console.log(err.message);
      }
    })
  }

  async function handleFetchUserList(){
    const res = await token? token : API.xhrGet('getcsrf')
    if(matchid){
      await API.xhrPost(
        token? token : res.token,
        'loadmatch', {
          action: 'userlist',
          matchid: matchid
      }, (csrf, d) =>{
        setCSRFToken(csrf)
        setMBData(d)
        try {
          handleFetchMatchDetail()
        }
        catch(err) {
          console.log(err.message);
        }
      })
    }
  }

  async function handleFetchMatchDetail(){
    const res = await token? token : API.xhrGet('getcsrf')
    if(matchid){
      await API.xhrPost(
        token? token : res.token,
        'loadmatch', {
          action: 'detail',
          matchid: matchid
      }, (csrf, d) =>{
        setCSRFToken(csrf)
        setMBMatchDetail(d)
      })
    }
  }

  React.useEffect(()=>{
    handleLoadUser()
  },[ props.data ])

  return(
    <div style={{ maxHeight: window.innerHeight * .8 , height: '100%'}}>
      <div style={{ marginBottom: 24 }}>
        <FormControl className={classes.margin} style={{ marginTop: 24 }}>
          <InputLabel>Full name</InputLabel>
          <Input
            value={fullname}
            onChange={e =>setFullname(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            }
          />
        </FormControl>
        <FormControl className={classes.margin} style={{ marginTop: 24 }}>
          <InputLabel>Last name</InputLabel>
          <Input
            value={lastname}
            onChange={e =>setLastname(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            }
          />
        </FormControl>
        <Button onClick={handleCreatePlayer}>Create player</Button>
      </div>
      <FormControl className={classes.margin} style={{ marginTop: 24 }}>
        <InputLabel>Search player</InputLabel>
        <Input
          value={searchUser}
          onChange={e =>setSearchUser(e.target.value)}
          endAdornment={
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          }
        />
      </FormControl>
      <List className={classes.root}>
        { data && !data.status &&
          data.filter((item)=>{
              return (
                (item.fullname.search(searchUser) !== -1) ||
                (item.fullname.toLowerCase().search(searchUser.toLowerCase()) !== -1)||
                (item.lastname.search(searchUser) !== -1) ||
                (item.lastname.toLowerCase().search(searchUser.toLowerCase()) !== -1)
              )
            }).slice(0, dataSliced).map(value => {

              return value && (
                <ListItem key={value.firstname + `(${value.userid})`} role={undefined} dense button
                  onClick={()=>handleAddUser(value)}>
                  <ListItemIcon>
                    <IconButton>
                      <AddCircleIcon />
                    </IconButton>
                  </ListItemIcon>
                  <ListItemText className={classes.listText} primary={value.fullname} />
                  <ListItemText className={classes.listText} primary={value.lastname} />
                </ListItem>
              );
          })
        }
        <ListItem key="More button" role={undefined} dense style={{ display: 'flex' }}>
          { data && data.length > 10 &&
            <React.Fragment>
              <Button fullWidth onClick={handleMore}>
                { data && dataSliced >= data.length ? 'Collapse':'More' }
              </Button>
              { data && dataSliced < data.length &&
                <Button fullWidth onClick={handleMoreAll}>More All</Button>
              }
            </React.Fragment>
          }
        </ListItem>
      </List>
    </div>
  );
}
