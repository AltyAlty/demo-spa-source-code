import React from 'react';
/*Мы установили библиотеку React Test Renderer для тестирования. При установке этой библиотеки важно указать версию
ReactJS и то, что эта библиотека нужна только для разработки: npm i react-test-renderer@16.13.1 --save -dev
Эта библиотека позволяет фейково отрисовывать компонент без браузера для целей тестирования при помощи функции
"create()".*/
import {create} from 'react-test-renderer';
/*Импортируем компонент "Paginator".*/
import {Paginator} from './Paginator';

/*Тесты для компонента "Paginator". "describe" позволит определить IDE, что это группа тестов.*/
describe('tests for Paginator component', () => {
    /*Тест №1. Должно отображаться корректное количество страниц в одной порции страниц.*/
    test('correct quantity of pages per a portion', () => {
        /*Шаги теста. Фейково создаем компонент "Paginator", передав ему:
        1. общее количество элементов для постраничного вывода;
        2. максимальное количество элементов на одной странице в постраничном выводе;
        3. свойство, которое указывает какое максимальное количество номеров страниц в постраничном выводе может
        отображаться в одной порции таких страниц;
        4. остальные свойства "currentPage" и "onPageChange".
        То есть у нас всего 11 записей и разрешено по одной записи на страницу, значит будет всего 11 страниц. А так как
        на одну порцию страниц разрешено максимум 10 страниц, то значит будет 2 порции страниц - на одной 10 страниц, а
        на другой только 1 страница. Изначально будет видна первая порция, соответственно, должно быть отрисовано 10
        "span" элементов с номерами страниц с 1 до 10.*/
        const component = create(<Paginator totalItemsCount={11} pageSize={1} portionSize={10} currentPage={1}
                                            onPageChange={() => {}}/>);
        /*Берем из "component" "root" (видимо элемент содержащий дерево компонента).*/
        const root = component.root;
        /*Ищем в этом "root" элементы "span".*/
        const spans = root.findAllByType('span');
        /*Ожидаемый результат. Функция "expect()" позволит определить IDE, что это ожидаемый результат в тесте.
        Проверяем, что в массиве "spans" нашлось 10 элементов, так как должно отрисовываться именно 10 элементов
        "span".*/
        expect(spans.length).toBe(10);
    });

    /*Тест №2. Если количество страниц больше 10, то должна отображаться кнопка "следующая порция страниц".*/
    test('if quantity of pages is more than 10, then the "NEXT" button should be displayed', () => {
        /*Шаги теста. Фейково создаем компонент "Paginator", передав ему:
        1. общее количество элементов для постраничного вывода;
        2. максимальное количество элементов на одной странице в постраничном выводе;
        3. свойство, которое указывает какое максимальное количество номеров страниц в постраничном выводе может
        отображаться в одной порции таких страниц;
        4. остальные свойства "currentPage" и "onPageChange".
        То есть у нас всего 11 записей и разрешено по одной записи на страницу, значит будет всего 11 страниц. А так как
        на одну порцию страниц разрешено максимум 10 страниц, то значит будет 2 порции страниц - на одной 10 страниц, а
        на другой только 1 страница. Изначально будет видна первая порция, соответственно, должно быть отрисовано 10
        "span" элементов с номерами страниц с 1 до 10. Также поскольку количество порций страниц, которое мы имеем,
        больше текущего номера порции страниц (мы находимся на первой порции страниц, а порции две всего), должна
        отображаться кнопка "следующая порция страниц".*/
        const component = create(<Paginator totalItemsCount={11} pageSize={1} portionSize={10} currentPage={1}
                                            onPageChange={() => {}}/>);
        /*Берем из "component" "root" (видимо элемент содержащий дерево компонента).*/
        const root = component.root;
        /*Ищем в этом "root" элемент "button".*/
        const button = root.findAllByType('button');
        /*Ожидаемый результат. Проверяем, что в массиве "button" был найден 1 элемент, так как должен отрисовываться
        всего 1 элемент "button".*/
        expect(button.length).toBe(1);
    });
});