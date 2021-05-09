/*
Это специальной созданный нами HOC для добавления редиректа в наш проект.
HOC - high order component (компонента высшего порядка).
HOC - это функция, которая принимает на входе один компонент, обворачивает его, чтобы передать какие-то данные, и
на выходе возвращает другой компонент.
HOC позволяет создавать однообразные контейнерные компоненты.
*/

import React, {ComponentType} from 'react';
/*
Подключаем сам "ReactJS", необходим везде, где мы что-то из него используем (например, JSX).
"WebPack" уже встроен в "ReactJS".
Импортируем "ComponentType" для типизации.
*/
import {connect} from 'react-redux';
/*
Библиотека "react-redux" является прослойкой между UI (react) и BLL (redux).
Это прослойка необходима потому, что UI нежелательно общаться с BLL напрямую.
Библиотека "react-redux" предоставляет продвинутые инструкции по созданию контейнерных компонент и контекста.
Метод "connect" это HOC. Точнее он возвращает HOC, а этот HOC получает компонент и обрабатывает его.
HOC - high order component (компонента высшего порядка).
HOC - это функция, которая принимает на входе один компонент, обворачивает его, чтобы передать какие-то данные, и
на выходе возвращает другой компонент.
HOC позволяет создавать однообразные контейнерные компоненты.
Метод "connect" используется для создания компонентов и контейнеров.
Метод "connect" знает о нашем "store" из "redux" и сам передает данные оттуда в указанный компонент.
Метод "connect" упрощает перекидывание "props".
Метод "connect" имеет улучшенную оптимизацию перерисовки, т.к он перерисовывает только нужную часть "Virtual DOM".
При помощи метода "connect" можно удобно создавать контейнерные компоненты.
У метода "connect" есть свои аналоги "getState", "subscribe", "callSubscriber", "dispatch".
Метод "connect" вызывается дважды - первый раз он вызывается с параметрами ((две функции)) ввиде данных "state" (функция
"mapStateToProps") и "dispatch" (наши callbacks - "AC" или "TC", функция "mapDispatchToProps"), причем в первую функцию
метод "connect" закинет весь "state" из "store", а во вторую функцию закинет "store.dispatch.bind(store)", т.е. наши
callbacks и потом будет возвращать другую функцию, затем вызывается эта возвращенная функция с параметрами ввиде
указанного компонента. При каждом изменении "state" вызывается функция "mapStateToProps", формируется новый объект
с данными из "state" и сравнивается со старым объектом с данными из "state" (их внутренности).
Если были изменения в нужной для компонента части "state", которая указана в функции "mapStateToProps",
то метод "connect" перерисовывает компонент. Именно поэтому в "reducers" мы создаем копии "state". Если создается копия
"state", то получается, что идет ссылка на другой объект. Исходя из этого "connect" считает, что были изменения.
Когда мы импортируем объекты или функции в классовые компоненты, то на самом деле мы создаем ссылки на них. Например,
AC или TC в контейнерной компоненте это ссылки на AC или TC из "reducers". Учитывая это, в метод "connect" можно сразу
указывать AC или TC, так как connect создает контейнерную классовую компоненту и сам может создавать callbacks вокруг
AC или TC, как это делается в функции "mapDispatchToProps". И тогда функцию "mapDispatchToProps" можно не писать.
"Provider" необходим для создания контекста, из которого компоненты (особенно контейнерные) могут брать данные
BLL и DAL.
*/
import {Redirect} from 'react-router-dom';
/*
Библиотека "react-router-dom" необходима для создания роутинга и маршрутов в приложении.
"Redirect" позволяет создавать компонент <Redirect /> для создания редиректа. Для указания пути редиректа используется
атрибут "to".
Маршрут для пути редиректа уже должен быть создан.
*/

import {AppStateType} from '../redux/redux-store'; /*Подключаем типы.*/


/*Создаем тип для "mapStateToPropsForRedirect". "mapStateToPropsForRedirect" в этом компоненте должен обязательно
содержать следующие поля с указанными типами.*/
type MapStateToPropsForRedirectType = {
    isAuth: boolean /*Свойство, которое указывает залогинен ли пользователь, должно быть булева типа.*/
};


