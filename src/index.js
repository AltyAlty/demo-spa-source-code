/*
В "index.js" не должно быть обверток вокруг "App", поэтому мы их перенесли в "App.js".
"index.js" - это точка входя для сборщика "WebPack".
"index.html" - это точка входа нашего приложения.
"index.css" содержит общие стили для всего приложения.
*/

import * as serviceWorker from './serviceWorker'; /*Было уже изначально. Это из темы "Progressive Web
Application (PWA)".*/
import React from 'react';
/*
Подключаем сам "ReactJS", необходим везде, где мы что-то из него используем (например, JSX).
"WebPack" уже встроен в "ReactJS".
*/
import ReactDOM from 'react-dom'; /*Подключаем ReactDOM для метода "render", который отрисовывает
DOM-дерево из ReactJS.*/

import './index.css'; /*Подключаем файл CSS.*/

import AppMain from './App'; /*Импортируем компонент "AppMain", который будет отрисовываться.*/


/*В index.js мы указываем главный компонент "AppMain" (компонент "App" обвернутый разными обвертками), который
будет отрисовываться.*/
ReactDOM.render(
    <React.StrictMode> {/*"StrictMode" это специальный строгий режим из "ReactJS", для избежания некоторых ошибок.*/}
        <AppMain /> {/*Будет отрисовываться компонент "AppMain".*/}
    </React.StrictMode>,
    document.getElementById('root') /*JS будет отрисовывать приложение
    в элементе "div" с "ID" "root" в "index.html".*/
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
