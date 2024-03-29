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

Для получения данных при "submit" есть особый callback "handleSubmit" в "props", который создается при обворачивании
"reduxForm". В форме в событии "onSubmit" нужно указывать этот callback. В этом callback отключено дефолтное поведение
по перезагрузке страницы. Также в нем идет сбор всех данных и они упаковываются в объект, а затем вызывается
"props.onSubmit()" у родителя (то есть у контейнерного компонента над компонентом с формой), в который передается этот
объект с данными. То есть мы должны в контейнерный компонент над компонентом с формой передать некий метод,
срабатывающий при событии "onSubmit". Этот некий метод будет использоваться для передачи данных формы во внешний мир,
то есть в глобальный "state".

То есть в нашем случае происходит следующее:
- callback "handleSubmit" указан в компоненте "AddMessageForm".
- обворачиваем компонент "AddMessageForm" HOC-ом "reduxForm" в компоненте "AddMessageReduxForm", тем самым предоставляя
callback "handleSubmit" для компонента "AddMessageForm".
- компонент "AddMessageReduxForm" указывается в компоненте "Dialogs", куда в событие "onSubmit" будет попадать объект
с данными, сформированный в событии "onSubmit" при помощи callback "handleSubmit" в компоненте "AddMessageForm".

То есть при срабатывании события "onSubmit" сначала вызывается callback "handleSubmit" в компоненте "AddMessageForm",
который собирает все данные из формы и помещает их в объект, потом внутри callback "handleSubmit" вызывается нами
созданный callback "addNewMessage" (доступен из контейнерного компонента "AddMessageReduxForm") из компонента "Dialogs",
в который передается указанный объект с данными и собираются в одном месте, потом эти данные передаются в компонент
"AddMessageReduxForm", из которого перенаправляются в глобальный "state" в виде объекта под именем
"dialogAddMessageForm".

То есть общая логика при работе с библиотекой "redux-form" такова:
- вынести саму форму в отдельный компонент;
- повесить callback "handleSubmit" в качестве обработчика события "onSubmit" в этой форме;
- в этой форме вместо элементов "input" и прочего используем элемент "Field";
- обворачиваем эту форму HOC-ом "reduxForm".

В компонент "AddMessageForm" внедряются некие дополнительные "props" (например, тот же "handleSubmit") ХОКом, который
образуется при помощи компонента "AddMessageReduxForm". Эти "props" содержатся под именем "InjectedFormProps". Эти
"InjectedFormProps" также содержат добавленные нами "props". Поэтому мы импортировали "InjectedFormProps" из библиотеки
"reduxForm", чтобы типизировать такие "props" в компоненте "AddMessageForm".
*/
import {maxLengthCreator, required} from '../../utils/validators/validators'; /*Подключаем валидаторы для полей форм.*/
import {createField, GetValuesKeysType, Textarea} from '../common/FormsControls/FormsControls'; /*Подключаем созданный
нами компонент "Textarea" для создания элемента "textarea" с возможностью указывать валидацию. Также импортируем
функцию "createField", которая принимает параметры и создает элементы формы. Мы ее используем для создания формы в
компоненте "AddMessageForm". Дополнительно импортируем оттуда тип "GetValuesKeysType".*/

import styles from './Dialogs.module.css'; /*Подключаем стили из CSS-модуля.*/

import DialogItem from './DialogItem/DialogItem'; /*Подключаем компонент "DialogItem".*/
import Message from './Message/Message'; /*Подключаем компонент "Message".*/
import IncomingMessage from './IncomingMessage/IncomingMessage'; /*Подключаем компонент "IncomingMessage".*/

import {InitialDialogsStateType} from '../../redux/dialogs-reducer'; /*Подключаем типы.*/


/*Создаем общий тип для всех "props" компонента "Dialogs" . Все это нужно для указания типа "props" в функциональном
компоненте "Dialogs".*/
type DialogsPropsType = {
    dialogsPage: InitialDialogsStateType /*Поскольку передаем в этот компонент весь "state" из "dialogs-reducer.ts",
    то указываем тип "InitialDialogsStateType" - это тип всего этого "state" из "dialogs-reducer.ts".*/
    addMessage: (newMessageText: string) => void /*AC для добавления нового исходящего сообщения, который принимает
    строковой параметр и ничего не возвращает.*/
};

