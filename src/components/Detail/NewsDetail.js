import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import { makeStyles, fade, withStyles } from '@material-ui/core/styles';
import { primary } from './../../api/palette'

import CKEditor from '@ckeditor/ckeditor5-react';

import BalloonEditor from '@ckeditor/ckeditor5-build-balloon-block';

import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: window.innerHeight * .8,
    maxWidth: 1200,
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: theme.spacing(3, 2),
  },
  back: {
    backgroundColor: 'white',
    '&:hover': {
      backgroundColor: fade(primary[600], 0.25),
    },
  },
  backIcon: {
    fontSize: '2rem',
    color: primary[800],
    [theme.breakpoints.up(500)]: {
      fontSize: '2.5rem',
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

export default function NewsDetail(props){
  const classes = useStyles();
  const { API, sess, token, setCSRFToken, handleSnackBar, isSupportWebp } = props
  const [ data, setData ] = React.useState(null)
  //const splitStr = props.computedMatch.params.detailparam.split('-')

  async function handleFetchPost(newsid, pageid){
    const resToken = token? token : await API.xhrGet('getcsrf')
    await API.xhrPost(
      token? token : resToken.token,
      'ploadpage', {
        action: 'postdetail',
        pageid: pageid,
        postid: newsid,
        userid: sess.userid
    }, (csrf, d) =>{
      setCSRFToken(csrf)
      setData(d)
      console.log('postdetail', d);
    })
  }

  async function handleFetch(newsid){
    const resToken = token? token : await API.xhrGet('getcsrf')
    const d = await API.xhrGet('loadgeneral',
    `?_csrf=${token? token : resToken.token}&action=newsdetail&newsid=${newsid}`
    )
    setCSRFToken(d.token)
    setData(d.response[0])
  }

  React.useEffect(()=>{
    let newsid;
    let pageid;
    /*
    console.log(splitStr);
    if(splitStr.length > 1){
      pageid = parseInt(splitStr[0])
      newsid = parseInt(splitStr[1])
      handleFetchPost(newsid, pageid)
    }else{
      newsid = parseInt(props.computedMatch.params.detailparam)
      handleFetch(newsid)
    }*/
    newsid = parseInt(props.computedMatch.params.detailparam)
    handleFetch(newsid)
  },[ ])

  return(
    <Paper className={classes.root}>
      <div style={{ width: '100%' }}>
        <IconButton className={classes.back} onClick={()=>window.history.go(-1)}>
          <ArrowBackIcon classes={{ root: classes.backIcon }}/>
        </IconButton>
      </div>
      {
        /*splitStr.length > 1 ?
        (
          <div>
            <Typography variant="h2">
              {data && data.message ? data.message : ''}
            </Typography>
            <Typography variant="h5">
              {data && data.submessage ? data.submessage : ''}
            </Typography>
            { data && data.photopath &&
              <img className={classes.img} src={API.getPictureUrl(data.photopath) + ( isSupportWebp? '.webp' : '.jpg' )} />
            }
            <DetailComponent newsdetail={data && data.messagedetail ? data.messagedetail : ''}/>
          </div>
        )
        :
        (
          data &&
          data.map( d =>
            <div key={d.title}>
              <Typography variant="h2">
                {d.title}
              </Typography>
              <Typography variant="h5">
                {d.subtitle}
              </Typography>
              {
                d.picture &&
                  <img className={classes.img} src={API.getPictureUrl(data.photopath) + ( isSupportWebp? '.webp' : '.jpg' )} />
              }
              <DetailComponent newsdetail={d.newsdetail}/>
            </div>
          )
        )*/
        data &&
        <div>
          <Typography variant="h2">
            {data.title}
          </Typography>
          <Typography variant="h5">
            {data.subtitle}
          </Typography>
          {
            data.picture &&
              <img className={classes.img} src={API.getPictureUrl(data.photopath) + ( isSupportWebp? '.webp' : '.jpg' )} />
          }
          <DetailComponent newsdetail={data.newsdetail}/>
        </div>
      }
    </Paper>
  );
}

function DetailComponent(props){
  const { newsdetail } = props

  return(
    <div className="ck-blurred ck ck-content ck-editor__editable ck-rounded-corners ck-editor__editable_inline ck-read-only">
      {ReactHtmlParser(newsdetail)}
    </div>
  );
}
