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
  IconButton,
  TextField,
  FormControl,
  FormControlLabel,
  List,
  ListItem,
  ListItemText,
  Radio,
  RadioGroup,
  FormLabel,

} from '@material-ui/core';

import {
  Close as CloseIcon,

} from '@material-ui/icons';

import { LDCircular } from './../../loading/LDCircular'

const TemplateDialog = Loadable({
  loader: () => import(/* webpackChunkName: "TemplateDialog" */'./../../Utils/TemplateDialog'),
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
    display: 'flex', width: '100%',
    justifyContent: 'flex-end'
  },
  saveButton: {
    marginTop: 'auto',
  },
  formControl: {
    margin: theme.spacing(3, 0),
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
  const [ currentTime, setCurrentTime ] = React.useState(
    (matchDetail && matchDetail.team.length !== 0) ? matchDetail.team[0].teamname : API._getTodayTime()
  )
  const [ matchDetail, setMatchDetail ] = React.useState(null)
  const [ period, setPeriod ] = React.useState(0)
  const [ person, setPerson] = React.useState(0)
  const [ autoGen, setAutoGen ] = React.useState(false)
  const [ editting, setEditting ] = React.useState(false)
  const [ scheduleNumberType, setScheduleNumberType ] = React.useState('person')

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
        const resToken = token? token : await API._xhrGet('getcsrf')
        await API._xhrPost(
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
        <TextField label={ ( sess && sess.language === 'TH' ) ? "หมายเหตุ" : 'Note' }
          value={note || ''}
          onChange={e =>setNote(e.target.value)}
          onKeyPress={e =>handleKeyPressEditNote(e)}
          onFocus={e => e.target.select()} />
        <IconButton onClick={()=>setEditting(false)} style={{ padding: 8, marginTop: 'auto' }}>
          <CloseIcon fontSize="small" />
        </IconButton>
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

  function handlePeriodChange(value){
    if(value < 0){
      setPeriod(0)
    }else{
      setPeriod(value)
    }
  }

  function handlePersonChange(value){
    if(value < 0){
      setPerson(0)
    }else{
      setPerson(value)
    }
  }

  async function handleSchedule(){
    const resToken = token? token : await API._xhrGet('getcsrf')
    const sendObj = {
      action: ( matchDetail && matchDetail.team.length === 0 ) ? 'createschedule' : 'editschedule',
      matchid: parseInt(matchid),
      period: period,
      starttime: currentTime,
      person: person,
      type: scheduleNumberType
    }

    if(autoGen){
      Object.assign(sendObj, { gen: 'true' });
    }

    await API._xhrPost(
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
      const resToken = token? token : await API._xhrGet('getcsrf')
      await API._xhrPost(
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
          if(d.team.length !== 0){
            setCurrentTime(d.team[0].teamname)
          }
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
    if(matchDetail && matchDetail.team.length !== 0){
      //
    }
  },[ ])

  return (
    <div className={classes.root}>
      <React.Fragment>
        { matchDetail &&
          <div style={{ marginBottom: 24 }}>
            <Typography variant="h5">{matchDetail.title}</Typography>
            <Typography variant="body1">{matchDetail.location}</Typography>
            <Typography variant="body2">{API._dateToString(matchDetail.date)}</Typography>
          </div>
        }
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
              value={currentTime} />
            <TextField
              className={classes.textField}
              variant="outlined"
              label={ ( sess && sess.language === 'TH' ) ? "ระยะห่างเวลาต่อทีม" : 'Period' }
              error={period <= 0}
              helperText={`0 - 59 ${ ( sess && sess.language === 'TH' ) ? "นาที" : 'minute' }`}
              value={ !isNaN(period) ? period : '' }
              onKeyPress={e =>handleKeyPress(e.key)}
              onChange={e => handlePeriodChange(parseInt(e.target.value))}
              onFocus={e => e.target.select()}
              type="number"/>
            <div style={{ marginTop: 16 }}>
              <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel component="legend">
                  { ( sess && sess.language === 'TH' ) ? "ประเภทของจำนวน" : 'Type of amount' }
                </FormLabel>
                <RadioGroup style={{ flexDirection: 'row' }} value={scheduleNumberType} onChange={e => setScheduleNumberType(event.target.value)}>
                  <FormControlLabel value="person" control={<Radio />}
                    label={ ( sess && sess.language === 'TH' ) ? "บุคคล" : 'Person' } />
                  <FormControlLabel value="team" control={<Radio />}
                    label={ ( sess && sess.language === 'TH' ) ? "ทีม" : 'Team' } />
                </RadioGroup>
              </FormControl>
            </div>
            <TextField
              className={classes.textField}
              variant="outlined"
              label={
                ( sess && sess.language === 'TH' ) ?
                (scheduleNumberType === 'person' ? 'จำนวนคน' : 'จำนวนทีม' ) :
                (scheduleNumberType === 'person' ? 'Person' : 'Team' )
              }
              error={person <= 0}
              helperText={
                ( sess && sess.language === 'TH' ) ?
                (scheduleNumberType === 'person' ? 'จำนวนคนต่อทีม' : 'จำนวนทีม' )
                :
                (scheduleNumberType === 'person' ? 'Number of person in the team' : 'Number of team' )
              }
              value={ !isNaN(person) ? person : '' }
              onKeyPress={e =>handleKeyPress(e.key)}
              onChange={e => handlePersonChange(parseInt(e.target.value))}
              onFocus={e => e.target.select()}
              type="number"/>
            { matchDetail && matchDetail.team.length !== 0 &&
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <FormControl component="fieldset">
                  <FormControlLabel
                    control={<Switch checked={autoGen} onChange={()=>setAutoGen(!autoGen)} />}
                    label={ ( sess && sess.language === 'TH' ) ? "สร้างอัตโนมัติ" : 'Auto-generate' }
                  />
                </FormControl>
              </div>
            }
            { matchDetail && matchDetail.team.length !== 0 &&
              <div style={{ marginTop: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  { !editting &&
                    <BTN.PrimaryText onClick={()=>setEditting(!editting)}>
                      { ( sess && sess.language === 'TH' ) ? "แก้ไข" : 'Edit' }
                    </BTN.PrimaryText>
                  }
                </div>
                <List>
                  <ListItem style={{ backgroundColor: grey[900] }}>
                    <ListItemText style={{ color: 'white', width: '100%' }}
                      primary={ ( sess && sess.language === 'TH' ) ? "ทีม" : 'Team' } />
                    { !editting &&
                      <ListItemText style={{ color: 'white', width: '100%' }}
                        primary={ ( sess && sess.language === 'TH' ) ? "หมายเหตุ" : 'Note' } />
                    }
                  </ListItem>
                  { matchDetail &&
                    matchDetail.team.map( t =>
                      <ListItem key={t.teamno}>
                        <ListItemText
                          style={{ width: editting ? '20%' : '100%', ...editting && {marginTop: 'auto'} }}
                          primary={t.teamname} />
                        <ListItemText style={{ width: '100%' }} primary={
                          <React.Fragment>
                            { editting ?
                              <EditNoteComponent data={t} />
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
            { !editting &&
              <React.Fragment>
                { ( period <= 0 || person <= 0 ) ?
                  <Button
                    disabled
                    fullWidth
                    variant="contained"
                    className={classes.createButton}>
                    { matchDetail && matchDetail.team.length === 0 ? (
                      ( sess && sess.language === 'TH' ) ? "สร้าง" : 'Create'
                    ) : (
                      ( sess && sess.language === 'TH' ) ? "บันทึก" : 'Save'
                    ) }
                  </Button>
                  :
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
                }
              </React.Fragment>
            }
          </ThemeProvider>
        </div>
      </React.Fragment>
    </div>
  );
}
