/*Здесь содержатся селекторы для данных из файла "sidebar-reducer.ts".*/

/*Импортируем тип "AppStateType".*/
import {AppStateType} from './redux-store';

/*Это созданный нами без библиотеки "reselect" селектор. Он возвращает весь state из файла "sidebar-reducer.ts".*/
export const getSidebar = (state: AppStateType) => { return state.sidebar};