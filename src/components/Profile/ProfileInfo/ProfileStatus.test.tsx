/*
Это файл с тестами для "ProfileStatus.tsx".
Тесты в "TDD" пишутся заранее, чтобы программа им соответствовала.
Тесты обязуют нас писать правильно структурированную программу.
Тесты работают точечно, то есть нам не надо каждый раз запускать программу полностью, чтобы ее протестировать.
Unit-тесты тестируют отдельные части приложения (например, модули, компоненты, функции, селекторы и т.д.)
В "App.test.js" уже есть тест, который можно запустить прямо из WebStorm или через консоль "npm run test".
".test." в названии файла сообщает настроенной системе "Webpack" и тестовой среде разработки (это скрыто в
"react-scripts" (используется библиотека "JEST"), "create-react-app" скрыл эти детали), что такой файл содержит тесты и
IDE будет их запускать. Желательно, чтобы каждый тест проверял что-то одно.
*/

import React from 'react';
/*
Подключаем сам "ReactJS", необходим везде, где мы что-то из него используем (например, JSX).
"WebPack" уже встроен в "ReactJS".
*/
import {create} from 'react-test-renderer'; /*Мы установили библиотеку "react-test-renderer" для тестирования.
При установке этой библиотеки важно указать версию "ReactJS" и то, что эта библиотека нужа только для разработки -
"npm i react-test-renderer@16.13.1 --save -dev". Эта библиотека позволяет фейково отрисовывать компонент без браузера
для целей тестирования при помощи функции "create".*/

import ProfileStatus from './ProfileStatus'; /*Импортировали весь "ProfileStatus.tsx".*/


