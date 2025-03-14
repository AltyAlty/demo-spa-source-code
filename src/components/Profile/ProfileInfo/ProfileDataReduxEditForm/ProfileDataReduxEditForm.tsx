import React from 'react';
/*В данном файле работа с библиотекой Redux Form происходит следующим образом:
1. callback-функция "handleSubmit()" указана в компоненте "ProfileDataEditForm".
2. оборачиваем компонент "ProfileDataEditForm" функцией "reduxForm()" в компоненте "ProfileDataReduxEditForm", тем самым
предоставляя callback-функцию "handleSubmit()" для компонента "ProfileDataEditForm".
3. компонент "ProfileDataReduxEditForm" указывается в компоненте "ProfileInfo" в файле "ProfileInfo.tsx", куда в событие
"onSubmit" будет попадать объект с данными, сформированный в событии "onSubmit" при помощи callback-функции
"handleSubmit()" в компоненте "ProfileDataEditForm".

То есть при срабатывании события "onSubmit" сначала вызывается callback-функция "handleSubmit()" в компоненте
"ProfileDataEditForm", которая собирает все данные из формы и помещает их в объект. Потом внутри callback-функции
"handleSubmit()" вызывается нами созданная callback-функция "onSubmit()" (доступна из контейнерного компонента
"ProfileDataReduxEditForm") из компонента "ProfileInfo" в файле "ProfileInfo.tsx". В компонент "ProfileInfo" в файле
"ProfileInfo.tsx" передается указанный объект с данными и собираются в одном месте, потом эти данные передаются в
компонент "ProfileDataReduxEditForm", из которого перенаправляются в глобальный state в виде объекта под именем
"editProfile".

В компонент "ProfileDataEditForm" внедряются некие дополнительные props (например, та же callback-функция
"handleSubmit()") ХОКом, который образуется при помощи компонента "ProfileDataReduxEditForm". Эти props содержатся под
именем "InjectedFormProps". Эти "InjectedFormProps" также содержат добавленные нами props. Поэтому мы импортировали
"InjectedFormProps" из библиотеки Redux Form, чтобы типизировать такие props в компоненте "ProfileDataEditForm".*/
import {InjectedFormProps, reduxForm} from 'redux-form';
import style from '../ProfileInfo.module.css';
import styles from '../../../common/FormsControls/FormsControls.module.css';
/*Импортируем созданный нами компонент "Textarea" для создания элемента "textarea" с возможностью указывать валидацию.
Также импортируем созданный нами компонент "Input" для создания элемента "input" с возможностью указывать валидацию.
Также импортируем функцию "createField()", которая принимает параметры и создает элементы формы. Мы ее используем для
создания формы в компоненте "ProfileDataEditForm". Дополнительно импортируем оттуда тип "GetValuesKeysType".*/
import {createField, GetValuesKeysType, Input, Textarea} from '../../../common/FormsControls/FormsControls';
/*Импортируем тип "ProfileType".*/
import {ProfileType} from '../../../../types/types';

/*Создаем тип для "собственных props" компонента "ProfileDataEditForm".*/
type ProfileDataEditFormOwnPropsType = {
    /*Информация о профиле пользователя, полученная с сервера должна быть типа "PostType" или иметь тип null, то есть
    быть пустой. Тип "PostType" был создан нами и импортирован сюда. Не указываем здесь any или пустой объект, так как
    сверху этому компоненту приходит "profile" из компонента "ProfileInfo" из файла "ProfileInfo.tsx".*/
    profile: ProfileType
};

/*Создаем тип для props компонента "ProfileDataEditForm", которые будут использоваться в "formData" для компонента
"ProfileInfo" в файле "ProfileInfo.tsx". В "formData" находятся данные по пользователю в виде объекта с типом
"ProfileType".*/
export type ProfileDataEditFormValuesType = ProfileType;

/*Следующий тип мы создаем специально, чтобы мы не могли допустить ошибок при указании свойства "name" в функции
"createField()". Это свойство важно для формирования имен свойств "formData", то есть данных формы. Для этого мы
используем созданный нами и импортированный сюда вспомогательный тип "GetValuesKeysType". Нужные нам имена свойств уже
перечислены в типе "ProfileDataEditFormValuesType", поэтому мы при помощи этого типа "GetValuesKeysType" получаем типы
ключей из типа "ProfileDataEditFormValuesType".*/
type ProfileDataEditFormValuesKeysType = GetValuesKeysType<ProfileDataEditFormValuesType>;

