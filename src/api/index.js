const urlLink = {
  //--------------------Main Page--------------------
  main: 'https://thai-pga.com',
  getcsrf: 'https://thai-pga.com/getcsrf',
  loadmatchsystem: 'https://thai-pga.com/main/loadmatchsystem',
  userinfo: 'https://thai-pga.com/session/userinfo',
  views: 'https://thai-pga.com/session/views',
  //--------------------Account--------------------
  login: 'https://thai-pga.com/users/login',
  facebooklogin: 'https://thai-pga.com/session/auth/facebook',
  googlelogin: 'https://thai-pga.com/session/auth/google',
  register: 'https://thai-pga.com/users/register',
  logout: 'https://thai-pga.com/logout',
  //--------------------Dashboard--------------------
  adminloadmatch: 'https://thai-pga.com/admin/loadmatch',
  adminloaduser: 'https://thai-pga.com/admin/loaduser',
  adminmatchsystem: 'https://thai-pga.com/admin/matchsystem',
  adminloadfield: 'https://thai-pga.com/admin/loadfield',
  adminfieldsystem: 'https://thai-pga.com/admin/fieldsystem',
  adminmatchsection: 'https://thai-pga.com/admin/matchsection',
  adminmatchmember: 'https://thai-pga.com/admin/matchmember',
  admindisplaymatchsystem: 'https://thai-pga.com/admin/displaymatchsystem'
}
async function xhrGet(url){
  var req = new XMLHttpRequest();
  req.open('GET', urlLink[url], false);
  req.send(null);
  return {
    token: req.getResponseHeader('csrf-token'),
    response: JSON.parse(req.responseText)
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
  var req = new XMLHttpRequest();
  req.open("POST", urlLink[url], true);
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
  fetchUrl,
  fetchPost,
  xhrGet,
  xhrPost
}
