import React from 'react';
import socketIOClient from 'socket.io-client'
import { makeStyles, withStyles, createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import * as API from './../../../api'
import { primary, grey, red } from './../../../api/palette'

import {
  Tabs,
  Tab,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  TextField,
  InputAdornment,
  Typography,
  Box,
  Menu,
  MenuItem,
  FormControl,
  InputLabel,
  Select,

} from '@material-ui/core';

import AddIcon from '@material-ui/icons/Add'
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    padding: theme.spacing(1, 2),
    width: '100%',
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
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
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
    data, setData, setMatchDetail, editing, mainClassSelected, isAvailableEditing
  } = props
  const [ editingData, setEditingData ] = React.useState(data.prize)

  function handleChange(value){
    if(value === ''){
      setEditingData(0)
    }else{
      setEditingData(value)
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
    prize.push(parseInt(editingData))
    if(matchid){
      const resToken = token? token : await API._xhrGet('getcsrf')
      await API._xhrPost(
        token? token : resToken.token,
        sess.typeid === 'admin' ? 'rewardsystem' : 'mrewardsystem', {
          action: 'prize',
          matchid: matchid,
          userid: userid,
          prize: prize,
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

  async function handleFetch(){
    if(matchid){
      const resToken = token? token : await API._xhrGet('getcsrf')
      await API._xhrPost(
        token? token : resToken.token,
        sess.typeid === 'admin' ? 'loadmatch' : 'mloadmatch', {
          action: 'reward',
          matchid: matchid,
          mainclass: parseInt(mainClassSelected)
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
    <ListItem>
      <ListItemText className={classes.listText} primary={data.fullname}
        primary={
          ( window.innerWidth < 700 )?
          <div style={{ display: 'flex' }}>
            { data.fullname }<div style={{ width: 20 }}></div>{ data.lastname }
          </div>
          : data.fullname }
        secondary={
          editing && window.innerWidth < 550 &&
          <Typography component="div" style={{ display: 'flex' }}>
            <ThemeProvider theme={theme}>
              <TextField
                fullWidth
                className={classes.prizeText}
                value={editingData || ''}
                type="number"
                helperText={ API._getWord(sess && sess.language)['Please input number only.'] }
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
            <Button style={{ height: 36 }} color="primary" variant="contained" onClick={handleSave}>
              { API._getWord(sess && sess.language).Save }
            </Button>
          </Typography>
        } />
        { window.innerWidth >= 700 &&
          <ListItemText className={classes.listText} primary={data.lastname} />
        }
      { editing?
        ( window.innerWidth >= 550 &&
          <ListItemText className={classes.listPrize}
            primary={
              <div style={{ display: 'flex' }}>
                <ThemeProvider theme={theme}>
                  <TextField
                    fullWidth
                    className={classes.prizeText}
                    value={editingData || ''}
                    type="number"
                    helperText={ API._getWord(sess && sess.language)['Please input number only.'] }
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
                <GreenButton variant="contained" style={{ height: 36 }} onClick={handleSave}>
                  { API._getWord(sess && sess.language).Save }
                </GreenButton>
              </div>
            } />
        )
        :
        <ListItemText className={classes.listPrize} primary={data.prize} />
      }
    </ListItem>
  );
}

export default function MBReward(props){
  const classes = useStyles();
  const { BTN, sess, token, setCSRFToken, matchid, handleSnackBar, isSetup, pageOrganizer, pageData, isAvailableEditing } = props
  const [ data, setData ] = React.useState(null)
  const [ matchDetail, setMatchDetail ] = React.useState(null)
  const [ value, setValue ] = React.useState(0);
  const [ editing, setEditing ] = React.useState(false);
  const [ rewardEdit, setRewardEdit ] = React.useState([]);
  const [ mainClassSelected, setMainClassSelected ] = React.useState('1')

  function getRewardStatus(status){
    switch (true) {
      case status === 'reward not create':
        return API._getWord(sess && sess.language)['Please create reward.']
        break;
      default:
        return API._getWord(sess && sess.language).No_reward
    }
  }

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
      const resToken = token? token : await API._xhrGet('getcsrf')
      await API._xhrPost(
        token? token : resToken.token,
        sess.typeid === 'admin' ? 'rewardsystem' : 'mrewardsystem', {
          action: 'create',
          matchid: matchid,
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

  async function handleEdit(){
    let classno = []
    let customsequence = []
    if(matchDetail.mainclass.values.length > 0){
      classno.push(matchDetail.mainclass[parseInt(mainClassSelected) - 1].values[value].classno)
    }
    customsequence.push(parseInt(rewardEdit))
    if(matchid){
      const resToken = token? token : await API._xhrGet('getcsrf')
      await API._xhrPost(
        token? token : resToken.token,
        sess.typeid === 'admin' ? 'rewardsystem' : 'mrewardsystem', {
          action: 'edit',
          matchid: matchid,
          classno: classno,
          customsequence: customsequence,
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

  async function handleReset(){
    let classno = []
    if(matchDetail && matchDetail.mainclass && matchDetail.mainclass[parseInt(mainClassSelected) - 1].values.length > 0){
      classno.push(matchDetail.mainclass[parseInt(mainClassSelected) - 1].values[value].classno)
    }
    if(matchid){
      const resToken = token? token : await API._xhrGet('getcsrf')
      await API._xhrPost(
        token? token : resToken.token,
        sess.typeid === 'admin' ? 'rewardsystem' : 'mrewardsystem', {
          action: 'clear',
          matchid: matchid,
          classno: classno,
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

  async function handleFetch(){
    if(matchid){
      const resToken = token? token : await API._xhrGet('getcsrf')
      await API._xhrPost(
        token? token : resToken.token,
        sess.typeid === 'admin' ? 'loadmatch' : 'mloadmatch', {
          action: 'reward',
          matchid: matchid,
          mainclass: parseInt(mainClassSelected)
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

  React.useEffect(()=>{
    handleFetch()
  },[ mainClassSelected ])

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
    <React.Fragment>
      { !isSetup ?
        ( isAvailableEditing &&
          <div style={{ display: 'flex', marginTop: 24 }}>
            <Typography variant="h6" style={{ color: red[600], fontWeight: 600 }}>
              { API._getWord(sess && sess.language)['Please complete the Setup step.'] }
            </Typography>
            <BTN.NoStyleLink
              to={
                sess.typeid === 'admin' ?
                `/system_admin/match/${matchid}` :
                `/${ pageOrganizer ? `organizer/${pageData.pageid}` : 'user' }/management/match/${matchid}`
                }>
              <BTN.RedOutlined style={{ fontWeight: 600, marginLeft: 16 }}>
                { API._getWord(sess && sess.language).Back }
              </BTN.RedOutlined>
            </BTN.NoStyleLink>
          </div>
        )
        :
        <div className={classes.root}>
          { isAvailableEditing &&
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              { matchDetail && matchDetail.scorematch !== 0 && matchDetail.mainclass.length > 1 &&
                <FormControl className={classes.formControl}>
                  <InputLabel>{ API._getWord(sess && sess.language).Main_group }</InputLabel>
                  <Select
                    value={mainClassSelected}
                    onChange={e => setMainClassSelected(e.target.value)}>
                    { matchDetail &&
                      matchDetail.mainclass.map( (d, i) =>
                        <MenuItem key={d.mainclass} value={d.mainclass.toString()}>
                          {d.mainclassname} ({d.type})
                        </MenuItem>
                    )}
                  </Select>
                </FormControl>
              }
            </div>
          }
          <Paper elevation={1} style={{ backgroundColor: primary[100], padding: '8px 0' }}>
            <StyledTabs
              value={value}
              onChange={handleChange}
              variant="scrollable"
              scrollButtons="on"
            >
              { matchDetail && matchDetail.mainclass && matchDetail.mainclass.length > 0 &&
                matchDetail.mainclass[parseInt(mainClassSelected) - 1].values.map( d=>
                  d &&
                  <StyledTab key={d.classname} label={
                    (
                      matchDetail.scorematch === 0 ||
                      (
                        matchDetail.mainclass &&  matchDetail.mainclass.length > 0 &&
                        matchDetail.mainclass[parseInt(mainClassSelected) - 1].type === 'flight'
                      )
                    )? API._handleAmateurClass(d.classno) : d.classname
                    } />
                )
              }
            </StyledTabs>
          </Paper>
          <div className={classes.list}>
            { isAvailableEditing &&
              <React.Fragment>
                <div style={{ display: 'flex', height: 56, marginBottom: 16, marginTop: 16 }}>
                  { data && data.status &&
                    <RedButton className={classes.buttonMargin}
                      style={{ marginRight: 8, paddingLeft: 12, paddingRight: 12 }}
                      onClick={handleCreate}>
                      { API._getWord(sess && sess.language).Create }
                    </RedButton>
                  }
                  { editing &&
                    <React.Fragment>
                      <ThemeProvider theme={theme}>
                        <TextField
                          onChange={e =>handleRewardChange(e.target.value)}
                          onFocus={e => e.target.select()}
                          onKeyPress={e =>handleRewardKeyPress(e)}
                          label={ API._getWord(sess && sess.language).Number }
                          helperText={ API._getWord(sess && sess.language)['The number of the player who will get a reward.'] }
                          type="number"
                        />
                      </ThemeProvider>
                    <GreenButton variant="contained" className={classes.buttonMargin} style={{ marginLeft: 8 }} color='primary' onClick={handleEdit}>
                      { API._getWord(sess && sess.language).Save }
                    </GreenButton>
                    </React.Fragment>
                  }
                  { data && !/not create/.test(data.status) &&
                    <GreenTextButton className={classes.buttonMargin} style={{ marginRight: 8 }} color='primary' onClick={handleReset}>
                      { API._getWord(sess && sess.language).Reset }
                    </GreenTextButton>
                  }
                  <div style={{ flex: 1 }} />
                  { window.innerWidth >= 500 && editing &&
                    <GreenTextButton
                      className={classes.buttonMargin} variant="outlined" style={{ marginLeft: 8 }} color='primary'
                      onClick={()=>setEditing(false)}>
                      { API._getWord(sess && sess.language).Done }
                    </GreenTextButton>
                  }
                  { !editing &&
                    <GreenButton
                      className={classes.buttonMargin} color='primary' onClick={()=>setEditing(!editing)}>
                      { API._getWord(sess && sess.language).Edit }
                    </GreenButton>
                  }
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  { window.innerWidth < 500 && editing &&
                    <GreenTextButton
                      className={classes.buttonMargin} variant="outlined" style={{ marginLeft: 8 }} color='primary'
                      onClick={()=>setEditing(false)}>
                      { API._getWord(sess && sess.language).Done }
                    </GreenTextButton>
                  }
                </div>
              </React.Fragment>
            }
            <List>
              <ListItem
                style={{ display: 'flex', backgroundColor: 'black', borderRadius: 4 }}
                >
                <ListItemText style={{ color: 'white' }} className={classes.listText}
                  primary={
                    window.innerWidth < 700?
                    ( API._getWord(sess && sess.language).Full_name )
                    :
                    ( API._getWord(sess && sess.language).First_name )
                  } />
                { window.innerWidth >= 700 &&
                  <ListItemText style={{ color: 'white' }} className={classes.listText}
                    primary={ ( API._getWord(sess && sess.language).Last_name )  } />
                }
                { !( editing && window.innerWidth < 550 ) &&
                  <ListItemText style={{ color: 'white' }} className={classes.listPrize}
                    primary={ API._getWord(sess && sess.language).Prize } />
                }
              </ListItem>
            </List>
            <List style={{ overflow: 'auto', maxHeight: window.innerHeight * .5, }}>
              { data && !data.status && matchDetail && matchDetail.mainclass && matchDetail.mainclass.length > 0 &&
                (
                  matchDetail.mainclass[parseInt(mainClassSelected) - 1].values.map( (c, i) =>
                    value === i &&
                    data.filter( item =>{
                      return item.classno === c.classno
                    })
                  )[value].length !== 0 ?
                  matchDetail.mainclass[parseInt(mainClassSelected) - 1].values.map( (c, i) =>
                    value === i &&
                    data.filter( item =>{
                      return item.classno === c.classno
                    }).map( (d, i) =>{
                      return d && (
                        <RewardContainer key={d.userid}
                          {...props}
                          data={d}
                          setData={setData}
                          setMatchDetail={setMatchDetail}
                          editing={editing}
                          mainClassSelected={mainClassSelected} />
                      );
                    })
                  )
                  :
                  <ListItem>
                    <Typography component="div" style={{ width: '100%' }}>
                      <Box style={{ textAlign: 'center', color: primary[900] }} fontWeight={500} fontSize={24} m={1}>
                        { API._getWord(sess && sess.language)['No players get the reward.'] }
                      </Box>
                    </Typography>
                  </ListItem>
                )
              }
              { data && data.status &&
                <ListItem>
                  <Typography component="div" style={{ width: '100%' }}>
                    <Box style={{ textAlign: 'center', color: primary[900] }} fontWeight={500} fontSize={24} m={1}>
                      {getRewardStatus(data.status)}
                    </Box>
                    { isAvailableEditing && data.status === 'reward not create' &&
                      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 16, marginBottom: 16, }}>
                        <BTN.PrimaryOutlined onClick={handleCreate}>
                          <AddIcon style={{ marginRight: 8 }} />
                          { API._getWord(sess && sess.language).Create_reward }
                        </BTN.PrimaryOutlined>
                      </div>
                    }
                  </Typography>
                </ListItem>
              }
            </List>
          </div>
        </div>
      }
    </React.Fragment>
  );
}
