import React from 'react';
import {NavLink} from 'react-router-dom';
import styles from './../Dialogs.module.css';
/*Импортируем тип "AvatarSourceType".*/
import {AvatarSourceType} from '../../../types/types';

type PropsType = {
    /*ID диалога должно быть числом.*/
    id: number
    /*Имя, с кем ведется диалог, должно быть строкой.*/
    name: string
    /*Аватар того, с кем ведется диалог, должен быть типа "AvatarSourceType".*/
    avatar: AvatarSourceType
};

/*"DialogItem" это функциональный компонент, который создан в виде стрелочной функции. "DialogItem" является
компонентом, который описывает как должны выглядеть диалоги.

Компонент "DialogItem" импортируется в файле "Dialogs.tsx".

При помощи деструктуризации props указываем какие именно props мы получаем:
1. "id" - ID диалога.
2. "name" - имя, с кем ведется диалог.
3. "avatar" - аватар того, с кем ведется диалог.*/
export const DialogItem: React.FC<PropsType> = ({id, name, avatar}) => {
    /*Путь для компонента "NavLink" формируется на основе ID пользователя, который берется из параметров props.*/
    let path = '/dialogs/' + id;

    return (
        /*Этот элемент представляет собой типовой пункт диалогов, который будет отрисовываться в компоненте "Dialogs"
        при помощи метода "map()".*/
        <div className={styles.dialog}>
            {/*Пункт диалога содержит аватар пользователя, ссылка на который берется из параметров props.*/}
            <img src={avatar} alt=''/>
            {/*А также пункт диалога содержит компонент "NavLink" с именем пользователя, которое берется из параметров
            props.*/}
            <NavLink to={path} activeClassName={styles.active}>{name}</NavLink>
        </div>
    )
};