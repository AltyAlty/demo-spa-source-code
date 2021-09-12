import React, {useState} from 'react';
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
Нужно помнить, что если наш JSX в компоненте не зависит от хука "useState", то нежелательно хранить какие-то данные в
таком хуке "useState".
При вызове нескольких вторых элементов из нескольких хуков "useState" в асинхронных операциях (например, в запросах на
сервер), нужно обращать внимание на порядок этих вторых элементов из нескольких хуков "useState".
*/

import {SearchUsersArea} from './SearchUsersArea/SearchUsersArea';
/*Подключаем компонент "SearchUsersArea".*/
import {SearchUsersAreaResults} from './SearchUsersAreaResults/SearchUsersAreaResults'; /*Подключаем компонент
"SearchUsersAreaResults".*/
import {UserInfo} from './UserInfo/UserInfo';
/*Подключаем компонент "UserInfo".*/

import styles from './UseEffectTheory.module.css'; /*Подключаем стили из CSS-модуля.*/


/*Создаем тип для "props". "Props" в этом компоненте должны обязательно содержать следующие поля с указанными типами.
Все это нужно для указания типа "props" в функциональном компоненте.*/
type PropsType = {};

/*Создали тип для выбранного пользователя GitHub.*/
export type SelectedGitHubUserType = {
    login: string /*Логин пользователя GitHub должен быть строкой.*/
    id: number /*ID пользователя GitHub должно быть числом.*/
};

/*Создали тип для данных, которые будем получать в ответ на запрос пользователей GitHub.*/
export type GitHubSearchResult = {
    items: SelectedGitHubUserType[] /*Массив с пользователями GitHub должен быть массивом с эллементами типа
    "SelectedGitHubUserType".*/
};

/*Создали тип для данных, которые будем получать в ответ на запрос деталей профиля выбранного пользователя GitHub.*/
export type selectedGitHubUserDetailsType = {
    login: string /*Логин пользователя GitHub должен быть строкой.*/
    id: number /*ID пользователя GitHub должно быть числом.*/
    avatar_url: string /*Ссылка на аватар пользователя GitHub должна быть строкой.*/
    followers: number /*Количество подписчиков пользователя GitHub должно быть числом.*/
};

