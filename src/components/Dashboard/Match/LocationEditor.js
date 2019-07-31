import React from 'react';
import { makeStyles, withStyles, createMuiTheme } from '@material-ui/core/styles';
import * as API from '../../../api'
import ThemeProvider from '@material-ui/styles/ThemeProvider';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import CloudUploadIcon from '@material-ui/icons/CloudUpload';

import teal from '@material-ui/core/colors/teal';
import grey from '@material-ui/core/colors/grey';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: 36
  },
  button: {
    padding: theme.spacing(1, 4.5)
  },
  headerText: {
    textAlign: 'center', color: teal[900],
    fontSize: 28,
    [theme.breakpoints.up(500)]: {
      fontSize: 32,
    },
  },
  title: {
    color: teal[900],
    fontWeight: 600,
    fontSize: 18,
    marginTop: 16,
  },
  buttonGrid: {
    display: 'flex',
    marginTop: 24,
    justifyContent: 'flex-end'
  },
  grid: {
    overflow: 'auto',
    padding: theme.spacing(2, 0)
  },
  flexGrid: {
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.up(400)]: {
      flexDirection: 'row',
    },
  },
  textfieldGrid: {
    display: 'flex',
    minWidth: 600,
  },
  textFieldItem: {
    margin: 4,
  },
  matchFile: {
    marginTop: 16,
    [theme.breakpoints.up(400)]: {
      marginTop: 0
    },
  },
  cloudUploadIcon: {
    marginRight: 12,
    [theme.breakpoints.up(400)]: {
      marginRight: 0
    },
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
  notice: {
    fontFamily: 'monospace',
    color: grey[600],
    fontWeight: 600,
  },

}));

const GreenButton = withStyles(theme => ({
  root: {
    color: theme.palette.getContrastText(teal[500]),
    backgroundColor: teal[700],
    '&:hover': {
      backgroundColor: teal[900],
    },
  },
}))(Button);

const GreenTextButton = withStyles(theme => ({
  root: {
    color: teal[500],
    fontWeight: 900,
    '&:hover': {
      backgroundColor: teal[100],
    },
  },
}))(Button);

const theme = createMuiTheme({
  palette: {
    primary: teal,
  },
});

function ScorePanel(props){
  const classes = useStyles();
  const { handleHole, textScoreErr, holeScore } = props

  return(
    <ThemeProvider theme={theme}>
      <div className={classes.grid}>
        <div className={classes.textfieldGrid}>
          { [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17].slice(0,9).map( d=>
            <TextField
              key={'Score' + d}
              label={d + 1}
              variant="outlined"
              value={ holeScore? ( !isNaN(holeScore[d])? holeScore[d] : '' ) : '' }
              error={ textScoreErr && !holeScore[d] }
              onChange={e =>handleHole(e.target.value, d)}
              onFocus={e => e.target.select()}
              className={classes.textFieldItem}
            />
          )}
        </div>
        <div className={classes.textfieldGrid}>
          { [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17].slice(9,18).map( d=>
            <TextField
              key={'Score' + d}
              label={d + 1}
              variant="outlined"
              value={ holeScore? ( !isNaN(holeScore[d])? holeScore[d] : '' ) : '' }
              error={ textScoreErr && !holeScore[d] }
              onChange={e =>handleHole(e.target.value, d)}
              onFocus={e => e.target.select()}
              className={classes.textFieldItem}
            />
          )}
        </div>
      </div>
    </ThemeProvider>
  );
}

