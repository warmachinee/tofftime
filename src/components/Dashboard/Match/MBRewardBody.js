import React from 'react';
import Loadable from 'react-loadable';
import socketIOClient from 'socket.io-client'
import { makeStyles, withStyles } from '@material-ui/core/styles';
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

import teal from '@material-ui/core/colors/teal';
import grey from '@material-ui/core/colors/grey';

import { LDCircular } from '../../loading/LDCircular'

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
  listPrize:{
    width: '50%',
    textAlign: 'left'
  },
  prizeText: {
    height: 24,
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
      <ListItemText className={classes.listText} primary={data.fullname} />
      <ListItemText className={classes.listText} primary={data.lastname} />
      { editting?
        <div style={{ display: 'flex', width: '50%' }}>
          <TextField
            fullWidth
            onChange={e =>handleChange(e.target.value)}
            onFocus={e => e.target.select()}
            onKeyPress={e =>handleKeyPress(e)}
            value={edittingData || ''}
            className={classes.prizeText}
            type="number"
          />
          <Button color="primary" variant="contained" onClick={handleSave}>Save</Button>
        </div>
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
    //handleFetch()
    var json = '[{"userid":383134,"fullname":"สีไพร","lastname":"อภิสนธิ์","classno":1,"prize":0,"par":1},{"userid":175937,"fullname":"ประทีป","lastname":"ค้ายาดี","classno":1,"prize":0,"par":1},{"userid":422094,"fullname":"อธิวัฒน์","lastname":"แย้มเรืองรัตน์","classno":1,"prize":0,"par":1},{"userid":380855,"fullname":"ประสิทธิ","lastname":"คำภูแสน","classno":1,"prize":0,"par":3},{"userid":859661,"fullname":"พงศ์ภูมินทร์","lastname":"กล้าหาญ","classno":1,"prize":0,"par":3},{"userid":375128,"fullname":"วิชยะ","lastname":"ศรีนาคาร์","classno":1,"prize":0,"par":3},{"userid":825953,"fullname":"สัมพันธ์","lastname":"เรศมณเฑียร","classno":1,"prize":0,"par":4},{"userid":560646,"fullname":"พูลลาภ","lastname":"เยือกเย็น","classno":1,"prize":0,"par":4},{"userid":223893,"fullname":"พิทักษ์สรรค์ ","lastname":"นพสิทธิพร","classno":1,"prize":0,"par":5},{"userid":726183,"fullname":"ทินพันธ์","lastname":"พิลึก","classno":1,"prize":0,"par":7},{"userid":686853,"fullname":"ภัศดา","lastname":"บุรณศิริ","classno":2,"prize":0,"par":-5},{"userid":298863,"fullname":"พรชัย","lastname":"เนียมหมื่นไวย์","classno":2,"prize":0,"par":-5},{"userid":290370,"fullname":"ดุสิต","lastname":"สมศักดิ์","classno":2,"prize":0,"par":0},{"userid":243286,"fullname":"พัสกร  ","lastname":"ยุพาวัฒนะ","classno":2,"prize":0,"par":1},{"userid":127642,"fullname":"ธงชัย","lastname":"แตงอ่อน","classno":2,"prize":0,"par":2},{"userid":584981,"fullname":"มนัส ","lastname":"สุขเย็น","classno":2,"prize":0,"par":3},{"userid":121302,"fullname":"อานนท์ ","lastname":"โพธิ์ทอง","classno":2,"prize":0,"par":3},{"userid":158541,"fullname":"Mike","lastname":"Missler","classno":2,"prize":0,"par":3},{"userid":349921,"fullname":"สนอง ","lastname":"ช้างเนียม","classno":3,"prize":0,"par":5},{"userid":344566,"fullname":"ประทีป ","lastname":"แก้ววงษา ","classno":3,"prize":0,"par":5},{"userid":570929,"fullname":"สมนัส","lastname":"จันทนะ","classno":3,"prize":0,"par":5},{"userid":362257,"fullname":"ทวีโชค ","lastname":"พุทธชน","classno":3,"prize":0,"par":14}]';
    var obj = JSON.parse(json);
    var json1 = '{"title":"SNT 4-2019","date":"04/07/2019","picture":"/matchs/16725831/16725831","location":"Watermill GOLF&GARDENS","locationid":631932,"createdate":"04/07/2019","scorematch":1,"matchtype":0,"display":1,"status":1,"class":[{"classno":1,"classname":"S"},{"classno":2,"classname":"SS"},{"classno":3,"classname":"GS"}],"team":[],"playoff":[383134,686853,0]}';
    var obj1 = JSON.parse(json1);

    setData(obj)
    setMatchDetail(obj1)
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
              d &&
              <StyledTab key={d.classname} label={d.classname} />
            )
          }
        </StyledTabs>
      </Paper>
      <div className={classes.list}>
        <div style={{ display: 'flex' }}>
          { data && data.status &&
            <Button style={{ marginRight: 8 }} color='primary' onClick={handleCreate}>Create</Button>
          }
          <Button style={{ marginRight: 8 }} color='primary' onClick={handleReset}>Reset</Button>
          { editting &&
            <React.Fragment>
              <TextField
                onChange={e =>handleRewardChange(e.target.value)}
                onFocus={e => e.target.select()}
                onKeyPress={e =>handleRewardKeyPress(e)}
                placeholder="Edit sequence"
                type="number"
              />
              <Button style={{ marginLeft: 8 }} color='primary' onClick={handleEdit}>Save</Button>
            </React.Fragment>
          }
          <div style={{ flex: 1 }}></div>
          { editting?
            <Button style={{ marginLeft: 8 }} color='primary' onClick={()=>setEditting(false)}>Cancel</Button>
            :
            <Button color='primary' onClick={()=>setEditting(!editting)}>Edit</Button>
          }
        </div>
        <List>
          <ListItem
            style={{ display: 'flex', backgroundColor: 'black', borderRadius: 4, cursor: 'auto' }}
            >
            <ListItemText style={{ color: 'white' }} className={classes.listText} primary='Full name' />
            <ListItemText style={{ color: 'white' }} className={classes.listText} primary='Last name' />
            <ListItemText style={{ color: 'white' }} className={classes.listPrize} primary='Prize' />
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
