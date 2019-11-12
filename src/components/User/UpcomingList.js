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

} from '@material-ui/core'

import Skeleton from '@material-ui/lab/Skeleton';

const UpcomingListItem = Loadable({
  loader: () => import(/* webpackChunkName: "UpcomingListItem" */ './UpcomingListItem'),
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
  },
  grid: {
    boxSizing: 'border-box',
    marginTop: 24
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

}));


export default function UpcomingList(props) {
  const classes = useStyles();
  const { sess, API, COLOR, token, setCSRFToken, open, userid, pageOrganizer, pageData, pageList } = props
  const [ data, setData ] = React.useState(null)

  async function handleFetch(){
    const resToken = token? token : await API._xhrGet('getcsrf')
    const sendObj = {
      action: 'upcoming'
    }

    if(userid){
      Object.assign(sendObj, { targetuser: userid });
    }

    await API._xhrPost(
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
          setData(d)
        }
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
      <LabelText text={ (sess && sess.language === 'TH')? 'เร็วๆนี้' : 'Upcoming' } />
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
              primary={ (sess && sess.language === 'TH')? 'การแข่งขัน' : 'Match' } />

            { ( open ? window.innerWidth >= 1140 : window.innerWidth >= 900) &&
              <ListItemText
                style={{ width: 100, color: 'white' }}
                primary={ (sess && sess.language === 'TH')? 'สนาม' : 'Course' } />
            }
          </ListItem>
        </List>
        <Divider />
        { data ?
          ( data.length > 0 ?
            API.sortReverseArrByDate(data, 'matchdate').map( d => <UpcomingListItem key={d.matchid} data={d} {...props} />)
            :
            <div style={{
                width: '100%', padding: '36px 0', textAlign: 'center',
                fontSize: 24, fontWeight: 600, borderRadius: 4, border: '1px solid', boxSizing: 'border-box' }}>No data</div>
          )
          :
          Array.from(new Array(2)).map( (d, i)=> <UpcomingListItem key={i} {...props} />)
        }
      </div>
    </div>
  );
}
