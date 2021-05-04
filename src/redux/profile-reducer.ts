/*
Это файл "reducer", отвечающего за страницу профиля. Каждый "reducer" состоит из:
- констант, содержащих значения для свойства "type" объекта "action"
- "initialState" - своей части "state"
- самой функции "reducer"
- "Action Creators" или "AC"
- "Thunk Creators" или "TC".
*/

import {profileAPI} from '../api/profile-api'; /*Импортируем блоки запросов, связанных со страницей профиля
пользователя.*/

import {FormAction, stopSubmit} from 'redux-form'; /*Импортируем специальный AC "stopSubmit" из библиотеки "redux-form",
который сообщает UI, что что-то пошло не так, и останавливает "submit" данных в форме. Импортировали "FormAction", чтобы
создать тип для объектов "action", который передается в "thunks" и TC.*/

import {PhotosType, PostType, ProfileType} from '../types/types'; /*Импортируем типы.*/
import {InferActionsTypes, BaseThunkType} from './redux-store'; /*Импортируем типы.*/

import avatarSource from '../assets/images/user.png'; /*Импортируем из ассетов проекта аватар пользователя.*/


/*Создаем тип "state" из самого "state" при помощи "typeof".*/
type InitialStateType = typeof initialState;

/*Создаем сам "state".*/
let initialState = {
    postsData: [ /*Создаем массив объектов, которые хранят информацию о постах на странице профиля.*/
        {id: 1, message: 'Hi, how are you?', likesCount: 2, avatar: avatarSource},
        {id: 2, message: 'It\'s my first post', likesCount: 3, avatar: avatarSource}
    ] as Array<PostType>, /*Указываем, что этот массив объектов имеет тип массива элементов с типом "PostType". Тип
    "PostType" был создан нами и импортирован сюда.*/

    profile: null as ProfileType | null, /*Создаем свойство, которое будет хранить информацию о профиле пользователя,
    полученную с сервера. Имеет тип "ProfileType". Тип "ProfileType" был создан нами и импортирован сюда.*/

    status: null as string | null /*Создаем свойство, которое будет хранить информацию о статусе пользователя,
    полученную с сервера. Указываем, что изначально это свойство может иметь тип "null", то есть быть пустым, или
    быть строкой. Можно вместо этого просто было указать ''.*/
};


/*
Это "reducer" - чистая функция, которая принимает объект "action" и копию части "state".
Потом "reducer" изменяет (или не изменяет, если объект "action" не подошел) определенную часть "state" и возвращает ее.
После этого все возвращенные части "state" всех "reducers" собираются в новый "state".
*/
const profileReducer = (state = initialState, action: ActionsType): InitialStateType => { /*Указываем, что тип
"state" на выходе имеет тот же тип "InitialStateType", что и "state" на входе. На входе объекты "action" имеют тип
"ActionsType", созданный нами ниже.*/
    switch (action.type) {
        case 'react-samurai-01/profile-reducer/ADD-POST': /*Добавляем новый пост на страницу профиля пользователя.*/
            let newPost = { /*Создаем новый пост в виде объекта.*/
                id: 5, /*Указываем "ID" поста.*/
                message: action.newPostText, /*Указываем текст поста.*/
                likesCount: 0, /*Указываем количество лайков у поста.*/
                avatar: avatarSource /*Указываем аватар пользователя, которые будет отрисовываться рядом с постом.*/
            };
            return { /*Добавляем этот новый пост в "state".*/
                ...state, /*Делаем поверхностную копию "state".*/
                postsData: [...state.postsData, newPost] /*Делаем глубокую копию "state". Добавляем данные для нового
                поста в "state".*/
            };

        case 'react-samurai-01/profile-reducer/SET-USER-PROFILE': /*Устанавливаем данные профиля пользователя на
        странице его профиля.*/
            return {
                ...state, /*Делаем поверхностную копию "state".*/
                profile: action.profile /*Устанавливаем данные профиля пользователя в "state".*/
            };

        case 'react-samurai-01/profile-reducer/SET-USER-STATUS': /*Устанавливаем данные статуса пользователя на странице
        его профиля.*/
            return {
                ...state, /*Делаем поверхностную копию "state".*/
                status: action.status /*Устанавливаем данные статуса пользователя в "state".*/
            };

        case 'react-samurai-01/profile-reducer/DELETE-POST': /*Удаляем пост по его "ID".*/
            return {
                ...state, /*Делаем поверхностную копию "state".*/
                postsData: state.postsData.filter(p => p.id !== action.postID) /*Отфильтруем массив "postsData", оставив
                только те элементы, которые не имеют "ID" равного "ID" из полученного объекта "action".*/
            };

        case 'react-samurai-01/profile-reducer/IS-SAVING-USER-PHOTO-SUCCESSFUL': /*Устанавливаем ссылки на фото
        пользователя на странице профиля в "state".*/
            return {
                ...state, /*Делаем поверхностную копию "state".*/
                profile: {...state.profile, photos: action.photos} as ProfileType /*Делаем глубокую копию "state".
                Добавляем объект со ссылками на фото пользователя на странице профиля в "state". Указываем, что объект
                "profile" имеет тип "ProfileType", созданный нами раннее и импортированный сюда, но такого лучше здесь
                не делать, а делать это в указании типа объектов "action", которые с принимает на входе "reducer".*/
            };

        default: /*Если объект "action" никуда не подошел, то по default возвращается тот же "state", чтобы не вызвать
        перерисовку.*/
            return state;
    }
};


