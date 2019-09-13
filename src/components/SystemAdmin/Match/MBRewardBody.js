import React from 'react';
import socketIOClient from 'socket.io-client'
import { makeStyles, withStyles, createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import * as API from './../../../api'
import { primary, grey, red } from './../../../api/palette'

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

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    padding: theme.spacing(1, 2),
    width: '100%',
    backgroundColor: grey[50],
    cursor: 'pointer',
    marginTop: 24,
    boxSizing: 'border-box'
  },
  indicator: {
    backgroundColor: primary[600],
    height: 4
  },
  scrollButtons: {
    color: primary[900],
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

function RewardContainer(props){
  const classes = useStyles();
  const { sess, token, setCSRFToken,
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
    if(matchid){
      const resToken = token? token : await API.xhrGet('getcsrf')
      await API.xhrPost(
        token? token : resToken.token,
        sess.typeid === 'admin' ? 'rewardsystem' : 'mrewardsystem', {
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
    if(matchid){
      const resToken = token? token : await API.xhrGet('getcsrf')
      await API.xhrPost(
        token? token : resToken.token,
        sess.typeid === 'admin' ? 'loadmatch' : 'mloadmatch', {
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
                <GreenButton style={{ height: 36 }} onClick={handleSave}>Save</GreenButton>
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
  const { sess, token, setCSRFToken, matchid, handleSnackBar } = props
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
    if(matchid){
      const resToken = token? token : await API.xhrGet('getcsrf')
      await API.xhrPost(
        token? token : resToken.token,
        sess.typeid === 'admin' ? 'rewardsystem' : 'mrewardsystem', {
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
    if(matchid){
      const resToken = token? token : await API.xhrGet('getcsrf')
      await API.xhrPost(
        token? token : resToken.token,
        sess.typeid === 'admin' ? 'rewardsystem' : 'mrewardsystem', {
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
        try {
          handleFetch()
        }catch(err) { console.log(err.message) }
      })
    }
  }

  async function handleReset(){
    let classno = []
    classno.push(matchDetail.class[value].classno)
    if(matchid){
      const resToken = token? token : await API.xhrGet('getcsrf')
      await API.xhrPost(
        token? token : resToken.token,
        sess.typeid === 'admin' ? 'rewardsystem' : 'mrewardsystem', {
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
    if(matchid){
      const resToken = token? token : await API.xhrGet('getcsrf')
      await API.xhrPost(
        token? token : resToken.token,
        sess.typeid === 'admin' ? 'loadmatch' : 'mloadmatch', {
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
      <Paper elevation={1} style={{ backgroundColor: primary[100], padding: '8px 0' }}>
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
        <div style={{ display: 'flex', height: 56, marginBottom: 16 }}>
          { data && data.status &&
            <RedButton className={classes.buttonMargin}
              style={{ marginRight: 8, paddingLeft: 12, paddingRight: 12 }}
              onClick={handleCreate}>Create</RedButton>
          }
          { editting &&
            <React.Fragment>
              <ThemeProvider theme={theme}>
                <TextField
                  onChange={e =>handleRewardChange(e.target.value)}
                  onFocus={e => e.target.select()}
                  onKeyPress={e =>handleRewardKeyPress(e)}
                  label="Number"
                  helperText="The number of the player who will get a reward."
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
              className={classes.buttonMargin} color='primary' onClick={()=>setEditting(!editting)}>Edit</GreenButton>
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
                    {...props}
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