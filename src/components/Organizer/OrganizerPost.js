import React from 'react';
import Loadable from 'react-loadable';
import { makeStyles } from '@material-ui/core/styles'
import { primary, grey } from './../../api/palette'

import {
  Grid, Box, Typography,
} from '@material-ui/core';


const LabelText = Loadable({
  loader: () => import(/* webpackChunkName: "LabelText" */ './../Utils/LabelText'),
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
  const { API, sess, token, setCSRFToken, pageid, pageOrganizer, pageData } = props
  const [ data, setData ] = React.useState(null)

  async function handleFetch(){
    const resToken = token? token : await API._xhrGet('getcsrf')
    await API._xhrPost(
      token? token : resToken.token,
      'mloadpage' , {
        action: 'postlist',
        pageid: pageOrganizer ? pageData.pageid : pageid,
        type: 'post'
    }, function(csrf, d){
      setCSRFToken(csrf)
      setData(d)
    })
  }

  React.useEffect(()=>{
    handleFetch()
  },[ props.dialog ])

  return(
    <div className={classes.root}>
      <LabelText text={ API._getWord(sess && sess.language).Post } />
      { data && data.length > 0 ?
        <div className={classes.grid}>
          { data?
            data.map( d => <OrganizerPostCard key={d.postid} {...props} data={d} pageid={pageid} /> )
            :
            Array.from(new Array(3)).map((d, i) => <OrganizerPostCard key={i} loading/>)
          }
        </div>
        :
        <Typography component="div" style={{ width: '100%', marginTop: 48 }}>
          <Box style={{ textAlign: 'center', color: primary[900] }} fontWeight={500} fontSize={24} m={1}>
            { API._getWord(sess && sess.language).No_data }
          </Box>
        </Typography>
      }
    </div>
  );
}