/*Создаем типы для объектов "action".*/
type ActionsType = InferActionsTypes<typeof profileAC>; /*Здесь мы все созданные раннее типы для объектов "action"
объеденили в один тип. Мы его получили следующим образом: используем экспортированный сюда тип "InferActionsTypes" для
определения типов всех объектов "action" у упакованных в единый объект "profileAC" AC.*/


/*
Action Creators.
AC создает объект, который передается в "reducer".
Этот объект как минимум должен иметь свойство "type", которое определяет, что необходимо выполнить в "reducer".
*/
export const profileAC = { /*Создали специальный объект, содержащий все наши AC. Также удалили все типы, созданные
раннее на основе каждого AC. Также вверху удалили все константы со значениями для "type" и указывываем их сразу в AC,
так как "TypeScript" не даст нам допустить ошибку при указании этих "types" в "reducer". Согласно модульному паттерну
"Redux Ducks", чтобы избежать случаев одиноковых значений свойств "type" из-за чего один и тот же объект "action" может
сработать в нескольких "reducers", в значениях свойств "type" в объекте "action" указываются
"имя-проекта/имя-файла/имя-объекта-action". Также в конце везде добавили "as const", чтобы "reducer" адекватно
воспринимал объекты "action". Все AC мы поместили в единый объект с целью избавиться от большого количества отдельных
типов для каждого AC в обмен на один общий для них тип, который мы создали выше.*/
    addPostActionCreator: (newPostText: string) => ({ /*AC для добавления нового поста. На входе получает "newPostText",
    которое дожно быть строкой.*/
        type: 'react-samurai-01/profile-reducer/ADD-POST', /*Обязательно свойство "type" для AC.*/
        newPostText /*Это равносильно "newPostText: newPostText". Создаем свойство, которое содержит текст поста.*/
    } as const),

    setUserProfile: (profile: ProfileType) => ({ /*AC для установки данных профиля пользователя на странице его профиля.
    На входе получает "profile", которое дожно быть типа "ProfileType", созданного нами и импортированного сюда.*/
        type: 'react-samurai-01/profile-reducer/SET-USER-PROFILE', /*Обязательно свойство "type" для AC.*/
        profile /*Это равносильно "profile: profile". Создаем свойство, которое содержит данные профиля пользователя.*/
    } as const),

    setUserStatus: (status: string) => ({ /*AC для установки данных статуса пользователя на странице его профиля. На
    входе получает "status", которое дожно быть строкой.*/
        type: 'react-samurai-01/profile-reducer/SET-USER-STATUS', /*Обязательно свойство "type" для AC.*/
        status /*Это равносильно "status: status". Создаем свойство, которое содержит данные статуса пользователя на
        странице его профиля.*/
    } as const),

    deletePostActionCreator: (postID: number) => ({/*AC для добавления нового поста. Этот AC создали специально для
    целей тестирования в "profile-reducer.test.ts", данный функционал в нашем приложении пока еще не реализован. На
    входе получает "postID", которое дожно быть числом.*/
        type: 'react-samurai-01/profile-reducer/DELETE-POST', /*Обязательно свойство "type" для AC.*/
        postID /*Это равносильно "postID: postID". Создаем свойство, которое содержит "ID" поста для удаления.*/
    } as const),

    isSavingUserPhotoSuccessfulAC: (photos: PhotosType) => ({ /*AC для установки фото пользователя в приложении на
    странице его профиля. На входе получает "photos", которое дожно быть типа "PhotosType", созданного нами и
    импортированного сюда.*/
        type: 'react-samurai-01/profile-reducer/IS-SAVING-USER-PHOTO-SUCCESSFUL', /*Обязательно свойство "type" для
        AC.*/
        photos /*Это равносильно "photos: photos". Создаем свойство, которое содержит объект с ссылками на фото
        пользователя с сервера.*/
    } as const)
};


