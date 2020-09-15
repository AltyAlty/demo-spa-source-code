import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Profile from './components/Profile/Profile';
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import {Route} from "react-router-dom";
import Music from "./components/Music/Music";
import News from "./components/News/News";
import Settings from "./components/Settings/Settings";
import Friends from "./components/Friends/Friends";


function App(props) {
    return (
        <div className='app-wrapper'>
            <Header/>

            <Navbar sidebar={props.state.sidebar}
                    dispatch={props.dispatch}/>

            <div className='app-wrapper-content'>
                <Route path='/dialogs/' render={() => <DialogsContainer store={props.store}/>}/>
                <Route path='/profile/' render={() => <Profile store={props.store}/>}/>
                <Route path='/news/' render={() => <News/>}/>
                <Route path='/music/' render={() => <Music/>}/>
                <Route path='/settings/' render={() => <Settings/>}/>
                <Route path='/friends/' render={() => <Friends/>}/>
            </div>
        </div>
    );
}

export default App;
