import React, {Suspense} from 'react';
import logo from './logo.svg';
import './App.css';
import {withRouter, Route, HashRouter, BrowserRouter, Redirect, Switch} from 'react-router-dom';
import HeaderContainer from './components/Header/HeaderContainer';
import NavbarContainer from './components/Navbar/NavbarContainer';
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
import {withSuspense} from './hoc/WithSuspense';

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));

class App extends React.Component {
    /*catching rejected promises*/
    /*catchAllUnhandledErrors = (promiseRejectionEvent) => {
        alert("some error occurred");
    };*/

    componentDidMount() {
        this.props.initializeApp();
        /*window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors);*/
    };

    /*componentWillUnmount() {
        window.removeEventListener("unhandledrejection", this.catchAllUnhandledErrors);
    }*/

    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }

        return (
            <div className='app-wrapper'>
                <HeaderContainer/>

                <NavbarContainer/>

                <div className='app-wrapper-content'>
                    <Switch>
                        <Route exact path='/'
                               render={() => <Redirect to='/profile'/>}/>
                        {/*second version of redirect
                        <Route exact path='/'>
                            <Redirect to='/profile'/>
                        </Route>*/}

                        <Route path='/dialogs/'
                               render={() => <Suspense fallback={<Preloader/>}><DialogsContainer/></Suspense>}/>
                        <Route path='/profile/:userID?'
                               render={withSuspense(ProfileContainer)}/>
                        {/*without using HOC:
                    <Suspense fallback={<Preloader/>}>
                        <Route path='/dialogs/'
                               render={() => <DialogsContainer/>}/>
                        <Route path='/profile/:userID?'
                               render={() => <ProfileContainer/>}/>
                    </Suspense>*/}
                        <Route path='/users/'
                               render={() => <UsersContainer/>}/>
                        <Route path='/news/'
                               render={() => <News/>}/>
                        <Route path='/music/'
                               render={() => <Music/>}/>
                        <Route path='/settings/'
                               render={() => <Settings/>}/>
                        <Route path='/friends/'
                               render={() => <Friends/>}/>
                        <Route path='/login/'
                               render={() => <LoginPage/>}/>
                        <Route path='*'
                               render={() => <div>404 NOT FOUND</div>}/>
                    </Switch>
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
                <AppContainer/>
            </Provider>
        </BrowserRouter>
    )
};

export default AppMain;