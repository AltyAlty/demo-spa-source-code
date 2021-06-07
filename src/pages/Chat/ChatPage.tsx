import React, {useEffect, useState} from 'react';
/*
Подключаем сам "ReactJS", необходим везде, где мы что-то из него используем (например, JSX).
"WebPack" уже встроен в "ReactJS".
Классовый компонент позволяет реализовать локальный "state" (смотри "ProfileStatus") и методы
жизненного цикла ("componentDidMount" и т.д.), а функциональный компонент этого не может делать.
Такие возможности классового компонента были созданы благодаря тому, что "React" на основе класса
создает объект и всякий раз взаимодействует с этим объектом. А поскольку это объект, значит может
хранить такие вещи как "state" и методы. Функция же просто вызывается и возвращает "JSX", постоянное
общение с функциональным компонентом так просто не организовать. Объект живет в памяти, а функция отработала
и удалилась. Для решения этой проблемы в функциональных компонентах были созданы "Hooks" (хуки).
"Hook" - это функция, которая может делать side effects.
"React" когда вызывает функциональную компоненту, в которой есть хуки, он запоминает вызов этих хуков и
этой функции для того, чтобы потом соотносить side effects, созданные этими хуками. В отличие от классового компонента
"React" запоминает эту информацию где-то на своей стороне, а не внутри объекта.
Хуки нельзя писать в условиях и циклах.
Можно писать свои кастомные хуки.
Подключаем хук "useState", который возвращает массив с двуми элементами. Первый элемент - это значение,
которое хранится в "state". Второй элемент - это функция, которая будет изменять это значение в первом элементе. Изменяя
первый элемент мы заставляем "React" перерисовывать функциональный компонент.
Подключаем хук "useEffect", который принимает функцию первым параметром и выполняет ее, когда произойдет
отрисовка компонента, то есть после каждого вызова "render". Вторым параметром этот хук принимает зависимости -
зависимо от чьих изменений будет срабатывать хук, если передать туда пустой массив (так лучше не делать), то
этот хук сработает только один раз. Этот хук используется для side effects.
Подключаем хук "useState", который возвращает массив с двуми элементами. Первый элемент - это значение,
которое хранится в "state". Второй элемент - это функция, которая будет изменять это значение в первом элементе. Изменяя
первый элемент мы заставляем "React" перерисовывать функциональный компонент.
*/
import {NavLink} from 'react-router-dom';
/*
Библиотека "react-router-dom" необходима для создания роутинга и маршрутов в приложении.
Подключаем "NavLink", который является аналогом элемента "a" из HTML, хотя в браузере в итоге все равно будет
отображаться элемент "a".
Но "NavLink" не перезагружает все приложение в отличии от обычного использования элемента "a", то есть "NavLink"
отменяет действие по умолчанию элемента "a".
"NavLink" используется для перемещения по "Route" маршрутам.
"NavLink" вместо атрибута "href" использует атрибут "to".
"NavLink" добавляет атрибует "class" со значением "active" к элементу "a", когда осуществляется переход по ссылке.
Но класс "active" нам не подходит, посколько React добавляет уникальный префиксы и суффиксы к значению класса из-за
использования CSS-модуля.
Атрибут "activeClassName" позволяет указывать какой именно класс добавляется к элементу "a" вместо класса "active".
*/
import {useDispatch, useSelector} from 'react-redux';
/*
Библиотека "react-redux" является прослойкой между UI (react) и BLL (redux). Эта прослойка необходима потому, что UI
нежелательно общаться с BLL напрямую. Библиотека "react-redux" предоставляет продвинутые инструкции по созданию
контейнерных компонент и контекста.
"useSelector" - это hook, который принимает селектор и возвращает данные, которые возвращает этот селектор.
"useDispatch" - это hook, который принимает AC или TC и диспатчит их.
*/

