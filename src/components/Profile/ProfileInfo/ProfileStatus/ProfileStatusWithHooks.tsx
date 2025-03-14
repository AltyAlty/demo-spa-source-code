import React, {useState, useEffect, ChangeEvent} from 'react';

type PropsType = {
    /*Данные статуса пользователя, полученные с сервера, должны быть строкой или иметь тип null, то есть быть пустыми.*/
    status: string | null
    /*Свойство, показывающее является ли залогиненный пользователь владельцем профиля, который в данный момент
    отображается на странице профиля, должно быть булева типа.*/
    isOwner: boolean
    /*TC для изменения данных по статусу пользователя на странице профиля должен быть функцией, которая принимает
    строковой параметр и ничего не возвращает.*/
    updateUserStatus: (status: string) => void
};

/*"ProfileStatusWithHooks" это функциональный компонент, который создан в виде стрелочной функции.
"ProfileStatusWithHooks" является компонентом, который предоставляет реализацию статуса пользователя на странице
пользователя. Статус пользователя представляет собой поле статуса как в ВК, на который можно нажать и активировать поле
для ввода статуса, а если убрать фокус с этого поля, то будет просто текст.

Компонент "ProfileStatusWithHooks" импортируется в файле "ProfileInfo.tsx".

При помощи деструктуризации props указываем какие именно props мы получаем:
1. "isOwner" - свойство, показывающее является ли залогиненный пользователь владельцем профиля.
2. "updateUserStatus" - TC для изменения данных по статусу пользователя на странице профиля.

Не указываем здесь свойства "status", а при помощи деструктуризации "...props" прокидываем это свойство в этот
компонент, так как в самом компоненте уже используется своя переменная с именем "status".*/
export const ProfileStatusWithHooks: React.FC<PropsType> = ({isOwner, updateUserStatus, ...props}) => {
    /*При помощи деструктуризирующего присваивания создаем две переменные. Первая переменная будет хранить первый
    элемент из хука "useState()", этот элемент будет означать включен или выключен режим редактирования статуса
    (изначально false). Вторая переменная будет хранить функцию из хука "useState()", которая будет изменять первый
    элемент (то есть включать или выключать режим редактирования статуса).*/
    const [editMode, setEditMode] = useState(false);
    /*При помощи деструктуризирующего присваивания создаем две переменные. Первая переменная будет хранить первый
    элемент из хука "useState()", этот элемент будет хранить значение статуса (изначально берется из props). Вторая
    переменная будет хранить функцию из хука "useState()", которая будет изменять первый элемент (то есть редактировать
    статус).*/
    const [status, setStatus] = useState(props.status);

    /*Поскольку хук "useState()" содержит массив с двумя элементами, то аналог мог бы быть следующим*/
    // const stateWithSetState = useState(false);
    // const editMode = stateWithSetState[0];
    // const setEditMode = stateWithSetState[1];

    /*Используем хук "useEffect()", чтобы избежать бага, когда не успевал загружаться статус с сервера во время первого
    редактирования после загрузки компонента. Когда после загрузки страницы мы входили в режим редактирования статуса,
    то поле было пустым, так как локальный "status", созданный при помощи хука "useState()", был пустым, поскольку
    иногда компонент загружался раньше, чем получался статус с сервера. То есть отображалось пустое поле, так как
    изначально это пустое поле указано в статусе в нашем BLL. И это пустое поле подхватывалось нашим "status" раньше
    данных о статусе, полученных из запроса на сервер. Поэтому сейчас мы отслеживаем изменения статуса в глобальном
    state и при каждом таком изменении вызываем функцию "setStatus()", то есть теперь получение запоздавших данных о
    статусе с сервера будет триггерить изменение локального "status".*/

    useEffect(
        /*Первый параметр это функция для редактирования статуса при помощи хука "useState()".*/
        () => { setStatus(props.status) },
        /*Второй параметр это значение статуса из глобального state. Если это значение будет меняться, то будет
        срабатывать каждый раз функция из первого параметра.*/
        [props.status]
    );

    /*Создаем функцию, которая при вызове активирует режим редактирования статуса.*/
    const activateEditMode = () => { setEditMode(true); };

    /*Создаем функцию, которая при вызове деактивирует режим редактирования статуса и обновляет значение статуса в
    глобальном state при помощи TC "updateUserStatus()" для изменения статуса пользователя на странице профиля.*/
    const deactivateEditMode = () => {
        setEditMode(false);

        /*Здесь делаем дополнительную проверку на наличие статуса для целей типизации.*/
        if (status) {
            updateUserStatus(status);
        } else {
            /*Если же статус отсутствует, то выводим ошибку в консоль.*/
            console.error('Status should exist');
        }
    };

    /*Создаем специальную функцию "onUserStatusChange()", которая будет вызываться при изменении поля "input", брать
    текущее значение содержимого этого поля и сохранять его в локальный state при помощи хука "useState()". Для события
    "event" указываем тип "ChangeEvent<HTMLInputElement>"*/
    const onUserStatusChange = (event: ChangeEvent<HTMLInputElement>) => { setStatus(event.currentTarget.value) };
    /*Создаем специальную функцию "handleFocus()" для автоматического выделения текста в поле статуса пользователя. Для
    события "event" указали тип "ChangeEvent<HTMLInputElement>"*/
    const handleFocus = (event: ChangeEvent<HTMLInputElement>) => { event.target.select() };

    return (
        <div>
            {/*Если режим редактирования статуса пользователя отключен и мы являемся владельцем страницы, то отрисуется
            элемент "div", внутри которого будет элемент "span", содержащий обработчик события "onDoubleClick" -
            двойного нажатия по элементу. При срабатывании этого события активируется callback-функция
            "activateEditMode()", чтобы активировать режим редактирования статуса пользователя. Внутри элемента "span"
            будет отображаться текущее значение статуса пользователя из props, а при его отсутствии будет надпись "Enter
            your status". Если мы же не являемся владельцем профиля, то мы не сможем перейти в режим редактирования,
            только увидеть сам статус. Здесь есть небольшая проблема - после ввода нового статуса какое-то время будет
            отображен старый статус, пока не завершится запрос на сервер на изменение этого статуса. Одним из вариантов
            решений этой проблемы может быть добавление компонента-заглушки "Preloader" на время пока идет запрос.*/}
            {!editMode &&
                <div>
                    {isOwner
                        ? <div><b>Status</b>: <span
                            onDoubleClick={activateEditMode}>{props.status || 'Enter your status'}</span></div>
                        : <span>{props.status || ''}</span>
                    }
                </div>
            }

            {/*Если режим редактирования статуса пользователя включен, то отрисуется элемент "div", внутри которого
            будет элемент "input", содержащий обработчик события "onBlur" - потери фокуса с элемента . При срабатывании
            этого события активируется callback-функция "deactivateEditMode()", чтобы деактивировать режим
            редактирования статуса пользователя и сохранить новый статус в глобальном state. Также у элемента "input"
            указан атрибут "autoFocus" для автоматического фокуса на элементе. Внутри элемента "input" благодаря
            атрибуту "value" из локального state при помощи хука "useState()" будет отображаться текущее значение
            статуса пользователя. Также внутри элемента "input" содержится обработчик события "onFocus" - появления
            фокуса на элементе, при срабатывании которого активируется callback-функция "handleFocus()", чтобы
            автоматически выделить текст статуса пользователя. Еще внутри элемента "input" содержится обработчик события
            "onChange" - изменения поля "input", при срабатывании которого активируется callback-функция
            "onUserStatusChange()", чтобы брать текущее значение содержимого этого поля и сохранять его в локальный
            state при помощи хука "useState()".*/}
            {editMode &&
                <div>
                    <input onChange={onUserStatusChange}
                           onFocus={handleFocus}
                           autoFocus={true}
                           onBlur={deactivateEditMode}
                        /*Поскольку в нашей типизации указано, что статус может быть null, то тут нам пришлось
                        указать, чтобы он всегда воспринимался как строка при помощи "as string".*/
                           value={status as string}/>
                </div>
            }
        </div>
    );
};