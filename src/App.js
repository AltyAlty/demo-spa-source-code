import React from 'react';
import logo from './logo.svg';
import './App.css';
import {withRouter, Route, BrowserRouter} from 'react-router-dom';
import HeaderContainer from './components/Header/HeaderContainer';
import NavbarContainer from './components/Navbar/NavbarContainer';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import ProfileContainer from './components/Profile/ProfileContainer';
import UsersContainer from './components/Users/UsersContainer';
import Music from './components/Music/Music';
import News from './components/News/News';
import Settings from './components/Settings/Settings';
import Friends from './components/Friends/Friends';
import LoginPage from './components/Login/Login';
import {connect, Provider} from 'react-redux';
import {compose} from 'redux';
import {initializeApp} from './redux/app-reducer';
import Preloader from './components/common/Preloader/Preloader';
import store from './redux/redux-store';

class App extends React.Component {
    componentDidMount() {
        this.props.initializeApp();
    };

    render() {
        if (!this.props.initialized) {
            return <Preloader />
        }

        return (
            <div className='app-wrapper'>
                <HeaderContainer />

                <NavbarContainer />

                <div className='app-wrapper-content'>
                    <Route path='/dialogs/' render={() => <DialogsContainer />}/>
                    <Route path='/profile/:userID?' render={() => <ProfileContainer />}/>
                    <Route path='/users/' render={() => <UsersContainer />}/>
                    <Route path='/news/' render={() => <News />}/>
                    <Route path='/music/' render={() => <Music />}/>
                    <Route path='/settings/' render={() => <Settings />}/>
                    <Route path='/friends/' render={() => <Friends />}/>
                    <Route path='/login/' render={() => <LoginPage />}/>
                </div>
            </div>
        );
    }
};

const mapStateToProps = (state) => ({
    initialized: state.app.initialized
});

// wrappers for App
let AppContainer = compose(
    withRouter,
    connect(mapStateToProps, {initializeApp}))(App);

// "true" App, called in index.js
const AppMain = (props) => {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <AppContainer />
            </Provider>
        </BrowserRouter>
    )
};

export default AppMain;