/*"ProfileDataEditForm" это функциональный компонент, который создан в виде стрелочной функции. "ProfileDataEditForm"
является компонентом, который представляет собой форму для редактирования профиля пользователя на странице профиля в
виде заготовки для оборачивания ее функцией "reduxForm()".

Внутри компонента "ProfileDataEditForm" используются следующие компоненты:
1. "Input" - компонент, который используется для отрисовки элементов "input" в других местах, где в таких элементах
требуется валидация. Импортирован.
2. "Textarea" - компонент, который используется для отрисовки элементов "textarea" в других местах, где в таких
элементах требуется валидация. Импортирован.

Компонент "ProfileDataEditForm" используется в компоненте "ProfileDataReduxEditForm" в этом же файле и оборачивается
функцией "reduxForm()", тем самым получая callback-функцию "handleSubmit()".

При помощи деструктуризации props указываем какие именно props мы получаем:
1. "handleSubmit" - callback-функция "handleSubmit()".
2. "profile" - Данные профиля пользователя для страницы профиля.
3. "error" - Свойство, содержащее текст ошибки (если была). Свойство "error" будет в объекте props благодаря библиотеке
Redux Form, в него подцепится значение из TC "saveProfile()".

Указываем при помощи "React.FC<>", что props в этом функциональном компоненте имеют тип
"InjectedFormProps<ProfileDataEditFormValuesType, ProfileDataEditFormOwnPropsType> & ProfileDataEditFormOwnPropsType>".

Такая комбинация получилась следующим образом:
1. "InjectedFormProps<ProfileDataEditFormValuesType, ProfileDataEditFormOwnPropsType>" - здесь мы уточняем внедренные
ХОКом, который образуется при помощи компонента "ProfileDataReduxEditForm", "InjectedFormProps".
"ProfileDataEditFormValuesType" указывает, что приходит из этого ХОКа, а "ProfileDataEditFormOwnPropsType" указывает,
что приходит со стороны - "profile".
2. "& ProfileDataEditFormOwnPropsType" - также этот компонент содержит некие свои "собственные props", которые не
приходят от ХОКа выше - тот же "profile".

Это мы делаем на основании файла декларации "InjectedFormProps". Там указано, что первым параметром принимаются
"formData" - то есть какие именно данные собирает форма в компоненте, оборачиваемый функцией "reduxForm()" (то есть
компонент "ProfileDataEditForm"), и "собственные props" этого компонента "ProfileDataEditForm", непреходящие от ХОКа
выше (так нужно для внутренней работы "InjectedFormProps"). А вторым параметром принимаются еще раз некие свои
"собственные props", которые не приходят от ХОКа выше (так уже надо для работы самого этого компонента
"ProfileDataEditForm"). Третьим параметром принимается вид ошибки формы с типом строки, но в данном случае мы этого не
указываем.

Только все эти три параметра указываются как бы вместе как единый параметр, а не через запятую как три разных параметра.
ВОЗМОЖНО, это потому, что "InjectedFormProps" является объектом (как единое целое состоит из разных свойств, которые
можно типизировать суммой разных типов), а та же функция "reduxForm()" является функцией (принимает последовательность
параметров, где каждый параметр нужно отдельно типизировать).*/
const ProfileDataEditForm:
    React.FC<InjectedFormProps<ProfileDataEditFormValuesType, ProfileDataEditFormOwnPropsType>
        & ProfileDataEditFormOwnPropsType> = ({handleSubmit, profile, error}) => {
    return (
        /*Здесь в элементе "form" в событии "onSubmit" указываем callback-функцию "handleSubmit()".*/
        <form onSubmit={handleSubmit}>
            {/*Создаем специальный элемент "div", внутри которого будет находиться элемент "button", используемы как
            кнопка для сабмита данных введенных в форму.*/}
            <div>
                <button>save</button>
            </div>

            {/*Если произошла какая-то ошибка, то выведем ее в отдельном элементе "div". Свойство "error" будет в
            объекте props благодаря библиотеке Redux Form, в него подцепится значение из TC "saveProfile()".*/}
            {error && <div className={styles.formSummaryError}>{error}</div>}

            {/*Этот элемент "div" содержит поле для ввода полного имени пользователя.*/}
            <div>
                <b>1. Full Name</b>:
                {/*Создаем поле для ввода полного имени пользователя на основе импортированной функции "createField()".
                Уточняем здесь функцию "createField()", что она имеет тип "ProfileDataEditFormValuesKeysType", созданный
                нами выше.*/}
                {createField<ProfileDataEditFormValuesKeysType>(
                    'Full Name',
                    'fullName',
                    Input,
                    []
                )}
            </div>

            {/*Этот элемент "div" содержит поле для ввода информации о пользователе "Обо мне".*/}
            <div>
                <b>2. About Me</b>:
                {/*Создали поле для ввода информации о пользователе "Обо мне" на основе импортированной функции
                "createField()".*/}
                {createField<ProfileDataEditFormValuesKeysType>(
                    'About Me',
                    'aboutMe',
                    Input,
                    []
                )}
            </div>

            {/*Этот элемент "div" содержит поля для ввода контактов пользователя. Создаются эти поля аналогично как это
            делается в компоненте "ProfileData" из файла "ProfileData.tsx". При помощи метода "keys()" глобального
            объекта "Object" мы можем проитерироваться по ключам переданного объекта "profile.contacts". Возьмутся все
            ключи "key" и завернутся в массив строк. А далее мы мапим этот массив, чтобы отрисовать JSX с однотипным
            полями контактов при помощи небольшого куска JSX (в компоненте "ProfileData" из файла "ProfileData.tsx" для
            такого JSX мы создавали вспомогательную компоненту "Contact" в файле "Contact.tsx").*/}
            <div>
                <b>3. Contacts</b>: {Object
                .keys(profile.contacts)
                .map(key => {
                    return (
                        /*Отрисовываем элемент "div", который представляет собой типовое поле для указания контакта.*/
                        <div key={key} className={style.contact}>
                            {/*Внутри этот элемент "div" будет представлять собой следующее:
                            "Текст заголовка поля контакта": "Текст со значением самого контакта". Первое будет браться
                            из ключа "key". Второе будет создаваться на основе импортированной функции "createField()".
                            "name" во втором будет получаться так: к тексту "contacts." будет прибавляться текст ключа
                            (например, "github"), что в итоге будет давать правильную структуру контактов (например,
                            "contacts.github") для составления объекта с контактами, который сможет понять сервер при
                            получении объекта с данным по профилю пользователя. Здесь отсутствует уточнение типа у
                            функции "createField()", поэтому в дальнейшем его необходимо добавить здесь.*/}
                            <b>{key}: {createField(
                                key,
                                'contacts.' + key,
                                Input,
                                []
                            )}</b>
                        </div>
                    )
                })}
            </div>

            {/*Этот элемент "div" содержит поле для указания ищет ли в данный момент работу пользователь.*/}
            <div>
                <b>4. Is looking for a job?</b>
                {/*Создаем поле для указания ищет ли в данный момент работу пользователь на основе импортированной
                функции "createField()".*/}
                {createField<ProfileDataEditFormValuesKeysType>(
                    '',
                    'lookingForAJob',
                    Input,
                    [],
                    {type: 'checkbox'}
                )}
            </div>

            {/*Этот элемент "div" содержит поле для ввода работы, которую ищет пользователь.*/}
            <div>
                <b>Which one?</b>
                {/*Создали поле для ввода работы, которую ищет пользователь, на основе импортированной функции
                "createField()".*/}
                {createField<ProfileDataEditFormValuesKeysType>(
                    'Which one?',
                    'lookingForAJobDescription',
                    Textarea,
                    []
                )}
            </div>
        </form>
    )
};

