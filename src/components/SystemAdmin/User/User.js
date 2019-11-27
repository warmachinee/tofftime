import React from 'react';
import Loadable from 'react-loadable';
import Fuse from 'fuse.js';
import { makeStyles, withStyles, createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import * as API from './../../../api'
import { primary, grey } from './../../../api/palette'

import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Collapse from '@material-ui/core/Collapse';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';

import CreateIcon from '@material-ui/icons/Create';
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

import { LDCircular } from './../../loading/LDCircular'

const TemplateDialog = Loadable({
  loader: () => import(/* webpackChunkName: "TemplateDialog" */'./../../Utils/Dialog/TemplateDialog'),
  loading: () => <LDCircular />
});

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    width: '100%',
    marginTop: 36,
  },
  listRoot: {
    position: 'relative',
    width: '100%',
    cursor: 'pointer',
    maxHeight: '100%'
  },
  margin: {
    margin: theme.spacing(1),
    width: '100%'
  },
  listText:{
    width: '100%',
    textAlign: 'left'
  },
  createGrid: {
    display: 'flex',
    flexDirection: 'flex-end',
    marginBottom: 24
  },
  createButton: {
    marginTop: 'auto',
    padding: '8px 16px 8px 0',
    width: '100%',
    [theme.breakpoints.up(500)]: {
      width: 'auto'
    },
  },
  expandIcon: {
    marginRight: 8,
    marginLeft: 12
  },
  textFieldGrid: {
    padding: 16,
    marginBottom: 24,
    borderRadius: 4,
    border: `1.5px solid ${primary[600]}`,
    [theme.breakpoints.up(600)]: {
      padding: 24,
    },
  },
  childGrid: {
    maxWidth: 600,
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  buttonGrid: {
    display: 'flex',
  },
  confirmButton: {
    width: '100%',
    marginTop: 16,
    padding: theme.spacing(1, 3),
    [theme.breakpoints.up(500)]: {
      width: 'auto'
    },
  },
  textField: {
    width: '100%',
    margin: theme.spacing(1, 0)
  },
  searchBox: {
    width: '100%',
    [theme.breakpoints.up(500)]: {
      width: 'auto'
    },
  },
  headerText: {
    textAlign: 'center', color: primary[900],
    fontSize: 24,
    [theme.breakpoints.up(500)]: {
      fontSize: 28,
    },
  },
  notice: {
    fontFamily: 'monospace',
    color: grey[600],
    fontWeight: 600,
  },
  createIcon: {
    color: primary[600]
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

}))

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

