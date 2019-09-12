import React from 'react';
import Loadable from 'react-loadable';
import { makeStyles } from '@material-ui/core/styles'
import { primary, grey } from './../../api/palette'

import {
  Button,
} from '@material-ui/core'

import Skeleton from '@material-ui/lab/Skeleton';

const MatchCard = Loadable({
  loader: () => import(/* webpackChunkName: "MatchCard" */ './MatchCard'),
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
  const { API, token, setCSRFToken, userid, createMatchState, pageOrganizer, pageData } = props
  const [ data, setData ] = React.useState(null)

  async function handleFetch(){
    const resToken = token? token : await API.xhrGet('getcsrf')
    const sendObj = {
      action: 'upcoming'
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
  },[ userid, createMatchState ])

  return(
    <div className={classes.root}>
      <LabelText text="Upcoming" />
      <div className={classes.grid}>
        { data ?
          ( data.length > 0 ?
            data.slice(0, 10).map( d => <MatchCard key={d.matchid} data={d} {...props} />)
            :
            <div style={{
                width: '100%', padding: '36px 0', textAlign: 'center',
                fontSize: 24, fontWeight: 600, borderRadius: 4, border: '1px solid', boxSizing: 'border-box' }}>No data</div>
          )
          :
          Array.from(new Array(2)).map((d, i) => <MatchCard key={i} />)
        }
      </div>
    </div>
  );
}
