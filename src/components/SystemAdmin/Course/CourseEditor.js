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
  Checkbox,

} from '@material-ui/core'

import CloudUploadIcon from '@material-ui/icons/CloudUpload';

const useStyles = makeStyles(theme => ({
  root: {
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: 700
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

const GreenCheckbox = withStyles({
  root: {
    color: primary[400],
    '&$checked': {
      color: primary[600],
    },
  },
})(props => <Checkbox color="default" {...props} />);

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
  const { sess, token, setCSRFToken, isSupportWebp, handleSnackBar, editingField, setEditingField, pageOrganizer, pageData, afterSuccess } = props
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
  const [ isCreateNewVersion, setIsCreateNewVersion ] = React.useState(false)

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
    if(editingField){
      setEditingField(null)
    }
    afterSuccess()
  }

  async function handleCreate(){
    const resToken = token? token : await API._xhrGet('getcsrf')
    const sendObj = {
      action: sess.typeid === 'admin' ? 'create' : 'createcustom',
    };

    if(pageOrganizer){
      if(pageData){
        Object.assign(sendObj, { fieldtype: pageData.pageid });
      }
    }else{
      Object.assign(sendObj, { fieldtype: 0, });
    }

    if(sess.typeid === 'admin'){
      Object.assign(sendObj, { custom: !official ? 0 : 1 });
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
      await API._xhrPost(
        token? token : resToken.token,
        sess.typeid === 'admin' ? 'fieldsystem' : 'ffieldsystem', {
          ...sendObj
      }, (csrf, d) =>{
        setCSRFToken(csrf)
        handleSnackBar({
          state: true,
          message: d.status,
          variant: /success/.test(d.status) ? d.status : 'error',
          autoHideDuration: /success/.test(d.status)? 2000 : 5000
        })
        if(/success/.test(d.status)){
          if(selectedFile){
            handleEditPicture(d.fieldid)
          }else{
            if(props.setSelectedField){
              props.setSelectedField({
                fieldid: d.fieldid,
                fieldname: location
              })
              props.setSelectedFieldVersion(1)
              props.setSelectedFieldVersionCount(1)
            }
            afterSuccess()
          }
        }
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

    formData.append('fieldimage', selectedFile)
    Object.assign(sendObj, {
      fieldid: fieldid,
      photopath: true,
    });
    const resToken = token? token : await API._xhrGet('getcsrf')
    const d = await API._fetchPostFile(
      sess.typeid === 'admin' ? 'fieldsystem' : 'ffieldsystem',
      `?_csrf=${token? token : resToken.token}`, sendObj, formData)
    handleSnackBar({
      state: true,
      message: d.status,
      variant: /success/.test(d.status) ? d.status : 'error',
      autoHideDuration: /success/.test(d.status)? 2000 : 5000
    })
    const res = await API._xhrGet('getcsrf')
    setCSRFToken(res.token)
    afterSuccess()
    if(props.setSelectedField){
      props.setSelectedField({
        fieldid: fieldid,
        fieldname: location
      })
      props.setSelectedFieldVersion(1)
      props.setSelectedFieldVersionCount(1)
    }
  }

  async function handleEdit(){
    const resToken = token? token : await API._xhrGet('getcsrf')
    const formData = new FormData()
    const sendObj = {
      action: 'edit',
      fieldid: editingField.fieldid,
      usertarget: editingField.hostid
    };

    if(selectedCourseVersion && !isCreateNewVersion){
      Object.assign(sendObj, { fieldversion: selectedCourseVersion });
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

    await API._xhrPost(
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
            variant: /success/.test(d[e]) ? d[e] : 'error',
            autoHideDuration: /success/.test(d[e])? 2000 : 5000
          })
          statusRes.push(d[e])
        }else{
          statusRes.push(d[e])
        }
      })
      if(selectedFile){
        handleEditPicture(editingField.fieldid)
      }else{
        if(statusRes.every(item => /success/.test(item))){
          afterSuccess()
          handleSnackBar({
            state: true,
            message: d.status,
            variant: /success/.test(d.status) ? d.status : 'error',
            autoHideDuration: /success/.test(d.status)? 2000 : 5000
          })
        }
      }
    })
  }

  async function handleFetchLoadFieldVersion(){
    const resToken = token? token : await API._xhrGet('getcsrf')
    if(editingField){
      await API._xhrPost(
        token? token : resToken.token,
        sess.typeid === 'admin' ? 'loadfield' : 'floadfield', {
          action: 'versioncount',
          fieldid: editingField.fieldid
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
    const resToken = token? token : await API._xhrGet('getcsrf')
    if(editingField){
      await API._xhrPost(
        token? token : resToken.token,
        sess.typeid === 'admin' ? 'loadfield' : 'floadfield', {
          action: 'score',
          fieldid: editingField.fieldid,
          fieldversion: version
      }, (csrf, d) =>{
        setCSRFToken(csrf)
        try {
          setSelectedCourseVersion(version)
          setHoleScore(d.fieldscore)
          setHCPScore(d.hfieldscore)
          setLocation(editingField.fieldname)
          if(editingField.photopath){
            setTempFile(API._getPictureUrl(editingField.photopath) + ( isSupportWebp? '.webp' : '.jpg' ) + '#' + new Date().toISOString())
          }
        }catch(err) { console.log(err.message) }
      })
    }
  }

  React.useEffect(()=>{
    if(editingField){
      handleFetchLoadFieldVersion()
    }
  }, [ ])

  return (
    <div className={classes.root}>
      <Typography component="div">
        <Box className={classes.headerText} m={1}>
          {
            editingField?
            ( API._getWord(sess && sess.language).Edit_Course )
            :
            ( API._getWord(sess && sess.language).Create_Course )
          }
        </Box>
      </Typography>
      { editingField &&
        <div style={{ display: 'flex', marginBottom: 8 }}>
          { !isCreateNewVersion && courseVersion && courseVersion.length > 0 &&
            <FormControl className={classes.formControl} style={{ marginRight: 16 }}>
              <InputLabel>Version</InputLabel>
              <Select
                value={selectedCourseVersion}
                onChange={handleVersionChange}>
                {
                  courseVersion.map( d =>
                    <MenuItem key={d.createdate} value={d.version}>
                      {( `${API._getWord(sess && sess.language).Version_up} ` ) + d.version}
                    </MenuItem>
                )}
              </Select>
            </FormControl>
          }
          <FormControlLabel style={{ marginBottom: 4, marginTop: 'auto', whiteSpace: 'nowrap' }}
            control={
              <GreenCheckbox checked={isCreateNewVersion} onChange={()=>setIsCreateNewVersion(!isCreateNewVersion)} />
            }
            label={ API._getWord(sess && sess.language).Create_new_version }
          />
        </div>
      }
      <div className={classes.flexGrid}>
        <TextField
          fullWidth
          label={ API._getWord(sess && sess.language).Course_name }
          value={ location ? location : '' }
          onChange={e =>setLocation(e.target.value)}
          variant="outlined"
        />
        {/*
          <GreenButton variant="contained" className={classes.matchFile}>
            <input className={classes.inputFile} type="file" accept="image/png, image/jpeg" onChange={handlePicture} />
            <CloudUploadIcon className={classes.cloudUploadIcon} color="inherit"/>
            { window.innerWidth < 400 && 'Upload' }
          </GreenButton>*/
        }
      </div>
      { sess && sess.typeid === 'admin' && !editingField &&
        <div>
          <FormControl component="fieldset">
            <FormControlLabel
              control={<Switch checked={official} onChange={()=>setOfficial(!official)} />}
              label={ API._getWord(sess && sess.language).Official }
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
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Typography variant="caption" style={{ textAlign: 'center' }}>
                { API._getWord(sess && sess.language).Upload_image }
              </Typography>
            </div>
            <img ref={imgRef}
              style={{ opacity: fileHover?.5:1, maxHeight: 280, height: window.innerWidth * .45 }}
              className={classes.matchImg}
              src={tempFile} />
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
          <div
            style={{
              position: 'relative', marginTop: 16, marginBottom: 24,
              display: 'flex', flexDirection: 'column', justifyContent: 'center'
            }}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Typography variant="caption" style={{ textAlign: 'center' }}>
                { API._getWord(sess && sess.language).Upload_image }
              </Typography>
            </div>
            <div className={classes.matchImgTemp} style={{ maxHeight: 280, height: window.innerWidth * .45 }}>
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
      <Typography component="div">
        <Box className={classes.notice}>
          { selectedFile && selectedFile.name }
        </Box>
        <Box className={classes.title} m={1}>
          { API._getWord(sess && sess.language).PAR_Score }
        </Box>
      </Typography>

      <ScorePanel handleHole={handleHole} textScoreErr={textScoreErr} holeScore={holeScore} />

      <Typography component="div">
        <Box className={classes.title} m={1}>
          { API._getWord(sess && sess.language).Handicap }
        </Box>
      </Typography>

      <HCPPanel handleHCP={handleHCP} textHCPErr={textHCPErr} hcpScore={hcpScore} />

      <div className={classes.buttonGrid}>
        <GreenTextButton className={classes.button} onClick={handleCancel}>
          { API._getWord(sess && sess.language).Cancel }
        </GreenTextButton>
        <GreenButton className={classes.button} variant="contained"
          onClick={ editingField? handleEdit : handleCreate}>
          {
            editingField?
            ( API._getWord(sess && sess.language).Save )
            :
            ( API._getWord(sess && sess.language).Create )
          }
        </GreenButton>
      </div>
    </div>
  );
}
