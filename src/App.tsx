/*
"GitHub" имеет примитивный хостинг для статических страниц.
Мы создали отдельный репозиторий на GitHub ("demo-spa") для хостинга нашего приложения.
Желательно настраивать "SSH" вместо "HTTPS" в "GitHub".
В "GitHub" в настройках репозитория есть "GitHub Pages", там в "source" нужно выбрать "master" ветку.
Чтобы сайт отобразился нужно там же в настройках выбрать тему сайта.
Чтобы на "GitHub" открывалось наше приложения нужно сначала собрать его "build". Для этого в "npm" нужно выбрать "build"
или ввести "npm run build". После этого появится папка "build", в которой будет лежать наше билд нашего приложения.
Но если загрузить этот билд на "GitHub", то будут проблемы с URL, так как "GitHub" не является полноценным хостингом
и наше приложения будет находится относительно другого URL - "myname.github.io/repo-name/".
Для того, чтобы развернуть приложение на "ReactJS" нужно установить пакет "gh-pages":
"npm install gh-pages --save -dev".
Далее нужно внести изменения в файл "package.json", чтобы указать домашнюю страницу. Нужно в верхний уровень (например,
перед "dependencies") ввести:
"homepage": "сайт-репозитория".
Также здесь нужно добавить пару скриптов в раздел "scripts":
"predeploy": "npm run build",
"deploy": "gh-pages -d build".
Команда "deploy" автоматически создает ветку "gh-pages" на "GitHub" куда разместит билд нашего приложение.
Но с "GitHub" запрещено делать запросы к нашему API сервера, поэтому на сайте "API" в настройках нужно указать домен:
"https://имя-аккаунта.github.io".
В итоге на ветке "master" должен быть исходный код нашего приложения, а на ветке "gh-pages" билд нашего приложения.
Мы должны быть подключены к нашему удаленному репозиторию для осуществления этих действий:
"git remote add origin url-адресс-github-репозитория.git". После этого уже можно делать "deploy".

После этого сайт уже должен отрисовываться, но все еще могут быть некоторые проблемы.
Изначально приложение отрисовывается по такому пути: "имя-аккаунта-на-github/имя-репозитория/", но при переходе
по компонентам, имя репозитория затирается путем для компонента (например, "/profile"). И если мы нажимаем "F5", то
"GitHub" не поймет нашего адреса и не найдет наше приложение, так как будет считать, что "/profile" - это один из
наших репозиториев. Чтобы решить эту проблему нужно настроить "BrowseRouter" в "App.tsx". Там, где мы используем
тег "BrowserRouter", мы должны добавить:
"<BrowserRouter basename={process.env.PUBLIC_URL}>".
Это будет говорить, что надо автоматически брать URL из окружения. "process" - это глобальный объект из "Node.JS",
"env" - это окружения, тоже из "Node.JS", "PUBLIC_URL" - если "localhost", то тут будет пустота, если "GitHub", то
"gh-pages" укажет ссылку на репозиторий. Но мы это не используем в проекте, так как это все равно не решает проблему,
поскольку "GitHub" пытается после нажатия "F5" найти "index.html", например, в папке "/profile", про которую он
не знает.

И для решения этой проблемы мы используем "HashRouter" вместо "BrowseRouter". "HashRouter" использует якори "#". Якори
изначально использовались для перемещения по странице, но в дальнейшем стали использоваться для переключения страниц
без изменения URL. Так делали до появления "HistoryAPI" в "HTML5", поэтому "HashRouter" не особо используется сегодня.
Но в нашем случае он поможет, поскольку "#" и все, что идет после, не будут считаться частью названия сайта и "GitHub"
будет искать "index.html" там, где надо. "#" - это браузерная фишка.

То есть перед каждым "deploy" нужно сделать две вещи:
1. "BrowseRouter" заменить на "HashRouter".
2. В файл "package.json" в верхний уровень (например, перед "dependencies") ввести:
"homepage": "сайт-репозитория".
А после можно вернуть все обратно.

После каждого "deploy" нужно немного подождать, чтобы наше приложение обновилось на "GitHub".
Чтобы в ветку "master" добавить исходный код нужно ввести:
"git push origin master".
*/

