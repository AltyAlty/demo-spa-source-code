import React, {useState, useEffect, ChangeEvent} from 'react';
/*
Подключаем сам "ReactJS", необходим везде, где мы что-то из него используем (например, JSX).
"WebPack" уже встроен в "ReactJS".
Классовый компонент позволяет реализовать локальный "state" (смотри "ProfileStatus") и методы
жизненного цикла ("componentDidMount" и т.д.), а функциональный компонент этого не может делать.
Такие возможности классового компонента были созданы благодаря тому, что "React" на основе класса
создает объект и всякий раз взаимодействует с этим объектом. А поскольку это объект, значит может
хранить такие вещи как "state" и методы. Функция же просто вызывается и возвращает "JSX", постоянное
общение с функциональным компонентом так просто не организовать. Объект живет в памяти, а функция отработала
и удалилась. Для решения этой проблемы в функциональных компонентах были созданы "Hooks" (хуки).
"Hook" - это функция, которая может делать side effects.
"React" когда вызывает функциональную компоненту, в которой есть хуки, он запоминает вызов этих хуков и
этой функции для того, чтобы потом соотносить side effects, созданные этими хуками. В отличие от классового компонента
"React" запоминает эту информацию где-то на своей стороне, а не внутри объекта.
Хуки нельзя писать в условиях и циклах, так как это нарушает порядок хуков, который является важным.
Можно писать свои кастомные хуки.
Подключаем хук "useState", который возвращает массив с двуми элементами. Первый элемент - это значение,
которое хранится в "state". Второй элемент - это функция, которая будет изменять это значение в первом элементе. Изменяя
первый элемент мы заставляем "React" перерисовывать функциональный компонент.
Хук "useState" работает асинхронно, то есть если мы изменяем какое-либо значение при помощи этого хука, то мы говорим,
чтобы "ReactJS" изменил это значение как только сможет, не обращая внимание на порядок соседних инструкций рядом с
кодом, где мы меняем какое-то значение из локального "state".
Подключаем хук "useEffect", который принимает функцию первым параметром и выполняет ее, когда произойдет
отрисовка компонента, то есть после каждого вызова "render". Вторым параметром этот хук принимает зависимости -
зависимо от чьих изменений будет срабатывать хук, если передать туда пустой массив (так лучше не делать), то
этот хук сработает только один раз. Этот хук используется для side effects.
Импортируем "ChangeEvent" для типизации событий.
*/


/*Создаем тип для "props". "Props" в этом компоненте должны обязательно содержать следующие поля с указанными типами.
Все это нужно для указания типа "props" в функциональном компоненте.*/
type PropsType = {
    status: string | null /*Данные статуса пользователя для страницы профиля должны быть строкой или иметь тип "null",
    то есть быть пустыми.*/
    isOwner: boolean /*Свойство, которое показывает является ли залогиненный пользователь владельцем профиля, который в
    данный момент отображается на странице профиля, должно быть булева типа.*/
    updateUserStatus: (status: string) => void /*TC для изменения данных по статусу пользователя на странице профиля
    должен быть функцией, которая принимает строковой параметр и ничего не возвращает.*/
};


