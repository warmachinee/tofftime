import React from 'react';
import clsx from 'clsx';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { primary, grey } from './../../api/palette'

import {
  Container,
  Grid,
  Paper,
  Avatar,
  Typography,
  InputLabel,
  MenuItem,
  FormHelperText,
  FormControl,
  Select,
  ListItemText,
  Checkbox,
  Input,
  Chip,

} from '@material-ui/core';

import {
  AssignmentInd,
  GolfCourse,
} from "@material-ui/icons";

const useStyles = makeStyles(theme => ({
  grid: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '100%',
    maxWidth: 740,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 36,
    padding: '0 12px',
    boxSizing: 'border-box',
  },
  gridFlexDirectionUp: {
    flexDirection: 'row'
  },
  gridFlexDirectionDown: {
    flexDirection: 'column'
  },
  rootDown: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    boxSizing: 'border-box',
    margin: 'auto',
    padding: 12
  },
  rootUp: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    boxSizing: 'border-box',
    margin: 'auto',
    padding: 12
  },
  paper: {
    boxSizing: 'border-box',
    width: '100%',
    padding: theme.spacing(3, 4),
    display: 'flex',
    borderRadius: 0,
    maxWidth: 350
  },
  statLabel: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  icon: {
    fontSize: 72,
    [theme.breakpoints.down(840)]: {
      fontSize: 48,
      margin: "auto"
    }
  },
  typo: {
    textAlign: 'center',
    color: grey[500]
  },
  valueGrid: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end'
  },
  value: {
    alignSelf: 'center',
  },
  controlPaperUp: {
    padding: '0 12px',
  },
  controlPaperDown: {
    padding: '0 12px',
    width: '100%',
    maxWidth: 350,
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  settingStatUp: {
    marginRight: 8,
  },
  settingStatDown: {
    marginBottom: 8,
  },
  formControlUp: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
  formControlDown: {
    margin: theme.spacing(1),
    width: '100%',
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
    textTransform: 'capitalize'
  },

}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const matchTypeNames = [
  'indy',
  'unofficial',
  'official',
];