import React, {Suspense, ComponentType} from 'react';
/*
Подключаем сам "ReactJS", необходим везде, где мы что-то из него используем (например, JSX).
"WebPack" уже встроен в "ReactJS".
Импортируем "Suspense" для реализации "lazy loading" (больше об этом в HOC "WithSuspense.tsx").
Импортируем "ComponentType" для типизации.
*/
import {Route, BrowserRouter, HashRouter, withRouter, Redirect, Switch} from 'react-router-dom';
/*
Библиотека "react-router-dom" необходима для создания роутинга и маршрутов в приложении.
Подключаем "Route" для создания маршрутов.
В каждом "Route" указывается путь "path", которые прослушивается.
Также в каждом "Route" указывается компонент в "render", который отображается если активируется прослушиваемый путь.
Чтобы маршруты "Route" работали их нужно всех обвернуть в корневой тег "BrowserRouter".
Для перемещения по "Route" маршрутам используетс "NavLink" (в этом компоненте этого нет, но есть в других).
Функция "withRouter" это HOC.
HOC - high order component (компонента высшего порядка).
HOC - это функция, которая принимает на входе один компонент, обворачивает его, чтобы передать какие-то данные, и
на выходе возвращает другой компонент.
HOC позволяет создавать однообразные контейнерные компоненты.
Поскольку URL тоже является источником данных, то компоненту иногда могут понадобиться эти данные.
Чтобы их получить, можно воспользоваться "withRouter".
HOC "withRouter" принимает в качестве параметра компонент и передает ему через "props" данные из URL, чтобы компонент
знал где он находиться - т.е. какой у него маршрут.
Если подключить на самом высоком уровне дерева компонентов этот HOC, например, в "App.tsx", то данные URL будут доступны
и в дочерних компонентах.
При использовании "connect" роутинг сбивается. Чтобы решить эту проблемы мы обварачиваем "connect" при помощи
"withRouter". Но сейчас вроде и без этого все работает.
"Redirect" позволяет создавать компонент <Redirect/> для создания редиректа. Для указания пути редиректа используется
атрибут "to".
Маршрут для пути редиректа уже должен быть создан.
"Switch" - это аналог для реализации "exact" (смотри в коде ниже). Работает по принципу "switch/case" - как только
нашли "Route" с подходящим путем, то его сразу и отрисовываем.
"HashRouter" - описание в самом верху, используем только для развертывания нашего приложения на "GitHub".
*/
import {connect, Provider} from 'react-redux';
/*
Библиотека "react-redux" является прослойкой между UI (react) и BLL (redux).
Эта прослойка необходима потому, что UI нежелательно общаться с BLL напрямую.
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
"Provider" позволяет указать компонент, который будет поставщиком данных BLL и DAL для всего его дочерних компонентов.
Так же использование "Provider" избавляет нас от обязанности прокидывать указанные данные через все дерево компонентов.
В нашем случае это компонент "AppContainer".
*/
import {compose} from 'redux';
/*
Функция "compose" из функционального программирования. Эта функция создает композицию обработчиков.
Библиотека "redux" содержит свою реализацию "compose". При помощи функции "compose" можно объеденять, например,
несколько обверток вокруг компонента и HOCs.
Обвертки и HOCs указываются снизу вверх. Функция "compose" вызывается дважды и работает схожим образом, как и метод
"connect" из библиотеки "react-redux".
*/

import {Preloader} from './components/common/Preloader/Preloader'; /*Подключаем компонент "Preloader".*/
import {Header} from './components/Header/Header'; /*Подключаем компонент "Header".*/
import {Navbar} from './components/Navbar/Navbar'; /*Подключаем компонент "Navbar".*/
import {Users} from './components/Users/Users'; /*Подключаем компонент "Users".*/
import {Music} from './components/Music/Music'; /*Подключаем компонент "Music".*/
import {News} from './components/News/News'; /*Подключаем компонент "News".*/
import {Settings} from './components/Settings/Settings'; /*Подключаем компонент "Settings".*/
import {Friends} from './components/Friends/Friends'; /*Подключаем компонент "Friends".*/
import {Login} from './components/Login/Login'; /*Подключаем компонент "LoginPage".*/

import {withSuspense} from './hoc/WithSuspense'; /*Подключаем наш HOC "WithSuspense.tsx" для реализации "lazy loading"
для компонентов "DialogContainer.jsx" и "ProfileContainer.tsx".*/

