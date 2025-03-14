import React from 'react';
/*В данном файле работа с библиотекой Redux Form происходит следующим образом:
1. callback-функция "handleSubmit()" указана в компоненте "AddPostForm".
2. оборачиваем компонент "AddPostForm" функцией "reduxForm()" в компоненте "AddPostReduxForm", тем самым
предоставляя callback-функцию "handleSubmit()" для компонента "AddPostForm".
3. компонент "AddPostReduxForm" указывается в компоненте "MyPosts", куда в событие "onSubmit" будет попадать объект
с данными, сформированный в событии "onSubmit" при помощи callback-функции "handleSubmit()" в компоненте
"AddPostForm".

То есть при срабатывании события "onSubmit" сначала вызывается callback-функция "handleSubmit()" в компоненте
"AddPostForm", которая собирает все данные из формы и помещает их в объект. Потом внутри callback-функции
"handleSubmit()" вызывается нами созданная callback-функция "addNewPost()" (доступна из контейнерного компонента
"AddPostReduxForm") из компонента "MyPosts". В компонент "MyPosts" передается указанный объект с данными и собираются
в одном месте, потом эти данные передаются в компонент "AddPostReduxForm", из которого перенаправляются в глобальный
state в виде объекта под именем "profileAddPostForm".

В компонент "AddPostForm" внедряются некие дополнительные props (например, та же callback-функция "handleSubmit()")
ХОКом, который образуется при помощи компонента "AddPostReduxForm". Эти props содержатся под именем
"InjectedFormProps". Эти "InjectedFormProps" также содержат добавленные нами props. Поэтому мы импортировали
"InjectedFormProps" из библиотеки Redux Form, чтобы типизировать такие props в компоненте "AddPostForm".*/
import {InjectedFormProps, reduxForm} from 'redux-form';
import styles from './MyPosts.module.css';
/*Импортируем компонент "Post".*/
import {Post} from './Post/Post';
/*Импортируем созданный нами компонент "Textarea" для создания элемента "textarea" с возможностью указывать валидацию.
Также импортируем функцию "createField", которая принимает параметры и создает элементы формы. Мы ее используем для
создания формы в компоненте "AddPostForm". Дополнительно импортируем тип "GetValuesKeysType".*/
import {createField, GetValuesKeysType, Textarea} from '../../common/FormsControls/FormsControls';
/*Импортируем валидаторы для полей форм.*/
import {maxLengthCreator, required} from '../../../utils/validators/validators';
/*Импортируем тип "PostType".*/
import {PostType} from '../../../types/types';

/*Создаем общий тип для всех props компонента "MyPosts".*/
type MyPostsPropsType = {
    /*Данные о постах на странице пользователя должны быть массивом с элементами с типом "PostType".*/
    postsData: Array<PostType>
    /*AC для добавления нового поста на странице профиля, который принимает строковой параметр и ничего не возвращает.*/
    addPost: (newMessageText: string) => void
};

/*Создаем тип для "собственных props" компонента "AddPostForm". Указываем пустой объект, так как компонент "AddPostForm"
не содержит "собственных props".*/
type AddPostFormOwnPropsType = {};

/*Создаем тип для "props" компонента "AddPostForm", которые будут использоваться в "formData" для компонента
"MyPosts".*/
type AddPostFormValuesType = {
    /*Текст нового поста на странице профиля, который должен быть строкой.*/
    newPostText: string
};

/*Следующий тип мы создаем специально, чтобы мы не могли допустить ошибок при указании свойства "name" в функции
"createField()". Это свойство важно для формирования имен свойств "formData", то есть данных формы. Для этого мы
используем вспомогательный тип "GetValuesKeysType". Нужные нам имена свойств уже перечислены в типе
"AddPostFormValuesType", поэтому мы при помощи этого типа "GetValuesKeysType" получаем типы ключей из типа
"AddPostFormValuesType".*/
type AddPostFormValuesKeysType = GetValuesKeysType<AddPostFormValuesType>;

/*Создаем валидатор, который проверяет не введено ли больше 10 символов в поле.*/
const maxLength10 = maxLengthCreator(10);

