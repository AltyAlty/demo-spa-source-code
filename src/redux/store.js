/*Это наш самописный "store" до использования "redux". "store" собирается из "state" и "reducer-ов".*/
import profileReducer from './profile-reducer'; /*Импортируем "profileReducer".*/
import dialogsReducer from './dialogs-reducer'; /*Импортируем "dialogsReducer".*/
import sidebarReducer from './sidebar-reducer'; /*Импортируем "sidebarReducer".*/
import avatarSource from '../assets/images/user.png'; /*Импортируем из ассетов проекта аватар пользователя.*/

let store = {
    _state: { /*Формируем "state" в виде объекта, содержащего другие объекты, которые являются данными из BLL.*/
        profilePage: { /*Формируем часть "state", с данными нужными для страницы профиля пользователя.*/
            postsData: [ /*Формируем массив объектов, с данными по постам пользователя на его странице профиля.*/
                {
                    id: 1,
                    message: 'Hi, how are you?',
                    likesCount: 2,
                    avatar: avatarSource
                },
                {
                    id: 2,
                    message: 'It\'s my first post',
                    likesCount: 3,
                    avatar: avatarSource
                }
            ],

            newPostText: 'kamasutra' /*Специальное свойство, которое будет содержать перехваченное сообщение
            обработчиком onChange, который будет срабатывать каждый раз при изменении поля в "textarea".
            Это было сделано для создания FLUX-круговорота. В дальнейшем это не используется, так как
            библиотека "redux-form" использует свой "state" для такого круговорота.*/
        },

        dialogsPage: { /*Фформируем часть "state", с данными нужными для страницы диалогов пользователя.*/
            dialogs: [ /*Формируем массив объектов, с данными по диалогам пользователя.*/
                {
                    id: 1,
                    name: 'Abba',
                    avatar: avatarSource
                },
                {
                    id: 2,
                    name: 'Bret',
                    avatar: avatarSource
                },
                {
                    id: 3,
                    name: 'Carry',
                    avatar: avatarSource
                },
                {
                    id: 4,
                    name: 'Daemon',
                    avatar: avatarSource
                },
                {
                    id: 5,
                    name: 'Eric',
                    avatar: avatarSource
                },
                {
                    id: 6,
                    name: 'Frye',
                    avatar: avatarSource
                }
            ],

            messagesData: [ /*Формируем массив объектов, с данными по исходящим сообщениям пользователя.*/
                {
                    id: 1,
                    message: 'Hi',
                    avatar: avatarSource
                },
                {id: 2, message: '..', avatar: ''},
                {
                    id: 3,
                    message: 'Fuck off',
                    avatar: avatarSource
                },
                {
                    id: 4,
                    message: 'Bitch',
                    avatar: avatarSource
                }
            ],

            incomingMessagesData: [ /*Формируем массив объектов, с данными по входящим сообщениям пользователя.*/
                {id: 1, message: '..', avatar: ''},
                {
                    id: 2,
                    message: 'How are you?',
                    avatar: avatarSource
                },
                {id: 3, message: '..', avatar: ''},
                {id: 4, message: '..', avatar: ''},
                {
                    id: 5,
                    message: 'OK',
                    avatar: avatarSource
                }
            ],

            newMessageText: 'kamasutra' /*Специальное свойство, которое будет содержать перехваченное сообщение
            обработчиком onChange, который будет срабатывать каждый раз при изменении поля в "textarea".
            Это было сделано для создания FLUX-круговорота. В дальнейшем это не используется, так как
            библиотека "redux-form" использует свой "state" для такого круговорота.*/
        },

        sidebar: { /*Формируем часть "state", с данными нужными для сайдбара, показывающего друзей в онлайне.*/
            friendsData: [ /*Формируем массив объектов, с данными по друзьям в онлайне.*/
                {
                    id: 1,
                    name: 'Abba',
                    avatar: avatarSource
                },
                {
                    id: 2,
                    name: 'Bret',
                    avatar: avatarSource
                },
                {
                    id: 3,
                    name: 'Carry',
                    avatar: avatarSource
                }
            ]
        }
    },

    _callSubscriber() { /*Внутренний метод для уведомления наблюдателя (подписчика).
    Нижнее подчеркивание обозначает, что разработчик не хотел, чтобы этот метод использовался за пределами объекта.*/

    },

    getState() { /*Геттер для получения "state".*/
        return this._state;
    },
    subscribe(observer) { /*Метод для подписки наблюдателя (подписчика).
    Где-то в приложении должен вызываться этот метод и ему передается функция,
    после чего внутренний метод "_callSubscriber" будет ссылатся на нее при вызове.*/
        this._callSubscriber = observer;
    },

    dispatch(action) { /*Это специальный метод, который вызывается во всем приложении.
    Он содержит внутри себя тела функций, которые реализуют разный функционал приложения. Например, добавление поста.
    Чтобы "dispatch" мог определять какую именно свою часть запускать, он получает на входе объект "action".
    Этот объект всегда как минимум содержит свойство "type", значение которого и определяет, что нужно делать
    методу "dispatch". До этого метода у нас были отдельные разные методы под каждый функционал приложения. После
    добавления метода "dispatch" мы теперь можем вызывать только его, передавая ему необходимый объект "action", чтобы
    указать ему какой функционал нам нужен.

    Сами объекты "action" формируются при помощи "action creators", специальных функций в "reducers". "AC" вызываются
    в самом UI, и сформированные ими объекты "action" передаются в метод "dispatch". То есть "задиспатчить
    объект "action" это означает передать этот объект "action" в "reducers".

    Метод "dispatch" передает объект "action" в каждый "reducer", которые реализованы при помощи "switch-case".
    И в зависимости от свойства "type" будет запускаться определенная "case" часть определенного "reducer".
    "Reducer" для работы требует объект "action" и "state". Каждый "reducer" меняет (или не меняет, если объект "action"
    не подошел) определенную часть "state" и возвращает ее. После выполнения своей работы, каждый "reducer" возвращает
    измененную (если изменения были) часть "state", которые в дальнейшем в методе "dispatch" сохраняются
    в общий "state". А после этого метод "dispatch" уведомляет подписчика, который является рендером нашего приложения,
    чтобы перерисовать наше приложения (UI) в соотвествии с изменениями в "state" (BLL).

    Там, где мы перекидывали метод "dispatch" в "App.js", мы при помощи "bind" связывали его с контекстом "store".*/
        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
        this._state.sidebar = sidebarReducer(this._state.sidebar, action);
        this._callSubscriber(this._state);
    }
};

export default store; /*Экспортируем весь "store" по default, экспорт необходим для импорта.*/

window.store = store; /*На случай если нам нужно будет глобально обратиться к "store".*/