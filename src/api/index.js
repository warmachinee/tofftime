const urlLink = {
  jsonPlaceholder: 'https://jsonplaceholder.typicode.com/todos/1'
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
function xhrGet(func){
  /*--------------------USEAGE--------------------
  const [ csrfToken, setCSRFToken ] = React.useState(null)
  .
  .
  .
  API.xhrGet(function(csrf){
    setCSRFToken(csrf)  // set New token
  })

  --------------------------------------------------*/
  var req = new XMLHttpRequest();
  req.open('GET', 'https://thai-pga.com', false);
  req.send(null);
  func(req.getResponseHeader('csrf-token'))
}
function xhrPost(token, func){
  /*--------------------USEAGE--------------------
  const [ csrfToken, setCSRFToken ] = React.useState(null)
  const [ dataSomeThing, setSomeThing ] = React.useState(null)
  .
  .
  .
  API.xhrPost( TOKEN, function(csrf, d){
    setCSRFToken(csrf)  // set New token
    setSomeThing(d)     // set data from response
  })

  --------------------------------------------------*/
  var req = new XMLHttpRequest();
  req.open("POST", 'https://thai-pga.com/users/login', true);
  req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
  req.setRequestHeader("Cache-Control", "no-cache")
  req.onreadystatechange = function() {
    if (req.readyState !== 4) return;
    if (req.status >= 200 && req.status < 300) {
      console.log("JSON: ",JSON.parse(req.responseText));
      func(req.getResponseHeader('csrf-token'), JSON.parse(req.responseText))
    }else{
      console.log('Invalid Token !!!');
    }
  }
  req.send(JSON.stringify({
    username: 'sp2@pds.com',
    password: '1234',
    _csrf: token
  }));
}

export {
  fetchUrl,
  fetchPost,
  xhrGet,
  xhrPost
}
