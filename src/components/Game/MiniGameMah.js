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

const ListPredictScore = Loadable({
  loader: () => import(/* webpackChunkName: "ListPredictScore" */'./ListPredictScore'),
  loading: () => <LDCircular />
});

const GoBack = Loadable({
  loader: () => import(/* webpackChunkName: "GoBack" */'./../Utils/GoBack'),
  loading: () => <LDCircular />
});

const ScoreBoardCharity = Loadable({
  loader: () => import(/* webpackChunkName: "ScoreBoardCharity" */'./../Detail/ScoreBoardCharity'),
  loading: () => <LDCircular />
});

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: window.innerHeight * .8,
    maxWidth: 1200,
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

export default function MiniGameMah(props){
  const classes = useStyles();
  const { API, BTN, COLOR, sess, token, setCSRFToken, handleSnackBar, } = props
  const hole = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17 ]
  const [ matchid, setMatchid ] = React.useState(null)
  const [ componentType, setComponentType ] = React.useState('Mini Game Mah')
  const [ gameType, setGameType ] = React.useState(null)
  const [ basePrize, setBasePrize ] = React.useState(null)
  const [ under, setUnder ] = React.useState('')
  const [ over, setOver ] = React.useState('')
  const [ editing, setEditing ] = React.useState(false)
  const [ userList, setUserList ] = React.useState(null)
  const [ betHole, setBetHole ] = React.useState(null)
  const [ anchorEl, setAnchorEl ] = React.useState(null);
  const [ expanded, setExpanded ] = React.useState(false)
  const listEl = React.useRef(null)

  function expandHandler(){
    setExpanded(!expanded)
  }

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function calculatePrice(diff){
    var returnPrize;
    switch (true) {
      case diff > 0:
        returnPrize = ( diff * over )
        if(gameType !== 'jao'){ returnPrize = returnPrize + basePrize }
        return returnPrize
        break;
      case diff < 0:
        returnPrize = ( Math.abs(diff) * under )
        if(gameType !== 'jao'){ returnPrize = returnPrize + basePrize }
        return returnPrize
        break;
      default:
        returnPrize = diff
        if(gameType !== 'jao'){ returnPrize = returnPrize + basePrize }
        return returnPrize
    }
  }

  function handleMenuItemClick(type){
    handleClose()
    setComponentType(type)
  }

  function handleMiniGame(matchid, type){
    const gameType = type === 'jao' ? type : 'normal'
    const socket = socketIOClient( API._getWebURL(), { transports: ['websocket', 'polling'] } )
    socket.emit('minigame-client-message', {
      action: gameType,
      matchid: matchid,
    })
  }

  function responseMiniGame(matchid, type){
    const gameType = type === 'jao' ? type : 'normal'
    const socket = socketIOClient( API._getWebURL(), { transports: ['websocket', 'polling'] } )
    socket.on(`${matchid}-${gameType}-minigame-server-message`, (messageNew) => {
      if(messageNew){
        const d = messageNew.result
        if(d.baseprize){
          setBasePrize(d.baseprize)
        }
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

  async function handleFetchSetJao(userid){
    const resToken = token? token : await API._xhrGet('getcsrf')
    await API._xhrPost(
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
    const resToken = token? token : await API._xhrGet('getcsrf')
    await API._xhrPost(
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
    const resToken = token? token : await API._xhrGet('getcsrf')
    await API._xhrPost(
      token? token : resToken.token,
      'mmatchsection', {
        action: 'setbaseprize',
        matchid: matchid,
        value: basePrize,
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
    const resToken = token? token : await API._xhrGet('getcsrf')
    await API._xhrPost(
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
    const resToken = token? token : await API._xhrGet('getcsrf')
    await API._xhrPost(
      token? token : resToken.token,
      'loadmatchsystem', {
        action: 'minigame',
        matchid: matchid,
        type: gameType
    }, (csrf, d) =>{
      setCSRFToken(csrf)
      if(d.baseprize){
        setBasePrize(d.baseprize)
      }
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
    })
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
        setGameType(gameType === 'mah' ? 'normal' : gameType)
        if(/Mini Game/.test(componentType)){
          handleFetchMiniGame(matchid, gameType)
          responseMiniGame(matchid, gameType)
          setComponentType(gameType === 'jao' ? 'Mini Game Jao' : 'Mini Game Mah')
        }
      }
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
    gameType === 'scoreboard' ?
    (
      <ScoreBoardCharity {...props} />
    )
    :
    (
      <Paper className={classes.root}>
        <GoBack />
        <div style={{ marginLeft: 'auto', marginRight: 'auto', maxWidth: 1200 }}>
          <BTN.PrimaryOutlined onClick={handleClick}>
            {componentType}
            <ArrowDropDown style={{ marginLeft: 8 }} />
          </BTN.PrimaryOutlined>
        </div>
        <div style={{ marginLeft: 'auto', marginRight: 'auto', maxWidth: 1200 }}>
          <ListItem button onClick={expandHandler}
            style={{
              marginTop: 16,
              boxShadow: '0px 1px 3px 0px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 2px 1px -1px rgba(0,0,0,0.12)'
            }}>
            <ListItemText
              primary={API._getWord(sess && sess.language)[expanded ? 'Control_panel' : 'Click to show the control panel.']} />
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
                <BTN.PrimaryText style={{ margin: 12 }} onClick={()=>setEditing(!editing)}>
                  { API._getWord(sess && sess.language)[editing ? 'Done' : 'Edit'] }
                </BTN.PrimaryText>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                <div style={{ marginTop: 12 }}>
                  { gameType !== 'jao' &&
                    <ThemeProvider theme={theme}>
                      { editing ?
                        <div className={classes.basepriceChildGrid}>
                          <TextField label={ API._getWord(sess && sess.language).Minimum_price }
                            type="number"
                            value={basePrize || ''}
                            onChange={e =>setBasePrize(e.target.value)}
                            onKeyPress={e =>handleKeyPressBaseprice(e)}
                            onFocus={e => e.target.select()} />
                          <BTN.Primary className={classes.saveButton}
                            onClick={handleSetBaseprice}>{ API._getWord(sess && sess.language).Save }</BTN.Primary>
                        </div>
                        :
                        <div className={classes.basepriceChildGrid}>
                          <Typography className={classes.basepriceLabel}>
                            { API._getWord(sess && sess.language).Minimum_price }
                          </Typography>
                          <Typography style={{ padding: '6px 8px', marginLeft: 12 }}>{basePrize}</Typography>
                        </div>
                      }
                    </ThemeProvider>
                  }
                </div>
                <div className={classes.underoverGrid}>
                  <ThemeProvider theme={theme}>
                    <div style={{ margin: 6 }}>
                      { editing ?
                        <div className={classes.underoverChildGrid}>
                          <TextField label="Under"
                            type="number"
                            value={under || ''}
                            onChange={e =>setUnder(e.target.value)}
                            onKeyPress={e =>handleKeyPressUnderOver(e, 'under')}
                            onFocus={e => e.target.select()} />
                          <BTN.Amber className={classes.saveButton}
                            onClick={()=>handleSetUnderOver('under')}>{ API._getWord(sess && sess.language).Save }</BTN.Amber>
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
                    </div>
                    <div style={{ margin: 6 }}>
                      { editing ?
                        <div className={classes.underoverChildGrid}>
                          <TextField label="Over"
                            type="number"
                            value={over || ''}
                            onChange={e =>setOver(e.target.value)}
                            onKeyPress={e =>handleKeyPressUnderOver(e, 'over')}
                            onFocus={e => e.target.select()} />
                          <BTN.Green className={classes.saveButton}
                            onClick={()=>handleSetUnderOver('over')}>{ API._getWord(sess && sess.language).Save }</BTN.Green>
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
                    </div>
                  </ThemeProvider>
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
                              {`${API._getWord(sess && sess.language).Hole} ${d + 1}`}
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
            <List disablePadding>
              <ListItem style={{ backgroundColor: COLOR.grey[900], position: 'sticky', top: 0 }}>
                { editing && gameType === 'jao' &&
                  <ListItemText style={{ color: 'white', width: 120 }} primary={ API._getWord(sess && sess.language).Main_player } />
                }
                <ListItemText style={{ color: 'white' }} className={classes.listPlayerName}
                  primary={ API._getWord(sess && sess.language).Player } />
                { !editing &&
                  <React.Fragment>
                    { window.innerWidth >= 600 &&
                      <React.Fragment>
                        <ListItemText style={{ color: 'white' }} className={classes.listScore} primary="Gross" />
                        <ListItemText style={{ color: 'white' }} className={classes.listScore} primary="SF" />
                      </React.Fragment>
                    }
                    <ListItemText style={{ color: 'white' }} className={classes.listPredictScore} primary="Predict" />
                    <ListItemText style={{ color: 'white' }} className={classes.listPredictScore} primary="+/-" />
                    <ListItemText style={{ color: 'white' }} className={classes.listPrice} primary="Price" />
                  </React.Fragment>
                }
              </ListItem>
            </List>
            <List disablePadding ref={listEl}
              style={{
                overflow: 'auto', maxHeight: window.innerHeight * .5,
                ...( listEl.current && listEl.current.offsetHeight < listEl.current.scrollHeight ) && { marginRight: -13 }
              }}>
              { userList &&
                userList.map( d =>
                <React.Fragment key={d.userid}>
                  <ListItem className={classes.listPlayer} style={{ border: d.mainplayer ? `2px solid ${COLOR.grey[900]}` : 'none' }}>
                    { editing && gameType === 'jao' &&
                      <ListItemIcon style={{ width: 120 }}>
                        <StyledCheckbox
                          checked={d.mainplayer}
                          onChange={()=>handleFetchSetJao(d.userid)} />
                      </ListItemIcon>
                    }
                    <ListItemText className={classes.listPlayerName}
                      primary={
                        <React.Fragment>
                          {`${d.fullname}  ${d.lastname}`}
                          { editing && window.innerWidth < 600 &&
                            <React.Fragment>
                              <div style={{ marginTop: 16 }}>
                                <ListPredictScore {...props} data={d} matchid={matchid} gameType={gameType} handleMiniGame={handleMiniGame} />
                              </div>
                            </React.Fragment>
                          }
                        </React.Fragment>
                      }
                      secondary={
                        window.innerWidth < 600 && !editing &&
                        <React.Fragment>
                          <Typography gutterBottom variant="caption" component="span">{`Gross = ${d.gross}`}</Typography>
                          <br></br>
                          <Typography variant="caption" component="span">{`SF = ${d.sf36sys}`}</Typography>
                        </React.Fragment>
                      } />
                    { editing ?
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
                        <ListItemText className={classes.listPredictScore} primary={API._prefixNumber(d.diff)} />
                        <ListItemText className={classes.listPrice} primary={calculatePrice(d.diff)} />
                      </React.Fragment>
                    }
                  </ListItem>
                  <Divider />
                </React.Fragment>
              )}
            </List>
          </div>
        </div>
        <Menu
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}>
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
    )
  )
}
