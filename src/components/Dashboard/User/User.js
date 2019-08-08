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
  loader: () => import(/* webpackChunkName: "TemplateDialog" */'./../../TemplateDialog'),
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
  const { token, setCSRFToken, matchid, handleSnackBar, } = props

  const [ open, setOpen ] = React.useState(false)
  const [ data, setData ] = React.useState(null)
  const [ editting, setEditting ] = React.useState(false)
  const [ edittingUser, setEdittingUser ] = React.useState(null)
  const [ dataSliced, setDataSliced ] = React.useState(10)
  const [ createState, setCreateState ] = React.useState(false)
  const [ searchUser, setSearchUser ] = React.useState('')
  const [ fullname, setFullname ] = React.useState('')
  const [ lastname, setLastname ] = React.useState('')
  const [ selectedFile, setSelectedFile ] = React.useState(null);
  const [ fileHover, handleFileHover ] = React.useState(false);
  const imgRef = React.useRef(null)

  function handleOpen(d){
    setOpen(!open)
    setEdittingUser(d)
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
    await API.xhrPost(
      token? token : await API.xhrGet('getcsrf').token,
      'usersystem', {
        action: 'create',
        fullname: fullname,
        lastname: lastname
    }, (csrf, d) =>{
      setCSRFToken(csrf)
      handleSnackBar({
        state: true,
        message: d.status,
        variant: d.status === 'success' ? 'success' : 'error',
        autoHideDuration: d.status === 'success'? 2000 : 5000
      })
      try {
        handleLoadUser()
      }catch(err) { console.log(err.message) }
    })
  }

  async function handleEditUser(){
    console.log(edittingUser);
    console.log({
      fullname: fullname,
      lastname: lastname,
      usertarget: edittingUser.userid
    });
  }

  async function handleLoadUser(){
    await API.xhrPost(
      token? token : await API.xhrGet('getcsrf').token,
      'loaduser', {
        action: 'userlist'
    }, (csrf, d) =>{
      setCSRFToken(csrf)
      setData(d)
    })
  }

  React.useEffect(()=>{
    //handleLoadUser()
    var json = '[{"userid":324400,"email":"sp1@pds.com","fullname":"ธวัชชัย","lastname":"ขุนศรี","photopath":null,"registerdate":"2019-07-03T09:17:49.000Z","language":"TH"},{"userid":773936,"email":"sntpro3@pds.com","fullname":"ธนาชัย","lastname":"สอนธรรม","photopath":null,"registerdate":"2019-07-03T09:17:49.000Z","language":"TH"},{"userid":656705,"email":"sntpro4@pds.com","fullname":"วิชัย","lastname":"คณะรัฐ","photopath":null,"registerdate":"2019-07-03T09:17:49.000Z","language":"TH"},{"userid":380855,"email":"sntpro5@pds.com","fullname":"ประสิทธิ","lastname":"คำภูแสน","photopath":null,"registerdate":"2019-07-03T09:17:49.000Z","language":"TH"},{"userid":980385,"email":"sntpro6@pds.com","fullname":"สายยัณห์","lastname":"คะเซนต์","photopath":null,"registerdate":"2019-07-03T09:17:49.000Z","language":"TH"},{"userid":968694,"email":"sntpro7@pds.com","fullname":"ธนกฤต","lastname":"พรหมศรี","photopath":null,"registerdate":"2019-07-03T09:17:50.000Z","language":"TH"},{"userid":452902,"email":"sntpro8@pds.com","fullname":"ภิรมย์","lastname":"ไพบูลย์ ","photopath":null,"registerdate":"2019-07-03T09:17:50.000Z","language":"TH"},{"userid":448179,"email":"sntpro9@pds.com","fullname":"ชาติชาย","lastname":"โทนะพันธ์ ","photopath":null,"registerdate":"2019-07-03T09:17:50.000Z","language":"TH"},{"userid":317246,"email":"sntpro10@pds.com","fullname":"Akira","lastname":"Osaka","photopath":null,"registerdate":"2019-07-03T09:17:50.000Z","language":"TH"},{"userid":838489,"email":"sntpro11@pds.com","fullname":"อนุชา","lastname":"แย้มน้อย","photopath":null,"registerdate":"2019-07-03T09:17:50.000Z","language":"TH"},{"userid":127642,"email":"sntpro12@pds.com","fullname":"ธงชัย","lastname":"แตงอ่อน","photopath":null,"registerdate":"2019-07-03T09:17:50.000Z","language":"TH"},{"userid":422094,"email":"sntpro13@pds.com","fullname":"อธิวัฒน์","lastname":"แย้มเรืองรัตน์","photopath":null,"registerdate":"2019-07-03T09:17:50.000Z","language":"TH"},{"userid":637016,"email":"sntpro14@pds.com","fullname":"วานิช","lastname":"สมชาติ ","photopath":null,"registerdate":"2019-07-03T09:17:50.000Z","language":"TH"},{"userid":398717,"email":"sntpro15@pds.com","fullname":"ประวีณศักดิ์","lastname":"กุลจิตต์เจือวงศ์ ","photopath":null,"registerdate":"2019-07-03T09:17:50.000Z","language":"TH"},{"userid":846610,"email":"sntpro16@pds.com","fullname":"สำราญ","lastname":"มะละปะทิ","photopath":null,"registerdate":"2019-07-03T09:17:50.000Z","language":"TH"},{"userid":186918,"email":"sntpro17@pds.com","fullname":"สุทธิพันธ์","lastname":"กิมสวัสดิ","photopath":null,"registerdate":"2019-07-03T09:17:50.000Z","language":"TH"},{"userid":296764,"email":"sntpro18@pds.com","fullname":"ฉัตรชัย","lastname":"ธรรมวงศ์ผล","photopath":null,"registerdate":"2019-07-03T09:17:50.000Z","language":"TH"},{"userid":177725,"email":"sntpro19@pds.com","fullname":"JIM","lastname":"LAM","photopath":null,"registerdate":"2019-07-03T09:17:50.000Z","language":"TH"},{"userid":223893,"email":"sntpro20@pds.com","fullname":"พิทักษ์สรรค์ ","lastname":"นพสิทธิพร","photopath":null,"registerdate":"2019-07-03T09:17:50.000Z","language":"TH"},{"userid":735952,"email":"sntpro21@pds.com","fullname":"ธานนิทร์","lastname":"เหลืองภูมิยุทธ ","photopath":null,"registerdate":"2019-07-03T09:17:50.000Z","language":"TH"},{"userid":704282,"email":"sntpro22@pds.com","fullname":"พีระวัตน์","lastname":"ศรีพิทักษ์ ","photopath":null,"registerdate":"2019-07-03T09:17:50.000Z","language":"TH"},{"userid":470988,"email":"sntpro23@pds.com","fullname":"โชคสัน","lastname":"ขันแก้ว ","photopath":null,"registerdate":"2019-07-03T09:17:50.000Z","language":"TH"},{"userid":395229,"email":"sntpro24@pds.com","fullname":"ธวัชชัย ","lastname":"ชายชาญ","photopath":null,"registerdate":"2019-07-03T09:17:50.000Z","language":"TH"},{"userid":843398,"email":"sntpro25@pds.com","fullname":"ซูชีพ ","lastname":"อินทร","photopath":null,"registerdate":"2019-07-03T09:17:50.000Z","language":"TH"},{"userid":765571,"email":"sntpro26@pds.com","fullname":"ไกรฤกษ์ ","lastname":"วณิชคุปต์","photopath":null,"registerdate":"2019-07-03T09:17:50.000Z","language":"TH"},{"userid":456902,"email":"sntpro27@pds.com","fullname":"ธีรวัฒน์ ","lastname":"ใจประสาท","photopath":null,"registerdate":"2019-07-03T09:17:50.000Z","language":"TH"},{"userid":937491,"email":"sntpro28@pds.com","fullname":"จรูญ ","lastname":"พิริยพฤนท์ ","photopath":null,"registerdate":"2019-07-03T09:17:50.000Z","language":"TH"},{"userid":623655,"email":"sntpro29@pds.com","fullname":"ฐนิต ","lastname":"ประสิทธิวิเศษ","photopath":null,"registerdate":"2019-07-03T09:17:50.000Z","language":"TH"},{"userid":579154,"email":"sntpro30@pds.com","fullname":"สลี ","lastname":"ประเสริฐนอก","photopath":null,"registerdate":"2019-07-03T09:17:50.000Z","language":"TH"},{"userid":283135,"email":"sntpro31@pds.com","fullname":"วรพล ","lastname":"อ่อนนุช","photopath":null,"registerdate":"2019-07-03T09:17:50.000Z","language":"TH"},{"userid":243286,"email":"sntpro32@pds.com","fullname":"พัสกร  ","lastname":"ยุพาวัฒนะ","photopath":null,"registerdate":"2019-07-03T09:17:50.000Z","language":"TH"},{"userid":872037,"email":"sntpro33@pds.com","fullname":"ยุทธนา ","lastname":"ค้าคล่อง ","photopath":null,"registerdate":"2019-07-03T09:17:50.000Z","language":"TH"},{"userid":215839,"email":"sntpro34@pds.com","fullname":"ชัยวัฒน์ ","lastname":"พรประยุทธ","photopath":null,"registerdate":"2019-07-03T09:17:50.000Z","language":"TH"},{"userid":760333,"email":"sntpro35@pds.com","fullname":"ยรรยง ","lastname":"ศัตรูคร้าม","photopath":null,"registerdate":"2019-07-03T09:17:50.000Z","language":"TH"},{"userid":722638,"email":"sntpro36@pds.com","fullname":"พิทักษ์ ","lastname":"ศรีตะวัน","photopath":null,"registerdate":"2019-07-03T09:17:50.000Z","language":"TH"},{"userid":525973,"email":"sntpro37@pds.com","fullname":"วิริยะ ","lastname":"ใจชื่น","photopath":null,"registerdate":"2019-07-03T09:17:50.000Z","language":"TH"},{"userid":396119,"email":"sntpro38@pds.com","fullname":"พิชิต ","lastname":"คำศรี","photopath":null,"registerdate":"2019-07-03T09:17:50.000Z","language":"TH"},{"userid":121302,"email":"sntpro39@pds.com","fullname":"อานนท์ ","lastname":"โพธิ์ทอง","photopath":null,"registerdate":"2019-07-03T09:17:50.000Z","language":"TH"},{"userid":584981,"email":"sntpro40@pds.com","fullname":"มนัส ","lastname":"สุขเย็น","photopath":null,"registerdate":"2019-07-03T09:17:50.000Z","language":"TH"},{"userid":144078,"email":"sntpro41@pds.com","fullname":"วันชัย ","lastname":"รอบรู้ ","photopath":null,"registerdate":"2019-07-03T09:17:50.000Z","language":"TH"},{"userid":745918,"email":"sntpro42@pds.com","fullname":"สุมิตร ","lastname":"ลีธรรมชโย","photopath":null,"registerdate":"2019-07-03T09:17:50.000Z","language":"TH"},{"userid":872971,"email":"sntpro43@pds.com","fullname":"สมาน ","lastname":"สุทธิพงษ์เกษตร","photopath":null,"registerdate":"2019-07-03T09:17:50.000Z","language":"TH"},{"userid":731068,"email":"sntpro44@pds.com","fullname":"วิศนุ ","lastname":"ศิริจันทร์ ","photopath":null,"registerdate":"2019-07-03T09:17:50.000Z","language":"TH"},{"userid":289142,"email":"sntpro45@pds.com","fullname":"สุชาติ ","lastname":"ทะวะบุตร","photopath":null,"registerdate":"2019-07-03T09:17:50.000Z","language":"TH"},{"userid":171247,"email":"sntpro46@pds.com","fullname":"วิชัย ","lastname":"ศรีระผา","photopath":null,"registerdate":"2019-07-03T09:17:50.000Z","language":"TH"},{"userid":561425,"email":"sntpro47@pds.com","fullname":"บุญยัง ","lastname":"คำรัตน์ ","photopath":null,"registerdate":"2019-07-03T09:17:50.000Z","language":"TH"},{"userid":254177,"email":"sntpro48@pds.com","fullname":"ปราโมทย์","lastname":" รูปสวยดี","photopath":null,"registerdate":"2019-07-03T09:17:50.000Z","language":"TH"},{"userid":294070,"email":"sntpro49@pds.com","fullname":"ชาญณรงค์ ","lastname":"จินดา","photopath":null,"registerdate":"2019-07-03T09:17:50.000Z","language":"TH"},{"userid":531624,"email":"sntpro50@pds.com","fullname":"ดำรงค์ ","lastname":"วันนามิตร","photopath":null,"registerdate":"2019-07-03T09:17:50.000Z","language":"TH"},{"userid":441485,"email":"sntpro51@pds.com","fullname":"อำนาจ ","lastname":"เกิดกระสินธุ์","photopath":null,"registerdate":"2019-07-03T09:17:50.000Z","language":"TH"},{"userid":349921,"email":"sntpro52@pds.com","fullname":"สนอง ","lastname":"ช้างเนียม","photopath":null,"registerdate":"2019-07-03T09:17:50.000Z","language":"TH"},{"userid":508979,"email":"sntpro53@pds.com","fullname":"ปณัษฐ์  ","lastname":"ดวงอุดม","photopath":null,"registerdate":"2019-07-03T09:17:50.000Z","language":"TH"},{"userid":206427,"email":"sntpro54@pds.com","fullname":"ประจบ ","lastname":"ปรีชาจารย์","photopath":null,"registerdate":"2019-07-03T09:17:50.000Z","language":"TH"},{"userid":344566,"email":"sntpro55@pds.com","fullname":"ประทีป ","lastname":"แก้ววงษา ","photopath":null,"registerdate":"2019-07-03T09:17:50.000Z","language":"TH"},{"userid":362257,"email":"sntpro56@pds.com","fullname":"ทวีโชค ","lastname":"พุทธชน","photopath":null,"registerdate":"2019-07-03T09:17:50.000Z","language":"TH"},{"userid":672912,"email":"sntpro57@pds.com","fullname":"วิเชียร ","lastname":"สมาการ","photopath":null,"registerdate":"2019-07-03T09:17:50.000Z","language":"TH"},{"userid":265192,"email":"sntpro58@pds.com","fullname":"อรุณ ","lastname":"วรทอง ","photopath":null,"registerdate":"2019-07-03T09:17:50.000Z","language":"TH"},{"userid":329912,"email":"sntpro59@pds.com","fullname":"ชวลิต ","lastname":"จันทรสวัสดิ์ ","photopath":null,"registerdate":"2019-07-03T09:17:50.000Z","language":"TH"},{"userid":235854,"email":"nzkj6","fullname":"45506254","lastname":"1","photopath":null,"registerdate":"2019-07-03T09:17:50.000Z","language":"TH"},{"userid":786935,"email":"2ei9g","fullname":"45506254","lastname":"2","photopath":null,"registerdate":"2019-07-03T09:17:50.000Z","language":"TH"},{"userid":126042,"email":"4vxry","fullname":"45506254","lastname":"3","photopath":null,"registerdate":"2019-07-03T09:17:50.000Z","language":"TH"},{"userid":675751,"email":"wyyg6","fullname":"45506254","lastname":"4","photopath":null,"registerdate":"2019-07-03T09:17:50.000Z","language":"TH"},{"userid":155157,"email":"qeoh2","fullname":"45506254","lastname":"5","photopath":null,"registerdate":"2019-07-03T09:17:50.000Z","language":"TH"},{"userid":553014,"email":"i72om","fullname":"45506254","lastname":"6","photopath":null,"registerdate":"2019-07-03T09:17:50.000Z","language":"TH"},{"userid":798788,"email":"ix7qn","fullname":"45506254","lastname":"7","photopath":null,"registerdate":"2019-07-03T09:17:50.000Z","language":"TH"},{"userid":133750,"email":"27hah","fullname":"45506254","lastname":"8","photopath":null,"registerdate":"2019-07-03T09:17:50.000Z","language":"TH"},{"userid":493751,"email":"55pq4","fullname":"45506254","lastname":"9","photopath":null,"registerdate":"2019-07-03T09:17:50.000Z","language":"TH"},{"userid":816885,"email":"mw17w","fullname":"45506254","lastname":"10","photopath":null,"registerdate":"2019-07-03T09:17:50.000Z","language":"TH"},{"userid":467556,"email":"zsj6q","fullname":"45506254","lastname":"11","photopath":null,"registerdate":"2019-07-03T09:17:50.000Z","language":"TH"},{"userid":370614,"email":"hsxwb","fullname":"45506254","lastname":"12","photopath":null,"registerdate":"2019-07-03T09:17:50.000Z","language":"TH"},{"userid":772410,"email":"u1xev","fullname":"45506254","lastname":"13","photopath":null,"registerdate":"2019-07-03T09:17:50.000Z","language":"TH"},{"userid":911464,"email":"7args","fullname":"45506254","lastname":"14","photopath":null,"registerdate":"2019-07-03T09:17:50.000Z","language":"TH"},{"userid":427978,"email":"mm8t4","fullname":"45506254","lastname":"15","photopath":null,"registerdate":"2019-07-03T09:17:50.000Z","language":"TH"},{"userid":832753,"email":"sntpro60@pds.com","fullname":"ณรงค์","lastname":"แก้วพิณ","photopath":null,"registerdate":"2019-07-03T09:17:50.000Z","language":"TH"},{"userid":293360,"email":"sntpro61@pds.com","fullname":"พีระพล","lastname":"งามทองประกาย","photopath":null,"registerdate":"2019-07-03T09:17:50.000Z","language":"TH"},{"userid":684696,"email":"sntpro62@pds.com","fullname":"ณัฐพล","lastname":"จิระพรพาณิชย์","photopath":null,"registerdate":"2019-07-03T09:17:50.000Z","language":"TH"},{"userid":859661,"email":"sntpro63@pds.com","fullname":"พงศ์ภูมินทร์","lastname":"กล้าหาญ","photopath":null,"registerdate":"2019-07-03T09:17:50.000Z","language":"TH"},{"userid":697510,"email":"sntpro64@pds.com","fullname":"วีรนันท์","lastname":"จันทร์เอียง","photopath":null,"registerdate":"2019-07-03T09:17:50.000Z","language":"TH"},{"userid":872312,"email":"sntpro65@pds.com","fullname":"บุญยิ่ง","lastname":"นิลจ้อย","photopath":null,"registerdate":"2019-07-03T09:17:50.000Z","language":"TH"},{"userid":186040,"email":"sntpro66@pds.com","fullname":"ทัตเทพ","lastname":"ปิ่นจินดา","photopath":null,"registerdate":"2019-07-03T09:17:50.000Z","language":"TH"},{"userid":657493,"email":"sntpro67@pds.com","fullname":"ธรรมชาติ","lastname":"เลิศบุญธรรม","photopath":null,"registerdate":"2019-07-03T09:17:50.000Z","language":"TH"},{"userid":189058,"email":"sntpro68@pds.com","fullname":"พสิษฐ์","lastname":"วงศ์ปฐมกำเนิด","photopath":null,"registerdate":"2019-07-03T09:17:50.000Z","language":"TH"},{"userid":220606,"email":"sntpro69@pds.com","fullname":"พร","lastname":"เวียงชนก","photopath":null,"registerdate":"2019-07-03T09:17:50.000Z","language":"TH"},{"userid":224679,"email":"sntpro70@pds.com","fullname":"ฐิติพงษ์","lastname":"สังข์ประเสริฐ","photopath":null,"registerdate":"2019-07-03T09:17:50.000Z","language":"TH"},{"userid":725595,"email":"sntpro71@pds.com","fullname":"ธนพงษ์","lastname":"บุษบก","photopath":null,"registerdate":"2019-07-03T09:17:50.000Z","language":"TH"},{"userid":834214,"email":"sntpro72@pds.com","fullname":"สุรัตน์","lastname":"ดวงใจดี","photopath":null,"registerdate":"2019-07-03T09:17:50.000Z","language":"TH"},{"userid":502367,"email":"sntpro73@pds.com","fullname":"เสริมชาติ","lastname":"ลีนะวัฒนา","photopath":null,"registerdate":"2019-07-03T09:17:50.000Z","language":"TH"},{"userid":479188,"email":"sntpro74@pds.com","fullname":"วรินทร์","lastname":"ศุภวิบุลย์","photopath":null,"registerdate":"2019-07-03T09:17:50.000Z","language":"TH"},{"userid":147737,"email":"sntpro75@pds.com","fullname":"วันชัย","lastname":"คิดหาทอง","photopath":null,"registerdate":"2019-07-03T09:17:50.000Z","language":"TH"},{"userid":828698,"email":"sntpro76@pds.com","fullname":"ร.ท.ประชัน","lastname":"นามบุรี","photopath":null,"registerdate":"2019-07-03T09:17:50.000Z","language":"TH"},{"userid":958766,"email":"sntpro77@pds.com","fullname":"ธนู","lastname":"พุทธสุวรรณ","photopath":null,"registerdate":"2019-07-03T09:17:50.000Z","language":"TH"},{"userid":498996,"email":"lkrf5","fullname":"42758771","lastname":"1","photopath":null,"registerdate":"2019-07-03T09:17:50.000Z","language":"TH"},{"userid":236123,"email":"6czts","fullname":"42758771","lastname":"2","photopath":null,"registerdate":"2019-07-03T09:17:50.000Z","language":"TH"},{"userid":345397,"email":"p1mv9","fullname":"42758771","lastname":"3","photopath":null,"registerdate":"2019-07-03T09:17:50.000Z","language":"TH"},{"userid":801873,"email":"sntpro78@pds.com","fullname":"เกรียงศีกดิ์","lastname":"ชัยวนารมณ์","photopath":null,"registerdate":"2019-07-03T09:17:50.000Z","language":"TH"},{"userid":804737,"email":"sntpro79@pds.com","fullname":"พล.ต.ต.เกียรติศักดิ์","lastname":"วงศิลป์","photopath":null,"registerdate":"2019-07-03T09:17:50.000Z","language":"TH"},{"userid":476885,"email":"sntpro80@pds.com","fullname":"วิชัย","lastname":"กรรณรัตนสูตร","photopath":null,"registerdate":"2019-07-03T09:17:50.000Z","language":"TH"},{"userid":917545,"email":"buz5e","fullname":"91433000","lastname":"1","photopath":null,"registerdate":"2019-07-03T09:17:50.000Z","language":"TH"},{"userid":272082,"email":"rcsxd","fullname":"91433000","lastname":"2","photopath":null,"registerdate":"2019-07-03T09:17:50.000Z","language":"TH"},{"userid":722345,"email":"sntpro81@pds.com","fullname":"วิชญา","lastname":"จาติกวณิช","photopath":null,"registerdate":"2019-07-03T09:17:50.000Z","language":"TH"},{"userid":863757,"email":"sntpro82@pds.com","fullname":"ณัฐพัชร์","lastname":"สิทธิรดาธนิสร","photopath":null,"registerdate":"2019-07-03T09:17:50.000Z","language":"TH"},{"userid":906954,"email":"sntpro83@pds.com","fullname":"จิระชาย","lastname":"ทองเหลือง","photopath":null,"registerdate":"2019-07-03T09:17:50.000Z","language":"TH"},{"userid":673426,"email":"sntpro84@pds.com","fullname":"นิธิดล","lastname":"ดิษฐสุวรรณ","photopath":null,"registerdate":"2019-07-03T09:17:50.000Z","language":"TH"},{"userid":176525,"email":"sntpro85@pds.com","fullname":"สุขเกษม","lastname":"สุขเทศ","photopath":null,"registerdate":"2019-07-03T09:17:50.000Z","language":"TH"},{"userid":299043,"email":"sntpro86@pds.com","fullname":"สมศักดิ์","lastname":"ศรีสง่า","photopath":null,"registerdate":"2019-07-03T09:17:50.000Z","language":"TH"},{"userid":171843,"email":"sntpro87@pds.com","fullname":"พงษ์พันธุ์","lastname":"พรหมชัยศรี","photopath":null,"registerdate":"2019-07-03T09:17:50.000Z","language":"TH"},{"userid":870523,"email":"sntpro88@pds.com","fullname":"ดิชพงศ์","lastname":"วงศ์คำจันทร์","photopath":null,"registerdate":"2019-07-03T09:17:50.000Z","language":"TH"},{"userid":368303,"email":"sntpro89@pds.com","fullname":"รัตนพล","lastname":"ศัตรูลี้","photopath":null,"registerdate":"2019-07-03T09:17:50.000Z","language":"TH"},{"userid":432045,"email":"sntpro90@pds.com","fullname":"เยี่ยม","lastname":"สุขัง","photopath":null,"registerdate":"2019-07-03T09:17:51.000Z","language":"TH"},{"userid":781511,"email":"sntpro91@pds.com","fullname":"วินัย","lastname":"อยู่สุวรรณ","photopath":null,"registerdate":"2019-07-03T09:17:51.000Z","language":"TH"},{"userid":317029,"email":"sntpro92@pds.com","fullname":"CHO HAN","lastname":"JIN","photopath":null,"registerdate":"2019-07-03T09:17:51.000Z","language":"TH"},{"userid":516627,"email":"sntpro93@pds.com","fullname":"พิสิษฐ์","lastname":"ภิญโญปรวัฒน์","photopath":null,"registerdate":"2019-07-03T09:17:51.000Z","language":"TH"},{"userid":964238,"email":"sntpro94@pds.com","fullname":"สมชาย","lastname":"บรรจบดี","photopath":null,"registerdate":"2019-07-03T09:17:51.000Z","language":"TH"},{"userid":511165,"email":"wichanon17978@gmail.com","fullname":"Jack","lastname":"Dawson","photopath":null,"registerdate":"2019-07-03T09:17:51.000Z","language":"TH"},{"userid":808611,"email":"sntpro95@pds.com","fullname":"ประทีปหงส์","lastname":"วงศ์สุวรรณ","photopath":null,"registerdate":"2019-07-03T09:17:51.000Z","language":"TH"},{"userid":755692,"email":"sntpro96@pds.com","fullname":"ธีรพงษ์","lastname":"พลิ้งกลาง","photopath":null,"registerdate":"2019-07-03T09:17:51.000Z","language":"TH"},{"userid":148989,"email":"sntpro97@pds.com","fullname":"ชยุต","lastname":"ศิลาบุตร","photopath":null,"registerdate":"2019-07-03T09:17:51.000Z","language":"TH"},{"userid":825953,"email":"sntpro98@pds.com","fullname":"สัมพันธ์","lastname":"เรศมณเฑียร","photopath":null,"registerdate":"2019-07-03T09:17:51.000Z","language":"TH"},{"userid":834212,"email":"sntpro99@pds.com","fullname":"สมศักดิ์","lastname":"สว่างศรี","photopath":null,"registerdate":"2019-07-03T09:17:51.000Z","language":"TH"},{"userid":983681,"email":"sntpro100@pds.com","fullname":"กรภัทร์","lastname":"ศิริทัศน์","photopath":null,"registerdate":"2019-07-03T09:17:51.000Z","language":"TH"},{"userid":385153,"email":"sntpro101@pds.com","fullname":"ชนินทร์","lastname":"วิลาชัย","photopath":null,"registerdate":"2019-07-03T09:17:51.000Z","language":"TH"},{"userid":780070,"email":"sntpro102@pds.com","fullname":"พูลลาภ","lastname":"บุญนันท์","photopath":null,"registerdate":"2019-07-03T09:17:51.000Z","language":"TH"},{"userid":302319,"email":"sntpro103@pds.com","fullname":"SHEONG","lastname":"TAE SEOB","photopath":null,"registerdate":"2019-07-03T09:17:51.000Z","language":"TH"},{"userid":492624,"email":"sntpro104@pds.com","fullname":"LEE","lastname":"SUNG YUN","photopath":null,"registerdate":"2019-07-03T09:17:51.000Z","language":"TH"},{"userid":940352,"email":"sntpro105@pds.com","fullname":"พุฒ","lastname":"ดอนเหลื่อม","photopath":null,"registerdate":"2019-07-03T09:17:51.000Z","language":"TH"},{"userid":722126,"email":"sntpro106@pds.com","fullname":"สุธรรม","lastname":"ไอย์ศูรย์","photopath":null,"registerdate":"2019-07-03T09:17:51.000Z","language":"TH"},{"userid":135543,"email":"sntpro107@pds.com","fullname":"สุรชัย","lastname":"ทิพย์สุข","photopath":null,"registerdate":"2019-07-03T09:17:51.000Z","language":"TH"},{"userid":290370,"email":"sntpro108@pds.com","fullname":"ดุสิต","lastname":"สมศักดิ์","photopath":null,"registerdate":"2019-07-03T09:17:51.000Z","language":"TH"},{"userid":995067,"email":"sntpro109@pds.com","fullname":"ชูเดช","lastname":"กิจเพิ่มพูล","photopath":null,"registerdate":"2019-07-03T09:17:51.000Z","language":"TH"},{"userid":745066,"email":"sntpro110@pds.com","fullname":"ภุมเมน","lastname":"ศรีพันล่า","photopath":null,"registerdate":"2019-07-03T09:17:51.000Z","language":"TH"},{"userid":335794,"email":"sntpro111@pds.com","fullname":"CHO","lastname":"HAN JIN","photopath":null,"registerdate":"2019-07-03T09:17:51.000Z","language":"TH"},{"userid":897468,"email":"sntpro112@pds.com","fullname":"เรียนจด","lastname":"นิลขำ","photopath":null,"registerdate":"2019-07-03T09:17:51.000Z","language":"TH"},{"userid":509279,"email":"sntpro113@pds.com","fullname":"อิทธิพล","lastname":"ชมพูนุช","photopath":null,"registerdate":"2019-07-03T09:17:51.000Z","language":"TH"},{"userid":691791,"email":"fpjqr","fullname":"24624947","lastname":"1","photopath":null,"registerdate":"2019-07-03T09:17:51.000Z","language":"TH"},{"userid":337489,"email":"knybf","fullname":"24624947","lastname":"2","photopath":null,"registerdate":"2019-07-03T09:17:51.000Z","language":"TH"},{"userid":777060,"email":"qmyey","fullname":"24624947","lastname":"3","photopath":null,"registerdate":"2019-07-03T09:17:51.000Z","language":"TH"},{"userid":923566,"email":"sntpro114@pds.com","fullname":"ขวัญเมือง","lastname":"สินธรมย์","photopath":null,"registerdate":"2019-07-03T09:17:51.000Z","language":"TH"},{"userid":879750,"email":"sntpro115@pds.com","fullname":"ไพโรจน์","lastname":"สังข์ทอง","photopath":null,"registerdate":"2019-07-03T09:17:51.000Z","language":"TH"},{"userid":922817,"email":"sntpro116@pds.com","fullname":"สุรพงษ์","lastname":"เจริญวัฒนะ","photopath":null,"registerdate":"2019-07-03T09:17:51.000Z","language":"TH"},{"userid":449656,"email":"sntpro117@pds.com","fullname":"​พิภัชพนธ์​","lastname":"ปรีชา​กิตติ​กรณ์​","photopath":null,"registerdate":"2019-07-03T09:17:51.000Z","language":"TH"},{"userid":302918,"email":"sntpro118@pds.com","fullname":"Owen","lastname":" Oloyd","photopath":null,"registerdate":"2019-07-03T09:17:51.000Z","language":"TH"},{"userid":686853,"email":"sntpro119@pds.com","fullname":"ภัศดา","lastname":"บุรณศิริ","photopath":null,"registerdate":"2019-07-03T09:17:51.000Z","language":"TH"},{"userid":366656,"email":"sntpro120@pds.com","fullname":"มงคล","lastname":"วารี","photopath":null,"registerdate":"2019-07-03T09:17:51.000Z","language":"TH"},{"userid":688633,"email":"sntpro121@pds.com","fullname":"กิติพัฒน์","lastname":"แก้ววิเศษสิทธิ์","photopath":null,"registerdate":"2019-07-03T09:17:51.000Z","language":"TH"},{"userid":150746,"email":"sntpro122@pds.com","fullname":"น.อ. ประเสริฐ","lastname":"มีฟัก","photopath":null,"registerdate":"2019-07-03T09:17:51.000Z","language":"TH"},{"userid":668104,"email":"sntpro123@pds.com","fullname":"สาโรจน์","lastname":"เขียวรัตน์","photopath":null,"registerdate":"2019-07-03T09:17:51.000Z","language":"TH"},{"userid":726183,"email":"sntpro124@pds.com","fullname":"ทินพันธ์","lastname":"พิลึก","photopath":null,"registerdate":"2019-07-03T09:17:51.000Z","language":"TH"},{"userid":719142,"email":"sntpro125@pds.com","fullname":"สุทธิพงษ์","lastname":"แสงเงิน","photopath":null,"registerdate":"2019-07-03T09:17:51.000Z","language":"TH"},{"userid":784669,"email":"sntpro126@pds.com","fullname":"Alexander","lastname":"Vincent Mckay","photopath":null,"registerdate":"2019-07-03T09:17:51.000Z","language":"TH"},{"userid":154714,"email":"sntpro127@pds.com","fullname":"ธวัช","lastname":"กุลสุวรรณ","photopath":null,"registerdate":"2019-07-03T09:17:51.000Z","language":"TH"},{"userid":489319,"email":"sntpro128@pds.com","fullname":"ฉัตรชัย","lastname":"วรดิลก","photopath":null,"registerdate":"2019-07-03T09:17:51.000Z","language":"TH"},{"userid":845215,"email":"sntpro129@pds.com","fullname":"กฤษณะ","lastname":"คณาวิภาวุฒิ","photopath":null,"registerdate":"2019-07-03T09:17:51.000Z","language":"TH"},{"userid":455753,"email":"sntpro130@pds.com","fullname":"เชื้อ","lastname":"เหล่าประเสริฐ","photopath":null,"registerdate":"2019-07-03T09:17:51.000Z","language":"TH"},{"userid":868880,"email":"sntpro131@pds.com","fullname":"TestFull1","lastname":"TestLast1","photopath":null,"registerdate":"2019-07-03T09:17:51.000Z","language":"TH"},{"userid":128476,"email":"sntpro132@pds.com","fullname":"TestUser02.35","lastname":"Last02.35","photopath":null,"registerdate":"2019-07-03T09:17:51.000Z","language":"TH"},{"userid":169226,"email":"sntpro133@pds.com","fullname":"Batman2","lastname":"Banmat","photopath":null,"registerdate":"2019-07-03T09:17:51.000Z","language":"TH"},{"userid":802436,"email":"sntpro134@pds.com","fullname":"รพี","lastname":"พนารินทร์","photopath":null,"registerdate":"2019-07-03T09:17:51.000Z","language":"TH"},{"userid":767936,"email":"sntpro135@pds.com","fullname":"สังวาลย์","lastname":"วิรัตน์จันทร์","photopath":null,"registerdate":"2019-07-03T09:17:51.000Z","language":"TH"},{"userid":889093,"email":"sntpro136@pds.com","fullname":"กัณฑ์","lastname":"ทีฆนันพร","photopath":null,"registerdate":"2019-07-03T09:17:51.000Z","language":"TH"},{"userid":943009,"email":"sntpro137@pds.com","fullname":"ยืนยงค์","lastname":"ธรรมวิจิตเดช","photopath":null,"registerdate":"2019-07-03T09:17:51.000Z","language":"TH"},{"userid":473826,"email":"sntpro138@pds.com","fullname":"วิรุฬห์","lastname":"วงศ์อภิสัมโพธิ์","photopath":null,"registerdate":"2019-07-03T09:17:51.000Z","language":"TH"},{"userid":560646,"email":"sntpro139@pds.com","fullname":"พูลลาภ","lastname":"เยือกเย็น","photopath":null,"registerdate":"2019-07-03T09:17:51.000Z","language":"TH"},{"userid":772860,"email":"sntpro140@pds.com","fullname":"พิสิษฐ์","lastname":"วงศ์ปฐมกำเหนิด","photopath":null,"registerdate":"2019-07-03T09:17:51.000Z","language":"TH"},{"userid":531500,"email":"sntpro141@pds.com","fullname":"ธนกฤต","lastname":"เครื่องสนุก","photopath":null,"registerdate":"2019-07-03T09:17:51.000Z","language":"TH"},{"userid":166164,"email":"sntpro142@pds.com","fullname":"Giovanni","lastname":"Palazzoli","photopath":null,"registerdate":"2019-07-03T09:17:51.000Z","language":"TH"},{"userid":915035,"email":"sntpro143@pds.com","fullname":"พงษ์ภูมินทร์","lastname":"กล้าหาญ","photopath":null,"registerdate":"2019-07-03T09:17:51.000Z","language":"TH"},{"userid":375128,"email":"sntpro144@pds.com","fullname":"วิชยะ","lastname":"ศรีนาคาร์","photopath":null,"registerdate":"2019-07-03T09:17:51.000Z","language":"TH"},{"userid":463456,"email":"sntpro145@pds.com","fullname":"ภัสกร","lastname":"ยุพาวัฒนะ","photopath":null,"registerdate":"2019-07-03T09:17:51.000Z","language":"TH"},{"userid":986963,"email":"sntpro146@pds.com","fullname":"สุขวิทย์","lastname":"อยู่สบาย","photopath":null,"registerdate":"2019-07-03T09:17:51.000Z","language":"TH"},{"userid":247348,"email":"sntpro147@pds.com","fullname":"สุเทพ","lastname":"บุญภิมุข","photopath":null,"registerdate":"2019-07-03T09:17:51.000Z","language":"TH"},{"userid":158541,"email":"sntpro150@pds.com","fullname":"Mike","lastname":"Missler","photopath":null,"registerdate":"2019-07-03T09:17:51.000Z","language":"TH"},{"userid":570929,"email":"sntpro151@pds.com","fullname":"สมนัส","lastname":"จันทนะ","photopath":null,"registerdate":"2019-07-03T09:17:51.000Z","language":"TH"},{"userid":162256,"email":"sntpro149@pds.com","fullname":"สมนัส","lastname":"จันทนะ","photopath":null,"registerdate":"2019-07-03T09:17:51.000Z","language":"TH"},{"userid":313675,"email":"tofftime313675@tofftime.com","fullname":"วสันต์","lastname":"มีลาภ","photopath":null,"registerdate":"2019-07-04T02:48:39.000Z","language":"TH"},{"userid":383134,"email":"tofftime383134@tofftime.com","fullname":"สีไพร","lastname":"อภิสนธิ์","photopath":null,"registerdate":"2019-07-04T03:00:57.000Z","language":"TH"},{"userid":118486,"email":"tofftime118486@tofftime.com","fullname":"วรรธนะ","lastname":"ทับทิมทอง","photopath":null,"registerdate":"2019-07-04T03:05:24.000Z","language":"TH"},{"userid":175937,"email":"tofftime175937@tofftime.com","fullname":"ประทีป","lastname":"ค้ายาดี","photopath":null,"registerdate":"2019-07-04T03:05:47.000Z","language":"TH"},{"userid":839337,"email":"tofftime839337@tofftime.com","fullname":"ทวีโชค","lastname":"พุทธชน","photopath":null,"registerdate":"2019-07-04T03:06:15.000Z","language":"TH"},{"userid":381888,"email":"tofftime381888@tofftime.com","fullname":"ประคอง","lastname":"วระพันธุ์","photopath":null,"registerdate":"2019-07-04T03:06:38.000Z","language":"TH"},{"userid":428247,"email":"tofftime428247@tofftime.com","fullname":"นิรันทร์","lastname":"ฉัตรไกรศรี","photopath":null,"registerdate":"2019-07-04T03:07:04.000Z","language":"TH"},{"userid":961801,"email":"tofftime961801@tofftime.com","fullname":"วิรัตน์","lastname":"แป้นดี","photopath":null,"registerdate":"2019-07-04T03:07:25.000Z","language":"TH"},{"userid":298863,"email":"tofftime298863@tofftime.com","fullname":"พรชัย","lastname":"เนียมหมื่นไวย์","photopath":null,"registerdate":"2019-07-04T03:07:59.000Z","language":"TH"},{"userid":823839,"email":"tofftime823839@tofftime.com","fullname":"ภัศดา","lastname":"บูรณสิริ","photopath":null,"registerdate":"2019-07-04T03:08:13.000Z","language":"TH"},{"userid":364611,"email":"asd","fullname":"asd","lastname":"asd","photopath":null,"registerdate":"2019-07-05T05:15:29.000Z","language":"TH"},{"userid":206989,"email":"asd@pds.com","fullname":"asd","lastname":"asd","photopath":null,"registerdate":"2019-07-05T05:18:10.000Z","language":"TH"},{"userid":913318,"email":"asd@asd.com","fullname":"asd","lastname":"asd","photopath":null,"registerdate":"2019-07-05T05:20:42.000Z","language":"TH"}]'
    setData(JSON.parse(json))
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
        <GreenTextButton onClick={()=>setEditting(!editting)}>Edit</GreenTextButton>
      </div>
      <List className={classes.listRoot}>
        <ListItem role={undefined} style={{ backgroundColor: grey[900], borderRadius: 4, cursor: 'auto', }}>
          <ListItemText style={{ color: 'white', margin: '8px 0' }} className={classes.listText} primary="First name" />
          <ListItemText style={{ color: 'white', margin: '8px 0' }} className={classes.listText}
            primary={ window.innerWidth >= 500?"Last name" : '' } />
          <ListItemIcon>
            <div style={{ width: 42 }}/>
          </ListItemIcon>
        </ListItem>
        { data && !data.status &&
          [
            ...(true)? data: handleSearch()
          ].slice(0, dataSliced).map(value => {
            return value && (
              <React.Fragment key={value.firstname + `(${value.userid})`}>
                <ListItem role={undefined}
                  style={{ cursor: editting? 'pointer' : 'auto' }}>
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
                    }/>
                  { window.innerWidth >= 500 &&
                    <ListItemText className={classes.listText} primary={value.lastname} />
                  }
                  <ListItemIcon>
                    { editting?
                      <IconButton
                        onClick={()=>handleOpen(value)}>
                        <CreateIcon classes={{ root: classes.createIcon }}/>
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
                { dataSliced >= data.length ? 'Collapse':'More' }
              </Button>
              { data && dataSliced < data.length &&
                <Button fullWidth onClick={handleMoreAll}>More All</Button>
              }
            </React.Fragment>
          }
          { data && handleSearch().length > 10 && searchUser &&
            <React.Fragment>
              <Button fullWidth onClick={handleMore}>
                { dataSliced >= handleSearch().length ? 'Collapse':'More' }
              </Button>
              { data && dataSliced < handleSearch().length &&
                <Button fullWidth onClick={handleMoreAll}>More All</Button>
              }
            </React.Fragment>
          }
        </ListItem>
        { searchUser && handleSearch().length === 0 &&
          <ListItem>
            <Typography component="div" style={{ width: '100%' }}>
              <Box style={{ textAlign: 'center', color: primary[900] }} fontWeight={500} fontSize={24} m={1}>
                No Reult
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
          { selectedFile || ( edittingUser && edittingUser.photopath )?
            <div style={{ position: 'relative', marginTop: 16, marginBottom: 8, border: `1px solid ${grey[400]}` }}
              onMouseEnter={()=>handleFileHover(true)}
              onMouseLeave={()=>handleFileHover(false)}>
              <img ref={imgRef}
                style={{ opacity: fileHover?.5:1, maxHeight: 280, height: window.innerWidth * .45 }}
                className={classes.matchImg}
                src={
                  selectedFile ?
                  URL.createObjectURL(selectedFile)
                  :
                  ( isSupportWebp? edittingUser.photopath + '.webp': edittingUser.photopath + '.jpg' )
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
