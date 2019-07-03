const urlLink = {
  //--------------------Main Page--------------------
  main: 'https://tofftime.com',
  getcsrf: 'https://tofftime.com/getcsrf',
  loadmatchsystem: 'https://tofftime.com/main/loadmatchsystem',
  userinfo: 'https://tofftime.com/session/userinfo',
  views: 'https://tofftime.com/session/views',
  //--------------------Account--------------------
  login: 'https://tofftime.com/users/login',
  facebooklogin: 'https://tofftime.com/session/auth/facebook',
  googlelogin: 'https://tofftime.com/session/auth/google',
  register: 'https://tofftime.com/users/register',
  logout: 'https://tofftime.com/logout',
  //--------------------Dashboard--------------------
  loadmatch: 'https://tofftime.com/admin/loadmatch',
  loaduser: 'https://tofftime.com/admin/loaduser',
  matchsystem: 'https://tofftime.com/admin/matchsystem',
  loadfield: 'https://tofftime.com/admin/loadfield',
  fieldsystem: 'https://tofftime.com/admin/fieldsystem',
  matchsection: 'https://tofftime.com/admin/matchsection',
  matchmember: 'https://tofftime.com/admin/matchmember',
  displaymatchsystem: 'https://tofftime.com/admin/displaymatchsystem',
  rewardsystem: 'https://tofftime.com/admin/rewardsystem',
  loadmainpage: 'https://tofftime.com/admin/loadmainpage',
  matchmain: 'https://tofftime.com/admin/matchmain',
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
