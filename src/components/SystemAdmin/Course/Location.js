  import React from 'react';
import { Link } from "react-router-dom";
import Loadable from 'react-loadable';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import * as API from './../../../api'
import { primary, grey } from './../../../api/palette'

import {
  Button,
  Dialog,
  IconButton,
  Typography,
  Box,

} from '@material-ui/core';

import {
  ArrowBack as ArrowBackIcon,
  Close as CloseIcon,
  Create as CreateIcon,
  RemoveRedEye,

} from '@material-ui/icons';

import { LDCircular } from './../../loading/LDCircular'

const LabelText = Loadable({
  loader: () => import(/* webpackChunkName: "LabelText" */'./../../Utils/LabelText'),
  loading: () => null
});

const LocationList = Loadable({
  loader: () => import(/* webpackChunkName: "LocationList" */'./LocationList'),
  loading: () => <LDCircular />
});

const CourseEditor = Loadable({
  loader: () => import(/* webpackChunkName: "CourseEditor" */'./CourseEditor'),
  loading: () => <LDCircular />
});

const CourseScorecard = Loadable({
  loader: () => import(/* webpackChunkName: "CourseScorecard" */'./CourseScorecard'),
  loading: () => <LDCircular />
});

const useStyles = makeStyles(theme => ({
  root: {
    //marginTop: 36
  },
  title: {
    color: primary[900],
    fontSize: 18,
    textAlign: 'center'
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
  },
  paperWidthSm: {
    maxWidth: 700
  },

}));

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
    color: primary[500],
    fontWeight: 900,
    '&:hover': {
      backgroundColor: primary[100],
    },
  },
}))(Button);

export default function Location(props) {
  const classes = useStyles();
  const {
    sess, token, setCSRFToken,
    selectedField, setSelectedField, handleSnackBar, selectedFieldVersion, selectedFieldVersionCount, handleOnDoneSelectField
  } = props
  const [ pageState, setPageState ] = React.useState('select')
  const [ fieldScorecard, setFieldScorecard ] = React.useState(null)
  const [ scorecardState, setScorecardState ] = React.useState(false);

  const handleScorecardOpen = () => {
    setScorecardState(true);
  };

  const handleScorecardClose = () => {
    setScorecardState(false);
  };

  async function handleFetchLoadField(){
    const resToken = token? token : await API._xhrGet('getcsrf')
    await API._xhrPost(
      token? token : resToken.token,
      sess.typeid === 'admin' ? 'loadfield' : 'floadfield', {
        action: 'score',
        fieldid: selectedField.fieldid,
        fieldversion: selectedFieldVersion
    }, (csrf, d) =>{
      setCSRFToken(csrf)
      if(('fieldscore' in d) && ('hfieldscore' in d)){
        setFieldScorecard({
          ...d,
          location: selectedField.fieldname,
          locationversion: selectedFieldVersion,
        })
      }else{
        handleSnackBar({
          state: true,
          message: d.status,
          variant: /success/.test(d.status) ? d.status : 'error',
          autoHideDuration: /success/.test(d.status)? 2000 : 5000
        })
      }
    })
  }

  React.useEffect(()=>{
    if(selectedField){
      handleFetchLoadField()
    }
  },[ selectedField, selectedFieldVersion ])

  return (
    <div className={classes.root}>
      { ( pageState === 'create' ) &&
        <IconButton className={classes.back} onClick={()=>setPageState('select')}>
          <ArrowBackIcon classes={{ root: classes.backIcon }} />
        </IconButton>
      }
      { pageState === 'select' &&
        <div>
          <div style={{ display: 'flex', marginBottom: 24 }}>
            <GreenButton
              variant="contained"
              className={classes.createButton}
              onClick={()=>setPageState('create')}>
              <CreateIcon className={classes.createIcon} color="inherit"/>
              { API._getWord(sess && sess.language).Create_Course }
            </GreenButton>
            { sess && sess.typeid === 'admin' &&
              <GreenTextButton className={classes.doneButton} onClick={handleOnDoneSelectField}>Done</GreenTextButton>
            }
          </div>
          { selectedField ?
            <Typography variant="h4" component="div">
              {selectedField.fieldname}
              <IconButton onClick={handleScorecardOpen}>
                <RemoveRedEye style={{ color: primary[600] }} />
              </IconButton>
            </Typography>
            :
            <Typography variant="h4">
              { API._getWord(sess && sess.language)['Please Select Course.'] }
            </Typography>
          }
          { selectedField && selectedFieldVersionCount !== 1 &&
            <Typography variant="body2" color="textSecondary">
              Version {selectedFieldVersion}
            </Typography>
          }
        </div>
      }

      { pageState === 'select' &&
        <LocationList
          {...props}
          setPageState={setPageState} />
      }

      { pageState === 'create' &&
        <CourseEditor
          {...props}
          afterSuccess={()=>setPageState('select')} />
      }
      <Dialog classes={{ paperWidthSm: classes.paperWidthSm }} onClose={handleScorecardClose} open={scorecardState}>
        <LabelText text="Golf Scorecard" />
        <IconButton onClick={handleScorecardClose} style={{ position: 'absolute', top: 8, right: 8 }}>
          <CloseIcon />
        </IconButton>
        { fieldScorecard &&
          <CourseScorecard {...props} field={fieldScorecard} />
        }
      </Dialog>
    </div>
  );
}