/*
"UseEffectTheory" это функциональный компонент, который создан в виде стрелочной функции.
При взаимодействии с функциональным компонентом React не хранит его постоянно в памяти.
React вызывает функциональный компонент, он делает свою работу (например, возвращает JSX) и компонент удаляется
из памяти.
Функциональный компонент можно создать еще и таким образом: function UseEffectTheory(props) {тело}.
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
"UseEffectTheory" является компонентом, который используется для рассмотра работы хука "useEffect" из "ReactJS". В
данном случае мы делаем форму для запроса информации по пользователям GitHub, используя API GitHub.
Этот компонент подключается в компоненте "App".
*/
export const UseEffectTheory: React.FC<PropsType> = (props) => { /*Указали при помощи
"React.FC<>", что "props" в этом функциональном компоненте имеют тип "PropsType". Также указали, что экспортируем этот
компонент.*/

    console.log('RENDERING WHOLE PAGE');

    let [gitHubUsers, setGitHubUsers] = useState<SelectedGitHubUserType[]>([]); /*При помощи
    деструктуризирующего присваивания создали две переменные. Первая переменная будет хранить первый элемент из хука
    "useState", этот элемент будет означать массив с пользователями GitHub (изначально пустой), должен быть типа
    массива элементов с типом "SelectedGitHubUserType". Вторая переменная будет хранить функцию из хука "useState",
    которая будет изменять первый элемент (то есть указывать массив с пользователями GitHub).*/

    let [selectedGitHubUserDetails, setSelectedGitHubUserDetails] =
        useState<selectedGitHubUserDetailsType | null>(null); /*При помощи деструктуризирующего присваивания
    создали две переменные. Первая переменная будет хранить первый элемент из хука "useState", этот элемент будет
    означать детали профиля выбранного пользователя GitHub (изначально отсутствуют), должен быть типа
    "selectedGitHubUserDetailsType" или отсутствовать. Вторая переменная будет хранить функцию из хука "useState",
    которая будет изменять первый элемент (то есть указывать детали профиля выбранного пользователя GitHub).*/

    let [isRequestingGitHubUsers, setIsRequestingGitHubUsers] = useState<boolean>(false); /*При помощи
    деструктуризирующего присваивания создали две переменные. Первая переменная будет хранить первый элемент из хука
    "useState", этот элемент будет означать идет ли запрос пользователей GitHub (изначально false), должен быть булева
    типа. Вторая переменная будет хранить функцию из хука "useState", которая будет изменять первый элемент (то есть
    указывать идет ли запрос пользователей GitHub).*/

    let [isRequestingSelectedGitHubUserDetails, setIsRequestingSelectedGitHubUserDetails] =
        useState<boolean>(false); /*При помощи деструктуризирующего присваивания создали две переменные. Первая
    переменная будет хранить первый элемент из хука "useState", этот элемент будет означать идет ли запрос профиля
    выбранного пользователей GitHub (изначально false), должен быть булева типа. Вторая переменная будет хранить функцию
    из хука "useState", которая будет изменять первый элемент (то есть указывать идет ли запрос профиля выбранного
    пользователей GitHub).*/

    /*
    Здесь после return в компоненте начинается HTML разметка.
    Нужно помнить, что в этой разметке должен быть только один корневой элемент.
    Поскольку то, что возвращает return указано с новой строки, поэтому все возвращаемое помещено в круглые скобки.
    */
    return (
        <div className={styles.wholeGitHubSearch}> {/*Этот элемент "div" и есть наш корневой элемент.*/}
            <div className={styles.userList}>
                <SearchUsersArea
                    setGitHubUsers={(gitHubUsers: SelectedGitHubUserType[]) => {
                        setGitHubUsers(gitHubUsers)
                    }}

                    setSelectedGitHubUserDetails={(selectedGitHubUserDetails: selectedGitHubUserDetailsType | null) => {
                        setSelectedGitHubUserDetails(selectedGitHubUserDetails)
                    }}

                    selectedGitHubUserDetails={selectedGitHubUserDetails}

                    setIsRequestingGitHubUsers={(isRequestingGitHubUsers: boolean) => {
                        setIsRequestingGitHubUsers(isRequestingGitHubUsers)
                    }}
                /> {/*Отрисовываем компонент "SearchUsersArea" и передаем в него:
                1. callback-функцию "setGitHubUsers" для установки массива с пользователями GitHub;
                2. callback-функцию "setSelectedGitHubUserDetails" для установки деталей профиля выбранного пользователя
                GitHub;
                3. детали профиля выбранного пользователя GitHub "selectedGitHubUserDetails";
                4. callback-функцию "setIsRequestingGitHubUsers" для установки значения, которое показывает идет ли
                сейчас запрос пользователей GitHub или нет.*/}

                <SearchUsersAreaResults
                    gitHubUsers={gitHubUsers}

                    setSelectedGitHubUserDetails={(selectedGitHubUserDetails: selectedGitHubUserDetailsType | null) => {
                        setSelectedGitHubUserDetails(selectedGitHubUserDetails)
                    }}

                    isRequestingGitHubUsers={isRequestingGitHubUsers}

                    setIsRequestingSelectedGitHubUserDetails={(isRequestingSelectedGitHubUserDetails: boolean) => {
                        setIsRequestingSelectedGitHubUserDetails(isRequestingSelectedGitHubUserDetails)
                    }}
                /> {/*Отрисовываем компонент "SearchUsersAreaResults" и передаем в него:
                1. массив с пользователями GitHub "gitHubUsers";
                2. callback-функцию "setSelectedGitHubUserDetails" для установки деталей профиля выбранного пользователя
                GitHub;
                3. значение "isRequestingGitHubUsers", которое показывает идет ли сейчас запрос пользователей GitHub или
                нет;
                4. callback-функцию "setIsRequestingSelectedGitHubUserDetails" для установки значения, которое
                показывает идет ли сейчас запрос профиля выбранного пользователей GitHub или нет.*/}
            </div>

            <UserInfo
                selectedGitHubUserDetails={selectedGitHubUserDetails}

                setSelectedGitHubUserDetails={(selectedGitHubUserDetails: selectedGitHubUserDetailsType | null) => {
                    setSelectedGitHubUserDetails(selectedGitHubUserDetails)
                }}

                isRequestingSelectedGitHubUserDetails={isRequestingSelectedGitHubUserDetails}
            /> {/*Отрисовываем компонент "UserInfo" и передаем в него:
            1. детали профиля выбранного пользователя GitHub "selectedGitHubUserDetails";
            2. callback-функцию "setSelectedGitHubUserDetails" для установки деталей профиля выбранного пользователя
            GitHub;
            3. значение "isRequestingSelectedGitHubUserDetails", которое показывает идет ли сейчас запрос профиля
            выбранного пользователей GitHub или нет.*/}
        </div>
    );
};