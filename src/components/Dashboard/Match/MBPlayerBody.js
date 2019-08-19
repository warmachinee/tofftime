import React from 'react';
import Loadable from 'react-loadable';
import Fuse from 'fuse.js';
import { makeStyles, withStyles, createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import * as API from './../../../api'
import { primary, grey, red } from './../../../api/palette'

import Paper from '@material-ui/core/Paper';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Slide from '@material-ui/core/Slide';
import Divider from '@material-ui/core/Divider';

import DeleteIcon from '@material-ui/icons/Delete';
import ClearIcon from '@material-ui/icons/Clear';
import SearchIcon from '@material-ui/icons/Search';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ClassIcon from '@material-ui/icons/Class';
import DesktopMacIcon from '@material-ui/icons/DesktopMac';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';

import { LDCircular } from './../../loading/LDCircular'

const TemplateDialog = Loadable({
  loader: () => import(/* webpackChunkName: "TemplateDialog" */'./../../TemplateDialog'),
  loading: () => <LDCircular />
});

const AddPlayerModal = Loadable({
  loader: () => import(/* webpackChunkName: "AddPlayerModal" */'./AddPlayerModal'),
  loading: () => <LDCircular />
});

const EditDisplayModal= Loadable({
  loader: () => import(/* webpackChunkName: "EditDisplayModal" */'./EditDisplayModal'),
  loading: () => <LDCircular />
});

const useStyles = makeStyles(theme => ({
  root: {
    padding: 8,
    position: 'relative'
  },
  listRoot: {
    position: 'relative',
    padding: theme.spacing(1, 2),
    width: '100%',
    backgroundColor: grey[50],
    cursor: 'pointer',
    marginTop: 24,
    overflow: 'auto',
  },
  listText:{
    overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis',
    width: '100%',
    textAlign: 'left'
  },
  listClass: {
    overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis',
    width: '30%',
    textAlign: 'left',
  },
  margin: {
    margin: theme.spacing(1),
  },
  controls: {
    position: 'relative',
    cursor: 'auto',
    display: 'block',
    [theme.breakpoints.up(700)]: {
      display: 'flex',
    },
  },
  addPlayerButton: {
    marginTop: 'auto',
    padding: '8px 16px 8px 0',
    width: '100%',
    color: theme.palette.getContrastText(red[600]),
    backgroundColor: red[600],
    '&:hover': {
      backgroundColor: red[800],
    },
    [theme.breakpoints.up(700)]: {
      width: 'auto'
    },
  },
  controlsEdit: {
    marginTop: 16,
    borderRadius: 4,
    border: `2px solid ${primary[600]}`,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    [theme.breakpoints.up(500)]: {
      marginTop: 16,
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
    },
    [theme.breakpoints.up(700)]: {
      marginTop: 0,
      width: 'auto',
      display: 'block',
    },
  },
  controlsEditButton: {
    marginTop: 'auto',
    [theme.breakpoints.up(500)]: {
      padding: '8px 16px',
    },
  },
  controlsEditButton2: {
    marginTop: 2,
    marginBottom: 2,
    [theme.breakpoints.up(500)]: {
      padding: '8px 36px',
    },
  },
  controlsEditButtonIcon: {
    position: 'absolute',
    [theme.breakpoints.up(500)]: {
      position: 'relative',
      marginRight: 8,
    },
  },
  controlsSecondary: {
    cursor: 'auto',
    justifyContent: 'flex-end',
    paddingTop: 0,
    paddingBottom: 0
  },
  selectedClassText: {
    color: '#3f51b5',
    fontWeight: 600,
    paddingLeft: 12,
    paddingBottom: 8,
    marginTop: 'auto'
  },
  searchBox: {
    width: '100%',
    [theme.breakpoints.up(600)]: {
      width: 'auto'
    },
  },
  arrowUpward: {
    color: 'white',
  },
  deleteIcon: {
    color: primary[600]
  },
  notice: {
    fontFamily: 'monospace',
    color: grey[600],
    fontWeight: 600,
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

const GreenCheckbox = withStyles({
  root: {
    color: primary[400],
    '&$checked': {
      color: primary[600],
    },
  },
})(props => <Checkbox color="default" {...props} />);

const theme = createMuiTheme({
  palette: {
    primary: primary,
  },
});

export default function MBPlayerBody(props){
  const classes = useStyles();
  const { sess, token, setCSRFToken, matchid, handleSnackBar, } = props
  const [ editting, setEditting ] = React.useState(false);
  const [ edittingClass, setEdittingClass ] = React.useState(false);
  const [ edittingDisplay, setEdittingDisplay ] = React.useState(false);
  const [ open, setOpen ] = React.useState(false);
  const [ displayModal, setDisplayModal ] = React.useState(false);
  const [ data, setData ] = React.useState(null)
  const [ matchDetail, setMatchDetail ] = React.useState([])
  const [ checked, setChecked ] = React.useState([]);
  const [ searchUser, setSearchUser ] = React.useState('')
  const [ dataSliced, setDataSliced ] = React.useState(10)
  const [ anchorEl, setAnchorEl ] = React.useState(null);
  const [ selectedClass, setSelectedClass ] = React.useState(0)
  const [ selectedPlayer, setSelectedPlayer ] = React.useState(null);

  function handleMenuClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleMenuClose() {
    setAnchorEl(null);
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

  function handleOpen(){
    setOpen(true);
  };

  function handleClose(){
    setOpen(false);
  };

  function handleDisplayModalOpen(){
    setDisplayModal(true);
  };

  function handleDisplayModalClose(){
    setDisplayModal(false);
  };

  function handleToggle(value){
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  function handleEdittingDisplay(){
    setEdittingDisplay(!edittingDisplay)

    setChecked([])
  }

  function handleDoneEditting(){
    setEditting(!editting)
    setChecked([])
  }

  function handleDoneEdittingClass(){
    setEdittingClass(!edittingClass)
    setChecked([])
  }

  function handleDoneEdittingDisplay(){
    setEdittingDisplay(!edittingDisplay)
  }

  function handleSave(){
    let userid = []
    let classno = []
    for(var i = 0;i < checked.length;i++){
      userid.push(checked[i].userid)
      classno.push(selectedClass)
    }
    handleSetClass(userid, classno)
  }

  function handleSelectedClass(d){
    if( d === 0 ){
      setSelectedClass(0)
    }else{
      setSelectedClass(d.classno)
    }
    handleMenuClose()
  }

  function handleSearch(){
    if(data){
      var options = {
        shouldSort: true,
        caseSensitive: true,
        minMatchCharLength: 2,
        keys: [
          "firstname",
          "lastname",
          "classname",
          "classno"
        ]
      }
      var fuse = new Fuse(data, options)
      var result = fuse.search(searchUser)
      return result
    }
  }

  function handleSelectedPlayer(d){
    console.log(d);
    setSelectedPlayer(d)
    handleDisplayModalOpen()
  }

  async function handleUpdateFlight(flightaction){
    if(matchid){
      const resToken = token? token : await API.xhrGet('getcsrf')
      await API.xhrPost(
        token? token : resToken.token,
        sess.typeid === 'admin' ? 'matchsection' : 'mmatchsection', {
          action: 'flight',
          flightaction: flightaction,
          matchid: matchid
      }, (csrf, d) =>{
        setCSRFToken(csrf)
        handleSnackBar({
          state: true,
          message: d.status,
          variant: d.status === 'uccess' ? 'success' : 'error',
          autoHideDuration: d.status === 'success'? 2000 : 5000
        })
      })
      await handleFetch()
    }
  }

  async function handleSetClass(userid, classno){
    if(matchid){
      const resToken = token? token : await API.xhrGet('getcsrf')
      await API.xhrPost(
        token? token : resToken.token,
        sess.typeid === 'admin' ? 'matchmember' : 'mmatchmember', {
          action: 'setclass',
          matchid: matchid,
          userid: userid,
          classno: classno
      }, (csrf, d) =>{
        setCSRFToken(csrf)
        handleSnackBar({
          state: true,
          message: d.status,
          variant: d.status === 'success' ? 'success' : 'error',
          autoHideDuration: d.status === 'success'? 2000 : 5000
        })
        setChecked([])
        try {
          handleFetch()
        }catch(err) { console.log(err.message) }
      })
    }
  }

  async function handleRemovePlayer(d){
    let userid = []
    if( typeof(d.userid) === 'number' ){
      userid.push(d.userid)
    }else{
      for(var i = 0;i < checked.length;i++){
        userid.push(checked[i].userid)
      }
    }
    if(matchid){
      const resToken = token? token : await API.xhrGet('getcsrf')
      await API.xhrPost(
        token? token : resToken.token,
        sess.typeid === 'admin' ? 'matchmember' : 'mmatchmember', {
          action: 'remove',
          matchid: matchid,
          userid: userid
      }, (csrf, d) =>{
        setCSRFToken(csrf)
        handleSnackBar({
          state: true,
          message: d.status,
          variant: d.status === 'remove member success' ? 'success' : 'error',
          autoHideDuration: d.status === 'success'? 2000 : 5000
        })
        setChecked([])
        try {
          handleFetch()
        }catch(err) { console.log(err.message) }
      })
    }
  }

  async function handleFetch(){
    if(matchid){
      const resToken = token? token : await API.xhrGet('getcsrf')
      await API.xhrPost(
        token? token : resToken.token,
        sess.typeid === 'admin' ? 'loadmatch' : 'mloadmatch', {
          action: 'userlist',
          matchid: matchid
      }, (csrf, d) =>{
        setCSRFToken(csrf)
        if(
          d.status !== 'no data' ||
          d.status !== 'wrong action' ||
          d.status !== 'wrong params'
        ){
          setData(d)
          try {
            handleFetchMatchDetail()
          }catch(err) { console.log(err.message) }
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

  async function handleFetchMatchDetail(){
    if(matchid){
      const resToken = token? token : await API.xhrGet('getcsrf')
      await API.xhrPost(
        token? token : resToken.token,
        sess.typeid === 'admin' ? 'loadmatch' : 'mloadmatch', {
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
          setMatchDetail(d)
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

  function tempFetch(){
    var json = '[{"userid":659293,"firstname":"เอกชัย","lastname":"ปัตถาวโร ","classno":0,"teamno":0,"out":0,"in":0,"par":0,"sf":0,"net":0,"hc":0,"display":1,"rank":0,"score":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},{"userid":637016,"firstname":"วานิช","lastname":"สมชาติ ","classno":1,"teamno":0,"out":0,"in":0,"par":0,"sf":0,"net":0,"hc":0,"display":1,"rank":0,"score":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},{"userid":118486,"firstname":"วรรธนะ","lastname":"ทับทิมทอง","classno":1,"teamno":0,"out":0,"in":0,"par":0,"sf":0,"net":0,"hc":0,"display":1,"rank":0,"score":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},{"userid":175937,"firstname":"ประทีป","lastname":"ค้ายาดี","classno":1,"teamno":0,"out":37,"in":36,"par":1,"sf":38,"net":70,"hc":3,"display":1,"rank":1,"score":[5,4,3,5,4,4,3,5,4,6,4,4,4,4,4,2,3,5]},{"userid":383134,"firstname":"สีไพร","lastname":"อภิสนธิ์","classno":1,"teamno":0,"out":37,"in":37,"par":2,"sf":37,"net":71,"hc":3,"display":1,"rank":2,"score":[4,4,3,5,4,3,4,5,5,5,3,4,4,4,4,3,5,5]},{"userid":422094,"firstname":"อธิวัฒน์","lastname":"แย้มเรืองรัตน์","classno":1,"teamno":0,"out":39,"in":35,"par":2,"sf":39,"net":69,"hc":5,"display":1,"rank":2,"score":[4,4,4,5,5,3,3,6,5,5,3,4,4,4,5,2,3,5]},{"userid":859661,"firstname":"พงศ์ภูมินทร์","lastname":"กล้าหาญ","classno":1,"teamno":0,"out":39,"in":36,"par":3,"sf":40,"net":68,"hc":7,"display":1,"rank":4,"score":[4,6,2,6,5,5,3,5,3,4,3,5,4,5,4,3,4,4]},{"userid":375128,"firstname":"วิชยะ","lastname":"ศรีนาคาร์","classno":1,"teamno":0,"out":38,"in":37,"par":3,"sf":37,"net":71,"hc":4,"display":1,"rank":4,"score":[4,5,3,5,5,4,3,5,4,6,3,4,5,4,4,3,4,4]},{"userid":380855,"firstname":"ประสิทธิ","lastname":"คำภูแสน","classno":1,"teamno":0,"out":39,"in":36,"par":3,"sf":41,"net":67,"hc":8,"display":1,"rank":4,"score":[5,5,4,4,5,5,2,4,5,7,3,4,4,3,4,3,4,4]},{"userid":560646,"firstname":"พูลลาภ","lastname":"เยือกเย็น","classno":1,"teamno":0,"out":38,"in":38,"par":4,"sf":37,"net":71,"hc":5,"display":1,"rank":7,"score":[6,5,3,4,4,4,3,5,4,5,3,5,5,4,4,3,4,5]},{"userid":825953,"firstname":"สัมพันธ์","lastname":"เรศมณเฑียร","classno":1,"teamno":0,"out":39,"in":37,"par":4,"sf":37,"net":71,"hc":5,"display":1,"rank":7,"score":[4,5,3,5,6,3,4,5,4,5,3,4,4,4,4,3,4,6]},{"userid":223893,"firstname":"พิทักษ์สรรค์ ","lastname":"นพสิทธิพร","classno":1,"teamno":0,"out":39,"in":38,"par":5,"sf":38,"net":70,"hc":7,"display":1,"rank":9,"score":[5,6,2,6,5,3,3,5,4,5,3,5,4,4,4,4,4,5]},{"userid":726183,"firstname":"ทินพันธ์","lastname":"พิลึก","classno":1,"teamno":0,"out":38,"in":41,"par":7,"sf":39,"net":69,"hc":10,"display":1,"rank":10,"score":[5,4,3,5,6,3,2,6,4,6,4,5,4,3,5,4,5,5]},{"userid":697510,"firstname":"วีรนันท์","lastname":"จันทร์เอียง","classno":1,"teamno":0,"out":40,"in":40,"par":8,"sf":36,"net":72,"hc":8,"display":1,"rank":11,"score":[4,5,4,6,4,4,3,6,4,5,3,4,6,5,5,3,4,5]},{"userid":186918,"firstname":"สุทธิพันธ์","lastname":"กิมสวัสดิ","classno":1,"teamno":0,"out":39,"in":42,"par":9,"sf":36,"net":72,"hc":9,"display":1,"rank":12,"score":[4,4,3,5,5,4,3,6,5,5,3,5,4,5,5,4,5,6]},{"userid":313675,"firstname":"วสันต์","lastname":"มีลาภ","classno":1,"teamno":0,"out":42,"in":39,"par":9,"sf":38,"net":70,"hc":11,"display":1,"rank":12,"score":[5,5,3,7,4,5,4,5,4,6,3,5,3,4,4,4,6,4]},{"userid":531500,"firstname":"ธนกฤต","lastname":"เครื่องสนุก","classno":1,"teamno":0,"out":47,"in":38,"par":13,"sf":36,"net":73,"hc":12,"display":1,"rank":14,"score":[4,5,4,8,4,4,5,6,7,6,2,5,4,4,4,4,4,5]},{"userid":686853,"firstname":"ภัศดา","lastname":"บุรณศิริ","classno":2,"teamno":0,"out":33,"in":34,"par":-5,"sf":41,"net":67,"hc":0,"display":1,"rank":1,"score":[4,4,2,4,4,3,3,5,4,5,3,4,4,4,4,3,3,4]},{"userid":298863,"firstname":"พรชัย","lastname":"เนียมหมื่นไวย์","classno":2,"teamno":0,"out":36,"in":34,"par":-2,"sf":41,"net":67,"hc":3,"display":1,"rank":2,"score":[4,5,3,4,4,3,4,5,4,5,3,5,3,4,3,2,4,5]},{"userid":290370,"firstname":"ดุสิต","lastname":"สมศักดิ์","classno":2,"teamno":0,"out":34,"in":38,"par":0,"sf":38,"net":70,"hc":2,"display":1,"rank":3,"score":[4,4,3,4,4,4,2,5,4,5,3,6,4,4,4,3,4,5]},{"userid":243286,"firstname":"พัสกร  ","lastname":"ยุพาวัฒนะ","classno":2,"teamno":0,"out":36,"in":37,"par":1,"sf":40,"net":68,"hc":5,"display":1,"rank":4,"score":[5,4,2,5,5,3,3,4,5,5,3,4,4,5,5,3,3,5]},{"userid":127642,"firstname":"ธงชัย","lastname":"แตงอ่อน","classno":2,"teamno":0,"out":40,"in":34,"par":2,"sf":38,"net":70,"hc":4,"display":1,"rank":5,"score":[5,4,3,5,5,5,3,6,4,5,2,4,4,4,4,2,4,5]},{"userid":121302,"firstname":"อานนท์ ","lastname":"โพธิ์ทอง","classno":2,"teamno":0,"out":37,"in":38,"par":3,"sf":38,"net":70,"hc":5,"display":1,"rank":6,"score":[5,4,3,5,4,3,3,5,5,4,4,5,4,4,4,3,5,5]},{"userid":584981,"firstname":"มนัส ","lastname":"สุขเย็น","classno":2,"teamno":0,"out":39,"in":36,"par":3,"sf":38,"net":70,"hc":5,"display":1,"rank":6,"score":[4,4,3,6,5,3,3,7,4,5,3,4,4,4,4,3,5,4]},{"userid":158541,"firstname":"Mike","lastname":"Missler","classno":2,"teamno":0,"out":37,"in":38,"par":3,"sf":36,"net":72,"hc":3,"display":1,"rank":6,"score":[4,4,3,5,5,4,3,5,4,5,3,4,4,4,5,3,4,6]},{"userid":395229,"firstname":"ธวัชชัย ","lastname":"ชายชาญ","classno":2,"teamno":0,"out":38,"in":38,"par":4,"sf":39,"net":69,"hc":7,"display":1,"rank":9,"score":[7,4,3,4,4,4,4,4,4,4,3,4,5,5,5,3,5,4]},{"userid":154714,"firstname":"ธวัช","lastname":"กุลสุวรรณ","classno":2,"teamno":0,"out":37,"in":39,"par":4,"sf":38,"net":70,"hc":6,"display":1,"rank":9,"score":[4,4,3,6,5,3,3,5,4,5,5,4,5,4,4,3,3,6]},{"userid":428247,"firstname":"นิรันทร์","lastname":"ฉัตรไกรศรี","classno":2,"teamno":0,"out":39,"in":38,"par":5,"sf":37,"net":71,"hc":6,"display":1,"rank":11,"score":[4,4,3,6,4,5,3,5,5,6,3,5,4,5,4,3,4,4]},{"userid":722638,"firstname":"พิทักษ์ ","lastname":"ศรีตะวัน","classno":2,"teamno":0,"out":39,"in":38,"par":5,"sf":36,"net":72,"hc":5,"display":1,"rank":11,"score":[4,5,3,5,4,5,4,5,4,5,3,5,4,5,4,3,4,5]},{"userid":735952,"firstname":"ธานนิทร์","lastname":"เหลืองภูมิยุทธ ","classno":2,"teamno":0,"out":39,"in":41,"par":8,"sf":37,"net":71,"hc":9,"display":1,"rank":13,"score":[5,4,4,4,5,4,3,5,5,5,3,4,4,5,6,3,5,6]},{"userid":958766,"firstname":"ธนู","lastname":"พุทธสุวรรณ","classno":2,"teamno":0,"out":38,"in":43,"par":9,"sf":38,"net":70,"hc":11,"display":1,"rank":14,"score":[5,4,3,5,3,5,3,5,5,6,4,3,4,5,7,2,5,7]},{"userid":432045,"firstname":"เยี่ยม","lastname":"สุขัง","classno":2,"teamno":0,"out":42,"in":39,"par":9,"sf":37,"net":71,"hc":10,"display":1,"rank":14,"score":[6,4,3,6,4,5,4,5,5,6,3,6,4,4,3,3,5,5]},{"userid":381888,"firstname":"ประคอง","lastname":"วระพันธุ์","classno":2,"teamno":0,"out":40,"in":41,"par":9,"sf":37,"net":71,"hc":10,"display":1,"rank":14,"score":[5,4,3,4,4,5,3,6,6,6,3,4,4,5,6,3,4,6]},{"userid":870523,"firstname":"ดิชพงศ์","lastname":"วงศ์คำจันทร์","classno":2,"teamno":0,"out":41,"in":40,"par":9,"sf":37,"net":71,"hc":10,"display":1,"rank":14,"score":[4,6,3,5,4,4,4,6,5,4,5,5,4,4,4,4,4,6]},{"userid":283135,"firstname":"วรพล ","lastname":"อ่อนนุช","classno":2,"teamno":0,"out":42,"in":40,"par":10,"sf":37,"net":71,"hc":11,"display":1,"rank":18,"score":[4,3,3,6,5,4,5,6,6,5,5,4,4,5,5,3,4,5]},{"userid":961801,"firstname":"วิรัตน์","lastname":"แป้นดี","classno":2,"teamno":0,"out":42,"in":40,"par":10,"sf":37,"net":71,"hc":11,"display":1,"rank":18,"score":[6,5,3,4,6,5,3,5,5,5,4,5,4,5,4,4,4,5]},{"userid":525973,"firstname":"วิริยะ ","lastname":"ใจชื่น","classno":2,"teamno":0,"out":44,"in":39,"par":11,"sf":38,"net":70,"hc":13,"display":1,"rank":20,"score":[6,4,2,7,5,4,5,5,6,6,3,4,4,5,4,2,4,7]},{"userid":171247,"firstname":"วิชัย ","lastname":"ศรีระผา","classno":2,"teamno":0,"out":43,"in":40,"par":11,"sf":35,"net":73,"hc":10,"display":1,"rank":20,"score":[5,6,3,5,4,4,4,8,4,5,5,4,4,4,5,3,5,5]},{"userid":452902,"firstname":"ภิรมย์","lastname":"ไพบูลย์ ","classno":2,"teamno":0,"out":42,"in":42,"par":12,"sf":38,"net":72,"hc":12,"display":1,"rank":22,"score":[5,5,3,9,3,4,3,6,4,5,5,6,4,5,4,5,4,4]},{"userid":289142,"firstname":"สุชาติ ","lastname":"ทะวะบุตร","classno":2,"teamno":0,"out":45,"in":42,"par":15,"sf":37,"net":73,"hc":14,"display":1,"rank":23,"score":[5,6,3,9,5,4,3,6,4,7,3,4,4,6,6,3,3,6]},{"userid":570929,"firstname":"สมนัส","lastname":"จันทนะ","classno":3,"teamno":0,"out":39,"in":38,"par":5,"sf":40,"net":68,"hc":9,"display":1,"rank":1,"score":[5,6,2,4,5,4,4,5,4,6,3,6,4,3,4,3,3,6]},{"userid":344566,"firstname":"ประทีป ","lastname":"แก้ววงษา ","classno":3,"teamno":0,"out":44,"in":37,"par":9,"sf":36,"net":72,"hc":9,"display":1,"rank":2,"score":[5,5,3,6,6,4,4,6,5,6,3,4,4,4,4,3,4,5]},{"userid":349921,"firstname":"สนอง ","lastname":"ช้างเนียม","classno":3,"teamno":0,"out":46,"in":39,"par":13,"sf":36,"net":72,"hc":13,"display":1,"rank":3,"score":[5,5,4,5,6,4,4,7,6,7,3,4,4,5,4,3,4,5]},{"userid":362257,"firstname":"ทวีโชค ","lastname":"พุทธชน","classno":3,"teamno":0,"out":41,"in":45,"par":14,"sf":36,"net":72,"hc":14,"display":1,"rank":4,"score":[6,4,4,5,5,4,3,5,5,7,4,5,4,6,4,3,5,7]}]'
    setData(JSON.parse(json))

    var json1 = '{"title":"SNT 4-2019","date":"04/07/2019","picture":"/matchlist/watermill.jpg","location":"Watermill GOLF&GARDENS","locationid":631932,"createdate":"04/07/2019","scorematch":0,"matchtype":0,"display":1,"status":1,"class":[{"classno":1,"classname":"S"},{"classno":2,"classname":"SS"},{"classno":3,"classname":"GS"}],"team":[],"playoff":[0,0,0]}'
    setMatchDetail(JSON.parse(json1))
  }

  React.useEffect(()=>{
    handleFetch()
    //tempFetch()
  },[ open, displayModal ])

  const [ ,updateState ] = React.useState(null)

  function resizeHandler(){
    updateState({})
  }

  React.useEffect(()=>{
    window.addEventListener('resize', resizeHandler)
    return ()=>{
      window.removeEventListener('resize', resizeHandler)
    }
  },[ window.innerWidth ])

  return(
    <div className={classes.root}>
      <List className={classes.listRoot}>
        <ListItem className={classes.controls}>
          { sess && sess.typeid === 'admin' &&
            <Button className={classes.addPlayerButton} variant="contained"
              onClick={handleOpen}>
              <AddCircleIcon style={{ marginRight: 8, marginLeft: 12 }}/>
              Add player
            </Button>
          }
          <div style={{ flex: 1 }} />
          <div
            className={classes.controlsEdit}
            style={{
              border: edittingClass && '0 solid',
              justifyContent: (editting || edittingClass || edittingDisplay)? 'flex-end' : 'space-around',
            }}>
            { !editting && !edittingClass &&
              (
                edittingDisplay?
                <GreenTextButton className={classes.controlsEditButton} onClick={handleDoneEdittingDisplay}>Done</GreenTextButton>
                :
                <GreenTextButton className={classes.controlsEditButton} onClick={handleEdittingDisplay}>
                  <DesktopMacIcon
                    style={{ left:
                      window.innerWidth > 500? 0 :
                      window.innerWidth > 450? '20%':'10%'
                    }}
                    className={classes.controlsEditButtonIcon}/>
                  Display
                </GreenTextButton>
              )
            }
            { !editting && !edittingDisplay && matchDetail &&/*style={{ padding: '8px 36px', margin: '2px 0' }}*/
              (
                edittingClass?
                <React.Fragment>
                  {
                    matchDetail.scorematch === 1?
                    <React.Fragment>
                      <GreenTextButton className={classes.controlsEditButton2} onClick={handleDoneEdittingClass}>Done</GreenTextButton>
                      <GreenButton className={classes.controlsEditButton2} onClick={handleSave}>Save</GreenButton>
                    </React.Fragment>
                    :
                    <React.Fragment>
                      <GreenTextButton className={classes.controlsEditButton2} onClick={handleDoneEdittingClass}>Done</GreenTextButton>
                    </React.Fragment>
                  }
                </React.Fragment>
                :
                <GreenTextButton className={classes.controlsEditButton} onClick={()=>setEdittingClass(!edittingClass)}>
                  <ClassIcon
                    style={{ left:
                      window.innerWidth > 500? 0 :
                      window.innerWidth > 450? '20%':'10%'
                    }}
                    className={classes.controlsEditButtonIcon}/>
                  { matchDetail.scorematch === 1? "Class" : 'Flight' }
                </GreenTextButton>
              )
            }
            { !edittingClass && !edittingDisplay &&
              (
                editting?
                <GreenTextButton className={classes.controlsEditButton2} style={{ marginTop: 0, marginBottom: 0}}
                  onClick={handleDoneEditting}>Done</GreenTextButton>
                :
                <GreenTextButton className={classes.controlsEditButton} onClick={()=>setEditting(!editting)}>
                  <DeleteIcon
                    style={{ left:
                      window.innerWidth > 500? 0 :
                      window.innerWidth > 450? '20%':'10%'
                    }}
                    className={classes.controlsEditButtonIcon}/>
                  Remove
                </GreenTextButton>
              )
            }
          </div>
        </ListItem>
        <ListItem className={classes.controlsSecondary}>
          { edittingClass && matchDetail &&
            (
              matchDetail.scorematch === 1?
              <React.Fragment>
                <div style={{ display: 'flex' }}>
                  <ClassIcon style={{ color: primary[600], marginRight: 4 }}/>
                  <div style={{ color: primary[700], marginTop: 'auto', marginRight: 12, fontWeight: 600, fontSize: 16, }}>{ selectedClass !== 0 ? 'Selected Class : ' : 'Select Class :' }</div>
                </div>
                <GreenTextButton variant="outlined" className={classes.controlsEditButton} onClick={handleMenuClick}>
                  { selectedClass !== 0?
                    matchDetail && matchDetail.class &&
                    matchDetail.class.filter( item =>{
                      return item.classno === selectedClass
                    }).map( d =>
                      d &&
                      <React.Fragment key={d.classname}>{d.classname}</React.Fragment>
                    )
                    : <React.Fragment>No class selected</React.Fragment>
                  }
                </GreenTextButton>
              </React.Fragment>
              :
              <React.Fragment>
                <GreenTextButton variant="outlined" className={classes.controlsEditButton2}
                  onClick={()=>handleUpdateFlight('clear')}>Clear</GreenTextButton>
                <GreenButton className={classes.controlsEditButton2}
                  onClick={()=>handleUpdateFlight('update')}>Update</GreenButton>
              </React.Fragment>
            )
          }
          { editting &&
            <GreenTextButton className={classes.controlsEditButton} style={{ marginTop: 1, marginBottom: 1 }} onClick={handleRemovePlayer}>
              <DeleteIcon />
              Remove
            </GreenTextButton>
          }
          { !( editting || edittingClass) &&
            <div style={{ height: 42 }}></div>
          }
        </ListItem>
        <ListItem style={{ marginBottom: 8, cursor: 'auto' }}>
          <ThemeProvider theme={theme}>
            <TextField
              disabled={data === null}
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
        </ListItem>
        <div style={{ overflow: 'auto', position: 'relative' }}>
          { ( editting || edittingClass || edittingDisplay ) &&
            <Typography component="div">
              <Box className={classes.notice} m={1}>
                { edittingDisplay && 'Click the list to toggle the player display.'}
                { edittingClass && 'Select class and player to change player class.'}
                { editting && 'Select the list to delete multiple or Hit the icon on the right to delete single.'}
              </Box>
            </Typography>
          }
          <ListItem role={undefined}
            style={{
              display: 'flex', backgroundColor: grey[900], borderRadius: 4, cursor: 'auto',
            }}>
            <ListItemText inset style={{ color: 'white', margin: '8px 0' }} className={classes.listText}
              primary={ window.innerWidth < 600? "Player" : "First name" } />
            { window.innerWidth >= 600 &&
              <ListItemText style={{ color: 'white', margin: '8px 0' }} className={classes.listText}
                primary="Last name" />
            }
            { window.innerWidth > 600 &&
              <ListItemText style={{ color: 'white', margin: '8px 0', marginRight: 20, width: '30%', textAlign: 'left', }}
                primary={ matchDetail.scorematch === 1? "Class" : 'Flight' } />
            }
            <ListItemIcon style={{ justifyContent: 'flex-start' }}>
              <div style={{ height: 42, width: 42 }}></div>
            </ListItemIcon>
          </ListItem>
          <div style={{ overflow: 'auto', maxHeight: window.innerHeight * .6, position: 'relative' }}>
            { data && !data.status && matchDetail &&
              [
                ...searchUser? handleSearch() : data
              ].slice(0, dataSliced).map(value => {

                return value && (
                  <React.Fragment key={value.userid}>
                    <ListItem role={undefined} button
                      onClick={()=>
                        ( editting || edittingClass )?
                        handleToggle(value):
                        ( edittingDisplay?
                          handleSelectedPlayer(value)
                          :
                          console.log()
                        )
                      }>
                      <ListItemIcon>
                        { ( editting || edittingClass )?
                          <GreenCheckbox
                            edge="start"
                            checked={checked.indexOf(value) !== -1}
                            tabIndex={-1}
                            disableRipple />
                          :
                          (edittingDisplay ?
                            <GreenCheckbox
                              edge="start"
                              checked={value.display === 1}
                              tabIndex={-1}
                              disableRipple />
                          :
                            <div style={{ height: 42, width: 42 }} />)
                        }
                      </ListItemIcon>
                      <ListItemText className={classes.listText}
                        primary={
                          ( window.innerWidth >= 450 && window.innerWidth < 600 )?
                          <div style={{ display: 'flex' }}>
                            { value.firstname }<div style={{ width: 20 }}></div>{ value.lastname }
                          </div>
                          : value.firstname}
                        secondary={
                          <React.Fragment>
                            { window.innerWidth < 450 &&
                              <Typography
                                component="span"
                                variant="body1"
                                color="textPrimary"
                              >
                                {value.lastname}
                              </Typography>
                            }
                            { matchDetail && matchDetail.class && window.innerWidth < 600 &&
                              ( value.classno === 0 ?
                                <React.Fragment>
                                  <br></br>
                                  {"-"}
                                </React.Fragment>
                                :
                                matchDetail.class.filter( d =>{
                                  return d.classno === value.classno
                                }).map((d, i) =>
                                  d &&
                                  <React.Fragment key={i}>
                                    <br></br>
                                    {
                                      matchDetail.scorematch === 1 ?
                                      d.classname
                                      :
                                      String.fromCharCode(65 + value.classno - 1)
                                    }

                                  </React.Fragment>
                                )
                              )
                            }
                            { value.note &&
                              <Typography variant="caption" display="block">
                                {value.note}
                              </Typography>
                            }
                          </React.Fragment>
                        } />
                      { window.innerWidth >= 600 &&
                        <ListItemText className={classes.listText}
                          primary={value.lastname}/>
                      }
                      { matchDetail && matchDetail.class && window.innerWidth > 600 &&
                        ( value.classno === 0 ?
                          <ListItemText style={{ justifyContent: 'center' }} className={classes.listClass}
                            primary={"-"} />
                          :
                          matchDetail.class.filter( d =>{
                            return d.classno === value.classno
                          }).map( d =>
                            d &&
                            <ListItemText
                              key={d.classname + `(${value.userid})`}
                              style={{ justifyContent: 'center' }}
                              className={classes.listClass}
                              primary={
                                matchDetail.scorematch === 1 ?
                                d.classname
                                :
                                String.fromCharCode(65 + value.classno - 1)
                              } />
                          )
                        )
                      }
                      <ListItemIcon style={{ justifyContent: 'flex-end' }}>
                        { editting?
                          <IconButton edge="end" onClick={()=>handleRemovePlayer(value)}>
                            <DeleteIcon classes={{ root: classes.deleteIcon}}/>
                          </IconButton>
                          :
                          <div style={{ height: 42, width: 42 }}></div>
                        }
                      </ListItemIcon>
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                );
              })
            }
            <ListItem role={undefined} dense style={{ display: 'flex' }}>
              { data && data.length > 10 && !searchUser &&
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
          </div>
        </div>
      </List>
      <TemplateDialog open={open} handleClose={handleClose}>
        <AddPlayerModal
          {...props}
          playerAction="add" />
      </TemplateDialog>
      <TemplateDialog open={displayModal} handleClose={handleDisplayModalClose}>
        { selectedPlayer &&
          <EditDisplayModal
            {...props}
            handleClose={handleDisplayModalClose}
            selectedPlayer={selectedPlayer}
            matchDetail={matchDetail}
            />
        }
      </TemplateDialog>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={()=>handleSelectedClass(0)}>{"-"}</MenuItem>
        { matchDetail && matchDetail.class &&
          matchDetail.class.map( (d, i) =>
            d &&
            <MenuItem key={"i : " + i + " data: " + d} onClick={()=>handleSelectedClass(d)}>{d.classname}</MenuItem>
          )
        }
      </Menu>
    </div>
  );
}
