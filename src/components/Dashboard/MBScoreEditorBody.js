import React from 'react';
import Loadable from 'react-loadable';
import socketIOClient from 'socket.io-client'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import * as API from '../../api'

import Button from '@material-ui/core/Button';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';

import SearchIcon from '@material-ui/icons/Search';

import teal from '@material-ui/core/colors/teal';
import grey from '@material-ui/core/colors/grey';

import { LDCircular } from '../loading/LDCircular'

const TemplateDialog = Loadable({
  loader: () => import(/* webpackChunkName: "TemplateDialog" */'./TemplateDialog'),
  loading: () => <LDCircular />
});

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    padding: theme.spacing(1, 2),
    width: '100%',
    backgroundColor: grey[50],
    cursor: 'auto',
    marginTop: 24
  },
  margin: {
    margin: theme.spacing(1),
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
  listClass: {
    width: '30%',
    textAlign: 'left'
  },
  textfield: {
    margin: 8,
  },
  textfieldGrid: {
    display: 'flex',
    minWidth: 600
  },
  text: {
    color: teal[600],
  },
  textHighlight: {
    color: teal[900],
    fontWeight: 800
  }
}))

const GreenButton = withStyles(theme => ({
  root: {
    color: theme.palette.getContrastText(teal[500]),
    backgroundColor: teal[700],
    '&:hover': {
      backgroundColor: teal[900],
    },
  },
}))(Button);

function MBScoreEditorContainer(props){
  const classes = useStyles();
  const { data, matchDetail, handleSelectPlayer } = props
  const [ searchUser, setSearchUser ] = React.useState('')
  const [ dataSliced, setDataSliced ] = React.useState(10)

  function handleMore(){
    if(data){
      if( dataSliced >= data.length ){
        setDataSliced( 10 )
      }else{
        setDataSliced( dataSliced + 10 )
      }
    }
  }

  function handleMoreAll(){
    if(data){
      if( dataSliced >= data.length ){
        setDataSliced( 10 )
      }else{
        setDataSliced( data.length )
      }
    }
  }

  return(
    <React.Fragment>
      <FormControl className={classes.margin}>
        <InputLabel>Search player</InputLabel>
        <Input
          value={searchUser}
          onChange={e =>setSearchUser(e.target.value)}
          endAdornment={
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          }
        />
      </FormControl>
      <List>
        { data && !data.status &&
          data.filter((item)=>{

              return (
                (item.firstname.search(searchUser) !== -1) ||
                (item.firstname.toLowerCase().search(searchUser.toLowerCase()) !== -1) ||
                (item.lastname.search(searchUser) !== -1) ||
                (item.lastname.toLowerCase().search(searchUser.toLowerCase()) !== -1)
              )
            }).slice(0, dataSliced).map( value =>
            <ListItem key={value.userid} button onClick={()=>handleSelectPlayer(value)}>
              <ListItemText className={classes.listText} primary={value.firstname} />
              <ListItemText className={classes.listText} primary={value.lastname} />
              { matchDetail && matchDetail.class &&
                ( value.classno === 0 ?
                  <ListItemText className={classes.listClass} primary={"-"} />
                  :
                  matchDetail.class.filter( d =>{
                    return d.classno === value.classno
                  }).map( d =>
                    <ListItemText key={d.classname + `(${value.userid})`} className={classes.listClass} primary={d.classname} />
                  )
                )
              }
            </ListItem>
          )
        }
        <ListItem role={undefined} dense style={{ display: 'flex' }}>
          { data && data.length > 10 &&
            <React.Fragment>
              <Button fullWidth onClick={handleMore}>
                { dataSliced >= data.length ? 'Collapse':'More' }
              </Button>
              { data && dataSliced < data.length &&
                <Button fullWidth onClick={handleMoreAll}>More All</Button>
              }
            </React.Fragment>
          }
        </ListItem>
      </List>
    </React.Fragment>
  );
}

export default function MBScoreEditorBody(props){
  const classes = useStyles();
  const { token, setCSRFToken, matchid, handleSnackBar } = props
  const tempArr = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]
  const [ data, setData ] = React.useState([])
  const [ open, setOpen ] = React.useState(false);
  const [ matchDetail, setMatchDetail ] = React.useState([])
  const [ selected, setSelected ] = React.useState(null)
  const [ arrScore, setArrScore ] = React.useState([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0])

  function handleSelectPlayer(d){
    setSelected(d)
    handleClose()
  }

  function handleOpen(){
    setOpen(true);
  };

  function handleClose(){
    setOpen(false);
  };

  function handleChange(value, index){
    const tempArr = [...arrScore]
    if(value === ''){
      tempArr[index] = parseInt(0)
    }else{
      tempArr[index] = parseInt(value)
    }
    setArrScore(tempArr)
  }

  function handleSum(array, type){
    let temp = 0
    let start = (type === 'out')? 0 : 9
    let end = (type === 'out')? 9 : 18
    for(var i = start;i < end;i++){
      temp += array[i]
    }
    return temp
  }

  function handleUpdateScore(){

    const socket = socketIOClient('https://thai-pga.com')
    socket.emit('client-message', {
      action: "scorebysystemadmin",
      matchid: matchid,
      userid: selected.userid,
      userscore: arrScore,
    })
  }

  async function handleFetch(){
    const res = await token? token : API.xhrGet('getcsrf')
    if(matchid){
      await API.xhrPost(
        token? token : res.token,
        'adminloadmatch', {
          action: 'userlist',
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
    if(selected){
      setArrScore(selected.score)
    }else{
      setArrScore([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0])
    }
  },[ selected ])

  return(
    <div className={classes.root}>
      <div style={{ display: 'flex' }}>
        <Button onClick={handleOpen}>
          { selected ? selected.firstname + " " + selected.lastname: 'Select User' }
        </Button>
        <div style={{ flex: 1 }}></div>
        <Button onClick={()=>setArrScore([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0])}>Reset</Button>
        <GreenButton onClick={handleUpdateScore} variant="contained" color="primary">Save</GreenButton>
      </div>
      <div style={{ overflow: 'auto', marginTop: 24, marginBottom: 24 }}>
        <div className={classes.textfieldGrid}>
          {tempArr.slice(0, 9).map( d =>
            <TextField
              key={d}
              className={classes.textfield}
              label={d + 1}
              value={arrScore[d]}
              onChange={e =>handleChange(e.target.value, d)}
              onFocus={e => e.target.select()}
              variant="outlined"
              type="number"
            />
          )}
        </div>
        <div className={classes.textfieldGrid}>
          {tempArr.slice(9, 18).map( d =>
            <TextField
              key={d}
              className={classes.textfield}
              label={d + 1}
              value={arrScore[d]}
              onChange={e =>handleChange(e.target.value, d)}
              onFocus={e => e.target.select()}
              variant="outlined"
              type="number"
            />
          )}
        </div>
      </div>
      <Typography component="div" style={{ display: 'flex' }}>
        <Box className={classes.text} m={1}>
          OUT = {handleSum(arrScore, 'out')}
        </Box>
        <Box className={classes.text} m={1}>
          IN = {handleSum(arrScore, 'in')}
        </Box>
        <div style={{ flex: 1 }}></div>
        <Box className={classes.textHighlight} m={1}>
          Total = {handleSum(arrScore, 'out') + handleSum(arrScore, 'in')}
        </Box>
      </Typography>
      <TemplateDialog open={open} handleClose={handleClose}>
        <MBScoreEditorContainer data={data} matchDetail={matchDetail} handleSelectPlayer={handleSelectPlayer}/>
      </TemplateDialog>
    </div>
  );
}
