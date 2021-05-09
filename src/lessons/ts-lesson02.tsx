import {compose} from 'redux';
import React, {ComponentType} from 'react';
import {connect} from 'react-redux';
import {RouteComponentProps, withRouter} from 'react-router-dom';

/*----------------------------------------------------------------------------------------------------*/

function A<T extends {name: string}>(entity: T) {}; /*Создали некую функцию "A", которая принимает тип "T", который
похож на тип объекта, у которого есть строковое свойство "name", и которая принимает параметр "entity" с этим типом
"T".*/

A({name: 'bop'}); /*Вызываем функцию "A", передав в нее параметр "{name: 'bop'}". Здесь все хорошо, так как
параметр совпадает с объектом со строковым свойством "name".*/
A({name: 'bop', age: 69}); /*Вызываем функцию "A", передав в нее параметр "{name: 'bop', age: 69}". Здесь все
хорошо, так как параметр похож на объект со строковым свойством "name".*/
//A({age: 69});
/*Так уже будет ошибка, так как в данном случае параметр "{age: 69}" хоть и является объектом, но не имеет строкового
свойства "name", как этого требует типизация функции "A".*/

type WithNameType = {name: string}; /*Создали тип "WithNameType", который соотвествует (не просто похож) типу объекта со
строковым свойством "name".*/

//let a: WithNameType = {name: 'bop', age: 69};
/*Создали объект "a" типа "WithNameType". Здесь ошибка, так как объект "{name: 'bop', age: 69}" больше типа
"WithNameType", то есть не соответствует "{name: string}".*/

/*----------------------------------------------------------------------------------------------------*/

/*
Создаем какой-то HOC под именем "HOC1", который создается с целью снабдить компонент "C1" данными "beep={16}".

Делаем его "generic". Уточняем, что внутри ожидаются "props" c типом "WrappedProps", которые должны быть совместимы с
данными "{beep: number}" (то есть быть похожим на объект, содержащий свойство "beep"), то есть "props" компонента,
который мы будем передавать в этот "HOC1", должны быть совместимы с данными "{beep: number}", так как наш "HOC1" будет
снабжать этими данными переданный в него компонент.

Этот "HOC1" принимает какой-то "generic" компонент "WrappedComponent", который ожидает "props" c типом "WrappedProps".
Компонент "WrappedComponent" должен быть типа "ComponentType", то есть быть каким-то компонентом из "ReactJS".

Этот "HOC1" возвращает новый контейнерный функциональный компонент "ContainerComponent", который принимает "props" c
типом "WrappedProps" за исключением данных "{beep: number}", так как этот контейнерный компонент внутри "HOC1" должен
где-то найти эти данные (в данном случае они передаются через атрибут в переданный компонент "WrappedComponent"
напрямую), а не получить их через свои "props", и добавить затем эти данные в переданный компонент "WrappedComponent",
иначе при использовании контейнерного компонента, который будет создан при помощи "HOC1", (например, в компоненте
"App" ниже) придется еще и указывать свойство "beep" помимо свойства "title", что лишает смысла существования этого
"HOC1", так как именно его задача снабдить свойством "beep" переданный в него компонент "WrappedComponent".

Это мы указываем при помощи:
1. "Omit" из "TypeScript": "Omit<WrappedProps, 'beep'>" - это звучит примерно как: возьми все из "WrappedProps", но
исключи из них свойство "beep";
2. указывания "{...props as WrappedProps}", то есть чтобы деструктуризация "props" в отрисованном компоненте
"WrappedComponent" воспринималась как с типом "WrappedProps", поскольку компонент "WrappedComponent" на входе "HOC1"
ожидает "props" типа "WrappedProps", то есть как будто бы мы заставляем воспринимать это так, учитывая, что мы исключили
из "props" свойство "beep" при помощи "Omit" в контейнерном компоненте "ContainerComponent".

Если же мы хотим, чтобы при использовании контейнерного компонента, созданного при помощи этого "HOC1", можно было
передать свойство "beep" извне (то есть, например, как атрибут в том же компоненте "App"), то нужно поменять местами
"{...props as WrappedProps}" и "beep={16}" в отрисованном компоненте "WrappedComponent", и убрать "Omit" из
контейнерного компонента "ContainerComponent". Но все равно напишет ошибку, что свойство "beep" в дальнейшем при
использовании контейнерного компонента, созданного на основе "HOC1", будет перезаписано, поэтому просто можно удалить
"beep={16}" из отрисованного компонента "WrappedComponent".

Ну и в итоге этот контейнерный компонент "ContainerComponent" возвращает отрисованный компонент "WrappedComponent",
снабдив его "props", которые у него уже были, и дополнительно новыми данными "beep={16}".
*/
function HOC1<WrappedProps extends {beep: number}>(WrappedComponent: ComponentType<WrappedProps>) {
    let ContainerComponent: React.FC<Omit<WrappedProps, 'beep'>> = (props) => {
        return <div><WrappedComponent {...props as WrappedProps} beep={16} /></div>
    }
    return ContainerComponent
};

