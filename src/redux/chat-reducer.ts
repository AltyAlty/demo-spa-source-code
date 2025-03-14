/*Библиотека UUID помогает организовать идентификацию при помощи создания универсального уникального идентификатора
(UUID). Импортируем функцию "v1()" для создания UUID варианта 1.*/
import {v1} from 'uuid';
/*Импортируем API для работы с WebSocket-каналом нашего сервера с целью реализации чата в нашем приложении. Также
импортируем типы "ChatMessageAPIType", "WSStatusType", "ChatMessagesReceivingSubscriberType" и
"WSStatusChangingSubscriberType".*/
import {
    chatAPI, ChatMessageAPIType, WSStatusType, ChatMessagesReceivingSubscriberType, WSStatusChangingSubscriberType
} from '../api/chat-api'
/*Импортируем типы "InferActionsTypes" и "BaseThunkType".*/
import {InferActionsTypes, BaseThunkType} from './redux-store';
/*Импортируем функцию "Dispatch()" из библиотеки Redux, чтобы создать тип для dispatch-функции, которая передается в
thunks и TC.*/
import {Dispatch} from 'redux';

/*Создаем тип для объектов, которые будут приходить от сервера и содержать информацию о сообщении из чата, а также в
редьюсере получать новое строковое свойство "id" при помощи функции "v1()" из библиотеки UUID.*/
type ChatMessageType = ChatMessageAPIType & { id: string };

type InitialChatStateType = typeof initialState;

let initialState = {
    /*Свойство для хранения сообщений из чата для вывода их в нашем приложении. Должно быть массивом элементов с типом
    "ChatMessageType".*/
    chatMessages: [] as ChatMessageType[],
    /*Это статус готовности WebSocket-канала для отправки информации по нему (изначально "pending"). Должен быть типа
    "WSStatusType".*/
    WSStatus: 'pending' as WSStatusType
};

/*Создаем редьюсер, отвечающий за чат в нашем приложении.*/
export const chatReducer = (state = initialState, action: ActionsType): InitialChatStateType => {
    switch (action.type) {
        /*Устанавливаем информацию о сообщениях из чата.*/
        case 'demo-spa/chat-reducer/SET-CHAT-MESSAGES': {
            return {
                /*Делаем поверхностную копию state.*/
                ...state,
                /*Делаем глубокую копию state. Дописываем информацию о новых сообщениях из чата в state (то есть не
                затираем старую информацию).

                Сначала мапим массив сообщений для чата, которые хотим добавить в state, и добавляем к каждому элементу
                массива (а это у нас объекты) свойство "id", формируемое при помощи функции "v1()" из библиотеки UUID
                для создания универсальных уникальных идентификаторов. В итоге каждое сообщение для чата будет иметь
                свой уникальный индекс под свойством "id".

                Нам это необходимо, чтобы избежать лишних перерисовок, так как без уникальных идентификаторов при
                удалении одного сообщения из чата менялись бы индексы у всех остальных сообщений в чате (уменьшались бы
                на 1), что вызывало бы многократные перерисовки.

                Далее при помощи метода "filter()" (первым параметром приходят элементы массива, вторым параметром
                приходят их индексы, а третьим параметром приходит сам массив) оставляем только те сообщения, индекс
                которых больше или равен значению, получаемого из разности длины массива (то есть сколько всего
                сообщений для чата у нас есть в state) и числа 100. Чем большее число мы вычтем, тем меньшее число мы
                получим, значит тем большее количество индексов будет, соответственно, тем больше выведется сообщений в
                чате. Но сервер хранит не больше 100 сообщений, поэтому больше 100 сообщений мы вывести не сможем. Все
                это мы делаем для регулировки максимального количества выведенных сообщений в чате.*/
                chatMessages: [
                    ...state.chatMessages,
                    ...action.chatMessages.map(m => {
                        return {...m, id: v1()}
                    })
                ]
                    .filter((m, index, array) => index >= array.length - 100)
            };
        }

        /*Обнуляем информацию о сообщениях из чата.*/
        case 'demo-spa/chat-reducer/CLEAR-CHAT-MESSAGES': {
            return {
                /*Делаем поверхностную копию state.*/
                ...state,
                /*Обнуляем информацию о сообщениях из чата в state.*/
                chatMessages: []
            };
        }

        /*Указываем статус готовности WebSocket-канала для отправки информации по нему.*/
        case 'demo-spa/chat-reducer/SET-WS-STATUS': {
            return {
                /*Делаем поверхностную копию state.*/
                ...state,
                /*Указываем статус готовности WebSocket-канала для отправки информации по нему в state.*/
                WSStatus: action.WSStatus
            };
        }

        default: {
            return state;
        }
    }
};

