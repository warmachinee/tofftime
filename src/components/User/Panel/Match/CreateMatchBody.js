import React from 'react';
import Loadable from 'react-loadable';
import DateFnsUtils from '@date-io/date-fns';
import { makeStyles, withStyles, createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import { primary, grey } from './../../../../api/palette'

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
  Input,

} from '@material-ui/core';

import CloudUploadIcon from '@material-ui/icons/CloudUpload';

import { LDCircular } from './../../../loading/LDCircular'

const Location = Loadable({
  loader: () => import(/* webpackChunkName: "Location" */'./../../../SystemAdmin/Course/Location'),
  loading: () => <LDCircular />
});

const RichTextEditor = Loadable({
  loader: () => import(/* webpackChunkName: "RichTextEditor" */'./../../../Utils/RichTextEditor'),
  loading: () => <LDCircular />
});

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    padding: theme.spacing(1, 2),
    width: '100%',
    height: 'auto',
    backgroundColor: grey[50],
    cursor: 'pointer'
  },
  grid: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  margin: {
    width: '100%',
    marginTop: 8
  },
  title: {
    color: primary[900],
    fontSize: 18
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
    maxHeight: 480,
    maxWidth: 720,
    margin: 'auto'
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
    marginTop: 16
  },
  editButton: {
    position: 'absolute',
    right: 16,
    top: 8,
  },
  buttonControl: {
    display: 'flex',
    padding: 8,
    marginTop: 24,
  },
  button: {
    flex: 1,
    marginTop: 16,
    padding: 16,
    width: '100%'
  },
  dateClassGrid: {
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.up(400)]: {
      flexDirection: 'row',
    },
  },
  textFieldClass: {
    width: 280,
    marginTop: 16,
    [theme.breakpoints.up(400)]: {
      marginTop: 'auto',
      marginLeft: 16,
    },
  },

}))

const StyledTextButton = withStyles(theme => ({
  root: {
    color: primary[500],
    fontWeight: 900,
    '&:hover': {
      backgroundColor: primary[100],
    },
  },
}))(Button);

