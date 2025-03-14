/*"<>" - это generic. Нужен для того, чтобы указать подтип. Например, "Array<string>" - массив элементов с типом
строка.*/

/*Какой-то образный тип для данных по пользователям.*/
export type UserType = {
    firstName: string
    lastName: string
    age: number
};

/*Какой-то образный тип для фото пользователей.*/
type PhotoType = {
    large: string
    small: string
};

/*Какой-то образный тип для ответов от сервера. Этот тип является generic, то есть здесь нам позволено уточнять какого
именно подтипа должны быть некоторые внутренние части. Мы указываем "D" и в "<D>", и в "data: D", значит теперь, когда
мы будем использовать этот тип, мы можем уточнить подтип "data" - в нашем случае мы хотим использовать либо тип данных
по пользователям "UserType" или тип данных по фото пользователей "PhotoType".*/
type ServerResponseType<D> = {
    errorCode: number
    messages: Array<string>
    data: D
};

/*Создаем объект как пример первого ответа от сервера, который имеет тип "ServerResponseType". Этот объект имеет данные
по пользователю ("data"), поэтому мы уточняем тип этого объекта как "<UserType>", поскольку тип "ServerResponseType"
является generic.*/
const response1: ServerResponseType<UserType> = {
    errorCode: 1,
    messages: ['i', 't'],
    data: {
        firstName: 'a',
        lastName: 'b',
        age: 69
    }
};

/*Создаем объект как пример второго ответа от сервера, который имеет тип "ServerResponseType". Этот объект имеет данные
по фото пользователя ("data"), поэтому мы уточняем тип этого объекта как "<PhotoType>", поскольку тип
"ServerResponseType" является generic.*/
const response2: ServerResponseType<PhotoType> = {
    errorCode: 1,
    messages: ['i', 't'],
    data: {
        large: 'path-to-large',
        small: 'path-to-small'
    }
};

/*--------------------------------------------------------------------------------------------------------------------*/

/*Создаем специальный generic тип, который может быть либо null, либо тем, что мы захотим указать под "T".*/
type Nullable<T> = null | T;

/*Пример state.*/
const initialState = {
    age: 10,
    name: 'John',

    /*Две строки ниже делают одно и тоже.*/
    // user: null as UserType | null,
    user: null as Nullable<UserType>,

    /*Воспринимай этот null как тип "PhotoType" или null. Так нужно, чтобы была возможность положить сюда объекты типа
    "PhotoType", но в то же время были бы разрешены случаи, когда "photo" пустовал. Две строки ниже делают одно и
    тоже.*/
    // photo: null as PhotoType | null
    photo: null as Nullable<PhotoType>
};

/*Создаем тип state из самого state при помощи typeof. Так можно делать если необходимо создать тип уже для
существующего объекта, такого как"state. Например, для ответов от сервера, которые мы наперед не получаем, так сделать
не получится.*/
type InitialStateType = typeof initialState;

/*Пример редьюсера. На входе принимает state типа "InitialStateType" и action-объекты с типом "ActionsType" (этот тип
создается в следующем примере). На выходе возвращает state с типом "InitialStateType".*/
const someReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    // state.photo = null; // Все хорошо.
    // state.photo = {large: 'path-to-large', small: 'path-to-small'}; // Все хорошо.
    // state.photo = 3; // Ошибка.
    // state.age = null; // Ошибка.

    /*Благодаря типу "ActionsType" будет на выбор только "SET-AGE" и "SET-NAME".*/
    switch (action.type) {

        case 'SET-AGE': {
            return {...state, age: action.age};
        }
        case 'SET-NAME': {
            return {...state, name: action.firstName + ' ' + action.lastName};
        }
        default: {
            return state;
        }
    }
};

/*--------------------------------------------------------------------------------------------------------------------*/

/*Создаем первый АС. Указываем здесь "as const", чтобы возвращаемый объект воспринимался TypeScript как константа в
целях более строгой типизации значений свойств объекта.*/
const AC1 = (age: number) => ({
    type: 'SET-AGE',
    age: age
} as const);

/*Создаем второй АС.*/
const AC2 = (firstName: string, lastName: string) => ({
    type: 'SET-NAME',
    firstName: firstName,
    lastName: lastName
} as const);

