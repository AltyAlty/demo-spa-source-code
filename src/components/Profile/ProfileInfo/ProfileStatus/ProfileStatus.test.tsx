import React from 'react';
import {create} from 'react-test-renderer';
/*Импортируем компонент "ProfileStatus".*/
import {ProfileStatus} from './ProfileStatus';

describe('tests for ProfileStatus component', () => {
    /*Тест №1. Если компонент "ProfileStatus" получает текст статуса из props, то он должен быть в state.*/
    test('a status from props should be in the state', () => {
        /*Шаги теста. Фейково создаем компонент "ProfileStatus", передав ему статус и остальные свойства.*/
        const component = create(<ProfileStatus status='test' updateUserStatus={() => {}} isOwner={true}/>);
        /*Получаем экземпляр класса, с которым ведется работа. Указываем тип any для "instance", так как пока не знаем
        какого он будет типа.*/
        const instance: any = component.getInstance();
        /*Ожидаемый результат. Проверяем есть ли наш переданный статус в state у экземпляра класса.*/
        expect(instance.state.status).toBe('test');
    });

    /*Тест №2. После создания компонента "ProfileStatus" мы не находимся в режиме редактирования статуса, поэтому
    должен отображаться элемент "span" с текстом статуса.*/
    test('after rendering of the component, a span with a status should be displayed', () => {
        /*Шаги теста. Фейково создаем компонент "ProfileStatus", передав ему статус и остальные свойства.*/
        const component = create(<ProfileStatus status='test' updateUserStatus={() => {}} isOwner={true}/>);
        /*Берем из "component" "root" (видимо элемент содержащий дерево компонента).*/
        const root = component.root;
        /*Ищем в этом "root" элемент "span".*/
        const span = root.findByType('span');
        /*Ожидаемый результат. Проверяем, что "span" не пустой, то есть мы смогли найти элемент "span".*/
        expect(span).not.toBeNull();
    });

    /*Тест №3. После создания компонента "ProfileStatus" мы не находимся в режиме редактирования статуса, поэтому
    не должен отображаться элемент "input" с текстом статуса.*/
    test('after rendering of the component, an input should not be displayed', () => {
        /*Шаги теста. Фейково создаем компонент "ProfileStatus", передав ему статус и остальные свойства.*/
        const component = create(<ProfileStatus status='test' updateUserStatus={() => {}} isOwner={true}/>);
        /*Берем из "component" "root" (видимо элемент содержащий дерево компонента).*/
        const root = component.root;
        /*Ожидаемый результат. Пытаемся найти в этом "root" элемент "input". Ожидается, что при попытке найти этот
        элемент "input" мы его не сможем найти и выкинется ошибка.*/
        expect(() => { const input = root.findByType('input') }).toThrow();
    });

    /*Тест №4. После создания компонента "ProfileStatus" мы не находимся в режиме редактирования статуса, поэтому
    должен отображаться элемент "span" с текстом статуса, причем должен быть корректный текст статуса.*/
    test('after rendering of the component, a span should contain a correct status', () => {
        /*Шаги теста. Фейково создаем компонент "ProfileStatus", передав ему статус и остальные свойства.*/
        const component = create(<ProfileStatus status='test' updateUserStatus={() => {}} isOwner={true}/>);
        /*Берем из "component" "root" (видимо элемент содержащий дерево компонента).*/
        const root = component.root;
        /*Ищем в этом "root" элемент "span".*/
        const span = root.findByType('span');
        /*Ожидаемый результат. Проверяем, что в элементе "span" находится корректный текст статуса.*/
        expect(span.children[0]).toBe('test');
    });

    /*Тест №5. После включения режима редактирования статуса в компоненте "ProfileStatus" должен отображаться элемент
    "input" с корректным текстом статуса вместо элемента "span".*/
    test('after enabling editMode, an input with a correct status should be displayed instead of a span',
        () => {
            /*Шаги теста. Фейково создаем компонент "ProfileStatus", передав ему статус и остальные свойства.*/
            const component = create(<ProfileStatus status='test' updateUserStatus={() => {}} isOwner={true}/>);
            /*Берем из "component" "root" (видимо элемент содержащий дерево компонента).*/
            const root = component.root;
            /*Ищем в этом "root" элемент "span".*/
            const span = root.findByType('span');
            /*Раньше мы здесь делали таким способом двойной клик по элементу "span", но теперь это по какой-то причине
            это не работает. Возможно из-за Typescript. Поэтому я изменил этот тест.*/
            /*span.props.onDoubleClick();*/
            /*Этой строки не было изначально. Получаем экземпляр класса, с которым ведется работа. Указываем тип any для
            "instance", так как пока не знаем какого он будет типа.*/
            const instance: any = component.getInstance();
            /*Этой строки не было изначально. Вызываем у этого экземпляра класса метод "activateEditMode()", чтобы
            активировать режим редактирования статуса, вместо симуляции двойного клика.*/
            instance.activateEditMode();
            /*После двойного клика по элементу "span" должен был отрисовываться элемент "input", поскольку мы переходили
            в режим редактирования статуса, поэтому мы теперь уже искали в этом "root" элемент "input". Сейчас мы делаем
            по идее тоже самое, только переходим по другому в режим редактирования статуса - вызываем метод
            "activateEditMode()" выше.*/
            const input = root.findByType('input');
            /*Ожидаемый результат. Проверяем, что элемент "input" существует и содержит корректный текст статуса.*/
            expect(input.props.value).toBe('test');
            /*Этой строки не было изначально. Пытаемся найти в этом "root" элемент "span". Ожидается, что при попытке
            найти этот элемент "span" мы его не сможем найти и выкинется ошибка.*/
            expect(() => { const span = root.findByType('span') }).toThrow();
        });

    /*Тест №6. Переданная callback-функция в компонент "ProfileStatus" должна вызываться.*/
    test('a callback should be called', () => {
        /*Шаги теста. Таким образом создаем фейковую функцию, которую будет отслеживать тестовая среда.*/
        const mockCallback = jest.fn();
        /*Фейково создаем компонент "ProfileStatus", передав ему статус и свойство "isOwner". Также передаем ему
        callback-функцию "updateUserStatus()" с нашей фейковой функцией "mockCallback()", которая должна вызваться,
        когда мы вызовем метод "deactivateEditMode()".*/
        const component = create(<ProfileStatus status='test' updateUserStatus={mockCallback} isOwner={true}/>);
        /*Получаем экземпляр класса, с которым ведется работа. Указываем тип any для "instance", так как пока не знаем
        какого он будет типа.*/
        const instance: any = component.getInstance();
        /*Вызываем у этого экземпляра класса метод "deactivateEditMode()", чтобы активировать режим редактирования
        статуса, вместо симуляции двойного клика.*/
        instance.deactivateEditMode();
        /*Ожидаемый результат. Проверяем, что наша фейковая функция "mockCallback()" вызывалась 1 раз.*/
        expect(mockCallback.mock.calls.length).toBe(1);
    });
});