type ActionsType = InferActionsTypes<typeof chatAC>;

export const chatAC = {
    /*AC для установки сообщений для чата в state. На входе получает информацию о сообщениях для чата как массив
    элементов с типом "ChatMessageAPIType".*/
    setChatMessages: (chatMessages: ChatMessageAPIType[]) => ({
        type: 'demo-spa/chat-reducer/SET-CHAT-MESSAGES',
        /*Это равносильно "chatMessages: chatMessages". Создаем свойство, которое содержит информацию о сообщениях для
        чата.*/
        chatMessages
    } as const),

    /*AC для обнуления сообщений для чата в state.*/
    clearChatMessages: () => ({
        type: 'demo-spa/chat-reducer/CLEAR-CHAT-MESSAGES'
    } as const),

    /*AC для указания статуса готовности WebSocket-канала для отправки информации по нему в state. На входе получает
    такой статус типа "WSStatusType".*/
    setWSStatus: (WSStatus: WSStatusType) => ({
        type: 'demo-spa/chat-reducer/SET-WS-STATUS',
        /*Создаем свойство, которое содержит статус готовности WebSocket-канала для отправки информации по нему.*/
        WSStatus
    } as const)
};

type ThunkType = BaseThunkType<ActionsType>;

/*Создаем вспомогательную функцию "_newChatMessagesHandler()", которая будет хранить в себе функцию перехватчика
сообщений для чата по WebSocket-каналу. Такая функция должна быть типа "ChatMessagesReceivingSubscriberType", или null,
то есть отсутствовать.*/
let _newChatMessagesHandler: ChatMessagesReceivingSubscriberType | null = null;

/*Создаем вспомогательную функцию (высшего порядка) "newChatMessagesHandlerCreator()", которая будет проверять есть ли у
нас уже перехватчик сообщений для чата, и если нет, то будет присваивать и возвращать такой перехватчик, который будет
получать сообщения для чата и устанавливать их в state при помощи AC "setChatMessages()". Здесь нам нужна указанная
проверка, так как мы вызываем эту функцию в нескольких местах (при подписке и отписке), поэтому получаем одну и туже
функцию несколько раз, соответственно, если уже есть перехватчик сообщений для чата, то для исключения упомянутых
повторов в таком случае просто возвращаем уже существующий перехватчик сообщений для чата (это похоже на мемоизацию).*/
const newChatMessagesHandlerCreator = (dispatch: Dispatch) => {
    if (_newChatMessagesHandler === null) {
        _newChatMessagesHandler = (chatMessages) => { dispatch(chatAC.setChatMessages(chatMessages)) };
    }

    return _newChatMessagesHandler;
};

/*Создаем вспомогательную функцию "_WSStatusChangingHandler()", которая будет хранить в себе функцию перехватчика
изменений статуса готовности WebSocket-канала для отправки информации по нему. Такая функция должна быть типа
"WSStatusChangingSubscriberType", или null, то есть отсутствовать.*/
let _WSStatusChangingHandler: WSStatusChangingSubscriberType | null = null;

