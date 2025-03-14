import React, {ComponentType} from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
/*Импортируем TC "getUserProfile()", "getUserStatus()", "saveProfile()", "saveUserPhoto()" и "updateUserStatus()".*/
import {getUserProfile, getUserStatus, saveProfile, saveUserPhoto, updateUserStatus} from '../../redux/profile-reducer';
/*Импортируем компонент "Profile".*/
import {Profile} from './Profile';
/*Импортируем тип "RouteComponentProps".*/
import {RouteComponentProps, withRouter} from 'react-router-dom';
/*Импортируем тип "ProfileType".*/
import {ProfileType} from '../../types/types';
/*Импортируем тип "AppStateType".*/
import {AppStateType} from '../../redux/redux-store';

type MapStateToPropsType = {
    /*Информация о профиле пользователя, полученная с сервера должна быть типа "ProfileType" или иметь тип null, то есть
    быть пустой.*/
    profile: ProfileType | null
    /*Данные статуса пользователя для страницы профиля должны быть строкой или иметь тип null, то есть быть пустыми.*/
    status: string | null
    /*ID залогиненного пользователя должен быть число или иметь тип null, то есть быть пустым.*/
    authUserID: number | null
};

type MapDispatchToPropsType = {
    /*TC для запроса и установки данных по профилю пользователя на странице профиля должен быть функцией, которая
    принимает числовой параметр и ничего не возвращает.*/
    getUserProfile: (userID: number) => void
    /*TC для запроса и установки данных по статусу пользователя на странице профиля должен быть функцией, которая
    принимает числовой параметр и ничего не возвращает.*/
    getUserStatus: (userID: number) => void
    /*TC для изменения данных по статусу пользователя на странице профиля должен быть функцией, которая принимает
    строковой параметр и ничего не возвращает.*/
    updateUserStatus: (status: string) => void
    /*TC для загрузки фото пользователя на странице профиля и дальнейшего его отображения в нашем приложении должен быть
    функцией, принимающей объект с фото пользователя, которое имеет тип "File" из Typescript, и ничего не
    возвращающей.*/
    saveUserPhoto: (photoFile: File) => void
    /*TC для отправки новых данных профиля пользователя на странице профиля и дальнейшего их отображения в нашем
    приложении должен быть функцией, которая принимает объект типа "ProfileType" и возвращает что угодно с типом any,
    так как пока неизвестно как это здесь типизировать, поскольку мы в файле "ProfileInfo.tsx" используем метод "then()"
    вместе с этим TC. В самом файле "ProfileInfo.tsx" этот TC типизирован как функция, которая возвращает
    "Promise<any>", но если здесь указать также, то будет конфликт в типизации функции "connect()", то есть здесь можно
    указать тоже "Promise<any>", если избавиться от типизации в функции "connect()".*/
    saveProfile: (profile: ProfileType) => any
};

/*Создали отдельный тип для объекта "params" из объекта "match" из HOC "withRouter()" из библиотеки React Router DOM.
Указали "string", так как все, что находится в этом объекте "params", является "string" (так устроен HOC
"withRouter()").*/
type ProfileWithRouterParamsTypes = {
    userID: string
};

/*Создаем общий тип для всех props путем комбинации двух созданных выше типов и типа "RouteComponentProps" из библиотеки
React Router DOM. Последний тип мы указали, так как этот компонент хочет получить объект "match" из функции
"withRouter()". "RouteComponentProps" это тип для отдельного вида props из функции "withRouter()". В этом типе
"RouteComponentProps" мы уточнили какие свойства объекта "params" из объекта "match" из функции "withRouter()" должны
содержаться внутри при помощи типа "ProfileWithRouterParamsTypes", который создали выше. Все это нужно для указания типа
props в классовом компоненте.*/
type PropsType = MapStateToPropsType & MapDispatchToPropsType & RouteComponentProps<ProfileWithRouterParamsTypes>;

/*"ProfileContainerNoWraps" это классовый компонент. "ProfileContainerNoWraps" является контейнерным компонентом для
компонента "Profile".

Внутри компонента "ProfileContainerNoWraps" используются следующие компоненты:
1. "Profile" - компонент, который отображает профиль пользователя целиком. Импортирован.

Компонент "ProfileContainerNoWraps" оборачивается функциями "compose()" и "connect()" в этом же файле.*/
class ProfileContainerNoWraps extends React.Component<PropsType/*, StateType*/> {
    /*Создаем специальный метод, который содержит необходимый функционал для обновления страницы профиля.*/
    refreshProfile() {
        /*Получаем ID пользователя. HOC "withRouter()" хранит некий объект, к которому можно обратиться как к
        "match.params.userID", чтобы получить значения дополнения ":userID" к пути "/profile/", как это указано у нас в
        компоненте "App". Добавляем здесь "+" для преобразования строкового значения "this.props.match.params.userID" в
        числовое в целях типизации. Также указываем явно тип "number | null" у "userID" для типизации.*/
        let userID: number | null = +this.props.match.params.userID;

        /*Если не удалось получить ID пользователя, то*/
        if (!userID) {
            /*пытаемся его получить от пользователя, под которым залогинены.*/
            userID = this.props.authUserID;
            /*А если же и после этого не удалось получить ID пользователя, то нас перенаправляет на страницу
            логирования. Желательно так не использовать метод "push()" в компонентах, поэтому в дальнейшем это нужно
            заменить на что-то другое.*/
            if (!userID) this.props.history.push('/login/');
        }

        /*Делаем вывод ошибки в консоль, если ID пользователя отсутствует. Но по идее не должно быть ситуаций, когда ID
        пользователя полностью отсутствует, возможно надо что-то изменить в проекте, чтобы не допускались такие
        случаи.*/
        if (!userID) {
            console.error('ID should exist in URI params or in state');
            /*Если же мы все-таки получили ID пользователя, то делаем следующее:*/
        } else {
            /*Вызываем TC "getUserProfile()" для получения данных профиля пользователя и их установки на странице
            профиля. Без проверки на наличие ID пользователя в целях типизации пришлось бы указать, чтобы "userID"
            воспринимался как число при помощи "as number".*/
            this.props.getUserProfile(userID);
            /*Вызываем TC "getUserStatus()" для получения данных статуса пользователя и их установки на странице
            профиля. Без проверки на наличие ID пользователя в целях типизации пришлось бы указать, чтобы "userID"
            воспринимался как число при помощи "as number".*/
            this.props.getUserStatus(userID);
        }
    };

