import React from 'react';
import Loadable from 'react-loadable';
import { makeStyles, withStyles, createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import * as API from './../../../api'
import { primary, grey, red } from './../../../api/palette'

import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { LDCircular } from './../../loading/LDCircular'

const TemplateDialog = Loadable({
  loader: () => import(/* webpackChunkName: "TemplateDialog" */'./../../TemplateDialog'),
  loading: () => <LDCircular />
});

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: 36
  },
  title: {
    color: primary[900],
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

const theme = createMuiTheme({
  palette: {
    primary: primary,
  },
});

export default function MatchTeam(props) {
  const classes = useStyles();
  const { token, setCSRFToken, matchDetail, matchid, handleSnackBar } = props
  const [ currentTime, setCurrentTime ] = React.useState(API.getTodayTime())
  const [ period, setPeriod ] = React.useState(0)
  const [ person, setPerson] = React.useState(0)

  function handleKeyPress(e){
    if (e === 'Enter'){
      handleSchedule()
    }
  }

  async function handleSchedule(){
    const resToken = token? token : await API.xhrGet('getcsrf')
    await API.xhrPost(
      token? token : resToken.token,
      'matchsection', {
        action: ( matchDetail && matchDetail.length === 0 ) ? 'createschedule' : 'editschedule',
        matchid: parseInt(matchid),
        period: period,
        starttime: currentTime,
        person: person
    }, (csrf, d) =>{
      setCSRFToken(csrf)
      console.log(d);
    })
  }

  return (
    <div className={classes.root}>
      <React.Fragment>
        <Typography component="div">
          <Box className={classes.title} fontWeight={600}>
            { matchDetail && matchDetail.length === 0 ? 'Create Team' : 'Edit Team' }
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
              onClick={handleSchedule}>
              { matchDetail && matchDetail.length === 0 ? 'Create' : 'Confirm' }
            </GreenButton>
          </ThemeProvider>
        </div>
      </React.Fragment>
    </div>
  );
}
