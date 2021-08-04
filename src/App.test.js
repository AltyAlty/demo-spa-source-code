/*
Это файл с тестами для "App". Он уже был создан изначально и содержад первый тест.
Тесты в "TDD" пишутся заранее, чтобы программа им соответствовала.
Тесты обязуют нас писать правильно структурированную программу.
Тесты работают точечно, то есть нам не надо каждый раз запускать программу полностью, чтобы ее протестировать.
Unit-тесты тестируют отдельные части приложения (например, модули, компоненты, функции, селекторы и т.д.)
".test." в названии файла сообщает настроенной системе "Webpack" и тестовой среде разработки (это скрыто в
"react-scripts" (используется библиотека "JEST"), "create-react-app" скрыл эти детали), что такой файл содержит тесты и
IDE будет их запускать. Желательно, чтобы каждый тест проверял что-то одно.
*/

import React from 'react';
/*
Подключаем сам "ReactJS", необходим везде, где мы что-то из него используем (например, JSX).
"WebPack" уже встроен в "ReactJS".
*/
import { render } from '@testing-library/react';
import ReactDOM from 'react-dom';

import AppMain from './App'; /*Импортируем весь компонент "AppMain".*/


// this test finds the specified text in DOM
test('renders learn react link', () => {
  const { getByText } = render(<AppMain />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

/*Тест №2. Компонент отрисовывается без падений.*/
test('renders without crashing', () => { /*"test" позволит определить IDE, что это тест.*/
  const div = document.createElement('div'); /*1. При помощи нативного JS создаем элемент "div" в памяти.*/
  ReactDOM.render(<AppMain />, div); /*2. Отрисовываем этот элемент "div" в нашем компоненте "App".*/
  ReactDOM.unmountComponentAtNode(div); /*3. Потом демонтируем этот элемент "div", то есть убираем мусор из памяти.*/
  /*Если на шаге 2 все хорошо, то значит, что тест пройден. Чтобы он проходил успешно мы перенесли все обвертки
  над "App" из "index.js" в "App.tsx".*/
});