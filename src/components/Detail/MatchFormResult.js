import React from 'react';
import socketIOClient from 'socket.io-client'
import Loadable from 'react-loadable';
import { makeStyles } from '@material-ui/core/styles';

import {
  Button,
  Paper,
  Typography,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Avatar,
  Tooltip,
  IconButton,
  Dialog,

} from '@material-ui/core'

import {
  Add as AddIcon,
  AccountCircle,
  LocationOn,
  Close as CloseIcon,

} from '@material-ui/icons';

import { LDCircular } from './../loading/LDCircular'

const GoBack = Loadable({
  loader: () => import(/* webpackChunkName: "GoBack" */'./../Utils/GoBack'),
  loading: () => null
});

const LabelText = Loadable({
  loader: () => import(/* webpackChunkName: "LabelText" */'./../Utils/LabelText'),
  loading: () => <LDCircular />
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
  avatar: {
    fontSize: 48
  },
  avatarImage: {
    width: 48,
    height: 48,
  },
  listPicture: {
    width: '10%',
    marginRight: 16,
    justifyContent: 'center'
  },
  listIndex: {
    width: 75,
    marginRight: 16,
    textAlign: 'right'
  },
  listTime: {
    width: '60%',
    marginRight: 16,
    textAlign: 'center'
  },
  listName: {
    width: '100%'
  },
  listLastname: {
    width: '100%',
    [theme.breakpoints.down(700)]: {
      display: 'none'
    },
  },
  listStatus: {
    width: '30%',
    [theme.breakpoints.down(500)]: {
      display: 'none'
    },
  },
  name: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
  paperWidthSm: {
    maxWidth: 700
  },

}))

