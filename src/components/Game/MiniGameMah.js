import React from 'react';
import { Link } from "react-router-dom";
import { makeStyles, withStyles, createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import socketIOClient from 'socket.io-client'
import Loadable from 'react-loadable';
import { matchPath } from 'react-router'
import { primary, grey } from './../../api/palette'

import {
  Paper,
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  TextField,
  Button,
  Typography,
  Menu,
  MenuItem,
  Collapse,
  IconButton,

} from '@material-ui/core';

import {
  ArrowBack,
  ArrowDropDown,
  ExpandMore,
  CheckCircle,

} from '@material-ui/icons';

import { LDCircular } from './../loading/LDCircular'

const ScoreBoardCharity = Loadable({
  loader: () => import(/* webpackChunkName: "GoBack" */'./../Detail/ScoreBoardCharity'),
  loading: () => <LDCircular />
});


const GoBack = Loadable({
  loader: () => import(/* webpackChunkName: "GoBack" */'./../GoBack'),
  loading: () => <LDCircular />
});

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: window.innerHeight * .8,
    maxWidth: 1600,
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: theme.spacing(3, 2),
  },
  saveButton: {
    marginTop: 'auto',
    marginLeft: 12
  },
  basepriceChildGrid: {
    display: 'flex', width: 250
  },
  basepriceLabel: {
    width: 100,
    textAlign: 'center',
    padding: '6px 8px',
    border: '1px solid',
    borderRadius: 4
  },
  underoverGrid: {
    padding: theme.spacing(1.5, 0),
    display: 'flex',
    flexWrap: 'wrap',
    boxSizing: 'border-box',
  },
  underoverChildGrid: {
    display: 'flex', width: 200
  },
  underoverLabel: {
    width: 75,
    textAlign: 'center',
    padding: '6px 8px',
    border: '1px solid',
    borderRadius: 4
  },
  userlistGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
    boxSizing: 'border-box',
  },
  userlistChildGrid: {
    border: '1px solid',
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',

  },
  listPlayerName: {
    width: '100%'
  },
  listScore: {
    width: 75,
    textAlign: 'right'
  },
  listPredictScore: {
    width: 100,
    textAlign: 'right'
  },
  listPrice: {
    width: 120,
    textAlign: 'right'
  },
  listTotal: {
    textAlign: 'right'
  },
  listText: {
    fontSize: 14
  },
  checkboxGrid: {
    marginBottom: 16,
    display: 'flex',
    justifyContent: 'flex-end',
    [theme.breakpoints.down(900)]: {
      flexDirection: 'column'
    },
  },
  checkboxLabel: {
    marginTop: 'auto',
    marginBottom: 'auto'
  },
  checkboxList: {
    display: 'flex',
    border: '1px solid',
    [theme.breakpoints.down(900)]: {
      width: '100%',
      flexWrap: 'wrap'
    },
  },
  checkboxListItem: {
    paddingTop: 0,
    paddingBottom: 0,
    [theme.breakpoints.down(900)]: {
      width: 150
    },
  },
  expandIcon: {
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },

}))

const StyledCheckbox = withStyles({
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

function ListPredictScore(props){
  const classes = useStyles();
  const { API, BTN, COLOR, token, setCSRFToken, handleSnackBar, data, matchid, gameType, handleMiniGame } = props
  const [ predictScore, setPredictScore ] = React.useState(data.predictscore)

  function handleKeyPressSetPredictScore(e){
    if(e.key === 'Enter'){
      handleFetchSetPredict()
    }
  }

  async function handleFetchSetPredict(){
    var userid;
    if(Object.keys(data).find( d => d === 'mainplayer')){
      userid = data.mainplayer
    }else{
      userid = data.userid
    }
    const resToken = token? token : await API.xhrGet('getcsrf')
    await API.xhrPost(
      token? token : resToken.token,
      'mmatchsection', {
        action: 'setpredictscore',
        matchid: matchid,
        userid: userid,
        value: parseInt(predictScore)
    }, (csrf, d) =>{
      setCSRFToken(csrf)
      handleSnackBar({
        state: true,
        message: d.status,
        variant: /success/.test(d.status) ?'success':'error',
        autoHideDuration: /success/.test(d.status)? 2000 : 5000
      })
      if(/success/.test(d.status)){
        handleMiniGame(matchid, gameType)
      }
    })
  }

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.basepriceChildGrid}>
        <TextField label="Predict Score"
          value={predictScore || 0}
          type="number"
          onChange={e =>setPredictScore(e.target.value)}
          onKeyPress={e =>handleKeyPressSetPredictScore(e)}
          onFocus={e => e.target.select()} />
        <BTN.Primary className={classes.saveButton}
          onClick={handleFetchSetPredict}>Save</BTN.Primary>
      </div>
    </ThemeProvider>
  );
}

