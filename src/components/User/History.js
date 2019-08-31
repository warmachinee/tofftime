import React from 'react';
import clsx from "clsx";
import Loadable from 'react-loadable';
import { makeStyles } from '@material-ui/core/styles'
import { primary, grey } from './../../api/palette'

import {
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Typography,
  Divider,

} from '@material-ui/core'

import Skeleton from '@material-ui/lab/Skeleton';

const HistoryList = Loadable({
  loader: () => import(/* webpackChunkName: "HistoryList" */ './HistoryList'),
  loading: () => null
});

const LabelText = Loadable({
  loader: () => import(/* webpackChunkName: "LabelText" */ './../LabelText'),
  loading: () => null
});

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    maxWidth: 1200,
    width: '100%',
    margin: 'auto',
    marginBottom: 36,
  },
  grid: {
    padding: theme.spacing(1.5),
    display: 'flex',
    flexWrap: 'wrap',
    WebkitFlexWrap: 'wrap',
    boxSizing: 'border-box',
    justifyContent: 'space-around'
  },
  listImage: {
    width: 36,
    marginRight: 0,
    [theme.breakpoints.up(500)]: {
      width: 48,
      marginRight: 16,
    },
  },
  image: {
    width: 36,
    height: 24,
    backgroundColor: grey[900],
    [theme.breakpoints.up(500)]: {
      width: 48,
      height: 36,
    },
  },
  listTitle: {
    width: '100%',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
  listTitleShow: {
    [theme.breakpoints.up(900)]: {
      display: 'none',
    },
  },
  listTitleHidden: {
    [theme.breakpoints.down(900)]: {
      display: 'none',
    },
  },
  listDateShow: {
    [theme.breakpoints.up(600)]: {
      display: 'none',
    },
  },
  listDateHidden: {
    [theme.breakpoints.down(600)]: {
      display: 'none',
    },
  },

}));


export default function History(props) {
  const classes = useStyles();
  const { API, COLOR, token, setCSRFToken } = props
  const [ data, setData ] = React.useState(null)

  async function handleFetch(){
    const resToken = token? token : await API.xhrGet('getcsrf')
    await API.xhrPost(
      token? token : resToken.token,
      'loadusersystem' , {
        action: 'history'
    }, function(csrf, d){
      setCSRFToken(csrf)
      setData(d)
    })
  }

  React.useEffect(()=>{
    handleFetch()
  },[ ])

  return(
    <div className={classes.root}>
      <LabelText text="History" />
      <List style={{ marginTop: 24, }}>
        <ListItem button style={{ backgroundColor: COLOR.grey[900] }}>
          <ListItemIcon className={classes.listImage}>
            <div className={classes.image} />
          </ListItemIcon>
          <ListItemText style={{ maxWidth: 100, marginRight: 16, width: '100%', color: 'white' }}
            className={classes.listDateHidden}
            primary="date" />
          <ListItemText className={classes.listTitle} style={{ color: 'white'}}
            primary="Match" />
          <ListItemText
            className={clsx(classes.listTitle, classes.listTitleHidden)}
            style={{ color: 'white'}}
            primary="Location" />
          <ListItemIcon>
            <Typography variant="subtitle2" color="textSecondary" style={{ color: 'white'}}>
              Handicap
            </Typography>
          </ListItemIcon>
        </ListItem>
      </List>
      <Divider />
      { data &&
        data.map( d => <HistoryList key={d.matchid} data={d} {...props}/>)
      }
    </div>
  );
}
