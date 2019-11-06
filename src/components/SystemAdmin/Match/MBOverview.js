import React from 'react';
import Loadable from 'react-loadable';
import DateFnsUtils from '@date-io/date-fns';
import { makeStyles, withStyles, createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import * as API from './../../../api'
import { primary, grey } from './../../../api/palette'

import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import CloudUploadIcon from '@material-ui/icons/CloudUpload';

import { LDCircular } from './../../loading/LDCircular'

const TemplateDialog = Loadable({
  loader: () => import(/* webpackChunkName: "TemplateDialog" */'./../../Utils/TemplateDialog'),
  loading: () => <LDCircular />
});

const Location = Loadable({
  loader: () => import(/* webpackChunkName: "Location" */'./Location'),
  loading: () => <LDCircular />
});

const MatchClass = Loadable({
  loader: () => import(/* webpackChunkName: "MatchClass" */'./MatchClass'),
  loading: () => <LDCircular />
});

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    padding: theme.spacing(1, 2),
    width: '100%',
    marginTop: 24,
    boxSizing: 'border-box',
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: 900
  },
  margin: {
    width: '100%',
    marginTop: 8
  },
  grid: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.up(650)]: {
      flexDirection: 'row'
    },
  },
  gridChild1: {
    width: '100%',
    [theme.breakpoints.up(650)]: {
      width: '60%',
    },
  },
  gridChild2: {
    position: 'relative',
    width: '100%',
    [theme.breakpoints.up(650)]: {
      width: '40%',
      margin: '64px 0 0 16px'
    },
  },
  title: {
    color: primary[900],
    fontSize: 18
  },
  textMatchname: {
    width: '100%',
    marginTop: 8,
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
  normal: {
    color: primary[900],
    paddingTop: 20,
    paddingBottom: 4
  },
  expandIcon: {
    position: 'absolute',
    right: 16,
    top: 8,
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  editButton: {
    position: 'absolute',
    right: 16,
    top: 8,
    zIndex: 1
  },
  buttonControl: {
    display: 'flex',
    padding: 8
  },
  button: {
    flex: 1,
    marginTop: 16,
    padding: 16,
    width: '100%'
  },

}))

const GreenTextButton = withStyles(theme => ({
  root: {
    color: primary[500],
    fontWeight: 900,
    '&:hover': {
      backgroundColor: primary[100],
    },
  },
}))(Button);

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

