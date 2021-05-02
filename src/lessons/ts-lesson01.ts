/*"Generic" нужен для того, чтобы указать подтип. Например, "Array<string>" - массив элементов с типом строка.*/

export type UserType = { /*Какой-то образный тип для данных по пользователям.*/
    firstName: string
    lastName: string
    age: number
};

type PhotoType = { /*Какой-то образный тип для фото пользователей.*/
    large: string
    small: string
};

type ServerResponseType<D> = { /*Какой-то образный тип для ответов от сервера. Этот тип является "generic", то
есть здесь нам позволено уточнять какого именно подтипа должны быть некоторые внутренние части. Мы указали "D" и в
"<D>", и в "data: D", значит теперь, когда мы будем использовать этот тип, мы можем уточнить подтип "data" - в нашем
случае мы хотим использовать либо тип данных по пользователям "UserType" или тип данных по фото пользователей
"PhotoType".*/
    errorCode: number
    messages: Array<string>
    data: D
};

const response1: ServerResponseType<UserType> = { /*Создали объект как пример первого ответа от сервера, который имеет
тип "ServerResponseType". Этот объект имеет данные по пользователю ("data"), поэтому мы уточнили тип этого объекта
как "<UserType>", поскольку тип "ServerResponseType" является "generic".*/
    errorCode: 1,
    messages: ['i', 't'],
    data: {
        firstName: 'a',
        lastName: 'b',
        age: 69
    }
};

const response2: ServerResponseType<PhotoType> = { /*Создали объект как пример второго ответа от сервера, который имеет
тип "ServerResponseType". Этот объект имеет данные по фото пользователя ("data"), поэтому мы уточнили тип этого объекта
как "<PhotoType>", поскольку тип "ServerResponseType" является "generic".*/
    errorCode: 1,
    messages: ['i', 't'],
    data: {
        large: 'path-to-large',
        small: 'path-to-small'
    }
};

/*----------------------------------------------------------------------------------------------------*/

type Nullable<T> = null | T; /*Создали специальный "generic" тип, который может быть или "null" или тем, что мы захотим
указать под "T".*/

const initialState = { /*Пример "state".*/
    age: 10,
    name: 'John',

    /*user: null as UserType | null,*/
    user: null as Nullable<UserType>, /*Это аналог предыдущей строки.*/

    /*photo: null as PhotoType | null /!*Воспринимай этот "null" как тип "PhotoType" или "null". Так нужно, чтобы была
    возможность положить сюда объекты типа "PhotoType", но в тоже время были бы разрешены случаи, когда "photo"
    пустовал.*!/*/
    photo: null as Nullable<PhotoType> /*Это аналог предыдущей строки.*/

};

/*Создаем тип "state" из самого "state" при помощи "typeof" (из "TypeScript", а не из JS). Так можно делать если
необходимо создать тип уже для существующего объекта, такого как "state". Например, для ответов от сервера, которые мы
наперед не получаем, так сделать не получится.*/
type InitialStateType = typeof initialState;

const someReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => { /*Пример
"reducer". На входе принимает "state" тип "InitialStateType" и объекты "action" с типом "ActionsType"
(этот тип создан ниже). На выходе возвращает "state" с типом "InitialStateType".*/
    switch(action.type) {
        case 'SET-AGE': /*Благодаря типу "ActionsType" будет на выбор только "SET-AGE" и "SET-NAME".*/
            return {...state, age: action.age};
        case 'SET-NAME': /*Благодаря типу "ActionsType" будет на выбор только "SET-AGE" и "SET-NAME".*/
            return {...state, name: action.firstName + ' ' + action.lastName};
    }


    // state.photo = null; - все хорошо.

    // state.photo = {
    //     large: 'path-to-large',
    //     small: 'path-to-small'
    // }; - все хорошо.

    // state.photo = 3; - так нельзя, будет ошибка.

    // state.age = null; - так нельзя, будет ошибка.
    return state;
};

/*----------------------------------------------------------------------------------------------------*/

const AC1 = (age: number) => ({ /*Создали первый АС. Указали здесь "as const", чтобы возвращаемый объект воспринимался
"TypeScript" как константа в целях более строгой типизации значений свойств объекта.*/
    type: 'SET-AGE',
    age: age
} as const);

const AC2 = (firstName: string, lastName: string) => ({ /*Создали второй АС.*/
    type: 'SET-NAME',
    firstName: firstName,
    lastName: lastName
} as const);

