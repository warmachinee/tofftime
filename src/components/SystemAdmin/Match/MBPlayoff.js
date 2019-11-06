import React from 'react';
import socketIOClient from 'socket.io-client'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import * as API from './../../../api'
import { primary, grey } from './../../../api/palette'

import {
  Tabs,
  Tab,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
  Button,
  Menu,
  MenuItem,
  FormControl,
  InputLabel,
  Select,

} from '@material-ui/core';

import CheckCircleIcon from '@material-ui/icons/CheckCircle';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    padding: 0,
    width: '100%',
    marginTop: 24,
    boxSizing: 'border-box',
    [theme.breakpoints.up(500)]: {
      padding: theme.spacing(1, 2),
    }
  },
  indicator: {
    backgroundColor: primary[600],
    height: 4
  },
  scrollButtons: {
    color: primary[900],
    width: 50,
  },
  notice: {
    fontFamily: 'monospace',
    color: grey[600],
    fontWeight: 600,
  },
  list: {
    padding: 0
  },
  listItem: {
    backgroundColor: grey[900]
  },
  listText:{
    width: '40%',
    textAlign: 'left',
    [theme.breakpoints.up(500)]: {
      width: '100%',
    }
  },
  listStatus: {
    width: '10%',
    justifyContent: 'center',
  },
  checkCircle: {
    color: primary[600]
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },

}))

const GreenTextButton = withStyles(theme => ({
  root: {
    color: primary[600],
    '&:hover': {
      backgroundColor: primary[100],
    },
  },
}))(Button);

const StyledTabs = withStyles({
  root: {
    //borderBottom: '1px solid #e8e8e8',
  },
  indicator: {
    backgroundColor: primary[600],
    height: 4
  },
  scrollButtons: {
    color: primary[900],
    width: 50,
  }
})(Tabs);

const StyledTab = withStyles(theme => ({
  root: {
    textTransform: 'none',
    fontWeight: 500,
    marginRight: theme.spacing(4),
    '&:hover': {
      color: primary[600],
      opacity: 1,
    },
    '&$selected': {
      color: primary[600],
    },
    '&:focus': {
      color: primary[600],
    },
  },
  selected: {},
}))(props => <Tab disableRipple {...props} />);

