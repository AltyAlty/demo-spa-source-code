import React from 'react';
import styles from './UserInfo.module.css';
/*Импортируем компонент "Preloader".*/
import {Preloader} from '../../../common/Preloader/Preloader';
/*Импортируем компонент "Timer".*/
import {Timer} from './Timer/Timer';
/*Импортируем тип "selectedGitHubUserDetailsType".*/
import {selectedGitHubUserDetailsType} from '../UseEffectTheory';

type PropsType = {
    /*Детали профиля выбранного пользователя GitHub должны быть типа "selectedGitHubUserDetailsType" или null.*/
    selectedGitHubUserDetails: selectedGitHubUserDetailsType | null
    /*Callback-функция для установки деталей профиля выбранного пользователя GitHub, которая принимает параметр типа
    "selectedGitHubUserDetailsType" или null, и ничего не возвращает.*/
    setSelectedGitHubUserDetails: (selectedGitHubUserDetails: selectedGitHubUserDetailsType | null) => void
    /*Значение, показывающее идет ли сейчас запрос профиля выбранного пользователей GitHub или нет, должно быть булева
    типа.*/
    isRequestingSelectedGitHubUserDetails: boolean
};

/*"UserInfo" это функциональный компонент, который создан в виде стрелочной функции. "UserInfo" является компонентом,
который используется для вывода деталей профиля выбранного нами пользователя GitHub.

Внутри компонента "UserInfo" используются следующие компоненты:
1. "Preloader" - компонент-заглушкой, который используется, чтобы воспроизводить анимацию загрузки в других компонентах,
пока идет какой-то фоновой процесс (например, AJAX-запрос). Импортирован.
2. "Timer" - компонент, который используется для отображения таймера для просмотра профиля пользователя GitHub.
Импортирован.

Компонент "UserInfo" импортируется в файле "UseEffectTheory.tsx".*/
export const UserInfo: React.FC<PropsType> = ({
                                                  selectedGitHubUserDetails,
                                                  setSelectedGitHubUserDetails,
                                                  isRequestingSelectedGitHubUserDetails
                                              }) => {
    console.log('RENDERING THE PROFILE');
    /*Пока идет запрос профиля выбранного пользователей GitHub, мы будем показывать компонент-заглушку "Preloader".*/
    if (isRequestingSelectedGitHubUserDetails) return <Preloader/>;

    return (
        <div className={styles.userInfo}>
            {/*Если есть данные профиля выбранного пользователя GitHub, тогда выводим эти данные.*/}
            {selectedGitHubUserDetails && <div>
                {/*Отрисовываем компонент "Timer" и передаем в него детали профиля выбранного пользователя GitHub
                "selectedGitHubUserDetails", callback-функцию "setSelectedGitHubUserDetails()" для установки деталей
                профиля выбранного пользователя GitHub, и "timerKey" - ID выбранного пользователя GitHub.*/}
                <Timer
                    selectedGitHubUserDetails={selectedGitHubUserDetails}

                    setSelectedGitHubUserDetails={(selectedGitHubUserDetails: selectedGitHubUserDetailsType | null) => {
                        setSelectedGitHubUserDetails(selectedGitHubUserDetails);
                    }}

                    timerKey={selectedGitHubUserDetails.id}
                />

                GitHub profile: {selectedGitHubUserDetails.login}
                <br/>
                ID: {selectedGitHubUserDetails.id}
                <br/>
                Followers: {selectedGitHubUserDetails.followers}
                <br/>
                <img src={selectedGitHubUserDetails.avatar_url} alt={'avatar'}/>
            </div>}
        </div>
    );
};