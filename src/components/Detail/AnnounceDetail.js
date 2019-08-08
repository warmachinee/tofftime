import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import { makeStyles, fade, withStyles } from '@material-ui/core/styles';
import * as API from './../../api'
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

export default function AnnounceDetail(props){
  const classes = useStyles();
  const { token, setCSRFToken, handleSnackBar, isSupportWebp } = props
  const [ data, setData ] = React.useState(null)
  const hd = ( window.location.href.substring(0, 25) === 'https://www.' + API.webURL() )? 'https://www.' : 'https://'
  const currentWebURL = hd + API.webURL()

  async function handleFetch(){
    const announceid = parseInt(props.computedMatch.params.detailparam)
    const d = await API.xhrGet('loadgeneral',
    `?_csrf=${token? token : await API.xhrGet('getcsrf').token}&action=announcedetail&announceid=${announceid}`
    )
    setCSRFToken(d.token)
    setData(d.response)
  }

  React.useEffect(()=>{
    handleFetch()
  },[ ])

  return(
    <Paper className={classes.root}>
      <div style={{ width: '100%' }}>
        <IconButton className={classes.back} onClick={()=>window.history.go(-1)}>
          <ArrowBackIcon classes={{ root: classes.backIcon }}/>
        </IconButton>
      </div>
      { data &&
        data.map( d =>
          <div key={d.title}>
            <Typography variant="h2">
              {d.title}
            </Typography>
            { d.picture &&
              <img className={classes.img} src={isSupportWebp? currentWebURL + d.picture + '.webp' : currentWebURL + d.picture + '.jpg'} />
            }
            <DetailComponent announcedetail={d.announcedetail}/>
          </div>
      )}
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
