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

export default function AnnounceDetail(props){
  const classes = useStyles();
  const { API, sess, token, setCSRFToken, handleSnackBar, isSupportWebp } = props
  const [ data, setData ] = React.useState(null)

  async function handleFetch(){
    const resToken = token? token : await API.xhrGet('getcsrf')
    const announceid = parseInt(props.computedMatch.params.detailparam)
    const d = await API.xhrGet('loadgeneral',
    `?_csrf=${token? token : resToken.token}&action=announcedetail&announceid=${announceid}`
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
      { data &&
        <div className={classes.content}>
          <Typography gutterBottom variant="h3">
            {data.title}
          </Typography>
          { data.picture &&
            <img className={classes.img} src={API.getPictureUrl(data.picture) + ( isSupportWebp? '.webp' : '.jpg' )} />
          }
          <DetailComponent announcedetail={data.announcedetail}/>
        </div>
      }
    </Paper>
  );
}

function DetailComponent(props){
  const { announcedetail } = props

  return(
    <div className="ck-blurred ck ck-content ck-editor__editable ck-rounded-corners ck-editor__editable_inline ck-read-only">
      {ReactHtmlParser(announcedetail)}
    </div>
  );
}
