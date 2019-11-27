import React from 'react';
import Loadable from 'react-loadable';
import socketIOClient from 'socket.io-client'
import { makeStyles, withStyles, createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import * as API from './../../../api'
import { primary, grey, red, green } from './../../../api/palette'

import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import ListItem from '@material-ui/core/ListItem';
import IconButton from '@material-ui/core/IconButton';

import DoneIcon from '@material-ui/icons/Done';
import CancelIcon from '@material-ui/icons/Cancel';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: 36
  },
  image: {
    width: '100%',
    color: 'black',
    backgroundColor: '#ccc',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    marginRight: 0,
    marginBottom: 8,
    backgroundPosition: 'center',
    [theme.breakpoints.up(900)]: {
      width: '60%',
      marginRight: 16,
      marginBottom: 8,
    },
  },
  matchImgTemp: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: grey[400],
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    objectFit: 'cover',
  },
  iconButton: {
    padding: '8px 16px 8px 0',
    width: '100%',
    [theme.breakpoints.up(700)]: {
      width: 'auto'
    },
  },

}));

const RedButton = withStyles(theme => ({
  root: {
    color: theme.palette.getContrastText(red[600]),
    backgroundColor: red[600],
    '&:hover': {
      backgroundColor: red[800],
    },
  },
}))(Button);

const GreenButton = withStyles(theme => ({
  root: {
    color: theme.palette.getContrastText(green[600]),
    backgroundColor: green[600],
    '&:hover': {
      backgroundColor: green[800],
    },
  },
}))(Button);

const GreenTextButton = withStyles(theme => ({
  root: {
    color: primary[600],
    '&:hover': {
      backgroundColor: primary[100],
    },
  },
}))(Button);

const theme = createMuiTheme({
  palette: {
    primary: primary,
  },
});

export default function MatchTeam(props) {
  const classes = useStyles();
  const { sess, token, setCSRFToken, matchid, handleSnackBar, isSupportWebp, selectedUser, handleClose } = props

  function handleUpdateForm(action){
    const socket = socketIOClient( API._getWebURL(), { transports: ['websocket', 'polling'] } )
    socket.emit('match-request-client-message', {
      action: "confirm",
      matchid: matchid,
      userid: [ sess.userid, selectedUser.userid],
      confirmaction: action,
    })
    handleClose()
  }

  return (
    <div className={classes.root}>
      <React.Fragment>
        <Typography component="h6" style={{ display: 'flex', marginBottom: 16 }}>
          { selectedUser.fullname }<div style={{ width: 16 }} />{ selectedUser.lastname }
        </Typography>
        { ( selectedUser && selectedUser.photopath ) ?
          <img align="left" className={classes.image}
            src={API._getPictureUrl(selectedUser.photopath) + ( isSupportWebp? '.webp' : '.jpg' )} />
          :
          <div className={classes.matchImgTemp}
            style={{ height: window.innerWidth * ( window.innerWidth >= 650?.3:.45 ), maxHeight: 280 }}>
            <Typography component="div">
              <Box fontSize={24} fontWeight={600} textAlign="center">
                { API._getWord(sess && sess.language).No_image }
              </Box>
            </Typography>
          </div>
        }
        <ListItem style={{ justifyContent: 'flex-end', marginTop: 24 }}>
          {/*<GreenTextButton onClick={handleClose}>Cancel</GreenTextButton>*/}
          <RedButton className={classes.iconButton} variant="contained"
            onClick={()=>handleUpdateForm('reject')}>
            <CancelIcon style={{ marginRight: 8, marginLeft: 12 }} />
            { API._getWord(sess && sess.language).Decline }
          </RedButton>
          <div style={{ width: 16 }} />
          <GreenButton className={classes.iconButton} variant="contained"
            onClick={()=>handleUpdateForm('accept')}>
            <DoneIcon style={{ marginRight: 8, marginLeft: 12 }} />
            { API._getWord(sess && sess.language).Accept }
          </GreenButton>
        </ListItem>
      </React.Fragment>
    </div>
  );
}
