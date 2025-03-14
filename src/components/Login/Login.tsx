import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Redirect} from 'react-router-dom';
/*Библиотека Redux Form нужна для работы с формами. Эта библиотека добавляет в store, то есть в глобальный state свой
редьюсер и обрабатывает какую-то свою ветку данных. Эта ветка процессит все формы на сайте, что позволяет нам меньше
делать работы по организации данных форм в редьюсере.

Эта библиотека предоставляет специальный HOC. Задача компонента, которым этот HOC обернет другой компонент, является
общаться со своей частью в редьюсере.

Эта библиотека является устаревшей, поэтому лучше использовать более актуальные аналоги, например, React Final Form,
которая работает на хуках. Так же может подойти Formik.

Эта библиотека, добавляя свою часть в глобальный state, обязуется заниматься круговоротом данных (FLUX) со всеми формами
в приложении. То есть нам самим не нужно будет что-то диспатчить. Часть state, которую создает эта библиотека, не
является по сути данными, относящимися к BLL, но при этом находятся в глобальном state.

Также эта библиотека упрощает создание валидации форм, так как в ее state есть полезные для этого данные (поля и
свойства).

Так же стоит помнить, что дефолтное поведение кнопки при "submit" это отправка данных на сервер, что является
индикатором для перерисовки в React.

После создания части в глобальном state, нужно необходимые формы оборачивать в функцию "reduxForm()" из библиотеки Redux
Form. Как и функция "connect()", функция "reduxForm()" вызывается дважды, сначала вызывается функция "reduxForm()" и мы
настраиваем ее, а потом она уже возвращает нам некий HOC, и этим HOC-ом при помощи замыкания мы оборачиваем форму,
вследствие чего вокруг компонента с формой появится контейнерный компонент, который будет диспатчить и общаться с
глобальным state.

Каждой форме нужно давать уникальное имя, чтобы не появилось проблем с библиотекой Redux Form.

Вместо "input" необходимо использовать компонент "Field" из библиотеки Redux Form. Указывая в нем атрибут "component",
мы указываем какой элемент нужно отрисовать. Другие указанные атрибуты перейдут в отрисованный элемент. Также необходимо
указывать атрибут "name", чтобы дать имя отправляемым через этот "input" данным. Библиотека Redux Form будет реагировать
на эти атрибуты "name" и осуществлять круговорот данных.

Для получения данных при "submit" есть особая callback-функция "handleSubmit()" в props, который создается при
оборачивании функцией "reduxForm()". В форме в событии "onSubmit" нужно указывать эту callback-функцию. В этой
callback-функции отключено дефолтное поведение по перезагрузке страницы. Также в нем идет сбор всех данных и они
упаковываются в объект, а затем вызывается "props.onSubmit()" у родителя (то есть у контейнерного компонента над
компонентом с формой), в который передается этот объект с данными. То есть мы должны в контейнерный компонент над
компонентом с формой передать некий метод, срабатывающий при событии "onSubmit". Этот некий метод будет использоваться
для передачи данных формы во внешний мир, то есть в глобальный state.

То есть в нашем случае происходит следующее:
1. callback-функция "handleSubmit()" указана в компоненте "LoginForm".
2. оборачиваем компонент "LoginForm" функцией "reduxForm()" в компоненте "LoginReduxForm", тем самым предоставляя
callback-функцию "handleSubmit()" для компонента "LoginForm".
3. компонент "LoginReduxForm" указывается в компоненте "Login", куда в событие "onSubmit" будет попадать объект с
данными, сформированный в событии "onSubmit" при помощи callback-функции "handleSubmit()" в компоненте "LoginForm".

То есть при срабатывании события "onSubmit" сначала вызывается callback-функция "handleSubmit()" в компоненте
"LoginForm", которая собирает все данные из формы и помещает их в объект. Потом внутри callback-функции "handleSubmit()"
вызывается нами созданная callback-функция "onSubmitForm()" (доступна из контейнерного компонента "LoginReduxForm") из
компонента "Login". В компонент "Login" передается указанный объект с данными и собираются в одном месте, потом эти
данные передаются в компонент "LoginReduxForm", из которого перенаправляются в глобальный state в виде объекта под
именем "login".

То есть общая логика при работе с библиотекой Redux Form такова:
1. выночим саму форму в отдельный компонент;
2. вешаем callback-функцию "handleSubmit()" в качестве обработчика события "onSubmit" в этой форме;
3. в этой форме вместо элементов "input" и прочего используем элемент "Field";
4. оборачиваем эту форму функцией "reduxForm()".

В компонент "LoginForm" внедряются некие дополнительные props (например, та же callback-функция "handleSubmit()") ХОКом,
который образуется при помощи компонента "LoginReduxForm". Эти props содержатся под именем "InjectedFormProps". Эти
"InjectedFormProps" также содержат добавленные нами props. Поэтому мы импортировали "InjectedFormProps" из библиотеки
Redux Form, чтобы типизировать такие props в компоненте "LoginForm".*/
import {InjectedFormProps, reduxForm} from 'redux-form';
/*Импортируем TC "login()".*/
import {login} from '../../redux/auth-reducer';
/*Импортируем селекторы "getCaptchaURL()" и "getIsAuth()".*/
import {getCaptchaURL, getIsAuth} from '../../redux/auth-selectors';
import styles from './Login.module.css';
import style from '../common/FormsControls/FormsControls.module.css';
/*Импортируем созданный нами компонент "Input" для создания элемента "input" с возможностью указывать валидацию. Также
импортируем функцию "createField()", которая принимает параметры и создает элементы формы. Мы ее используем для создания
формы в компоненте "LoginForm". Дополнительно импортируем тип "GetValuesKeysType".*/
import {createField, GetValuesKeysType, Input} from '../common/FormsControls/FormsControls';
/*Импортируем валидаторы для полей форм.*/
import {maxLengthCreator, required} from '../../utils/validators/validators';

