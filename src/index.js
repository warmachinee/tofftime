import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import './index.css';
import './style.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

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
        <div>
          <h1>Something went wrong.</h1>
          <br></br>
          <h1 style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.errMsg && this.state.errMsg.error && this.state.errMsg.error.toString()}
            <br />
            {this.state.errMsg && this.state.errMsg.stack}
          </h1>
        </div>
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
//serviceWorker.register();
