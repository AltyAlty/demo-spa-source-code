/*При отрисовке приложения в браузере файлы проекта собираются в отдельные группы файлов - бандлы (bundles). При помощи
их HTTP быстрее загружает приложение. Можно сделать так, чтобы подгружалось только то, что необходимо для отображения,
а не все бандлы сразу. Все остальное будет загружаться по необходимости. Это называется lazy loading. В зависимости от
целей можно использовать lazy loading или загружать большее количество бандлов. Бандлы собираются путем пробега WebPack
по импортам в проекте. Компоненты в lazy loading нужно оборачивать в компонент "Suspense" из React. Для этого
оборачивания мы создаем этот HOC "WithSuspense()". Далее мы используем этот HOC в файле "App.tsx" для компонентов
"ProfileContainer" и "ChatPage".

Импортируем компонент "Suspense" для реализации lazy loading. Импортируем тип "ComponentType" для типизации.*/
import React, {Suspense, ComponentType} from 'react';
/*Импортируем компонент "Preloader".*/
import {Preloader} from '../components/common/Preloader/Preloader';

/*HOC "withSuspense()" - это HOC, который реализует lazy loading в нашем приложении.

Этот HOC, в качестве параметра принимает какой-либо компонент "Component". Не используем здесь синтаксис стрелочной
функции, чтобы можно было уточнить props как "WrappedProps", как мы это сделали здесь. Этот HOC принимает какой-то
generic компонент "Component", который ожидает props c типом "WrappedProps".

Компонент "Component" должен быть типа "ComponentType", то есть быть каким-то компонентом из React.

Уточняем, что внутри ожидаются props c типом "WrappedProps", то есть те же props компонента "Component", который мы
будем передавать в этот HOC, так как наш HOC не будет снабжать новыми данными переданный в него компонент "Component".

HOC "withSuspense()" импортируется в файле "App.tsx".*/
export function withSuspense<WrappedProps>(Component: ComponentType<WrappedProps>) {
    /*Наш HOC возвращает другой компонент, props которого являются тоже типа "WrappedProps", так как опять же наш HOC не
    будет снабжать новыми данными переданный в него компонент "Component".*/
    return (props: WrappedProps) => {
        /*Этот HOC оборачивает полученный компонент "Component" в компонент "Suspense" для реализации lazy loading.
        Также в этот компонент "Component" передаются все его изначальные props.*/
        return (
            /*Пока будет идти загрузка компонента будет показываться компонент-заглушка "Preloader".*/
            <Suspense fallback={<Preloader/>}>
                <Component {...props}/>
            </Suspense>
        )
    };
};