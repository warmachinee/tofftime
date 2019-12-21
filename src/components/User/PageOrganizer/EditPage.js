import React from 'react';
import Loadable from 'react-loadable';
import { makeStyles, createMuiTheme, withStyles } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import * as API from './../../../api'
import { primary, grey } from './../../../api/palette'

import {
  Button,
  IconButton,
  Typography,
  Box,
  TextField,

} from '@material-ui/core'

import {
  Person,
  CloudUpload,

} from '@material-ui/icons';

const LabelText = Loadable({
  loader: () => import(/* webpackChunkName: "LabelText" */ './../../Utils/LabelText'),
  loading: () => null
});

const RichTextEditor = Loadable({
  loader: () => import(/* webpackChunkName: "RichTextEditor" */ './../../Utils/RichTextEditor'),
  loading: () => null
});

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(0, 1.5, 1.5, 1.5)
  },
  margin: {
    width: '100%',
    margin: '4px 0',
    [theme.breakpoints.up(500)]: {
      margin: theme.spacing(1,0),
    },
  },
  title: {
    textAlign: 'center', color: primary[900],
    fontSize: 28,
    [theme.breakpoints.up(500)]: {
      fontSize: 32,
    },
  },
  button: {
    width: '100%',
    padding: 8,
    margin: theme.spacing(1,0),
    [theme.breakpoints.up(500)]: {
      padding: 16,
    },
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

export default function EditPage(props) {
  const classes = useStyles();
  const { API, sess, token, setCSRFToken, handleSnackBar, isSupportWebp, pageData, setEditPageRefresh  } = props
  const [ data, setData ] = React.useState(null);
  const [ pageName, setPageName ] = React.useState('')
  const [ aboutPageData, setAboutPageData ] = React.useState(null)
  const [ selectedFile, setSelectedFile ] = React.useState(null);
  const [ tempFile, setTempFile ] = React.useState(null)
  const [ fileHover, handleFileHover ] = React.useState(false);
  const imgRef = React.useRef(null)

  function setInitialData(d){
    setPageName(d.pagename)
    if(d.logo){
      setTempFile(API._getPictureUrl(d.logo) + ( isSupportWebp? '.webp' : '.jpg' ))
    }
    setAboutPageData(d.pagedetail)
  }

  function isEditDetail(){
    if(
      data.pagename !== pageName ||
      data.pagedetail !== aboutPageData ||
      selectedFile
    ){
      return true
    }
    return false
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

  function handleKeyPress(e){
    if(e.key === 'Enter'){
      handleEditPage()
    }
  }

  function handleEditorOnChange(data){
    setAboutPageData(data)
  }

  async function handleEditPage(){
    const resToken = token? token : await API._xhrGet('getcsrf')
    await API._xhrPost(
      token? token : resToken.token,
      'ppagesystem', {
        action: 'edit',
        pageid: pageData.pageid,
        pagename: pageName,
        pagedetail: aboutPageData,
        color: ''
    }, (csrf, d) =>{
      setCSRFToken(csrf)
      handleEditPicture(csrf, d)
    })
  }

  async function handleEditPicture(csrf, d){
    const formData = new FormData()
    const sendObj = {
      action: 'edit',
      pageid: pageData.pageid,
      photopath: true
    }
    if(selectedFile){
      formData.append('pageimage', selectedFile)
      const response = await API._fetchPostFile('ppagesystem',`?_csrf=${csrf}`, sendObj, formData)
      const res = await API._xhrGet('getcsrf')
      setCSRFToken( res.token )
      handleSnackBar({
        state: true,
        message: response.status,
        variant: /success/.test(response.status) ? response.status : 'error',
        autoHideDuration: /success/.test(response.status)? 2000 : 5000
      })
      if(/success/.test(response.status)){
        setEditPageRefresh(new Date().toISOString())
        handleFetch()
      }
    }else{
      setCSRFToken(csrf)
      handleSnackBar({
        state: true,
        message: d.status,
        variant: /success/.test(d.status) ? d.status : 'error',
        autoHideDuration: /success/.test(d.status)? 2000 : 5000
      })
      if(/success/.test(d.status)){
        setEditPageRefresh(new Date().toISOString())
      }
      handleFetch()
    }
  }

  async function handleFetch(){
    const resToken = token? token : await API._xhrGet('getcsrf')
    await API._xhrPost(
      token? token : resToken.token,
      ( sess && sess.status === 1 ) ? 'ploadpage' : 'mloadpage' , {
        action: 'detail',
        pageid: pageData.pageid,
    }, function(csrf, d){
      setCSRFToken(csrf)
      if(d.length > 1){
        setInitialData(d[0])
        setData(d[0])
      }
    })
  }

  React.useEffect(()=>{
    handleFetch()
  }, [ window.location.pathname ])

  return (
    <div className={classes.root}>
      <LabelText text={ API._getWord(sess && sess.language).Edit_group } paddingTop={0} />
      <div>
        <ThemeProvider theme={theme}>
          <TextField
            autoFocus={API._isDesktopBrowser()}
            className={classes.margin}
            label={ API._getWord(sess && sess.language).Group_name }
            value={pageName}
            variant="outlined"
            onChange={(e)=>setPageName(e.target.value)}
            onKeyPress={e =>handleKeyPress(e)}
          />
        </ThemeProvider>
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
            {/*<Typography variant="caption">{selectedFile && selectedFile.name}</Typography>*/}
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
                    <CloudUpload fontSize="large" style={{ color: primary[400] }} />
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
                  <CloudUpload fontSize="large" style={{ color: primary[500] }} />
                </StyledIconButton>
                <div style={{ flex: 1 }} />
              </div>
              <div style={{ flex: 1 }} />
            </div>
          </div>
        }
        <div style={{ marginTop: 24 }}>
          { API._getWord(sess && sess.language).About_group }
        </div>
        { (aboutPageData) ?
          <RichTextEditor HTMLData={aboutPageData} handleGetHTML={e =>handleEditorOnChange(e)} />
          :
          <RichTextEditor handleGetHTML={e =>handleEditorOnChange(e)} />
        }
        <GreenButton variant="contained" color="primary" className={classes.button}
          disabled={data && !isEditDetail()}
          onClick={handleEditPage}>
          { API._getWord(sess && sess.language).Save }
        </GreenButton>
      </div>
    </div>
  );
}
