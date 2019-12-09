import React from 'react';
import socketIOClient from 'socket.io-client'
import Loadable from 'react-loadable';
import { makeStyles, withStyles, createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import * as API from './../../../api'
import { primary, grey, red } from './../../../api/palette'

import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import Skeleton from '@material-ui/lab/Skeleton';

import AddIcon from '@material-ui/icons/Add';
import ClearIcon from '@material-ui/icons/Clear';
import SearchIcon from '@material-ui/icons/Search';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';

import { LDCircular } from './../../loading/LDCircular'

const ConfirmDialog = Loadable({
  loader: () => import(/* webpackChunkName: "ConfirmDialog" */'./../../Utils/Dialog/ConfirmDialog'),
  loading: () => <LDCircular />
});

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: 48,
  },
  list: {
    borderLeft: '1px solid rgba(0, 0, 0, 0.12)',
    borderRight: '1px solid rgba(0, 0, 0, 0.12)',
    paddingTop: 0,
    paddingBottom: 0,
    margin: theme.spacing(2, 1),
    overflow: 'auto',
    maxHeight: window.innerHeight * .5
  },
  searchGrid: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    marginTop: 16,
    [theme.breakpoints.up(500)]: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
  },
  searchBox: {
    width: '100%',
    [theme.breakpoints.up(500)]: {
      width: 'auto'
    },
  },
  editButtonGrid: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    [theme.breakpoints.up(500)]: {
      width: 'auto'
    },
  },
  editButton: {
    padding: theme.spacing(1, 3),
    width: 'auto',
    marginTop: 16,
    [theme.breakpoints.up(500)]: {
      marginTop: 0,
      padding: theme.spacing(1, 4.5),
    },
  },
  listImage: {
    width: 36,
    marginRight: 0,
    [theme.breakpoints.up(500)]: {
      width: 48,
      marginRight: 16,
    },
  },
  image: {
    width: 36,
    height: 36,
    backgroundColor: grey[300],
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    objectFit: 'cover',
    cursor: 'pointer',
    borderRadius: 4,
    [theme.breakpoints.up(500)]: {
      width: 48,
      height: 48,
    },
  },

}));

const RedButton = withStyles(theme => ({
  root: {
    color: theme.palette.getContrastText(red[600]),
    backgroundColor: red[600],
    '&:hover': {
      backgroundColor: red[800],
    },
  },
}))(Button);