/*Создали "HOC2" аналогичный "HOC1", изменив в нем свойство "beep" на "kek".*/
function HOC2<WrappedProps extends {kek: number}>(WrappedComponent: ComponentType<WrappedProps>) {
    let ContainerComponent: React.FC<Omit<WrappedProps, 'kek'>> = (props) => {
        return <div><WrappedComponent {...props as WrappedProps} kek={64} /></div>
    }
    return ContainerComponent
};

type C1PropsType = { /*Создали тип для "props" для компонента "C1". Если уберем одно из свойств, то будет ошибка.

Если убрать свойства "title", то будет ошибка в самом компоненте "C1", так как в нем самом используется "props.title", и
будет ошибка в компонентах "App" и "App2", так как мы также передаем свойство "title" как атрибут в контейнерные
компоненты "C1Container" (был создан при помощи "HOC1") и "C1Container2" (был создан при помощи "HOC2") соотвественно,
которые были созданы над компонентами "C1" и "C1Container" соответственно, и ни "HOC1", ни "HOC2" не передают это
свойство "title" в компонент "C1".

Если убрать свойство "beep", то будет ошибка в том месте, где мы передаем компонент "C1" в "HOC1", так как в реализации
"HOC1" мы передаем в переданный в него компонент данные "beep={16}" и указываем, что "props" этого компонента должны
"extends {beep: number}", то есть подходить под это свойство "beep" (то есть быть похожими на объект, содержащий
свойство "beep").

Если убрать "kek", то будет ошибка в том месте, где мы передаем контейнерный компонент "C1Container" в "HOC2", так как
в реализации "HOC2" мы передаем в переданный в него компонент данные "kek={64}" и указываем, что "props" этого
компонента должны "extends {kek: number}", то есть подходить под это свойство "kek" (то есть быть похожими на объект,
содержащий свойство "kek").*/
    title: string
    beep: number
    kek: number
};

/*Создали простой функциональный компонент "C1", указав, что его "props" имеют тип "C1PropsType". Внутри используется
свойство "title". Планируется использовать этот компонент в "HOC1" для передачи в этот компонент свойства "beep".*/
const C1: React.FC<C1PropsType> = (props) => {
    return <div>{props.title}</div>
};

/*Передаем компонент "C1" в "HOC1" и получаем контейнерный компонент "C1Container". Планируется использовать этот
компонент в "HOC2" для передачи в компонент "C1" свойства "kek".*/
const C1Container = HOC1(C1);

/*Передаем контейнерный компонент "C1Container" в "HOC2" и получаем контейнерный компонент "C1Container2".*/
const C1Container2 = HOC2(C1Container);

/*Создаем компонент "App", в который передадим контейнерный компонент "C1Container".*/
const App = () => {
    return <C1Container title={'boop'} kek={128} /> /*Если здесь не передадим свойства "title" и "kek", то будет ошибка,
    так как они указаны в типе "props" компонента "C1", и "HOC1" внутри себя эти свойства не передает в этот компонент
    "C1". Если не передадим свойство "beep", то ошибки не будет, так как задача передать это свойство лежит на самом
    "HOC1".*/
};

/*Создаем компонент "App2", в который передадим контейнерный компонент "C1Container2". Мы сделали два контейнерных
компонента, чтобы снабдить компонент "C1" и свойством "beep", и свойством "kek".*/
const App2 = () => {
    return <C1Container2 title={'boop'} /> /*Если здесь не передадим свойство "title", то будет ошибка, так как это
    свойство указано в типе "props" компонента "C1", и ни "HOC1", ни "HOC2" внутри себя это свойство не передают в этот
    компонент "C1". Если не передадим свойство "kek", то ошибки не будет, так как задача передать это свойство лежит на
    самом "HOC2". Если не передадим свойство "beep", то ошибки не будет, так как задача передать это свойство лежит на
    "HOC1", который сработал в компоненте "App" выше.*/
};