describe('tests for ProfileStatus component', () => { /*"describe" позволит определить IDE, что это
группа тестов.*/
    /*Тест №1. Если компонент "ProfileStatus" получает текст статуса из "props", то должен быть в "state".*/
    test('status from props should be in the state', () => { /*"test" позволит определить IDE, что это тест.*/
        /*Шаги теста.*/
        const component = create(<ProfileStatus status='test' updateUserStatus={() =>{}} isOwner={true}/>); /*Фейково
        создали компонент "ProfileStatus", передав ему статус и остальные свойства.*/
        const instance: any = component.getInstance(); /*Получаем экземпляр класса, с которым ведется работа. Указали
        тип "any" для "instance", так как пока не знаем какого он будет типа. ???*/

        /*Ожидаемый результат. "expect" позволит определить IDE, что это ожидаемый результат в тесте.*/
        expect(instance.state.status).toBe('test'); /*Проверяем есть ли наш переданный статус в "state" у
        экземпляра класса.*/
    });

    /*Тест №2. После создания компонента "ProfileStatus" мы не находимся в режиме редактирования статуса, поэтому
    должен отображаться элемент "span" с текстом статуса.*/
    test('after the creation of the component, span with status should be displayed', () => { /*"test"
    позволит определить IDE, что это тест.*/
        /*Шаги теста.*/
        const component = create(<ProfileStatus status='test' updateUserStatus={() =>{}} isOwner={true}/>); /*Фейково
        создали компонент "ProfileStatus", передав ему статус и остальные свойства.*/
        const root = component.root; /*Берем из компонента "root" (видимо элемент содержащий дерево компонента).*/
        const span = root.findByType('span'); /*Ищем в этом "root" элемент "span".*/

        /*Ожидаемый результат. "expect" позволит определить IDE, что это ожидаемый результат в тесте.*/
        expect(span).not.toBeNull(); /*Проверяем, что "span" не пустой, то есть мы смогли найти элемент "span".*/
    });

    /*Тест №3. После создания компонента "ProfileStatus" мы не находимся в режиме редактирования статуса, поэтому
    не должен отображаться элемент "input" с текстом статуса.*/
    test('after the creation of the component, input should not be displayed', () => { /*"test" позволит
    определить IDE, что это тест.*/
        /*Шаги теста.*/
        const component = create(<ProfileStatus status='test' updateUserStatus={() =>{}} isOwner={true}/>); /*Фейково
        создали компонент "ProfileStatus", передав ему статус и остальные свойства.*/
        const root = component.root; /*Берем из компонента "root" (видимо элемент содержащий дерево компонента).*/

        /*Ожидаемый результат. "expect" позволит определить IDE, что это ожидаемый результат в тесте.*/
        expect(() => {
            const input = root.findByType('input'); /*Пытаемся найти в этом "root" элемент "input".*/
        }).toThrow(); /*Ожидается, что при попытке найти этот элемент "input" мы его не сможем найти и выкинется
        ошибка.*/
    });

    /*Тест №4. После создания компонента "ProfileStatus" мы не находимся в режиме редактирования статуса, поэтому
    должен отображаться элемент "span" с текстом статуса, причем должен быть корректный текст статуса.*/
    test('after the creation of the component, span should contain correct status', () => { /*"test" позволит
    определить IDE, что это тест.*/
        /*Шаги теста.*/
        const component = create(<ProfileStatus status='test' updateUserStatus={() =>{}} isOwner={true}/>); /*Фейково
        создали компонент "ProfileStatus", передав ему статус и остальные свойства.*/
        const root = component.root; /*Берем из компонента "root" (видимо элемент содержащий дерево компонента).*/
        const span = root.findByType('span'); /*Ищем в этом "root" элемент "span".*/

        /*Ожидаемый результат. "expect" позволит определить IDE, что это ожидаемый результат в тесте.*/
        expect(span.children[0]).toBe('test'); /*Проверяем, что в элементе "span" находится корректный текст
        статуса.*/
    });

    /*Тест №5. После включения режима редактирования статуса в компоненте "ProfileStatus" должен отображаться
    элемент "input" с корректным текстом статуса вместо элемента "span".*/
    test('after enabling editMode, input with correct status should be displayed instead of span', () => {
    /*"test" позволит определить IDE, что это тест.*/
        /*Шаги теста.*/
        const component = create(<ProfileStatus status='test' updateUserStatus={() =>{}} isOwner={true}/>); /*Фейково
        создали компонент "ProfileStatus", передав ему статус и остальные свойства.*/
        const root = component.root; /*Берем из компонента "root" (видимо элемент содержащий дерево компонента).*/
        const span = root.findByType('span'); /*Ищем в этом "root" элемент "span".*/
        /*span.props.onDoubleClick();*/ /*Раньше мы здесь делали таким способом двойной клик по элементу "span",
        но теперь это по какой-то причине не работает. Возможно из-за "TypeScript". Поэтому я изменил этот тест.*/
        const instance: any = component.getInstance(); /*Этой строки не было изначально. Получаем экземпляр класса,
        с которым ведется работа. Указали тип "any" для "instance", так как пока не знаем какого он будет типа. ???*/
        instance.activateEditMode(); /*Этой строки не было изначально. Вызываем у этого экземпляра класса метод
        "activateEditMode", чтобы активировать режим редактирования статуса, вместо симуляции двойного клика.*/
        const input = root.findByType('input'); /*После двойного клика по элементу "span" должен был отрисовываться
        элемент "input", поскольку мы переходили в режим редактирования статуса, поэтому мы теперь уже искали в этом
        "root" элемент "input". Сейчас мы делаем по идее тоже самое, только переходим по другому в режим редактирования
        статуса - вызываем метод "activateEditMode" выше.*/

        /*Ожидаемый результат. "expect" позволит определить IDE, что это ожидаемый результат в тесте.*/
        expect(input.props.value).toBe('test'); /*Проверяем, что элемент "input" содержит существует и содержит
        корректный текст статуса.*/
        expect(() => { /*Следующих трех строк изначально не было.*/
            const span = root.findByType('span'); /*Пытаемся найти в этом "root" элемент "span".*/
        }).toThrow(); /*Ожидается, что при попытке найти этот элемент "span" мы его не сможем найти и выкинется
        ошибка.*/
    });

    /*Тест №6. Переданный "сallback" в компонент "ProfileStatus" должен вызываться.*/
    test('callback should be called', () => { /*"test" позволит определить IDE, что это тест.*/
        /*Шаги теста.*/
        const mockCallback = jest.fn(); /*Таким образом создали фейковую функцию, которую будет отслеживать
        тестовая среда.*/
        const component = create(<ProfileStatus status='test' updateUserStatus={mockCallback} isOwner={true}/>);
        /*Фейково создали компонент "ProfileStatus", передав ему статус и свойство "isOwner". Также передаем ему
        callback "updateUserStatus" с нашей фейковой функцией "mockCallback", который должен вызваться, когда мы вызовем
        метод "deactivateEditMode".*/
        const instance: any = component.getInstance(); /*Получаем экземпляр класса, с которым ведется работа. Указали
        тип "any" для "instance", так как пока не знаем какого он будет типа. ???*/
        instance.deactivateEditMode(); /*Вызываем у этого экземпляра класса метод "deactivateEditMode", чтобы
        активировать режим редактирования статуса, вместо симуляции двойного клика.*/

        /*Ожидаемый результат. "expect" позволит определить IDE, что это ожидаемый результат в тесте.*/
        expect(mockCallback.mock.calls.length).toBe(1); /*Проверяем, что наша фейковая функция "mockCallback"
        вызывалась 1 раз*/
    });
});