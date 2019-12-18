import React from 'react';
import socketIOClient from 'socket.io-client'
import { makeStyles } from '@material-ui/core/styles'
import { primary, grey } from './../../api/palette'

import {
  Paper, Box, Typography, Button
} from '@material-ui/core';

import Skeleton from '@material-ui/lab/Skeleton';

import LocationOnIcon from '@material-ui/icons/LocationOn';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 24,
    [theme.breakpoints.up(600)]: {
      width: 300,
    },
  },
  box: {
    padding: theme.spacing(1.5)
  },
  image: {
    width: '100%',
    height: 160,
    backgroundColor: grey[300],
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    objectFit: 'cover',
    cursor: 'pointer',
  },
  title: {
    position: 'relative',
    display: '-webkit-box',
    overflow: 'hidden',
    whiteSpace: 'normal',
    textOverflow: 'ellipsis',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 2,
    lineHeight: 1.4,
    cursor: 'pointer',
    fontWeight: 600
  },
  location: {
    position: 'relative',
    display: '-webkit-box',
    overflow: 'hidden',
    whiteSpace: 'normal',
    textOverflow: 'ellipsis',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 2,
    lineHeight: 1.4,
    cursor: 'pointer',
    fontSize: 13
  },
  locationIcon: {
    position: 'relative',
    color: primary[600],
    top: 4,
    left: -4
  },

}));


export default function MatchCard(props) {
  const classes = useStyles();
  const { API, BTN, sess, token, setCSRFToken, data, setData, userid, isSupportWebp, pageOrganizer, pageData } = props

  function toggleShowAction(userto, userfrom, requestaction){
    if(sess && sess.status === 1){
      const socket = socketIOClient( API._getWebURL(), { transports: ['websocket', 'polling'] } )
      socket.emit('match-request-client-message', {
        action: 'showaction',
        matchid: data.matchid,
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
    if(BTN && data){
      switch (true) {
        case data.permission === 'host' || data.permission === 'admin':
          return (
            <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', boxSizing: 'border-box' }}>
              <BTN.NoStyleLink
                to={`/${ pageOrganizer ? `organizer/${pageData.pageid}` : 'user' }/management/match/${data.matchid}`}>
                <BTN.Primary size="small">
                  {API._getWord(sess && sess.language).Edit}
                </BTN.Primary>
              </BTN.NoStyleLink>
            </div>
          )
          break;
        case data.permission === 'pending':
          return <Button size="small" variant="outlined" disabled>Pending</Button>
          break;
        case data.permission === 'none':
          return (
            <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', padding: 16, boxSizing: 'border-box' }}>
              <BTN.Primary size="small" onClick={handleJoinMatch}>
                {API._getWord(sess && sess.language).Join}
              </BTN.Primary>
            </div>
          )
          break;
        default:
          return null
      }
    }
  }

  async function handleJoinMatch(){
    const resToken = token? token : await API._xhrGet('getcsrf')
    await API._xhrPost(
      token? token : resToken.token,
      'matchgate', {
        action: 'request',
        subaction: 'join',
        matchid: data.matchid,
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
    const sendObj = {
      action: 'upcoming'
    }

    if(userid){
      Object.assign(sendObj, { targetuser: userid });
    }

    await API._xhrPost(
      token? token : resToken.token,
      'loadusersystem' , {
        ...sendObj
    }, function(csrf, d){
      setCSRFToken(csrf)
      if(!/wrong/.test(d.status)){
        if(pageOrganizer){
          setData(d.filter( item =>{
            return item.pageid === pageData.pageid
          }))
        }else{
          setData(d)
        }
      }
    })
  }

  return(
    <Paper
      className={classes.root}
      elevation={1}>
      { ( data && data.matchphoto ) ?
        <BTN.NoStyleLink to={`/match/${data.matchid}`}>
          <img className={classes.image}
            src={API._getPictureUrl(data.matchphoto) + ( isSupportWebp? '.webp' : '.jpg' )} />
        </BTN.NoStyleLink>
        :
        /*<Skeleton disableAnimate className={classes.image} style={{ margin: 0, cursor: 'auto' }} />*/
        <img className={classes.image}
          src="https://thai-pga.com/default/match/matchcard.png" />
      }
      { data ?
        <Box className={classes.box}>
          <BTN.NoStyleLink to={`/match/${data.matchid}`}>
            <div style={{ boxSizing: 'border-box' }}>
              <Typography gutterBottom variant="h6" className={classes.title}>
                {data.matchname}
              </Typography>
              <Typography gutterBottom variant="body2"
                style={{
                  color: data.scorematch === 1 ? primary[700] : 'inherit',
                  fontWeight: data.scorematch === 1 ? 900 : 400
                }}>
                {`${
                  API._getWord(sess && sess.language).Match
                } ${
                  function(){
                    switch (data.scorematch) {
                      case 0:
                        return API._getWord(sess && sess.language).Amateur
                        break;
                      case 1:
                        return API._getWord(sess && sess.language).Professional
                        break;
                      default:
                        return API._getWord(sess && sess.language).Charity
                    }
                  }()
                }`}
              </Typography>
              <Typography gutterBottom variant="body2">
                {API._dateToString(data.matchdate)}
              </Typography>
              <Typography gutterBottom display="block" variant="body2" className={classes.location}>
                <LocationOnIcon fontSize="small" className={classes.locationIcon} />
                {data.fieldname}
              </Typography>
            </div>
          </BTN.NoStyleLink>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <BTN.NoStyleLink to={`/match/${data.matchid}`}>
              <Typography variant="caption" color="textSecondary" style={{ whiteSpace: 'nowrap' }}>
                {`${( sess && sess.language === 'TH' ) ? '' : API._shotnessNumber(data.views)} ${
                  ( sess && sess.language === 'TH' ) ?
                  `การดู ${API._shotnessNumber(data.views)} ครั้ง`
                  :
                  `view${data.views > 1? 's' : ''}`
                }`}
              </Typography>
            </BTN.NoStyleLink>
            {handleGetButton()}
          </div>
        </Box>
        :
        <Box className={classes.box}>
          <Skeleton height={25} />
          <Skeleton height={14} width="60%"/>
        </Box>
      }
    </Paper>
  );
}