/*----------------------------------------------------------------------------------------------------*/

/*Создали простой функциональный компонент "C2" аналогичный компоненту "C1".*/
const C2: React.FC<C1PropsType> = (props) => {
    return <div>{props.title}</div>
};

/*Отдельно создали тип для "props" того компонента, который возвращается из "HOC1". Используем для того, чтобы
типизировать те компоненты, которые возвращается из "HOC1" и "HOC2" дальше.*/
type PropsOfWhatIsReturnedFromHOC1Type = Omit<C1PropsType, 'beep'>;

/*Создаем тип для того компонента, который возвращается из "HOC1". Там возвращается компонент со всеми "props", что
ожидались в типе "props" компонента "С1", кроме свойства "beep", а такой тип "props" мы уже определили в
"PropsOfWhatIsReturnedFromHOC1Type".*/
type WhatIsReturnedFromHOC1Type = ComponentType<PropsOfWhatIsReturnedFromHOC1Type>;

/*Отдельно создали тип для "props" того компонента, который возвращается из "HOC2". Используем для того, чтобы
типизировать тот компонент, который возвращается из "HOC2" дальше.*/
type PropsOfWhatIsReturnedFromHOC2Type = Omit<PropsOfWhatIsReturnedFromHOC1Type, 'kek'>;

/*Создаем тип для того компонента, который возвращается из "HOC2". Там возвращается компонент со всеми "props", что
ожидались в типе "props" того компонента, который возвращается из "HOC1", кроме свойства "kek", а такой тип "props" мы
уже определили в "PropsOfWhatIsReturnedFromHOC2Type".*/
type WhatIsReturnedFromHOC2Type = ComponentType<PropsOfWhatIsReturnedFromHOC2Type>;

/*
При помощи функции "compose" из библиотеки "redux" попробуем объеденить в одном месте то, что делают "HOC1" и "HOC2".
Результат работы этой функции "compose" сохраняем в "SuperHOC".

Наш компонент "C2" на входе ждет три свойства "title", "beep" и "kek".
"HOC1" позаботится о передаче свойства "beep" в компонент "C2".
"HOC2" позаботится о передаче свойства "kek" в "HOC1" и, соотвественно, в компонент "C2".
Свойство "title" попадает в компонент "C2" уже извне, то есть через атрибут (например, "title={'boop'}").

Первым параметром в уточнении типов должны указать то, что возвращает "HOC1", то есть тип "WhatIsReturnedFromHOC1Type",
который мы создали выше.

Вторым параметром в уточнении типов должны указать, что принимает "HOC1", то есть тип компонента "C1" со своим типом
"props" - "ComponentType<C1PropsType>".

Третьим параметром в уточнении типов должны указать то, что возвращает "HOC2", то есть тип "WhatIsReturnedFromHOC2Type",
который мы создали выше.

То есть функция "compose" принимает типы в обратном порядке переданных внутрь HOC-ов.

Эти уточнения мы нашли в файле декларации "compose" (конретно в описании "compose" с двумя функциями), "Ctrl+click" в
"WebStorm".
*/
const SuperHOC = compose<
    WhatIsReturnedFromHOC1Type, /*Это "A" из файла декларации "compose" (в описании "compose" с двумя функциями).*/
    ComponentType<C1PropsType>, /*Это "T1" из файла декларации "compose" (в описании "compose" с двумя функциями).*/
    WhatIsReturnedFromHOC2Type /*Это "R" из файла декларации "compose" (в описании "compose" с двумя функциями).*/
    >(
    HOC2,
    HOC1
);

/*Передаем компонент "C2" в "SuperHOC" и получаем контейнерный компонент "C2Container".*/
const C2Container = SuperHOC(C2);

/*Создаем компонент "App3", в который передадим контейнерный компонент "C2Container". Компонент "App3" это аналог
компонента "App2" с использованием функции "compose" для объеденения работы "HOC1" и "HOC2".*/
const App3 = () => {
    return <C2Container title={'boop'} /> /*Здесь все работает также как и в компоненте "App2" выше.*/
};

/*----------------------------------------------------------------------------------------------------*/

/*Создали тип для "props" для компонента "C3".*/
type C3PropsType = {
    title: string
    age: number
};

/*Создали отдельный тип для объекта "params" из объекта "match" из функции "withRouter" из библиотеки
"react-router-dom". Указали "string", так как все, что находится в этом объекте "params", является "string" (так
устроена функция "withRouter").*/
type C3ParamsTypes = {
    userID: string
};

