/*
Этот файл содержит наш "store", созданный при помощи библиотеки "redux".
"React Developer Tools" - это плагин для браузеров, который позволяет отслеживать какой компонент
сколько рендериться, увидеть дерево компонентов (props, hooks) и прочее.
"Redux DevTools" - это плагин для браузеров, который показывает, что находится в "state" и все объекты "action",
которые диспатчатся в "state".
*/

import {Action, applyMiddleware, combineReducers, compose, createStore, Dispatch} from 'redux';
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
несколько обверток вокруг компонента и HOCs.
Обвертки и HOCs указываются снизу вверх. Функция "compose" вызывается дважды и работает схожим образом, как и метод
"connect" из библиотеки "react-redux".
Импортировали "Dispatch" из библиотеки "redux", чтобы создать тип для "dispatch", который передается в "thunks" и TC.
Импортировали "Action" из библиотеки "redux", чтобы создать тип для объектов "action", который передается в "thunks" и
TC.
*/
import thunkMiddleWare, {ThunkAction} from 'redux-thunk';
/*
Для установки "thunk middleware" нам нужна библиотека "redux-thunk".
"thunk middleware" это промежуточный слой между "store.dispatch" и "reducers" для работы с "thunks".
Для добавления в наш проект этого слоя мы импортируем "thunkMiddleWare".
Импортировали "ThunkAction" из библиотеки "redux-thunk", чтобы создать тип для "thunks".
*/
import {reducer as formReducer} from 'redux-form';
/*
Библиотека "redux-form" нужна для работы с формами.
Эта библиотека добавляет в "store", то есть в глобальный "state" свой "reducer" и
обрабатывает какую-то свою ветку данных. Эта ветка процессит все формы на сайте, что позволяет нам меньше делать работы
по организации данных форм в "state".
Эта библиотека предоставляет специальный HOC. Задача компонента, которым этот HOC обвернет другой компонент,
является общаться со своей частью в "reducer".
Эта библиотека является устаревшей, поэтому лучше использовать более актуальные аналоги, например, "react-final-form",
который работыет на хуках. Так же может подойти "formik".
Эта библиотека, добавляя свою часть в глобальный "state", обязуется заниматься круговоротом данных (FLUX) со всеми
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
import appReducer from './app-reducer'; /*Импортируем "reducer", отвечающий за инициализацию приложения.*/
import chatReducer from './chat-reducer'; /*Импортируем "reducer", отвечающий за чат в нашем приложении.*/


/*Делаем на основе нашего корневого "reducer" "rootReducer" тип при помощи "typeof". В итоге там получится что-то вроде
функции "(globalState: AppStateType) => AppStateType", то есть получает на входе "state" типа "AppStateType" (имя
выдумано нами) и на выходе возвращает "state" того же типа. То есть мы получили тип для нашего "rootReducer".*/
type RootReducerType = typeof rootReducer;

/*Сохраняем тип нашего "state" в переменную "AppStateType", чтобы можно было указывать тип "state" в компонентах, при
помощи "ReturnType" (скорее всего, получает тип того, что возвращается, а "reducer" возвращает "state") из типа
"rootReducer".*/
export type AppStateType = ReturnType<RootReducerType>;


type PropertiesTypes<T> = T extends {[key: string]: infer U} ? U : never; /*В данном случае наш тип "PropertiesTypes"
является "generic", который принимает подтип "T", подразумевается, что будет уточняться тип объекта в этом "T" при
помощи "typeof" (если конкретно, то "typeof" многих упакованных AC в единый объект). Если подтип "T" будет совпадать с
объектом, у которого есть какой-то ключ "[key: string]" ("string" - так как имя ключа это текст) с неким значением "U",
то при помощи "infer" будет проанализировано это значение "U" и возвращено это значение "U", иначе вернет "never", что
примерно означает ничего не сделать. И через такой алгоритм пройдет каждое свойство объекта. Это вспомогательный тип,
который будет использоваться в типе "InferActionsTypesOld" ниже. Также этот тип можно использовать для определения типов
AC (функции, возвращающие объекты "action"), упакованных в единый объект.*/

