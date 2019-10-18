import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import './index.css';
import App from './App';
import RichTextEditor from './components/RichTextEditor'
import * as serviceWorker from './serviceWorker';

const RenderApp = (
  <Router>
    <RichTextEditor />
  </Router>
);
ReactDOM.render(RenderApp, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
//serviceWorker.register();