import {
    sendChatMessage, /*Подключаем TC "sendChatMessage" из "chat-reducer.ts".*/
    startGettingChatMessages, /*Подключаем TC "startGettingChatMessages" из "chat-reducer.ts".*/
    stopGettingChatMessages /*Подключаем TC "stopGettingChatMessages" из "chat-reducer.ts".*/
} from '../../redux/chat-reducer';

import {getChatMessages} from '../../redux/chat-selectors'; /*Импортируем селектор, который возвращает информацию о
сообщениях из чата для вывода их в нашем приложении.*/

import {withAuthRedirect} from '../../hoc/WithAuthRedirect'; /*Подключаем созданый нами HOC "withAuthRedirect" для
добавления редиректа.*/

import {ChatMessageType} from '../../types/types'; /*Подключаем типы.*/

import styles from './ChatPage.module.css'; /*Подключаем стили из CSS-модуля.*/
import avatarSource from '../../assets/images/user.png'; /*Импортируем из ассетов проекта аватар пользователя.*/


/*Создаем тип для "props" компонента "ChatMessage". "Props" в этом компоненте должны обязательно содержать следующие
поля с указанными типами. Все это нужно для указания типа "props" в функциональном компоненте.*/
type ChatMessageComponentType = {
    chatMessage: ChatMessageType /*Данные о сообщении из чата должны быть типа "ChatMessageType", который мы создали
    выше.*/
};


/*
"ChatPage" это функциональный компонент, который создан в виде стрелочной функции.
При взаимодействии с функциональным компонентом React не хранит его постоянно в памяти.
React вызывает функциональный компонент, он делает свою работу (например, возвращает JSX) и компонент удаляется
из памяти.
Функциональный компонент можно создать еще и таким образом: function ChatPage(props) {тело}.
Компонент это функция, которая возвращает JSX.
JSX совмещает в себе JS и HTML.
В JSX для указания класса в стилях нужно использовать "className" вместо "class".
В JSX скобки {} позволяют использовать JS-код внутри HTML-кода.
Каждый компонент это новый тег для ReactJS, и эти теги используются для вызова этих компонентов.
Теги компонентов можно вкладывать друг в друга, тем самым образуя дерево компонентов.
Каждый компонент желательно помещать в отдельный файл.
Каждый компонент всегда вызывается с объектом, внутри которого какие-то параметры.
Если параметры не указаны, то им все равно передается пустой объект в качестве параметров.
Принято объект с параметрами именовать как "props".
Вызывая тег компонента и передавая ему атрибуты, мы отдаем ему параметры.
"ChatPage" является компонентом, который является финальным компонентом, который собирает компоненты, необходимые для
реализации чата в нашем приложении.
Этот компонент подключается в компоненте "App".
Внутри компонента "ChatPage" подключаются компонент "Chat", который содержит в себе компоненты, отвечающие за вывод
сообщения из чата и формы для добавления сообщения в чат.
*/
const ChatPage: React.FC = () => {

    /*
    Здесь после return в компоненте начинается HTML разметка.
    Нужно помнить, что в этой разметке должен быть только один корневой элемент.
    Поскольку то, что возвращает return указано с новой строки, поэтому все возвращаемое помещено в круглые скобки.
    */
    return (
        <div> {/*Этот элемент "div" и есть наш корневой элемент.*/}
            <Chat/> {/*Отрисовываем компонент "Chat".*/}
        </div>
    )
};


