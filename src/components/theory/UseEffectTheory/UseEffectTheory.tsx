import React, {useState} from 'react';
import styles from './UseEffectTheory.module.css';
/*Импортируем компонент "SearchUsersArea".*/
import {SearchUsersArea} from './SearchUsersArea/SearchUsersArea';
/*Импортируем компонент "SearchUsersAreaResults".*/
import {SearchUsersAreaResults} from './SearchUsersAreaResults/SearchUsersAreaResults';
/*Импортируем компонент "UserInfo".*/
import {UserInfo} from './UserInfo/UserInfo';

type PropsType = {};

/*Создаем тип для выбранного пользователя GitHub.*/
export type SelectedGitHubUserType = {
    /*Логин пользователя GitHub должен быть строкой.*/
    login: string
    /*ID пользователя GitHub должно быть числом.*/
    id: number
};

/*Создаем тип для данных, которые будем получать в ответ на запрос пользователей GitHub.*/
export type GitHubSearchResult = {
    /*Массив с пользователями GitHub должен быть массивом с элементами типа "SelectedGitHubUserType".*/
    items: SelectedGitHubUserType[]
};

/*Создаем тип для данных, которые будем получать в ответ на запрос деталей профиля выбранного пользователя GitHub.*/
export type selectedGitHubUserDetailsType = {
    /*Логин пользователя GitHub должен быть строкой.*/
    login: string
    /*ID пользователя GitHub должно быть числом.*/
    id: number
    /*Ссылка на аватар пользователя GitHub должна быть строкой.*/
    avatar_url: string
    /*Количество подписчиков пользователя GitHub должно быть числом.*/
    followers: number
};

