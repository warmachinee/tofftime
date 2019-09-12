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
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },

}));


export default function History(props) {
  const classes = useStyles();
  const { API, COLOR, token, setCSRFToken, open, userid, pageOrganizer, pageData } = props
  const [ data, setData ] = React.useState(null)
  const [ scoreType, setScoreType ] = React.useState('total')

  async function handleFetch(){
    const resToken = token? token : await API.xhrGet('getcsrf')
    const sendObj = {
      action: 'history'
    }

    if(userid){
      Object.assign(sendObj, { targetuser: userid });
    }

    await API.xhrPost(
      token? token : resToken.token,
      'loadusersystem' , {
        ...sendObj
    }, function(csrf, d){
      setCSRFToken(csrf)
      if(pageOrganizer){
        setData(d.filter( item =>{
          return item.pageid === pageData.pageid
        }))
      }else{
        setData(d.filter( item =>{
          return item.pageid === 0
        }))
      }
    })
  }

  React.useEffect(()=>{
    handleFetch()
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
        <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '0 12px' }}>
          <Paper style={{ padding: '0 12px' }}>
            <FormControl className={classes.formControl}>
              <InputLabel>Type</InputLabel>
              <Select
                value={scoreType}
                onChange={e => setScoreType(e.target.value)}
              >
                <MenuItem value={'total'}>Total</MenuItem>
                <MenuItem value={'0'}>Amateur</MenuItem>
                <MenuItem value={'1'}>Pro</MenuItem>
              </Select>
            </FormControl>
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
          ( [
              ...(scoreType === 'total') ?
              data
              :
              data.filter( item =>{
                return parseInt(scoreType) === item.scorematch
              })
            ].length > 0 ?
            [
              ...(scoreType === 'total') ?
              data
              :
              data.filter( item =>{
                return parseInt(scoreType) === item.scorematch
              })
            ].map( d => <HistoryList key={d.matchid} data={d} {...props}/>)
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
