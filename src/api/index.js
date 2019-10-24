function dummyPlayer(){
  return [{"userid":773936,"status":"success"},{"userid":656705,"status":"success"},{"userid":380855,"status":"success"},{"userid":980385,"status":"success"},{"userid":968694,"status":"fail"},{"userid":452902,"status":"success"},{"userid":448179,"status":"success"},{"userid":317246,"status":"success"},{"userid":838489,"status":"success"},{"userid":127642,"status":"success"},{"userid":422094,"status":"success"},{"userid":637016,"status":"success"},{"userid":398717,"status":"fail"},{"userid":846610,"status":"success"},{"userid":186918,"status":"success"},{"userid":296764,"status":"success"},{"userid":177725,"status":"success"},{"userid":223893,"status":"success"},{"userid":735952,"status":"success"},{"userid":704282,"status":"success"},{"userid":470988,"status":"success"},{"userid":395229,"status":"success"},{"userid":843398,"status":"success"},{"userid":765571,"status":"fail"},{"userid":456902,"status":"success"},{"userid":937491,"status":"success"},{"userid":623655,"status":"success"},{"userid":579154,"status":"success"},{"userid":283135,"status":"success"},{"userid":243286,"status":"fail"},{"userid":872037,"status":"success"},{"userid":215839,"status":"success"},{"userid":760333,"status":"success"},{"userid":722638,"status":"success"},{"userid":525973,"status":"success"},{"userid":396119,"status":"success"},{"userid":121302,"status":"success"},{"userid":584981,"status":"success"},{"userid":144078,"status":"success"},{"userid":745918,"status":"success"},{"userid":872971,"status":"success"},{"userid":731068,"status":"success"},{"userid":289142,"status":"success"},{"userid":171247,"status":"success"},{"userid":561425,"status":"success"},{"userid":254177,"status":"success"},{"userid":294070,"status":"success"},{"userid":531624,"status":"success"},{"userid":441485,"status":"success"},{"userid":349921,"status":"success"},{"userid":508979,"status":"success"},{"userid":206427,"status":"success"},{"userid":344566,"status":"success"},{"userid":362257,"status":"success"},{"userid":672912,"status":"success"},{"userid":265192,"status":"success"},{"userid":329912,"status":"success"},{"userid":123456,"status":"success"},{"userid":832753,"status":"success"},{"userid":293360,"status":"success"},{"userid":684696,"status":"success"},{"userid":859661,"status":"success"},{"userid":697510,"status":"success"},{"userid":872312,"status":"success"},{"userid":186040,"status":"success"},{"userid":657493,"status":"success"},{"userid":189058,"status":"success"},{"userid":220606,"status":"success"},{"userid":224679,"status":"success"},{"userid":725595,"status":"success"},{"userid":834214,"status":"success"},{"userid":502367,"status":"success"},{"userid":479188,"status":"success"},{"userid":147737,"status":"success"},{"userid":828698,"status":"success"},{"userid":958766,"status":"success"},{"userid":801873,"status":"success"},{"userid":804737,"status":"success"},{"userid":476885,"status":"success"},{"userid":722345,"status":"success"},{"userid":863757,"status":"success"},{"userid":906954,"status":"success"},{"userid":673426,"status":"success"},{"userid":176525,"status":"success"},{"userid":299043,"status":"success"},{"userid":171843,"status":"success"},{"userid":870523,"status":"success"},{"userid":368303,"status":"success"},{"userid":432045,"status":"success"},{"userid":781511,"status":"success"},{"userid":317029,"status":"success"},{"userid":516627,"status":"success"},{"userid":964238,"status":"success"},{"userid":511165,"status":"success"},{"userid":808611,"status":"fail"},{"userid":755692,"status":"success"},{"userid":148989,"status":"success"},{"userid":825953,"status":"success"},{"userid":834212,"status":"success"},{"userid":983681,"status":"success"},{"userid":385153,"status":"success"},{"userid":780070,"status":"success"},{"userid":302319,"status":"success"},{"userid":492624,"status":"success"},{"userid":940352,"status":"success"},{"userid":722126,"status":"success"},{"userid":135543,"status":"success"},{"userid":290370,"status":"success"},{"userid":995067,"status":"success"},{"userid":745066,"status":"success"},{"userid":335794,"status":"success"},{"userid":897468,"status":"success"},{"userid":509279,"status":"success"},{"userid":923566,"status":"success"},{"userid":879750,"status":"success"},{"userid":922817,"status":"success"},{"userid":449656,"status":"success"},{"userid":302918,"status":"success"},{"userid":686853,"status":"success"},{"userid":366656,"status":"success"},{"userid":688633,"status":"success"},{"userid":150746,"status":"success"},{"userid":668104,"status":"success"},{"userid":726183,"status":"success"},{"userid":719142,"status":"success"},{"userid":784669,"status":"success"},{"userid":154714,"status":"success"},{"userid":489319,"status":"success"},{"userid":845215,"status":"success"},{"userid":455753,"status":"success"},{"userid":169226,"status":"success"},{"userid":802436,"status":"success"},{"userid":767936,"status":"success"},{"userid":889093,"status":"success"},{"userid":943009,"status":"success"},{"userid":473826,"status":"success"},{"userid":560646,"status":"success"},{"userid":772860,"status":"success"},{"userid":531500,"status":"success"},{"userid":166164,"status":"success"},{"userid":915035,"status":"success"},{"userid":375128,"status":"success"},{"userid":463456,"status":"success"},{"userid":986963,"status":"success"},{"userid":247348,"status":"success"},{"userid":158541,"status":"success"},{"userid":570929,"status":"success"},{"userid":162256,"status":"success"},{"userid":313675,"status":"success"},{"userid":383134,"status":"success"},{"userid":118486,"status":"success"},{"userid":175937,"status":"success"},{"userid":839337,"status":"success"},{"userid":381888,"status":"success"},{"userid":428247,"status":"success"},{"userid":961801,"status":"success"},{"userid":298863,"status":"success"},{"userid":823839,"status":"success"}]
}

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

const urlHeader = [ 'https://www.', 'https://' ]

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
        window.location.href = '/'
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

function sortArrByDate(data, primary, secondary){
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

function sortArrByDateStr(data, primary, secondary){
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

function _handleAmateurClass(classno){
  var asciiNumber = parseInt(classno)
  if(!isNaN(asciiNumber)){
    var res = String.fromCharCode(asciiNumber + 64)
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

/*
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 */

export {
  dummyPlayer,
  _webURL,
  _getWebURL,
  _getPictureUrl,
  urlLink,

  _fetchPostFile,
  _xhrGet,
  _xhrPost,

  sortArrByDate,
  sortArrByDateStr,
  sortReverseArrByDate,

  _getPostTime,
  _dateSendToAPI,
  _dateToString,
  _stringToDate,
  _getTodayTime,

  _handleHoleSum,
  _prefixNumber,
  _shotnessNumber,

  _handleScrolllTo,
  _handleAmateurClass,

  objectException,

}
