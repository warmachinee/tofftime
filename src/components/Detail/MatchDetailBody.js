import React from 'react';
import socketIOClient from 'socket.io-client'
import Loadable from 'react-loadable';
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

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import LocationOnIcon from '@material-ui/icons/LocationOn';

import { LDCircular } from './../loading/LDCircular'

const Scoreboard = Loadable({
  loader: () => import(/* webpackChunkName: "Scoreboard" */'./Scoreboard'),
  loading: () => <LDCircular />
});

const GoBack = Loadable({
  loader: () => import(/* webpackChunkName: "GoBack" */'./../GoBack'),
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
  title: {
    color: primary[900],
    fontWeight: 600,
    fontVariant: 'petite-caps',
    overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis',
  },
  date: {
    fontStyle: 'oblique',
    paddingBottom: 8
  },
  location: {
    marginLeft: 4,
    marginTop: 4,
    fontWeight: 600,
    color: primary[800],
    overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis',
  },
  locationIcon: {
    fontSize: 24,
    marginLeft: -8,
    color: primary[600],
    '&:hover': {
      color: primary[800],
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

function MatchDetailBody(props) {
  const classes = useStyles();
  const { BTN, sess, data, userscore, matchid, token, setCSRFToken, isSupportWebp } = props
  const [ expanded, setExpanded ] = React.useState(true)
  const [ matchDetail, setMatchDetail ] = React.useState(null)
  const [ joinStatus, setJoinStatus ] = React.useState(false)
  const [ anchorEl, setAnchorEl ] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function handleJoinMatch(){
    if(sess && sess.status === 1){
      const socket = socketIOClient( API.getWebURL() )
      socket.emit('match-request-client-message', {
        action: 'join',
        matchid: matchid,
        userid: sess.userid,
      })
      setTimeout(()=>{
        setJoinStatus(true)
      }, 1000)
    }else{
      window.location.pathname = '/login'
    }
  }

  function handleGetButton(){
    if(BTN && data && data.status === 0){
      switch (true) {
        case data.permission === 'host' || data.permission === 'admin':
          return (
            <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', padding: 16, paddingTop: 0, boxSizing: 'border-box' }}>
              <BTN.NoStyleLink to={`/user/management/match/${matchid}`}>
                <BTN.Primary style={{ padding: '4px 16px' }}>Edit</BTN.Primary>
              </BTN.NoStyleLink>
            </div>
          )
          break;
        case data.permission === 'none':
          return (
            <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', padding: 16, boxSizing: 'border-box' }}>
              { joinStatus?
                <Button disabled>Join</Button>
                :
                <BTN.Primary style={{ padding: '4px 16px' }} onClick={handleJoinMatch}>Join</BTN.Primary>
              }
            </div>
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

  return (
    <Paper className={classes.root}>
      <GoBack />

      {/*--------------------Content--------------------*/}
      <div className={classes.content}>
        {/*--------------------Match Attribute--------------------*/}
        <React.Fragment>
          <Tooltip gutterBottom title={data?data.title:'Match Title'} placement="top-start">
            <Typography classes={{ root: classes.title }} variant="h5">
              {data?data.title:'Match Title'}
            </Typography>
          </Tooltip>
          {handleGetButton()}
          <Typography gutterBottom variant="h6" color="textSecondary">
            { data &&
              function(){
                switch (data.scorematch) {
                  case 0:
                    return 'Charity'
                    break;
                  case 1:
                    return 'Professional'
                    break;
                  default:
                    return 'Amateur'
                }
              }()
            }
          </Typography>
          <div style={{ display: 'flex' }}>
            { BTN && data && data.team && data.team.length > 0 &&
              <BTN.NoStyleLink to={`/schedule/${matchid}`}>
                <BTN.PrimaryText>{ ( sess && sess.language === 'TH' ) ? "ตารางการแข่งขัน" : 'Schedule' }</BTN.PrimaryText>
              </BTN.NoStyleLink>
            }
            { matchid && BTN &&
              <BTN.NoStyleLink to={`/matchform/${matchid}`}>
                <BTN.PrimaryText>{ ( sess && sess.language === 'TH' ) ? "รายชื่อผู้สมัคร" : 'Form' }</BTN.PrimaryText>
              </BTN.NoStyleLink>
            }
            <div style={{ flex: 1 }} />
            { BTN &&
              <BTN.PrimaryText onClick={handleClick}>{ ( sess && sess.language === 'TH' ) ? "มินิเกม" : 'Mini Game' }</BTN.PrimaryText>
            }
          </div>
          <Typography component="div">
            <Box className={classes.date} fontFamily="Monospace">
              {data?data.date:'date'}
            </Box>
          </Typography>
          <Typography gutterBottom component="div" style={{ display: 'flex' }}>
            <LocationOnIcon className={classes.locationIcon} />
            <Box className={classes.location} >
              {data?data.location:'Location'} {data? '(' + data.locationversion + ')':''}
            </Box>
          </Typography>
          <div className={classes.imageGrid}>
            { data && data.picture &&
              <img align="left" className={classes.image}
                src={API.getPictureUrl(data.picture) + ( isSupportWebp? '.webp' : '.jpg' )} />
            }
          </div>
          <div style={{ marginTop: 16 }}>
            { data && data.scorematch === 0 && data.class &&
              data.class.map( (d, i) =>{
                if(i === data.class.length - 1 ){
                  return(
                    <div style={{ display: 'flex' }} key={d.classno}>
                      <Typography style={{ fontWeight: 600, marginRight: 12 }} variant="body1">
                        Flight {API.handleAmateurClass(d.classno)}
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
                        Flight {API.handleAmateurClass(d.classno)}
                      </Typography>
                      <Typography>
                        handicap {d.classname} - {parseInt(data.class[i + 1].classname) - 1}
                      </Typography>
                    </div>
                  )
                }
              })
            }
          </div>
          {/*--------------------End Match Attribute--------------------*/}
        </React.Fragment>
        {/*--------------------End Match Attribute--------------------*/}
        <React.Fragment>
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
            { data && userscore &&
              <Scoreboard {...props} matchClass={data && data.class} />
            }
          </Collapse>
        </React.Fragment>
      </div>
      {/*--------------------End Content--------------------*/}
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
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
export default MatchDetailBody;
