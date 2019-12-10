import React from 'react';
import socketIOClient from 'socket.io-client'
import Loadable from 'react-loadable';
import ReactHtmlParser from 'react-html-parser';
import { Link } from "react-router-dom";
import { makeStyles, fade } from '@material-ui/core/styles';
import * as API from './../../api'
import { primary } from './../../api/palette'

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

} from '@material-ui/core';

import {
  ExpandMore as ExpandMoreIcon,
  LocationOn,
  Close as CloseIcon,
  Share as ShareIcon,
  VideogameAsset,

} from '@material-ui/icons';

import { LDCircular } from './../loading/LDCircular'

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

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: window.innerHeight * .8,
    maxWidth: 1200,
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: theme.spacing(3, 2),
  },
  content: {
    margin: '0 5%',
    [theme.breakpoints.up(500)]: {
      margin: '0 5%',
    },
    [theme.breakpoints.up(700)]: {
      margin: '0 72px',
    },
  },
  imageGrid: {
    display: 'flex',
    justifyContent: 'center'
  },
  image: {
    maxWidth: 800,
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
  paperWidthSm: {
    maxWidth: 700
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
      <div className={classes.imageGrid}>
        { picture &&
          <img align="left" className={classes.image}
            style={{ height: window.innerWidth * .45, }}
            src={API._getPictureUrl(picture) + ( isSupportWebp? '.webp' : '.jpg' )} />
        }
      </div>
      <div className="ql-editor">
        {ReactHtmlParser(detail)}
      </div>
    </div>
  );
}

