import React from 'react';
import Loadable from 'react-loadable';
import { makeStyles, createMuiTheme, withStyles } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import * as API from './../../../api'
import { primary, grey } from './../../../api/palette'

import CKEditor from '@ckeditor/ckeditor5-react';

import BalloonEditor from '@ckeditor/ckeditor5-build-balloon-block';

import {
  Button,
  IconButton,
  Typography,
  Box,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,

} from '@material-ui/core'

import {
  Person,
  CloudUpload,

} from '@material-ui/icons';

const SelectMatch = Loadable({
  loader: () => import(/* webpackChunkName: "SelectMatch" */ './SelectMatch'),
  loading: () => null
});

const useStyles = makeStyles(theme => ({
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
    marginTop: 16,
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
  selectMatchButton: {
    width: '100%',
    marginTop: 24,
    padding: theme.spacing(1.5, 0)
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

const GreenRadio = withStyles({
  root: {
    color: primary[400],
    '&$checked': {
      color: primary[600],
    },
  },
  checked: {},
})(props => <Radio color="default" {...props} />);

const theme = createMuiTheme({
  palette: {
    primary: primary,
  },
});

export default function PageOrganizerPostEditor(props) {
  const classes = useStyles();
  const { BTN, token, setCSRFToken, handleSnackBar, isSupportWebp, createPostState, setCreatePostState, toggleCreatePost, pageData, clickAction, edittingData } = props
  const [ title, setTitle ] = React.useState('')
  const [ detail, setDetail ] = React.useState('')
  const [ dataDetail, setDataDetail ] = React.useState(null)
  const [ borderOnFocus, setBorderOnFocus ] = React.useState(`1px solid ${grey[400]}`)
  const [ selectedMatch, setSelectedMatch ] = React.useState(null);
  const [ selectMatchState, setSelectMatchState ] = React.useState(false)
  const [ selectedFile, setSelectedFile ] = React.useState(null);
  const [ selectedTypePost, setSelectedTypePost ] = React.useState('post')
  const [ tempFile, setTempFile ] = React.useState(null)
  const [ fileHover, handleFileHover ] = React.useState(false);
  const imgRef = React.useRef(null)
  const ckeditorEl = React.useRef(null)

  function toggleSelectMatch(){
    setSelectMatchState(!selectMatchState)
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

  function handleTypePost(event) {
    setSelectedTypePost(event.target.value);
  }

  function handleCKEditorOnChange(data){
    setDetail(data)
    const root = document.getElementById('create-post-dialog')
    if(ckeditorEl && root){
      root.scrollTo(0, ckeditorEl.current.offsetTop + ckeditorEl.current.clientHeight)
    }
  }

  function handleCKEditorOnFocus(){
    setBorderOnFocus(`1px solid ${primary[600]}`)
    const root = document.getElementById('create-post-dialog')
    if(ckeditorEl && root){
      root.scrollTo(0, ckeditorEl.current.offsetTop)
    }
  }

  function handleKeyPress(e){
    if(e.key === 'Enter'){
      handleFetchCreatePost()
    }
  }

  async function handleFetchCreatePost(){
    const resToken = token? token : await API.xhrGet('getcsrf')
    const formData = new FormData()
    const sendObj = {
      action: 'post',
      pageid: pageData.pageid,
      type: selectedTypePost
    };

    if(selectedTypePost === 'match'){
      if(selectedMatch){
        Object.assign(sendObj, { matchid:  selectedMatch.matchid});
      }
    }

    if(selectedTypePost === 'announce'){
      if(detail){
        Object.assign(sendObj, { announcedetail:  detail });
      }
    }

    if(title){
      Object.assign(sendObj, { message:  title});
    }

    await API.xhrPost(
      token? token : resToken.token,
      'ppagesection', {
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
        handleFetchPicture(csrf, d)
      }
    })
  }

  async function handleFetchPicture(csrf, d){
    const formData = new FormData()
    const sendObj = {
      action: 'editpost',
      pageid: pageData.pageid,
      postid: d.postid,
      photopath: 'true'
    }
    if(selectedFile){
      formData.append('postimage', selectedFile)
      const response = await API.fetchPostFile('ppagesection',`?_csrf=${csrf}`, sendObj, formData)
      const res = await API.xhrGet('getcsrf')
      setCSRFToken(res.token)
      handleSnackBar({
        state: true,
        message: response.status,
        variant: response.status === 'success' ? response.status : 'error',
        autoHideDuration: response.status === 'success'? 2000 : 5000
      })
      if(response.status === 'success'){
        setCreatePostState(false)
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
        setCreatePostState(false)
      }
    }
  }

  async function handleFetchEditPost(){
    const resToken = token? token : await API.xhrGet('getcsrf')
    const formData = new FormData()
    const sendObj = {
      action: 'edit',
      pageid: pageData.pageid,
      postid: edittingData.postid,
      type: selectedTypePost
    };

    await handleEditPicture()

    if(selectedTypePost === 'match'){
      if(selectedMatch){
        Object.assign(sendObj, { matchid:  selectedMatch.matchid});
      }
    }

    if(selectedTypePost === 'announce'){
      if(detail){
        Object.assign(sendObj, { announcedetail:  detail });
      }
    }

    if(title){
      Object.assign(sendObj, { message:  title});
    }

    await API.xhrPost(
      token? token : resToken.token,
      'ppagesection', {
        ...sendObj
    }, (csrf, d) =>{
      setCSRFToken(csrf)
      handleSnackBar({
        state: true,
        message: d.status,
        variant: d.status === 'success' ? d.status : 'error',
        autoHideDuration: d.status === 'success'? 2000 : 5000
      })
    })
  }

  async function handleEditPicture(){
    if(selectedFile){
      const sendObj = {
        action: 'editpost',
        pageid: pageData.pageid,
        postid: edittingData.postid,
        photopath: 'true'
      }
      var resToken = token? token : await API.xhrGet('getcsrf')
      const formData = new FormData()
      formData.append('postimage', selectedFile)
      const response = await API.fetchPostFile('ppagesection',`?_csrf=${token? token : resToken.token}`, sendObj, formData)
      const res = await API.xhrGet('getcsrf')
      setCSRFToken(res.token)
      handleSnackBar({
        state: true,
        message: response.status,
        variant: response.status === 'success' ? response.status : 'error',
        autoHideDuration: response.status === 'success'? 2000 : 5000
      })
      if(response.status === 'success'){
        setCreatePostState(false)
      }
    }
  }

  async function handleFetchDetail(){
    const resToken = token? token : await API.xhrGet('getcsrf')
    await API.xhrPost(
      token? token : resToken.token,
      'ploadpage', {
        action: 'postdetail',
        pageid: pageData.pageid,
        postid: edittingData.postid
    }, (csrf, d) =>{
      setCSRFToken(csrf)
      setTitle(d.message)
      setSelectedTypePost(d.type)

      if(d.photopath){
        setTempFile(API.getPictureUrl(d.photopath) + ( isSupportWebp? '.webp' : '.jpg' ))
      }

      if(d.messagedetail && d.type === 'match'){
        setSelectedMatch(d.messagedetail[0])
      }

      if(d.messagedetail && d.type === 'announce'){
        setDetail(d.messagedetail)
        setDataDetail(d)
      }
    })
  }

  React.useEffect(()=>{
    if(clickAction === 'edit' && edittingData){
      handleFetchDetail()
    }
  },[ ])

  return (
    <React.Fragment>
      <div style={{ marginTop: 24 }}>
        <ThemeProvider theme={theme}>
          <TextField
            autoFocus
            className={classes.margin}
            label="Title"
            value={title}
            variant="outlined"
            onChange={(e)=>setTitle(e.target.value)}
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
            <Typography variant="caption">{selectedFile && selectedFile.name}</Typography>
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
        <ThemeProvider theme={theme}>
          <FormControl component="fieldset" className={classes.margin}
            style={{
              width: '100%', border: '1px rgba(0, 0, 0, 0.23) solid',
              padding: '4px 16px 8px 24px',
              borderRadius: 4, boxSizing: 'border-box'
            }}>
            <FormLabel component="legend" style={{ marginLeft: 16 }}>Type</FormLabel>
            <RadioGroup value={selectedTypePost} onChange={handleTypePost} row>
              <FormControlLabel
                value={'post'}
                control={<GreenRadio />}
                label="Post"
                labelPlacement="end"
              />
              <FormControlLabel
                value={'announce'}
                control={<GreenRadio />}
                label="Announce"
                labelPlacement="end"
              />
              <FormControlLabel
                value={'match'}
                control={<GreenRadio />}
                label="Match"
                labelPlacement="end"
              />
            </RadioGroup>
          </FormControl>
          { selectedTypePost === 'announce' &&
            <React.Fragment>
              <div style={{ marginTop: 24 }}>Fill content here</div>
              <div ref={ckeditorEl} style={{ border: borderOnFocus, borderRadius: 2, }}>
                { clickAction === 'edit' ?
                  ( (dataDetail && dataDetail.messagedetail) ?
                    <CKEditor
                      data={detail}
                      editor={ BalloonEditor }
                      onChange={ ( event, editor ) => {
                        const data = editor.getData();
                        handleCKEditorOnChange(data)
                      }}
                      onFocus={handleCKEditorOnFocus}
                      onBlur={()=>setBorderOnFocus(`1px solid ${grey[400]}`)}
                    />
                    :
                    <CKEditor
                      data={detail}
                      editor={ BalloonEditor }
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
                    data={detail}
                    editor={ BalloonEditor }
                    onChange={ ( event, editor ) => {
                      const data = editor.getData();
                      handleCKEditorOnChange(data)
                    }}
                    onFocus={handleCKEditorOnFocus}
                    onBlur={()=>setBorderOnFocus(`1px solid ${grey[400]}`)}
                  />
                }
              </div>
            </React.Fragment>
          }
          { selectedTypePost === 'match' &&
            ( clickAction === 'edit' ?
            <BTN.PrimaryOutlined onClick={toggleSelectMatch} className={classes.selectMatchButton}>
              { selectedMatch ?
                ( selectedMatch.matchname ?
                  selectedMatch.matchname
                  :
                  (
                    selectedMatch.title?
                    selectedMatch.title : 'Select match'
                  )
                )
                :
                'Select match'
              }
            </BTN.PrimaryOutlined>
              :
              <BTN.PrimaryOutlined onClick={toggleSelectMatch} className={classes.selectMatchButton}>
                { selectedMatch? selectedMatch.title : 'Select match' }
              </BTN.PrimaryOutlined>
            )
          }
        </ThemeProvider>
        <GreenButton variant="contained" color="primary" className={classes.button}
          onClick={clickAction === 'edit'? handleFetchEditPost : handleFetchCreatePost}>
          {clickAction === 'edit'? 'Save':'Create'}
        </GreenButton>
      </div>
      <SelectMatch
        {...props}
        selectMatchState={selectMatchState}
        setSelectMatchState={setSelectMatchState}
        setSelectedMatch={setSelectedMatch} />
    </React.Fragment>
  );
}