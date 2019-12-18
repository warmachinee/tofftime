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

const GoBack = Loadable({
  loader: () => import(/* webpackChunkName: "GoBack" */'./../../Utils/GoBack'),
  loading: () => null
});

const LabelText = Loadable({
  loader: () => import(/* webpackChunkName: "LabelText" */'./../../Utils/LabelText'),
  loading: () => null
});

const ConfirmDialog = Loadable({
  loader: () => import(/* webpackChunkName: "ConfirmDialog" */'./../../Utils/Dialog/ConfirmDialog'),
  loading: () => null
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

const GreenRadio = withStyles({
  root: {
    color: primary[400],
    '&$checked': {
      color: primary[600],
    },
  },
  checked: {},
})(props => <Radio color="default" {...props} />);

const theme = createMuiTheme({
  palette: {
    primary: primary,
  },
});

function ListComponent(props){
  const classes = useStyles();
  const { sess, data, editing, setRemoveData, handleConfirmDeleteState } = props

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
    <ListItem button={!editing}>
      { ( props.open ? window.innerWidth >= 860 : window.innerWidth >= 620 ) &&
        <ListItemText className={classes.tableDate}
          primary={
            <Typography
              style={{ fontStyle: 'oblique' }}
              component="span"
              variant="caption"
              color="textPrimary"
            >
              {API._dateToString(data.date)}
            </Typography>
          }
          secondary={ data.status === 1 && API._getWord(sess && sess.language).End } />
      }
      <ListItemText primary={API._shotnessNumber(data.views)} className={classes.tableView} />
      <ListItemText style={{ ...(editing && {width: '100%'}) }} inset className={classes.tableTitle}
        primary={data.title}
        secondary={
          <React.Fragment>
            <Typography component="span" variant="body2" style={{ fontWeight: 600 }}>
              { function(){
                  switch (data.scorematch) {
                    case 0:
                      return 'Amateur'
                      break;
                    case 1:
                      return 'Professional'
                      break;
                    default:
                      return 'Charity'
                  }
                }()
              }
              { ( props.open ? window.innerWidth >= 860 : window.innerWidth >= 620 ) && <br></br>}
            </Typography>
            { ( ( props.open ? window.innerWidth < 1040 : window.innerWidth < 800 ) || editing ) &&
              (
                ( props.open ? window.innerWidth >= 860 : window.innerWidth >= 620 )?
                data.location
                :
                <React.Fragment>
                  <br></br>
                  <Typography
                    style={{ fontStyle: 'oblique' }}
                    component="span"
                    variant="caption"
                    color="textPrimary"
                  >
                    {API._dateToString(data.date)}
                  </Typography>
                  <br></br>
                  { data.status === 1 && API._getWord(sess && sess.language).End }
                  <br></br>
                  {data.location}
                </React.Fragment>
              )
            }
          </React.Fragment>
        } />
      { ( props.open ? window.innerWidth >= 1040 : window.innerWidth >= 800 ) && !editing &&
        <ListItemText inset primary={data.location} className={classes.tableLocation} />
      }
      { editing &&
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
  const [ editing, setEditing ] = React.useState(false)
  const [ editingDisplay, setEditingDisplay ] = React.useState(false)
  const [ confirmDeleteState, handleConfirmDeleteState ] = React.useState(false)
  const [ removeData, setRemoveData ] = React.useState(null)
  const [ confirmPasswordState, handleConfirmPasswordState ] = React.useState(false)
  const [ confirmPassword, setConfirmPassword ] = React.useState(null)
  const [ matchOwnerStatus, setMatchOwnerStatus ] = React.useState('mine');

  const handleChange = event => {
    setMatchOwnerStatus(event.target.value);
  };

  function toggleEditing(){
    setEditing(!editing)
  }

  function toggleEditingDisplay(){
    setEditingDisplay(!editingDisplay)
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
        if(matchOwnerStatus === 'mine'){
          handleFetch()
        }else{
          handleFetchAdminMatch()
        }
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
        if(matchOwnerStatus === 'mine'){
          handleFetch()
        }else{
          handleFetchAdminMatch()
        }
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
        setDataClassed(
          (pageOrganizer && pageData) ?
          arrData.filter( m =>{ return m.pageid === pageData.pageid })
          :
          arrData
        )
      }
      setData(
        (pageOrganizer && pageData) ?
        d.filter( m =>{ return m.pageid === pageData.pageid })
        :
        d
      )
      document.title = `Match Management - T-off Time`
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
      if(!('status' in d)){
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
        setDataClassed(
          (pageOrganizer && pageData) ?
          arrData.filter( m =>{ return m.pageid === pageData.pageid })
          :
          arrData
        )
      }
      setData(
        (pageOrganizer && pageData) ?
        d.filter( m =>{ return m.pageid === pageData.pageid })
        :
        d
      )
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
      { sess && sess.typeid === 'admin' &&
        <GoBack to='/system_admin/' />
      }
      <LabelText text={ API._getWord(sess && sess.language).Match } />
      { sess && sess.typeid !== 'admin' && !pageOrganizer &&
        <div style={{ marginTop: 24, boxSizing: 'border-box' }}>
          <FormControl component="fieldset" className={classes.formControl}>
            <FormLabel component="legend">{API._getWord(sess && sess.language).Type}</FormLabel>
            <RadioGroup style={{ flexDirection: 'row' }} value={matchOwnerStatus} onChange={handleChange}>
              <FormControlLabel value="mine" control={<GreenRadio />}
                label={API._getWord(sess && sess.language).My_match} />
              <FormControlLabel value="admin" control={<GreenRadio />}
                label={API._getWord(sess && sess.language).Admin} />
            </RadioGroup>
          </FormControl>
        </div>
      }
      <div style={{ display: 'flex', marginTop: 24, boxSizing: 'border-box' }}>
        { !editing &&
          <GreenTextButton variant="outlined" color="primary" onClick={toggleEditingDisplay}>
            { editingDisplay?
              ( API._getWord(sess && sess.language).Done )
              :
              ( API._getWord(sess && sess.language).Edit_Display )
            }
          </GreenTextButton>
        }
        <div style={{ flex: 1 }} />
        { !editingDisplay &&
          <GreenTextButton variant="outlined" color="primary" onClick={toggleEditing}>
            { editing?
              ( API._getWord(sess && sess.language).Done )
              :
              ( API._getWord(sess && sess.language).Remove )
            }
          </GreenTextButton>
        }
      </div>
      <List style={{ overflow: 'auto', boxSizing: 'border-box' }}>
        { editingDisplay?
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
            <StyledText style={{ ...(editing && {width: '100%'}) }} inset primary={ API._getWord(sess && sess.language).Match } className={classes.tableTitle} />
            { ( props.open ? window.innerWidth >= 1040 : window.innerWidth >= 800 ) && !editing &&
              <StyledText inset primary={ API._getWord(sess && sess.language).Course } className={classes.tableLocation} />
            }
            { editing &&
              <ListItemSecondaryAction>
                <IconButton>
                  <div style={{ width: 24 }} />
                </IconButton>
              </ListItemSecondaryAction>
            }
          </ListItem>
        }

        { !editingDisplay &&
          (
            ( data && !data.status && sess ) ?
            (
              data.length > 0 ?
              API._sortArrByDate(data, 'createdate', 'title').map( (d, i) =>
                d &&
                <React.Fragment key={i}>
                  { !editing ?
                    <Link className={classes.linkElement}
                      to={
                        sess.typeid === 'admin' ?
                        `/system_admin/match/${d.matchid}` :
                        `/${ pageOrganizer ? `organizer/${pageData.pageid}` : 'user' }/management/match/${d.matchid}`
                      }>
                      <ListComponent sess={sess} data={d} open={props.open} />
                    </Link>
                    :
                    <ListComponent sess={sess} data={d} open={props.open} editing={editing}
                      setRemoveData={setRemoveData} handleConfirmDeleteState={handleConfirmDeleteState} />
                  }
                  <Divider />
                </React.Fragment>
              )
              :
              <Typography component="div" style={{ width: '100%', marginTop: 48 }}>
                <Box style={{ textAlign: 'center', color: primary[900] }} fontWeight={500} fontSize={24} m={1}>
                  { API._getWord(sess && sess.language).No_match }
                </Box>
              </Typography>
            )
            :
            <LDCircular />
          )
        }
        { dataClassed && editingDisplay && sess &&
          API._sortArrByDate(dataClassed, 'createdate', 'title').map( (d, i) =>
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
          )
        }
      </List>
      <ConfirmDialog
        sess={sess}
        open={confirmDeleteState}
        onClose={handleConfirmCancel}
        icon="Delete"
        iconColor={red[600]}
        title={API._getWord(sess && sess.language)['Are you sure you want to delete?']}
        content={
          removeData &&
          <Typography variant="body1" align="center">
            { removeData && removeData.title }
          </Typography>
        }
        onSubmit={handleConfirmDelete}
        submitButton="Red" />
      <ConfirmDialog
        sess={sess}
        open={confirmPasswordState}
        onClose={handleConfirmPasswordCancel}
        icon="Lock"
        iconColor={red[600]}
        title={API._getWord(sess && sess.language)['Fill your password']}
        content={
          <ThemeProvider theme={theme}>
            <TextField
              autoFocus={API._isDesktopBrowser()}
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
        }
        onSubmit={handleFetchRemove}
        submitButton="Red" />
    </div>
  )
}
