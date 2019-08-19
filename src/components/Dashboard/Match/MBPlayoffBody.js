import React from 'react';
import socketIOClient from 'socket.io-client'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import * as API from './../../../api'
import { primary, grey } from './../../../api/palette'

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

import CheckCircleIcon from '@material-ui/icons/CheckCircle';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    padding: 0,
    width: '100%',
    backgroundColor: grey[50],
    cursor: 'pointer',
    marginTop: 24,
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
  const { token, setCSRFToken, matchid, handleSnackBar, data, setData, setMatchDetail } = props

  function handleUpdatePlayoff(selected){
    var hd = ( /www/.test(window.location.href) )? 'https://www.' : 'https://'
    const socket = socketIOClient( hd + API.webURL() )
    socket.emit('client-message', {
      action: "updateplayoff",
      matchid: matchid,
      userid: selected.userid,
    })
  }

  async function handleSetPlayoff(selected){
    if(matchid){
      const resToken = token? token : await API.xhrGet('getcsrf')
      await API.xhrPost(
        token? token : resToken.token,
        sess.typeid === 'admin' ? 'matchmember' : 'mmatchmember', {
          action: 'setplayoff',
          matchid: matchid,
          userid: selected.userid,
          classno: selected.classno
      }, (csrf, d) =>{
        setCSRFToken(csrf)
        handleSnackBar({
          state: true,
          message: d.status,
          variant: d.status === 'success' ? 'success' : 'error',
          autoHideDuration: d.status === 'success'? 2000 : 5000
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
      const resToken = token? token : await API.xhrGet('getcsrf')
      await API.xhrPost(
        token? token : resToken.token,
        sess.typeid === 'admin' ? 'loadmatch' : 'mloadmatch', {
          action: 'playoff',
          matchid: matchid
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
      const resToken = token? token : await API.xhrGet('getcsrf')
      await API.xhrPost(
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
          <CheckCircleIcon classes={{ root: classes.checkCircle }}/>
          :
          <div style={{ width: 20, textAlign: 'center', fontSize: 20, fontWeight: 600 }}>-</div>
        }
      </ListItemIcon>
    </ListItem>
  );
}

export default function MBPlayoffBody(props){
  const classes = useStyles();
  const { token, setCSRFToken, matchid, handleSnackBar } = props
  const [ data, setData ] = React.useState(null)
  const [ matchDetail, setMatchDetail ] = React.useState([])
  const [ value, setValue ] = React.useState(0);
  const [ checkPlayoff, setCheckPlayoff ] = React.useState(null);

  function handleChange(event, newValue) {
    setValue(newValue);
  }
  
  async function handleFetch(){
    if(matchid){
      const resToken = token? token : await API.xhrGet('getcsrf')
      await API.xhrPost(
        token? token : resToken.token,
        sess.typeid === 'admin' ? 'loadmatch' : 'mloadmatch', {
          action: 'playoff',
          matchid: matchid
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
      const resToken = token? token : await API.xhrGet('getcsrf')
      await API.xhrPost(
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
      const resToken = token? token : await API.xhrGet('getcsrf')
      await API.xhrPost(
        token? token : resToken.token,
        sess.typeid === 'admin' ? 'matchmember' : 'mmatchmember', {
          action: 'clearplayoff',
          matchid: matchid,
          classno: d.classno
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

  React.useEffect(()=>{
    handleFetch()
  },[ ])

  return(
    <div className={classes.root}>
      <Typography component="div">
        <Box className={classes.notice} m={1}>
          Select class
        </Box>
      </Typography>
      <Paper elevation={1} style={{ backgroundColor: primary[100], padding: '8px 0' }}>
        <StyledTabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="on"
        >
          { matchDetail && matchDetail.class &&
            matchDetail.class.map( d =>
              d && <StyledTab key={d.classname} label={d.classname} />
          )}
        </StyledTabs>
      </Paper>
      <div className={classes.list}>
        <List>
          { matchDetail && matchDetail.class &&
            matchDetail.class.map( (c, i) =>{
              const filtered = c && data.filter( item =>{
                return ( item && item.classno === c.classno )
              })
              return (
                <React.Fragment key={i}>
                  { value === i && filtered &&
                    <React.Fragment>
                      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 8 }}>
                        <GreenTextButton onClick={()=>handleClearPlayoff(c)}>Clear</GreenTextButton>
                      </div>
                      <ListItem className={classes.listItem}>
                        <ListItemText style={{ color: 'white' }} className={classes.listText} primary="First name" />
                        <ListItemText style={{ color: 'white' }} className={classes.listText} primary="Last name" />
                        <ListItemIcon className={classes.listStatus}>
                          <div style={{ color: 'white', textAlign: 'center', fontSize: 16, fontWeight: 400, lineHeight: 1.5, letterScpacing: '0.00938em' }}>Playoff</div>
                        </ListItemIcon>
                      </ListItem>
                      { filtered.length > 1 &&
                        filtered.map( d =>
                          <PlayoffContainer key={d.userid} data={d} token={token} setCSRFToken={setCSRFToken}
                            matchid={matchid} handleSnackBar={handleSnackBar}
                            setData={setData} setMatchDetail={setMatchDetail}/>
                        )
                      }
                      { filtered.length <= 1 &&
                        <ListItem>
                          <Typography component="div" style={{ width: '100%' }}>
                            <Box style={{ textAlign: 'center', color: primary[900] }} fontWeight={500} fontSize={24} m={1}>
                              No playoff player
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
