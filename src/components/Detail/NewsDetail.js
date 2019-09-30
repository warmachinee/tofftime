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

export default function NewsDetail(props){
  const classes = useStyles();
  const { API, sess, token, setCSRFToken, handleSnackBar, isSupportWebp } = props
  const [ data, setData ] = React.useState(null)

  async function handleFetch(){
    const newsid = parseInt(props.computedMatch.params.detailparam)
    const resToken = token? token : await API.xhrGet('getcsrf')
    const d = await API.xhrGet('loadgeneral',
    `?_csrf=${token? token : resToken.token}&action=newsdetail&newsid=${newsid}`
    )
    setCSRFToken(d.token)
    setData(d.response[0])
  }

  React.useEffect(()=>{
    handleFetch()
    window.scrollTo(0, 0)
  },[ ])

  return(
    <Paper className={classes.root}>
      <GoBack />
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
            <DetailComponent newsdetail={data && data.messagedetail ? data.messagedetail : ''} />
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
              <DetailComponent newsdetail={d.newsdetail} />
            </div>
          )
        )*/
        data &&
        <div className={classes.content}>
          <Typography gutterBottom variant="h3">
            {data.title}
          </Typography>
          {
            data.picture &&
              <img className={classes.img} src={API.getPictureUrl(data.picture) + ( isSupportWebp? '.webp' : '.jpg' )} />
          }
          <Typography variant="h5">
            {data.subtitle}
          </Typography>
          <DetailComponent newsdetail={data.newsdetail} />
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
