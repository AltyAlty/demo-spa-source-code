/*Импортируем из ассетов проекта аватар пользователя.*/
import avatarSource from '../assets/images/user.png';
/*Импортируем блоки запросов, связанных со страницей профиля пользователя.*/
import {profileAPI} from '../api/profile-api';
/*Импортируем списки кодов ответов от сервера.*/
import {ResultCodeEnum} from '../api/api';
/*Импортируем специальный AC "stopSubmit()" из библиотеки Redux Form, который сообщает UI, что что-то пошло не так, и
останавливает submit данных в форме. Импортируем "FormAction", чтобы создать тип для action-объектов, которые передается
в thunks и TC.*/
import {FormAction, stopSubmit} from 'redux-form';
/*Импортируем типы "PhotosType", "PostType" и "ProfileType".*/
import {PhotosType, PostType, ProfileType} from '../types/types';
/*Импортируем типы "InferActionsTypes" и "BaseThunkType".*/
import {InferActionsTypes, BaseThunkType} from './redux-store';

type InitialProfileStateType = typeof initialState;

let initialState = {
    /*Создаем массив объектов, которые хранят информацию о постах на странице профиля. Указываем, что этот массив
    объектов имеет тип массива элементов с типом "PostType".*/
    postsData: [
        {id: 1, message: 'Hi, how are you?', likesCount: 2, avatar: avatarSource},
        {id: 2, message: 'It\'s my first post', likesCount: 3, avatar: avatarSource}
    ] as Array<PostType>,

    /*Создаем свойство, которое будет хранить информацию о профиле пользователя, полученную с сервера. Имеет тип
    "ProfileType" или может иметь тип null, то есть быть пустым.*/
    profile: null as ProfileType | null,

    /*Создаем свойство, которое будет хранить информацию о статусе пользователя, полученную с сервера. Указываем, что
    изначально это свойство может иметь тип null, то есть быть пустым, или быть строкой. Можно было вместо этого просто
    указать ''.*/
    status: null as string | null
};

/*Создаем редьюсер, отвечающий за страницу профиля.*/
export const profileReducer = (state = initialState, action: ActionsType): InitialProfileStateType => {
    switch (action.type) {
        /*Добавляем новый пост на страницу профиля пользователя.*/
        case 'demo-spa/profile-reducer/ADD-POST': {
            /*Создаем новый пост в виде объекта.*/
            const newPost = {
                /*Указываем ID поста.*/
                id: 5,
                /*Указываем текст поста.*/
                message: action.newPostText,
                /*Указываем количество лайков у поста.*/
                likesCount: 0,
                /*Указываем аватар пользователя, которые будет отрисовываться рядом с постом.*/
                avatar: avatarSource
            };

            /*Добавляем этот новый пост в state.*/
            return {
                /*Делаем поверхностную копию state.*/
                ...state,
                /*Делаем глубокую копию state. Добавляем данные для нового поста в state.*/
                postsData: [...state.postsData, newPost]
            };
        }

        /*Устанавливаем данные профиля пользователя на странице его профиля.*/
        case 'demo-spa/profile-reducer/SET-USER-PROFILE': {
            return {
                /*Делаем поверхностную копию state.*/
                ...state,
                /*Устанавливаем данные профиля пользователя в state.*/
                profile: action.profile
            };
        }

        /*Устанавливаем данные статуса пользователя на странице его профиля.*/
        case 'demo-spa/profile-reducer/SET-USER-STATUS': {
            return {
                /*Делаем поверхностную копию state.*/
                ...state,
                /*Устанавливаем данные статуса пользователя в state.*/
                status: action.status
            };
        }

        /*Удаляем пост по его ID.*/
        case 'demo-spa/profile-reducer/DELETE-POST': {
            return {
                /*Делаем поверхностную копию state.*/
                ...state,
                /*Отфильтровываем массив "postsData", оставив только те элементы, которые не имеют ID равного ID из
                полученного action-объекта.*/
                postsData: state.postsData.filter(p => p.id !== action.postID)
            };
        }

        /*Устанавливаем ссылки на фото пользователя на странице профиля в state.*/
        case 'demo-spa/profile-reducer/IS-SAVING-USER-PHOTO-SUCCESSFUL': {
            return {
                /*Делаем поверхностную копию state.*/
                ...state,
                /*Делаем глубокую копию state. Добавляем объект со ссылками на фото пользователя на странице профиля в
                state. Указываем, что объект "profile" имеет тип "ProfileType", но такого лучше здесь не делать, а
                делать это в указании типа action-объектов, которые редьюсер принимает на входе.*/
                profile: {...state.profile, photos: action.photos} as ProfileType
            };
        }

        default: {
            return state;
        }
    }
};