import store, {AppStateType} from './redux/redux-store'; /*Подключаем наш "store" из "redux". Также подключаем тип
"AppStateType" оттуда.*/
import {initializeApp} from './redux/app-reducer'; /*Подключаем TC "initializeApp" из "app-reducer".*/

import './App.css'; /*Подключаем файл CSS.*/
import 'antd/dist/antd.css'; /*Импортируем CSS-стили из UI-фреймфорка "Ant Design".*/
import {Layout} from 'antd'; /*Импортируем из UI-фреймфорка "Ant Design" "Layout" для получения из него объектов
"Content" и "Footer", чтобы использовать их как теги для реализации основного содержания страницы и футера.*/

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));
/*
Здесь вместо стандартного импорта компонентов "DialogContainer.jsx" и "ProfileContainer.tsx" (чтобы они не попали
в бандлы) в целях реализации "lazy loading" мы используем "React.lazy". Ниже в роутах мы обварачиваем эти компоненты
в "Suspense" или в наш HOC "WithSuspense.tsx" для реализации "lazy loading".
*/


/*Создаем тип для "MapStateToProps". "MapStateToProps" в этом компоненте должен обязательно содержать следующие поля с
указанными типами.*/
type MapStateToPropsType = {
    initialized: boolean /*Свойство, которое показывает инициализировано ли приложение, должно быть булева типа.*/
};

/*Создаем тип для "MapDispatchToProps". "MapDispatchToProps" в этом компоненте должен обязательно содержать следующие
поля с указанными типами.*/
type MapDispatchToPropsType = {
    initializeApp: () => void /*TC для инициализации приложения должен быть функцией, которая ничего не принимает и
    ничего не возвращает.*/
};

/*Создали отдельный тип для объекта "location" из функции "withRouter" из библиотеки "react-router-dom".*/
type PathnameType = {
    location: {
        pathname: string
    }
};

/*Создаем общий тип для всех "props" путем комбинации трех созданных выше типов. Все это нужно для указания типа
"props" в классовом компоненте.*/
type PropsType = MapStateToPropsType & MapDispatchToPropsType & PathnameType;


const ProfileContainerWithSuspense = withSuspense(ProfileContainer); /*Обвернули "withSuspense(ProfileContainer)"
в отдельную переменную "ProfileContainerWithSuspense", чтобы это можно было использовать как тег ниже в маршруте
"/profile/:userID?". Мы это сделали после типизации HOC "withSuspense", нам из-за этого пришлось добавить в этот маршрут
"() => ", поскольку HOC возвращает новый компонент, но не отрисовывает его. Поэтому для отрисовки нам теперь там нужен
тег (в маршруте "/dialogs/" мы уже использовали тег так-то).*/