export default function MatchFormResult(props) {
  const classes = useStyles();
  const { API, COLOR, sess, token, setCSRFToken, isSupportWebp, handleSnackBar } = props
  const [ matchDetail, setMatchDetail ] = React.useState(null)
  const [ data, setData ] = React.useState(null)
  const [ scorecardState, setScorecardState ] = React.useState(false);

  const handleScorecardOpen = () => {
    setScorecardState(true);
  };

  const handleScorecardClose = value => {
    setScorecardState(false);
  };

  function getStatus(status){
    switch (true) {
      case status === 0:
        return ({
          component: (
            <Typography variant="subtitle2" style={{ color: COLOR.red[500] }}>
              { API._getWord(sess && sess.language).Incomplete }
            </Typography>
          ),
          text: API._getWord(sess && sess.language).Incomplete,
          color: COLOR.red[500]
        });
        break;
      case status === 1:
        return ({
          component: (
            <Typography variant="subtitle2" style={{ color: COLOR.amber[800] }}>
              { API._getWord(sess && sess.language).Pending }
            </Typography>
          ),
          text: API._getWord(sess && sess.language).Pending,
          color: COLOR.amber[500]
        });
        break;
      case status === 2:
        return ({
          component: (
            <Typography variant="subtitle2" style={{ color: COLOR.green[800] }}>
              { API._getWord(sess && sess.language).Complete }
            </Typography>
          ),
          text: API._getWord(sess && sess.language).Complete,
          color: COLOR.green[500]
        });
        break;
      default:
        return ({
          component: (
            <Typography variant="subtitle2" style={{ color: COLOR.grey[800] }}>
              { API._getWord(sess && sess.language).None }
            </Typography>
          ),
          text: API._getWord(sess && sess.language).None,
          color: COLOR.grey[500]
        });
    }
  }

  function handleResponseForm(){
    const matchid = parseInt(props.computedMatch.params.matchid)
    const socket = socketIOClient( API._getWebURL(), { transports: ['websocket', 'polling'] } )
    socket.on(`${matchid}-form-server-message`, (messageNew) => {
      setData(messageNew)
    })
  }

  async function handleFetchForm(){
    const resToken = token? token : await API._xhrGet('getcsrf')
    await API._xhrPost(
      token? token : resToken.token,
      'loadmatchsystem', {
        action: 'form',
        matchid: parseInt(props.computedMatch.params.matchid)
    }, (csrf, d) =>{
      setCSRFToken(csrf)
      setData(d.resultform)
    })
  }

  async function handleFetchMatchDetail(){
    const resToken = token? token : await API._xhrGet('getcsrf')
    await API._xhrPost(
      token? token : resToken.token,
      'loadmatchsystem', {
        action: 'userscore',
        matchid: parseInt(props.computedMatch.params.matchid),
        mainclass: 1
    }, (csrf, d) =>{
      setCSRFToken(csrf)
      setMatchDetail(d)
      document.title = `(Form) ${d.title} - T-off Time`
    })
    await handleFetchForm()
  }

  React.useEffect(()=>{
    if(props.computedMatch && props.computedMatch.params.matchid){
      handleFetchMatchDetail()
      handleResponseForm()
    }
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

  return (
    <Paper className={classes.root}>
      <GoBack />
      { matchDetail &&
        <div className={classes.content}>
          <Typography gutterBottom variant="h4">
            { API._getWord(sess && sess.language).Form }
          </Typography>
          <Typography gutterBottom variant="h4">{matchDetail.title}</Typography>
          <div style={{ display: 'flex', flexWrap: 'wrap', marginBottom: '.75em' }}>
            <Typography variant="h6">
              {API._dateToString(matchDetail.date)}
            </Typography>
            <Typography variant="h6" style={{ marginLeft: 12, marginRight: 12 }}>|</Typography>
            <Button variant="text" onClick={handleScorecardOpen} style={{ padding: 0 }}>
              <LocationOn style={{ color: COLOR.primary[600], marginRight: 4 }} />
              <Typography variant="h6">
                {matchDetail.location}
              </Typography>
            </Button>
          </div>
          { data &&
            <Typography variant="body1" align="right"
              style={{ marginBottom: 8, marginTop: 'auto', marginRight: 8 }}>
              { ( sess && sess.language === 'TH' ) ?
                `ผู้เล่น ${data.filter(item =>{ return item.display === 1 }).length} คน`
                :
                `${data.filter(item =>{ return item.display === 1 }).length} player${data.filter(item =>{ return item.display === 1 }).length > 1? 's' : ''}`
              }
            </Typography>
          }
          <List disablePadding>
            <ListItem style={{ backgroundColor: COLOR.grey[900] }}>
              <ListItemText className={classes.listIndex} style={{ color: 'white' }} primary="#" />
              <ListItemIcon className={classes.listPicture}>
                <div className={classes.avatarImage} />
              </ListItemIcon>
              <ListItemText className={classes.listName} style={{ color: 'white' }}
                primary={ API._getWord(sess && sess.language).First_name } />
              <ListItemText className={classes.listLastname} style={{ color: 'white' }}
                primary={ API._getWord(sess && sess.language).Last_name } />
              <ListItemText className={classes.listStatus} style={{ color: 'white' }}
                primary={ API._getWord(sess && sess.language).Status } />
            </ListItem>
          </List>
          <List disablePadding>
            { data ?
              ( data.filter(item =>{ return item.display === 1 }).length > 0 ?
                data.filter(item =>{ return item.display === 1 }).map( (d, i) =>
                  <React.Fragment key={i}>
                    <ListItem style={{
                        backgroundColor: d.status === 2 ? 'inherit' : COLOR.grey[200]
                      }}>
                      <ListItemText className={classes.listIndex} primary={i + 1} />
                      <ListItemIcon className={classes.listPicture}>
                        { d.photopath ?
                          <Avatar className={classes.avatarImage}
                            src={API._getPictureUrl(d.photopath) + ( isSupportWebp? '.webp' : '.jpg' ) + '#' + new Date().toISOString()} />
                          :
                          <AccountCircle classes={{ root: classes.avatar }} />
                        }
                      </ListItemIcon>
                      <ListItemText
                        className={classes.listName}
                        primary={
                          <Typography className={classes.name} variant="body2" component="div" style={{ display: 'flex' }}>
                            {d.fullname}
                            { (window.innerWidth >= 500 && window.innerWidth < 700) ? <div style={{ width: 16 }} /> : '' }
                            { (window.innerWidth >= 500 && window.innerWidth < 700) ? d.lastname : '' }
                          </Typography>
                        }
                        secondary={
                          window.innerWidth < 500 &&
                          <React.Fragment>
                            <Typography className={classes.name} variant="body2" component="span" color="textPrimary">
                              {d.lastname}
                            </Typography>
                            <br></br>
                            <Typography
                              variant="caption"
                              style={{ color: getStatus(d.status).color }}>
                              {getStatus(d.status).text}
                            </Typography>
                            <Typography variant="caption" display="block" style={{ color: COLOR.grey[500] }}>
                              {API._dateToString(d.createdate)}
                            </Typography>
                          </React.Fragment>
                        } />
                      <ListItemText
                        className={classes.listLastname}
                        primary={
                          <React.Fragment>
                            <Typography className={classes.name} variant="body2">
                              {d.lastname}
                            </Typography>
                          </React.Fragment>
                        } />
                      <ListItemText className={classes.listStatus}
                        primary={ window.innerWidth >= 500 && getStatus(d.status).component}
                        secondary={
                          window.innerWidth >= 500 && d.createdate &&
                            <Typography variant="caption" display="block" style={{ color: COLOR.grey[500] }}>
                              {API._dateToString(d.createdate)}
                            </Typography>
                        } />
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                )
                :
                <Typography component="div" style={{ width: '100%' }}>
                  <Box style={{ textAlign: 'center', color: COLOR.primary[900] }} fontWeight={500} fontSize={24} m={1}>
                    { API._getWord(sess && sess.language).No_player }
                  </Box>
                </Typography>
              )
              :
              <LDCircular />
            }
          </List>
        </div>
      }
      <Dialog classes={{ paperWidthSm: classes.paperWidthSm }} onClose={handleScorecardClose} open={scorecardState}>
        <LabelText text="Golf Scorecard" />
        <IconButton onClick={handleScorecardClose} style={{ position: 'absolute', top: 8, right: 8 }}>
          <CloseIcon />
        </IconButton>
        { matchDetail &&
          <CourseScorecard {...props} field={matchDetail} />
        }
      </Dialog>
    </Paper>
  );
}
