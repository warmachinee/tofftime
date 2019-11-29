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
  const { API, BTN, sess, token, setCSRFToken, data, setData, isSupportWebp, pageOrganizer, pageData, pageid } = props

  function handleJoinMatch(){
    if(sess && sess.status === 1){
      const socket = socketIOClient( API._getWebURL(), { transports: ['websocket', 'polling'] } )
      socket.emit('match-request-client-message', {
        action: 'join',
        matchid: data.messagedetail.matchid,
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
    if(BTN && data && data.messagedetail.matchstatus === 0){
      return (
        <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', padding: 16, boxSizing: 'border-box' }}>
          {function() {
            switch (true) {
              case data.messagedetail.permission === 'host' || data.messagedetail.permission === 'admin':
                return (
                  <BTN.NoStyleLink to={`/user/management/match/${data.messagedetail.matchid}`}>
                    <BTN.Primary style={{ padding: '4px 16px' }}>Edit</BTN.Primary>
                  </BTN.NoStyleLink>
                )
                break;
              case data.messagedetail.permission === 'pending':
                return <Button disabled>Pending</Button>
                break;
              case data.messagedetail.permission === 'none':
                return <BTN.Primary style={{ padding: '4px 16px' }} onClick={handleJoinMatch}>Join</BTN.Primary>
                break;
              default:
                return null
            }
          }()}
        </div>
      )
    }
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
      { ( data.messagedetail && data.messagedetail.photopath ) ?
        <BTN.NoStyleLink to={`/match/${data.messagedetail.matchid}`}>
          <img className={classes.image}
            src={API._getPictureUrl(data.messagedetail.photopath) + ( isSupportWebp? '.webp' : '.jpg' )} />
        </BTN.NoStyleLink>
        :
        <Skeleton className={classes.image} style={{ margin: 0 }} />
      }
      { ( data && data.messagedetail ) ?
        <Box className={classes.box}>
          <Typography gutterBottom variant="body2"
            style={{
              color: data.messagedetail.scorematch === 1 ? primary[700] : 'inherit',
              fontWeight: data.messagedetail.scorematch === 1 ? 900 : 400
            }}>
            {function(){
              switch (data.messagedetail.scorematch) {
                case 0:
                  return 'Amateur'
                  break;
                case 1:
                  return 'Professional'
                  break;
                default:
                  return 'Charity'
              }
            }()}
          </Typography>
          <BTN.NoStyleLink to={`/match/${data.messagedetail.matchid}`}>
            <Typography gutterBottom variant="h6" className={classes.title}>
              {data.messagedetail.matchname}
            </Typography>
            <Typography gutterBottom variant="body2">
              {API._dateToString(data.messagedetail.matchdate)}
            </Typography>
            <Typography gutterBottom display="block" variant="caption" className={classes.location}>
              <LocationOnIcon fontSize="small" className={classes.locationIcon} />
              {data.messagedetail.fieldname}
            </Typography>
          </BTN.NoStyleLink>
        </Box>
        :
        <Box className={classes.box}>
          <Skeleton height={25} />
          <Skeleton height={14} width="60%"/>
        </Box>
      }
      {handleGetButton()}
    </Paper>
  );
}
