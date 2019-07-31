import React from 'react';
import Loadable from 'react-loadable';
import { makeStyles, withStyles, createMuiTheme } from '@material-ui/core/styles';
import * as API from '../../../api'
import { ThemeProvider } from '@material-ui/styles';

import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import teal from '@material-ui/core/colors/teal';
import grey from '@material-ui/core/colors/grey';
import red from '@material-ui/core/colors/red';

import { LDCircular } from '../../loading/LDCircular'

const TemplateDialog = Loadable({
  loader: () => import(/* webpackChunkName: "TemplateDialog" */'../TemplateDialog'),
  loading: () => <LDCircular />
});

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: 36
  },
  title: {
    color: teal[900],
    fontSize: 18,
  },
  notice: {
    fontFamily: 'monospace',
    color: grey[600],
    fontWeight: 600,
  },
  fieldGrid: {
    display: 'flex',
  },
  timePicker: {
    marginBottom: 16
  },
  textField: {
    width: '100%'
  },
  createButton: {
    padding: theme.spacing(2),
    marginTop: 24
  },

}));

const GreenButton = withStyles(theme => ({
  root: {
    color: theme.palette.getContrastText(teal[500]),
    backgroundColor: teal[500],
    '&:hover': {
      backgroundColor: teal[700],
    },
  },
}))(Button);

const GreenTextButton = withStyles(theme => ({
  root: {
    color: teal[600],
    '&:hover': {
      backgroundColor: teal[100],
    },
  },
}))(Button);

const theme = createMuiTheme({
  palette: {
    primary: teal,
  },
});

export default function MatchTeam(props) {
  const classes = useStyles();
  const { token, setCSRFToken, data, matchid, setData, handleSnackBar } = props
  const [ currentTime, setCurrentTime ] = React.useState(getTime())
  const [ period, setPeriod ] = React.useState(0)
  const [ person, setPerson] = React.useState(0)

  function getTime(){
    const today = new Date()
    const hr = ( today.getHours() < 10 )? '0' + today.getHours() : today.getHours()
    const min = ( today.getMinutes() < 10 )? '0' + today.getMinutes() : today.getMinutes()
    const time = hr + ":" + min
    return time
  }

  function handleKeyPress(e){
    if (e === 'Enter'){
      handleCreateSchedule()
    }
  }

  async function handleCreateSchedule(){
    const res = await token? token : API.xhrGet('getcsrf')
    await API.xhrPost(
      token? token : res.token,
      'matchsection', {
        action: 'createschedule',
        matchid: parseInt(matchid),
        period: period,
        starttime: currentTime,
        person: person
    }, (csrf, d) =>{
      setCSRFToken(csrf)
      console.log(d);
      try{
        handleFetch()
      }catch(err) { console.log(err.message) }
    })
  }


  async function handleFetch(){
    const res = await token? token : API.xhrGet('getcsrf')
    await API.xhrPost(
      token? token : res.token,
      'loadmatch', {
        action: 'detail',
        matchid: matchid
    }, (csrf, d) =>{
      setCSRFToken(csrf)
      if(
        d.status !== 'class database error' ||
        d.status !== 'wrong matchid' ||
        d.status !== 'wrong action' ||
        d.status !== 'wrong params'
      ){
        setData(d)
      }else{
        handleSnackBar({
          state: true,
          message: d.status,
          variant: 'error',
          autoHideDuration: 5000
        })
      }
    })
  }

  React.useEffect(()=>{
    console.log(data);
  },[ data ])

  return (
    <div className={classes.root}>
      { !( data && data.length ) &&
        <React.Fragment>
          <Typography component="div">
            <Box className={classes.title} fontWeight={600}>
              Create Team
            </Box>
          </Typography>
          <div style={{ marginTop: 24 }}>
            <ThemeProvider theme={theme}>
              <TextField
                fullWidth
                className={classes.timePicker}
                label="Time"
                type="time"
                onKeyPress={e =>handleKeyPress(e.key)}
                onChange={e => setCurrentTime(e.target.value)}
                defaultValue={currentTime}/>
              <div className={classes.fieldGrid}>
                <TextField
                  className={classes.textField}
                  variant="outlined"
                  label="Period"
                  helperText="0 - 59 minute"
                  value={period}
                  onKeyPress={e =>handleKeyPress(e.key)}
                  onChange={e => setPeriod(parseInt(e.target.value))}
                  onFocus={e => e.target.select()}
                  type="number"/>
                <div style={{ width: 16 }}/>
                <TextField
                  className={classes.textField}
                  variant="outlined"
                  label="Person"
                  helperText="Number of persons in the team"
                  value={person}
                  onKeyPress={e =>handleKeyPress(e.key)}
                  onChange={e => setPerson(parseInt(e.target.value))}
                  onFocus={e => e.target.select()}
                  type="number"/>
              </div>
              <GreenButton
                fullWidth
                className={classes.createButton}
                onClick={handleCreateSchedule}>
                Create
              </GreenButton>
            </ThemeProvider>
          </div>
        </React.Fragment>
      }
    </div>
  );
}
