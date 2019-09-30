import React from 'react';
import Loadable from 'react-loadable';
import { makeStyles } from '@material-ui/core/styles';

import {
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,

} from '@material-ui/core'

import {
  LocationOn,

} from '@material-ui/icons';

const GoBack = Loadable({
  loader: () => import(/* webpackChunkName: "GoBack" */'./../GoBack'),
  loading: () => null
});

const SchedulePDF = Loadable({
  loader: () => import(/* webpackChunkName: "SchedulePDF" */'./../export/SchedulePDF'),
  loading: () => null
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
    [theme.breakpoints.down(700)]: {
      display: 'none'
    },
  },
  name: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },

}))

export default function Schedule(props) {
  const classes = useStyles();
  const { API, COLOR, sess, token, setCSRFToken, isSupportWebp, handleSnackBar } = props
  const [ matchDetail, setMatchDetail ] = React.useState(null)
  const [ data, setData ] = React.useState(null)

  async function handleFetchSchedule(){
    const resToken = token? token : await API.xhrGet('getcsrf')
    await API.xhrPost(
      token? token : resToken.token,
      'loadmatchsystem', {
        action: 'schedule',
        matchid: parseInt(props.computedMatch.params.matchid)
    }, (csrf, d) =>{
      setCSRFToken(csrf)
      setData(d.userscore)
    })
  }

  async function handleFetchMatchDetail(){
    const resToken = token? token : await API.xhrGet('getcsrf')
    await API.xhrPost(
      token? token : resToken.token,
      'loadmatchsystem', {
        action: 'userscore',
        matchid: parseInt(props.computedMatch.params.matchid),
    }, (csrf, d) =>{
      setCSRFToken(csrf)
      if(d.team && d.team.length > 0){
        setMatchDetail(d)
        handleFetchSchedule()
      }else{
        handleSnackBar({
          state: true,
          message: 'This match has no schedule.',
          variant: 'error',
          autoHideDuration: 2000
        })
        consol
        setTimeout(()=>{
          window.location.href = `/match/${props.computedMatch.params.matchid}`
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
      { matchDetail &&
        <div className={classes.content}>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            { data &&
              <SchedulePDF {...props} data={data} matchDetail={matchDetail} />
            }
          </div>
          <Typography gutterBottom variant="h4">
            { ( sess && sess.language === 'EN' ) ? "Schedule" : 'ตารางการแข่งขัน' }
          </Typography>
          <Typography gutterBottom variant="h5">{matchDetail.title}</Typography>
          <Typography gutterBottom variant="h6" component="div" style={{ display: 'flex' }}>
            <LocationOn style={{ color: COLOR.primary[600] }} />
            {matchDetail.location} ({matchDetail.locationversion})
          </Typography>
          <Typography gutterBottom variant="subtitle2" color="textSecondary">{matchDetail.date}</Typography>
          <List disablePadding style={{ marginTop: 16 }}>
            <ListItem style={{ backgroundColor: COLOR.grey[900], paddingTop: 12, paddingBottom: 12 }}>
              <ListItemText className={classes.listTeam} style={{ color: 'white' }}
                primary={ ( sess && sess.language === 'EN' ) ? "Team" : 'ทีม' } />
              <ListItemText className={classes.listTime} style={{ color: 'white' }}
                primary={ ( sess && sess.language === 'EN' ) ? "Time" : 'เวลา' } />
              <ListItemText className={classes.listName} style={{ color: 'white' }}
                primary={ ( sess && sess.language === 'EN' ) ? "Name" : 'ชื่อ' } />
              <ListItemText className={classes.listLastname} style={{ color: 'white' }}
                primary={ ( sess && sess.language === 'EN' ) ? "Lastname" : 'นามสกุล' } />
            </ListItem>
          </List>
          <List disablePadding>
            { data &&
              data.map( (d, i) =>
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
                    } />
                    <ListItemText
                      className={classes.listName}
                      primary={
                        <Typography className={classes.name} variant="body2" component="div" style={{ display: 'flex' }}>
                          {d.fullname}
                          <div style={{ width: 16 }} />
                          { (window.innerWidth >= 500 && window.innerWidth < 700) ? d.lastname : ''}
                        </Typography>
                      }
                      secondary={
                        <Typography className={classes.name} variant="body2">
                          { window.innerWidth < 500 ? d.lastname : ''}
                        </Typography>
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
                  </ListItem>
                  <Divider />
                </React.Fragment>
              )
            }
          </List>
        </div>
      }
    </Paper>
  );
}