const datePickers = createMuiTheme({
  palette: {
    primary: primary,
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

export default function MBOverview(props){
  const classes = useStyles();
  const { sess, token, setCSRFToken, setData, data, matchid, handleSnackBar, isSupportWebp } = props
  const [ editting, handleEditting ] = React.useState(false)
  const [ open, setOpen ] = React.useState(false);
  const [ modalType, setModalType ] = React.useState('');
  const imgRef = React.useRef(null)
  const [ fileHover, handleFileHover ] = React.useState(false);

  const [ selectedMatchName, setSelectedMatchName ] = React.useState('');
  const [ selectedField, setSelectedField ] = React.useState(null);
  const [ selectedFieldVersion, setSelectedFieldVersion ] = React.useState(1);
  const [ selectedPrivacy, setSelectedPrivacy ] = React.useState(null);
  const [ selectedMatchType, setSelectedMatchType ] = React.useState(null);
  const [ selectedDate, setSelectedDate ] = React.useState(null);
  const [ selectedFile, setSelectedFile ] = React.useState(null);
  const [ tempFile, setTempFile ] = React.useState(null)

  const handleOpen = (d) => {
    setOpen(true);
    setModalType(d)
  };

  const handleClose = () => {
    setOpen(false);
  };

  function handlePrivacy(event) {
    setSelectedPrivacy(event.target.value);
  }

  function handleMatchType(event) {
    setSelectedMatchType(event.target.value);
  }

  function handleDateChange(d){
    setSelectedDate(d)
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

  async function handleEditMatch(){
    let res = await API._xhrGet('getcsrf')
    const sendObj = {
      action: 'edit',
      matchid: parseInt(matchid)
    };

    if(selectedDate){
      Object.assign(sendObj, { matchdate: API._dateSendToAPI(selectedDate) });
    }

    if(selectedField){
      Object.assign(sendObj, { fieldid: selectedField.fieldid });
    }

    if(selectedFieldVersion !== 1){
      Object.assign(sendObj, { choosefversion: selectedFieldVersion.version });
    }

    if(selectedMatchName.length){
      Object.assign(sendObj, { matchname: selectedMatchName });
    }

    if(selectedPrivacy){
      Object.assign(sendObj, { privacy: selectedPrivacy });
    }

    if(selectedMatchType){
      Object.assign(sendObj, { scorematch: parseInt(selectedMatchType) });
    }

    await API._xhrPost(
      token? token : resToken.token,
      sess.typeid === 'admin'? 'matchsystem' : 'mmatchsystem', sendObj,
      (csrf, d) =>{
      setCSRFToken(csrf)
      handleSnackBar({
        state: true,
        message: d.status,
        variant: /success/.test(d.status) ? d.status : 'error',
        autoHideDuration: /success/.test(d.status)? 2000 : 5000
      })
      if(/success/.test(d.status)){
        handleCreatePicture(csrf, d)
      }
    })
  }

  async function handleCreatePicture(csrf, d){
    var status = d.status
    const formData = new FormData()
    if(selectedFile){
      formData.append('matchimage', selectedFile)
      const response = await API._fetchPostFile(
        sess.typeid === 'admin'? 'matchsystem' : 'mmatchsystem',
        `?_csrf=${csrf}`, {
        action: 'edit',
        matchid: parseInt(matchid),
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
      variant: /success/.test(status) ? status : 'error',
      autoHideDuration: /success/.test(status)? 2000 : 5000
    })
    await handleFetch()
    if(/success/.test(status)){
      handleEditting(false)
    }
  }

  async function handleFetch(){
    if(matchid){
      const resToken = token? token : await API._xhrGet('getcsrf')
      await API._xhrPost(
        token? token : resToken.token,
        sess.typeid === 'admin'? 'loadmatch' :'mloadmatch', {
          action: 'detail',
          matchid: matchid
      }, (csrf, d) =>{
        setCSRFToken(csrf)
        if(
          d.status !== 'class database error' ||
          d.status !== 'wrong matchid' ||
          d.status !== 'wrong action' ||
          d.status !== 'wrong params'
        ){
          setData(d)
        }else{
          handleSnackBar({
            state: true,
            message: d.status,
            variant: 'error',
            autoHideDuration: 5000
          })
        }
      })
    }
  }

  React.useEffect(()=>{
    handleFetch()
  },[ ])

  return (
    <div className={classes.root}>
      { data && data.status !== 'wrong params' &&
        <React.Fragment>
          { !editting &&
            <GreenTextButton className={classes.editButton} onClick={()=>handleEditting(!editting)}>
              { ( sess && sess.language === 'TH' ) ? "แก้ไข" : 'Edit' }
            </GreenTextButton>
          }
          <div className={classes.grid}>
            <div className={classes.gridChild1}>
              <ThemeProvider theme={theme}>
                {editting?
                  <TextField
                    className={classes.textMatchname}
                    label={ ( sess && sess.language === 'TH' ) ? "ชื่อการแข่งขัน" : 'Match name' }
                    value={ data && ( selectedMatchName ? selectedMatchName : data.title ) || (
                      ( sess && sess.language === 'TH' ) ? "ชื่อการแข่งขัน" : 'Match name'
                    ) }
                    onChange={e =>setSelectedMatchName(e.target.value)}
                  />
                  :
                  <Typography component="div" className={classes.textMatchname}>
                    <Box className={classes.normal}>
                      { data && ( selectedMatchName ? selectedMatchName : data.title ) || (
                        ( sess && sess.language === 'TH' ) ? "ชื่อการแข่งขัน" : 'Match name'
                      ) }
                    </Box>
                  </Typography>
                }
              </ThemeProvider>
              <div style={{ display: 'flex', marginTop: 16 }}>
                <ThemeProvider theme={datePickers}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      clearable
                      disabled={!editting}
                      className={classes.margin}
                      label={ ( sess && sess.language === 'TH' ) ? "วันที่" : 'Date' }
                      inputVariant="outlined"
                      format="dd/MM/yyyy"
                      value={ data?( selectedDate ? selectedDate : new Date(data.date) ):new Date() }
                      onChange={date => handleDateChange(date)}
                    />
                  </MuiPickersUtilsProvider>
                </ThemeProvider>
              </div>
              { ( selectedFile || (data && data.picture) )?
                <div style={{ position: 'relative', marginTop: 16 }}
                  onMouseEnter={()=>editting?handleFileHover(true):console.log()}
                  onMouseLeave={()=>editting?handleFileHover(false):console.log()}>
                  <img ref={imgRef}
                    style={{ opacity: fileHover?.5:1, maxHeight: 280, height: window.innerWidth * ( window.innerWidth >= 650?.3:.45 ) }}
                    className={classes.matchImg}
                    src={
                      selectedFile && tempFile ?
                      tempFile
                      :
                      API._getPictureUrl(data.picture) + ( isSupportWebp? '.webp' : '.jpg' ) + '#' + new Date().toISOString()
                    } />
                  { editting && imgRef.current &&
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
                    style={{ height: window.innerWidth * ( window.innerWidth >= 650?.3:.45 ), maxHeight: 280 }}>
                    <div style={{ flex: 1 }} />
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <div style={{ flex: 1 }} />
                      { editting &&
                        <StyledIconButton className={classes.matchFile}>
                          <input className={classes.inputFile} type="file" accept="image/png, image/jpeg" onChange={handlePicture} />
                          <CloudUploadIcon fontSize="large" style={{ color: primary[500] }} />
                        </StyledIconButton>
                      }
                      <div style={{ flex: 1 }} />
                    </div>
                    <div style={{ flex: 1 }} />
                  </div>
                </div>
              }
            </div>
            <div className={classes.gridChild2}>
              <ThemeProvider theme={theme}>
                <GreenTextButton
                  disabled={!editting}
                  variant="outlined"
                  className={classes.button}
                  style={{ textTransform: 'none' }}
                  onClick={()=>handleOpen('location')}>
                  { data?( selectedField? selectedField.fieldname : data.location ) : (
                    ( sess && sess.language === 'TH' ) ? "สนาม" : 'Location'
                  ) }
                  {selectedFieldVersion !== 1 && '( '+ selectedFieldVersion.version + ' )'}
                </GreenTextButton>
                {/*
                  <GreenTextButton
                    disabled={!editting}
                    className={classes.button}
                    variant="outlined"
                    onClick={()=>handleOpen('class')}>
                    { data?
                      ( data.class && !data.class.status &&
                        `${data.class.length}${function(){
                          switch (data.scorematch) {
                            case 0:
                              return ( sess && sess.language === 'TH' ) ? " ไฟล์ท" : ` Flight${( data.class.length > 1 ? 's' : '' )}`
                              break;
                            case 1:
                              return ( sess && sess.language === 'TH' ) ? " ประเภท" : ` Class${( data.class.length > 1 ? 'es' : '' )}`
                              break;
                            default:
                              return ( sess && sess.language === 'TH' ) ? " ทีม" : ` Team${( data.class.length > 1 ? 's' : '' )}`
                          }
                        }()}`
                      ):
                      (
                        `${function(){
                          switch (data.scorematch) {
                            case 0:
                              return ( sess && sess.language === 'TH' ) ? " ไฟล์ท" : ' Flight'
                              break;
                            case 1:
                              return ( sess && sess.language === 'TH' ) ? " ประเภท" : ' Class'
                              break;
                            default:
                              return ( sess && sess.language === 'TH' ) ? " ทีม" : ' Team'
                          }
                        }()}`
                      )
                    }
                  </GreenTextButton>*/
                }
                <FormControl component="fieldset" className={classes.margin}
                  style={{ width: '100%', border: '1px rgba(0, 0, 0, 0.23) solid', padding: '4px 16px 8px 24px', borderRadius: 4, boxSizing: 'border-box' }}
                  disabled={!editting}>
                  <FormLabel component="legend" style={{ marginLeft: 16 }}>{ ( sess && sess.language === 'TH' ) ? "ความเป็นส่วนตัว" : 'Privacy' }</FormLabel>
                  <RadioGroup
                    value={
                      data?( selectedPrivacy? selectedPrivacy : data.privacy ):'public'
                    }
                    onChange={handlePrivacy} row>
                    <FormControlLabel
                      value={'public'}
                      control={<GreenRadio />}
                      label={ ( sess && sess.language === 'TH' ) ? "สาธารณะ" : 'Public' }
                      labelPlacement="end"
                    />
                    <FormControlLabel
                      value={'friend'}
                      control={<GreenRadio />}
                      label={ ( sess && sess.language === 'TH' ) ? "เพื่อน" : 'Friend' }
                      labelPlacement="end"
                    />
                    <FormControlLabel
                      value={'private'}
                      control={<GreenRadio />}
                      label={ ( sess && sess.language === 'TH' ) ? "ส่วนตัว" : 'Private' }
                      labelPlacement="end"
                    />
                  </RadioGroup>
                </FormControl>
                { /*
                  <FormControl component="fieldset" className={classes.margin}
                    style={{ width: '100%', border: '1px rgba(0, 0, 0, 0.23) solid', padding: '4px 16px 8px 24px', borderRadius: 4 }}
                    disabled={!editting}>
                    <FormLabel component="legend" style={{ marginLeft: 16 }}>Type</FormLabel>
                    <RadioGroup
                      value={
                        data?( selectedMatchType? selectedMatchType : data.scorematch.toString() ):'1'
                      }
                      onChange={handleMatchType} row>
                      <FormControlLabel
                        value={'1'}
                        control={<GreenRadio />}
                        label="Pro"
                        labelPlacement="end"
                      />
                      <FormControlLabel
                        value={'0'}
                        control={<GreenRadio />}
                        label="Amateur"
                        labelPlacement="end"
                      />
                    </RadioGroup>
                  </FormControl>*/
                }
              </ThemeProvider>
            </div>
          </div>
          { editting?
            <div className={classes.buttonControl}>
              <div style={{ flex: 2 }}></div>
              <GreenTextButton className={classes.button}
                onClick={()=>handleEditting(false)}>
                { ( sess && sess.language === 'TH' ) ? "ยกเลิก" : 'Cancel' }
              </GreenTextButton>
              <GreenButton className={classes.button}
                onClick={handleEditMatch}>
                { ( sess && sess.language === 'TH' ) ? "บันทึก" : 'Save' }
              </GreenButton>
            </div>
            :
            <div style={{ height: 88 }}></div>
          }
        </React.Fragment>
      }
      { modalType && modalType === 'location' &&
        <TemplateDialog maxWidth={700} open={open} handleClose={handleClose}>
          <Location
            {...props}
            selectedField={selectedField}
            setSelectedField={setSelectedField}
            selectedFieldVersion={selectedFieldVersion}
            setSelectedFieldVersion={setSelectedFieldVersion}
            handleClose={handleClose} />
        </TemplateDialog>
      }
      { modalType && modalType === 'class' &&
        <TemplateDialog open={open} handleClose={handleClose} maxWidth={500}>
          <MatchClass
            {...props}
            data={data && data.status !== 'class database error' && data}
            matchid={matchid} setData={setData} />
        </TemplateDialog>
      }
    </div>
  );
}
