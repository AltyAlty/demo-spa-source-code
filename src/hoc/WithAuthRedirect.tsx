import React, {ComponentType} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
/*Импортируем тип "AppStateType".*/
import {AppStateType} from '../redux/redux-store';

/*Создаем тип для функции "mapStateToPropsForRedirect()".*/
type MapStateToPropsForRedirectType = {
    /*Свойство, которое указывает залогинен ли пользователь, должно быть булева типа.*/
    isAuth: boolean
};

/*Здесь мы таким образом создаем props необходимые для работы редиректа. Будем их подключать при помощи функции
"connect()". На входе функция "mapStateToPropsForRedirect()" принимает state с типом "AppStateType", а на выходе выдает
данные с типом "MapStateToPropsForRedirectType".*/
const mapStateToPropsForRedirect = (state: AppStateType): MapStateToPropsForRedirectType => ({
    /*Свойство, которое указывает залогинен ли пользователь.*/
    isAuth: state.auth.isAuth
});

/*HOC "withAuthRedirect()" - это HOC, который добавляет редирект в наш проект.

Этот HOC, в качестве параметра принимает какой-либо компонент "Component". Не используем здесь синтаксис стрелочной
функции, чтобы можно было уточнить props как "WrappedProps", как мы это сделали здесь. Этот HOC принимает какой-то
generic компонент "Component", который ожидает props c типом "WrappedProps".

Компонент "Component" должен быть типа "ComponentType", то есть быть каким-то компонентом из React.

Уточняем, что внутри ожидаются props c типом "WrappedProps", то есть те же props компонента "Component", который мы
будем передавать в этот HOC, так как наш HOC не будет снабжать новыми данными переданный в него компонент "Component".
Но при этом наш HOC будет использовать свойство "isAuth" из функции "mapStateToPropsForRedirect()" для своей внутренней
работы.

HOC "withAuthRedirect()" импортируется в файлах "DialogsContainer.tsx" и "ChatPage.tsx".*/
export function withAuthRedirect<WrappedProps>(Component: ComponentType<WrappedProps>) {
    /*После получения компонента "Component" в качестве параметра, создается другой функциональный компонент
    "RedirectComponent". Это обертка для компонента "Component", поэтому props компонента "RedirectComponent" должны
    быть типа "WrappedProps", так как эти props должны не потеряться и быть переданы в компонент "Component", и типа
    "MapStateToPropsForRedirectType", так как для работы компонента "RedirectComponent" необходимо свойство "isAuth" из
    функции "mapStateToPropsForRedirect()". Но свойство "isAuth" мы не должны передавать в компонент "Component".

    Но для функции "connect()" и для внутренней работы компонента "RedirectComponent" важно знать только props типа
    "MapStateToPropsForRedirectType", поэтому в итоге мы убираем "WrappedProps" здесь и оставляем только
    "MapStateToPropsForRedirectType" в качестве типа для props компонента "RedirectComponent".*/
    function RedirectComponent(props: MapStateToPropsForRedirectType) {
        /*Здесь мы выделяем "props.isAuth" в переменную "isAuth", а остальные свойства props оставляем в объекте
        "restProps" при помощи деструктуризации.*/
        const {isAuth, ...restProps} = props;
        /*Внутри этого функционального компонента "RedirectComponent" указано, что если пользователь не залогинен, то
        происходит при помощи "Redirect" из библиотеки React Router DOM редирект по пути "/login/", где находится форма
        для логинизации, вместо отрисовки переданного в HOC компонента "Component".*/
        if (!isAuth) return <Redirect to={'/login/'}/>
        /*Если же пользователь оказался залогиненным, то мы попадем в этот return. В этом случае возвращается компонент
        "Component", переданный в HOC, при помощи деструктуризации снабженный "restProps", которые должны восприниматься
        как props типа "WrappedProps", то есть теми же props, что у него были изначально, так как выше мы убрали
        свойство "isAuth" из них.*/
        return <Component {...restProps as WrappedProps}/>
    };

    /*Далее в свою очередь функциональный компонент "RedirectComponent" оборачивается при помощи функции "connect()",
    чтобы получить необходимые props для проверки залогинен ли пользователь или нет. Метод "connect()" вернет итоговый
    компонент. Поскольку функция "connect()" является generic, то ее можно уточнить: первым в "<>" указан тип для
    функции "MapStateToProps()", вторым для функции "MapDispatchToProps()", третьим для "собственных props" компонента,
    четвертым для state. Эти параметры мы узнали перейдя в файл декларации функции "connect()".

    Сам HOC "withAuthRedirect()" в итоге возвращает получившийся итоговый компонент.*/
    return connect<MapStateToPropsForRedirectType, {}, WrappedProps, AppStateType>
    (mapStateToPropsForRedirect)(RedirectComponent);
};