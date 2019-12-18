import React from 'react';
import Loadable from 'react-loadable';

const UserPage = Loadable({
  loader: () => import(/* webpackChunkName: "UserPage" */ './../../../page/UserPage'),
  loading: () => null
});

export default function PageOrganizer(props) {
  const { API, sess, token, setCSRFToken, isSupportWebp, handleAccountData, pageData, handlePageData, editPageRefresh } = props

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
        if(d && d[0] && ('pagename' in d[0])){
          document.title = `${d[0].pagename} (Organizer) - T-off Time Organizer`
        }
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
      handleAccountData({
        ...d,
        photopath: (
          d.photopath ?
          API._getPictureUrl(d.photopath) + ( isSupportWebp? '.webp' : '.jpg' ) + '#' + new Date().toISOString()
          :
          null
        )
      })
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
  }, [ sess, props.location, editPageRefresh ])

  return (
    <React.Fragment>
      { pageData &&
        <UserPage
          {...props}
          pageOrganizer
          pageData={pageData}
          handlePageData={handlePageData} />
      }
    </React.Fragment>
  );
}
