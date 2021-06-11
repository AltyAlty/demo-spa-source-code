/*
Это файл, содержащий API для работы с WebSocket-каналом нашего сервера с целью реализации чата в нашем приложении.
Выносим этот API в отдельный файл для реализации уровня DAL.
*/


/*Создаем тип для объектов, которые будут приходить от сервера и содержать информацию о сообщении из чата.*/
export type ChatMessageAPIType = {
    message: string /*Сообщение пользователя, которое было отправлено в чат, должно быть строкой.*/
    photo: string /*Фото пользователя, который отправил сообщение в чат, должно быть строкой.*/
    userId: number /*"ID" пользователя, который отправил сообщение в чат, должно быть числом.*/
    userName: string /*Имя пользователя, который отправил сообщение в чат, должно быть строкой.*/
};

export type WSStatusType = 'pending' | 'ready' | 'error'; /*Создаем тип для статуса готовности WebSocket-канала для
отправки информации по нему.*/

export type ChatMessagesReceivingSubscriberType = (chatMessages: ChatMessageAPIType[]) => void; /*Создали тип для
callback-функции, которая передается в методы "subscribe" и "unsubscribe" в объекте "chatAPI" ниже. Функции с таким
типом обозначают подписчиков на получение новых сообщения чата. Эта callback-функция ничего не возвращает, но на входе
принимает массив элементов с созданным нами выше типом "ChatMessageAPIType", то есть массив с сообщениями из чата.*/

export type WSStatusChangingSubscriberType = (status: WSStatusType) => void; /*Создали тип для callback-функции, которая
передается в методы "subscribe" и "unsubscribe" в объекте "chatAPI" ниже. Функции с таким типом обозначают подписчиков
на изменение статуса готовности WebSocket-канала для отправки информации по нему. Эта callback-функция ничего не
возвращает, но на входе принимает указанный статус WebSocket-канала созданного нами выше типа "WSStatusType".*/

export type WSEventType = 'chat-messages-receiving' | 'ws-status-changing'; /*Создаем специальный тип для ключей в виде
строковых значений в объекте "subscribers", где каждый ключ обозначает вид подписчиков на разные события.
"chat-messages-receiving" обозначает подписчиков на получение новых сообщений в чате, а "ws-status-changing" обозначает
подписчиков на изменение статуса готовности WebSocket-канала для отправки информации по нему.*/


let ws: WebSocket | null = null; /*Объявляем переменную "ws", которая может быть типа "WebSocket" или "null" (то есть
отсутствовать), и которая в дальнейшем будет использоваться для хранения WebSocket-канала.*/

const notifySubscribersAboutWSStatus = (WSStatus: WSStatusType) => { /*Создаем вспомогательную функцию
"notifySubscribersAboutWSStatus", которая при вызове будет уведомлять подписчиков на изменение статуса готовности
WebSocket-канала для отправки информации по нему в объекте "subscribers" при изменении этого статуса. То есть здесь мы
пробегаемся по каждому подписчику на изменение статуса готовности WebSocket-канала для отправки информации по нему, то
есть по каждой callback-функции в массиве под ключем "ws-status-changing" объекта "subscribers", вызываем каждого такого
подписчика и передаем каждому из них информацию о статусе готовности WebSocket-канала для отправки информации по нему,
чтобы в дальнейшем они установили эту информацию в наш "store".*/
    subscribers['ws-status-changing'].forEach(s => s(WSStatus));
};

const closeEventHandler = () => { /*Объявляем функцию "closeEventHandler", которая будет вызываться при подписке на
событие "close" в WebSocket-канале и вызывать функцию "createWSChannel" каждые 3 секунды с целью пересоздания
WebSocket-канала.*/
    setTimeout(createWSChannel, 3000);
};

const messageEventHandler = (event: MessageEvent) => { /*Объявляем функцию "messageEventHandler", которая будет
вызываться при подписке на событие "message" в WebSocket-канале, на входе получать информацию из WebSocket-канала,
которая внутри себя содержит информацию о сообщениях из чата, парсить ее в формат "JSON" при помощи "JSON.parse()",
чтобы в дальнейшем можно было сохранить эту информацию в массиве "newChatMessages" под элементами в виде объектов, после
этого сохранять эту информацию о сообщениях из чата в массиве "newChatMessages". Далее мы пробегаемся по каждому
подписчику на получение новых сообщений в чате, то есть по каждой callback-функции в массиве под ключем
"chat-messages-receiving" объекта "subscribers", вызываем каждого такого подписчика и передаем каждому из них информацию
о сообщениях из чата, чтобы в дальнейшем они установили эту информацию в наш "store".*/
    const newChatMessages = JSON.parse(event.data);

    subscribers['chat-messages-receiving'].forEach(s => s(newChatMessages));
};

