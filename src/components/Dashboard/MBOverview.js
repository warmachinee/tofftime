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

const MatchClass = Loadable({
  loader: () => import(/* webpackChunkName: "MatchClass" */'./MatchClass'),
  loading: () => <LDCircular />
});

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    padding: theme.spacing(1, 2),
    width: '100%',
    backgroundColor: grey[50],
    cursor: 'pointer',
    marginTop: 24
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

function MBOverviewBody(props){
  const classes = useStyles();
  const { token, setCSRFToken, selected, handleSnackBar } = props
  const [ data, setData ] = React.useState([])
  const [ editting, handleEditting ] = React.useState(false)
  const [ open, setOpen ] = React.useState(false);
  const [ modalType, setModalType ] = React.useState('');

  const [ matchName, setMatchName ] = React.useState('');
  const [ selectedField, setSelectedField ] = React.useState({});
  const [ selectedPrivacy, setSelectedPrivacy ] = React.useState(/*data.matchtype.toString()*/'1');
  const [ selectedMatchType, setSelectedMatchType ] = React.useState(/*data.scorematch.toString()*/'1');
  const [ selectedDate, setSelectedDate ] = React.useState(new Date());


  const handleOpen = (d) => {
    setOpen(true);
    setModalType(d)
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

  function handleStringToDate(d){
    if(d){
      const dateSp = d.split('/')
      const dateConvert = dateSp[1] + '/' + dateSp[0] + '/' + dateSp[2]
      return dateConvert
    }
  }

  function handleSave(d){
    console.log(d);
    handleEditting(false)
  }

  async function handleEditMatch(){
    const res = await token? token : API.xhrGet('getcsrf')
    await API.xhrPost(
      token? token : res.token,
      'adminmatchsystem', {
        action: 'edit',
        matchid: selected.matchid,
        fieldid: selectedField.fieldid,
        matchname: matchName,
        matchdate: handleConvertDate(selectedDate)
    }, (csrf, d) =>{
      handleSnackBar({
        state: true,
        message: d.status,
        variant: d.status === 'success' ? d.status : 'error'
      })
      setCSRFToken(csrf)
      setData(d)
    })
  }

  async function handleFetch(){
    const res = await token? token : API.xhrGet('getcsrf')
    if(selected){
      await API.xhrPost(
        token? token : res.token,
        'adminloadmatch', {
          action: 'detail',
          matchid: selected.matchid
      }, (csrf, d) =>{
        setCSRFToken(csrf)
        setData(d)
      })
    }
  }

  React.useEffect(()=>{
    handleFetch()
  },[ ])
  return(
    <div style={{ padding: 8, position: 'relative' }}>
      <StyledTextButton className={classes.editButton} onClick={()=>handleEditting(!editting)}>Edit</StyledTextButton>
      <div style={{ marginTop: 24 }}>
        <ThemeProvider theme={theme}>
          {editting?
            <TextField
              className={classes.margin}
              label="Match name"
              value={ data && ( matchName ? matchName : data.title ) }
              onChange={e =>setMatchName(e.target.value)}
            />
            :
            <Typography component="div" className={classes.margin}>
              <Box className={classes.normal}>
                { data && ( matchName ? matchName : data.title ) }
              </Box>
            </Typography>
          }
          <FormControl component="fieldset" className={classes.margin}
            disabled={!editting}>
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
          <FormControl component="fieldset" className={classes.margin}
            disabled={!editting}>
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
              disabled={!editting}
              className={classes.margin}
              label="Date"
              inputVariant="outlined"
              format="dd/MM/yyyy"
              value={ data && ( selectedDate ? selectedDate : new Date(handleStringToDate(data.date)) ) }
              onChange={date => handleDateChange(date)}
            />
          </MuiPickersUtilsProvider>
          <StyledTextButton disabled={!editting} onClick={()=>handleOpen('location')} className={classes.button}>
            {selectedField && ( selectedField.fieldname ? selectedField.fieldname : 'Location') }
          </StyledTextButton>
          <StyledTextButton disabled={!editting} onClick={()=>handleOpen('class')} className={classes.button}>Class</StyledTextButton>
        </ThemeProvider>
      </div>
      { editting &&
        <div className={classes.buttonControl}>
          <div style={{ flex: 2 }}></div>
          <StyledTextButton className={classes.button}
            onClick={()=>handleEditting(false)}>Cancel</StyledTextButton>
          <StyledButton className={classes.button}
            onClick={handleEditMatch}>Save</StyledButton>
        </div>
      }
      <TemplateDialog open={open} handleClose={handleClose}>
        {(modalType && modalType === 'location')?
          <Location token={token} setCSRFToken={setCSRFToken} selectedField={selectedField} setSelectedField={setSelectedField}
            handleSnackBar={handleSnackBar}/>
          :
          <MatchClass token={token} setCSRFToken={setCSRFToken} data={data.status !== 'class database error' && data.class}
            handleSnackBar={handleSnackBar}
            matchid={selected?selected.matchid:null} setData={setData}/>
        }
      </TemplateDialog>
    </div>
  );
}

export default function MBOverview(props){
  const classes = useStyles();
  const { token, setCSRFToken, selected, handleSnackBar } = props
  const [ expanded, setExpanded ] = React.useState(false)

  function expandHandler(){
    setExpanded(!expanded)
  }
  return(
    <Paper className={classes.root} onClick={()=>!expanded ? expandHandler():console.log()}>
      <Typography component="div">
        <Box className={classes.title} fontWeight={600} m={1}>
          Overview
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
        <MBOverviewBody token={token} setCSRFToken={setCSRFToken} selected={selected} handleSnackBar={handleSnackBar}/>
      </Collapse>
    </Paper>
  );
}
