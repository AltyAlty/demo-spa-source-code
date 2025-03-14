import React from 'react';
/*В данном файле работа с библиотекой Redux Form происходит следующим образом:
1. callback-функция "handleSubmit()" указана в компоненте "AddMessageForm".
2. оборачиваем компонент "AddMessageForm" функцией "reduxForm()" в компоненте "AddMessageReduxForm", тем самым
предоставляя callback-функцию "handleSubmit()" для компонента "AddMessageForm".
3. компонент "AddMessageReduxForm" указывается в компоненте "Dialogs", куда в событие "onSubmit" будет попадать объект
с данными, сформированный в событии "onSubmit" при помощи callback-функции "handleSubmit()" в компоненте
"AddMessageForm".

То есть при срабатывании события "onSubmit" сначала вызывается callback-функция "handleSubmit()" в компоненте
"AddMessageForm", которая собирает все данные из формы и помещает их в объект. Потом внутри callback-функции
"handleSubmit()" вызывается нами созданная callback-функция "addNewMessage()" (доступна из контейнерного компонента
"AddMessageReduxForm") из компонента "Dialogs". В компонент "Dialogs" передается указанный объект с данными и собираются
в одном месте, потом эти данные передаются в компонент "AddMessageReduxForm", из которого перенаправляются в глобальный
state в виде объекта под именем "dialogAddMessageForm".

В компонент "AddMessageForm" внедряются некие дополнительные props (например, та же callback-функция "handleSubmit()")
ХОКом, который образуется при помощи компонента "AddMessageReduxForm". Эти props содержатся под именем
"InjectedFormProps". Эти "InjectedFormProps" также содержат добавленные нами props. Поэтому мы импортировали
"InjectedFormProps" из библиотеки Redux Form, чтобы типизировать такие props в компоненте "AddMessageForm".*/
import {InjectedFormProps, reduxForm} from 'redux-form';
import styles from './Dialogs.module.css';
/*Импортируем компонент "DialogItem".*/
import {DialogItem} from './DialogItem/DialogItem';
/*Импортируем компонент "Message".*/
import {Message} from './Message/Message';
/*Импортируем компонент "IncomingMessage".*/
import {IncomingMessage} from './IncomingMessage/IncomingMessage';
/*Импортируем созданный нами компонент "Textarea" для создания элемента "textarea" с возможностью указывать валидацию.
Также импортируем функцию "createField()", которая принимает параметры и создает элементы формы. Мы ее используем для
создания формы в компоненте "AddMessageForm". Дополнительно импортируем оттуда тип "GetValuesKeysType".*/
import {createField, GetValuesKeysType, Textarea} from '../common/FormsControls/FormsControls';
/*Импортируем валидаторы для полей форм.*/
import {maxLengthCreator, required} from '../../utils/validators/validators';
/*Импортируем тип "InitialDialogsStateType".*/
import {InitialDialogsStateType} from '../../redux/dialogs-reducer';

/*Создаем общий тип для всех props компонента "Dialogs".*/
type DialogsPropsType = {
    /*Поскольку передаем в этот компонент весь state из файла "dialogs-reducer.ts", то указываем тип
    "InitialDialogsStateType" - это тип всего этого state.*/
    dialogsPage: InitialDialogsStateType
    /*AC для добавления нового исходящего сообщения, который принимает строковой параметр и ничего не возвращает.*/
    addMessage: (newMessageText: string) => void
};

/*Создаем тип для "собственных props" компонента "AddMessageForm". Указываем пустой объект, так как компонент
"AddMessageForm" не содержит "собственных props". По идее это можно в данном случае вообще не указывать.*/
type AddMessageFormOwnPropsType = {};

/*Создаем тип для props компонента "AddMessageForm", которые будут использоваться в "formData" для компонента
"Dialogs".*/
type AddMessageFormValuesType = {
    /*Текст исходящего сообщения, который должен быть строкой.*/
    newMessageText: string
};

/*Следующий тип мы создали специально, чтобы мы не могли допустить ошибок при указании свойства "name" в функции
"createField()". Это свойство важно для формирования имен свойств "formData", то есть данных формы. Для этого мы
используем сюда вспомогательный тип "GetValuesKeysType". Нужные нам имена свойств уже перечислены в типе
"AddMessageFormValuesType", поэтому мы при помощи этого типа "GetValuesKeysType" получаем типы ключей из типа
"AddMessageFormValuesType".*/
type AddMessageFormValuesKeysType = GetValuesKeysType<AddMessageFormValuesType>;

/*Создали валидатор, который проверяет не введено ли больше 10 символов в поле.*/
const maxLength10 = maxLengthCreator(10);

