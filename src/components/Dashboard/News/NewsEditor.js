import React from 'react';
import Loadable from 'react-loadable';
import { makeStyles, withStyles, createMuiTheme } from '@material-ui/core/styles';
import * as API from '../../../api'
import { ThemeProvider } from '@material-ui/styles';

import CKEditor from '@ckeditor/ckeditor5-react';

import BalloonEditor from '@ckeditor/ckeditor5-build-balloon-block';

import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';

import CloudUploadIcon from '@material-ui/icons/CloudUpload';

import teal from '@material-ui/core/colors/teal';
import grey from '@material-ui/core/colors/grey';
import red from '@material-ui/core/colors/red';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: 36
  },
  title: {
    color: teal[900],
    fontSize: 18,
  },
  notice: {
    fontFamily: 'monospace',
    color: grey[600],
    fontWeight: 600,
  },
  textField: {
    width: '100%',
    margin: theme.spacing(1, 0)
  },
  textArea: {
    width: '100%',
    margin: theme.spacing(1, 0),
    resize: 'none',
    padding: '18.5px 14px',
    fontSize: 16,
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: 400,
    letterSpacing: '0.00938em',
    borderRadius: 2,
    '&:focus': {
      border: '1.5px solid',
    },
  },
  button: {
    padding: theme.spacing(2),
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
    color: theme.palette.getContrastText(teal[500]),
    backgroundColor: teal[500],
    '&:hover': {
      backgroundColor: teal[700],
    },
  },
}))(Button);