/*"AddPostForm" это функциональный компонент, который создан в виде стрелочной функции. "AddPostForm" является
компонентом, который представляет собой форму для добавления постов в профиле пользователя в виде заготовки для
оборачивания ее функцией "reduxForm()".

Внутри компонента "AddPostForm" используются следующие компоненты:
1. "Textarea" - компонент, который используется для отрисовки элементов "textarea" в других местах, где в таких
элементах требуется валидация. Импортирован.

Компонент "AddPostForm" используется в компоненте "AddPostReduxForm" в этом же файле и оборачивается функцией
"reduxForm()", тем самым получая callback-функцию "handleSubmit()".

Указываем при помощи "React.FC<>", что props в этом функциональном компоненте имеют тип
"InjectedFormProps<AddPostFormValuesType, AddPostFormOwnPropsType> & AddPostFormOwnPropsType>".

Такая комбинация получилась следующим образом:
1. "InjectedFormProps<AddPostFormValuesType, AddPostFormOwnPropsType>" - здесь мы уточняем внедренные ХОКом, который
образуется при помощи компонента "AddPostReduxForm", "InjectedFormProps". "AddPostFormValuesType" указывает, что
приходит из этого ХОКа, а "AddPostFormOwnPropsType" указывает, что приходит со стороны - в нашем случае ничего.
2. "& AddPostFormOwnPropsType" - также этот компонент содержит некие свои "собственные props", которые не приходят от
ХОКа выше.

Это мы делаем на основании файла декларации "InjectedFormProps". Там указано, что первым параметром принимаются
"formData" - то есть какие именно данные собирает форма в компоненте, оборачиваемый функцией "reduxForm()" (то есть
компонент "AddPostForm"), и "собственные props" этого компонента "AddPostForm", непреходящие от ХОКа выше (так нужно для
внутренней работы "InjectedFormProps"). А вторым параметром принимаются еще раз некие свои "собственные props", которые
не приходят от ХОКа выше (так уже надо для работы самого этого компонента "AddPostForm"). Третьим параметром принимается
вид ошибки формы с типом строки, но в данном случае мы этого не указываем.

Только все эти три параметра указываются как бы вместе как единый параметр, а не через запятую как три разных параметра.
ВОЗМОЖНО, это потому, что "InjectedFormProps" является объектом (как единое целое состоит из разных свойств, которые
можно типизировать суммой разных типов), а та же функция "reduxForm()" является функцией (принимает последовательность
параметров, где каждый параметр нужно отдельно типизировать).*/
const AddPostForm:
    React.FC<InjectedFormProps<AddPostFormValuesType, AddPostFormOwnPropsType> & AddPostFormOwnPropsType> =
    ({handleSubmit}) => {
        return (
            /*Здесь в элементе "form" в событии "onSubmit" указываем callback-функцию "handleSubmit()".*/
            <form onSubmit={handleSubmit}>
                {/*Создаем элемент "div", в котором создаем поле для ввода текста для нового поста пользователя на
                странице профиля при помощи импортированной функции "createField".*/}
                <div>
                    {/*Создаем поле для ввода нового поста пользователя на странице профиля на основе импортированной
                    функции "createField()". Уточняем здесь функцию "createField()", что она имеет тип
                    "AddPostFormValuesKeysType", созданный нами выше.*/}
                    {createField<AddPostFormValuesKeysType>(
                        'Enter your message',
                        'newPostText',
                        Textarea,
                        [required, maxLength10]
                    )}
                </div>

                {/*Создаем специальный элемент "div", внутри которого будет находиться элемент "button", используемый
                как кнопка для сабмита данных введенных в форму.*/}
                <div>
                    <button>Add post</button>
                </div>
            </form>
        )
    };

/*Компонент "AddPostReduxForm" является отдельным контейнерным компонентом, цель которого в этом же файле обернуть
компонент "AddPostForm" функцией "reduxForm()", чтобы предоставить callback-функцию "handleSubmit()". Именно компонент
"AddPostReduxForm" будет заниматься общением с глобальным state.

Внутри компонента "AddPostReduxForm" используются следующие компоненты:
1. "AddPostForm" - компонент, который представляет собой форму для добавления постов в профиле пользователя в виде
заготовки для оборачивания ее функцией "reduxForm()". Из этого же файла.

Компонент "AddPostReduxForm" используется в компоненте "MyPosts" в этом же файле.

Функция "reduxForm()" является generic, поэтому мы ее уточняем. В файле декларации функции "reduxForm()" указано, что он
принимает следующие данные:
1. "formData" - какие именно данные собирает форма в компоненте (то есть в компоненте "AddPostForm"), оборачиваемым
функцией "reduxForm()";
2. "собственные props" компонента (то есть компонента "AddPostForm"), которого оборачиваем функцией "reduxForm()";
3. вид ошибки формы с типом строки, но в данном случае мы этого не указываем.*/
const AddPostReduxForm = reduxForm<AddPostFormValuesType, AddPostFormOwnPropsType>({
    /*Это то самое уникальное имя для данных этой формы, которые будут попадать в глобальный state.*/
    form: 'profileAddPostForm'
})(AddPostForm);

