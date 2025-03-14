/*Импортируем из ассетов проекта аватар пользователя.*/
import avatarSource from '../assets/images/user.png';
/*Импортируем тип "InferActionsTypes".*/
import {InferActionsTypes} from './redux-store';

export type InitialDialogsStateType = typeof initialState;

/*Создаем тип для объектов с данными для диалога.*/
type DialogType = {
    /*ID диалога должно быть числом.*/
    id: number
    /*Имя, с кем ведется диалог, должно быть строкой.*/
    name: string
    /*Аватар того, с кем ведется диалог, получаем на основе самого изображения аватара при помощи typeof.*/
    avatar: typeof avatarSource
};

/*Создаем тип для объектов с данными для исходящих сообщений в диалогах.*/
type MessageType = {
    /*ID исходящего сообщения должно быть числом.*/
    id: number
    /*Текст исходящего сообщения должно быть строкой.*/
    message: string
    /*Аватар того, от кого отправлено исходящее сообщение, получаем на основе самого изображения аватара при помощи
    typeof.*/
    avatar: typeof avatarSource
};

/*Создаем тип для объектов с данными для входящих сообщений в диалогах.*/
type IncomingMessageType = {
    /*ID входящего сообщения должно быть числом.*/
    id: number
    /*Текст входящего сообщения должно быть строкой.*/
    message: string
    /*Аватар того, от кого отправлено входящее сообщение, получаем на основе самого изображения аватара при помощи
    typeof.*/
    avatar: typeof avatarSource
};

let initialState = {
    /*Создаем массив объектов, которые хранят информацию о диалогах на странице диалогов. Указываем, что этот массив
    объектов имеет тип массива элементов с типом "DialogType".*/
    dialogs: [
        {id: 1, name: 'Abba', avatar: avatarSource},
        {id: 2, name: 'Bret', avatar: avatarSource},
        {id: 3, name: 'Carry', avatar: avatarSource},
        {id: 4, name: 'Daemon', avatar: avatarSource},
        {id: 5, name: 'Eric', avatar: avatarSource},
        {id: 6, name: 'Frye', avatar: avatarSource}
    ] as Array<DialogType>,

    /*Создаем массив объектов, которые хранят информацию об исходящих сообщениях в диалогах на странице диалогов.
    Указываем, что этот массив объектов имеет тип массива элементов с типом "MessageType".*/
    messagesData: [
        {id: 1, message: 'Hi', avatar: avatarSource},
        {id: 2, message: '..', avatar: ''},
        {id: 3, message: 'Fine', avatar: avatarSource},
        {id: 4, message: 'You?', avatar: avatarSource}
    ] as Array<MessageType>,

    /*Создаем массив объектов, которые хранят информацию о входящих сообщениях в диалогах на странице диалогов.
    Указываем, что этот массив объектов имеет тип массива элементов с типом "IncomingMessageType".*/
    incomingMessagesData: [
        {id: 1, message: '..', avatar: ''},
        {id: 2, message: 'How are you?', avatar: avatarSource},
        {id: 3, message: '..', avatar: ''},
        {id: 4, message: '..', avatar: ''},
        {id: 5, message: 'OK', avatar: avatarSource}
    ] as Array<IncomingMessageType>
};

/*Создаем редьюсер, отвечающий за страницу диалогов.*/
export const dialogsReducer = (state = initialState, action: ActionsType): InitialDialogsStateType => {
    switch (action.type) {
        /*Добавляем новое исходящее сообщение на странице диалогов.*/
        case 'demo-spa/dialogs-reducer/ADD-MESSAGE': {
            /*Создаем новое исходящее сообщение в виде объекта.*/
            const newMessage = {
                /*Указываем ID исходящего сообщения.*/
                id: 6,
                /*Указываем текст исходящего сообщения.*/
                message: action.newMessageText,
                /*Указываем аватар пользователя, который будет отрисовываться рядом с исходящим сообщением.*/
                avatar: avatarSource
            };

            /*Добавляем это новое исходящее сообщение в state.*/
            return {
                /*Делаем поверхностную копию state.*/
                ...state,
                /*Делаем глубокую копию state. Добавляем данные для нового исходящего сообщения в диалогах в state.*/
                messagesData: [...state.messagesData, newMessage]
            };
        }

        default: {
            return state;
        }
    }
};

type ActionsType = InferActionsTypes<typeof dialogsAC>;

export const dialogsAC = {
    /*AC для добавления нового исходящего сообщения. На входе получает "newMessageText", которое должно быть строкой.*/
    addMessage: (newMessageText: string) => ({
        type: 'demo-spa/dialogs-reducer/ADD-MESSAGE',
        /*Создаем свойство, которое содержит текст исходящего сообщения.*/
        newMessageText
    } as const)
};