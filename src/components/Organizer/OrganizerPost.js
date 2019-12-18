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
    marginTop: 24,
    padding: theme.spacing(0, 1.5, 1.5, 1.5),
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    boxSizing: 'border-box',
    [theme.breakpoints.down(400)]: {
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    },
  },

}));

export default function OrganizerPost(props) {
  const classes = useStyles();
  const { API, sess, token, setCSRFToken, pageid, pageOrganizer, pageData, isAllEmpty, setIsPostNotEmpty } = props
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
      if(setIsPostNotEmpty){
        if(d.length > 0){
          setIsPostNotEmpty(true)
        }else{
          setIsPostNotEmpty(false)
        }
      }
    })
  }

  React.useEffect(()=>{
    handleFetch()
  },[ props.dialog ])

  return(
    <div className={classes.root}>
      { data && data.length > 0 ?
        <React.Fragment>
          <LabelText text={ API._getWord(sess && sess.language).Post } />
          <div className={classes.grid}>
            { data.map( d => <OrganizerPostCard key={d.postid} {...props} data={d} pageid={pageid} /> ) }
            { ( data.length === 1 || data.length === 2 ) &&
              Array.from(new Array( 3 - data.length )).map((d, i) => <div key={i} style={{ width: 300 }} />)
            }
          </div>
        </React.Fragment>
        :
        /*
        <Typography component="div" style={{ width: '100%', marginTop: 48 }}>
          <Box style={{ textAlign: 'center', color: primary[900] }} fontWeight={500} fontSize={24} m={1}>
            { API._getWord(sess && sess.language).No_data }
          </Box>
        </Typography>*/
        null
      }
    </div>
  );
}