function PlayoffContainer(props){
  const classes = useStyles();
  const { sess, token, setCSRFToken, matchid, handleSnackBar, data, setData, setMatchDetail, mainClassSelected } = props

  function handleUpdatePlayoff(selected){
    const socket = socketIOClient( API._getWebURL() )
    socket.emit('admin-match-client-message', {
      action: "updateplayoff",
      matchid: matchid,
      userid: selected.userid,
      mainclass: parseInt(mainClassSelected)
    })
  }

  async function handleSetPlayoff(selected){
    if(matchid){
      const resToken = token? token : await API._xhrGet('getcsrf')
      await API._xhrPost(
        token? token : resToken.token,
        sess.typeid === 'admin' ? 'matchmember' : 'mmatchmember', {
          action: 'setplayoff',
          matchid: matchid,
          userid: selected.userid,
          classno: selected.classno,
          mainclass: parseInt(mainClassSelected)
      }, (csrf, d) =>{
        setCSRFToken(csrf)
        handleSnackBar({
          state: true,
          message: d.status,
          variant: /success/.test(d.status) ? 'success' : 'error',
          autoHideDuration: /success/.test(d.status)? 2000 : 5000
        })
        try {
          handleUpdatePlayoff(selected)
          handleFetch()
        }catch(err) { console.log(err.message) }
      })
    }
  }

  async function handleFetch(){
    if(matchid){
      const resToken = await API._xhrGet('getcsrf')
      await API._xhrPost(
        resToken.token,
        sess.typeid === 'admin' ? 'loadmatch' : 'mloadmatch', {
          action: 'playoff',
          matchid: matchid,
          mainclass: parseInt(mainClassSelected)
      }, (csrf, d) =>{
        setCSRFToken(csrf)
        if(
          d.status !== 'wrong matchid' ||
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

  return(
    <ListItem
      button
      onClick={()=>handleSetPlayoff(data)}
    >
      <ListItemText className={classes.listText} primary={data.fullname} />
      <ListItemText className={classes.listText} primary={data.lastname} />
      <ListItemIcon className={classes.listStatus}>
        { data.status === 'playoff'?
          <CheckCircleIcon classes={{ root: classes.checkCircle }} />
          :
          <div style={{ width: 20, textAlign: 'center', fontSize: 20, fontWeight: 600 }}>-</div>
        }
      </ListItemIcon>
    </ListItem>
  );
}

export default function MBPlayoff(props){
  const classes = useStyles();
  const { sess, token, setCSRFToken, matchid, handleSnackBar } = props
  const [ data, setData ] = React.useState(null)
  const [ matchDetail, setMatchDetail ] = React.useState(null)
  const [ value, setValue ] = React.useState(0);
  const [ checkPlayoff, setCheckPlayoff ] = React.useState(null);
  const [ mainClassSelected, setMainClassSelected ] = React.useState('1')

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  async function handleFetch(){
    if(matchid){
      const resToken = token? token : await API._xhrGet('getcsrf')
      await API._xhrPost(
        token? token : resToken.token,
        sess.typeid === 'admin' ? 'loadmatch' : 'mloadmatch', {
          action: 'playoff',
          matchid: matchid,
          mainclass: parseInt(mainClassSelected)
      }, (csrf, d) =>{
        setCSRFToken(csrf)
        if(
          d.status !== 'wrong matchid' ||
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

  async function handleClearPlayoff(d){
    if(matchid){
      const resToken = token? token : await API._xhrGet('getcsrf')
      await API._xhrPost(
        token? token : resToken.token,
        sess.typeid === 'admin' ? 'matchmember' : 'mmatchmember', {
          action: 'clearplayoff',
          matchid: matchid,
          classno: d.classno,
          mainclass: parseInt(mainClassSelected)
      }, (csrf, d) =>{
        setCSRFToken(csrf)
        handleSnackBar({
          state: true,
          message: d.status,
          variant: /success/.test(d.status) ? 'success' : 'error',
          autoHideDuration: /success/.test(d.status)? 2000 : 5000
        })
        try {
          handleFetch()
        }catch(err) { console.log(err.message) }
      })
    }
  }

  React.useEffect(()=>{
    handleFetch()
  },[ mainClassSelected ])

  return(
    <div className={classes.root}>
      <Typography component="div" style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box className={classes.notice} m={1}>
          { ( sess && sess.language === 'TH' ) ? "เลือกประเภท" : 'Select class' }
        </Box>
        { matchDetail && matchDetail.scorematch !== 0 &&
          <FormControl className={classes.formControl}>
            <InputLabel>Main Class</InputLabel>
            <Select
              value={mainClassSelected}
              onChange={e => setMainClassSelected(e.target.value)}>
              { matchDetail &&
                matchDetail.mainclass.map( d =>
                  <MenuItem key={d.mainclass} value={d.mainclass.toString()}>
                    {d.mainclass}
                  </MenuItem>
              )}
            </Select>
          </FormControl>
        }
      </Typography>
      <Paper elevation={1} style={{ backgroundColor: primary[100], padding: '8px 0' }}>
        <StyledTabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="on"
        >
          { matchDetail && matchDetail.mainclass &&
            matchDetail.mainclass[parseInt(mainClassSelected) - 1].values.map( d =>
              d && <StyledTab key={d.classname}
              label={ matchDetail.scorematch !== 0 ? d.classname : API._handleAmateurClass(d.classno) } />
          )}
        </StyledTabs>
      </Paper>
      <div className={classes.list}>
        <List>
          { data && !data.status &&
            matchDetail && matchDetail.mainclass &&
            matchDetail.mainclass[parseInt(mainClassSelected) - 1].values.map( (c, i) =>{
              const filtered = c && data.filter( item =>{
                return ( item && item.classno === c.classno )
              })
              return (
                <React.Fragment key={i}>
                  { value === i && filtered &&
                    <React.Fragment>
                      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 8 }}>
                        <GreenTextButton onClick={()=>handleClearPlayoff(c)}>
                          { ( sess && sess.language === 'TH' ) ? "เคลียร์" : 'Clear' }
                        </GreenTextButton>
                      </div>
                      <ListItem className={classes.listItem}>
                        <ListItemText style={{ color: 'white' }} className={classes.listText}
                          primary={ ( sess && sess.language === 'TH' ) ? "ชื่อ" : 'First name' } />
                        <ListItemText style={{ color: 'white' }} className={classes.listText}
                          primary={ ( sess && sess.language === 'TH' ) ? "นามสกุล" : 'Last name' } />
                        <ListItemIcon className={classes.listStatus}>
                          <div style={{ color: 'white', textAlign: 'center', fontSize: 16, fontWeight: 400, lineHeight: 1.5, letterScpacing: '0.00938em' }}>
                            { ( sess && sess.language === 'TH' ) ? "เพลย์ออฟ" : 'Playoff' }
                          </div>
                        </ListItemIcon>
                      </ListItem>
                      { filtered.length > 1 &&
                        filtered.map( d =>
                          <PlayoffContainer
                            key={d.userid}
                            {...props}
                            data={d}
                            setData={setData}
                            setMatchDetail={setMatchDetail}
                            mainClassSelected={mainClassSelected} />
                        )
                      }
                      { filtered.length <= 1 &&
                        <ListItem>
                          <Typography component="div" style={{ width: '100%' }}>
                            <Box style={{ textAlign: 'center', color: primary[900] }} fontWeight={500} fontSize={24} m={1}>
                              { ( sess && sess.language === 'TH' ) ? "ไม่มีผู้เล่นเพลย์ออฟ" : 'No playoff player' }
                            </Box>
                          </Typography>
                        </ListItem>
                      }
                    </React.Fragment>
                  }
                </React.Fragment>
              );
            })
          }
        </List>
      </div>
    </div>
  );
}