const GreenButton = withStyles(theme => ({
  root: {
    color: theme.palette.getContrastText(primary[500]),
    backgroundColor: primary[700],
    '&:hover': {
      backgroundColor: primary[900],
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

export default function LocationList(props){
  const classes = useStyles();
  const {
    BTN, sess, token, setCSRFToken, selectedField, setSelectedField, handleSnackBar, pageOrganizer,
    setSelectedFieldVersion, setPageState, overviewEdit, handleOnDoneSelectField
  } = props
  const [ data, setData ] = React.useState(null)
  const [ open, setOpen ] = React.useState(false)
  const [ searchField, setSearchField ] = React.useState('')
  const [ selectedDeleteItem, handleSelectedDeleteItem ] = React.useState(false)

  function handleDelete(){
    handleDeleteField()
  }

  function handleOpen(d){
    setOpen(true)
    handleSelectedDeleteItem(d)
  }

  function handleClose(){
    setOpen(false)
    handleSelectedDeleteItem(null)
  }

  function handleChangeField(e){
    if(e){
      setSearchField(e.target.value)
      if(sess){
        const socket = socketIOClient( API._getWebURL(), { transports: ['websocket', 'polling'] } )
        socket.emit('search-client-message', {
          action: "field",
          userid: sess.userid,
          text: e.target.value
        })
      }
    }else{
      setSearchField('')
    }
  }

  function responseField(){
    if(sess){
      const socket = socketIOClient( API._getWebURL(), { transports: ['websocket', 'polling'] } )
      socket.on(`${sess.userid}-field-search-server-message`, (messageNew) => {
        setData(messageNew.result.infolist)
      })
    }
  }

  async function handleLoadField(){
    const resToken = token? token : await API._xhrGet('getcsrf')
    await API._xhrPost(
      token? token : resToken.token,
      sess.typeid === 'admin' ? 'loadfield' : 'loadusersystem', {
        ...(sess.typeid === 'admin')? { action: 'list' } : {
          action: 'fieldlist',
          ...pageOrganizer && { type: 1 }
        }
    }, (csrf, d) =>{
      setCSRFToken(csrf)
      setData(d)
    })
  }

  function handleLoadDefaultField(){
    if(sess){
      const socket = socketIOClient( API._getWebURL(), { transports: ['websocket', 'polling'] } )
      socket.emit('search-client-message', {
        action: "field",
        userid: sess.userid,
        text: ''
      })
    }
  }

  async function handleDeleteField(){
    const resToken = token? token : await API._xhrGet('getcsrf')
    await API._xhrPost(
      token? token : resToken.token,
      sess.typeid === 'admin' ? 'fieldsystem' : 'ffieldsystem', {
        action: 'delete',
        fieldid: selectedDeleteItem.fieldid,
        usertarget: selectedDeleteItem.hostid,
        realdel: 'true'
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
      }
    })
  }

  React.useEffect(()=>{
    responseField()
    handleLoadDefaultField()
    //handleLoadField()
  },[ ])

  return(
    <div>
      <div className={classes.searchGrid}>
        <ThemeProvider theme={theme}>
          <TextField
            autoFocus
            className={classes.searchBox}
            variant="outlined"
            placeholder={ !searchField? ( API._getWord(sess && sess.language).Search ) : '' }
            value={searchField}
            onChange={handleChangeField}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="primary"/>
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  { searchField?
                    <IconButton onClick={()=>handleChangeField(null)}>
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
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        <Typography component="div">
          <Box className={classes.notice} m={1}>
            { API._getWord(sess && sess.language)['Please pick one.'] }
          </Box>
        </Typography>
        <div style={{ flex: 1 }} />
        { selectedField && overviewEdit && handleOnDoneSelectField &&
          <GreenButton onClick={handleOnDoneSelectField}>
            { API._getWord(sess && sess.language).Ok }
          </GreenButton>
        }
      </div>
      <List className={classes.list}>
        <Divider />
        { data &&
          data.length > 0 ?
          data.map( d =>{
            return d && (
              <ListField
                key={d.fieldid}
                {...props}
                data={d}
                selectedField={selectedField}
                setSelectedField={setSelectedField}
                handleOpen={handleOpen}
                />
            );
          })
          :
          <Typography component="div" style={{ width: '100%' }}>
            <Box style={{ textAlign: 'center', color: primary[900] }} fontWeight={500} fontSize={24} m={1}>
              { API._getWord(sess && sess.language).No_course }
            </Box>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 16, marginBottom: 16, }}>
              <BTN.PrimaryOutlined onClick={()=>setPageState('create')}>
                <AddIcon style={{ marginRight: 8 }} />
                { API._getWord(sess && sess.language).Create_Course }
              </BTN.PrimaryOutlined>
            </div>
          </Typography>
        }
      </List>
      <ConfirmDialog
        sess={sess}
        open={open}
        onClose={handleClose}
        icon="Delete"
        iconColor={red[600]}
        title={API._getWord(sess && sess.language)['Are you sure you want to delete?']}
        content={
          selectedDeleteItem &&
          <Typography variant="body1">
            ( { selectedDeleteItem && selectedDeleteItem.fieldname } : { selectedDeleteItem && selectedDeleteItem.fieldid } )
          </Typography>
        }
        onSubmit={handleDelete}
        submitButton="Red" />
    </div>
  );
}

function ListField(props){
  const classes = useStyles();
  const {
    API, sess, token, setCSRFToken, isSupportWebp,
    selectedField, setSelectedField, setSelectedFieldVersion,
    data
  } = props
  const [ anchorEl, setAnchorEl ] = React.useState(null);
  const [ fieldVersion, setFieldVersion ] = React.useState(null)

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  function handleSelectField(d, event){
    handleFetchLoadFieldVersion(data.fieldid)
    if(d.fieldversion > 1){
      handleClick(event)
    }else{
      setSelectedField(data)
      setSelectedFieldVersion(1)
    }
  }

  function selectVersion(d){
    handleClose()
    setSelectedField(data)
    setSelectedFieldVersion(d)
  }

  async function handleFetchLoadFieldVersion(fieldid){
    const resToken = token? token : await API._xhrGet('getcsrf')
    await API._xhrPost(
      token? token : resToken.token,
      sess.typeid === 'admin' ? 'loadfield' : 'floadfield', {
        action: 'versioncount',
        fieldid: fieldid
    }, (csrf, d) =>{
      setCSRFToken(csrf)
      setFieldVersion(d)
    })
  }

  return (
    <React.Fragment>
      <ListItem
        button
        style={{
          transition: '.2s',
          color: primary[900],
          ...(selectedField && selectedField.fieldid === data.fieldid) && { backgroundColor:  grey[400] }
        }}
        onClick={e =>handleSelectField(data, e)}>
        <ListItemIcon className={classes.listImage}>
          { data.photopath ?
            <img className={classes.image}
              src={API._getPictureUrl(data.photopath) + ( isSupportWebp? '.webp' : '.jpg' ) + '#' + new Date().toString() } />
            :
            <Skeleton className={classes.image} style={{ margin: 0 }} disableAnimate />
          }
        </ListItemIcon>
        <ListItemText primary={data.fieldname}
          {...(sess && sess.typeid !== 'admin' && data.fieldversion > 1)? { secondary: data.fieldversion + ' version' } : null } />
      </ListItem>
      <Divider />
      { data && data.fieldversion > 1 &&
        <Menu
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          { fieldVersion &&
            fieldVersion.map( d =>
              <MenuItem key={d.createdate} onClick={()=>selectVersion(d)}>{'Version ' + d.version}</MenuItem>
            )
          }
        </Menu>
      }
    </React.Fragment>
  );
}