export default function User(props){
  const classes = useStyles();
  const { sess, token, setCSRFToken, matchid, handleSnackBar, isSupportWebp } = props

  const [ open, setOpen ] = React.useState(false)
  const [ data, setData ] = React.useState(null)
  const [ editing, setEditing ] = React.useState(false)
  const [ editingUser, setEditingUser ] = React.useState(null)
  const [ dataSliced, setDataSliced ] = React.useState(10)
  const [ createState, setCreateState ] = React.useState(false)
  const [ searchUser, setSearchUser ] = React.useState('')
  const [ fullname, setFullname ] = React.useState('')
  const [ lastname, setLastname ] = React.useState('')
  const [ selectedFile, setSelectedFile ] = React.useState(null);
  const [ tempFile, setTempFile ] = React.useState(null)
  const [ fileHover, handleFileHover ] = React.useState(false);
  const imgRef = React.useRef(null)

  function handleOpen(d){
    setOpen(!open)
    setEditingUser(d)
    setFullname(d.fullname)
    setLastname(d.lastname)
  }

  function handleClose(){
    setOpen(false)
    setFullname('')
    setLastname('')
  }

  function handleCreateCollapse(){
    setCreateState(!createState)
    if(createState === false){
      setFullname('')
      setLastname('')
    }
  }

  function handleSearch(){
    if(data){
      var options = {
        shouldSort: true,
        caseSensitive: true,
        minMatchCharLength: 2,
        keys: [
          "fullname",
          "lastname"
        ]
      }
      var fuse = new Fuse(data, options)
      var result = fuse.search(searchUser)
      return result
    }
  }

  function handleMore(){
    if(data){
      if(searchUser){
        if( dataSliced >= handleSearch().length ){
          setDataSliced( 10 )
        }else{
          setDataSliced( dataSliced + 10 )
        }
      }else{
        if( dataSliced >= data.length ){
          setDataSliced( 10 )
        }else{
          setDataSliced( dataSliced + 10 )
        }
      }
    }
  }

  function handleMoreAll(){
    if(data){
      if(searchUser){
        if( dataSliced >= handleSearch().length ){
          setDataSliced( 10 )
        }else{
          setDataSliced( handleSearch().length )
        }
      }else{
        if( dataSliced >= data.length ){
          setDataSliced( 10 )
        }else{
          setDataSliced( data.length )
        }
      }
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

  async function handleCreatePlayer(){
    const resToken = token? token : await API._xhrGet('getcsrf')
    await API._xhrPost(
      token? token : resToken.token,
      'usersystem', {
        action: 'create',
        fullname: fullname,
        lastname: lastname
    }, (csrf, d) =>{
      setCSRFToken(csrf)
      handleSnackBar({
        state: true,
        message: d.status,
        variant: /success/.test(d.status) ? 'success' : 'error',
        autoHideDuration: /success/.test(d.status)? 2000 : 5000
      })
      try {
        handleLoadUser()
      }catch(err) { console.log(err.message) }
    })
  }

  async function handleEditUser(){
    console.log(editingUser);
    console.log({
      fullname: fullname,
      lastname: lastname,
      usertarget: editingUser.userid
    });
  }

  async function handleLoadUser(){
    const resToken = token? token : await API._xhrGet('getcsrf')
    await API._xhrPost(
      token? token : resToken.token,
      'loaduser', {
        action: 'userlist'
    }, (csrf, d) =>{
      setCSRFToken(csrf)
      setData(d)
    })
  }

  React.useEffect(()=>{
    handleLoadUser()
  },[ props.data ])

  return(
    <div className={classes.root}>
      <div className={classes.createGrid}>
        <GreenTextButton
          variant="outlined"
          className={classes.createButton}
          onClick={handleCreateCollapse}>
          <ExpandMoreIcon
            className={classes.expandIcon}
            style={{ transform: createState?'rotate(180deg)':'rotate(0deg)' }} />
          Create Player
        </GreenTextButton>
      </div>
      <Collapse in={createState} timeout="auto" unmountOnExit>
        <div className={classes.textFieldGrid}>
          <div className={classes.childGrid}>
            <ThemeProvider theme={theme}>
              <TextField
                className={classes.textField}
                variant="outlined"
                label="Full name"
                value={fullname}
                onChange={e =>setFullname(e.target.value)}
                />
              <TextField
                className={classes.textField}
                variant="outlined"
                label="Last name"
                value={lastname}
                onChange={e =>setLastname(e.target.value)}
                />
            </ThemeProvider>
            <div className={classes.buttonGrid}>
              <Typography component="div">
                <Box className={classes.notice} m={1}>
                  Fill the form and click confirm <br></br>to create a new player.
                </Box>
              </Typography>
              <div style={{ flex: 1 }} />
              <GreenButton className={classes.confirmButton} onClick={handleCreatePlayer}>Confirm</GreenButton>
          </div>
          </div>
        </div>
      </Collapse>
      <ThemeProvider theme={theme}>
        <TextField
          className={classes.searchBox}
          variant="outlined"
          placeholder={ !searchUser? "Search player" : '' }
          value={searchUser}
          onChange={e =>setSearchUser(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="primary"/>
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                { searchUser?
                  <IconButton onClick={()=>setSearchUser('')}>
                    <ClearIcon color="inherit" fontSize="small"/>
                  </IconButton>
                  :
                  <div style={{ width: 44 }}></div>
                }
              </InputAdornment>
            )
          }}
        />
      </ThemeProvider>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <GreenTextButton onClick={()=>setEditing(!editing)}>Edit</GreenTextButton>
      </div>
      <List className={classes.listRoot}>
        <ListItem role={undefined} style={{ backgroundColor: grey[900], borderRadius: 4, cursor: 'auto', }}>
          <ListItemText style={{ color: 'white', margin: '8px 0' }} className={classes.listText} primary="First name" />
          <ListItemText style={{ color: 'white', margin: '8px 0' }} className={classes.listText}
            primary={ window.innerWidth >= 500?"Last name" : '' } />
          <ListItemIcon>
            <div style={{ width: 42 }} />
          </ListItemIcon>
        </ListItem>
        { data && !data.status &&
          [
            ...(true)? data: handleSearch()
          ].slice(0, dataSliced).map(value => {
            return value && (
              <React.Fragment key={value.firstname + `(${value.userid})`}>
                <ListItem role={undefined}
                  style={{ cursor: editing? 'pointer' : 'auto' }}>
                  <ListItemText className={classes.listText} primary={value.fullname}
                    secondary={
                      window.innerWidth < 500 &&
                      <Typography component="div">
                        <Box
                          style={{
                            fontSize: 16,
                            fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
                            fontWeight: 400,
                            letterSpacing: '0.00938em'
                          }}>
                          {value.lastname}
                        </Box>
                      </Typography>
                    } />
                  { window.innerWidth >= 500 &&
                    <ListItemText className={classes.listText} primary={value.lastname} />
                  }
                  <ListItemIcon>
                    { editing?
                      <IconButton
                        onClick={()=>handleOpen(value)}>
                        <CreateIcon classes={{ root: classes.createIcon }} />
                      </IconButton>
                      :
                      <div style={{ height: 48, width: 48 }} />
                    }
                  </ListItemIcon>
                </ListItem>
                <Divider />
              </React.Fragment>
            );
          })
        }
        <ListItem role={undefined} dense style={{ display: 'flex' }}>
          { data && handleSearch().length > 10 && !searchUser &&
            <React.Fragment>
              <Button fullWidth onClick={handleMore}>
                { dataSliced >= data.length ? (
                  API._getWord(sess && sess.language).Collapse
                ):(
                  API._getWord(sess && sess.language).More
                ) }
              </Button>
              { data && dataSliced < data.length &&
                <Button fullWidth onClick={handleMoreAll}>{ API._getWord(sess && sess.language).Show_all }</Button>
              }
            </React.Fragment>
          }
          { data && handleSearch().length > 10 && searchUser &&
            <React.Fragment>
              <Button fullWidth onClick={handleMore}>
                { dataSliced >= handleSearch().length ? (
                  API._getWord(sess && sess.language).Collapse
                ):(
                  API._getWord(sess && sess.language).More
                ) }
              </Button>
              { data && dataSliced < handleSearch().length &&
                <Button fullWidth onClick={handleMoreAll}>{ API._getWord(sess && sess.language).Show_all }</Button>
              }
            </React.Fragment>
          }
        </ListItem>
        { searchUser && handleSearch().length === 0 &&
          <ListItem>
            <Typography component="div" style={{ width: '100%' }}>
              <Box style={{ textAlign: 'center', color: primary[900] }} fontWeight={500} fontSize={24} m={1}>
                No Result
              </Box>
            </Typography>
          </ListItem>
        }
      </List>

      <TemplateDialog open={open} handleClose={handleClose}>
        <div style={{ marginTop: 36 }} className={classes.childGrid}>
          <Typography component="div" style={{ marginBottom: 24 }}>
            <Box className={classes.headerText} m={1}>
              Edit user
            </Box>
          </Typography>
          { selectedFile || ( editingUser && editingUser.photopath )?
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
                  ( isSupportWebp? editingUser.photopath + '.webp': editingUser.photopath + '.jpg' )
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
              variant="outlined"
              label="Full name"
              value={fullname}
              onChange={e =>setFullname(e.target.value)}
              />
            <TextField
              className={classes.textField}
              variant="outlined"
              label="Last name"
              value={lastname}
              onChange={e =>setLastname(e.target.value)}
              />
          </ThemeProvider>
          <div className={classes.buttonGrid}>
            <Typography component="div">
              <Box className={classes.notice} m={1}>
                Fill the form and click save <br></br>to edit.
              </Box>
            </Typography>
            <div style={{ flex: 1 }} />
            <GreenButton className={classes.confirmButton} onClick={handleEditUser}>Save</GreenButton>
        </div>
        </div>
      </TemplateDialog>
    </div>
  );
}
