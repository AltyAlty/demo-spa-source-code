/*Импортируем блоки запросов, связанных с аутентификацией.*/
import {authAPI} from '../api/auth-api';
/*Импортируем блоки запросов, связанных с капчей.*/
import {securityAPI} from '../api/security-api';
/*Импортируем списки кодов ответов от сервера.*/
import {ResultCodeEnum, ResultCodeForCaptchaEnum} from '../api/api';
/*Импортируем специальный AC "stopSubmit()" из библиотеки Redux Form, который сообщает UI, что что-то пошло не так, и
останавливает submit данных в форме. Импортируем "FormAction", чтобы создать тип для action-объектов, которые передаются
в thunks и TC.*/
import {FormAction, stopSubmit} from 'redux-form';
/*Импортируем типы "InferActionsTypes" и "BaseThunkType".*/
import {InferActionsTypes, BaseThunkType} from './redux-store';

type InitialAuthStateType = typeof initialState;

let initialState = {
    /*Свойство, которое хранит ID залогиненного пользователя. Указываем, что изначально это свойство может иметь тип
    null, то есть быть пустым, или быть числом.*/
    id: null as number | null,
    /*Свойство, которое хранит email залогиненного пользователя. Указываем, что изначально это свойство может иметь тип
    null, то есть быть пустым, или быть строкой.*/
    email: null as string | null,
    /*Свойство, которое хранит логин залогиненного пользователя. Указываем, что изначально это свойство может иметь тип
    null, то есть быть пустым, или быть строкой.*/
    login: null as string | null,
    /*Свойство, которое указывает залогинен ли пользователь.*/
    isAuth: false,
    /*Свойство, которое хранит URL изображения с капчей. Указываем, что изначально это свойство может иметь тип null, то
    есть быть пустым, или быть строкой.*/
    captchaURL: null as string | null
};

/*Создаем редьюсер, отвечающий за аутентификацию и связанные с ней процессы.*/
export const authReducer = (state = initialState, action: ActionsType): InitialAuthStateType => {
    switch (action.type) {
        /*Устанавливаем данные по залогиненному пользователю в state. Здесь для обоих случаев один и тот же код потому,
        что в обоих соответствующих AC используется свойство "payload". Благодаря деструктуризации мы сможем передать
        нужные значения свойств из "payload" в нужные свойства state при совпадении имен свойств.*/
        case 'demo-spa/auth-reducer/SET-USER-DATA':
        case 'demo-spa/auth-reducer/SET-CAPTCHA-URL':
            return {
                /*Делаем поверхностную копию state.*/
                ...state,
                /*Action-объект будет иметь объект "payload", который содержит "id", "email", "login" и "isAuth".
                Аналогично может прийти такой же объект "payload", но он может содержать только "captchaURL" - URL
                изображения с капчей. Делаем глубокую копию, чтобы установить эти данные в state, деструктурируя этот
                объект "payload".*/
                ...action.payload,
            };

        default: {
            return state;
        }
    }
};

type ActionsType = InferActionsTypes<typeof authAC>;

export const authAC = {
    /*AC для установки данных залогиненного пользователя в state.*/
    setAuthUserData: (
        /*На входе получает ID пользователя, который должен быть числом или null, то есть быть пустым.*/
        id: number | null,
        /*На входе получает email пользователя, который должен быть строкой или null, то есть быть пустым.*/
        email: string | null,
        /*На входе получает логин пользователя, который должен быть строкой или null, то есть быть пустым.*/
        login: string | null,
        /*На входе получает информацию залогинен ли пользователь, которая должна быть булева типа.*/
        isAuth: boolean
    ) => ({
        type: 'demo-spa/auth-reducer/SET-USER-DATA',
        /*Объект с данными по залогиненному пользователю. Далее мы его деструктурируем в "authReducer()".*/
        payload: {
            /*Свойство, которое хранит ID залогиненного пользователя.*/
            id,
            /*Свойство, которое хранит email залогиненного пользователя.*/
            email,
            /*Свойство, которое хранит логин залогиненного пользователя.*/
            login,
            /*Свойство, которое указывает залогинен ли пользователь.*/
            isAuth
        }
    } as const),

    /*AC для установки URL изображения с капчей в state. На входе получает "captchaURL", которое должно быть строкой.*/
    setCaptchaURL: (captchaURL: string) => ({
        type: 'demo-spa/auth-reducer/SET-CAPTCHA-URL',
        /*Объект с URL изображения с капчей. Далее мы его деструктурируем в "authReducer()".*/
        payload: {
            /*Свойство, которое хранит URL изображения с капчей.*/
            captchaURL
        }
    } as const)
};

/*Создаем тип для thunks. Поскольку в TC "login()" мы диспатчим AC "stopSubmit()" из библиотеки Redux Form, поэтому
здесь мы указываем еще и "FormAction" из библиотеки Redux Form, так как в файле декларации AC "stopSubmit()" указано,
что он "extends" от "FormAction". Но из-за этого теперь мы можем диспатчить любой action-объект, что естественно
нежелательно для нас.*/
type ThunkType = BaseThunkType<ActionsType | FormAction>;

