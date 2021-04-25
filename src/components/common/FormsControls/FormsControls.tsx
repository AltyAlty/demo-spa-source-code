/*
Одной из задач этого файла является настройка графического отображения срабатываний валидаторов.
*/

import React from 'react';
/*
Подключаем сам "ReactJS", необходим везде, где мы что-то из него используем (например, JSX).
"WebPack" уже встроен в "ReactJS".
*/
import {Field, WrappedFieldMetaProps, WrappedFieldProps} from 'redux-form';
/*
Библиотека "redux-form" нужна для работы с формами.
Эта библиотека добавляет в "store", то есть в глобальный "state" свой "reducer" и
обрабатывает какую-то свою ветку данных. Эта ветка процессит все формы на сайте, что позволяет нам меньше делать работы
организации данных форм в "state".
Эта библиотека предоставляет специальный HOC. Задача компонента, которым этот HOC обвернет другой компонент,
является общаться со своей частью в "reducer".
Эта библиотека является устаревшей, поэтому лучше использовать более актуальные аналоги, например, "react-final-form",
который работыет на хуках. Так же может подойти "formik".
Эта библиотека, добавляя свою часть в глобальный "state", обязуется заниматься круговоротом данных (FLEX) со всеми
формами в приложении. То есть нам самим не нужно будет что-то диспатчить. Часть "state", которую создает эта библиотека,
не является по сути данными, относящимися к BLL, но при этом находятся в глобальном "state".
Также эта библиотека упрощает создание валидации форм, так как в ее "state" есть полезные для этого данные (поля и
свойства).
Так же стоит помнить, что дефолтное поведение кнопки при "submit" это отправка данных на сервер,
что является индикатором для перерисовки в React.
После создания части в глобальном "state", нужно необходимые формы обварачивать в HOC "reduxForm" из библиотеки
"redux-form" (как и метод "connect", метод "reduxForm" не совсем является HOC, он вызывается дважды, сначала мы
вызываем функцию "reduxForm" и настраиваем ее, а потом она уже вернет нам некий HOC, и этим HOC при помощи замыкания
мы обворачиваем форму, вследствие чего вокруг компонента с формой появится контейненый компонент, который будет
диспатчить и общаться с глобальным "state").
Каждой форме нужно давать уникальное имя, чтобы не появилось проблем с библиотекой "redux-form".
Вместо "input" необходимо использовать "Field" из библиотеки "redux-form". Указывая в нем атрибут "component", мы
указываем какой элемент нужно отрисовать. Другие указанные атрибуты перейдут в отрисованный элемент. Также необходимо
указывать атрибут "name", чтобы дать имя отправляемым через этот "input" данным. Библиотека "redux-form" будет
реагировать на эти атрибуты "name" и осуществлять круговорот данных.

"WrappedFieldMetaProps" - этот тип мы нашли в файле декларации "Field" ("Ctrl+click" в "WebStorm") и использовали его
для указания типа созданного нами компонента "FormControl". Поэтому импортировали этот тип сюда из библиотеки
"redux-form".
"WrappedFieldProps" - этот тип мы нашли в файле декларации "Field" ("Ctrl+click" в "WebStorm") и использовали его для
указания типа созданных нами компонентов "Textarea" и "Input". Поэтому импортировали этот тип сюда из библиотеки
"redux-form".
*/
import {FieldValidatorType} from '../../../utils/validators/validators'; /*Импортируем типы.*/

import styles from './FormsControls.module.css'; /*Подключаем стили из CSS-модуля.*/


/*Типизируем "props" для компонента "FormControl". "Props" в этом компоненте должны обязательно содержать следующие
поля с указанными типами. Все это нужно для указания типа "props" в функциональном компоненте.*/
type FormControlPropsType = {
    meta: WrappedFieldMetaProps /*Объект "meta" с мета-данными, который приходит к нам сверху из элемента "Field" из
    библиотеки "redux-form", должен иметь тип "WrappedFieldMetaProps", который мы нашли в файле декларации "Field"
    ("Ctrl+click" в "WebStorm") и импортировали сюда.*/
};

