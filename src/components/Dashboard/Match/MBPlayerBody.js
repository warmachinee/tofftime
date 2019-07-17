import React from 'react';
import Loadable from 'react-loadable';
import { makeStyles, withStyles, createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
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
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Slide from '@material-ui/core/Slide';

import DeleteIcon from '@material-ui/icons/Delete';
import ClearIcon from '@material-ui/icons/Clear';
import SearchIcon from '@material-ui/icons/Search';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ClassIcon from '@material-ui/icons/Class';
import DesktopMacIcon from '@material-ui/icons/DesktopMac';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';

import teal from '@material-ui/core/colors/teal';
import grey from '@material-ui/core/colors/grey';
import red from '@material-ui/core/colors/red';

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
    padding: 8,
    position: 'relative'
  },
  listRoot: {
    position: 'relative',
    padding: theme.spacing(1, 2),
    width: '100%',
    backgroundColor: grey[50],
    cursor: 'pointer',
    marginTop: 24,
    overflow: 'auto',
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
  controls: {
    position: 'relative',
    cursor: 'auto',
    display: 'block',
    [theme.breakpoints.up(700)]: {
      display: 'flex',
    },
  },
  addPlayerButton: {
    marginTop: 'auto',
    padding: '8px 16px 8px 0',
    width: '100%',
    color: theme.palette.getContrastText(red[600]),
    backgroundColor: red[600],
    '&:hover': {
      backgroundColor: red[800],
    },
    [theme.breakpoints.up(700)]: {
      width: 'auto'
    },
  },
  controlsEdit: {
    marginTop: 16,
    borderRadius: 4,
    border: `2px solid ${teal[600]}`,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    [theme.breakpoints.up(500)]: {
      marginTop: 16,
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
    },
    [theme.breakpoints.up(700)]: {
      marginTop: 0,
      width: 'auto',
      display: 'block',
    },
  },
  controlsEditButton: {
    marginTop: 'auto',
    padding: 16,
    [theme.breakpoints.up(500)]: {
      padding: '8px 16px',
    },
  },
  controlsEditButton2: {
    marginTop: 2,
    marginBottom: 2,
    padding: 16,
    [theme.breakpoints.up(500)]: {
      padding: '8px 36px',
    },
  },
  controlsEditButtonIcon: {
    position: 'absolute',
    [theme.breakpoints.up(500)]: {
      position: 'relative',
      marginRight: 8,
    },
  },
  controlsSecondary: {
    cursor: 'auto',
    justifyContent: 'flex-end',
    paddingTop: 0,
    paddingBottom: 0
  },
  selectedClassText: {
    color: '#3f51b5',
    fontWeight: 600,
    paddingLeft: 12,
    paddingBottom: 8,
    marginTop: 'auto'
  },
  searchBox: {
    width: '100%',
    [theme.breakpoints.up(600)]: {
      width: 'auto'
    },
  },
  arrowUpward: {
    color: 'white',
  }

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

const GreenTextButton = withStyles(theme => ({
  root: {
    color: teal[600],
    '&:hover': {
      backgroundColor: teal[100],
    },
  },
}))(Button);

const theme = createMuiTheme({
  palette: {
    primary: teal,
  },
});

export default function MBPlayerBody(props){
  const classes = useStyles();
  const { token, setCSRFToken, matchid, handleSnackBar, } = props
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
          variant: d.status === 'success' ? 'success' : 'error',
          autoHideDuration: d.status === 'success'? 2000 : 5000
        })
        try {
          handleFetch()
        }catch(err) { console.log(err.message) }
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
          variant: d.status === 'success' ? 'success' : 'error',
          autoHideDuration: d.status === 'success'? 2000 : 5000
        })
        setChecked([])
        try {
          handleFetch()
        }catch(err) { console.log(err.message) }
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
          variant: d.status === 'remove member success' ? 'success' : 'error',
          autoHideDuration: d.status === 'success'? 2000 : 5000
        })
        setChecked([])
        try {
          handleFetch()
        }catch(err) { console.log(err.message) }
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
        if(
          d.status !== 'no data' ||
          d.status !== 'wrong action' ||
          d.status !== 'wrong params'
        ){
          setData(d)
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
    const res = await token? token : API.xhrGet('getcsrf')
    if(matchid){
      await API.xhrPost(
        token? token : res.token,
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
          setMatchDetail(d)
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
    handleFetch()
  },[ ])

  const [ ,updateState ] = React.useState(null)
  function resizeHandler(){
    updateState({})
  }
  React.useEffect(()=>{
    window.addEventListener('resize', resizeHandler)
    return ()=>{
      window.removeEventListener('resize', resizeHandler)
    }
  }, [ window.innerWidth ])

  return(
    <div className={classes.root}>
      <List className={classes.listRoot}>
        <ListItem className={classes.controls}>
          <Button className={classes.addPlayerButton} variant="contained"
            style={{ zIndex: 1300 }}
            onClick={handleOpen}>
            <AddCircleIcon style={{ marginRight: 8, marginLeft: 12 }}/>
            Add player
          </Button>
          <div style={{ flex: 1 }}></div>
          <div
            className={classes.controlsEdit}
            style={{
              border: edittingClass && '0 solid',
              justifyContent: (editting || edittingClass || edittingDisplay)? 'flex-end' : 'space-around',
            }}>
            { !editting && !edittingClass &&
              (
                edittingDisplay?
                <GreenTextButton className={classes.controlsEditButton} onClick={handleDoneEdittingDisplay}>Done</GreenTextButton>
                :
                <GreenTextButton className={classes.controlsEditButton} onClick={handleEdittingDisplay}>
                  <DesktopMacIcon
                    style={{ left:
                      window.innerWidth > 500? 0 :
                      window.innerWidth > 450? '20%':'10%'
                    }}
                    className={classes.controlsEditButtonIcon}/>
                  Display
                </GreenTextButton>
              )
            }
            { !editting && !edittingDisplay && /*style={{ padding: '8px 36px', margin: '2px 0' }}*/
              (
                edittingClass?
                <React.Fragment>
                  <GreenTextButton className={classes.controlsEditButton2} onClick={handleDoneEdittingClass}>Done</GreenTextButton>
                  <GreenButton className={classes.controlsEditButton2} onClick={handleSave}>Save</GreenButton>
                </React.Fragment>
                :
                <GreenTextButton className={classes.controlsEditButton} onClick={()=>setEdittingClass(!edittingClass)}>
                  <ClassIcon
                    style={{ left:
                      window.innerWidth > 500? 0 :
                      window.innerWidth > 450? '20%':'10%'
                    }}
                    className={classes.controlsEditButtonIcon}/>
                  Class
                </GreenTextButton>
              )
            }
            { !edittingClass && !edittingDisplay &&
              (
                editting?
                <GreenButton className={classes.controlsEditButton2} style={{ marginTop: 0, marginBottom: 0}}
                  onClick={handleDoneEditting}>Done</GreenButton>
                :
                <GreenTextButton className={classes.controlsEditButton} onClick={()=>setEditting(!editting)}>
                  <DeleteIcon
                    style={{ left:
                      window.innerWidth > 500? 0 :
                      window.innerWidth > 450? '20%':'10%'
                    }}
                    className={classes.controlsEditButtonIcon}/>
                  Remove
                </GreenTextButton>
              )
            }
          </div>
        </ListItem>
        <ListItem className={classes.controlsSecondary}>
          { edittingClass &&
            <React.Fragment>
              <div style={{ display: 'flex' }}>
                <ClassIcon style={{ color: teal[600], marginRight: 4 }}/>
                <div style={{ color: teal[700], marginTop: 'auto', marginRight: 12, fontWeight: 600, fontSize: 16, }}>{ selectedClass !== 0 ? 'Selected Class : ' : 'Select Class :' }</div>
              </div>
              <GreenTextButton variant="outlined" className={classes.controlsEditButton} onClick={handleMenuClick}>
                { selectedClass !== 0?
                  matchDetail && matchDetail.class &&
                  matchDetail.class.filter( item =>{
                    return item.classno === selectedClass
                  }).map( d =>
                    d &&
                    <React.Fragment key={d.classname}>{d.classname}</React.Fragment>
                  )
                  : <React.Fragment>No class selected</React.Fragment>
                }
              </GreenTextButton>
            </React.Fragment>
          }
          { editting &&
            <GreenTextButton className={classes.controlsEditButton} style={{ marginTop: 1, marginBottom: 1 }} onClick={handleRemovePlayer}>
              <DeleteIcon />
              Remove
            </GreenTextButton>
          }
          { !( editting || edittingClass) &&
            <div style={{ height: 42 }}></div>
          }
        </ListItem>
        <ListItem style={{ marginBottom: 8, cursor: 'auto' }}>
          <ThemeProvider theme={theme}>
            <TextField
              className={classes.searchBox}
              variant="outlined"
              placeholder={ !searchUser && "Search player" }
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
        </ListItem>
        <div style={{ overflow: 'auto', position: 'relative' }}>
          <div style={{ overflow: 'auto', maxHeight: window.innerHeight * .6, position: 'relative' }}>
            <ListItem role={undefined}
              style={{
                display: 'flex', backgroundColor: 'black', borderRadius: 4, cursor: 'auto', minWidth: 600,
              }}>
              <ListItemText inset style={{ color: 'white', margin: '8px 0' }} className={classes.listText} primary="First name" />
              <ListItemText style={{ color: 'white', margin: '8px 0' }} className={classes.listText} primary="Last name" />
              <ListItemText style={{ color: 'white', margin: '8px 0' }} className={classes.listClass} primary="Class" />
              <ListItemIcon style={{ justifyContent: 'flex-end', width: 64, marginRight: 16 }}>
                <div style={{ height: 42, width: 42 }}></div>
              </ListItemIcon>
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
                return value && (
                  <ListItem key={value.userid} role={undefined} button
                    style={{ minWidth: 600 }}
                    onClick={()=>
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
                          d &&
                          <ListItemText key={d.classname + `(${value.userid})`} className={classes.listClass} primary={d.classname} />
                        )
                      )
                    }
                    <ListItemIcon style={{ justifyContent: 'flex-end', width: 64, marginRight: 16 }}>
                      { editting ?
                        <IconButton edge="end" onClick={()=>handleRemovePlayer(value)}>
                          <DeleteIcon />
                        </IconButton>
                        :
                        <div style={{ height: 42, width: 42 }}></div>
                      }
                    </ListItemIcon>
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
          </div>
        </div>
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
            d &&
            <MenuItem key={"i : " + i + " data: " + d} onClick={()=>handleSelectedClass(d)}>{d.classname}</MenuItem>
          )
        }
      </Menu>
    </div>
  );
}
