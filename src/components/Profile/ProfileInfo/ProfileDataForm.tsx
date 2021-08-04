import React from 'react';
/*
Подключаем сам "ReactJS", необходим везде, где мы что-то из него используем (например, JSX).
"WebPack" уже встроен в "ReactJS".
*/
import {InjectedFormProps, reduxForm} from 'redux-form';
/*
Библиотека "redux-form" нужна для работы с формами.
Эта библиотека добавляет в "store", то есть в глобальный "state" свой "reducer" и
обрабатывает какую-то свою ветку данных. Эта ветка процессит все формы на сайте, что позволяет нам меньше делать работы
по организации данных форм в "state".
Эта библиотека предоставляет специальный HOC. Задача компонента, которым этот HOC обвернет другой компонент,
является общаться со своей частью в "reducer".
Эта библиотека является устаревшей, поэтому лучше использовать более актуальные аналоги, например, "react-final-form",
который работыет на хуках. Так же может подойти "formik".
Эта библиотека, добавляя свою часть в глобальный "state", обязуется заниматься круговоротом данных (FLUX) со всеми
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

Для получения данных при "submit" есть особый callback "handleSubmit" в "props", который создается при обворачивании
"reduxForm". В форме в событии "onSubmit" нужно указывать этот callback. В этом callback отключено дефолтное поведение
по перезагрузке страницы. Также в нем идет сбор всех данных и они упаковываются в объект, а затем вызывается
"props.onSubmit()" у родителя (то есть у контейнерного компонента над компонентом с формой), в который передается этот
объект с данными. То есть мы должны в контейнерный компонент над компонентом с формой передать некий метод,
срабатывающий при событии "onSubmit". Этот некий метод будет использоваться для передачи данных формы во внешний мир,
то есть в глобальный "state".

То есть в нашем случае происходит следующее:
- callback "handleSubmit" указан в компоненте "ProfileDataForm".
- обворачиваем компонент "ProfileDataForm" HOC-ом "reduxForm" в компоненте "ProfileDataReduxForm", тем самым
предоставляя callback "handleSubmit" для компонента "ProfileDataForm".
- компонент "ProfileDataReduxForm" указывается в компоненте "ProfileInfo" в файле "ProfileInfo.tsx", куда в
событие "onSubmit" будет попадать объект с данными, сформированный в событии "onSubmit" при помощи
callback "handleSubmit" в компоненте "ProfileDataForm".

То есть при срабатывании события "onSubmit" сначала вызывается callback "handleSubmit" в компоненте "ProfileDataForm",
который собирает все данные из формы и помещает их в объект, потом внутри callback "handleSubmit" вызывается нами
созданный callback "onSubmit" (доступен из контейнерного компонента "ProfileDataReduxForm") из компонента "ProfileInfo"
в файле "ProfileInfo.tsx", в который передается указанный объект с данными и собираются в одном месте, потом эти данные
передаются в компонент "ProfileDataReduxForm", из которого перенаправляются в глобальный "state" в виде объекта под
именем "editProfile".

То есть общая логика при работе с библиотекой "redux-form" такова:
- вынести саму форму в отдельный компонент;
- повесить callback "handleSubmit" в качестве обработчика события "onSubmit" в этой форме;
- в этой форме вместо элементов "input" и прочего используем элемент "Field";
- обворачиваем эту форму HOC-ом "reduxForm".

В компонент "ProfileDataForm" внедряются некие дополнительные "props" (например, тот же "handleSubmit") ХОКом, который
образуется при помощи компонента "ProfileDataReduxForm". Эти "props" содержатся под именем "InjectedFormProps". Эти
"InjectedFormProps" также содержат добавленные нами "props". Поэтому мы импортировали "InjectedFormProps" из библиотеки
"reduxForm", чтобы типизировать такие "props" в компоненте "ProfileDataForm".
*/

