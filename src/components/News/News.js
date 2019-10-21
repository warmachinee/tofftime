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

const NewsCard = Loadable({
  loader: () => import(/* webpackChunkName: "NewsCard" */ './NewsCard'),
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

export default function News(props) {
  const classes = useStyles();
  const {
    COLOR, API, BTN, isSupportWebp, token, setCSRFToken, sess
  } = props
  const [ data, setData ] = React.useState(null)

  async function handleFetch(){
    const resToken = token? token : await API._xhrGet('getcsrf')
    const d = await API._xhrGet('loadgeneral',
    `?_csrf=${token? token : resToken.token}&action=newslist`
    )
    setCSRFToken(d.token)
    setData(d.response)
  }

  React.useEffect(()=>{
    handleFetch()
  },[ ])

  return(
    <div id="el_news" className={classes.root}>
      { data && data.length > 0 &&
        <React.Fragment>
          <LabelText text={ ( sess && sess.language === 'TH' ) ? "ข่าว" : 'News' } />
          <div className={classes.grid}>
            { data?
              data.map( d => <NewsCard key={d.newsid} {...props} data={d} /> )
              :
              Array.from(new Array(3)).map((d, i) => <NewsCard key={i} loading/>)
            }
          </div>
        </React.Fragment>
      }
    </div>
  );
}