/*
"ProfileStatusWithHooks" это функциональный компонент, который создан в виде стрелочной функции.
При взаимодействии с функциональным компонентом React не хранит его постоянно в памяти.
React вызывает функциональный компонент, он делает свою работу (например, возвращает JSX) и компонент удаляется
из памяти.
Функциональный компонент можно создать еще и таким образом: function ProfileStatusWithHooks(props) {тело}.
Компонент это функция, которая возвращает JSX.
JSX совмещает в себе JS и HTML.
В JSX для указания класса в стилях нужно использовать "className" вместо "class".
В JSX скобки {} позволяют использовать JS-код внутри HTML-кода.
Каждый компонент это новый тег для ReactJS, и эти теги используются для вызова этих компонентов.
Теги компонентов можно вкладывать друг в друга, тем самым образуя дерево компонентов.
Каждый компонент желательно помещать в отдельный файл.
Каждый компонент всегда вызывается с объектом, внутри которого какие-то параметры.
Если параметры не указаны, то им все равно передается пустой объект в качестве параметров.
Принято объект с параметрами именовать как "props".
Вызывая тег компонента и передавая ему атрибуты, мы отдаем ему параметры.
Этот компонент подключается в компоненте "ProfileInfo".
Компонент "ProfileStatusWithHooks" предоставляет реализацию статуса пользователя на странице пользователя.
Статус пользователя представляет из себя поле статуса как в ВК, на который можно нажать и активировать поле для ввода
статуса, а если убрать фокус с этого поля, то будет просто текст.
*/
const ProfileStatusWithHooks: React.FC<PropsType> = ({isOwner,updateUserStatus, ...props}) => {/*Указываем
какие именно "props" мы получаем, чтобы не писать далее "props.isOwner", и так далее:
- "isOwner" - свойство, которое показывает является ли залогиненный пользователь владельцем профиля;
- "updateUserStatus" - TC для изменения данных по статусу пользователя на странице профиля.
Такое мы делаем только в функциональных компонентах. Не указываем здесь свойства "status", а при помощи деструктуризации
"...props" прокидываем это свойство в этот компонент, так как в самом компоненте уже используется своя переменная с
именем "status". Указали при помощи "React.FC<>", что "props" в этом функциональном компоненте имеют тип "PropsType".*/
    let [editMode, setEditMode] = useState(false); /*При помощи деструктуризирующего присваивания создали
    две переменные. Первая переменная будет хранить первый элемент из хука "useState", этот элемент будет означать
    включен или выключен режим редактирования статуса (изначально "false"). Вторая переменная будет хранить функцию
    из хука "useState", которая будет изменять первый элемент (то есть включать или выключать режим редактирования
    статуса).*/

    let [status, setStatus] = useState(props.status);/*При помощи деструктуризирующего присваивания создали
    две переменные. Первая переменная будет хранить первый элемент из хука "useState", этот элемент будет хранить
    значение статуса (изначально берется из "props"). Вторая переменная будет хранить функцию из хука "useState",
    которая будет изменять первый элемент (то редактировать статус).*/

    /*Поскольку "useState" содержит массив с двумя элементами, то аналог мог бы быть такой:
    let stateWithSetState = useState(false);
    let editMode = stateWithSetState[0];
    let setEditMode = stateWithSetState[1];*/

    useEffect(() => { /*Используем хук "useEffect", чтобы избежать бага, когда не успевал загружаться статус
    с сервера во время первого редактирования после загрузки компонента. Когда после загрузки страницы мы входили в
    режим редактирования статуса, то поле было пустым, так как локальный "status", созданный при помощи хука "useState",
    был пустым, поскольку иногда компонент загружался раньше, чем получался статус с сервера. То есть отображалось
    пустое поле, так как изначально это пустое поле указано в статусе в нашем BLL. И это пустое поле подхватывалось
    нашим "status" раньше данных о статусе, полученных из запроса на сервер. Поэтому сейчас мы отслеживаем изменения
    статуса в глобальном "state" и при каждом таком изменении вызываем функцию "setStatus", то есть теперь получение
    запоздавших данных о статусе с сервера будет триггерить изменение локального "status".*/
        setStatus(props.status); /*Первый параметр это функция для редактирования статуса при помощи хука "useState".*/
    },
        [props.status] /*Второй параметр это значение статуса из глобального "state". Если это значение будет
        меняться, то будет срабатывать каждый раз функция из первого параметра.*/
    );

    const activateEditMode = () => { /*Создали функцию, которая при вызове активирует режим редактирования статуса.*/
        setEditMode(true);
    };

    const deactivateEditMode = () => { /*Создали функцию, которая при вызове деактивирует режим редактирования статуса
    и обновляет значение статуса в глобальном "state" при помощи TC "updateUserStatus" для изменения
    статуса пользователя на странице профиля.*/
        setEditMode(false);
        if (status) { /*Здесь делаем дополнительную проверку на наличие статуса для целей типизации типизации.*/
            updateUserStatus(status)
        } else { /*Если же статус отсутствует, то выводим ошибку в консоль.*/
            console.error('Status should exist ')
        };
    };

    const onUserStatusChange = (event: ChangeEvent<HTMLInputElement>) => { /*Создали специальный метод
    "onUserStatusChange", который будет вызываться при изменении поля "input", брать текущее значение содержимого этого
    поля и сохранять его в локальный "state" при помощи хука "useState". Для события "event" указали тип
    "ChangeEvent<HTMLInputElement>"*/
        setStatus(event.currentTarget.value)
    };

    const handleFocus = (event: ChangeEvent<HTMLInputElement>) => { /*Создали специальный метод "handleFocus" для
    автоматического выделения текста в поле статуса пользователя. Для события "event" указали тип
    "ChangeEvent<HTMLInputElement>"*/
        event.target.select();
    };

    /*
    Здесь после return в компоненте начинается HTML разметка.
    Нужно помнить, что в этой разметке должен быть только один корневой элемент.
    Поскольку то, что возвращает return указано с новой строки, поэтому все возвращаемое помещено в круглые скобки.
    */
    return (
        <div> {/*Этот элемент "div" и есть наш корневой элемент.*/}
            {!editMode && /*Если режим редактирования статуса пользователя отключен и мы являемся владельцем страницы,
            то отрисуется элемент "div", внутри которого будет элемент "span", содержащий обработчик события двойного
            нажатия по элементу "onDoubleClick". При срабатывании этого события активируется метод "activateEditMode"
            через callback, чтобы активировать режим редактирования статуса пользователя. Внутри элемента "span"
            будет отображаться текущее значение статуса пользователя из "props", а при его отсуствии будет надпись
            "Enter your status". Если мы же не являемся владельцем профиля, то мы не сможем перейти в режим
            редактирования, только увидеть сам статус. Здесь есть небольшая проблема - после ввода нового статуса
            какое-то время будет отображен старый статус, пока не завершится запрос на сервер на изменение
            этого статуса. Одним из вариантов решений этой проблемы может быть добавление заглушки "Preloader" на время
            пока идет запрос.*/
            <div>
                {isOwner
                    ? <div><b>Status</b>: <span onDoubleClick={activateEditMode}>{props.status || 'Enter your status'}</span></div>
                    : <span>{props.status || ''}</span>
                }
            </div>
            }

            {editMode && /*Если режим редактирования статуса пользователя включен, то
            отрисуется элемент "div", внутри которого будет элемент "input", содержащий обработчик события потери фокуса
            с элемента "onBlur". При срабатывании этого события активируется метод "deactivateEditMode"
            через callback, чтобы деактивировать режим редактирования статуса пользователя и сохранить новый статус
            в глобальном "state". Также у элемента "input" указан атрибут "autoFocus" для автоматического фокуса
            на элементе. Внутри элемента "input" будет отображаться текущее значение статуса пользователя при помощи
            атрибута "value" из локального "state" при помощи хука "useState". Также внутри элемента "input" содержится
            обработчик события появления фокуса на элементе "onFocus", при срабатывании которого активируется
            метод "handleFocus" через callback, чтобы автоматически выделить текст статуса пользователя. Еще внутри
            элемента "input" содержится обработчик события изменения поля "input" "onChange", при срабатывании которого
            активируется метод "onUserStatusChange" через callback, чтобы брать текущее значение содержимого
            этого поля и сохранять его в локальный "state" при помощи хука "useState".*/
            <div>
                <input onChange={onUserStatusChange}
                       onFocus={handleFocus}
                       autoFocus={true}
                       onBlur={deactivateEditMode}
                       value={status as string}/> {/*Поскольку в нашей типизации указано, что статус может быть "null",
                       то тут нам пришлось указать, что он всегда воспринимался как строка при помощи "as string".*/}
            </div>
            }
        </div>
    );
};


export default ProfileStatusWithHooks; /*Экспортируем компонент "ProfileStatusWithHooks" по default и будем его
использовать в нашем проекте под именем "ProfileStatusWithHooks", экспорт необходим для импорта.*/