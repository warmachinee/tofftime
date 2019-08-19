import React from 'react';
import { makeStyles, createMuiTheme, withStyles } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import * as API from './../../api'
import * as COLOR from './../../api/palette'

import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import CloudUploadIcon from '@material-ui/icons/CloudUpload';

const useStyles = makeStyles(theme => ({
  margin: {
    width: '100%',
    margin: '4px 0',
    [theme.breakpoints.up(500)]: {
      margin: theme.spacing(1,0),
    },
  },
  title: {
    textAlign: 'center', color: COLOR.primary[900],
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
    backgroundColor: COLOR.grey[400],
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
    color: theme.palette.getContrastText(COLOR.primary[500]),
    backgroundColor: COLOR.primary[700],
    '&:hover': {
      backgroundColor: COLOR.primary[900],
    },
  },
}))(Button);

const StyledIconButton = withStyles(theme => ({
  root: {
    backgroundColor: COLOR.grey[400],
    '&:hover': {
      backgroundColor: COLOR.grey[100],
    },
  },
}))(IconButton);

const theme = createMuiTheme({
  palette: {
    primary: COLOR.primary,
  },
});

export default function EditPage(props){
  const classes = useStyles();
  const { token, setCSRFToken, handleSnackBar, handleClose, action ,pageData, pageid } = props
  const [ pageName, setPageName ] = React.useState( action === 'edit'? ( pageData ? pageData.pagename : '' ) : '' )
  const [ selectedFile, setSelectedFile ] = React.useState(null);
  const [ selectedColor, setSelectedColor ] = React.useState(action === 'edit'? ( pageData ? pageData.color : 'primary' ) : 'primary' );
  const [ tempFile, setTempFile ] = React.useState(null)
  const [ fileHover, handleFileHover ] = React.useState(false);
  const [ buttonHover, setButtonHover ] = React.useState(null)
  const [ anchorEl, setAnchorEl ] = React.useState(null);
  const imgRef = React.useRef(null)
  const matchPicture = action === 'edit'? pageData.logo : null

  const colorsPicker = [
    'primary',
    'secondary',
    'red',
    'pink',
    'purple',
    'deepPurple',
    'indigo',
    'blue',
    'lightBlue',
    'cyan',
    'teal',
    'green',
    'lightGreen',
    'lime',
    'yellow',
    'amber',
    'orange',
    'deepOrange',
    'brown',
    'grey',
    'blueGrey'
  ]

  function handleSelectColor(color){
    setSelectedColor(color)
    handleMenuClose()
  }

  function handleMenuClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleMenuClose() {
    setAnchorEl(null);
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

  async function handleEditPage(){
    const resToken = token? token : await API.xhrGet('getcsrf')
    await API.xhrPost(
      token? token : resToken.token,
      'ppagesystem', {
        action: 'edit',
        pagename: pageName,
        pageid: pageid,
        color: selectedColor
    }, (csrf, d) =>{
      setCSRFToken(csrf)
      handleEditPicture(csrf, d)
    })
  }

  async function handleEditPicture(csrf, d){
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
      if(d.status === 'success'){
        handleClose()
      }
    }
  }

  return(
    <div style={{ paddingTop: 8 }}>
      <Typography component="div" style={{ marginBottom: 24 }}>
        <Box className={classes.title} fontWeight={600} m={1}>
          Create page
        </Box>
      </Typography>
      <div>
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
        <Button variant="outlined" onClick={handleMenuClick}
          style={{
            marginTop: 8,
            color: COLOR[selectedColor][600],
            backgroundColor: buttonHover ? COLOR[selectedColor][100] : 'inherit',
            transition: '.2s'
          }}
          onMouseEnter={()=>setButtonHover(true)}
          onMouseLeave={()=>setButtonHover(false)}>
          <div style={{ width: 16, height: 16, backgroundColor: COLOR[selectedColor][600], marginRight: 12, borderRadius: '50%' }}></div>
          { selectedColor? selectedColor : 'Color' }
        </Button>
        { ( selectedFile || matchPicture )?
          <div style={{ position: 'relative', marginTop: 16, marginBottom: 8, border: `1px solid ${COLOR.grey[400]}` }}
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
                    <CloudUploadIcon fontSize="large" style={{ color: COLOR.primary[400] }}/>
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
                  <CloudUploadIcon fontSize="large" style={{ color: COLOR.primary[500] }}/>
                </StyledIconButton>
                <div style={{ flex: 1 }} />
              </div>
              <div style={{ flex: 1 }} />
            </div>
          </div>
        }

        <GreenButton variant="contained" color="primary" className={classes.button}
          onClick={handleEditPage}>
          Save
        </GreenButton>
      </div>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        { colorsPicker.map( c =>
          <MenuItem onClick={()=>handleSelectColor(c)}>
            <div style={{ width: 16, height: 16, backgroundColor: COLOR[c][600], marginRight: 12, borderRadius: '50%' }}></div>
            {c}
          </MenuItem>
        )}
      </Menu>
    </div>
  );
}
