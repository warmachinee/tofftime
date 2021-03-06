import React from 'react';
import Loadable from 'react-loadable';
import { makeStyles, useTheme } from '@material-ui/core/styles';

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

const CreateMatchBody = Loadable({
  loader: () => import(/* webpackChunkName: "CreateMatchBody" */'./CreateMatchBody'),
  loading: () => null
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

const labelSteps4 = [
  'Math detail',
  'Course',
  'Add Picture',
  'Match Rules, Regulations and Detail'
]

const labelSteps5 = [
  'Math detail',
  'Set up special reward',
  'Course',
  'Add Picture',
  'Match Rules, Regulations and Detail'
]

export default function MatchStepper(props) {
  const classes = useStyles();
  const theme = useTheme();
  const {
    API, BTN, sess, token, setCSRFToken, handleSnackBar, setData, setDataClassed, setMatchOwnerStatus,
    setExpanded, pageOrganizer, pageData
  } = props
  const [ activeStep, setActiveStep ] = React.useState(0);
  const [ matchName, setMatchName ] = React.useState('');
  const [ selectedField, setSelectedField ] = React.useState(null);
  const [ selectedFieldVersion, setSelectedFieldVersion ] = React.useState(1);
  const [ selectedFieldVersionCount, setSelectedFieldVersionCount ] = React.useState(1);
  const [ selectedPrivacy, setSelectedPrivacy ] = React.useState( (sess && sess.creatematch) ? sess.creatematch : 'public');
  const [ selectedMatchType, setSelectedMatchType ] = React.useState('1');
  const [ selectedDate, setSelectedDate ] = React.useState(new Date());
  const [ selectedFile, setSelectedFile ] = React.useState(null);
  const [ tempFile, setTempFile ] = React.useState(null)
  const [ pageState, setPageState ] = React.useState('select')
  const [ rulesData, setRulesData ] = React.useState(null);
  const [ isCreateDisable, setIsCreateDisable ] = React.useState(false)
  const [ specialRewardData, setSpecialRewardData ] = React.useState({
    lownet: false,
    lowgross: false,
    booby: false
  })
  const maxSteps = selectedMatchType === '1' ? labelSteps4.length : labelSteps5.length;

  const passingFunction = {
    matchName: matchName,
    selectedField: selectedField,
    selectedFieldVersion: selectedFieldVersion,
    selectedFieldVersionCount: selectedFieldVersionCount,
    selectedPrivacy: selectedPrivacy,
    selectedMatchType: selectedMatchType,
    selectedDate: selectedDate,
    selectedFile: selectedFile,
    tempFile: tempFile,
    setMatchName: setMatchName,
    setSelectedField: setSelectedField,
    handlePrivacy: handlePrivacy,
    handleMatchType: handleMatchType,
    handleDateChange: handleDateChange,
    handlePicture: handlePicture,
    setSelectedFieldVersion: setSelectedFieldVersion,
    setSelectedFieldVersionCount: setSelectedFieldVersionCount,
    pageState: pageState,
    setPageState: setPageState,
    handleEditorOnChange: handleEditorOnChange,
    specialRewardData: specialRewardData,
    setSpecialRewardData: setSpecialRewardData,
    checkSpecialRewardData: checkSpecialRewardData,

  }

  function getLabel(label){
    if(sess && sess.language === 'TH'){
      switch (true) {
        case label === 'Math detail':
          return 'รายละเอียดการแข่งขัน'
          break;
        case label === 'Set up special reward':
          return 'ตั้งค่ารางวัลพิเศษ'
          break;
        case label === 'Course':
          return 'เลือกสนาม'
          break;
        case label === 'Add Picture':
          return 'เพิ่มรูปภาพ'
          break;
        default:
          return 'กฏ กติกา และ รายละเอียดการแข่งขัน'
      }
    }else{
      return label
    }
  }

  function checkSpecialRewardData(type, event){
    setSpecialRewardData({ ...specialRewardData, [type]: event.target.checked })
  }

  function handleNext() {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  }

  function handleBack() {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  }

  function handleReset() {
    setSelectedField('')
    setSelectedFieldVersion(1)
    setSelectedFieldVersionCount(1)
    setSelectedPrivacy('public')
    setSelectedMatchType('1')
    setSelectedDate(new Date())
    setSelectedFile(null)
    setTempFile(null)
    setPageState('select')
  }

  function handleEditorOnChange(data){
    setRulesData(data)
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
    setIsCreateDisable(true)
    const sendObj = {
      action: 'create',
      matchname: matchName,
      fieldid: selectedField.fieldid,
      scorematch: parseInt(selectedMatchType),
      privacy: selectedPrivacy,
      matchdate: API._dateSendToAPI(selectedDate),
    }

    if(specialRewardData.lowgross){
      Object.assign(sendObj, { lowgross: 'set' });
    }

    if(specialRewardData.lownet){
      Object.assign(sendObj, { lownet: 'set' });
    }

    if(specialRewardData.booby){
      Object.assign(sendObj, { booby: 'set' });
    }

    if(selectedFieldVersion !== 1){
      Object.assign(sendObj, { choosefversion: selectedFieldVersion });
    }

    if(pageOrganizer){
      Object.assign(sendObj, { pageid: pageData.pageid });
    }else{
      Object.assign(sendObj, { pageid: 0 });
    }

    const resToken = token? token : await API._xhrGet('getcsrf')
    await API._xhrPost(
      token? token : resToken.token,
      'mmatchsystem', {
        ...sendObj
    }, (csrf, d) =>{
      setCSRFToken(csrf)
      if(/success/.test(d.status)){
        handleCreatePicture(csrf, d)
      }else{
        setExpanded(false)
        setMatchOwnerStatus('mine')
        handleFetch()
        handleSnackBar({
          state: true,
          message: d.status,
          variant: /success/.test(d.status) ? d.status : 'error',
          autoHideDuration: /success/.test(d.status)? 2000 : 5000
        })
        if(pageOrganizer){
          if(/create_match/.test(window.location.href)){
            if(props.isCreateAfterDone && props.swtichCreateAfterDone){
              handleFetchCreatePost(matchid)
            }else{
              window.location.replace(`/organizer/${pageData.pageid}`);
            }
          }else{
            if(props.isCreateAfterDone && props.swtichCreateAfterDone){
              handleFetchCreatePost(matchid)
            }
            if(props.handleCloseEditor){
              props.handleCloseEditor(d.matchid)
            }
          }
        }else{
          window.location.replace(`/match/${matchid}`);
        }
      }
    })
  }

  async function handleCreatePicture(csrf, d){
    if(selectedFile){
      var status = d.status
      const formData = new FormData()
      formData.append('matchimage', selectedFile)
      const response = await API._fetchPostFile(
        'mmatchsystem',
        `?_csrf=${csrf}`, {
        action: 'edit',
        matchid: d.matchid,
        photopath: true,
      }, formData)
      const resToken = await API._xhrGet('getcsrf')
      setCSRFToken(resToken.token)
      status = response.status
      if(/success/.test(status)){
        handleRulesSave(d.matchid)
        /*
        setExpanded(false)
        setMatchOwnerStatus('mine')*/
      }else{
        handleSnackBar({
          state: true,
          message: status,
          variant: /success/.test(status) ? status : 'error',
          autoHideDuration: /success/.test(status)? 2000 : 5000
        })
      }
    }else{
      handleRulesSave(d.matchid)
    }
  }

  async function handleRulesSave(matchid){
    if(rulesData){
      let res = await API._xhrGet('getcsrf')
      const sendObj = {
        action: 'edit',
        matchid: parseInt(matchid)
      };
      Object.assign(sendObj, { message: rulesData });
      await API._xhrPost(
        token? token : resToken.token,
        sess.typeid === 'admin'? 'matchsystem' : 'mmatchsystem', sendObj,
        (csrf, d) =>{
        setCSRFToken(csrf)
        handleSnackBar({
          state: true,
          message: d.status,
          variant: /success/.test(d.status) ? d.status : 'error',
          autoHideDuration: /success/.test(d.status)? 2000 : 5000
        })
        if(/success/.test(d.status)){
          if(pageOrganizer){
            if(/create_match/.test(window.location.href)){
              if(props.isCreateAfterDone && props.swtichCreateAfterDone){
                handleFetchCreatePost(matchid)
              }else{
                window.location.replace(`/organizer/${pageData.pageid}`);
              }
            }else{
              if(props.isCreateAfterDone && props.swtichCreateAfterDone){
                handleFetchCreatePost(matchid)
              }
              if(props.handleCloseEditor){
                props.handleCloseEditor(matchid)
              }
            }
          }else{
            window.location.replace(`/match/${matchid}`);
          }
        }
      })
    }else{
      if(pageOrganizer){
        if(/create_match/.test(window.location.href)){
          if(props.isCreateAfterDone && props.swtichCreateAfterDone){
            handleFetchCreatePost(matchid)
          }else{
            window.location.replace(`/organizer/${pageData.pageid}`);
          }
        }else{
          if(props.isCreateAfterDone && props.swtichCreateAfterDone){
            handleFetchCreatePost(matchid)
          }
          if(props.handleCloseEditor){
            props.handleCloseEditor(matchid)
          }
        }
      }else{
        window.location.replace(`/match/${matchid}`);
      }
      //window.location.replace(`/user/management/match/${d.matchid}#invitation`)
    }
  }

  async function handleFetch(){
    var arrData = []
    const resToken = token? token : await API._xhrGet('getcsrf')
    await API._xhrPost(
      token? token : resToken.token,
      sess.typeid === 'admin' ? 'loadmatch' : 'loadusersystem', {
        ...(sess.typeid === 'admin') ? { action: 'list' } : { action: 'creator' }
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

  async function handleFetchCreatePost(matchid){
    const resToken = token? token : await API._xhrGet('getcsrf')
    const formData = new FormData()
    const sendObj = {
      action: 'post',
      pageid: pageData.pageid,
      type: 'match',
      matchid: matchid,
      message: `Match ${matchid}`
    };

    await API._xhrPost(
      token? token : resToken.token,
      'ppagesection', {
        ...sendObj
    }, (csrf, d) =>{
      setCSRFToken(csrf)
      if(/success/.test(d.status)){
        handleSnackBar({
          state: true,
          message: d.status,
          variant: /success/.test(d.status) ? d.status : 'error',
          autoHideDuration: /success/.test(d.status)? 2000 : 5000
        })
        if(pageOrganizer){
          if(/create_match/.test(window.location.href)){
            window.location.replace(`/organizer/${pageData.pageid}`);
          }else{
            setTimeout(()=>{
              props.dialogCloseAll()
            }, 1000)
          }
        }else{
          window.location.replace(`/match/${matchid}`);
        }
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

  return (
    <div className={classes.root}>
      <MobileStepper
        steps={maxSteps}
        position="static"
        variant="text"
        activeStep={activeStep}
        nextButton={
          activeStep === maxSteps - 1 ?
          <BTN.Primary disabled={isCreateDisable} size="small" onClick={handleCreate}>
            { API._getWord(sess && sess.language).Create }
          </BTN.Primary>
          :
          <BTN.PrimaryText
            disabled={function(){
              switch (activeStep) {
                case 0:
                  return matchName === ''
                  break;
                case selectedMatchType === '1' ? 1 : 2:
                  return selectedField === null
                  break;
                default:
                  return false
              }
            }()}
            size="small" onClick={handleNext}>
            { API._getWord(sess && sess.language).Next }
            {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
          </BTN.PrimaryText>
        }
        backButton={
          <BTN.PrimaryText disabled={activeStep === 0} size="small" onClick={handleBack}>
            {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            { API._getWord(sess && sess.language).Back }
          </BTN.PrimaryText>
        }
      />

      { !( activeStep === 1 && pageState !== 'select' ) &&
        <Paper square elevation={0} className={classes.header}>
          <Typography variant="h6" style={{ textAlign: 'center' }}>
            {selectedMatchType === '1' ? getLabel(labelSteps4[activeStep]) : getLabel(labelSteps5[activeStep]) }
          </Typography>
        </Paper>
      }
      <CreateMatchBody {...props} {...passingFunction} activeStep={activeStep} handleNext={handleNext} />
    </div>
  );
}