/*Создаем общий тип для всех props компонента "Login".*/
type LoginPropsType = {};

/*Создаем тип для "собственных props" компонента "LoginForm".*/
type LoginFormOwnPropsType = {
    /*Путь к капче, который должен быть строкой или null, то есть быть пустым.*/
    captchaURL: string | null
};

/*Создаем тип для props компонента "LoginForm", которые будут использоваться в "formData" для компонента "Login".*/
type LoginFormValuesType = {
    /*Email пользователя, который должен быть строкой.*/
    email: string
    /*Пароль пользователя, который должен быть строкой.*/
    password: string
    /*Информация запомнить ли пользователя, которая должна быть булева типа.*/
    rememberMe: boolean
    /*Путь к капче, который должен быть строкой.*/
    captcha: string
};

/*Следующий тип мы создаем специально, чтобы мы не могли допустить ошибок при указании свойства "name" в функции
"createField()". Это свойство важно для формирования имен свойств "formData", то есть данных формы. Для этого мы
используем вспомогательный тип "GetValuesKeysType". Нужные нам имена свойств уже перечислены в типе
"LoginFormValuesType", поэтому мы при помощи этого типа "GetValuesKeysType" получаем типы ключей из типа
"LoginFormValuesType".*/
type LoginFormValuesKeysType = GetValuesKeysType<LoginFormValuesType>;

/*Создаем валидатор, который проверяет не введено ли больше 30 символов в поле.*/
const maxLength30 = maxLengthCreator(30);