/*
"Chat" это функциональный компонент, который создан в виде стрелочной функции.
При взаимодействии с функциональным компонентом React не хранит его постоянно в памяти.
React вызывает функциональный компонент, он делает свою работу (например, возвращает JSX) и компонент удаляется
из памяти.
Функциональный компонент можно создать еще и таким образом: function Chat(props) {тело}.
Компонент это функция, которая возвращает JSX.
JSX совмещает в себе JS и HTML.
В JSX для указания класса в стилях нужно использовать "className" вместо "class".
В JSX скобки {} позволяют использовать JS-код внутри HTML-кода.
Каждый компонент это новый тег для ReactJS, и эти теги используются для вызова этих компонентов.
Теги компонентов можно вкладывать друг в друга, тем самым образуя дерево компонентов.
Каждый компонент желательно помещать в отдельный файл.
Каждый компонент всегда вызывается с объектом, внутри которого какие-то параметры.
Если параметры не указаны, то им все равно передается пустой объект в качестве параметров.
Принято объект с параметрами именовать как "props".
Вызывая тег компонента и передавая ему атрибуты, мы отдаем ему параметры.
"Chat" является компонентом, который содержит в себе компоненты, отвечающие за вывод сообщений из чата и формы для
добавления сообщения в чат.
Этот компонент подключается в компоненте "ChatPage".
Внутри компонента "Chat" подключаются компоненты:
- "ChatMessages", который отображает сообщения чата;
- "AddChatMessageForm", который отвечает за отображение формы для добавления сообщения в чат.
*/
const Chat: React.FC = () => {
    const dispatch = useDispatch(); /*Делаем это для более краткого использования хука "useDispatch".*/

    useEffect(() => { /*Используем хук "useEffect", чтобы при отрисовке компонента инициализировать
    WebSocket-канал и начать получать по нему сообщения для чата при помощи TC "startGettingChatMessages".*/
        dispatch(startGettingChatMessages());

        return () => { /*Когда мы выйдем из этого компонента, мы должны закрыть WebSocket-канал и остановить получение
        информации по сообщениям для чата, которые получались через этот WebSocket-канал, при помощи TC
        "stopGettingChatMessages". Это называется "cleanup" функцией.*/
            dispatch(stopGettingChatMessages());
        };
    },
        [] /*Второй параметр это пустой массив, так как мы хотим, чтобы все, что есть в первом параметре сработало
        только один раз после отрисовки компонента.*/
    );

    /*
    Здесь после return в компоненте начинается HTML разметка.
    Нужно помнить, что в этой разметке должен быть только один корневой элемент.
    Поскольку то, что возвращает return указано с новой строки, поэтому все возвращаемое помещено в круглые скобки.
    */
    return (
        <div> {/*Этот элемент "div" и есть наш корневой элемент.*/}
            <ChatMessages/> {/*Отрисовываем компонент "ChatMessages".*/}
            <AddChatMessageForm/> {/*Отрисовываем компонент "AddChatMessageForm".*/}
        </div>
    )
};


/*
"ChatMessages" это функциональный компонент, который создан в виде стрелочной функции.
При взаимодействии с функциональным компонентом React не хранит его постоянно в памяти.
React вызывает функциональный компонент, он делает свою работу (например, возвращает JSX) и компонент удаляется
из памяти.
Функциональный компонент можно создать еще и таким образом: function ChatMessages(props) {тело}.
Компонент это функция, которая возвращает JSX.
JSX совмещает в себе JS и HTML.
В JSX для указания класса в стилях нужно использовать "className" вместо "class".
В JSX скобки {} позволяют использовать JS-код внутри HTML-кода.
Каждый компонент это новый тег для ReactJS, и эти теги используются для вызова этих компонентов.
Теги компонентов можно вкладывать друг в друга, тем самым образуя дерево компонентов.
Каждый компонент желательно помещать в отдельный файл.
Каждый компонент всегда вызывается с объектом, внутри которого какие-то параметры.
Если параметры не указаны, то им все равно передается пустой объект в качестве параметров.
Принято объект с параметрами именовать как "props".
Вызывая тег компонента и передавая ему атрибуты, мы отдаем ему параметры.
"ChatMessages" является компонентом, который отображает сообщения чата.
Этот компонент подключается в компоненте "Chat".
Внутри компонента "ChatMessages" подключаются компонент "ChatMessage", который отвечает за типовое отображения одного
сообщения в чате.
*/
const ChatMessages: React.FC = () => {
    let chatMessages = useSelector(getChatMessages); /*При помощи хука "useSelector", передав в него селектор
    "getChatMessages", получаем информацию о сообщениях из чата для вывода их в нашем приложении.*/

    /*
    Здесь после return в компоненте начинается HTML разметка.
    Нужно помнить, что в этой разметке должен быть только один корневой элемент.
    Поскольку то, что возвращает return указано с новой строки, поэтому все возвращаемое помещено в круглые скобки.
    */
    return (
        <div className={styles.chatMessages}> {/*Этот элемент "div" и есть наш корневой элемент.*/}
            {chatMessages.map((m, index) => <ChatMessage key={index} chatMessage={m}/>)} {/*Мапим
            массив с сообщениями из чата, чтобы в итоге отрисовать каждое сообщение, используя компонент
            "ChatMessage". Внутрь этого компонента передаем информацию о сообщении через атрибут "chatMessage".*/}
        </div>
    )
};


