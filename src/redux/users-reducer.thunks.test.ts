/*Импортируем TC "follow()" и "unfollow()", а также объект "usersAC", чтобы использовать AC из этого объекта.*/
import {follow, unfollow, usersAC} from './users-reducer';
/*Импортируем блок запросов, связанных со страницей с постраничным выводом пользователей.*/
import {usersAPI} from '../api/users-api';
/*Импортируем тип "ResponseWithDataType" и списки кодов ответов от сервера "ResultCodeEnum".*/
import {ResponseWithDataType, ResultCodeEnum} from '../api/api';

/*Таким образом заменяем реальный модуль по пути '../api/users-api' на фейковый, чтобы в дальнейшем при использовании
"usersAPI" мы не использовали реальный "usersAPI", так как нам этого не надо в тестах.*/
jest.mock('../api/users-api');
/*Сделаем, чтобы использовать "usersAPI" под другим именем "usersAPIMock", и чтобы можно было указать типизацию. Для
типизации указываем, чтобы "usersAPI" воспринимался как с типом фейково созданного при помощи библиотеки Jest самого
"usersAPI".*/
const usersAPIMock = usersAPI as jest.Mocked<typeof usersAPI>;

/*Создаем пример результата, который возвращается запросами "follow()" и "unfollow()" из "usersAPI". Указываем тип этого
объекта как "ResponseWithDataType". Будем использовать этот объект в тестах вместо реальных ответов от сервера, так как
наша цель в данном случае не тестировать ответы от сервера, и чтобы не нагружать сервер лишний раз.*/
const followUnfollowFromUsersAPIResult: ResponseWithDataType = {
    data: {},
    resultCode: ResultCodeEnum.Success,
    messages: ['some text']
};

/*Таким образом создаем фейковую функцию под видом dispatch-функции для thunks, которую будет отслеживать тестовая
среда. Эта функция нужна нам в тестах для имитации работы оригинального аналога этой функции.*/
const dispatchMock = jest.fn();
/*Таким образом создаем фейковую функцию под видом функции "getState()", используемую dispatch-функциями в качестве
одного из параметров, которую будет отслеживать тестовая среда. Эта функция нужна нам в тестах для имитации работы
оригинального аналога этой функции.*/
const getStateMock = jest.fn();

/*Так как наши функции "dispatchMock()" и "getStateMock()" накапливают вызовы после запуска нескольких тестов (например,
когда запускаем набор тестов), и поэтому результаты работы одного теста могут повлиять на работу другого теста, то для
избежания таких случаев мы используем функцию "beforeEach()" из библиотеки Jest, чтобы перед каждым тестом очищать
вызовы функций "dispatchMock()" и "getStateMock()".*/
beforeEach(() => {
    dispatchMock.mockClear();
    getStateMock.mockClear();
});

