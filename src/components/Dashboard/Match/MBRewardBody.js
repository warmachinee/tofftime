import React from 'react';
import socketIOClient from 'socket.io-client'
import { makeStyles, withStyles, createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import * as API from '../../../api'

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Typography from '@material-ui/core/Typography';

import AttachMoneyIcon from '@material-ui/icons/AttachMoney';

import teal from '@material-ui/core/colors/teal';
import grey from '@material-ui/core/colors/grey';

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
    overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis',
    width: '50%',
    textAlign: 'left'
  },
  listPrize:{
    width: '50%',
    textAlign: 'left',
    display: 'flex',
    justifyContent: 'flex-start',
  },
  prizeText: {
    marginRight: 8
  },
  buttonMargin: {
    marginTop: 'auto'
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

function RewardContainer(props){
  const classes = useStyles();
  const { token, setCSRFToken,
    matchid, handleSnackBar,
    data, setData, setMatchDetail, editting
  } = props
  const [ edittingData, setEdittingData ] = React.useState(data.prize)

  function handleChange(value){
    if(value === ''){
      setEdittingData(0)
    }else{
      setEdittingData(value)
    }
  }

  function handleKeyPress(e){
    if(e.key === 'Enter'){
      handleSave()
    }
  }

  async function handleSave(){
    let userid = []
    let prize = []
    userid.push(data.userid)
    prize.push(parseInt(edittingData))
    const res = await token? token : API.xhrGet('getcsrf')
    if(matchid){
      await API.xhrPost(
        token? token : res.token,
        'rewardsystem', {
          action: 'prize',
          matchid: matchid,
          userid: userid,
          prize: prize
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

  async function handleFetch(){
    const res = await token? token : API.xhrGet('getcsrf')
    if(matchid){
      await API.xhrPost(
        token? token : res.token,
        'loadmatch', {
          action: 'reward',
          matchid: matchid
      }, (csrf, d) =>{
        setCSRFToken(csrf)
        if(
          d.status !== 'no reward' ||
          d.status !== 'reward not create' ||
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

  return(
    <ListItem>
      <ListItemText className={classes.listText} primary={data.fullname}
        primary={
          ( window.innerWidth < 700 )?
          <div style={{ display: 'flex' }}>
            { data.fullname }<div style={{ width: 20 }}></div>{ data.lastname }
          </div>
          : data.fullname }
        secondary={
          editting && window.innerWidth < 550 &&
          <Typography component="div" style={{ display: 'flex' }}>
            <ThemeProvider theme={theme}>
              <TextField
                fullWidth
                className={classes.prizeText}
                value={edittingData || ''}
                type="number"
                helperText="Please input number only."
                onChange={e =>handleChange(e.target.value)}
                onFocus={e => e.target.select()}
                onKeyPress={e =>handleKeyPress(e)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AttachMoneyIcon color="primary"/>
                    </InputAdornment>
                  )
                }}
                />
            </ThemeProvider>
            <Button style={{ height: 36 }} color="primary" variant="contained" onClick={handleSave}>Save</Button>
          </Typography>
        }/>
        { window.innerWidth >= 700 &&
          <ListItemText className={classes.listText} primary={data.lastname} />
        }
      { editting?
        ( window.innerWidth >= 550 &&
          <ListItemText className={classes.listPrize}
            primary={
              <div style={{ display: 'flex' }}>
                <ThemeProvider theme={theme}>
                  <TextField
                    fullWidth
                    className={classes.prizeText}
                    value={edittingData || ''}
                    type="number"
                    helperText="Please input number only."
                    onChange={e =>handleChange(e.target.value)}
                    onFocus={e => e.target.select()}
                    onKeyPress={e =>handleKeyPress(e)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AttachMoneyIcon color="primary"/>
                        </InputAdornment>
                      )
                    }}
                    />
                </ThemeProvider>
                <Button style={{ height: 36 }} color="primary" variant="contained" onClick={handleSave}>Save</Button>
              </div>
            } />
        )
        :
        <ListItemText className={classes.listPrize} primary={data.prize} />
      }
    </ListItem>
  );
}

export default function MBRewardBody(props){
  const classes = useStyles();
  const { token, setCSRFToken, matchid, handleSnackBar } = props
  const [ data, setData ] = React.useState(null)
  const [ matchDetail, setMatchDetail ] = React.useState([])
  const [ value, setValue ] = React.useState(0);
  const [ editting, setEditting ] = React.useState(false);
  const [ rewardEdit, setRewardEdit ] = React.useState([]);

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  function handleRewardChange(d) {
    if(d === ''){
      setRewardEdit(0)
    }else{
      setRewardEdit(d)
    }
  }

  function handleRewardKeyPress(e){
    if(e.key === 'Enter'){
      handleEdit()
    }
  }

  async function handleCreate(){
    const res = await token? token : API.xhrGet('getcsrf')
    if(matchid){
      await API.xhrPost(
        token? token : res.token,
        'rewardsystem', {
          action: 'create',
          matchid: matchid
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

  async function handleEdit(){
    let classno = []
    let customsequence = []

    classno.push(matchDetail.class[value].classno)
    customsequence.push(parseInt(rewardEdit))
    const res = await token? token : API.xhrGet('getcsrf')
    if(matchid){
      await API.xhrPost(
        token? token : res.token,
        'rewardsystem', {
          action: 'edit',
          matchid: matchid,
          classno: classno,
          customsequence: customsequence
      }, (csrf, d) =>{
        setCSRFToken(csrf)
        handleSnackBar({
          state: true,
          message: d.status,
          variant: d.status === 'success' ? 'success' : 'error',
          autoHideDuration: d.status === 'success'? 2000 : 5000
        })
        setRewardEdit(0)
        try {
          handleFetch()
        }catch(err) { console.log(err.message) }
      })
    }
  }

  async function handleReset(){
    let classno = []

    classno.push(matchDetail.class[value].classno)
    const res = await token? token : API.xhrGet('getcsrf')
    if(matchid){
      await API.xhrPost(
        token? token : res.token,
        'rewardsystem', {
          action: 'clear',
          matchid: matchid,
          classno: classno
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

  async function handleFetch(){
    const res = await token? token : API.xhrGet('getcsrf')
    if(matchid){
      await API.xhrPost(
        token? token : res.token,
        'loadmatch', {
          action: 'reward',
          matchid: matchid
      }, (csrf, d) =>{
        setCSRFToken(csrf)
        if(
          d.status !== 'no reward' ||
          d.status !== 'reward not create' ||
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
      <Paper elevation={1} style={{ backgroundColor: teal[100], padding: '8px 0' }}>
        <StyledTabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="on"
        >
          { matchDetail && matchDetail.class &&
            matchDetail.class.map( d=>
              d &&
              <StyledTab key={d.classname} label={d.classname} />
            )
          }
        </StyledTabs>
      </Paper>
      <div className={classes.list}>
        <div style={{ display: 'flex', height: 56 }}>
          { data && data.status &&
            <Button className={classes.buttonMargin} style={{ marginRight: 8 }} color='primary' onClick={handleCreate}>Create</Button>
          }
          { editting &&
            <React.Fragment>
              <ThemeProvider theme={theme}>
                <TextField
                  onChange={e =>handleRewardChange(e.target.value)}
                  onFocus={e => e.target.select()}
                  onKeyPress={e =>handleRewardKeyPress(e)}
                  label="Edit sequence"
                  type="number"
                />
              </ThemeProvider>
            <GreenButton className={classes.buttonMargin} style={{ marginLeft: 8 }} color='primary' onClick={handleEdit}>Save</GreenButton>
            </React.Fragment>
          }
          <GreenTextButton className={classes.buttonMargin} style={{ marginRight: 8 }} color='primary' onClick={handleReset}>Reset</GreenTextButton>
          <div style={{ flex: 1 }} />
          { window.innerWidth >= 500 && editting &&
            <GreenTextButton
              className={classes.buttonMargin} variant="outlined" style={{ marginLeft: 8 }} color='primary'
              onClick={()=>setEditting(false)}>Done</GreenTextButton>
          }
          { !editting &&
            <GreenButton
              className={classes.buttonMargin} style={{ paddingLeft: 36, paddingRight: 36 }} color='primary' onClick={()=>setEditting(!editting)}>Edit</GreenButton>
          }
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          { window.innerWidth < 500 && editting &&
            <GreenTextButton
              className={classes.buttonMargin} variant="outlined" style={{ marginLeft: 8 }} color='primary'
              onClick={()=>setEditting(false)}>Done</GreenTextButton>
          }
        </div>
        <List>
          <ListItem
            style={{ display: 'flex', backgroundColor: 'black', borderRadius: 4, cursor: 'auto' }}
            >
            <ListItemText style={{ color: 'white' }} className={classes.listText}
              primary={ window.innerWidth < 700? 'Player' : 'Full name' } />
            { window.innerWidth >= 700 &&
              <ListItemText style={{ color: 'white' }} className={classes.listText} primary='Last name' />
            }
            { !( editting && window.innerWidth < 550 ) &&
              <ListItemText style={{ color: 'white' }} className={classes.listPrize} primary='Prize' />
            }
          </ListItem>
        </List>
        <List style={{ overflow: 'auto', maxHeight: window.innerHeight * .5 }}>
          { matchDetail && matchDetail.class &&
            matchDetail.class.map( (c, i) =>
              value === i && c &&
              data && !data.status &&
              data.filter( item =>{
                return item.classno === c.classno
              }).map( (d, i) =>{
                return d && (
                  <RewardContainer key={d.userid}
                    token={token}
                    setCSRFToken={setCSRFToken}
                    matchid={matchid}
                    handleSnackBar={handleSnackBar}
                    data={d}
                    setData={setData}
                    setMatchDetail={setMatchDetail}
                    editting={editting}/>
                );
              })
            )
          }
          { data && data.status &&
            <ListItem>
              <ListItemText className={classes.listText} primary={data.status} />
            </ListItem>
          }
        </List>
      </div>
    </div>
  );
}
