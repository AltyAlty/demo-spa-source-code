/*Импортируем из ассетов проекта аватар пользователя.*/
import avatarSource from '../assets/images/user.png';
/*Импортируем тип "AvatarSourceType".*/
import {AvatarSourceType} from '../types/types';

export type InitialSidebarStateType = typeof initialState;

/*Создаем тип для объектов с данными по друзьям, которые в онлайне и отображаются в сайдбаре.*/
type FriendType = {
    /*ID друга в онлайне должно быть числом.*/
    id: number
    /*Имя друга в онлайне должно быть числом.*/
    name: string
    /*Аватар друга в онлайне должен быть типа "AvatarSourceType".*/
    avatar: AvatarSourceType
};

let initialState = {
    /*Создаем массив объектов, хранящих информацию о друзьях пользователя в онлайне, которые отображаются в сайдбаре.
    Указываем, что этот массив объектов имеет тип массива элементов с типом "FriendType".*/
    friendsData: [
        {id: 1, name: 'Abba', avatar: avatarSource},
        {id: 2, name: 'Bret', avatar: avatarSource},
        {id: 3, name: 'Carry', avatar: avatarSource}
    ] as Array<FriendType>
};

/*Создаем редьюсер, отвечающий за сайдбар.*/
export const sidebarReducer = (state = initialState, action: any): InitialSidebarStateType => {
    /*Этот редьюсер просто возвращает state, никак его не модифицируя.*/
    return state;
};