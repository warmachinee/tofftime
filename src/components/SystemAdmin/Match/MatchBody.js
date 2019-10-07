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

import DeleteIcon from '@material-ui/icons/Delete';

import { LDCircular } from './../../loading/LDCircular'

const CreateMatch = Loadable({
  loader: () => import(/* webpackChunkName: "CreateMatch" */'./CreateMatch'),
  loading: () => <LDCircular />
});

const GoBack = Loadable({
  loader: () => import(/* webpackChunkName: "GoBack" */'./../../GoBack'),
  loading: () => <LDCircular />
});

const TemplateDialog = Loadable({
  loader: () => import(/* webpackChunkName: "TemplateDialog" */'./../../TemplateDialog'),
  loading: () => <LDCircular />
});

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
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
    width: 120,
  },
  tableView: {
    width: 60,
    textAlign: 'center'
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

  return (
    <ListItem button>
      { window.innerWidth >= 600 &&
        <ListItemText className={classes.tableDate} classes={{ primary: classes.tableDateText }}
          primary={data.date} />
      }
      <ListItemText primary={data.views} className={classes.tableView} />
      <ListItemText inset className={classes.tableTitle}
        primary={data.title}
        secondary={
          ( window.innerWidth < 800 || editting ) &&
          (
            window.innerWidth >= 600?
            data.location
            :
            <React.Fragment>
              <Typography
                style={{ fontStyle: 'oblique' }}
                component="span"
                variant="caption"
                color="textPrimary"
              >
                {data.date}
              </Typography>
              <br></br>
              {data.location}
            </React.Fragment>
          )
        } />
      { ( window.innerWidth >= 800 && !editting ) &&
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
    const resToken = token? token : await API.xhrGet('getcsrf')
    const sendObj = {
      action: 'delete',
      matchid: removeData.matchid,
    }

    if( !(sess.typeid === 'f-auth' || sess.typeid === 'g-auth')){
      Object.assign(sendObj, { password: confirmPassword });
    }else{
      Object.assign(sendObj, { password: '1234' });
    }

    await API.xhrPost(
      token? token : resToken.token,
      sess.typeid === 'admin' ? 'matchsystem' : 'mmatchsystem', {
        ...sendObj
    }, (csrf, d) =>{
      handleSnackBar({
        state: true,
        message: d.status,
        variant: d.status === 'success' ? 'success' : 'error',
        autoHideDuration: d.status === 'success'? 2000 : 5000
      })
      setCSRFToken(csrf)
      try {
        handleConfirmPasswordCancel()
        handleFetch()
      }catch(err) { console.log(err.message) }
    })
  }

  async function handleSetDisplay(d){
    const resToken = token? token : await API.xhrGet('getcsrf')
    await API.xhrPost(
      token? token : resToken.token,
      sess.typeid === 'admin' ? 'displaymatchsystem' : 'mdisplaymatchsystem', {
        action: 'match',
        matchid: d.matchid
    }, (csrf, d) =>{
      handleSnackBar({
        state: true,
        message: d.status,
        variant: d.status === 'success' ? 'success' : 'error',
        autoHideDuration: d.status === 'success'? 2000 : 5000
      })
      setCSRFToken(csrf)
      try {
        handleFetch()
      }catch(err) { console.log(err.message) }
    })
  }

  async function handleFetch(){
    var arrData = []
    const resToken = token? token : await API.xhrGet('getcsrf')
    await API.xhrPost(
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

  React.useEffect(()=>{
    handleFetch()
  },[ ])

  return(
    <div className={classes.root}>
      <GoBack />
      <Typography component="div">
        <Box className={classes.title} fontWeight={600} m={1}>
          { ( sess && sess.language === 'TH' ) ? "การแข่งขัน" : 'Match' }
        </Box>
      </Typography>
      <CreateMatch setData={setData} setDataClassed={setDataClassed} {...props} />
      <div style={{ display: 'flex', margin: '24px 16px 0 0', justifyContent: 'space-between' }}>
        <GreenTextButton color="primary" onClick={toggleEdittingDisplay}>
          { edittingDisplay?
            ( ( sess && sess.language === 'TH' ) ? "เสร็จ" : 'Done' )
            :
            ( ( sess && sess.language === 'TH' ) ? "แก้ไขการแสดง" : 'Edit Display' )
          }
        </GreenTextButton>
        <GreenTextButton color="primary" onClick={toggleEditting}>
          { editting?
            ( ( sess && sess.language === 'TH' ) ? "เสร็จ" : 'Done' )
            :
            ( ( sess && sess.language === 'TH' ) ? "ลบ" : 'Remove' )
          }
        </GreenTextButton>
      </div>
      <List style={{ overflow: 'auto' }}>
        { edittingDisplay?
          <ListItem key="Table Head" className={classes.tableHead}>
            <ListItemIcon>
              <div style={{ width: 42 }}></div>
            </ListItemIcon>
            <StyledText inset primary={ ( sess && sess.language === 'TH' ) ? "การแข่งขัน" : 'Match' } className={classes.tableTitle} />
          </ListItem>
          :
          <ListItem key="Table Head" className={classes.tableHead}>
            { window.innerWidth >= 600 &&
              <StyledText primary={ ( sess && sess.language === 'TH' ) ? "วันที่" : 'Date' } className={classes.tableDate} />
            }
            <StyledText primary="Views" className={classes.tableView} />
            <StyledText inset primary={ ( sess && sess.language === 'TH' ) ? "การแข่งขัน" : 'Match' } className={classes.tableTitle} />
            { ( window.innerWidth >= 800 && !editting ) &&
              <StyledText inset primary={ ( sess && sess.language === 'TH' ) ? "สนาม" : 'Location' } className={classes.tableLocation} />
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
                    `/admin/match/${d.matchid}` :
                    `/${ pageOrganizer ? `organizer/${pageData.pageid}` : 'user' }/management/match/${d.matchid}`
                  }>
                  <ListComponent data={d} />
                </Link>
                :
                <ListComponent data={d} editting={editting} setRemoveData={setRemoveData} handleConfirmDeleteState={handleConfirmDeleteState} />
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
                      style={{ fontStyle: 'oblique' }}
                      component="span"
                      variant="caption"
                      color="textPrimary"
                    >
                      {d.date}
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
            { ( sess && sess.language === 'TH' ) ? "ต้องการลบหรือไม่ ?" : 'Are you sure you want to delete?' }
          </Box>
          <Box className={classes.confirmSubtitle} m={3}>
            { removeData && removeData.title }
          </Box>
        </Typography>
        <Divider style={{ marginTop: 16, marginBottom: 16 }} />
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <GreenTextButton onClick={handleConfirmCancel} className={classes.confirmButton}>
            { ( sess && sess.language === 'TH' ) ? "ยกเลิก" : 'Cancel' }
          </GreenTextButton>
          <RedButton onClick={handleConfirmDelete} className={classes.confirmButton}>
            { ( sess && sess.language === 'TH' ) ? "ลบ" : 'Delete' }
          </RedButton>
        </div>
      </TemplateDialog>

      <TemplateDialog
        maxWidth={400}
        open={confirmPasswordState} handleClose={handleConfirmPasswordCancel}>
        <Typography component="div">
          <Box className={classes.confirmTitle} fontWeight={600} m={1}>
            { ( sess && sess.language === 'TH' ) ? "ใส่รหัสผ่าน" : 'Fill password' }
          </Box>
        </Typography>
        <ThemeProvider theme={theme}>
          <TextField
            autoFocus
            fullWidth
            style={{ marginTop: 16 }}
            className={classes.margin}
            label={ ( sess && sess.language === 'TH' ) ? "รหัสผ่าน" : 'Password' }
            variant="outlined"
            type="password"
            onChange={(e)=>setConfirmPassword(e.target.value)}
            onKeyPress={e =>handleKeyPress(e)}
          />
        </ThemeProvider>
        <Divider style={{ marginTop: 16, marginBottom: 16 }} />
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <GreenTextButton onClick={handleConfirmPasswordCancel} className={classes.confirmButton}>
            { ( sess && sess.language === 'TH' ) ? "ยกเลิก" : 'Cancel' }
          </GreenTextButton>
          <RedButton onClick={handleFetchRemove} className={classes.confirmButton}>
            { ( sess && sess.language === 'TH' ) ? "ลบ" : 'Delete' }
          </RedButton>
        </div>
      </TemplateDialog>

    </div>
  )
}