/*type AC1Type = ReturnType<typeof AC1>; */
/*При помощи функции "typeof" сначала мы получим тип "AC1" (функция, которая возвращает объект "action"), а далее при
помощи функции "ReturnType" мы получим тип того, что возвращает эта функция, то есть тип объекта "action". Но, если не
указать "as const" в самом "AC1", то "TypeScript" определит, что 'SET-AGE' это строка и в итоге можно будет присвоить
любое строковое значение свойству "type", что нам не нужно. Таким образом можно получать типы объектов "action".*/

/*type AC2Type = ReturnType<typeof AC2>; */
/*При помощи функции "typeof" сначала мы получим тип "AC2" (функция, которая возвращает объект "action"), а далее при
помощи функции "ReturnType" мы получим тип того, что возвращает эта функция, то есть тип объекта "action". Но, если не
указать "as const" в самом "AC2", то "TypeScript" определит, что 'SET-NAME' это строка и в итоге можно будет присвоить
любое строковое значение свойству "type", что нам не нужно. Таким образом можно получать типы объектов "action".*/

/*type ActionsType = AC1Type | AC2Type; */
/*Создали общий тип для всех объектов "action".*/

type ActionsType = ReturnType<typeof AC1> | ReturnType<typeof AC2>; /*Эта строка заменяет сразу все три верхние
строки.*/


// const action1: AC1Type = {type: 'SET-COLOR', age: 69}; - так нельзя, будет ошибка.
// const action1: AC1Type = {type: 'SET-AGE', age: 69}; - все хорошо.

/*----------------------------------------------------------------------------------------------------*/

type someExtendsType<T> = T extends 'user' ? UserType : PhotoType; /*При помощи "extends" если уточненный подтип "T"
будет указан как строка "user", то этот подтип будет равен типу "UserType", иначе он будет равен типу "PhotoType".*/

let a: someExtendsType<'user'> = {
    firstName: 'a',
    lastName: 'b',
    age: 69
};

let b: someExtendsType<'photo'> = {
    large: 'path-to-large',
    small: 'path-to-small'
};

/*----------------------------------------------------------------------------------------------------*/

type someExtendsType2<T> = T extends 'user' ? UserType :
    T extends 'photo' ? PhotoType :
        number; /*Более строгий вариант предыдущего типа с ипользованием нескольких "extends":
                           если подтип указан как строка "user", то подтип будет "UserType",
                           иначе если подтип указан как строка "photo", то подтип будет "PhotoType",
                           иначе подтип будет равен "number".*/

let x: someExtendsType2<'user'> = {
    firstName: 'a',
    lastName: 'b',
    age: 69
};

let y: someExtendsType2<'photo'> = {
    large: 'path-to-large',
    small: 'path-to-small'
};

// let z: someExtendsType2<'music'> = {
//     large: 'path-to-large',
//     small: 'path-to-small'
// }; - так нельзя, будет ошибка.

/*----------------------------------------------------------------------------------------------------*/

let f: someExtendsType<'user' | 'photo'> = { /*Если при уточнении "generic" типа, который был создан с использованием
"extends", указать два подтипа, то тип сработает дважды, то есть наш объект "f" может быть или с типом "UserType", или
с типом "PhotoType", или сразу одновременно иметь оба этих типа (даже один целый тип и часть второго). Здесь будет
тип "UserType".*/
    firstName: 'a',
    lastName: 'b',
    age: 69
};

f = { /*Здесь будет тип "PhotoType".*/
    large: 'path-to-large',
    small: 'path-to-small'
};

f = { /*Здесь будет тип "UserType" и "PhotoType" вместе.*/
    large: 'path-to-large',
    small: 'path-to-small',
    firstName: 'a',
    lastName: 'b',
    age: 69
};

f = { /*Здесь будет тип в виде части "UserType" и всего "PhotoType" вместе.*/
    large: 'path-to-large',
    small: 'path-to-small',
    firstName: 'a',
    lastName: 'b'
};

/*----------------------------------------------------------------------------------------------------*/

type myReturnType<T> = T extends (...args: any[]) => infer R ? R : never; /*Создаем свой аналог "ReturnType" из
"TypeScript". Наш тип является "generic", который принимает подтип "T", подразумевается, что будет уточняться тип
функции в этом "T" при помощи "typeof". Если подтип "T" будет совпадать с функцией, которая принимает какое-то
количество аргументов любого типа "(...args: any[])" и возвращает какое-то другое значение с каким-то типом "R", то при
помощи "infer" будет проанализирован этот тип "R" возвращаемого значения и возвращен этот тип "R", иначе вернет "never",
что примерно означает ничего не сделать.*/