const mapStateToPropsForRedirect = (state:AppStateType): MapStateToPropsForRedirectType => ({ /*Здесь мы таким образом
создали "props" необходимые для работы редиректа. Будем их подключать при помощи функции "connect". На входе
"mapStateToProps" принимает "state" с типом "AppStateType", который мы создали и импортировали сюда, а на выходе выдает
данные с типом "MapStateToPropsType".*/
    isAuth: state.auth.isAuth /*Свойство, которое указывает залогинен ли пользователь.*/
});


export function withAuthRedirect<WrappedProps> (Component: ComponentType<WrappedProps>) { /*Это и есть наш HOC, который
в качестве параметра принимает какой-либо компонент "Component". Не используем здесь синтаксис стрелочной функции, чтобы
можно было уточнить "props" как "WrappedProps", как мы это сделали здесь.

Этот HOC принимает какой-то "generic" компонент "Component", который ожидает "props" c типом "WrappedProps". Компонент
"Component" должен быть типа "ComponentType", то есть быть каким-то компонентом из "ReactJS".

Уточняем, что внутри ожидаются "props" c типом "WrappedProps", то есть теже "props" компонента "Component", который мы
будем передавать в этот HOC, так как наш HOC не будет снабжать новыми данными переданный в него компонент "Component".
Но при этом наш HOC будет использовать свойство "isAuth" из "mapStateToPropsForRedirect" для своей внутренней работы.*/
    function RedirectComponent(props: MapStateToPropsForRedirectType) { /*После получения компонента "Component" в
    качестве параметра, создается другой функциональный компонент "RedirectComponent". Это обвертка для компонента
    "Component", поэтому "props" компонента "RedirectComponent" должны быть типа "WrappedProps", так как эти "props"
    должны не потеряться и быть переданы в компонент "Component", и типа "MapStateToPropsForRedirectType", так как для
    работы компонента "RedirectComponent" необходимо свойство "isAuth" из "mapStateToPropsForRedirect". Но свойство
    "isAuth" мы не должны передавать в компонент "Component".

    Но для функции "connect" и для внутренней работы компонента "RedirectComponent" важно знать только "props" типа
    "MapStateToPropsForRedirectType", поэтому в итоге мы убираем "WrappedProps" здесь и оставляем только
    "MapStateToPropsForRedirectType" в качестве типа для "props" компонента "RedirectComponent".*/
        let {isAuth, ...restProps} = props; /*Здесь мы выделили "props.isAuth" в переменную "isAuth", а остальные
        свойства "props" оставили в объекте "restProps" при помощи деструктуризации.*/

        if (!isAuth) return <Redirect to={'/login/'}/> /*Внутри этого функционального компонента "RedirectComponent"
        указано, что если пользователь не залогинен, то происходит при помощи "Redirect" из библиотеки
        "react-routed-dom" редирект по пути "/login/", где находится форма для логинизации, вместо отрисовки переданного
        в HOC компонента "Component".*/

        return <Component {...restProps as WrappedProps}/> /*Если же пользователь оказался залогиненным, то мы попадем в
        этот "return". В этом случае возвращается компонент "Component", который был передан в HOC, при помощи
        деструктуризации снабженный "restProps", которые должны восприниматься как "props" типа "WrappedProps", то есть
        теми же "props", что у него были изначально, так как выше мы убрали свойство "isAuth" из них.*/
    };

    let ConnectedAuthRedirectComponent = connect<MapStateToPropsForRedirectType, {}, WrappedProps, AppStateType>
    (mapStateToPropsForRedirect)(RedirectComponent); /*Далее в свою очередь функциональный компонент "RedirectComponent"
    обворачивается при помощи метода "connect", чтобы получить необходимые "props" для проверки залогинен ли
    пользователь или нет. Метод "connect" вернет новый компонент "ConnectedAuthRedirectComponent". Поскольку метод
    "connect" является "generic", то его можно уточнить: первым в "<>" указан тип для "MapStateToProps", вторым для
    "MapDispatchToProps", третьим для "собственных props" компонента, четвертым для "state". Эти параметры мы узнали
    перейдя в файл декларации метода "connect", "Ctrl+click" в "WebStorm".*/

    return ConnectedAuthRedirectComponent; /*Сам HOC "withAuthRedirect" возвращает итоговый компонент
    "ConnectedAuthRedirectComponent".*/
};