/*При помощи typeof сначала мы получаем тип "AC1", а далее при помощи функции ReturnType мы получаем тип того, что
возвращает эта функция, то есть тип action-объекта. Но, если не указать "as const" в самом "AC1", то TypeScript
определит, что 'SET-AGE' это строка и в итоге можно будет присвоить любое строковое значение свойству "type", что нам не
нужно. Таким образом можно получать типы action-объектов.*/
type AC1Type = ReturnType<typeof AC1>;
/*При помощи typeof сначала мы получаем тип "AC2", а далее при помощи функции ReturnType мы получаем тип того, что
возвращает эта функция, то есть тип action-объекта. Но, если не указать "as const" в самом "AC2", то TypeScript
определит, что 'SET-NAME' это строка и в итоге можно будет присвоить любое строковое значение свойству "type", что нам
не нужно. Таким образом можно получать типы action-объектов.*/
type AC2Type = ReturnType<typeof AC2>;
/*Создаем общий тип для всех action-объектов.*/
type ActionsType00 = AC1Type | AC2Type;

/*Эта строка заменяет сразу все три верхние строки.*/
type ActionsType = ReturnType<typeof AC1> | ReturnType<typeof AC2>;

// const action01: AC1Type = {type: 'SET-COLOR', age: 69}; // Ошибка.
const action01: AC1Type = {type: 'SET-AGE', age: 69}; // Все хорошо.

/*--------------------------------------------------------------------------------------------------------------------*/

/*При помощи extends указываем, что если уточненный подтип "T" будет указан как строка "user", то этот подтип будет
равен типу "UserType", иначе он будет равен типу "PhotoType".*/
type someExtendsType<T> = T extends 'user' ? UserType : PhotoType;

const a: someExtendsType<'user'> = {
    firstName: 'a',
    lastName: 'b',
    age: 69
};

const b: someExtendsType<'photo'> = {
    large: 'path-to-large',
    small: 'path-to-small'
};

/*--------------------------------------------------------------------------------------------------------------------*/

/*Более строгий вариант предыдущего типа с использованием нескольких extends: если подтип указан как строка "user", то
подтип будет "UserType", иначе если подтип указан как строка "photo", то подтип будет "PhotoType", иначе подтип будет
равен number.*/
type someExtendsType2<T> =
    T extends 'user' ? UserType :
        T extends 'photo' ? PhotoType :
            number;

const x: someExtendsType2<'user'> = {
    firstName: 'a',
    lastName: 'b',
    age: 69
};

const y: someExtendsType2<'photo'> = {
    large: 'path-to-large',
    small: 'path-to-small'
};

// const z: someExtendsType2<'music'> = { // Ошибка
//     large: 'path-to-large',
//     small: 'path-to-small'
// };

/*--------------------------------------------------------------------------------------------------------------------*/

/*Если при уточнении generic типа, который был создан с использованием extends, указать два подтипа, то тип сработает
дважды, то есть наш объект "f" может быть или с типом "UserType", или с типом "PhotoType", или сразу одновременно иметь
оба этих типа (даже один целый тип и часть второго). Здесь будет тип "UserType".*/
let f: someExtendsType<'user' | 'photo'> = {
    firstName: 'a',
    lastName: 'b',
    age: 69
};

/*Здесь будет тип "PhotoType".*/
f = {
    large: 'path-to-large',
    small: 'path-to-small'
};

/*Здесь будет тип "UserType" и "PhotoType" вместе.*/
f = {
    large: 'path-to-large',
    small: 'path-to-small',
    firstName: 'a',
    lastName: 'b',
    age: 69
};

/*Здесь будет тип в виде части "UserType" и всего "PhotoType" вместе.*/
f = {
    large: 'path-to-large',
    small: 'path-to-small',
    firstName: 'a',
    lastName: 'b'
};

/*--------------------------------------------------------------------------------------------------------------------*/

/*Создаем свой аналог ReturnType из TypeScript. Наш тип является generic, который принимает подтип "T", что
подразумевает, что будет уточняться тип функции в этом "T" при помощи typeof. Если подтип "T" будет совпадать с
функцией, которая принимает какое-то количество аргументов любого типа "(...args: any[])" и возвращает какое-то другое
значение с каким-то типом "R", то при помощи infer будет проанализирован этот тип "R" возвращаемого значения и возвращен
этот тип "R", иначе будет возвращен never, что примерно означает ничего не сделать.*/
type myReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

/*Делаем аналог типа "ActionsType", который указан выше, при помощи типа "myReturnType" - нашего аналога ReturnType из
TypeScript.*/
type ActionsType02 = myReturnType<typeof AC1> | myReturnType<typeof AC2>;