/*
"FormControl" это функциональный компонент, который создан в виде стрелочной функции.
При взаимодействии с функциональным компонентом React не хранит его постоянно в памяти.
React вызывает функциональный компонент, он делает свою работу (например, возвращает JSX) и компонент удаляется
из памяти.
Функциональный компонент можно создать еще и таким образом: function FormControl(props) {тело}.
Компонент это функция, которая возвращает JSX.
JSX совмещает в себе JS и HTML.
В JSX для указания класса в стилях нужно использовать "className" вместо "class".
В JSX скобки {} позволяют использовать JS-код внутри HTML-кода.
Каждый компонент это новый тег для ReactJS, и эти теги используются для вызова этих компонентов.
Теги компонентов можно вкладывать друг в друга, тем самым образуя дерево компонентов.
Каждый компонент желательно помещать в отдельный файл.
Каждый компонент всегда вызывается с объектом, внутри которого какие-то параметры.
Если параметры не указаны, то им все равно передается пустой объект в качестве параметров.
Принято объект с параметрами именовать как "props".
Вызывая тег компонента и передавая ему атрибуты, мы отдаем ему параметры.
"FormControl" является компонентом, который будет содержать общую логику для графического отображения срабатывания
валидаторов независимо от типа элемента. Этот компонент получает на входе мета-данные, содержащие информацию о том, что
касались ли мы элемента и есть ли какая-либо ошибка (вроде это все берется из библиотеки "redux-form", текст ошибки
вроде берется из того, что возвращают валидаторы при срабатывании и передают это в элемент "Field", собственно от
элемента "Field" этот компонент и будет получать эти данные при помощи замыкания), а также получает информацию
о дочернем элементе.
*/
const FormControl: React.FC<FormControlPropsType> = ({meta: {touched, error}, children}) => {
    const hasError = touched && error; /*Создали специальную константу для удобства, которая содержит условие, что
    в мета-данных указано, что мы касались элемента (meta.touched) и что присутствует какая-то ошибка (meta.error).
    Этот объект "meta" с мета-данными придет к нам сверху из элемента "Field". Указали при помощи "React.FC<>", что
    "props" в этом функциональном компоненте имеют тип "FormControlPropsType".*/

    /*
    Здесь после return в компоненте начинается HTML разметка.
    Нужно помнить, что в этой разметке должен быть только один корневой элемент.
    Поскольку то, что возвращает return указано с новой строки, поэтому все возвращаемое помещено в круглые скобки.
    */
    return (
        <div className={styles.formControl + " " + (hasError ? styles.error : "")}> {/*Этот элемент "div" и есть наш
        корневой элемент. Этот компонент возврщает JSX, в котором будет элемент "div", внутри которого будет меняться
        CSS в зависимости от значения константы "hasError".
        То есть будет два варианта:
        - "styles.formControl styles.error"
        - "styles.formControl "*/}
            <div> {/*Внутри отрисовываем еще один элемент "div". "children" это ключевое слово в "ReactJS". При помощи
            этого слова этот элемент "div" будет отрисовывать потомков, которые будут указаны в месте вызова компонента
            "FormControl".*/}
                {children}
            </div>
            <div> {/*Также внутри отрисовываем еще один элемент "div". В этом элементе будет отображаться элемент "span"
            с текстом ошибки, указанного в валидаторе.*/}
                {hasError && <span>{error}</span>}
            </div>
        </div>
    )
};

/*Далее создаем два компонента на экспорт, которые будут использоваться для отрисовки элементов "textarea" и "input" в
других местах, где в таких элементах требуется валидация.*/
export const Textarea: React.FC<WrappedFieldProps> = (props) => { /*Указали при помощи
"React.FC<>", что "props" в этом функциональном компоненте имеют тип "WrappedFieldProps". Этот тип мы нашли в файле
декларации "Field" ("Ctrl+click" в "WebStorm") и импортировали сюда.*/
    const {input, meta, ...restProps} = props; /*Таким образом при помощи деструктуризации мы создаем константы:
    - const input = props.input; (здесь внутри есть "input.value" - это то, что введено в поле, создается элементом
    "Field" из библиотеки "redux-form")
    - const meta = props.meta. (это мета-данные (тоже создаются элементом "Field" из библиотеки "redux-form"), например,
    внутри них есть "touched" или "error", которые используются в компоненте "FormControl")
    А "...restProps" это остальные "props" (в виде объекта), которые в дальнейшем можно передавать как "...restProps",
    например, там будет "placeholder" для элементов "textarea" или "input".*/
    return <FormControl {...props}><textarea {...input} {...restProps}/></FormControl> /*Этот компонент возвращает
    компонент "FormControl", который получит "props" свыше и деструктуризирует их и передаст дочерним элементам. А в
    качестве дочернего элемента этот компонент будет иметь элемент "textarea", внутри которого будет при помощи
    деструктуризации передано:
    - "input.value" - то, что введено в поле;
    - остальные "input." свойства;
    - и объект с остальными "props".

    То есть поскольку компонент "Textarea" будет использоваться в элементе "Field" из библиотеки "redux-form" (цепочка
    будет такая: элемент "Field" - компонент "Textarea" - компонент "FormControl" - элемент "textarea"), то значит, что
    компонент "FormControl" получит "сверху" "props.meta.touched" и "props.meta.error" при помощи
    библиотеки "redux-form", которые ему необходимы для работы. А также компонент "FormControl" получит информацию о
    своем дочернем элементе "textarea", так использует ключевое слово "children" из React, поэтому он сможет передать
    этому дочернему элементу необходимые для него "props", например "placeholder" (то есть при помощи замыкание будет
    доступ к "props" из элемента "Field", компонента "Textarea" и компонента "FormControl").*/
};