/*Создаем вспомогательную функцию (высшего порядка) "WSStatusChangingHandlerCreator()", которая будет проверять есть ли
у нас уже перехватчик изменений статуса готовности WebSocket-канала для отправки информации по нему, и если нет, то
будет присваивать и возвращать такой перехватчик, который будет получать указанный статус и устанавливать его в state
при помощи AC "setWSStatus()". Здесь нам нужна указанная проверка, так как мы вызываем эту функцию в нескольких местах
(при подписке и отписке), поэтому получаем одну и туже функцию несколько раз, соответственно, если уже есть перехватчик
сообщений для чата, то для исключения упомянутых повторов в таком случае просто возвращаем уже существующий перехватчик
сообщений для чата (это похоже на мемоизацию).*/
const WSStatusChangingHandlerCreator = (dispatch: Dispatch) => {
    if (_WSStatusChangingHandler === null) {
        _WSStatusChangingHandler = (WSStatus) => { dispatch(chatAC.setWSStatus(WSStatus)) };
    }

    return _WSStatusChangingHandler;
};

/*Это TC для инициализации WebSocket-канала, установки информации по сообщениям для чата в state, которые будут
получаться через этот WebSocket-канал, и установки статуса готовности WebSocket-канала для отправки информации по нему в
state.*/
export const startGettingChatMessages = (): ThunkType => async (dispatch) => {
    /*Инициализируем WebSocket-канал для получения сообщений для чата.*/
    chatAPI.startWSChannel();
    /*Подписываем функцию "newChatMessagesHandlerCreator()" на получение новых сообщений для чата, передав в нее
    dispatch-функцию, необходимую ей для ее внутренней работы.*/
    chatAPI.subscribe('chat-messages-receiving', newChatMessagesHandlerCreator(dispatch));
    /*Подписываем функцию "WSStatusChangingHandlerCreator()" на изменение статуса готовности WebSocket-канала для
    отправки информации по нему, передав в нее dispatch-функцию, необходимую ей для ее внутренней работы.*/
    chatAPI.subscribe('ws-status-changing', WSStatusChangingHandlerCreator(dispatch));
};

/*Это еще одна реализации отписки, продолжение ниже в TC "stopGettingChatMessages()".*/
// const unsubscribe = chatAPI.subscribe(newChatMessagesHandlerCreator);

/*Это TC для закрытия WebSocket-канала, остановки получения информации по сообщениям для чата, которые получались через
этот WebSocket-канал, остановки получения статуса готовности WebSocket-канала для отправки информации по нему.*/
export const stopGettingChatMessages = (): ThunkType => async (dispatch) => {
    /*Отписываем функцию "newChatMessagesHandlerCreator()" от получения новых сообщений для чата, передав в нее
    dispatch-функцию, необходимую ей для ее внутренней работы.*/
    chatAPI.unsubscribe('chat-messages-receiving', newChatMessagesHandlerCreator(dispatch));
    /*Отписываем функцию "WSStatusChangingHandlerCreator()" от получения статуса готовности WebSocket-канала для
    отправки информации по нему, передав в нее dispatch-функцию, необходимую ей для ее внутренней работы.*/
    chatAPI.unsubscribe('ws-status-changing', WSStatusChangingHandlerCreator(dispatch));
    /*Закрываем WebSocket-канал, чтобы прекратить получение сообщений для чата.*/
    chatAPI.stopWSChannel();
    /*Обнуляем информацию о сообщениях из чата в state при помощи AC "clearChatMessages()", чтобы не получить несколько
    копий сообщений в чате на случай если мы потом переподключаемся к WebSocket-каналу.*/
    dispatch(chatAC.clearChatMessages());

    /*Продолжение еще одной реализации отписки выше.*/
    // unsubscribe();
};

/*Это TC для отправки сообщений в чат по WebSocket-каналу. На входе получает сообщение для чата, которое должно быть
строкой.*/
export const sendChatMessage = (chatMessage: string): ThunkType => async (dispatch) => {
    /*Отправляем наше сообщение в чат.*/
    chatAPI.sendChatMessage(chatMessage);
};