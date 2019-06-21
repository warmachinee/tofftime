import React from 'react';
import Loadable from 'react-loadable';
import * as API from './api'
import { LDTopnav } from './components/loading/LDTopnav';
import { LDMatchList } from './components/loading/LDMatchList';
import AnnouncementNewsGrid from './components/AnnouncementNewsGrid';

import blueGrey from '@material-ui/core/colors/blueGrey';

const Header = Loadable({
  loader: () => import(/* webpackChunkName: "Header" */'./components/Header'),
  loading() {
    return <LDTopnav />
  }
});

const MatchList = Loadable({
  loader: () => import(/* webpackChunkName: "MatchList" */'./components/Match/MatchList'),
  loading: () => <LDMatchList />
});

function App() {

  return (
    <div style={{ backgroundColor: blueGrey[50] }}>
      <Header />
      <div>
        <AnnouncementNewsGrid />
        <MatchList />
      </div>
    </div>
  );
}

export default App;
