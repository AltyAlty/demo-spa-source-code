import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Route} from "react-router-dom";

import Header from "./components/Header/Header";
import NavbarContainer from "./components/Navbar/NavbarContainer";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import Profile from "./components/Profile/Profile";
import UsersContainer from "./components/Users/UsersContainer";

import Music from "./components/Music/Music";
import News from "./components/News/News";
import Settings from "./components/Settings/Settings";
import Friends from "./components/Friends/Friends";


function App() {
    return (
        <div className='app-wrapper'>
            <Header/>

            <NavbarContainer/>

            <div className='app-wrapper-content'>
                <Route path='/dialogs/' render={() => <DialogsContainer/>}/>
                <Route path='/profile/' render={() => <Profile/>}/>
                <Route path='/users/' render={() => <UsersContainer/>}/>
                <Route path='/news/' render={() => <News/>}/>
                <Route path='/music/' render={() => <Music/>}/>
                <Route path='/settings/' render={() => <Settings/>}/>
                <Route path='/friends/' render={() => <Friends/>}/>
            </div>
        </div>
    );
}

export default App;
