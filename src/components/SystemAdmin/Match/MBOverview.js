import React from 'react';
import Loadable from 'react-loadable';
import DateFnsUtils from '@date-io/date-fns';
import { makeStyles, withStyles, createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import * as API from './../../../api'
import { primary, grey } from './../../../api/palette'

import {
  IconButton,
  Typography,
  Box,
  Button,
  TextField,
  Radio,
  RadioGroup,
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormControl,
  FormLabel,

} from '@material-ui/core';

import CloudUploadIcon from '@material-ui/icons/CloudUpload';

import { LDCircular } from './../../loading/LDCircular'

const TemplateDialog = Loadable({
  loader: () => import(/* webpackChunkName: "TemplateDialog" */'./../../Utils/Dialog/TemplateDialog'),
  loading: () => <LDCircular />
});

const RichTextEditor = Loadable({
  loader: () => import(/* webpackChunkName: "RichTextEditor" */'./../../Utils/RichTextEditor'),
  loading: () => <LDCircular />
});

const LabelText = Loadable({
  loader: () => import(/* webpackChunkName: "LabelText" */'./../../Utils/LabelText'),
  loading: () => <LDCircular />
});

const Location = Loadable({
  loader: () => import(/* webpackChunkName: "Location" */'./../Course/Location'),
  loading: () => <LDCircular />
});

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    padding: theme.spacing(1, 2),
    width: '100%',
    boxSizing: 'border-box',
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: 900
  },
  margin: {
    width: '100%',
    marginTop: 8
  },
  grid: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.up(650)]: {
      flexDirection: 'row'
    },
  },
  gridChild1: {
    width: '100%',
    [theme.breakpoints.up(650)]: {
      width: '60%',
    },
  },
  gridChild2: {
    position: 'relative',
    width: '100%',
    [theme.breakpoints.up(650)]: {
      width: '40%',
      margin: '64px 0 0 16px'
    },
  },
  title: {
    color: primary[900],
    fontSize: 18
  },
  textMatchname: {
    width: '100%',
    marginTop: 8,
  },
  matchImg: {
    width: '100%',
    display: 'block',
    backgroundColor: '#ccc',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    objectFit: 'cover',
  },
  matchImgTemp: {
    width: '100%',
    display: 'flex',
    backgroundColor: grey[400],
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    objectFit: 'cover',
  },
  matchFile: {
    position: 'relative',
    overflow: 'hidden',
    display: 'inline-block',
  },
  inputFile: {
    cursor: 'pointer',
    position: 'absolute',
    left: 0,
    top: 0,
    opacity: 0,
    display: 'inline-block',
    zIndex: 1,
    width: '100%',
    height: '100%'
  },
  normal: {
    color: primary[900],
    paddingTop: 20,
    paddingBottom: 4
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
  editButton: {
    position: 'absolute',
    right: 16,
    top: 8,
    zIndex: 1
  },
  buttonControl: {
    display: 'flex',
    padding: 8
  },
  button: {
    flex: 1,
    marginTop: 16,
    padding: 16,
    width: '100%'
  },

}))

const GreenTextButton = withStyles(theme => ({
  root: {
    color: primary[500],
    fontWeight: 900,
    '&:hover': {
      backgroundColor: primary[100],
    },
  },
}))(Button);

const GreenButton = withStyles(theme => ({
  root: {
    color: theme.palette.getContrastText(primary[500]),
    backgroundColor: primary[700],
    '&:hover': {
      backgroundColor: primary[900],
    },
  },
}))(Button);

const StyledIconButton = withStyles(theme => ({
  root: {
    backgroundColor: grey[400],
    '&:hover': {
      backgroundColor: grey[100],
    },
  },
}))(IconButton);

const GreenRadio = withStyles({
  root: {
    color: primary[400],
    '&$checked': {
      color: primary[600],
    },
  },
  checked: {},
})(props => <Radio color="default" {...props} />);

const GreenCheckbox = withStyles({
  root: {
    color: primary[400],
    '&$checked': {
      color: primary[600],
    },
  },
})(props => <Checkbox color="default" {...props} />);

const theme = createMuiTheme({
  palette: {
    primary: primary,
  },
});

const datePickers = createMuiTheme({
  palette: {
    primary: primary,
  },
  overrides: {
    MuiDialog: {
      paperScrollPaper: {
        maxHeight: 'calc(100% - 24px)'
      }
    },
    MuiPickersToolbar: {
      toolbar: {
        display: window.innerHeight >= 520? 'flex' : 'none',
      }
    },
    MuiPickersModal: {
      dialog: {
        overflow: 'auto'
      }
    }
  },
});

