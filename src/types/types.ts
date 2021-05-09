/*
Это файл с типами, которые мы используем в нашем проекте при помощи библиотеки "TypeScript".
"TypeScript" - библиотека, которая добавляет строгую типизацию (разработка "Microsoft").
"TypeScript" - это язык, который является некой надстройкой над JS.
"TypeScript" предупреждает ас заранее об ошибке до запуска приложения.
"TypeScript" транслируется в JS при помощи "TypeScriptCompiler" ("TSC").
В "TypeScript" нам нужно изначально зафиксировать в объекте свойства, так как добавлять их потом нельзя, можно
только менять значения этих свойств.
В "npm" ("Node Package Manager") выкладываются JS-версии кода, даже если библиотека, например, была написана
на "TypeScript". Чтобы мы могли использовать такие библиотеки с "TypeScript", разработчики таких библиотек положили
рядом с этими библиотеками описания типов (type definition, файлы ".d.ts") и указали отдельные пакеты ждя определения
типов ("@types/имя_пакета" внутри этих файлов ".d.ts").
Установка "TypeScript": "npm install --save typescript @types/node @types/react @types/react-dom @types/jest".
"TypeScript" позволяет переводить на него приложение по частям, а не весь сразу.
Расшиерния ".ts" или ".tsx" говорят о том, что в таких файлах содержится "TypeScript".
Везде, где мы видим объект, мы для него выводим тип.
"typeof" в "TypeScript" выводит значение константы, а не ее тип.
Для типизации библиотеки "redux-form" мы установили следующее: "npm install --save @types/redux-form".
Для типизации библиотеки "classnames" мы установили следующее: "npm install --save @types/classnames".
Для типизации библиотеки "react-redux" мы установили следующее: "npm install --save @types/react-redux".
Для типизации библиотеки "react-router-dom" мы установили следующее: "npm install --save @types/react-router-dom".
Для типизации библиотеки "react-test-renderer" мы установили следующее: "npm install --save @types/react-test-renderer".

После установки некоторых пакетов могут появиться ложные ошибки, перезапуск IDE может их убрать.

Примеры использования "TypeScript":
let a:string = "100"; - все хорошо.
let a:string = 100; - будет ошибка, если установлен "TypeScript".
----
let a:number | null = 10; - здесь "a" может быть или числом или "null", то есть быть пустым.
----
let a = ["a", "b"]; - массив со строками.
alert (a[0].toUpperCase()); - так можно.
let b = ["a", 1]; - массив не только со строками.
alert (b[0].toUpperCase()); - будет ошибка, так как есть числа в массиве.
----
let names: Array<string> = ["a", "b"]; - явно указали, что это массив строк "Array<string>", где "<string>" - уточнение.
let names: string[] = ["a", "b"]; - альтернатива.
----
let test: "a" | "b"; - "test" может быть или "a" или "b"
test = "a"; - все хорошо.
test = "b"; - все хорошо.
test = "c"; - будет ошибка.
----
let user = {
    name: "kek",
    age: 32
};
console.log(user.job); - будет ошибка, , если установлен "TypeScript", так как такого свойства "job" не указано
в объекте "user".
----
В "TypeScript" есть типы и интерфейсы. Если мы хотим явно определить тип объекта, то мы должны создать тип. Типы
во многих случаях будут больше подходить, так как интерфейсы больше для ООП.
type UserType = {
    sayHello: function - это функция, так как метод в объекте.
    name: string - это строка.
    age: number - это число.
    isHuman: boolean - это булевый тип.
    address: AddressType | null - это может быть либо созданным нами типом "AddressType" или "null", то есть быть
    пустым.
};

type AddressType = { - создаем тип "AddressType".
    city?: string - "?" обозначает необязательность.
    country: string
};

let user: UserType = { - создаем объект с типом "UserType".
    sayHello (message: string) {alert('Hi!')},
    name: "Tom",
    age: 32,
    isHuman: true;
    address: {
        city: "A",
        country: "B"
    }
};
----
sumSomething(10, Number("20")); - "sumSomething" это какая-то функция, "20" будет приведено к числу.
----
const sumSomething = (a: any, b: any) => { - "any" означает любой тип. Можно использовать пока мы не знаем какой именно
тип нам нужен. Также вместо "any" можно писать "Object", так как в JS все типы это объекты, но, например, складывать
два объекта нельзя.
    return a+b;
};
----
Типы функций лучше делать детальными.
type UserType = {
    sayHello: (message: string) => void
    ...
};
Можно еще так:
const sumSomething: (a: number, b:number) => number = (a: number, b: number) => { - "(a: number, b: number)" это здесь
избыточно. То есть функция "sumSomething" является функцией, которая принимает два числовых параметра
("(a: number, b:number)") и возвращает числовое значение ("number"). Первое уже говорит о том, что в конце избыточное
уточнение типизации.
    return a+b;
};
----
Объект не может быть больше своего типа, а с интерфейсами такое может быть.
---
Можно автоматически генерировать тип на основе объекта.
let initialState = { - это готовый объект в виде "state".
    name: "A",
    age: 32,
    isHuman: true
};

export type InitialStateType = typeof initialState; - сделали тип на основе объекта "initialState" при помощи
"typeof" (из "TypeScript", а не из JS).

let state: InitialStateType = { - применяем тип InitialStateType на другом объекте.
    name: "B",
    age: 10,
    isHuman: false
};
----
Если у объекта изначально содержится "null" (как часто бывает у "initialState", то есть какой-то свойство пустое), то
надо делать так:
let initialState = {
    name: null as string | null,
    age: null as number | null,
    isHuman: null as  boolean | null,
    address: {
        country: null,
        city: null
    } as AddressType,
    counter: 0,
};

type AddressType = {
    city: string | null
    country: string | null
};
---
При описании объектов "action" можно делать так:
const GET_TASKS = "APP/GET-TASKS"; - создали константу для указания значения свойства "type" в объекте "action".

type GetTasksActionType = { - создали на основе этой константы тип для объекта "action" при помощи "typeof".
    type: typeof GET_TASKS,
    id: number
};

let action: GetTasksActionType = { - указали тип "GetTasksActionType" в примере объекта "action".
    type: GET_TASKS;,
    id: 12
};
----
*/

