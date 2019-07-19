import React from 'react';
import Loadable from 'react-loadable';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import * as API from '../../../api'

import Button from '@material-ui/core/Button';

import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import CreateIcon from '@material-ui/icons/Create';

import teal from '@material-ui/core/colors/teal';
import grey from '@material-ui/core/colors/grey';

import { LDCircular } from '../../loading/LDCircular'

const LocationList = Loadable({
  loader: () => import(/* webpackChunkName: "LocationList" */'./LocationList'),
  loading: () => <LDCircular />
});

const LocationEditor = Loadable({
  loader: () => import(/* webpackChunkName: "LocationEditor" */'./LocationEditor'),
  loading: () => <LDCircular />
});

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: 36
  },
  title: {
    color: teal[900],
    fontSize: 18,
  },
  notice: {
    fontFamily: 'monospace',
    color: grey[600],
    fontWeight: 600,
  },
  back: {
    position: 'absolute',
    top: 8,
    left: 8,
    [theme.breakpoints.up(500)]: {
      left: 16,
    },
  },
  backIcon: {
    fontSize: '2rem',
    [theme.breakpoints.up(500)]: {
      fontSize: '2.5rem',
    },
  },
  createButton: {
    padding: theme.spacing(1.5, 2),
    width: '100%',
    [theme.breakpoints.up(500)]: {
      padding: theme.spacing(1.5, 2),
      width: 'auto'
    },
  },
  doneButton: {
    padding: theme.spacing(1),
    marginLeft: 8
  },
  createIcon: {
    marginRight: 12,
  }
}));

const GreenButton = withStyles(theme => ({
  root: {
    color: theme.palette.getContrastText(teal[500]),
    backgroundColor: teal[700],
    '&:hover': {
      backgroundColor: teal[900],
    },
  },
}))(Button);

const GreenTextButton = withStyles(theme => ({
  root: {
    color: teal[500],
    fontWeight: 900,
    '&:hover': {
      backgroundColor: teal[100],
    },
  },
}))(Button);

export default function Location(props) {
  const classes = useStyles();
  const { token, setCSRFToken, selectedField, setSelectedField, handleSnackBar, handleClose } = props
  const [ pageState, setPageState ] = React.useState('select')
  const [ edittingField, setEdittingField ] = React.useState(null)

  return (
    <div className={classes.root}>
      { ( pageState === 'edit' || pageState === 'create' ) &&
        <IconButton className={classes.back} onClick={()=>setPageState('select')}>
          <ArrowBackIcon classes={{ root: classes.backIcon }}/>
        </IconButton>
      }
      { pageState === 'select' &&
        <div>
          <div style={{ display: 'flex', marginBottom: 24 }}>
            <GreenButton
              className={classes.createButton}
              onClick={()=>setPageState('create')}>
              <CreateIcon className={classes.createIcon} color="inherit"/>
              Create field
            </GreenButton>
            <GreenTextButton className={classes.doneButton} onClick={handleClose}>Done</GreenTextButton>
          </div>
          <Typography component="div">
            <div style={{ display: 'flex' }}>
              <Box style={{ width: '30%' }} className={classes.title} fontWeight={600} m={1}>
                { window.innerWidth > 600? 'Selected location :' :
                  window.innerWidth > 400? 'Selected location:' :
                  window.innerWidth > 360?
                  'Selected :' : 'Selected:'
                }
              </Box>
              <Box style={{ width: '60%' }} className={classes.title} m={1}>
                {selectedField ? selectedField.fieldname : 'none'}
              </Box>
            </div>
            <Box className={classes.notice} m={1}>
              [ Please pick one ]
            </Box>
          </Typography>
        </div>
      }

      { pageState === 'select' &&
        <LocationList token={token} setCSRFToken={setCSRFToken}
          handleSnackBar={handleSnackBar}
          selectedField={selectedField}
          setSelectedField={setSelectedField}
          setEdittingField={setEdittingField}
          setPageState={setPageState}/>
      }

      { pageState === 'create' &&
        <LocationEditor token={token} setCSRFToken={setCSRFToken} handleSnackBar={handleSnackBar}
          setPageState={setPageState}/>
      }

      { pageState === 'edit' &&
        <LocationEditor token={token} setCSRFToken={setCSRFToken} handleSnackBar={handleSnackBar}
          edittingField={edittingField}
          setEdittingField={setEdittingField}
          setPageState={setPageState}/>
      }

    </div>
  );
}