/*
"App" это классовый компонент.
Классы нужны для того, чтобы создавать однотипные объекты на базе этих классов, благодаря чему можно реализовывать
концепцию ООП.
React определяет классовый компонент и на его основе создает экземпляр класса, и далее будет уже взаимодействовать
с этим объектом (использовать его свойства и методы). Этот объект хранится постоянно в памяти и React с ним постоянно
взаимодействует.
Например, у него можно постоянно запрашивать JSX.
В React при создании класса мы наследуем и расширяем некий базовый класс "React.Component" при помощи "extends".
Компонент это функция, которая возвращает JSX.
Классовые компоненты могут содержать "side effects". Для этого используются методы жизненного цикла.
У классового компонента всегда есть метод render(){...}, который возвращает JSX.
При переходе по разным "Route" экземпляры классовых компонентов удаляются из памяти.
JSX совмещает в себе JS и HTML.
Компонент это функция, которая возвращает JSX.
JSX совмещает в себе JS и HTML.
В JSX для указания класса в стилях нужно использовать "className" вместо "class".
В JSX скобки {} позволяют использовать JS-код внутри HTML-кода.
Каждый компонент это новый тег для ReactJS, и эти теги используются для вызова этих компонентов.
Теги компонентов можно вкладывать друг в друга, тем самым образуя дерево компонентов.
Каждый компонент желательно помещать в отдельный файл.
Каждый компонент всегда вызывается с объектом, внутри которого какие-то параметры.
Если параметры не указаны, то им все равно передается пустой объект в качестве параметров.
Принято объект с параметрами именовать как "props".
Вызывая тег компонента и передавая ему атрибуты, мы отдаем ему параметры.
"App" является главным корневым компонентом, к которой в дереве компонентов подключаются остальные компоненты.
*/
class App extends React.Component<PropsType/*, StateType*/> /*Указали, что "props" в этом классовом компоненте имеют тип
"PropsType". Еще здесь можно указать тип "state", но мы не указали.*/ {
    /*Далее идет код, который отлавливает отклоненные промисы. "promiseRejectionEvent" - это перехватчик событий.
    Желательно вместо "alert" сделать красивый вывод ошибки. Внизу в "componentDidMount()" совместно
    с "componentWillUnmount()" есть еще одна реализация перехвата отклоненных промисов. В данный момент мы не используем
    ни один из этих вариантов, так как используем для перехвата ошибок "try/catch" в TC "updateUserStatus" в файле
    "profile-reducer.ts", что будет мешать работать прослушиванию событий (хотя возможно первая реализация будет
    работать).*/
    /*catchAllUnhandledErrors = (promiseRejectionEvent: promiseRejectionEvent) => {
        alert("some error occurred");
    };*/

    componentDidMount() {/*Это метод жизненного цикла классового компонента. Он вызывается в момент первой отрисовки
    (монтирования) компонента.*/
        this.props.initializeApp(); /*При монтировании компонента вызывается TC "initializeApp" для инициализации
        приложения. Поскольку мы это делаем в компоненте "App", который является точкой входа, то есть мы его всегда
        видим, то это будет работать во всем приложении.*/

        /*Еще одна реализация перехвата отклоненных промисов, продолжение ниже в "componentWillUnmount()".
        "window.addEventListener" - это side effects, подписались на прослушивание событий по типу
        "unhandledrejection". Когда происходит событие, то вызывается метод "this.catchAllUnhandledErrors".*/
        /*window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors);*/
    };

    /*"componentWillUnmount()" - это метод жизненного цикла классового компонента. Он вызывается в момент, когда
    компонент перестает быть отрисованным. Здесь при демонтирования компонента мы отписываемся от прослушивания
    событий из "componentDidMount()".*/
    /*componentWillUnmount() {
        window.removeEventListener("unhandledrejection", this.catchAllUnhandledErrors);
    };*/

    render() {
        if (!this.props.initialized) { /*Пока мы не убедимся, что приложение инициализировано, мы будем показывать
        компонент "Preloader", тем самым избежим мигания сайта из-за редиректов.*/
            return <Preloader/>
        };

        const {Content, Footer} = Layout; /*При помощи деструктуризации берем объекты "Content" и "Footer" из объекта
        "Layout" из UI-фреймфорка "Ant Design", чтобы использовать их как теги внутри для реализации основного
        содержания страницы и футера.*/

        /*
        Здесь после return в компоненте начинается HTML разметка.
        Нужно помнить, что в этой разметке должен быть только один корневой элемент.
        Поскольку то, что возвращает return указано с новой строки, поэтому все возвращаемое помещено в круглые скобки.
        */
        return (
            <Layout> {/*Этот элемент "Layout" и есть наш корневой элемент. Элемент "Layout" - это макет, то есть это
            самая внешняя структура проекта, обычно  состоящая из навигации, футера, сайдбара, уведомлений и
            содержания.*/}
                <Header/> {/*Отрисовываем компонет "Header", указывая его тег в JSX.*/}

                <Content className='main-content'> {/*Элемент "Content" - это элемент для включения в него содержания
                страницы. В данном случае мы включаем все содержимое страницы в этот элемент.*/}
                    <Layout> {/*Элемент "Layout" - это макет, то есть это самая внешняя структура проекта, обычно
                    состоящая из навигации, футера, сайдбара, уведомлений и содержания.*/}
                        <Navbar location={this.props.location}/> {/*Отрисовываем компонет "Navbar", указывая его тег в
                        JSX. Передаем в этот компонент информацию о пути, на котором сейчас находимся.*/}

                        <Content className='actual-content'> {/*Этот элемент "Content" содержит основной контент нашего
                        приложения.*/}
                            <Switch>
                                <Route exact path='/' /*Создаем маршрут для пути '/'. "exact" говорит о том, что путь
                                должен совпадать точь в точь, то есть если, например, будет какой-то подпуть, то такой
                                путь не подойдет.*/
                                       render={() => <Redirect to='/profile'/>}/> {/*"render" это анонимная функция из
                                       библиотеки "react-router-dom", которую вызовет "Route" при совпадении пути.
                                       "render" позволяет передавать параметры. В данном случае произойдет редирект на
                                       путь '/profile'.*/}

                                {/*Это еще одна версия вышеуказанного "Route" редиректом. Оба варианта рабочие, если они
                                обвернуты в тег <Switch>.*/}
                                {/*
                                <Route exact path='/'>
                                    <Redirect to='/profile'/>
                                </Route>
                                */}

                                <Route path='/dialogs/' /*Создаем маршрут для пути '/dialogs/'.*/
                                       render={() => <Suspense fallback={<Preloader/>}><DialogsContainer/></Suspense>}/>
                                {/*"render" это анонимная функция из библиотеки "react-router-dom", которую вызовет
                                "Route" при совпадении пути. "render" позволяет передавать параметры. Здесь мы также
                                использовали тег "Suspense", чтобы реализовать "lazy loading" без нашего HOC
                                "WithSuspense.tsx". Также здесь указано, что пока будет идти загрузка компонента будет
                                показываться компонент-заглушка "Preloader".*/}

                                <Route path='/profile/:userID?' /*Создаем маршрут для пути '/profile/:userID?'.
                                ":userID" означает, что у пути может быть какое-то дополнение по типу "ID" пользователя,
                                это не является параметром запроса. "?" в конце означает, что это дополнение является
                                опциональным, если это не указать, то просто переход в "/profile" не отрисует
                                компонент.*/
                                       render={() => <ProfileContainerWithSuspense/>}/> {/*"render" это анонимная
                                       функция из библиотеки "react-router-dom", которую вызовет "Route" при совпадении
                                       пути. "render" позволяет передавать параметры. Здесь мы также используем наш HOC
                                       "WithSuspense.tsx" для реализации "lazy loading".*/}

                                {/*Далее представлен еще один способ реализации "lazy loading" для компонентов
                                "DialogContainer.jsx" и "ProfileContainer.tsx" без использования нашего HOC
                                "WithSuspense.tsx". Здесь мы сразу несколько тегов "Route" обварачиваем в один тег
                                "Suspense". В данный момент этот вариант не используется в нашем проекте.*/}
                                {/*
                                <Suspense fallback={<Preloader/>}>
                                    <Route path='/dialogs/'
                                        render={() => <DialogsContainer/>}/>
                                    <Route path='/profile/:userID?'
                                        render={() => <ProfileContainer/>}/>
                                </Suspense>
                                */}

                                <Route path='/users/' /*Создаем маршрут для пути '/users/'.*/
                                       render={() => <Users/>}/> {/*"render" это анонимная функция из
                                       библиотеки "react-router-dom", которую вызовет "Route" при совпадении пути.
                                       "render" позволяет передавать параметры.*/}

                                <Route path='/news/' /*Создаем маршрут для пути '/news/'.*/
                                       render={() => <News/>}/> {/*"render" это анонимная функция из библиотеки
                                       "react-router-dom", которую вызовет "Route" при совпадении пути. "render"
                                       позволяет передавать параметры.*/}

                                <Route path='/music/' /*Создаем маршрут для пути '/music/'.*/
                                       render={() => <Music/>}/> {/*"render" это анонимная функция из библиотеки
                                       "react-router-dom", которую вызовет "Route" при совпадении пути. "render"
                                       позволяет передавать параметры.*/}

                                <Route path='/settings/' /*Создаем маршрут для пути '/settings/'.*/
                                       render={() => <Settings/>}/> {/*"render" это анонимная функция из библиотеки
                                       "react-router-dom", которую вызовет "Route" при совпадении пути. "render"
                                       позволяет передавать параметры.*/}

                                <Route path='/friends/' /*Создаем маршрут для пути '/friends/'.*/
                                       render={() => <Friends/>}/> {/*"render" это анонимная функция из библиотеки
                                       "react-router-dom", которую вызовет "Route" при совпадении пути. "render"
                                       позволяет передавать параметры.*/}

                                <Route path='/login/' /*Создаем маршрут для пути '/login/'. Если нужно, что в компонент
                                "Login" можно было попасть только по одному адресу, то нужно использовать
                                "exact path='/login/'". Тогда, например, если перейти по пути '/login/facebook', то мы
                                не попадем в этот компонент. Аналогичный результат можно получить, если обвернуть все
                                "Route" в тег <Switch>.*/
                                       render={() => <Login/>}/> {/*"render" это анонимная функция из библиотеки
                                       "react-router-dom", которую вызовет "Route" при совпадении пути. "render"
                                       позволяет передавать параметры.*/}

                                <Route path='*' /*Создаем маршрут для пути '*'. Этот путь обозначает неверный URL, то
                                есть любой отличающийся от любого пути в указанных нами маршрутах. Нужно для отображения
                                "404" в таких случаях. Чтобы это работало нужно обвернуть все "Route" в тег <Switch>.*/
                                       render={() => <div>404 NOT FOUND</div>}/> {/*"render" это анонимная функция из
                                       библиотеки "react-router-dom", которую вызовет "Route" при совпадении пути.
                                       "render" позволяет передавать параметры.*/}
                            </Switch>
                        </Content>
                    </Layout>
                </Content>

                <Footer className='main-footer'>It's 2021 and there is a footer here</Footer> {/*Отрисовываем
                футер при помощи элемента "Footer".*/}
            </Layout>
        );
    }
};