/*Создаем тип для "собственных props" компонента "AddMessageForm". "Собственные props" в этом компоненте должны
обязательно содержать следующие поля с указанными типами.*/
type AddMessageFormOwnPropsType = {}; /*Указываем пустой объект, так как компонент "AddMessageForm" не содержит
"собственных props". По идее это можно в данном случае вообще не указывать.*/

/*Создаем тип для "props" компонента "AddMessageForm", которые будут использоваться в "formData" для компонента
"Dialogs". Эти "props" в этом компоненте должны обязательно содержать следующие поля с указанными типами.*/
type AddMessageFormValuesType = {
    newMessageText: string /*Текст исходящего сообщения, который должен быть строкой.*/
};

/*Следующий тип мы создали специально, чтобы мы не могли допустить ошибку при указании свойства "name" в "createField".
Это свойство важно для формирования имен свойств "formData", то есть данных формы. Для этого мы использовали созданный
нами и иимпортированный сюда вспомогательный тип "GetValuesKeysType". Нужные нам имена свойств уже перечислены в типе
"AddMessageFormValuesType", поэтому мы при помощи этого типа "GetValuesKeysType" получаем типы ключей из типа
"AddMessageFormValuesType".*/
type AddMessageFormValuesKeysType = GetValuesKeysType<AddMessageFormValuesType>;


const maxLength10 = maxLengthCreator(10); /*Создали валидатор, который проверяет не введено ли больше 10
символов в поле.*/


/*
"AddMessageForm" это функциональный компонент, который создан в виде стрелочной функции.
Функциональный компонент можно создать еще и таким образом: function AddMessageForm(props) {тело}.
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
"AddMessageForm" является компонентом, который представляет из себя форму для добавления исходящих сообщений
в диалогах в виде заготовки для обворачивания ее в HOC "reduxForm".
Этот компонент подключается в компоненте "AddMessageReduxForm" и обварачивается там в HOC "reduxForm", тем самым
получая callback "handleSubmit".
*/
const AddMessageForm:
    React.FC<InjectedFormProps<AddMessageFormValuesType, AddMessageFormOwnPropsType> & AddMessageFormOwnPropsType> =
    ({handleSubmit}) => {
    /*При помощи деструктуризации "props" указываем какие именно "props" мы получаем, чтобы не писать далее
    "props.handleSubmit". Такое мы делаем только в функциональных компонентах.
    Указали при помощи "React.FC<>", что "props" в этом функциональном компоненте имеют тип
    "InjectedFormProps<AddMessageFormValuesType, AddMessageFormOwnPropsType> & AddMessageFormOwnPropsType>". Такая
    комбинация получилась следующим образом:
    - "InjectedFormProps<AddMessageFormValuesType, AddMessageFormOwnPropsType>" - здесь мы уточнили внедренные ХОКом,
    который образуется при помощи компонента "AddMessageReduxForm", "InjectedFormProps". "AddMessageFormValuesType"
    указывает, что приходит из этого ХОКа, а "AddMessageFormOwnPropsType" указывает, что приходит со стороны - в нашем
    случае ничего.
    - "& AddMessageFormOwnPropsType" - также этот компонент содержит некие свои собственные "props", которые не приходят
    от ХОКа выше.
    Это мы сделали на основании файла декларации "InjectedFormProps" ("Ctrl+click" в "WebStorm"). Там указано, что
    первым параметром принимаются "formData" - то есть какие именно данные собирает форма в компоненте, вокруг которого
    обворачиваем "reduxForm" (то есть компонент "AddMessageForm"), и собственные "props" этого компонента
    "AddMessageForm", которые не приходят от ХОКа выше (так нужно для внутренней работы "InjectedFormProps"); а вторым
    параметром принимаются еще раз некие свои собственные "props", которые не приходят от ХОКа выше (так уже надо для
    работы самого этого компонента "AddMessageForm"). Третьим параметром принимается вид ошибки формы типа строка, но
    данном случае мы этого не указываем. Только все эти три параметра указываются как бы вместе как единый параметр, а
    не через запятую как три разных параметра. ВОЗМОЖНО, это потому, что "InjectedFormProps" это объект (как единое
    целое состоит из разных свойств, которые можно типизировать суммой разных типов), а тот же "reduxForm" это функция
    (принимает последовательность параметров, где каждый параметр нужно отдельно типизировать).
    */

    /*
    Здесь после return в компоненте начинается HTML разметка.
    Нужно помнить, что в этой разметке должен быть только один корневой элемент.
    Поскольку то, что возвращает return указано с новой строки, поэтому все возвращаемое помещено в круглые скобки.
    */
    return (
        <form onSubmit={handleSubmit}> {/*Здесь в элементе "form "в событии "onSubmit" указываем callback
        "handleSubmit". Этот элемент "form" и есть наш корневой элемент"*/}
            <div> {/*Создаем элемент "div", в котором создадим поле для ввода текста исходящего сообщения при помощи
            импортированной функции "createField".*/}
                {createField<AddMessageFormValuesKeysType>
                ('Enter your message', 'newMessageText', Textarea, [required, maxLength10])}
                {/*Создали поле для ввода исходящего сообщения на основе импортированной функции "createField". Уточняем
                здесь функцию "createField", что она имеет тип "AddMessageFormValuesKeysType", созданный нами выше.*/}
            </div>

            <div> {/*Создаем специальный элемент "div", внутри которого будет находится элемент "button", который будет
            использоваться как кнопка для сабмита данных введенных в форму.*/}
                <button>Add message</button>
            </div>
        </form>
    )
};


