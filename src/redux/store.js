/*Это наш самописный store до использования библиотеки Redux. store собирается из state и редьюсеров.*/

/*Импортируем редьюсер "profileReducer".*/
import {profileReducer} from './profile-reducer';
/*Импортируем редьюсер "dialogsReducer".*/
import {dialogsReducer} from './dialogs-reducer';
/*Импортируем редьюсер "sidebarReducer".*/
import {sidebarReducer} from './sidebar-reducer';
/*Импортируем из ассетов проекта аватар пользователя.*/
import avatarSource from '../assets/images/user.png';

let store = {
    /*Формируем state в виде объекта, содержащего другие объекты, которые являются данными из BLL.*/
    _state: {
        /*Формируем часть state, с данными нужными для страницы профиля пользователя.*/
        profilePage: {
            /*Формируем массив объектов, с данными по постам пользователя на его странице профиля.*/
            postsData: [
                {id: 1, message: 'Hi, how are you?', likesCount: 2, avatar: avatarSource},
                {id: 2, message: 'It\'s my first post', likesCount: 3, avatar: avatarSource}
            ],

            /*Специальное свойство, содержащее перехваченное сообщение обработчиком "onChange()", который будет
            срабатывать каждый раз при изменении поля в "textarea". Это делается для создания FLUX-круговорота. В
            дальнейшем это не используется, так как библиотека Redux Form использует свой state для такого
            круговорота.*/
            newPostText: 'kamasutra'
        },

        /*Формируем часть state, с данными нужными для страницы диалогов пользователя.*/
        dialogsPage: {
            /*Формируем массив объектов, с данными по диалогам пользователя.*/
            dialogs: [
                {id: 1, name: 'Abba', avatar: avatarSource},
                {id: 2, name: 'Bret', avatar: avatarSource},
                {id: 3, name: 'Carry', avatar: avatarSource},
                {id: 4, name: 'Daemon', avatar: avatarSource},
                {id: 5, name: 'Eric', avatar: avatarSource},
                {id: 6, name: 'Frye', avatar: avatarSource}
            ],

            /*Формируем массив объектов, с данными по исходящим сообщениям пользователя.*/
            messagesData: [
                {id: 1, message: 'Hi', avatar: avatarSource},
                {id: 2, message: '..', avatar: ''},
                {id: 3, message: 'Fine', avatar: avatarSource},
                {id: 4, message: 'You?', avatar: avatarSource}
            ],

            /*Формируем массив объектов, с данными по входящим сообщениям пользователя.*/
            incomingMessagesData: [
                {id: 1, message: '..', avatar: ''},
                {id: 2, message: 'How are you?', avatar: avatarSource},
                {id: 3, message: '..', avatar: ''},
                {id: 4, message: '..', avatar: ''},
                {id: 5, message: 'OK', avatar: avatarSource}
            ],

            /*Специальное свойство, содержащее перехваченное сообщение обработчиком "onChange()", который будет
            срабатывать каждый раз при изменении поля в "textarea". Это было сделано для создания FLUX-круговорота. В
            дальнейшем это не используется, так как библиотека Redux Form использует свой state для такого
            круговорота.*/
            newMessageText: 'kamasutra'
        },

        /*Формируем часть state, с данными нужными для сайдбара, показывающего друзей в онлайне.*/
        sidebar: {
            /*Формируем массив объектов, с данными по друзьям в онлайне.*/
            friendsData: [
                {id: 1, name: 'Abba', avatar: avatarSource},
                {id: 2, name: 'Bret', avatar: avatarSource},
                {id: 3, name: 'Carry', avatar: avatarSource}
            ]
        }
    },

    /*Внутренний метод для уведомления наблюдателя (подписчика). Нижнее подчеркивание обозначает, что разработчик не
    хотел бы, чтобы этот метод использовался за пределами объекта.*/
    _callSubscriber() { },

    /*Геттер для получения state.*/
    getState() { return this._state },

    /*Метод для подписки наблюдателя (подписчика). Где-то в приложении должен вызываться этот метод и ему должна
    передаваться функция (подписчик), после чего внутренний метод "_callSubscriber()" будет ссылаться на нее при
    вызове.*/
    subscribe(observer) { this._callSubscriber = observer },

    /*Это специальный метод, который вызывается во всем приложении. Он содержит внутри себя тела функций, которые
    реализуют разный функционал приложения. Например, добавление поста.

    Чтобы этот метод мог определять какую именно свою часть запускать, он получает на входе action-объект. Этот
    action-объект всегда как минимум содержит свойство "type", значение которого и определяет, что нужно делать этому
    методу.

    До использования этого метода у нас были отдельные методы под каждый функционал приложения. После добавления этого
    метода мы теперь можем вызывать только его, передавая ему необходимый action-объект для указания какой функционал
    нам нужен.

    Сами action-объекты формируются при помощи Action Creators, специальных функций в редьюсерах. AC вызываются в самом
    UI, и сформированные ими action-объекты передаются в этот метод. То есть "задиспатчить action-объект" означает
    передать этот action-объект в редьюсеры.

    Этот метод передает action-объект в каждый редьюсер, которые реализованы при помощи конструкции switch/case. И в
    зависимости от свойства "type" будет запускаться определенная часть конструкции switch/case определенного редьюсера.

    Редьюсер для работы требует action-объект и state. Каждый редьюсер меняет (или не меняет, если action-объект не
    подошел) определенную часть state и возвращает ее. После выполнения своей работы, каждый редьюсер возвращает
    измененную (если изменения были) часть state, которые в дальнейшем в этом методе сохраняются в общий state. А дальше
    этот метод уведомляет подписчика, который является рендером нашего приложения, чтобы перерисовать наше приложения
    (UI) в соответствии с изменениями в state (BLL).

    Там, где мы перекидывали этот метод в файле "App.tsx", мы при помощи функции "bind()" связывали его с контекстом
    store.*/
    dispatch(action) {
        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
        this._state.sidebar = sidebarReducer(this._state.sidebar, action);
        this._callSubscriber(this._state);
    }
};

export default store;
/*На случай если нам нужно будет глобально обратиться к store.*/
window.store = store;