/*"LoginForm" это функциональный компонент, который создан в виде стрелочной функции. "LoginForm" является компонентом,
который представляет собой форму логинизации в виде заготовки для оборачивания ее функцией "reduxForm()".

Внутри компонента "LoginForm" используются следующие компоненты:
1. "Input" - компонент, который используется для отрисовки элементов "input" в других местах, где в таких элементах
требуется валидация. Импортирован.

Компонент "LoginForm" используется в компоненте "LoginReduxForm" в этом же файле и оборачивается функцией "reduxForm()",
тем самым получая callback-функцию "handleSubmit()".

При помощи деструктуризации props указываем какие именно props мы получаем:
1. "handleSubmit" - callback-функция "handleSubmit()".
2. "error" - текст ошибки, которая может появиться при использовании формы, формируется при помощи библиотеки Redux
Form.
3. "captchaURL" - URL капчи при логинизации.

Указываем при помощи "React.FC<>", что props в этом функциональном компоненте имеют тип
"InjectedFormProps<LoginFormValuesType, LoginFormOwnPropsType> & LoginFormOwnPropsType>".

Такая комбинация получилась следующим образом:
1. "InjectedFormProps<LoginFormValuesType, LoginFormOwnPropsType>" - здесь мы уточняем внедренные ХОКом, который
образуется при помощи компонента "LoginReduxForm", "InjectedFormProps". "LoginFormValuesType" указывает, что приходит из
этого ХОКа, а "LoginFormOwnPropsType" указывает, что приходит со стороны - "captchaURL".
2. "& LoginFormOwnPropsType" - также этот компонент содержит некие свои "собственные props", которые не приходят от ХОКа
выше - тот же "captchaURL".

Это мы делаем на основании файла декларации "InjectedFormProps". Там указано, что первым параметром принимаются
"formData" - то есть какие именно данные собирает форма в компоненте, оборачиваемый функцией "reduxForm()" (то есть
компонент "LoginForm"), и "собственные props" этого компонента "LoginForm", непреходящие от ХОКа выше (так нужно для
внутренней работы "InjectedFormProps"). А вторым параметром принимаются еще раз некие свои "собственные props", которые
не приходят от ХОКа выше (так уже надо для работы самого этого компонента "LoginForm"). Третьим параметром принимается
вид ошибки формы с типом строки, но в данном случае мы этого не указываем.

Только все эти три параметра указываются как бы вместе как единый параметр, а не через запятую как три разных параметра.
ВОЗМОЖНО, это так потому, что "InjectedFormProps" является объектом (как единое целое состоит из разных свойств, которые
можно типизировать суммой разных типов), а та же функция "reduxForm()" является функцией (принимает последовательность
параметров, где каждый параметр нужно отдельно типизировать).*/
const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnPropsType> & LoginFormOwnPropsType> =
    ({handleSubmit, error, captchaURL}) => {
        return (
            /*Здесь в элементе "form" в событии "onSubmit" указываем callback-функцию "handleSubmit()".*/
            <form onSubmit={handleSubmit}>
                {/*Создаем поле для ввода почты на основе импортированной функции "createField()". Уточняем здесь
                функцию "createField()", что она имеет тип "LoginFormValuesKeysType", созданный нами выше.*/}
                {createField<LoginFormValuesKeysType>(
                    'Email',
                    'email',
                    Input,
                    [required, maxLength30]
                )}

                {/*Создаем поле для ввода пароля на основе импортированной функции "createField()".*/}
                {createField<LoginFormValuesKeysType>(
                    'Password',
                    'password',
                    Input,
                    [required, maxLength30],
                    {type: 'password'}
                )}

                {/*Добавляем чек-бокс "Запомнить меня?" на основе импортированной функции "createField()". undefined
                означает отсутствие свойства.*/}
                {createField<LoginFormValuesKeysType>(
                    undefined,
                    'rememberMe',
                    Input,
                    [],
                    {type: 'checkbox'},
                    'Remember me?'
                )}

                {/*Если есть капча, то отрисуем элемент "img" с изображением капчи.*/}
                {captchaURL && <img src={captchaURL} alt=''/>}

                {/*Если есть капча, то отрисуем поле для ввода текста с капчи. Это поле создается на основе
                импортированной функции "createField()".*/}
                {captchaURL && createField<LoginFormValuesKeysType>(
                    'Enter the captcha',
                    'captcha',
                    Input,
                    [required]
                )}

                {/*Если произошла какая-то ошибка, то выведем ее в отдельном элементе "div". Свойство "error" будет в
                объекте props благодаря библиотеке Redux Form, в него подцепится значение из TC "login()" из файла
                "auth-reducer.ts".*/}
                {error && <div className={style.formSummaryError}>{error}</div>}

                {/*Создаем специальный элемент "div", внутри которого будет находиться элемент "button", используемый
                как кнопка для сабмита данных введенных в форму.*/}
                <div>
                    <button>Log in</button>
                </div>
            </form>
        );
    };