/*
"ChatMessage" это функциональный компонент, который создан в виде стрелочной функции.
При взаимодействии с функциональным компонентом React не хранит его постоянно в памяти.
React вызывает функциональный компонент, он делает свою работу (например, возвращает JSX) и компонент удаляется
из памяти.
Функциональный компонент можно создать еще и таким образом: function ChatMessage(props) {тело}.
Компонент это функция, которая возвращает JSX.
JSX совмещает в себе JS и HTML.
В JSX для указания класса в стилях нужно использовать "className" вместо "class".
В JSX скобки {} позволяют использовать JS-код внутри HTML-кода.
Каждый компонент это новый тег для ReactJS, и эти теги используются для вызова этих компонентов.
Теги компонентов можно вкладывать друг в друга, тем самым образуя дерево компонентов.
Каждый компонент желательно помещать в отдельный файл.
Каждый компонент всегда вызывается с объектом, внутри которого какие-то параметры.
Если параметры не указаны, то им все равно передается пустой объект в качестве параметров.
Принято объект с параметрами именовать как "props".
Вызывая тег компонента и передавая ему атрибуты, мы отдаем ему параметры.
"ChatMessage" является компонентом, который отвечает за типовое отображение сообщения в чате.
Этот компонент подключается в компоненте "ChatMessages".
*/
const ChatMessage: React.FC<ChatMessageComponentType> = ({chatMessage}) => { /*Указываем какие именно
"props" мы получаем, чтобы не писать далее "props.chatMessage". Указали при помощи "React.FC<>", что "props" в этом
функциональном компоненте имеют тип "ChatMessageComponentType".*/

    /*
    Здесь после return в компоненте начинается HTML разметка.
    Нужно помнить, что в этой разметке должен быть только один корневой элемент.
    Поскольку то, что возвращает return указано с новой строки, поэтому все возвращаемое помещено в круглые скобки.
    */
    return (
        <div className={styles.chatMessage}> {/*Этот элемент "div" и есть наш корневой элемент.*/}
            <NavLink to={'/profile/' + chatMessage.userId}> {/*Создаем маршрут для пути перехода на страницу выбранного
            пользователя. Отрисуется компонент "Profile".*/}
                <img src={chatMessage.photo !== null ? chatMessage.photo : avatarSource} alt=''/> {/*Отображаем аватар
                пользователя, если его нет, то подгружаем дефолтный аватар из проекта приложения.*/}

                <span className={styles.chatMessageUserName}> {/*При помощи элемента "span" выводим имя пользователя и
                его "ID".*/}
                    {chatMessage.userName + ' '} (id: {chatMessage.userId}):
                </span>
            </NavLink>

            <span className={styles.chatMessageText}> {/*При помощи элемента "span" выводим сообщение пользователя в
            чат.*/}
                {chatMessage.message}
            </span>
        </div>
    )
};