const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({ /*Здесь указываются данные из "state", которые
необходимо передать в компонент "App". Эта функция возвращает указанные данные в виде объекта. На входе
"mapStateToProps" принимает "state" с типом "AppStateType", который мы создали и импортировали сюда, а на выходе выдает
данные с типом "MapStateToPropsType".*/
    initialized: state.app.initialized /*Свойство, которое показывает инициализировано ли приложение.*/
});


/*Поскольку мы не можем обворачивать компонент "App" в файле "index.js", мы это делаем здесь. Создали внутри этого
файла контейнерный компонент "AppContainer", который обварачивает наш компонент "App" при помощи метода "compose".*/
let AppContainer = compose<ComponentType>( /*При помощи функции "compose" объеденяем HOCs "withRouter" и "connect",
возвращая итоговый компонент "AppContainer". Здесь мы уточнили тип только одним параметром, так как согласно файлу
декларации функции "compose" (раздел "rest"), нам нужно уточнить только такой компонент, свойства "props" которого не
будут переданы в этот компонент функциями, которые были переданы внутрь функции "compose", то есть функциями "connect" и
"withRouter", то есть никакие свойства, так как мы не передаем извне ничего в компонент "AppContainer" снизу в
компоненте "AppMain".*/
    withRouter, /*При помощи метода "withRouter" передаем в этот контейнерный компонент данные из URL.*/
    connect(mapStateToProps, {initializeApp}) /*При помощи метода "connect" создаем контейнерный
    компонент, и тем самым передаем нужные данные BLL и DAL компоненту "App".*/
)(App);