/*--------------------------------------------------------------------------------------------------------------------*/

/*Создаем некий "сложный" объект "obj01".*/
const obj01 = {
    a: {name: 'John'},
    b: {age: 33},
    c: {
        site: {title: 'some-website.hmm'}
    }
};

/*Тут мы получаем тип, равный любой комбинации типов, которые будут получены на основе внутренних частей нашего объекта
"obj01".*/
type obj01Type = typeof obj01.a | typeof obj01.b | typeof obj01.c;

/*Комбинация "obj01.a" и "obj01.b".*/
const obj02: obj01Type = {name: 'Bob', age: 69};

/*--------------------------------------------------------------------------------------------------------------------*/

/*Делаем аналог нашего типа "obj01Type" на случай если мы не хотим указывать все внутренности объекта. В данном случае
наш тип является generic, который принимает подтип "T", что подразумевает, что будет уточняться тип объекта в этом "T"
при помощи typeof. Если подтип "T" будет совпадать с объектом, у которого есть какой-то ключ "[key: string]" ("string" -
так как имя ключа это текст) с неким значением "U", то при помощи infer будет проанализировано это значение "U" и
возвращено это значение "U", иначе будет возвращено "never", что примерно означает ничего не сделать. И через такой
алгоритм пройдет каждое свойство объекта.*/
type PropertiesType<T> = T extends { [key: string]: infer U } ? U : never;

/*Снова делаем комбинацию "obj01.a" и "obj01.b".*/
const obj03: PropertiesType<typeof obj01> = {name: 'Bob', age: 69};

/*--------------------------------------------------------------------------------------------------------------------*/

/*Упаковываем пару AC в объект "packedActions" для более краткой типизации action-объектов ниже.*/
const packedActions = {
    AC3: (color: string) => ({
        type: 'SET-COLOR',
        color: color
    } as const),

    AC4: (height: number) => ({
        type: 'SET-HEIGHT',
        height: height
    } as const)
};

/*Создаем некий action-объект под именем "action02" и указываем ему тип следующим образом. Тип "PropertiesType" будет
работать как указано выше. Поскольку мы передаем "typeof packedActions" как уточнение для типа "PropertiesType", то этот
тип определит, что это объект с функциями внутри и вернет типы этих функций. Но нам нужны типы объектов, которые эти
функции возвращают, то есть типы action-объектов, поэтому сам весь этот тип "PropertiesType<typeof packedActions>" мы
указываем как уточнение для ReturnType, чтобы получить тип возвращаемых action-объектов этими функциями, то есть тип
action-объектов возвращаемых нашими "AC3" и "AC4".*/
let action02: ReturnType<PropertiesType<typeof packedActions>> = {
    type: 'SET-COLOR',
    color: 'green'
};

/*--------------------------------------------------------------------------------------------------------------------*/

/*Создаем еще один вариант state с его типом, редьюсер и общий тип для action-объектов для "AC3" и "AC4".*/
const initialState02 = {
    color: 'white',
    height: 69
};

type InitialStateType2 = typeof initialState02;

/*Здесь при типизации action-объектов можно использовать как тип "ActionsType03", так и "ActionsType04", создаваемый
ниже.*/
const someReducer02 = (state: InitialStateType2 = initialState02, action: ActionsType04): InitialStateType2 => {
    switch (action.type) {
        case 'SET-COLOR': {
            return {...state, color: action.color};
        }
        case 'SET-HEIGHT': {
            return {...state, height: action.height};
        }
        default: {
            return state;
        }
    }

    return state;
};

/*Создаем еще один более краткий вариант указания типизации для action-объектов при помощи упаковки всех AC в единый
объект.*/
type ActionsType03 = ReturnType<PropertiesType<typeof packedActions>>;

/*--------------------------------------------------------------------------------------------------------------------*/

/*Создаем псевдоним для "ReturnType<PropertiesType<typeof packedActions>>", где "T" это "typeof packedActions", под
названием "FinalActionsType". Также уточняем, что в типе "FinalActionsType" нужно указывать ограничение (constraint) для
передаваемого "T", указав, что это обязательно должен быть объект, обязательно имеющий в качестве значений свойств
функции, принимающие что-то и возвращающие что-то.*/
type FinalActionsType<T extends { [key: string]: (...args: any[]) => any }> = ReturnType<PropertiesType<T>>;

/*Создаем более краткий вариант типа "ActionsType03".*/
type ActionsType04 = FinalActionsType<typeof packedActions>;