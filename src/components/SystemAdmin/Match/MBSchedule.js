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
  loader: () => import(/* webpackChunkName: "TemplateDialog" */'./../../Utils/TemplateDialog'),
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
  const { COLOR, BTN, sess, token, setCSRFToken, matchid, handleSnackBar, } = props
  const [ teamState, setTeamState ] = React.useState(false);
  const [ data, setData ] = React.useState(null)
  const [ matchDetail, setMatchDetail ] = React.useState(null)
  const [ checked, setChecked ] = React.useState([]);
  const [ searchUser, setSearchUser ] = React.useState('')
  const [ dataSliced, setDataSliced ] = React.useState(10)
  const [ anchorEl, setAnchorEl ] = React.useState(null);
  const [ selectedTeam, setSelectedTeam ] = React.useState(0)
  const [ selectedUser, setSelectedUser ] = React.useState(null)

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
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 24 }}>
            <a href={`/schedule/${matchid}`}
              target='_blank'
              style={{ textDecoration: 'none', color: 'inherit' }}>
              <GreenTextButton className={classes.controlsEditButton}>
                {/*<ClassIcon className={classes.controlsEditButtonIcon} />*/}
                { ( sess && sess.language === 'TH' ) ? "ตารางการแข่งขัน" : 'Schedule' }
              </GreenTextButton>
            </a>
          </div>
        }
        <ListItem disableGutters className={classes.controls}>
          <GreenTextButton
            className={classes.button}
            style={{ marginBottom: window.innerWidth > 700? 0 : 16, }}
            onClick={handleTeamOpen}
            variant="outlined">
            { matchDetail && matchDetail.team && matchDetail.team.length > 0?
              (
                ( ( sess && sess.language === 'TH' ) ? "จัดการตารางเวลา" : 'Manage Schedule' ) + '( ' + matchDetail.team.length + ' )'
              )
              :
              ( ( sess && sess.language === 'TH' ) ? "สร้างตารางเวลา" : 'Create Schedule' )
            }
          </GreenTextButton>
          <div style={{ flex: 1 }} />
          <GreenTextButton variant="outlined" className={classes.button} onClick={handleMenuClick}>
            <AccessTimeIcon fontSize="large" style={{ color: primary[600], marginRight: 4 }} />
            { selectedTeam !== 0 ? (
              ( sess && sess.language === 'TH' ) ? "เวลาที่เลือก  : " : 'Selected Time  : '
            ): (
              ( sess && sess.language === 'TH' ) ? "เลือกเวลา" : 'Select Time'
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
          <GreenTextButton
            className={classes.button}
            onClick={handleFetchSwitchHostForm}
            variant="outlined">
            { ( sess && sess.language === 'TH' ) ? "สลับผู้จัด" : 'Switch Host' }
          </GreenTextButton>
          <div style={{ flex: 1 }} />
          { checked.length > 0 &&
            <GreenButton className={classes.controlsEditButton2} onClick={handleSave}>
              { ( sess && sess.language === 'TH' ) ? "บันทึก" : 'Save' }
            </GreenButton>
          }
        </ListItem>
        { /*
          <ListItem style={{ marginBottom: 8, cursor: 'auto' }}>
            <ThemeProvider theme={theme}>
              <TextField
                className={classes.searchBox}
                variant="outlined"
                placeholder={ !searchUser? ( ( sess && sess.language === 'TH' ) ? "ค้นหาผู้เล่น" : 'Search player' ) : '' }
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
          <ListItem role={undefined}
            style={{
              display: 'flex', backgroundColor: grey[900], borderRadius: 4, cursor: 'auto',
            }}>
            <ListItemText inset style={{ color: 'white', margin: '8px 0' }} className={classes.listText}
              primary={
                window.innerWidth < 600?
                ( ( sess && sess.language === 'TH' ) ? "ชื่อ" : 'Full Name' )
                :
                ( ( sess && sess.language === 'TH' ) ? "ชื่อ" : 'First name' )
              } />
            { window.innerWidth >= 600 &&
              <ListItemText style={{ color: 'white', margin: '8px 0' }} className={classes.listText}
                primary={ ( sess && sess.language === 'TH' ) ? "นามสกุล" : 'Last name' } />
            }
            { window.innerWidth > 600 &&
              <ListItemText style={{ color: 'white', margin: '8px 0', marginRight: 20 }} className={classes.listTeam}
                primary={ ( sess && sess.language === 'TH' ) ? "เวลา" : 'Time' } />
            }
          </ListItem>
          { matchDetail && matchDetail.team && matchDetail.team.length === 0 &&
            <ListItem>
              <Typography component="div" style={{ width: '100%' }}>
                <Box style={{ textAlign: 'center', color: primary[900] }} fontWeight={500} fontSize={24} m={1}>
                  { ( sess && sess.language === 'TH' ) ? "ยังไม่มีตารางเวลา" : 'No schedule yet.' }
                </Box>
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: 16, marginBottom: 16, }}>
                  <BTN.PrimaryOutlined onClick={handleTeamOpen}>
                    <AddIcon style={{ marginRight: 8 }} />
                    { ( sess && sess.language === 'TH' ) ? "สร้างตารางเวลา" : 'Create schedule.' }
                  </BTN.PrimaryOutlined>
                </div>
              </Typography>
            </ListItem>
          }
          <div style={{ overflow: 'auto', maxHeight: window.innerHeight * .6, position: 'relative' }}>
            { data && !data.status &&
              [
                ...searchUser? handleSearch() : data
              ].slice(0, dataSliced).map(value => {
                return value && (
                  <React.Fragment key={value.userid}>
                    <ListItem role={undefined} button
                      onClick={()=>handleToggle(value)}>
                      <ListItemIcon>
                        <GreenCheckbox
                          edge="start"
                          checked={checked.indexOf(value) !== -1}
                          tabIndex={-1}
                          disableRipple />
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
            }
            <ListItem role={undefined} dense style={{ display: 'flex' }}>
              { data && data.length > 10 && !searchUser &&
                <React.Fragment>
                  <Button fullWidth onClick={handleMore}>
                    { dataSliced >= data.length ? (
                      ( sess && sess.language === 'TH' ) ? "ย่อทั้งหมด" : 'Collapse'
                    ):(
                      ( sess && sess.language === 'TH' ) ? "แสดง" : 'More'
                    ) }
                  </Button>
                  { data && dataSliced < data.length &&
                    <Button fullWidth onClick={handleMoreAll}>{ ( sess && sess.language === 'TH' ) ? "แสดงทั้งหมด" : 'More all' }</Button>
                  }
                </React.Fragment>
              }
              { data && handleSearch().length > 10 && searchUser &&
                <React.Fragment>
                  <Button fullWidth onClick={handleMore}>
                    { dataSliced >= handleSearch().length ? (
                      ( sess && sess.language === 'TH' ) ? "ย่อทั้งหมด" : 'Collapse'
                    ):(
                      ( sess && sess.language === 'TH' ) ? "แสดง" : 'More'
                    ) }
                  </Button>
                  { data && dataSliced < handleSearch().length &&
                    <Button fullWidth onClick={handleMoreAll}>{ ( sess && sess.language === 'TH' ) ? "แสดงทั้งหมด" : 'More all' }</Button>
                  }
                </React.Fragment>
              }
            </ListItem>
            { searchUser && handleSearch().length === 0 &&
              <ListItem>
                <Typography component="div" style={{ width: '100%' }}>
                  <Box style={{ textAlign: 'center', color: primary[900] }} fontWeight={500} fontSize={24} m={1}>
                    { ( sess && sess.language === 'TH' ) ? "ไม่มีผลลัพท์" : 'No Result' }
                  </Box>
                </Typography>
              </ListItem>
            }
          </div>
        </div>
      </List>
      <TemplateDialog open={teamState} handleClose={handleTeamClose} maxWidth={500}>
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
