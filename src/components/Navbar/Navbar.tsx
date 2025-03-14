import React from 'react';
import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux';
/*Импортируем селектор "getSidebar()".*/
import {getSidebar} from '../../redux/sidebar-selectors';
/*Импортируем из UI-фреймворка Ant Design несколько компонентов. Компонент "Layout" для получения из него компонента
"Sider", чтобы использовать его как тег для реализации навигационного меню.*/
import {Layout, Menu} from 'antd';
/*Импортируем иконки из UI-фреймворка Ant Design.*/
import {
    UserOutlined, ProfileOutlined, BuildOutlined, MessageOutlined, TeamOutlined, HeartOutlined, AlertOutlined,
    ThunderboltOutlined, ToolOutlined, CommentOutlined, BookOutlined
} from '@ant-design/icons';
import styles from './Navbar.module.css';
/*Импортируем компонент "Sidebar".*/
import {SideBar} from './Sidebar/Sidebar';

/*Создаем отдельный тип для объекта "location" из HOC "withRouter()" из библиотеки React Router DOM.*/
type PathnameType = {
    location: {
        pathname: string
    }
};

type PropsType = PathnameType;

/*"Navbar" это функциональный компонент, который создан в виде стрелочной функции. "Navbar" является компонентом,
который отрисовывает меню навигации нашего сайта.

Внутри компонента "Navbar" используются следующие компоненты:
1. "SideBar" - компонент, описывающий типовое отображение друзей в онлайне в навигационном меню сайта. Импортирован.

Компонент "Header" импортируется в файле "App.tsx".*/
export const Navbar: React.FC<PropsType> = (props) => {
    /*При помощи хука "useSelector()", передав в него селектор "getSidebar()", получаем весь state из файла
    "sidebar-reducer.ts".*/
    const sidebar = useSelector(getSidebar);

    /*В JSX в массив можно вкладывать компоненты. В React, если мы передаем какой-либо массив, то JSX отобразит каждый
    элемент этого массива в виде строки.

    Метод "map()" - это метод массивов из JS, который позволяет создать новый массив на основе преобразования исходного
    массива. Метод "map()" принимает стрелочную функцию в виде параметра.

    В нашем случае будет сначала браться первый объект из исходного массива объектов и на основе данных этого объекта
    будет формироваться первый элемента нового массива, который будет из себя представлять JSX компонента, указанного в
    стрелочной функции. Потом будет браться следующий объект из исходного массива объектов и на основе данных уже этого
    объекта будет формироваться следующий элемент нового массива, который будет из себя представлять JSX компонента,
    указанного в стрелочной функции.

    И так будет продолжаться до тех пор, пока мы не переберем все объекты в изначальном массиве объектов. То есть
    переданная в метод "map()" стрелочная функция вызывается столько раз, сколько элементов в изначальном массиве
    объектов. В итоге получится новый массив с элементами в виде компонентов, построенных на основе данных из BLL.

    Вызвав такой массив в JSX мы отобразим наши компоненты. При использовании метода "map()" нужно указывать атрибут
    "key" для избежания ошибок.

    Массив "sidebarElements" содержит список друзей в онлайне.*/
    const sidebarElements = sidebar.friendsData.map(f => <SideBar name={f.name}
                                                                  id={f.id}
                                                                  avatar={f.avatar}
                                                                  key={f.id}/>);

    /*При помощи деструктуризации берем компонент "SubMenu" из компонента "Menu" из UI-фреймворка Ant Design, чтобы
    использовать его, как тег для реализации подменю.*/
    const {SubMenu} = Menu;
    /*При помощи деструктуризации берем компонент "Sider" из компонента "Layout" из UI-фреймворка Ant Design, чтобы
    использовать его как тег для реализации навигационного меню.*/
    const {Sider} = Layout;
    /*Создаем массив строк, который в дальнейшем будет хранить значение атрибута "key" компонентов "SubMenu" и
    "Menu.Item" в меню ниже, чтобы мы могли знать какое подменю необходимо раскрывать исходя из пути, на котором мы
    находимся.*/
    const subMenuKey = [''];

    /*Создаем специальную функцию "getSubMenuKey()", для получения атрибутов "key" компонентов "SubMenu" и "Menu.Item" и
    записи их в массив "subMenuKey". На входе получает строковой параметр.*/
    const getSubMenuKey = (key: string) => {
        /*Каждый раз очищаем наш массив "subMenuKey", чтобы там не копились значения.*/
        while (subMenuKey.length > 0) subMenuKey.pop();
        /*Если наш массив "subMenuKey" пустой, то записываем в него соответствующий ключ пункта меню.*/
        if (subMenuKey.length === 0) subMenuKey.push(key);
    };

    /*При помощи конструкции switch/case заполняем наш строковой массив "subMenuKey" в зависимости от пути, на котором
    мы находимся. "props.location.pathname" содержит строковое значение пути благодаря HOC "withRouter()".*/
    switch (props.location.pathname) {
        case '/profile/':
        case '/dialogs/':
            getSubMenuKey('sub1');
            break;

        case '/friends/':
        case '/users/':
        case '/chat/':
            getSubMenuKey('sub2');
            break;

        case '/news/':
        case '/music/':
        case '/settings/':
        case '/usestatetheory/':
        case '/useeffecttheory/':
            getSubMenuKey('sub3');
            break;
    }

    /*Создаем специальную функцию "getSubMenuKeyCallback()", которая будет вызываться при нажатии на пункты меню, брать
    атрибут "key" из пункта меню и сохранять его в наш массив "subMenuKey". Нам это нужно, так как конструкция
    switch/case выше после нажатия на один из пунктов меню не позволяла выбирать другие пункты меню, так как не
    подхватывались атрибуты "key" других пунктов меню при нажатии на эти пункты. Для события "event" указываем тип
    any, так как пока не знаем какого он именно типа.*/
    const getSubMenuKeyCallback = (event: any) => { getSubMenuKey(event.key) };

    return (
        <>
            {/*Отрисовываем компонент "Sider" для создания навигационного меню.*/}
            <Sider>
                {/*Отрисовываем компонент "Menu" для создания самого меню. Внутри используются компоненты "Submenu" для
                создания подменю и компоненты "Menu.Item" для создания пунктов меню и подменю.*/}
                <Menu
                    className={styles.menu}
                    mode='inline'
                    /*Используем атрибут "selectedKeys" для выделения подпунктов меню при их выборе. Мы этого добились
                    задав значения атрибутам "key" компонентов "Menu.Item" как пути, на которые эти подпункты меню
                    переводят нас. Таким образом, при выборе любого подпункта меню мы получаем путь, на который перешли,
                    по своему значению равный одному из значений атрибута "key" какого-то подпункта меню, что мы можем
                    использовать для указания какой подпункт меню нам нужно подсветить.*/
                    selectedKeys={[props.location.pathname]}
                    /*Используем атрибут "openKeys" для разворачивания только тех подпунктов меню, пункты которых мы
                    выбрали.*/
                    openKeys={subMenuKey}
                >
                    <SubMenu key='sub1' icon={<UserOutlined/>} title='My Page' onTitleClick={getSubMenuKeyCallback}>
                        <Menu.Item key='/profile/' icon={<ProfileOutlined/>}>
                            <Link to='/profile/'>Profile</Link>
                        </Menu.Item>

                        <Menu.Item key='/dialogs/' icon={<MessageOutlined/>}>
                            <Link to='/dialogs/'>Dialogs</Link>
                        </Menu.Item>
                    </SubMenu>

                    <SubMenu key='sub2' icon={<UserOutlined/>} title='People' onTitleClick={getSubMenuKeyCallback}>
                        <Menu.Item key='/friends/' icon={<HeartOutlined/>}>
                            <Link to='/friends/'>Friends</Link>
                        </Menu.Item>

                        <Menu.Item key='/users/' icon={<TeamOutlined/>}>
                            <Link to='/users/'>Users</Link>
                        </Menu.Item>

                        <Menu.Item key='/chat/' icon={<CommentOutlined/>}>
                            <Link to='/chat/'>Chat</Link>
                        </Menu.Item>
                    </SubMenu>

                    <SubMenu key='sub3' icon={<BuildOutlined/>} title='Other' onTitleClick={getSubMenuKeyCallback}>
                        <Menu.Item key='/news/' icon={<AlertOutlined/>}>
                            <Link to='/news/'>News</Link>
                        </Menu.Item>

                        <Menu.Item key='/music/' icon={<ThunderboltOutlined/>}>
                            <Link to='/music/'>Music</Link>
                        </Menu.Item>

                        <Menu.Item key='/settings/' icon={<ToolOutlined/>}>
                            <Link to='/settings/'>Settings</Link>
                        </Menu.Item>

                        <Menu.Item key='/usestatetheory/' icon={<BookOutlined/>}>
                            <Link to='/usestatetheory/'>UseState Theory</Link>
                        </Menu.Item>

                        <Menu.Item key='/useeffecttheory/' icon={<BookOutlined/>}>
                            <Link to='/useeffecttheory/'>UseEffect Theory</Link>
                        </Menu.Item>
                    </SubMenu>

                    {/*Отрисовываем элементы сайдбара, отображающие друзей в онлайне.*/}
                    {sidebarElements}
                </Menu>
            </Sider>
        </>
    );
};