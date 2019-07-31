import React from 'react';
import Loadable from 'react-loadable';
import { Link } from "react-router-dom";
import { makeStyles, fade, withStyles } from '@material-ui/core/styles';
import * as API from '../../../api'

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Divider from '@material-ui/core/Divider';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';

import teal from '@material-ui/core/colors/teal';
import grey from '@material-ui/core/colors/grey';

import { LDCircular } from '../../loading/LDCircular'

const CreateMatch = Loadable({
  loader: () => import(/* webpackChunkName: "CreateMatch" */'./CreateMatch'),
  loading: () => <LDCircular />
});

const GoBack = Loadable({
  loader: () => import(/* webpackChunkName: "GoBack" */'../../GoBack'),
  loading: () => <LDCircular />
});

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
  },
  linkElement: {
    textDecoration: 'none',
    color: 'inherit'
  },
  title: {
    textAlign: 'center', color: teal[900],
    fontSize: 28,
    [theme.breakpoints.up(500)]: {
      fontSize: 32,
    },
  },
  tableHead: {
    backgroundColor: grey[900],
  },
  tableDate: {
    width: 120,
  },
  tableView: {
    width: 60,
    textAlign: 'center'
  },
  tableDateText: {
    fontStyle: 'oblique',
    fontFamily: 'monospace'
  },
  tableTitle: {
    width: '100%',
    overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis',
    [theme.breakpoints.up(800)]: {
      width: '60%',
    },
  },
  tableLocation: {
    width: '40%',
    overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis',
  },
  checkbox: {
    position: 'absolute',
    left: 8
  },

}))

const StyledText = withStyles(theme => ({
  primary: {
    color: 'white',
  },
}))(ListItemText);

const GreenButton = withStyles(theme => ({
  root: {
    color: theme.palette.getContrastText(teal[500]),
    backgroundColor: teal[500],
    '&:hover': {
      backgroundColor: teal[700],
    },
  },
}))(Button);

const GreenTextButton = withStyles(theme => ({
  root: {
    color: teal[600],
    '&:hover': {
      backgroundColor: teal[100],
    },
  },
}))(Button);

const GreenCheckbox = withStyles({
  root: {
    color: teal[400],
    '&$checked': {
      color: teal[600],
    },
  },
})(props => <Checkbox color="default" {...props} />);

export default function MatchBody(props){
  const classes = useStyles();
  const { token, setCSRFToken, handleSnackBar } = props
  const [ data, setData ] = React.useState(null)
  const [ dataClassed, setDataClassed ] = React.useState(null)
  const [ editting, setEditting ] = React.useState(false)

  async function handleSetDisplay(d){
    const res = await token? token : API.xhrGet('getcsrf')
    await API.xhrPost(
      token? token : res.token,
      'displaymatchsystem', {
        action: 'match',
        matchid: d.matchid
    }, (csrf, d) =>{
      handleSnackBar({
        state: true,
        message: d.status,
        variant: d.status === 'success' ? 'success' : 'error',
        autoHideDuration: d.status === 'success'? 2000 : 5000
      })
      setCSRFToken(csrf)
      try {
        handleFetch()
      }catch(err) { console.log(err.message) }
    })
  }

  async function handleFetch(){
    const res = await token? token : API.xhrGet('getcsrf')
    var arrData = []
    await API.xhrPost(
      token? token : res.token,
      'loadmatch', {
        action: 'list',
    }, (csrf, d) =>{
      setCSRFToken(csrf)
      if(!d.status){
        arrData.push(
          ...d.filter( d =>{
            return d.display === 1
          })
        )
        arrData.push(
          ...d.filter( d =>{
            return d.display === -1
          })
        )
        setDataClassed(arrData)
      }
      setData(d)
    })
  }

  React.useEffect(()=>{
    handleFetch()
  },[ ])

  return(
    <div className={classes.root}>
      <GoBack />
      <Typography component="div">
        <Box className={classes.title} fontWeight={600} m={1}>
          Match
        </Box>
      </Typography>
      <CreateMatch MBSetData={setData} token={token} setCSRFToken={setCSRFToken} handleSnackBar={handleSnackBar}/>
      <div style={{ display: 'flex', margin: '24px 16px 0 0' }}>
        <div style={{ flex: 1 }} />
        <GreenTextButton color="primary" onClick={()=>setEditting(!editting)}>
          { editting? 'Done':'Edit Display'}
        </GreenTextButton>
      </div>
      <List style={{ overflow: 'auto' }}>
        { editting?
          <ListItem key="Table Head" className={classes.tableHead}>
            <ListItemIcon>
              <div style={{ width: 42 }}></div>
            </ListItemIcon>
            <StyledText inset primary="Match" className={classes.tableTitle}/>
          </ListItem>
          :
          <ListItem key="Table Head" className={classes.tableHead}>
            { window.innerWidth >= 600 &&
              <StyledText primary="Date" className={classes.tableDate}/>
            }
            <StyledText primary="Views" className={classes.tableView}/>
            <StyledText inset primary="Match" className={classes.tableTitle}/>
            { window.innerWidth >= 800 &&
              <StyledText inset primary="Location" className={classes.tableLocation}/>
            }
          </ListItem>
        }

        {data && !data.status && !editting &&
          data.map( (d, i) =>
            d &&
            <React.Fragment key={i}>
              <Link to={`/user/match/${d.matchid}`} className={classes.linkElement}>
                <ListItem key={d.matchid} button>
                  { window.innerWidth >= 600 &&
                    <ListItemText primary={d.date} className={classes.tableDate} classes={{ primary: classes.tableDateText }}/>
                  }
                  <ListItemText primary={d.views} className={classes.tableView}/>
                  <ListItemText inset className={classes.tableTitle}
                    primary={d.title}
                    secondary={
                      window.innerWidth < 800 &&
                      (
                        window.innerWidth >= 600?
                        d.location
                        :
                        <React.Fragment>
                          <Typography
                            style={{ fontStyle: 'oblique' }}
                            component="span"
                            variant="caption"
                            color="textPrimary"
                          >
                            {d.date}
                          </Typography>
                          <br></br>
                          {d.location}
                        </React.Fragment>
                      )
                    }/>
                  { window.innerWidth >= 800 &&
                    <ListItemText inset primary={d.location} className={classes.tableLocation}/>
                  }
                </ListItem>
              </Link>
              <Divider />
            </React.Fragment>
        )}
        { dataClassed && editting &&
          dataClassed.map( (d, i) =>
            d &&
            <React.Fragment key={i}>
              <ListItem key={d.matchid} style={{ ...d.display !== 1 && { opacity: .5 }}} button onClick={()=>handleSetDisplay(d)}>
                <ListItemIcon>
                  <GreenCheckbox
                    edge="start"
                    checked={d.display === 1}
                    tabIndex={-1}
                    disableRipple/>
                </ListItemIcon>
                <ListItemText className={classes.tableTitle}
                  primary={d.title}
                  secondary={d.location}/>
                <ListItemText
                  style={{ textAlign: 'right' }}
                  primary={
                    <Typography
                      style={{ fontStyle: 'oblique' }}
                      component="span"
                      variant="caption"
                      color="textPrimary"
                    >
                      {d.date}
                    </Typography>
                  }/>
              </ListItem>
              <Divider />
            </React.Fragment>
        )}
      </List>
    </div>
  )
}
