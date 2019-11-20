import React from 'react';
import Loadable from 'react-loadable';

const UserPage = Loadable({
  loader: () => import(/* webpackChunkName: "UserPage" */ './../../../page/UserPage'),
  loading: () => null
});

export default function PageOrganizer(props) {
  const { API, sess, token, setCSRFToken, handleAccountData, pageData, handlePageData, editPageRefresh } = props

  async function handleFetch(){
    if(sess){
      const resToken = token? token : await API._xhrGet('getcsrf')
      await API._xhrPost(
        token? token : resToken.token,
        sess.typeid === 'admin' ? 'loadpage' : 'ploadpage', {
          action: 'detail',
          pageid: parseInt(props.computedMatch.params.pageid)
      }, (csrf, d) =>{
        setCSRFToken(csrf)
        if(d.length < 2){
          window.location.pathname = '/user'
        }
        handlePageData({
          ...d[0],
          pageid: parseInt(props.computedMatch.params.pageid)
        })
      })
    }
  }

  async function handleFetchInfo(){
    const resToken = token? token : await API._xhrGet('getcsrf')
    await API._xhrPost(
      token? token : resToken.token,
      'loadusersystem', {
        action: 'info'
    }, (csrf, d) =>{
      setCSRFToken(csrf)
      handleAccountData(d)
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
      window.location.pathname = '/system_admin'
    }
  }, [ sess, props.location ])

  React.useEffect(()=>{
    handleFetch()
  },[ editPageRefresh ])

  return pageData && (
    <UserPage
      {...props}
      pageOrganizer
      pageData={pageData}
      handlePageData={handlePageData} />
  );
}