/*Это TC для запроса и установки данных залогиненного пользователя в state. Здесь вместо использования then мы
используем ключевые слова async/await. Промис будет ожидаться вместе с ключевым словом await. Ключевое слово async
делает TC асинхронным. Этот TC на выходе возвращает thunk, который имеет тип "ThunkType", созданный нами выше.*/
export const getAuthUserData = (): ThunkType => async (dispatch) => {
    /*Делаем запрос на сервер для получения данных залогиненного пользователя. Здесь будет ожидаться промис. Когда он
    зарезольвится, он сохранится в "response". Здесь return не нужен, так как асинхронная функция автоматически вернет
    промис, то есть можно сразу писать логику по работе с ответом от сервера.*/
    const response = await authAPI.me();

    /*Если свойство "resultCode", которое пришло в ответе от сервера, содержит код "0", то есть ошибки при залогинивании
    не было, то*/
    if (response.resultCode === ResultCodeEnum.Success) {
        /*деструктурируем объект "data", который пришел в ответе от сервера, и получаем "ID", "email" и "login"
        залогиненного пользователя*/
        let {id, email, login} = response.data;
        /*и устанавливаем эти данные в state при помощи AC "setAuthUserData()", четвертый параметр это "isAuth", чтобы
        сообщить, что пользователь залогинился.*/
        dispatch(authAC.setAuthUserData(id, email, login, true));
    }
};

/*Это TC для осуществления логинизации через наше приложение.*/
export const login = (
    /*На входе получает email пользователя, который должен быть строкой.*/
    email: string,
    /*На входе получает пароль пользователя, который должен быть строкой.*/
    password: string,
    /*На входе получает информацию запомнить ли пользователя, которая должна быть булева типа.*/
    rememberMe: boolean,
    /*На входе получает путь к капче, который должен быть строкой.*/
    captcha: string
): ThunkType => async (dispatch) => {
    /*Делаем запрос на сервер для залогинивания пользователя.*/
    const response = await authAPI.login(email, password, rememberMe, captcha);

    /*Если свойство "resultCode", которое пришло в ответе от сервера, содержит код "0", то есть ошибки при залогинивании
    не было, то*/
    if (response.resultCode === ResultCodeEnum.Success) {
        /*вызываем TC "getAuthUserData()" для запроса и установки данных залогиненного пользователя в state.*/
        dispatch(getAuthUserData())
    } else {
        /*Иначе если свойство "resultCode", которое пришло в ответе от сервера, содержит код "10", то есть нужно ввести
        капчу, то вызываем TC "getCaptchaURL()" для получения URL изображения с капчей с сервера и установки его в
        state.*/
        if (response.resultCode === ResultCodeForCaptchaEnum.CaptchaIsRequired) dispatch(getCaptchaURL());
        /*Также иначе если пришло какое-то информационное сообщение об ошибке при логинизации от сервера в массиве
        "messages", то мы положим первый элемент этого массива в переменную "message", если длина этого массива больше
        нуля, или же положим в переменную "message" текст "unknown error".*/
        const message = response.messages.length > 0 ? response.messages[0] : 'unknown error';
        /*Затем диспатчим специальный AC "stopSubmit()" из библиотеки Redux Form, который сообщит UI, что что-то пошло
        не так, и остановит submit данных.

        Первым параметром указывается какую форму необходимо остановить. Вторым параметром указывается объект, в котором
        должно быть свойство "_error" (это свойство из библиотеки Redux Form, означающее ошибку для всей формы, но здесь
        можно использовать и имена других полей, созданных нами), присваиваемый значение с текстом ошибки.

        Но сейчас с AC "stopSubmit()" проблемы. При его использовании возникает проблема асинхронности, так как
        библиотека Redux Form вызывает функцию "setSubmitSucceed()" сразу после AC "stopSubmit()", не успев вернуть
        ошибку. Как итог сообщение об ошибке исчезает мгновенно и его можно увидеть только при дебаге. Можно
        использовать такой костыль: setTimeout(async () => await dispatch(stopSubmit('login', {_error: message})))

        Но у меня все работает, возможно потому, что у меня не самая последняя версия библиотеки Redux Form (8.3.6).*/
        dispatch(stopSubmit('login', {_error: message}));
    }
};

/*Это TC для получения URL изображения с капчей с сервера и установки его в state.*/
const getCaptchaURL = (): ThunkType => async (dispatch) => {
    /*Делаем запрос на сервер для получения капчи.*/
    const response = await securityAPI.getCaptchaURL();
    /*Получив ответ от сервера, сохраняем из ответа сервера URL капчи.*/
    const captchaURL = response.url;
    /*Затем устанавливаем этот URL капчи в state при помощи AC "setCaptchaURL()".*/
    dispatch(authAC.setCaptchaURL(captchaURL));
};

/*Это TC для осуществления логаута.*/
export const logout = (): ThunkType => async (dispatch) => {
    /*Делаем запрос на сервер для разлогинивания пользователя.*/
    const response = await authAPI.logout();
    /*Если свойство "resultCode", которое пришло в ответе от сервера, содержит код "0", то есть ошибки при
    разлогинивании не было, то обнуляем данные пользователя в state при помощи AC "setAuthUserData()", четвертый
    параметр это "isAuth", чтобы сообщить, что пользователь разлогинился.*/
    if (response.resultCode === 0) dispatch(authAC.setAuthUserData(null, null, null, false));
};