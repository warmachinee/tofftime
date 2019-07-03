import React from 'react';
import Loadable from 'react-loadable';
import { makeStyles } from '@material-ui/core/styles';
import * as API from '../../../api'

import Paper from '@material-ui/core/Paper';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import teal from '@material-ui/core/colors/teal';
import grey from '@material-ui/core/colors/grey';

import { LDCircular } from '../../loading/LDCircular'

const MBPlayerBody = Loadable({
  loader: () => import(/* webpackChunkName: "MBPlayerBody" */'./MBPlayerBody'),
  loading: () => <LDCircular />
});

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    padding: theme.spacing(1, 2),
    width: '100%',
    backgroundColor: grey[50],
    cursor: 'pointer',
    marginTop: 24
  },
  title: {
    color: teal[900],
    fontSize: 18
  },
  expandIcon: {
    position: 'absolute',
    right: 16,
    top: 8,
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
}))

export default function MBPlayer(props){
  const classes = useStyles();
  const { token, setCSRFToken, matchid, handleSnackBar } = props
  const [ expanded, setExpanded ] = React.useState(false)

  function expandHandler(){
    setExpanded(!expanded)
  }
  return(
    <Paper className={classes.root} onClick={()=>!expanded ? expandHandler():console.log()}>
      <Typography component="div">
        <Box className={classes.title} fontWeight={600} m={1}>
          Player
        </Box>
      </Typography>
      <IconButton
        className={classes.expandIcon}
        style={{ transform: expanded?'rotate(180deg)':'rotate(0deg)' }}
        onClick={expandHandler}
      >
        <ExpandMoreIcon />
      </IconButton>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <MBPlayerBody token={token} setCSRFToken={setCSRFToken} matchid={matchid} handleSnackBar={handleSnackBar}/>
      </Collapse>
    </Paper>
  );
}
