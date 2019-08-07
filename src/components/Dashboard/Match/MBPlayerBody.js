import React from 'react';
import Loadable from 'react-loadable';
import Fuse from 'fuse.js';
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
import Divider from '@material-ui/core/Divider';

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
  loader: () => import(/* webpackChunkName: "TemplateDialog" */'./../../TemplateDialog'),
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
    overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis',
    width: '100%',
    textAlign: 'left'
  },
  listClass: {
    overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis',
    width: '30%',
    textAlign: 'left',
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
    [theme.breakpoints.up(500)]: {
      padding: '8px 16px',
    },
  },
  controlsEditButton2: {
    marginTop: 2,
    marginBottom: 2,
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
  },
  deleteIcon: {
    color: teal[600]
  },
  notice: {
    fontFamily: 'monospace',
    color: grey[600],
    fontWeight: 600,
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

const GreenTextButton = withStyles(theme => ({
  root: {
    color: teal[600],
    '&:hover': {
      backgroundColor: teal[100],
    },
  },
}))(Button);

const GreenCheckbox = withStyles({
  root: {
    color: teal[400],
    '&$checked': {
      color: teal[600],
    },
  },
})(props => <Checkbox color="default" {...props} />);

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

  function handleSearch(){
    if(data){
      var options = {
        shouldSort: true,
        caseSensitive: true,
        minMatchCharLength: 2,
        keys: [
          "firstname",
          "lastname",
          "classname",
          "classno"
        ]
      }
      var fuse = new Fuse(data, options)
      var result = fuse.search(searchUser)
      return result
    }
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
  },[ window.innerWidth ])

  return(
    <div className={classes.root}>
      <List className={classes.listRoot}>
        <ListItem className={classes.controls}>
          <Button className={classes.addPlayerButton} variant="contained"
            onClick={handleOpen}>
            <AddCircleIcon style={{ marginRight: 8, marginLeft: 12 }}/>
            Add player
          </Button>
          <div style={{ flex: 1 }} />
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
                <GreenTextButton className={classes.controlsEditButton2} style={{ marginTop: 0, marginBottom: 0}}
                  onClick={handleDoneEditting}>Done</GreenTextButton>
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
        </ListItem>
        <div style={{ overflow: 'auto', position: 'relative' }}>
          { ( editting || edittingClass || edittingDisplay ) &&
            <Typography component="div">
              <Box className={classes.notice} m={1}>
                { edittingDisplay && 'Click the list to toggle the player display.'}
                { edittingClass && 'Select class and player to change player class.'}
                { editting && 'Select the list to delete multiple or Hit the icon on the right to delete single.'}
              </Box>
            </Typography>
          }
          <ListItem role={undefined}
            style={{
              display: 'flex', backgroundColor: grey[900], borderRadius: 4, cursor: 'auto',
            }}>
            <ListItemText inset style={{ color: 'white', margin: '8px 0' }} className={classes.listText}
              primary={ window.innerWidth < 600? "Player" : "First name" } />
            { window.innerWidth >= 600 &&
              <ListItemText style={{ color: 'white', margin: '8px 0' }} className={classes.listText}
                primary="Last name" />
            }
            { window.innerWidth > 600 &&
              <ListItemText style={{ color: 'white', margin: '8px 0', marginRight: 20, width: '30%', textAlign: 'left', }} primary="Class" />
            }
            <ListItemIcon style={{ justifyContent: 'flex-start' }}>
              <div style={{ height: 42, width: 42 }}></div>
            </ListItemIcon>
          </ListItem>
          <div style={{ overflow: 'auto', maxHeight: window.innerHeight * .6, position: 'relative' }}>
            { data && !data.status &&
              [
                ...searchUser? handleSearch() : data
              ].slice(0, dataSliced).map(value => {
                return value && (
                  <React.Fragment key={value.userid}>
                    <ListItem role={undefined} button
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
                          <GreenCheckbox
                            edge="start"
                            checked={checked.indexOf(value) !== -1}
                            tabIndex={-1}
                            disableRipple />
                          :
                          (edittingDisplay ?
                            <GreenCheckbox
                              edge="start"
                              checked={value.display === 1}
                              tabIndex={-1}
                              disableRipple />
                          :
                            <div style={{ height: 42, width: 42 }}></div>)
                        }
                      </ListItemIcon>
                      <ListItemText className={classes.listText}
                        primary={
                          ( window.innerWidth >= 450 && window.innerWidth < 600 )?
                          <div style={{ display: 'flex' }}>
                            { value.firstname }<div style={{ width: 20 }}></div>{ value.lastname }
                          </div>
                          : value.firstname }
                        secondary={
                          <React.Fragment>
                            { window.innerWidth < 450 &&
                              <Typography
                                component="span"
                                variant="body1"
                                color="textPrimary"
                              >
                                {value.lastname}
                              </Typography>
                            }
                            { matchDetail && matchDetail.class && window.innerWidth < 600 &&
                              ( value.classno === 0 ?
                                <React.Fragment>
                                  <br></br>
                                  "-"
                                </React.Fragment>
                                :
                                matchDetail.class.filter( d =>{
                                  return d.classno === value.classno
                                }).map((d, i) =>
                                  d &&
                                  <React.Fragment key={i}>
                                    <br></br>
                                    {d.classname}
                                  </React.Fragment>
                                )
                              )
                            }
                          </React.Fragment>
                        } />
                      { window.innerWidth >= 600 &&
                        <ListItemText className={classes.listText}
                          primary={value.lastname}/>
                      }
                      { matchDetail && matchDetail.class && window.innerWidth > 600 &&
                        ( value.classno === 0 ?
                          <ListItemText style={{ justifyContent: 'center' }} className={classes.listClass} primary={"-"} />
                          :
                          matchDetail.class.filter( d =>{
                            return d.classno === value.classno
                          }).map( d =>
                            d &&
                            <ListItemText key={d.classname + `(${value.userid})`} style={{ justifyContent: 'center' }} className={classes.listClass} primary={d.classname} />
                          )
                        )
                      }
                      <ListItemIcon style={{ justifyContent: 'flex-end' }}>
                        { editting ?
                          <IconButton edge="end" onClick={()=>handleRemovePlayer(value)}>
                            <DeleteIcon classes={{ root: classes.deleteIcon}}/>
                          </IconButton>
                          :
                          <div style={{ height: 42, width: 42 }}></div>
                        }
                      </ListItemIcon>
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                );
              })
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
            { searchUser && handleSearch().length === 0 &&
              <ListItem>
                <Typography component="div" style={{ width: '100%' }}>
                  <Box style={{ textAlign: 'center', color: teal[900] }} fontWeight={500} fontSize={24} m={1}>
                    No Reult
                  </Box>
                </Typography>
              </ListItem>
            }
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
