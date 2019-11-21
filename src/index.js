import React from 'react';
import Loadable from 'react-loadable';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import './index.css';
import './style.css';
import * as serviceWorker from './serviceWorker';
import { LDCircular } from './components/loading/LDCircular'

const App = Loadable({
  loader: () => import(/* webpackChunkName: "App" */'./App'),
  loading: () => <LDCircular />
});

const SomthingWrongPage = Loadable({
  loader: () => import(/* webpackChunkName: "SomthingWrongPage" */'./components/Utils/SomthingWrongPage'),
  loading: () => <LDCircular />
});

class RenderApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      errMsg: null
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.log(error);
    this.setState({ errMsg : {
      error: error,
      stack: info.componentStack
    }})
  }

  render() {
    if (this.state.hasError) {
      return (
        <SomthingWrongPage errMsg={this.state.errMsg} />
      );
    }

    return (
      <Router>
        <App />
      </Router>
    );
  }
}

ReactDOM.render(<RenderApp />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
serviceWorker.register();