/*Далее мы обварачиваем созданный выше контейнерный компонент "AppContainer" в "Provider" и в "BrowserRouter".
Получившийся в итоге компонент "AppMain" экспортируется, чтобы использоваться в файле "index.js".
При помощи этих двух компонентов "AppContainer" и "AppMain" мы избавились от обверток вокруг компонента "App"
в файле "index.js". Указали, что компонент "AppMain" имеет тип "React.FC", без уточнения типов "props", так как ничего
внутрь не передаем.*/
const AppMain: React.FC = (props) => {
    return (
        <BrowserRouter> {/*Обворачиваем компонент "AppContainer" в тег "BrowserRouter", чтобы работали маршруты "Route"
        в компоненте "App".*/}
            <Provider store={store}> {/*Обворачиваем компонент "AppContainer" в тег "Provider", чтобы указать,
            что этот компонент будет поставщиком данных BLL и DAL для дочерних компонентов, то есть для создания
            контекста, из которого контейнерные компоненты смогут брать указанные данные. Также здесь указываем
            наш "store".*/}
                <AppContainer/>
            </Provider>
        </BrowserRouter>
    )
};


export default AppMain; /*Экспортируем компонент "AppMain" по default и будем его использовать в нашем проекте под
именем "AppMain", экспорт необходим для импорта.*/