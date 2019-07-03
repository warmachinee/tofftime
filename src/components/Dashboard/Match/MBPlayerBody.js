import React from 'react';
import Loadable from 'react-loadable';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import * as API from '../../../api'

import Paper from '@material-ui/core/Paper';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Tooltip from '@material-ui/core/Tooltip';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import DeleteIcon from '@material-ui/icons/Delete';
import SearchIcon from '@material-ui/icons/Search';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ClassIcon from '@material-ui/icons/Class';
import DesktopMacIcon from '@material-ui/icons/DesktopMac';

import teal from '@material-ui/core/colors/teal';
import grey from '@material-ui/core/colors/grey';

import { LDCircular } from '../../loading/LDCircular'

const TemplateDialog = Loadable({
  loader: () => import(/* webpackChunkName: "TemplateDialog" */'./../TemplateDialog'),
  loading: () => <LDCircular />
});

const AddPlayerModal = Loadable({
  loader: () => import(/* webpackChunkName: "AddPlayerModal" */'./AddPlayerModal'),
  loading: () => <LDCircular />
});

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    padding: theme.spacing(1, 2),
    width: '100%',
    backgroundColor: grey[50],
    cursor: 'pointer',
    marginTop: 24
  },
  listText:{
    width: '100%',
    textAlign: 'left'
  },
  listClass: {
    width: '30%',
    textAlign: 'left'
  },
  margin: {
    margin: theme.spacing(1),
  },

}))

const GreenButton = withStyles(theme => ({
  root: {
    color: theme.palette.getContrastText(teal[500]),
    backgroundColor: teal[500],
    '&:hover': {
      backgroundColor: teal[700],
    },
  },
}))(Button);

