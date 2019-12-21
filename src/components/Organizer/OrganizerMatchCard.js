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


export default function OrganizerMatchCard(props) {
  const classes = useStyles();
  const { API, BTN, sess, token, setCSRFToken, handleSnackBar, data, setData, isSupportWebp, pageOrganizer, pageData, pageid } = props

  function toggleShowAction(userto, userfrom, requestaction){
    if(sess && sess.status === 1){
      const socket = socketIOClient( API._getWebURL(), { transports: ['websocket', 'polling'] } )
      socket.emit('match-request-client-message', {
        action: 'showaction',
        matchid: data.messagedetail.matchid,
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
    if(BTN && data && data.messagedetail.matchstatus === 0){
      return (
        <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', boxSizing: 'border-box' }}>
          {function() {
            switch (true) {
              case data.messagedetail.permission === 'host' || data.messagedetail.permission === 'admin':
                return (
                  <BTN.NoStyleLink to={
                      pageOrganizer ?
                      `/organizer/${pageData.pageid}/management/match/${data.messagedetail.matchid}`
                      :
                      `/user/management/match/${data.messagedetail.matchid}`
                    }>
                    <BTN.Primary size="small">Edit</BTN.Primary>
                  </BTN.NoStyleLink>
                )
                break;
              case data.messagedetail.permission === 'pending':
                return <Button size="small" variant="outlined" disabled>Pending</Button>
                break;
              case data.messagedetail.permission === 'none':
                return <BTN.Primary size="small" onClick={handleJoinMatch}>Join</BTN.Primary>
                break;
              default:
                return null
            }
          }()}
        </div>
      )
    }
  }

  async function handleJoinMatch(){
    const resToken = token? token : await API._xhrGet('getcsrf')
    await API._xhrPost(
      token? token : resToken.token,
      'matchgate', {
        action: 'request',
        subaction: 'join',
        matchid: data.messagedetail.matchid,
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
      'mloadpage' , {
        action: 'postlist',
        pageid: pageOrganizer ? pageData.pageid : pageid,
        type: 'match'
    }, function(csrf, d){
      setCSRFToken(csrf)
      setData(d)
    })
  }

  return(
    <Paper
      className={classes.root}
      elevation={1}>
      { data && data.messagedetail ?
        <BTN.NoStyleLink to={`/match/${data.messagedetail.matchid}`}>
          { data.messagedetail.photopath ?
            <img className={classes.image}
              src={API._getPictureUrl(data.messagedetail.photopath) + ( isSupportWebp? '.webp' : '.jpg' )} />
            :
            <img className={classes.image}
              src="https://thai-pga.com/default/match/matchcard.png" />
          }
        </BTN.NoStyleLink>
        :
        /*<Skeleton disableAnimate className={classes.image} style={{ margin: 0, cursor: 'auto' }} />*/
        <img className={classes.image}
          src="https://thai-pga.com/default/match/matchcard.png" />
      }
      { ( data && data.messagedetail ) ?
        <Box className={classes.box}>
          <BTN.NoStyleLink to={`/match/${data.messagedetail.matchid}`}>
            <div style={{ boxSizing: 'border-box' }}>
              <Typography gutterBottom variant="h6" className={classes.title}>
                {data.messagedetail.matchname}
              </Typography>
              <Typography gutterBottom variant="body2"
                style={{
                  color: data.messagedetail.scorematch === 1 ? primary[700] : 'inherit',
                  fontWeight: data.messagedetail.scorematch === 1 ? 900 : 400
                }}>
                {`${
                  API._getWord(sess && sess.language).Match
                } ${
                  function(){
                    switch (data.messagedetail.scorematch) {
                      case 0:
                        return API._getWord(sess && sess.language).Amateur_match
                        break;
                      case 1:
                        return API._getWord(sess && sess.language).Professional_match
                        break;
                      default:
                        return API._getWord(sess && sess.language).Charity_match
                    }
                  }()
                }`}
              </Typography>
              <Typography gutterBottom variant="body2">
                {API._dateToString(data.messagedetail.matchdate)}
              </Typography>
              <Typography gutterBottom display="block" variant="body2" className={classes.location}>
                <LocationOnIcon fontSize="small" className={classes.locationIcon} />
                {data.messagedetail.fieldname}
              </Typography>
            </div>
          </BTN.NoStyleLink>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <BTN.NoStyleLink to={`/match/${data.messagedetail.matchid}`}>
              <Typography variant="caption" color="textSecondary" style={{ whiteSpace: 'nowrap' }}>
                {`${( sess && sess.language === 'TH' ) ? '' : API._shotnessNumber(data.messagedetail.views)} ${
                  ( sess && sess.language === 'TH' ) ?
                  `การดู ${API._shotnessNumber(data.messagedetail.views)} ครั้ง`
                  :
                  `view${data.messagedetail.views > 1? 's' : ''}`
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
