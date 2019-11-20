import React from 'react';
import Loadable from 'react-loadable';
import { Link } from "react-router-dom";
import { makeStyles, fade, createMuiTheme, withStyles } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import * as API from './../../../api'
import { primary, grey, red } from './../../../api/palette'

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Divider from '@material-ui/core/Divider';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import DeleteIcon from '@material-ui/icons/Delete';

import { LDCircular } from './../../loading/LDCircular'

const LabelText = Loadable({
  loader: () => import(/* webpackChunkName: "LabelText" */'./../../Utils/LabelText'),
  loading: () => <LDCircular />
});

const TemplateDialog = Loadable({
  loader: () => import(/* webpackChunkName: "TemplateDialog" */'./../../Utils/TemplateDialog'),
  loading: () => <LDCircular />
});

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    boxSizing: 'border-box'
  },
  linkElement: {
    textDecoration: 'none',
    color: 'inherit'
  },
  title: {
    textAlign: 'center', color: primary[900],
    fontSize: 28,
    [theme.breakpoints.up(500)]: {
      fontSize: 32,
    },
  },
  tableHead: {
    backgroundColor: grey[900],
  },
  tableDate: {
    width: 150,
  },
  tableView: {
    width: 75,
    textAlign: 'right'
  },
  tableDateText: {
    fontStyle: 'oblique',
    fontFamily: 'monospace'
  },
  tableTitle: {
    width: '100%',
    overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis',
    [theme.breakpoints.up(800)]: {
      width: '60%',
    },
  },
  tableLocation: {
    width: '40%',
    overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis',
  },
  checkbox: {
    position: 'absolute',
    left: 8
  },
  margin: {
    width: '100%',
    margin: '4px 0',
    [theme.breakpoints.up(500)]: {
      margin: theme.spacing(1,0),
    },
  },
  formControl: {
    margin: theme.spacing(0, 1.5),
  },

}))

const StyledText = withStyles(theme => ({
  primary: {
    color: 'white',
  },
}))(ListItemText);

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

const GreenCheckbox = withStyles({
  root: {
    color: primary[400],
    '&$checked': {
      color: primary[600],
    },
  },
})(props => <Checkbox color="default" {...props} />);

const theme = createMuiTheme({
  palette: {
    primary: primary,
  },
});

function ListComponent(props){
  const classes = useStyles();
  const { data, editting, setRemoveData, handleConfirmDeleteState } = props

  function handleRemoveMatch(d){
    handleConfirmDeleteState(true)
    setRemoveData(d)
  }

  const [ ,updateState ] = React.useState(null)

  function resizeHandler(){
    updateState({})
  }

  React.useEffect(()=>{
    window.addEventListener('resize', resizeHandler)
    return ()=>{
      window.removeEventListener('resize', resizeHandler)
    }
  },[ window.innerWidth ])


  return (
    <ListItem button>
      { ( props.open ? window.innerWidth >= 860 : window.innerWidth >= 620 ) &&
        <ListItemText className={classes.tableDate} classes={{ primary: classes.tableDateText }}
          primary={API._dateToString(data.date)} />
      }
      <ListItemText primary={API._shotnessNumber(data.views)} className={classes.tableView} />
      <ListItemText inset className={classes.tableTitle}
        primary={data.title}
        secondary={
          ( ( props.open ? window.innerWidth < 1040 : window.innerWidth < 800 ) || editting ) &&
          (
            ( props.open ? window.innerWidth >= 860 : window.innerWidth >= 620 )?
            data.location
            :
            <React.Fragment>
              <Typography
                style={{ fontStyle: 'oblique' }}
                component="span"
                variant="caption"
                color="textPrimary"
              >
                {API._dateToString(data.date)}
              </Typography>
              <br></br>
              {data.location}
            </React.Fragment>
          )
        } />
      { ( props.open ? window.innerWidth >= 1040 : window.innerWidth >= 800 ) && !editting &&
        <ListItemText inset primary={data.location} className={classes.tableLocation} />
      }
      { editting &&
        <ListItemSecondaryAction>
          <IconButton onClick={()=>handleRemoveMatch(data)}>
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      }
    </ListItem>
  )
}