/*"MyPosts" это функциональный компонент, который создан в виде стрелочной функции. "MyPosts" является компонентом,
который отображает посты на странице профиля пользователя.

Внутри компонента "MyPosts" используются следующие компоненты:
1. "Post" - компонент, который описывает, как должны выглядеть посты пользователя в его профиле. Импортирован.
2. "AddPostReduxForm" - отдельный контейнерный компонентом, цель которого в этом же файле обернуть компонент
"AddPostForm" функцией "reduxForm()", чтобы предоставить callback-функцию "handleSubmit()". Из этого же файла.

Компонент "MyPosts" импортируется в файле "MyPostsContainer.tsx".

Изначально это был классовый компонент и он отрисовывался несколько лишних раз. Но, вроде, если использовать функцию
"connect()", то лишних отрисовок не будет. В любом случае, мы делаем этот компонент функциональным, чтобы избежать этих
лишних перерисовок. Для этого мы и используем "React.memo()" (вроде это HOC), содержащий оптимизацию этих перерисовок,
для оборачивания нашего функционального компонента.

При помощи деструктуризации props указываем какие именно props мы получаем:
1. "postsData" - данные о постах на странице пользователя.
2. "addPost" - AC для добавления нового поста на странице профиля.*/
export const MyPosts: React.FC<MyPostsPropsType> = React.memo(({postsData, addPost}) => {
    /*Массив "postsElements" содержит посты пользователя в его профиле.*/
    const postsElements = postsData.map(p => <Post id={p.id}
                                                   message={p.message}
                                                   likes={p.likesCount}
                                                   avatar={p.avatar}
                                                   key={p.id}/>);

    /*Создаем специальную callback-функцию "addNewPost()", который будет вызываться при срабатывании события "onSubmit"
    в форме. Эта callback-функция будет собирать все данные формы (текст нового поста пользователя на странице профиля)
    в одном месте. Эти данные будут отдаваться AC "addPost()" для добавления нового поста пользователя на странице
    профиля. Эта callback-функция получает указанные данные на входе в объекте "formData" с типом
    "AddPostFormValuesType".*/
    const addNewPost = (formData: AddPostFormValuesType) => {
        /*Здесь мы вызываем AC "addPost()", полученный из props, и передаем ему текст нового поста пользователя на
        странице профиля.*/
        addPost(formData.newPostText);
        /*После вывода поста зануляем поле для ввода текста.*/
        formData.newPostText = '';
    };

    return (
        /*Этот элемент "div" из себя представляет блок с постами пользователя.*/
        <div className={styles.postsBlock}>
            {/*При помощи элемента "h3" создаем заголовок для блока постов пользователя.*/}
            <h3>My posts</h3>
            {/*Здесь в событии "onSubmit" будет приходить объект с данными из callback-функции "handleSubmit()" из
            компонента "AddPostForm", который обернут компонентом "AddPostReduxForm". Далее будет вызываться при этом
            событии нами созданная callback-функция "addNewPost()", в которую будет передаваться этот объект с данными.
            После этого эти данные будут отправляться в часть глобального state, которую обрабатывает библиотека Redux
            Form, с целью осуществления работы нашей формы логина. Но теперь после отправки поста окно для ввода текста
            поста не будет очищаться, так как библиотека Redux Form хоть и осуществляет FLUX-круговорот, но очистку не
            осуществляет.*/}
            <AddPostReduxForm onSubmit={addNewPost}/>
            {/*Отрисовываем посты пользователя.*/}
            <div className={styles.posts}>{postsElements}</div>
        </div>
    );
});