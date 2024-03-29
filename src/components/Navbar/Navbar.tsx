import React from 'react';
/*
Подключаем сам "ReactJS", необходим везде, где мы что-то из него используем (например, JSX).
"WebPack" уже встроен в "ReactJS".
*/
import {Link, NavLink} from 'react-router-dom';
/*
Библиотека "react-router-dom" необходима для создания роутинга и маршрутов в приложении.
Подключаем "NavLink", который является аналогом элемента "a" из HTML, хотя в браузере в итоге все равно будет
отображаться элемент "a".
Но "NavLink" не перезагружает все приложение в отличии от обычного использования элемента "a", то есть "NavLink"
отменяет действие по умолчанию элемента "a".
"NavLink" используется для перемещения по "Route" маршрутам.
"NavLink" вместо атрибута "href" использует атрибут "to".
"NavLink" добавляет атрибует "class" со значением "active" к элементу "a", когда осуществляется переход по ссылке.
Но класс "active" нам не подходит, посколько React добавляет уникальный префиксы и суффиксы к значению класса из-за
использования CSS-модуля.
Атрибут "activeClassName" позволяет указывать какой именно класс добавляется к элементу "a" вместо класса "active".
Но здесь мы используем "Link", который является аналогом "NavLink".
*/
import {useSelector} from 'react-redux';
/*
Библиотека "react-redux" является прослойкой между UI (react) и BLL (redux). Эта прослойка необходима потому, что UI
нежелательно общаться с BLL напрямую. Библиотека "react-redux" предоставляет продвинутые инструкции по созданию
контейнерных компонент и контекста.
"useSelector" - это hook, который принимает селектор и возвращает данные, которые возвращает этот селектор.
*/

import {getSidebar} from '../../redux/sidebar-selectors'; /*Импортируем селектор, который возвращает весь "state" из
"sidebar-reducer.ts".*/

import {SideBar} from './Sidebar/Sidebar'; /*Подключаем компонент "Sidebar".*/

import styles from './Navbar.module.css'; /*Подключаем стили из CSS-модуля.*/
import {Layout, Menu} from 'antd';
/*
Импортируем из UI-фреймфорка "Ant Design" следующее:
"Layout" - для получения из него объекта "Sider" , чтобы использовать его как тег внутри для реализации навигационного
меню;
"Menu" - для реализации элементов меню.
*/
import {
    UserOutlined,
    ProfileOutlined,
    BuildOutlined,
    MessageOutlined,
    TeamOutlined,
    HeartOutlined,
    AlertOutlined,
    ThunderboltOutlined,
    ToolOutlined,
    CommentOutlined,
    BookOutlined
} from '@ant-design/icons'; /*Импортируем иконки из UI-фреймфорка "Ant Design".*/


/*Создали отдельный тип для объекта "location" из функции "withRouter" из библиотеки "react-router-dom".*/
type PathnameType = {
    location: {
        pathname: string
    }
};

/*Создаем тип для "props". "Props" в этом компоненте должны обязательно содержать следующие поля с указанными типами.
Все это нужно для указания типа "props" в функциональном компоненте.*/
type PropsType = PathnameType;


