/*
Это файл с тестами для "profile-reducer.ts".
Тесты в "TDD" пишутся заранее, чтобы программа им соответствовала.
Тесты обязуют нас писать правильно структурированную программу.
Тесты работают точечно, то есть нам не надо каждый раз запускать программу полностью, чтобы ее протестировать.
Unit-тесты тестируют отдельные части приложения (например, модули, компоненты, функции, селекторы и т.д.)
В "App.test.js" уже есть тест, который можно запустить прямо из "WebStorm" или через консоль "npm run test".
".test." в названии файла сообщает настроенной системе "Webpack" и тестовой среде разработки (это скрыто в
"react-scripts" (используется библиотека "JEST"), "create-react-app" скрыл эти детали), что такой файл содержит тесты и
IDE будет их запускать. Желательно, чтобы каждый тест проверял что-то одно.
*/

import profileReducer, {profileAC} from './profile-reducer'; /*Импортировали из "profile-reducer" объект "profileAC"
откуда будем брать два AC "addPostActionCreator" и "deletePostActionCreator", которые добавляют пост и удаляют
соотвественно. "deletePostActionCreator" создали специально для целей тестирования, данный функционал в нашем
приложении пока еще не реализован. Также импортировали весь "reducer" из "profile-reducer.ts".*/

import {PostType, ProfileType} from '../types/types'; /*Подключаем типы*/

import avatarSource from '../assets/images/user.png'; /*Импортируем из ассетов проекта аватар пользователя.*/


/*Создали общие входные данные для тестов. Эти данные представляют из себя "state" из "profile-reducer.ts".*/
let state = {
    postsData: [ /*Создаем массив объектов, которые хранят информацию о постах на странице профиля.*/
        {id: 1, message: 'Hi, how are you?', likesCount: 2, avatar: avatarSource},
        {id: 2, message: 'It\'s my first post', likesCount: 3, avatar: avatarSource}
    ] as Array<PostType>, /*Указываем, что этот массив объектов имеет тип массива элементов с типом "PostType". Тип
    "PostType" был создан нами и импортирован сюда.*/

    profile: null as ProfileType | null, /*Создаем свойство, которое будет хранить информацию о профиле пользователя,
    полученную с сервера. Имеет тип "ProfileType". Тип "ProfileType" был создан нами и импортирован сюда.*/

    status: null as string | null /*Создаем свойство, которое будет хранить информацию о статусе пользователя,
    полученную с сервера. Указываем, что изначально это свойство может иметь тип "null", то есть быть пустым, или
    быть строкой. Можно вместо этого просто было указать ''.*/
};


describe('tests for profileReducer', () => { /*"describe" позволит определить IDE, что это группа тестов.*/
    /*Тест №1. После добавления нового поста, количество постов должно быть увеличено на 1.*/
    test('after adding a post, the number of the posts should be incremented', () => { /*"test" позволит
    определить IDE, что это тест.*/
        /*Указываем входные данные конкретно для этого теста.*/
        const action = profileAC.addPost('some post text'); /*Получаем объект "action" при помощи AC
        "addPost", передав ему текст сообщения для добавления нового поста.*/

        /*Шаги теста.*/
        const newState = profileReducer(state, action); /*Получаем новый "state" при помощи "profileReducer", передав в
        него "state" из общих входных данных для тестов и объект "action", созданный выше в этом тесте. То есть должен
        сработать AC "addPostActionCreator" в "profileReducer" и добавить пост с текстом равным "some post text" в
        переданном "state".*/

        /*Ожидаемый результат. "expect" позволит определить IDE, что это ожидаемый результат в тесте.*/
        expect(newState.postsData.length).toBe(3); /*Ожидается, что длина массива "postsData" будет равна "3",
        так как был добвлен один пост к двум уже существующим постам.*/
    });

    /*Тест №2. Добавленный пост должен содержать корректный текст.*/
    test('an added post should have correct text', () => { /*"test" позволит определить IDE, что это тест.*/
        /*Указываем входные данные конкретно для этого теста.*/
        const action = profileAC.addPost('some post text'); /*Получаем объект "action" при помощи AC
        "addPost", передав ему текст сообщения для добавления нового поста.*/

        /*Шаги теста.*/
        const newState = profileReducer(state, action); /*Получаем новый "state" при помощи "profileReducer", передав в
        него "state" из общих входных данных для тестов и объект "action", созданный выше в этом тесте. То есть должен
        сработать AC "addPostActionCreator" в "profileReducer" и добавить пост с текстом равным "some post text" в
        переданном "state".*/

        /*Ожидаемый результат. "expect" позволит определить IDE, что это ожидаемый результат в тесте.*/
        expect(newState.postsData[2].message).toBe('some post text'); /*Ожидается, что текст добавленного поста
        будет корректным.*/
    });

    /*Тест №3. После удаления поста, число постов должно уменьшиться на один.*/
    test('after deleting a post, the number of the posts should be decremented', () => { /*"test" позволит
    определить IDE, что это тест.*/
        /*Указываем входные данные конкретно для этого теста.*/
        const action = profileAC.deletePostActionCreator(1); /*Получаем объект "action" при помощи AC
        "deletePostActionCreator", передав ему "1" как "ID" поста для удаления.*/

        /*Шаги теста.*/
        const newState = profileReducer(state, action); /*Получаем новый "state" при помощи "profileReducer", передав в
        него "state" из общих входных данных для тестов и объект "action", созданный выше в этом тесте. То есть должен
        сработать AC "deletePostActionCreator" в "profileReducer" и удалить пост с "ID" равным "1" в переданном
        "state".*/

        /*Ожидаемый результат. "expect" позволит определить IDE, что это ожидаемый результат в тесте.*/
        expect(newState.postsData.length).toBe(1); /*Ожидается, что длина массива "postsData" будет равна "1",
        так как был удален один из двух постов.*/
    });

    /*Тест №4. После попытки удалить пост с неверным "ID", число постов не должно уменьшиться на 1.*/
    test('after trying to delete a post with an incorrect ID, the number of the posts should not be decremented',
        () => { /*"test" позволит определить IDE, что это тест.*/
            /*Указываем входные данные конкретно для этого теста.*/
            const action = profileAC.deletePostActionCreator(3); /*Получаем объект "action" при помощи AC
            "deletePostActionCreator", передав ему "3" как некорректный "ID" поста для удаления.*/

            /*Шаги теста.*/
            const newState = profileReducer(state, action); /*Получаем новый "state" при помощи "profileReducer",
            передав в него "state" из общих входных данных для тестов и объект "action", созданный выше в этом тесте. То
            есть должен сработать AC "deletePostActionCreator" в "profileReducer" и попытаться удалить пост с неверным
            "ID" равным "3" в переданном "state".*/

            /*Ожидаемый результат. "expect" позволит определить IDE, что это ожидаемый результат в тесте.*/
            expect(newState.postsData.length).toBe(2); /*Ожидается, что длина массива "postsData" будет равна
            "2", так как была попытка удалить пост с несуществующим "ID" и оба уже существующие поста должны остаться на
            месте.*/
        });
});