/*"AddMessageForm" это функциональный компонент, который создан в виде стрелочной функции. "AddMessageForm" является
компонентом, который представляет собой форму для добавления исходящих сообщений в диалогах в виде заготовки для
оборачивания ее функцией "reduxForm()".

Внутри компонента "AddMessageForm" используются следующие компоненты:
1. "Textarea" - компонент, который используется для отрисовки элементов "textarea" в других местах, где в таких
элементах требуется валидация. Импортирован.

Компонент "AddMessageForm" используется в компоненте "AddMessageReduxForm" в этом же файле и оборачивается функцией
"reduxForm()", тем самым получая callback-функцию "handleSubmit()".

Указываем при помощи "React.FC<>", что props в этом функциональном компоненте имеют тип
"InjectedFormProps<AddMessageFormValuesType, AddMessageFormOwnPropsType> & AddMessageFormOwnPropsType>".

Такая комбинация получилась следующим образом:
1. "InjectedFormProps<AddMessageFormValuesType, AddMessageFormOwnPropsType>" - здесь мы уточняем внедренные ХОКом,
который образуется при помощи компонента "AddMessageReduxForm", "InjectedFormProps". "AddMessageFormValuesType"
указывает, что приходит из этого ХОКа, а "AddMessageFormOwnPropsType" указывает, что приходит со стороны - в нашем
случае ничего.
2. "& AddMessageFormOwnPropsType" - также этот компонент содержит некие свои "собственные props", которые не приходят от
ХОКа выше.

Это мы делаем на основании файла декларации "InjectedFormProps". Там указано, что первым параметром принимаются
"formData" - то есть какие именно данные собирает форма в компоненте, оборачиваемый функцией "reduxForm()" (то есть
компонент "AddMessageForm"), и "собственные props" этого компонента "AddMessageForm", непреходящие от ХОКа выше (так
нужно для внутренней работы "InjectedFormProps"). А вторым параметром принимаются еще раз некие свои "собственные
props", которые не приходят от ХОКа выше (так уже надо для работы самого этого компонента "AddMessageForm"). Третьим
параметром принимается вид ошибки формы с типом строки, но в данном случае мы этого не указываем.

Только все эти три параметра указываются как бы вместе как единый параметр, а не через запятую как три разных параметра.
ВОЗМОЖНО, это потому, что "InjectedFormProps" является объектом (как единое целое состоит из разных свойств, которые
можно типизировать суммой разных типов), а та же функция "reduxForm()" является функцией (принимает последовательность
параметров, где каждый параметр нужно отдельно типизировать).*/
const AddMessageForm:
    React.FC<InjectedFormProps<AddMessageFormValuesType, AddMessageFormOwnPropsType> & AddMessageFormOwnPropsType> =
    ({handleSubmit}) => {
        return (
            /*Здесь в элементе "form" в событии "onSubmit" указываем callback-функцию "handleSubmit()".*/
            <form onSubmit={handleSubmit}>
                {/*Создаем элемент "div", в котором создаем поле для ввода текста исходящего сообщения при помощи
                импортированной функции "createField()".*/}
                <div>
                    {/*Создаем поле для ввода исходящего сообщения на основе импортированной функции "createField()".
                    Уточняем здесь функцию "createField()", что она имеет тип "AddMessageFormValuesKeysType", созданный
                    нами выше.*/}
                    {createField<AddMessageFormValuesKeysType>(
                        'Enter your message',
                        'newMessageText',
                        Textarea,
                        [required, maxLength10]
                    )}
                </div>

                {/*Создаем специальный элемент "div", внутри которого будет находиться элемент "button", используемый
                как кнопка для сабмита данных введенных в форму.*/}
                <div>
                    <button>Add message</button>
                </div>
            </form>
        )
    };

/*Компонент "AddMessageReduxForm" является отдельным контейнерным компонентом, цель которого в этом же файле обернуть
компонент "AddMessageForm" функцией "reduxForm()", чтобы предоставить callback-функцию "handleSubmit()". Именно
компонент "AddMessageReduxForm" будет заниматься общением с глобальным state.

Внутри компонента "AddMessageReduxForm" используются следующие компоненты:
1. "AddMessageForm" - компонент, который представляет собой форму для добавления исходящих сообщений в диалогах в виде
заготовки для оборачивания ее функцией "reduxForm()". Из этого же файла.

Компонент "AddMessageReduxForm" используется в компоненте "Dialogs" в этом же файле.

Функция "reduxForm()" является generic, поэтому мы ее уточняем. В файле декларации функции "reduxForm()" указано, что
он принимает следующие данные:
1. "formData" - какие именно данные собирает форма в компоненте (то есть в компоненте "AddMessageForm"), оборачиваемым
функцией "reduxForm()";
2. "собственные props" компонента (то есть компонента "AddMessageForm"), которого оборачиваем функцией "reduxForm()";
3. вид ошибки формы с типом строки, но в данном случае мы этого не указываем.*/
const AddMessageReduxForm = reduxForm<AddMessageFormValuesType, AddMessageFormOwnPropsType>({
    /*Это то самое уникальное имя для данных этой формы, которые будут попадать в глобальный state.*/
    form: 'dialogAddMessageForm'
})(AddMessageForm);

