import React from 'react'
import Loadable from 'react-loadable';
import { LDCircular } from './../loading/LDCircular'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import * as API from './../../api'
import { primary, grey, red, green } from './../../api/palette'
import * as BTN from './../Button'

import {
  MobileStepper,
  Paper,
  Typography,
  Button,

} from '@material-ui/core';

import {
  KeyboardArrowLeft,
  KeyboardArrowRight,

} from '@material-ui/icons';

const ScoreInput = Loadable({
  loader: () => import(/* webpackChunkName: "ScoreInput" */'./ScoreInput'),
  loading: () => <LDCircular />
});

const CourseInput = Loadable({
  loader: () => import(/* webpackChunkName: "CourseInput" */'./CourseInput'),
  loading: () => <LDCircular />
});

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    minHeight: 300,
    marginBottom: 24,
    backgroundColor: theme.palette.background.default,
  },
  header: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: theme.palette.background.default,
  },

}));

const labelSteps = [
  'Choose course',
  'Fill score',
]

export default function SimulatorInput(props){
  const classes = useStyles();
  const theme = useTheme();
  const {
    sess, token, setCSRFToken, handleSnackBar, handleFetchSimulator, editingData, editing, setEditing
  } = props
  const [ activeStep, setActiveStep ] = React.useState(0);
  const [ arrScore, setArrScore ] = React.useState([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0])
  const [ selectedField, setSelectedField ] = React.useState(null);
  const [ selectedFieldVersion, setSelectedFieldVersion ] = React.useState(1);
  const [ selectedFieldVersionCount, setSelectedFieldVersionCount ] = React.useState(1);
  const maxSteps = labelSteps.length;

  const passingFunction = {
    arrScore: arrScore,
    setArrScore: setArrScore,
    selectedField: selectedField,
    selectedFieldVersion: selectedFieldVersion,
    selectedFieldVersionCount: selectedFieldVersionCount,
    setSelectedField: setSelectedField,
    setSelectedFieldVersion: setSelectedFieldVersion,
    setSelectedFieldVersionCount: setSelectedFieldVersionCount,
    handleFetchSave: handleFetchSave,
    handleFetchEdit: handleFetchEdit,
    handleReset: handleReset,
    editingData: editingData,

  }

  function handleReset(){
    setArrScore([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0])
    setActiveStep(0)
    setSelectedField(null)
    setSelectedFieldVersion(1)
    setSelectedFieldVersionCount(1)
  }

  function handleNext() {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  }

  function handleBack() {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  }

  async function handleFetchSave(){
    const resToken = token? token : await API._xhrGet('getcsrf')
    await API._xhrPost(
      token? token : resToken.token,
      'simulatorsystem', {
        action: 'create',
        fieldid: selectedField.fieldid,
        userscore: arrScore,
        choosefversion: selectedFieldVersion,
    }, (csrf, d) =>{
      setCSRFToken(csrf)
      if(/success/.test(d.status)){
        handleFetchSimulator()
        handleReset()
      }
    })
  }

  async function handleFetchEdit(){
    const resToken = token? token : await API._xhrGet('getcsrf')
    await API._xhrPost(
      token? token : resToken.token,
      'simulatorsystem', {
        action: 'edit',
        sequence: editingData.sequence,
        fieldid: selectedField.fieldid,
        userscore: arrScore,
        choosefversion: selectedFieldVersion,
    }, (csrf, d) =>{
      setCSRFToken(csrf)
      if(/success/.test(d.status)){
        handleFetchSimulator()
        handleReset()
        setEditing(false)
      }
    })
  }

  React.useEffect(()=>{
    if(editingData){
      setArrScore(editingData.userscore)
      setActiveStep(0)
      setSelectedField({...editingData.fieldinfo})
      setSelectedFieldVersion(editingData.fieldinfo.fieldversion)
    }
  },[ ])

  return(
    <div>
      <MobileStepper
        steps={maxSteps}
        position="static"
        variant="text"
        activeStep={activeStep}
        nextButton={
          activeStep === maxSteps - 1 ?
          <BTN.Primary
            disabled={selectedField === null || arrScore.some(s => s ===0)}
            onClick={editingData ? handleFetchEdit : handleFetchSave}>
            { API._getWord(sess && sess.language)[editing ? 'Save' : 'Create'] }
          </BTN.Primary>
          :
          <BTN.PrimaryText
            onClick={handleNext}>
            { API._getWord(sess && sess.language).Next }
            {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
          </BTN.PrimaryText>
        }
        backButton={
          <BTN.PrimaryText disabled={activeStep === 0} onClick={handleBack}>
            {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            { API._getWord(sess && sess.language).Back }
          </BTN.PrimaryText>
        }
      />
      <div></div>
      {function(){
        switch (activeStep) {
          case 0:
            return (
              <CourseInput {...props} {...passingFunction} />
            );
          default:
            return (
              <ScoreInput {...props} {...passingFunction} />
            );
        }
      }()}
    </div>
  );
}
