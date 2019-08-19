import React from 'react';
import Loadable from 'react-loadable';
import { makeStyles, withStyles, createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import * as API from './../../api'
import { primary, grey, red } from './../../api/palette'

import CKEditor from '@ckeditor/ckeditor5-react';

import BalloonEditor from '@ckeditor/ckeditor5-build-balloon-block';

import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import CloudUploadIcon from '@material-ui/icons/CloudUpload';

import { LDCircular } from './../loading/LDCircular'

const TemplateDialog = Loadable({
  loader: () => import(/* webpackChunkName: "TemplateDialog" */'./../TemplateDialog'),
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
  margin: {
    width: '100%',
    marginTop: 8
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

const GreenRadio = withStyles({
  root: {
    color: primary[400],
    '&$checked': {
      color: primary[600],
    },
  },
  checked: {},
})(props => <Radio color="default" {...props} />);

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

export default function PagePostEditor(props) {
  const classes = useStyles();
  const { token, setCSRFToken, handleClose, handleSnackBar, clickAction, edittingData, isSupportWebp, pageid } = props
  const [ matchListData, setMatchListData ] = React.useState(null);
  const [ title, setTitle ] = React.useState( clickAction === 'edit'? ( edittingData ? edittingData.message : '' ) : '' )
  const [ subtitle, setSubTitle ] = React.useState( clickAction === 'edit'? ( edittingData ? edittingData.submessage : '' ) : '' )
  const [ detail, setDetail ] = React.useState( clickAction === 'edit'? ( edittingData ? edittingData.messagedetail : '' ) : '' )
  const [ borderOnFocus, setBorderOnFocus ] = React.useState(`1px solid ${grey[400]}`)
  const [ selectedFile, setSelectedFile ] = React.useState(null);
  const [ selectedTypePost, setSelectedTypePost ] = React.useState(clickAction === 'edit'? ( edittingData ? edittingData.type : 'post' ) : 'post');
  const [ selectedMatch, setSelectedMatch ] = React.useState(null);
  const [ selectMatchState, setSelectMatchState ] = React.useState(false);
  const [ tempFile, setTempFile ] = React.useState(null)
  const [ fileHover, handleFileHover ] = React.useState(false);
  const imgRef = React.useRef(null)
  const ckeditorEl = React.useRef(null)
  const matchPicture = edittingData? edittingData.photopath : null

  function handleSelectMatchClick(){
    setSelectMatchState(!selectMatchState)
  }

  function handleSelectedMatch(d){
    setSelectedMatch(d)
    setSelectMatchState(false)
  }

  function handleTypePost(event) {
    setSelectedTypePost(event.target.value);
  }

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
    setBorderOnFocus(`1px solid ${primary[600]}`)
    const root = document.getElementById('template-dialog')
    if(ckeditorEl && root){
      root.scrollTo(0, ckeditorEl.current.offsetTop)
    }
  }

  async function handleEdit(){
    const resToken = token? token : await API.xhrGet('getcsrf')
    const sendObj = {
      action: 'edit',
      pageid: pageid,
      type: selectedTypePost
    };

    if(selectedFile){
      handleEditPicture()
    }

    if(selectedTypePost === 'match'){
      if(selectedMatch){
        Object.assign(sendObj, { matchid:  selectedMatch.matchid });
      }
    }

    if(selectedTypePost === 'news'){
      if(subtitle){
        Object.assign(sendObj, { subnews:  subtitle });
      }
      if(detail){
        Object.assign(sendObj, { newsdetail:  detail });
      }
    }

    if(selectedTypePost === 'announce'){
      if(detail){
        Object.assign(sendObj, { announcedetail:  detail });
      }
    }

    if(title){
      Object.assign(sendObj, { message:  title });
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
        handleClose()
      }
    })
  }

  async function handleEditPicture(){
    const formData = new FormData()
    formData.append('postimage', selectedFile)
    const d = await API.fetchPostFile('ppagesection',`?_csrf=${token? token : res.token}`, {
      action: 'editpost',
      postid: edittingData.postid,
      photopath: true,
    }, formData)
    const resToken = await API.xhrGet('getcsrf')
    setCSRFToken(resToken.token)
    if(d.status !== 'success'){
      handleSnackBar({
        state: true,
        message: d.response.status,
        variant: 'error',
        autoHideDuration: 5000
      })
    }
  }

  async function handleCreate(){
    const resToken = token? token : await API.xhrGet('getcsrf')
    const formData = new FormData()
    const sendObj = {
      action: 'post',
      pageid: pageid,
      type: selectedTypePost
    };

    if(selectedTypePost === 'match'){
      if(selectedMatch){
        Object.assign(sendObj, { matchid:  selectedMatch. matchid});
      }
    }

    if(selectedTypePost === 'news'){
      if(subtitle){
        Object.assign(sendObj, { subnews:  subtitle });
      }
      if(detail){
        Object.assign(sendObj, { newsdetail:  detail });
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
        handleCreatePicture(csrf, d)
      }
    })
  }

  async function handleCreatePicture(csrf, d){
    const formData = new FormData()
    const sendObj = {
      action: 'editpost',
      postid: d.postid,
      photopath: true
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

  async function handleFetchMatch(){
    const resToken = token? token : await API.xhrGet('getcsrf')
    await API.xhrPost(
      token? token : resToken.token,
      'loadusersystem', {
        action: 'creator'
    }, (csrf, d) =>{
      setCSRFToken(csrf)
      setMatchListData(d)
    })
  }

  React.useEffect(()=>{
    if(selectMatchState){
      handleFetchMatch()
    }
  }, [ selectMatchState ])

  return (
    <div className={classes.root}>
      <Typography component="div">
        <Box className={classes.title} fontWeight={600}>
          { clickAction === 'edit'? 'Edit post' : 'Create post' }
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
                    <CloudUploadIcon fontSize="large" style={{ color: primary[400] }}/>
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
                  <CloudUploadIcon fontSize="large" style={{ color: primary[500] }}/>
                </StyledIconButton>
                <div style={{ flex: 1 }} />
              </div>
              <div style={{ flex: 1 }} />
            </div>
          </div>
        }
        <ThemeProvider theme={theme}>
          <FormControl component="fieldset" className={classes.margin}
            style={{ width: '100%', border: '1px rgba(0, 0, 0, 0.23) solid', padding: '4px 16px 8px 24px', borderRadius: 4 }}>
            <FormLabel component="legend" style={{ marginLeft: 16 }}>Post type</FormLabel>
            <RadioGroup value={selectedTypePost} onChange={handleTypePost} row>
              <FormControlLabel
                value={'post'}
                control={<GreenRadio />}
                label="Post"
                labelPlacement="end"
              />
              <FormControlLabel
                value={'match'}
                control={<GreenRadio />}
                label="Match"
                labelPlacement="end"
              />
              <FormControlLabel
                value={'news'}
                control={<GreenRadio />}
                label="News"
                labelPlacement="end"
              />
              <FormControlLabel
                value={'announce'}
                control={<GreenRadio />}
                label="Announce"
                labelPlacement="end"
              />
            </RadioGroup>
          </FormControl>
          <TextField
            className={classes.textField}
            label="Title"
            variant="outlined"
            value={title}
            onChange={e => setTitle(e.target.value)}
            onKeyPress={e =>handleKeyPress(e.key)}
            onFocus={e => e.target.select()}/>
          { selectedTypePost === 'news' &&
            <TextField
              className={classes.textField}
              label="Subtitle"
              variant="outlined"
              value={subtitle}
              onChange={e => setSubTitle(e.target.value)}
              onKeyPress={e =>handleKeyPress(e.key)}
              onFocus={e => e.target.select()}/>
          }
          { selectedTypePost === 'match' &&
            <GreenTextButton onClick={handleSelectMatchClick}>
              { selectedMatch ? selectedMatch.matchname : 'Select match' }
            </GreenTextButton>
          }
          { selectedTypePost !== 'match' &&
            <React.Fragment>
              <div style={{ marginTop: 24 }}>Fill content here</div>
              <div ref={ckeditorEl} style={{ border: borderOnFocus, borderRadius: 2 }}>
                <CKEditor
                  data={detail}
                  editor={ BalloonEditor }
                  onChange={ ( event, editor ) => {
                    const data = editor.getData();
                    handleCKEditorOnChange(data)
                    //console.log( { event, editor, data } );
                  }}
                  onFocus={handleCKEditorOnFocus}
                  onBlur={()=>setBorderOnFocus(`1px solid ${grey[400]}`)}
                />
              </div>
            </React.Fragment>
          }
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
      <TemplateDialog open={selectMatchState} handleClose={handleSelectMatchClick} maxWidth={500}>
        <List style={{ marginTop: 36 }}>
          { matchListData && typeof(matchListData) === 'object' && matchListData.length > 0 ?
            matchListData.map( d =>
            <React.Fragment key={d.matchid}>
              <ListItem button onClick={()=>handleSelectedMatch(d)}>
                <ListItemText
                  primary={d.matchname}
                  secondary={
                    <React.Fragment>
                      <Typography
                        style={{ fontStyle: 'oblique' }}
                        component="span"
                        variant="caption"
                        color="textPrimary"
                      >
                        {API.handleDateToString(d.matchcreatedate)}
                      </Typography>
                      <br></br>
                      {d.fieldname}
                    </React.Fragment>
                  }
                  />
              </ListItem>
              <Divider />
            </React.Fragment>
            )
            :
            <div
              style={{ minHeight: 200, display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
              <div style={{ textAlign: 'center', fontWeight: 600, fontSize: 36, opacity: .7 }}>No match</div>
            </div>
          }
        </List>
      </TemplateDialog>
    </div>
  );
}
