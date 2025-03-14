/*Этот файл содержит валидаторы для полей и форм. Валидацию можно делать как для отдельного поля, так и для всей формы.
Мета-данные это дополнительные данные о данных. Библиотека Redux Form позволяет нам использовать валидаторы, встроенные
в нее. В нашем приложении добавлена валидация на страницах профиля, диалогов и логина. При срабатывании указанных здесь
валидаторов submit формы не сработает. То, что возвращают валидаторы попадает в свойство "error", которое создается
библиотекой Redux Form.*/

/*Создаем тип для валидаторов. Валидатор должен быть функцией, которая принимает строковой параметр и возвращает
строковой параметр или undefined, то есть ничего.*/
export type FieldValidatorType = (value: string) => string | undefined;

/*Это валидатор, который проверяет обязательное заполнение поля. При вызове этой функции в нее будет приходить то, что
находится в поле. Указали, что этот валидатор имеет тип "FieldValidatorType".*/
export const required: FieldValidatorType = (value) => {
    /*Здесь проверяем имеется ли какое-либо введенное значение в поле, если есть, то ничего не происходит.*/
    if (value) return undefined;
    /*Если никакого значение не указано в поле, то будет выводиться соответствующее информационное сообщение.*/
    return 'Field is required';
};

/*Это валидатор, который проверяет не превышает ли введенный текст в поле максимального количества символов для этого
поля. При вызове этой функции в нее будет приходить значение, которое обозначает максимальное количество символов для
какого-то поля, и то, что введено в поле. То есть здесь одна функция принимает числовой параметр и возвращает другую
функцию, то есть наш валидатор, которая имеет тип "FieldValidatorType".*/
export const maxLengthCreator = (maxLength: number): FieldValidatorType => (value) => {
    /*Если длина текста в поле больше значения, которое обозначает максимальное количество символов для этого поля, то
    будет выводиться соответствующее информационное сообщение.*/
    if (value.length > maxLength) return `max length is ${maxLength} symbols`;
    /*Если же длина текста в поле меньше или равна значению, которое обозначает максимальное количество символов для
    этого поля, то ничего не происходит.*/
    return undefined;
};