/*Создаем типы для "Thunk Creators".*/
type ThunkType = BaseThunkType<ActionsType | FormAction>; /*Создали тип для "thunks". Поскольку в TC
"login" мы диспатчим "stopSubmit" из библиотеки "redux-form", поэтому здесь мы указали еще "FormAction" из библиотеки
"redux-form", так как в файле декларации "stopSubmit" указано, что он "extends" от "FormAction". Но из-за этого теперь
мы можем диспатчить любой объект "action", что естественно нежелательно для нас.*/


/*
Thunk creators.
"Thunk" это функция, которая может выполнять AJAX-запросы и "dispatch".
Поскольку "reducers" нужны объекты "action" и "reducers" работают синхронно (AJAX-запросы несинхронные, поэтому будут
замедлять этот процесс),
а также "reducers" являются чистыми функциями, то мы не можем напрямую диспатчить "thunk".
В таком случае, "thunk" должен сначала сам запуститься, внутри него задиспатчаться объекты "action" и
в дальнейшем будут раскиданы по "reducers".
В параметрах "thunk" всегда приходит функция "dispatch".
"store" из "Redux" запускает "thunk" и закидывает в него функцию "dispatch" потому, что она у него есть.
Но, например, для добавления сообщения нам нужен текст этого сообщения. Чтобы передать этот текст в "thunk" нам нужно
использовать замыкание из нативного JS. Полезное замыкание нужно, когда нам необходимо передать функции какие-то
дополнительные данные. Замыкание появляется там, где одна функция возвращает другую функцию, и эта 2-я функция имеет
доступ к данным 1-й функции. Этой 1-й родительской функцией является "Thunk creator" (по аналогии с "Action creator").
В TC передается текст сообщения, а сам "thunk" возьмет это сообщения из замыкания. В итоге мы диспатчм "TC",
а не сам "thunk". Также для этого нам нужен некий промежуточный слой "thunk middleware" между "store.dispatch" и
"reducers". Если в "store" придет объект "action", то "thunk middleware" передаст его в "reducers". Если же в "store"
придет "thunk", то "thunk middleware" запустить этот "thunk", закинет в него функцию "dispatch" и на выходе будет
объект "action", который затем будет передан в "reducers". Если в "thunk" будет несколько AC, то сначала отправится
первый AC в "thunk middleware", потом второй AC и так далее до тех пор, пока не переберутся все AC. Это и есть
замыкание. Для установки "thunk middleware" нам нужна библиотека "redux-thunk". Установка происходит в файле со "store"
из "redux". В TC мы диспатчим не сам AC, а их вызовы.
*/
export const getUserProfile = (userID: number): ThunkType => async (dispatch) => {
/*Это TC для запроса и установки данных по профилю пользователя на странице профиля. Здесь вместо использования ".then"
мы используем "async/await". Промис будет ожидаться в "await". "async" делает TC асинхронным. На входе принимает "ID"
пользователя, которое должно быть числом. Также этот TC на выходе возвращает "thunk", который имеет тип "ThunkType",
созданный нами выше. Мы могли здесь также указать тип "dispatch", "getState()" и дополнительных аргументов, но типизируя
то, что возвращает TC, то есть "thunk", мы также типизировали, что в "thunk" будет передаваться дальше, то есть те самые
"dispatch", "getState()" и дополнительные аргументы.*/
    const response = await profileAPI.getUserProfile(userID); /*Делаем запрос на сервер для получения данных по профилю
    пользователя и ждем ответа от сервера. Здесь будет ожидаться промис. Когда он зарезольвиться, он сохраниться в
    "response". Здесь "return" не нужен, так как асинхронная функция автоматически вернет промис, то есть можно сразу
    писать логику по работе с ответом от сервера.*/

    dispatch(profileAC.setUserProfile(response)); /*Получив ответ от сервера, при помощи AC "setUserProfile"
    устанавливаем данные по профилю пользователя в "state".*/
};