export default function MBPlayerBody(props){
  const classes = useStyles();
  const { token, setCSRFToken, matchid, handleSnackBar } = props
  const [ editting, setEditting ] = React.useState(false);
  const [ edittingClass, setEdittingClass ] = React.useState(false);
  const [ edittingDisplay, setEdittingDisplay ] = React.useState(false);
  const [ open, setOpen ] = React.useState(false);
  const [ data, setData ] = React.useState(null)
  const [ matchDetail, setMatchDetail ] = React.useState([])
  const [ checked, setChecked ] = React.useState([]);
  const [ searchUser, setSearchUser ] = React.useState('')
  const [ dataSliced, setDataSliced ] = React.useState(10)
  const [ anchorEl, setAnchorEl ] = React.useState(null);
  const [ selectedClass, setSelectedClass ] = React.useState(0)

  function handleMenuClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleMenuClose() {
    setAnchorEl(null);
  }

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

  function handleOpen(){
    setOpen(true);
  };

  function handleClose(){
    setOpen(false);
  };

  function handleToggle(value){
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  function handleEdittingDisplay(){
    setEdittingDisplay(!edittingDisplay)

    setChecked([])
  }

  function handleDoneEditting(){
    setEditting(!editting)
    setChecked([])
  }

  function handleDoneEdittingClass(){
    setEdittingClass(!edittingClass)
    setChecked([])
  }

  function handleDoneEdittingDisplay(){
    setEdittingDisplay(!edittingDisplay)
  }

  function handleSave(){
    let userid = []
    let classno = []
    for(var i = 0;i < checked.length;i++){
      userid.push(checked[i].userid)
      classno.push(selectedClass)
    }
    handleSetClass(userid, classno)
  }

  function handleSelectedClass(d){
    if( d === 0 ){
      setSelectedClass(0)
    }else{
      setSelectedClass(d.classno)
    }
    handleMenuClose()
  }

  async function handleSetDisplay(d){
    const res = await token? token : API.xhrGet('getcsrf')
    if(matchid){
      await API.xhrPost(
        token? token : res.token,
        'displaymatchsystem', {
          action: 'user',
          matchid: matchid,
          userid: d,
      }, (csrf, d) =>{
        setCSRFToken(csrf)
        handleSnackBar({
          state: true,
          message: d.status,
          variant: d.status === 'success' ? 'success' : 'error'
        })
        try {
          handleFetch()
        }
        catch(err) {
          console.log(err.message);
        }
      })
    }
  }

  async function handleSetClass(userid, classno){
    const res = await token? token : API.xhrGet('getcsrf')
    if(matchid){
      await API.xhrPost(
        token? token : res.token,
        'matchmember', {
          action: 'setclass',
          matchid: matchid,
          userid: userid,
          classno: classno
      }, (csrf, d) =>{
        setCSRFToken(csrf)
        handleSnackBar({
          state: true,
          message: d.status,
          variant: d.status === 'success' ? 'success' : 'error'
        })
        setChecked([])
        try {
          handleFetch()
        }
        catch(err) {
          console.log(err.message);
        }
      })
    }
  }

  async function handleRemovePlayer(d){
    let userid = []
    if( typeof(d.userid) === 'number' ){
      userid.push(d.userid)
    }else{
      for(var i = 0;i < checked.length;i++){
        userid.push(checked[i].userid)
      }
    }
    const res = await token? token : API.xhrGet('getcsrf')
    if(matchid){
      await API.xhrPost(
        token? token : res.token,
        'matchmember', {
          action: 'remove',
          matchid: matchid,
          userid: userid
      }, (csrf, d) =>{
        setCSRFToken(csrf)
        handleSnackBar({
          state: true,
          message: d.status,
          variant: d.status === 'remove member success' ? 'success' : 'error'
        })
        setChecked([])
        try {
          handleFetch()
        }
        catch(err) {
          console.log(err.message);
        }
      })
    }
  }

  async function handleFetch(){
    const res = await token? token : API.xhrGet('getcsrf')
    if(matchid){
      await API.xhrPost(
        token? token : res.token,
        'loadmatch', {
          action: 'userlist',
          matchid: matchid
      }, (csrf, d) =>{
        setCSRFToken(csrf)
        setData(d)
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
        setMatchDetail(d)
      })
    }
  }

  React.useEffect(()=>{
    handleFetch()
  },[ ])

  return(
    <div style={{ padding: 8, position: 'relative' }}>
      <List className={classes.root}>
        <ListItem style={{ cursor: 'auto' }}>
          <Button style={{ marginTop: 'auto', padding: '6px 8px' }} variant="contained" color="secondary"
            onClick={handleOpen}>
            <AddCircleIcon style={{ marginRight: 8 }}/>
            Add player
          </Button>
          <div style={{ flex: 1 }}></div>
          { !editting && !edittingClass &&
            (
              edittingDisplay?
              <Button style={{ marginLeft: 8 }} onClick={handleDoneEdittingDisplay}>Done</Button>
              :
              <Tooltip title="Display" placement="top">
                <IconButton color="primary" style={{ marginTop: 'auto' }} onClick={handleEdittingDisplay}>
                  <DesktopMacIcon />
                </IconButton>
              </Tooltip>
            )
          }
          { !editting && !edittingDisplay &&
            (
              edittingClass?
              <React.Fragment>
                <GreenButton onClick={handleSave}>Save</GreenButton>
                <Button style={{ marginLeft: 8 }} onClick={handleDoneEdittingClass}>Done</Button>
              </React.Fragment>
              :
              <Button onClick={()=>setEdittingClass(!edittingClass)}>Edit Class</Button>
            )
          }
          { !edittingClass && !edittingDisplay &&
            (
              editting?
              <Button style={{ marginLeft: 8 }} onClick={handleDoneEditting}>Done</Button>
              :
              <Button onClick={()=>setEditting(!editting)}>Edit</Button>
            )
          }

        </ListItem>
        <ListItem style={{ cursor: 'auto' }}>
          <FormControl className={classes.margin}>
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
          <div style={{ flex: 1 }}></div>
          { edittingClass &&
            <React.Fragment>
              { selectedClass !== 0 ?
                matchDetail && matchDetail.class &&
                matchDetail.class.filter( item =>{
                  return item.classno === selectedClass
                }).map( d =>
                  <div key={d.classname} style={{ color: '#3f51b5', fontWeight: 600, padding: 12, marginTop: 'auto' }}>{d.classname}</div>
                )
                : <div style={{ color: '#3f51b5', fontWeight: 600, padding: 12, marginTop: 'auto' }}>Class</div>
              }
              <Tooltip title="Class" placement="top" style={{ marginTop: 'auto' }}>
                <IconButton color="primary" onClick={handleMenuClick}>
                  <ClassIcon />
                </IconButton>
              </Tooltip>
            </React.Fragment>
          }
          { editting &&
            <React.Fragment>

              <Tooltip title="Delete" placement="top" style={{ marginTop: 'auto' }}>
                <IconButton color="primary" onClick={handleRemovePlayer}>
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </React.Fragment>
          }
        </ListItem>
        <ListItem role={undefined} dense
          style={{ display: 'flex', backgroundColor: 'black', borderRadius: 4, cursor: 'auto' }}>
          <ListItemText inset style={{ color: 'white', margin: '8px 0' }} className={classes.listText} primary="First name" />
          <ListItemText style={{ color: 'white', margin: '8px 0' }} className={classes.listText} primary="Last name" />
          <ListItemText style={{ color: 'white', margin: '8px 0' }} className={classes.listClass} primary="Class" />
          <ListItemSecondaryAction>
            { editting?
              <IconButton edge="end" onClick={()=>handleRemovePlayer(value)}>
                <DeleteIcon />
              </IconButton>
              :
              <div style={{ height: 42, width: 42 }}></div>
            }
          </ListItemSecondaryAction>
        </ListItem>
        { data && !data.status &&
          data.filter((item)=>{
              return (
                (item.firstname.search(searchUser) !== -1) ||
                (item.firstname.toLowerCase().search(searchUser.toLowerCase()) !== -1)||
                (item.lastname.search(searchUser) !== -1) ||
                (item.lastname.toLowerCase().search(searchUser.toLowerCase()) !== -1)
              )
            }).slice(0, dataSliced).map(value => {
            return (
              <ListItem key={value.userid} role={undefined} button onClick={()=>
                  ( editting || edittingClass )?
                  handleToggle(value):
                  ( edittingDisplay?
                    handleSetDisplay(value.userid)
                    :
                    console.log()
                  )
                }>
                <ListItemIcon>
                  { ( editting || edittingClass )?
                    <Checkbox
                      edge="start"
                      checked={checked.indexOf(value) !== -1}
                      tabIndex={-1}
                      disableRipple />
                    :
                    (edittingDisplay ?
                      <Checkbox
                        edge="start"
                        checked={value.display === 1}
                        tabIndex={-1}
                        disableRipple />
                    :
                      <div style={{ height: 42, width: 42 }}></div>)
                  }
                </ListItemIcon>
                <ListItemText className={classes.listText} primary={value.firstname} />
                <ListItemText className={classes.listText} primary={value.lastname} />
                { matchDetail && matchDetail.class &&
                  ( value.classno === 0 ?
                    <ListItemText className={classes.listClass} primary={"-"} />
                    :
                    matchDetail.class.filter( d =>{
                      return d.classno === value.classno
                    }).map( d =>
                      <ListItemText key={d.classname + `(${value.userid})`} className={classes.listClass} primary={d.classname} />
                    )
                  )
                }
                <ListItemSecondaryAction>
                  { editting ?
                    <IconButton edge="end" onClick={()=>handleRemovePlayer(value)}>
                      <DeleteIcon />
                    </IconButton>
                    :
                    <div style={{ height: 42, width: 42 }}></div>
                  }
                </ListItemSecondaryAction>
              </ListItem>
            );
          })
        }
        <ListItem role={undefined} dense style={{ display: 'flex' }}>
          { data && data.length > 10 &&
            <React.Fragment>
              <Button fullWidth onClick={handleMore}>
                { dataSliced >= data.length ? 'Collapse':'More' }
              </Button>
              { data && dataSliced < data.length &&
                <Button fullWidth onClick={handleMoreAll}>More All</Button>
              }
            </React.Fragment>
          }

        </ListItem>
      </List>
      <TemplateDialog open={open} handleClose={handleClose}>
        <AddPlayerModal
          token={token} setCSRFToken={setCSRFToken} matchid={matchid} handleSnackBar={handleSnackBar}
          data={data}
          setMBData={setData} setMBMatchDetail={setMatchDetail}/>
      </TemplateDialog>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={()=>handleSelectedClass(0)}>{"-"}</MenuItem>
        { matchDetail && matchDetail.class &&
          matchDetail.class.map( (d, i) =>
            <MenuItem key={"i : " + i + " data: " + d} onClick={()=>handleSelectedClass(d)}>{d.classname}</MenuItem>
          )
        }
      </Menu>
    </div>
  );
}
