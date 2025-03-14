import {connect} from 'react-redux';
/*Импортируем объект "profileAC", что использовать оттуда АC "addPostActionCreator()".*/
import {profileAC} from '../../../redux/profile-reducer';
/*Импортируем компонент "MyPosts".*/
import {MyPosts} from './MyPosts';
/*Импортируем тип "PostType".*/
import {PostType} from '../../../types/types';
/*Импортируем тип "AppStateType".*/
import {AppStateType} from '../../../redux/redux-store';

type MapStateToPropsType = {
    /*Данные о постах на странице пользователя должны быть массивом с элементами с типом "PostType".*/
    postsData: Array<PostType>
};

type MapDispatchToPropsType = {
    /*AC для добавления нового поста на странице профиля, который принимает строковой параметр и ничего не возвращает.*/
    addPost: (newMessageText: string) => void
};

/*При помощи функции "mapStateToProps()" указываются данные из state, которые необходимо передать в компонент
"MyPosts".*/
const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        /*Данные о постах на странице пользователя.*/
        postsData: state.profilePage.postsData
    }
};

/*"MyPostsContainer" это не классовый компонент и не функциональный компонент. "MyPostsContainer" является контейнерным
компонентом для компонента "MyPosts".

Внутри компонента "MyPostsContainer" используются следующие компоненты:
1. "MyPosts" - Импортирован.

Этот компонент экспортируется по default и используется в нашем приложении под именем "MyPostsContainer". Компонент
"MyPostsContainer" импортируется в файле "Profile.tsx".

В отличие от классового компонента, компонент такого типа не имеет методов жизненного цикла классового компонента. В
этом компоненте мы просто создаем функции "mapStateToProps()" и "mapDispatchToProps()", тем самым формируя props для
презентационной компоненты "MyPosts". Поэтому нам не нужно создавать классовый компонент для этого. Таким же образом
работает компонент "DialogsContainer".

При помощи функции "connect()" создаем контейнерный компонент, и тем самым передаем нужные данные BLL и DAL компоненту
"MyPosts". Поскольку функция "connect()" является generic, то ее можно уточнить: первым в "<>" указан тип для функции
"MapStateToProps()", вторым для функции "MapDispatchToProps()", третьим для "собственных props" компонента, четвертым
для state. Эти параметры мы узнали перейдя в файл декларации функции "connect()".*/
export default connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>(mapStateToProps,
    {addPost: profileAC.addPost}
)(MyPosts);