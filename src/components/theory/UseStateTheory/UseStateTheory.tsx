import React, {useState} from 'react';
import styles from './UseStateTheory.module.css';

type PropsType = {};

/*"UseStateTheory" это функциональный компонент, который создан в виде стрелочной функции. "UseStateTheory" является
компонентом, который используется для рассмотрения работы хука "useState()" из React. Является аналогом компонента
"UseEffectTheory1".

Компонент "UseStateTheory" импортируется в файле "App.tsx".*/
export const UseStateTheory: React.FC<PropsType> = (props) => {
    /*При помощи деструктуризирующего присваивания создаем две переменные. Первая переменная будет хранить первый
    элемент из хука "useState()", этот элемент будет означать количество жизней у первого игрока (изначально 10). Вторая
    переменная будет хранить функцию из хука "useState()", которая будет изменять первый элемент (то есть менять
    количество жизней у первого игрока). Используется в примере использования хука "useState()" №1.*/
    const [playerOneLife, setPlayerOneLife] = useState(10);
    /*При помощи деструктуризирующего присваивания создаем две переменные. Первая переменная будет хранить первый
    элемент из хука "useState()", этот элемент будет означать количество жизней у второго игрока (изначально 10). Вторая
    переменная будет хранить функцию из хука "useState()", которая будет изменять первый элемент (то есть менять
    количество жизней у второго игрока). Используется в примере использования хука "useState()" №1.*/
    const [playerTwoLife, setPlayerTwoLife] = useState(10);
    /*При помощи деструктуризирующего присваивания создаем две переменные. Первая переменная будет хранить первый
    элемент из хука "useState()", этот элемент будет означать количество жизней у игроков (данные здесь уже в виде
    объекта). Вторая переменная будет хранить функцию из хука "useState()", которая будет изменять первый элемент (то
    есть менять количество жизней у игроков). Используется в примере использования хука "useState()" №2.*/
    const [playersLives, setPlayersLives] = useState({p1: 10, p2: 10});

    /*Представим, что это массив с данными по очкам игроков. Каждый игрок имеет два числа очков, далее нам нужно будет
    вычислить игрока, у которого одно из двух чисел будет самым больших из всех. Используется в примере использования
    хука "useState()" №3.*/
    const players: Array<[number, number]> = [
        // ... a lot of players,
        [34, 27],
        [68, 68],
        [22, 69],
        [50, 54]
    ];

    /*Создаем алгоритм для поиска наилучшей пары очков у игроков. Сложность этого алгоритма "O(n)", так как мы
    пробегаемся по каждому элементу в массиве. Используется в примере использования хука "useState()" №3.*/
    function findBestPlayer(players: Array<[number, number]>) {
        /*Для отслеживания сколько раз срабатывает эта функция.*/
        console.log('O(n) again');
        /*Переменная, которая будет хранить лучшую пару очков.*/
        let maxPair = null;

        /*Пробегаемся по массиву "players".*/
        for (let i = 0; i < players.length; i++) {
            /*Если нет лучшей пары очков, то говорим, что текущая пара является лучше.*/
            if (maxPair === null) {
                maxPair = players[i]
                /*Иначе находим наибольшее число из двух в текущей паре очков и сравниваем с наибольшим числом в текущей
                лучшей паре очков. Если в текущей паре есть число больше, то эта текущая пара становится лучшей.*/
            } else if (Math.max(players[i][0], players[i][1]) > Math.max(maxPair[0], maxPair[1])) {
                maxPair = players[i];
            }
        }

        /*В итоге возвращаем пару очков, в которой одно из двух чисел больше любого другого числа в других парах
        очков.*/
        return maxPair;
    };

    /*При помощи деструктуризирующего присваивания создаем две переменные. Первая переменная будет хранить первый
    элемент из хука "useState()", этот элемент будет означать количество жизней у третьего игрока (изначально 10).
    Вторая переменная будет хранить функцию из хука "useState()", которая будет изменять первый элемент (то есть менять
    количество жизней у третьего игрока).

    В целях оптимизации в стартовом значении лучше указывать функцию, которая возвращает это значение, а не просто само
    значение, если это стартовое значение получается при помощи какой-то сложной логики. Если представить, что "players"
    мы будем получать через props и укажем здесь стартовое значение как "bestPair[0]" (или "bestPair[1]" в хуке
    "useState()" дальше), оставив код для поиска этого значения за пределами хука "useState()", то при каждой отрисовке
    компонента будет срабатывать сложный алгоритм из функции "findBestPlayer()", что будет плохо влиять на оптимизацию.
    Используется в примере использования хука "useState()" №3.*/
    const [playerThreeLife, setPlayerThreeLife] = useState(() => {
        /*Находим лучшую пару очков.*/
        const bestPair = findBestPlayer(players);
        /*Если не нашли лучшую пару очков, то возвращаем 10 как стартовое значение.*/
        if (bestPair === null) return 10;
        /*Если нашли лучшую пару очков, то возвращаем из нее первое число как стартовое значение.*/
        return bestPair[0];
    });

    /*При помощи деструктуризирующего присваивания создаем две переменные. Первая переменная будет хранить первый
    элемент из хука "useState()", этот элемент будет означать количество жизней у четвертого игрока (изначально 10).
    Вторая переменная будет хранить функцию из хука "useState()", которая будет изменять первый элемент (то есть менять
    количество жизней у четвертого игрока). Используется в примере использования хука "useState()" №3.*/
    const [playerFourLife, setPlayerFourLife] = useState(() => {
        /*Находим лучшую пару очков.*/
        const bestPair = findBestPlayer(players);
        /*Если не нашли лучшую пару очков, то возвращаем 10 как стартовое значение.*/
        if (bestPair === null) return 10;
        /*Если нашли лучшую пару очков, то возвращаем из нее второе число как стартовое значение.*/
        return bestPair[1];
    });

    return (
        <div>
            {/*Пример использования хука "useState()" №1.*/}
            <div className={styles.wholeGame}>
                <div className={styles.playerOneSection}>
                    <div className={styles.playerOneName}>
                        <span>Player One</span>
                    </div>

                    <div className={styles.playerOneLife}>
                        <span>{playerOneLife}</span>
                    </div>

                    <div className={styles.increasePlayerOneLifeSection}>
                        <button
                            className={styles.increasePlayerOneLifeButton}
                            /*При вызове функции из хука "useState()", которая меняет значения в локальном state, лучше
                            передавать в нее отдельную функцию, а не само значение из локального state, поскольку хук
                            "useState()" работает асинхронно и мы можем получить неактуальное значение из локального
                            state. То есть так лучше не делать: "setPlayerOneLife(playerOneLife + 1)".*/
                            onClick={() => setPlayerOneLife((actualValue) => actualValue + 1)}>+
                        </button>
                    </div>
                </div>

                <div className={styles.decreaseAllLivesSection}>
                    <button
                        className={styles.decreaseAllLivesButton}

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
                        <button
                            className={styles.increasePlayerTwoLifeButton}
                            onClick={() => setPlayerTwoLife((actualValue) => actualValue + 1)}>+
                        </button>
                    </div>
                </div>
            </div>

            {/*Пример использования хука "useState()" №2.*/}
            <div className={styles.wholeGame}>
                <div className={styles.playerOneSection}>
                    <div className={styles.playerOneName}>
                        <span>Player One</span>
                    </div>

                    <div className={styles.playerOneLife}>
                        <span>{playersLives.p1}</span>
                    </div>

                    <div className={styles.increasePlayerOneLifeSection}>
                        <button
                            className={styles.increasePlayerOneLifeButton}
                            /*Правило иммутабельности важно для React, так как когда мы изменяем входной объект в
                            функции, то не происходит создания ссылки на новый объект и React не перерисовывает
                            компонент. То есть перерисовки не будет, если использовать такой код:
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
                    <button
                        className={styles.decreaseAllLivesButton}

                        onClick={() => setPlayersLives((actualValue) => {
                            /*Здесь можно и не писать "...actualValue", так как после этой деструктуризации мы отдельно
                            создаем новый объект с новыми свойствами. Но лучше это писать, так как при использовании
                            хука "useState()" новые свойства затирают старые (тогда как в локальном state в классовом
                            компоненте свойства дописываются), то есть если мы добавим в дальнейшем еще и "p3" в
                            локальный state, то мы потеряем это.*/
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
                        <button
                            className={styles.increasePlayerTwoLifeButton}

                            onClick={() => setPlayersLives((actualValue) => {
                                return {...actualValue, p2: actualValue.p2 + 1};
                            })}>+
                        </button>
                    </div>
                </div>
            </div>

            {/*Пример использования хука "useState()" №3.*/}
            <div className={styles.wholeGame}>
                <div className={styles.playerOneSection}>
                    <div className={styles.playerOneName}>
                        <span>Player One</span>
                    </div>

                    <div className={styles.playerOneLife}>
                        <span>{playerThreeLife}</span>
                    </div>

                    <div className={styles.increasePlayerOneLifeSection}>
                        <button
                            className={styles.increasePlayerOneLifeButton}
                            onClick={() => setPlayerThreeLife((actualValue) => actualValue + 1)}>+
                        </button>
                    </div>
                </div>

                <div className={styles.decreaseAllLivesSection}>
                    <button
                        className={styles.decreaseAllLivesButton}

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
                        <button
                            className={styles.increasePlayerTwoLifeButton}
                            onClick={() => setPlayerFourLife((actualValue) => actualValue + 1)}>+
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};