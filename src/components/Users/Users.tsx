import React, {useEffect} from 'react';
/*
Подключаем сам "ReactJS", необходим везде, где мы что-то из него используем (например, JSX).
"WebPack" уже встроен в "ReactJS".
Классовый компонент позволяет реализовать локальный "state" (смотри "ProfileStatus") и методы
жизненного цикла ("componentDidMount" и т.д.), а функциональный компонент этого не может делать.
Такие возможности классового компонента были созданы благодаря тому, что "React" на основе класса
создает объект и всякий раз взаимодействует с этим объектом. А поскольку это объект, значит может
хранить такие вещи как "state" и методы. Функция же просто вызывается и возвращает "JSX", постоянное
общение с функциональным компонентом так просто не организовать. Объект живет в памяти, а функция отработала
и удалилась. Для решения этой проблемы в функциональных компонентах были созданы "Hooks" (хуки).
"Hook" - это функция, которая может делать side effects.
"React" когда вызывает функциональную компоненту, в которой есть хуки, он запоминает вызов этих хуков и
этой функции для того, чтобы потом соотносить side effects, созданные этими хуками. В отличие от классового компонента
"React" запоминает эту информацию где-то на своей стороне, а не внутри объекта.
Хуки нельзя писать в условиях и циклах.
Можно писать свои кастомные хуки.
Подключаем хук "useState", который возвращает массив с двуми элементами. Первый элемент - это значение,
которое хранится в "state". Второй элемент - это функция, которая будет изменять это значение в первом элементе. Изменяя
первый элемент мы заставляем "React" перерисовывать функциональный компонент.
Подключаем хук "useEffect", который принимает функцию первым параметром и выполняет ее, когда произойдет
отрисовка компонента, то есть после каждого вызова "render". Вторым параметром этот хук принимает зависимости -
зависимо от чьих изменений будет срабатывать хук, если передать туда пустой массив (так лучше не делать), то
этот хук сработает только один раз. Этот хук используется для side effects.
*/
import {useDispatch, useSelector} from 'react-redux';
/*
Библиотека "react-redux" является прослойкой между UI (react) и BLL (redux). Эта прослойка необходима потому, что UI
нежелательно общаться с BLL напрямую. Библиотека "react-redux" предоставляет продвинутые инструкции по созданию
контейнерных компонент и контекста.
"useSelector" - это hook, который принимает селектор и возвращает данные, которые возвращает этот селектор.
"useDispatch" - это hook, который принимает AC или TC и диспатчит их.
*/

import {
    requestUsers, /*Подключаем TC "requestUsers" из "users-reducer.ts".*/
    follow, /*Подключаем TC "follow" из "users-reducer.ts".*/
    unfollow, /*Подключаем TC "unfollow" из "users-reducer.ts".*/
    UsersFilterType /*Подключаем типы из "users-reducer.ts".*/
} from '../../redux/users-reducer';

import {usersAC} from '../../redux/users-reducer'; /*Подключаем объект "usersAC", что использовать оттуда AC
"setCurrentPage" из "users-reducer" */

import Paginator from '../common/Paginator/Paginator'; /*Подключаем компонент "Paginator".*/
import User from './User'; /*Подключаем компонент "User".*/
import UsersSearchForm from './UsersSearchForm'; /*Подключаем компонент "UsersSearchForm".*/

import {
    getCurrentPage, /*Импортируем селектор, который возвращает общее количество пользователей.*/
    getPageSize, /*Импортируем селектор, который возвращает максимальное количество пользователей, которое выводится в
    постраничном выводе пользователей.*/
    getTotalUsersCount, /*Импортируем селектор, который возвращает общее количество пользователей.*/
    getWhoIsInFollowingProgress, /*Импортируем селектор, который возвращает специальное свойство, которое содержит
    массив, который будет хранить "ID" пользователей, которые в какой-то определенный момент находятся в процессе
    анфолловинга/фолловинга, то есть по ним отправляются AJAX-запросы для анфолловинга/фолловинга от пользователя.*/
    getUsers, /*Импортируем селектор, который возвращает данные по пользователям для постраничного вывода.*/
    getPortionSize, /*Импортируем селектор, который возвращает свойство, которое указывает какое количество номеров
    страниц в постраничном выводе может отображаться в одной порции таких страниц.*/
    getUsersFilter /*Импортируем селектор, который возвращает данные по фильтрам для отображения пользователей в
    постраничном выводе пользователей.*/
} from '../../redux/users-selectors';


/*Создаем тип для "props". "Props" в этом компоненте должны обязательно содержать следующие поля с указанными типами.
Все это нужно для указания типа "props" в функциональном компоненте.*/
type PropsType = {

};


