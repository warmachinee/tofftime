import React from 'react';
import Loadable from 'react-loadable';
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

} from '@material-ui/core';

import {
  ExpandMore,
  AddCircle,
  Add as AddIcon,

} from '@material-ui/icons';

import { LDCircular } from './../../loading/LDCircular'

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
    backgroundColor: theme.palette.background.paper,
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

}))

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
  const { BTN, API, sess, token, setCSRFToken, setData, data, matchid, handleSnackBar, isSupportWebp } = props
  const [ value, setValue ] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  async function handleFetchCreate(){
    if(data && data.mainclass){
      const resToken = token? token : await API._xhrGet('getcsrf')
      await API._xhrPost(
        token? token : resToken.token,
        sess.typeid === 'admin' ? 'matchsection' : 'mmatchsection', {
          action: 'classadd',
          matchid: matchid,
          classname: data.scorematch == 0 ? 1 : 'Subgroup Number 1',
          mainclass: data.mainclass.length + 1
      }, (csrf, d) =>{
        handleSnackBar({
          state: true,
          message: d.status,
          variant: /success/.test(d.status) ? d.status : 'error',
          autoHideDuration: /success/.test(d.status)? 2000 : 5000
        })
        setCSRFToken(csrf)
        handleFetch()
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
        {/* data && data.mainclass && data.mainclass.length === 0 &&
          <React.Fragment>
            <ListItem>
              <ListItemText
                style={{ textAlign: 'center', fontSize: 20, fontWeight: 600, color: primary[900] }}
                primary={function(){
                  switch (data.scorematch) {
                    case 0:
                      return ( sess && sess.language === 'TH' ) ? "ไม่มี" : 'No flight'
                      break;
                    case 1:
                      return ( sess && sess.language === 'TH' ) ? "ไม่มี" : 'No class'
                      break;
                    default:
                      return ( sess && sess.language === 'TH' ) ? "ไม่มี" : 'No Team'
                  }
                }()} />
            </ListItem>
          </React.Fragment>*/
        }
        { data && ( data.scorematch === 0 ? !( data.mainclass && data.mainclass.length > 0 ) : true ) &&
          <ListItem disableGutters className={classes.addClass}>
            <ListItemIcon className={classes.addClassButtonGrid}>
              <BTN.Red className={classes.addClassButton} variant="outlined" onClick={handleFetchCreate}>
                <AddCircle style={{ marginRight: 8 }} />
                { ( sess && sess.language === 'TH' ) ? "สร้าง" : 'Create' }
              </BTN.Red>
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
                  ( ( sess && sess.language === 'TH' ) ? "ไฟล์ท" : 'Flight' )
                  :
                  `${( ( sess && sess.language === 'TH' ) ? "กลุ่มหลัก" : 'Main group' )} ${d.mainclass}`
                } />
            )}
          </Tabs>
          { data &&
            data.mainclass.map((d, index) =>
            <TabPanel key={d.mainclass} value={value} index={index}>
              <MatchClass {...props} matchClass={d} data={data} setData={setData} />
            </TabPanel>
          )}
        </div>
        :
        <Typography component="div" style={{ width: '100%' }}>
          <Box style={{ textAlign: 'center', color: primary[900] }} fontWeight={500} fontSize={24} m={1}>
            { ( sess && sess.language === 'TH' ) ? "สร้างกลุ่มการแข่งขัน" : 'Create the match group.' }
          </Box>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 16, marginBottom: 16, }}>
            <BTN.PrimaryOutlined onClick={handleFetchCreate}>
              <AddIcon style={{ marginRight: 8 }} />
              { ( sess && sess.language === 'TH' ) ? "สร้างกลุ่ม" : 'Create group.' }
            </BTN.PrimaryOutlined>
          </div>
        </Typography>
      }
    </div>
  );
}
