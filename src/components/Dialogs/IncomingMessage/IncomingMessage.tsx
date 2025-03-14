import React from 'react';
import styles from './../Dialogs.module.css';
/*Импортируем тип "AvatarSourceType".*/
import {AvatarSourceType} from '../../../types/types';

type PropsType = {
    /*ID входящего сообщения должно быть числом. Мы это здесь не используем, но указываем, так как передаем этот ID в
    компоненте "Dialogs" в компонент "IncomingMessage" при использовании функции "map()".*/
    id: number
    /*Текст исходящего сообщения должно быть строкой.*/
    message: string
    /*Аватар того, от кого отправлено входящее сообщение, должен быть типа "AvatarSourceType".*/
    avatar: AvatarSourceType
};

/*"IncomingMessage" это функциональный компонент, который создан в виде стрелочной функции. "IncomingMessage" является
компонентом, который описывает как должны выглядеть входящие сообщения.

Компонент "IncomingMessage" импортируется в файле "Dialogs.tsx".

При помощи деструктуризации props указываем какие именно props мы получаем:
1. "message" - текст исходящего сообщения.
2. "avatar" - аватар того, от кого отправлено исходящее сообщение.*/
export const IncomingMessage: React.FC<PropsType> = ({message, avatar}) => {
    return (
        /*Этот элемент представляет собой типовое отображение входящих сообщений, которое будет отрисовываться в
        компоненте "Dialogs" при помощи метода "map()".*/
        <div className={styles.incomingMessage}>
            {/*Исходящее сообщение содержит текст этого сообщения, которое берется из параметров props.*/}
            {message}
            {/*Также исходящее сообщение содержит аватар пользователя, ссылка на который берется из параметров props.*/}
            <img src={avatar} alt='.'/>
        </div>
    )
};