/*
"Navbar" это функциональный компонент, который создан в виде стрелочной функции.
При взаимодействии с функциональным компонентом React не хранит его постоянно в памяти.
React вызывает функциональный компонент, он делает свою работу (например, возвращает JSX) и компонент удаляется
из памяти.
Функциональный компонент можно создать еще и таким образом: function Navbar(props) {тело}.
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
"Navbar" является компонентом, который отрисовывает меню навигации нашего сайта.
Этот компонент подключается в компоненте "App".
*/
export const Navbar: React.FC<PropsType> = (props) => { /*Указали при помощи "React.FC<>", что
"props" в этом функциональном компоненте имеют тип "PropsType". Также указали, что экспортируем этот компонент.*/
    const sidebar = useSelector(getSidebar); /*При помощи хука "useSelector", передав в него селектор "getSidebar",
    получаем весь "state" из "sidebar-reducer.ts".*/

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
    Массив "sidebarElements" содержит список друзей в онлайне.
    При использовании метода "map" нужно указывать атрибут "key" для избежания ошибок.
    */
    let sidebarElements = sidebar.friendsData.map(f => <SideBar name={f.name}
                                                                id={f.id}
                                                                avatar={f.avatar}
                                                                key={f.id}/>);

    const {SubMenu} = Menu; /*При помощи деструктуризации берем объект "SubMenu" из объекта "Menu" из UI-фреймфорка "Ant
    Design", чтобы использовать его как тег внутри для реализации подменю.*/
    const {Sider} = Layout; /*При помощи деструктуризации берем объект "Sider" из объекта "Layout" из UI-фреймфорка
    "Ant Design", чтобы использовать его как тег внутри для реализации навигационного меню.*/

    let subMenuKey = ['']; /*Создали массив строк, который в дальнейшем будет хранить значение атрибута "key" элементов
    "SubMenu" и "Menu.Item" в меню ниже, чтобы мы могли знать какое подменю необходимо раскрывать исходя из пути, на
    котором мы находимся.*/

    const getSubMenuKey = (key: string) => { /*Создали специальную функцию "getSubMenuKey", для получения атрибутов
    "key" элементов "SubMenu" и "Menu.Item" и записи их в наш массив "subMenuKey". На входе получает строковой
    параметр.*/
        while (subMenuKey.length > 0) { /*Каждый раз очищаем наш массив "subMenuKey", чтобы там не копились
            значения.*/
            subMenuKey.pop();
        };

        if (subMenuKey.length === 0) { /*Если наш массив "subMenuKey" пустой, то записываем в него соответствующий
            ключ пункта меню.*/
            subMenuKey.push(key);
        };
    };

    /*При помощи конструкции "switch/case" заполняем наш строковой массив "subMenuKey" в зависимости от пути, на
    котором мы находимся. "props.location.pathname" здесь находится строковое значение пути благодаря HOC
    "withRouter".*/
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
    };

    const getSubMenuKeyCallback = (event: any) => { /*Создали специальную функцию "getSubMenuKeyCallback", которая будет
    вызываться при нажатии на пункты меню, брать атрибут "key" из пункта меню и сохранять его в наш массив "subMenuKey".
    Нам это нужно, так как конструкция "switch/case" выше после нажатия на один из пунктов меню не позволяла выбирать
    другие пункты меню, так как не подхватывались атрибуты "key" других пунктов меню при нажатии на эти пункты. Для
    события "event" указали тип "any", так как пока не знаем какого он именно типа.*/
        getSubMenuKey(event.key);
    };

    /*
    Здесь после return в компоненте начинается HTML разметка.
    Нужно помнить, что в этой разметке должен быть только один корневой элемент.
    Поскольку то, что возвращает return указано с новой строки, поэтому все возвращаемое помещено в круглые скобки.
    */
    return (
        <> {/*Этот элемент "<>" и есть наш корневой элемент.*/}
            <Sider> {/*Отрисовываем элемент "Sider" для создания навигационного меню.*/}
                <Menu /*Отрисовываем элемеет "Menu" для создания самого меню. Внутри используются элементы "Submenu" для
                создания подменю и элементы "Menu.Item" для создания пунктов меню и подменю.*/
                    className={styles.menu}
                    mode='inline'
                    selectedKeys={[props.location.pathname]} /*Используем атрибут "selectedKeys" для выделения
                    подпунктов меню при их выборе. Мы этого добились задав значения атрибутам "key" элементов
                    "Menu.Item" как пути, на которые эти подпункты меню переводят нас. Таким образом, при выборе любого
                    подпункта меню мы получаем путь, на который перешли, который по своему значению равен одному из
                    значений атрибута "key" какого-то подпункта меню, что мы можем использовать для указания какой
                    подпункт меню нам нужно подсветить.*/
                    openKeys={subMenuKey} /*Используем атрибут "openKeys" для разворачивания только тех подпунктов меню,
                    пункты которых мы выбрали.*/
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

                        <Menu.Item key='/usestatetheory/' icon={<BookOutlined />}>
                            <Link to='/usestatetheory/'>UseState Theory</Link>
                        </Menu.Item>

                        <Menu.Item key='/useeffecttheory/' icon={<BookOutlined />}>
                            <Link to='/useeffecttheory/'>UseEffect Theory</Link>
                        </Menu.Item>
                    </SubMenu>

                    {sidebarElements} {/*Отрисовываем элементы сайдбара, отображающие друзей в онлайне.*/}
                </Menu>
            </Sider>
        </>
    );
};