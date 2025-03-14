/*Здесь содержатся селекторы для данных из файла "chat-reducer.ts".*/

/*Импортируем тип "AppStateType".*/
import {AppStateType} from './redux-store';

/*Это созданный нами без библиотеки Reselect селектор. Он возвращает информацию о сообщениях из чата для вывода их в
нашем приложении.*/
export const getChatMessages = (state: AppStateType) => { return state.chat.chatMessages};
/*Это созданный нами без библиотеки "reselect" селектор. Он возвращает статус готовности WebSocket-канала для отправки
информации по нему.*/
export const getWSStatus = (state: AppStateType) => { return state.chat.WSStatus};