function _webURL(){
  const URL = [ 'tofftime.com', 'thai-pga.com' ]
  return URL[1]
}

function _getWebURL(){
  const URL = ( /www/.test(window.location.href)? 'https://www.' : 'https://' ) + _webURL()
  return URL
}

function _getPictureUrl(path){
  var url = ''
  if(path){
    let newPath = path.substring(0, 1) === '/' ? path : '/' + path
    if( /./.test(path.split('/')[path.split('/').length - 1]) ){
      newPath = path.split('.')[0]
    }
    url = _getWebURL() + newPath
  }
  return url
}

var count = 0

const urlLink = {
  //--------------------Main Page--------------------
  main: _getWebURL(),
  getcsrf: _getWebURL() + '/getcsrf',
  loadmatchsystem: _getWebURL() + '/main/loadmatchsystem',
  userinfo: _getWebURL() + '/session/userinfo',
  views: _getWebURL() + '/session/views',
  loadgeneral: _getWebURL() + '/main/loadgeneral',
  loadmatchsystem: _getWebURL() + '/main/loadmatchsystem',
  mloadpage: _getWebURL() + '/main/loadpage',
  matchgate: _getWebURL() + '/main/matchgate',
  //--------------------Account--------------------
  login: _getWebURL() + '/users/login',
  facebooklogin: _getWebURL() + '/session/auth/facebook',
  googlelogin: _getWebURL() + '/session/auth/google',
  register: _getWebURL() + '/users/register',
  logout: _getWebURL() + '/session/logout',
  forgotpassword: _getWebURL() + '/users/forgotpassword',
  loadusersystem: _getWebURL() + '/users/loadusersystem',
  uusersystem: _getWebURL() + '/users/usersystem',
  //--------------------Admin--------------------
  load_error: _getWebURL() + '/admin/load_error',
  report_error: _getWebURL() + '/admin/report_error',
  loadmatch: _getWebURL() + '/admin/loadmatch',
  loaduser: _getWebURL() + '/admin/loaduser',
  matchsystem: _getWebURL() + '/admin/matchsystem',
  loadfield: _getWebURL() + '/admin/loadfield',
  fieldsystem: _getWebURL() + '/admin/fieldsystem',
  matchsection: _getWebURL() + '/admin/matchsection',
  matchmember: _getWebURL() + '/admin/matchmember',
  displaymatchsystem: _getWebURL() + '/admin/displaymatchsystem',
  rewardsystem: _getWebURL() + '/admin/rewardsystem',
  loadmainpage: _getWebURL() + '/admin/loadmainpage',
  matchmain: _getWebURL() + '/admin/matchmain',
  usersystem: _getWebURL() + '/admin/usersystem',
  newsmain: _getWebURL() + '/admin/newsmain',
  announcemain: _getWebURL() + '/admin/announcemain',
  pagemain: _getWebURL() + '/admin/pagemain',
  loadpage: _getWebURL() + '/admin/loadpage',
  pagesystem: _getWebURL() + '/admin/pagesystem',
  pagesection: _getWebURL() + '/admin/pagesection',
  //--------------------User--------------------
  mloadmatch: _getWebURL() + '/match/loadmatch',
  mloaduser: _getWebURL() + '/match/loaduser',
  mmatchsystem: _getWebURL() + '/match/matchsystem',
  mmatchmember: _getWebURL() + '/match/matchmember',
  mdisplaymatchsystem: _getWebURL() + '/match/displaymatchsystem',
  mmatchsection: _getWebURL() + '/match/matchsection',
  mrewardsystem: _getWebURL() + '/match/rewardsystem',
  //--------------------Field--------------------
  floadfield: _getWebURL() + '/field/loadfield',
  ffieldsystem: _getWebURL() + '/field/fieldsystem',
  //--------------------Page--------------------
  ploadpage: _getWebURL() + '/page/loadpage',
  ppagesystem: _getWebURL() + '/page/pagesystem',
  ppagesection: _getWebURL() + '/page/pagesection',
}

