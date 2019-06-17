import React from 'react';
import Loadable from 'react-loadable';
import * as API from './api'
import { LDTopnav } from './components/loading/LDTopnav';
import { LDMatchCard } from './components/loading/LDMatchCard';

const Header = Loadable({
  loader: () => import(/* webpackChunkName: "Header" */'./components/Header'),
  loading() {
    return <LDTopnav />
  }
});

const MatchList = Loadable({
  loader: () => import(/* webpackChunkName: "MatchList" */'./components/Match/MatchList'),
  loading: () => <LDMatchCard />
});

const Slider = Loadable({
  loader: () => import(/* webpackChunkName: "Slider" */'./components/Slider'),
  loading: () => null
});

const News = Loadable({
  loader: () => import(/* webpackChunkName: "News" */'./components/News'),
  loading: () => null
});

function App() {

  return (
    <div>
      <Header />
      <div>
        {/*<News />
        <Slider />*/}
        <MatchList />
      </div>
    </div>
  );
}

export default App;
