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

const TemplateDialog = Loadable({
  loader: () => import(/* webpackChunkName: "TemplateDialog" */ './../../TemplateDialog'),
  loading: () => null
});

const LabelText = Loadable({
  loader: () => import(/* webpackChunkName: "LabelText" */ './../../LabelText'),
  loading: () => null
});

const useStyles = makeStyles(theme => ({
  root: {

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

export default function CreatePage(props) {
  const classes = useStyles();
  const { token, setCSRFToken, handleSnackBar, createPageState, toggleCreatePage } = props
  const [ pageName, setPageName ] = React.useState('')
  const [ selectedFile, setSelectedFile ] = React.useState(null);
  const [ tempFile, setTempFile ] = React.useState(null)
  const [ fileHover, handleFileHover ] = React.useState(false);
  const imgRef = React.useRef(null)

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
      handleCreatePage()
    }
  }

  async function handleCreatePage(){
    const resToken = token? token : await API.xhrGet('getcsrf')
    await API.xhrPost(
      token? token : resToken.token,
      'ppagesystem', {
        action: 'create',
        pagename: pageName
    }, (csrf, d) =>{
      setCSRFToken(csrf)
      handleCreatePicture(csrf, d)
    })
  }

  async function handleCreatePicture(csrf, d){
    const formData = new FormData()
    const sendObj = {
      action: 'edit',
      pageid: d.pageid,
      photopath: true
    }
    if(selectedFile){
      formData.append('pageimage', selectedFile)
      const response = await API.fetchPostFile('ppagesystem',`?_csrf=${csrf}`, sendObj, formData)
      const res = await API.xhrGet('getcsrf')
      setCSRFToken( res.token )
      handleSnackBar({
        state: true,
        message: response.status,
        variant: response.status === 'success' ? response.status : 'error',
        autoHideDuration: response.status === 'success'? 2000 : 5000
      })
      if(response.status === 'success'){
        toggleCreatePage()
      }
    }else{
      setCSRFToken(csrf)
      handleSnackBar({
        state: true,
        message: d.status,
        variant: d.status === 'success' ? d.status : 'error',
        autoHideDuration: d.status === 'success'? 2000 : 5000
      })
      if(d.status === 'success'){
        toggleCreatePage()
      }
    }
  }

  return (
    <TemplateDialog open={createPageState} handleClose={toggleCreatePage} maxWidth={450}>
      <div className={classes.root}>
        {/*
          <Typography component="div" style={{ marginBottom: 24 }}>
            <Box className={classes.title} fontWeight={600} m={1}>
              Create page
            </Box>
          </Typography>*/
        }
        <LabelText text="Create page" />
        <div style={{ marginTop: 24 }}>
          <ThemeProvider theme={theme}>
            <TextField
              autoFocus
              className={classes.margin}
              label="Page name"
              variant="outlined"
              autoComplete="email"
              onChange={(e)=>setPageName(e.target.value)}
              onKeyPress={e =>handleKeyPress(e)}
            />
          </ThemeProvider>
          { ( selectedFile )?
            <div style={{
                position: 'relative', marginTop: 16, marginBottom: 24,
                display: 'flex', flexDirection: 'column', justifyContent: 'center'
              }}
              onMouseEnter={()=>handleFileHover(true)}
              onMouseLeave={()=>handleFileHover(false)}>
              <Typography variant="caption">{selectedFile.name}</Typography>
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
                      <CloudUpload fontSize="large" style={{ color: primary[400] }}/>
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
              <Typography variant="caption" style={{ textAlign: 'center' }}>Upload image</Typography>
              <div className={classes.matchImgTemp} style={{ maxHeight: 280, height: window.innerWidth * .45 }}>
                <div style={{ flex: 1 }} />
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <div style={{ flex: 1 }} />
                  <StyledIconButton className={classes.matchFile}>
                    <input className={classes.inputFile} type="file" accept="image/png, image/jpeg" onChange={handlePicture} />
                    <CloudUpload fontSize="large" style={{ color: primary[500] }}/>
                  </StyledIconButton>
                  <div style={{ flex: 1 }} />
                </div>
                <div style={{ flex: 1 }} />
              </div>
            </div>
          }
          <GreenButton variant="contained" color="primary" className={classes.button}
            onClick={handleCreatePage}>
            Create
          </GreenButton>
        </div>
      </div>
    </TemplateDialog>
  );
}