const GreenTextButton = withStyles(theme => ({
  root: {
    color: teal[600],
    '&:hover': {
      backgroundColor: teal[100],
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
    primary: teal,
  },
});

export default function NewsEditor(props) {
  const classes = useStyles();
  const { token, setCSRFToken, handleClose, handleSnackBar, clickAction, edittingData, isSupportWebp, setData } = props
  const [ title, setTitle ] = React.useState('')
  const [ subtitle, setSubtitle ] = React.useState('')
  const [ detail, setDetail ] = React.useState('')
  const [ borderOnFocus, setBorderOnFocus ] = React.useState(`1px solid ${grey[400]}`)
  const [ selectedFile, setSelectedFile ] = React.useState(null);
  const [ fileHover, handleFileHover ] = React.useState(false);
  const imgRef = React.useRef(null)
  const ckeditorEl = React.useRef(null)
  const matchPicture = edittingData? edittingData.picture : null

  function handleKeyPress(e){
    if (e === 'Enter'){
      handleCreate()
    }
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
    handleClose()
  }

  function handleCKEditorOnChange(data){
    setDetail(data)
    const root = document.getElementById('template-dialog')
    if(ckeditorEl && root){
      root.scrollTo(0, ckeditorEl.current.offsetTop + ckeditorEl.current.clientHeight)
    }
  }

  function handleCKEditorOnFocus(){
    setBorderOnFocus(`1px solid ${teal[600]}`)
    const root = document.getElementById('template-dialog')
    if(ckeditorEl && root){
      root.scrollTo(0, ckeditorEl.current.offsetTop)
    }
  }

  async function handleEdit(){
    const res = await API.xhrGet('getcsrf')
    const formData = new FormData()
    const sendObj = {
      action: 'edit',
      newsid: edittingData.newsid,
      display: true
    };

    if(selectedFile){
      formData.append('newsimage', selectedFile)
      const d = await API.fetchPostFile('newsmain',`?_csrf=${res.token}`, {
        action: 'edit',
        newsid: edittingData.newsid,
        photopath: true,
        display: true,
      }, formData)
      if(d.response.status !== 'success'){
        handleSnackBar({
          state: true,
          message: d.response.status,
          variant: 'error',
          autoHideDuration: 5000
        })
      }
    }

    if(title){
      Object.assign(sendObj, { newsname:  title});
    }

    if(subtitle){
      Object.assign(sendObj, { newssubname:  subtitle});
    }

    if(detail){
      Object.assign(sendObj, { newsdetail:  detail});
    }

    await API.xhrPost(
      res.token,
      'newsmain', {
        ...sendObj
    }, (csrf, d) =>{
      setCSRFToken(csrf)
      handleSnackBar({
        state: true,
        message: d.status,
        variant: d.status === 'success' ? d.status : 'error',
        autoHideDuration: d.status === 'success'? 2000 : 5000
      })
      handleFetch()
      if(d.status === 'success'){
        handleClose()
      }
    })
  }

  async function handleCreate(){
    const res = await API.xhrGet('getcsrf')
    const formData = new FormData()
    const sendObj = {
      action: 'create',
      display: true
    };

    if(title){
      Object.assign(sendObj, { newsname:  title});
    }

    if(subtitle){
      Object.assign(sendObj, { newssubname:  subtitle});
    }

    if(detail){
      Object.assign(sendObj, { newsdetail:  detail});
    }

    await API.xhrPost(
      res.token,
      'newsmain', {
        ...sendObj
    }, (csrf, d) =>{
      handleSnackBar({
        state: true,
        message: d.status,
        variant: d.status === 'success' ? d.status : 'error',
        autoHideDuration: d.status === 'success'? 2000 : 5000
      })
      if(d.status === 'success'){
        handleCreatePicture(csrf, d)
      }
    })
  }

  async function handleCreatePicture(csrf, d){
    const formData = new FormData()
    const sendObj = {
      action: 'edit',
      newsid: d.newsid,
      photopath: true
    }
    if(selectedFile){
      formData.append('newsimage', selectedFile)
      const response = await API.fetchPostFile('newsmain',`?_csrf=${csrf}`, sendObj, formData)
      setCSRFToken( await API.xhrGet('getcsrf') )
      handleSnackBar({
        state: true,
        message: response.status,
        variant: response.status === 'success' ? response.status : 'error',
        autoHideDuration: response.status === 'success'? 2000 : 5000
      })
      await handleFetch()
      if(response.status === 'success'){
        handleClose()
      }
    }else{
      setCSRFToken(csrf)
      handleSnackBar({
        state: true,
        message: d.status,
        variant: d.status === 'success' ? d.status : 'error',
        autoHideDuration: d.status === 'success'? 2000 : 5000
      })
      await handleFetch()
      if(d.status === 'success'){
        handleClose()
      }
    }
  }

  async function handleFetch(){
    const res = await token? token : API.xhrGet('getcsrf')
    await API.xhrPost(
      token? token : res.token,
      'loadmainpage', {
        action: 'news',
    }, (csrf, d) =>{
      setCSRFToken(csrf)
      setData(d)
    })
  }

  return (
    <div className={classes.root}>
      <Typography component="div">
        <Box className={classes.title} fontWeight={600}>
          { clickAction === 'edit'? 'Edit news' : 'Create news' }
        </Box>
      </Typography>
      <div style={{ marginTop: 24 }}>
        { ( selectedFile || matchPicture )?
          <div style={{ position: 'relative', marginTop: 16, marginBottom: 8, border: `1px solid ${grey[400]}` }}
            onMouseEnter={()=>handleFileHover(true)}
            onMouseLeave={()=>handleFileHover(false)}>
            <img ref={imgRef}
              style={{ opacity: fileHover?.5:1, maxHeight: 280, height: window.innerWidth * .45 }}
              className={classes.matchImg}
              src={
                selectedFile ?
                URL.createObjectURL(selectedFile)
                :
                ( isSupportWebp? matchPicture + '.webp': matchPicture + '.jpg' )
              }/>
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
                    <CloudUploadIcon fontSize="large" style={{ color: teal[400] }}/>
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
              style={{ height: window.innerWidth * .45 , maxHeight: 280 }}>
              <div style={{ flex: 1 }} />
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ flex: 1 }} />
                <StyledIconButton className={classes.matchFile}>
                  <input className={classes.inputFile} type="file" accept="image/png, image/jpeg" onChange={handlePicture} />
                  <CloudUploadIcon fontSize="large" style={{ color: teal[500] }}/>
                </StyledIconButton>
                <div style={{ flex: 1 }} />
              </div>
              <div style={{ flex: 1 }} />
            </div>
          </div>
        }
        <ThemeProvider theme={theme}>
          <TextField
            className={classes.textField}
            label="Title"
            variant="outlined"
            value={
              clickAction === 'edit'?
              ( edittingData && ( title ? title : edittingData.title ) || '' )
              :
              title
            }
            onChange={e => setTitle(e.target.value)}
            onKeyPress={e =>handleKeyPress(e.key)}
            onFocus={e => e.target.select()}/>
          <TextField
            className={classes.textField}
            label="Subtitle"
            variant="outlined"
            value={
              clickAction === 'edit'?
              ( edittingData && ( subtitle ? subtitle : edittingData.subtitle ) || ''  )
              :
              subtitle
            }
            onChange={e => setSubtitle(e.target.value)}
            onKeyPress={e =>handleKeyPress(e.key)}
            onFocus={e => e.target.select()}/>
          <div>Fill content here</div>
          <div ref={ckeditorEl} style={{ border: borderOnFocus, borderRadius: 2 }}>
            <CKEditor
              data={
                clickAction === 'edit'?
                ( edittingData && ( detail ? detail : edittingData.newsdetail ) || ''  )
                :
                detail
              }
              editor={ BalloonEditor }
              onChange={ ( event, editor ) => {
                const data = editor.getData();
                handleCKEditorOnChange(data)
                //console.log( { event, editor, data } );
              }}
              onFocus={handleCKEditorOnFocus}
              onBlur={()=>setBorderOnFocus(`1px solid ${grey[400]}`)}
              on
            />
          </div>
          <div style={{ display: 'flex', marginTop: 24 }}>
            <GreenTextButton fullWidth className={classes.button} onClick={handleCancel}>Cancel</GreenTextButton>
            <GreenButton
              fullWidth
              className={classes.button}
              onClick={clickAction === 'edit'? handleEdit : handleCreate}>
              {clickAction === 'edit'? 'Save':'Create'}
            </GreenButton>
          </div>
        </ThemeProvider>
      </div>
    </div>
  );
}