const openEventHandler = () => { /*Объявляем функцию "openEventHandler", которая будет вызываться при подписке на
событие "open" в WebSocket-канале, уведомлять подписчиков на изменение статуса готовности WebSocket-канала для отправки
информации по нему об изменении этого статуса.*/
    notifySubscribersAboutWSStatus('ready');
};

const errorEventHandler = () => { /*Объявляем функцию "errorEventHandler", которая будет вызываться при подписке на
событие "error" в WebSocket-канале, уведомлять подписчиков на изменение статуса готовности WebSocket-канала для отправки
информации по нему об изменении этого статуса.*/
    notifySubscribersAboutWSStatus('error');
};

const removeEvents = () => { /*Создаем функцию "removeEvents", которая при вызове отписывает от всех событий в
WebSocket-канале с целью очистки памяти.*/
    ws?.removeEventListener('close', closeEventHandler); /*Если имеется WebSocket-канал, то с целью очистки памяти мы
    отписываемся в нем от события "close". Для отписки должны указать ту же функцию, что и указывали при подписке на
    это событие (подписка ниже).*/

    ws?.removeEventListener('message', messageEventHandler); /*Если имеется WebSocket-канал, то с целью очистки памяти
    мы отписываемся в нем от события "message". Для отписки должны указать ту же функцию, что и указывали при подписке
    на это событие (подписка ниже).*/

    ws?.removeEventListener('open', openEventHandler); /*Если имеется WebSocket-канал, то с целью очистки памяти мы
    отписываемся в нем от события "open". Для отписки должны указать ту же функцию, что и указывали при подписке на это
    событие (подписка ниже).*/

    ws?.removeEventListener('error', errorEventHandler); /*Если имеется WebSocket-канал, то с целью очистки памяти мы
    отписываемся в нем от события "error". Для отписки должны указать ту же функцию, что и указывали при подписке на это
    событие (подписка ниже).*/
};

function createWSChannel() { /*Объявляем функцию "createWSChannel".*/
    removeEvents(); /*Если имеется WebSocket-канал, то с целью очистки памяти мы отписываемся в нем от событий "close",
    "message", "open" и "error".*/

    ws?.close(); /*Далее мы вызываем функцию "close()" у WebSocket-канала (если таковой имеется) с целью полного
    закрытия этого WebSocket-канала.*/

    ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx'); /*Далее таким образом
    создаем WebSocket-канал, указав адрес согласно API сервера. Согласно API сервера в ответ мы будем получать объекты,
    которые содержат следующие свойства:
    - "userId" - "ID" пользователя, который отправил сообщение в чат;
    - "userName" - имя пользователя, который отправил сообщение в чат;
    - "photo" - фото пользователя, который отправил сообщение в чат;
    - "message" - сообщение пользователя, которое было отправлено в чат.
    По стандартному HTTP-протоколу клиент делает запросы на сервер, а сервер отправляет ответы клиенту. Чтобы делать
    наоборот нужно применять дополнительные механизмы, например, такие как "SSE" или "WebSocket". "WebSocket" - это в
    каком-то смысле альтернатива протокола "HTTP" (прикладной уровень). "WSS" - это безопасная версия протокола
    "WebSocket", по аналогии с "HTTPS". По протоколу "WebSocket" можно передавать два типа данных: текстовой и бинарный.
    Также нужно помнить, что в браузерах в средствах разработчика нельзя замедлить скорость WebSocket-каналов.*/

    ws.addEventListener('close', closeEventHandler); /*Далее подписываемся на событие "close", при срабатывании
    которого будет вызываться функция "closeEventHandler".*/

    ws.addEventListener('message', messageEventHandler); /*Далее подписываемся на событие "message", при
    срабатывании которого будет вызываться функция "messageEventHandler".*/

    ws.addEventListener('open', openEventHandler); /*Далее подписываемся на событие "open", при срабатывании
    которого будет вызываться функция "openEventHandler".*/

    ws.addEventListener('error', errorEventHandler); /*Далее подписываемся на событие "error", при срабатывании
    которого будет вызываться функция "errorEventHandler".*/
};


const subscribers = { /*Создаем специальный объект "subscribers", который будет содержать ключи в виде строковых
значений. Каждый ключ будет хранить свой массив каких-то элементов в виде функций, то есть функций, которые как бы будут
подписываться на какие-то изменения и что-то получать при каждом таком изменении.

В случае ключа "chat-messages-receiving" там будут callback-функции типа "ChatMessagesReceivingSubscriberType", которые
будут подписываться на получение новых сообщений для чата из WebSocket-канала. Соотвественно после подписки при каждом
новом сообщении для чата эти callback-функции будут вызываться и получать эти новые сообщения, что в дальнейшем мы можем
использовать для сохранения этих сообщений на уровне BLL, то есть в нашем "store".

В случае ключа "ws-status-changing" там будут callback-функции типа "WSStatusChangingSubscriberType", которые будут
подписываться на изменение статуса готовности WebSocket-канала для отправки информации по нему. Соотвественно после
подписки при каждом изменении этого статуса WebSocket-канала эти callback-функции будут вызываться и получать этот новый
статус WebSocket-канала, что в дальнейшем мы можем использовать для сохранения этого статуса WebSocket-канала на уровне
BLL, то есть в нашем "store".

Таким образом реализуется работа между уровнями DAL (WebSocket-канал) и BLL (наш "store").*/
    'chat-messages-receiving': [] as ChatMessagesReceivingSubscriberType[],
    'ws-status-changing': [] as WSStatusChangingSubscriberType[]
};


