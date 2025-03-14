import React from 'react';
import {NavLink} from 'react-router-dom';
import styles from './Sidebar.module.css';
/*Импортируем тип "AvatarSourceType".*/
import {AvatarSourceType} from '../../../types/types';

type PropsType = {
    /*ID друга в онлайне должно быть числом.*/
    id: number
    /*Имя друга в онлайне должно быть строкой.*/
    name: string
    /*Аватар друга в онлайне должен быть типа "AvatarSourceType".*/
    avatar: AvatarSourceType
};

/*"Sidebar" это функциональный компонент, который создан в виде стрелочной функции. "SideBar" является компонентом,
описывающим типовое отображение друзей в онлайне в навигационном меню сайта.

Компонент "Sidebar" импортируется в файле "Navbar.tsx".

При помощи деструктуризации props указываем какие именно props мы получаем, чтобы не писать далее "props.id",
"props.name" и так далее:
1. "id" - ID друга в онлайне.
2. "name" - имя друга в онлайне.
3. "avatar" - аватар друга в онлайне.
Такое мы делаем только в функциональных компонентах.*/
export const SideBar: React.FC<PropsType> = ({id, name, avatar}) => {
    /*Путь для компонента "NavLink" формируется на основе ID пользователя, который берется из параметров props.*/
    const path = '/dialogs/' + id;

    return (
        /*Этот элемент "nav" представляет собой типовой пункт меню навигации по друзьям в онлайне, который будет
        отрисовываться в компоненте "NavBar" при помощи метода "map()".*/
        <nav className={styles.sidebar}>
            <div>
                {/*Типовой пункт меню навигации по друзьям в онлайне содержит компонент "NavLink".*/}
                <NavLink to={path} activeClassName={styles.active}>
                    {/*Этот компонент "NavLink" содержит аватар пользователя, ссылка на который берется из параметров
                    props.*/}
                    <img src={avatar} alt=''/>

                    {/*Также этот компонент "NavLink" содержит имя пользователя, которое берется из параметров props.*/}
                    <div>{name}</div>
                </NavLink>
            </div>
        </nav>
    );
};