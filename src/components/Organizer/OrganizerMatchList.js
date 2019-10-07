import React from 'react';
import Loadable from 'react-loadable';
import { makeStyles } from '@material-ui/core/styles'
import { primary, grey } from './../../api/palette'

import Skeleton from '@material-ui/lab/Skeleton';

const OrganizerMatchCard = Loadable({
  loader: () => import(/* webpackChunkName: "OrganizerMatchCard" */ './OrganizerMatchCard'),
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
    display: 'flex',
    flexWrap: 'wrap',
    WebkitFlexWrap: 'wrap',
    boxSizing: 'border-box',
    justifyContent: 'space-around'
  },

}));

export default function OrganizerMatchList(props) {
  const classes = useStyles();
  const { API, sess, token, setCSRFToken, pageid, pageOrganizer, pageData } = props
  const [ data, setData ] = React.useState(null)

  async function handleFetch(){
    const resToken = token? token : await API.xhrGet('getcsrf')
    await API.xhrPost(
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
  },[ props.createPostState ])

  return(
    <div className={classes.root}>
      <LabelText text={ ( sess && sess.language === 'TH' ) ? "การแข่งขัน" : 'Match list' } />
      <div className={classes.grid}>
        { ( data && data.length > 0 ) ?
          data.map( d => <OrganizerMatchCard key={d.postid} data={d} {...props} />)
          :
          <div style={{
              width: '100%', padding: '36px 0', textAlign: 'center',
              fontSize: 24, fontWeight: 600, borderRadius: 4, border: '1px solid', boxSizing: 'border-box' }}>No data</div>
        }
      </div>
    </div>
  );
}
