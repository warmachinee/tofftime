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
  const { API, BTN, sess, data, isSupportWebp, chkUserid, pageOrganizer, pageData } = props
  const [ paperHover, setPaperHover ] = React.useState(0)
  const [ joinStatus, setJoinStatus ] = React.useState(false)

  function handleJoinMatch(){
    if(sess){
      const socket = socketIOClient( API.getWebURL() )
      socket.emit('match-request-client-message', {
        action: 'join',
        matchid: data.matchid,
        userid: sess.userid,
      })
      setTimeout(()=>{
        setJoinStatus(true)
      }, 1000)
    }
  }

  function handleGetButton(){
    if(BTN && data){
      switch (true) {
        case data.permission === 'host' || data.permission === 'admin':
          return (
            <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', padding: 16, paddingTop: 0, boxSizing: 'border-box' }}>
              <BTN.NoStyleLink
                to={`/${ pageOrganizer ? `organizer/${pageData.pageid}` : 'user' }/management/match/${data.matchid}`}>
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

  return(
    <Paper
      className={classes.root}
      elevation={ ( data && window.innerWidth >= 600 ) ? paperHover : 1}
      {...data?
        {
          onMouseEnter: ()=>setPaperHover(3),
          onMouseLeave: ()=>setPaperHover(0),
        } : null
      }>
      { ( data && data.matchphoto ) ?
        <BTN.NoStyleLink to={`/match/${data.matchid}`}>
          <img className={classes.image}
            src={API.getPictureUrl(data.matchphoto) + ( isSupportWebp? '.webp' : '.jpg' )} />
        </BTN.NoStyleLink>
        :
        <Skeleton disableAnimate className={classes.image} style={{ margin: 0, cursor: 'auto' }} />
      }
      { data ?
        <Box className={classes.box}>
          <BTN.NoStyleLink to={`/match/${data.matchid}`}>
            <Typography gutterBottom variant="body1" className={classes.title}>
              {data.matchname}
            </Typography>
          </BTN.NoStyleLink>
          <Typography gutterBottom variant="body2"
            style={{
              color: data.typescore === 1 ? primary[700] : 'inherit',
              fontWeight: data.typescore === 1 ? 900 : 400
            }}>
            {
              data.typescore === 1 ?
              ( ( sess && sess.language === 'EN' ) ? "Professional" : 'มืออาชีพ' )
              :
              ( ( sess && sess.language === 'EN' ) ? "Amateur" : 'มือสมัครเล่น' )
            }
          </Typography>
          <BTN.NoStyleLink to={`/match/${data.matchid}`}>
            <Typography gutterBottom display="block" variant="caption" className={classes.location}>
              <LocationOnIcon fontSize="small" className={classes.locationIcon} />
              {data.fieldname}
            </Typography>
          </BTN.NoStyleLink>
          <BTN.NoStyleLink to={`/match/${data.matchid}`}>
            <Typography variant="caption" color="textSecondary">
              {`${data.views + 'views'} • ${API.handleDateToString(data.matchdate)}`}
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
