import React from 'react';
import Loadable from 'react-loadable';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import MobileStepper from '@material-ui/core/MobileStepper';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

const CreateMatchBody = Loadable({
  loader: () => import(/* webpackChunkName: "CreateMatchBody" */'./CreateMatchBody'),
  loading: () => null
});

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    minHeight: 300,
    marginTop: 24,
    marginBottom: 24,
    backgroundColor: theme.palette.background.default,
  },
  header: {
    display: 'flex',
    justifyContent: 'center',
    height: 50,
    marginTop: 16,
    backgroundColor: theme.palette.background.default,
  },

}));

const labelSteps = [
  'Math detail',
  'Course',
  'Picture'
]

export default function MatchStepper(props) {
  const classes = useStyles();
  const theme = useTheme();
  const {
    API, BTN, token, setCSRFToken, handleSnackBar,
    dialogStepper, handleCreateMatchClose, setExpanded, pageOrganizer, pageData
  } = props
  const [ activeStep, setActiveStep ] = React.useState(0);
  const maxSteps = labelSteps.length;
  const [ matchName, setMatchName ] = React.useState('');
  const [ matchClass, setMatchClass ] = React.useState(0);
  const [ selectedField, setSelectedField ] = React.useState('');
  const [ selectedFieldVersion, setSelectedFieldVersion ] = React.useState(1);
  const [ selectedPrivacy, setSelectedPrivacy ] = React.useState('public');
  const [ selectedMatchType, setSelectedMatchType ] = React.useState('1');
  const [ selectedDate, setSelectedDate ] = React.useState(new Date());
  const [ selectedFile, setSelectedFile ] = React.useState(null);
  const [ tempFile, setTempFile ] = React.useState(null)

  const passingFunction = {
    matchName: matchName,
    matchClass: matchClass,
    selectedField: selectedField,
    selectedFieldVersion: selectedFieldVersion,
    selectedPrivacy: selectedPrivacy,
    selectedMatchType: selectedMatchType,
    selectedDate: selectedDate,
    selectedFile: selectedFile,
    tempFile: tempFile,
    setMatchName: setMatchName,
    setMatchClass: setMatchClass,
    setSelectedField: setSelectedField,
    handlePrivacy: handlePrivacy,
    handleMatchType: handleMatchType,
    handleDateChange: handleDateChange,
    handlePicture: handlePicture,
    setSelectedFieldVersion: setSelectedFieldVersion
  }

  function handleNext() {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  }

  function handleBack() {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  }

  function handlePrivacy(event) {
    setSelectedPrivacy(event.target.value);
  }

  function handleMatchType(event) {
    setSelectedMatchType(event.target.value);
  }

  function handleDateChange(d){
    setSelectedDate(d)
  }

  function handleReset(){
    setMatchName('')
    setMatchClass(0)
    setSelectedField('')
    setSelectedDate(new Date())
    setSelectedFile('')
    setSelectedPrivacy('0')
    setSelectedMatchType('1')
  }

  function handlePicture(e){
    const file = event.target.files[0]
    const fileSize = file.size
    var reader = new FileReader();
    if( fileSize > 5000000 ){
      handleSnackBar({
        state: true,
        message: `File size(${fileSize} B) is too large. Maximun 5 MB`,
        variant: 'error',
        autoHideDuration: 5000
      })
    }else{
      if( file.type === 'image/jpeg' || file.type === 'image/png'){
        setSelectedFile(file)
        reader.readAsDataURL(file);
        reader.onloadend = function (){
          setTempFile(reader.result)
        }
      }else{
        handleSnackBar({
          state: true,
          message: 'Invalid file type. Only JPEG or PNG',
          variant: 'error',
          autoHideDuration: 5000
        })
      }
    }
  }

  async function handleCreate(){
    const sendObj = {
      action: 'create',
      matchname: matchName,
      fieldid: selectedField.fieldid,
      scorematch: parseInt(selectedMatchType),
      class: matchClass,
      privacy: selectedPrivacy,
      matchdate: API.handleDateToString(selectedDate),
    }

    if(selectedFieldVersion !== 1){
      Object.assign(sendObj, { choosefversion: selectedFieldVersion.version });
    }

    if(pageOrganizer){
      Object.assign(sendObj, { pageid: pageData.pageid });
    }

    const resToken = token? token : await API.xhrGet('getcsrf')
    await API.xhrPost(
      token? token : resToken.token,
      'mmatchsystem', {
        ...sendObj
    }, (csrf, d) =>{
      setCSRFToken(csrf)
      handleSnackBar({
        state: true,
        message: d.status,
        variant: d.status === 'success' ? d.status : 'error',
        autoHideDuration: d.status === 'success'? 2000 : 5000
      })
      if(d.status === 'success'){
        handleCreatePicture(csrf, d)
      }
    })
  }

  async function handleCreatePicture(csrf, d){
    var status = d.status
    const formData = new FormData()
    if(selectedFile){
      formData.append('matchimage', selectedFile)
      const response = await API.fetchPostFile(
        'mmatchsystem',
        `?_csrf=${csrf}`, {
        action: 'edit',
        matchid: d.matchid,
        photopath: true,
      }, formData)
      const resToken = await API.xhrGet('getcsrf')
      setCSRFToken(resToken.token)
      status = response.status
    }else{
      setCSRFToken(csrf)
    }
    handleSnackBar({
      state: true,
      message: status,
      variant: status === 'success' ? status : 'error',
      autoHideDuration: status === 'success'? 2000 : 5000
    })
    if(status === 'success'){
      if(dialogStepper){
        handleCreateMatchClose()
      }else{
        setExpanded(false)
      }
    }
  }

  return (
    <div className={classes.root}>
      <MobileStepper
        steps={maxSteps}
        position="static"
        variant="text"
        activeStep={activeStep}
        nextButton={
          activeStep === maxSteps - 1 ?
          <BTN.Primary size="small" onClick={handleCreate}>
            Create
          </BTN.Primary>
          :
          <BTN.PrimaryText size="small" onClick={handleNext}>
            Next
            {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
          </BTN.PrimaryText>
        }
        backButton={
          <BTN.PrimaryText size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            Back
          </BTN.PrimaryText>
        }
      />
      <Paper square elevation={0} className={classes.header}>
        <Typography variant="h6" style={{ textAlign: 'center' }}>{labelSteps[activeStep]}</Typography>
      </Paper>
      <CreateMatchBody {...props} {...passingFunction} activeStep={activeStep} handleNext={handleNext} />
    </div>
  );
}