/*
"Users" это функциональный компонент, который создан в виде стрелочной функции.
При взаимодействии с функциональным компонентом React не хранит его постоянно в памяти.
React вызывает функциональный компонент, он делает свою работу (например, возвращает JSX) и компонент удаляется
из памяти.
Функциональный компонент можно создать еще и таким образом: function Users(props) {тело}.
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
"Users" является компонентом, который отображает страницу с постраничным выводом пользователей.
Этот компонент подключается в компоненте "UsersContainer".
Внутри компонента "Users" подключаются компоненты:
- "User", который описывает, как должны выглядеть блоки с информацией о пользователе на странице с постраничным
выводом пользователей;
- "Paginator", который осуществляет функционал постраничного вывода информации.
*/
export const Users: React.FC<PropsType> = (props) => { /*Указали при помощи "React.FC<>", что
"props" в этом функциональном компоненте имеют тип "PropsType". Также указали, что экспортируем этот компонент.*/
    const totalUsersCount = useSelector(getTotalUsersCount); /*При помощи хука "useSelector", передав в него селектор
    "getTotalUsersCount", получаем общее количество пользователей.*/
    const currentPage = useSelector(getCurrentPage); /*При помощи хука "useSelector", передав в него селектор
    "getCurrentPage", получаем номер текущей выбранной страницы в постраничном выводе.*/
    const pageSize = useSelector(getPageSize); /*При помощи хука "useSelector", передав в него селектор "getPageSize",
    получаем максимальное количество пользователей на одной странице в постраничном выводе.*/
    const portionSize = useSelector(getPortionSize); /*При помощи хука "useSelector", передав в него селектор
    "getPortionSize", получаем свойство, которое указывает какое максимальное количество номеров страниц в постраничном
    выводе может отображаться в одной порции таких страниц. Это сделано, чтобы не выводились все номера страниц, коих
    огромное количество, а имелась возможность выбирать страницы из порций (например, от 1 до 20, от 21 до 40) и
    переключаться между этими порциями страниц.*/
    const users = useSelector(getUsers); /*При помощи хука "useSelector", передав в него селектор "getUsers", получаем
    данные по пользователям для постраничного вывода.*/
    const WhoIsInFollowingProgress = useSelector(getWhoIsInFollowingProgress); /*При помощи хука "useSelector", передав
    в него селектор "getWhoIsInFollowingProgress", получаем специальное свойство, которое содержит массив, который будет
    хранить "ID" пользователей, которые в какой-то определенный момент находятся в процессе анфолловинга/фолловинга, то
    есть по ним отправляются AJAX-запросы для анфолловинга/фолловинга от пользователя.*/
    const filter = useSelector(getUsersFilter); /*При помощи хука "useSelector", передав в него селектор
    "getUsersFilter", получаем данные для фильтрации пользователей в постраничном выводе.*/

    const dispatch = useDispatch(); /*Делаем это для более краткого использования хука "useDispatch".*/

    useEffect(() => { /*Используем хук "useEffect", чтобы получить данные по пользователям для постраничного
    вывода при отрисовке компонента.*/
            dispatch(requestUsers(currentPage, pageSize, filter)); /*Первый параметр это TC "requestUsers" для запроса и
        установки данных по пользователям в постраничном выводе, передав значение текущей выбранной страницы,
        максимальное количество пользователей на одной странице в постраничном выводе и данные для фильтрации
        пользователей в постраничном выводе.*/
        },
        [] /*Второй параметр это пустой массив, так как мы хотим, чтобы TC "requestUsers" из первого параметра
        сработал только один раз после создания компонента.*/
    );

    const onPageChange = (pageNumber: number) => { /*Создали специальную функцию, которая будет вызываться при смене
    страницы в постраничном выводе пользователей. Эта функция принимает номер новой текущей выбранной страницы.*/
        dispatch(usersAC.setCurrentPage(pageNumber)); /*Вызываем AC "setCurrentPage" для установки значения текущей
        выбранной страницы в постраничном выводе пользователей в "state", передав номер новой текущей выбранной
        страницы.*/
        dispatch(requestUsers(pageNumber, pageSize, filter)); /*Вызываем TC "requestUsers" для запроса и установки
        данных по пользователям в постраничном выводе, передав значение новой текущей выбранной страницы, максимальное
        количество пользователей на одной странице в постраничном выводе и данные для фильтрации пользователей в
        постраничном выводе.*/
    };

    const onFilterChange = (filter: UsersFilterType) => { /*Создали специальную функцию, которая будет вызываться при
    изменении данных по фильтрам для отображения пользователей в постраничном выводе пользователей. Эта функция
    принимает данные по фильтрам для отображения пользователей в постраничном выводе пользователей, которые должны быть
    типа "UsersFilterType", который мы создали и импортировали сюда.*/
        dispatch(requestUsers(1, pageSize, filter)); /*Вызываем TC "requestUsers" для запроса и установки
        данных по пользователям в постраничном выводе, передав значение новой текущей выбранной страницы (указали "1",
        так как если бы передавали сюда последнюю текущую выбранную страницу, то могли бы быть случаи, когда мы уже
        вывели несколько страниц пользователей, перешли на какую-то страницу, кроме первой, потом сделали новый запрос
        пользователей с другими фильтрами, и нам в ответ могло прийти меньшее количество страниц пользователей, чем
        номер страницы, которую мы до этого выбрали, например, были на шестой странице, а пришло пять страниц, в итоге
        мы окажемся на пустой шестой странице, а указав "1", после каждого нового запроса пользователей нас будет всегда
        сбрасывать на первую страницу), максимальное количество пользователей на одной странице в постраничном выводе и
        данные для фильтрации пользователей в постраничном выводе.*/
    };

    const unfollowHere = (userID: number) => { /*Таким образом используем TC "unfollow" для передачи его в компонент
    "User" ниже. Этот синтаксис похож на тот, который мы использовали при создании "mapDispatchToProps" в самом начале
    (смотри компонент "DialogsContainer.tsx").*/
        dispatch(unfollow(userID))
    };

    const followHere = (userID: number) => { /*Таким образом используем TC "follow" для передачи его в компонент "User"
    ниже. Этот синтаксис похож на тот, который мы использовали при создании "mapDispatchToProps" в самом начале (смотри
    компонент "DialogsContainer.tsx").*/
        dispatch(follow(userID))
    };

    /*
    Здесь после return в компоненте начинается HTML разметка.
    Нужно помнить, что в этой разметке должен быть только один корневой элемент.
    Поскольку то, что возвращает return указано с новой строки, поэтому все возвращаемое помещено в круглые скобки.
    */
    return (
        <div> {/*Этот элемент "div" и есть наш корневой элемент.*/}
            {/*Отрисовываем компонент "UsersSearchForm" и передаем ему через "props" необходимы для него данные. Этот
            компонент представляет из себя форму с фильтрами для поиска пользователей по различным критериям.*/}
            <UsersSearchForm onFilterChange={onFilterChange}/> {/*Функция "onFilterChange" для обновления данных по
            фильтрам для отображения пользователей в постраничном выводе пользователей при изменении этих данных.*/}

            {/*Далее отрисовываем компонент "Paginator" и передаем ему через "props" необходимы для него данные.*/}
            <Paginator totalItemsCount={totalUsersCount} /*Общее количество пользователей. Переименовали
                       в "totalItemsCount", так как компонент "Paginator" может использоваться для постраничного вывода
                       любых элементов, не только пользователей.*/
                       pageSize={pageSize} /*максимальное количество пользователей на одной странице
                       в постраничном выводе.*/
                       currentPage={currentPage} /*Номер текущей выбранной страницы в постраничном выводе.*/
                       onPageChange={onPageChange} /*Функция "onPageChange" для обновления данных при смене текущей
                       выбранной страницы в постраничном выводе.*/
                       portionSize={portionSize} /*Свойство, которое указывает какое максимальное количество
                       номеров страниц в постраничном выводе может отображаться в одной порции таких страниц. Это
                       сделано, чтобы не выводились все номера страниц, коих огромное количество, а имелась возможность
                       выбирать страницы из порций (например, от 1 до 20, от 21 до 40) и переключаться между этими
                       порциями страниц.*/
            />

            {/*Далее в отдельном эдлементе "div" отрисовываем компонент "User" при помощи функции "map".*/}
            <div>
                {/*
                В JSX в массив можно вкладывать компоненты.
                В React, если мы передаем какой-либо массив, то JSX отобразит каждый элемент этого массива в виде
                строки.
                "map" - это метод массива из JS, который позволяет создать новый массив на основе преобразования
                исходного массива.
                Метод "map" принимает стрелочную функцию.
                То есть в нашем случае будет сначала браться первый объект из исходного массива объектов
                и на основе данных этого объекта будет формироваться первый элемента нового массива, который
                будет из себя представлять JSX компонента, указанного в стрелочной функции.
                Потом будет браться следующий объект из исходного массива объектов
                и на основе данных уже этого объекта будет формироваться следующий элемента нового массива, который
                будет из себя представлять JSX компонента, указанного в стрелочной функции.
                И так будет продолжаться до тех пор, пока мы не переберем все объекты в изначальном массиве объектов.
                То есть переданная в метод "map" стрелочная функция вызывается столько раз, сколько элементов
                в изначальном массиве объектов.
                В итоге получится новый массив с элементами в виде компонентов, построенными на основе данных из BLL.
                Вызвав такой массив в JSX мы отобразим наши компоненты.
                В этом элементе <div> будут выводится компоненты "User", отображающие информацию о каждом пользователе
                в постраничном выводе пользователей.
                При использовании метода "map" нужно указывать атрибут "key" для избежания ошибок.
                */}
                {users.map(u => <User key={u.id} /*При использовании метода "map" нужно указывать атрибут "key" для
                                      избежания ошибок.*/
                                      user={u} /*Объект с данным по пользователю.*/
                                      WhoIsInFollowingProgress={WhoIsInFollowingProgress} /*Специальное свойство,
                                      которое содержит массив, который будет хранить "ID" пользователей, которые
                                      в какой-то определенный момент находятся в процессе анфолловинга/фолловинга,
                                      то есть по ним отправляются AJAX-запросы для анфолловинга/фолловинга
                                      от пользователя.*/
                                      unfollow={unfollowHere} /*TC для анфолловинга пользователей.*/
                                      follow={followHere} /*TC для фолловинга пользователей.*/
                />)}
            </div>
        </div>
    )
};