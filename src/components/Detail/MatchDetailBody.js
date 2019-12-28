import React from 'react';
import clsx from "clsx";
import socketIOClient from 'socket.io-client'
import Loadable from 'react-loadable';
import ReactHtmlParser from 'react-html-parser';
import { Link } from "react-router-dom";
import { makeStyles, fade } from '@material-ui/core/styles';
import * as API from './../../api'
import { primary, green, blueGrey, amber } from './../../api/palette'

import {
  Button,
  Dialog,
  Paper,
  IconButton,
  Typography,
  Tooltip,
  Box,
  Collapse,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  Avatar,
  Divider,
  Chip,

} from '@material-ui/core';

import {
  ExpandMore as ExpandMoreIcon,
  LocationOn,
  Close as CloseIcon,
  Share as ShareIcon,
  VideogameAsset,
  AccountCircle,

} from '@material-ui/icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileExport } from '@fortawesome/free-solid-svg-icons'

import { LDCircular } from './../loading/LDCircular'

import PrintPDF from './../export/PrintPDF'
import RewardPDF from './../export/RewardPDF'

const Scoreboard = Loadable({
  loader: () => import(/* webpackChunkName: "Scoreboard" */'./Scoreboard'),
  loading: () => <LDCircular />
});

const GoBack = Loadable({
  loader: () => import(/* webpackChunkName: "GoBack" */'./../Utils/GoBack'),
  loading: () => <LDCircular />
});

const LabelText = Loadable({
  loader: () => import(/* webpackChunkName: "LabelText" */'./../Utils/LabelText'),
  loading: () => null
});

const CourseScorecard = Loadable({
  loader: () => import(/* webpackChunkName: "CourseScorecard" */'./../SystemAdmin/Course/CourseScorecard'),
  loading: () => <LDCircular />
});

const ScoreTableChip = Loadable({
  loader: () => import(/* webpackChunkName: "ScoreTableChip" */'./ScoreTableChip'),
  loading: () => null
});

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: window.innerHeight * .8,
    maxWidth: 1200,
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: theme.spacing(3, 2),
    position: 'relative'
  },
  content: {
    margin: 0,
    [theme.breakpoints.up(500)]: {
      margin: '0 5%',
    },
    [theme.breakpoints.up(600)]: {
      margin: '0 72px',
    },
  },
  titleOverflow: {
    overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis',
  },
  imageGrid: {
    display: 'flex',
    justifyContent: 'center'
  },
  image: {
    maxWidth: '100%',
    maxHeight: 450,
    color: 'black',
    backgroundColor: '#ccc',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
  imageLD: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '5%',
    height: 200,
    width: '100%',
    backgroundColor: '#ccc',
    [theme.breakpoints.up(400)]: {
      height: 250,
    },
    [theme.breakpoints.up(500)]: {
      height: 300,
    },
    [theme.breakpoints.up(600)]: {
      height: 350,
    },
    [theme.breakpoints.up(700)]: {
      width: '60%',
      height: 250,
    },
  },
  detail: {
    fontSize: 16,
    fontWeight: 600,
    color: primary[800],
    minHeight: 200,
    [theme.breakpoints.up(700)]: {
      minHeight: 250,
    },
    [theme.breakpoints.up(950)]: {
      minHeight: 300,
    },
    [theme.breakpoints.up(1100)]: {
      minHeight: 360,
    },
  },
  expandIcon: {
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  iconButtonSmall: {
    padding: 8
  },
  paperWidthSm: {
    maxWidth: 700
  },
  avatar: {
    fontSize: 100
  },
  avatarImage: {
    width: 100,
    height: 100,
  },
  banner: {
    [theme.breakpoints.down(1700)]: {
      display: 'none',
    },
  },
  display: {
    [theme.breakpoints.down(600)]: {
      display: 'none'
    },
  },
  moreThan600: {
    [theme.breakpoints.down(600)]: {
      display: 'none'
    },
  },
  lessThan600: {
    [theme.breakpoints.up(600)]: {
      display: 'none'
    },
  },
  moreThan720: {
    [theme.breakpoints.down(720)]: {
      display: 'none',
    },
  },
  lessThan720: {
    [theme.breakpoints.up(720)]: {
      display: 'none',
    },
  },


}));

