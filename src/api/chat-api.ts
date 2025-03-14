/*Создаем тип для объектов, которые будут приходить от сервера и содержать информацию о сообщении из чата.*/
export type ChatMessageAPIType = {
    /*Сообщение пользователя, которое было отправлено в чат, должно быть строкой.*/
    message: string
    /*Фото пользователя, который отправил сообщение в чат, должно быть строкой.*/
    photo: string
    /*ID пользователя, который отправил сообщение в чат, должно быть числом.*/
    userId: number
    /*Имя пользователя, который отправил сообщение в чат, должно быть строкой.*/
    userName: string
};

/*Создаем тип для статуса готовности WebSocket-канала для отправки информации по нему.*/
export type WSStatusType = 'pending' | 'ready' | 'error';

/*Создаем тип для callback-функции, которая передается в методы "subscribe()" и "unsubscribe()" в объекте с запросами
"chatAPI" ниже. Функции с таким типом обозначают подписчиков на получение новых сообщения чата. Эта callback-функция
ничего не возвращает, но на входе принимает массив элементов с созданным нами выше типом "ChatMessageAPIType", то есть
массив с сообщениями из чата.*/
export type ChatMessagesReceivingSubscriberType = (chatMessages: ChatMessageAPIType[]) => void;

/*Создаем тип для callback-функции, которая передается в методы "subscribe()" и "unsubscribe()" в объекте с запросами
"chatAPI" ниже. Функции с таким типом обозначают подписчиков на изменение статуса готовности WebSocket-канала для
отправки информации по нему. Эта callback-функция ничего не возвращает, но на входе принимает указанный статус
WebSocket-канала созданного нами выше типа "WSStatusType".*/
export type WSStatusChangingSubscriberType = (status: WSStatusType) => void;

/*Создаем специальный тип для ключей в виде строковых значений в объекте "subscribers", где каждый ключ обозначает вид
подписчиков на разные события. "chat-messages-receiving" обозначает подписчиков на получение новых сообщений в чате, а
"ws-status-changing" обозначает подписчиков на изменение статуса готовности WebSocket-канала для отправки информации по
нему.*/
export type WSEventType = 'chat-messages-receiving' | 'ws-status-changing';

/*Объявляем переменную "ws", которая может быть типа "WebSocket" или null, то есть отсутствовать, в дальнейшем
используемая для хранения WebSocket-канала.*/
let ws: WebSocket | null = null;

/*Создаем вспомогательную функцию "notifySubscribersAboutWSStatus()", которая при вызове будет уведомлять подписчиков на
изменение статуса готовности WebSocket-канала для отправки информации по нему в объекте "subscribers" при изменении
этого статуса.

То есть здесь мы пробегаемся по каждому подписчику на изменение статуса готовности WebSocket-канала для отправки
информации по нему, то есть по каждой callback-функции в массиве под ключем "ws-status-changing" объекта "subscribers",
вызываем каждого такого подписчика и передаем каждому из них информацию о статусе готовности WebSocket-канала для
отправки информации по нему, чтобы в дальнейшем они установили эту информацию в наш store.*/
const notifySubscribersAboutWSStatus = (WSStatus: WSStatusType) => {
    subscribers['ws-status-changing'].forEach(s => s(WSStatus));
};

/*Создаем функцию "closeEventHandler()", которая будет вызываться при подписке на событие "close" в WebSocket-канале и
вызывать функцию "createWSChannel" каждые 3 секунды с целью пересоздания WebSocket-канала.*/
const closeEventHandler = () => { setTimeout(createWSChannel, 3000)};

/*Создаем функцию "messageEventHandler()", которая будет вызываться при подписке на событие "message" в
WebSocket-канале, на входе получать информацию из WebSocket-канала, которая внутри себя содержит информацию о сообщениях
из чата, парсить ее в формат JSON при помощи метода "JSON.parse()", чтобы в дальнейшем можно было сохранить эту
информацию в массиве "newChatMessages" под элементами в виде объектов, после этого сохранять эту информацию о сообщениях
из чата в массиве "newChatMessages".

Далее мы пробегаемся по каждому подписчику на получение новых сообщений в чате, то есть по каждой callback-функции в
массиве под ключем "chat-messages-receiving" объекта "subscribers", вызываем каждого такого подписчика и передаем
каждому из них информацию о сообщениях из чата, чтобы в дальнейшем они установили эту информацию в наш store.*/
const messageEventHandler = (event: MessageEvent) => {
    const newChatMessages = JSON.parse(event.data);
    subscribers['chat-messages-receiving'].forEach(s => s(newChatMessages));
};

