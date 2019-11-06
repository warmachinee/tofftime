import React from 'react';
import Loadable from 'react-loadable';
import DateFnsUtils from '@date-io/date-fns';
import { makeStyles, withStyles, createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import { primary, grey } from './../../../../api/palette'

import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Input from '@material-ui/core/Input';

import CloudUploadIcon from '@material-ui/icons/CloudUpload';

import { LDCircular } from './../../../loading/LDCircular'

const Location = Loadable({
  loader: () => import(/* webpackChunkName: "Location" */'./../Course/Location'),
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
    API, sess, setData, setDataClassed, token, setCSRFToken, handleSnackBar, activeStep,
    matchName, matchClass, selectedField, selectedPrivacy, selectedMatchType, selectedDate, selectedFile, tempFile,
    setMatchName, setSelectedField, handlePrivacy, handleMatchType, handleDateChange, handlePicture,

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
                      autoFocus={activeStep === 0}
                      variant="outlined"
                      className={classes.margin}
                      label={ ( sess && sess.language === 'TH' ) ? "ชื่อการแข่งขัน" : 'Match name' }
                      value={matchName || ''}
                      onChange={e =>setMatchName(e.target.value)}
                    />
                  </ThemeProvider>
                  <ThemeProvider theme={theme}>
                    <FormControl component="fieldset" className={classes.margin}
                      style={{ width: '100%', border: '1px rgba(0, 0, 0, 0.23) solid', padding: '4px 16px 8px 24px', borderRadius: 4, boxSizing: 'border-box' }}>
                      <FormLabel component="legend" style={{ marginLeft: 16 }}>
                        { ( sess && sess.language === 'TH' ) ? "ความเป็นส่วนตัว" : 'Privacy' }
                      </FormLabel>
                      <RadioGroup value={selectedPrivacy} onChange={handlePrivacy} row>
                        <FormControlLabel
                          value={'public'}
                          control={<GreenRadio />}
                          label={ ( sess && sess.language === 'TH' ) ? "สาธารณะ" : 'Public' }
                          labelPlacement="end"
                        />
                        <FormControlLabel
                          value={'friend'}
                          control={<GreenRadio />}
                          label={ ( sess && sess.language === 'TH' ) ? "เพื่อน" : 'Friend' }
                          labelPlacement="end"
                        />
                        <FormControlLabel
                          value={'private'}
                          control={<GreenRadio />}
                          label={ ( sess && sess.language === 'TH' ) ? "ส่วนตัว" : 'Private' }
                          labelPlacement="end"
                        />
                      </RadioGroup>
                    </FormControl>
                    <FormControl component="fieldset" className={classes.margin}
                      style={{ width: '100%', border: '1px rgba(0, 0, 0, 0.23) solid', padding: '4px 16px 8px 24px', borderRadius: 4, boxSizing: 'border-box' }}>
                      <FormLabel component="legend" style={{ marginLeft: 16 }}>
                        { ( sess && sess.language === 'TH' ) ? "ประเภทการแข่งขัน" : 'Type' }
                      </FormLabel>
                      <RadioGroup value={selectedMatchType} onChange={handleMatchType} row>
                        <FormControlLabel
                          value={'1'}
                          control={<GreenRadio />}
                          label={ ( sess && sess.language === 'TH' ) ? "มืออาชีพ" : 'Professional' }
                          labelPlacement="end"
                        />
                        <FormControlLabel
                          value={'0'}
                          control={<GreenRadio />}
                          label={ ( sess && sess.language === 'TH' ) ? "มือสมัครเล่น" : 'Amateur' }
                          labelPlacement="end"
                        />
                        <FormControlLabel
                          value={'2'}
                          control={<GreenRadio />}
                          label={ ( sess && sess.language === 'TH' ) ? "การกุศล" : 'Charity' }
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
                          label={ ( sess && sess.language === 'TH' ) ? "วันที่" : 'Date' }
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
            case 1:
              return (
                <Location
                  {...props}
                  selectedField={selectedField}
                  setSelectedField={setSelectedField} />
              )
            case 2:
              return (
                <div>
                  { selectedFile && tempFile?
                    <div style={{ position: 'relative', marginTop: 16 }}
                      onMouseEnter={()=>handleFileHover(true)}
                      onMouseLeave={()=>handleFileHover(false)}>
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
            default:
              return null;
          }
        }()}
      </div>

    </div>
  );
}
