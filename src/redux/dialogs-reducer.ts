/*
Это файл "reducer", отвечающего за страницу диалогов. Каждый "reducer" состоит из:
- констант, содержащих значения для свойства "type" объекта "action"
- "initialState" - своей части "state"
- самой функции "reducer"
- "Action Creators" или "AC"
- "Thunk Creators" или "TC".
*/

import {InferActionsTypes} from './redux-store'; /*Импортируем типы.*/

import avatarSource from '../assets/images/user.png'; /*Импортируем из ассетов проекта аватар пользователя.*/


/*Создаем тип "state" из самого "state" при помощи "typeof".*/
export type InitialDialogsStateType = typeof initialState;

/*Создаем тип для объектов с данными для диалога. Объект, содержащий информацию с данными для диалога должен обязательно
содержать следующие поля с указанными типами.*/
type DialogType = {
    id: number /*"ID" диалога должно быть числом.*/
    name: string /*Имя, с кем ведется диалог, должно быть строкой.*/
    avatar: typeof avatarSource /*Аватар того, с кем ведется диалог, получаем на основе самого изображения аватара при
    помощи "typeof".*/
};

/*Создаем тип для объектов с данными для исходящих сообщений в диалогах. Объект, содержащий информацию с данными для
исходящих сообщений в диалогах должен обязательно содержать следующие поля с указанными типами.*/
type MessageType = {
    id: number /*"ID" исходящего сообщения должно быть числом.*/
    message: string /*Текст исходящего сообщения должно быть строкой.*/
    avatar: typeof avatarSource /*Аватар того, от кого отправлено исходящее сообщение, получаем на основе самого
    изображения аватара при помощи "typeof".*/
};

/*Создаем тип для объектов с данными для входящих сообщений в диалогах. Объект, содержащий информацию с данными для
входящих сообщений в диалогах должен обязательно содержать следующие поля с указанными типами.*/
type IncomingMessageType = {
    id: number /*"ID" входящего сообщения должно быть числом.*/
    message: string /*Текст входящего сообщения должно быть строкой.*/
    avatar: typeof avatarSource /*Аватар того, от кого отправлено входящее сообщение, получаем на основе самого
    изображения аватара при помощи "typeof".*/
};

/*Создаем сам "state".*/
let initialState = {
    dialogs: [ /*Создаем массив объектов, которые хранят информацию о диалогах на странице диалогов.*/
        {id: 1, name: 'Abba', avatar: avatarSource},
        {id: 2, name: 'Bret', avatar: avatarSource},
        {id: 3, name: 'Carry', avatar: avatarSource},
        {id: 4, name: 'Daemon', avatar: avatarSource},
        {id: 5, name: 'Eric', avatar: avatarSource},
        {id: 6, name: 'Frye', avatar: avatarSource}
    ] as Array<DialogType>, /*Указываем, что этот массив объектов имеет тип массива элементов с типом "DialogType".*/

    messagesData: [ /*Создаем массив объектов, которые хранят информацию о исходящих сообщениях в диалогах на странице
    диалогов.*/
        {id: 1, message: 'Hi', avatar: avatarSource},
        {id: 2, message: '..', avatar: ''},
        {id: 3, message: 'Fine', avatar: avatarSource},
        {id: 4, message: 'You?', avatar: avatarSource}
    ] as Array<MessageType>, /*Указываем, что этот массив объектов имеет тип массива элементов с типом "MessageType".*/

    incomingMessagesData: [ /*Создаем массив объектов, которые хранят информацию о входящих сообщениях в диалогах на
    странице диалогов.*/
        {id: 1, message: '..', avatar: ''},
        {id: 2, message: 'How are you?', avatar: avatarSource},
        {id: 3, message: '..', avatar: ''},
        {id: 4, message: '..', avatar: ''},
        {id: 5, message: 'OK', avatar: avatarSource}
    ] as Array<IncomingMessageType> /*Указываем, что этот массив объектов имеет тип массива элементов с
    типом "IncomingMessageType".*/
};


/*
Это "reducer" - чистая функция, которая принимает объект "action" и копию части "state".
Потом "reducer" изменяет (или не изменяет, если объект "action" не подошел) определенную часть "state" и возвращает ее.
После этого все возвращенные части "state" всех "reducers" собираются в новый "state".
*/
const dialogsReducer = (state = initialState, action: ActionsType): InitialDialogsStateType => { /*Указываем, что
тип "state" на выходе имеет тот же тип "InitialDialogsStateType", что и "state" на входе. На входе объекты "action"
имеют тип "ActionsType", созданный нами ниже.*/
    switch (action.type) {
        case 'react-samurai-01/dialogs-reducer/ADD-MESSAGE':
            let newMessage = { /*Создаем новое исходящее сообщение в виде объекта.*/
                id: 6, /*Указываем "ID" исходящего сообщения.*/
                message: action.newMessageText, /*Указываем текст исходящего сообщения.*/
                avatar: avatarSource /*Указываем аватар пользователя, которые будет отрисовываться рядом с исходящим
                сообщением.*/
            };
            return { /*Добавляем это новое исходящее сообщение в "state".*/
                ...state, /*Делаем поверхностную копию "state".*/
                messagesData: [...state.messagesData, newMessage] /*Делаем глубокую копию "state". Добавляем данные для
                нового исходящего сообщения в диалогах в "state".*/
            };

        default: /*Если объект "action" никуда не подошел, то по default возвращается тот же "state", чтобы не вызвать
        перерисовку.*/
            return state;
    }
};


/*Создаем типы для объектов "action".*/
type ActionsType = InferActionsTypes<typeof dialogsAC>; /*Здесь мы все созданные раннее типы для объектов "action"
объеденили в один тип. Мы его получили следующим образом: используем экспортированный сюда тип "InferActionsTypes" для
определения типов всех объектов "action" у упакованных в единый объект "dialogsAC" AC.*/


/*
Action Creators.
AC создает объект, который передается в reducer.
Этот объект как минимум должен иметь свойство "type", которое определяет, что необходимо выполнить в reducer.
*/
export const dialogsAC = { /*Создали специальный объект, содержащий все наши AC. Также удалили все типы, созданные
раннее на основе каждого AC. Также вверху удалили все константы со значениями для "type" и указывываем их сразу в AC,
так как "TypeScript" не даст нам допустить ошибку при указании этих "types" в "reducer". Согласно модульному паттерну
"Redux Ducks", чтобы избежать случаев одиноковых значений свойств "type" из-за чего один и тот же объект "action" может
сработать в нескольких "reducers", в значениях свойств "type" в объекте "action" указываются
"имя-проекта/имя-файла/имя-объекта-action". Также в конце везде добавили "as const", чтобы "reducer" адекватно
воспринимал объекты "action". Все AC мы поместили в единый объект с целью избавиться от большого количества отдельных
типов для каждого AC в обмен на один общий для них тип, который мы создали выше.*/
    addMessage: (newMessageText: string) => ({ /*AC для добавления нового исходящего сообщения. На входе получает
    "newMessageText", которое дожно быть строкой.*/
        type: 'react-samurai-01/dialogs-reducer/ADD-MESSAGE', /*Обязательно свойство "type" для AC.*/
        newMessageText /*Это равносильно "newMessageText: newMessageText". Создаем свойство, которое содержит текст
        исходящего сообщения.*/
    } as const)
};


export default dialogsReducer; /*Экспортируем "dialogsReducer" по default и будем его использовать в нашем проекте под
именем "dialogsReducer", экспорт необходим для импорта.*/