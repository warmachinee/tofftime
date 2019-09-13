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

} from '@material-ui/core'

import Skeleton from '@material-ui/lab/Skeleton';

const HistoryList = Loadable({
  loader: () => import(/* webpackChunkName: "HistoryList" */ './HistoryList'),
  loading: () => null
});

const LabelText = Loadable({
  loader: () => import(/* webpackChunkName: "LabelText" */ './../LabelText'),
  loading: () => null
});

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    maxWidth: 1200,
    width: '100%',
    margin: 'auto',
    marginBottom: 36,
  },
  grid: {
    boxSizing: 'border-box',
    marginTop: 24,
    padding: 12
  },
  gridChild: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '100%',
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
  const { API, COLOR, token, setCSRFToken, accountData, open, userid, userData, pageOrganizer, pageData } = props
  const [ data, setData ] = React.useState(null)
  const [ statType, setStatType ] = React.useState('total')
  const [ checked, setChecked ] = React.useState([]);

  function handleChange(event) {
    var value = event.target.value
    if(event.target.value.length > 0){
      setChecked(event.target.value);
      value = event.target.value
    }else{
      setChecked(['indy']);
      value = ['indy']
    }
  }

  async function handleFetch(){
    const resToken = token? token : await API.xhrGet('getcsrf')
    const sendObj = {
      action: 'history'
    }

    if(userid){
      Object.assign(sendObj, { targetuser: userid });
      setChecked(userData.historystat)
    }else{
      setChecked(accountData.historystat)
    }

    await API.xhrPost(
      token? token : resToken.token,
      'loadusersystem' , {
        ...sendObj
    }, function(csrf, d){
      setCSRFToken(csrf)
      if(!/wrong/.test(d.status)){
        if(pageOrganizer){
          setData(d.filter( item =>{
            return item.pageid === pageData.pageid
          }))
        }else{
          setData(d.filter( item =>{
            return item.pageid === 0
          }))
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
    <div className={classes.root}>
      <LabelText text="History" />
      <div className={classes.grid}>
        <div
          className={clsx(classes.gridChild,{
            [classes.gridFlexDirectionDown]: open ? window.innerWidth < 790 : window.innerWidth < 550 ,
            [classes.gridFlexDirectionUp]: !( open ? window.innerWidth < 790 : window.innerWidth < 550 )
          })}>
          <Paper
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
              <InputLabel>Match</InputLabel>
              <Select
                multiple
                value={checked}
                onChange={handleChange}
                input={<Input id="select-multiple-checkbox" />}
                renderValue={selected => (
                  <div className={classes.chips}>
                    { selected.map(value => (
                      <Chip key={value} label={value} className={classes.chip} />
                    ))}
                  </div>
                )}
                MenuProps={MenuProps}
              >
                { matchTypeNames.map(name => (
                  <MenuItem key={name} value={name}>
                    <Checkbox checked={checked.indexOf(name) > -1} />
                    <ListItemText style={{ textTransform: 'capitalize' }} primary={name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Paper>
          <Paper
            className={clsx({
              [classes.controlPaperDown]: open ? window.innerWidth < 790 : window.innerWidth < 550 ,
              [classes.controlPaperUp]: !( open ? window.innerWidth < 790 : window.innerWidth < 550 )
            })}>
            <form autoComplete="off">
              <FormControl className={clsx({
                [classes.formControlDown]: open ? window.innerWidth < 790 : window.innerWidth < 550 ,
                [classes.formControlUp]: !( open ? window.innerWidth < 790 : window.innerWidth < 550 )
              })}>
                <InputLabel>Type</InputLabel>
                <Select
                  value={statType}
                  onChange={e => setStatType(e.target.value)}
                >
                  <MenuItem value={'total'}>Total</MenuItem>
                  <MenuItem value={'0'}>Amateur</MenuItem>
                  <MenuItem value={'1'}>Pro</MenuItem>
                </Select>
              </FormControl>
            </form>
          </Paper>
        </div>
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
                primary="date" />
            }
            <ListItemText style={{ color: 'white', width: 100 }}
              primary="Match" />

            { ( open ? window.innerWidth >= 1140 : window.innerWidth >= 900) &&
              <ListItemText
                style={{ width: 100, color: 'white' }}
                primary="Location" />
            }
            <ListItemIcon style={{ ...( open ? window.innerWidth < 690 : window.innerWidth < 450) && { minWidth: 32 }}}>
              <Typography variant="subtitle2" color="textSecondary" style={{ color: 'white' }}>
                { ( open ? window.innerWidth >= 690 : window.innerWidth >= 450) ? 'Handicap' : 'HC'}
              </Typography>
            </ListItemIcon>
          </ListItem>
        </List>
        <Divider />
        { data ?
          (
            (
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
            }).map( d => <HistoryList key={d.matchid} data={d} {...props}/>)
            :
            <div style={{
                width: '100%', padding: '36px 0', textAlign: 'center',
                fontSize: 24, fontWeight: 600, borderRadius: 4, border: '1px solid', boxSizing: 'border-box' }}>No data</div>
          )
          :
          Array.from(new Array(2)).map( (d, i)=> <HistoryList key={i} {...props}/>)
        }
      </div>
    </div>
  );
}
