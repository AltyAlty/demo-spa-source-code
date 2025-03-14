import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
/*Импортируем TC "startGettingChatMessages()" и "stopGettingChatMessages()".*/
import {startGettingChatMessages, stopGettingChatMessages} from '../../../redux/chat-reducer';
/*Импортируем селектор "getWSStatus()".*/
import {getWSStatus} from '../../../redux/chat-selectors';
import styles from '../ChatPage.module.css';
/*Импортируем компонент "ChatMessages".*/
import {ChatMessages} from './ChatMessages/ChatMessages';
/*Импортируем компонент "AddChatMessageForm".*/
import {AddChatMessageForm} from './AddChatMessageForm/AddChatMessageForm';

/*"Chat" это функциональный компонент, который создан в виде стрелочной функции. "Chat" является компонентом, который
содержит в себе компоненты, отвечающие за вывод сообщений из чата и формы для добавления сообщения в чат.

Внутри компонента "Chat" используются следующие компоненты:
1. "ChatMessages" - компонент, который отображает сообщения чата. Импортирован.
2. "AddChatMessageForm" - компонент, который отвечает за отображение формы для добавления сообщения в чат. Импортирован.

Компонент "Chat" импортируется в файле "ChatPage.tsx".*/
export const Chat: React.FC = () => {
    /*При помощи хука "useSelector()", передав в него селектор "getWSStatus()", получаем статус готовности
    WebSocket-канала для отправки информации по нему.*/
    const WSStatus = useSelector(getWSStatus);
    const dispatch = useDispatch();

    /*Используем хук "useEffect()", чтобы при отрисовке компонента инициализировать WebSocket-канал и начать получать по
    нему сообщения для чата при помощи TC "startGettingChatMessages()".*/
    useEffect(() => {
            dispatch(startGettingChatMessages());
            /*Когда мы выходим из этого компонента, мы должны закрывать WebSocket-канал и останавливать получение
            информации по сообщениям для чата, которые приходят через этот WebSocket-канал, при помощи TC
            "stopGettingChatMessages()". Это называется cleanup-функцией.*/
            return () => { dispatch(stopGettingChatMessages()) };
        },
        /*Второй параметр это пустой массив, так как мы хотим, чтобы все, что есть в первом параметре срабатывало только
        один раз после отрисовки компонента.*/
        []
    );

    return (
        <div>
            {/*Если статус готовности WebSocket-канала для отправки информации по нему равен "error", то отрисуются
            элемент "div" с сообщением об ошибке вместе с компонентами "ChatMessages" и "AddChatMessageForm", иначе
            отрисуются только эти два компонента.*/}
            {WSStatus === 'error' && <div className={styles.wsError}>
                Some error occurred. Please refresh the page or check your Internet-connection
            </div>}

            <>
                <ChatMessages/>
                <AddChatMessageForm/>
            </>
        </div>
    )
};