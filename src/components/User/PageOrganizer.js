import React from 'react';
import Loadable from 'react-loadable';

const UserPage = Loadable({
  loader: () => import(/* webpackChunkName: "UserPage" */ './../../page/UserPage'),
  loading: () => null
});

export default function PageOrganizer(props) {
  const { API, sess, token, setCSRFToken, handleAccountData, pageData, handlePageData } = props

  async function handleFetch(){
    if(sess){
      const resToken = token? token : await API.xhrGet('getcsrf')
      await API.xhrPost(
        token? token : resToken.token,
        sess.typeid === 'admin' ? 'loadpage' : 'ploadpage', {
          action: 'detail',
          pageid: parseInt(props.computedMatch.params.pageid)
      }, (csrf, d) =>{
        setCSRFToken(csrf)
        handlePageData({
          ...d[0],
          pageid: parseInt(props.computedMatch.params.pageid)
        })
        console.log(d[0]);
      })
    }
  }

  async function handleFetchInfo(){
    const resToken = token? token : await API.xhrGet('getcsrf')
    await API.xhrPost(
      token? token : resToken.token,
      'loadusersystem', {
        action: 'info'
    }, (csrf, d) =>{
      setCSRFToken(csrf)
      handleAccountData(d[0])
    })
    if(props.computedMatch){
      await handleFetch()
    }
  }

  React.useEffect(()=>{
    if(sess && sess.status === 1 && sess.typeid !== 'admin'){
      handleFetchInfo()
    }
    if(sess && sess.status === 1 && sess.typeid === 'admin'){
      window.location.pathname = '/admin'
    }
  }, [ sess, props.location ])

  return pageData && (
    <UserPage
      {...props}
      pageOrganizer
      pageData={pageData}
      handlePageData={handlePageData}/>
  );
}
