/*Импортируем объект "profileAC" откуда будем брать AC "addPostActionCreator()" и AC "deletePostActionCreator()",
которые добавляют пост и удаляют соответственно. АС "deletePostActionCreator" создаем специально для целей тестирования,
данный функционал в нашем приложении пока еще не реализован. Также импортируем весь редьюсер "profileReducer()".*/
import {profileReducer, profileAC} from './profile-reducer';
/*Импортируем из ассетов проекта аватар пользователя.*/
import avatarSource from '../assets/images/user.png';
/*Импортируем типы "PostType" и "ProfileType".*/
import {PostType, ProfileType} from '../types/types';

/*Создаем общие входные данные для тестов. Эти данные представляют собой state из файла "profile-reducer.ts".*/
let state = {
    /*Создаем массив объектов, которые хранят информацию о постах на странице профиля. Указываем, что этот массив
    объектов имеет тип массива элементов с типом "PostType".*/
    postsData: [
        {id: 1, message: 'Hi, how are you?', likesCount: 2, avatar: avatarSource},
        {id: 2, message: 'It\'s my first post', likesCount: 3, avatar: avatarSource}
    ] as Array<PostType>,

    /*Создаем свойство, которое будет хранить информацию о профиле пользователя, полученную с сервера. Имеет тип
    "ProfileType".*/
    profile: null as ProfileType | null,

    /*Создаем свойство, которое будет хранить информацию о статусе пользователя, полученную с сервера. Указываем, что
    изначально это свойство может иметь тип null, то есть быть пустым, или быть строкой. Можно было вместо этого просто
    указать ''.*/
    status: null as string | null
};

describe('tests for profileReducer', () => {
    /*Тест №1. После добавления нового поста, количество постов должно быть увеличено на 1.*/
    test('after adding a post, the number of the posts should be incremented', () => {
        /*Указываем входные данные конкретно для этого теста. Получаем action-объект при помощи AC "addPost()", передав
        ему текст сообщения для добавления нового поста.*/
        const action = profileAC.addPost('some post text');
        /*Шаги теста. Получаем новый state при помощи редьюсера "profileReducer()", передав в него state из общих
        входных данных для тестов и action-объект, созданный выше в этом тесте. То есть должен сработать AC
        "addPostActionCreator()" в редьюсере "profileReducer()" и добавить пост с текстом равным "some post text" в
        переданном state.*/
        const newState = profileReducer(state, action);
        /*Ожидаемый результат. Ожидается, что длина массива "postsData" будет равна 3, так как был добавлен один пост к
        двум уже существующим постам.*/
        expect(newState.postsData.length).toBe(3);
    });

    /*Тест №2. Добавленный пост должен содержать корректный текст.*/
    test('an added post should have correct text', () => {
        /*Указываем входные данные конкретно для этого теста. Получаем action-объект при помощи AC "addPost()", передав
        ему текст сообщения для добавления нового поста.*/
        const action = profileAC.addPost('some post text');
        /*Шаги теста. Получаем новый state при помощи редьюсера "profileReducer()", передав в него state из общих
        входных данных для тестов и action-объект, созданный выше в этом тесте. То есть должен сработать AC
        "addPostActionCreator()" в редьюсере "profileReducer()" и добавить пост с текстом равным "some post text" в
        переданном state.*/
        const newState = profileReducer(state, action);
        /*Ожидаемый результат. Ожидается, что текст добавленного поста будет корректным.*/
        expect(newState.postsData[2].message).toBe('some post text');
    });

    /*Тест №3. После удаления поста, число постов должно уменьшиться на один.*/
    test('after deleting a post, the number of the posts should be decremented', () => {
        /*Указываем входные данные конкретно для этого теста. Получаем action-объект при помощи AC
        "deletePostActionCreator()", передав ему 1 как ID поста для удаления.*/
        const action = profileAC.deletePostActionCreator(1);
        /*Шаги теста. Получаем новый state при помощи редьюсера "profileReducer()", передав в него state из общих
        входных данных для тестов и action-объект, созданный выше в этом тесте. То есть должен сработать AC
        "deletePostActionCreator()" в редьюсере "profileReducer()" и удалить пост с ID равным 1 в переданном state.*/
        const newState = profileReducer(state, action);
        /*Ожидаемый результат. Ожидается, что длина массива "postsData" будет равна 1, так как был удален один из двух
        постов.*/
        expect(newState.postsData.length).toBe(1);
    });

    /*Тест №4. После попытки удалить пост с неверным ID, число постов не должно уменьшиться на 1.*/
    test('after trying to delete a post with an incorrect ID, the number of the posts should not be decremented',
        () => {
            /*Указываем входные данные конкретно для этого теста. Получаем action-объект при помощи AC
            "deletePostActionCreator()", передав ему 3 как некорректный ID поста для удаления.*/
            const action = profileAC.deletePostActionCreator(3);
            /*Шаги теста. Получаем новый "state" при помощи редьюсера "profileReducer()", передав в него state из общих
            входных данных для тестов и action-объект, созданный выше в этом тесте. То есть должен сработать AC
            "deletePostActionCreator()" в редьюсере "profileReducer" и попытаться удалить пост с неверным ID равным 3 в
            переданном state.*/
            const newState = profileReducer(state, action);
            /*Ожидаемый результат. Ожидается, что длина массива "postsData" будет равна 2, так как была попытка удалить
            пост с несуществующим ID и оба уже существующие поста должны остаться на месте.*/
            expect(newState.postsData.length).toBe(2);
        });
});