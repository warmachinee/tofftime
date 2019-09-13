import React from 'react';
import Loadable from 'react-loadable';
import ReactHtmlParser from 'react-html-parser';
import { makeStyles, fade, withStyles } from '@material-ui/core/styles';
import { primary } from './../../api/palette'

import CKEditor from '@ckeditor/ckeditor5-react';

import BalloonEditor from '@ckeditor/ckeditor5-build-balloon-block';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';

const GoBack = Loadable({
  loader: () => import(/* webpackChunkName: "GoBack" */'./../GoBack'),
  loading: () => null
});

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: window.innerHeight * .8,
    maxWidth: 1200,
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: theme.spacing(3, 2),
  },
  content: {
    margin: '0 5%',
    [theme.breakpoints.up(500)]: {
      margin: '0 5%',
    },
    [theme.breakpoints.up(700)]: {
      margin: '0 72px',
    },
  },
  img: {
    width: '100%',
    color: 'black',
    backgroundColor: '#ccc',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },

}))

export default function OrganizerAnnounceDetail(props){
  const classes = useStyles();
  const { API, sess, token, setCSRFToken, handleSnackBar, isSupportWebp } = props
  const [ data, setData ] = React.useState(null)

  async function handleFetch(){
    const pageid = parseInt(props.computedMatch.params.pageid)
    const postid = parseInt(props.computedMatch.params.postid)
    const resToken = token? token : await API.xhrGet('getcsrf')
    await API.xhrPost(
      token? token : resToken.token,
      'mloadpage', {
        action: 'postdetail',
        pageid: pageid,
        postid: postid,
    }, (csrf, d) =>{
      setCSRFToken(csrf)
      setData(d)
    })
  }

  React.useEffect(()=>{
    if(props.computedMatch){
      handleFetch()
    }
    /*
    if(sess && sess.status !== 1){
      handleSnackBar({
        state: true,
        message: 'Please login before to continue.',
        variant: 'error',
        autoHideDuration: 10000,
      })
      setTimeout(()=>{
        window.location.pathname = '/login'
      }, 11000)
    }else{
      if(props.computedMatch){
        handleFetch()
      }
    }*/
    window.scrollTo(0, 0)
  },[ ])

  return(
    <Paper className={classes.root}>
      <GoBack />
      { data &&
        <div className={classes.content}>
          <Typography gutterBottom variant="h3">
            {data.message}
          </Typography>
          { data.photopath &&
            <img className={classes.img} src={API.getPictureUrl(data.photopath) + ( isSupportWebp? '.webp' : '.jpg' )} />
          }
          <DetailComponent messagedetail={data.messagedetail}/>
        </div>
      }
    </Paper>
  );
}

function DetailComponent(props){
  const { messagedetail } = props

  return(
    <div className="ck-blurred ck ck-content ck-editor__editable ck-rounded-corners ck-editor__editable_inline ck-read-only">
      {ReactHtmlParser(messagedetail)}
    </div>
  );
}