/*Компонент "LoginReduxForm" является отдельным контейнерным компонентом, цель которого в этом же файле обернуть
компонент "LoginForm" функцией "reduxForm()", чтобы предоставить callback-функцию "handleSubmit()". Именно компонент
"LoginReduxForm" будет заниматься общением с глобальным state.

Внутри компонента "LoginReduxForm" используются следующие компоненты:
1. "LoginForm" - компонент, который представляет собой форму логинизации в виде заготовки для оборачивания ее функцией
"reduxForm()". Из этого же файла.

Компонент "LoginReduxForm" используется в компоненте "Login" в этом же файле.

Функция "reduxForm()" является generic, поэтому мы ее уточняем. В файле декларации функции "reduxForm()" указано, что
она принимает следующие данные:
1. "formData" - какие именно данные собирает форма в компоненте (то есть в компоненте "LoginForm"), оборачиваемым
функцией "reduxForm()";
2. "собственные props" компонента (то есть компонента "LoginForm"), которого оборачиваем функцией "reduxForm()";
3. вид ошибки формы с типом строки, но в данном случае мы этого не указываем.*/
const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnPropsType>({
    /*Это то самое уникальное имя для данных этой формы, которые будут попадать в глобальный state.*/
    form: 'login'
})(LoginForm);

/*"Login" это функциональный компонент, который создан в виде стрелочной функции. "Login" является компонентом, который
представляет собой финальную страницу с формой логинизации.

Внутри компонента "LoginForm" используются следующие компоненты:
1. "LoginReduxForm" - отдельный контейнерный компонентом, цель которого в этом же файле обернуть компонент "LoginForm"
функцией "reduxForm()", чтобы предоставить callback-функцию "handleSubmit()". Из этого же файла.

Компонент "Login" импортируется в файле "App.tsx".*/
export const Login: React.FC<LoginPropsType> = (props) => {
    /*При помощи хука "useSelector()", передав в него селектор "getCaptchaURL()", получаем URL капчи при логинизации.*/
    const captchaURL = useSelector(getCaptchaURL);
    /*При помощи хука "useSelector()", передав в него селектор "getIsAuth()", получаем информацию являемся ли мы
    залогиненными в приложение или нет.*/
    const isAuth = useSelector(getIsAuth);
    const dispatch = useDispatch();

    /*Создаем специальную callback-функцию "onSubmitForm()", которая будет вызываться при срабатывании события
    "onSubmit" в форме. Эта callback-функция будет собирать все данные формы (email пользователя, пароль пользователя,
    указание запомнить ли данные входа, и капча, если присутствует) в одном месте. Эти данные будут отдаваться в TC
    "login()" для осуществления логинизации. Эта callback-функция получает указанные данные на входе в объекте
    "formData" с типом "LoginFormValuesType".*/
    const onSubmitForm = (formData: LoginFormValuesType) => {
        dispatch(login(formData.email, formData.password, formData.rememberMe, formData.captcha));
    };

    /*Если пользователь залогинен, то его должно перенаправить на страницу профиля, вместо показа формы для
    логинизации.*/
    if (isAuth) return <Redirect to={'/profile/'}/>;

    return (
        <div>
            {/*Отрисовываем элемент "h1" c текстом "Log in".*/}
            <h1>Log in</h1>
            {/*Здесь в событии "onSubmit" будет приходить объект с данными из callback-функции "handleSubmit()" из
            компонента "LoginForm", который обернут компонентом "LoginReduxForm". Далее будет вызываться при этом
            событии нами созданная callback-функция "onSubmitForm", в которую будет передаваться этот объект с данными.
            После этого эти данные будут отправлены в часть глобального state, которую обрабатывает библиотека Redux
            Form, с целью осуществления работы нашей формы логина. Поскольку мы вызываем функцию "onSubmitForm()" как
            callback-функцию, то поэтому не ставим "()" после имени функции.*/}
            <LoginReduxForm onSubmit={onSubmitForm} captchaURL={captchaURL}/>
        </div>
    );
};