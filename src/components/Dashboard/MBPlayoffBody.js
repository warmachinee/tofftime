import React from 'react';
import Loadable from 'react-loadable';
import socketIOClient from 'socket.io-client'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import * as API from '../../api'

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import teal from '@material-ui/core/colors/teal';
import grey from '@material-ui/core/colors/grey';

import { LDCircular } from '../loading/LDCircular'

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    padding: theme.spacing(1, 2),
    width: '100%',
    backgroundColor: grey[50],
    cursor: 'pointer',
    marginTop: 24
  },
  indicator: {
    backgroundColor: teal[600],
    height: 4
  },
  scrollButtons: {
    color: teal[900],
    width: 50,
  },
  list: {
    marginTop: 36
  },
  listText:{
    width: '100%',
    textAlign: 'left'
  },
}))

const StyledTabs = withStyles({
  root: {
    //borderBottom: '1px solid #e8e8e8',
  },
  indicator: {
    backgroundColor: teal[600],
    height: 4
  },
  scrollButtons: {
    color: teal[900],
    width: 50,
  }
})(Tabs);

const StyledTab = withStyles(theme => ({
  root: {
    textTransform: 'none',
    fontWeight: 500,
    marginRight: theme.spacing(4),
    '&:hover': {
      color: teal[600],
      opacity: 1,
    },
    '&$selected': {
      color: teal[600],
    },
    '&:focus': {
      color: teal[600],
    },
  },
  selected: {},
}))(props => <Tab disableRipple {...props} />);

function PlayoffContainer(props){
  const classes = useStyles();
  const { token, setCSRFToken, matchid, handleSnackBar, data, setData, setMatchDetail } = props

  async function handleSetPlayoff(selected){
    const res = await token? token : API.xhrGet('getcsrf')
    if(matchid){
      await API.xhrPost(
        token? token : res.token,
        'adminmatchmember', {
          action: 'setplayoff',
          matchid: matchid,
          userid: selected.userid,
          classno: selected.classno
      }, (csrf, d) =>{
        setCSRFToken(csrf)
        handleSnackBar({
          state: true,
          message: d.status,
          variant: d.status === 'success' ? 'success' : 'error'
        })
        try {
          handleUpdatePlayoff(selected)
          handleFetch()
        }
        catch(err) {
          console.log(err.message);
        }
      })
    }
  }

  function handleUpdatePlayoff(selected){
    const socket = socketIOClient('https://thai-pga.com')
    socket.emit('client-message', {
      action: "updateplayoff",
      matchid: matchid,
      userid: selected.userid,
    })
  }

  async function handleFetch(){
    const res = await token? token : API.xhrGet('getcsrf')
    if(matchid){
      await API.xhrPost(
        token? token : res.token,
        'adminloadmatch', {
          action: 'playoff',
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
        'adminloadmatch', {
          action: 'detail',
          matchid: matchid
      }, (csrf, d) =>{
        setCSRFToken(csrf)
        setMatchDetail(d)
      })
    }
  }

  return(
    <List>
      <ListItem
        button
        onClick={()=>handleSetPlayoff(data)}
      >
        <ListItemText className={classes.listText} primary={data.fullname} />
        <ListItemText className={classes.listText} primary={data.lastname} />
        <ListItemText className={classes.listText} primary={data.status} />
      </ListItem>
    </List>
  );
}

export default function MBPlayoffBody(props){
  const classes = useStyles();
  const { token, setCSRFToken, matchid, handleSnackBar } = props
  const [ data, setData ] = React.useState([])
  const [ matchDetail, setMatchDetail ] = React.useState([])
  const [ value, setValue ] = React.useState(0);

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  async function handleFetch(){
    const res = await token? token : API.xhrGet('getcsrf')
    if(matchid){
      await API.xhrPost(
        token? token : res.token,
        'adminloadmatch', {
          action: 'playoff',
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
        'adminloadmatch', {
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
    <div className={classes.root}>
      <Paper elevation={1} style={{ backgroundColor: teal[100], padding: '8px 0' }}>
        <StyledTabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="on"
        >
          { matchDetail && matchDetail.class &&
            matchDetail.class.map( d=>
              <StyledTab key={d.classname} label={d.classname} />
            )
          }
        </StyledTabs>
      </Paper>
      <div className={classes.list}>
        { matchDetail && matchDetail.class &&
          matchDetail.class.map( (c, i) =>
            value === i && data.filter( item =>{
              return item.classno === c.classno
            }).map( d =>
              <PlayoffContainer key={d.userid} data={d} token={token} setCSRFToken={setCSRFToken}
                matchid={matchid} handleSnackBar={handleSnackBar}
                setData={setData} setMatchDetail={setMatchDetail}/>
            )
          )
        }
      </div>
    </div>
  );
}
