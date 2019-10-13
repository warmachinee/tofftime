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
            { ( sess && sess.language === 'TH' ) ? "ตารางการแข่งขัน" : 'Schedule' }
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
                primary={ ( sess && sess.language === 'TH' ) ? "ทีม" : 'Team' } />
              <ListItemText className={classes.listTime} style={{ color: 'white' }}
                primary={ ( sess && sess.language === 'TH' ) ? "เวลา" : 'Time' } />
              <ListItemText className={classes.listName} style={{ color: 'white' }}
                primary={ ( sess && sess.language === 'TH' ) ? "ชื่อ" : 'Name' } />
              <ListItemText className={classes.listLastname} style={{ color: 'white' }}
                primary={ ( sess && sess.language === 'TH' ) ? "นามสกุล" : 'Lastname' } />
              { window.innerWidth >= 600 &&
                <ListItemText className={classes.listNote} style={{ color: 'white' }}
                  primary={ ( sess && sess.language === 'TH' ) ? "หมายเหตุ" : 'Note' } />
              }
            </ListItem>
          </List>
          <List disablePadding>
            { data &&
              data.filter( item =>{
                return item.teamno !== 0
              }).map( (d, i) =>
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
            }
          </List>
        </div>
      }
    </Paper>
  );
}