/*Создаем "mapStateToProps" для использования функции "connect" из библиотеки "react-redux" ниже.*/
const mapStateToProps = (state: any) => {
    return {
        beep: 256,
        kek: 512
    }
};

/*Создали тип для "mapStateToProps".*/
type MapStateToPropsType = {
    beep: number
    kek: number
};

/*Создали тип для всего компонента "C3". Здесь используются собственные "props" компонента "C3" - "C3PropsType", тип
"mapStateToProps" для функции "connect" - "MapStateToPropsType", и тип "RouteComponentProps" из библиотеки
"react-router-dom". Последний тип мы указали, так как по нашей задумке компонент "C3" хочет получить объект "match" из
функции "withRouter". "RouteComponentProps" это тип для отдельного вида "props" из функции "withRouter". В этом типе
"RouteComponentProps" мы уточнили какие свойства объекта "params" из объекта "match" из функции "withRouter" должны
содержаться внутри при помощи типа "C3ParamsTypes", который создали выше.*/
type C3Type = React.FC<C3PropsType & MapStateToPropsType & RouteComponentProps<C3ParamsTypes>>;

/*Создали простой функциональный компонент "C3", указав его тип как "C3Type", который мы создали выше. */
const C3: C3Type = (props) => {
    console.log(props.match.params.userID); /*Благодаря типизации можем здесь обратиться к объекту "match" из функции
    "withRouter".*/
    return <div>{props.title}</div>
};

/*Обворачиваем компонент "C3" функцией "connect", чтобы передать этому компоненту "mapStateToProps", которые в свою
очередь содержат свойства "beep" и "kek".*/
const C3ConnectContainer = connect(mapStateToProps)(C3);

/*Обворачиваем компонент "C3ConnectContainer" функцией "withRouter", чтобы передать этому компоненту, а соответственно и
компоненту "C3", объект "match" из функции "withRouter".*/
const C3ConnectAndWithRouterContainer = withRouter(C3ConnectContainer);

/*Объеденим работу функций "connect" и "withRouter" функцией "compose", создав тем самым аналог работы двух контейнерных
компонентов "C3ConnectContainer" и "C3ConnectAndWithRouterContainer" выше.

Здесь, в отличии от "SuperHOC" выше, мы уточнили тип только одним параметром, так как согласно файлу декларации функции
"compose" (раздел "rest"), нам нужно уточнить только такой компонент, свойства "props" которого не будут переданы в этот
компонент функциями, которые были переданы внутрь функции "compose", то есть функциями "connect" и "withRouter", то есть
свойства "title" и "age", которые уже указаны в типе "C3PropsType".

Если бы мы хотели добавить сюда еще, например, "HOC1", то нужно было бы перенести свойство "beep" из "mapStateToProps"
в компонент "C3" (не забыв про изменения соответствующих типов), а в уточнении типов функции "compose" нужно было бы
вместо "C3PropsType" написать "Omit<C3PropsType, 'beep'>", следуя логике работы "HOC1" и "SuperHOC".
*/
const C3ComposeContainer = compose<ComponentType<C3PropsType>>(
    withRouter,
    connect(mapStateToProps)
)
(C3);

/*Создаем компонент "App4", в который передадим контейнерный компонент "C3ComposeContainer". Здесь в итоге мы передаем в
компонент "C3" свойства "title" и "age" как атрибуты, свойства "beep" и "kek" при помощи функции "connect", и объект
"match" (это внутренний объект "WithRouter" с различным параметрами "params", смотри "ProfileContainer.tsx") при помощи
функции "WithRouter". Работу функций "connect" и "withRouter" мы объединили при помощи функции "compose" выше.*/
const App4 = () => {
    return <C3ComposeContainer title={'boop'} age={69} />
};

/*----------------------------------------------------------------------------------------------------*/

/*Дополнительно:
1. По поводу конструкции {...props as WP} в HOC: это вроде баг "TypeScript".
Note: A type cast (props as P) is required here from TypeScript v3.2 onwards, due to a likely bug in TypeScript.
(https://medium.com/@jrwebdev/react-higher-order-component-patterns-in-typescript-42278f7590fb).
Ссылка на issue: https://github.com/Microsoft/TypeScript/issues/28938

2. Возможно, при уточнении типа в функции "compose" хватит просто "<ComponentType>".
*/