function DetailComponent(props){
  const classes = useStyles();
  const { matchid, detail, picture, isSupportWebp } = props

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
    <div className="ql-container ql-snow" style={{ border: 'none' }}>
      { picture &&
        <div className={classes.imageGrid}>
          <img onTouchStart={API._openFullScreen} onClick={API._openFullScreen} align="left" className={classes.image}
            style={{ height: window.innerWidth * .45, }}
            src={API._getPictureUrl(picture) + ( isSupportWebp? '.webp' : '.jpg' )} />
        </div>
      }
      { detail &&
        <div className="ql-editor" style={{ maxHeight: 'none' }}>
          {ReactHtmlParser(detail)}
        </div>
      }
    </div>
  );
}

function ListSpecialReward(props){
  const classes = useStyles();
  const { BTN, sess, label, row, data, isSupportWebp, booby, sortBy, scoringMethod } = props
  const [ expanded, setExpanded ] = React.useState(false)
  const [ fieldData, setFieldData ] = React.useState({
    out: 0,
    in: 0,
    gross: 0
  })

  function toggleExpand(){
    setExpanded(!expanded)
  }

  React.useEffect(()=>{
    if(data && data.fieldscore){
      let tempIn = 0
      let tempOut = 0
      for(var i = 0;i < 18;i++){
        if(i >= 9){
          tempIn += data.fieldscore[i]
        }else{
          tempOut += data.fieldscore[i]
        }
      }
      setFieldData({
        out: tempOut,
        in: tempIn,
        gross: tempOut + tempIn
      })
    }
  },[ ])

  return (
    <React.Fragment>
      <ListItem button onClick={toggleExpand}>
        <Typography className={classes.moreThan600} variant="body1" style={{ width: 150, borderRight: `2px solid ${primary[900]}`, marginRight: 8 }}>
          {label}
        </Typography>
        <ListItemText
          primary={
            <React.Fragment>
              <Typography className={classes.lessThan600} variant="body1" style={{ borderBottom: `3px solid ${primary[900]}` }}>
                {label}
              </Typography>
              <div className={classes.moreThan600}>
                <div style={{ display: 'flex'}}>
                  <Typography variant="body1" style={{ marginRight: 16 }}>
                    {`${row[booby ? 'firstname' : 'fullname']}`}
                  </Typography>
                  <Typography variant="body1">
                    {`${row.lastname}`}
                  </Typography>
                </div>
              </div>
            </React.Fragment>
          }
          secondary={
            <Typography component="span" className={classes.lessThan600}>
              <Typography component="span" style={{ display: 'flex'}}>
                <Typography variant="body1" style={{ marginRight: 16 }}>
                  {`${row[booby ? 'firstname' : 'fullname']}`}
                </Typography>
                <Typography variant="body1">
                  {`${row.lastname}`}
                </Typography>
              </Typography>
            </Typography>
          } />
      </ListItem>
      {!expanded && <Divider />}
      <Collapse in={expanded} unmountOnExit>
        { data && data.fieldscore && row && row.score &&
          <div
            style={{
              overflow: 'auto', padding: '16px 0',
              overflowScrolling: 'touch', WebkitOverflowScrolling: 'touch'
            }}>
              <div style={{ display: 'flex', justifyContent: 'center', width: 1000 }}>
                <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', padding: 16, paddingTop: 0 }}>
                  { row.photopath ?
                    <Avatar className={classes.avatarImage} style={{ marginLeft: 'auto', marginRight: 'auto' }}
                      src={API._getPictureUrl(row.photopath) + ( isSupportWebp? '.webp' : '.jpg' ) + '#' + new Date().toISOString()} />
                    :
                    <AccountCircle classes={{ root: classes.avatar }} style={{ marginLeft: 'auto', marginRight: 'auto' }} />
                  }
                  { BTN && row && sess && sess.status === 1 && sess.typeid !== 'admin' && ('typeid' in row) &&
                    <div style={{ padding: '8px 24px' }}>
                      { row.typeid === 'dummy' ?
                        <Typography variant="body2"
                          align="center"
                          style={{ color: primary[500], textTransform: 'uppercase', letterSpacing: '0.02857em', fontWeight: 500 }}>
                          { API._getWord(sess && sess.language).Dummy }
                        </Typography>
                        :
                        <Link to={`/user/timeline/${row.userid}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                          <BTN.PrimaryOutlined>{ API._getWord(sess && sess.language).Profile }</BTN.PrimaryOutlined>
                        </Link>
                      }
                    </div>
                  }
                </div>
                <div>
                  <ListItem style={{ padding: 0 }}>
                    <div style={{ display: 'flex', margin: 'auto' }}>
                      <div style={{ backgroundColor: 'black', color: 'white',
                        padding: '8px 4px', width: 64, textAlign: 'right', borderRadius: '4px 0 0 0', fontWeight: 800 }}>HOLE</div>
                      {[0,1,2,3,4,5,6,7,8].map( d=>
                        <div key={d} style={{ backgroundColor: 'black', color: 'white',
                          padding: '8px 4px', width: 32, textAlign: 'center' }}>{d + 1}</div>
                      )}
                      <div style={{ backgroundColor: 'black', color: 'white',
                        padding: '8px 4px', width: 48, textAlign: 'center', fontWeight: 800 }}>OUT</div>
                      {[9,10,11,12,13,14,15,16,17].map( d=>
                        <div key={d} style={{ backgroundColor: 'black', color: 'white',
                          padding: '8px 4px', width: 32, textAlign: 'center' }}>{d + 1}</div>
                      )}
                      <div style={{ backgroundColor: 'black', color: 'white',
                        padding: '8px 4px', width: 48, textAlign: 'center', fontWeight: 800 }}>IN</div>
                      <div style={{ backgroundColor: 'black', color: 'white',
                        padding: '8px 4px', width: 48, textAlign: 'center', borderRadius: '0 4px 0 0', fontWeight: 800 }}>TOT</div>
                    </div>
                  </ListItem>
                  <ListItem style={{ padding: 0 }}>
                    <div style={{ display: 'flex', margin: 'auto' }}>
                      <div style={{ backgroundColor: blueGrey[700], color: blueGrey[50],
                        padding: '8px 4px', width: 64, textAlign: 'right', fontWeight: 800 }}>PAR</div>
                      { data.fieldscore.slice(0,9).map( (d,i)=>
                        <div key={i} style={{ backgroundColor: blueGrey[700], color: blueGrey[100],
                          padding: '8px 4px', width: 32, textAlign: 'center' }}>{d}</div>
                      )}
                      <div style={{ backgroundColor: blueGrey[700], color: blueGrey[50],
                        padding: '8px 4px', width: 48, textAlign: 'center', fontWeight: 800 }}>{fieldData.out}</div>
                      { data.fieldscore.slice(9,18).map( (d,i)=>
                        <div key={i} style={{ backgroundColor: blueGrey[700], color: blueGrey[100],
                          padding: '8px 4px', width: 32, textAlign: 'center'}}>{d}</div>
                      )}
                      <div style={{ backgroundColor: blueGrey[700], color: blueGrey[50],
                        padding: '8px 4px', width: 48, textAlign: 'center', fontWeight: 800 }}>{fieldData.in}</div>
                      <div style={{ backgroundColor: blueGrey[700], color: blueGrey[50],
                        padding: '8px 4px', width: 48, textAlign: 'center', fontWeight: 800 }}>{fieldData.gross}</div>
                    </div>
                  </ListItem>
                  <ListItem style={{ padding: 0 }}>
                    <div style={{ display: 'flex', margin: 'auto' }}>
                      <div style={{ backgroundColor: blueGrey[50],
                        padding: '8px 4px', width: 64, textAlign: 'right', borderRadius: '0 0 0 4px', fontWeight: 800 }}>SCORE</div>
                      { row.score.slice(0,9).map( (d,i)=>
                        <div key={i}
                          style={{
                            backgroundColor:
                            data.fieldscore[i] - d < 0? amber[300]:
                            data.fieldscore[i] - d > 0? green[300]:blueGrey[50],
                            padding: '8px 4px', width: 32, textAlign: 'center'
                        }}>{d}</div>
                      )}
                      <div style={{ backgroundColor: blueGrey[50],
                        padding: '8px 4px', width: 48, textAlign: 'center', fontWeight: 800 }}>{row[booby ? 'out' : 'sout']}
                      </div>
                      { row.score.slice(9,18).map( (d,i)=>
                        <div key={i}
                          style={{
                            backgroundColor:
                            data.fieldscore[i + 9] - d < 0? amber[300]:
                            data.fieldscore[i + 9] - d > 0? green[300]:blueGrey[50],
                            padding: '8px 4px', width: 32, textAlign: 'center'
                        }}>{d}</div>
                      )}
                      <div style={{ backgroundColor: blueGrey[50],
                        padding: '8px 4px', width: 48, textAlign: 'center', fontWeight: 800 }}>{row[booby ? 'in' : 'sin']}</div>
                      <div style={{ backgroundColor: blueGrey[50],
                        padding: '8px 4px', width: 48, textAlign: 'center', borderRadius: '0 0 4px 0', fontWeight: 800 }}>{
                          row[booby ? 'out' : 'sout'] + row[booby ? 'in' : 'sin']
                        }</div>
                    </div>
                  </ListItem>
                  <div style={{ display: 'flex', padding: '8px 12px' }}>
                    <Chip variant="outlined" style={{ marginRight: 12 }}
                      label={`PAR | ${row.par > 0? '+' + row.par : row.par === 0? 'E' : row.par}`} />
                    { data.scorematch !== 1 && scoringMethod === 'flight' &&
                      <Chip variant="outlined" style={{ marginRight: 12 }}
                        label={`HC | ${row.hc}`} />
                    }
                    { !( data.scorematch === 1 || scoringMethod === 'stroke' ) &&
                      <React.Fragment>
                        <Chip variant="outlined" style={{ marginRight: 12 }}
                          label={`${sortBy === 'net' ? 'NET' : 'SF'} | ${sortBy === 'net' ? row.net36sys : row.sf36sys}`} />
                        <Chip variant="outlined" style={{ marginRight: 12 }}
                          label={`${sortBy === 'net' ? 'SF' : 'NET'} | ${sortBy === 'net' ? row.sf36sys : row.net36sys}`} />
                      </React.Fragment>
                    }
                  </div>
                  <div style={{ display: 'flex' }}>
                    <ScoreTableChip dotColor={green[300]} label="Under"/>
                    <ScoreTableChip dotColor={blueGrey[50]} label="Par"/>
                    <ScoreTableChip dotColor={amber[300]} label="Over"/>
                  </div>
                </div>
              </div>
          </div>
        }
      </Collapse>
      <Divider />
    </React.Fragment>
  );
}

export default function MatchDetailBody(props) {
  const classes = useStyles();
  const {
    BTN, sess, token, setCSRFToken, isSupportWebp, handleSnackBar, matchid,
    data, setData, userscore, setUserscore, setRawUserscore, mainClassSelected, value
  } = props
  const [ expanded, setExpanded ] = React.useState(true)
  const [ matchDetail, setMatchDetail ] = React.useState(null)
  const [ anchorEl, setAnchorEl ] = React.useState({
    minigame: null,
    export: null
  });
  const [ scorecardState, setScorecardState ] = React.useState(false);
  const [ reward, setReward ] = React.useState(null)

  const handleScorecardOpen = () => {
    setScorecardState(true);
  };

  const handleScorecardClose = value => {
    setScorecardState(false);
  };

  function menuClick(event, type){
    setAnchorEl({ ...anchorEl, [type]: event.currentTarget });
  }

  function menuClose(){
    setAnchorEl({
      minigame: null,
      export: null
    });
  }

  function toggleShowAction(userto, userfrom, requestaction){
    const socket = socketIOClient( API._getWebURL(), { transports: ['websocket', 'polling'] } )
    socket.emit('match-request-client-message', {
      action: 'showaction',
      matchid: matchid,
      userto: userto,
      userfrom: userfrom,
      requestaction: requestaction
    })
    setTimeout(()=>{
      handleFetch()
    }, 500)
  }

  function handleGetButton(){
    if(BTN && data && data.status === 0){
      switch (true) {
        case data.permission === 'host' || data.permission === 'admin':
          return (
            <BTN.NoStyleLink
              to={
                userscore && userscore.length > 0 ?
                `/user/management/match/${matchid}`
                :
                `/user/management/match/${matchid}#invitation`
              }>
              <BTN.Primary style={{ padding: '4px 16px' }}>
                { API._getWord(sess && sess.language).Edit }
              </BTN.Primary>
            </BTN.NoStyleLink>
          )
          break;
        case data.permission === 'pending':
          return (
            <Button disabled>{ API._getWord(sess && sess.language).Pending }</Button>
          )
          break;
        case data.permission === 'none':
          return (
            <BTN.Primary style={{ padding: '4px 16px' }} onClick={handleJoinMatch}>
              { API._getWord(sess && sess.language).Join }
            </BTN.Primary>
          )
          break;
        default:
          return null
      }
    }
  }

  function expandHandler(){
    setExpanded(!expanded)
  }

  async function handleJoinMatch(){
    if(sess && sess.status === 1){
      const resToken = token? token : await API._xhrGet('getcsrf')
      await API._xhrPost(
        token? token : resToken.token,
        'matchgate', {
          action: 'request',
          subaction: 'join',
          matchid: matchid,
      }, (csrf, d) =>{
        setCSRFToken(csrf)
        handleSnackBar({
          state: true,
          message: d.status,
          variant: /success/.test(d.status) ? d.status : 'error',
          autoHideDuration: /success/.test(d.status)? 2000 : 5000
        })
        if(/success/.test(d.status)){
          toggleShowAction(d.to, d.from, 'join')
        }
      })
    }else{
      window.location.pathname = '/login'
    }
  }

  async function handleFetch(){
    const resToken = token? token : await API._xhrGet('getcsrf')
    await API._xhrPost(
      token? token : resToken.token,
      'loadmatchsystem', {
        action: 'userscore',
        matchid: matchid,
        mainclass: parseInt(mainClassSelected)
    }, (csrf, d) =>{
      setCSRFToken(csrf)
      if(d.status === 'wrong params'){
        handleSnackBar({
          state: true,
          message: d.status,
          variant: 'error',
          autoHideDuration: 5000
        })
      }else{
        document.title = `${document.title} - ${d.title}`
        setData(d)
        setUserscore(d.userscore)
        setRawUserscore(d)
      }
    })
  }

  async function handleFetchReward(){
    const resToken = token? token : await API._xhrGet('getcsrf')
    await API._xhrPost(
      token? token : resToken.token,
      'loadmatchsystem', {
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
        setReward(d)
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

  React.useEffect(()=>{
    handleFetchReward()
  },[ mainClassSelected ])

  return (
    <Paper className={classes.root}>
      <div className={classes.display} style={{ position: 'absolute', top: 8 }}>
        <GoBack />
      </div>
      <div className={classes.banner}>
        <div style={{ position: 'fixed', right: 0, zIndex: 10 }}>
          <img
            style={{
              maxwidth: 300,
              maxHeight: window.innerHeight * .7,
              color: 'black',
              backgroundColor: props.COLOR.grey[300],
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
            }}
            src={`https://${API._webURL()}/system/ads/matchads.png`} />
        </div>
        <div style={{ position: 'fixed', left: 0, zIndex: 10 }}>
          <img
            style={{
              maxWidth: 300,
              maxHeight: window.innerHeight * .7,
              color: 'black',
              backgroundColor: props.COLOR.grey[300],
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
            }}
            src={`https://${API._webURL()}/system/ads/matchads.png`} />
        </div>
      </div>
      { data ?
        (
          !/wrong/.test(data.status) ?
          <div className={classes.content}>
            <Tooltip title={data?data.title:'Match Title'} placement="top-start">
              <div style={{ display: 'flex' }}>
                <Typography variant="h4" className={classes.moreThan600} style={{ flex: 1 }}>
                  {data?data.title:'Match Title'}
                </Typography>
                <Typography variant="h6" className={classes.lessThan600} style={{ flex: 1 }}>
                  {data?data.title:'Match Title'}
                </Typography>
                {handleGetButton()}
              </div>
            </Tooltip>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              <Typography gutterBottom variant="h6" className={classes.moreThan600}
                style={{
                  color: data.scorematch === 1 ? primary[700] : 'inherit',
                  fontWeight: data.scorematch === 1 ? 900 : 600
                }}>
                { function(){
                    switch (data.scorematch) {
                      case 0:
                        return 'Amateur'
                        break;
                      case 1:
                        return 'Professional'
                        break;
                      default:
                        return 'Charity'
                    }
                  }()
                }
              </Typography>
              <Typography gutterBottom variant="body2" className={classes.lessThan600}
                style={{
                  color: data.scorematch === 1 ? primary[700] : 'inherit',
                  fontWeight: data.scorematch === 1 ? 900 : 600
                }}>
                { function(){
                    switch (data.scorematch) {
                      case 0:
                        return 'Amateur'
                        break;
                      case 1:
                        return 'Professional'
                        break;
                      default:
                        return 'Charity'
                    }
                  }()
                }
              </Typography>
              <Typography variant="h6" className={classes.moreThan600} style={{ marginLeft: 12, marginRight: 12 }}>|</Typography>
              <Typography variant="body2" className={classes.lessThan600} style={{ marginLeft: 12, marginRight: 12 }}>|</Typography>
              <Typography variant="h6" className={classes.moreThan600}>
                {data?API._dateToString(data.date):'date'}
              </Typography>
              <Typography variant="body2" className={classes.lessThan600}>
                {data?API._dateToString(data.date):'date'}
              </Typography>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              <Button variant="text" onClick={handleScorecardOpen} style={{ padding: 0 }}>
                <LocationOn style={{ color: primary[600], marginRight: 4 }} />
                <Typography variant="h6" className={clsx(classes.titleOverflow, classes.moreThan600)}>
                  {data?data.location:'Course'}
                </Typography>
                <Typography variant="body2" className={clsx(classes.titleOverflow, classes.lessThan600)}>
                  {data?data.location:'Course'}
                </Typography>
              </Button>
            </div>
            <div className={classes.moreThan720}>
              <div style={{ display: 'flex', marginBottom: 24, flexWrap: 'wrap', justifyContent: 'space-between' }}>
                <div style={{ marginTop: 'auto', marginBottom: 6 }}>
                  <BTN.PrimaryOutlined onClick={handleScorecardOpen} style={{ marginRight: 8, marginTop: 8 }}>
                    { API._getWord(sess && sess.language).Scorecard }
                  </BTN.PrimaryOutlined>
                  { matchid &&
                    <BTN.NoStyleLink to={`/matchform/${matchid}`}>
                      <BTN.PrimaryOutlined style={{ marginRight: 8, marginTop: 8 }}>{ API._getWord(sess && sess.language).Form }</BTN.PrimaryOutlined>
                    </BTN.NoStyleLink>
                  }
                  { data.team &&
                    ( (data.status === 0 && data.team.length > 0) ?
                      <BTN.NoStyleLink to={`/schedule/${matchid}`}>
                        <BTN.PrimaryOutlined style={{ marginRight: 8, marginTop: 8 }}>
                          { API._getWord(sess && sess.language).Schedule }
                        </BTN.PrimaryOutlined>
                      </BTN.NoStyleLink>
                      :
                      <BTN.PrimaryOutlined disabled style={{ marginRight: 8, marginTop: 8 }}>
                        { API._getWord(sess && sess.language).Schedule }
                      </BTN.PrimaryOutlined>
                    )
                  }
                </div>
                <div>
                  <IconButton disabled={userscore && userscore.length <= 0}
                    className={classes.iconButtonSmall} onClick={e => menuClick(e, 'export')}>
                    <FontAwesomeIcon icon={faFileExport}
                      style={{ color: (userscore && userscore.length > 0) ? primary[600] : 'inherit', fontSize: 20 }} />
                  </IconButton>
                  <a href={`/session/share?url=/match/${matchid}`}
                    target='_blank'
                    style={{ textDecoration: 'none', color: 'inherit' }}>
                    <IconButton className={classes.iconButtonSmall}>
                      <ShareIcon style={{ color: primary[600] }} />
                    </IconButton>
                  </a>
                  { BTN && data.scorematch === 2 && sess.status === 1 &&
                    <IconButton disabled={userscore && userscore.length <= 0}
                      className={classes.iconButtonSmall} onClick={e => menuClick(e, 'minigame')}>
                      <VideogameAsset fontSize="large"
                        style={{ color: (userscore && userscore.length > 0) ? primary[600] : 'inherit' }} />
                    </IconButton>
                  }
                </div>
              </div>
            </div>
            <div style={{ marginTop: 'auto', marginBottom: 6 }} className={classes.lessThan720}>
              <BTN.PrimaryOutlined onClick={handleScorecardOpen} style={{ marginRight: 8, marginTop: 8 }}>
                { API._getWord(sess && sess.language).Scorecard }
              </BTN.PrimaryOutlined>
              { matchid &&
                <BTN.NoStyleLink to={`/matchform/${matchid}`}>
                  <BTN.PrimaryOutlined style={{ marginRight: 8, marginTop: 8 }}>{ API._getWord(sess && sess.language).Form }</BTN.PrimaryOutlined>
                </BTN.NoStyleLink>
              }
            </div>
            <div className={classes.lessThan720}>
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                <div>
                  { data.team &&
                    ( (data.status === 0 && data.team.length > 0) ?
                      <BTN.NoStyleLink to={`/schedule/${matchid}`}>
                        <BTN.PrimaryOutlined>
                          { API._getWord(sess && sess.language).Schedule }
                        </BTN.PrimaryOutlined>
                      </BTN.NoStyleLink>
                      :
                      <BTN.PrimaryOutlined disabled>
                        { API._getWord(sess && sess.language).Schedule }
                      </BTN.PrimaryOutlined>
                    )
                  }
                </div>
                <div>
                  <IconButton disabled={userscore && userscore.length <= 0}
                    className={classes.iconButtonSmall} onClick={e => menuClick(e, 'export')}>
                    <FontAwesomeIcon icon={faFileExport}
                      style={{ color: (userscore && userscore.length > 0) ? primary[600] : 'inherit', fontSize: 20 }} />
                  </IconButton>
                  <a href={`/session/share?url=/match/${matchid}`}
                    target='_blank'
                    style={{ textDecoration: 'none', color: 'inherit' }}>
                    <IconButton className={classes.iconButtonSmall}>
                      <ShareIcon style={{ color: primary[600] }} />
                    </IconButton>
                  </a>
                  { BTN && data.scorematch === 2 && sess.status === 1 &&
                    <IconButton disabled={userscore && userscore.length <= 0}
                      className={classes.iconButtonSmall} onClick={e => menuClick(e, 'minigame')}>
                      <VideogameAsset fontSize="large"
                        style={{ color: (userscore && userscore.length > 0) ? primary[600] : 'inherit' }} />
                    </IconButton>
                  }
                </div>
              </div>
            </div>
            <DetailComponent matchid={matchid} detail={data.message} picture={data.picture} isSupportWebp={isSupportWebp} />
            { data.reward &&
              <Paper style={{ width: '100%', }}>
                { ((data.lowgross === 1 && data.reward.lowgross === 1) || (data.reward.lownet === 1&& data.reward.lownet)) &&
                  <Divider />
                }
                { data.lowgross === 1 && data.reward.lowgross &&
                  <ListSpecialReward
                    {...props}
                    label={ API._getWord(sess && sess.language).Lowgross }
                    row={data.reward.lowgross}
                    data={data} />
                }
                { data.lownet === 1 && data.reward.lownet &&
                  <ListSpecialReward
                    {...props}
                    label={ API._getWord(sess && sess.language).Lownet }
                    row={data.reward.lownet}
                    data={data} />
                }
                { data.booby === 1 && userscore && userscore.length > 2 &&
                  <ListSpecialReward
                    {...props}
                    booby
                    label={ API._getWord(sess && sess.language).Booby }
                    row={userscore[userscore.length - 2]}
                    data={data} />
                }
              </Paper>
            }
            { data ?
              ( data.mainclass && data.mainclass.length > 0 ?
                <React.Fragment>
                  <ListItem button onClick={expandHandler}
                    style={{
                      boxShadow: '0px 1px 3px 0px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 2px 1px -1px rgba(0,0,0,0.12)'
                    }}>
                    <ListItemText primary={ API._getWord(sess && sess.language).Scoreboard } />
                    <IconButton
                      disableRipple
                      className={classes.expandIcon}
                      style={{ transform: expanded?'rotate(180deg)':'rotate(0deg)' }}
                      onClick={expandHandler}
                      aria-expanded={expanded}
                      aria-label="Show more"
                    >
                      <ExpandMoreIcon />
                    </IconButton>
                  </ListItem>
                  <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <Scoreboard {...props} matchClass={data.mainclass[parseInt(mainClassSelected) - 1].values} />
                  </Collapse>
                </React.Fragment>
                :
                ( (data.permission === 'host' || data.permission === 'admin') &&
                <Typography component="div" style={{ width: '100%' }}>
                  <React.Fragment>
                    <Box style={{ textAlign: 'center', color: primary[900], whiteSpace: 'pre-wrap' }} fontWeight={500} fontSize={24} m={1}>
                      {`${
                        !data.member ? ( API._getWord(sess && sess.language).No_player + ',' ) : ''
                      }\n${
                        ( data.mainclass && data.mainclass.length === 0 ) ?
                        function(){
                          switch (true) {
                            case (
                              data.scorematch === 0 ||
                              ( data.mainclass && data.mainclass.length > 0 &&
                                data.mainclass[parseInt(mainClassSelected) - 1].type === 'flight'
                              )
                            ):
                              return API._getWord(sess && sess.language).No_flight + ','
                              break;
                            default:
                              return API._getWord(sess && sess.language).No_group + ','
                          }
                        }() : ''
                      }\n${
                        ( userscore && userscore.length === 0 ) ? API._getWord(sess && sess.language)['No groups were chosen for the players.'] : ''
                      }`}
                    </Box>
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: 16, marginBottom: 16, }}>
                      { !data.member &&
                        <BTN.NoStyleLink to={`/user/management/match/${matchid}#invitation`}>
                          <BTN.PrimaryOutlined>
                            { API._getWord(sess && sess.language).Invite_players }
                          </BTN.PrimaryOutlined>
                        </BTN.NoStyleLink>
                      }
                      { data.mainclass && data.mainclass.length === 0 &&
                        <BTN.NoStyleLink to={`/user/management/match/${matchid}#group`}>
                          <BTN.PrimaryOutlined>
                            { API._getWord(sess && sess.language).Create_group }
                          </BTN.PrimaryOutlined>
                        </BTN.NoStyleLink>
                      }
                      { userscore && userscore.length === 0 &&
                        <BTN.NoStyleLink to={`/user/management/match/${matchid}#player`}>
                          <BTN.PrimaryOutlined>
                            { API._getWord(sess && sess.language).Edit_player_group }
                          </BTN.PrimaryOutlined>
                        </BTN.NoStyleLink>
                      }
                    </div>
                  </React.Fragment>
                </Typography>
                )
              )
              :
              <LDCircular />
            }
          </div>
          :
          <div>
            <h3 style={{ textAlign: 'center', fontSize: 28 , marginTop: 72 }}>
              { API._getWord(sess && sess.language).No_match }
              <code>{' ' + matchid}</code>
            </h3>
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
              <Link to='/'
                style={{
                  textAlign: 'center', fontSize: 24, margin: '24px 0',
                  color: '#1e88e5'
                }}>{ API._getWord(sess && sess.language).Go_to_home }</Link>
            </div>
          </div>
        )
        :
        <LDCircular />
      }
      <Dialog classes={{ paperWidthSm: classes.paperWidthSm }} onClose={handleScorecardClose} open={scorecardState}>
        <LabelText text="Golf Scorecard" />
        <IconButton onClick={handleScorecardClose} style={{ position: 'absolute', top: 8, right: 8 }}>
          <CloseIcon />
        </IconButton>
        { data &&
          <CourseScorecard {...props} field={data} />
        }
      </Dialog>
      <Menu
        anchorEl={anchorEl.export}
        keepMounted
        open={Boolean(anchorEl.export)}
        onClose={menuClose}>
        { data && data.mainclass && data.mainclass.length > 0 &&
          data.mainclass[parseInt(mainClassSelected) - 1].values &&
          data.mainclass[parseInt(mainClassSelected) - 1].values.map((d,i)=>
            value === i &&
            <div style={{ marginTop: 'auto', marginBottom: 4 }} key={d.classname}>
              <RewardPDF {...props} matchClass={d} reward={reward} menuClose={menuClose} />
              <PrintPDF {...props} matchClass={d} menuClose={menuClose}  />
            </div>
          )
        }
        { data && data.mainclass && data.mainclass.length > 0 &&
          ( data.scorematch === 0 || data.mainclass[parseInt(mainClassSelected) - 1].type === 'flight' ) &&
          data.mainclass[parseInt(mainClassSelected) - 1].values &&
          ( value === data.mainclass[parseInt(mainClassSelected) - 1].values.length ) &&
          <div style={{ marginTop: 'auto', marginBottom: 4 }}>
            <RewardPDF {...props}
              matchClass={{ classno: 0, classname: 'No class', color: '' }} reward={reward} menuClose={menuClose}  />
            <PrintPDF {...props}
              matchClass={{ classno: 0, classname: 'No class', color: '' }} menuClose={menuClose}  />
          </div>
        }
        <div />
      </Menu>
      <Menu
        anchorEl={anchorEl.minigame}
        keepMounted
        open={Boolean(anchorEl.minigame)}
        onClose={menuClose}
      >
        { matchid &&
          <Link style={{ textDecoration: 'none', color: 'inherit' }} to={`/match/${matchid}/minigame/scoreboard`}>
            <MenuItem onClick={menuClose}>Scoreboard</MenuItem>
          </Link>
        }
        { matchid &&
          <Link style={{ textDecoration: 'none', color: 'inherit' }} to={`/match/${matchid}/minigame/mah`}>
            <MenuItem onClick={menuClose}>Mah</MenuItem>
          </Link>
        }
        { matchid &&
          <Link style={{ textDecoration: 'none', color: 'inherit' }} to={`/match/${matchid}/minigame/jao`}>
            <MenuItem onClick={menuClose}>Jao</MenuItem>
          </Link>
        }
      </Menu>
    </Paper >
  );
}
