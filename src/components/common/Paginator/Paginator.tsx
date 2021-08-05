/*
Это специальный файл, содержащий логику для высчитывания и отображения текущей страницы в постраничном
выводе пользователей. Но этот файл можно использовать по идее и для постраничного вывода любых других элементов.
*/

import React, {useState} from 'react';
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
Хуки нельзя писать в условиях и циклах, так как это нарушает порядок хуков, который является важным.
Можно писать свои кастомные хуки.
Подключаем хук "useState", который возвращает массив с двуми элементами. Первый элемент - это значение,
которое хранится в "state". Второй элемент - это функция, которая будет изменять это значение в первом элементе. Изменяя
первый элемент мы заставляем "React" перерисовывать функциональный компонент.
Хук "useState" работает асинхронно, то есть если мы изменяем какое-либо значение при помощи этого хука, то мы говорим,
чтобы "ReactJS" изменил это значение как только сможет, не обращая внимание на порядок соседних инструкций рядом с
кодом, где мы меняем какое-то значение из локального "state".
*/

import styles from './Paginator.module.css'; /*Подключаем стили из CSS-модуля.*/
import cn from 'classnames';
/*
"classnames" - это библиотека для простого условного объединения имен классов. Для этого мы здесь используем
функцию "cn" из этой библиотеки.
Как можно добавить два класса:
className = {styles.first + ' ' + styles.second} (без библиотеки "classnames")
className = {`${styles.first} ${styles.second}`} (без библиотеки "classnames")
className = {cn(styles.second, styles.first)} (с библиотекой "classnames")
Также при использовании этой библиотеки можно добавлять условия:
className = {cn(
                styles.first,
                {[styles.second] : true}
                )
            };
*/


/*Создаем тип для "props". "Props" в этом компоненте должны обязательно содержать следующие поля с указанными типами.
Все это нужно для указания типа "props" в функциональном компоненте.*/
type PropsType = {
    totalItemsCount: number /*Общее количество элементов для постраничного вывода должно быть числом.*/
    pageSize: number /*Максимальное количество элементов на одной странице в постраничном выводе должно быть числом.*/
    currentPage: number /*Текущая выбранная страница в постраничном выводе должна быть числом.*/
    onPageChange: (p: number) => void /*Метод для обновления данных при смене текущей выбранной страницы в постраничном
    выводе должен быть функцией, которая принимает числовой параметр и ничего не возвращает.*/
    portionSize?: number /*Свойство, которое указывает какое максимальное количество номеров страниц в постраничном
    выводе может отображаться в одной порции таких страниц, должно быть числом. Не является обязательным.*/
};