/*"UseEffectTheory" это функциональный компонент, который создан в виде стрелочной функции. "UseEffectTheory" является
компонентом, который используется для рассмотрения работы хука "useEffect()" из React. Здесь мы делаем форму для запроса
информации по пользователям GitHub, используя API GitHub.

Внутри компонента "UseEffectTheory" используются следующие компоненты:
1. "SearchUsersArea" - компонент, используемый для создания поля для ввода текста, по которому будет осуществляться
поиск пользователя GitHub. Импортирован.
2. "SearchUsersAreaResults" - компонент, который используется для вывода списка пользователей GitHub. Импортирован.
3. "UserInfo" - компонент, который используется для вывода деталей профиля выбранного нами пользователя GitHub.
Импортирован.

Компонент "UseEffectTheory" импортируется в файле "App.tsx".*/
export const UseEffectTheory: React.FC<PropsType> = (props) => {
    console.log('RENDERING THE WHOLE PAGE');
    /*При помощи деструктуризирующего присваивания создаем две переменные. Первая переменная будет хранить первый
    элемент из хука "useState()", этот элемент будет означать массив с пользователями GitHub (изначально пустой), должен
    быть типа массива элементов с типом "SelectedGitHubUserType". Вторая переменная будет хранить функцию из хука
    "useState()", которая будет изменять первый элемент (то есть указывать массив с пользователями GitHub).*/
    const [gitHubUsers, setGitHubUsers] = useState<SelectedGitHubUserType[]>([]);

    /*При помощи деструктуризирующего присваивания создаем две переменные. Первая переменная будет хранить первый
    элемент из хука "useState()", этот элемент будет означать детали профиля выбранного пользователя GitHub (изначально
    отсутствуют), должен быть типа "selectedGitHubUserDetailsType" или отсутствовать. Вторая переменная будет хранить
    функцию из хука "useState()", которая будет изменять первый элемент (то есть указывать детали профиля выбранного
    пользователя GitHub).*/
    const [selectedGitHubUserDetails, setSelectedGitHubUserDetails] =
        useState<selectedGitHubUserDetailsType | null>(null);

    /*При помощи деструктуризирующего присваивания создаем две переменные. Первая переменная будет хранить первый
    элемент из хука "useState()", этот элемент будет означать идет ли запрос пользователей GitHub (изначально false),
    должен быть булева типа. Вторая переменная будет хранить функцию из хука "useState()", которая будет изменять первый
    элемент (то есть указывать идет ли запрос пользователей GitHub).*/
    const [isRequestingGitHubUsers, setIsRequestingGitHubUsers] = useState<boolean>(false);

    /*При помощи деструктуризирующего присваивания создаем две переменные. Первая переменная будет хранить первый
    элемент из хука "useState()", этот элемент будет означать идет ли запрос профиля выбранного пользователей GitHub
    (изначально false), должен быть булева типа. Вторая переменная будет хранить функцию из хука "useState()", которая
    будет изменять первый элемент (то есть указывать идет ли запрос профиля выбранного пользователей GitHub).*/
    const [isRequestingSelectedGitHubUserDetails, setIsRequestingSelectedGitHubUserDetails] =
        useState<boolean>(false);

    return (
        <div className={styles.wholeGitHubSearch}>
            <div className={styles.userList}>
                {/*Отрисовываем компонент "SearchUsersArea" и передаем в него:
                1. callback-функцию "setGitHubUsers()" для установки массива с пользователями GitHub.
                2. callback-функцию "setSelectedGitHubUserDetails()" для установки деталей профиля выбранного
                пользователя GitHub.
                3. детали профиля выбранного пользователя GitHub "selectedGitHubUserDetails".
                4. callback-функцию "setIsRequestingGitHubUsers()" для установки значения, показывающего идет ли сейчас
                запрос пользователей GitHub или нет.*/}
                <SearchUsersArea
                    setGitHubUsers={(gitHubUsers: SelectedGitHubUserType[]) => { setGitHubUsers(gitHubUsers) }}

                    setSelectedGitHubUserDetails={(selectedGitHubUserDetails: selectedGitHubUserDetailsType | null) => {
                        setSelectedGitHubUserDetails(selectedGitHubUserDetails);
                    }}

                    selectedGitHubUserDetails={selectedGitHubUserDetails}

                    setIsRequestingGitHubUsers={(isRequestingGitHubUsers: boolean) => {
                        setIsRequestingGitHubUsers(isRequestingGitHubUsers);
                    }}
                />

                {/*Отрисовываем компонент "SearchUsersAreaResults" и передаем в него:
                1. массив с пользователями GitHub "gitHubUsers".
                2. callback-функцию "setSelectedGitHubUserDetails()" для установки деталей профиля выбранного
                пользователя GitHub.
                3. значение "isRequestingGitHubUsers", показывающее идет ли сейчас запрос пользователей GitHub или нет.
                4. callback-функцию "setIsRequestingSelectedGitHubUserDetails()" для установки значения, показывающего
                идет ли сейчас запрос профиля выбранного пользователей GitHub или нет.*/}
                <SearchUsersAreaResults
                    gitHubUsers={gitHubUsers}

                    setSelectedGitHubUserDetails={(selectedGitHubUserDetails: selectedGitHubUserDetailsType | null) => {
                        setSelectedGitHubUserDetails(selectedGitHubUserDetails);
                    }}

                    isRequestingGitHubUsers={isRequestingGitHubUsers}

                    setIsRequestingSelectedGitHubUserDetails={(isRequestingSelectedGitHubUserDetails: boolean) => {
                        setIsRequestingSelectedGitHubUserDetails(isRequestingSelectedGitHubUserDetails);
                    }}
                />
            </div>

            {/*Отрисовываем компонент "UserInfo" и передаем в него:
            1. детали профиля выбранного пользователя GitHub "selectedGitHubUserDetails".
            2. callback-функцию "setSelectedGitHubUserDetails()" для установки деталей профиля выбранного пользователя
            GitHub.
            3. значение "isRequestingSelectedGitHubUserDetails", показывающее идет ли сейчас запрос профиля выбранного
            пользователя GitHub или нет.*/}
            <UserInfo
                selectedGitHubUserDetails={selectedGitHubUserDetails}

                setSelectedGitHubUserDetails={(selectedGitHubUserDetails: selectedGitHubUserDetailsType | null) => {
                    setSelectedGitHubUserDetails(selectedGitHubUserDetails);
                }}

                isRequestingSelectedGitHubUserDetails={isRequestingSelectedGitHubUserDetails}
            />
        </div>
    );
};