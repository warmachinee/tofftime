import React from 'react';
import Loadable from 'react-loadable';
import socketIOClient from 'socket.io-client'
import Fuse from 'fuse.js';
import { makeStyles, withStyles, createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import * as API from './../../../api'
import { primary, grey, red, amber, green } from './../../../api/palette'

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

import AddIcon from '@material-ui/icons/Add';
import ClearIcon from '@material-ui/icons/Clear';
import SearchIcon from '@material-ui/icons/Search';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ClassIcon from '@material-ui/icons/Class';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import AccessTimeIcon from '@material-ui/icons/AccessTime';

import { LDCircular } from './../../loading/LDCircular'

const TemplateDialog = Loadable({
  loader: () => import(/* webpackChunkName: "TemplateDialog" */'./../../Utils/Dialog/TemplateDialog'),
  loading: () => <LDCircular />
});

const AddPlayerModal = Loadable({
  loader: () => import(/* webpackChunkName: "AddPlayerModal" */'./AddPlayerModal'),
  loading: () => <LDCircular />
});

const DummyPlayer = Loadable({
  loader: () => import(/* webpackChunkName: "DummyPlayer" */'./DummyPlayer'),
  loading: () => <LDCircular />
});

const MatchFormAction = Loadable({
  loader: () => import(/* webpackChunkName: "MatchFormAction" */'./MatchFormAction'),
  loading: () => <LDCircular />
});

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    padding: theme.spacing(1, 2),
    width: '100%',
    boxSizing: 'border-box'
  },
  listRoot: {
    position: 'relative',
    padding: theme.spacing(1, 2),
    width: '100%',
    backgroundColor: grey[50],
    overflow: 'auto',
    boxSizing: 'border-box'
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
  listTeam: {
    overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis',
    width: '60%',
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
  iconButton: {
    marginTop: 'auto',
    padding: '8px 16px 8px 0',
    width: '100%',
    [theme.breakpoints.up(700)]: {
      width: 'auto'
    },
  },
  button: {
    marginTop: 'auto',
    padding: theme.spacing(1, 2),
    width: '100%',
    [theme.breakpoints.up(700)]: {
      width: 'auto'
    },
  },
  controlsEdit: {
    marginTop: 16,
    borderRadius: 4,
    border: `2px solid ${primary[600]}`,
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
    padding: '8px 16px',
  },
  controlsEditButton2: {
    marginTop: 2,
    marginBottom: 2,
    [theme.breakpoints.up(500)]: {
      padding: '8px 36px',
    },
  },
  controlsEditButtonIcon: {
    marginRight: 8,
  },
  controlsSecondary: {
    cursor: 'auto',
    justifyContent: 'flex-end',
    paddingTop: 0,
    paddingBottom: 0
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
    color: primary[600]
  },
  notice: {
    fontFamily: 'monospace',
    color: grey[600],
    fontWeight: 600,
  },

}))

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