/*Это отдельный контейнерный компонент, цель которого обвернуть компонент "AddMessageForm" в HOC "reduxForm", чтобы
предоставить callback "handleSubmit". Именно компонент "AddMessageReduxForm" будет заниматься общением
с глобальным "state".*/
const AddMessageReduxForm = reduxForm<AddMessageFormValuesType, AddMessageFormOwnPropsType>({ /*"reduxForm"
является "generic", поэтому мы его уточнили. В файле декларации "reduxForm" ("Ctrl+click" в "WebStorm") указано, что он
принимает следующие данные:
- "formData" - то есть какие именно данные собирает форма в компоненте, вокруг которого обворачиваем "reduxForm" (то
есть компонент "AddMessageForm");
- "собственные props" компонента, вокруг которого обворачиваем "reduxForm" (то есть компонент "AddMessageForm");
- вид ошибки формы типа строка, но в данном случае мы этого не указываем.*/
    form: 'dialogAddMessageForm' /*Это то самое уникальное имя для данных этой формы, которые будут попадать
    в глобальный "state".*/
})(AddMessageForm);


/*
"Dialogs" это функциональный компонент, который создан в виде стрелочной функции.
При взаимодействии с функциональным компонентом React не хранит его постоянно в памяти.
React вызывает функциональный компонент, он делает свою работу (например, возвращает JSX) и компонент удаляется
из памяти.
Функциональный компонент можно создать еще и таким образом: function Dialogs(props) {тело}.
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
"Dialogs" является компонентом, который отображает диалоги.
Этот компонент подключается в компоненте "DialogsContainer".
Внутри компонента "Dialogs" подключаются компоненты:
- "DialogItem", который описывает, как должны выглядеть диалоги;
- "Message", который описывает, как должны выглядеть исходящие сообщения;
- "IncomingMessage", который описывает, как должны выглядеть входящие сообщения;
- "AddMessageReduxForm", в котором обворачиваем компонент "AddMessageForm" HOC-ом "reduxForm",
тем самым предоставляя callback "handleSubmit" для компонента "AddMessageForm".
*/
const Dialogs: React.FC<DialogsPropsType> = ({dialogsPage, addMessage}) => { /*Указываем какие именно
"props" мы получаем, чтобы не писать далее "props.dialogsPage" и так далее:
- "dialogsPage" - весь "state" из "dialogs-reducer.ts";
- "addMessage" - AC для добавления нового исходящего сообщения.
Такое мы делаем только в функциональных компонентах.Указали при помощи "React.FC<>", что "props" в этом функциональном
компоненте имеют тип "DialogsPropsType", созданный нами выше.*/

    /*
    В JSX в массив можно вкладывать компоненты.
    В React, если мы передаем какой-либо массив, то JSX отобразит каждый элемент этого массива в виде строки.
    "map" - это метод массива из JS, который позволяет создать новый массив на основе преобразования исходного массива.
    Метод "map" принимает стрелочную функцию.
    То есть в нашем случае будет сначала браться первый объект из исходного массива объектов
    и на основе данных этого объекта будет формироваться первый элемента нового массива, который
    будет из себя представлять JSX компонента, указанного в стрелочной функции.
    Потом будет браться следующий объект из исходного массива объектов
    и на основе данных уже этого объекта будет формироваться следующий элемента нового массива, который
    будет из себя представлять JSX компонента, указанного в стрелочной функции.
    И так будет продолжаться до тех пор, пока мы не переберем все объекты в изначальном массиве объектов.
    То есть переданная в метод "map" стрелочная функция вызывается столько раз, сколько элементов в изначальном массиве
    объектов.
    В итоге получится новый массив с элементами в виде компонентов, построенными на основе данных из BLL.
    Вызвав такой массив в JSX мы отобразим наши компоненты.
    Массив "dialogsElements" содержит диалоги пользователя.
    Массив "messagesElements" содержит исходящие сообщения пользователя.
    Массив "incomingMessagesElement" содержит входящие сообщения пользователя.
    При использовании метода "map" нужно указывать атрибут "key" для избежания ошибок.
    */
    let dialogsElements = dialogsPage.dialogs.map(d => <DialogItem name={d.name}
                                                                         id={d.id}
                                                                         avatar={d.avatar}
                                                                         key={d.id}/>);

    let messagesElements = dialogsPage.messagesData.map(m => <Message id={m.id}
                                                                            message={m.message}
                                                                            avatar={m.avatar}
                                                                            key={m.id}/>);

    let incomingMessagesElement = dialogsPage.incomingMessagesData.map(im => <IncomingMessage id={im.id}
                                                                                                   message={im.message}
                                                                                                   avatar={im.avatar}
                                                                                                   key={im.id}/>);

    let addNewMessage = (formData: AddMessageFormValuesType) => { /*Создали специальный callback "addNewMessage",
    который будет вызываться при срабатывании события "onSubmit" в форме. Этот callback будет собирать все данные формы
    (текст исходящего сообщения) в одном месте. Эти данные будут отдаваться AC "addMessage" для добавляния нового
    исходящего сообщения. Этот callback получает указанные данные на входе в объекте "formData" с типом
    "AddMessageFormValuesType".*/
        addMessage(formData.newMessageText); /*Здесь мы вызываем AC "addMessage", полученный из "props", и
        передаем ему текст исходящего сообщения.*/
        formData.newMessageText = ''; /*После вывода исходящего сообщения зануляем поле для ввода текста.*/
    };

    /*
    Здесь после return в компоненте начинается HTML разметка.
    Нужно помнить, что в этой разметке должен быть только один корневой элемент.
    Поскольку то, что возвращает return указано с новой строки, поэтому все возвращаемое помещено в круглые скобки.
    */
    return (
        <div className={styles.dialogs}> {/*Этот элемент "div" и есть наш корневой элемент.*/}
            <div className={styles.dialogsItems}>{dialogsElements}</div> {/*Этот элемент "div" содержит список
            диалогов.*/}

            <div className={styles.messages}> {/*Этот элемент "div" содержит внутри два других элемента "div".*/}
                <div>{messagesElements}</div> {/*Этот элемент "div" содержит исходящие сообщения.*/}
                <AddMessageReduxForm onSubmit={addNewMessage}/> {/*Здесь в событии "onSubmit" будет приходить объект с
                данными из callback "handleSubmit" из компонента "AddMessageForm", который обвернут
                компонентом "AddMessageReduxForm". Далее будет вызываться при этом событии нами созданный
                callback "addNewMessage", в который будет передаваться этот объект с данными. После этого эти данные
                будут отправлятся в часть глобального "state", которую обрабатывает библиотека"redux-form", с целью
                осуществления работы нашей формы логина. Поскольку мы вызываем функцию "addNewMessage" как callback,
                поэтому не ставим "()" после имени функции. Но теперь после отправки сообщения окно для ввода текста
                сообщения не будет очищаться, так как библиотека "redux-form" хоть и осуществляет FLUX-круговорот,
                но очистку не осуществляет.*/}
            </div>

            <div className={styles.incomingMessages}>{incomingMessagesElement}</div> {/*Этот элемент "div" содержит
            входящие сообщения.*/}
        </div>
    );
};


export default Dialogs; /*Экспортируем компонент "Dialogs" по default и будем его использовать в нашем проекте под
именем "Dialogs", экспорт необходим для импорта.*/