/*
"AddChatMessageForm" это функциональный компонент, который создан в виде стрелочной функции.
При взаимодействии с функциональным компонентом React не хранит его постоянно в памяти.
React вызывает функциональный компонент, он делает свою работу (например, возвращает JSX) и компонент удаляется
из памяти.
Функциональный компонент можно создать еще и таким образом: function AddChatMessageForm(props) {тело}.
Компонент это функция, которая возвращает JSX.
JSX совмещает в себе JS и HTML.
В JSX для указания класса в стилях нужно использовать "className" вместо "class".
В JSX скобки {} позволяют использовать JS-код внутри HTML-кода.
Каждый компонент это новый тег для ReactJS, и эти теги используются для вызова этих компонентов.
Теги компонентов можно вкладывать друг в друга, тем самым образуя дерево компонентов.
Каждый компонент желательно помещать в отдельный файл.
Каждый компонент всегда вызывается с объектом, внутри которого какие-то параметры.
Если параметры не указаны, то им все равно передается пустой объект в качестве параметров.
Принято объект с параметрами именовать как "props".
Вызывая тег компонента и передавая ему атрибуты, мы отдаем ему параметры.
"AddChatMessageForm" является компонентом, который отвечает за отображение формы для добавления сообщения в чат.
Этот компонент подключается в компоненте "App".
*/
const AddChatMessageForm: React.FC = () => {
    const [chatMessage, setChatMessage] = useState(''); /*При помощи деструктуризирующего присваивания создали
    две переменные. Первая переменная будет хранить первый элемент из хука "useState", этот элемент будет означать
    введенный текст сообщения для чата (изначально пустой). Вторая переменная будет хранить функцию из хука "useState",
    которая будет изменять первый элемент (то есть указывать текст сообщения для чата).*/

    const dispatch = useDispatch(); /*Делаем это для более краткого использования хука "useDispatch".*/

    const addChatMessage = () => { /*Создали специальную функцию "addChatMessage", которая будет вызываться при нажатии
    на кнопку для отправки сообщения в чат, проверять есть ли введенный текст, и если есть, то будет отправлять этот
    текст в WebSocket-канал (если таковой имеется) при помощи TC "sendChatMessage", а после отправки занулять введеный
    текст сообщения в форме.*/
        if (!chatMessage) {
            return;
        };

        dispatch(sendChatMessage(chatMessage));

        setChatMessage('');
    };

    /*
    Здесь после return в компоненте начинается HTML разметка.
    Нужно помнить, что в этой разметке должен быть только один корневой элемент.
    Поскольку то, что возвращает return указано с новой строки, поэтому все возвращаемое помещено в круглые скобки.
    */
    return (
        <div> {/*Этот элемент "div" и есть наш корневой элемент.*/}
            <div>
                <textarea /*Отрисовываем элемент "textarea" для ввода текста сообщения для чата.*/
                    placeholder={'Enter your message'}
                    onChange={(e) => setChatMessage(e.currentTarget.value)} /*При изменении
                    этого поля будет вызываться функция "setChatMessage" из хука "useState" выше для получения
                    введенного текста в поле.*/
                    value={chatMessage}> {/*Используя атрибут "value", указываем, что в этом поле отображается текст,
                    который мы ввели, который прошел через FLUX-круговорот, благодаря хуку "useState" (то есть текст в
                    поле меняется в ответ на изменения переменной "chatMessage", которая меняется функцией
                    "setChatMessage", которая в свою очередь вызывается каждый раз, когда мы что-то меняем в поле для
                    ввода текста).*/}
                </textarea>
            </div>

            <div>
                <button onClick={addChatMessage}
                        disabled={false}> {/*Отрисовываем элемент "button". При нажатии на кнопку будет срабатывать
                        функция "addChatMessage", которую мы создали выше, с целью отправки введенного сообщения в
                        WebSocket-канал, и для дальнейшей очистки этого текста сообщения после отправки этого
                        сообщения.*/}
                    Send
                </button>
            </div>
        </div>
    )
};


const ChatPageWithAuthRedirect = withAuthRedirect(ChatPage); /*При помощи HOC "withAuthRedirect" добавляем логику по
редиректу в компонент "ChatPage".*/


export default ChatPageWithAuthRedirect; /*Экспортируем компонент "ChatPageWithAuthRedirect" по default и будем его
использовать в нашем проекте под именем "ChatPage", экспорт необходим для импорта.*/