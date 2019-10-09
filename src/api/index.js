function webURL(){
  const URL = [ 'tofftime.com', 'thai-pga.com' ]
  return URL[1]
}

function getWebURL(){
  const URL = ( /www/.test(window.location.href)? 'https://www.' : 'https://' ) + webURL()
  return URL
}

function getPictureUrl(path){
  var url = ''
  if(path){
    let newPath = path.substring(0, 1) === '/' ? path : '/' + path
    if( /./.test(path.split('/')[path.split('/').length - 1]) ){
      newPath = path.split('.')[0]
    }
    url = getWebURL() + newPath
  }
  return url
}

var count = 0

const urlLink = {
  //--------------------Main Page--------------------
  main: getWebURL(),
  getcsrf: getWebURL() + '/getcsrf',
  loadmatchsystem: getWebURL() + '/main/loadmatchsystem',
  userinfo: getWebURL() + '/session/userinfo',
  views: getWebURL() + '/session/views',
  loadgeneral: getWebURL() + '/main/loadgeneral',
  loadmatchsystem: getWebURL() + '/main/loadmatchsystem',
  mloadpage: getWebURL() + '/main/loadpage',
  //--------------------Account--------------------
  login: getWebURL() + '/users/login',
  facebooklogin: getWebURL() + '/session/auth/facebook',
  googlelogin: getWebURL() + '/session/auth/google',
  register: getWebURL() + '/users/register',
  logout: getWebURL() + '/session/logout',
  forgotpassword: getWebURL() + '/users/forgotpassword',
  loadusersystem: getWebURL() + '/users/loadusersystem',
  uusersystem: getWebURL() + '/users/usersystem',
  //--------------------Admin--------------------
  loadmatch: getWebURL() + '/admin/loadmatch',
  loaduser: getWebURL() + '/admin/loaduser',
  matchsystem: getWebURL() + '/admin/matchsystem',
  loadfield: getWebURL() + '/admin/loadfield',
  fieldsystem: getWebURL() + '/admin/fieldsystem',
  matchsection: getWebURL() + '/admin/matchsection',
  matchmember: getWebURL() + '/admin/matchmember',
  displaymatchsystem: getWebURL() + '/admin/displaymatchsystem',
  rewardsystem: getWebURL() + '/admin/rewardsystem',
  loadmainpage: getWebURL() + '/admin/loadmainpage',
  matchmain: getWebURL() + '/admin/matchmain',
  usersystem: getWebURL() + '/admin/usersystem',
  newsmain: getWebURL() + '/admin/newsmain',
  announcemain: getWebURL() + '/admin/announcemain',
  pagemain: getWebURL() + '/admin/pagemain',
  loadpage: getWebURL() + '/admin/loadpage',
  pagesystem: getWebURL() + '/admin/pagesystem',
  pagesection: getWebURL() + '/admin/pagesection',
  //--------------------User--------------------
  mloadmatch: getWebURL() + '/match/loadmatch',
  mloaduser: getWebURL() + '/match/loaduser',
  mmatchsystem: getWebURL() + '/match/matchsystem',
  mmatchmember: getWebURL() + '/match/matchmember',
  mdisplaymatchsystem: getWebURL() + '/match/displaymatchsystem',
  mmatchsection: getWebURL() + '/match/matchsection',
  mrewardsystem: getWebURL() + '/match/rewardsystem',
  //--------------------Field--------------------
  floadfield: getWebURL() + '/field/loadfield',
  ffieldsystem: getWebURL() + '/field/fieldsystem',
  //--------------------Page--------------------
  ploadpage: getWebURL() + '/page/loadpage',
  ppagesystem: getWebURL() + '/page/pagesystem',
  ppagesection: getWebURL() + '/page/pagesection',
}

const urlHeader = [ 'https://www.', 'https://' ]

