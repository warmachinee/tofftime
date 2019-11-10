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
    height: window.innerWidth * .45,
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

}));

function DetailComponent(props){
  const { detail } = props

  return(
    <div className="ql-container ql-snow">
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

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function handleJoinMatch(){
    if(sess && sess.status === 1){
      const socket = socketIOClient( API._getWebURL() )
      socket.emit('match-request-client-message', {
        action: 'join',
        matchid: matchid,
        userid: sess.userid,
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
            <BTN.NoStyleLink to={`/user/management/match/${matchid}`}>
              <BTN.Primary style={{ padding: '4px 16px' }}>Edit</BTN.Primary>
            </BTN.NoStyleLink>
          )
          break;
        case data.permission === 'pending':
          return (<Button disabled>Pending</Button>)
          break;
        case data.permission === 'none':
          return (<BTN.Primary style={{ padding: '4px 16px' }} onClick={handleJoinMatch}>Join</BTN.Primary>)
          break;
        default:
          return null
      }
    }
  }

  function expandHandler(){
    setExpanded(!expanded)
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
      { data &&
        <div className={classes.content}>
          <Tooltip title={data?data.title:'Match Title'} placement="top-start">
            <Typography variant="h4">
              {data?data.title:'Match Title'}
            </Typography>
          </Tooltip>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '.35em' }}>
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
            <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
              {handleGetButton()}
            </div>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', marginBottom: '.75em' }}>
            <Typography variant="h6">
              {data?API._dateToString(data.date):'date'}
            </Typography>
            <Typography variant="h6" style={{ marginLeft: 12, marginRight: 12 }}>|</Typography>
            <LocationOn style={{ color: primary[600], marginRight: 4 }} />
            <Typography variant="h6">
              {data?data.location:'Location'} {data? '(' + data.locationversion + ')':''}
            </Typography>
          </div>
          <div style={{ display: 'flex' }}>
            { matchid &&
              <BTN.NoStyleLink to={`/matchform/${matchid}`}>
                <BTN.PrimaryOutlined>{ ( sess && sess.language === 'TH' ) ? "รายชื่อผู้สมัคร" : 'Form' }</BTN.PrimaryOutlined>
              </BTN.NoStyleLink>
            }
            { data.team &&
              ( data.team.length === 0 ?
                <BTN.PrimaryText disabled>
                  { ( sess && sess.language === 'TH' ) ? "ตารางการแข่งขัน" : 'Schedule' }
                </BTN.PrimaryText>
                :
                <BTN.NoStyleLink to={`/schedule/${matchid}`}>
                  <BTN.PrimaryOutlined>
                    { ( sess && sess.language === 'TH' ) ? "ตารางการแข่งขัน" : 'Schedule' }
                  </BTN.PrimaryOutlined>
                </BTN.NoStyleLink>
              )
            }
            <div style={{ flex: 1 }} />
            { BTN && data.scorematch === 2 &&
              <BTN.PrimaryOutlined onClick={handleClick}>
                { ( sess && sess.language === 'TH' ) ? "มินิเกม" : 'Mini Game' }
              </BTN.PrimaryOutlined>
            }
          </div>
          <div className={classes.imageGrid}>
            { data.picture &&
              <img align="left" className={classes.image}
                src={API._getPictureUrl(data.picture) + ( isSupportWebp? '.webp' : '.jpg' )} />
            }
          </div>
          <div style={{ marginTop: 16 }}>
            { data.scorematch === 0 && data.mainclass && data.mainclass.length > 0 &&
              data.mainclass[parseInt(mainClassSelected) - 1].values.map( (d, i) =>{
                if(i === data.mainclass[parseInt(mainClassSelected) - 1].values.length - 1 ){
                  return(
                    <div style={{ display: 'flex' }} key={d.classno}>
                      <Typography style={{ fontWeight: 600, marginRight: 12 }} variant="body1">
                        Flight {API._handleAmateurClass(d.classno)}
                      </Typography>
                      <Typography>
                        handicap {d.classname} - up
                      </Typography>
                    </div>
                  )
                }else{
                  return (
                    <div style={{ display: 'flex' }} key={d.classno}>
                      <Typography style={{ fontWeight: 600, marginRight: 12 }} variant="body1">
                        Flight {API._handleAmateurClass(d.classno)}
                      </Typography>
                      <Typography>
                        handicap {d.classname} - {parseInt(data.mainclass[parseInt(mainClassSelected) - 1].values[i + 1].classname) - 1}
                      </Typography>
                    </div>
                  )
                }
              })
            }
          </div>
          <DetailComponent detail={data.message} />
          <ListItem button onClick={expandHandler}
            style={{
              marginTop: 16,
              boxShadow: '0px 1px 3px 0px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 2px 1px -1px rgba(0,0,0,0.12)'
            }}>
            <ListItemText primary={ ( sess && sess.language === 'TH' ) ? "ตารางคะแนน" : 'Scoreboard' } />
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
            { data.mainclass && data.mainclass.length > 0 && userscore &&
              <Scoreboard {...props} matchClass={data.mainclass[parseInt(mainClassSelected) - 1].values} />
            }
          </Collapse>
        </div>
      }
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        { matchid && BTN &&
          <Link style={{ textDecoration: 'none', color: 'inherit' }} to={`/match/${matchid}/minigame/scoreboard`}>
            <MenuItem onClick={handleClose}>Scoreboard</MenuItem>
          </Link>
        }
        { matchid && BTN &&
          <Link style={{ textDecoration: 'none', color: 'inherit' }} to={`/match/${matchid}/minigame/mah`}>
            <MenuItem onClick={handleClose}>Mah</MenuItem>
          </Link>
        }
        { matchid && BTN &&
          <Link style={{ textDecoration: 'none', color: 'inherit' }} to={`/match/${matchid}/minigame/jao`}>
            <MenuItem onClick={handleClose}>Jao</MenuItem>
          </Link>
        }
      </Menu>
    </Paper >
  );
}
