import React from 'react';
import Loadable from 'react-loadable';
import { makeStyles } from '@material-ui/core/styles';
import * as API from './../api'
import { primary, red } from './../api/palette'

import Avatar from '@material-ui/core/Avatar';
import Fab from '@material-ui/core/Fab';
import Typography from '@material-ui/core/Typography';

import ImageIcon from '@material-ui/icons/Image';

import { LDMatchList } from './../components/loading/LDMatchList';
import { LDCircular } from './../components/loading/LDCircular';

const AnnouncementNewsGrid = Loadable({
  loader: () => import(/* webpackChunkName: "AnnouncementNewsGrid" */'./../components/AnnouncementNewsGrid'),
  loading: () => <LDCircular />
});

const MatchList = Loadable({
  loader: () => import(/* webpackChunkName: "MatchList" */'./../components/Match/MatchList'),
  loading: () => <LDMatchList />
});

const PostList = Loadable({
  loader: () => import(/* webpackChunkName: "PostList" */'./../components/Page/PostList'),
  loading: () => <LDCircular />
});

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(1, 2),
    backgroundColor: theme.palette.background.paper,
  },

}));

export default function Organizer(props) {
  const classes = useStyles();
  const { sess, token, setCSRFToken, isSupportWebp, setPageData } = props
  const pageid = props.computedMatch? parseInt(props.computedMatch.params.pageParam) : null

  async function handleFetch(){
    if(pageid){
      const resToken = token? token : await API.xhrGet('getcsrf')
      await API.xhrPost(
        token? token : resToken.token,
        'ploadpage', {
          action: 'detail',
          pageid: pageid
      }, (csrf, d) =>{
        setCSRFToken(csrf)
        setPageData(d[0])
        handleFetchPostList()
        console.log('pagedetail', d);
      })
    }
  }

  async function handleFetchPostList(){
    const resToken = token? token : await API.xhrGet('getcsrf')
    await API.xhrPost(
      token? token : resToken.token,
      'ploadpage', {
        action: 'postlist',
        pageid: pageid,
        userid: sess.userid,
    }, (csrf, d) =>{
      setCSRFToken(csrf)
      console.log('postlist', d);
    })
  }

  React.useEffect(()=>{
    if(sess){
      handleFetch()
    }
  },[ ])

  return (
    <div className={classes.root}>
      <AnnouncementNewsGrid page {...props} pageid={pageid}/>
      <MatchList page {...props} pageid={pageid}/>
      {/*<PostList {...props} pageid={pageid}/>*/}
    </div>
  );
}
