import React from 'react';
import Loadable from 'react-loadable';
import { makeStyles } from '@material-ui/core/styles'
import { primary, grey } from './../../api/palette'

import {
  Button, Typography, Box
} from '@material-ui/core'

import Skeleton from '@material-ui/lab/Skeleton';

const MatchCard = Loadable({
  loader: () => import(/* webpackChunkName: "MatchCard" */ './MatchCard'),
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
  },
  grid: {
    marginTop: 24,
    padding: theme.spacing(1.5),
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    boxSizing: 'border-box',
  },

}));

export default function Upcoming(props) {
  const classes = useStyles();
  const { API, sess, token, setCSRFToken, userid, userData, pageOrganizer, pageData } = props
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
    if (!(userData && userData.privacy === 'private')){
      handleFetch()
    }
  },[ userid ])

  return(
    <div className={classes.root}>
      <LabelText text={ (sess && sess.language === 'TH')? 'เร็วๆนี้' : 'Upcoming' } />
      <div className={classes.grid}>
        { data ?
          ( data.length > 0 ?
            API.sortReverseArrByDate(data, 'matchdate').slice(0, 10).map( d => <MatchCard key={d.matchid} data={d} setData={setData} {...props} />)
            :
            <Typography component="div" style={{ width: '100%', marginTop: 48 }}>
              <Box style={{ textAlign: 'center', color: primary[900] }} fontWeight={500} fontSize={24} m={1}>
                { API._getWord(sess && sess.language).No_data }
              </Box>
            </Typography>
          )
          :
          Array.from(new Array(2)).map((d, i) => <MatchCard key={i} />)
        }
        { data && ( data.length === 1 || data.length === 2 ) &&
          Array.from(new Array( 3 - data.length )).map((d, i) => <div key={i} style={{ width: 300 }} />)
        }
      </div>
    </div>
  );
}
