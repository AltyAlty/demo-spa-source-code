import React, {useState, useEffect} from 'react';
import axios from 'axios';
import styles from './SearchUsersAreaResults.module.css';
/*Импортируем компонент "Preloader".*/
import {Preloader} from '../../../common/Preloader/Preloader';
/*Импортируем типы "SelectedGitHubUserType" и "selectedGitHubUserDetailsType".*/
import {SelectedGitHubUserType, selectedGitHubUserDetailsType} from '../UseEffectTheory';

type PropsType = {
    /*Массив с пользователями GitHub должен быть массивом с элементами типа "SelectedGitHubUserType".*/
    gitHubUsers: SelectedGitHubUserType[]
    /*Callback-функция для установки деталей профиля выбранного пользователя GitHub, которая принимает параметр типа
    "selectedGitHubUserDetailsType" или null, и ничего не возвращает.*/
    setSelectedGitHubUserDetails: (selectedGitHubUserDetails: selectedGitHubUserDetailsType | null) => void
    /*Значение, показывающее идет ли сейчас запрос пользователей GitHub или нет, должно быть булева типа.*/
    isRequestingGitHubUsers: boolean
    /*Callback-функция для установки значения, показывающего идет ли сейчас запрос профиля выбранного пользователей
    GitHub или нет, которая принимает параметр булева типа и ничего не возвращает.*/
    setIsRequestingSelectedGitHubUserDetails: (isRequestingSelectedGitHubUserDetails: boolean) => void
};

/*"SearchUsersAreaResults" это функциональный компонент, который создан в виде стрелочной функции.
"SearchUsersAreaResults" является компонентом, который используется для вывода списка пользователей GitHub.

Внутри компонента "SearchUsersAreaResults" используются следующие компоненты:
1. "Preloader" - компонент-заглушкой, который используется, чтобы воспроизводить анимацию загрузки в других компонентах,
пока идет какой-то фоновой процесс (например, AJAX-запрос). Импортирован.

Компонент "SearchUsersAreaResults" импортируется в файле "UseEffectTheory.tsx".*/
export const SearchUsersAreaResults: React.FC<PropsType> = ({
                                                                gitHubUsers,
                                                                setSelectedGitHubUserDetails,
                                                                isRequestingGitHubUsers,
                                                                setIsRequestingSelectedGitHubUserDetails
                                                            }) => {
    console.log('RENDERING THE SEARCH AREA RESULTS');
    /*При помощи деструктуризирующего присваивания создаем две переменные. Первая переменная будет хранить первый
    элемент из хука "useState()", этот элемент будет означать выбранного пользователя GitHub (изначально никого не
    выбрано), должен быть типа "SelectedGitHubUserType" или отсутствовать. Вторая переменная будет хранить функцию из
    хука "useState()", которая будет изменять первый элемент (то есть указывать какой пользователь GitHub является
    выбранным).*/
    const [selectedGitHubUser, setSelectedGitHubUser] = useState<SelectedGitHubUserType | null>(null);

    /*Используем хук "useEffect()", чтобы синхронизировать логин выбранного пользователя GitHub и имени вкладки
    страницы.*/
    useEffect(
        /*Первый параметр это функция для изменения имени вкладки страницы.*/
        () => {
            console.log('UPDATING THE TITLE');
            if (selectedGitHubUser) document.title = selectedGitHubUser.login;
        },
        /*Второй параметр это выбранный пользователя GitHub из хука "useState()". Если это значение будет меняться, то
        будет срабатывать каждый раз функция из первого параметра.*/
        [selectedGitHubUser]
    );

    /*Используем хук "useEffect()", чтобы при выборе пользователя GitHub вызывать запрос на получение его профиля.*/
    useEffect(
        /*Первый параметр это функция для запроса на получение профиля пользователя GitHub.*/
        () => {
            console.log('REQUESTING THE PROFILE');

            if (selectedGitHubUser) {
                /*Указываем, что идет запрос профиля выбранного пользователей GitHub, чтобы в компоненте "UserInfo"
                отобразить компонент-заглушку "Preloader" пока запрос не завершится.*/
                setIsRequestingSelectedGitHubUserDetails(true);

                axios
                    .get<selectedGitHubUserDetailsType>(`https://api.github.com/users/${selectedGitHubUser.login}`)
                    .then(response => {
                        setSelectedGitHubUserDetails(response.data);
                        /*Указываем, что запрос профиля выбранного пользователей GitHub больше не идет, чтобы в
                        компоненте "UserInfo" отключить компонент-заглушку "Preloader".*/
                        setIsRequestingSelectedGitHubUserDetails(false);
                    });
            }
        },
        /*Второй параметр это выбранный пользователя GitHub из хука "useState()". Если это значение будет меняться, то
        будет срабатывать каждый раз функция из первого параметра.*/
        [selectedGitHubUser]
    );

    /*Пока идет запрос пользователей GitHub, показываем компонент "Preloader".*/
    if (isRequestingGitHubUsers) return <Preloader/>;

    return (
        <div>
            <ul className={styles.searchUsersAreaResults}>
                {/*Мапим массив с пользователями GitHub, чтобы вывести этих пользователей списком.*/}
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
    );
};