/*Создаем функцию "openEventHandler()", которая будет вызываться при подписке на событие "open" в WebSocket-канале,
уведомлять подписчиков на изменение статуса готовности WebSocket-канала для отправки информации по нему об изменении
этого статуса.*/
const openEventHandler = () => { notifySubscribersAboutWSStatus('ready')};
/*Создаем функцию "errorEventHandler()", которая будет вызываться при подписке на событие "error" в WebSocket-канале,
уведомлять подписчиков на изменение статуса готовности WebSocket-канала для отправки информации по нему об изменении
этого статуса.*/
const errorEventHandler = () => { notifySubscribersAboutWSStatus('error')};

/*Создаем функцию "removeEvents()", которая при вызове отписывает от всех событий в WebSocket-канале с целью очистки
памяти.*/
const removeEvents = () => {
    /*Если имеется WebSocket-канал, то с целью очистки памяти мы отписываемся в нем от события "close". Для отписки
    должны указать ту же функцию, что и указывали при подписке на это событие (подписка ниже).*/
    ws?.removeEventListener('close', closeEventHandler);
    /*Если имеется WebSocket-канал, то с целью очистки памяти мы отписываемся в нем от события "message". Для отписки
    должны указать ту же функцию, что и указывали при подписке на это событие (подписка ниже).*/
    ws?.removeEventListener('message', messageEventHandler);
    /*Если имеется WebSocket-канал, то с целью очистки памяти мы отписываемся в нем от события "open". Для отписки
    должны указать ту же функцию, что и указывали при подписке на это событие (подписка ниже).*/
    ws?.removeEventListener('open', openEventHandler);
    /*Если имеется WebSocket-канал, то с целью очистки памяти мы отписываемся в нем от события "error". Для отписки
    должны указать ту же функцию, что и указывали при подписке на это событие (подписка ниже).*/
    ws?.removeEventListener('error', errorEventHandler);
};

/*Создаем функцию "createWSChannel()".*/
function createWSChannel() {
    /*Если имеется WebSocket-канал, то с целью очистки памяти мы отписываемся в нем от событий "close", "message",
    "open" и "error".*/
    removeEvents();
    /*Далее мы вызываем функцию "close()" у WebSocket-канала (если таковой имеется) с целью полного закрытия этого
    WebSocket-канала.*/
    ws?.close();
    /*Далее следующим образом создаем WebSocket-канал, указав адрес согласно API сервера. Согласно API сервера в ответ
    мы будем получать объекты, содержащие следующие свойства:
    1. "userId" - ID пользователя, который отправил сообщение в чат.
    2. "userName" - имя пользователя, который отправил сообщение в чат.
    3. "photo" - фото пользователя, который отправил сообщение в чат.
    4. "message" - сообщение пользователя, которое было отправлено в чат.

    По стандартному HTTP-протоколу клиент делает запросы на сервер, а сервер отправляет ответы клиенту. Чтобы делать
    наоборот, нужно применять дополнительные механизмы, например, SSE или WebSocket. WebSocket - это в каком-то смысле
    альтернатива протокола HTTP (прикладной уровень). WSS - это безопасная версия протокола WebSocket, по аналогии с
    HTTPS. По протоколу WebSocket можно передавать два типа данных: текстовой и бинарный. Также нужно помнить, что в
    браузерах в средствах разработчика нельзя замедлить скорость WebSocket-каналов.*/
    ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');
    /*Далее подписываемся на событие "close", при срабатывании которого будет вызываться функция
    "closeEventHandler()".*/
    ws.addEventListener('close', closeEventHandler);
    /*Далее подписываемся на событие "message", при срабатывании которого будет вызываться функция
    "messageEventHandler()".*/
    ws.addEventListener('message', messageEventHandler);
    /*Далее подписываемся на событие "open", при срабатывании которого будет вызываться функция "openEventHandler()".*/
    ws.addEventListener('open', openEventHandler);
    /*Далее подписываемся на событие "error", при срабатывании которого будет вызываться функция
    "errorEventHandler()".*/
    ws.addEventListener('error', errorEventHandler);
};

/*Создаем специальный объект "subscribers", который будет содержать ключи в виде строковых значений. Каждый ключ будет
хранить свой массив каких-то элементов в виде функций, то есть функций, которые как бы будут подписываться на какие-то
изменения и что-то получать при каждом таком изменении.

В случае ключа "chat-messages-receiving" там будут callback-функции типа "ChatMessagesReceivingSubscriberType", которые
будут подписываться на получение новых сообщений для чата из WebSocket-канала. Соответственно, после подписки при каждом
новом сообщении для чата эти callback-функции будут вызываться и получать эти новые сообщения, что в дальнейшем мы можем
использовать для сохранения этих сообщений на уровне BLL, то есть в нашем store.

В случае ключа "ws-status-changing" там будут callback-функции типа "WSStatusChangingSubscriberType", которые будут
подписываться на изменение статуса готовности WebSocket-канала для отправки информации по нему. Соответственно, после
подписки при каждом изменении этого статуса WebSocket-канала эти callback-функции будут вызываться и получать этот новый
статус WebSocket-канала, что в дальнейшем мы можем использовать для сохранения этого статуса WebSocket-канала на уровне
BLL, то есть в нашем store.

Таким образом реализуется работа между уровнями DAL (WebSocket-канал) и BLL (наш store).*/
const subscribers = {
    'chat-messages-receiving': [] as ChatMessagesReceivingSubscriberType[],
    'ws-status-changing': [] as WSStatusChangingSubscriberType[]
};