/*
 * Fetch function
 */

function _xhrGet(url, params){
  return new Promise(resolve => {
    var req = new XMLHttpRequest();
    var sendUrl = urlLink[url]
    if(params){
      sendUrl = sendUrl + params
    }
    req.open('GET', sendUrl, false);
    req.send(null);
    resolve({
      token: req.getResponseHeader('csrf-token'),
      response: JSON.parse(req.responseText),
    });
  });
  /*
  return {
    token: req.getResponseHeader('csrf-token'),
    response: JSON.parse(req.responseText),
  }*/
}

function _xhrPost(token, url, obj, func){
  return new Promise( resolve =>{
    var req = new XMLHttpRequest();
    var sendUrl = urlLink[url]
    req.open("POST", sendUrl, true);
    req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    req.setRequestHeader("Cache-Control", "no-cache")
    req.onreadystatechange = () => {
      if (req.readyState !== 4) return;
      if (req.status >= 200 && req.status < 300) {
        if(req.responseText){
          func(req.getResponseHeader('csrf-token'), JSON.parse(req.responseText))
          resolve()
        }else{
          console.log(req.responseText);
        }
      }else{
        //console.log(req.status);
      }
      if (req.status === 403){
        window.location.replace('/');
      }
      /*
      if (req.status === 504){
        if(count < 3){
          setTimeout(()=>{
            _xhrPost(token, url, obj, func)
          }, 5000)
        }else{
          count = 0
          console.log('Stopped');
        }
        count++;
      }*/
    }
    const returnedObj = Object.assign({
      _csrf: token
    }, obj)
    req.send(JSON.stringify(returnedObj));
  })
}

function _fetchPostFile(url, extendURL, obj, formData){
  return new Promise(async resolve => {
    var sendUrl = urlLink[url]
    if(extendURL){
      sendUrl = sendUrl + extendURL
    }
    const options = {
      async: true,
      crossDomain: true,
      method: 'post',
      headers: obj,
      body: formData,
    }
    const res = await fetch(sendUrl, options)
    const json = await res.json()
    resolve(json);
  });
}
/*
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *
 * Sort object array handler function
 */

function _sortArrBy(data, primary, secondary){
   if(data){
     var obj = data
     obj.sort( (a, b) =>{
       const da = a[primary]
       const db = b[primary]
       if (da > db) return 1;
       if (da < db) return -1;
       if(secondary) return a[secondary].localeCompare(b[secondary]);
     })
     return obj
   }else{
     return null
   }
 }

function _sortArrByDate(data, primary, secondary){
  if(data){
    var obj = data
    obj.sort( (a, b) =>{
      const da = new Date(a[primary])
      const db = new Date(b[primary])
      if (da < db) return 1;
      if (da > db) return -1;
      if(secondary) return a[secondary].localeCompare(b[secondary]);
    })
    return obj
  }else{
    return null
  }
}

function sortReverseArrByDate(data, primary, secondary){
  if(data){
    var obj = data
    obj.sort( (a, b) =>{
      const da = new Date(a[primary])
      const db = new Date(b[primary])
      if (da > db) return 1;
      if (da < db) return -1;
      if(secondary) return a[secondary].localeCompare(b[secondary]);
    })
    return obj
  }else{
    return null
  }
}
/*
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *
 * Date handler function
 */

