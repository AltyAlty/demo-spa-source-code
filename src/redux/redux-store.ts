/*
Этот файл содержит наш "store", созданный при помощи библиотеки "redux".
"React Developer Tools" - это плагин для браузеров, который позволяет отслеживать какой компонент
сколько рендериться, увидеть дерево компонентов (props, hooks) и прочее.
"Redux DevTools" - это плагин для браузеров, который показывает, что находится в "state" и все объекты "action",
которые диспатчатся в "state".
*/

import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
/*
Библиотека "redux" помогает организовать FLUX-круговорот и "state management".
В "redux" есть свои аналоги "getState", "subscribe", "callSubscriber", "dispatch".
"Store" в "redux" при уведомлении подписчиков не передает им "state".
Метод "createStore" позволяет создать "store".
Для работы этого "store" нужно создавать отдельные "reducers".
Метод "combineReducers" позволяет объеденить все "reducers".
Методе "applyMiddleware" добавляет возможность указывать и подключать в "store" промежуточный слой между
"store.dispatch" и "reducers".
Нам нужен будет слой "thunk middleware" для работы с "thunks".
Функция "compose" из функционального программирования. Эта функция создает композицию обработчиков.
Библиотека "redux" содержит свою реализацию "compose". При помощи функции "compose" можно объеденять, например,
несколько обверток вокруг компонента и ХОКи.
Обвертки и ХОКи указываются снизу вверх. Функция "compose" вызывается дважды и работает схожим образом, как и метод
"connect" из библиотеки "react-redux".
*/
import thunkMiddleWare from 'redux-thunk';
/*
Для установки "thunk middleware" нам нужна библиотека "redux-thunk".
"thunk middleware" это промежуточный слой между "store.dispatch" и "reducers" для работы с "thunks".
Для добавления в наш проект этого слоя мы импортируем "thunkMiddleWare".
*/
import {reducer as formReducer} from 'redux-form';
/*
Библиотека "redux-form" нужна для работы с формами.
Эта библиотека добавляет в "store", то есть в глобальный "state" свой "reducer" и
обрабатывает какую-то свою ветку данных. Эта ветка процессит все формы на сайте, что позволяет нам меньше делать работы
организации данных форм в "state".
Эта библиотека предоставляет специальный HOC. Задача компонента, которым этот HOC обвернет другой компонент,
является общаться со своей частью в "reducer".
Эта библиотека является устаревшей, поэтому лучше использовать более актуальные аналоги, например, "react-final-form",
который работыет на хуках. Так же может подойти "formik".
Эта библиотека, добавляя свою часть в глобальный "state", обязуется заниматься круговоротом данных (FLEX) со всеми
формами в приложении. То есть нам самим не нужно будет что-то диспатчить. Часть "state", которую создает эта библиотека,
не является по сути данными, относящимися к BLL, но при этом находятся в глобальном "state".
Также эта библиотека упрощает создание валидации форм, так как в ее "state" есть полезные для этого данные (поля и
свойства).
Так же стоит помнить, что дефолтное поведение кнопки при "submit" это отправка данных на сервер,
что является индикатором для перерисовки в React.
*/

import profileReducer from './profile-reducer'; /*Импортируем "reducer", отвечающий за страницу профиля.*/
import dialogsReducer from './dialogs-reducer'; /*Импортируем "reducer", отвечающий за страницу диалогов.*/
import sidebarReducer from './sidebar-reducer'; /*Импортируем "reducer", отвечающий за сайдбар.*/
import usersReducer from './users-reducer'; /*Импортируем "reducer", отвечающий за страницу пользователей.*/
import authReducer from './auth-reducer'; /*Импортируем "reducer", отвечающий за аутентификацию пользователей.*/
import appReducer from './app-reducer'; /*Импортируем "reducer", отвечающий за инициализацию приложеня.*/


/*Делаем на основе нашего корневого "reducer" "rootReducer" тип при помощи "typeof". В итоге там получится что-то вроде
функции "(globalState: AppStateType) => AppStateType", то есть получает на входе "state" типа "AppStateType" (имя
выдумано нами) и на выходе возвращает "state" того же типа. То есть мы получили тип для нашего "rootReducer".*/
type RootReducerType = typeof rootReducer;
/*Сохраняем тип нашего "state" в переменную "AppStateType", чтобы можно было указывать тип "state" в компонентах, при
помощи "ReturnType" (скорее всего получает тип того, что возвращается, а "reducer" возвращает "state") из типа
"rootReducer".*/
export type AppStateType = ReturnType<RootReducerType>;

/*Это список наших "reducers" в нашем "store".*/
let rootReducer = combineReducers({ /*При помощи метода "combineReducers" объеденяем все наши "reducers"
в "rootReducer". Иногда можно дробить "reducers" на "под-reducers", которые вызываются внутри "reducers". Наш
"rootReducer" сначала берет весь начальный "state", раздает его по кускам в "reducers", они в свою очередь возвращают
обратно измененные куски "state", которые "rootReducer" собирает в новый "state" и возвращает его.*/
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer, /*Здесь важно, чтобы часть "state", которая создается библиотекой "redux-form", называлась
    именно "form", иначе придется многое переписывать дополнительно.*/
    app: appReducer
});

/*Здесь идет создание "store" и установка плагина "Redux DevTools".*/
/*Также далее идет комментарий, который говорит "TypeScript", чтобы он игнорировал следующий
за этим комментарием код.*/
// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
/*"window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__" - это какой-то глобальный объект из плагина "Redux DevTools".
Эта строчка является необходимой для того, чтобы плагин "Redux DevTools" работал.
Этим "composeEnhancers" мы ниже обварачиваем создание промежуточного слоя "thunkMiddleWare" в "store",
что также необходимо, чтобы плагин "Redux DevTools" работал.*/
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleWare)));
/*
При помощи метода "createStore"
создаем "store", передавая ему наш "rootReducer". При помощи метода "applyMiddleware" указываем, что подключаем в
"store" промежуточный слой "thunkMiddleWare".
*/

/*Далее идет комментарий, который говорит "TypeScript", чтобы он игнорировал следующий
за этим комментарием код. Если же все-таки нужно будет типизировать объект "window", то вроде можно написать такое:

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any,
        store: any
    }
};

*/
// @ts-ignore
window.__store__ = store; /*На случай если нам нужно будет глобально обратиться к "store".*/

export default store; /*Экспортируем весь "store" по default, экспорт необходим для импорта.*/