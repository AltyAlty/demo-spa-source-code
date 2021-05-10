/*
Это файл с тестами для "thunks" из "users-reducer.ts".
Тесты в "TDD" пишутся заранее, чтобы программа им соответствовала.
Тесты обязуют нас писать правильно структурированную программу.
Тесты работают точечно, то есть нам не надо каждый раз запускать программу полностью, чтобы ее протестировать.
Unit-тесты тестируют отдельные части приложения (например, модули, компоненты, функции, селекторы и т.д.)
В "App.test.js" уже есть тест, который можно запустить прямо из "WebStorm" или через консоль "npm run test".
".test." в названии файла сообщает настроенной системе "Webpack" и тестовой среде разработки (это скрыто в
"react-scripts" (используется библиотека "JEST"), "create-react-app" скрыл эти детали), что такой файл содержит тесты и
IDE будет их запускать. Желательно, чтобы каждый тест проверял что-то одно.
*/

import {follow, unfollow, usersAC} from './users-reducer'; /*Импортировали из "users-reducer.ts" TC "follow" и
"unfollow", а также объект "usersAC", чтобы использовать AC из этого объекта.*/

import {usersAPI} from '../api/users-api'; /*Импортируем блок запросов, связанных со страницей с постраничным выводом
пользователей из "users-api.ts".*/

import {ResponseWithDataType, ResultCodeEnum} from '../api/api'; /*Подключаем тип "ResponseWithDataType", а также
импортируем "ResultCodeEnum" - списки кодов ответов от сервера.*/


jest.mock('../api/users-api'); /*Таким образом заменяем реальный модуль по пути '../api/users-api' на
фейковый, чтобы в дальнейшем при использовании "usersAPI" мы не использовали реальный "usersAPI", так как нам этого не
надо в тестах.*/

const usersAPIMock = usersAPI as jest.Mocked<typeof usersAPI>; /*Сделали, чтобы использовать "usersAPI" под другим
именем "usersAPIMock", и чтобы можно было указать типизацию. Для типизации указали, чтобы "usersAPI" воспринимался как с
типом фейково созданного при помощи библиотеки "JEST" самого "usersAPI".*/

const followUnfollowFromUsersAPIResult: ResponseWithDataType = { /*Создали пример результата, который возвращается
запросами "follow" и "unfollow" из "usersAPI". Указали тип этого объекта как "ResponseWithDataType", который был создан
нами и импортирован сюда. Будем использовать этот объект в тестах вместо реальных ответов от сервера, так как наша цель
в данном случае не тестировать ответы от сервера, и чтобы не нагружать сервер лишний раз.*/
    data: {},
    resultCode: ResultCodeEnum.Success,
    messages: ['some text']
};

usersAPIMock.follow.mockReturnValue(Promise.resolve(followUnfollowFromUsersAPIResult)); /*Таким образом указали, что
если запрос "follow" будет вызываться из "usersAPIMock", то вместо реальной работы он должен всегда возвращать в
качестве результата промис, который резольвится объектом "followUnfollowFromUsersAPIResult", который мы создали выше
(хотя можно было указать просто объект "followUnfollowFromUsersAPIResult" без промиса).*/

usersAPIMock.unfollow.mockReturnValue(Promise.resolve(followUnfollowFromUsersAPIResult)); /*Таким образом указали, что
если запрос "unfollow" будет вызываться из "usersAPIMock", то вместо реальной работы он должен всегда возвращать в
качестве результата промис, который резольвится объектом "followUnfollowFromUsersAPIResult", который мы создали выше
(хотя можно было указать просто объект "followUnfollowFromUsersAPIResult" без промиса).*/

const dispatchMock = jest.fn(); /*Таким образом создали фейковую функцию под видом функции "dispatch" для "thunks",
которую будет отслеживать тестовая среда. Эта функция нужна нам в тестах для имитации работы оригинального аналога этой
функции.*/

const getStateMock = jest.fn(); /*Таким образом создали фейковую функцию под видом функции "getState" используемую
функциями "dispatch" в качестве одного из параметров, которую будет отслеживать тестовая среда. Эта функция нужна нам в
тестах для имитации работы оригинального аналога этой функции.*/

/*Так как наши функции "dispatchMock" и "getStateMock" накапливают вызовы после запуска нескольких тестов (например,
когда запускаем набор тестов), и поэтому результаты работы одного теста могут повлиять на работу другого теста, то чтобы
избежать таких случаев мы используем функцию "beforeEach" из библиотеки "JEST", чтобы перед каждым тестом очищать вызовы
функций "dispatchMock" и "getStateMock".*/
beforeEach(() => {
    dispatchMock.mockClear();
    getStateMock.mockClear();
});


