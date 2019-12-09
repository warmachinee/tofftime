import React from 'react';
import Loadable from 'react-loadable';
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';

import {
  Button,
  Paper,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  Divider,
  Tooltip,
  IconButton,
  Dialog,

} from '@material-ui/core'

import {
  Add as AddIcon,
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

const SchedulePDF = Loadable({
  loader: () => import(/* webpackChunkName: "SchedulePDF" */'./../export/SchedulePDF'),
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
    [theme.breakpoints.up(600)]: {
      margin: '0 5%',
    },
    [theme.breakpoints.up(800)]: {
      margin: '0 72px',
    },
  },
  listTeam: {
    width: '30%',
    marginRight: 16,
    textAlign: 'center'
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
    [theme.breakpoints.down(800)]: {
      display: 'none'
    },
  },
  listNote: {
    width: '60%',
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

export default function Schedule(props) {
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

  async function handleFetchSchedule(){
    const resToken = token? token : await API._xhrGet('getcsrf')
    await API._xhrPost(
      token? token : resToken.token,
      'loadmatchsystem', {
        action: 'schedule',
        matchid: parseInt(props.computedMatch.params.matchid)
    }, (csrf, d) =>{
      setCSRFToken(csrf)
      if(/wrong/.test(d.status)){
        setData(d)
      }else{
        setData(d.userscore)
      }
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
      if(d.team && d.team.length > 0){
        setMatchDetail(d)
        document.title = `( Schedule ) ${d.title} - T-off Time`
        handleFetchSchedule()
      }else{
        handleSnackBar({
          state: true,
          message: 'This match has no schedule.',
          variant: 'error',
          autoHideDuration: 2000
        })
        setTimeout(()=>{
          window.location.replace(`/match/${props.computedMatch.params.matchid}`);
        }, 2000)
      }
    })
  }

  React.useEffect(()=>{
    if(props.computedMatch && props.computedMatch.params.matchid){
      handleFetchMatchDetail()
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
      { ( props.computedMatch && data && matchDetail ) ?
        ( !/wrong/.test(data.status) ?
          <React.Fragment>
            { matchDetail &&
              <div className={classes.content}>
                <Typography gutterBottom variant="h4">
                  { API._getWord(sess && sess.language).Schedule }
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
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  { data &&
                    <SchedulePDF {...props} data={data} matchDetail={matchDetail} />
                  }
                </div>
                <List disablePadding style={{ marginTop: 16 }}>
                  <ListItem style={{ backgroundColor: COLOR.grey[900], paddingTop: 12, paddingBottom: 12 }}>
                    <ListItemText className={classes.listTeam} style={{ color: 'white' }}
                      primary={ API._getWord(sess && sess.language).Team } />
                    <ListItemText className={classes.listTime} style={{ color: 'white' }}
                      primary={ API._getWord(sess && sess.language).Time } />
                    <ListItemText className={classes.listName} style={{ color: 'white' }}
                      primary={ API._getWord(sess && sess.language).First_name } />
                    <ListItemText className={classes.listLastname} style={{ color: 'white' }}
                      primary={ API._getWord(sess && sess.language).Last_name } />
                    { window.innerWidth >= 600 &&
                      <ListItemText className={classes.listNote} style={{ color: 'white' }}
                        primary={ API._getWord(sess && sess.language).Note } />
                    }
                  </ListItem>
                </List>
                <List disablePadding>
                  { data ?
                    ( data.filter( item =>{ return item.teamno !== 0 }).length > 0 ?
                      data.filter( item =>{ return item.teamno !== 0 }).map( (d, i) =>
                        <React.Fragment key={i}>
                          <ListItem style={{
                              backgroundColor: d.teamno % 2 === 1 ? 'inherit' : COLOR.grey[200]
                            }}>
                            <ListItemText className={classes.listTeam} primary={ d.teamno !== 0 ? d.teamno : '-'} />
                            <ListItemText
                              className={classes.listTime}
                              primary={
                              d.teamno === 0 ?
                              '-'
                              :
                              matchDetail.team.filter( item =>{
                                return item.teamno === d.teamno
                              }).map( md => md.teamname )
                            }
                            secondary={
                              window.innerWidth < 600 &&
                              <React.Fragment>
                                {
                                  d.teamno === 0 ?
                                  '-'
                                  :
                                  matchDetail.team.filter( item =>{
                                    return item.teamno === d.teamno
                                  }).map( md => md.note )
                                }
                              </React.Fragment>
                            } />
                            <ListItemText
                              className={classes.listName}
                              primary={
                                <Typography className={classes.name} variant="body2" component="div" style={{ display: 'flex' }}>
                                  {d.fullname}
                                  <div style={{ width: 16 }} />
                                  { (window.innerWidth >= 600 && window.innerWidth < 800) ? d.lastname : ''}
                                </Typography>
                              }
                              secondary={
                                <React.Fragment>
                                  { window.innerWidth < 600 &&
                                    <Typography className={classes.name} variant="body2">
                                      {d.lastname}
                                    </Typography>
                                  }
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
                            { window.innerWidth >= 600 &&
                              <ListItemText
                                className={classes.listNote}
                                primary={
                                d.teamno === 0 ?
                                '-'
                                :
                                matchDetail.team.filter( item =>{
                                  return item.teamno === d.teamno
                                }).map( md => md.note )
                              } />
                            }
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
          </React.Fragment>
          :
          <div>
            <h3 style={{ textAlign: 'center', fontSize: 28 , marginTop: 72 }}>
              { API._getWord(sess && sess.language)['This match is over'] }
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
        { matchDetail &&
          <CourseScorecard {...props} field={matchDetail} />
        }
      </Dialog>
    </Paper>
  );
}