export default function MiniGameMah(props){
  const classes = useStyles();
  const { API, BTN, COLOR, token, setCSRFToken, handleSnackBar, } = props
  const hole = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17 ]
  const [ matchid, setMatchid ] = React.useState(null)
  const [ componentType, setComponentType ] = React.useState('Mini Game Mah')
  const [ gameType, setGameType ] = React.useState(null)
  const [ basePrice, setBasePrice ] = React.useState(null)
  const [ under, setUnder ] = React.useState('')
  const [ over, setOver ] = React.useState('')
  const [ editting, setEditting ] = React.useState(false)
  const [ data, setData ] = React.useState(null)
  const [ userList, setUserList ] = React.useState(null)
  const [ mainPlayer, setMainPlayer ] = React.useState(null)
  const [ betHole, setBetHole ] = React.useState(null)
  const [ anchorEl, setAnchorEl ] = React.useState(null);
  const [ expanded, setExpanded ] = React.useState(false)

  function expandHandler(){
    setExpanded(!expanded)
  }

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function handleMenuItemClick(type){
    handleClose()
    setComponentType(type)
  }

  function handleMiniGame(matchid, type){
    const gameType = type === 'jao' ? type : 'normal'
    const socket = socketIOClient( API.getWebURL() )
    socket.emit('minigame-client-message', {
      action: gameType,
      matchid: matchid,
    })
  }

  function responseMiniGame(matchid, type){
    const gameType = type === 'jao' ? type : 'normal'
    const socket = socketIOClient( API.getWebURL() )
    socket.on(`${matchid}-${gameType}-minigame-server-message`, (messageNew) => {
      if(messageNew){
        console.log(messageNew);
        const d = messageNew.result
        setData(d)
        if(d.underover){
          setUnder(d.underover[0])
          setOver(d.underover[1])
        }
        if(d.userlist){
          setUserList(d.userlist)
        }
        if(d.hole){
          setBetHole(d.hole)
        }
        if(gameType === 'jao'){
          if(d.mainplayer){
            setMainPlayer(d.mainplayer[0])
          }
        }
      }
    })
  }

  function handleKeyPressBaseprice(e){
    if(e.key === 'Enter'){
      handleSetBaseprice()
    }
  }

  function handleKeyPressUnderOver(e, action){
    if(e.key === 'Enter'){
      handleSetUnderOver(action)
    }
  }

  function mainPlayerComponent(){
    return (
      <ListItem
        className={classes.listPlayer}
        style={{ border: `2px solid ${COLOR.grey[900]}`, position: 'sticky', top: 48 }}>
        <ListItemText className={classes.listPlayerName}
          primary={
            <React.Fragment>
              {`${mainPlayer.fullname}  ${mainPlayer.lastname}`}
              { editting &&
                <div style={{ marginTop: 16 }}>
                  <BTN.PrimaryOutlined onClick={()=>handleFetchSetJao(mainPlayer.mainplayer)}>Set Jao</BTN.PrimaryOutlined>
                </div>
              }
              { editting && window.innerWidth < 600 &&
                <React.Fragment>
                  <div style={{ marginTop: 16 }}>
                    <ListPredictScore {...props} data={mainPlayer} matchid={matchid} gameType={gameType} handleMiniGame={handleMiniGame} />
                  </div>
                </React.Fragment>
              }
            </React.Fragment>
          }
          secondary={
            window.innerWidth < 600 && !editting &&
            <React.Fragment>
              <Typography gutterBottom variant="caption" component="span">{`Gross = ${mainPlayer.gross}`}</Typography>
              <br></br>
              <Typography variant="caption" component="span">{`SF = ${mainPlayer.sf36sys}`}</Typography>
            </React.Fragment>
          } />
        { editting ?
          ( window.innerWidth >= 600 &&
            <ListItemIcon>
              <ListPredictScore {...props} data={mainPlayer} matchid={matchid} gameType={gameType} handleMiniGame={handleMiniGame} />
            </ListItemIcon>
          )
          :
          <React.Fragment>
            { window.innerWidth >= 600 &&
              <React.Fragment>
                <ListItemText className={classes.listScore} primary={mainPlayer.gross} />
                <ListItemText className={classes.listScore} primary={mainPlayer.sf36sys} />
              </React.Fragment>
            }
            <ListItemText className={classes.listPredictScore} primary={mainPlayer.predictscore} />
            <ListItemText className={classes.listPrice} primary="-" />
          </React.Fragment>
        }
      </ListItem>
    );
  }

  async function handleFetchSetJao(userid){
    console.log(userid);
    const resToken = token? token : await API.xhrGet('getcsrf')
    await API.xhrPost(
      token? token : resToken.token,
      'mmatchsection', {
        action: 'setjao',
        matchid: matchid,
        playerid: userid,
    }, (csrf, d) =>{
      setCSRFToken(csrf)
      handleSnackBar({
        state: true,
        message: d.status,
        variant: /success/.test(d.status) ?'success':'error',
        autoHideDuration: /success/.test(d.status)? 2000 : 5000
      })
      if(/success/.test(d.status)){
        handleMiniGame(matchid, gameType)
      }
    })
  }

  async function handleChecked(hole){
    const resToken = token? token : await API.xhrGet('getcsrf')
    await API.xhrPost(
      token? token : resToken.token,
      'mmatchsection', {
        action: 'fixhole',
        matchid: matchid,
        hole: parseInt(hole) + 1,
        type: gameType
    }, (csrf, d) =>{
      setCSRFToken(csrf)
      handleSnackBar({
        state: true,
        message: d.status,
        variant: /complete/.test(d.status) ?'success':'error',
        autoHideDuration: /complete/.test(d.status)? 2000 : 5000
      })
      if(/complete/.test(d.status)){
        handleMiniGame(matchid, gameType)
      }
    })
  }

  async function handleSetBaseprice(){
    const resToken = token? token : await API.xhrGet('getcsrf')
    await API.xhrPost(
      token? token : resToken.token,
      'mmatchsection', {
        action: 'setbaseprize',
        matchid: matchid,
        value: basePrice,
    }, (csrf, d) =>{
      setCSRFToken(csrf)
      handleSnackBar({
        state: true,
        message: d.status,
        variant: /success/.test(d.status) ?'success':'error',
        autoHideDuration: /success/.test(d.status)? 2000 : 5000
      })
      if(/success/.test(d.status)){
        handleMiniGame(matchid, gameType)
      }
    })
  }

  async function handleSetUnderOver(action){
    const resToken = token? token : await API.xhrGet('getcsrf')
    await API.xhrPost(
      token? token : resToken.token,
      'mmatchsection', {
        action: 'underover',
        matchid: matchid,
        value: action === 'under' ? under : over,
        setaction: action,
        type: gameType,
    }, (csrf, d) =>{
      setCSRFToken(csrf)
      handleSnackBar({
        state: true,
        message: d.status,
        variant: /success/.test(d.status) ?'success':'error',
        autoHideDuration: /success/.test(d.status)? 2000 : 5000
      })
      if(/success/.test(d.status)){
        handleMiniGame(matchid, gameType)
      }
    })
  }

  async function handleFetchMiniGame(matchid, type){
    const gameType = type === 'jao' ? type : 'normal'
    const resToken = token? token : await API.xhrGet('getcsrf')
    await API.xhrPost(
      token? token : resToken.token,
      'loadmatchsystem', {
        action: 'minigame',
        matchid: matchid,
        type: gameType
    }, (csrf, d) =>{
      setCSRFToken(csrf)
      setData(d)
      if(d.underover){
        setUnder(d.underover[0])
        setOver(d.underover[1])
      }
      if(d.userlist){
        setUserList(d.userlist)
      }
      if(d.hole){
        setBetHole(d.hole)
      }
      if(gameType === 'jao'){
        if(d.mainplayer){
          setMainPlayer(d.mainplayer[0])
        }
      }
    })
  }

  function handleTempFetch(){
    var json = '{"hole":["1","5","7"],"underover":["30","70"],"userlist":[{"userid":686853,"fullname":"ภัศดา","lastname":"บุรณศิริ","gross":67,"sf36sys":41,"predictscore":0,"diff":67},{"userid":298863,"fullname":"พรชัย","lastname":"เนียมหมื่นไวย์","gross":70,"sf36sys":41,"predictscore":0,"diff":70},{"userid":290370,"fullname":"ดุสิต","lastname":"สมศักดิ์","gross":72,"sf36sys":38,"predictscore":0,"diff":72},{"userid":175937,"fullname":"ประทีป","lastname":"ค้ายาดี","gross":73,"sf36sys":38,"predictscore":0,"diff":73},{"userid":243286,"fullname":"พัสกร  ","lastname":"ยุพาวัฒนะ","gross":73,"sf36sys":40,"predictscore":0,"diff":73},{"userid":422094,"fullname":"อธิวัฒน์","lastname":"แย้มเรืองรัตน์","gross":74,"sf36sys":39,"predictscore":0,"diff":74},{"userid":127642,"fullname":"ธงชัย","lastname":"แตงอ่อน","gross":74,"sf36sys":38,"predictscore":0,"diff":74},{"userid":383134,"fullname":"สีไพร","lastname":"อภิสนธิ์","gross":74,"sf36sys":37,"predictscore":0,"diff":74},{"userid":121302,"fullname":"อานนท์ ","lastname":"โพธิ์ทอง","gross":75,"sf36sys":38,"predictscore":0,"diff":75},{"userid":158541,"fullname":"Mike","lastname":"Missler","gross":75,"sf36sys":36,"predictscore":0,"diff":75},{"userid":375128,"fullname":"วิชยะ","lastname":"ศรีนาคาร์","gross":75,"sf36sys":37,"predictscore":0,"diff":75},{"userid":859661,"fullname":"พงศ์ภูมินทร์","lastname":"กล้าหาญ","gross":75,"sf36sys":40,"predictscore":0,"diff":75},{"userid":584981,"fullname":"มนัส ","lastname":"สุขเย็น","gross":75,"sf36sys":38,"predictscore":0,"diff":75},{"userid":380855,"fullname":"ประสิทธิ","lastname":"คำภูแสน","gross":75,"sf36sys":41,"predictscore":0,"diff":75},{"userid":825953,"fullname":"สัมพันธ์","lastname":"เรศมณเฑียร","gross":76,"sf36sys":37,"predictscore":0,"diff":76},{"userid":395229,"fullname":"ธวัชชัย ","lastname":"ชายชาญ","gross":76,"sf36sys":39,"predictscore":0,"diff":76},{"userid":154714,"fullname":"ธวัช","lastname":"กุลสุวรรณ","gross":76,"sf36sys":38,"predictscore":0,"diff":76},{"userid":560646,"fullname":"พูลลาภ","lastname":"เยือกเย็น","gross":76,"sf36sys":37,"predictscore":0,"diff":76},{"userid":570929,"fullname":"สมนัส","lastname":"จันทนะ","gross":77,"sf36sys":40,"predictscore":0,"diff":77},{"userid":428247,"fullname":"นิรันทร์","lastname":"ฉัตรไกรศรี","gross":77,"sf36sys":37,"predictscore":0,"diff":77},{"userid":223893,"fullname":"พิทักษ์สรรค์ ","lastname":"นพสิทธิพร","gross":77,"sf36sys":38,"predictscore":0,"diff":77},{"userid":722638,"fullname":"พิทักษ์ ","lastname":"ศรีตะวัน","gross":77,"sf36sys":36,"predictscore":0,"diff":77},{"userid":726183,"fullname":"ทินพันธ์","lastname":"พิลึก","gross":79,"sf36sys":39,"predictscore":0,"diff":79},{"userid":697510,"fullname":"วีรนันท์","lastname":"จันทร์เอียง","gross":80,"sf36sys":36,"predictscore":0,"diff":80},{"userid":735952,"fullname":"ธานนิทร์","lastname":"เหลืองภูมิยุทธ ","gross":80,"sf36sys":37,"predictscore":0,"diff":80},{"userid":381888,"fullname":"ประคอง","lastname":"วระพันธุ์","gross":81,"sf36sys":37,"predictscore":0,"diff":81},{"userid":432045,"fullname":"เยี่ยม","lastname":"สุขัง","gross":81,"sf36sys":37,"predictscore":0,"diff":81},{"userid":186918,"fullname":"สุทธิพันธ์","lastname":"กิมสวัสดิ","gross":81,"sf36sys":36,"predictscore":0,"diff":81},{"userid":344566,"fullname":"ประทีป ","lastname":"แก้ววงษา ","gross":81,"sf36sys":36,"predictscore":0,"diff":81},{"userid":958766,"fullname":"ธนู","lastname":"พุทธสุวรรณ","gross":81,"sf36sys":38,"predictscore":0,"diff":81},{"userid":313675,"fullname":"วสันต์","lastname":"มีลาภ","gross":81,"sf36sys":38,"predictscore":0,"diff":81},{"userid":870523,"fullname":"ดิชพงศ์","lastname":"วงศ์คำจันทร์","gross":81,"sf36sys":37,"predictscore":0,"diff":81},{"userid":283135,"fullname":"วรพล ","lastname":"อ่อนนุช","gross":82,"sf36sys":37,"predictscore":0,"diff":82},{"userid":961801,"fullname":"วิรัตน์","lastname":"แป้นดี","gross":82,"sf36sys":37,"predictscore":0,"diff":82},{"userid":525973,"fullname":"วิริยะ ","lastname":"ใจชื่น","gross":83,"sf36sys":38,"predictscore":0,"diff":83},{"userid":171247,"fullname":"วิชัย ","lastname":"ศรีระผา","gross":83,"sf36sys":35,"predictscore":0,"diff":83},{"userid":452902,"fullname":"ภิรมย์","lastname":"ไพบูลย์ ","gross":84,"sf36sys":38,"predictscore":0,"diff":84},{"userid":531500,"fullname":"ธนกฤต","lastname":"เครื่องสนุก","gross":85,"sf36sys":36,"predictscore":0,"diff":85},{"userid":349921,"fullname":"สนอง ","lastname":"ช้างเนียม","gross":85,"sf36sys":36,"predictscore":0,"diff":85},{"userid":362257,"fullname":"ทวีโชค ","lastname":"พุทธชน","gross":86,"sf36sys":36,"predictscore":0,"diff":86},{"userid":289142,"fullname":"สุชาติ ","lastname":"ทะวะบุตร","gross":87,"sf36sys":37,"predictscore":0,"diff":87}]}'
    const d = JSON.parse(json)
    console.log(d);
    setData(d)
    if(d.underover){
      setUnder(d.underover[0])
      setOver(d.underover[1])
    }
    if(d.userlist){
      setUserList(d.userlist)
    }
    if(d.hole){
      setBetHole(d.hole)
    }
  }

  React.useEffect(()=>{
    if(props.location){
      const match = matchPath( props.location.pathname, {
        path: "/match/:matchid/minigame/:gametype",
      });
      if(match){
        var matchid = parseInt(match.params.matchid)
        var gameType = match.params.gametype
        setMatchid(matchid)
        setGameType(gameType === 'jao' ? gameType : 'normal')
        if(/Mini Game/.test(componentType)){
          handleFetchMiniGame(matchid, gameType)
          responseMiniGame(matchid, gameType)
          setComponentType(gameType === 'jao' ? 'Mini Game Jao' : 'Mini Game Mah')
        }else{

        }
      }
    }
    if(/localhost:8080/.test(window.location.href)){
      handleTempFetch()
    }
  },[ componentType ])

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

  return (
    <Paper className={classes.root}>
      <GoBack />
      <div style={{ marginLeft: 'auto', marginRight: 'auto', maxWidth: 1200 }}>
        <BTN.PrimaryOutlined onClick={handleClick}>
          {componentType}
          <ArrowDropDown style={{ marginLeft: 8 }} />
        </BTN.PrimaryOutlined>
      </div>
      { componentType === 'Scoreboard' ?
        <ScoreBoardCharity {...props} editting={editting} />
        :
        <div style={{ marginLeft: 'auto', marginRight: 'auto', maxWidth: 1200 }}>
          <ListItem button onClick={expandHandler}
            style={{
              marginTop: 16,
              boxShadow: '0px 1px 3px 0px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 2px 1px -1px rgba(0,0,0,0.12)'
            }}>
            <ListItemText primary="Panel" />
            <IconButton
              disableRipple
              className={classes.expandIcon}
              style={{ transform: expanded?'rotate(180deg)':'rotate(0deg)' }}
              onClick={expandHandler}
              aria-expanded={expanded}
              aria-label="Show more"
            >
              <ExpandMore />
            </IconButton>
          </ListItem>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <Paper style={{ padding: '12px', marginBottom: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <BTN.PrimaryText style={{ margin: 12 }} onClick={()=>setEditting(!editting)}>{ editting? 'Done' : 'Edit' }</BTN.PrimaryText>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                <div style={{ marginTop: 12 }}>
                  <ThemeProvider theme={theme}>
                    { editting ?
                      <div className={classes.basepriceChildGrid}>
                        <TextField label="Base Price"
                          type="number"
                          onChange={e =>setBasePrice(e.target.value)}
                          onKeyPress={e =>handleKeyPressBaseprice(e)}
                          onFocus={e => e.target.select()} />
                        <BTN.Primary className={classes.saveButton}
                          onClick={handleSetBaseprice}>Save</BTN.Primary>
                      </div>
                      :
                      <div className={classes.basepriceChildGrid}>
                        <Typography className={classes.basepriceLabel}>Base Price</Typography>
                        <Typography style={{ padding: '6px 8px', marginLeft: 12 }}>Base Price</Typography>
                      </div>
                    }
                  </ThemeProvider>
                </div>
                <div className={classes.underoverGrid}>
                  <ThemeProvider theme={theme}>
                    { editting ?
                      <div className={classes.underoverChildGrid}>
                        <TextField label="Under"
                          type="number"
                          value={under || ''}
                          onChange={e =>setUnder(e.target.value)}
                          onKeyPress={e =>handleKeyPressUnderOver(e, 'under')}
                          onFocus={e => e.target.select()} />
                        <BTN.Amber className={classes.saveButton}
                          onClick={()=>handleSetUnderOver('under')}>Save</BTN.Amber>
                      </div>
                      :
                      <div className={classes.underoverChildGrid}>
                        <Typography className={classes.underoverLabel}
                          style={{ backgroundColor: COLOR.amber[400], borderColor: COLOR.amber[700], }}>Under</Typography>
                        <Typography style={{ padding: '6px 8px', marginLeft: 12, color: COLOR.amber[800] }}>
                          {under}
                        </Typography>
                      </div>
                    }
                  </ThemeProvider>
                  <div style={{ marginLeft: 16 }}>
                    <ThemeProvider theme={theme}>
                      { editting ?
                        <div className={classes.underoverChildGrid}>
                          <TextField label="Over"
                            type="number"
                            value={over || ''}
                            onChange={e =>setOver(e.target.value)}
                            onKeyPress={e =>handleKeyPressUnderOver(e, 'over')}
                            onFocus={e => e.target.select()} />
                          <BTN.Green className={classes.saveButton}
                            onClick={()=>handleSetUnderOver('over')}>Save</BTN.Green>
                        </div>
                        :
                        <div className={classes.underoverChildGrid}>
                          <Typography className={classes.underoverLabel}
                            style={{ backgroundColor: COLOR.green[400], borderColor: COLOR.green[700] }}>Over</Typography>
                          <Typography style={{ padding: '6px 8px', marginLeft: 12, color: COLOR.green[800] }}>
                            {over}
                          </Typography>
                        </div>
                      }
                    </ThemeProvider>
                  </div>
                </div>
              </div>
              <div className={classes.checkboxGrid}>
                { betHole &&
                  [0, 3].map( g =>
                  <div className={classes.checkboxList} key={g}>
                    { [ g, g + 1, g + 2].map( c =>
                      <List disablePadding key={c}>
                        { hole.slice( (c * 3), (c + 1) * 3).map( d =>
                          <ListItem button key={d} className={classes.checkboxListItem} onClick={()=>handleChecked(d)}>
                            <StyledCheckbox
                              disableRipple
                              checked={ parseInt(betHole.find( bh =>{ return parseInt(bh) === d + 1 })) === d + 1} />
                            <Typography className={classes.checkboxLabel}>
                              {`Hole ${d + 1}`}
                            </Typography>
                          </ListItem>
                        )}
                      </List>
                    )}
                  </div>
                )}
              </div>
            </Paper>
          </Collapse>
          <div className={classes.gameUserList}>
            <List disablePadding style={{ overflow: 'auto', height: window.innerHeight * .9 }}>
              <ListItem style={{ backgroundColor: COLOR.grey[900], position: 'sticky', top: 0 }}>
                <ListItemText style={{ color: 'white' }} className={classes.listPlayerName} primary="Player" />
                { !editting &&
                  <React.Fragment>
                    { window.innerWidth >= 600 &&
                      <React.Fragment>
                        <ListItemText style={{ color: 'white' }} className={classes.listScore} primary="Gross" />
                        <ListItemText style={{ color: 'white' }} className={classes.listScore} primary="SF" />
                      </React.Fragment>
                    }
                    <ListItemText style={{ color: 'white' }} className={classes.listPredictScore} primary="Predict" />
                    <ListItemText style={{ color: 'white' }} className={classes.listPrice} primary="+/-" />
                  </React.Fragment>
                }
              </ListItem>
              { gameType === 'jao' && mainPlayer &&
                mainPlayerComponent()
              }
              { userList &&
                userList.map( d =>
                <React.Fragment key={d.userid}>
                  <ListItem className={classes.listPlayer}>
                    <ListItemText className={classes.listPlayerName}
                      primary={
                        <React.Fragment>
                          {`${d.fullname}  ${d.lastname}`}
                          { editting &&
                            <div style={{ marginTop: 16 }}>
                              <BTN.PrimaryOutlined onClick={()=>handleFetchSetJao(d.userid)}>Set Jao</BTN.PrimaryOutlined>
                            </div>
                          }
                          { editting && window.innerWidth < 600 &&
                            <React.Fragment>
                              <div style={{ marginTop: 16 }}>
                                <ListPredictScore {...props} data={d} matchid={matchid} gameType={gameType} handleMiniGame={handleMiniGame} />
                              </div>
                            </React.Fragment>
                          }
                        </React.Fragment>
                      }
                      secondary={
                        window.innerWidth < 600 && !editting &&
                        <React.Fragment>
                          <Typography gutterBottom variant="caption" component="span">{`Gross = ${d.gross}`}</Typography>
                          <br></br>
                          <Typography variant="caption" component="span">{`SF = ${d.sf36sys}`}</Typography>
                        </React.Fragment>
                      } />
                    { editting ?
                      ( window.innerWidth >= 600 &&
                        <ListItemIcon>
                          <ListPredictScore {...props} data={d} matchid={matchid} gameType={gameType} handleMiniGame={handleMiniGame} />
                        </ListItemIcon>
                      )
                      :
                      <React.Fragment>
                        { window.innerWidth >= 600 &&
                          <React.Fragment>
                            <ListItemText className={classes.listScore} primary={d.gross} />
                            <ListItemText className={classes.listScore} primary={d.sf36sys} />
                          </React.Fragment>
                        }
                        <ListItemText className={classes.listPredictScore} primary={d.predictscore} />
                        <ListItemText className={classes.listPrice} primary={d.diff} />
                      </React.Fragment>
                    }
                  </ListItem>
                  <Divider />
                </React.Fragment>
              )}
            </List>
          </div>
        </div>
      }
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={()=>handleMenuItemClick('Scoreboard')}>Scoreboard</MenuItem>
        { matchid && BTN &&
          <Link style={{ textDecoration: 'none', color: 'inherit' }} to={`/match/${matchid}/minigame/mah`}>
            <MenuItem onClick={()=>handleMenuItemClick('Mini Game Mah')}>Mini Game Mah</MenuItem>
          </Link>
        }
        { matchid && BTN &&
          <Link style={{ textDecoration: 'none', color: 'inherit' }} to={`/match/${matchid}/minigame/jao`}>
            <MenuItem onClick={()=>handleMenuItemClick('Mini Game Jao')}>Mini Game Jao</MenuItem>
          </Link>
        }
      </Menu>
    </Paper>
  );
}
