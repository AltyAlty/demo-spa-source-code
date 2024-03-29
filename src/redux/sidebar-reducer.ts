/*
Это файл "reducer", отвечающего за сайдбар. Каждый "reducer" состоит из:
- констант, содержащих значения для свойства "type" объекта "action"
- "initialState" - своей части "state"
- самой функции "reducer"
- "Action Creators" или "AC"
- "Thunk Creators" или "TC".
*/

import avatarSource from '../assets/images/user.png'; /*Импортируем из ассетов проекта аватар пользователя.*/

import {AvatarSourceType} from '../types/types'; /*Подключаем типы.*/


/*Создаем тип "state" из самого "state" при помощи "typeof".*/
export type InitialSidebarStateType = typeof initialState;

/*Создаем тип для объектов с данными по друзьям, которые в онлайне и отображаются в сайдбаре. Объект, содержащий
информацию с данными по друзьям, которые в онлайне и отображаются в сайдбаре, должен обязательно содержать следующие
поля с указанными типами.*/
type FriendType = {
    id: number /*"ID" друга в онлайне должно быть числом.*/
    name: string /*Имя друга в онлайне должно быть числом.*/
    avatar: AvatarSourceType /*Аватар друга в онлайне должен быть типа "AvatarSourceType".*/
};

/*Создаем сам "state".*/
let initialState = {
    friendsData: [ /*Создаем массив объектов, которые хранят информацию о друзьях пользователя в онлайне, которые
    отображаются в сайдбаре.*/
        {id: 1, name: 'Abba', avatar: avatarSource},
        {id: 2, name: 'Bret', avatar: avatarSource},
        {id: 3, name: 'Carry', avatar: avatarSource}
    ] as Array<FriendType> /*Указываем, что этот массив объектов имеет тип массива элементов с типом "FriendType".
    Тип "FriendType" был создан нами выше.*/
};


/*
Это "reducer" - чистая функция, которая принимает объект "action" и копию части "state".
Потом "reducer" изменяет (или не изменяет, если объект "action" не подошел) определенную часть "state" и возвращает ее.
После этого все возвращенные части "state" всех "reducers" собираются в новый "state".
*/
const sidebarReducer = (state = initialState, action: any): InitialSidebarStateType => {
/*Указываем, что тип "state" на выходе имеет тот же тип "InitialSidebarStateType", что и "state" на входе.*/
    return state; /*Этот "reducer" просто возвращает "state".*/
};

export default sidebarReducer; /*Экспортируем "sidebarReducer" по default и будем его использовать в нашем проекте под
именем "sidebarReducer", экспорт необходим для импорта.*/