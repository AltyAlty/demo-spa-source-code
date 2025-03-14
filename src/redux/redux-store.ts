/*Этот файл содержит наш store, созданный при помощи библиотеки Redux.

React Developer Tools - это плагин для браузеров, который позволяет отслеживать какой компонент сколько раз рендерится,
увидеть дерево компонентов (props, hooks) и прочее.

Redux DevTools - это плагин для браузеров, показывающий, что находится в state и все action-объекты, которые диспатчатся
в state.*/

/*Библиотека Redux помогает организовать FLUX-круговорот и state management. В Redux есть свои аналоги функций
"getState()", "subscribe()", "callSubscriber()" и "dispatch()".

store в Redux при уведомлении подписчиков не передает им state.

Метод "createStore()" позволяет создать store. Для работы этого store нужно создавать отдельные редьюсеры. Метод
"combineReducers()" позволяет объединить все редьюсеры.

Метод "applyMiddleware()" добавляет возможность указывать и подключать в store промежуточный слой между методом
"store.dispatch()" и редьюсерами. Нам нужен будет слой "thunk middleware" для работы с thunks.

Функция "compose()" из функционального программирования. Эта функция создает композицию обработчиков. Библиотека Redux
содержит свою реализацию функции "compose()". При помощи функции "compose()" можно объединять, например, несколько
оберток вокруг компонента и HOCs. Обертки и HOCs указываются снизу вверх. Функция "compose()" вызывается дважды и
работает схожим образом, как и функция "connect()" из библиотеки React Redux.

Импортируем "Dispatch" из библиотеки Redux, чтобы создать тип для dispatch-функции, которая передается в thunks и TC.
Импортируем "Action" из библиотеки Redux, чтобы создать тип для action-объектов, которые передается в thunks и TC.*/
import {Action, applyMiddleware, combineReducers, compose, createStore, Dispatch} from 'redux';
/*Для установки "thunk middleware" нам нужна библиотека Redux Thunk. "thunk middleware" это промежуточный слой между
методом "store.dispatch()" и редьюсерами для работы с thunks. Для добавления в наш проект этого слоя мы импортируем
"thunkMiddleWare". Также импортируем "ThunkAction" из библиотеки Redux Thunk, чтобы создать тип для thunks.*/
import thunkMiddleWare, {ThunkAction} from 'redux-thunk';
/*Библиотека Redux Form нужна для работы с формами. Эта библиотека добавляет в store, то есть в глобальный state свой
редьюсер и обрабатывает какую-то свою ветку данных. Эта ветка процессит все формы на сайте, что позволяет нам меньше
делать работы по организации данных форм в state.

Эта библиотека предоставляет специальный HOC. Задача компонента, которым этот HOC обернет другой компонент, является
общаться со своей частью в редьюсере.

Эта библиотека, добавляя свою часть в глобальный state, обязуется заниматься круговоротом данных (FLUX) со всеми формами
в приложении. То есть нам самим не нужно будет что-то диспатчить. Часть state, которую создает эта библиотека, не
является по сути данными, относящимися к BLL, но при этом находятся в глобальном state.

Импортируем редьюсер "reducer()" из библиотеки Redux Form, чтобы встроить работу этой библиотеки в наш store.*/
import {reducer as formReducer} from 'redux-form';
/*Импортируем редьюсер "profileReducer", отвечающий за страницу профиля.*/
import {profileReducer} from './profile-reducer';
/*Импортируем редьюсер "dialogsReducer", отвечающий за страницу диалогов.*/
import {dialogsReducer} from './dialogs-reducer';
/*Импортируем редьюсер "sidebarReducer", отвечающий за сайдбар.*/
import {sidebarReducer} from './sidebar-reducer';
/*Импортируем редьюсер "usersReducer", отвечающий за страницу пользователей.*/
import {usersReducer} from './users-reducer';
/*Импортируем редьюсер "authReducer", отвечающий за аутентификацию пользователей.*/
import {authReducer} from './auth-reducer';
/*Импортируем редьюсер "appReducer", отвечающий за инициализацию приложения.*/
import {appReducer} from './app-reducer';
/*Импортируем редьюсер "chatReducer", отвечающий за чат в нашем приложении.*/
import {chatReducer} from './chat-reducer';

/*Делаем на основе нашего корневого редьюсера "rootReducer" тип при помощи typeof. В итоге там получится что-то вроде
функции "(globalState: AppStateType) => AppStateType", то есть получает на входе state типа "AppStateType" (имя выдумано
нами) и на выходе возвращает state того же типа. То есть мы получили тип для нашего корневого редьюсера "rootReducer".*/
type RootReducerType = typeof rootReducer;
/*Сохраняем тип нашего state в тип "AppStateType", чтобы можно было указывать тип state в компонентах, при помощи
ReturnType (скорее всего, получает тип того, что возвращается, а редьюсер возвращает state) из типа нашего корневого
редьюсера "rootReducer".*/
export type AppStateType = ReturnType<RootReducerType>;
/*В данном случае наш тип "PropertiesTypes" является generic, который принимает подтип "T", что подразумевает, что будет
уточняться тип объекта в этом "T" при помощи typeof (если конкретно, то typeof многих упакованных AC в единый объект).

Если подтип "T" будет совпадать с объектом, у которого есть какой-то ключ "[key: string]" ("string" - так как имя ключа
это текст) с неким значением "U", то при помощи infer будет проанализировано это значение "U" и возвращено это значение
"U", иначе будет возвращено never, что примерно означает ничего не сделать. И через такой алгоритм пройдет каждое
свойство объекта.

Это вспомогательный тип, который будет использоваться в типе "InferActionsTypesOld" ниже. Также этот тип можно
использовать для определения типов AC, упакованных в единый объект.*/
type PropertiesTypes<T> = T extends { [key: string]: infer U } ? U : never;
/*Здесь мы создаем специальный тип, позволяющий нам определять тип action-объектов, возвращаемых AC, которые в свою
очередь должны быть упакованы в единый объект.

Создаем псевдоним для "ReturnType<PropertiesType<T>>", где "T" это "typeof packedActions" ("packedActions" - одно из
возможных имен объекта, содержащего все AC), под названием "InferActionsTypesOld". Здесь также уточняется, что в типе
"InferActionsTypesOld" нужно указывать ограничение (constraint) для передаваемого "T", указав, что это обязательно
должен быть объект, у которого в качестве значений свойств обязательно должны быть функции, принимающие что-нибудь и
возвращающие что-нибудь, коими являются AC.

Мы ранее экспортировали этот тип, чтобы компактно определять типы action-объектов в редьюсерах.*/
type InferActionsTypesOld<T extends { [key: string]: (...args: any[]) => any }> = ReturnType<PropertiesTypes<T>>;
/*Это более краткий аналог сразу двух типов "PropertiesTypes" и "InferActionsTypesOld", которые мы создаем выше.*/
export type InferActionsTypes<T> = T extends { [key: string]: (...args: any[]) => infer U } ? U : never;

