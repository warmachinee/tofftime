import React from 'react';
import Loadable from 'react-loadable';
import { makeStyles } from '@material-ui/core/styles';
import * as API from './../../api'
import { grey } from './../../api/palette'

import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';

import { LDCircular } from './../loading/LDCircular'

const NewsListItem = Loadable({
  loader: () => import(/* webpackChunkName: "NewsListItem" */'./NewsListItem'),
  loading: () => <LDCircular />
});

export default function News(props) {
  const { sess, token, setCSRFToken, handleSnackBar, isSupportWebp, scale = 1, page, pageid } = props
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
      [theme.breakpoints.up(900 * scale)]: {
        width: '45%',
        marginTop: 0,
        maxHeight: '100%',
      },
    },

  }));
  const classes = useStyles();
  const [ data, setData ] = React.useState(null)

  async function handleFetchPage(){
    const resToken = token? token : await API.xhrGet('getcsrf')
    await API.xhrPost(
      token? token : resToken.token,
      'ploadpage', {
        action: 'postlist',
        pageid: pageid,
        userid: sess.userid,
        type: 'news'
    }, (csrf, d) =>{
      setCSRFToken(csrf)
      console.log('postlistnews',d);
      setData(d)
    })
  }

  async function handleFetch(){
    const resToken = token? token : await API.xhrGet('getcsrf')
    const d = await API.xhrGet('loadgeneral',
    `?_csrf=${token? token : resToken.token}&action=newslist`
    )
    setCSRFToken(d.token)
    setData(d.response)
  }

  React.useEffect(()=>{
    if(page){
      handleFetchPage()
    }else{
      handleFetch()
    }
  },[ ])

  return data && data.length > 0 ?(
    <List className={classes.root}>
      { API.handleSortArrayByDate(data, 'createdate', 'title').map( d=>
        <div key={page ? d.postid : d.newsid}>
          <NewsListItem {...props} data={d} key={d} time={API.handleGetPostTime(d.createdate)}/>
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