import avatarSource from '../assets/images/user.png'; /*Импортируем из ассетов проекта аватар пользователя. Это
нужно нам здесь для типизации.*/


export type PostType = { /*Создаем тип для постов на странице профиля пользователя. Объект, содержащий информацию
о посте пользователя должен обязательно содержать следующие поля с указанными типами.*/
    id: number /*"ID" поста должно быть числом.*/
    message: string /*Текст поста должен быть строкой.*/
    likesCount: number /*Количество лайков должно быть числом.*/
    avatar: string /*Путь к аватару пользователя должен быть строкой.*/
};

export type ProfileType = { /*Создаем тип для профилей пользователя на странице профиля пользователя. Объект, содержащий
информацию о профиле пользователя должен обязательно содержать следующие поля с указанными типами.*/
    aboutMe: string /*Информация "обо мне" должна быть строкой.*/
    contacts: ContactsType /*Объект с контактами пользователя должен быть типа "ContactsType", который мы создали
    ниже.*/
    fullName: string /*Полное имя пользователя должно быть строкой.*/
    lookingForAJob: boolean /*Информация ищет ли пользователь работу должна быть булева типа.*/
    lookingForAJobDescription: string /*Информация какую именно ищет работу пользователь должна быть строкой.*/
    photos: PhotosType /*Объект с фото пользователя должно быть типа "PhotosType", который мы создали ниже.*/
    userId: number /*"ID" пользователя должно быть числом.*/
};

export type ContactsType = { /*Создаем тип для контактов пользователя на странице профиля пользователя. Объект,
содержащий информацию о контактах пользователя должен обязательно содержать следующие поля с указанными типами.*/
    github: string /*Информация о "github" должна быть строкой.*/
    vk: string /*Информация о "vk" должна быть строкой.*/
    facebook: string /*Информация о "facebook" должна быть строкой.*/
    instagram: string /*Информация о "instagram" должна быть строкой.*/
    twitter: string /*Информация о "twitter" должна быть строкой.*/
    website: string /*Информация о личном сайте должна быть строкой.*/
    youtube: string /*Информация о "youtube" должна быть строкой.*/
    mainLink: string /*Информация о "mainLink" должна быть строкой.*/
};

export type PhotosType = { /*Создаем тип для фото пользователя на странице профиля пользователя. Объект,
содержащий информацию о фото пользователя должен обязательно содержать следующие поля с указанными типами.*/
    small: string | null /*Путь к уменьшенной версии фото пользователя должен быть строкой или "null" (то есть
    быть пустым).*/
    large: string | null /*Путь к увеличенной версии фото пользователя должен быть строкой или "null" (то есть
    быть пустым).*/
};

export type UserType = { /*Создаем тип для данных по пользователю, который приходит в массиве с данными по пользователям
для постраничного вывода пользователей. Объект, содержащий информацию c данными пользователя должен обязательно
содержать следующие поля с указанными типами.*/
    name: string /*Имя пользователя должно быть строкой*/
    id: number /*"ID" пользователя должно быть числом.*/
    photos: PhotosType /*Объект с фото пользователя должно быть типа "PhotosType", который мы создали выше.*/
    status: string /*Информация о статусе пользователя должна быть строкой.*/
    followed: boolean /*Информация о том фолловит ли залогиненный пользователь какого-то друго пользователя должна
    быть булева типа.*/
};

export type AvatarSourceType = typeof avatarSource; /*Создали специальный тип на основе изображения аватара из ассетов
проекта при помощи "typeof". Этот тип нам нужен для типизации некоторых данных в проекте.*/