export default function MBInvitation(props){
  const classes = useStyles();
  const { COLOR, BTN, sess, token, setCSRFToken, matchid, handleSnackBar, isAvailableEditing } = props
  const [ addState, setAddState ] = React.useState(false);
  const [ dummyState, setDummyState ] = React.useState(false);
  const [ formState, setFormState ] = React.useState(false);
  const [ data, setData ] = React.useState(null)
  const [ matchDetail, setMatchDetail ] = React.useState(null)
  const [ searchUser, setSearchUser ] = React.useState('')
  const [ dataSliced, setDataSliced ] = React.useState(10)
  const [ selectedUser, setSelectedUser ] = React.useState(null)

  function getStatus(status){
    switch (true) {
      case status === 0:
        return ({
          component: (
            <Typography variant="subtitle2" style={{ color: COLOR.red[500] }}>
              { API._getWord(sess && sess.language).Incomplete }
            </Typography>
          ),
          text: API._getWord(sess && sess.language).Incomplete,
          color: COLOR.red[500]
        });
        break;
      case status === 1:
        return ({
          component: (
            <Typography variant="subtitle2" style={{ color: COLOR.amber[800] }}>
              { API._getWord(sess && sess.language).Pending }
            </Typography>
          ),
          text: API._getWord(sess && sess.language).Pending,
          color: COLOR.amber[500]
        });
        break;
      case status === 2:
        return ({
          component: (
            <Typography variant="subtitle2" style={{ color: COLOR.green[800] }}>
              { API._getWord(sess && sess.language).Complete }
            </Typography>
          ),
          text: API._getWord(sess && sess.language).Complete,
          color: COLOR.green[500]
        });
        break;
      default:
        return ({
          component: (
            <Typography variant="subtitle2" style={{ color: COLOR.grey[800] }}>
              { API._getWord(sess && sess.language).None }
            </Typography>
          ),
          text: API._getWord(sess && sess.language).None,
          color: COLOR.grey[500]
        });
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
        if( dataSliced >= data.filter(item =>{ return item.display === 1 }).length ){
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
        if( dataSliced >= data.filter(item =>{ return item.display === 1 }).length ){
          setDataSliced( 10 )
        }else{
          setDataSliced( data.filter(item =>{ return item.display === 1 }).length )
        }
      }
    }
  }

  function handleAddOpen(){
    setAddState(true);
  };

  function handleAddClose(){
    setAddState(false);
    setDummyState(false);
  };

  function handleDummyOpen(){
    setDummyState(true);
  };

  function handleDummyClose(){
    setDummyState(false);
    setAddState(false);
  };

  function handleFormOpen(d){
    setFormState(true);
    setSelectedUser(d)
  };

  function handleFormClose(){
    setFormState(false);
    setSelectedUser(null)
  };

  function handleSearch(){
    if(data){
      var options = {
        shouldSort: true,
        caseSensitive: true,
        minMatchCharLength: 2,
        keys: [
          "fullname",
          "lastname",
          "teamname",
          "teamno"
        ]
      }
      var fuse = new Fuse(data, options)
      var result = fuse.search(searchUser)
      return result
    }
  }

  function handleResponseForm(){
    const socket = socketIOClient( API._getWebURL(), { transports: ['websocket', 'polling'] } )
    socket.on(`${matchid}-form-server-message`, (messageNew) => {
      //API._sortArrByDate(messageNew, 'createdate', 'fullname')
      setData(messageNew)
    })
  }

  async function handleFetchMatchDetail(){
    if(matchid){
      const resToken = token? token : await API._xhrGet('getcsrf')
      await API._xhrPost(
        token? token : resToken.token,
        sess.typeid === 'admin' ? 'loadmatch' : 'mloadmatch', {
          action: 'detail',
          matchid: matchid
      }, (csrf, d) =>{
        setCSRFToken(csrf)
        if(
          d.status !== 'team database error' ||
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

  async function handleFetchForm(){
    if(matchid){
      const resToken = token? token : await API._xhrGet('getcsrf')
      await API._xhrPost(
        token? token : resToken.token,
        sess.typeid === 'admin' ? 'loadmatch' : 'mloadmatch', {
          action: 'form',
          matchid: matchid
      }, (csrf, d) =>{
        setCSRFToken(csrf)
        //API._sortArrByDate(d.resultform, 'createdate', 'fullname')
        setData(d.resultform)
      })
      await handleFetchMatchDetail()
    }
  }

  React.useEffect(()=>{
    handleResponseForm()
  },[ ])

  React.useEffect(()=>{
    handleFetchForm()
  },[ addState, formState, dummyState ])

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
        <div style={{ display: 'flex', marginBottom: 8 }}>
          { isAvailableEditing &&
            <RedButton
              className={classes.iconButton} variant="contained"
              onClick={handleAddOpen}>
              <AddCircleIcon style={{ marginRight: 8, marginLeft: 12 }} />
              { API._getWord(sess && sess.language).Invite }
            </RedButton>
          }
          <div style={{ flex: 1 }} />
          <a href={`/matchform/${matchid}`}
            target='_blank'
            style={{ textDecoration: 'none', color: 'inherit' }}>
            <GreenTextButton className={classes.controlsEditButton} variant="outlined">
              { API._getWord(sess && sess.language).Form }
            </GreenTextButton>
          </a>
        </div>
        {/* data && data.filter(item =>{ return item.display === 1 }).length > 10 &&
          <ListItem style={{ marginBottom: 8, cursor: 'auto' }}>
            <ThemeProvider theme={theme}>
              <TextField
                className={classes.searchBox}
                variant="outlined"
                placeholder={ !searchUser? ( API._getWord(sess && sess.language).Search_player ) : '' }
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
          */
        }
        { data &&
          <div style={{ display: 'flex', justifyContent: 'flex-end', }}>
            <Typography variant="body1" align="right"
              style={{ marginBottom: 8, marginTop: 'auto', marginRight: 8 }}>
              { ( sess && sess.language === 'TH' ) ?
                `ผู้เล่น ${data.length} คน`
                :
                `${data.length} player${data.length > 1? 's' : ''}`
              }
            </Typography>
          </div>
        }
        <div style={{ overflow: 'auto', position: 'relative' }}>
          <ListItem
            style={{ display: 'flex', backgroundColor: grey[900], borderRadius: 4, cursor: 'auto', }}>
            <ListItemText style={{ color: 'white', margin: '8px 0' }} className={classes.listText}
              primary={
                window.innerWidth < 600?
                ( API._getWord(sess && sess.language).Full_name )
                :
                ( API._getWord(sess && sess.language).First_name )
              } />
            { window.innerWidth >= 600 &&
              <ListItemText style={{ color: 'white', margin: '8px 0' }} className={classes.listText}
                primary={ API._getWord(sess && sess.language).Last_name } />
            }
            { window.innerWidth > 450 &&
              <ListItemText style={{ color: 'white', margin: '8px 0' }} className={classes.listClass}
                primary={ API._getWord(sess && sess.language).Status } />
            }
          </ListItem>
          <div
            style={{ overflow: 'auto', maxHeight: window.innerHeight * .6, position: 'relative', }}>
            { data ?
              ( !data.status && data.filter(item =>{ return item.display === 1 }).length > 0?
                [
                  ...searchUser? handleSearch() : data
                ].slice(0, dataSliced).filter(item =>{ return item.display === 1 }).map(value => {
                  return value && (
                    <React.Fragment key={value.userid}>
                      <ListItem button={isAvailableEditing}
                        onClick={()=>isAvailableEditing ? handleFormOpen(value) : console.log()}>
                        <ListItemText className={classes.listText}
                          primary={
                            ( window.innerWidth >= 450 && window.innerWidth < 600 )?
                            <div style={{ display: 'flex' }}>
                              { value.fullname }<div style={{ width: 20 }}></div>{ value.lastname }
                            </div>
                            : value.fullname }
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
                              { window.innerWidth < 400 &&
                                <React.Fragment>
                                  <br></br>
                                  <Typography
                                    component="span"
                                    variant="caption"
                                    style={{
                                      color:
                                      value.status === 0? red[500] :
                                      value.status === 1? amber[800] : green[500]
                                    }}
                                  >
                                    {getStatus(value.status).text}
                                  </Typography>
                                </React.Fragment>
                              }
                              { window.innerWidth < 600 && value.createdate &&
                                <Typography variant="caption" display="block">
                                  {API._dateToString(value.createdate)}
                                </Typography>
                              }
                            </React.Fragment>
                          } />
                        { window.innerWidth >= 600 &&
                          <ListItemText className={classes.listText}
                            primary={value.lastname} />
                        }
                        { window.innerWidth > 400 &&
                          <ListItemText className={classes.listClass}
                            primary={
                              <Typography
                                component="span"
                                variant="subtitle2"
                                style={{
                                  color:
                                  value.status === 0? red[500] :
                                  value.status === 1? amber[800] : green[500]
                                }}
                              >
                                {getStatus(value.status).text}
                              </Typography>
                            }
                            secondary={
                              window.innerWidth >= 600 && value.createdate &&
                                <Typography variant="caption" display="block" style={{ color: grey[500] }}>
                                  {API._dateToString(value.createdate)}
                                </Typography>
                            } />
                        }
                      </ListItem>
                      <Divider />
                    </React.Fragment>
                  );
                })
                :
                <Typography component="div" style={{ width: '100%', }}>
                  <Box style={{ textAlign: 'center', color: primary[900] }} fontWeight={500} fontSize={24} m={1}>
                    { API._getWord(sess && sess.language)['Invite players to a match.'] }
                  </Box>
                  <div style={{ display: 'flex', justifyContent: 'center', marginTop: 16, marginBottom: 16, }}>
                    <BTN.PrimaryOutlined disabled={!isAvailableEditing} onClick={handleAddOpen}>
                      <AddIcon style={{ marginRight: 8 }} />
                      { API._getWord(sess && sess.language).Invite_players }
                    </BTN.PrimaryOutlined>
                  </div>
                </Typography>
              )
              :
              <LDCircular />
            }
          </div>
          <ListItem dense style={{ display: 'flex' }}>
            { data && data.filter(item =>{ return item.display === 1 }).length > 10 && !searchUser &&
              <React.Fragment>
                <Button fullWidth onClick={handleMore}>
                  { dataSliced >= data.filter(item =>{ return item.display === 1 }).length ? (
                    API._getWord(sess && sess.language).Collapse
                  ):(
                    API._getWord(sess && sess.language).More
                  ) }
                </Button>
                { data && dataSliced < data.filter(item =>{ return item.display === 1 }).length &&
                  <Button fullWidth onClick={handleMoreAll}>{ API._getWord(sess && sess.language).Show_all }</Button>
                }
              </React.Fragment>
            }
            { data && handleSearch().length > 10 && searchUser &&
              <React.Fragment>
                <Button fullWidth onClick={handleMore}>
                  { dataSliced >= handleSearch().length ? (
                    API._getWord(sess && sess.language).Collapse
                  ):(
                    API._getWord(sess && sess.language).More
                  ) }
                </Button>
                { data && dataSliced < handleSearch().length &&
                  <Button fullWidth onClick={handleMoreAll}>{ API._getWord(sess && sess.language).Show_all }</Button>
                }
              </React.Fragment>
            }
          </ListItem>
          { searchUser && handleSearch().length === 0 &&
            <ListItem>
              <Typography component="div" style={{ width: '100%' }}>
                <Box style={{ textAlign: 'center', color: primary[900] }} fontWeight={500} fontSize={24} m={1}>
                  { API._getWord(sess && sess.language).No_Result }
                </Box>
              </Typography>
            </ListItem>
          }
        </div>
      </List>
      <TemplateDialog open={addState} handleClose={handleAddClose}>
        <AddPlayerModal
          {...props}
          playerAction="invite"
          handleDummyOpen={handleDummyOpen}
          data={data} />
      </TemplateDialog>
      <TemplateDialog open={dummyState} handleClose={handleDummyClose} maxWidth="md">
        <DummyPlayer
          {...props}
          handleClose={handleDummyClose}
          />
      </TemplateDialog>
      <TemplateDialog open={formState} handleClose={handleFormClose} maxWidth="xs">
        { selectedUser && formState &&
          <MatchFormAction
            {...props}
            selectedUser={selectedUser}
            handleClose={handleFormClose}
            />
        }
      </TemplateDialog>
    </div>
  );
}
