import React from 'react';
import Loadable from 'react-loadable';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Route, Link } from "react-router-dom";
import * as API from './../api'
import { primary, blueGrey, red } from './../api/palette'

import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import AddCircleIcon from '@material-ui/icons/AddCircle';

import { LDMatchList } from './../components/loading/LDMatchList';
import { LDCircular } from './../components/loading/LDCircular';

const CreatePage = Loadable({
  loader: () => import(/* webpackChunkName: "CreatePage" */'./../components/Page/CreatePage'),
  loading: () => <LDCircular />
});

const PageList = Loadable({
  loader: () => import(/* webpackChunkName: "PageList" */'./../components/Page/PageList'),
  loading: () => <LDCircular />
});

const StatisticsGrid = Loadable({
  loader: () => import(/* webpackChunkName: "StatisticsGrid" */'./../components/Statistics/StatisticsGrid'),
  loading: () => <LDCircular />
});

const History = Loadable({
  loader: () => import(/* webpackChunkName: "History" */'./../components/Match/History'),
  loading: () => <LDCircular />
});

const UpcomingModal = Loadable({
  loader: () => import(/* webpackChunkName: "UpcomingModal" */'./../components/Match/UpcomingModal'),
  loading: () => <LDCircular />
});

const TemplateDialog = Loadable({
  loader: () => import(/* webpackChunkName: "TemplateDialog" */'./../components/TemplateDialog'),
  loading: () => <LDCircular />
});

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: window.innerHeight * .8,
    maxWidth: 1200,
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: theme.spacing(3, 2),
    overflow: 'auto',
    overflowScrolling: 'touch',
    WebkitOverflowScrolling: 'touch',
  },
  pageRoot: {
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: theme.spacing(3, 2),
  },
  pageViewRoot: {
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: theme.spacing(3, 2),
    overflow: 'auto',
    overflowScrolling: 'touch',
    WebkitOverflowScrolling: 'touch',
    minHeight: window.innerHeight,
    [theme.breakpoints.up(600)]: {
      marginTop: 16,
    },
  },
  controls: {
    marginTop: 24,
    display: 'flex', flexDirection: 'column',
    width: '100%',
    [theme.breakpoints.up(600)]: {
      width: '50%',
    },
  },
  linkElement: {
    textDecoration: 'none',
    color: 'inherit'
  },
  button: {
    width: '100%',
    margin: '4px 0',
    padding: theme.spacing(1, 0),
    [theme.breakpoints.up(500)]: {
      padding: theme.spacing(2, 0),
    },
  },
  buttonIcon: {
    padding: '12px 16px 12px 0',
    width: '100%',
  },

}))

const StyledButton = withStyles(theme => ({
  root: {
    fontWeight: 700,
    fontSize: 18,
    color: primary[900],
    backgroundColor: primary[100],
    '&:hover': {
      backgroundColor: primary[300],
    },
  },
}))(Button);

const RedButton = withStyles(theme => ({
  root: {
    color: theme.palette.getContrastText(red[600]),
    backgroundColor: red[600],
    '&:hover': {
      backgroundColor: red[800],
    },
  },
}))(Button);

const GreenButton = withStyles(theme => ({
  root: {
    color: theme.palette.getContrastText(primary[500]),
    backgroundColor: primary[700],
    '&:hover': {
      backgroundColor: primary[900],
    },
  },
}))(Button);

const GreenTextButton = withStyles(theme => ({
  root: {
    color: primary[600],
    '&:hover': {
      backgroundColor: primary[100],
    },
  },
}))(Button);

export default function UserPageBody(props) {
  const classes = useStyles();
  const { sess, token, setCSRFToken, handleSnackBar, isSupportWebp, setHPageData } = props
  const [ pageEditorState, setCreatePageState ] = React.useState(false)
  const [ historyState, setHistoryState ] = React.useState(false)
  const [ upcomingState, setUpcomingState ] = React.useState(false)
  const [ info, setInfo ] = React.useState(null)

  const passingProps = {
    sess: sess,
    token: token,
    setCSRFToken: setCSRFToken,
    handleSnackBar: handleSnackBar,
    isSupportWebp: isSupportWebp,
    setHPageData: setHPageData
  }

  function handleCreatePageClick(){
    setCreatePageState(!pageEditorState)
  }

  function handleHistoryClick(){
    setHistoryState(!historyState)
  }

  function handleUpcomingClick(){
    setUpcomingState(!upcomingState)
  }

  async function handleFetchInfo(){
    const resToken = token? token : await API.xhrGet('getcsrf')
    await API.xhrPost(
      token? token : resToken.token,
      'loadusersystem', {
        action: 'info'
    }, (csrf, d) =>{
      setCSRFToken(csrf)
      setInfo(d)
      console.log('info', d);
    })
  }

  async function handleCallAPI(){
    await handleFetchInfo()
  }

  React.useEffect(()=>{
    handleFetchInfo()
  },[ ])


  return (
    <div>

      <StatisticsGrid {...props} />
      <PageList {...props} />

      <div className={classes.controls}>
        <RedButton className={classes.buttonIcon} onClick={handleCreatePageClick}>
          <AddCircleIcon style={{ marginRight: 8, marginLeft: 12 }}/>
          Create page
        </RedButton>
        <GreenTextButton variant="outlined" className={classes.buttonIcon} onClick={handleHistoryClick}>
          History
        </GreenTextButton>
        <GreenTextButton variant="outlined" className={classes.buttonIcon} onClick={handleUpcomingClick}>
          Upcoming
        </GreenTextButton>
      </div>

      <TemplateDialog open={pageEditorState} handleClose={handleCreatePageClick}>
        <CreatePage {...passingProps} handleClose={setCreatePageState}/>
      </TemplateDialog>
      <TemplateDialog fullScreen open={historyState} handleClose={handleHistoryClick}>
        <History {...passingProps}/>
      </TemplateDialog>
      <TemplateDialog fullScreen open={upcomingState} handleClose={handleUpcomingClick}>
        <UpcomingModal {...passingProps} />
      </TemplateDialog>
    </div>
  );
}