export default function MatchDetailBody(props) {
  const classes = useStyles();
  const {
    BTN, sess, token, setCSRFToken, isSupportWebp, handleSnackBar, matchid,
    data, setData, userscore, setUserscore, setRawUserscore, mainClassSelected
  } = props
  const [ expanded, setExpanded ] = React.useState(true)
  const [ matchDetail, setMatchDetail ] = React.useState(null)
  const [ anchorEl, setAnchorEl ] = React.useState(null);
  const [ scorecardState, setScorecardState ] = React.useState(false);

  const handleScorecardOpen = () => {
    setScorecardState(true);
  };

  const handleScorecardClose = value => {
    setScorecardState(false);
  };

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function toggleShowAction(userto, userfrom, requestaction){
    if(sess && sess.status === 1){
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
    }else{
      window.location.pathname = '/login'
    }
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

  return (
    <Paper className={classes.root}>
      <GoBack />
      { data ?
        (
          !/wrong/.test(data.status) ?
          <div className={classes.content}>
            <Tooltip title={data?data.title:'Match Title'} placement="top-start">
              <Typography variant="h4">
                {data?data.title:'Match Title'}
              </Typography>
            </Tooltip>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
              <Typography gutterBottom variant="body2"
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
              {handleGetButton()}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', marginBottom: '.75em' }}>
              <Typography variant="h6">
                {data?API._dateToString(data.date):'date'}
              </Typography>
              <Typography variant="h6" style={{ marginLeft: 12, marginRight: 12 }}>|</Typography>
              <Button variant="text" onClick={handleScorecardOpen} style={{ padding: 0 }}>
                <LocationOn style={{ color: primary[600], marginRight: 4 }} />
                <Typography variant="h6">
                  {data?data.location:'Course'}
                </Typography>
              </Button>
            </div>
            <div style={{ display: 'flex', marginBottom: 24, flexWrap: 'wrap', justifyContent: 'space-between' }}>
              <div style={{ marginTop: 'auto', marginBottom: 6 }}>
                <BTN.PrimaryOutlined onClick={handleScorecardOpen} style={{ marginRight: 8 }}>
                  { API._getWord(sess && sess.language).Scorecard }
                </BTN.PrimaryOutlined>
                { matchid &&
                  <BTN.NoStyleLink to={`/matchform/${matchid}`}>
                    <BTN.PrimaryOutlined style={{ marginRight: 8 }}>{ API._getWord(sess && sess.language).Form }</BTN.PrimaryOutlined>
                  </BTN.NoStyleLink>
                }
                { data.team &&
                  ( (data.status === 0 && data.team.length > 0) ?
                    <BTN.NoStyleLink to={`/schedule/${matchid}`}>
                      <BTN.PrimaryOutlined style={{ marginRight: 8 }}>
                        { API._getWord(sess && sess.language).Schedule }
                      </BTN.PrimaryOutlined>
                    </BTN.NoStyleLink>
                    :
                    <BTN.PrimaryOutlined disabled style={{ marginRight: 8 }}>
                      { API._getWord(sess && sess.language).Schedule }
                    </BTN.PrimaryOutlined>
                  )
                }
              </div>
              <div>
                <a href={`/session/share?url=/match/${matchid}`}
                  target='_blank'
                  style={{ textDecoration: 'none', color: 'inherit' }}>
                  <IconButton>
                    <ShareIcon style={{ color: primary[600] }} />
                  </IconButton>
                  {/*
                    <BTN.PrimaryOutlined
                      startIcon={<ShareIcon style={{ color: primary[600] }} />}>
                      {API._getWord(sess && sess.language).Share}
                    </BTN.PrimaryOutlined>*/
                  }
                </a>
                { BTN && data.scorematch === 2 && sess.status === 1 &&
                  <IconButton onClick={handleClick}>
                    <VideogameAsset fontSize="large" style={{ color: primary[600] }} />
                  </IconButton>
                  /*
                  <BTN.PrimaryOutlined onClick={handleClick}
                    startIcon={<VideogameAsset fontSize="large" style={{ color: primary[600] }} />}>
                    { API._getWord(sess && sess.language).Mini_Game }
                  </BTN.PrimaryOutlined>*/
                }
              </div>
            </div>
            <DetailComponent matchid={matchid} detail={data.message} picture={data.picture} isSupportWebp={isSupportWebp} />
            { data.reward &&
              <div>
                { data.lowgross === 1 && data.reward.lowgross &&
                  <div style={{ display: 'flex' }}>
                    <Typography variant="body1" style={{ width: 120, padding: '5px 15px', border: `1px solid ${primary[600]}`, borderRadius: 4, marginRight: 8 }}>
                      Low gross
                    </Typography>
                    <Typography variant="body1">
                      {`${data.reward.lowgross.fullname} ${data.reward.lowgross.lastname}`}
                    </Typography>
                  </div>
                }
                { data.lownet === 1 && data.reward.lownet &&
                  <div style={{ display: 'flex' }}>
                    <Typography variant="body1" style={{ width: 120, padding: '5px 15px', border: `1px solid ${primary[600]}`, borderRadius: 4, marginRight: 8 }}>
                      Low net
                    </Typography>
                    <Typography>
                      {`${data.reward.lownet.fullname} ${data.reward.lownet.lastname}`}
                    </Typography>
                  </div>
                }
                { data.booby === 1 && data.reward.booby &&
                  <div style={{ display: 'flex' }}>
                    <Typography variant="body1" style={{ width: 120, padding: '5px 15px', border: `1px solid ${primary[600]}`, borderRadius: 4, marginRight: 8 }}>
                      The last secondary
                    </Typography>
                    <Typography>
                      {`${data.reward.booby.fullname} ${data.reward.booby.lastname}`} 
                    </Typography>
                  </div>
                }
              </div>
            }
            { data ?
              ( data.mainclass && data.mainclass.length > 0 ?
                <React.Fragment>
                  <ListItem button onClick={expandHandler}
                    style={{
                      marginTop: 16,
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
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        { matchid &&
          <Link style={{ textDecoration: 'none', color: 'inherit' }} to={`/match/${matchid}/minigame/scoreboard`}>
            <MenuItem onClick={handleClose}>Scoreboard</MenuItem>
          </Link>
        }
        { matchid &&
          <Link style={{ textDecoration: 'none', color: 'inherit' }} to={`/match/${matchid}/minigame/mah`}>
            <MenuItem onClick={handleClose}>Mah</MenuItem>
          </Link>
        }
        { matchid &&
          <Link style={{ textDecoration: 'none', color: 'inherit' }} to={`/match/${matchid}/minigame/jao`}>
            <MenuItem onClick={handleClose}>Jao</MenuItem>
          </Link>
        }
      </Menu>
    </Paper >
  );
}
