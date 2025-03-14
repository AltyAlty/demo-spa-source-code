import React, {useState, useEffect} from 'react';
import axios from 'axios';
import styles from './SearchUsersArea.module.css';
/*Импортируем типы "SelectedGitHubUserType", "GitHubSearchResult" и "selectedGitHubUserDetailsType".*/
import {SelectedGitHubUserType, GitHubSearchResult, selectedGitHubUserDetailsType} from '../UseEffectTheory';

type PropsType = {
    /*Callback-функция для установки массива с пользователями GitHub, которая принимает массив с элементами типа
    "SelectedGitHubUserType" и ничего не возвращает.*/
    setGitHubUsers: (gitHubUsers: SelectedGitHubUserType[]) => void
    /*Callback-функция для установки деталей профиля выбранного пользователя GitHub, которая принимает параметр типа
    "selectedGitHubUserDetailsType" или null, и ничего не возвращает.*/
    setSelectedGitHubUserDetails: (selectedGitHubUserDetails: selectedGitHubUserDetailsType | null) => void
    /*Детали профиля выбранного пользователя GitHub должны быть типа "selectedGitHubUserDetailsType" или null.*/
    selectedGitHubUserDetails: selectedGitHubUserDetailsType | null
    /*Callback-функция для установки значения, показывающего идет ли сейчас запрос пользователей GitHub или нет, которая
    принимает параметр булева типа и ничего не возвращает.*/
    setIsRequestingGitHubUsers: (isRequestingGitHubUsers: boolean) => void
};

/*"SearchUsersArea" это функциональный компонент, который создан в виде стрелочной функции. "SearchUsersArea" является
компонентом, используемым для создания поля для ввода текста, по которому будет осуществляться поиск пользователя
GitHub.

Компонент "SearchUsersArea" импортируется в файле "UseEffectTheory".*/
export const SearchUsersArea: React.FC<PropsType> = ({
                                                         setGitHubUsers,
                                                         setSelectedGitHubUserDetails,
                                                         selectedGitHubUserDetails,
                                                         setIsRequestingGitHubUsers
                                                     }) => {
    console.log('RENDERING THE SEARCH AREA');
    /*Изначальный текст для поиска.*/
    const initialSearchText = 'alty';
    /*Текст №1 для поиска после сброса.*/
    const resetSearchText = 'Enter something';
    /*Текст №2 для поиска после сброса.*/
    const resetSearchText2 = 'Enter something';
    /*Изначальное имя вкладки.*/
    const initialTabName = 'React App';
    /*При помощи деструктуризирующего присваивания создаем две переменные. Первая переменная будет хранить первый
    элемент из хука "useState()", этот элемент будет означать то, что введено в данным момент в строку поиска
    пользователей GitHub (изначально берется из переменной "initialSearchText") для осуществления FLUX-круговорота в
    этой строке поиска. Вторая переменная будет хранить функцию из хука "useState()", которая будет изменять первый
    элемент (то есть указывать, что должно быть введено в строку поиска пользователей GitHub).*/
    const [localSearchTerm, setLocalSearchTerm] = useState(initialSearchText);
    /*При помощи деструктуризирующего присваивания создаем две переменные. Первая переменная будет хранить первый
    элемент из хука "useState()", этот элемент будет означать текст, по которому будет отправлен запрос поиска
    пользователей GitHub (изначально берется из переменной "initialSearchText"). Вторая переменная будет хранить функцию
    из хука "useState()", которая будет изменять первый элемент (то есть указывать текст, по которому будет отправлен
    запрос поиска пользователей GitHub).*/
    const [gitHubSearchTerm, setGitHubSearchTerm] = useState(initialSearchText);

    /*Используем хук "useEffect()", чтобы при каждом изменении текста, по которому будет отправлен запрос поиска
    пользователей GitHub, вызывать такой запрос.*/
    useEffect(
        /*Первый параметр это функция для запроса поиска пользователей GitHub.*/
        () => {
            console.log('REQUESTING USERS');
            /*Указываем, что идет запрос пользователей GitHub, чтобы в компоненте "SearchUsersAreaResults" отобразить
            компонент-заглушку "Preloader" пока запрос не завершится.*/
            setIsRequestingGitHubUsers(true);

            axios
                .get<GitHubSearchResult>(`https://api.github.com/search/users?q=${gitHubSearchTerm}`)
                .then(response => {
                    setGitHubUsers(response.data.items);
                    /*Указываем, что запрос пользователей GitHub больше не идет, чтобы в компоненте
                    "SearchUsersAreaResults" отключить компонент-заглушку "Preloader".*/
                    setIsRequestingGitHubUsers(false);
                });
        },
        /*Второй параметр это текст, по которому будет отправлен запрос поиска пользователей GitHub, из хука
        "useState()". Если это значение будет меняться, то будет срабатывать каждый раз функция из первого параметра.*/
        [gitHubSearchTerm]
    );

    return (
        <div className={styles.searchUsersArea}>
            <input
                className={styles.searchUsersAreaInput}
                placeholder='Enter a GitHub username'
                /*Это поле берет значение из "localSearchTerm" из хука "useState()". Мы не можем напрямую ввести в это
                поле текст, только через FLUX-круговорот.*/
                value={localSearchTerm}
                /*При изменении нами текста в поле будет вызываться функция "setLocalSearchTerm()" из хука "useState()",
                чтобы осуществлять FLUX-круговорот текста в этом поле.*/
                onChange={(e) => { setLocalSearchTerm(e.currentTarget.value) }}
            />

            <button
                className={styles.searchUsersAreaButton}
                /*При нажатии на эту кнопку при помощи функции "setGitHubSearchTerm()" из хука "useState()" мы
                устанавливаем текст, по которому будет отправлен запрос поиска пользователей GitHub. Будет
                подхватываться из "localSearchTerm" из хука "useState()".*/
                onClick={() => { setGitHubSearchTerm(localSearchTerm) }}>
                Find
            </button>

            <button className={styles.searchUsersAreaResetButton}
                    onClick={() => {
                        /*При нажатии на эту кнопку при помощи функции "setGitHubSearchTerm()" из хука "useState()" мы
                        устанавливаем текст, по которому будет отправлен запрос поиска пользователей GitHub. Нужно для
                        сброса текста, который указан в переменной "resetSearchText2".*/
                        setGitHubSearchTerm(resetSearchText2);
                        /*При нажатии на эту кнопку при помощи функции "setLocalSearchTerm()" из хука "useState()" мы
                        устанавливаем текст, который будет введен в поле ввода текста и по нему в дальнейшем будет
                        запрос поиска пользователей GitHub. Нужно для сброса текста, который указан в переменной
                        "resetSearchText".*/
                        setLocalSearchTerm(resetSearchText);
                        /*При нажатии на эту кнопку при помощи функции "setSelectedGitHubUserDetails()" из хука
                        "useState()" мы сбрасываем детали профиля выбранного пользователя GitHub.*/
                        if (selectedGitHubUserDetails !== null) setSelectedGitHubUserDetails(null);
                        /*При нажатии на эту кнопку сбрасываем заголовок страницы.*/
                        document.title = initialTabName;
                        /*При нажатии на эту кнопку при помощи функции "setGitHubUsers*()" из хука "useState()" мы
                        сбрасываем массив с пользователями GitHub, чтобы очистить список.*/
                        setGitHubUsers([]);
                    }}>
                Reset
            </button>
        </div>
    );
};