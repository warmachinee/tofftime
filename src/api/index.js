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

export {
  fetchUrl,
  fetchPost
}
