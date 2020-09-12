import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Profile from './components/Profile/Profile';
import Dialogs from './components/Dialogs/Dialogs';
import {Route} from "react-router-dom";
import Music from "./components/Music/Music";
import News from "./components/News/News";
import Settings from "./components/Settings/Settings";
import Friends from "./components/Friends/Friends";

function App(props) {
    return (
        <div className='app-wrapper'>
            <Header/>

            <Navbar state={props.state.sidebar}/>

            <div className='app-wrapper-content'>
                <Route path='/dialogs/' render={() => <Dialogs dialogPage={props.state.dialogsPage}
                                                               addMessage={props.addMessage}
                                                               updateNewMessageText={props.updateNewMessageText}/>}/>
                <Route path='/profile/' render={() => <Profile profilePage={props.state.profilePage}
                                                               addPost={props.addPost}
                                                               updateNewPostText={props.updateNewPostText}/>}/>
                <Route path='/news/' render={() => <News/>}/>
                <Route path='/music/' render={() => <Music/>}/>
                <Route path='/settings/' render={() => <Settings/>}/>
                <Route path='/friends/' render={() => <Friends/>}/>
            </div>
        </div>
    );
}

export default App;