type ActionsType = InferActionsTypes<typeof profileAC>;

export const profileAC = {
    /*AC для добавления нового поста. На входе получает "newPostText", которое должно быть строкой.*/
    addPost: (newPostText: string) => ({
        type: 'demo-spa/profile-reducer/ADD-POST',
        /*Создаем свойство, которое содержит текст поста.*/
        newPostText
    } as const),

    /*AC для установки данных профиля пользователя на странице его профиля. На входе получает "profile", которое должно
    быть типа "ProfileType".*/
    setUserProfile: (profile: ProfileType) => ({
        type: 'demo-spa/profile-reducer/SET-USER-PROFILE',
        /*Создаем свойство, которое содержит данные профиля пользователя.*/
        profile
    } as const),

    /*AC для установки данных статуса пользователя на странице его профиля. На входе получает "status", которое должно
    быть строкой.*/
    setUserStatus: (status: string) => ({
        type: 'demo-spa/profile-reducer/SET-USER-STATUS',
        /*Создаем свойство, которое содержит данные статуса пользователя на странице его профиля.*/
        status
    } as const),

    /*AC для добавления нового поста. Этот AC создали специально для целей тестирования в файле
    "profile-reducer.test.ts", данный функционал в нашем приложении пока еще не реализован. На входе получает "postID",
    которое должно быть числом.*/
    deletePostActionCreator: (postID: number) => ({
        type: 'demo-spa/profile-reducer/DELETE-POST',
        /*Создаем свойство, которое содержит ID поста для удаления.*/
        postID
    } as const),

    /*AC для установки фото пользователя в приложении на странице его профиля. На входе получает "photos", которое
    должно быть типа "PhotosType".*/
    isSavingUserPhotoSuccessfulAC: (photos: PhotosType) => ({
        type: 'demo-spa/profile-reducer/IS-SAVING-USER-PHOTO-SUCCESSFUL',
        /*Создаем свойство, которое содержит объект со ссылками на фото пользователя с сервера.*/
        photos
    } as const)
};


/*Создаем тип для thunks. Поскольку в TC "saveProfile()" мы диспатчим AC "stopSubmit()" из библиотеки Redux Form,
поэтому здесь мы указываем еще и "FormAction" из библиотеки Redux Form, так как в файле декларации AC "stopSubmit()"
указано, что он "extends" от "FormAction". Но из-за этого теперь мы можем диспатчить любой action-объект, что
естественно нежелательно для нас.*/
type ThunkType = BaseThunkType<ActionsType | FormAction>;

/*Это TC для запроса и установки данных по профилю пользователя на странице профиля. На входе принимает ID пользователя,
которое должно быть числом.*/
export const getUserProfile = (userID: number): ThunkType => async (dispatch) => {
    /*Делаем запрос на сервер для получения данных по профилю пользователя и ждем ответа от сервера.*/
    const response = await profileAPI.getUserProfile(userID);
    /*Получив ответ от сервера, при помощи AC "setUserProfile()" устанавливаем данные по профилю пользователя в state.*/
    dispatch(profileAC.setUserProfile(response));
};

/*Это TC для запроса и установки данных по статусу пользователя на странице профиля. На входе принимает ID пользователя,
которое должно быть числом.*/
export const getUserStatus = (userID: number): ThunkType => async (dispatch) => {
    /*Делаем запрос на сервер для получения данных по статусу пользователя и ждем ответа от сервера.*/
    const response = await profileAPI.getUserStatus(userID);
    /*Получив ответ от сервера, при помощи AC "setUserStatus()" устанавливаем данные по статусу пользователя в state.*/
    dispatch(profileAC.setUserStatus(response));
};