type ActionsType2 = myReturnType<typeof AC1> | myReturnType<typeof AC2>; /*Сделали аналог "ActionsType", который указан
выше, при помощи "myReturnType" - нашего аналога "ReturnType" из "TypeScript".*/

/*----------------------------------------------------------------------------------------------------*/

const obj = { /*Создали некий "сложный" объект "obj".*/
    a: {
        name: 'John'
    },
    b: {
        age: 33
    },
    c: {
        site: {
            title: 'some-website.hmm'
        }
    }
};

type objType = typeof obj.a | typeof obj.b | typeof obj.c; /*Тут мы получили тип, который будет равен любой комбинации
типов, которые будут получены на основе внутренних частей нашего объекта "obj".*/

let obj2: objType = {name: 'Bob', age: 69}; /*Комбинация "obj.a" и "obj.b".*/

/*----------------------------------------------------------------------------------------------------*/

type PropertiesType<T> = T extends {[key: string]: infer U} ? U : never; /*Попробуем сделать аналог нашего типа
"objType" на случай если мы не хотим указывать все внутренности объекта. В данном случае наш тип является "generic",
который принимает подтип "T", подразумевается, что будет уточняться тип объекта в этом "T" при помощи "typeof". Если
подтип "T" будет совпадать с объектом, у которого есть какой-то ключ "[key: string]" ("string" - так как имя ключа это
текст) с неким значением "U", то при помощи "infer" будет проанализировано это значение "U" и возвращено это значение
"U", иначе вернет "never", что примерно означает ничего не сделать. И через такой алгоритм пройдет каждое свойство
объекта.*/

let obj3: PropertiesType<typeof obj> = {name: 'Bob', age: 69}; /*Снова делаем комбинацию "obj.a" и "obj.b".*/

/*----------------------------------------------------------------------------------------------------*/

const packedActions = { /*Упаковали пару AC в объект "packedActions" для более краткой типизации объектов "action"
ниже.*/
    AC3: (color: string) => ({
        type: 'SET-COLOR',
        color: color
    } as const),

    AC4: (height: number) => ({
        type: 'SET-HEIGHT',
        height: height
    } as const)
};

let action2: ReturnType<PropertiesType<typeof packedActions>> = { /*Создали некий объект "action" под именем "action2"
и указали ему тип следующим образом: тип "PropertiesType" будет работать как выше и поскольку мы передали
"typeof packedActions" как уточнение, то он определит, что это объект с функциями внутри и вернет типы этих функций,
когда нам нужны типы объектов, которые эти функции возвращают - объектов "action", поэтому сам весь этот тип
"PropertiesType<typeof packedActions>" мы указали как уточнение для "ReturnType", чтобы получить тип возвращаемых
объектов "action" в этих функциях, то есть объектов "action" в наших "AC3" и "AC4".*/
    type: 'SET-COLOR',
    color: 'green'
};

/*----------------------------------------------------------------------------------------------------*/

/*Создаем еще один вариант "state" с его типом, "reducer", общий тип для объектов "action" для "AC3" и "AC4".*/
const initialState2 = {
    color: 'white',
    height: 69
};

type InitialStateType2 = typeof initialState2;

const someReducer2 = (state: InitialStateType2 = initialState2, action: ActionsType4): InitialStateType2 => {
    switch(action.type) {
        case 'SET-COLOR':
            return {...state, color: action.color};
        case 'SET-HEIGHT':
            return {...state, height: action.height};
    }

    return state;
};

type ActionsType3 = ReturnType<PropertiesType<typeof packedActions>>; /*В итоге создали еще один более краткий вариант
указания типизации для объектов "action" при помощи упаковки всех AC в единый объект.*/

/*----------------------------------------------------------------------------------------------------*/

type FinalActionsType<T extends {[key: string]: (...args: any[]) => any}> = ReturnType<PropertiesType<T>>; /*Попробуем
создать псевдоним для "ReturnType<PropertiesType<typeof packedActions>>", где "T" это "typeof packedActions", под
названием "FinalActionsType". Здесь мы также уточняем, что в типе "FinalActionsType" нужно указать ограничение
(constraint) для передаваемого "T", указав, что это обязательно должен быть объект, у которого в качестве значений
свойств обязательно должны быть функции, принимающие что-нибудь и возвращающие что-нибудь.*/

type ActionsType4 = FinalActionsType<typeof packedActions>; /*В итоге создали более краткий вариант типа
"ActionsType3".*/