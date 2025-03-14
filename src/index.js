/*
Установка Typescript: npm install --save typescript @types/node @types/react @types/react-dom @types/jest
Установка типизации библиотеки Redux Form: npm install --save @types/redux-form
Установка типизации библиотеки Classnames: npm install --save @types/classnames
Установка типизации библиотеки React Redux: npm install --save @types/react-redux
Установка типизации библиотеки React Router DOM: npm install --save @types/react-router-dom
Установка типизации библиотеки React Test Renderer: npm install --save @types/react-test-renderer
Установка типизации библиотеки UUID: npm install --save @types/uuid

Установка GitHub Pages: npm install gh-pages --save -dev
Установка React Test Renderer: npm i react-test-renderer@16.13.1 --save -dev

Приложение требует Node.js не выше 16 версии, например, 16.20.2 подойдет. Потребуется установка Node Version Manager
(nvm) для управления разными версиями NodeJS:
1. Установка Node.js 16: nvm install 16
2. Переключение на Node.js 16: nvm use 16
3. Запуск приложения: npm start

Установка всех модулей (если необходимо): npm install
Запуск приложения: npm start
Запуск тестов: npm run test

Развертыванием приложения на GitHub Pages:
1. В папке нашего React приложения в файле "App.tsx" заменяем компонент "BrowseRouter" на компонент "HashRouter".
2. В папке нашего React приложения собираем билд нашего приложения, выполняя команду "predeploy": npm run build
3. Разворачиваем билд нашего приложения в нашем репозитории "demo-spa-source-code" на ветке "gh-pages", выполняя в папке
нашего React приложения команду "deploy": gh-pages -d build
4. В папке нашего React приложения в файле "App.tsx" заменяем обратно компонент "HashRouter" на компонент
"BrowseRouter".
*/

/*GitHub имеет примитивный хостинг GitHub Pages для статических страниц.

На GitHub Pages приложение разворачивается по такому пути: "https://github-account-name.github.io/repository-name/". Но
при переходе по компонентам, имя репозитория затирается путем для компонента (например, "/profile"). И если мы нажимаем
F5, тогда GitHub не понимает нашего адреса и не находит наше приложение, так как считает, что "/profile" - это один из
наших репозиториев.

Чтобы решить эту проблему, мы настраиваем компонент "BrowseRouter" в файле "App.tsx". Там, где мы используем компонент
"BrowserRouter", мы добавляем "<BrowserRouter basename={process.env.PUBLIC_URL}>". Это говорит, что надо автоматически
брать URL из окружения. "process" - это глобальный объект из Node.js. "env" - это окружение, тоже берется из Node.js.
"PUBLIC_URL" - если используется "localhost", то равняется "пустоте", если используется GitHub, то GitHub Pages укажет
ссылку на репозиторий. Но в итоге мы это не используем в нашем приложении, так как это все равно не решает указанную
выше проблему, поскольку GitHub пытается после нажатия F5 найти файл "index.html", например, в папке "/profile", про
которую он не знает.

И для решения указанной проблемы мы используем компонент "HashRouter" вместо компонента "BrowseRouter". Компонент
"HashRouter" использует якори - "#". Якори изначально использовались для перемещения по странице, но в дальнейшем стали
использоваться для переключения страниц без изменения URL. Так делали до появления HistoryAPI в HTML5, поэтому компонент
"HashRouter" не особо часто используется сегодня. Но в нашем случае он помогает, поскольку якори "#" и все, что идет
после них, не будут считаться частью URL сайта и GitHub будет искать файл "index.html" там, где надо.

Как развернуть приложение на GitHub Pages:
1. Подключаемся, если не подключены, к нашему удаленному GitHub репозиторию, выполняя в папке нашего React приложения
команду: git remote add origin https://github.com/AltyAlty/demo-spa-source-code.git
2. На сайте GitHub в настройках нашего репозитория "demo-spa-source-code" переходим в раздел "Pages", там в пункте
"Source" выбираем "Deploy from a branch", а в разделе "Branch" выбираем ветку "master" и папку "/root". Нажимаем "Save".
3. В папке нашего React приложения устанавливаем GitHub Pages: npm install gh-pages --save -dev
4. В папке нашего React приложения в файле "package.json" указываем домашнюю страницу. Для этого в верхний уровень
(например, перед разделом "dependencies") добавляем: "homepage": "URL, где будет развернуто наше приложение". Например,
"homepage": "https://altyalty.github.io/demo-spa-source-code/".
5. В папке нашего React приложения в файле "package.json" добавляем скрипты в раздел "scripts":
"predeploy": "npm run build"
"deploy": "gh-pages -d build"
6. С GitHub запрещено делать запросы к нашему серверу, поэтому на сайте API https://social-network.samuraijs.com/account
в настройках указываем домен, на котором будет размещено наше приложение (без "/" в конце):
https://github-account-name.github.io. Например: https://altyalty.github.io.
7. В папке нашего React приложения в файле "api.ts" указываем наш API ключ, который можно получить на сайте API
https://social-network.samuraijs.com/account.
8. В папке нашего React приложения в файле "App.tsx" заменяем компонент "BrowseRouter" на компонент "HashRouter".
9. В папке нашего React приложения собираем билд нашего приложения, выполняя команду "predeploy": npm run build
10. На сайте GitHub в нашем репозитории "demo-spa-source-code" создаем ветку "gh-pages" и разворачиваем там билд нашего
приложения, выполняя в папке нашего React приложения команду "deploy": gh-pages -d build
11. На сайте GitHub в настройках нашего репозитория "demo-spa-source-code" переходим в раздел "Pages", там в пункте
"Source" выбираем "Deploy from a branch", а в разделе "Branch" выбираем ветку "gh-pages" и папку "/root". Нажимаем
"Save".
12. Открываем наше развернутое приложения: https://altyalty.github.io/demo-spa-source-code/.
12. В папке нашего React приложения в файле "App.tsx" заменяем обратно компонент "HashRouter" на компонент
"BrowseRouter".

В итоге в репозитории "demo-spa-source-code" на ветке "master" находится исходный код нашего приложения, а на ветке
"gh-pages" находится билд нашего приложения.

Теперь перед каждым развертыванием нашего приложения делаем следующее:
1. В папке нашего React приложения в файле "App.tsx" заменяем компонент "BrowseRouter" на компонент "HashRouter".
2. В папке нашего React приложения собираем билд нашего приложения, выполняя команду "predeploy": npm run build
3. Разворачиваем билд нашего приложения в нашем репозитории "demo-spa-source-code" на ветке "gh-pages", выполняя в папке
нашего React приложения команду "deploy": gh-pages -d build
4. В папке нашего React приложения в файле "App.tsx" заменяем обратно компонент "HashRouter" на компонент
"BrowseRouter".

После каждого запуска скрипта "deploy" нужно немного подождать, чтобы наше приложение успело обновиться на GitHub.

Для добавления исходного кода нашего приложения в ветку "master" репозитория "demo-spa-source-code" выполняем команду:
git push -u origin master.*/

