const urlLink = {
  //--------------------Main Page--------------------
  main: 'https://thai-pga.com',
  loadmatchsystem: 'https://thai-pga.com/main/loadmatchsystem',
  //--------------------Account--------------------
  login: 'https://thai-pga.com/users/login',
  facebooklogin: 'https://thai-pga.com/session/auth/facebook',
  googlelogin: 'https://thai-pga.com/session/auth/google',
  register: 'https://thai-pga.com/users/register',
  //--------------------Dashboard--------------------
  adminloadmatch: 'https://thai-pga.com/admin/loadmatch'
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
async function xhrGet(url){
  var req = new XMLHttpRequest();
  req.open('GET', urlLink[url], false);
  req.send(null);
  return req.getResponseHeader('csrf-token')
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

export {
  fetchUrl,
  fetchPost,
  xhrGet,
  xhrPost
}