describe('tests for thunks from usersReducer', () => { /*"describe" позволит определить IDE, что это группа
тестов.*/
    /*Тест №1. Функция "dispatch" в TC "follow" вызывается нужное количество раз и с нужными параметрами.*/
    test('Dispatch function in TC "follow" is called right number of times and with right parameters',
        async () => {
    /*"test" позволит определить IDE, что это тест. Используем здесь "async/await", чтобы сделать этот тест асинхронным,
    так как внутри мы используем асинхронные "thunks".*/
        /*Указываем входные данные конкретно для этого теста.*/
        const thunk = follow(1); /*Получаем "thunk" при помощи TC "follow", передав ему "ID" пользователя со
        значением "1".*/

        /*Шаги теста.*/
        await thunk(dispatchMock, getStateMock, {}); /*Вызываем TC "follow", передав в него функцию
        "dispatchMock" в качестве функции "dispatch", функцию "getStateMock" в качестве функции "getState" и пустой
        объект в качестве дополнительных аргументов. Используем здесь "await", чтобы тест дождался завершения работы
        всего TC "follow", иначе тест не отследит всю работу TC "follow", поскольку "thunk" в нем асинхронный.*/

        /*Ожидаемый результат. "expect" позволит определить IDE, что это ожидаемый результат в тесте.*/
        expect(dispatchMock).toBeCalledTimes(3); /*Ожидается, что функция "dispatchMock" была вызвана три раза,
        так как TC "follow" внутри себя использует вспомогательный TC "_followUnfollowFlow", в котором функция
        "dispatch" вызывается три раза, если от сервера пришел код ошибки "0" (т.е. когда операция прошла успешно), как
        указано в нашем объекте "followFromUsersAPIResult" выше.*/
        expect(dispatchMock).toHaveBeenNthCalledWith(1,
            usersAC.toggleIsFollowingInProgress(true, 1)); /*Ожидается, что первый вызов функции
        "dispatchMock" был с объектом "usersAC.toggleIsFollowingInProgress(true, 1)".*/
        expect(dispatchMock).toHaveBeenNthCalledWith(2, usersAC.followSuccess(1)); /*Ожидается, что второй
        вызов функции "dispatchMock" был с объектом "usersAC.followSuccess(1)".*/
        expect(dispatchMock).toHaveBeenNthCalledWith(3,
            usersAC.toggleIsFollowingInProgress(false, 1)); /*Ожидается, что третий вызов
        функции "dispatchMock" был с объектом "usersAC.toggleIsFollowingInProgress(false, 1)".*/
    });

    /*Тест №2. Функция "dispatch" в TC "unfollow" вызывается нужное количество раз и с нужными параметрами.*/
    test('Dispatch function in TC "unfollow" is called right number of times and with right parameters',
        async () => {
    /*"test" позволит определить IDE, что это тест. Используем здесь "async/await", чтобы сделать этот тест асинхронным,
    так как внутри мы используем асинхронные "thunks".*/
        /*Указываем входные данные конкретно для этого теста.*/
        const thunk = unfollow(1); /*Получаем "thunk" при помощи TC "unfollow", передав ему "ID" пользователя со
        значением "1".*/

        /*Шаги теста.*/
        await thunk(dispatchMock, getStateMock, {}); /*Вызываем TC "unfollow", передав в него функцию
        "dispatchMock" в качестве функции "dispatch", функцию "getStateMock" в качестве функции "getState" и пустой
        объект в качестве дополнительных аргументов. Используем здесь "await", чтобы тест дождался завершения работы
        всего TC "unfollow", иначе тест не отследит всю работу TC "unfollow", поскольку "thunk" в нем асинхронный.*/

        /*Ожидаемый результат. "expect" позволит определить IDE, что это ожидаемый результат в тесте.*/
        expect(dispatchMock).toBeCalledTimes(3); /*Ожидается, что функция "dispatchMock" была вызвана три раза,
        так как TC "unfollow" внутри себя использует вспомогательный TC "_followUnfollowFlow", в котором функция
        "dispatch" вызывается три раза, если от сервера пришел код ошибки "0" (т.е. когда операция прошла успешно), как
        указано в нашем объекте "followFromUsersAPIResult" выше.*/
        expect(dispatchMock).toHaveBeenNthCalledWith(1,
            usersAC.toggleIsFollowingInProgress(true, 1)); /*Ожидается, что первый вызов функции
        "dispatchMock" был с объектом "usersAC.toggleIsFollowingInProgress(true, 1)".*/
        expect(dispatchMock).toHaveBeenNthCalledWith(2, usersAC.unfollowSuccess(1)); /*Ожидается, что
        второй вызов функции "dispatchMock" был с объектом "usersAC.unfollowSuccess(1)".*/
        expect(dispatchMock).toHaveBeenNthCalledWith(3,
            usersAC.toggleIsFollowingInProgress(false, 1)); /*Ожидается, что третий вызов
        функции "dispatchMock" был с объектом "usersAC.toggleIsFollowingInProgress(false, 1)".*/
    });
});
