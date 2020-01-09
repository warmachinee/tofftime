import React from 'react';
import clsx from "clsx";
import Loadable from 'react-loadable';
import { makeStyles } from '@material-ui/core/styles'
import { primary, grey } from './../../api/palette'

import {
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Typography,
  Box,
  Divider,
  Paper,
  InputLabel,
  MenuItem,
  FormHelperText,
  FormControl,
  Select,
  Checkbox,
  Input,
  Chip,
  IconButton,

} from '@material-ui/core'

import ArrowUpward from '@material-ui/icons/ArrowUpward'
import Skeleton from '@material-ui/lab/Skeleton';

const Statistics = Loadable({
  loader: () => import(/* webpackChunkName: "Statistics" */ './../Statistics/Statistics'),
  loading: () => null
});

const HistoryList = Loadable({
  loader: () => import(/* webpackChunkName: "HistoryList" */ './HistoryList'),
  loading: () => null
});

const LabelText = Loadable({
  loader: () => import(/* webpackChunkName: "LabelText" */ './../Utils/LabelText'),
  loading: () => null
});

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    maxWidth: 1200,
    width: '100%',
    margin: 'auto',
    marginBottom: 36,
    paddingTop: 24
  },
  grid: {
    boxSizing: 'border-box',
    padding: 12
  },
  gridChild: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '100%',
    padding: '0 12px',
    boxSizing: 'border-box',
  },
  gridFlexDirectionUp: {
    flexDirection: 'row'
  },
  gridFlexDirectionDown: {
    flexDirection: 'column'
  },
  listImageDown: {
    width: 36,
    marginRight: 0,
  },
  listImageUp: {
    width: 48,
    marginRight: 16,
  },
  imageDown: {
    width: 36,
    height: 36,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    objectFit: 'cover',
    cursor: 'pointer',
    borderRadius: 4,
  },
  imageUp: {
    width: 48,
    height: 48,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    objectFit: 'cover',
    cursor: 'pointer',
    borderRadius: 4,
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

export default function History(props) {
  const classes = useStyles();
  const {
    API, BTN, COLOR, sess, token, setCSRFToken, isSupportWebp, accountData, handleAccountData, open, userid, userData,
    pageOrganizer, pageData, userPageList
  } = props
  const [ data, setData ] = React.useState(null)
  const [ dataStat, setDataStat ] = React.useState(null)
  const [ statType, setStatType ] = React.useState('total')
  const [ checked, setChecked ] = React.useState([]);

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
    const resToken = token? token : await API._xhrGet('getcsrf')
    const sendObj = {
      action: 'editprofile',
      historystat: value
    }
    await API._xhrPost(
      token? token : resToken.token,
      'uusersystem', {
        ...sendObj
    }, (csrf, d) =>{
      setCSRFToken(csrf)
    })
    await handleFetchInfo()
  }

  async function handleFetchInfo(){
    const resToken = token? token : await API._xhrGet('getcsrf')
    await API._xhrPost(
      token? token : resToken.token,
      'loadusersystem', {
        action: 'info'
    }, (csrf, d) =>{
      setCSRFToken(csrf)
      handleAccountData({
        ...d,
        photopath: (
          d.photopath ?
          API._getPictureUrl(d.photopath) + ( isSupportWebp? '.webp' : '.jpg' ) + '#' + new Date().toISOString()
          :
          null
        )
      })
      setChecked(d.historystat)
    })
  }

  async function handleFetchStat(){
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
      setDataStat(d)
    })
  }

  async function handleFetch(){
    const resToken = token? token : await API._xhrGet('getcsrf')
    const urlAPI = pageOrganizer ? 'mloadpage' : 'loadusersystem'
    const sendObj = {}
    if(pageOrganizer && pageData){
      Object.assign(sendObj, {
        action: 'match',
        subaction: 'history',
        pageid: pageData.pageid
      });
    }else{
      Object.assign(sendObj, { action: 'history' });
    }

    if(userid){
      Object.assign(sendObj, { targetuser: userid });
      setChecked(userData.historystat)
    }else{
      if(accountData){
        setChecked(accountData.historystat)
      }else{
        setChecked(['indy'])
      }
    }

    await API._xhrPost(
      token? token : resToken.token,
      urlAPI, {
        ...sendObj
    }, function(csrf, d){
      setCSRFToken(csrf)
      if(!/wrong/.test(d.status)){
        if(pageOrganizer){
          setData(d.filter( item =>{
            return item.pageid === pageData.pageid
          }))
        }else{
          setData(d)
        }
        if(!pageOrganizer){
          handleFetchStat()
        }
      }
    })
  }

  React.useEffect(()=>{
    if (!(userData && userData.privacy === 'private')){
      handleFetch()
    }
  },[ props.userid ])

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
    <div id={`history${userid}`} className={classes.root}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex' }}>
          <BTN.NoStyleLink to={`/${ pageOrganizer ? `organizer/${pageData.pageid}` : 'user' }/history`}>
            <LabelText paddingTop={0} text={ API._getWord(sess && sess.language).History } />
          </BTN.NoStyleLink>
          { !/history/.test(window.location.href) &&
            <React.Fragment>
              <div style={{ flex: 1 }} />
              <IconButton style={{ marginTop: 'auto' }} onClick={()=>API._scrolllToId(`upcoming${userid}`)}>
                <ArrowUpward />
              </IconButton>
            </React.Fragment>
          }
        </div>
        <div
          className={clsx(classes.gridChild,{
            [classes.gridFlexDirectionDown]: open ? window.innerWidth < 700 : window.innerWidth < 460 ,
            [classes.gridFlexDirectionUp]: !( open ? window.innerWidth < 700 : window.innerWidth < 460 )
          })}>
          { /*
            <Paper
              style={{ boxSizing: 'border-box' }}
              className={clsx(
                {
                  [classes.controlPaperDown]: open ? window.innerWidth < 700 : window.innerWidth < 460 ,
                  [classes.controlPaperUp]: !( open ? window.innerWidth < 700 : window.innerWidth < 460 )
                },
                {
                  [classes.settingStatDown]: open ? window.innerWidth < 700 : window.innerWidth < 460 ,
                  [classes.settingStatUp]: !( open ? window.innerWidth < 700 : window.innerWidth < 460 )
                }
              )}>
              <FormControl className={clsx({
                [classes.formControlDown]: open ? window.innerWidth < 700 : window.innerWidth < 460 ,
                [classes.formControlUp]: !( open ? window.innerWidth < 700 : window.innerWidth < 460 )
              })}>
                <InputLabel>{ (sess && sess.language === 'TH')? 'การแข่งขัน' : 'Match' }</InputLabel>
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
            </Paper>*/
          }
          <Paper
            style={{ boxSizing: 'border-box', marginTop: 'auto' }}
            className={clsx({
              [classes.controlPaperDown]: open ? window.innerWidth < 700 : window.innerWidth < 460 ,
              [classes.controlPaperUp]: !( open ? window.innerWidth < 700 : window.innerWidth < 460 )
            })}>
            <form autoComplete="off">
              <FormControl className={clsx({
                [classes.formControlDown]: open ? window.innerWidth < 700 : window.innerWidth < 460 ,
                [classes.formControlUp]: !( open ? window.innerWidth < 700 : window.innerWidth < 460 )
              })}>
                <InputLabel>{ (sess && sess.language === 'TH')? 'ประเภท' : 'Type' }</InputLabel>
                <Select
                  value={statType}
                  onChange={e => setStatType(e.target.value)}>
                  <MenuItem value={'total'}>{ (sess && sess.language === 'TH')? 'ทั้งหมด' : 'Total' }</MenuItem>
                  <MenuItem value={'1'}>{ (sess && sess.language === 'TH')? 'มืออาชีพ' : 'Pro' }</MenuItem>
                  <MenuItem value={'0'}>{ (sess && sess.language === 'TH')? 'มือสมัครเล่น' : 'Amateur' }</MenuItem>
                  <MenuItem value={'2'}>{ (sess && sess.language === 'TH')? 'การกุศล' : 'Charity' }</MenuItem>
                </Select>
              </FormControl>
            </form>
          </Paper>
        </div>
      </div>
      <div className={classes.grid}>
        <List>
          <ListItem button style={{ backgroundColor: COLOR.grey[900] }}>
            <ListItemIcon
              className={clsx({
                [classes.listImageUp]: open ? window.innerWidth >= 740 : window.innerWidth >= 500,
                [classes.listImageDown]: open ? window.innerWidth < 740 : window.innerWidth < 500
              })}>
              <div className={clsx({
                [classes.imageUp]: open ? window.innerWidth >= 740 : window.innerWidth >= 500,
                [classes.imageDown]: open ? window.innerWidth < 740 : window.innerWidth < 500
              })} />
            </ListItemIcon>
            { ( open ? window.innerWidth >= 840 : window.innerWidth >= 600) &&
              <ListItemText style={{ maxWidth: 100, marginRight: 16, width: '100%', color: 'white' }}
                primary={ (sess && sess.language === 'TH')? 'วันที่' : 'Date' } />
            }
            <ListItemText style={{ color: 'white', width: 100 }}
              primary={ (sess && sess.language === 'TH')? 'การแข่งขัน' : 'Match' }
              secondary={
                <Typography variant="body2" style={{ color: 'white' }}>
                  {dataStat ? `${ dataStat.matchnum ? dataStat.matchnum : 0 } ${
                    ( sess && sess.language === 'TH' ) ? "การแข่งขัน" : `Match${ (dataStat.matchnum > 1) ? 'es': '' }`
                  }` : ''}
                </Typography>
              } />

            { ( open ? window.innerWidth >= 1140 : window.innerWidth >= 900) &&
              <ListItemText
                style={{ width: 100, color: 'white' }}
                primary={ (sess && sess.language === 'TH')? 'สนาม' : 'Course' } />
            }
            <ListItemText
              style={{ flex: 'none', width: 100, ...( open ? window.innerWidth < 690 : window.innerWidth < 450) && { maxWidth: 64 }}}
              primary={
                <Typography variant="subtitle2" color="textSecondary" style={{ color: 'white' }}>
                  {/*
                    ( open ? window.innerWidth >= 690 : window.innerWidth >= 450) ?
                    ( (sess && sess.language === 'TH')? 'แฮนดิแคป' : 'Handicap' ) : 'HC'*/
                    ( (sess && sess.language === 'TH')? 'แฮนดิแคป' : 'Handicap' )
                  }
                </Typography>
              }
              secondary={
                <Typography component="span" variant="subtitle2" color="textSecondary" style={{ color: 'white' }}>
                  {dataStat ? `${
                    ( open ? window.innerWidth >= 690 : window.innerWidth >= 450) ?
                    ( (sess && sess.language === 'TH')? 'เฉลี่ย' : 'Average' ) :
                    ( (sess && sess.language === 'TH')? 'เฉลี่ย' : 'Avg.' )
                  } ${ (dataStat && dataStat.hc) ? dataStat.hc : '-' }` : ''}
                </Typography>
              } />
          </ListItem>
        </List>
        {/* !pageOrganizer &&
          <Statistics {...props} checked={checked} setChecked={setChecked} />*/
        }
        { data ?
          (
            (/*API._sortArrByDate(data, 'matchdate')*/
              data.filter( item =>{
                return checked.some( d =>{ return item.type === d })
              }).filter( item =>{
                return (statType === 'total') ? ( true ) : ( parseInt(statType) === item.scorematch )
              }).length > 0
            ) ?
            data.filter( item =>{
              return checked.some( d =>{ return item.type === d })
            }).filter( item =>{
              return (statType === 'total') ? ( true ) : ( parseInt(statType) === item.scorematch )
            }).map( d => <HistoryList key={d.matchid} data={d} {...props} />)
            :
            <Typography component="div" style={{ width: '100%', marginTop: 48 }}>
              <Box style={{ textAlign: 'center', color: primary[900] }} fontWeight={500} fontSize={24} m={1}>
                { API._getWord(sess && sess.language).No_match }
              </Box>
              <Box style={{ textAlign: 'center', color: primary[900] }} fontWeight={500} fontSize={16} m={1}>
                { API._getWord(sess && sess.language)['Please join or create match'] }
              </Box>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <BTN.NoStyleLink to={`/${ pageOrganizer ? `organizer/${pageData.pageid}` : 'user' }/create_match`}>
                  <BTN.PrimaryOutlined>
                    { API._getWord(sess && sess.language).Create_Match }
                  </BTN.PrimaryOutlined>
                </BTN.NoStyleLink>
              </div>
            </Typography>
          )
          :
          Array.from(new Array(2)).map( (d, i)=> <HistoryList key={i} {...props} />)
        }
      </div>
    </div>
  );
}