describe('tests for thunks from usersReducer', () => {
    /*Тест №1. Dispatch-функция в TC "follow()" вызывается нужное количество раз и с нужными параметрами.*/
    test('Dispatch function in the TC "follow()" is called correct number of times and with correct parameters',
        /*Используем здесь ключевые слова async/await, чтобы сделать этот тест асинхронным, так как внутри мы используем
        асинхронные thunks.*/
        async () => {
            /*Указываем входные данные конкретно для этого теста. Получаем thunk при помощи TC "follow()", передав ему
            ID пользователя со значением 1.*/
            const thunk = follow(1);
            /*Шаги теста. Таким образом указываем, что если запрос "follow()" будет вызываться из "usersAPIMock", то
            вместо реальной работы он должен всегда возвращать в качестве результата промис, резольвящийся объектом
            "followUnfollowFromUsersAPIResult", который мы создали выше (хотя можно было указать просто объект
            "followUnfollowFromUsersAPIResult" без промиса). Ранее этот кусок кода был выше вне тестов, но сейчас его
            нужно помещать внутрь самих тестов, так как, возможно, из-за изменений в версиях Node.js, работа промисов
            немного изменилась.*/
            usersAPIMock.follow.mockReturnValue(Promise.resolve(followUnfollowFromUsersAPIResult));
            /*Вызываем TC "follow()", передав в него функцию "dispatchMock()" в качестве dispatch-функции, функцию
            "getStateMock()" в качестве функции "getState()" и пустой объект в качестве дополнительных аргументов.
            Используем здесь ключевое слово await, чтобы тест дождался завершения работы всего TC "follow()", иначе тест
            не отследит всю работу TC "follow()", поскольку thunk в нем асинхронный.*/
            await thunk(dispatchMock, getStateMock, {});
            /*Ожидаемый результат. Ожидается, что функция "dispatchMock()" была вызвана три раза, так как TC "follow()"
            внутри себя использует вспомогательный TC "_followUnfollowFlow()", в котором dispatch-функция вызывается три
            раза, если от сервера пришел код ошибки "0", то есть когда операция прошла успешно, как указано в нашем
            объекте "followFromUsersAPIResult" выше.*/
            expect(dispatchMock).toBeCalledTimes(3);

            /*Ожидается, что первый вызов функции "dispatchMock()" был с объектом
            "usersAC.toggleIsFollowingInProgress(true, 1)".*/
            expect(dispatchMock).toHaveBeenNthCalledWith(1,
                usersAC.toggleIsFollowingInProgress(true, 1));

            /*Ожидается, что второй вызов функции "dispatchMock()" был с объектом "usersAC.followSuccess(1)".*/
            expect(dispatchMock).toHaveBeenNthCalledWith(2, usersAC.followSuccess(1));

            /*Ожидается, что третий вызов функции "dispatchMock()" был с объектом
            "usersAC.toggleIsFollowingInProgress(false, 1)".*/
            expect(dispatchMock).toHaveBeenNthCalledWith(3,
                usersAC.toggleIsFollowingInProgress(false, 1));
        });

    /*Тест №2. Dispatch-функция в TC "unfollow()" вызывается нужное количество раз и с нужными параметрами.*/
    test('Dispatch function in the TC "unfollow()" is called correct number of times and with correct parameters',
        async () => {
            /*Указываем входные данные конкретно для этого теста. Получаем thunk при помощи TC "unfollow()", передав ему
            ID пользователя со значением 1.*/
            const thunk = unfollow(1);
            /*Шаги теста. Таким образом указываем, что если запрос "unfollow()" будет вызываться из "usersAPIMock", то
            вместо реальной работы он должен всегда возвращать в качестве результата промис, резольвящийся объектом
            "followUnfollowFromUsersAPIResult", который мы создали выше (хотя можно было указать просто объект
            "followUnfollowFromUsersAPIResult" без промиса). Ранее этот кусок кода был выше вне тестов, но сейчас его
            нужно помещать внутрь самих тестов, так как, возможно, из-за изменений в версиях Node.js, работа промисов
            немного изменилась.*/
            usersAPIMock.unfollow.mockReturnValue(Promise.resolve(followUnfollowFromUsersAPIResult));
            /*Вызываем TC "unfollow()", передав в него функцию "dispatchMock()" в качестве dispatch-функции, функцию
            "getStateMock()" в качестве функции "getState()" и пустой объект в качестве дополнительных аргументов.*/
            await thunk(dispatchMock, getStateMock, {});
            /*Ожидаемый результат. Ожидается, что функция "dispatchMock()" была вызвана три раза, так как TC
            "unfollow()" внутри себя использует вспомогательный TC "_followUnfollowFlow()", в котором dispatch-функция
            вызывается три раза, если от сервера пришел код ошибки "0", то есть когда операция прошла успешно, как
            указано в нашем объекте "followFromUsersAPIResult" выше.*/
            expect(dispatchMock).toBeCalledTimes(3);

            /*Ожидается, что первый вызов функции "dispatchMock()" был с объектом
            "usersAC.toggleIsFollowingInProgress(true, 1)".*/
            expect(dispatchMock).toHaveBeenNthCalledWith(1,
                usersAC.toggleIsFollowingInProgress(true, 1));

            /*Ожидается, что второй вызов функции "dispatchMock()" был с объектом "usersAC.unfollowSuccess(1)".*/
            expect(dispatchMock).toHaveBeenNthCalledWith(2, usersAC.unfollowSuccess(1));

            /*Ожидается, что третий вызов функции "dispatchMock()" был с объектом
            "usersAC.toggleIsFollowingInProgress(false, 1)".*/
            expect(dispatchMock).toHaveBeenNthCalledWith(3,
                usersAC.toggleIsFollowingInProgress(false, 1));
        });
});