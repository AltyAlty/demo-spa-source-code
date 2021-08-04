/*
Этот файл содержит валидаторы для полей и форм. Валидацию можно делать как для отдельного поля, так и для всей формы.
Мета-данные это дополнительные данные о данных. Библиотека redux-form позволяет нам использовать валидаторы, встроенные
в нее. В нашем проекте добавлена валидация на страницах Профиля, Диалогов и Логина. При срабатывании указанных здесь
валидаторов, "submit" формы не сработает. То, что возвращают валидаторы попадает в свойство "error", которое создается
библиотекой "redux-form".
*/

/*Создаем тип для валидаторов.*/
export type FieldValidatorType = (value: string) => string | undefined; /*Валидатор должен быть функцией, которая
принимает строковой параметр и возвращает строковой параметр или "undefined", то есть ничего.*/


/*Это валидатор, который проверяет обязательное заполнение поля.*/
export const required: FieldValidatorType = (value) => { /*При вызове этой функции в нее будет приходить то,
что находится в поле. Указали, что этот валидатор имеет тип "FieldValidatorType".*/
    if (value) return undefined; /*Здесь проверяется имеется ли какое-либо введенное значение в поле, если есть,
    то ничего не происходит.*/
    return 'Field is required'; /*Если никакого значение не указано в поле, то будет выводится соотвествующее
    информационное сообщение.*/
};


/*Это валидатор, который проверяет не превышает ли введенный текст в поле максимального количества символов для этого
поля.*/
export const maxLengthCreator = (maxLength: number): FieldValidatorType => (value) => { /*При вызове этой функции
в нее будет приходить значение, которое обозначает максимальное количество символов для какого-то поля, и то, что
введено в поле. То здесь одна функция принимает числовой параметр и возвращает другую функцию, то есть наш валидатор,
которая имеет тип "FieldValidatorType".*/
    if (value.length > maxLength) return `max length is ${maxLength} symbols`; /*Если длина текста в поле больше
    значения, которое обозначает максимальное количество символов для этого поля, то будет выводится соотвествующее
    информационное сообщение.*/
    return undefined; /*Если же длина текста в поле меньше и равна значению, которое обозначает максимальное количество
    символов для этого поля, то ничего не происходит.*/
};