import {createField, GetValuesKeysType, Input, Textarea} from '../../common/FormsControls/FormsControls'; /*Подключаем
созданный нами компонент "Textarea" для создания элемента "textarea" с возможностью указывать валидацию. Также
подключаем созданный нами компонент "Input" для создания элемента "input" с возможностью указывать валидацию. Также
импортируем функцию "createField", которая принимает параметры и создает элементы формы. Мы ее используем для создания
формы в компоненте "ProfileDataForm". Дополнительно импортируем оттуда тип "GetValuesKeysType".*/

import style from './ProfileInfo.module.css'; /*Подключаем стили из CSS-модуля.*/
import styles from '../../common/FormsControls/FormsControls.module.css'; /*Подключаем стили из CSS-модуля.*/

import {ProfileType} from '../../../types/types'; /*Подключаем типы.*/


/*Создаем тип для "собственных props" компонента "ProfileDataForm". "Собственные props" в этом компоненте должны
обязательно содержать следующие поля с указанными типами.*/
type ProfileDataFormOwnPropsType = {
    profile: ProfileType /*Информация о профиле пользователя, полученная с сервера должна быть типа "PostType"
    или иметь тип "null", то есть быть пустой. Тип "PostType" был создан нами и импортирован сюда. Не указываем здесь
    "any" или пустой объект, так как сверху этому компоненту приходит "profile" из компонента "ProfileInfo" из файла
    "ProfileInfo.tsx".*/
};

/*Создаем тип для "props" компонента "ProfileDataForm", которые будут использоваться в "formData" для компонента
"ProfileInfo" в файле "ProfileInfo.tsx". Эти "props" в этом компоненте должны обязательно содержать следующие поля с
указанными типами.*/
export type ProfileDataFormValuesType = ProfileType; /*В "formData" находятся данные по пользователю в виде объекта
с типом "ProfileType", который мы создали и импортировали сюда.*/

/*Следующий тип мы создали специально, чтобы мы не могли допустить ошибку при указании свойства "name" в "createField".
Это свойство важно для формирования имен свойств "formData", то есть данных формы. Для этого мы использовали созданный
нами и иимпортированный сюда вспомогательный тип "GetValuesKeysType". Нужные нам имена свойств уже перечислены в типе
"ProfileDataFormValuesType", поэтому мы при помощи этого типа "GetValuesKeysType" получаем типы ключей из типа
"ProfileDataFormValuesType".*/
type ProfileDataFormValuesKeysType = GetValuesKeysType<ProfileDataFormValuesType>;