/*Создаем типы для Thunk Creators и thunks.

Создаем тип для функции "getState()", которая получает thunks и TC. Функция "getState()" должна быть функцией, которая
ничего не получает на входе и возвращает объект с типом "AppStateType". Мы это пока не используем в проекте, так как
типизация thunks при помощи типа "BaseThunkType", который создаем ниже, перекрывает эту типизацию, поскольку типизируя
то, что возвращает TC, то есть thunk, мы также типизируем то, что в thunk будет передаваться дальше, то есть те самые
функции "dispatch()", "getState()" и дополнительные аргументы.*/
export type BaseGetStateType = () => AppStateType;
/*Создаем тип для dispatch-функции, которая передается в thunks и TC. Dispatch-функция должна быть типа "Dispatch" из
библиотеки Redux, работающей с action-объектами типа "ActionsType". Тип "ActionsType" должен указываться первым
параметром и совпадать с типом "Action" из библиотеки Redux.*/
export type BaseDispatchType<ActionsType extends Action> = Dispatch<ActionsType>;
/*Создаем тип для thunks. Thunks должны быть action-объектами для thunks с типом "ThunkAction" из библиотеки Redux
Thunk, работающими с:
1. Промисами, которые ничего не возвращают. Используются промисы потому, что у нас асинхронные thunks из-за
использования ключевых слов async/await, хотя обычно thunks ничего не возвращают. Указываем их вторым параметром "R" и
поскольку thunks обычно ничего не возвращают, то делаем значение void значением по умолчанию этого параметра "R", хотя в
уроке было указано "Promise<void>" вместо void, но такой вариант не работал в типизации файла "app-reducer.ts",
поскольку там мы используем метод "Promise.all()".
2. state с типом "AppStateType".
3. Какими-то неизвестными дополнительными аргументами.
4. Action-объектами типа "ActionsType", который указывается первым параметром "ActionsType" и должен совпадать с типом
"Action" из библиотеки Redux.

Эти уточнения мы нашли в файле декларации "ThunkAction".

В уроке (1:19) также было указано, что по умолчанию первый параметр "ActionsType" может быть типа "Action" из библиотеки
Redux ("= Action"), но я пока этого не стал указывать.*/
export type BaseThunkType<ActionsType extends Action, R = void> = ThunkAction<R, AppStateType, unknown, ActionsType>;

/*Это список наших редьюсеров в нашем store. При помощи функции "combineReducers()" объединяем все наши редьюсеры в
корневой редьюсер "rootReducer()". Иногда можно дробить редьюсеры на под-редьюсеры, которые вызываются внутри
редьюсеров.

Наш корневой редьюсер "rootReducer()" сначала берет весь начальный state, раздает его по кускам в редьюсеры, они в свою
очередь возвращают обратно измененные куски state, которые корневой редьюсер "rootReducer()" собирает в новый state и
возвращает его.*/
const rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    /*Здесь важно, чтобы часть state, которая создается библиотекой Redux Form, называлась именно "form", иначе придется
    многое переписывать дополнительно.*/
    form: formReducer,
    app: appReducer,
    chat: chatReducer
});

/*Здесь идет создание store и установка плагина Redux DevTools. Также далее идет комментарий, который говорит
Typescript, чтобы он игнорировал следующий за этим комментарием код.*/
// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
/*"window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__" - это какой-то глобальный объект из плагина Redux DevTools. Эта строчка
является необходимой для того, чтобы плагин Redux DevTools работал. Функцией "composeEnhancers()" мы оборачиваем
создание промежуточного слоя "thunkMiddleWare" в store, что также необходимо, чтобы плагин Redux DevTools работал.

При помощи функции "createStore()" создаем store, передавая ему наш корневой редьюсер "rootReducer()". При помощи
функции "applyMiddleware()" указываем, что подключаем в store промежуточный слой "thunkMiddleWare".*/
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleWare)));

/*Далее идет комментарий, который говорит TypeScrip, чтобы он игнорировал следующий за этим комментарием код. Если же
все-таки нужно будет типизировать объект "window", то вроде можно написать следующее:*/
// declare global {
//     interface Window {
//         __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any,
//         store: any
//     }
// }

/*На случай если нам нужно будет глобально обратиться к store.*/
// @ts-ignore
window.__store__ = store;

export default store;