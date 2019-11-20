import React from 'react';
import Loadable from 'react-loadable';
import { makeStyles, withStyles, createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import * as API from './../../../api'
import { primary, grey, red } from './../../../api/palette'

import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';

import CloudUploadIcon from '@material-ui/icons/CloudUpload';

import { LDCircular } from './../../loading/LDCircular'

const RichTextEditor = Loadable({
  loader: () => import(/* webpackChunkName: "RichTextEditor" */'./../../Utils/RichTextEditor'),
  loading: () => <LDCircular />
});

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: 36
  },
  title: {
    color: primary[900],
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
    color: theme.palette.getContrastText(primary[500]),
    backgroundColor: primary[500],
    '&:hover': {
      backgroundColor: primary[700],
    },
  },
}))(Button);

const GreenTextButton = withStyles(theme => ({
  root: {
    color: primary[600],
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

export default function AnnouncementEditor(props) {
  const classes = useStyles();
  const { sess, token, setCSRFToken, handleClose, handleSnackBar, clickAction, edittingData, isSupportWebp, } = props
  const [ title, setTitle ] = React.useState('')
  const [ detail, setDetail ] = React.useState('')
  const [ dataDetail, setDataDetail ] = React.useState(null)
  const [ selectedFile, setSelectedFile ] = React.useState(null);
  const [ tempFile, setTempFile ] = React.useState(null)
  const [ fileHover, handleFileHover ] = React.useState(false);
  const imgRef = React.useRef(null)
  const matchPicture = edittingData? edittingData.picture : null

  function handleKeyPress(e){
    if (e === 'Enter'){
      handleCreate()
    }
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
      if( file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/webp'){
        setSelectedFile(file)
        reader.readAsDataURL(file);
        reader.onloadend = function (){
          setTempFile(reader.result)
        }
      }else{
        handleSnackBar({
          state: true,
          message: 'Invalid file type. Only JPEG, PNG or WebP',
          variant: 'error',
          autoHideDuration: 5000
        })
      }
    }
  }

  function handleCancel(){
    handleClose()
  }

  function handleEditorOnChange(data){
    setDetail(data)
  }

  async function handleEdit(){
    const sendObj = {
      action: 'edit',
      announceid: edittingData.announceid,
      display: true
    };

    if(title){
      Object.assign(sendObj, { announcename:  title});
    }

    if(detail){
      Object.assign(sendObj, { announcedetail:  detail});
    }

    const resToken = token? token : await API._xhrGet('getcsrf')
    await API._xhrPost(
      token? token : resToken.token,
      'announcemain', {
        ...sendObj
    }, (csrf, d) =>{
      setCSRFToken(csrf)
      if(/success/.test(d.status)){
        if(selectedFile){
          handleEditPicture()
        }else{
          handleClose()
          handleSnackBar({
            state: true,
            message: d.status,
            variant: /success/.test(d.status) ? d.status : 'error',
            autoHideDuration: /success/.test(d.status)? 2000 : 5000
          })
        }
      }else{
        handleSnackBar({
          state: true,
          message: d.status,
          variant: /success/.test(d.status) ? d.status : 'error',
          autoHideDuration: /success/.test(d.status)? 2000 : 5000
        })
      }
    })
  }

  async function handleEditPicture(){
    var resToken = token? token : await API._xhrGet('getcsrf')
    const formData = new FormData()
    formData.append('announceimage', selectedFile)
    const d = await API._fetchPostFile('announcemain',`?_csrf=${token? token : res.token}`, {
      action: 'edit',
      announceid: edittingData.announceid,
      photopath: true,
      display: true,
    }, formData)
    resToken = await API._xhrGet('getcsrf')
    setCSRFToken(resToken.token)
    handleSnackBar({
      state: true,
      message: d.status,
      variant: /success/.test(d.status) ? d.status : 'error',
      autoHideDuration: /success/.test(d.status)? 2000 : 5000
    })
    if(/success/.test(d.status)){
      handleClose()
    }
  }

  async function handleCreate(){
    const resToken = token? token : await API._xhrGet('getcsrf')
    const formData = new FormData()
    const sendObj = {
      action: 'create',
      display: true
    };

    if(title){
      Object.assign(sendObj, { announcename:  title});
    }

    if(detail){
      Object.assign(sendObj, { announcedetail:  detail});
    }

    await API._xhrPost(
      token? token : resToken.token,
      'announcemain', {
        ...sendObj
    }, (csrf, d) =>{
      setCSRFToken(csrf)
      if(/success/.test(d.status)){
        if(selectedFile){
          handleCreatePicture(csrf, d)
        }else{
          handleClose()
          handleSnackBar({
            state: true,
            message: d.status,
            variant: /success/.test(d.status) ? d.status : 'error',
            autoHideDuration: /success/.test(d.status)? 2000 : 5000
          })
        }
      }else{
        handleSnackBar({
          state: true,
          message: d.status,
          variant: /success/.test(d.status) ? d.status : 'error',
          autoHideDuration: /success/.test(d.status)? 2000 : 5000
        })
      }
    })
  }

  async function handleCreatePicture(csrf, d){
    const formData = new FormData()
    const sendObj = {
      action: 'edit',
      announceid: d.announceid,
      photopath: true
    }
    formData.append('announceimage', selectedFile)
    const response = await API._fetchPostFile('announcemain',`?_csrf=${csrf}`, sendObj, formData)
    const res = await API._xhrGet('getcsrf')
    setCSRFToken(res.token)
    handleSnackBar({
      state: true,
      message: response.status,
      variant: /success/.test(response.status) ? response.status : 'error',
      autoHideDuration: /success/.test(response.status)? 2000 : 5000
    })
    if(/success/.test(response.status)){
      handleClose()
    }
  }

  async function handleFetchDetail(){
    const resToken = token? token : await API._xhrGet('getcsrf')
    const d = await API._xhrGet('loadgeneral',
    `?_csrf=${token? token : resToken.token}&action=announcedetail&announceid=${edittingData.announceid}`
    )
    setCSRFToken(d.token)
    setTitle(d.response.title)
    setDetail(d.response.announcedetail)
    setDataDetail(d.response)
  }

  React.useEffect(()=>{
    if(clickAction === 'edit' && edittingData){
      handleFetchDetail()
    }
  },[ ])

  return (
    <div className={classes.root}>
      <Typography component="div">
        <Box className={classes.title} fontWeight={600}>
          { clickAction === 'edit'? 'Edit announce' : 'Create announce' }
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
                tempFile
                :
                ( isSupportWebp? matchPicture + '.webp': matchPicture + '.jpg' )
              } />
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
              style={{ height: window.innerWidth * .45 , maxHeight: 280 }}>
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
        <ThemeProvider theme={theme}>
          <TextField
            className={classes.textField}
            label="Title"
            variant="outlined"
            value={title}
            onChange={e => setTitle(e.target.value)}
            onKeyPress={e =>handleKeyPress(e.key)}
            onFocus={e => e.target.select()} />
          <div>{ API._getWord(sess && sess.language).Content }</div>
          <div>
            { clickAction === 'edit' ?
              ( dataDetail && dataDetail.announcedetail &&
                <RichTextEditor HTMLData={dataDetail.announcedetail} handleGetHTML={e =>handleEditorOnChange(e)} />
              )
              :
              <RichTextEditor handleGetHTML={e =>handleEditorOnChange(e)} />
            }
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
