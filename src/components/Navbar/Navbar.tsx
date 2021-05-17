import React from 'react';
/*
Подключаем сам "ReactJS", необходим везде, где мы что-то из него используем (например, JSX).
"WebPack" уже встроен в "ReactJS".
*/
import {NavLink} from 'react-router-dom';
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
*/

import styles from './Navbar.module.css'; /*Подключаем стили из CSS-модуля.*/

import SideBar from './Sidebar/Sidebar'; /*Подключаем компонент "Sidebar".*/

import {InitialSidebarStateType} from '../../redux/sidebar-reducer'; /*Подключаем типы.*/


/*Создаем тип для "props". "Props" в этом компоненте должны обязательно содержать следующие поля с указанными типами.
Все это нужно для указания типа "props" в функциональном компоненте.*/
type PropsType = {
    sidebar: InitialSidebarStateType /*Поскольку передаем в этот компонент весь "state" из "sidebar-reducer.ts",
    то указываем тип "InitialSidebarStateType" - это тип всего этого "state".*/
};


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
Этот компонент подключается в компоненте "NavbarContainer".
*/
const Navbar: React.FC<PropsType> = ({sidebar}) => { /*При помощии деструктуризации "props" указываем
какие именно "props" мы получаем, чтобы не писать далее "props.sidebar". Такое мы делаем только в функциональных
компонентах. Указали при помощи "React.FC<>", что "props" в этом функциональном компоненте имеют тип "PropsType".*/

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

    /*
    Здесь после return в компоненте начинается HTML разметка.
    Нужно помнить, что в этой разметке должен быть только один корневой элемент.
    Поскольку то, что возвращает return указано с новой строки, поэтому все возвращаемое помещено в круглые скобки.
    */
    return (
        <nav className={styles.nav}> {/*Этот элемент "nav" и есть наш корневой элемент. Этот элемент представляет
        из себя меню навигации.*/}
            <div className={styles.item}> {/*Создаем пункт меню для страницы "Profile".*/}
                <NavLink to='/profile/' activeClassName={styles.activeLink}>Profile</NavLink> {/*Этот пункт содержит
                элемент "NavLink" со ссылкой страницу "Profile".*/}
            </div>

            <div className={styles.item}> {/*Создаем пункт меню для страницы "Dialogs".*/}
                <NavLink to='/dialogs/' activeClassName={styles.activeLink}>Dialogs</NavLink> {/*Этот пункт содержит
                элемент "NavLink" со ссылкой страницу "Dialogs".*/}
            </div>

            <div className={styles.item}> {/*Создаем пункт меню для страницы "Users".*/}
                <NavLink to='/users/' activeClassName={styles.activeLink}>Users</NavLink> {/*Этот пункт содержит
                элемент "NavLink" со ссылкой страницу "Users".*/}
            </div>

            <div className={styles.item}> {/*Создаем пункт меню для страницы "News".*/}
                <NavLink to='/news/' activeClassName={styles.activeLink}>News</NavLink> {/*Этот пункт содержит
                элемент "NavLink" со ссылкой страницу "News".*/}
            </div>

            <div className={styles.item}> {/*Создаем пункт меню для страницы "Music".*/}
                <NavLink to='/music/' activeClassName={styles.activeLink}>Music</NavLink> {/*Этот пункт содержит
                элемент "NavLink" со ссылкой страницу "Music".*/}
            </div>

            <div className={styles.item}> {/*Создаем пункт меню для страницы "Settings".*/}
                <NavLink to='/settings/' activeClassName={styles.activeLink}>Settings</NavLink> {/*Этот пункт
                содержит элемент "NavLink" со ссылкой страницу "Settings".*/}
            </div>

            <div className={styles.item}> {/*Создаем пункт меню для страницы "Friends".*/}
                <NavLink to='/friends/' activeClassName={styles.activeLink}>Friends</NavLink> {/*Этот пункт
                содержит элемент "NavLink" со ссылкой страницу "Friends".*/}
            </div>

            <div className={styles.sidebarText}>Online:</div> {/*Также меню навигации содержит отдельный сайдбар,
            отображающий друзей в онлайне.*/}

            {sidebarElements} {/*Сами элементы сайдбара, отображающие друзей в онлайне.*/}
        </nav>
    );
};


export default Navbar; /*Экспортируем компонент "Navbar" по default и будем его использовать в нашем проекте под именем
"Navbar", экспорт необходим для импорта.*/