/*Создаем API для работы с WebSocket-каналом нашего сервера с целью реализации чата в нашем приложении.*/
export const chatAPI = {
    /*Создаем метод "startWSChannel()", который будет вызывать функцию "createWSChannel()", объявленную выше. Этот метод
    будет использоваться для инициализации WebSocket-канала.*/
    startWSChannel() { createWSChannel() },

    /*Создаем метод "stopWSChannel()" для отключения WebSocket-канала (если таковой имеется). При вызове этого метода мы
    очищаем все наши массивы подписчиков, то есть массивы в объекте "subscribers". Также с целью очистки памяти мы
    отписываемся от событий "close", "message", "open" и "error" в WebSocket-канале. И в конце мы вызываем функцию
    "close()" у WebSocket-канала (если таковой имеется) с целью полного закрытия этого WebSocket-канала.*/
    stopWSChannel() {
        subscribers['chat-messages-receiving'] = [];
        subscribers['ws-status-changing'] = [];
        removeEvents();
        ws?.close();
    },

    /*При получении сообщения для чата по WebSocket-каналу или при изменении статуса готовности WebSocket-канала для
    отправки информации по нему нам необходимо уведомлять об этом уровень BLL, то есть наш store, чтобы мы могли
    сохранять эти новые сообщения в нашем store или этот новый статус WebSocket-канала.

    Для этого здесь мы создаем метод "subscribe()", который при вызове будет получать callback-функции типа
    "ChatMessagesReceivingSubscriberType" или типа "WSStatusChangingSubscriberType". Эти callback-функции должны будут
    вызываться каждый раз, когда мы получаем новое сообщение для чата или при каждом изменении статуса готовности
    WebSocket-канала для отправки информации по нему соответственно, и устанавливать эту информацию в наш store.

    При получении таких callback-функций мы добавляем их в объект "subscribers", таким образом, как бы подписывая их на
    получение новых сообщений для чата из WebSocket-канала или на изменение статуса готовности WebSocket-канала для
    отправки информации по нему соответственно.

    Для указания типа подписчика первым параметром здесь мы передаем строковое значение одного из ключей объекта
    "subscribers".*/
    subscribe(WSEvent: WSEventType, callback: ChatMessagesReceivingSubscriberType | WSStatusChangingSubscriberType) {
        /*Пока игнорируем здесь Typescript, так как еще не разобрались с типизацией в этом месте.*/
        // @ts-ignore
        subscribers[WSEvent].push(callback);
        /*Также метод "subscribe()" возвращает функцию, при вызове снаружи которой произойдет отписка всех подписчиков.
        То есть в объекте "subscribers" останутся только те элементы, которые не равны подписанной callback-функции. В
        итоге эта callback-функция перестанет реагировать на получения сообщений для чата или на изменение статуса
        готовности WebSocket-канала для отправки информации по нему соответственно. Это одна из реализаций способа
        отписки. Но ниже мы создали для этого отдельный метод "unsubscribe()".

        Пока игнорируем здесь Typescript, так как еще не разобрались с типизацией в этом месте.*/
        // @ts-ignore
        return () => { subscribers[WSEvent] = subscribers[WSEvent].filter(s => s !== callback) };
    },

    /*Создаем метод "unsubscribe()" для отписки подписчиков, то есть callback-функций в объекте "subscribers". При
    вызове этого метода в объекте "subscribers" останутся только те элементы, которые не равны подписанной
    callback-функции. В итоге эта callback-функция перестанет реагировать на получения сообщений для чата или на
    изменение статуса готовности WebSocket-канала для отправки информации по нему соответственно.

    Для указания типа подписчика первым параметром здесь мы передаем строковое значение одного из ключей объекта
    "subscribers".*/
    unsubscribe(WSEvent: WSEventType, callback: ChatMessagesReceivingSubscriberType | WSStatusChangingSubscriberType) {
        /*Пока игнорируем здесь Typescript, так как еще не разобрались с типизацией в этом месте.*/
        // @ts-ignore
        subscribers[WSEvent] = subscribers[WSEvent].filter(s => s !== callback);
    },

    /*Создаем метод "sendChatMessage()", при вызове который получает введенное нами сообщения для чата, вызывает функцию
    "send()" у WebSocket-канала (если таковой имеется) и передает в нее наше сообщение для отправки этого сообщения по
    WebSocket-каналу.*/
    sendChatMessage(chatMessage: string) { ws?.send(chatMessage) }
};