const StyledButton = withStyles(theme => ({
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

export default function CreateMatchBody(props){
  const classes = useStyles();
  const {
    API, BTN, sess, setData, setDataClassed, token, setCSRFToken, handleSnackBar, activeStep,
    matchName, matchClass, selectedField, selectedPrivacy, selectedMatchType, selectedDate, selectedFile, tempFile,
    setMatchName, setSelectedField, handleEditorOnChange, handlePrivacy, handleMatchType, handleDateChange, handlePicture,
    specialRewardData, setSpecialRewardData, checkSpecialRewardData
  } = props
  const imgRef = React.useRef(null)
  const [ fileHover, handleFileHover ] = React.useState(false);

  return(
    <div style={{ padding: 8, marginLeft: 'auto', marginRight: 'auto', maxWidth: 900 }}>
      <div className={classes.grid}>
        {function() {
          switch(activeStep) {
            case 0:
              return (
                <React.Fragment>
                  <ThemeProvider theme={theme}>
                    <TextField
                      autoFocus={API._isDesktopBrowser() && activeStep === 0}
                      variant="outlined"
                      className={classes.margin}
                      label={ API._getWord(sess && sess.language).Match_name }
                      value={matchName || ''}
                      error={matchName === ''}
                      helperText={
                        matchName === ''?
                        ( API._getWord(sess && sess.language)['Please fill Match name.'] )
                        :
                        null
                      }
                      onChange={e =>setMatchName(e.target.value)}
                    />
                  </ThemeProvider>
                  <ThemeProvider theme={theme}>
                    <FormControl component="fieldset" className={classes.margin}
                      style={{ width: '100%', border: '1px rgba(0, 0, 0, 0.23) solid', padding: '4px 16px 8px 24px', borderRadius: 4, boxSizing: 'border-box' }}>
                      <FormLabel component="legend" style={{ marginLeft: 16 }}>
                        { API._getWord(sess && sess.language).Privacy }
                      </FormLabel>
                      <RadioGroup value={selectedPrivacy} onChange={handlePrivacy} row>
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
                      style={{ width: '100%', border: '1px rgba(0, 0, 0, 0.23) solid', padding: '4px 16px 8px 24px', borderRadius: 4, boxSizing: 'border-box' }}>
                      <FormLabel component="legend" style={{ marginLeft: 16 }}>
                        { API._getWord(sess && sess.language).Type }
                      </FormLabel>
                      <RadioGroup value={selectedMatchType} onChange={handleMatchType} row>
                        <FormControlLabel
                          value={'1'}
                          control={<GreenRadio />}
                          label={ API._getWord(sess && sess.language).Professional }
                          labelPlacement="end"
                        />
                        <FormControlLabel
                          value={'0'}
                          control={<GreenRadio />}
                          label={ API._getWord(sess && sess.language).Amateur }
                          labelPlacement="end"
                        />
                        <FormControlLabel
                          value={'2'}
                          control={<GreenRadio />}
                          label={ API._getWord(sess && sess.language).Charity }
                          labelPlacement="end"
                        />
                      </RadioGroup>
                    </FormControl>
                  </ThemeProvider>
                  <div className={classes.dateClassGrid}>
                    <ThemeProvider theme={datePickers}>
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                          clearable
                          style={{ marginTop: 24 }}
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
                </React.Fragment>
              );
            case (selectedMatchType === '1' ? 99 : 1):
              return (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <ThemeProvider theme={theme}>
                    <FormControl component="fieldset" className={classes.formControl}>
                      <FormLabel component="legend">{ API._getWord(sess && sess.language).Special_reward }</FormLabel>
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
                  </ThemeProvider>
                </div>
              )
            case (selectedMatchType === '1' ? 1 : 2):
              return (
                <Location
                  {...props}
                  selectedField={selectedField}
                  setSelectedField={setSelectedField} />
              )
            case (selectedMatchType === '1' ? 2 : 3):
              return (
                <div>
                  { selectedFile && tempFile?
                    <div style={{ position: 'relative', marginTop: 16 }}
                      onMouseEnter={()=>handleFileHover(true)}
                      onMouseLeave={()=>handleFileHover(false)}>
                      <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Typography variant="caption" style={{ textAlign: 'center' }}>
                          { API._getWord(sess && sess.language).Upload_image }
                        </Typography>
                      </div>
                      <img ref={imgRef}
                        style={{ opacity: fileHover?.5:1, maxHeight: 280, height: window.innerWidth * ( window.innerWidth >= 650?.3:.45 ) }}
                        className={classes.matchImg} src={tempFile} />
                      { imgRef.current &&
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
                    <div style={{ position: 'relative', marginTop: 16 }}>
                      <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Typography variant="caption" style={{ textAlign: 'center' }}>
                          { API._getWord(sess && sess.language).Upload_image }
                        </Typography>
                      </div>
                      <div className={classes.matchImgTemp}
                        style={{ height: window.innerWidth * ( window.innerWidth >= 650?.3:.45 ),  }}>
                        <div style={{ flex: 1 }} />
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <div style={{ flex: 1 }} />
                          <StyledIconButton className={classes.matchFile}>
                            <input className={classes.inputFile} type="file" accept="image/png, image/jpeg" onChange={handlePicture} />
                            <CloudUploadIcon fontSize="large" style={{ color: primary[500] }} />
                          </StyledIconButton>
                          <div style={{ flex: 1 }} />
                        </div>
                        <div style={{ flex: 1 }} />
                      </div>
                    </div>
                  }
                </div>
              );
            case (selectedMatchType === '1' ? 3 : 4):
              return (
                <React.Fragment>
                  <RichTextEditor handleGetHTML={e =>handleEditorOnChange(e)} />
                </React.Fragment>
              );
            default:
              return null;
          }
        }()}
      </div>

    </div>
  );
}