export const getUserStatus = (userID: number): ThunkType => async (dispatch) => {
/*Это TC для запроса и установки данных по статусу пользователя на странице профиля. Здесь вместо использования ".then"
мы используем "async/await". Промис будет ожидаться в "await". "async" делает TC асинхронным. На входе принимает "ID"
пользователя, которое должно быть числом. Также этот TC на выходе возвращает "thunk", который имеет тип "ThunkType",
созданный нами выше. Мы могли здесь также указать тип "dispatch", "getState()" и дополнительных аргументов, но типизируя
то, что возвращает TC, то есть "thunk", мы также типизировали, что в "thunk" будет передаваться дальше, то есть те самые
"dispatch", "getState()" и дополнительные аргументы.*/
    const response = await profileAPI.getUserStatus(userID); /*Делаем запрос на сервер для получения данных по статусу
    пользователя и ждем ответа от сервера. Здесь будет ожидаться промис. Когда он зарезольвиться, он сохраниться в
    "response". Здесь "return" не нужен, так как асинхронная функция автоматически вернет промис, то есть можно сразу
    писать логику по работе с ответом от сервера.*/

    dispatch(profileAC.setUserStatus(response)); /*Получив ответ от сервера, при помощи AC "setUserStatus" устанавливаем
    данные по статусу пользователя в "state".*/
};

export const updateUserStatus = (status: string): ThunkType => async (dispatch) => {
/*Это TC для изменения данных по статусу пользователя на странице профиля. Здесь вместо использования ".then" мы
используем "async/await". Промис будет ожидаться в "await". "async" делает TC асинхронным. На входе принимает статус
пользователя, который должно быть строкой. Также этот TC на выходе возвращает "thunk", который имеет тип "ThunkType",
созданный нами выше. Мы могли здесь также указать тип "dispatch", "getState()" и дополнительных аргументов, но типизируя
то, что возвращает TC, то есть "thunk", мы также типизировали, что в "thunk" будет передаваться дальше, то есть те самые
"dispatch", "getState()" и дополнительные аргументы.*/
    try { /*Используем "try-catch".*/
        const response = await profileAPI.updateUserStatus(status); /*Делаем запрос на сервер для изменения данных по
        статусу пользователя и ждем ответа от сервера. Здесь будет ожидаться промис. Когда он зарезольвиться, он
        сохраниться в "response". Здесь "return" не нужен, так как асинхронная функция автоматически вернет промис,
        то есть можно сразу писать логику по работе с ответом от сервера.*/

        if (response.resultCode === 0) { /*Если в ответе от сервера в свойстве "resultCode" указано "0" (т.е.
        операция прошла успешно), то диспатчим AC "setUserStatus" для установки нового статуса пользователя
        в приложении, передав в этот AC данные по статусу пользователя с сервера.*/
            dispatch(profileAC.setUserStatus(status));
        }
    } catch (error) { /*Если во время выполнения блока "try" произошла ошибка, вместо краша приложения будет выведено
    сообщение, что была какая-то ошибка.*/
        alert(error);
    }
};

export const saveUserPhoto = (photoFile: File): ThunkType => async (dispatch) => {
/*Это TC для загрузки фото пользователя на странице профиля и дальнейшего его отображения в нашем приложении. Здесь
вместо использования ".then" мы используем "async/await". Промис будет ожидаться в "await". "async" делает TC
асинхронным. На входе принимает объект с фото пользователя, которое типа "File" из "TypeScript". Также этот TC на выходе
возвращает "thunk", который имеет тип "ThunkType", созданный нами выше. Мы могли здесь также указать тип "dispatch",
"getState()" и дополнительных аргументов, но типизируя то, что возвращает TC, то есть "thunk", мы также типизировали,
что в "thunk" будет передаваться дальше, то есть те самые "dispatch", "getState()" и дополнительные аргументы.*/
    const response = await profileAPI.saveUserPhoto(photoFile); /*Делаем запрос на сервер для загрузки фото пользователя
    и ждем ответа от сервера. Здесь будет ожидаться промис. Когда он зарезольвиться, он сохраниться в "response". Здесь
    "return" не нужен, так как асинхронная функция автоматически вернет промис, то есть можно сразу писать логику
    по работе с ответом от сервера.*/

    if (response.resultCode === 0) { /*Если в ответе от сервера в свойстве "resultCode" указано "0" (т.е.
    операция прошла успешно), то диспатчим AC "isSavingUserPhotoSuccessfulAC" для установки фото пользователя
    в приложении, передав в этот AC объект с ссылками на фото пользователя с сервера.*/
        dispatch(profileAC.isSavingUserPhotoSuccessfulAC(response.data.photos));
    }
};

