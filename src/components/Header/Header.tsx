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
import {useDispatch, useSelector} from 'react-redux';
/*
Библиотека "react-redux" является прослойкой между UI (react) и BLL (redux). Эта прослойка необходима потому, что UI
нежелательно общаться с BLL напрямую. Библиотека "react-redux" предоставляет продвинутые инструкции по созданию
контейнерных компонент и контекста.
"useSelector" - это hook, который принимает селектор и возвращает данные, которые возвращает этот селектор.
"useDispatch" - это hook, который принимает AC или TC и диспатчит их.
*/

import {logout} from '../../redux/auth-reducer'; /*Подключаем TC "logout" из "auth-reducer".*/

import {
    getLogin, /*Импортируем селектор, который возвращает "login" залогиненного пользователя.*/
    getIsAuth /*Импортируем селектор, который возвращает информацию о том, что являемся ли мы залогинены в приложение
    или нет.*/
} from '../../redux/auth-selectors';

import styles from './Header.module.css'; /*Подключаем стили из CSS-модуля.*/
import headerLogoSource from '../../assets/images/headerlogo.png'; /*Импортируем из ассетов проекта логотип сайта.*/
import {Layout, Menu, Avatar, Row, Col, Button, Image} from 'antd';
/*
Импортируем из UI-фреймфорка "Ant Design" следующее:
"Layout" - для получения из него объекта "Header" , чтобы использовать его как тег внутри для реализации хэдера нашего
приложения;
"Menu" - для реализации элементов меню;
"Avatar" - для реализации заглушки для аватара пользователя;
"Row" - для реализации строк;
"Col" - для реализации столбцов, в одной строке может быть 24 единицы столбцов;
"Button" - для реализации кнопок;
"Image" - для реализации элементов, отображающих изображения.
*/
import {UserOutlined} from '@ant-design/icons'; /*Импортируем иконки из UI-фреймфорка "Ant Design".*/


/*Создаем тип для "props". "Props" в этом компоненте должны обязательно содержать следующие поля с указанными типами.
Все это нужно для указания типа "props" в функциональном компоненте.*/
type PropsType = {

};


/*
"Header" это функциональный компонент, который создан в виде стрелочной функции.
При взаимодействии с функциональным компонентом React не хранит его постоянно в памяти.
React вызывает функциональный компонент, он делает свою работу (например, возвращает JSX) и компонент удаляется
из памяти.
Функциональный компонент можно создать еще и таким образом: function Header(props) {тело}.
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
"Header" является компонентом, который отрисовывает "хэдер" нашего сайта, который содержит логотип сайта и отдельный
блок, отображающий ссылку на форму логина или имя залогиненного пользователя и кнопку логаута.
Этот компонент подключается в компоненте "App".
*/
export const Header: React.FC<PropsType> = (props) => { /*Указали при помощи "React.FC<>", что
"props" в этом функциональном компоненте имеют тип "PropsType". Также указали, что экспортируем этот компонент.*/
    const {Header} = Layout; /*При помощи деструктуризации берем объект "Header" из объекта "Layout" из UI-фреймфорка
    "Ant Design", чтобы использовать его как тег внутри для реализации хэдера нашего приложения.*/

    const isAuth = useSelector(getIsAuth); /*При помощи хука "useSelector", передав в него селектор "getIsAuth",
    получаем информацию о том, что являемся ли мы залогинены в приложение или нет.*/

    const login = useSelector(getLogin); /*При помощи хука "useSelector", передав в него селектор "getLogin", получаем
    "login" залогиненного пользователя.*/

    const dispatch = useDispatch(); /*Делаем это для более краткого использования хука "useDispatch".*/

    const logoutCallback = () => { /*Таким образом используем TC "logout" для использования его ниже. Этот синтаксис
    похож на тот, который мы использовали при создании "mapDispatchToProps" в самом начале (смотри компонент
    "DialogsContainer.tsx").*/
        dispatch(logout());
    };

    /*
    Здесь после return в компоненте начинается HTML разметка.
    Нужно помнить, что в этой разметке должен быть только один корневой элемент.
    Поскольку то, что возвращает return указано с новой строки, поэтому все возвращаемое помещено в круглые скобки.
    */
    return (
        <Header className={styles.header}> {/*Этот элемент "Header" и есть наш корневой
        элемент. Внутри он содержит один элемент "Row", что означает, что внутри содержится только одна строка
        элементов.*/}
            <Row> {/*Внутри этого элемента "Row" используется несколько элементов "Col", обозначающих колонки в
            строке.*/}
                <Col span={2}> {/*Первый элемент "Col" занимает 2 единицы из 24-х. Внутри находится элемент "Image" c
                изображением логотипа сайта "headerLogoSource". Этот элемент "Image" содержит атрибут "preview" со
                значением "false", чтобы была отключена опция увеличения изображения для просмотра, которая
                предоставляется UI-фреймворком "Ant Design".*/}
                    <Image src={headerLogoSource} alt='' preview={false}/>
                </Col>

                <Col span={17}> {/*Второй элемент "Col" занимает 17 единиц из 24-х. Внутри находится элемент "Menu",
                представляющий из себя меню с одним элементом, который в свою очередь содержит элемент "Link",
                представляющий из себя ссылку для перехода на страницу пользователей. Элемент "Menu" благодаря атрибуту
                "theme" со значением "dark" имеет темную тему, а благодаря атрибуту "mode" со значением "horizontal"
                имеет горизонтальный тип расположения.*/}
                    <Menu theme='dark' mode='horizontal'>
                        <Menu.Item key='/users/'>
                            <Link to='/users/'>Users</Link>
                        </Menu.Item>
                    </Menu>
                </Col>

                {isAuth /*Если свойство "isAuth", которое указывает залогинен ли пользователь, является "TRUE", то*/
                    ? /*отрисуется пустой элемент "<>", содержащий три элемента "Col". Первый элемент "Col" содержит
                    элемент "Avatar", представляющий из себя заглушку для аватара пользователя, и занимает 1 единицу.
                    Этот элемент "Avatar" имеет атрибут "style" для стилизации цвета заднего фона этого элемента, и
                    атрибут "icon" со значением "UserOutlined", чтобы подгрузить иконку из списка иконок, которые
                    предоставляются UI-фреймворком "Ant Design". Второй элемент "Col" содержит элемент "a", содержащий
                    внутри себя "login" залогиненного пользователя, и занимает 2 единицы. Третий элемент "Col" содержит
                    элемент "Button", который является кнопкой логаута (сработает TC "logout"), и занимает 2 единицы.*/
                    <>
                        <Col span={1}>
                            <Avatar icon={<UserOutlined/>}/>
                        </Col>

                        <Col span={2}>
                            <a>{login}</a>
                        </Col>

                        <Col span={2}>
                            <Button onClick={logoutCallback}>Log out</Button>
                        </Col>
                    </>
                    : /*Иначе отрисуется один элемент "Col", занимающий 2 единицу и содержащий элемент "Button", который
                    в свою очередь содержит элемент "Link" для перехода на страницу логинизации. Этот элемент "Col"
                    имеет атрибут "offset", благодаря которому этот элемент сдвигается вправо на 3 единицы.*/
                    <Col span={2} offset={3}>
                        <Button>
                            <Link to={'/login/'}>Log in</Link>
                        </Button>
                    </Col>}
            </Row>
        </Header>
    );
};