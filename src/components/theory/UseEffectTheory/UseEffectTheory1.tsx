import React, {useState, useEffect} from 'react';
import axios from 'axios';
import styles from './UseEffectTheory.module.css';

type PropsType = {};

/*Создаем тип для выбранного пользователя GitHub.*/
type SelectedGitHubUserType = {
    login: string
    id: number
};

/*Создаем тип для данных, которые будем получать в ответ на запрос пользователей GitHub.*/
type GitHubSearchResult = {
    items: SelectedGitHubUserType[]
};

/*Создаем тип для данных, которые будем получать в ответ на запрос деталей профиля выбранного пользователя GitHub.*/
type selectedGitHubUserDetailsType = {
    login: string
    id: number
    avatar_url: string
    followers: number
};

/*"UseEffectTheory1" это функциональный компонент, который создан в виде стрелочной функции. "UseEffectTheory1" является
компонентом, который используется для рассмотрения работы хука "useEffect()" из React. Является аналогом компонента
"UseEffectTheory".

Компонент "UseStateTheory1" импортируется в файле "App.tsx".*/
export const UseEffectTheory1: React.FC<PropsType> = (props) => {
    /*При помощи деструктуризирующего присваивания создаем две переменные. Первая переменная будет хранить первый
    элемент из хука "useState()", этот элемент будет означать выбранного пользователя GitHub (изначально никого не
    выбрано), должен быть типа "SelectedGitHubUserType" или отсутствовать. Вторая переменная будет хранить функцию из
    хука "useState()", которая будет изменять первый элемент (то есть указывать какой пользователь GitHub является
    выбранным).*/
    const [selectedGitHubUser, setSelectedGitHubUser] = useState<SelectedGitHubUserType | null>(null);

    /*При помощи деструктуризирующего присваивания создаем две переменные. Первая переменная будет хранить первый
    элемент из хука "useState()", этот элемент будет означать детали профиля выбранного пользователя GitHub (изначально
    отсутствуют), должен быть типа "selectedGitHubUserDetailsType" или отсутствовать. Вторая переменная будет хранить
    функцию из хука "useState()", которая будет изменять первый элемент (то есть указывать детали профиля выбранного
    пользователя GitHub).*/
    const [selectedGitHubUserDetails, setSelectedGitHubUserDetails] =
        useState<selectedGitHubUserDetailsType | null>(null);

    /*При помощи деструктуризирующего присваивания создаем две переменные. Первая переменная будет хранить первый
    элемент из хука "useState()", этот элемент будет означать массив с пользователями GitHub (изначально пустой), должен
    быть типа массива элементов с типом "SelectedGitHubUserType". Вторая переменная будет хранить функцию из хука
    "useState()", которая будет изменять первый элемент (то есть указывать массив с пользователями GitHub).*/
    const [gitHubUsers, setGitHubUsers] = useState<SelectedGitHubUserType[]>([]);
    /*При помощи деструктуризирующего присваивания создаем две переменные. Первая переменная будет хранить первый
    элемент из хука "useState()", этот элемент будет означать то, что введено в данным момент в строку поиска
    пользователей GitHub (изначально введено "alty") для осуществления FLUX-круговорота в этой строке поиска. Вторая
    переменная будет хранить функцию из хука "useState()", которая будет изменять первый элемент (то есть указывать, что
    должно быть введено в строку поиска пользователей GitHub).*/
    const [localSearchTerm, setLocalSearchTerm] = useState('alty');
    /*При помощи деструктуризирующего присваивания создаем две переменные. Первая переменная будет хранить первый
    элемент из хука "useState()", этот элемент будет означать текст, по которому будет отправлен запрос поиска
    пользователей GitHub (изначально "alty"). Вторая переменная будет хранить функцию из хука "useState()", которая
    будет изменять первый элемент (то есть указывать текст, по которому будет отправлен запрос поиска пользователей
    GitHub).*/
    const [gitHubSearchTerm, setGitHubSearchTerm] = useState('alty');

    /*Используем хук "useEffect()", чтобы синхронизировать логин выбранного пользователя GitHub и заголовок страницы.*/
    useEffect(
        /*Первый параметр это функция для изменения заголовка страницы.*/
        () => { if (selectedGitHubUser) document.title = selectedGitHubUser.login },
        /*Второй параметр это выбранный пользователя GitHub из хука "useState()". Если это значение будет меняться, то
        будет срабатывать каждый раз функция из первого параметра.*/
        [selectedGitHubUser]
    );

    /*Используем хук "useEffect()", чтобы при каждом изменении текста, по которому будет отправлен запрос поиска
    пользователей GitHub, вызывать такой запрос.*/
    useEffect(
        /*Первый параметр это функция для запроса поиска пользователей GitHub.*/
        () => {
            axios
                .get<GitHubSearchResult>(`https://api.github.com/search/users?q=${gitHubSearchTerm}`)
                .then(response => setGitHubUsers(response.data.items));
        },
        /*Второй параметр это текст, по которому будет отправлен запрос поиска пользователей GitHub, из хука
        "useState()". Если это значение будет меняться, то будет срабатывать каждый раз функция из первого параметра.*/
        [gitHubSearchTerm]
    );

    /*Используем хук "useEffect()", чтобы при выборе пользователя GitHub вызывать запрос на получение его профиля.*/
    useEffect(
        /*Первый параметр это функция для запроса на получение профиля пользователя GitHub.*/
        () => {
            if (selectedGitHubUser) {
                axios
                    .get<selectedGitHubUserDetailsType>(`https://api.github.com/users/${selectedGitHubUser.login}`)
                    .then(response => setSelectedGitHubUserDetails(response.data));
            }
        },
        /*Второй параметр это выбранный пользователя GitHub из хука "useState()". Если это значение будет меняться, то
        будет срабатывать каждый раз функция из первого параметра.*/
        [selectedGitHubUser]
    );

    return (
        <div className={styles.wholeGitHubSearch}>
            <div className={styles.userList}>
                <div className={styles.searchUsersArea}>
                    <input
                        className={styles.searchUsersAreaInput}
                        placeholder='Enter a GitHub username'
                        /*Это поле берет значение из "localSearchTerm" из хука "useState()". Мы не можем напрямую ввести
                        в это поле текст, только через FLUX-круговорот.*/
                        value={localSearchTerm}
                        /*При изменении нами текста в поле будет вызываться "setLocalSearchTerm" из хука "useState()",
                        чтобы осуществлять FLUX-круговорот текста в этом поле.*/
                        onChange={(e) => {setLocalSearchTerm(e.currentTarget.value)}}
                    />

                    <button
                        className={styles.searchUsersAreaButton}
                        /*При нажатии на эту кнопку при помощи функции "setGitHubSearchTerm()" из хука "useState()" мы
                        устанавливаем текст, по которому будет отправлен запрос поиска пользователей GitHub. Будет
                        подхватываться из "localSearchTerm" из хука "useState()".*/
                        onClick={() => { setGitHubSearchTerm(localSearchTerm) }}>
                        Find
                    </button>
                </div>

                <ul className={styles.searchUsersAreaResults}>
                    {/*Мапим массив с пользователями GitHub, чтобы вывести эти пользователей списком.*/}
                    {gitHubUsers
                        .map(u =>
                            <li key={u.id}
                                /*Если какой-то пользователь GitHub в списке совпадает с выбранным нами пользователем
                                GitHub, то применяем к этому элементу списка дополнительный стиль.*/
                                className={selectedGitHubUser === u ? styles.selectedUser : ''}
                                /*При нажатии на элемент списка при помощи функции "setSelectedGitHubUser()" из хука
                                "useState()" мы указываем выбранного пользователя GitHub.*/
                                onClick={() => { setSelectedGitHubUser(u) }}>
                                {u.login}
                            </li>)}
                </ul>
            </div>

            <div className={styles.userInfo}>
                {/*Если есть данные профиля выбранного пользователя GitHub, тогда выводим эти данные.*/}
                {selectedGitHubUserDetails && <div>
                    GitHub profile: {selectedGitHubUserDetails.login}
                    <br/>
                    ID: {selectedGitHubUserDetails.id}
                    <br/>
                    Followers: {selectedGitHubUserDetails.followers}
                    <br/>
                    <img src={selectedGitHubUserDetails.avatar_url} alt={'avatar'}/>
                </div>}
            </div>
        </div>
    );
};