/*
"ProfileDataForm" это функциональный компонент, который создан в виде стрелочной функции.
При взаимодействии с функциональным компонентом React не хранит его постоянно в памяти.
React вызывает функциональный компонент, он делает свою работу (например, возвращает JSX) и компонент удаляется
из памяти.
Функциональный компонент можно создать еще и таким образом: function ProfileData(props) {тело}.
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
"ProfileDataForm" является компонентом, который представляет из себя форму для редактирования профиля пользователя
на странице профиля в виде заготовки для обворачивания ее в HOC "reduxForm".
Этот компонент подключается в компоненте "ProfileDataReduxForm" и обварачивается там в HOC "reduxForm", тем самым
получая callback "handleSubmit".
*/
const ProfileDataForm:
    React.FC<InjectedFormProps<ProfileDataFormValuesType, ProfileDataFormOwnPropsType> & ProfileDataFormOwnPropsType> =
    ({ /*Указываем какие именно "props" мы получаем, чтобы не писать далее "props.handleSubmit", "props.profile" и так
    далее. Такое мы делаем только в функциональных компонентах.*/
                             handleSubmit, /*Callback для
                             сабмита данных.*/
                             profile, /*Данные профиля пользователя для страницы профиля.*/
                             error}) => { /*Свойство, содержащее текст ошибки (если была). Свойство "error" будет
                             в объекте "props" благодаря библиотеке "redux-form", в него подцепится значение из TC
                             "saveProfile" из "profile-reducer.ts".*/

    /*Указали при помощи "React.FC<>", что "props" в этом функциональном компоненте имеют тип
    "InjectedFormProps<ProfileDataFormValuesType, ProfileDataFormOwnPropsType> & ProfileDataFormOwnPropsType>". Такая
    комбинация получилась следующим образом:
    - "InjectedFormProps<ProfileDataFormValuesType, ProfileDataFormOwnPropsType>" - здесь мы уточнили внедренные ХОКом,
    который образуется при помощи компонента "ProfileDataReduxForm", "InjectedFormProps". "ProfileDataFormValuesType"
    указывает, что приходит из этого ХОКа, а "ProfileDataFormOwnPropsType" указывает, что приходит со стороны -
    "profile".
    - "& ProfileDataFormOwnPropsType" - также этот компонент содержит некие свои собственные "props", которые не
    приходят от ХОКа выше - тот же "profile".
    Это мы сделали на основании файла декларации "InjectedFormProps" ("Ctrl+click" в "WebStorm"). Там указано, что
    первым параметром принимаются "formData" - то есть какие именно данные собирает форма в компоненте, вокруг которого
    обворачиваем "reduxForm" (то есть компонент "ProfileDataForm"), и собственные "props" этого компонента
    "ProfileDataForm", которые не приходят от ХОКа выше (так нужно для внутренней работы "InjectedFormProps"); а вторым
    параметром принимаются еще раз некие свои собственные "props", которые не приходят от ХОКа выше (так уже надо для
    работы самого этого компонента "ProfileDataForm"). Третьим параметром принимается вид ошибки формы типа строка, но в
    данном случае мы этого не указываем. Только все эти три параметра указываются как бы вместе как единый параметр, а
    не через запятую как три разных параметра. ВОЗМОЖНО, это потому, что "InjectedFormProps" это объект (как единое
    целое состоит из разных свойств, которые можно типизировать суммой разных типов), а тот же "reduxForm" это функция
    (принимает последовательность параметров, где каждый параметр нужно отдельно типизировать).*/

    /*
    Здесь после return в компоненте начинается HTML разметка.
    Нужно помнить, что в этой разметке должен быть только один корневой элемент.
    Поскольку то, что возвращает return указано с новой строки, поэтому все возвращаемое помещено в круглые скобки.
    */
    return (
        <form onSubmit={handleSubmit}> {/*Здесь в элементе "form "в событии "onSubmit" указывает
        callback "handleSubmit". Этот элемент "form" и есть наш корневой элемент"*/}
            <div> {/*Создаем специальный элемент "div", внутри которого будет находится элемент "button", который будет
            использоваться как кнопка для сабмита данных введенных в форму.*/}
                <button>save</button>
            </div>

            {error && <div className={styles.formSummaryError}>{error}</div>} {/*Если произошла какая-то ошибка, то
            выведем ее в отдельном элементе "div". Свойство "error" будет в объекте "props" благодаря
            библиотеке "redux-form", в него подцепится значение из TC "saveProfile" из "profile-reducer.ts".*/}

            <div> {/*Этот элемент "div" содержит поле для ввода полного имени пользователя.*/}
                <b>1. Full Name</b>:
                {createField<ProfileDataFormValuesKeysType>('Full Name', 'fullName', Input, [])}
                {/*Создали поле для ввода полного имени пользователя на основе импортированной функции "createField".
                Уточняем здесь функцию "createField", что она имеет тип "ProfileDataFormValuesKeysType", созданный нами
                выше.*/}
            </div>

            <div> {/*Этот элемент "div" содержит поле для ввода информации о пользователе "Обо мне".*/}
                <b>2. About Me</b>:
                {createField<ProfileDataFormValuesKeysType>('About Me', 'aboutMe', Input, [])}
                {/*Создали поле для ввода информации о пользователе "Обо мне" на основе импортированной функции
                "createField". Уточняем здесь функцию "createField", что она имеет тип "ProfileDataFormValuesKeysType",
                созданный нами выше.*/}
            </div>

            <div> {/*Этот элемент "div" содержит поля для ввода контактов пользователя. Создаются эти поля
            следующим образом (аналогично как и в компоненте "ProfileData" из файла "ProfileInfo.tsx"):*/}
                <b>3. Contacts</b>: {Object
                    .keys(profile.contacts)
                    .map(key => { /*При помощи метода "keys" глобального объекта "Object" мы можем проитерироваться по
                    ключам переданного объекта "profile.contacts". Возьмутся все ключи "key" и завернутся в массив
                    строк. А далее мы мапим этот массив, чтобы отрисовать JSX с однотипным полями контактов при помощи
                    небольшого куска JSX (в компоненте "ProfileData" из файла "ProfileInfo.tsx" для такого JSX мы
                    создавали вспомогательную компоненту "Contact").*/
                return (
                    <div key={key} className={style.contact}> {/*Отрисовываем элемент "div", который представляет
                    из себя типовое поле для указания контакта. При использовании метода "map" нужно указывать
                    атрибут "key" для избежания ошибок.*/}
                        <b>{key}: {createField(key, 'contacts.' + key, Input, [])}</b>
                        {/*Внутри этот элемент "div" будет из себя представлять следующее:
                         "Текст заголовка поля контакта": "Текст со значение самого контакта". Первое будет браться
                         из ключа "key". Второе будет создаваться на основе импортированной функции "createField".
                         "name" во втором будет получаться так: к тексту "contacts." будет прибавляться текст ключа
                         (например, "github"), что в итоге будет давать правильную структуру контактов (например,
                         "contacts.github") для составления объекта с контактами, который сможет понять сервер
                         при получении объекта с данным по профилю пользователя. Здесь отсутствует уточнение типа у
                         функции "createField", поэтому в дальнейшем его необходимо добавить сюда.*/}
                    </div>
                )
            })}
            </div>

            <div> {/*Этот элемент "div" содержит поле для указания ищет ли в данный момент работу пользователь.*/}
                <b>4. Is looking for a job?</b>
                {createField<ProfileDataFormValuesKeysType>
                ('', 'lookingForAJob', Input, [], {type: 'checkbox'})}
                {/*Создали поле для указания ищет ли в данный момент работу пользователь на основе импортированной
                функции "createField". Уточняем здесь функцию "createField", что она имеет тип
                "ProfileDataFormValuesKeysType", созданный нами выше.*/}
            </div>

            <div> {/*Этот элемент "div" содержит поле для ввода работы, которую ищет пользователь.*/}
                <b>Which one?</b>
                {createField<ProfileDataFormValuesKeysType>
                ('Which one?', 'lookingForAJobDescription', Textarea, [])}
                {/*Создали поле для ввода работы, которую ищет пользователь, на основе импортированной
                функции "createField". Уточняем здесь функцию "createField", что она имеет тип
                "ProfileDataFormValuesKeysType", созданный нами выше.*/}
            </div>
        </form>
    )
};


