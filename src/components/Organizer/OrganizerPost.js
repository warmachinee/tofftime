import React from 'react';
import Loadable from 'react-loadable';
import { makeStyles } from '@material-ui/core/styles'
import { primary, grey } from './../../api/palette'

import {
  Grid, Box, Typography,
} from '@material-ui/core';


const LabelText = Loadable({
  loader: () => import(/* webpackChunkName: "LabelText" */ './../LabelText'),
  loading: () => null
});

const OrganizerPostCard = Loadable({
  loader: () => import(/* webpackChunkName: "OrganizerPostCard" */ './OrganizerPostCard'),
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
    padding: theme.spacing(1.5),
    display: 'grid',
    boxSizing: 'border-box',
    gridTemplateColumns: 'auto',
    [theme.breakpoints.up(1000)]: {
      gridTemplateColumns: 'auto auto',
    },
  },

}));

export default function OrganizerPost(props) {
  const classes = useStyles();
  const { API, sess, token, setCSRFToken, pageid } = props
  const [ data, setData ] = React.useState(null)

  async function handleFetch(){
    const resToken = token? token : await API.xhrGet('getcsrf')
    await API.xhrPost(
      token? token : resToken.token,
      'mloadpage' , {
        action: 'postlist',
        pageid: pageid,
        type: 'post'
    }, function(csrf, d){
      setCSRFToken(csrf)
      setData(d)
    })
  }

  React.useEffect(()=>{
    handleFetch()
  },[ ])

  return(
    <div className={classes.root}>
      <LabelText text="Post"/>
      <div className={classes.grid}>
        { data?
          ( data.length > 0 ?
            data.map( d => <OrganizerPostCard key={d.postid} {...props} data={d}/> )
            :
            <div style={{
                width: '100%', padding: '36px 0', textAlign: 'center',
                fontSize: 24, fontWeight: 600, borderRadius: 4, border: '1px solid', boxSizing: 'border-box' }}>No data</div>
          )
          :
          Array.from(new Array(3)).map((d, i) => <OrganizerPostCard key={i} loading/>)
        }
      </div>

    </div>
  );
}