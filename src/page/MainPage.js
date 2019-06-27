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
  const [ csrfToken, setCSRFToken ] = React.useState(null)


  return (
    <div>
      <AnnouncementNewsGrid />
      <MatchList token={props.token} />
    </div>
  );
}

export default MainPage;