function HCPPanel(props){
  const classes = useStyles();
  const { handleHCP, textHCPErr, hcpScore } = props

  return(
    <ThemeProvider theme={theme}>
      <div className={classes.grid}>
        <div className={classes.textfieldGrid}>
          { [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17].slice(0,9).map( d=>
            <TextField
              key={'HCP' + d}
              label={d + 1}
              variant="outlined"
              value={ hcpScore? ( !isNaN(hcpScore[d])? hcpScore[d] : '' ) : '' }
              error={ textHCPErr && !hcpScore[d] }
              onChange={e =>handleHCP(e.target.value, d)}
              onFocus={e => e.target.select()}
              className={classes.textFieldItem}
            />
          )}
        </div>
        <div className={classes.textfieldGrid}>
          { [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17].slice(9,18).map( d=>
            <TextField
              key={'HCP' + d}
              label={d + 1}
              variant="outlined"
              value={ hcpScore? ( !isNaN(hcpScore[d])? hcpScore[d] : '' ) : '' }
              error={ textHCPErr && !hcpScore[d] }
              onChange={e =>handleHCP(e.target.value, d)}
              onFocus={e => e.target.select()}
              className={classes.textFieldItem}
            />
          )}
        </div>
      </div>
    </ThemeProvider>
  );
}

