import React from 'react';
/*
Подключаем сам "ReactJS", необходим везде, где мы что-то из него используем (например, JSX).
"WebPack" уже встроен в "ReactJS".
*/

import {Timer} from './Timer/Timer'; /*Подключаем компонент "Timer".*/

import {selectedGitHubUserDetailsType} from '../UseEffectTheory'; /*Импортируем типы.*/

import styles from './UserInfo.module.css';
import {Preloader} from "../../../common/Preloader/Preloader"; /*Подключаем стили из CSS-модуля.*/


/*Создаем тип для "props". "Props" в этом компоненте должны обязательно содержать следующие поля с указанными типами.
Все это нужно для указания типа "props" в функциональном компоненте.*/
type PropsType = {
    selectedGitHubUserDetails: selectedGitHubUserDetailsType | null /*Детали профиля выбранного пользователя GitHub
    должны быть типа "selectedGitHubUserDetailsType", который мы импортировали сюда, или "null".*/
    setSelectedGitHubUserDetails: (selectedGitHubUserDetails: selectedGitHubUserDetailsType | null) => void
    /*Callback-функция для установки деталей профиля выбранного пользователя GitHub, которая принимает параметр типа
    "selectedGitHubUserDetailsType", который мы сюда импортировали, или "null", и ничего не возвращает.*/
    isRequestingSelectedGitHubUserDetails: boolean /*Значение, которое показывает идет ли сейчас запрос профиля
    выбранного пользователей GitHub или нет, должно быть булева типа.*/
};


/*
"UserInfo" это функциональный компонент, который создан в виде стрелочной функции.
При взаимодействии с функциональным компонентом React не хранит его постоянно в памяти.
React вызывает функциональный компонент, он делает свою работу (например, возвращает JSX) и компонент удаляется
из памяти.
Функциональный компонент можно создать еще и таким образом: function UserInfo(props) {тело}.
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
"UserInfo" является компонентом, который используется для вывода деталей профиля выбранного нами пользователя GitHub.
Этот компонент подключается в компоненте "UseEffectTheory".
*/
export const UserInfo: React.FC<PropsType> = ({
                                                  selectedGitHubUserDetails,
                                                  setSelectedGitHubUserDetails,
                                                  isRequestingSelectedGitHubUserDetails
                                              }) => { /*При помощи деструктуризации "props" указываем какие именно
"props" мы получаем, чтобы не писать далее "props.selectedGitHubUserDetails" и так далее. Такое мы делаем только в
функциональных компонентах. Указали при помощи "React.FC<>", что "props" в этом функциональном компоненте имеют тип
"PropsType". Также указали, что экспортируем этот компонент.*/

    console.log('RENDERING PROFILE');

    if (isRequestingSelectedGitHubUserDetails) { /*Пока идет запрос профиля выбранного пользователей GitHub, мы будем
    показывать компонент "Preloader".*/
        return <Preloader/>
    };

    /*
    Здесь после return в компоненте начинается HTML разметка.
    Нужно помнить, что в этой разметке должен быть только один корневой элемент.
    Поскольку то, что возвращает return указано с новой строки, поэтому все возвращаемое помещено в круглые скобки.
    */
    return (
        <div className={styles.userInfo}> {/*Этот элемент "div" и есть наш корневой элемент.*/}
            {selectedGitHubUserDetails && <div> {/*Если есть данные профиля выбранного пользователя GitHub, тогда
            выводим эти данные.*/}
                <Timer
                    selectedGitHubUserDetails={selectedGitHubUserDetails}

                    setSelectedGitHubUserDetails={(selectedGitHubUserDetails: selectedGitHubUserDetailsType | null) => {
                        setSelectedGitHubUserDetails(selectedGitHubUserDetails)
                    }}

                    timerKey={selectedGitHubUserDetails.id}
                /> {/*Отрисовываем компонент "Timer" и передаем в него детали профиля выбранного пользователя GitHub
                "selectedGitHubUserDetails", callback-функцию "setSelectedGitHubUserDetails" для установки деталей
                профиля выбранного пользователя GitHub и "timerKey" - ID выбранного пользователя GitHub.*/}

                GitHub profile: {selectedGitHubUserDetails.login}
                <br/>
                ID: {selectedGitHubUserDetails.id}
                <br/>
                Followers: {selectedGitHubUserDetails.followers}
                <br/>
                <img src={selectedGitHubUserDetails.avatar_url}/>
            </div>}
        </div>
    );
};