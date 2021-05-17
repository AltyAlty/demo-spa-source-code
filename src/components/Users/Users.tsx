import React from 'react';
/*
Подключаем сам "ReactJS", необходим везде, где мы что-то из него используем (например, JSX).
"WebPack" уже встроен в "ReactJS".
*/
import Paginator from '../common/Paginator/Paginator'; /*Подключаем компонент "Paginator".*/
import User from './User'; /*Подключаем компонент "User".*/
import UsersSearchForm from './UsersSearchForm'; /*Подключаем компонент "UsersSearchForm".*/

import {UserType} from '../../types/types'; /*Подключаем типы.*/
import {UsersFilterType} from '../../redux/users-reducer'; /*Подключаем типы.*/


/*Создаем тип для "props". "Props" в этом компоненте должны обязательно содержать следующие поля с указанными типами.
Все это нужно для указания типа "props" в функциональном компоненте.*/
type PropsType = {
    totalUsersCount: number /*Общее количество пользователей должно быть числом.*/
    pageSize: number /*Максимальное количество пользователей на одной странице в постраничном выводе должно быть
    числом.*/
    currentPage: number /*Номер текущей выбранной страницы в постраничном выводе должен быть числом.*/
    onPageChange: (p: number) => void /*Метод для обновления данных при смене текущей выбранной страницы в постраничном
    выводе должен быть функцией, которая принимает числовой параметр и ничего не возвращает.*/
    onFilterChange: (filter: UsersFilterType) => void /*Метод для обновления данных по фильтрам для отображения
    пользователей в постраничном выводе пользователей при изменении этих данных должен быть функцией, которая принимает
    параметр типа "UsersFilterType", который мы создали и импортировали сюда, и ничего не возвращает.*/
    portionSize: number /*Свойство, которое указывает какое максимальное количество номеров страниц в постраничном
    выводе может отображаться в одной порции таких страниц, должно быть числом.*/
    users: Array<UserType> /*Данные по пользователям для постраничного вывода должны быть в виде массива элементов с
    типом "UserType", который был создан нами и импортирован сюда.*/
    WhoIsInFollowingProgress: Array<number> /*Специальное свойство, которое содержит массив, который будет хранить "ID"
    пользователей, которые в какой-то определенный момент находятся в процессе анфолловинга/фолловинга, то есть по ним
    отправляются AJAX-запросы для анфолловинга/фолловинга от пользователя, должно быть массивом чисел.*/
    unfollow: (id: number) => void /*TC для анфолловинга пользователей должен быть функцией, которая принимает числовой
    параметр и ничего не возвращает.*/
    follow: (id: number) => void /*TC для фолловинга пользователей должен быть функцией, которая принимает числовой
    параметр и ничего не возвращает.*/
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
const Users: React.FC<PropsType> = ({/*Указываем какие именно "props" мы получаем, чтобы не писать далее
"props.users". Остальные "props" передаем при помощи деструктуризации. Такое мы делаем только в функциональных
компонентах. Указали при помощи "React.FC<>", что "props" в этом функциональном компоненте имеют тип "PropsType".*/
                                        users,
                                        ...props
}) => {
    /*
    Здесь после return в компоненте начинается HTML разметка.
    Нужно помнить, что в этой разметке должен быть только один корневой элемент.
    Поскольку то, что возвращает return указано с новой строки, поэтому все возвращаемое помещено в круглые скобки.
    */
    return (
        <div> {/*Этот элемент "div" и есть наш корневой элемент.*/}
            {/*Отрисовываем компонент "UsersSearchForm" и передаем ему через "props" необходимы для него данные. Этот
            компонент представляет из себя форму с фильтрами для поиска пользователей по различным критериям.*/}
            <UsersSearchForm onFilterChange={props.onFilterChange}/> {/*Метод "onFilterChange" для обновления данных по
            фильтрам для отображения пользователей в постраничном выводе пользователей при изменении этих данных.*/}

            {/*Далее отрисовываем компонент "Paginator" и передаем ему через "props" необходимы для него данные.*/}
            <Paginator totalItemsCount={props.totalUsersCount} /*Общее количество пользователей. Переименовали
                       в "totalItemsCount", так как компонент "Paginator" может использоваться для постраничного вывода
                       любых элементов, не только пользователей.*/
                       pageSize={props.pageSize} /*максимальное количество пользователей на одной странице
                       в постраничном выводе.*/
                       currentPage={props.currentPage} /*Номер текущей выбранной страницы в постраничном выводе.*/
                       onPageChange={props.onPageChange} /*Метод "onPageChange" для обновления данных при смене текущей
                       выбранной страницы в постраничном выводе.*/
                       portionSize={props.portionSize} /*Свойство, которое указывает какое максимальное количество
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
                {users.map(u => <User key={u.id}
                                      user={u} /*Объект с данным по пользователю.*/
                                      WhoIsInFollowingProgress={props.WhoIsInFollowingProgress} /*Специальное свойство,
                                      которое содержит массив, который будет хранить "ID" пользователей, которые
                                      в какой-то определенный момент находятся в процессе анфолловинга/фолловинга,
                                      то есть по ним отправляются AJAX-запросы для анфолловинга/фолловинга
                                      от пользователя.*/
                                      unfollow={props.unfollow} /*TC для анфолловинга пользователей.*/
                                      follow={props.follow} /*TC для фолловинга пользователей.*/
                />)}
            </div>
        </div>
    )
};


export default Users; /*Экспортируем компонент "Users" по default и будем его использовать в нашем проекте под именем
"Users", экспорт необходим для импорта.*/