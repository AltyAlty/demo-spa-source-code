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
Нужно помнить, что если наш JSX в компоненте не зависит от хука "useState", то нежелательно хранить какие-то данные в
таком хуке "useState".
При вызове нескольких вторых элементов из нескольких хуков "useState" в асинхронных операциях (например, в запросах на
сервер), нужно обращать внимание на порядок этих вторых элементов из нескольких хуков "useState".
*/

import styles from './UseStateTheory.module.css'; /*Подключаем стили из CSS-модуля.*/


/*Создаем тип для "props". "Props" в этом компоненте должны обязательно содержать следующие поля с указанными типами.
Все это нужно для указания типа "props" в функциональном компоненте.*/
type PropsType = {};


/*
"UseStateTheory" это функциональный компонент, который создан в виде стрелочной функции.
При взаимодействии с функциональным компонентом React не хранит его постоянно в памяти.
React вызывает функциональный компонент, он делает свою работу (например, возвращает JSX) и компонент удаляется
из памяти.
Функциональный компонент можно создать еще и таким образом: function UseStateTheory(props) {тело}.
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
"UseStateTheory" является компонентом, который используется для рассмотра работы хука "useState" из "ReactJS".
Этот компонент подключается в компоненте "App".
*/
export const UseStateTheory: React.FC<PropsType> = (props) => { /*Указали при помощи
"React.FC<>", что "props" в этом функциональном компоненте имеют тип "PropsType". Также указали, что экспортируем этот
компонент.*/

    let [playerOneLife, setPlayerOneLife] = useState(10); /*При помощи деструктуризирующего присваивания
    создали две переменные. Первая переменная будет хранить первый элемент из хука "useState", этот элемент будет
    означать количество жизней у первого игрока (изначально "10"). Вторая переменная будет хранить функцию
    из хука "useState", которая будет изменять первый элемент (то есть менять количество жизней у первого игрока).
    Используется в примере использования хука "useState" №1.*/

    let [playerTwoLife, setPlayerTwoLife] = useState(10); /*При помощи деструктуризирующего присваивания
    создали две переменные. Первая переменная будет хранить первый элемент из хука "useState", этот элемент будет
    означать количество жизней у второго игрока (изначально "10"). Вторая переменная будет хранить функцию
    из хука "useState", которая будет изменять первый элемент (то есть менять количество жизней у второго игрока).
    Используется в примере использования хука "useState" №1.*/


    let [playersLives, setPlayersLives] = useState({p1: 10, p2: 10}); /*При помощи деструктуризирующего
    присваивания создали две переменные. Первая переменная будет хранить первый элемент из хука "useState", этот элемент
    будет означать количество жизней у игроков (данные здесь уже в виде объекта). Вторая переменная будет хранить
    функцию из хука "useState", которая будет изменять первый элемент (то есть менять количество жизней у игроков).
    Используется в примере использования хука "useState" №2.*/


    const players: Array<[number, number]> = [ /*Представим, что это массив с данными по очкам игроков. Каждый игрок
    имеет два числа очков, далее нам нужно будет вычислить игрока, у которого одно из двух чисел будет самым больших из
    всех. Используется в примере использования хука "useState" №3.*/
        // ... a lot of players,
        [34, 27],
        [68, 68],
        [22, 69],
        [50, 54]
    ];

    /*Делаем алгоритм для поиска наилучшей пары очков у игроков. Сложность этого алгорится "O(n)", так как мы
    пробегаемся по каждому элементу в массиве. Используется в примере использования хука "useState" №3.*/
    function findBestPlayer(players: Array<[number, number]>) {
        console.log('O(n) again'); /*Для отслеживания сколько раз срабатывает эта функция.*/

        let maxPair = null; /*Переменная, которая будет хранить лучшую пару очков.*/

        for (let i = 0; i < players.length; i++) { /*Пробегаемся по массиву "players".*/
            if (maxPair === null) { /*Если нет лучшей пары очков, то говорим, что текущая пара является лучше.*/
                maxPair = players[i];
            } else if (Math.max(players[i][0], players[i][1]) > Math.max(maxPair[0], maxPair[1])) { /*Далее находим
            наибольшее число из двух в текущей паре очков и сравниваем с наибольшим числом в текущей лучшей паре очков.
            Если в текущей паре есть число больше, то эта текущая пара становится лучшей.*/
                maxPair = players[i];
            };
        };

        return maxPair; /*В итоге возвращаем пару очков, в которой одно из двух чисел больше любого другого числа в
        других парах очков.*/
    };

    let [playerThreeLife, setPlayerThreeLife] = useState(() => {
        let bestPair = findBestPlayer(players); /*Находим лучшую пару очков.*/

        if (bestPair === null) { /*Если не нашли лучшую пару очков, то возвращаем "10" как стартовое значение.*/
            return 10;
        };

        return bestPair[0]; /*Если нашли лучшую пару очков, то возвращаем из нее первое число как стартовое значение.*/
    }); /*При помощи деструктуризирующего присваивания создали две переменные. Первая переменная будет хранить первый
    элемент из хука "useState", этот элемент будет означать количество жизней у третьего игрока (изначально "10").
    Вторая переменная будет хранить функцию из хука "useState", которая будет изменять первый элемент (то есть менять
    количество жизней у третьего игрока).

    В целях оптимизации в стартовом значении лучше указывать функцию, которая возвращает это значение, а не просто
    само значение, если это стартовое значение получается при помощи какой-то сложной логики. Если представить, что
    "players" мы будем получать через "props" и укажем здесь стартовое значение как "bestPair[0]" (или "bestPair[1]" в
    хуке "useState" дальше), оставив код для поиска этого значения за пределами хука "useState", то при каждой отрисовке
    компонента будет срабатывать сложный алгоритм из функции "findBestPlayer", что будет плохо влиять на оптимизацию.
    Используется в примере использования хука "useState" №3.*/

    let [playerFourLife, setPlayerFourLife] = useState(() => {
        let bestPair = findBestPlayer(players); /*Находим лучшую пару очков.*/

        if (bestPair === null) { /*Если не нашли лучшую пару очков, то возвращаем "10" как стартовое значение.*/
            return 10;
        };

        return bestPair[1]; /*Если нашли лучшую пару очков, то возвращаем из нее второе число как стартовое значение.*/
    }); /*При помощи деструктуризирующего присваивания создали две переменные. Первая переменная будет хранить первый
    элемент из хука "useState", этот элемент будет означать количество жизней у четвертого игрока (изначально "10").
    Вторая переменная будет хранить функцию из хука "useState", которая будет изменять первый элемент (то есть менять
    количество жизней у четвертого игрока). Используется в примере использования хука "useState" №3.*/

    /*
    Здесь после return в компоненте начинается HTML разметка.
    Нужно помнить, что в этой разметке должен быть только один корневой элемент.
    Поскольку то, что возвращает return указано с новой строки, поэтому все возвращаемое помещено в круглые скобки.
    */
    return (
        <div> {/*Этот элемент "div" и есть наш корневой элемент.*/}

            {/*Пример использования хука "useState" №1.*/}
            <div className={styles.wholeGame}>
                <div className={styles.playerOneSection}>
                    <div className={styles.playerOneName}>
                        <span>Player One</span>
                    </div>

                    <div className={styles.playerOneLife}>
                        <span>{playerOneLife}</span>
                    </div>

                    <div className={styles.increasePlayerOneLifeSection}>
                        <button className={styles.increasePlayerOneLifeButton}
                            /*При вызове функции из хука "useState", которая меняет значения в локальном "state",
                            лучше передавать в нее отдельную функцию, а не само значение из локального "state",
                            поскольку хук "useState" работает асинхронно и мы можем получить неактульное значение
                            из локального "state". То есть так лучше не делать:
                            "setPlayerOneLife(playerOneLife + 1)".*/
                                onClick={() => setPlayerOneLife((actualValue) => actualValue + 1)}>+
                        </button>
                    </div>
                </div>

                <div className={styles.decreaseAllLivesSection}>
                    <button className={styles.decreaseAllLivesButton}
                            onClick={() => {
                                setPlayerOneLife((actualValue) => actualValue - 1);
                                setPlayerTwoLife((actualValue) => actualValue - 1);
                            }}>-
                    </button>
                </div>

                <div className={styles.playerTwoSection}>
                    <div className={styles.playerTwoName}>
                        <span>Player Two</span>
                    </div>

                    <div className={styles.playerTwoLife}>
                        <span>{playerTwoLife}</span>
                    </div>

                    <div className={styles.increasePlayerTwoLifeSection}>
                        <button className={styles.increasePlayerTwoLifeButton}
                                onClick={() => setPlayerTwoLife((actualValue) => actualValue + 1)}>+
                        </button>
                    </div>
                </div>
            </div>

            {/*Пример использования хука "useState" №2.*/}
            <div className={styles.wholeGame}>
                <div className={styles.playerOneSection}>
                    <div className={styles.playerOneName}>
                        <span>Player One</span>
                    </div>

                    <div className={styles.playerOneLife}>
                        <span>{playersLives.p1}</span>
                    </div>

                    <div className={styles.increasePlayerOneLifeSection}>
                        <button className={styles.increasePlayerOneLifeButton}
                            /*Правило иммутабельности важно для "ReactJS", так как когда мы изменяем входной объект
                            в функции, то не происходит создания ссылки на новый объект и "ReactJS" не
                            перерисовывает компонент. То есть перерисовки не будет, если использовать такой код:
                            "onClick={() => setPlayersLives((actualValue) => {
                                actualValue.p1++;
                                return actualValue;
                            })}"*/
                                onClick={() => setPlayersLives((actualValue) => {
                                    return {...actualValue, p1: actualValue.p1 + 1};
                                })}>+
                        </button>
                    </div>
                </div>

                <div className={styles.decreaseAllLivesSection}>
                    <button className={styles.decreaseAllLivesButton}
                            onClick={() => setPlayersLives((actualValue) => {
                                /*Здесь можно и не писать "...actualValue", так как после этой деструктуризации мы
                                отдельно создаем новый объект с новыми свойствами. Но лучше это писать, так как при
                                использовании хука "useState" новые свойства затирают старые (тогда как в локальном
                                "state" в классовом компоненте свойства дописываются), то есть если мы добавим в
                                дальнейшем еще и "p3" в локальный "state", то мы потеряем это.*/
                                return {...actualValue, p1: actualValue.p1 - 1, p2: actualValue.p2 - 1};
                            })}>-
                    </button>
                </div>

                <div className={styles.playerTwoSection}>
                    <div className={styles.playerTwoName}>
                        <span>Player Two</span>
                    </div>

                    <div className={styles.playerTwoLife}>
                        <span>{playersLives.p2}</span>
                    </div>

                    <div className={styles.increasePlayerTwoLifeSection}>
                        <button className={styles.increasePlayerTwoLifeButton}
                                onClick={() => setPlayersLives((actualValue) => {
                                    return {...actualValue, p2: actualValue.p2 + 1};
                                })}>+
                        </button>
                    </div>
                </div>
            </div>

            {/*Пример использования хука "useState" №3.*/}
            <div className={styles.wholeGame}>
                <div className={styles.playerOneSection}>
                    <div className={styles.playerOneName}>
                        <span>Player One</span>
                    </div>

                    <div className={styles.playerOneLife}>
                        <span>{playerThreeLife}</span>
                    </div>

                    <div className={styles.increasePlayerOneLifeSection}>
                        <button className={styles.increasePlayerOneLifeButton}
                                onClick={() => setPlayerThreeLife((actualValue) => actualValue + 1)}>+
                        </button>
                    </div>
                </div>

                <div className={styles.decreaseAllLivesSection}>
                    <button className={styles.decreaseAllLivesButton}
                            onClick={() => {
                                setPlayerThreeLife((actualValue) => actualValue - 1);
                                setPlayerFourLife((actualValue) => actualValue - 1);
                            }}>-
                    </button>
                </div>

                <div className={styles.playerTwoSection}>
                    <div className={styles.playerTwoName}>
                        <span>Player Two</span>
                    </div>

                    <div className={styles.playerTwoLife}>
                        <span>{playerFourLife}</span>
                    </div>

                    <div className={styles.increasePlayerTwoLifeSection}>
                        <button className={styles.increasePlayerTwoLifeButton}
                                onClick={() => setPlayerFourLife((actualValue) => actualValue + 1)}>+
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};