type InferActionsTypesOld<T extends {[key: string]: (...args: any[]) => any}> = ReturnType<PropertiesTypes<T>>;
/*Здесь мы создаем специальный тип, который позволит нам определять тип объектов "action", возвращаемых AC, которые
в свою очередь должны быть упакованы в единый объект. Создаем псевдоним для "ReturnType<PropertiesType<T>>", где "T"
это "typeof packedActions" ("packedActions" - одно из возможных имен объекта, содержащего все AC), под названием
"InferActionsTypes". Здесь мы также уточняем, что в типе "InferActionsTypes" нужно указать ограничение (constraint) для
передаваемого "T", указав, что это обязательно должен быть объект, у которого в качестве значений свойств обязательно
должны быть функции, принимающие что-нибудь и возвращающие что-нибудь, коими являются AC. Мы экспортируем этот тип,
чтобы компактно определять типы объектов "action" в "reducers".*/

export type InferActionsTypes<T> = T extends {[key: string]: (...args: any[]) => infer U} ? U : never; /*Это более
краткий аналог сразу двух типов "PropertiesTypes" и "InferActionsTypesOld", которые мы создали выше выше.*/


/*Создаем типы для всех "Thunk Creators".*/
export type BaseGetStateType = () => AppStateType; /*Создали тип для "getState()", который получают "thunks" и TC.
"getState()" должен быть функцией, которая ничего не получает на входе и возвращает объект с типом "AppStateType",
который был создан нами. Мы это пока не используем в проекте, так как типизация "thunks" при помощи типа
"BaseThunkType", который создан ниже, перекрывает эту типизацию, поскольку типизируя то, что возвращает TC, то есть
"thunk", мы также типизировали, что в "thunk" будет передаваться дальше, то есть те самые "dispatch", "getState()" и
дополнительные аргументы.*/

export type BaseDispatchType<ActionsType extends Action> = Dispatch<ActionsType>; /*Создали тип для "dispatch", который
передается в "thunks" и TC. "dispatch" должен быть "Dispatch" из библиотеки "redux", работающий с объектами "action"
типа "ActionsType", который мы должны указывать первым параметром и который в свою очередь должен совпадать с "Action"
из библиотеки "redux".*/

export type BaseThunkType<ActionsType extends Action, R = void> = ThunkAction<R, AppStateType, unknown, ActionsType>;
/*Создали тип для "thunks". "thunks" должны быть объектами "action" для "thunks" с типом "ThunkAction" из библиотеки
"redux-thunk", работающими с:
1. промисами, которые ничего не возвращают (промисы потому, что у нас асинхронные "thunks" из-за использования
"async/await", хотя обычно "thunks" ничего не возвращают), указываем их вторым параметром "R" и поскольку "thunks"
обычно ничего не возвращают, то делаем значение "void" значением по умолчанию этого параметра "R", хотя в уроке было
указано "Promise<void>" вместо "void", но такой вариант не работал в типизации "app-reducer.ts", поскольку там мы
используем "Promise.all";
2. "state" с типом "AppStateType", который был создан нами;
3. какими-то неизвестными дополнительными аргументами;
4. объектами "action" типа "ActionsType", который мы должны указывать первым параметром "ActionsType" и который должен
совпадать с "Action" из библиотеки "redux".
Эти уточнения мы нашли в файле декларации "ThunkAction", "Ctrl+click" в "WebStorm".
В уроке (1:19) также было указано, что по умолчанию первый параметр "ActionsType" может быть "Action" из библиотеки
"redux" ("= Action"), но я пока этого не стал указывать.
*/


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
    app: appReducer,
    chat: chatReducer
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


export default store; /*Экспортируем весь "store" по default и будем его использовать в нашем проекте под
именем "store", экспорт необходим для импорта.*/