function webURL(){
  const URL = [ 'tofftime.com/', 'thai-pga.com/' ]
  return URL[1]
}

const urlLink = {
  //--------------------Main Page--------------------
  main: webURL(),
  getcsrf: webURL() + 'getcsrf',
  loadmatchsystem: webURL() + 'main/loadmatchsystem',
  userinfo: webURL() + 'session/userinfo',
  views: webURL() + 'session/views',
  loadgeneral: webURL() + 'main/loadgeneral',
  //--------------------Account--------------------
  login: webURL() + 'users/login',
  facebooklogin: webURL() + 'session/auth/facebook',
  googlelogin: webURL() + 'session/auth/google',
  register: webURL() + 'users/register',
  logout: webURL() + 'session/logout',
  //--------------------Dashboard--------------------
  loadmatch: webURL() + 'admin/loadmatch',
  loaduser: webURL() + 'admin/loaduser',
  matchsystem: webURL() + 'admin/matchsystem',
  loadfield: webURL() + 'admin/loadfield',
  fieldsystem: webURL() + 'admin/fieldsystem',
  matchsection: webURL() + 'admin/matchsection',
  matchmember: webURL() + 'admin/matchmember',
  displaymatchsystem: webURL() + 'admin/displaymatchsystem',
  rewardsystem: webURL() + 'admin/rewardsystem',
  loadmainpage: webURL() + 'admin/loadmainpage',
  matchmain: webURL() + 'admin/matchmain',
  usersystem: webURL() + 'admin/usersystem',
  newsmain: webURL() + 'admin/newsmain',
  announcemain: webURL() + 'admin/announcemain',
}
const urlHeader = [ 'https://www.', 'https://' ]

async function xhrGet(url, params){
  var hd = ( window.location.href.substring(0, 25) === 'https://www.' + webURL() )? urlHeader[0]:urlHeader[1]
  var req = new XMLHttpRequest();
  var sendUrl = hd + urlLink[url]
  if(params){
    sendUrl = sendUrl + params
  }
  req.open('GET', sendUrl, false);
  req.send(null);
  return new Promise(resolve => {
    resolve({
      token: req.getResponseHeader('csrf-token'),
      response: JSON.parse(req.responseText),
    });
  });
}

async function xhrPost(token, url, obj, func){
  /*--------------------USEAGE--------------------
  API.xhrPost( TOKEN, 'url', obj, function(csrf, d){
    setCSRFToken(csrf)  // set New token
    setSomeThing(d)     // set data from response
  })
  --------------------------------------------------*/
  var hd = ( window.location.href.substring(0, 25) === 'https://www.' + webURL() )? urlHeader[0]:urlHeader[1]
  var req = new XMLHttpRequest();
  var sendUrl = hd + urlLink[url]
  req.open("POST", sendUrl, true);
  req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
  req.setRequestHeader("Cache-Control", "no-cache")
  req.onreadystatechange = () => {
    if (req.readyState !== 4) return;
    if (req.status >= 200 && req.status < 300) {
      func(req.getResponseHeader('csrf-token'), JSON.parse(req.responseText))
    }
    if (req.status === 0){
      setTimeout(()=>{
        console.log(req);
        //xhrPost(token, url, obj, func)
      }, 5000)
    }
  }
  const returnedObj = Object.assign({
    _csrf: token
  }, obj)
  req.send(JSON.stringify(returnedObj));
}

async function fetchUrl(url){
  if(typeof(url) !== 'string'){ console.error('url is required string'); }
  else{
    const res = await fetch(urlLink[url])
    const json = await res.json()
    return new Promise(resolve => {
      resolve(json);
    });
  }
}

async function fetchPostFile(url, extendURL, obj, formData){
  var hd = ( window.location.href.substring(0, 25) === 'https://www.' + webURL() )? urlHeader[0]:urlHeader[1]
  var sendUrl = hd + urlLink[url] + extendURL

  const options = {
    async: true,
    crossDomain: true,
    method: 'post',
    headers: obj,
    body: formData,
  }
  const res = await fetch(sendUrl, options)
  const json = await res.json()
  return new Promise(resolve => {
    resolve(json);
  });
}

function TestFunc(){
  var obj = [
    { a: 1, createdate: 1},
    { a: 2, date3: 4},
    { a: 3, date2: 18}
  ]
  for(var i = 0;i < obj.length;i++){
    console.log(Object.getOwnPropertyNames(obj[i]).find( d =>{
      return /date/.test(d)
    }));
  }
}

function handleSortArray(data, primary, secondary){
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
  const day = (d.getDate() > 9) ? d.getDate():'0' + d.getDate()
  const month = (d.getMonth() + 1 > 9) ? d.getMonth() + 1:'0' + ( d.getMonth() + 1 )
  const dateStr = d.getFullYear() + '-' + month + '-' + day
  return dateStr
}

function handleStringToDate(d){
  if(d){
    const dateSp = d.split('/')
    const dateConvert = dateSp[1] + '/' + dateSp[0] + '/' + dateSp[2]
    return dateConvert
  }
}

export {
  webURL,
  fetchUrl,
  fetchPostFile,
  xhrGet,
  xhrPost,
  handleSortArray,
  handleGetPostTime,
  handleHoleSum,
  handleDateToString,
  handleStringToDate
}
