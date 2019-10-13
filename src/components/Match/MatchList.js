import React from 'react';
import Loadable from 'react-loadable';
import { makeStyles } from '@material-ui/core/styles'
import { primary, grey } from './../../api/palette'

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

export default function MatchList(props) {
  const classes = useStyles();
  const { API, sess, token, setCSRFToken } = props
  const [ data, setData ] = React.useState(null)

  async function handleFetch(){
    const resToken = token? token : await API.xhrGet('getcsrf')
    await API.xhrPost(
      token? token : resToken.token,
      'loadmatchsystem' , {
        action: 'matchlist'
    }, function(csrf, d){
      setCSRFToken(csrf)
      setData(d)
    })
  }

  React.useEffect(()=>{
    handleFetch()
  },[ ])

  return(
    <div id="el_match" className={classes.root}>
      { data && data.filter( item =>{ return item.typescore === 1 }).length > 0 &&
        <React.Fragment>
          <LabelText text={ ( sess && sess.language === 'TH' ) ? "การแข่งขันมืออาชีพ" : 'Professional match' } />
          <div className={classes.grid}>
            { data.filter( item =>{ return item.typescore === 1 }).map( d => <MatchCard key={d.matchid} data={d} {...props} />) }
          </div>
        </React.Fragment>
      }
      { data && data.filter( item =>{ return item.typescore !== 1 }).length > 0 &&
        <React.Fragment>
          <LabelText text={ ( sess && sess.language === 'TH' ) ? "การแข่งขันมือสมัครเล่น" : 'Amateur match' } />
          <div className={classes.grid}>
            { data.filter( item =>{ return item.typescore !== 1 }).map( d => <MatchCard key={d.matchid} data={d} {...props} />) }
          </div>
        </React.Fragment>
      }
    </div>
  );
}