function _getPostTime(time){
  const today = new Date()
  const cdate = new Date(time)
  var diff = (today - cdate)/(1000) //millisecond
  var str = ''
  if(diff < 60){
    str = 'just now'
    return str
  }else{
    switch (true) {
      case diff >= 60 && diff < 60*60:
        diff = diff / 60
        if(Math.floor(diff) > 1){
          str = ' mins'
        }else{
          str = ' min'
        }
        break;
      case diff>=60*60 && diff < 60*60*24:
        diff = diff / ( 60*60 )
        if(Math.floor(diff) > 1){
          str = ' hrs'
        }else{
          str = ' hr'
        }
        break;
      case diff>=60*60*24 && diff < 60*60*24*30:
        diff = diff / ( 60*60*24 )
        if(Math.floor(diff) > 1){
          str = ' days'
        }else{
          str = ' day'
        }
        break;
      case diff>=60*60*24*30 && diff < 60*60*24*30*12:
        diff = diff / ( 60*60*24*30 )
        if(Math.floor(diff) > 1){
          str = ' months'
        }else{
          str = ' month'
        }
        break;
      case diff>=60*60*24*30*12:
        diff = diff / ( 60*60*24*30*12 )
        if(Math.floor(diff) > 1){
          str = ' years'
        }else{
          str = ' year'
        }
        break;
      default:
        return _dateToString(time)
    }
    return Math.floor(diff) + str
  }
}

function _dateSendToAPI(d){
  if(d){
    var thisD, day, month, dateStr;
    if(typeof(d) === 'object'){ thisD = d }
    else{ thisD = new Date(d) }
    day = (thisD.getDate() > 9) ? thisD.getDate():'0' + thisD.getDate()
    month = (thisD.getMonth() + 1 > 9) ? thisD.getMonth() + 1:'0' + ( thisD.getMonth() + 1 )
    dateStr = thisD.getFullYear() + '-' + month + '-' + day
    return dateStr
  }else{
    console.log('ERROR _dateSendToAPI', d);
  }
}

function _dateToString(d){
  if(d){
    var thisD, day, month, dateStr;
    if(typeof(d) === 'object'){ thisD = d }
    else{ thisD = new Date(d) }
    day = (thisD.getDate() > 9) ? thisD.getDate():'0' + thisD.getDate()
    month = (thisD.getMonth() + 1 > 9) ? thisD.getMonth() + 1:'0' + ( thisD.getMonth() + 1 )
    dateStr = `${_getMonthFromNumber(month)} ${day}, ${thisD.getFullYear()}`
    return dateStr
  }else{
    console.log('ERROR _dateToString', d);
  }
}

function _getMonthFromNumber(number){
  if(number){
    switch (number) {
      case 1:
        return 'Jan'
        break;
      case 2:
        return 'Feb'
        break;
      case 3:
        return 'Mar'
        break;
      case 4:
        return 'Apr'
        break;
      case 5:
        return 'May'
        break;
      case 6:
        return 'June'
        break;
      case 7:
        return 'July'
        break;
      case 8:
        return 'Aug'
        break;
      case 9:
        return 'Sep'
        break;
      case 10:
        return 'Oct'
        break;
      case 11:
        return 'Nov'
        break;
      default:
        return 'Dec'
    }
  }
}

function _stringToDate(d){
  if(d){
    const dateSp = d.split('/')
    const dateConvert = dateSp[1] + '/' + dateSp[0] + '/' + dateSp[2]
    return dateConvert
  }
}

/*
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *
 * Time handler function
 */

function _getTodayTime(){
const today = new Date()
const hr = ( today.getHours() < 10 )? '0' + today.getHours() : today.getHours()
const min = ( today.getMinutes() < 10 )? '0' + today.getMinutes() : today.getMinutes()
const time = hr + ":" + min
return time
}

function _dateToTimeString(d){
  if(d){
    const today = new Date(d)
    const hr = ( today.getHours() < 10 )? '0' + today.getHours() : today.getHours()
    const min = ( today.getMinutes() < 10 )? '0' + today.getMinutes() : today.getMinutes()
    const time = hr + ":" + min
    return time
  }else{
    console.log('ERROR _dateToTimeString', d);
  }
}

/*
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *
 * Other number handler function
 */

