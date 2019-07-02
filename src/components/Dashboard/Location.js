import React from 'react';
import Loadable from 'react-loadable';
import { makeStyles } from '@material-ui/core/styles';
import * as API from '../../api'

import Button from '@material-ui/core/Button';

import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import teal from '@material-ui/core/colors/teal';

import { LDCircular } from '../loading/LDCircular'

const LocationList = Loadable({
  loader: () => import(/* webpackChunkName: "LocationList" */'./LocationList'),
  loading: () => <LDCircular />
});

const CreateLocation = Loadable({
  loader: () => import(/* webpackChunkName: "CreateLocation" */'./CreateLocation'),
  loading: () => <LDCircular />
});

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: 48,
    maxHeight: window.innerHeight * .8
  },
  title: {
    color: teal[900],
    fontSize: 18,
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
}));

export default function Location(props) {
  const classes = useStyles();
  const { token, setCSRFToken, selectedField, setSelectedField, handleSnackBar } = props
  const [ pageState, setPageState ] = React.useState('select')

  return (
    <div className={classes.root}>
      { pageState === 'create' &&
        <IconButton className={classes.back} onClick={()=>setPageState('select')}>
          <ArrowBackIcon classes={{ root: classes.backIcon }}/>
        </IconButton>
      }
      { pageState === 'select' &&
        <React.Fragment>
          <Button color="primary" onClick={()=>setPageState('create')}>Create field</Button>
          <Typography component="div">
            <Box className={classes.title} fontWeight={600} m={1}>
              {selectedField ? selectedField.fieldname : 'Location'}
            </Box>
          </Typography>
        </React.Fragment>
      }
      { pageState === 'select' ?
        <LocationList token={token} setCSRFToken={setCSRFToken}
          handleSnackBar={handleSnackBar}
          setSelectedField={setSelectedField}/>
        :
        <CreateLocation token={token} setCSRFToken={setCSRFToken} handleSnackBar={handleSnackBar}
          setPageState={setPageState}/>
      }
    </div>
  );
}
