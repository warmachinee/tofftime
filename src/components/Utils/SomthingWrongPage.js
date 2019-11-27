import React from 'react'
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import * as API from './../../api'
import * as BTN from './../Button'

import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

import RefreshIcon from '@material-ui/icons/Refresh';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ReportProblemIcon from '@material-ui/icons/ReportProblem';

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 700,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 24
  },
  backButton: {
    padding: 12
  },
  content: {
    padding: theme.spacing(1, 3, 3, 3),
    [theme.breakpoints.up(500)]: {
      padding: theme.spacing(1, 8, 6, 8),
    },
  },
  buttonGrid: {
    marginTop: 24,
    display: 'flex',
    justifyContent: 'center'
  },
  button: {
    margin: 4,
    width: 120
  },

}));

export default function SomthingWrongPage(props){
  const { errMsg } = props
  const classes = useStyles();

  /*
  const tempErrMsg = {
    error: 'ReferenceError: TestErrorMsg is not defined',
    stack: (
      "in App (created by LoadableComponent)\n" +
      "\tin LoadableComponent (created by RenderApp)\n" +
      "\tin Router (created by BrowserRouter)\n" +
      "\tin BrowserRouter (created by RenderApp)\n" +
      "\tin RenderApp\n"
    )
  }

  const errMsg = /localhost/.test(window.location.href) ? tempErrMsg : props.errMsg
  */

  async function handleReportError(){
    const file = errMsg.stack.split('in ')[1]
    const resToken = await API._xhrGet('getcsrf')
    await API._xhrPost(
      resToken.token,
      'report_error', {
        action: 'assign',
        type: 'boundary',
        message: errMsg.error.toString(),
        url: window.location.href,
        stack: errMsg.stack,
        file: file,
        object: errMsg,
    }, (csrf, d) =>{
      //console.log(d);
    })
  }

  React.useEffect(()=>{
    if(errMsg){
      handleReportError()
    }
  },[ errMsg ])

  return (
    <Paper className={classes.root} elevation={4}>
      { window.history.length > 1 ?
        <div className={classes.backButton}>
          <IconButton onClick={()=>window.history.go(-1)}><ArrowBackIcon fontSize="large" /></IconButton>
        </div>
        :
        <div className={classes.backButton}>
          <div style={{ height: 16 }} />
        </div>
      }
      <div className={classes.content}>
        <Typography variant="h3">Something went wrong.</Typography>
        <br></br>
        <Typography variant="body1" style={{ fontWeight: 600 }}>
          {errMsg && errMsg.error && errMsg.error.toString()}
        </Typography>
        {/*
          <Typography variant="body1" style={{ whiteSpace: 'pre-wrap' }}>
            {errMsg && errMsg.stack}
          </Typography>*/
        }
        <div className={classes.buttonGrid}>
          <BTN.PrimaryOutlined className={classes.button} onClick={()=>window.location.replace('/')}>
            Home
          </BTN.PrimaryOutlined>
          <BTN.Primary className={classes.button} onClick={()=>window.location.reload()}>
            Try again
          </BTN.Primary>
        </div>
      </div>
    </Paper>
  );
}