export default function LocationEditor(props){
  const classes = useStyles();
  const { token, setCSRFToken, handleSnackBar, setPageState, edittingField, setEdittingField } = props
  const [ location, setLocation ] = React.useState(null)
  const [ holeScore, setHoleScore ] = React.useState(['','','','','','','','','','','','','','','','','',''])
  const [ hcpScore, setHCPScore ] = React.useState(['','','','','','','','','','','','','','','','','',''])
  const [ selectedFile, setSelectedFile ] = React.useState(null);
  const [ textScoreErr, setTextScoreErr ] = React.useState(false);
  const [ textHCPErr, setTextHCPErr ] = React.useState(false);

  function handleHole(value, index){
    const newArr = [...holeScore]
    newArr[index] = parseInt(value)
    setHoleScore(newArr)
  }

  function handleHCP(value, index){
    const newArr = [...hcpScore]
    newArr[index] = parseInt(value)
    setHCPScore(newArr)
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

  function handleCancel(){
    if(edittingField){
      setEdittingField(null)
      setPageState('select')
    }else{
      setPageState('select')
    }
  }

  async function handleCreate(){
    let res = await API.xhrGet('getcsrf')
    const formData = new FormData()
    const sendObj = {
      //action: 'createcustom',
    };

    formData.append('action', 'createcustom')
    if(selectedFile){
      formData.append('fieldimage', selectedFile)
      formData.append('photopath', true)
      /*
      Object.assign(sendObj, {
        photopath: true,
      });
      */
    }

    if(location){
      formData.append('fieldname', location)
      //Object.assign(sendObj, { fieldname: location });
    }

    if(holeScore.length){
      const checkScoreArr = holeScore.every( d =>{ return !( isNaN(d) || d === '' ) })
      if(checkScoreArr){
        setTextScoreErr(false)
        formData.append('fieldscore', holeScore)
        //Object.assign(sendObj, { fieldscore: holeScore, });
      }else{
        setTextScoreErr(true)
      }
    }

    if(hcpScore.length){
      const checkHCPArr = hcpScore.every( d =>{ return !( isNaN(d) || d === '' ) })
      if(checkHCPArr){
        setTextHCPErr(false)
        formData.append('hcfieldscore', hcpScore)
        //Object.assign(sendObj, { hcfieldscore: hcpScore, });
      }else{
        setTextHCPErr(true)
      }
    }

    if(
      location &&
      holeScore.length === 18 &&
      holeScore.every( d =>{ return !( isNaN(d) || d === '' ) }) &&
      hcpScore.length === 18 &&
      hcpScore.every( d =>{ return !( isNaN(d) || d === '' ) })
    ){
      const d = await API.fetchPostFile('fieldsystem',`?_csrf=${res.token}`, sendObj, formData)
      res = await API.xhrGet('getcsrf')
      console.log(d);
      handleSnackBar({
        state: true,
        message: d.status,
        variant: d.status === 'success' ? d.status : 'error',
        autoHideDuration: d.status === 'success'? 2000 : 5000
      })
      setCSRFToken(res.token)
      try {
        setPageState('select')
      }catch(err) { console.log(err.message) }
    }
  }

  async function handleEdit(){
    let res = await API.xhrGet('getcsrf')
    const formData = new FormData()
    const sendObj = {
      action: 'editscore',
      fieldid: edittingField.fieldid,
      usertarget: edittingField.hostid
    };
    if(selectedFile){
      formData.append('fieldimage', selectedFile)
      Object.assign(sendObj, {
        photopath: true,
      });
    }

    if(location){
      Object.assign(sendObj, { fieldname: location });
    }

    if(holeScore.length){
      const checkScoreArr = holeScore.every( d =>{ return !( isNaN(d) || d === '' ) })
      if(checkScoreArr){
        setTextScoreErr(false)
        Object.assign(sendObj, { fieldscore: holeScore, });
      }else{
        setTextScoreErr(true)
      }
    }

    if(hcpScore.length){
      const checkHCPArr = hcpScore.every( d =>{ return !( isNaN(d) || d === '' ) })
      if(checkHCPArr){
        setTextHCPErr(false)
        Object.assign(sendObj, { hcfieldscore: hcpScore, });
      }else{
        setTextHCPErr(true)
      }
    }

    if(
      location &&
      holeScore.length === 18 &&
      holeScore.every( d =>{ return !( isNaN(d) || d === '' ) }) &&
      hcpScore.length === 18 &&
      hcpScore.every( d =>{ return !( isNaN(d) || d === '' ) })
    ){
      const d = await API.fetchPostFile('fieldsystem',`?_csrf=${res.token}`, sendObj, formData)
      res = await API.xhrGet('getcsrf')
      console.log(d);
      handleSnackBar({
        state: true,
        message: d.status,
        variant: d.status === 'success' ? d.status : 'error',
        autoHideDuration: d.status === 'success'? 2000 : 5000
      })
      setCSRFToken(res.token)
      try {
        //setPageState('select')
      }catch(err) { console.log(err.message) }
    }
  }

  async function handleFetchLoadField(){
    const res = await API.xhrGet('getcsrf')
    if(edittingField){
      await API.xhrPost(
        token? token : res,
        'loadfield', {
          action: 'score',
          fieldid: edittingField.fieldid
      }, (csrf, d) =>{
        setCSRFToken(csrf)
        try {
          setHoleScore(d.fieldscore)
          setHCPScore(d.hfieldscore)
          setLocation(edittingField.fieldname)
        }catch(err) { console.log(err.message) }
      })
    }
  }

  React.useEffect(()=>{
    if(edittingField){
      handleFetchLoadField()
    }
  }, [ ])

  return(
    <div className={classes.root}>
      <Typography component="div">
        <Box className={classes.headerText} m={1}>
          { edittingField? 'Edit' : 'Create' }
        </Box>
      </Typography>
      <div className={classes.flexGrid}>
        <TextField
          fullWidth
          label="Location name"
          value={ location ? location : '' }
          onChange={e =>setLocation(e.target.value)}
          variant="outlined"
        />
      <GreenButton className={classes.matchFile}>
        <input className={classes.inputFile} type="file" accept="image/png, image/jpeg" onChange={handlePicture} />
        <CloudUploadIcon className={classes.cloudUploadIcon} color="inherit"/>
        { window.innerWidth < 400 && 'Upload' }
      </GreenButton>

      </div>
      <Typography component="div">
        <Box className={classes.notice}>
          { selectedFile && selectedFile.name }
        </Box>
        <Box className={classes.title} m={1}>
          Hole Score
        </Box>
      </Typography>

      <ScorePanel handleHole={handleHole} textScoreErr={textScoreErr} holeScore={holeScore} />

      <Typography component="div">
        <Box className={classes.title} m={1}>
          HCP Score
        </Box>
      </Typography>

      <HCPPanel handleHCP={handleHCP} textHCPErr={textHCPErr} hcpScore={hcpScore} />

      <div className={classes.buttonGrid}>
        <GreenTextButton className={classes.button} onClick={handleCancel}>Cancel</GreenTextButton>
        <GreenButton className={classes.button} variant="contained"
          onClick={ edittingField? handleEdit : handleCreate}>
          { edittingField? 'Save' : 'Create' }
        </GreenButton>
      </div>

    </div>
  );
}
