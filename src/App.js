import logo from './logo.svg';
import './App.css';
import React, {Fragment} from "react";
import {Route, Switch } from 'react-router-dom';
import SearchHome from "./components/SearchHome";
import {Header} from "./components/Header";
import SearchResult from "./components/SearchResult";
import Thanks from "./components/thanks";

function App() {
  return (
     <Fragment>
        <Header/>
        <Switch>
            <Route path='/' exact component={SearchHome}/>
            <Route path='/post-result' component={SearchResult}/>
        </Switch>
     </Fragment>
  );
}

export default App;
