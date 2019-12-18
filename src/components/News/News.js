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
      { ( data && data.length > 0 ) ?
        <React.Fragment>
          <LabelText text={'News'} />
          <div className={classes.grid}>
            { data.map( d => <NewsCard key={d.newsid} {...props} data={d} /> ) }
            { ( data.length === 1 || data.length === 2 ) &&
              Array.from(new Array( 3 - data.length )).map((d, i) => <div key={i} style={{ width: 300 }} />)
            }
          </div>
        </React.Fragment>
        :
        null
      }
    </div>
  );
}
