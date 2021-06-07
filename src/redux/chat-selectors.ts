/*
Селектор - это функция, которая принимает "state", достает из него то, что ей нужно и возвращает это в BLL.
Селекторы осуществляют определенную выборку данных из "state".
Здесь содержаться селекторы для данных из "auth-reducer.ts".
*/

import {AppStateType} from './redux-store'; /*Подключаем типы.*/


export const getChatMessages = (state: AppStateType) => { /*Это созданный нами без библиотеки "reselect" селектор. Он
возвращает информацию о сообщениях из чата для вывода их в нашем приложении. На входе этот селектор принимает "state" с
типом "AppStateType", который мы создали и импортировали сюда.*/
    return state.chat.chatMessages
};