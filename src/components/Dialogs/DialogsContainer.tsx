import {connect} from 'react-redux';
import {compose} from 'redux';
/*Импортируем объект "dialogsAC", что использовать оттуда AC "addMessageActionCreator()". Также Импортируем типы из
файла "dialogs-reducer.ts".*/
import {dialogsAC, InitialDialogsStateType} from '../../redux/dialogs-reducer';
/*Импортируем компонент "Dialogs".*/
import {Dialogs} from './Dialogs';
/*Импортируем созданный нами HOC "withAuthRedirect()" для добавления редиректа.*/
import {withAuthRedirect} from '../../hoc/WithAuthRedirect';
/*Импортируем тип "ComponentType" для типизации.*/
import {ComponentType} from 'react';
/*Импортируем тип "AppStateType".*/
import {AppStateType} from '../../redux/redux-store';

type MapStateToPropsType = {
    /*Поскольку передаем в этот компонент весь state из файла "dialogs-reducer.ts", то указываем тип
    "InitialDialogsStateType" - это тип всего этого state.*/
    dialogsPage: InitialDialogsStateType
};

type MapDispatchToPropsType = {
    /*AC для добавления нового исходящего сообщения, который принимает строковой параметр и ничего не возвращает.*/
    addMessage: (newMessageText: string) => void
};

/*При помощи функции "mapStateToProps()" указываются данные из state, которые необходимо передать в компонент
"Dialogs".*/
const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {dialogsPage: state.dialogsPage}
};

/*"DialogsContainer" это не классовый компонент и не функциональный компонент. "DialogsContainer" является контейнерным
компонентом для компонента "Dialogs".

Внутри компонента "DialogsContainer" используются следующие компоненты:
1. "Dialogs" - компонентом, который отображает диалоги. Импортирован.

Этот компонент экспортируется по default и используется в нашем приложении под именем "DialogsContainer". Компонент
"DialogsContainer" импортируется в файле "App.tsx".

Контейнерные компоненты оборачивают презентационные компоненты и передают им данные BLL и DAL. Эти данные в нашем
приложении контейнерные компоненты получают из контекста, созданного при помощи компонента "Provider" (указан в файле
"App.tsx") из библиотеки React Redux.

В отличие от классового компонента, компонент такого типа не имеет методов жизненного цикла классового компонента. В
этом компоненте мы просто создаем функции "mapStateToProps()" и "mapDispatchToProps()", тем самым формируя props для
презентационной компоненты "Dialogs". Поэтому нам не нужно создавать классовый компонент для этого. Таким же образом
работает компонент "MyPostsContainer".

При помощи функции "compose()" объединяем HOC "withAuthRedirect()" и функцию "connect()", возвращая итоговый компонент
"DialogsContainer".

Здесь мы уточняем тип только одним параметром, так как согласно файлу декларации функции "compose()" (раздел "rest"),
нам нужно уточнить только такой компонент, свойства props которого не будут переданы в этот компонент функциями,
переданными внутрь функции "compose()", то есть функциями HOC-ом "withRouter()" и функцией "connect()", а это никакие
свойства, так как мы не передаем извне ничего в компонент "Dialogs".*/
export default compose<ComponentType>(
    /*При помощи функции "connect()" создаем контейнерный компонент, и тем самым передаем нужные данные BLL и DAL
    компоненту "Dialogs". Поскольку функция "connect()" является generic, то ее можно уточнить: первым в "<>" указан тип
    для функции "MapStateToProps()", вторым для функции "MapDispatchToProps()", третьим для "собственных props"
    компонента, четвертым для state. Эти параметры мы узнали перейдя в файл декларации функции "connect()".*/
    connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>(
        mapStateToProps,
        {addMessage: dialogsAC.addMessage}
    ),
    /*При помощи HOC "withAuthRedirect()" добавляем логику по редиректу в компонент.*/
    withAuthRedirect
)(Dialogs);

/*--------------------------------------------------------------------------------------------------------------------*/

/*Это старый вариант функции "mapDispatchToProps()". Сейчас АС "addMessage()" мы используем в функции "connect()". Здесь
указываются данные (callback-функции - AC или TC) dispatch, которые необходимо передать в компонент "Dialogs". Эта
функция возвращает указанные данные в виде объекта. Функция "mapDispatchToProps()" работает следующим образом:
1. Компонент вызывает callback-функцию "addMessage()".
2. Компонент передает этой функции параметр "newMessageText".
3. Далее этот параметр передается в AC "addMessageActionCreator()".
4. Этот AC вызывается.
5. Создается action-объект.
6. Этот action-объект диспатчится в "dialogsReducer" в файле "dialogs-reducer.ts".*/
// const mapDispatchToProps = (dispatch) => {
//     return {
//         addMessage: (newMessageText) => { dispatch(dialogsAC.addMessage(newMessageText)) }
//     }
// };