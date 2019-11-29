import React from 'react';
import clsx from "clsx";
import Loadable from 'react-loadable';
import DateFnsUtils from '@date-io/date-fns';
import MaskedInput from 'react-text-mask';
import { makeStyles, createMuiTheme, withStyles } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import * as COLOR from './../../api/palette'

const TemplateDialog = Loadable({
  loader: () => import(/* webpackChunkName: "TemplateDialog" */'./../Utils/Dialog/TemplateDialog'),
  loading: () => null
});

const LabelText = Loadable({
  loader: () => import(/* webpackChunkName: "LabelText" */'./../Utils/LabelText'),
  loading: () => null
});

const EditPage = Loadable({
  loader: () => import(/* webpackChunkName: "EditPage" */'./PageOrganizer/EditPage'),
  loading: () => null
});

import {
  Paper,
  Avatar,
  Typography,
  IconButton,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  Box,
  List,
  ListItem,
  ListItemIcon
} from '@material-ui/core';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import EditIcon from '@material-ui/icons/Edit';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: 36,
    marginBottom: 48,
    display: 'flex',
    width: '100%',
    margin: 'auto',
    flexDirection: 'column',
    [theme.breakpoints.up(900)]: {
      flexDirection: 'row',
    },
  },
  paper: {
    width: '100%',
    maxWidth: 600,
    padding: theme.spacing(3, 2),
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 0,
    margin: 'auto',
    boxSizing: 'border-box'
  },
  imageGrid: {
    margin: 16,
    display: 'flex',
    justifyContent: 'center'
  },
  avatar: {
    fontSize: 150
  },
  avatarImage: {
    width: 150,
    height: 150,
  },
  name: {
    cursor: 'pointer',
    textAlign: 'center'
  },
  email: {
    textAlign: 'center',
    color: COLOR.grey[400]
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
  center: {
    display: 'flex',
    justifyContent: 'center'
  },
  margin: {
    margin: 4,
    [theme.breakpoints.up(500)]: {
      margin: theme.spacing(1),
    },
  },
  itle: {
    textAlign: 'center', color: COLOR.grey[800],
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
  listItem: {
    width: '100%',
    maxWidth: 300,
    margin: 'auto',
    padding: 0
  },

}));

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

const datePickers = createMuiTheme({
  palette: {
    primary: COLOR.primary,
  },
  overrides: {
    MuiDialog: {
      paperScrollPaper: {
        maxHeight: 'calc(100% - 24px)'
      }
    },
    MuiPickersToolbar: {
      toolbar: {
        display: window.innerHeight >= 520? 'flex' : 'none',
      }
    },
    MuiPickersModal: {
      dialog: {
        overflow: 'auto'
      }
    }
  },
});