/*Компонент "ProfileDataReduxEditForm" является отдельным контейнерным компонентом, цель которого в этом же файле
обернуть компонент "ProfileDataEditForm" функцией "reduxForm()", чтобы предоставить callback-функцию "handleSubmit()".
Именно компонент "ProfileDataReduxEditForm" будет заниматься общением с глобальным state.

Внутри компонента "ProfileDataReduxEditForm" используются следующие компоненты:
1. "ProfileDataEditForm" - компонент, который представляет собой форму для редактирования профиля пользователя на
странице профиля в виде заготовки для оборачивания ее функцией "reduxForm()". Из этого же файла.

Компонент "ProfileDataReduxEditForm" импортируется в файле "ProfileInfo.tsx" и используется в компоненте "ProfileInfo".

Функция "reduxForm()" является generic, поэтому мы ее уточняем. В файле декларации функции "reduxForm()" указано, что он
принимает следующие данные:
1. "formData" - какие именно данные собирает форма в компоненте (то есть в компоненте "ProfileDataEditForm"),
оборачиваемым функцией "reduxForm()";
2. "собственные props" компонента (то есть компонента "ProfileDataEditForm"), которого оборачиваем функцией
"reduxForm()";
3. вид ошибки формы с типом строки, но в данном случае мы этого не указываем.*/
export const ProfileDataReduxEditForm = reduxForm<ProfileDataEditFormValuesType, ProfileDataEditFormOwnPropsType>({
    /*Это то самое уникальное имя для данных этой формы, которые будут попадать в глобальный state.*/
    form: 'editProfile'
})(ProfileDataEditForm);