    /*Это метод жизненного цикла классового компонента. Он вызывается в момент первой отрисовки (монтирования)
    компонента.*/
    componentDidMount() {
        /*Вызываем метод "refreshProfile()".*/
        this.refreshProfile();
    };

    /*Это метод жизненного цикла классового компонента. Он вызывается в момент обновления (изменения props или state)
    компонента. Указываем тип для предыдущих props - "prevProps" в виде типа "PropsType", а для предыдущего state в виде
    типа "MapStateToPropsType & RouteComponentProps<ProfileWithRouterParamsTypes>", так как мы еще используем данные из
    HOC "withRouter()".*/
    componentDidUpdate
    (prevProps: PropsType, prevState: MapStateToPropsType & RouteComponentProps<ProfileWithRouterParamsTypes>) {
        /*Проверяем изменился ли ID пользователя в props. Эта проверка нужна для избежания бесконечного цикла запросов
        новых props методом "refreshProfile()": изначально срабатывает метод "refreshProfile()" из метода
        "componentDidMount()", получаем новые props, в свою очередь это триггерит метод "refreshProfile()" из метода
        "componentDidUpdate()", снова получаем новые props и снова триггерим метод "refreshProfile()" из метода
        "componentDidUpdate()" и так до бесконечности.*/
        if (this.props.match.params.userID !== prevProps.match.params.userID) {
            /*Если изменился, то вызываем метод "refreshProfile()".*/
            this.refreshProfile();
        }
    };

    render() {
        return (
            /*Отрисовываем компонент "Profile" и передаем ему через props необходимые для него данные. Здесь используем
            spread-оператор "...", который из всех props создает атрибуты для компонента.*/
            <Profile {...this.props}
                /*Это свойство, показывающее является ли залогиненный пользователь владельцем профиля, который в данный
                момент отображается на странице профиля. Будет равно true, если в данных URL не было найдено значения
                дополнения ":userID" к пути "/profile/", как это указано у нас в компоненте "App", то есть пользователь
                совершил переход просто на "/profile/", желая попасть на свою страницу, а не на чью-то другую. Это
                свойство нужно, чтобы интерфейс для редактирования информации в профиле появлялся только на собственной
                странице пользователя. Хотя тут есть проблема, когда мы переходим на свой профиль при помощи своего ID и
                не имеем упомянутого интерфейса. Далее передается в компонент "ProfileInfo".*/
                     isOwner={!this.props.match.params.userID}
            />
        )
    }
};

/*При помощи функции "mapStateToProps()" указываются данные из state, которые необходимо передать в компонент
"ProfileContainerNoWraps".*/
const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
    /*Данные профиля пользователя для страницы профиля. Далее передается в компонент "ProfileInfo".*/
    profile: state.profilePage.profile,
    /*Данные статуса пользователя для страницы профиля. Далее передается в компонент "ProfileInfo".*/
    status: state.profilePage.status,
    /*ID залогиненного пользователя.*/
    authUserID: state.auth.id
});

/*При помощи функции "compose()" объединяем HOC "withRouter()" и функцию "connect()", возвращая итоговую версию
компонента "ProfileContainerNoWraps". Здесь мы уточняем тип только одним параметром, так как согласно файлу декларации
функции "compose()" (раздел "rest"), нам нужно уточнить только такой компонент, свойства props которого не будут
переданы в этот компонент функциями, переданными внутрь функции "compose()", то есть HOC-ом "withRouter()" и функцией
"connect()", а это никакие свойства, так как мы не передаем извне ничего в компонент "ProfileContainerNoWraps".

Получившийся итоговый компонент экспортируется по default и используется в нашем приложении под именем
"ProfileContainer". Компонент "ProfileContainer" импортируется в файле "App.tsx".*/
export default compose<ComponentType>(
    /*При помощи функции "connect()" создаем контейнерный компонент, и тем самым передаем нужные данные BLL и DAL
    компоненту "ProfileContainerNoWraps" в этом файле. Поскольку функция "connect()" является generic, то ее можно
    уточнить: первым в "<>" указан тип для функции "MapStateToProps()", вторым для функции "MapDispatchToProps()",
    третьим для "собственных props" компонента, четвертым для state. Эти параметры мы узнали перейдя в файл декларации
    функции "connect()".*/
    connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>(mapStateToProps, {
        /*TC для получения данных профиля пользователя и их установки на странице профиля.*/
        getUserProfile,
        /*TC для получения данных статуса пользователя и их установки на странице профиля.*/
        getUserStatus,
        /*TC для изменения статуса пользователя на странице профиля.*/
        updateUserStatus,
        /*TC для загрузки фото пользователя на странице профиля и дальнейшего его отображения в нашем приложении.*/
        saveUserPhoto,
        /*TC для отправки новых данных профиля пользователя на странице профиля и их дальнейшего отображения в нашем
        приложении.*/
        saveProfile
    }),
    /*Так же при помощи HOC "withRouter()" передаем в этот контейнерный компонент данные из URL.*/
    withRouter
)(ProfileContainerNoWraps);