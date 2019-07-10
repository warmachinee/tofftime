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
}
const urlHeader = [ 'https://www.', 'https://' ]

async function xhrGet(url){
  var hd = ( window.location.href.substring(0, 25) === 'https://www.' + webURL() )? urlHeader[0]:urlHeader[1]
  var req = new XMLHttpRequest();
  var sendUrl = hd + urlLink[url]

  req.open('GET', sendUrl, false);
  req.send(null);
  //var org = ( req.getResponseHeader('Origin') === 'https://www.thai-pga.com' )? urlHeader[0]:urlHeader[1]

  return {
    token: req.getResponseHeader('csrf-token'),
    response: JSON.parse(req.responseText),
  }
}
async function xhrPost(token, url, obj, func){
  /*--------------------USEAGE--------------------
  const [ csrfToken, setCSRFToken ] = React.useState(null)
  const [ dataSomeThing, setSomeThing ] = React.useState(null)
  .
  .
  .
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
  req.onreadystatechange = function() {
    if (req.readyState !== 4) return;
    if (req.status >= 200 && req.status < 300) {
      func(req.getResponseHeader('csrf-token'), JSON.parse(req.responseText))
    }else{
      console.log('Invalid !!!');
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
    return json;
  }
}

async function fetchPost({ url, obj }){
  if(
    typeof(url) === 'string'&&
    typeof(obj) === 'object'
  ){
    console.log('yay');
  }else{
    if(typeof(url) !== 'string'){ console.error('url is required string'); }
    if(typeof(obj) !== 'object'){ console.error('obj is required object'); }
  }
}

export {
  webURL,
  fetchUrl,
  fetchPost,
  xhrGet,
  xhrPost
}