/*
"Paginator" это функциональный компонент, который создан в виде стрелочной функции.
При взаимодействии с функциональным компонентом React не хранит его постоянно в памяти.
React вызывает функциональный компонент, он делает свою работу (например, возвращает JSX) и компонент удаляется
из памяти.
Функциональный компонент можно создать еще и таким образом: function Paginator(props) {тело}.
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
"Paginator" является компонентом, который способен создавать постраничный вывод элементов.
В нашем приложении он используется для постраничного вывода пользователей.
Этот компонент подключается в компоненте "Users".
*/
const Paginator: React.FC<PropsType> = ({ /*Указываем какие именно "props" мы получаем, чтобы не писать далее
"props.totalItemsCount", "props.pageSize" и так далее. Такое мы делаем только в функциональных компонентах. Указали при
помощи "React.FC<>", что "props" в этом функциональном компоненте имеют тип "PropsType".*/
                                        totalItemsCount, /*Общее количество элементов для постраничного
                                        вывода.*/
                                        pageSize, /*Максимальное количество элементов на одной странице в
                                        постраничном выводе.*/
                                        currentPage, /*Текущая выбранная страница в постраничном выводе.*/
                                        onPageChange, /*Метод для обновления данных при смене текущей выбранной страницы
                                        в постраничном выводе.*/
                                        portionSize = 10 /*Свойство, которое указывает какое
                                        максимальное количество номеров страниц в постраничном выводе может отображаться
                                        в одной порции таких страниц. Это сделано, чтобы не выводились все номера
                                        страниц, коих огромное количество, а имелась возможность
                                        выбирать страницы из порций (например, от 1 до 20, от 21 до 40) и переключаться
                                        между этими порциями страниц. Если значение этого свойства не будет указано, то
                                        по умолчанию оно будет равно 10.*/
                                    }) => {

    let pagesCount = Math.ceil(totalItemsCount / pageSize); /*Высчитываем сколько страниц пользователей нам
    нужно (делим общее количество элементов на максимальное количество элементов на одной странице) и помещаем
    результат в переменную "pagesCount". Метод "Math.ceil" округляет в большую сторону.*/

    let pages: Array<number> = []; /*Создаем массив, который будет содержать такое количество элементов
    (например, 1,2,3 и т.д., т.е. номера страниц), которое будет равно количеству страниц в постраничном выводе
    пользователей "pagesCount". Далее мы будем мапить этот массив, чтобы вывести список номеров страниц для
    навигации по постраничному выводу элементов. Этот массив имеет тип массива чисел.*/

    for (let i = 1; i <= pagesCount; i++) { /*Заполняем массив "pages" путем перебора "pagesCount".*/
        pages.push(i); /*При помощи метода "push()" добавляем в конец массива "pages" каждый "i".*/
    };

    /*
    "portionCount" - how many portions of pages we have. Количество порций страниц, которое мы имеем.

    "portionSize" - how many pages is in a portion, you can get it from state. Максимальное количество страниц в одной
    порции. Мы это берем из "state".

    "lowerLimitOfCurrentPortion" - the number of the page which is a lower bound of the current portion of pages. Номер
    страницы, который является нижней границей текущей порции страниц.

    "upperLimitOfCurrentPortion" - the number of the page which is an upper bound of the current portion of pages. Номер
    страницы, который является верхней границей текущей порции страниц.

    "currentPortionNumber" - the number of the current portion of pages, used in "useState". Номер текущей порции
    страниц, используется в хуке "useState".

    "setCurrentPortionNumber" - a function that can change the number of the current portion of pages, used in
    "useState". Функция, которая может менять номер текущей порции страниц, используется в хуке "useState".
    */

    let portionCount = Math.ceil(pagesCount / portionSize); /*Вычисляем количество порций страниц, путем деления
    количества всех страниц с пользователями на максимальное количество страниц в одной порции. Метод "Math.ceil"
    округляет в большую сторону.*/
    let [currentPortionNumber, setCurrentPortionNumber] = useState(1); /*При помощи деструктуризирующего
    присваивания создали две переменные. Первая переменная будет хранить первый элемент из хука "useState", этот элемент
    будет означать номер текущей порции страниц (изначально "1"). Вторая переменная будет хранить функцию из хука
    "useState", которая будет изменять первый элемент (то есть менять номер текущей порции страниц).*/
    let lowerBoundOfCurrentPortion = (currentPortionNumber - 1) * portionSize + 1; /*Высчитываем номер страницы, который
    является нижней границей текущей порции страниц. Изначально это будет "(1 - 1) + 1 = 1".*/
    let upperBoundOfCurrentPortion = currentPortionNumber * portionSize; /*Высчитываем номер страницы, который является
    верхней границей текущей порции страниц. Изначально это будет "1 * 20 = 20".*/

    /*
    Здесь после return в компоненте начинается HTML разметка.
    Нужно помнить, что в этой разметке должен быть только один корневой элемент.
    Поскольку то, что возвращает return указано с новой строки, поэтому все возвращаемое помещено в круглые скобки.
    */
    return (
        <div className={styles.paginator}> {/*Этот элемент "div" и есть наш корневой элемент.*/}

            {currentPortionNumber > 1 && /*Если текущий номер порции страниц больше 1,*/
            <button onClick={() => { /*то отрисовываем элемент "button", при нажатии на который будет уменьшаться
            текущий номер порции страниц на 1, то есть мы будем переходить назад на предыдущую порцию страниц (например,
            с "от 21 до 40" до "1 до 20"). Соотвественно изначально это кнопка не отрисовывается, так как мы
            по дефолтку находимся на 1-ой порции страниц.*/
                setCurrentPortionNumber(currentPortionNumber - 1)
            }}>
                PREV {/*Текст кнопки "предыдущая порция страниц".*/}
            </button>}

            {pages
                .filter(p => p >= lowerBoundOfCurrentPortion && p <= upperBoundOfCurrentPortion) /*Из массива "pages"
                берем только те номера страниц, которые больше или равны нижней границе текущей порции страниц и
                меньше или равны верхней границе текущей порции страниц.*/
                .map(p => { /*Далее мапим отфильтрованный массив "pages".*/
                    return ( /*Здесь возвращаем JSX в виде "span" элементов. Количество этих "span" элементов будет
                    равно количеству элементов в массиве "pages". Это будет список номеров страниц для навигации в
                    постраничном выводе пользователей.*/
                        <span className={cn({[styles.selectedPage]: currentPage === p}, styles.pageNumber)}
                        /*Будет применяться особый стиль к странице "p", номер которой равен номеру текущей выбранной
                        страницы в постраничном выводе из "state", благодаря использованию функции "cn".*/
                              key={p} /*При использовании метода "map" нужно указывать атрибут "key" для избежания
                              ошибок.*/
                              onClick={(e) => { /*Это анонимная функция, которая будет
                              вызываться при событии нажатия на элемент.*/
                                  onPageChange(p) /*Эта анонимная функция будет вызывать наш метод "onPageChange" и
                                  передавать в него номер страницы, на которую мы нажали. В результате мы изменим
                                  текущую выбранную страницу в постраничном выводе в "state".*/
                              }}>
                            {p} {/*Выводим текст самого номера страницы в элементе "span".*/}
                        </span>
                    )
                })
            }

            {portionCount > currentPortionNumber && /*Если количество порций страниц, которое мы имеем, больше текущего
            номера порции страниц,*/
            <button onClick={() => { /*то отрисовываем элемент "button", при нажатии на который будет увеличиваться
            текущий номер порции страниц на 1, то есть мы будем переходить вперед на следующуюю порцию страниц
            (например, с "от 1 до 20" до "21 до 40"). Соотвественно на последнее порции страниц это кнопка
            не отрисовывается, так текущая порция страниц, которая является последней порцией страниц, равна
            максимальному количеству порций страниц.*/
                setCurrentPortionNumber(currentPortionNumber + 1)
            }}>
                NEXT {/*Текст кнопки "следующая порция страниц".*/}
            </button>}
        </div>
    )
};


export default Paginator; /*Экспортируем компонент "Paginator" по default и будем его использовать в нашем проекте под
именем "Paginator", экспорт необходим для импорта.*/