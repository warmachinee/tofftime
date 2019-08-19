import React from 'react';
import Loadable from 'react-loadable';
import { Link } from "react-router-dom";
import { makeStyles, withStyles } from '@material-ui/core/styles';
import * as API from './../../api'
import * as COLOR from './../../api/palette'

import Avatar from '@material-ui/core/Avatar';
import Fab from '@material-ui/core/Fab';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

import { LDCircular } from './../loading/LDCircular'

const TemplateDialog = Loadable({
  loader: () => import(/* webpackChunkName: "TemplateDialog" */'./../TemplateDialog'),
  loading: () => <LDCircular />
});

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(1, 2),
    backgroundColor: theme.palette.background.paper,
  },
  fab: {
    margin: 16,
  },
  avatar: {
    width: 60,
    height: 60,
  }

}));

const GreenTextButton = withStyles(theme => ({
  root: {
    color: COLOR.primary[500],
    fontWeight: 900,
    '&:hover': {
      backgroundColor: COLOR.primary[100],
    },
  },
}))(Button);

export default function PageList(props) {
  const classes = useStyles();
  const { token, setCSRFToken, isSupportWebp, setHPageData } = props
  const hd = ( /www/.test(window.location.href) )? 'https://www.' : 'https://'
  const currentWebURL = hd + API.webURL()
  const [ pageList, setPageList ] = React.useState(null)
  const [ editting, setEditting ] = React.useState(false)

  function handleGetPageName(d){
    const SplitName = d.split(' ')
    if(SplitName.length > 2){
      return SplitName[0].substring(0, 1) + SplitName[1].substring(0, 1) + SplitName[2].substring(0, 1)
    }
    if(SplitName.length === 2){
      return SplitName[0].substring(0, 1) + SplitName[1].substring(0, 1)
    }
    else{
      return SplitName[0].substring(0, 1)
    }
  }

  async function handleFetch(){
    const resToken = token? token : await API.xhrGet('getcsrf')
    await API.xhrPost(
      token? token : resToken.token,
      'loadusersystem', {
        action: 'pagelist'
    }, (csrf, d) =>{
      setCSRFToken(csrf)
      setPageList(d)
    })
  }

  React.useEffect(()=>{
    handleFetch()
  },[ ])

  return (
    <div className={classes.root}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h5" style={{ color: COLOR.primary[900] }}>
          Page list
        </Typography>
        <GreenTextButton onClick={()=>setEditting(!editting)}>Edit</GreenTextButton>
      </div>
      <div style={{ marginBottom: 16 }}>
        { pageList && typeof(pageList) === 'object' ?
          pageList.map(d =>
            <Link to={`/page/${d.pageid}`} style={{ color: 'inherit', textDecoration: 'none' }} key={d.pageid}>
              <Fab color="inherit" className={classes.fab}>
                { d.logo ?
                  <Avatar alt={d.pagename}
                    src={
                      isSupportWebp?
                      currentWebURL + d.logo + '.webp'
                      :
                      currentWebURL + d.logo + '.jpg'
                    }
                    className={classes.avatar} />
                  :
                  <Avatar
                    style={{ backgroundColor: d.color? COLOR[d.color][400] : COLOR.primary[400] }}
                    className={classes.avatar}>
                    {handleGetPageName(d.pagename)}
                  </Avatar>
                }
              </Fab>
            </Link>
          )
          :
          [0,1,2,3,4,5].map(d =>
            <Link to={`/page/${d}`} style={{ color: 'inherit', textDecoration: 'none' }} key={d}>
              <Fab color="inherit" className={classes.fab}>
                <Avatar
                  style={{ backgroundColor: COLOR.primary[400] }}
                  className={classes.avatar}>
                  {'P' + d}
                </Avatar>
              </Fab>
            </Link>
          )
        }
      </div>
      <TemplateDialog open={editting} handleClose={()=>setEditting(false)} maxWidth={500}>
        <List style={{ marginTop: 36 }}>
          { pageList && !pageList.status && typeof(pageList) === 'object' && pageList.length > 0 ?
            pageList.map( d =>
            <Link to={`/user/page/${d.pageid}`} style={{ color: 'inherit', textDecoration: 'none' }} key={d.pageid}>
              <ListItem button>
                <ListItemText primary={d.pagename} />
              </ListItem>
              <Divider />
            </Link>
            )
            :
            <div
              style={{ minHeight: 200, display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
              <div style={{ textAlign: 'center', fontWeight: 600, fontSize: 36, opacity: .7 }}>No page</div>
            </div>
          }
        </List>
      </TemplateDialog>
    </div>
  );
}