export default function MatchBody(props){
  const classes = useStyles();
  const { sess, token, setCSRFToken, handleSnackBar, pageOrganizer, pageData, pageList } = props
  const [ data, setData ] = React.useState(null)
  const [ dataClassed, setDataClassed ] = React.useState(null)
  const [ editting, setEditting ] = React.useState(false)
  const [ edittingDisplay, setEdittingDisplay ] = React.useState(false)
  const [ confirmDeleteState, handleConfirmDeleteState ] = React.useState(false)
  const [ removeData, setRemoveData ] = React.useState(null)
  const [ confirmPasswordState, handleConfirmPasswordState ] = React.useState(false)
  const [ confirmPassword, setConfirmPassword ] = React.useState(null)
  const [ matchOwnerStatus, setMatchOwnerStatus ] = React.useState('mine');

  const handleChange = event => {
    setMatchOwnerStatus(event.target.value);
  };

  function toggleEditting(){
    setEditting(!editting)
  }

  function toggleEdittingDisplay(){
    setEdittingDisplay(!edittingDisplay)
  }

  function handleConfirmPasswordCancel(){
    setRemoveData(null)
    handleConfirmPasswordState(false)
    handleConfirmDeleteState(false)
  }

  function handleConfirmCancel(){
    setRemoveData(null)
    handleConfirmDeleteState(false)
  }

  function handleConfirmDelete(){
    if( !(sess.typeid === 'f-auth' || sess.typeid === 'g-auth')){
      handleConfirmPasswordState(true)
    }else{
      handleFetchRemove()
    }
  }

  function handleKeyPress(e){
    if(e.key === 'Enter'){
      handleFetchRemove()
    }
  }

  async function handleFetchRemove(){
    const resToken = token? token : await API._xhrGet('getcsrf')
    const sendObj = {
      action: 'delete',
      matchid: removeData.matchid,
    }

    if( !(sess.typeid === 'f-auth' || sess.typeid === 'g-auth')){
      Object.assign(sendObj, { password: confirmPassword });
    }else{
      Object.assign(sendObj, { password: '1234' });
    }

    await API._xhrPost(
      token? token : resToken.token,
      sess.typeid === 'admin' ? 'matchsystem' : 'mmatchsystem', {
        ...sendObj
    }, (csrf, d) =>{
      handleSnackBar({
        state: true,
        message: d.status,
        variant: /success/.test(d.status) ? 'success' : 'error',
        autoHideDuration: /success/.test(d.status)? 2000 : 5000
      })
      setCSRFToken(csrf)
      try {
        handleConfirmPasswordCancel()
        handleFetch()
      }catch(err) { console.log(err.message) }
    })
  }

  async function handleSetDisplay(d){
    const resToken = token? token : await API._xhrGet('getcsrf')
    await API._xhrPost(
      token? token : resToken.token,
      sess.typeid === 'admin' ? 'displaymatchsystem' : 'mdisplaymatchsystem', {
        action: 'match',
        matchid: d.matchid
    }, (csrf, d) =>{
      handleSnackBar({
        state: true,
        message: d.status,
        variant: /success/.test(d.status) ? 'success' : 'error',
        autoHideDuration: /success/.test(d.status)? 2000 : 5000
      })
      setCSRFToken(csrf)
      try {
        handleFetch()
      }catch(err) { console.log(err.message) }
    })
  }

  async function handleFetch(){
    var arrData = []
    const resToken = token? token : await API._xhrGet('getcsrf')
    await API._xhrPost(
      token? token : resToken.token,
      sess.typeid === 'admin' ? 'loadmatch' : 'loadusersystem', {
        ...(sess.typeid === 'admin') ? { action: 'list' } : { action: 'creator' }
    }, (csrf, d) =>{
      setCSRFToken(csrf)
      if(!d.status){
        arrData.push(
          ...d.filter( d =>{
            return d.display === 1
          })
        )
        arrData.push(
          ...d.filter( d =>{
            return d.display === -1
          })
        )
        setDataClassed(arrData)
      }
      setData(d)
    })
  }

  async function handleFetchAdminMatch(){
    var arrData = []
    const resToken = token? token : await API._xhrGet('getcsrf')
    await API._xhrPost(
      token? token : resToken.token,
      sess.typeid === 'admin' ? 'loadmatch' : 'loadusersystem', {
        ...(sess.typeid === 'admin') ? { action: 'list' } : { action: 'adminmatch' }
    }, (csrf, d) =>{
      setCSRFToken(csrf)
      if(!d.status){
        arrData.push(
          ...d.filter( d =>{
            return d.display === 1
          })
        )
        arrData.push(
          ...d.filter( d =>{
            return d.display === -1
          })
        )
        setDataClassed(arrData)
      }
      setData(d)
    })
  }

  React.useEffect(()=>{
    if(matchOwnerStatus === 'mine'){
      handleFetch()
    }else{
      handleFetchAdminMatch()
    }
  },[ matchOwnerStatus ])

  const [ ,updateState ] = React.useState(null)

  function resizeHandler(){
    updateState({})
  }

  React.useEffect(()=>{
    window.addEventListener('resize', resizeHandler)
    return ()=>{
      window.removeEventListener('resize', resizeHandler)
    }
  },[ window.innerWidth ])

  return(
    <div className={classes.root}>
      <LabelText text={ API._getWord(sess && sess.language).Match } />
      { sess && sess.typeid !== 'admin' &&
        <div style={{ marginTop: 24, boxSizing: 'border-box' }}>
          <FormControl component="fieldset" className={classes.formControl}>
            <FormLabel component="legend">{API._getWord(sess && sess.language).Type}</FormLabel>
            <RadioGroup value={matchOwnerStatus} onChange={handleChange}>
              <FormControlLabel value="mine" control={<Radio />}
                label={API._getWord(sess && sess.language).My_match} />
              <FormControlLabel value="admin" control={<Radio />}
                label={API._getWord(sess && sess.language).Admin} />
            </RadioGroup>
          </FormControl>
        </div>
      }
      <div style={{ display: 'flex', marginTop: 24, justifyContent: 'space-between', boxSizing: 'border-box' }}>
        <GreenTextButton color="primary" onClick={toggleEdittingDisplay}>
          { edittingDisplay?
            ( API._getWord(sess && sess.language).Done )
            :
            ( API._getWord(sess && sess.language).Edit_Display )
          }
        </GreenTextButton>
        <GreenTextButton color="primary" onClick={toggleEditting}>
          { editting?
            ( API._getWord(sess && sess.language).Done )
            :
            ( API._getWord(sess && sess.language).Remove )
          }
        </GreenTextButton>
      </div>
      <List style={{ overflow: 'auto', boxSizing: 'border-box' }}>
        { edittingDisplay?
          <ListItem key="Table Head" className={classes.tableHead}>
            <ListItemIcon>
              <div style={{ width: 42 }}></div>
            </ListItemIcon>
            <StyledText inset primary={ API._getWord(sess && sess.language).Match } className={classes.tableTitle} />
          </ListItem>
          :
          <ListItem key="Table Head" className={classes.tableHead}>
            { ( props.open ? window.innerWidth >= 860 : window.innerWidth >= 620 ) &&
              <StyledText primary={ API._getWord(sess && sess.language).Date } className={classes.tableDate} />
            }
            <StyledText
              primary={API._getWord(sess && sess.language).View} className={classes.tableView} />
            <StyledText inset primary={ API._getWord(sess && sess.language).Match } className={classes.tableTitle} />
            { ( props.open ? window.innerWidth >= 1040 : window.innerWidth >= 800 ) && !editting &&
              <StyledText inset primary={ API._getWord(sess && sess.language).Course } className={classes.tableLocation} />
            }
            { editting &&
              <ListItemSecondaryAction>
                <IconButton>
                  <div style={{ width: 24 }} />
                </IconButton>
              </ListItemSecondaryAction>
            }
          </ListItem>
        }

        {data && !data.status && !edittingDisplay && sess &&
          data.map( (d, i) =>
            d &&
            <React.Fragment key={i}>
              { !editting ?
                <Link className={classes.linkElement}
                  to={
                    sess.typeid === 'admin' ?
                    `/system_admin/match/${d.matchid}` :
                    `/${ pageOrganizer ? `organizer/${pageData.pageid}` : 'user' }/management/match/${d.matchid}`
                  }>
                  <ListComponent data={d} open={props.open} />
                </Link>
                :
                <ListComponent data={d} open={props.open} editting={editting} setRemoveData={setRemoveData} handleConfirmDeleteState={handleConfirmDeleteState} />
              }
              <Divider />
            </React.Fragment>
        )}
        { dataClassed && edittingDisplay && sess &&
          dataClassed.map( (d, i) =>
            d &&
            <React.Fragment key={i}>
              <ListItem key={d.matchid} style={{ ...d.display !== 1 && { opacity: .5 }}} button onClick={()=>handleSetDisplay(d)}>
                <ListItemIcon>
                  <GreenCheckbox
                    edge="start"
                    checked={d.display === 1}
                    tabIndex={-1}
                    disableRipple/>
                </ListItemIcon>
                <ListItemText className={classes.tableTitle}
                  primary={d.title}
                  secondary={d.location} />
                <ListItemText
                  style={{ textAlign: 'right' }}
                  primary={
                    <Typography
                      style={{ fontStyle: 'oblique', fontSize: 14 }}
                      component="span"
                      variant="caption"
                      color="textPrimary"
                    >
                      {API._dateToString(d.date)}
                    </Typography>
                  } />
              </ListItem>
              <Divider />
            </React.Fragment>
        )}
      </List>

      <TemplateDialog
        maxWidth={400}
        open={confirmDeleteState} handleClose={handleConfirmCancel}>
        <Typography component="div">
          <Box className={classes.confirmTitle} fontWeight={600} m={1}>
            { API._getWord(sess && sess.language)['Are you sure you want to delete?'] }
          </Box>
          <Box className={classes.confirmSubtitle} m={3}>
            { removeData && removeData.title }
          </Box>
        </Typography>
        <Divider style={{ marginTop: 16, marginBottom: 16 }} />
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <GreenTextButton onClick={handleConfirmCancel} className={classes.confirmButton}>
            { API._getWord(sess && sess.language).Cancel }
          </GreenTextButton>
          <RedButton onClick={handleConfirmDelete} className={classes.confirmButton}>
            { API._getWord(sess && sess.language).Delete }
          </RedButton>
        </div>
      </TemplateDialog>

      <TemplateDialog
        maxWidth={400}
        open={confirmPasswordState} handleClose={handleConfirmPasswordCancel}>
        <Typography component="div">
          <Box className={classes.confirmTitle} fontWeight={600} m={1}>
            { API._getWord(sess && sess.language)['Fill your password'] }
          </Box>
        </Typography>
        <ThemeProvider theme={theme}>
          <TextField
            autoFocus
            fullWidth
            style={{ marginTop: 16 }}
            className={classes.margin}
            label={ API._getWord(sess && sess.language).Password }
            variant="outlined"
            type="password"
            onChange={(e)=>setConfirmPassword(e.target.value)}
            onKeyPress={e =>handleKeyPress(e)}
          />
        </ThemeProvider>
        <Divider style={{ marginTop: 16, marginBottom: 16 }} />
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <GreenTextButton onClick={handleConfirmPasswordCancel} className={classes.confirmButton}>
            { API._getWord(sess && sess.language).Cancel }
          </GreenTextButton>
          <RedButton onClick={handleFetchRemove} className={classes.confirmButton}>
            { API._getWord(sess && sess.language).Delete }
          </RedButton>
        </div>
      </TemplateDialog>

    </div>
  )
}
