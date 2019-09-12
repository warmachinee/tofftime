import React from 'react';
import { makeStyles, withStyles, createMuiTheme } from '@material-ui/core/styles';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import * as API from './../../../api'
import { primary, grey } from './../../../api/palette'

import {
  IconButton ,
  TextField,
  Button,
  Typography,
  Box,
  Switch,
  InputLabel,
  MenuItem,
  FormControl,
  FormControlLabel,
  Select,

} from '@material-ui/core'

import CloudUploadIcon from '@material-ui/icons/CloudUpload';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: 36
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  button: {
    padding: theme.spacing(1, 4.5)
  },
  headerText: {
    textAlign: 'center', color: primary[900],
    fontSize: 28,
    [theme.breakpoints.up(500)]: {
      fontSize: 32,
    },
  },
  title: {
    color: primary[900],
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
  /*matchFile: {
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
  */
  notice: {
    fontFamily: 'monospace',
    color: grey[600],
    fontWeight: 600,
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

}));

const GreenButton = withStyles(theme => ({
  root: {
    color: theme.palette.getContrastText(primary[500]),
    backgroundColor: primary[700],
    '&:hover': {
      backgroundColor: primary[900],
    },
  },
}))(Button);

const GreenTextButton = withStyles(theme => ({
  root: {
    color: primary[500],
    fontWeight: 900,
    '&:hover': {
      backgroundColor: primary[100],
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

const theme = createMuiTheme({
  palette: {
    primary: primary,
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

export default function CourseEditor(props){
  const classes = useStyles();
  const { sess, token, setCSRFToken, isSupportWebp, handleSnackBar, edittingField, setEdittingField, handleEdittingClose, pageOrganizer, pageData } = props
  const [ location, setLocation ] = React.useState(null)
  const [ holeScore, setHoleScore ] = React.useState(['','','','','','','','','','','','','','','','','',''])
  const [ hcpScore, setHCPScore ] = React.useState(['','','','','','','','','','','','','','','','','',''])
  const [ selectedFile, setSelectedFile ] = React.useState(null);
  const [ textScoreErr, setTextScoreErr ] = React.useState(false);
  const [ textHCPErr, setTextHCPErr ] = React.useState(false);
  const [ tempFile, setTempFile ] = React.useState(null)
  const [ fileHover, handleFileHover ] = React.useState(false);
  const imgRef = React.useRef(null)
  const [ official, setOfficial ] = React.useState(false)
  const [ courseVersion, setCourseVersion ] = React.useState(null)
  const [ selectedCourseVersion, setSelectedCourseVersion ] = React.useState(1)

  function handleVersionChange(event){
    setSelectedCourseVersion(event.target.value)
    handleFetchLoadField(event.target.value)
  }

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

  function handleCancel(){
    if(edittingField){
      setEdittingField(null)
    }
    handleEdittingClose()
  }

  async function handleCreate(){
    const resToken = token? token : await API.xhrGet('getcsrf')
    const sendObj = {
      action: sess.typeid === 'admin' ? 'create' : 'createcustom',
      fieldtype: pageOrganizer ? pageData.pageid : 0,
    };

    if(sess.typeid === 'admin'){
      Object.assign(sendObj, { custom: official ? 0 : 1 });
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

    if(Object.keys(sendObj).length >= 4){
      await API.xhrPost(
        token? token : resToken.token,
        sess.typeid === 'admin' ? 'fieldsystem' : 'ffieldsystem', {
          ...sendObj
      }, (csrf, d) =>{
        setCSRFToken(csrf)
        handleSnackBar({
          state: true,
          message: d.status,
          variant: d.status === 'success' ? d.status : 'error',
          autoHideDuration: d.status === 'success'? 2000 : 5000
        })
        try {
          handleEditPicture(d.fieldid)
        }catch(err) { console.log(err.message) }
      })
    }else{
      handleSnackBar({
        state: true,
        message: 'Please complete the field.',
        variant: 'error',
        autoHideDuration: 5000
      })
    }
  }

  async function handleEditPicture(fieldid){
    const formData = new FormData()
    const sendObj = {
      action: 'edit',
    };

    if(selectedFile){
      formData.append('fieldimage', selectedFile)
      Object.assign(sendObj, {
        fieldid: fieldid,
        photopath: true,
      });
      const resToken = token? token : await API.xhrGet('getcsrf')
      const d = await API.fetchPostFile(
        sess.typeid === 'admin' ? 'fieldsystem' : 'ffieldsystem',
        `?_csrf=${token? token : resToken.token}`, sendObj, formData)
      handleSnackBar({
        state: true,
        message: d.status,
        variant: d.status === 'success' ? d.status : 'error',
        autoHideDuration: d.status === 'success'? 2000 : 5000
      })
      const res = await API.xhrGet('getcsrf')
      setCSRFToken(res.token)
      try {
        handleEdittingClose()
      }catch(err) { console.log(err.message) }
    }
  }

  async function handleEdit(){
    const resToken = token? token : await API.xhrGet('getcsrf')
    const formData = new FormData()
    const sendObj = {
      action: 'edit',
      fieldid: edittingField.fieldid,
      usertarget: edittingField.hostid
    };

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

    await API.xhrPost(
      token? token : resToken.token,
      sess.typeid === 'admin' ? 'fieldsystem' : 'ffieldsystem', {
        ...sendObj
    }, (csrf, d) =>{
      setCSRFToken(csrf)
      var statusRes = []
      Object.keys(d).forEach( e =>{
        if(d[e] !== 'success'){
          handleSnackBar({
            state: true,
            message: d[e],
            variant: d[e] === 'success' ? d[e] : 'error',
            autoHideDuration: d[e] === 'success'? 2000 : 5000
          })
          statusRes.push(d[e])
        }else{
          statusRes.push(d[e])
        }
      })
      if(statusRes.every(item => item === 'success')){
        handleEdittingClose()
      }
      try {
        handleEditPicture(edittingField.fieldid)
      }catch(err) { console.log(err.message) }
    })
  }

  async function handleFetchLoadFieldVersion(){
    const resToken = token? token : await API.xhrGet('getcsrf')
    if(edittingField){
      await API.xhrPost(
        token? token : resToken.token,
        sess.typeid === 'admin' ? 'loadfield' : 'floadfield', {
          action: 'versioncount',
          fieldid: edittingField.fieldid
      }, (csrf, d) =>{
        setCSRFToken(csrf)
        setCourseVersion(d)
        try {
          handleFetchLoadField(d[d.length - 1].version)
        }catch(err) { console.log(err.message) }
      })
    }
  }

  async function handleFetchLoadField(version){
    const resToken = token? token : await API.xhrGet('getcsrf')
    if(edittingField){
      await API.xhrPost(
        token? token : resToken.token,
        sess.typeid === 'admin' ? 'loadfield' : 'floadfield', {
          action: 'score',
          fieldid: edittingField.fieldid,
          fieldversion: version
      }, (csrf, d) =>{
        setCSRFToken(csrf)
        try {
          setHoleScore(d.fieldscore)
          setHCPScore(d.hfieldscore)
          setLocation(edittingField.fieldname)
          setTempFile(API.getPictureUrl(edittingField.photopath) + ( isSupportWebp? '.webp' : '.jpg' ) + '#' + new Date().toISOString())
        }catch(err) { console.log(err.message) }
      })
    }
  }

  React.useEffect(()=>{
    if(edittingField){
      handleFetchLoadFieldVersion()
    }
  }, [ ])

  return (
    <div className={classes.root}>
      <Typography component="div">
        <Box className={classes.headerText} m={1}>
          { edittingField? 'Edit' : 'Create' }
        </Box>
      </Typography>
      { courseVersion && courseVersion.length > 0 &&
        <div style={{ marginBottom: 24 }}>
          <FormControl className={classes.formControl}>
            <InputLabel>Version</InputLabel>
            <Select
              value={selectedCourseVersion}
              onChange={handleVersionChange}>
              {
                courseVersion.map( d =>
                  <MenuItem key={d.createdate} value={d.version}>{'Version ' + d.version}</MenuItem>
              )}
            </Select>
          </FormControl>
        </div>
      }
      <div className={classes.flexGrid}>
        <TextField
          fullWidth
          label="Location name"
          value={ location ? location : '' }
          onChange={e =>setLocation(e.target.value)}
          variant="outlined"
        />
        {/*
          <GreenButton className={classes.matchFile}>
            <input className={classes.inputFile} type="file" accept="image/png, image/jpeg" onChange={handlePicture} />
            <CloudUploadIcon className={classes.cloudUploadIcon} color="inherit"/>
            { window.innerWidth < 400 && 'Upload' }
          </GreenButton>*/
        }
      </div>
      { sess && sess.typeid === 'admin' && !edittingField &&
        <div>
          <FormControl component="fieldset">
            <FormControlLabel
              control={<Switch checked={official} onChange={()=>setOfficial(!official)} />}
              label="Official"
            />
          </FormControl>
        </div>
      }
      <div>
        { ( selectedFile || tempFile )?
          <div style={{
              position: 'relative', marginTop: 16, marginBottom: 24,
              display: 'flex', flexDirection: 'column', justifyContent: 'center'
            }}
            onMouseEnter={()=>handleFileHover(true)}
            onMouseLeave={()=>handleFileHover(false)}>
            <img ref={imgRef}
              style={{ opacity: fileHover?.5:1, maxHeight: 280, height: window.innerWidth * .45 }}
              className={classes.matchImg}
              src={tempFile}/>
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
                    <CloudUploadIcon fontSize="large" style={{ color: primary[400] }}/>
                  </StyledIconButton>
                  <div style={{ flex: 1 }} />
                </div>
                <div style={{ flex: 1 }} />
              </div>
            }
          </div>
          :
          <div
            style={{
              position: 'relative', marginTop: 16, marginBottom: 24,
              display: 'flex', flexDirection: 'column', justifyContent: 'center'
            }}>
            <div className={classes.matchImgTemp} style={{ maxHeight: 280, height: window.innerWidth * .45 }}>
              <div style={{ flex: 1 }} />
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ flex: 1 }} />
                <StyledIconButton className={classes.matchFile}>
                  <input className={classes.inputFile} type="file" accept="image/png, image/jpeg" onChange={handlePicture} />
                  <CloudUploadIcon fontSize="large" style={{ color: primary[500] }}/>
                </StyledIconButton>
                <div style={{ flex: 1 }} />
              </div>
              <div style={{ flex: 1 }} />
            </div>
          </div>
        }
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
