import React from 'react';
import Loadable from 'react-loadable';
import socketIOClient from 'socket.io-client'
import Fuse from 'fuse.js';
import { makeStyles, withStyles, createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import * as API from './../../../api'
import { primary, grey, red, amber, green } from './../../../api/palette'

import {
  Paper,
  Collapse,
  IconButton,
  Typography,
  Button,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Checkbox,
  TextField,
  InputAdornment,
  Menu,
  MenuItem,
  Slide,
  Divider,
  Tooltip,

} from '@material-ui/core';

import {
  Add as AddIcon,
  Help as HelpIcon,
  Clear as ClearIcon,
  Search as SearchIcon,
  AddCircle as AddCircleIcon,
  Class as ClassIcon,
  ArrowUpward as ArrowUpwardIcon,
  AccessTime as AccessTimeIcon,

} from '@material-ui/icons';

import { LDCircular } from './../../loading/LDCircular'

const TemplateDialog = Loadable({
  loader: () => import(/* webpackChunkName: "TemplateDialog" */'./../../Utils/Dialog/TemplateDialog'),
  loading: () => <LDCircular />
});

const MatchTeam = Loadable({
  loader: () => import(/* webpackChunkName: "MatchTeam" */'./MatchTeam'),
  loading: () => <LDCircular />
});

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    padding: theme.spacing(1, 2),
    width: '100%',
    marginTop: 24,
    boxSizing: 'border-box'
  },
  listRoot: {
    position: 'relative',
    padding: theme.spacing(1, 2),
    width: '100%',
    backgroundColor: grey[50],
    marginTop: 24,
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

const StyledTooltip = withStyles(theme => ({
  tooltip: {
    backgroundColor: primary[50],
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 250,
    fontSize: theme.typography.pxToRem(12),
    border: `1px solid ${primary[200]}`,
  },
}))(Tooltip);

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

const GreenCheckbox = withStyles({
  root: {
    color: primary[400],
    '&$checked': {
      color: primary[600],
    },
  },
})(props => <Checkbox color="default" {...props} />);

const theme = createMuiTheme({
  palette: {
    primary: primary,
  },
});

export default function MBSchedule(props){
  const classes = useStyles();
  const { COLOR, BTN, sess, token, setCSRFToken, matchid, handleSnackBar, isAvailableEditing } = props
  const [ teamState, setTeamState ] = React.useState(false);
  const [ data, setData ] = React.useState(null)
  const [ matchDetail, setMatchDetail ] = React.useState(null)
  const [ checked, setChecked ] = React.useState([]);
  const [ searchUser, setSearchUser ] = React.useState('')
  const [ dataSliced, setDataSliced ] = React.useState(10)
  const [ anchorEl, setAnchorEl ] = React.useState(null);
  const [ selectedTeam, setSelectedTeam ] = React.useState(0)
  const [ selectedUser, setSelectedUser ] = React.useState(null)
  const [ helpState, setHelpState ] = React.useState(false)

  function handleClickHelpState(){
    setHelpState(!helpState)
  }

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

  function handleTeamOpen(){
    setTeamState(true);
  };

  function handleTeamClose(){
    setTeamState(false);
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

  function handleSave(){
    let userid = []
    let teamno = []
    for(var i = 0;i < checked.length;i++){
      userid.push(checked[i].userid)
      teamno.push(selectedTeam)
    }
    handleSetTeam(userid, teamno)
  }

  function handleSelectedTeam(d){
    if( d === 0 ){
      setSelectedTeam(0)
    }else{
      setSelectedTeam(d.teamno)
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

  async function handleFetchSwitchHostForm(){
    if(matchid){
      const resToken = token? token : await API._xhrGet('getcsrf')
      await API._xhrPost(
        token? token : resToken.token,
        sess.typeid === 'admin' ? 'matchsection' : 'mmatchsection', {
          action: 'switchhostform',
          matchid: matchid,
      }, (csrf, d) =>{
        setCSRFToken(csrf)
        if(/success/.test(d.status)){
          handleSnackBar({
            state: true,
            message: d.action,
            variant: 'success',
            autoHideDuration: 5000
          })
        }else{
          handleSnackBar({
            state: true,
            message: d.status,
            variant: /success/.test(d.status) ? 'success' : 'error',
            autoHideDuration: /success/.test(d.status)? 2000 : 5000
          })
        }
        try {
          handleFetchSchedule()
        }catch(err) { console.log(err.message) }
      })
    }
  }

  async function handleSetTeam(userid, teamno){
    if(matchid){
      const resToken = token? token : await API._xhrGet('getcsrf')
      await API._xhrPost(
        token? token : resToken.token,
        sess.typeid === 'admin' ? 'matchsection' : 'mmatchsection', {
          action: 'editteam',
          matchid: matchid,
          userid: userid,
          teamno: teamno
      }, (csrf, d) =>{
        setCSRFToken(csrf)
        handleSnackBar({
          state: true,
          message: d.status,
          variant: /success/.test(d.status) ? 'success' : 'error',
          autoHideDuration: /success/.test(d.status)? 2000 : 5000
        })
        setChecked([])
        try {
          handleFetchSchedule()
        }catch(err) { console.log(err.message) }
      })
    }
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

  async function handleFetchSchedule(){
    if(matchid){
      const resToken = token? token : await API._xhrGet('getcsrf')
      await API._xhrPost(
        token? token : resToken.token,
        sess.typeid === 'admin' ? 'loadmatch' : 'mloadmatch', {
          action: 'schedule',
          matchid: matchid
      }, (csrf, d) =>{
        setCSRFToken(csrf)
        setData(d.userscore)
      })
      await handleFetchMatchDetail()
    }
  }

  React.useEffect(()=>{
    handleFetchSchedule()
  },[ teamState ])

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
        { matchDetail && matchDetail.team && matchDetail.team.length > 0 &&
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <a href={`/schedule/${matchid}`}
              target='_blank'
              style={{ textDecoration: 'none', color: 'inherit' }}>
              <GreenTextButton variant="outlined" className={classes.controlsEditButton}>
                {/*<ClassIcon className={classes.controlsEditButtonIcon} />*/}
                { API._getWord(sess && sess.language).Schedule }
              </GreenTextButton>
            </a>
          </div>
        }
        { isAvailableEditing &&
          <React.Fragment>
            <ListItem disableGutters className={classes.controls}>
              <GreenTextButton
                className={classes.button}
                style={{ marginBottom: window.innerWidth > 700? 0 : 16, }}
                onClick={handleTeamOpen}
                variant="outlined">
                { matchDetail && matchDetail.team && matchDetail.team.length > 0?
                  (
                    ( API._getWord(sess && sess.language).Manage_Schedule ) + '( ' + matchDetail.team.length + ' )'
                  )
                  :
                  ( API._getWord(sess && sess.language).Create_schedule )
                }
              </GreenTextButton>
              <div style={{ flex: 1 }} />
              <GreenTextButton
                variant="outlined" className={classes.button} onClick={handleMenuClick}
                startIcon={
                  <AccessTimeIcon fontSize="large" style={{ color: primary[600], marginRight: 4 }} />
                }>
                { selectedTeam !== 0 ? (
                  sess && `${API._getWord(sess.language).Selected_Time} : `
                ): (
                  API._getWord(sess && sess.language).Select_Time
                ) }
                { selectedTeam !== 0?
                  matchDetail && matchDetail.team &&
                  matchDetail.team.filter( item =>{
                    return item.teamno === selectedTeam
                  }).map( d =>
                    d &&
                    <React.Fragment key={d.teamname}>{d.teamname}</React.Fragment>
                  )
                  : ''
                }
              </GreenTextButton>
            </ListItem>
            <ListItem disableGutters>
              <div style={{ display: 'flex' }}>
                <GreenTextButton
                  className={classes.button}
                  onClick={handleFetchSwitchHostForm}
                  variant="outlined">
                  { API._getWord(sess && sess.language).Switch_Host }
                </GreenTextButton>
                <StyledTooltip
                  PopperProps={{
                    disablePortal: true,
                  }}
                  onClose={()=>setHelpState(false)}
                  open={helpState}
                  disableFocusListener
                  disableHoverListener
                  disableTouchListener
                  title={
                    <Typography>
                      { ( sess && sess.language === 'TH' ) ?
                        "กดปุ่มนี้เพื่อเพิ่มผู้จัดการแข่งขันเข้าไปในรายชื่อ ในกรณีที่ต้องการเข้าร่วมการแข่งขัน"
                        :
                        'Click this button to add the organizer to the list. In the case of wanting to participate in the match.'
                      }
                    </Typography>
                  }>
                  <IconButton onClick={handleClickHelpState}>
                    <HelpIcon fontSize="small"
                      style={{ color: primary[helpState ? 400 : 600] }} />
                  </IconButton>
                </StyledTooltip>
              </div>
              <div style={{ flex: 1 }} />
              { checked.length > 0 && selectedTeam !== 0 &&
                <GreenButton variant="contained" className={classes.controlsEditButton2} onClick={handleSave}>
                  { API._getWord(sess && sess.language).Save }
                </GreenButton>
              }
            </ListItem>
          </React.Fragment>
        }
        { /*
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
          </ListItem>*/
        }
        <div style={{ overflow: 'auto', position: 'relative' }}>
          <ListItem
            style={{ display: 'flex', backgroundColor: grey[900], borderRadius: 4, cursor: 'auto', }}>
            <ListItemText inset style={{ color: 'white', margin: '8px 0' }} className={classes.listText}
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
            { window.innerWidth > 600 &&
              <ListItemText style={{ color: 'white', margin: '8px 0', marginRight: 20 }} className={classes.listTeam}
                primary={ API._getWord(sess && sess.language).Time } />
            }
          </ListItem>
          { isAvailableEditing && matchDetail && matchDetail.team && matchDetail.team.length === 0 &&
            <ListItem>
              <Typography component="div" style={{ width: '100%', display: 'flex' }}>
                <Box style={{ textAlign: 'center', color: primary[900] }} fontWeight={500} fontSize={24} m={1}>
                  { API._getWord(sess && sess.language).No_schedule_yet }
                </Box>
                <BTN.PrimaryOutlined onClick={handleTeamOpen}>
                  <AddIcon style={{ marginRight: 8 }} />
                  { API._getWord(sess && sess.language).Create_schedule }
                </BTN.PrimaryOutlined>
              </Typography>
            </ListItem>
          }
          <div style={{ overflow: 'auto', maxHeight: window.innerHeight * .6, position: 'relative', }}>
            { ( data && !data.status ) ?
              (
                data.length > 0 ?
                [
                  ...searchUser? handleSearch() : data
                ].slice(0, dataSliced).map(value => {
                  return value && (
                    <React.Fragment key={value.userid}>
                      <ListItem button={isAvailableEditing}
                        onClick={()=>isAvailableEditing ? handleToggle(value) : console.log()}>
                        <ListItemIcon>
                          {selectedTeam !== 0 ?
                            <GreenCheckbox
                              edge="start"
                              checked={checked.indexOf(value) !== -1}
                              tabIndex={-1}
                              disableRipple />
                            :
                            <div style={{ width: 42 }} />
                          }
                        </ListItemIcon>

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
                              { window.innerWidth < 600 &&
                                ( matchDetail && matchDetail.team ?
                                  ( value.teamno === 0 ?
                                    <React.Fragment>
                                      <br></br>
                                      {"-"}
                                    </React.Fragment>
                                    :
                                    matchDetail.team.filter( d =>{
                                      return d.teamno === value.teamno
                                    }).map((d, i) =>
                                      d &&
                                      <React.Fragment key={i}>
                                        <br></br>
                                        {d.teamname}
                                        <br></br>
                                        {d.note}
                                      </React.Fragment>
                                    )
                                  )
                                  :
                                  <React.Fragment>
                                    <br></br>
                                    {"-"}
                                  </React.Fragment>
                                )
                              }
                            </React.Fragment>
                          } />
                        { window.innerWidth >= 600 &&
                          <ListItemText className={classes.listText}
                            primary={value.lastname} />
                        }
                        { window.innerWidth > 600 &&
                          (
                            matchDetail && matchDetail.team ?
                            ( value.teamno === 0 ?
                              <ListItemText style={{ justifyContent: 'center' }} className={classes.listTeam} primary={"-"} />
                              :
                              matchDetail.team.filter( d =>{
                                return d.teamno === value.teamno
                              }).map( d =>
                                d &&
                                <ListItemText key={d.teamname + `(${value.userid})`} style={{ justifyContent: 'center' }} className={classes.listTeam}
                                  primary={d.teamname}
                                  secondary={d.note} />
                              )
                            )
                            :
                            <ListItemText style={{ justifyContent: 'center' }} className={classes.listTeam} primary={"-"} />
                          )
                        }
                      </ListItem>
                      <Divider />
                    </React.Fragment>
                  );
                })
                :
                <Typography component="div" style={{ width: '100%' }}>
                  <Box style={{ textAlign: 'center', color: primary[900] }} fontWeight={500} fontSize={24} m={1}>
                    { API._getWord(sess && sess.language).No_player }
                  </Box>
                  { isAvailableEditing &&
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: 16, marginBottom: 16, }}>
                      <BTN.NoStyleLink to={`${window.location.pathname}#invitation`}>
                        <BTN.PrimaryOutlined>
                          <AddIcon style={{ marginRight: 8 }} />
                          { API._getWord(sess && sess.language).Invite_players }
                        </BTN.PrimaryOutlined>
                      </BTN.NoStyleLink>
                    </div>
                  }
                </Typography>
              )
              :
              <LDCircular />
            }
          </div>
          <ListItem role={undefined} dense style={{ display: 'flex' }}>
            { data && data.length > 10 && !searchUser &&
              <React.Fragment>
                <Button fullWidth onClick={handleMore}>
                  { dataSliced >= data.length ? (
                    API._getWord(sess && sess.language).Collapse
                  ):(
                    API._getWord(sess && sess.language).More
                  ) }
                </Button>
                { data && dataSliced < data.length &&
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
      <TemplateDialog open={teamState} handleClose={handleTeamClose} maxWidth="xs">
        <MatchTeam
          handleTeamClose={handleTeamClose}
          {...props} />
      </TemplateDialog>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={()=>handleSelectedTeam(0)}>{"-"}</MenuItem>
        { matchDetail && matchDetail.team &&
          matchDetail.team.map( (d, i) =>
            d &&
            <MenuItem key={"i : " + i + " data: " + d} onClick={()=>handleSelectedTeam(d)}>{d.teamname}</MenuItem>
          )
        }
      </Menu>
    </div>
  );
}
