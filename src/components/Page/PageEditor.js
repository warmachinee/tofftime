import React from 'react';
import Loadable from 'react-loadable';
import { makeStyles, createMuiTheme, withStyles } from '@material-ui/core/styles';
import { Route, Link } from "react-router-dom";
import { ThemeProvider } from '@material-ui/styles';
import * as API from './../../api'
import { primary, grey, red } from './../../api/palette'

import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import AddCircleIcon from '@material-ui/icons/AddCircle';

import { LDCircular } from './../loading/LDCircular';
import { LDMatchList } from './../loading/LDMatchList';

const PageInfo = Loadable({
  loader: () => import(/* webpackChunkName: "PageInfo" */'./PageInfo'),
  loading: () => <LDCircular />
});

const AnnouncementNewsGrid = Loadable({
  loader: () => import(/* webpackChunkName: "AnnouncementNewsGrid" */'./../AnnouncementNewsGrid'),
  loading: () => <LDCircular />
});

const MatchList = Loadable({
  loader: () => import(/* webpackChunkName: "MatchList" */'./../Match/MatchList'),
  loading: () => <LDMatchList />
});

const EditPage = Loadable({
  loader: () => import(/* webpackChunkName: "EditPage" */'./EditPage'),
  loading: () => <LDCircular />
});

const TemplateDialog = Loadable({
  loader: () => import(/* webpackChunkName: "TemplateDialog" */'./../TemplateDialog'),
  loading: () => <LDCircular />
});

const GoBack = Loadable({
  loader: () => import(/* webpackChunkName: "GoBack" */'./../GoBack'),
  loading: () => <LDCircular />
});

const useStyles = makeStyles(theme => ({
  linkElement: {
    textDecoration: 'none',
    color: 'inherit'
  },
  buttonIcon: {
    padding: '12px 16px 12px 0',
    width: '100%',
  },

}));

const RedButton = withStyles(theme => ({
  root: {
    color: theme.palette.getContrastText(red[600]),
    backgroundColor: red[600],
    '&:hover': {
      backgroundColor: red[800],
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

export default function PageEditor(props){
  const classes = useStyles();
  const { sess, token, setCSRFToken, handleSnackBar, isSupportWebp, setHPageData } = props
  const split = window.location.href.split('/')
  const splitLength = window.location.href.split('/').length
  const pageid = ( split[splitLength - 2] === 'page' && split[splitLength - 3] === 'user' ) ? parseInt(split[splitLength - 1]) : null
  const [ pageData, setPageData ] = React.useState(null)
  const [ createPost, setCreatePost ] = React.useState(false)
  const [ editPage, setEditPage ] = React.useState(false)

  function handleEditPageClick(){
    setEditPage(!editPage)
  }

  function handleCreatePostClick(){
    setCreatePost(!createPost)
  }

  async function handleFetch(){
    const resToken = token? token : await API.xhrGet('getcsrf')
    await API.xhrPost(
      token? token : resToken.token,
      'ploadpage', {
        action: 'detail',
        pageid: pageid
    }, (csrf, d) =>{
      setCSRFToken(csrf)
      setPageData(d[0])
      setHPageData(d[0])
      handleFetchList(csrf)
    })
  }

  async function handleFetchList(csrf){
    const resToken = csrf? csrf : await API.xhrGet('getcsrf')
    await API.xhrPost(
      token? token : resToken.token,
      'ploadpage', {

    }, (csrf, d) =>{
      setCSRFToken(csrf)
      console.log('handleFetchList ', d);
    })
  }

  React.useEffect(()=>{
    if(pageid){
      handleFetch()
    }
  },[ editPage ])

  return(
    <div>
      <GoBack />
      <PageInfo {...props} pageData={pageData}/>
      <Paper style={{ margin: '16px 0', padding: 16 }}>
        {/*
          <RedButton className={classes.buttonIcon} onClick={handleCreatePostClick}>
            <AddCircleIcon style={{ marginRight: 8, marginLeft: 12 }}/>
            Create post
          </RedButton>
          */
        }
        <GreenTextButton variant="outlined" className={classes.buttonIcon} onClick={handleEditPageClick}>
          Page management
        </GreenTextButton>
        <Link to={`/user/post/${pageid}`} className={classes.linkElement}>
          <GreenTextButton variant="outlined" className={classes.buttonIcon}>
            Post management
          </GreenTextButton>
        </Link>
        <Link to={`/user/match/${pageid}`} className={classes.linkElement}>
          <GreenTextButton variant="outlined" className={classes.buttonIcon}>
            Match management
          </GreenTextButton>
        </Link>
      </Paper>
      <Paper>
        <AnnouncementNewsGrid page {...props} pageid={pageid} scale={.75}/>
        <MatchList page {...props} pageid={pageid} scale={.75}/>
      </Paper>
      <TemplateDialog open={editPage} handleClose={handleEditPageClick}>
        <EditPage {...props}
          pageData={pageData}
          pageid={pageid}
          handleClose={handleEditPageClick} />
      </TemplateDialog>
    </div>
  );
}
