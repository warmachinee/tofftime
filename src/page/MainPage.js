import React from 'react';
import Loadable from 'react-loadable';
import { LDTopnav } from '../components/loading/LDTopnav';
import { LDMatchList } from '../components/loading/LDMatchList';
import AnnouncementNewsGrid from '../components/AnnouncementNewsGrid'

const MatchList = Loadable({
  loader: () => import(/* webpackChunkName: "MatchList" */'../components/Match/MatchList'),
  loading: () => <LDMatchList />
});

function MainPage(props) {
  const { token, setCSRFToken, handleSnackBar, isSupportWebp } = props
  
  return (
    <div>
      <AnnouncementNewsGrid token={token} setCSRFToken={setCSRFToken} handleSnackBar={handleSnackBar} isSupportWebp={isSupportWebp}/>
      <MatchList token={token} isSupportWebp={isSupportWebp}/>
    </div>
  );
}

export default MainPage;