/*Это отдельный контейнерный компонент, цель которого обвернуть компонент "ProfileDataForm" в HOC "reduxForm", чтобы
предоставить callback "handleSubmit". Именно компонент "ProfileDataFormReduxForm" будет заниматься общением
с глобальным "state". Далее этот компонент используется в компоненте "ProfileInfo" в файле "ProfileInfo.tsx" */
const ProfileDataReduxForm = reduxForm<ProfileDataFormValuesType, ProfileDataFormOwnPropsType>({ /*"reduxForm"
является "generic", поэтому мы его уточнили. В файле декларации "reduxForm" ("Ctrl+click" в "WebStorm") указано, что он
принимает следующие данные:
- "formData" - то есть какие именно данные собирает форма в компоненте, вокруг которого обворачиваем "reduxForm" (то
есть компонент "ProfileDataForm");
- "собственные props" компонента, вокруг которого обворачиваем "reduxForm" (то есть компонент "ProfileDataForm");
- вид ошибки формы типа строка, но в данном случае мы этого не указываем.*/
    form: 'editProfile' /*Это то самое уникальное имя для данных этой формы, которые будут попадать
    в глобальный "state".*/
})(ProfileDataForm);


export default ProfileDataReduxForm; /*Экспортируем компонент "ProfileDataReduxForm" по default и будем его использовать
в нашем проекте под именем "ProfileDataReduxForm", экспорт необходим для импорта.*/