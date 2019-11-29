import React from 'react';
import Loadable from 'react-loadable';
import { makeStyles } from '@material-ui/core/styles'
import { primary, grey } from './../../api/palette'

import {
  Typography,
  Box,

} from '@material-ui/core/';

import Skeleton from '@material-ui/lab/Skeleton';

const OrganizerMatchCard = Loadable({
  loader: () => import(/* webpackChunkName: "OrganizerMatchCard" */ './OrganizerMatchCard'),
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

export default function OrganizerMatchList(props) {
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
        type: 'match'
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
      <LabelText text={ API._getWord(sess && sess.language).Match_list } />
      { ( data && data.length > 0 ) ?
        <div className={classes.grid}>
          { data.map( d => <OrganizerMatchCard key={d.postid} data={d} setData={setData} {...props} />) }
          { ( data.length === 1 || data.length === 2 ) &&
            Array.from(new Array( 3 - data.length )).map((d, i) => <div key={i} style={{ width: 300 }} />)
          }
        </div>
        :
        <Typography component="div" style={{ width: '100%', marginTop: 48 }}>
          <Box style={{ textAlign: 'center', color: primary[900] }} fontWeight={500} fontSize={24} m={1}>
            { API._getWord(sess && sess.language).No_match }
          </Box>
        </Typography>
      }
    </div>
  );
}
