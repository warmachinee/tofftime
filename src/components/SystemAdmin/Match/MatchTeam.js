import React from 'react';
import Loadable from 'react-loadable';
import { makeStyles, withStyles, createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import * as API from './../../../api'
import { primary, grey, red } from './../../../api/palette'

import {
  Switch,
  Divider,
  Typography,
  Box,
  Button,
  TextField,
  FormControl,
  FormControlLabel,
  List,
  ListItem,
  ListItemText,

} from '@material-ui/core';

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
  editNoteGrid: {
    display: 'flex', width: '100%'
  },
  saveButton: {
    marginTop: 'auto',
    marginLeft: 12
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
  const { BTN, sess, token, setCSRFToken, matchid, handleSnackBar, handleTeamClose } = props
  const [ currentTime, setCurrentTime ] = React.useState(API.getTodayTime())
  const [ matchDetail, setMatchDetail ] = React.useState(null)
  const [ period, setPeriod ] = React.useState(0)
  const [ person, setPerson] = React.useState(0)
  const [ autoGen, setAutoGen ] = React.useState(false)
  const [ editting, setEditting ] = React.useState(false)

  function EditNoteComponent(props){
    const { data } = props
    const [ note, setNote ] = React.useState(data.note)

    function handleKeyPressEditNote(e){
      if (e.key === 'Enter'){
        handleEditTeamNote()
      }
    }

    async function handleEditTeamNote(){
      if(matchid){
        const resToken = token? token : await API.xhrGet('getcsrf')
        await API.xhrPost(
          token? token : resToken.token,
          sess.typeid === 'admin' ? 'matchsection' : 'mmatchsection', {
            action: 'noteteam',
            matchid: matchid,
            teamno: data.teamno,
            note: note
        }, (csrf, d) =>{
          setCSRFToken(csrf)
          handleSnackBar({
            state: true,
            message: d.status,
            variant: /success/.test(d.status) ? 'success' : 'error',
            autoHideDuration: /success/.test(d.status)? 2000 : 5000
          })
          if(/success/.test(d.status)){
            handleFetchMatchDetail()
          }
        })
      }
    }

    return (
      <div className={classes.editNoteGrid}>
        <TextField label="Note"
          value={note || ''}
          onChange={e =>setNote(e.target.value)}
          onKeyPress={e =>handleKeyPressEditNote(e)}
          onFocus={e => e.target.select()} />
        <BTN.Primary className={classes.saveButton}
          onClick={handleEditTeamNote}>Save</BTN.Primary>
      </div>
    );
  }

  function handleKeyPress(e){
    if (e === 'Enter'){
      handleSchedule()
    }
  }

  async function handleSchedule(){
    const resToken = token? token : await API.xhrGet('getcsrf')
    const sendObj = {
      action: ( matchDetail && matchDetail.team.length === 0 ) ? 'createschedule' : 'editschedule',
      matchid: parseInt(matchid),
      period: period,
      starttime: currentTime,
      person: person
    }

    if(autoGen){
      Object.assign(sendObj, { gen: 'true' });
    }

    await API.xhrPost(
      token? token : resToken.token,
      sess.typeid === 'admin' ? 'matchsection' : 'mmatchsection', {
        ...sendObj
    }, (csrf, d) =>{
      setCSRFToken(csrf)
      handleSnackBar({
        state: true,
        message: d.status,
        variant: /success/.test(d.status) ? 'success' : 'error',
        autoHideDuration: /success/.test(d.status)? 2000 : 5000
      })
      if(/success/.test(d.status)){
        handleTeamClose()
      }
    })
  }

  async function handleFetchMatchDetail(){
    if(matchid){
      const resToken = token? token : await API.xhrGet('getcsrf')
      await API.xhrPost(
        token? token : resToken.token,
        sess.typeid === 'admin' ? 'loadmatch' : 'mloadmatch', {
          action: 'detail',
          matchid: matchid
      }, (csrf, d) =>{
        setCSRFToken(csrf)
        if(
          d.status !== 'team database error' ||
          d.status !== 'wrong matchid' ||
          d.status !== 'wrong action' ||
          d.status !== 'wrong params'
        ){
          setMatchDetail(d)
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
  }

  React.useEffect(()=>{
    handleFetchMatchDetail()
  },[ ])

  return (
    <div className={classes.root}>
      <React.Fragment>
        <Typography component="div">
          <Box className={classes.title} fontWeight={600}>
            { matchDetail && matchDetail.team.length === 0 ? (
              ( sess && sess.language === 'TH' ) ? "สร้างตารางเวลา" : 'Create schedule'
            ) : (
              ( sess && sess.language === 'TH' ) ? "แก้ไขตารางเวลา" : 'Edit schedule'
            ) }
          </Box>
        </Typography>
        <div style={{ marginTop: 24 }}>
          <ThemeProvider theme={theme}>
            <TextField
              fullWidth
              className={classes.timePicker}
              label={ ( sess && sess.language === 'TH' ) ? "เวลา" : 'Time' }
              type="time"
              onKeyPress={e =>handleKeyPress(e.key)}
              onChange={e => setCurrentTime(e.target.value)}
              defaultValue={currentTime} />
            <div className={classes.fieldGrid}>
              <TextField
                className={classes.textField}
                variant="outlined"
                label={ ( sess && sess.language === 'TH' ) ? "ระยะห่างเวลาต่อทีม" : 'Period' }
                helperText={`0 - 59 ${ ( sess && sess.language === 'TH' ) ? "นาที" : 'minute' }`}
                value={ !isNaN(period) ? period : '' }
                onKeyPress={e =>handleKeyPress(e.key)}
                onChange={e => setPeriod(parseInt(e.target.value))}
                onFocus={e => e.target.select()}
                type="number"/>
              <div style={{ width: 16 }} />
              <TextField
                className={classes.textField}
                variant="outlined"
                label={ ( sess && sess.language === 'TH' ) ? "จำนวนคน" : 'Person' }
                helperText={ ( sess && sess.language === 'TH' ) ? "จำนวนคนต่อทีม" : 'Number of person in the team' }
                value={ !isNaN(person) ? person : '' }
                onKeyPress={e =>handleKeyPress(e.key)}
                onChange={e => setPerson(parseInt(e.target.value))}
                onFocus={e => e.target.select()}
                type="number"/>
            </div>
            { matchDetail && matchDetail.team.length !== 0 &&
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <FormControl component="fieldset">
                  <FormControlLabel
                    control={<Switch checked={autoGen} onChange={()=>setAutoGen(!autoGen)} />}
                    label="Auto gen"
                  />
                </FormControl>
              </div>
            }
            { matchDetail && matchDetail.team.length !== 0 &&
              <div style={{ marginTop: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <BTN.PrimaryText onClick={()=>setEditting(!editting)}>{ editting ? 'Done' : 'Edit' }</BTN.PrimaryText>
                </div>
                <List>
                  <ListItem style={{ backgroundColor: grey[900] }}>
                    <ListItemText style={{ color: 'white', width: '100%' }} primary="Team" />
                    { !editting &&
                      <ListItemText style={{ color: 'white', width: '100%' }} primary="Note" />
                    }
                  </ListItem>
                  { matchDetail &&
                    matchDetail.team.map( t =>
                      <ListItem>
                        <ListItemText style={{ width: '100%' }} primary={t.teamname} />
                        <ListItemText style={{ width: '100%' }} primary={
                          <React.Fragment>
                            { editting ?
                              <div style={{ marginTop: 16 }}>
                                <EditNoteComponent data={t} />
                              </div>
                              :
                              ( t.note === '' ? '-' : t.note )
                            }
                          </React.Fragment>
                          } />
                      </ListItem>
                    )
                  }
                </List>
              </div>
            }
            <GreenButton
              fullWidth
              className={classes.createButton}
              onClick={handleSchedule}>
              { matchDetail && matchDetail.team.length === 0 ? (
                ( sess && sess.language === 'TH' ) ? "สร้าง" : 'Create'
              ) : (
                ( sess && sess.language === 'TH' ) ? "บันทึก" : 'Save'
              ) }
            </GreenButton>
          </ThemeProvider>
        </div>
      </React.Fragment>
    </div>
  );
}