export const saveProfile = (profile: ProfileType): ThunkType => async (dispatch, getState) => { /*Это TC для отправки
новых данных профиля пользователя на странице профиля и дальнейшего их отображения в нашем приложении. В "thunk" тут
также приходит функция "getState()" для получения "state". Здесь вместо использования ".then" мы используем
"async/await". Промис будет ожидаться в "await". "async" делает TC асинхронным. На входе принимает профиль пользователя,
который должно быть типа "ProfileType", созданного нами и импортированного сюда. Также этот TC на выходе возвращает
"thunk", который имеет тип "ThunkType", созданный нами выше. Мы могли здесь также указать тип "dispatch", "getState()" и
дополнительных аргументов, но типизируя то, что возвращает TC, то есть "thunk", мы также типизировали, что в "thunk"
будет передаваться дальше, то есть те самые "dispatch", "getState()" и дополнительные аргументы.*/
    const userID = getState().auth.id; /*Получаем "ID" залогиненного пользователя при помощи функции "getState()".*/
    const response = await profileAPI.saveProfile(profile); /*Делаем запрос на сервер отправки новых данных профиля
    пользователя и ждем ответа от сервера. Здесь будет ожидаться промис. Когда он зарезольвиться, он сохраниться
    в "response". Здесь "return" не нужен, так как асинхронная функция автоматически вернет промис, то есть можно
    сразу писать логику по работе с ответом от сервера.*/

    if (response.resultCode === 0) { /*Если в ответе от сервера в свойстве "resultCode" указано "0" (т.е.
    операция прошла успешно), то диспатчим TC "getUserProfile" для запроса и установки данных по профилю пользователя
    на странице профиля, передав в этот TC "ID" залогиненного пользователя.*/
        if (userID != null) { /*Внутри здесь делаем проверку, чтобы "userID" не был "null", так как "TypeScript" пишет
        ошибку.*/
            dispatch(getUserProfile(userID));
        } else { /*Если же окажется, что "userID" все-таки равен "null", то будет выведена ошибка, что "userID" не может
        быть "null".*/
            throw new Error('userID cannot be null');
        }
    } else { /*Иначе если в ответе от сервера в свойстве "resultCode" не указано "0" (т.е. операция не прошла успешно),
    то*/
        dispatch(stopSubmit('editProfile', {_error: response.messages[0]})); /*Задиспатчим специальный
        AC "stopSubmit()" из библиотеки "redux-form", который сообщит UI, что что-то пошло не так, и остановит
        "submit" данных. Первым параметром указывается какую форму необходимо остановить, а вторым параметром
        указывается объект, в котором должно быть свойство "_error" (из библиотеки "redux-form", означает ошибку
        для всей формы, но здесь можно использовать и имена других полей, которые мы создали), которому
        присваивается значение с текстом ошибки (в ответе от сервера в данном случае).

        Но сейчас со "stopSubmit" проблемы. При его использовании возникает проблема асинхроности, так как
        библиотека "redux-form" вызывает "setSubmitSucceed()" сразу после "stopSubmit()", не успев вернуть ошибку.
        Как итог сообщение об ошибке исчезает мгновенно и его можно увидеть только при дебаге. Можно использовать
        такой костыль:
        setTimeout(async () => await dispatch(stopSubmit('editProfile', {_error: response.messages[0]})))

        Но у меня все работает, возможно потому, что у меня не самая последняя версия библиотеки "redux-form" (8.3.6).*/
        return Promise.reject(response.messages[0]); /*И поскольку будет какая-то ошибка на сервера, то промис
        будет в состоянии ожидании, соотвественно мы его прерываем, указав текст ошибки. Это нужно, чтобы не произошло
        деактивации режима редактирования профиля пользователя в callback "onSubmit", который создан нами в компоненте
        "ProfileInfo" в файле "ProfileInfo.jsx".*/
    }
};


export default profileReducer; /*Экспортируем "profileReducer" по default, экспорт необходим для импорта.*/