import React from 'react';
import {NavLink} from 'react-router-dom';
import styles from '../../../ChatPage.module.css';
/*Импортируем из ассетов проекта аватар пользователя.*/
import avatarSource from '../../../../../assets/images/user.png';
/*Импортируем тип "ChatMessageAPIType".*/
import {ChatMessageAPIType} from '../../../../../api/chat-api';

/*Создаем тип для props компонента "ChatMessage".*/
type ChatMessageComponentType = {
    /*Данные о сообщении из чата должны быть типа "ChatMessageAPIType".*/
    chatMessage: ChatMessageAPIType
};

/*"ChatMessage" это функциональный компонент, который создан в виде стрелочной функции. "ChatMessage" является
компонентом, который отвечает за типовое отображение сообщения в чате.

Компонент "ChatMessage" импортируется в файле "ChatMessages.tsx".*/
export const ChatMessage: React.FC<ChatMessageComponentType> = React.memo(({chatMessage}) => {
    return (
        <div className={styles.chatMessage}>
            {/*Создаем маршрут для пути перехода на страницу выбранного пользователя. Отрисуется компонент "Profile".*/}
            <NavLink to={'/profile/' + chatMessage.userId}>
                {/*Отображаем аватар пользователя, если его нет, то подгружаем дефолтный аватар из проекта
                приложения.*/}
                <img src={chatMessage.photo !== null ? chatMessage.photo : avatarSource} alt=''/>

                {/*При помощи элемента "span" выводим имя и ID пользователя.*/}
                <span className={styles.chatMessageUserName}>
                    {chatMessage.userName + ' '} (id: {chatMessage.userId}):
                </span>
            </NavLink>

            {/*При помощи элемента "span" выводим сообщение пользователя в чат.*/}
            <span className={styles.chatMessageText}>
                {chatMessage.message}
            </span>
        </div>
    )
});