function xhrGet(url, params){
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

function xhrPost(token, url, obj, func){
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
            xhrPost(token, url, obj, func)
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

function fetchPostFile(url, extendURL, obj, formData){
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
      const da = new Date(handleStringToDate(a[primary]))
      const db = new Date(handleStringToDate(b[primary]))
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

function handleGetPostTime(time){
  const today = new Date()
  const cdate = new Date(time)
  var diff = (today - cdate)/(1000) //millisecond
  var str = ''
  if(diff < 60){
    str = 'just now'
    return str
  }else{
    if(diff >= 60 && diff < 60*60){
      diff = diff / 60
      if(Math.floor(diff) > 1){
        str = ' mins'
      }else{
        str = ' min'
      }
    }
    if(diff>=60*60 && diff < 60*60*24){
      diff = diff / ( 60*60 )
      if(Math.floor(diff) > 1){
        str = ' hrs'
      }else{
        str = ' hr'
      }
    }
    if(diff>=60*60*24 && diff < 60*60*24*30){
      diff = diff / ( 60*60*24 )
      if(Math.floor(diff) > 1){
        str = ' days'
      }else{
        str = ' day'
      }
    }
    if(diff>=60*60*24*30 && diff < 60*60*24*30*12){
      diff = diff / ( 60*60*24*30 )
      if(Math.floor(diff) > 1){
        str = ' months'
      }else{
        str = ' month'
      }
    }
    if(diff>=60*60*24*30*12){
      diff = diff / ( 60*60*24*30*12 )
      if(Math.floor(diff) > 1){
        str = ' years'
      }else{
        str = ' year'
      }
    }
    return Math.floor(diff) + str
  }
}

function handleGetDate(date){
  var thisD;
  var day;
  var month;
  var dateStr;
  const today = new Date()
  const cdate = new Date( /\//.test(date) ? handleStringToDate(date) : date )
  var diff = (today - cdate)/(1000) //millisecond
  var str = ''
  if(diff >=0 && diff < 60){
    str = 'just now'
    return str
  }else{
    if(diff >= 60 && diff < 60*60){
      diff = diff / 60
      if(Math.floor(diff) > 1){
        str = ' mins'
      }else{
        str = ' min'
      }
      return Math.floor(diff) + str
    }
    if(diff>=60*60 && diff < 60*60*24){
      diff = diff / ( 60*60 )
      if(Math.floor(diff) > 1){
        str = ' hrs'
      }else{
        str = ' hr'
      }
      return Math.floor(diff) + str
    }
    else{
      thisD = cdate
      day = (thisD.getDate() > 9) ? thisD.getDate():'0' + thisD.getDate()
      month = (thisD.getMonth() + 1 > 9) ? thisD.getMonth() + 1:'0' + ( thisD.getMonth() + 1 )
      dateStr = day + '/' + month + '/' + thisD.getFullYear()
      return dateStr
    }
  }
}

function handleHoleSum(array, type){
  let temp = 0
  let start = (type === 'out')? 0 : 9
  let end = (type === 'out')? 9 : 18
  for(var i = start;i < end;i++){
    temp += array[i]
  }
  return temp
}

function handleDateToString(d){
  if(d){
    var thisD;
    var day;
    var month;
    var dateStr;
    if(typeof(d) === 'object'){
      thisD = d
      day = (thisD.getDate() > 9) ? thisD.getDate():'0' + thisD.getDate()
      month = (thisD.getMonth() + 1 > 9) ? thisD.getMonth() + 1:'0' + ( thisD.getMonth() + 1 )
      dateStr = thisD.getFullYear() + '-' + month + '-' + day
    }else{
      thisD = new Date(d)
      day = (thisD.getDate() > 9) ? thisD.getDate():'0' + thisD.getDate()
      month = (thisD.getMonth() + 1 > 9) ? thisD.getMonth() + 1:'0' + ( thisD.getMonth() + 1 )
      dateStr = thisD.getFullYear() + '-' + month + '-' + day
    }
    return dateStr
  }
}

function dateToString(d){
  if(d){
    var thisD;
    var day;
    var month;
    var dateStr;
    if(typeof(d) === 'object'){
      thisD = d
      day = (thisD.getDate() > 9) ? thisD.getDate():'0' + thisD.getDate()
      month = (thisD.getMonth() + 1 > 9) ? thisD.getMonth() + 1:'0' + ( thisD.getMonth() + 1 )
      dateStr = day + '-' + month + '-' + thisD.getFullYear()
    }else{
      thisD = new Date(d)
      day = (thisD.getDate() > 9) ? thisD.getDate():'0' + thisD.getDate()
      month = (thisD.getMonth() + 1 > 9) ? thisD.getMonth() + 1:'0' + ( thisD.getMonth() + 1 )
      dateStr = day + '-' + month + '-' + thisD.getFullYear()
    }
    return dateStr
  }
}

function handleStringToDate(d){
  if(d){
    const dateSp = d.split('/')
    const dateConvert = dateSp[1] + '/' + dateSp[0] + '/' + dateSp[2]
    return dateConvert
  }
}

function getTodayTime(){
  const today = new Date()
  const hr = ( today.getHours() < 10 )? '0' + today.getHours() : today.getHours()
  const min = ( today.getMinutes() < 10 )? '0' + today.getMinutes() : today.getMinutes()
  const time = hr + ":" + min
  return time
}

function handleScrolllTo(element){
  var elmnt = document.getElementById("el_" + element);
  var header = document.getElementById("el_header")
  //elmnt.scrollIntoView(true);
  window.scrollTo(0, elmnt.offsetTop - header.offsetHeight)
}

function handleAmateurClass(classno){
  var asciiNumber = parseInt(classno)
  if(!isNaN(asciiNumber)){
    var res = String.fromCharCode(asciiNumber + 64)
    return res
  }
}

function handleGetUrlParam(){
  var arrSplit = window.location.pathname.split('/')
  var length = window.location.pathname.split('/').length
  return parseInt(arrSplit[ length - 1 ])
}

function filterArr(arr1, arr2){
  const returnArr = []
  const finalArr = []
  const newArr = []
  const comparerArr = []
  arr1.forEach( e1 =>{
    newArr.push(e1.userid)
  })

  arr2.forEach( e2 =>{
    comparerArr.push(e2.userid)
  })
  newArr.forEach( ne1 =>{
    if(!comparerArr.includes(ne1)){
      finalArr.push(ne1)
    }
  })
  arr1.forEach( item =>{
    finalArr.forEach( fe =>{
      if(fe === item.userid){
        returnArr.push(item)
      }
    })
  })
  return returnArr
}

function prefixNumber(num){
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

export {
  webURL,
  getWebURL,
  getPictureUrl,
  urlLink,
  fetchPostFile,
  xhrGet,
  xhrPost,
  sortArrByDate,
  sortArrByDateStr,
  sortReverseArrByDate,
  handleGetPostTime,
  handleGetDate,
  handleHoleSum,
  handleDateToString,
  dateToString,
  handleStringToDate,
  getTodayTime,
  handleScrolllTo,
  handleAmateurClass,
  handleGetUrlParam,
  filterArr,
  prefixNumber,
  
}
