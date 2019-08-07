import React from 'react';
import Loadable from 'react-loadable';
import { makeStyles } from '@material-ui/core/styles';
import * as API from '../../api'

import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';

import { LDCircular } from '../loading/LDCircular'

const NewsListItem = Loadable({
  loader: () => import(/* webpackChunkName: "NewsListItem" */'./NewsListItem'),
  loading: () => <LDCircular />
});

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    overflow: 'auto',
    overflowScrolling: 'touch',
    WebkitOverflowScrolling: 'touch',
    backgroundColor: theme.palette.background.paper,
    padding: 0,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 16,
    [theme.breakpoints.up(900)]: {
      width: '45%',
      marginTop: 0,
      maxHeight: '100%',
    },
  },
}));

export default function News(props) {
  const classes = useStyles();
  const { token, setCSRFToken, handleSnackBar, isSupportWebp } = props
  const [ data, setData ] = React.useState(null)

  async function handleFetch(){
    const res = await token? token : API.xhrGet('getcsrf')
    const d = await API.xhrGet('loadgeneral',
    `?_csrf=${res}&action=newslist`
    )
    setCSRFToken(d.token)
    setData(d.response)
  }

  React.useEffect(()=>{
    handleFetch()
  },[ ])

  return data ?(
    <List className={classes.root}>
      { API.handleSortArray(data, 'createdate', 'title').map( d=>
        <div key={d.newsid}>
          <NewsListItem data={d} key={d} isSupportWebp={isSupportWebp} time={API.handleGetPostTime(d.createdate)}/>
          <Divider />
        </div>
      )}
    </List>
  ):
  (
    <div className={classes.root}
      style={{ minHeight: 200, display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
      <div style={{ textAlign: 'center', fontWeight: 600, fontSize: 36, opacity: .7 }}>No news</div>
    </div>
  )
}