export const chatAPI = { /*Создаем API для работы с WebSocket-каналом нашего сервера с целью реализации чата в нашем
приложении.*/
    startWSChannel() { /*Создаем метод "startWSChannel", который будет вызывать функцию "createWSChannel", объявленную
    выше. Этот метод будет использоваться для инициализации WebSocket-канала.*/
        createWSChannel();
    },

    stopWSChannel() { /*Создаем метод "stopWSChannel" для отключения WebSocket-канала (если таковой имеется). При вызове
    этого метода мы очищаем все наши массивы подписчиков, то есть массивы в объекте "subscribers". Также с целью
    очистки памяти мы отписываемся от событий "close", "message", "open" и "error" в WebSocket-канале. И в конце мы
    вызываем функцию "close()" у WebSocket-канала (если таковой имеется) с целью полного закрытия этого
    WebSocket-канала.*/
        subscribers['chat-messages-receiving'] = [];
        subscribers['ws-status-changing'] = [];
        removeEvents();
        ws?.close();
    },

    subscribe(WSEvent: WSEventType, callback: ChatMessagesReceivingSubscriberType | WSStatusChangingSubscriberType) {
    /*При получении сообщения для чата по WebSocket-каналу или при изменении статуса готовности WebSocket-канала для
    отправки информации по нему нам необходимо уведомлять об этом уровень BLL, то есть наш "store", чтобы мы могли
    сохранять эти новые сообщения в нашем "store" или этот новый статус WebSocket-канала. Для этого здесь мы создаем
    метод "subscribe", который при вызове будет получать callback-функции типа "ChatMessagesReceivingSubscriberType" или
    типа "WSStatusChangingSubscriberType". Эти callback-функции должны будут вызываться каждый раз, когда мы получаем
    новое сообщение для чата или при каждом изменении статуса готовности WebSocket-канала для отправки информации по
    нему соотвественно, и устанавливать эту информацию в наш "store". При получении таких callback-функций мы добавляем
    их в объект "subscribers", таким образом как бы подписывая их на получение новых сообщений для чата из
    WebSocket-канала или на изменение статуса готовности WebSocket-канала для отправки информации по нему
    соотвественно. Для указания типа подписчика первым параметром здесь мы передаем строковое значение одного из ключей
    объекта "subscribers".*/
        // @ts-ignore
        subscribers[WSEvent].push(callback); /*Пока игнорируем здесь "TypeScript", так как еще не разобрались с
        типизацией.*/

        return () => { /*Также метод "subscribe" возвращает функцию, которую если вызвать снаружи произойдет отписка
        всех подписчиков, то есть в объекте "subscribers" останутся только те элементы, которые не равны подписанной
        callback-функции. В итоге эта callback-функция перестанет реагировать на получения сообщений для чата или на
        изменение статуса готовности WebSocket-канала для отправки информации по нему соотвественно. Это одна из
        реализаций способа отписки. Но ниже мы создали для этого отдельный метод "unsubscribe".*/
             // @ts-ignore
             subscribers[WSEvent] = subscribers[WSEvent].filter(s => s !== callback); /*Пока игнорируем здесь
             "TypeScript", так как еще не разобрались с типизацией.*/
        };
    },

    unsubscribe(WSEvent: WSEventType, callback: ChatMessagesReceivingSubscriberType | WSStatusChangingSubscriberType) {
    /*Создаем метод "unsubscribe" для отписки подписчиков, то есть callback-функций в объекте "subscribers". При вызове
    этого метода в объекте "subscribers" остануться только те элементы, которые не равны подписанной callback-функции.
    В итоге эта callback-функция перестанет реагировать на получения сообщений для чата или на изменение статуса
    готовности WebSocket-канала для отправки информации по нему соотвественно. Для указания типа подписчика первым
    параметром здесь мы передаем строковое значение одного из ключей объекта "subscribers".*/
        // @ts-ignore
        subscribers[WSEvent] = subscribers[WSEvent].filter(s => s !== callback); /*Пока игнорируем здесь "TypeScript",
        так как еще не разобрались с типизацией.*/
    },

    sendChatMessage(chatMessage: string) { /*Создаем метод "sendChatMessage", при вызове который получает введенное нами
    сообщения для чата, вызывает функцию "send()" у WebSocket-канала (если таковой имеется) и передает в нее наше
    сообщение для отправки этого сообщения по WebSocket-каналу.*/
        ws?.send(chatMessage);
    }
};