function _handleHoleSum(array, type){
  let temp = 0
  let start = (type === 'out')? 0 : 9
  let end = (type === 'out')? 9 : 18
  for(var i = start;i < end;i++){
   temp += array[i]
  }
  return temp
}

function _prefixNumber(num){
  switch (true) {
   case num > 0:
     return `+ ${num}`
     break;
   case num < 0:
     return `- ${Math.abs(num)}`
     break;
   default:
     return num
  }
}

function _shotnessNumber(number){
    var num = parseInt(number)
    var str = ''
    var strNum = 0;
    var postfix = ''
    switch (true) {
      case num >= 1000 * 1000 * 1000:
        strNum = parseFloat(( num / (1000 * 1000 * 1000) ).toPrecision(3))
        postfix = 'B'
        break;
      case num >= 1000 * 1000:
        strNum = parseFloat(( num / (1000 * 1000) ).toPrecision(3))
        postfix = 'M'
        break;
      case num >= 1000:
        strNum = parseFloat(( num / 1000 ).toPrecision(3))
        postfix = 'K'
        break;
      default:
        return num
    }
    if(!Number.isInteger(strNum)){
      var indexOfDecimal = strNum.toString().indexOf(".");
      var integerPart = parseFloat(strNum.toString().substring(0, indexOfDecimal))
      var decimalPart = parseFloat(strNum.toString().substring(indexOfDecimal))
      if(integerPart > 10){
        strNum = parseInt(strNum)
      }else{
        if(decimalPart * 10 < 1){
          strNum = parseInt(strNum)
        }else{
          var addDecimalPart = (decimalPart * 10).toString().substring(0, 1)
          strNum = parseInt(strNum) + '.' + addDecimalPart
        }
      }
    }
    str = strNum + postfix
    return str
  }


/*
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *
 * Other handler function
 */

function _handleScrolllTo(element){
  var elmnt = document.getElementById("el_" + element);
  var header = document.getElementById("el_header")
  //elmnt.scrollIntoView(true);
  window.scrollTo(0, elmnt.offsetTop - header.offsetHeight)
}

function _scrolllToId(id){
  var elmnt = document.getElementById(id);
  //elmnt.scrollIntoView(true);
  window.scrollTo(0, elmnt.offsetTop - 64)
}

function _handleAmateurClass(classno){
  var asciiNumber = parseInt(classno)
  if(!isNaN(asciiNumber)){
    var res = `Flight ${String.fromCharCode(asciiNumber + 64)}`
    return res
  }
}

/*
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *
 * Not finish function
 */

function objectException(object, attribute){
  var rawObj = {...object}
  for(var i = 0;i < attribute.length;i++){
    delete rawObj[attribute[i]]
  }
  return rawObj
}

function _isDesktopBrowser(){
  if(
    navigator.userAgent.match(/Android/i) ||
    navigator.userAgent.match(/webOS/i) ||
    navigator.userAgent.match(/iPhone/i) ||
    navigator.userAgent.match(/iPad/i) ||
    navigator.userAgent.match(/iPod/i) ||
    navigator.userAgent.match(/BlackBerry/i) ||
    navigator.userAgent.match(/Windows Phone/i)
  ){
    return false;
  }else{
    return true;
  }
}
/*
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 */

import wording from './wording'

export {
  _webURL,
  _getWebURL,
  _getPictureUrl,
  urlLink,

  _fetchPostFile,
  _xhrGet,
  _xhrPost,

  _sortArrBy,
  _sortArrByDate,
  sortReverseArrByDate,

  _getPostTime,
  _dateSendToAPI,
  _dateToString,
  _stringToDate,

  _getTodayTime,
  _dateToTimeString,

  _handleHoleSum,
  _prefixNumber,
  _shotnessNumber,

  _handleScrolllTo,
  _scrolllToId,
  _handleAmateurClass,

  objectException,
  _isDesktopBrowser,

  wording as _getWord,
}