export default function MBOverview(props){
  const classes = useStyles();
  const { sess, token, setCSRFToken, setData, data, matchid, handleSnackBar, isSupportWebp, isAvailableEditing, isHost } = props
  const [ open, setOpen ] = React.useState(false);
  const [ rulesState, setRulesState ] = React.useState(false);
  const [ modalType, setModalType ] = React.useState('');
  const imgRef = React.useRef(null)
  const [ fileHover, handleFileHover ] = React.useState(false);

  const [ selectedMatchName, setSelectedMatchName ] = React.useState('');
  const [ selectedField, setSelectedField ] = React.useState({
    fieldid: 1,
    fieldname: 'Course name'
  });
  const [ selectedFieldVersion, setSelectedFieldVersion ] = React.useState(1);
  const [ selectedPrivacy, setSelectedPrivacy ] = React.useState('public');
  const [ selectedMatchType, setSelectedMatchType ] = React.useState(null);
  const [ selectedDate, setSelectedDate ] = React.useState(new Date());
  const [ selectedFile, setSelectedFile ] = React.useState(null);
  const [ rulesData, setRulesData ] = React.useState(null);
  const [ tempFile, setTempFile ] = React.useState(null)
  const [ specialRewardData, setSpecialRewardData ] = React.useState({
    lownet: false,
    lowgross: false,
    booby: false
  })

  const handleOpen = (d) => {
    setOpen(true);
    setModalType(d)
  };

  const handleClose = () => {
    setOpen(false);
  };

  function setInitialData(d){
    setData(d)
    setSelectedMatchName(d.title)
    setSelectedDate(new Date(d.date))
    setSelectedField({
      fieldid: d.locationid,
      fieldname: d.location
    })
    setSelectedFieldVersion(d.locationversion)
    setSelectedPrivacy('public')
    setSpecialRewardData({
      lownet: d.lownet !== 0,
      lowgross: d.lowgross !== 0,
      booby: d.booby !== 0
    })
  }

  function checkSpecialRewardData(type, event){
    setSpecialRewardData({ ...specialRewardData, [type]: event.target.checked })
  }

  function isEditDetail(){
    if(
      data.title !== selectedMatchName ||
      API._dateToString(new Date(data.date)) !== API._dateToString(new Date(selectedDate)) ||
      data.locationid !== selectedField.fieldid ||
      data.locationversion !== selectedFieldVersion ||
      data.privacy !== selectedPrivacy ||
      ( data.lownet !== 0 ) !== specialRewardData.lownet ||
      ( data.lowgross !== 0 ) !== specialRewardData.lowgross ||
      ( data.booby !== 0 ) !== specialRewardData.booby ||
      selectedFile
    ){
      return true
    }
    return false
  }

  function handleRulesOpen(){
    setRulesState(true)
  }

  function handleRulesClose(){
    setRulesState(false)
  }

  function handleRulesCancel(){
    setRulesData(null)
    handleRulesClose()
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

  function handleEditorOnChange(data){
    setRulesData(data)
  }

  async function handleRulesSave(){
    let res = await API._xhrGet('getcsrf')
    const sendObj = {
      action: 'edit',
      matchid: parseInt(matchid)
    };

    if(rulesData){
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
          handleRulesClose()
          handleFetch()
        }
      })
    }
  }

  async function handleEditMatch(){
    let res = await API._xhrGet('getcsrf')
    const sendObj = {
      action: 'edit',
      matchid: parseInt(matchid)
    };

    if(props.pageOrganizer){
      Object.assign(sendObj, { pageid: props.pageData.pageid });
    }else{
      Object.assign(sendObj, { pageid: 0 });
    }

    if(specialRewardData.lowgross !== ( data.lowgross !== 0)){
      if(specialRewardData.lowgross){
        Object.assign(sendObj, { lowgross: 'set' });
      }else{
        Object.assign(sendObj, { lowgross: 'unset' });
      }
    }

    if(specialRewardData.lownet !== ( data.lownet !== 0)){
      if(specialRewardData.lownet){
        Object.assign(sendObj, { lownet: 'set' });
      }else{
        Object.assign(sendObj, { lownet: 'unset' });
      }
    }

    if(specialRewardData.booby !== ( data.booby !== 0)){
      if(specialRewardData.booby){
        Object.assign(sendObj, { booby: 'set' });
      }else{
        Object.assign(sendObj, { booby: 'unset' });
      }
    }

    if(selectedDate){
      Object.assign(sendObj, { matchdate: API._dateSendToAPI(selectedDate) });
    }

    if(selectedField){
      Object.assign(sendObj, { fieldid: selectedField.fieldid });
    }

    if(selectedFieldVersion !== 1){
      Object.assign(sendObj, { choosefversion: selectedFieldVersion });
    }

    if(selectedMatchName.length){
      Object.assign(sendObj, { matchname: selectedMatchName });
    }

    if(rulesData){
      Object.assign(sendObj, { message: rulesData });
    }

    if(selectedPrivacy){
      Object.assign(sendObj, { privacy: selectedPrivacy });
    }

    if(selectedMatchType){
      Object.assign(sendObj, { scorematch: parseInt(selectedMatchType) });
    }

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
        handleCreatePicture(csrf, d)
      }
    })
  }

  async function handleCreatePicture(csrf, d){
    var status = d.status
    const formData = new FormData()
    if(selectedFile){
      formData.append('matchimage', selectedFile)
      const response = await API._fetchPostFile(
        sess.typeid === 'admin'? 'matchsystem' : 'mmatchsystem',
        `?_csrf=${csrf}`, {
        action: 'edit',
        matchid: parseInt(matchid),
        photopath: true,
      }, formData)
      const res = await API._xhrGet('getcsrf')
      setCSRFToken( res.token )
      status = response.status
    }else{
      setCSRFToken(csrf)
      if(props.pageOrganizer){
        window.location.replace(`/organizer/${props.pageData.pageid}/management/match/${matchid}`);
      }else{
        window.location.replace(`/user/management/match/${matchid}`);
      }
    }
    handleSnackBar({
      state: true,
      message: status,
      variant: /success/.test(status) ? status : 'error',
      autoHideDuration: /success/.test(status)? 2000 : 5000
    })
    await handleFetch()
    if(/success/.test(status)){
      if(props.pageOrganizer){
        window.location.replace(`/organizer/${props.pageData.pageid}/management/match/${matchid}`);
      }else{
        window.location.replace(`/user/management/match/${matchid}`);
      }
    }
  }

  async function handleFetch(){
    if(matchid){
      const resToken = token? token : await API._xhrGet('getcsrf')
      await API._xhrPost(
        token? token : resToken.token,
        sess.typeid === 'admin'? 'loadmatch' :'mloadmatch', {
          action: 'detail',
          matchid: matchid
      }, (csrf, d) =>{
        setCSRFToken(csrf)
        if(
          d.status !== 'class database error' ||
          d.status !== 'wrong matchid' ||
          d.status !== 'wrong action' ||
          d.status !== 'wrong params'
        ){
          setInitialData(d)
        }else{
          handleSnackBar({
            state: true,
            message: d.status,
            variant: 'error',
            autoHideDuration: 5000
          })
        }
      })
    }
  }

  React.useEffect(()=>{
    handleFetch()
  },[ ])

  return (
    <div className={classes.root}>
      { ( data && data.status !== 'wrong params' ) ?
        <React.Fragment>
          <div className={classes.grid}>
            <div className={classes.gridChild1}>
              <ThemeProvider theme={theme}>
                <TextField
                  disabled={!isAvailableEditing}
                  className={classes.textMatchname}
                  label={ API._getWord(sess && sess.language).Match_name }
                  value={selectedMatchName}
                  onChange={e =>setSelectedMatchName(e.target.value)}
                />
              </ThemeProvider>
              <div style={{ display: 'flex', marginTop: 16 }}>
                <ThemeProvider theme={datePickers}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      disabled={!isAvailableEditing}
                      clearable
                      className={classes.margin}
                      label={ API._getWord(sess && sess.language).Match_Date }
                      inputVariant="outlined"
                      format="dd/MM/yyyy"
                      value={selectedDate}
                      onChange={date => handleDateChange(date)}
                    />
                  </MuiPickersUtilsProvider>
                </ThemeProvider>
              </div>
              { ( selectedFile || (data && data.picture) )?
                <div style={{ position: 'relative' }}
                  onMouseEnter={()=>isAvailableEditing ? handleFileHover(true) : console.log()}
                  onMouseLeave={()=>isAvailableEditing ? handleFileHover(false) : console.log()}>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Typography variant="caption" style={{ textAlign: 'center' }}>
                      { API._getWord(sess && sess.language).Upload_image }
                    </Typography>
                  </div>
                  <img ref={imgRef}
                    className={classes.matchImg}
                    style={{
                      opacity: isAvailableEditing ? (fileHover?.5:1) : .3,
                      ...(!isAvailableEditing && {opacity:.5,backgroundColor: grey[50]}),
                      maxHeight: 280, height: window.innerWidth * ( window.innerWidth >= 650?.3:.45 ) }}
                    src={
                      selectedFile && tempFile ?
                      tempFile
                      :
                      API._getPictureUrl(data.picture) + ( isSupportWebp? '.webp' : '.jpg' ) + '#' + new Date().toISOString()
                    } />
                  { imgRef.current && isAvailableEditing &&
                    <div
                      style={{
                        display: 'flex',
                        position: 'absolute',
                        height: imgRef.current.offsetHeight,
                        width: imgRef.current.offsetWidth,
                        top: 0, left: 0,
                      }}>
                      <div style={{ flex: 1 }} />
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <div style={{ flex: 1 }} />
                        <StyledIconButton className={classes.matchFile}>
                          <input className={classes.inputFile} type="file" accept="image/png, image/jpeg" onChange={handlePicture} />
                          <CloudUploadIcon fontSize="large" style={{ color: primary[400] }} />
                        </StyledIconButton>
                        <div style={{ flex: 1 }} />
                      </div>
                      <div style={{ flex: 1 }} />
                    </div>
                  }
                </div>
                :
                <div style={{ position: 'relative' }}>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Typography variant="caption" style={{ textAlign: 'center' }}>
                      { API._getWord(sess && sess.language).Upload_image }
                    </Typography>
                  </div>
                  <div className={classes.matchImgTemp}
                    style={{ height: window.innerWidth * ( window.innerWidth >= 650?.3:.45 ), maxHeight: 280 }}>
                    <div style={{ flex: 1 }} />
                    { isAvailableEditing &&
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <div style={{ flex: 1 }} />
                        <StyledIconButton className={classes.matchFile}>
                          <input className={classes.inputFile} type="file" accept="image/png, image/jpeg" onChange={handlePicture} />
                          <CloudUploadIcon fontSize="large" style={{ color: primary[500] }} />
                        </StyledIconButton>
                        <div style={{ flex: 1 }} />
                      </div>
                    }
                    <div style={{ flex: 1 }} />
                  </div>
                </div>
              }
            </div>
            <div className={classes.gridChild2}>
              <ThemeProvider theme={theme}>
                <FormControl component="fieldset" className={classes.margin}
                  disabled={!isAvailableEditing}
                  style={{
                    width: '100%',
                    border: '1px rgba(0, 0, 0, 0.23) solid', borderRadius: 4, boxSizing: 'border-box'
                  }}>
                  <FormLabel component="legend" style={{ marginLeft: 16, fontSize: 12 }}>
                    { API._getWord(sess && sess.language).Course }
                  </FormLabel>
                  <GreenTextButton
                    disabled={!isAvailableEditing}
                    className={classes.button}
                    style={{ textTransform: 'none', marginTop: 0 }}
                    onClick={()=>handleOpen('location')}>
                    {selectedField.fieldname}
                    {selectedFieldVersion !== 1 && '( '+ selectedFieldVersion + ' )'}
                  </GreenTextButton>
                </FormControl>
                <FormControl component="fieldset" className={classes.margin}
                  disabled={!isAvailableEditing}
                  style={{
                    width: '100%',
                    border: '1px rgba(0, 0, 0, 0.23) solid',
                    padding: '4px 16px 8px 24px', borderRadius: 4, boxSizing: 'border-box'
                  }}>
                  <FormLabel component="legend" style={{ marginLeft: 16, fontSize: 12 }}>
                    { API._getWord(sess && sess.language).Privacy }
                  </FormLabel>
                  <RadioGroup
                    value={selectedPrivacy}
                    onChange={handlePrivacy} row>
                    <FormControlLabel
                      value={'public'}
                      control={<GreenRadio />}
                      label={ API._getWord(sess && sess.language).Public }
                      labelPlacement="end"
                    />
                    <FormControlLabel
                      value={'friend'}
                      control={<GreenRadio />}
                      label={ API._getWord(sess && sess.language).Friend }
                      labelPlacement="end"
                    />
                    <FormControlLabel
                      value={'private'}
                      control={<GreenRadio />}
                      label={ API._getWord(sess && sess.language).Private }
                      labelPlacement="end"
                    />
                  </RadioGroup>
                </FormControl>
                <FormControl component="fieldset" className={classes.margin}
                  disabled={!isAvailableEditing || (data && data.scorematch === 1)}
                  style={{
                    width: '100%',
                    border: '1px rgba(0, 0, 0, 0.23) solid',
                    padding: '4px 16px 8px 24px', borderRadius: 4, boxSizing: 'border-box',
                  }}>
                  <FormLabel component="legend" style={{ marginLeft: 16, fontSize: 12 }}>
                    { API._getWord(sess && sess.language).Special_reward }
                  </FormLabel>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <GreenCheckbox
                          fontSize="large"
                          checked={specialRewardData.lowgross}
                          onChange={e =>checkSpecialRewardData('lowgross', e)}
                          value="Low gross" />
                      }
                      label={ API._getWord(sess && sess.language).Lowgross }
                    />
                    <FormControlLabel
                      control={
                        <GreenCheckbox
                          checked={specialRewardData.lownet}
                          onChange={e =>checkSpecialRewardData('lownet', e)}
                          value="Low net" />
                      }
                      label={ API._getWord(sess && sess.language).Lownet }
                    />
                    <FormControlLabel
                      control={
                        <GreenCheckbox
                          checked={specialRewardData.booby}
                          onChange={e =>checkSpecialRewardData('booby', e)}
                          value="Booby" />
                      }
                      label={ API._getWord(sess && sess.language).Booby }
                    />
                  </FormGroup>
                </FormControl>
                { /*
                  <FormControl component="fieldset" className={classes.margin}
                    style={{ width: '100%', border: '1px rgba(0, 0, 0, 0.23) solid', padding: '4px 16px 8px 24px', borderRadius: 4 }}
                    disabled={!editing}>
                    <FormLabel component="legend" style={{ marginLeft: 16 }}>Type</FormLabel>
                    <RadioGroup
                      value={
                        data?( selectedMatchType? selectedMatchType : data.scorematch.toString() ):'1'
                      }
                      onChange={handleMatchType} row>
                      <FormControlLabel
                        value={'1'}
                        control={<GreenRadio />}
                        label="Pro"
                        labelPlacement="end"
                      />
                      <FormControlLabel
                        value={'0'}
                        control={<GreenRadio />}
                        label="Amateur"
                        labelPlacement="end"
                      />
                    </RadioGroup>
                  </FormControl>*/
                }
              </ThemeProvider>
            </div>
          </div>
          <GreenTextButton
            disabled={!isAvailableEditing}
            variant="outlined"
            className={classes.button}
            style={{ textTransform: 'none' }}
            onClick={handleRulesOpen}>
            { API._getWord(sess && sess.language)['Match Rules, Regulations and Detail'] }
          </GreenTextButton>
          { isEditDetail() &&
            <div className={classes.buttonControl}>
              <div style={{ flex: 2 }}></div>
              <GreenButton variant="contained" className={classes.button}
                onClick={handleEditMatch}>
                { API._getWord(sess && sess.language).Save }
              </GreenButton>
            </div>
          }
        </React.Fragment>
        :
        <LDCircular />
      }
      <TemplateDialog open={rulesState} handleClose={handleRulesClose} maxWidth="md"
        title={
          <LabelText text={ API._getWord(sess && sess.language)['Match Rules, Regulations and Detail'] } />
        }>
        { (data && data.message) ?
          <RichTextEditor HTMLData={data.message} handleGetHTML={e =>handleEditorOnChange(e)} />
          :
          <RichTextEditor handleGetHTML={e =>handleEditorOnChange(e)} />
        }
        <div style={{ marginTop: 24, display: 'flex', }}>
          <div style={{ flex: 3 }} />
          <GreenTextButton className={classes.button}
            onClick={handleRulesCancel}>
            { API._getWord(sess && sess.language).Cancel }
          </GreenTextButton>
          <GreenButton variant="contained" className={classes.button}
            onClick={handleRulesSave}>
            { API._getWord(sess && sess.language).Save }
          </GreenButton>
        </div>
      </TemplateDialog>
      { modalType && modalType === 'location' &&
        <TemplateDialog open={open} handleClose={handleClose}>
          <Location
            {...props}
            overviewEdit
            selectedField={selectedField}
            setSelectedField={setSelectedField}
            selectedFieldVersion={selectedFieldVersion}
            setSelectedFieldVersion={setSelectedFieldVersion}
            handleOnDoneSelectField={handleClose} />
        </TemplateDialog>
      }
    </div>
  );
}
