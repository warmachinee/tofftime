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
  ListItem,
  ListItemIcon,
  ListItemText,
  Checkbox,
  Input,
  Chip,
  Divider,

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
    /*
    marginLeft: 'auto',
    marginRight: 'auto',*/
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
    padding: 12,
    justifyContent: 'center',
  },
  rootUp: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    boxSizing: 'border-box',
    margin: 'auto',
    padding: 12,
    justifyContent: 'center',
  },
  paper: {
    boxSizing: 'border-box',
    width: '100%',
    padding: theme.spacing(3, 4),
    display: 'flex',
    borderRadius: 0,
    maxWidth: 250
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
    fontWeight: 300
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
  const { API, COLOR, isSupportWebp, sess, token, setCSRFToken, handleAccountData, open, accountData, userid, userData, checked, setChecked } = props
  const [ data, setData ] = React.useState(null)

  function getSortName(name){
    if(sess && sess.language === 'TH'){
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
    }else{
      return name
    }
  }

  async function handleFetch(){
    const resToken = token? token : await API._xhrGet('getcsrf')
    const sendObj = {
      action: 'statavg'
    }

    if(userid){
      Object.assign(sendObj, { targetuser: userid });
    }

    await API._xhrPost(
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
    }
  },[ userid ])

  React.useEffect(()=>{
    if(!(userid && userData)){
      if(accountData){
        setChecked(accountData.historystat)
      }
    }
  },[ accountData, checked ])

  return (
    <React.Fragment>
      { data &&
        <ListItem>
          <ListItemText
            primary={`${data.matchnum} ${ ( sess && sess.language === 'TH' ) ? "การแข่งขัน" : `Match${ (data && data.matchnum > 1) ? 'es': '' }` }`} />
          <ListItemIcon style={{ ...( open ? window.innerWidth < 690 : window.innerWidth < 450) && { minWidth: 32 }}}>
            <Typography variant="body1" color="textPrimary">
              {`${
                ( open ? window.innerWidth >= 690 : window.innerWidth >= 450) ?
                ( (sess && sess.language === 'TH')? 'แฮนดิแคปเฉลี่ย' : 'Average Handicap' ) : 'Avg.'
              } ${ data.hc ? data.hc : '-' }`}
            </Typography>
          </ListItemIcon>
        </ListItem>
      }
      {/*
        <div
          className={clsx({
            [classes.rootDown]: open ? window.innerWidth < 750 : window.innerWidth < 475 ,
            [classes.rootUp]: !( open ? window.innerWidth < 750 : window.innerWidth < 475 )
          })}>
          <Paper className={classes.paper}
            style={{
              ...!( open ? window.innerWidth >= 750 : window.innerWidth >= 475 )?
              { marginLeft: 'auto', marginRight: 'auto' } : null,
              marginTop: 'auto'
            }}>
            <div className={classes.statLabel}>
              <GolfCourse className={classes.icon} style={{ color: primary[700] }} />
              <Typography variant="body1" className={classes.typo} style={{ color: primary[300] }}>
                { ( sess && sess.language === 'TH' ) ? "จำนวนการแข่งขัน" : `Match${ (data && data.matchnum > 1) ? 'es': '' }` }
              </Typography>
            </div>
            <div className={classes.valueGrid}>
              { data &&
                <Typography variant="h3" classes={{ root: classes.value }} style={{ color: primary[700] }}>
                  {data.matchnum}
                </Typography>
              }
            </div>
          </Paper>
          <Paper className={classes.paper}
            style={{
              ...( open ? window.innerWidth >= 750 : window.innerWidth >= 475 )?
              { marginLeft: 24 } : { marginTop: 16 },
              ...!( open ? window.innerWidth >= 750 : window.innerWidth >= 475 )?
              { marginLeft: 'auto', marginRight: 'auto' } : null,
            }}>
            <div className={classes.statLabel}>
              <AssignmentInd className={classes.icon} style={{ color: COLOR.primary[700] }} />
              <Typography variant="body1" className={classes.typo} style={{ color: COLOR.primary[300] }}>
                { API._getWord(sess && sess.language).Handicap }
              </Typography>
            </div>
            <div className={classes.valueGrid}>
              { data &&
                <Typography variant="h3" classes={{ root: classes.value }} style={{ color: COLOR.primary[700] }}>
                  { data.hc ? data.hc : '-' }
                </Typography>
              }
            </div>
          </Paper>
        </div>*/
      }
      <Divider />
    </React.Fragment>
  );
}
