/*Селектор - это функция, которая принимает state, достает из него то, что ей нужно и возвращает это в BLL. Селекторы
осуществляют определенную выборку данных из state. Здесь содержатся селекторы для данных из файла "auth-reducer.ts".*/

/*Импортируем тип "AppStateType".*/
import {AppStateType} from './redux-store';

/*Это созданный нами без библиотеки Reselect селектор. Он возвращает информацию о том являемся ли мы залогиненными в
приложение или нет. На входе этот селектор принимает state с типом "AppStateType", который мы создали и импортировали
сюда.*/
export const getIsAuth = (state: AppStateType) => state.auth.isAuth;
/*Это созданный нами без библиотеки Reselect селектор. Он возвращает URL капчи при логинизации.*/
export const getCaptchaURL = (state: AppStateType) => state.auth.captchaURL;
/*Это созданный нами без библиотеки Reselect селектор. Он возвращает логин залогиненного пользователя.*/
export const getLogin = (state: AppStateType) => state.auth.login;