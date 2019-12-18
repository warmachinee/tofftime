import React from 'react';
import Loadable from 'react-loadable';
import socketIOClient from 'socket.io-client'
import { makeStyles, withStyles, createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { primary, grey, red } from './../../../api/palette'

import {
  Collapse,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Paper,
  Tab,
  Tabs,
  Typography,
  Box,
  Divider,
  TextField,
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Radio,

} from '@material-ui/core';

import {
  ExpandMore,
  AddCircle,
  Add as AddIcon,

} from '@material-ui/icons';

import { LDCircular } from './../../loading/LDCircular'

const TemplateDialog = Loadable({
  loader: () => import(/* webpackChunkName: "TemplateDialog" */'./../../Utils/Dialog/TemplateDialog'),
  loading: () => <LDCircular />
});

const MatchClass = Loadable({
  loader: () => import(/* webpackChunkName: "MatchClass" */'./MatchClass'),
  loading: () => <LDCircular />
});

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    padding: theme.spacing(1, 2),
    width: '100%',
    boxSizing: 'border-box',
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: 900
  },
  tabRoot: {
    flexGrow: 1,
    display: 'flex',
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  indicator: {
    backgroundColor: primary[600],
    width: 4,
  },
  textColorInherit: {
    opacity: .5
  },
  tabPanel: {
    width: '80%',
    padding: 12
  },
  listRoot: {
    marginTop: 16,
    width: '100%',
  },
  expandIcon: {
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  paper: {
    padding: theme.spacing(2)
  },
  addClass: {
    flexDirection: 'column',
    [theme.breakpoints.up(400)]: {
      flexDirection: 'row'
    },
  },
  addClassButtonGrid: {
    width: '100%',
    [theme.breakpoints.up(400)]: {
      width: 'auto',
      marginTop: 'auto',
    },
  },
  addClassButton: {
    marginLeft: 0,
    marginTop: 16,
    [theme.breakpoints.up(400)]: {
      marginLeft: 8,
      marginTop: 0,
    },
  },
  formControl: {
    margin: theme.spacing(1, 0),
  },

}))

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

function TabPanel(props) {
  const classes = useStyles();
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      className={classes.tabPanel}
      {...other}
    >
      {children}
    </Typography>
  );
}

