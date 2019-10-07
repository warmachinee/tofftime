import React from 'react';
import { makeStyles, withStyles, createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import * as API from './../../../api'
import { primary, grey, red } from './../../../api/palette'

import CKEditor from '@ckeditor/ckeditor5-react';

import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';

import CloudUploadIcon from '@material-ui/icons/CloudUpload';

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
  const { sess, token, setCSRFToken, handleClose, handleSnackBar, clickAction, edittingData, isSupportWebp, setData } = props
  const [ title, setTitle ] = React.useState('')
  const [ detail, setDetail ] = React.useState('')
  const [ dataDetail, setDataDetail ] = React.useState(null)
  const [ borderOnFocus, setBorderOnFocus ] = React.useState(`1px solid ${grey[400]}`)
  const [ selectedFile, setSelectedFile ] = React.useState(null);
  const [ tempFile, setTempFile ] = React.useState(null)
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

  function handleCKEditorOnChange(data){
    setDetail(data)
  }

  function handleCKEditorOnFocus(){
    setBorderOnFocus(`1px solid ${primary[600]}`)
    const root = document.getElementById('template-dialog')
    if(ckeditorEl && root){
      root.scrollTo(0, ckeditorEl.current.offsetTop)
    }
  }

  async function handleEdit(){
    const sendObj = {
      action: 'edit',
      announceid: edittingData.announceid,
      display: true
    };

    if(selectedFile){
      handleEditPicture()
    }

    if(title){
      Object.assign(sendObj, { announcename:  title});
    }

    if(detail){
      Object.assign(sendObj, { announcedetail:  detail});
    }

    const resToken = token? token : await API.xhrGet('getcsrf')
    await API.xhrPost(
      token? token : resToken.token,
      'announcemain', {
        ...sendObj
    }, (csrf, d) =>{
      setCSRFToken(csrf)
      handleSnackBar({
        state: true,
        message: d.status,
        variant: d.status === 'success' ? d.status : 'error',
        autoHideDuration: d.status === 'success'? 2000 : 5000
      })
      if(d.status === 'success'){
        handleFetch()
      }else{
        handleClose()
      }
    })
  }

  async function handleEditPicture(){
    var resToken = token? token : await API.xhrGet('getcsrf')
    const formData = new FormData()
    formData.append('announceimage', selectedFile)
    const d = await API.fetchPostFile('announcemain',`?_csrf=${token? token : res.token}`, {
      action: 'edit',
      announceid: edittingData.announceid,
      photopath: true,
      display: true,
    }, formData)
    resToken = await API.xhrGet('getcsrf')
    setCSRFToken(resToken.token)
    handleSnackBar({
      state: true,
      message: d.response.status,
      variant: d.response.status === 'success' ? d.response.status : 'error',
      autoHideDuration: d.response.status === 'success'? 2000 : 5000
    })
    handleFetch()
  }

  async function handleCreate(){
    const resToken = token? token : await API.xhrGet('getcsrf')
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

    await API.xhrPost(
      token? token : resToken.token,
      'announcemain', {
        ...sendObj
    }, (csrf, d) =>{
      setCSRFToken(csrf)
      if(d.status === 'success'){
        handleCreatePicture(csrf, d)
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
    if(selectedFile){
      formData.append('announceimage', selectedFile)
      const response = await API.fetchPostFile('announcemain',`?_csrf=${csrf}`, sendObj, formData)
      const res = await API.xhrGet('getcsrf')
      setCSRFToken(res.token)
      handleSnackBar({
        state: true,
        message: response.response.status,
        variant: response.response.status === 'success' ? response.response.status : 'error',
        autoHideDuration: response.response.status === 'success'? 2000 : 5000
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

  async function handleFetchDetail(){
    const resToken = token? token : await API.xhrGet('getcsrf')
    const d = await API.xhrGet('loadgeneral',
    `?_csrf=${token? token : resToken.token}&action=announcedetail&announceid=${edittingData.announceid}`
    )
    setCSRFToken(d.token)
    setTitle(d.response[0].title)
    setDetail(d.response[0].announcedetail)
    setDataDetail(d.response[0])
  }

  async function handleFetch(){
    const resToken = token? token : await API.xhrGet('getcsrf')
    await API.xhrPost(
      token? token : resToken.token,
      'loadmainpage', {
        action: 'announce',
    }, (csrf, d) =>{
      setCSRFToken(csrf)
      setData(d)
    })
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
          <div>{ ( sess && sess.language === 'TH' ) ? "เนื้อหา" : 'Content' }</div>
          <div ref={ckeditorEl} style={{ border: borderOnFocus, borderRadius: 2 }}>
            { clickAction === 'edit' ?
              ( dataDetail && dataDetail.announcedetail &&
                <CKEditor
                  editor={ ClassicEditor }
                  data={detail}
                  onChange={ ( event, editor ) => {
                    const data = editor.getData();
                    handleCKEditorOnChange(data)
                  }}
                  onFocus={handleCKEditorOnFocus}
                  onBlur={()=>setBorderOnFocus(`1px solid ${grey[400]}`)}
                />
              )
              :
              <CKEditor
                editor={ ClassicEditor }
                data={detail}
                onChange={ ( event, editor ) => {
                  const data = editor.getData();
                  handleCKEditorOnChange(data)
                }}
                onFocus={handleCKEditorOnFocus}
                onBlur={()=>setBorderOnFocus(`1px solid ${grey[400]}`)}
              />
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
