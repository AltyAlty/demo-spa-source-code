/*
При отрисовке приложения в браузере файлы проекта собираются в отдельные группы файлов - бандлы (bundles). При помощи
них HTTP быстрее загружает приложение. Можно сделать так, чтобы подгружалось только то, что необходимо для отображения,
а не все бандлы. Все остальное будет загружаться по необходимости. Это называется "lazy loading". В зависимости от
целей можно использовать "lazy loading" или загружать бОльшее количество бандлов. Бандлы собираются путем пробега
"WebPack" по импортам в проекте. Компоненты в "lazy loading" нужно обворачивать в "Suspense" из "ReactJS". Для этого
обварачивания мы создали этот HOC "WithSuspense.tsx". Далее мы используем этот HOC в компоненте "App.tsx" для
компонентов "ProfileContainer.tsx" и "ChatPage.tsx".
*/

import React, {Suspense, ComponentType} from 'react';
/*
Подключаем сам "ReactJS", необходим везде, где мы что-то из него используем (например, JSX).
"WebPack" уже встроен в "ReactJS".
Импортируем "Suspense" для реализации "lazy loading" (больше об этом в HOC "WithSuspense.tsx").
Импортируем "ComponentType" для типизации.
*/

import {Preloader} from '../components/common/Preloader/Preloader'; /*Подключаем компонент "Preloader".*/


export function withSuspense<WrappedProps> (Component: ComponentType<WrappedProps>) { /*Это и есть наш HOC, который в
качестве параметра принимает какой-либо компонент "Component". Не используем здесь синтаксис стрелочной функции, чтобы
можно было уточнить "props" как "WrappedProps", как мы это сделали здесь.

Этот HOC принимает какой-то "generic" компонент "Component", который ожидает "props" c типом "WrappedProps". Компонент
"Component" должен быть типа "ComponentType", то есть быть каким-то компонентом из "ReactJS".

Уточняем, что внутри ожидаются "props" c типом "WrappedProps", то есть теже "props" компонента "Component", который мы
будем передавать в этот HOC, так как наш HOC не будет снабжать новыми данными переданный в него компонент "Component".*/
    return (props: WrappedProps) => { /*Наш HOC возвращает другой компонент, "props" которого являются тоже типа
    "WrappedProps", так как опять же наш HOC не будет снабжать новыми данными переданный в него компонент "Component"*/
        return ( /*Этот HOC обварачивает полученный компонент "Component" в тег "Suspense" для реализации "lazy
        loading". Также в этот компонент "Component" передаются все его изначальные "props".*/
            <Suspense fallback={<Preloader/>}> {/*Пока будет идти загрузка компонента будет показываться
            компонент-заглушка "Preloader".*/}
                <Component {...props}/>
            </Suspense>
        )
    };
};