/*Это TC для изменения данных по статусу пользователя на странице профиля.  На входе принимает статус пользователя,
который должно быть строкой.*/
export const updateUserStatus = (status: string): ThunkType => async (dispatch) => {
    /*Используем конструкцию try/catch.*/
    try {
        /*Делаем запрос на сервер для изменения данных по статусу пользователя и ждем ответа от сервера.*/
        const response = await profileAPI.updateUserStatus(status);
        /*Если в ответе от сервера в свойстве "resultCode" указано "0", то есть операция прошла успешно, то диспатчим AC
        "setUserStatus()" для установки нового статуса пользователя в приложении, передав в этот AC данные по статусу
        пользователя с сервера.*/
        if (response.resultCode === ResultCodeEnum.Success) dispatch(profileAC.setUserStatus(status));
    } catch (error) {
        /*Если во время выполнения блока "try" произошла ошибка, то вместо краша приложения будет выведено сообщение,
        что произошла какая-то ошибка.*/
        alert(error);
    }
};

/*Это TC для загрузки фото пользователя на странице профиля и дальнейшего его отображения в нашем приложении. На входе
принимает объект с фото пользователя, которое типа "File" из Typescript.*/
export const saveUserPhoto = (photoFile: File): ThunkType => async (dispatch) => {
    /*Делаем запрос на сервер для загрузки фото пользователя и ждем ответа от сервера.*/
    const response = await profileAPI.saveUserPhoto(photoFile);

    /*Если в ответе от сервера в свойстве "resultCode" указано "0", то есть операция прошла успешно, то диспатчим AC
    "isSavingUserPhotoSuccessfulAC()" для установки фото пользователя в приложении, передав в этот AC объект со ссылками
    на фото пользователя с сервера.*/
    if (response.resultCode === ResultCodeEnum.Success) {
        dispatch(profileAC.isSavingUserPhotoSuccessfulAC(response.data.photos));
    }
};

/*Это TC для отправки новых данных профиля пользователя на странице профиля и дальнейшего их отображения в нашем
приложении. На входе принимает профиль пользователя, который должно быть типа "ProfileType".*/
export const saveProfile = (profile: ProfileType): ThunkType =>
    async (dispatch, getState) => {
        /*Получаем ID залогиненного пользователя при помощи функции "getState()".*/
        const userID = getState().auth.id;
        /*Делаем запрос на сервер отправки новых данных профиля пользователя и ждем ответа от сервера.*/
        const response = await profileAPI.saveProfile(profile);

        /*Если в ответе от сервера в свойстве "resultCode" указано "0", то есть операция прошла успешно, то диспатчим TC
        "getUserProfile()" для запроса и установки данных по профилю пользователя на странице профиля, передав в этот TC
        ID залогиненного пользователя.*/
        if (response.resultCode === ResultCodeEnum.Success) {
            /*Внутри здесь делаем проверку, чтобы "userID" не был null, так как Typescript пишет ошибку.*/
            if (userID !== null) {
                dispatch(getUserProfile(userID));
            } else {
                /*Если же окажется, что "userID" все-таки равен null, то будет выведена ошибка, что "userID" не может
                быть null.*/
                throw new Error('userID cannot be null');
            }
        } else {
            /*Иначе если в ответе от сервера в свойстве "resultCode" не указано "0", то есть операция не прошла успешно,
            то задиспатчим специальный AC "stopSubmit()" из библиотеки Redux Form, который сообщит UI, что что-то пошло
            не так, и остановит submit данных.

            Первым параметром указывается какую форму необходимо остановить. Вторым параметром указывается объект, в
            котором должно быть свойство "_error" (это свойство из библиотеки Redux Form, означающее ошибку для всей
            формы, но здесь можно использовать и имена других полей, созданных нами), присваиваемый значение с текстом
            ошибки (в ответе от сервера в данном случае).

            Но сейчас со AC "stopSubmit()" проблемы. При его использовании возникает проблема асинхронности, так как
            библиотека Redux Form вызывает функцию "setSubmitSucceed()" сразу после AC "stopSubmit()", не успев вернуть
            ошибку. Как итог сообщение об ошибке исчезает мгновенно и его можно увидеть только при дебаге. Можно
            использовать такой костыль:
            setTimeout(async () => await dispatch(stopSubmit('editProfile', {_error: response.messages[0]})))

            Но у меня все работает, возможно потому, что у меня не самая последняя версия библиотеки Redux Form
            (8.3.6).*/
            dispatch(stopSubmit('editProfile', {_error: response.messages[0]}));
            /*И поскольку будет какая-то ошибка на сервера, то промис будет в состоянии ожидании, соответственно, мы его
            прерываем, указав текст ошибки. Это нужно, чтобы не произошло деактивации режима редактирования профиля
            пользователя в callback-функции "onSubmit()", которая создана нами в компоненте "ProfileInfo".*/
            return Promise.reject(response.messages[0]);
        }
    };