function TextMaskCustom(props) {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={ref => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={['(', /[0-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, ' ', '-', ' ',/\d/, /\d/, /\d/, /\d/]}
      placeholderChar={'\u2000'}
    />
  );
}

export default function Profile(props) {
  const classes = useStyles();
  const {
    API, BTN, sess, isSupportWebp, token, setCSRFToken, handleAccountData, accountData, handleSnackBar,
    pageOrganizer, pageData
  } = props
  const [ editing, setEditing ] = React.useState(false)
  const [ changePasswordState, setChangePasswordState ] = React.useState(false)
  const [ editingData, setEditingData ] = React.useState({
    fullname: accountData && accountData.fullname ? accountData.fullname : '',
    lastname: accountData && accountData.lastname ? accountData.lastname : '',
    displayname: accountData && accountData.nickname ? accountData.nickname : '',
    tel: accountData && accountData.tel ? accountData.tel : '',
    gender: accountData && accountData.gender ? accountData.gender : '',
    birthdate: accountData && accountData.birthdate ? new Date(accountData.birthdate) : null,
    favgolf: accountData && accountData.favgolf ? accountData.favgolf : '',
    privacy: accountData && accountData.privacy ? accountData.privacy : 'public',
    password: '',
    changePassword: '',
    confirmPassword: '',
  })
  const [ errorPassword, setErrorPassword ] = React.useState({
    oldNew: false,
    changeConfirm: false
  })

  const [ tempFile, setTempFile ] = React.useState(null)
  const [ selectedFile, setSelectedFile ] = React.useState(null);

  function getPrivacy(privacy){
    switch (true) {
      case privacy === 'public':
        return API._getWord(sess && sess.language).Public
        break;
      case privacy === 'friend':
        return API._getWord(sess && sess.language).Friend
        break;
      default:
        return API._getWord(sess && sess.language).Private
    }
  }

  function toggleChangePassword(){
    setChangePasswordState(!changePasswordState)
  }

  function toggleEditing(){
    setEditing(!editing)
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

  function handlePhoneNumber(num){
    setEditingData({ ...editingData, tel: num.substring(1,4) + num.substring(6,9) + num.substring(12,16)})
  }

  function handleKeyPress(e){
    if(e.key === 'Enter'){
      handleSave()
    }
  }

  async function handleSave(){
    const resToken = token? token : await API._xhrGet('getcsrf')
    const sendObj = {
      action: 'editprofile',
    };

    if(accountData.nickname !== editingData.displayname){
      Object.assign(sendObj, { displayname: editingData.displayname });
    }

    if(accountData.tel !== editingData.tel){
      Object.assign(sendObj, { tel: editingData.tel });
    }

    if(accountData.gender !== editingData.gender){
      Object.assign(sendObj, { gender: editingData.gender });
    }

    if(accountData.fullname !== editingData.fullname){
      Object.assign(sendObj, { fullname: editingData.fullname });
    }

    if(accountData.lastname !== editingData.lastname){
      Object.assign(sendObj, { lastname: editingData.lastname });
    }

    if(accountData.privacy !== editingData.privacy){
      Object.assign(sendObj, { privacy: editingData.privacy });
    }

    if(accountData.birthdate){
      if(API._dateSendToAPI(accountData.birthdate) !== API._dateSendToAPI(editingData.birthdate)){
        Object.assign(sendObj, { birthdate: API._dateSendToAPI(editingData.birthdate) });
      }
    }else{
      Object.assign(sendObj, { birthdate: API._dateSendToAPI(editingData.birthdate) });
    }

    if(accountData.favgolf !== editingData.favgolf){
      Object.assign(sendObj, { loftdrive: editingData.favgolf });
    }

    if(editingData.password !== editingData.changePassword){
      setErrorPassword({
        ...errorPassword,
        oldNew: false,
      })
      if(editingData.changePassword === editingData.confirmPassword){
        Object.assign(sendObj, { originalpass: editingData.changePassword });
        setErrorPassword({
          oldNew: false,
          changeConfirm: false
        })
      }else{
        setErrorPassword({
          ...errorPassword,
          changeConfirm: true,
        })
      }
    }

    if(editingData.password === editingData.changePassword){
      setErrorPassword({
        ...errorPassword,
        oldNew: true,
      })
    }

    if(Object.keys(sendObj).length > 1){

      await API._xhrPost(
        token? token : resToken.token,
        'uusersystem', {
          ...sendObj
      }, (csrf, d) =>{
        setCSRFToken(csrf)
        if(/success/.test(d.status)){
          handleEditPicture(csrf, d)
        }
      })
    }else{
      if(selectedFile){
        handleEditPicture(token? token : resToken.token, '')
      }else{
        setEditing(false)
      }
    }
  }

  async function handleEditPicture(csrf, d){
    var status = d.status
    const formData = new FormData()
    if(selectedFile){
      formData.append('profileimage', selectedFile)
      const response = await API._fetchPostFile(
        'uusersystem',
        `?_csrf=${csrf}`, {
        action: 'uploadimg',
        photopath: true,
      }, formData)
      const res = await API._xhrGet('getcsrf')
      setCSRFToken( res.token )
      status = response.status
    }else{
      setCSRFToken(csrf)
    }
    handleSnackBar({
      state: true,
      message: status,
      variant: /success/.test(status) ? 'success' : 'error',
      autoHideDuration: /success/.test(status)? 2000 : 5000
    })
    await handleFetchInfo()
    if(/success/.test(status)){
      setEditing(false)
    }
  }

  async function handleFetchInfo(){
    const resToken = token? token : await API._xhrGet('getcsrf')
    await API._xhrPost(
      token? token : resToken.token,
      'loadusersystem', {
        action: 'info'
    }, (csrf, d) =>{
      setCSRFToken(csrf)
      handleAccountData(d)
      setEditingData({
        fullname: d.fullname ? d.fullname : '',
        lastname: d.lastname ? d.lastname : '',
        displayname: d.nickname ? d.nickname : '',
        tel: d.tel ? d.tel : '',
        gender: d.gender ? d.gender : '',
        birthdate: d.birthdate ? new Date(d.birthdate) : null,
        favgolf: d.favgolf ? d.favgolf : '',
        privacy: d.privacy ? d.privacy : 'public',
      })
    })
  }

  React.useEffect(()=>{
    if(!(sess && accountData)){
      handleFetchInfo()
    }
    if(sess && sess.status !== 1){
      window.location.pathname = '/'
    }
  },[ ])

  return (
    <div className={classes.root}>
      { pageOrganizer ?
        <Paper className={classes.paper}>
          <div>
            <IconButton onClick={()=>window.history.back()}>
              <ChevronLeftIcon fontSize="large"/>
            </IconButton>
          </div>
          { pageData &&
            <EditPage {...props} />
          }
        </Paper>
        :
        ( accountData &&
          <Paper className={classes.paper}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <IconButton onClick={()=>window.history.back()}>
                <ChevronLeftIcon fontSize="large"/>
              </IconButton>
              <BTN.PrimaryText onClick={toggleEditing}>
                {
                  editing ?
                  ( API._getWord(sess && sess.language).Done )
                  :
                  ( API._getWord(sess && sess.language).Edit )
                }
              </BTN.PrimaryText>
            </div>
            <div className={classes.imageGrid}>
              { editing ?
                <IconButton>
                  <input className={classes.inputFile} type="file" accept="image/png, image/jpeg" onChange={handlePicture} />
                  { accountData.photopath ?
                    <Avatar className={classes.avatarImage}
                      src={
                        selectedFile ?
                        tempFile
                        :
                        API._getPictureUrl(accountData.photopath) + ( isSupportWebp? '.webp' : '.jpg' ) + '#' + new Date().toISOString()
                      } />
                    :
                    ( selectedFile ?
                      <Avatar className={classes.avatarImage} src={tempFile} />
                      :
                      <AccountCircleIcon classes={{ root: classes.avatar }} />
                    )
                  }
                  <div style={{ position: 'absolute', color: 'black', bottom: -16, display: 'flex' }}>
                    <EditIcon fontSize="small"/>
                    <Typography variant="subtitle1" style={{ marginRight: 8, fontWeight: 600 }}>
                      { API._getWord(sess && sess.language).Upload_image }
                    </Typography>
                  </div>
                </IconButton>
                :
                (
                  <div style={{ padding: 12 }}>
                    <BTN.NoStyleLink to={`/user/timeline/${accountData.userid}`}>
                      {
                        accountData.photopath ?
                        <Avatar className={classes.avatarImage}
                          style={{ cursor: 'pointer' }}
                          src={API._getPictureUrl(accountData.photopath) + ( isSupportWebp? '.webp' : '.jpg' ) + '#' + new Date().toISOString()} />
                        :
                        <AccountCircleIcon
                          style={{ cursor: 'pointer' }}
                          classes={{ root: classes.avatar }} />
                      }
                    </BTN.NoStyleLink>
                  </div>
                )
              }
            </div>
            { editing ?
              <List style={{ marginTop: 16 }}>
                <ListItem>
                  <TextField
                    fullWidth
                    label={ API._getWord(sess && sess.language).First_name }
                    className={classes.margin}
                    value={editingData.fullname}
                    onChange={e => setEditingData({ ...editingData, fullname: e.target.value})}
                    onKeyPress={e =>handleKeyPress(e)}
                    onFocus={e => e.target.select()}
                  />
                </ListItem>
                <ListItem>
                  <TextField
                    fullWidth
                    label={ API._getWord(sess && sess.language).Last_name }
                    className={classes.margin}
                    value={editingData.lastname}
                    onChange={e => setEditingData({ ...editingData, lastname: e.target.value})}
                    onKeyPress={e =>handleKeyPress(e)}
                    onFocus={e => e.target.select()}
                  />
                </ListItem>
              </List>
              :
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  WebkitFlexWrap: 'wrap',
                  boxSizing: 'border-box',
                  justifyContent: 'center'
                }}>
                <Typography variant="h5" className={classes.name} style={{ marginRight: 8 }}>
                  {accountData.fullname} {accountData.lastname}
                </Typography>
                { accountData.nickname !== '-' ?
                  <Typography gutterBottom variant="h6" className={classes.name}>
                    {' • '}( {accountData.nickname} )
                  </Typography>
                  :
                  null
                }
              </div>
            }

            { editing &&
              <List>
                <ListItem>
                  <TextField
                    fullWidth
                    label={ API._getWord(sess && sess.language).Nickname }
                    className={classes.margin}
                    value={editingData.displayname}
                    onChange={e => setEditingData({ ...editingData, displayname: e.target.value})}
                    onKeyPress={e =>handleKeyPress(e)}
                    onFocus={e => e.target.select()}
                  />
                </ListItem>
              </List>
            }

            { !editing &&
              <Typography variant="subtitle2" className={classes.email}>
                { API._getWord(sess && sess.language).email } : {accountData.email}
              </Typography>
            }

            { editing ?
              <FormControl component="fieldset" className={classes.margin}
                style={{
                  width: '100%', border: '1px rgba(0, 0, 0, 0.23) solid',
                  padding: '4px 16px 8px 24px',
                  borderRadius: 4, boxSizing: 'border-box'
                }}>
                <FormLabel component="legend" style={{ marginLeft: 16 }}>
                  { API._getWord(sess && sess.language).Privacy }
                </FormLabel>
                <RadioGroup value={editingData.privacy} onChange={e => setEditingData({ ...editingData, privacy: e.target.value})} row>
                  <FormControlLabel
                    value={'public'}
                    control={<Radio />}
                    label={ API._getWord(sess && sess.language).Public }
                    labelPlacement="end"
                  />
                  <FormControlLabel
                    value={'friend'}
                    control={<Radio />}
                    label={ API._getWord(sess && sess.language).Friend }
                    labelPlacement="end"
                  />
                  <FormControlLabel
                    value={'private'}
                    control={<Radio />}
                    label={ API._getWord(sess && sess.language).Private }
                    labelPlacement="end"
                  />
                </RadioGroup>
              </FormControl>
              :
              <List className={classes.listItem}>
                <ListItem>
                  <Typography variant="subtitle1" className={classes.name} style={{ marginRight: 16 }}>
                    { API._getWord(sess && sess.language).Privacy } : {getPrivacy(accountData.privacy)}
                  </Typography>
                </ListItem>
              </List>
            }

            { sess && sess.typeid === 'user' &&
              <List className={classes.listItem}>
                <ListItem button onClick={toggleChangePassword}>
                  <Typography variant="subtitle1" className={classes.name} style={{ marginRight: 16 }}>
                    { API._getWord(sess && sess.language).Change_password }
                  </Typography>
                </ListItem>
              </List>
            }

            { editing ?
              <List>
                <ListItem style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    WebkitFlexWrap: 'wrap',
                    boxSizing: 'border-box',
                  }}>
                  <Select
                    className={classes.margin}
                    value={editingData.gender}
                    onChange={e => setEditingData({ ...editingData, gender: e.target.value})}
                    input={<OutlinedInput />}
                  >
                    <MenuItem value='-'>
                      { API._getWord(sess && sess.language).Gender }
                    </MenuItem>
                    <MenuItem value='male'>
                      { API._getWord(sess && sess.language).Male }
                    </MenuItem>
                    <MenuItem value='female'>
                      { API._getWord(sess && sess.language).Female }
                    </MenuItem>
                  </Select>
                  <div style={{ width: 24 }} />
                  <OutlinedInput
                    className={classes.margin}
                    inputComponent={TextMaskCustom}
                    value={editingData.tel}
                    placeholder={ API._getWord(sess && sess.language).Phone_number }
                    onChange={e => handlePhoneNumber(e.target.value)}
                    onKeyPress={e =>handleKeyPress(e)}
                  />
                </ListItem>
              </List>
              :
              <List className={classes.listItem}>
                <ListItem>
                  <Typography variant="subtitle1" className={classes.name} style={{ marginRight: 16 }}>
                    { API._getWord(sess && sess.language).Gender } : {accountData.gender}
                  </Typography>
                </ListItem>
                <ListItem>
                  <Typography variant="subtitle1" className={classes.name}>
                    { API._getWord(sess && sess.language).Phone_number } : {accountData.tel}
                  </Typography>
                </ListItem>
              </List>
            }

            { editing ?
              <List>
                <ListItem>
                  <ThemeProvider theme={datePickers}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDatePicker
                        clearable
                        disableFuture
                        className={classes.margin}
                        label={ API._getWord(sess && sess.language).Birthday }
                        openTo="year"
                        inputVariant="outlined"
                        format="dd/MM/yyyy"
                        value={editingData.birthdate}
                        onChange={date => setEditingData({ ...editingData, birthdate: date})}
                        onKeyPress={e =>handleKeyPress(e)}
                      />
                    </MuiPickersUtilsProvider>
                  </ThemeProvider>
                </ListItem>
              </List>
              :
              <List className={classes.listItem}>
                <ListItem>
                  <Typography variant="subtitle1" className={classes.name}>
                    { API._getWord(sess && sess.language).Age } :
                    {accountData.birthdate && ( new Date().getFullYear() - new Date(accountData.birthdate).getFullYear())}
                  </Typography>
                </ListItem>
                <ListItem>
                  <Typography variant="subtitle1" className={classes.name}>
                    { API._getWord(sess && sess.language).Birthday } :
                    {accountData.birthdate && API._dateToString(accountData.birthdate)}
                  </Typography>
                </ListItem>
              </List>
            }

            { editing ?
              <List>
                <ListItem>
                  <TextField
                    fullWidth
                    variant="outlined"
                    className={classes.margin}
                    label={ API._getWord(sess && sess.language).Golf_favorite_equipment }
                    value={editingData.favgolf}
                    onChange={e => setEditingData({ ...editingData, favgolf: e.target.value})}
                    onKeyPress={e =>handleKeyPress(e)}
                    onFocus={e => e.target.select()}
                  />
                </ListItem>
              </List>
              :
              <List className={classes.listItem}>
                <ListItem>
                  <Typography variant="subtitle1" className={classes.name}>
                    { API._getWord(sess && sess.language).Equipment } : {accountData.favgolf}
                  </Typography>
                </ListItem>
              </List>
            }

            <div style={{ display: 'flex', marginTop: 36, justifyContent: 'flex-end' }}>
              { editing &&
                <BTN.Primary style={{ padding: '8px 36px'}} onClick={handleSave}>
                  { API._getWord(sess && sess.language).Save }
                </BTN.Primary>
              }
            </div>

          </Paper>
        )
      }
      { !pageOrganizer &&
        <TemplateDialog open={changePasswordState} handleClose={toggleChangePassword} maxWidth="xs">
          <LabelText text={ API._getWord(sess && sess.language).Change_password } />
          <div style={{ marginTop: 24, marginBottom: 24 }}>
            <ThemeProvider theme={theme}>
              <TextField
                autoFocus={changePasswordState}
                fullWidth
                label={ API._getWord(sess && sess.language).Old_password }
                variant="outlined"
                type="password"
                className={classes.margin}
                onChange={e => setEditingData({ ...editingData, password: e.target.value})}
                onKeyPress={e =>handleKeyPress(e)}
                onFocus={e => e.target.select()}
              />
              <TextField
                fullWidth
                label={ API._getWord(sess && sess.language).New_password }
                variant="outlined"
                type="password"
                error={errorPassword.oldNew}
                helperText={errorPassword.oldNew && "New password is same as old password."}
                className={classes.margin}
                onChange={e => setEditingData({ ...editingData, changePassword: e.target.value})}
                onKeyPress={e =>handleKeyPress(e)}
                onFocus={e => e.target.select()}
              />
              <TextField
                fullWidth
                label={ API._getWord(sess && sess.language).Confirm_password }
                variant="outlined"
                type="password"
                error={errorPassword.changeConfirm}
                helperText={errorPassword.changeConfirm && "Confirm password is not same as new password."}
                className={classes.margin}
                onChange={e => setEditingData({ ...editingData, confirmPassword: e.target.value})}
                onKeyPress={e =>handleKeyPress(e)}
                onFocus={e => e.target.select()}
              />
            </ThemeProvider>
            <BTN.Primary style={{ padding: '16px 36px', width: '100%', marginTop: 24 }}
              onClick={handleSave}>
              { API._getWord(sess && sess.language).Confirm }
            </BTN.Primary>
          </div>
        </TemplateDialog>
      }
    </div>
  );
}
