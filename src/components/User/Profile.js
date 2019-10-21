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
  loader: () => import(/* webpackChunkName: "TemplateDialog" */'./../TemplateDialog'),
  loading: () => null
});

const LabelText = Loadable({
  loader: () => import(/* webpackChunkName: "LabelText" */'./../LabelText'),
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
  const [ editting, setEditting ] = React.useState(false)
  const [ changePasswordState, setChangePasswordState ] = React.useState(false)
  const [ edittingData, setEdittingData ] = React.useState({
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
        return ( sess && sess.language === 'TH' ) ? "สาธารณะ" : 'Public'
        break;
      case privacy === 'friend':
        return ( sess && sess.language === 'TH' ) ? "เพื่อน" : 'Friend'
        break;
      default:
        return ( sess && sess.language === 'TH' ) ? "ส่วนตัว" : 'Private'
    }
  }

  function toggleChangePassword(){
    setChangePasswordState(!changePasswordState)
  }

  function toggleEditting(){
    setEditting(!editting)
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
    setEdittingData({ ...edittingData, tel: num.substring(1,4) + num.substring(6,9) + num.substring(12,16)})
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

    if(accountData.nickname !== edittingData.displayname){
      Object.assign(sendObj, { displayname: edittingData.displayname });
    }

    if(accountData.tel !== edittingData.tel){
      Object.assign(sendObj, { tel: edittingData.tel });
    }

    if(accountData.gender !== edittingData.gender){
      Object.assign(sendObj, { gender: edittingData.gender });
    }

    if(accountData.fullname !== edittingData.fullname){
      Object.assign(sendObj, { fullname: edittingData.fullname });
    }

    if(accountData.lastname !== edittingData.lastname){
      Object.assign(sendObj, { lastname: edittingData.lastname });
    }

    if(accountData.privacy !== edittingData.privacy){
      Object.assign(sendObj, { privacy: edittingData.privacy });
    }

    if(accountData.birthdate){
      if(API._dateSendToAPI(accountData.birthdate) !== API._dateSendToAPI(edittingData.birthdate)){
        Object.assign(sendObj, { birthdate: API._dateSendToAPI(edittingData.birthdate) });
      }
    }else{
      Object.assign(sendObj, { birthdate: API._dateSendToAPI(edittingData.birthdate) });
    }

    if(accountData.favgolf !== edittingData.favgolf){
      Object.assign(sendObj, { loftdrive: edittingData.favgolf });
    }

    if(edittingData.password !== edittingData.changePassword){
      setErrorPassword({
        ...errorPassword,
        oldNew: false,
      })
      if(edittingData.changePassword === edittingData.confirmPassword){
        Object.assign(sendObj, { originalpass: edittingData.changePassword });
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

    if(edittingData.password === edittingData.changePassword){
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
        setEditting(false)
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
      variant: status === 'success' ? 'success' : 'error',
      autoHideDuration: status === 'success'? 2000 : 5000
    })
    await handleFetchInfo()
    if(status === 'success'){
      setEditting(false)
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
      setEdittingData({
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
            <IconButton onClick={()=>window.history.go(-1)}>
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
              <IconButton onClick={()=>window.history.go(-1)}>
                <ChevronLeftIcon fontSize="large"/>
              </IconButton>
              <BTN.PrimaryText onClick={toggleEditting}>
                {
                  editting ?
                  ( ( sess && sess.language === 'TH' ) ? "เสร็จ" : 'Done' )
                  :
                  ( ( sess && sess.language === 'TH' ) ? "แก้ไข" : 'Edit' )
                }
              </BTN.PrimaryText>
            </div>
            <div className={classes.imageGrid}>
              { editting ?
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
                      { ( sess && sess.language === 'TH' ) ? "อัพโหลดรูป" : 'Upload' }
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
            { editting ?
              <List style={{ marginTop: 16 }}>
                <ListItem>
                  <TextField
                    fullWidth
                    label={ ( sess && sess.language === 'TH' ) ? "ชื่อ" : 'First name' }
                    className={classes.margin}
                    value={edittingData.fullname}
                    onChange={e => setEdittingData({ ...edittingData, fullname: e.target.value})}
                    onKeyPress={e =>handleKeyPress(e)}
                    onFocus={e => e.target.select()}
                  />
                </ListItem>
                <ListItem>
                  <TextField
                    fullWidth
                    label={ ( sess && sess.language === 'TH' ) ? "นามสกุล" : 'Last name' }
                    className={classes.margin}
                    value={edittingData.lastname}
                    onChange={e => setEdittingData({ ...edittingData, lastname: e.target.value})}
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

            { editting &&
              <List>
                <ListItem>
                  <TextField
                    fullWidth
                    label={ ( sess && sess.language === 'TH' ) ? "ชื่อเล่น" : 'Nickname' }
                    className={classes.margin}
                    value={edittingData.displayname}
                    onChange={e => setEdittingData({ ...edittingData, displayname: e.target.value})}
                    onKeyPress={e =>handleKeyPress(e)}
                    onFocus={e => e.target.select()}
                  />
                </ListItem>
              </List>
            }

            { !editting &&
              <Typography variant="subtitle2" className={classes.email}>
                { ( sess && sess.language === 'TH' ) ? "อีเมล" : 'email' } : {accountData.email}
              </Typography>
            }

            { editting ?
              <FormControl component="fieldset" className={classes.margin}
                style={{
                  width: '100%', border: '1px rgba(0, 0, 0, 0.23) solid',
                  padding: '4px 16px 8px 24px',
                  borderRadius: 4, boxSizing: 'border-box'
                }}>
                <FormLabel component="legend" style={{ marginLeft: 16 }}>
                  { ( sess && sess.language === 'TH' ) ? "ความเป็นส่วนตัว" : 'Privacy' }
                </FormLabel>
                <RadioGroup value={edittingData.privacy} onChange={e => setEdittingData({ ...edittingData, privacy: e.target.value})} row>
                  <FormControlLabel
                    value={'public'}
                    control={<Radio />}
                    label={ ( sess && sess.language === 'TH' ) ? "สาธารณะ" : 'Public' }
                    labelPlacement="end"
                  />
                  <FormControlLabel
                    value={'friend'}
                    control={<Radio />}
                    label={ ( sess && sess.language === 'TH' ) ? "เพื่อน" : 'Friend' }
                    labelPlacement="end"
                  />
                  <FormControlLabel
                    value={'private'}
                    control={<Radio />}
                    label={ ( sess && sess.language === 'TH' ) ? "ส่วนตัว" : 'Private' }
                    labelPlacement="end"
                  />
                </RadioGroup>
              </FormControl>
              :
              <List className={classes.listItem}>
                <ListItem>
                  <Typography variant="subtitle1" className={classes.name} style={{ marginRight: 16 }}>
                    { ( sess && sess.language === 'TH' ) ? "ความเป็นส่วนตัว" : 'Privacy' } : {getPrivacy(accountData.privacy)}
                  </Typography>
                </ListItem>
              </List>
            }

            { sess && sess.typeid === 'user' &&
              <List className={classes.listItem}>
                <ListItem button onClick={toggleChangePassword}>
                  <Typography variant="subtitle1" className={classes.name} style={{ marginRight: 16 }}>
                    { ( sess && sess.language === 'TH' ) ? "เปลี่ยนรหัสผ่าน" : 'Change password' }
                  </Typography>
                </ListItem>
              </List>
            }

            { editting ?
              <List>
                <ListItem style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    WebkitFlexWrap: 'wrap',
                    boxSizing: 'border-box',
                  }}>
                  <Select
                    className={classes.margin}
                    value={edittingData.gender}
                    onChange={e => setEdittingData({ ...edittingData, gender: e.target.value})}
                    input={<OutlinedInput />}
                  >
                    <MenuItem value='-'>
                      { ( sess && sess.language === 'TH' ) ? "เพศ" : 'Gender' }
                    </MenuItem>
                    <MenuItem value='male'>
                      { ( sess && sess.language === 'TH' ) ? "ชาย" : 'Male' }
                    </MenuItem>
                    <MenuItem value='female'>
                      { ( sess && sess.language === 'TH' ) ? "หญิง" : 'Female' }
                    </MenuItem>
                  </Select>
                  <div style={{ width: 24 }} />
                  <OutlinedInput
                    className={classes.margin}
                    inputComponent={TextMaskCustom}
                    value={edittingData.tel}
                    placeholder={ ( sess && sess.language === 'TH' ) ? "เบอร์โทรศัพท์" : 'Phone number' }
                    onChange={e => handlePhoneNumber(e.target.value)}
                    onKeyPress={e =>handleKeyPress(e)}
                  />
                </ListItem>
              </List>
              :
              <List className={classes.listItem}>
                <ListItem>
                  <Typography variant="subtitle1" className={classes.name} style={{ marginRight: 16 }}>
                    { ( sess && sess.language === 'TH' ) ? "เพศ" : 'Gender' } : {accountData.gender}
                  </Typography>
                </ListItem>
                <ListItem>
                  <Typography variant="subtitle1" className={classes.name}>
                    { ( sess && sess.language === 'TH' ) ? "เบอร์โทรศัพท์" : 'Phone number' } : {accountData.tel}
                  </Typography>
                </ListItem>
              </List>
            }

            { editting ?
              <List>
                <ListItem>
                  <ThemeProvider theme={datePickers}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDatePicker
                        clearable
                        disableFuture
                        className={classes.margin}
                        label={ ( sess && sess.language === 'TH' ) ? "วันเกิด" : 'Birthday' }
                        openTo="year"
                        inputVariant="outlined"
                        format="dd/MM/yyyy"
                        value={edittingData.birthdate}
                        onChange={date => setEdittingData({ ...edittingData, birthdate: date})}
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
                    { ( sess && sess.language === 'TH' ) ? "อายุ" : 'Age' } :
                    {accountData.birthdate && ( new Date().getFullYear() - new Date(accountData.birthdate).getFullYear())}
                  </Typography>
                </ListItem>
                <ListItem>
                  <Typography variant="subtitle1" className={classes.name}>
                    { ( sess && sess.language === 'TH' ) ? "วันเกิด" : 'Birthday' } :
                    {accountData.birthdate && API._dateToString(accountData.birthdate)}
                  </Typography>
                </ListItem>
              </List>
            }

            { editting ?
              <List>
                <ListItem>
                  <TextField
                    fullWidth
                    variant="outlined"
                    className={classes.margin}
                    label={ ( sess && sess.language === 'TH' ) ? "อุปกรณ์ที่ชอบใช้" : 'Golf favorite equipment' }
                    value={edittingData.favgolf}
                    onChange={e => setEdittingData({ ...edittingData, favgolf: e.target.value})}
                    onKeyPress={e =>handleKeyPress(e)}
                    onFocus={e => e.target.select()}
                  />
                </ListItem>
              </List>
              :
              <List className={classes.listItem}>
                <ListItem>
                  <Typography variant="subtitle1" className={classes.name}>
                    { ( sess && sess.language === 'TH' ) ? "อุปกรณ์ที่ใช้" : 'Equipment' } : {accountData.favgolf}
                  </Typography>
                </ListItem>
              </List>
            }

            <div style={{ display: 'flex', marginTop: 36, justifyContent: 'flex-end' }}>
              { editting &&
                <BTN.Primary style={{ padding: '8px 36px'}} onClick={handleSave}>
                  { ( sess && sess.language === 'TH' ) ? "บันทึก" : 'Save' }
                </BTN.Primary>
              }
            </div>

          </Paper>
        )
      }
      { !pageOrganizer &&
        <TemplateDialog open={changePasswordState} handleClose={toggleChangePassword} maxWidth={500}>
          <LabelText text={ ( sess && sess.language === 'TH' ) ? "เปลี่ยนรหัสผ่าน" : 'Change password' } />
          <div style={{ marginTop: 24, marginBottom: 24 }}>
            <ThemeProvider theme={theme}>
              <TextField
                autoFocus={changePasswordState}
                fullWidth
                label={ ( sess && sess.language === 'TH' ) ? "รหัสผ่านเก่า" : 'Old password' }
                variant="outlined"
                type="password"
                className={classes.margin}
                onChange={e => setEdittingData({ ...edittingData, password: e.target.value})}
                onKeyPress={e =>handleKeyPress(e)}
                onFocus={e => e.target.select()}
              />
              <TextField
                fullWidth
                label={ ( sess && sess.language === 'TH' ) ? "รหัสผ่านใหม่" : 'New password' }
                variant="outlined"
                type="password"
                error={errorPassword.oldNew}
                helperText={errorPassword.oldNew && "New password is same as old password."}
                className={classes.margin}
                onChange={e => setEdittingData({ ...edittingData, changePassword: e.target.value})}
                onKeyPress={e =>handleKeyPress(e)}
                onFocus={e => e.target.select()}
              />
              <TextField
                fullWidth
                label={ ( sess && sess.language === 'TH' ) ? "ยืนยันรหัสผ่าน่" : 'Confirm password' }
                variant="outlined"
                type="password"
                error={errorPassword.changeConfirm}
                helperText={errorPassword.changeConfirm && "Confirm password is not same as new password."}
                className={classes.margin}
                onChange={e => setEdittingData({ ...edittingData, confirmPassword: e.target.value})}
                onKeyPress={e =>handleKeyPress(e)}
                onFocus={e => e.target.select()}
              />
            </ThemeProvider>
            <BTN.Primary style={{ padding: '16px 36px', width: '100%', marginTop: 24 }}
              onClick={handleSave}>
              { ( sess && sess.language === 'TH' ) ? "ยืนยัน" : 'Confirm' }
            </BTN.Primary>
          </div>
        </TemplateDialog>
      }
    </div>
  );
}