export default function Statistics(props) {
  const classes = useStyles();
  const { API, isSupportWebp, sess, token, setCSRFToken, handleAccountData, open, accountData, userid, userData } = props
  const [ data, setData ] = React.useState(null)
  const [ checked, setChecked ] = React.useState([]);

  function getSortName(name){
    if(sess && sess.language === 'EN'){
      return name
    }else{
      switch (true) {
        case name === 'unofficial':
          return 'ไม่เป็นทางการ'
          break;
        case name === 'official':
          return 'เป็นทางการ'
          break;
        default:
          return 'ส่วนตัว'
      }
    }
  }

  function handleChange(event) {
    var value = event.target.value
    if(event.target.value.length > 0){
      setChecked(event.target.value);
      value = event.target.value
    }else{
      setChecked(['indy']);
      value = ['indy']
    }
    handleTickStat(value)
  }

  async function handleTickStat(value){
    const resToken = token? token : await API.xhrGet('getcsrf')
    const sendObj = {
      action: 'editprofile',
      historystat: value
    }
    await API.xhrPost(
      token? token : resToken.token,
      'uusersystem', {
        ...sendObj
    }, (csrf, d) =>{
      setCSRFToken(csrf)
    })
    await handleFetchInfo()
    await handleFetch()
  }

  async function handleFetchInfo(){
    const resToken = token? token : await API.xhrGet('getcsrf')
    await API.xhrPost(
      token? token : resToken.token,
      'loadusersystem', {
        action: 'info'
    }, (csrf, d) =>{
      setCSRFToken(csrf)
      handleAccountData(d[0])
      setChecked(d[0].historystat)
    })
  }

  async function handleFetch(){
    const resToken = token? token : await API.xhrGet('getcsrf')
    const sendObj = {
      action: 'statavg'
    }

    if(userid){
      Object.assign(sendObj, { targetuser: userid });
    }

    await API.xhrPost(
      token? token : resToken.token,
      'loadusersystem', {
        ...sendObj
    }, (csrf, d) =>{
      setCSRFToken(csrf)
      setData(d)
    })
  }

  React.useEffect(()=>{
    if(!(userData && userData.privacy === 'private')){
      handleFetch()
      if(accountData){
        setChecked(accountData.historystat)
      }
    }
  },[ userid ])

  React.useEffect(()=>{
    if(accountData){
      setChecked(accountData.historystat)
    }
  },[ accountData ])

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
    <React.Fragment>
      <div className={clsx(classes.grid,{
        [classes.gridFlexDirectionDown]: open ? window.innerWidth < 790 : window.innerWidth < 550 ,
        [classes.gridFlexDirectionUp]: !( open ? window.innerWidth < 790 : window.innerWidth < 550 )
      })}>
        <Paper
          style={{ boxSizing: 'border-box' }}
          className={clsx(
            {
              [classes.controlPaperDown]: open ? window.innerWidth < 790 : window.innerWidth < 550 ,
              [classes.controlPaperUp]: !( open ? window.innerWidth < 790 : window.innerWidth < 550 )
            },
            {
              [classes.settingStatDown]: open ? window.innerWidth < 790 : window.innerWidth < 550 ,
              [classes.settingStatUp]: !( open ? window.innerWidth < 790 : window.innerWidth < 550 )
            }
          )}>
          <FormControl className={clsx({
            [classes.formControlDown]: open ? window.innerWidth < 790 : window.innerWidth < 550 ,
            [classes.formControlUp]: !( open ? window.innerWidth < 790 : window.innerWidth < 550 )
          })}>
            <InputLabel>{ (sess && sess.language === 'EN')? 'Match' : 'การแข่งขัน' }</InputLabel>
            <Select
              multiple
              disabled={Boolean(userid)}
              value={checked}
              onChange={handleChange}
              input={<Input id="select-multiple-checkbox" />}
              renderValue={selected => (
                <div className={classes.chips}>
                  { selected.map(value => (
                    <Chip key={value} label={getSortName(value)} className={classes.chip} />
                  ))}
                </div>
              )}
              MenuProps={MenuProps}
            >
              { matchTypeNames.map(name => (
                <MenuItem key={name} value={name}>
                  <Checkbox checked={checked.indexOf(name) > -1} />
                  <ListItemText style={{ textTransform: 'capitalize' }} primary={getSortName(name)} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Paper>
      </div>
      <div
        className={clsx({
          [classes.rootDown]: open ? window.innerWidth < 790 : window.innerWidth < 550 ,
          [classes.rootUp]: !( open ? window.innerWidth < 790 : window.innerWidth < 550 )
        })}
        style={{
          ...( open ? window.innerWidth >= 1090 : window.innerWidth >= 850 )?
          {justifyContent: 'center' } : {justifyContent: 'space-between' } }}>
        <Paper className={classes.paper}
          style={{
            ...!( open ? window.innerWidth >= 790 : window.innerWidth >= 550 )?
            { marginLeft: 'auto', marginRight: 'auto' } : null,
            marginTop: 'auto'
          }}>
          <div className={classes.statLabel}>
            <GolfCourse className={classes.icon} />
            <Typography variant="body1" className={classes.typo}>
              { ( sess && sess.language === 'EN' ) ? "Matches" : 'จำนวนการแข่งขัน' }
            </Typography>
          </div>
          <div className={classes.valueGrid}>
            { data &&
              <Typography variant="h3" classes={{ root: classes.value }}>
                {data.matchnum}
              </Typography>
            }
          </div>
        </Paper>
        <Paper className={classes.paper}
          style={{
            ...( open ? window.innerWidth >= 790 : window.innerWidth >= 550 )?
            { marginLeft: 24 } : { marginTop: 16 },
            ...!( open ? window.innerWidth >= 790 : window.innerWidth >= 550 )?
            { marginLeft: 'auto', marginRight: 'auto' } : null,
          }}>
          <div className={classes.statLabel}>
            <AssignmentInd className={classes.icon} />
            <Typography variant="body1" className={classes.typo}>
              { ( sess && sess.language === 'EN' ) ? "Handicap" : 'แฮนดิแคป' }
            </Typography>
          </div>
          <div className={classes.valueGrid}>
            { data &&
              <Typography variant="h3" classes={{ root: classes.value }}>
                { data.hc ? data.hc.toFixed(2) : '-' }
              </Typography>
            }
          </div>
        </Paper>
      </div>
    </React.Fragment>
  );
}
