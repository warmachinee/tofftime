import React from 'react';
import socketIOClient from 'socket.io-client'
import Loadable from 'react-loadable';
import { makeStyles } from '@material-ui/core/styles';

import {
  Paper,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Avatar,

} from '@material-ui/core'

import {
  AccountCircle,
  LocationOn,

} from '@material-ui/icons';

const GoBack = Loadable({
  loader: () => import(/* webpackChunkName: "GoBack" */'./../GoBack'),
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
  avatar: {
    fontSize: 48
  },
  avatarImage: {
    width: 48,
    height: 48,
  },
  listPicture: {
    width: '20%',
    marginRight: 16,
    justifyContent: 'center'
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

}))

export default function MatchFormResult(props) {
  const classes = useStyles();
  const { API, COLOR, sess, token, setCSRFToken, isSupportWebp, handleSnackBar } = props
  const [ matchDetail, setMatchDetail ] = React.useState(null)
  const [ data, setData ] = React.useState(null)

  function getStatus(status){
    switch (true) {
      case status === 0:
        return ({
          component: (
            <Typography variant="subtitle2" style={{ color: COLOR.red[500] }}>
              { ( sess && sess.language === 'EN' ) ? "Incomplete" : 'ยังไม่อนุมัติ' }
            </Typography>
          ),
          text: ( sess && sess.language === 'EN' ) ? "Incomplete" : 'ยังไม่อนุมัติ',
          color: COLOR.red[500]
        });
        break;
      case status === 1:
        return ({
          component: (
            <Typography variant="subtitle2" style={{ color: COLOR.amber[800] }}>
              { ( sess && sess.language === 'EN' ) ? "Pending" : 'รอดำเนินการ' }
            </Typography>
          ),
          text: ( sess && sess.language === 'EN' ) ? "Pending" : 'รอดำเนินการ',
          color: COLOR.amber[500]
        });
        break;
      case status === 2:
        return ({
          component: (
            <Typography variant="subtitle2" style={{ color: COLOR.green[800] }}>
              { ( sess && sess.language === 'EN' ) ? "Complete" : 'สำเร็จ' }
            </Typography>
          ),
          text: ( sess && sess.language === 'EN' ) ? "Complete" : 'สำเร็จ',
          color: COLOR.green[500]
        });
        break;
      default:
        return ({
          component: (
            <Typography variant="subtitle2" style={{ color: COLOR.grey[800] }}>
              { ( sess && sess.language === 'EN' ) ? "None" : 'ไม่มี' }
            </Typography>
          ),
          text: ( sess && sess.language === 'EN' ) ? "None" : 'ไม่มี',
          color: COLOR.grey[500]
        });
    }
  }

  function handleResponseForm(){
    const matchid = parseInt(props.computedMatch.params.matchid)
    const socket = socketIOClient( API.getWebURL() )
    socket.on(`${matchid}-form-server-message`, (messageNew) => {
      setData(messageNew)
    })
  }

  async function handleFetchForm(){
    const resToken = token? token : await API.xhrGet('getcsrf')
    await API.xhrPost(
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
    const resToken = token? token : await API.xhrGet('getcsrf')
    await API.xhrPost(
      token? token : resToken.token,
      'loadmatchsystem', {
        action: 'userscore',
        matchid: parseInt(props.computedMatch.params.matchid),
    }, (csrf, d) =>{
      setCSRFToken(csrf)
      setMatchDetail(d)
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
            { ( sess && sess.language === 'EN' ) ? "Form" : 'รายชื่อผู้สมัคร' }
          </Typography>
          <Typography gutterBottom variant="h5">{matchDetail.title}</Typography>
          <Typography gutterBottom variant="h6" component="div" style={{ display: 'flex' }}>
            <LocationOn style={{ color: COLOR.primary[600] }} />
            {matchDetail.location} ({matchDetail.locationversion})
          </Typography>
          <Typography gutterBottom variant="subtitle2" color="textSecondary">{matchDetail.date}</Typography>
          <List disablePadding style={{ marginTop: 16 }}>
            <ListItem style={{ backgroundColor: COLOR.grey[900] }}>
              <ListItemIcon className={classes.listPicture}>
                <div className={classes.avatarImage} />
              </ListItemIcon>
              <ListItemText className={classes.listName} style={{ color: 'white' }}
                primary={ ( sess && sess.language === 'EN' ) ? "Name" : 'ชื่อ' } />
              <ListItemText className={classes.listLastname} style={{ color: 'white' }}
                primary={ ( sess && sess.language === 'EN' ) ? "Lastname" : 'นามสกุล' } />
              <ListItemText className={classes.listStatus} style={{ color: 'white' }}
                primary={ ( sess && sess.language === 'EN' ) ? "Status" : 'สถานะ' } />
            </ListItem>
          </List>
          <List disablePadding>
            { data &&
              data.map( (d, i) =>
                <React.Fragment key={i}>
                  <ListItem style={{
                      backgroundColor: d.status === 2 ? 'inherit' : COLOR.grey[200]
                    }}>
                    <ListItemIcon className={classes.listPicture}>
                      { d.photopath ?
                        <Avatar className={classes.avatarImage}
                          src={API.getPictureUrl(d.photopath) + ( isSupportWebp? '.webp' : '.jpg' ) + '#' + new Date().toISOString()} />
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
                            {API.handleGetDate(d.createdate)}
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
                            {API.handleGetDate(d.createdate)}
                          </Typography>
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
