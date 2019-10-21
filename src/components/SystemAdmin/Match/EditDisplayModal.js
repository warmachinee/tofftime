import React from 'react';
import Loadable from 'react-loadable';
import { makeStyles, withStyles, createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import * as API from './../../../api'
import { primary, grey }from './../../../api/palette'

import Button from '@material-ui/core/Button';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
  listText:{
    overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis',
    width: '100%',
    textAlign: 'left'
  },
  listClass: {
    overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis',
    width: '30%',
    textAlign: 'left',
  },
  button: {
    padding: theme.spacing(1, 3)
  }

}))

const GreenButton = withStyles(theme => ({
  root: {
    color: theme.palette.getContrastText(primary[500]),
    backgroundColor: primary[500],
    '&:hover': {
      backgroundColor: primary[700],
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

const GreenSwitch = withStyles({
  switchBase: {
    '&$checked': {
      color: primary[500],
    },
    '&$checked + $track': {
      backgroundColor: primary[500],
    },
  },
  checked: {
    color: primary[500],
  },
  track: {
    color: primary[500],
  }
})(props => <Switch color="default" {...props} />);

const theme = createMuiTheme({
  palette: {
    primary: primary,
  },
});

export default function EditDisplayModal(props){
  const classes = useStyles();
  const {
    sess, token, setCSRFToken, matchid, handleSnackBar,
    selectedPlayer, matchDetail, handleClose
  } = props
  const [ state, setState ] = React.useState(selectedPlayer.display === 1);
  const [ comment, setComment ] = React.useState(selectedPlayer.note ? selectedPlayer.note : '')

  function handleKeyPress(e){
    if(e.key === 'Enter'){
      handleSave()
    }
  }

  function handleChange(){
    setState(!state)
  }

  function handleSave(){
    if(state !== (selectedPlayer.display === 1)){
      handleSetDisplay(selectedPlayer.userid)
    }

    if(comment){
      handleEditNote()
    }

    setTimeout(()=>{
      handleClose()
    }, 1000)
  }

  async function handleEditNote(){
    if(matchid){
      const resToken = token? token : await API._xhrGet('getcsrf')
      await API._xhrPost(
        token? token : resToken.token,
        sess.typeid === 'admin' ? 'matchsection' : 'mmatchsection', {
          action: 'editnote',
          matchid: matchid,
          notetext: comment,
          usertarget: selectedPlayer.userid,
      }, (csrf, d) =>{
        setCSRFToken(csrf)
        handleSnackBar({
          state: true,
          message: d.status,
          variant: /success/.test(d.status) ? 'success' : 'error',
          autoHideDuration: /success/.test(d.status)? 2000 : 5000
        })
      })
    }
  }

  async function handleSetDisplay(d){
    if(matchid){
      const resToken = token? token : await API._xhrGet('getcsrf')
      await API._xhrPost(
        token? token : resToken.token,
        sess.typeid === 'admin' ? 'displaymatchsystem' : 'mdisplaymatchsystem', {
          action: 'user',
          matchid: matchid,
          userid: d,
      }, (csrf, d) =>{
        setCSRFToken(csrf)
        handleSnackBar({
          state: true,
          message: d.status,
          variant: /success/.test(d.status) ? 'success' : 'error',
          autoHideDuration: /success/.test(d.status)? 2000 : 5000
        })
      })
    }
  }

  return(
    <div style={{ marginTop: 36 }}>
      { matchDetail && matchDetail.class &&
        <React.Fragment>
          <ListItem>
            <Typography component="h6" style={{ display: 'flex' }}>
              { selectedPlayer.firstname }<div style={{ width: 16 }} />{ selectedPlayer.lastname }
            </Typography>
          </ListItem>
          <ListItem>
            <Typography component="h6" style={{ display: 'flex' }}>
              Class <div style={{ width: 8 }} /> : <div style={{ width: 8 }} />
              {
                selectedPlayer.classno === 0 ?
                '-'
                :
                matchDetail.class.filter( d =>{
                  return d.classno === selectedPlayer.classno
                }).map((d, i) =>{
                  return d.classname
                })
              }
            </Typography>
          </ListItem>
        </React.Fragment>
      }
      <ListItem>
        <ThemeProvider theme={theme}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Set player display</FormLabel>
            <FormControlLabel
              control={
                <GreenSwitch checked={state} onChange={handleChange} />
              }
              label="Display"
            />
          </FormControl>
        </ThemeProvider>
      </ListItem>
      <ListItem>
        <ThemeProvider theme={theme}>
          <FormControl component="fieldset" style={{ width: '100%' }}>
            <FormLabel component="legend">Comment</FormLabel>
            <TextField
              fullWidth
              onChange={e => setComment(e.target.value)}
              onKeyPress={e =>handleKeyPress(e)}
              />
          </FormControl>
        </ThemeProvider>
      </ListItem>
      <ListItem style={{ justifyContent: 'flex-end', marginTop: 24 }}>
        <GreenTextButton className={classes.button} onClick={handleClose}>Cancel</GreenTextButton>
        { (state === (selectedPlayer.display === 1)) && comment === '' ?
          <Button className={classes.button} variant="contained" disabled>Save</Button>
          :
          <GreenButton
            className={classes.button}
            onClick={handleSave}>Save</GreenButton>
        }
      </ListItem>
    </div>
  );
}
