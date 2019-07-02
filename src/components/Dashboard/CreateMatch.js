import React from 'react';
import Loadable from 'react-loadable';
import DateFnsUtils from '@date-io/date-fns';
import { makeStyles, withStyles, createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import * as API from '../../api'

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

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import teal from '@material-ui/core/colors/teal';
import grey from '@material-ui/core/colors/grey';

import { LDCircular } from '../loading/LDCircular'

const TemplateDialog = Loadable({
  loader: () => import(/* webpackChunkName: "TemplateDialog" */'./TemplateDialog'),
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
    backgroundColor: grey[50],
    cursor: 'pointer'
  },
  margin: {
    width: '100%',
    margin: 4,
    [theme.breakpoints.up(500)]: {
      margin: theme.spacing(1),
    },
  },
  title: {
    color: teal[900],
    fontSize: 18
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
    padding: 8
  },
  button: {
    flex: 1,
    margin: 4,
    padding: 8
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

function CreateMatchBody(props){
  const classes = useStyles();
  const { MBSetData, token, setCSRFToken, handleSnackBar } = props
  const [ data, setData ] = React.useState([])
  const [ open, setOpen ] = React.useState(false);

  const [ matchName, setMatchName ] = React.useState('');
  const [ matchClass, setMatchClass ] = React.useState(0);
  const [ selectedField, setSelectedField ] = React.useState('');
  const [ selectedPrivacy, setSelectedPrivacy ] = React.useState('1');
  const [ selectedMatchType, setSelectedMatchType ] = React.useState('1');
  const [ selectedDate, setSelectedDate ] = React.useState(new Date());


  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function handlePrivacy(event) {
    console.log(event.target.value);
    setSelectedPrivacy(event.target.value);
  }

  function handleMatchType(event) {
    console.log(event.target.value);
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
  }

  async function handleCreate(){
    await API.xhrPost(
      props.token,
      'adminmatchsystem', {
        action: 'create',
        matchname: matchName,
        fieldid: selectedField.fieldid,
        scorematch: 1,
        class: matchClass,
        matchdate: handleConvertDate(selectedDate),
    }, (csrf, d) =>{
      handleSnackBar({
        state: true,
        message: d.status,
        variant: d.status === 'success' ? d.status : 'error'
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
      'adminloadmatch', {
        action: 'list',
    }, (csrf, d) =>{
      setCSRFToken(csrf)
      MBSetData(d)
    })
  }

  return(
    <div style={{ padding: 8 }}>
      <div style={{ marginTop: 24, position: 'relative' }}>
        <ThemeProvider theme={theme}>
          <TextField
            className={classes.margin}
            label="Match name"
            value={matchName}
            onChange={e =>setMatchName(e.target.value)}
          />
          <FormControl component="fieldset" className={classes.margin}>
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
          </FormControl>
          <FormControl component="fieldset" className={classes.margin}>
            <RadioGroup value={selectedMatchType} onChange={handleMatchType} row>
              <FormControlLabel
                value={'0'}
                control={<GreenRadio />}
                label="Amateur"
                labelPlacement="end"
              />
              <FormControlLabel
                value={'1'}
                control={<GreenRadio />}
                label="Pro"
                labelPlacement="end"
              />
            </RadioGroup>
          </FormControl>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              clearable
              className={classes.margin}
              label="Date"
              inputVariant="outlined"
              format="dd/MM/yyyy"
              value={selectedDate}
              onChange={date => handleDateChange(date)}
            />
          </MuiPickersUtilsProvider>
          <StyledTextButton onClick={handleOpen} className={classes.button}>
            { selectedField ? selectedField.fieldname : 'Location' }
          </StyledTextButton>
          <TextField
            className={classes.margin}
            label="Class"
            value={matchClass}
            type="number"
            onChange={e =>setMatchClass(parseInt(e.target.value))}
          />
        </ThemeProvider>
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
