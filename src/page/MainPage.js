import React from 'react';
import Loadable from 'react-loadable';

import { LDMatchList } from './../components/loading/LDMatchList';
import { LDTopnav } from './../components/loading/LDTopnav';

const Header = Loadable({
  loader: () => import(/* webpackChunkName: "Header" */'./../components/Header'),
  loading() {
    return <LDTopnav />
  }
});

const AnnouncementNewsGrid = Loadable({
  loader: () => import(/* webpackChunkName: "MatchList" */'./../components/AnnouncementNewsGrid'),
  loading: () => <LDMatchList />
});

const MatchList = Loadable({
  loader: () => import(/* webpackChunkName: "MatchList" */'./../components/Match/MatchList'),
  loading: () => <LDMatchList />
});

function MainPage(props) {

  return (
    <div>
      <AnnouncementNewsGrid {...props}/>
      <MatchList {...props}/>
    </div>
  );
}

export default MainPage;