/*Установленные модули:
Node.js 16.20.2
Typescript 4.3.5
React 17.0.2
React Router DOM 5.2.0
Redux 4.1.0
React Redux 7.2.4
Redux Thunk 2.3.0
Reselect 4.0.0
Redux Form 8.3.7
Formik 2.2.9
Axios 0.21.1
querystring 0.2.1
UUID 8.3.2
Ant Design 4.16.9
Сlassnames 2.3.1
Jest 5.14.1
React Test Renderer 17.0.2
GitHub Pages 3.2.3*/

/*Протестированные компоненты:
1. App
2. Paginator
3. ProfileStatus

Протестированные редьюсеры:
1. profileReducer
2. usersReducer + thunks*/

/*В "index.js" не должно быть обверток вокруг компонента "App", поэтому мы их перенесли в файл "App.tsx".
"index.js" - этот файл является точкой входа для сборщика WebPack.
"index.html" - этот файл является точкой входа нашего приложения.
"index.css" - этот файл содержит общие стили для всего приложения.*/

/*Это уже было здесь изначально, из темы "Progressive Web Application" (PWA).*/
import * as serviceWorker from './serviceWorker';
/*Импортируем сам React, необходим везде, где мы что-то из него используем (например, JSX). WebPack уже встроен в
React.*/
import React from 'react';
/*Импортируем ReactDOM для метода "render()", который отрисовывает DOM-дерево из React.*/
import ReactDOM from 'react-dom';
/*Импортируем файл CSS.*/
import './index.css';
/*Импортируем компонент "AppMain".*/
import AppMain from './App';

/*В файле "index.js" мы указываем главный компонент "AppMain" (то есть компонент "App", обвернутый разными обвертками),
который будет отрисовываться.*/
ReactDOM.render(
    /*"StrictMode" это специальный строгий режим из React, для избежания некоторых ошибок.*/
    <React.StrictMode>
        <AppMain/>
    </React.StrictMode>,
    /*JS будет отрисовывать приложение в элементе "div" с атрибутом "id" "root" в файле "index.html".*/
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();