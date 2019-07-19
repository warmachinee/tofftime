import React from 'react';
import Loadable from 'react-loadable';
import DateFnsUtils from '@date-io/date-fns';
import { makeStyles, withStyles, createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import TouchRipple from '@material-ui/core/ButtonBase/TouchRipple';
import * as API from '../../../api'

import Paper from '@material-ui/core/Paper';
import Collapse from '@material-ui/core/Collapse';
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

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

import teal from '@material-ui/core/colors/teal';
import grey from '@material-ui/core/colors/grey';

import { LDCircular } from '../../loading/LDCircular'

const TemplateDialog = Loadable({
  loader: () => import(/* webpackChunkName: "TemplateDialog" */'./../TemplateDialog'),
  loading: () => <LDCircular />
});

const Location = Loadable({
  loader: () => import(/* webpackChunkName: "Location" */'./Location'),
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
    marginTop: 24,
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
  margin: {
    width: '100%',
    marginTop: 8
  },
  title: {
    color: teal[900],
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
    color: teal[900],
    marginTop: 16
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
  }
}))

const StyledTextButton = withStyles(theme => ({
  root: {
    color: teal[500],
    fontWeight: 900,
    '&:hover': {
      backgroundColor: teal[100],
    },
  },
}))(Button);

const StyledButton = withStyles(theme => ({
  root: {
    color: theme.palette.getContrastText(teal[500]),
    backgroundColor: teal[700],
    '&:hover': {
      backgroundColor: teal[900],
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
    color: teal[400],
    '&$checked': {
      color: teal[600],
    },
  },
  checked: {},
})(props => <Radio color="default" {...props} />);

const theme = createMuiTheme({
  palette: {
    primary: teal,
  },
});

const datePickers = createMuiTheme({
  palette: {
    primary: teal,
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


function CreateMatchBody(props){
  const classes = useStyles();
  const { MBSetData, token, setCSRFToken, handleSnackBar } = props
  const [ data, setData ] = React.useState(null)
  const [ open, setOpen ] = React.useState(false);
  const imgRef = React.useRef(null)
  const [ fileHover, handleFileHover ] = React.useState(false);

  const [ matchName, setMatchName ] = React.useState('');
  const [ matchClass, setMatchClass ] = React.useState(0);
  const [ selectedField, setSelectedField ] = React.useState('');
  const [ selectedPrivacy, setSelectedPrivacy ] = React.useState('0');
  const [ selectedMatchType, setSelectedMatchType ] = React.useState('1');
  const [ selectedDate, setSelectedDate ] = React.useState(new Date());
  const [ selectedFile, setSelectedFile ] = React.useState('');

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function handlePrivacy(event) {
    setSelectedPrivacy(event.target.value);
  }

  function handleMatchType(event) {
    setSelectedMatchType(event.target.value);
  }

  function handleDateChange(d){
    //console.log(handleConvertDate(d));
    setSelectedDate(d)
  }

  function handleConvertDate(d){
    const day = (selectedDate.getDate() > 9) ? selectedDate.getDate():'0' + selectedDate.getDate()
    const month = (selectedDate.getMonth() + 1 > 9) ? selectedDate.getMonth() + 1:'0' + ( selectedDate.getMonth() + 1 )
    const dateStr = selectedDate.getFullYear() + '-' + month + '-' + day
    return dateStr
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
    await API.xhrPost(
      props.token,
      'matchsystem', {
        action: 'create',
        matchname: matchName,
        fieldid: selectedField.fieldid,
        scorematch: parseInt(selectedMatchType),
        class: matchClass,
        matchdate: handleConvertDate(selectedDate),
    }, (csrf, d) =>{
      handleSnackBar({
        state: true,
        message: d.status,
        variant: d.status === 'success' ? d.status : 'error',
        autoHideDuration: d.status === 'success'? 2000 : 5000
      })
      setCSRFToken(csrf)
      setData(d)
      handleFetch()
    })
  }

  async function handleFetch(){
    const res = await token? token : API.xhrGet('getcsrf')
    await API.xhrPost(
      token? token : res.token,
      'loadmatch', {
        action: 'list',
    }, (csrf, d) =>{
      setCSRFToken(csrf)
      MBSetData(d)
    })
  }

  return(
    <div style={{ padding: 8, marginLeft: 'auto', marginRight: 'auto', maxWidth: 900 }}>
      <div className={classes.grid}>
        <div className={classes.gridChild1}>
          <ThemeProvider theme={theme}>
            <TextField
              className={classes.margin}
              label="Match name"
              value={matchName || ''}
              onChange={e =>setMatchName(e.target.value)}
            />
          </ThemeProvider>
          <div style={{ display: 'flex' }}>
            <ThemeProvider theme={datePickers}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  clearable
                  style={{ marginTop: 24 }}
                  className={classes.margin}
                  label="Date"
                  inputVariant="outlined"
                  format="dd/MM/yyyy"
                  value={selectedDate}
                  onChange={date => handleDateChange(date)}
                />
              </MuiPickersUtilsProvider>
            </ThemeProvider>
            <ThemeProvider theme={theme}>
              <TextField
                style={{ width: 108, marginTop: 'auto', marginLeft: 16 }}
                label="Class"
                value={matchClass}
                type="number"
                variant="outlined"
                onChange={e =>setMatchClass(parseInt(e.target.value))}
                onFocus={e => e.target.select()}
              />
            </ThemeProvider>
          </div>
          { selectedFile?
            <div style={{ position: 'relative', marginTop: 16 }}
              onMouseEnter={()=>handleFileHover(true)}
              onMouseLeave={()=>handleFileHover(false)}>
              <img ref={imgRef}
                style={{ opacity: fileHover?.5:1, maxHeight: 280, height: window.innerWidth * ( window.innerWidth >= 650?.3:.45 ) }}
                className={classes.matchImg} src={URL.createObjectURL(selectedFile)} />
              { imgRef.current &&
                <div
                  style={{
                    display: 'flex',
                    position: 'absolute',
                    height: imgRef.current.offsetHeight,
                    width: imgRef.current.offsetWidth,
                    top: 0, left: 0,
                  }}>
                  <div style={{ flex: 1 }}></div>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ flex: 1 }}></div>
                    <StyledIconButton className={classes.matchFile}>
                      <input className={classes.inputFile} type="file" accept="image/png, image/jpeg" onChange={handlePicture} />
                      <CloudUploadIcon fontSize="large" style={{ color: teal[400] }}/>
                    </StyledIconButton>
                    <div style={{ flex: 1 }}></div>
                  </div>
                  <div style={{ flex: 1 }}></div>
                </div>
              }
            </div>
            :
            <div style={{ position: 'relative', marginTop: 16 }}>
              <div className={classes.matchImgTemp}
                style={{ height: window.innerWidth * ( window.innerWidth >= 650?.3:.45 ), maxHeight: 280 }}>
                <div style={{ flex: 1 }}></div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <div style={{ flex: 1 }}></div>
                  <StyledIconButton className={classes.matchFile}>
                    <input className={classes.inputFile} type="file" accept="image/png, image/jpeg" onChange={handlePicture} />
                    <CloudUploadIcon fontSize="large" style={{ color: teal[500] }}/>
                  </StyledIconButton>
                  <div style={{ flex: 1 }}></div>
                </div>
                <div style={{ flex: 1 }}></div>
              </div>
            </div>
          }
        </div>
        <div className={classes.gridChild2}>
          <ThemeProvider theme={theme}>
            <StyledTextButton variant="outlined"
              onClick={handleOpen}
              className={classes.button}
              style={{ textTransform: 'none' }}>
              { selectedField ? selectedField.fieldname : 'Select Location' }
            </StyledTextButton>
            {/*
              <FormControl component="fieldset" className={classes.margin}
                style={{ width: '100%', border: '1px rgba(0, 0, 0, 0.23) solid', padding: '4px 16px 8px 24px', borderRadius: 4 }}>
                <FormLabel component="legend" style={{ marginLeft: 16 }}>Privacy</FormLabel>
                <RadioGroup value={selectedPrivacy} onChange={handlePrivacy} row>
                  <FormControlLabel
                    value={'0'}
                    control={<GreenRadio />}
                    label="Public"
                    labelPlacement="end"
                  />
                  <FormControlLabel
                    value={'1'}
                    control={<GreenRadio />}
                    label="Private"
                    labelPlacement="end"
                  />
                </RadioGroup>
              </FormControl>*/
            }

            <FormControl component="fieldset" className={classes.margin}
              style={{ width: '100%', border: '1px rgba(0, 0, 0, 0.23) solid', padding: '4px 16px 8px 24px', borderRadius: 4 }}>
              <FormLabel component="legend" style={{ marginLeft: 16 }}>Type</FormLabel>
              <RadioGroup value={selectedMatchType} onChange={handleMatchType} row>
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
            </FormControl>
          </ThemeProvider>
        </div>

      </div>
      <div className={classes.buttonControl}>
        <div style={{ flex: 2 }}></div>
        <StyledTextButton className={classes.button}
          onClick={handleReset}>Reset</StyledTextButton>
        <StyledButton className={classes.button}
          onClick={handleCreate}>Create</StyledButton>
      </div>
      <TemplateDialog open={open} handleClose={handleClose}>
        <Location token={token} setCSRFToken={setCSRFToken}
          handleSnackBar={handleSnackBar}
          selectedField={selectedField} setSelectedField={setSelectedField} />
      </TemplateDialog>
    </div>
  );
}

export default function CreateMatch(props){
  const classes = useStyles();
  const { MBSetData, token, setCSRFToken, handleSnackBar } = props
  const [ expanded, setExpanded ] = React.useState(false)

  function expandHandler(){
    setExpanded(!expanded)
  }
  return(
    <Paper className={classes.root} onClick={()=>!expanded ? expandHandler():console.log()}>
      <Typography component="div">
        <Box className={classes.title} fontWeight={600} m={1}>
          CreateMatch
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
        <CreateMatchBody MBSetData={MBSetData} token={token} setCSRFToken={setCSRFToken} handleSnackBar={handleSnackBar}/>
      </Collapse>
    </Paper>
  );
}