export const Input: React.FC<WrappedFieldProps> = (props) => { /*Указали при помощи
"React.FC<>", что "props" в этом функциональном компоненте имеют тип "WrappedFieldProps". Этот тип мы нашли в файле
декларации "Field" ("Ctrl+click" в "WebStorm") и импортировали сюда.*/
    const {input, meta, ...restProps} = props; /*Таким образом при помощи деструктуризации мы создаем константы:
    - const input = props.input; (здесь внутри есть "input.value" - это то, что введено в поле, создается элементом
    "Field" из библиотеки "redux-form")
    - const meta = props.meta. (это мета-данные (тоже создаются элементом "Field" из библиотеки "redux-form"), например,
    внутри них есть "touched" или "error", которые используются в компоненте "FormControl")
    А "...restProps" это остальные "props" (в виде объекта), которые в дальнейшем можно передавать как "...restProps",
    например, там будет "placeholder" для элементов "textarea" или "input".*/
    return <FormControl {...props}><input {...input} {...restProps}/></FormControl> /*Этот компонент возвращает
    компонент "FormControl", который получит "props" свыше и деструктуризирует их и передаст дочерним элементам. А в
    качестве дочернего элемента этот компонент будет иметь элемент "input", внутри которого будет при помощи
    деструктуризации передано:
    - "input.value" - то, что введено в поле;
    - остальные "input." свойства;
    - и объект с остальными "props".

    То есть поскольку компонент "Input" будет использоваться в элементе "Field" из библиотеки "redux-form" (цепочка
    будет такая: элемент "Field" - компонент "Input" - компонент "FormControl" - элемент "input"), то значит, что
    компонент "FormControl" получит "сверху" "props.meta.touched" и "props.meta.error" при помощи
    библиотеки "redux-form", которые ему необходимы для работы. А также компонент "FormControl" получит информацию о
    своем дочернем элементе "input", так использует ключевое слово "children" из React, поэтому он сможет передать этому
    дочернему элементу необходимые для него "props", например "placeholder" (то есть при помощи замыкание будет доступ
    к "props" из элемента "Field", компонента "Input" и компонента "FormControl").*/
};

/*Создали функцию "createField", которая принимает параметры и создает элементы формы. Мы ее используем для создания
формы в "Login.tsx".*/
export function createField<FormKeysType extends string>( /*Указали, что "createField" теперь обобщенный, то есть
"generic". Если бы мы описали эту функцию стрелочным синтаксисом, то у нас так не получилось бы ее сделать "generic".
То есть теперь мы можем уточнять эту функцию при ее использовании, а точнее мы будем уточнять свойство "name", поэтому
указываем придуманный нами тип "FormKeysType" здесь и в самом "name" дальше. При помощи "extends string" указали, что
этот тип экстендится от типа строки, хотя и может быть более сложным. Последнее нам нужно, чтобы не было ошибки ниже в
"name={name}", так как там по сути ожидается строка.*/
                            placeholder: string | undefined, /*Текст "placeholder". Должен быть строкой или "undefined"
                            (то есть отсуствовать вовсе, а не быть пустым).*/
                            name: FormKeysType, /*Имя данных, которые будут вводится в это поле. Имеют тип
                            "FormKeysType", то есть здесь указываются какие-то ключи, но какие именно мы должны
                            указывать сами в каждой форме. Нам это нужно для того, чтобы проводить типизацию в целях
                            избежания ошибки при указании свойства "name" в "createField" в компонентах. Это свойство
                            важно для формирования имен свойств "formData", то есть данных формы.*/
                            component: React.FC<WrappedFieldProps>, /*Какой компонент отрисовываем (например,
                            "Textarea"). Указали при помощи "React.FC<>", что "props" в этих функциональных компонентах
                            имеют тип "WrappedFieldProps". Этот тип мы нашли в файле декларации "Field" ("Ctrl+click"
                            в "WebStorm") и импортировали сюда.*/
                            validators: Array<FieldValidatorType>, /*Валидаторы. Должны быть в виде массива элементов с
                            типом "FieldValidatorType", который мы создали и импортировали сюда.*/
                            props = {}, /*Любые другие "props".*/
                            text = '' /*Текст, который необходим некоторым элементам (например, "Remember me?"
                            для чек-бокса "Запомнить меня?"). Должно быть по умолчанию строкой.*/
) {
/*???*/
    return (
        <div> {/*В итоге функция создает отдельный элемент "div", в котором внутри есть элемент "Field" из библиотеки
        "redux-form". Что из себя будет представлять этот элемент "Field" будет зависеть от параметров выше.*/}
            <Field placeholder={placeholder}
                   name={name}
                   component={component}
                   validate={validators}
                   {...props}
            /> {text}
        </div>
    )
};