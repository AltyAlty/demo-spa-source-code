/*
Селектор - это функция, которая принимает "state", достает из него то, что ей нужно и возвращает это в BLL.
Селекторы осуществляют определенную выборку данных из "state".
Здесь содержаться селекторы для данных из "sidebar-reducer.ts".
*/

import {AppStateType} from './redux-store'; /*Подключаем типы.*/


export const getSidebar = (state: AppStateType) => { /*Это созданный нами без библиотеки "reselect" селектор. Он
возвращает весь "state" из "sidebar-reducer.ts". На входе этот селектор принимает "state" с типом "AppStateType",
который мы создали и импортировали сюда.*/
    return state.sidebar
};