export default function MBGroup(props){
  const classes = useStyles();
  const { BTN, API, sess, token, setCSRFToken, setData, data, matchid, handleSnackBar, isSupportWebp, isAvailableEditing } = props
  const [ dialog, setDialog ] = React.useState({
    create: false,
  });
  const [ value, setValue ] = React.useState(0);
  const [ mainclassName, setMainclassName ] = React.useState('');
  const [ errorMainclassName, setErrorMainclassName ] = React.useState(false);
  const [ mainclassType, setMainclassType ] = React.useState('group');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function dialogOpen(type){
    setDialog({ ...dialog, [type]: true })
  }

  function dialogClose(type){
    setDialog({ ...dialog, [type]: false })
  }

  function handleKeyPress(e){
    if (e === 'Enter'){
      checkMainclassName()
    }
  }

  function checkMainclassName(){
    if(mainclassName === ''){
      setErrorMainclassName(true)
    }else{
      setErrorMainclassName(false)
      handleFetchCreate()
    }
  }

  function toggleRealtime(mainclass){
    const socket = socketIOClient( API._getWebURL(), { transports: ['websocket', 'polling'] } )
    socket.emit('admin-match-client-message', {
      action: "showmatchscore",
      matchid: matchid,
      userid: sess.userid,
      mainclass: mainclass
    })
  }

  function getObjFromScorematch(){
    switch (data.scorematch) {
      case 1:
        return {
          type: 'group',
          mainclassname: mainclassName
        }
        break;
      case 2:
        return {
          type: mainclassType,
          mainclassname: mainclassName
        }
        break;
      default:
        return {}
    }
  }

  async function handleFetchCreate(){
    if(data && data.mainclass){
      const resToken = token? token : await API._xhrGet('getcsrf')
      const sendObj = {
        action: 'classadd',
        matchid: matchid,
        classname: data.scorematch === 0 || mainclassType === 'flight' ? 1 : 'Subgroup Number 1',
        mainclass: data.mainclass.length + 1
      }
      Object.assign(sendObj, getObjFromScorematch());
      await API._xhrPost(
        token? token : resToken.token,
        sess.typeid === 'admin' ? 'matchsection' : 'mmatchsection', {
          ...sendObj
      }, (csrf, d) =>{
        handleSnackBar({
          state: true,
          message: d.status,
          variant: /success/.test(d.status) ? d.status : 'error',
          autoHideDuration: /success/.test(d.status)? 2000 : 5000
        })
        setCSRFToken(csrf)
        if(/success/.test(d.status)){
          toggleRealtime(data.mainclass.length + 1)
          handleFetch()
          if(data && data.mainclass && data.mainclass.length > 0){
            setValue(value + 1)
          }else{
            setValue(0)
          }
        }
        dialogClose('create')
        setMainclassType('group')
        setMainclassName('')
      })
    }
  }

  async function handleFetch(){
    if(matchid){
      const resToken = token? token : await API._xhrGet('getcsrf')
      await API._xhrPost(
        token? token : resToken.token,
        sess.typeid === 'admin'? 'loadmatch' :'mloadmatch', {
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
  }

  React.useEffect(()=>{
    handleFetch()
  },[ ])

  return (
    <div className={classes.root}>
      <List disablePadding className={classes.tabRoot} style={{ marginTop: 16 }}>
        { data && ( data.scorematch === 0 ? !( data.mainclass && data.mainclass.length > 0 ) : true ) &&
          <ListItem disableGutters className={classes.addClass}>
            <ListItemIcon className={classes.addClassButtonGrid}>
              <BTN.Primary disabled={!isAvailableEditing} className={classes.addClassButton}
                onClick={()=>data.scorematch === 0 ? handleFetchCreate() : dialogOpen('create')}>
                <AddCircle style={{ marginRight: 8 }} />
                { API._getWord(sess && sess.language).Create }
              </BTN.Primary>
            </ListItemIcon>
          </ListItem>
        }
      </List>
      { (data && data.mainclass && data.mainclass.length > 0) ?
        <div className={classes.tabRoot}>
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            className={classes.tabs}
            classes={{ indicator: classes.indicator }}>
            { data &&
              data.mainclass.map(d =>
              <Tab
                key={d.mainclass}
                style={{ textTransform: 'none' }}
                classes={{ textColorInherit: classes.textColorInherit }}
                label={
                  data && data.scorematch === 0 ?
                  ( API._getWord(sess && sess.language).Flight )
                  :
                  d.mainclassname
                } />
            )}
          </Tabs>
          { data &&
            data.mainclass.map((d, index) =>
            <TabPanel key={d.mainclass} value={value} index={index}>
              <MatchClass {...props} matchClass={d} data={data} setData={setData} value={value} setValue={setValue} />
            </TabPanel>
          )}
        </div>
        :
        <Typography component="div" style={{ width: '100%', ...(!isAvailableEditing && {opacity: .5, backgroundColor: grey[50]}) }}>
          <Box style={{ textAlign: 'center', color: primary[900] }} fontWeight={500} fontSize={24} m={1}>
            { API._getWord(sess && sess.language)['Create the match group.'] }
          </Box>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 16, marginBottom: 16, }}>
            <BTN.PrimaryOutlined disabled={!isAvailableEditing}
              onClick={()=>data.scorematch === 0 ? handleFetchCreate() : dialogOpen('create')}>
              <AddIcon style={{ marginRight: 8 }} />
              { API._getWord(sess && sess.language).Create_group }
            </BTN.PrimaryOutlined>
          </div>
          <Divider style={{ marginTop: 72, marginBottom: 48 }} />
          <Typography gutterBottom variant="h6" style={{ fontWeight: 600, textDecoration: 'underline' }}>
            { API._getWord(sess && sess.language).Example }
          </Typography>
          { isAvailableEditing && data && data.scorematch === 0 ?
            <React.Fragment>
              <img style={{ width: '100%' }}
                src={`https://file.thai-pga.com/system/image/MBGroup0${sess && sess.language === 'TH' ? 'TH' : ''}.jpg`} />
              <Typography gutterBottom variant="h6" style={{ fontWeight: 600, textDecoration: 'underline' }}>
                { API._getWord(sess && sess.language).Result }
              </Typography>
              <img
                src={`https://file.thai-pga.com/system/image/MBGroup0_result.jpg`} />
            </React.Fragment>
            :
            <React.Fragment>
              <img style={{ width: '100%' }}
                src={`https://file.thai-pga.com/system/image/MBGroup1${sess && sess.language === 'TH' ? 'TH' : ''}.jpg`} />
              <img style={{ width: '100%' }}
                src={`https://file.thai-pga.com/system/image/MBGroup2${sess && sess.language === 'TH' ? 'TH' : ''}.jpg`} />
            </React.Fragment>
          }

        </Typography>
      }
      <TemplateDialog maxWidth="xs" open={dialog.create} handleClose={()=>dialogClose('create')}>
        <div style={{ marginTop: 24 }}>
          <ThemeProvider theme={theme}>
            <TextField
              fullWidth
              autoFocus={API._isDesktopBrowser() && dialog.create}
              error={errorMainclassName}
              helperText={errorMainclassName && API._getWord(sess && sess.language)['Please fill Main group name.']}
              label={ API._getWord(sess && sess.language).Main_group_name }
              variant="outlined"
              onChange={e =>setMainclassName(e.target.value)}
              onKeyPress={e =>handleKeyPress(e.key)}
            />
          </ThemeProvider>
          { data && data.scorematch === 2 &&
            <div style={{ marginTop: 16 }}>
              <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel component="legend">
                  { API._getWord(sess && sess.language).Main_group_type }
                </FormLabel>
                <RadioGroup style={{ flexDirection: 'row' }} value={mainclassType} onChange={e => setMainclassType(event.target.value)}>
                  <FormControlLabel value="group" control={<GreenRadio />}
                    label={ API._getWord(sess && sess.language).Group } />
                  <FormControlLabel value="flight" control={<GreenRadio />}
                    label={ API._getWord(sess && sess.language).Flight } />
                </RadioGroup>
              </FormControl>
            </div>
          }
        </div>
        <BTN.Primary style={{ width: '100%', marginTop: 16 }} size="large" onClick={checkMainclassName}>
          Create
        </BTN.Primary>
      </TemplateDialog>
    </div>
  );
}
