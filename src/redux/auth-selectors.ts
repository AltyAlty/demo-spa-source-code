/*
Селектор - это функция, которая принимает "state", достает из него то, что ей нужно и возвращает это в BLL.
Селекторы осуществляют определенную выборку данных из "state".
Здесь содержаться селекторы для данных из "auth-reducer.ts".
*/

import {AppStateType} from './redux-store'; /*Подключаем типы.*/


export const getIsAuth = (state: AppStateType) => { /*Это созданный нами без библиотеки "reselect" селектор. Он
возвращает информацию о том, что являемся ли мы залогинены в приложение или нет. На входе этот селектор принимает
"state" с типом "AppStateType", который мы создали и импортировали сюда.*/
    return state.auth.isAuth
};

export const getCaptchaURL = (state: AppStateType) => { /*Это созданный нами без библиотеки "reselect" селектор. Он
возвращает URL капчи при логинизации. На входе этот селектор принимает "state" с типом "AppStateType", который мы
создали и импортировали сюда.*/
    return state.auth.captchaURL
};

export const getLogin = (state: AppStateType) => { /*Это созданный нами без библиотеки "reselect" селектор. Он
возвращает "login" залогиненного пользователя. На входе этот селектор принимает "state" с типом "AppStateType", который
мы создали и импортировали сюда.*/
    return state.auth.login
};