/*"Dialogs" это функциональный компонент, который создан в виде стрелочной функции. "Dialogs" является компонентом,
который отображает диалоги.

Внутри компонента "Dialogs" используются следующие компоненты:
1. "DialogItem" - компонент, который описывает как должны выглядеть диалоги. Импортирован.
2. "Message" - компонент, который описывает как должны выглядеть исходящие сообщения.
3. "IncomingMessage" - компонент, который описывает как должны выглядеть входящие сообщения.
4. "AddMessageReduxForm" - отдельный контейнерный компонентом, цель которого в этом же файле обернуть компонент
"AddMessageForm" функцией "reduxForm()", чтобы предоставить callback-функцию "handleSubmit()". Из этого же файла.

Компонент "Dialogs" импортируется в файле "DialogsContainer.tsx".

При помощи деструктуризации props указываем какие именно props мы получаем:
1. "dialogsPage" - весь state из файла "dialogs-reducer.ts".
2. "addMessage" - AC для добавления нового исходящего сообщения.*/
export const Dialogs: React.FC<DialogsPropsType> = ({dialogsPage, addMessage}) => {
    /*Массив "dialogsElements" содержит диалоги пользователя.*/
    const dialogsElements = dialogsPage.dialogs.map(d => <DialogItem name={d.name}
                                                                     id={d.id}
                                                                     avatar={d.avatar}
                                                                     key={d.id}/>);

    /*Массив "messagesElements" содержит исходящие сообщения пользователя.*/
    const messagesElements = dialogsPage.messagesData.map(m => <Message id={m.id}
                                                                        message={m.message}
                                                                        avatar={m.avatar}
                                                                        key={m.id}/>);

    /*Массив "incomingMessagesElement" содержит входящие сообщения пользователя.*/
    const incomingMessagesElement = dialogsPage.incomingMessagesData.map(im => <IncomingMessage id={im.id}
                                                                                                message={im.message}
                                                                                                avatar={im.avatar}
                                                                                                key={im.id}/>);

    /*Создаем специальную callback-функцию "addNewMessage()", которая будет вызываться при срабатывании события
    "onSubmit" в форме. Эта callback-функция будет собирать все данные формы (текст исходящего сообщения) в одном месте.
    Эти данные будут отдаваться в AC "addMessage()" для добавления нового исходящего сообщения. Эта callback-функция
    получает указанные данные на входе в объекте "formData" с типом "AddMessageFormValuesType".*/
    const addNewMessage = (formData: AddMessageFormValuesType) => {
        /*Здесь мы вызываем AC "addMessage()", полученный из props, и передаем ему текст исходящего сообщения.*/
        addMessage(formData.newMessageText);
        /*После вывода исходящего сообщения зануляем поле для ввода текста.*/
        formData.newMessageText = '';
    };

    return (
        <div className={styles.dialogs}>
            {/*Этот элемент "div" содержит список диалогов.*/}
            <div className={styles.dialogsItems}>{dialogsElements}</div>

            {/*Этот элемент "div" содержит внутри два других элемента "div".*/}
            <div className={styles.messages}>
                {/*Этот элемент "div" содержит исходящие сообщения.*/}
                <div>{messagesElements}</div>

                {/*Здесь в событии "onSubmit" будет приходить объект с данными из callback-функции "handleSubmit()" из
                компонента "AddMessageForm", который обернут компонентом "AddMessageReduxForm". Далее будет вызываться
                при этом событии нами созданная callback-функция "addNewMessage()", в которую будет передаваться этот
                объект с данными. После этого эти данные будут отправляться в часть глобального state, которую
                обрабатывает библиотека Redux Form, с целью осуществления работы нашей формы добавления сообщения. Но
                теперь после отправки сообщения окно для ввода текста сообщения не будет очищаться, так как библиотека
                Redux Form хоть и осуществляет FLUX-круговорот, но очистку не осуществляет.*/}
                <AddMessageReduxForm onSubmit={addNewMessage}/>
            </div>

            {/*Этот элемент "div" содержит входящие сообщения.*/}
            <div className={styles.incomingMessages}>{incomingMessagesElement}</div>
        </div>
    );
};