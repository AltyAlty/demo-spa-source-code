import React, {ComponentType} from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {RouteComponentProps, withRouter} from 'react-router-dom';

/*--------------------------------------------------------------------------------------------------------------------*/

/*Создаем некую функцию "A()", у которой можно уточнить тип "T", который похож на тип объекта, имеющий строковое
свойство "name", и которая принимает параметр "entity" с этим типом "T".*/
function A<T extends { name: string }>(entity: T) {};

/*Вызываем функцию "A()", передав в нее параметр "{name: 'bop'}". Здесь все хорошо, так как параметр совпадает с
объектом со строковым свойством "name".*/
A({name: 'bop'});

/*Вызываем функцию "A()", передав в нее параметр "{name: 'bop', age: 69}". Здесь все хорошо, так как параметр похож на
объект со строковым свойством "name".*/
A({name: 'bop', age: 69});

/*Так уже будет ошибка, так как в данном случае параметр "{age: 69}" хоть и является объектом, но не имеет строкового
свойства "name", как этого требует типизация функции "A()".*/
// A({age: 69});

/*Создаем тип "WithNameType", который соответствует (не просто похож) типу объекта со строковым свойством "name".*/
type WithNameType = { name: string };

/*Создаем объект "a" типа "WithNameType". Здесь ошибка, так как объект "{name: 'bop', age: 69}" больше типа
"WithNameType", то есть не соответствует типу "{name: string}".*/
// const a: WithNameType = {name: 'bop', age: 69};

/*--------------------------------------------------------------------------------------------------------------------*/

/*Создаем какой-то HOC под именем "HOC1", который создается с целью снабдить компонент "C1" данными "beep={16}".

Делаем его generic. Уточняем, что внутри ожидаются props c типом "WrappedProps", которые должны быть совместимы с
данными "{beep: number}", то есть быть похожими на объект, содержащий числовое свойство "beep". То есть props
компонента, который мы будем передавать в этот HOC "HOC1()", должны быть совместимы с данными "{beep: number}", так как
наш HOC "HOC1()" будет снабжать этими данными переданный в него компонент.

HOC "HOC1()" принимает какой-то generic компонент "WrappedComponent", который ожидает props c типом "WrappedProps".
Компонент "WrappedComponent" должен быть типа "ComponentType", то есть быть каким-то компонентом из React.

HOC "HOC1()" возвращает новый функциональный контейнерный компонент "ContainerComponent", принимающий props c типом
"WrappedProps" за исключением данных "{beep: number}", так как этот контейнерный компонент внутри HOC "HOC1()" должен
где-то найти эти данные "{beep: number}", а не получить их через свои props. В нашем случае эти данные передаются через
атрибут "beep" в переданный компонент "WrappedComponent" напрямую. Контейнерный компонент "ContainerComponent" должен
добавить эти данные в переданный компонент "WrappedComponent", иначе если этого не будет происходить, то при
использовании контейнерного компонента, который будет создаваться при помощи HOC "HOC1()", (например, в компоненте
"App1" ниже) придется еще указывать и свойство "beep" помимо свойства "title", что лишает смысла существования этого HOC
"HOC1()", так как именно его задача снабдить свойством "beep" переданный в него компонент "WrappedComponent".

Это мы делаем при помощи:
1. Omit из Typescript: "Omit<WrappedProps, 'beep'>". Это звучит примерно так: возьми все из "WrappedProps", но исключи
из них свойство "beep".
2. "{...props as WrappedProps}". Это делается, чтобы деструктуризированные props в отрисованном компоненте
"WrappedComponent" воспринимались как с типом "WrappedProps", поскольку компонент "WrappedComponent" на входе HOC
"HOC1()" ожидает props типа "WrappedProps", то есть как будто бы мы заставляем воспринимать их так, учитывая, что мы
исключаем из props свойство "beep" при помощи Omit в контейнерном компоненте "ContainerComponent".

Если же мы хотим, чтобы при использовании контейнерного компонента, созданного при помощи этого HOC "HOC1()", можно было
передать свойство "beep" извне (например, как атрибут в компоненте "App1" ниже), то нужно поменять местами
"{...props as WrappedProps}" и "beep={16}" в отрисованном компоненте "WrappedComponent", и убрать Omit из контейнерного
компонента "ContainerComponent". Но все равно будет ошибка, так как свойство "beep" в дальнейшем при использовании
контейнерного компонента, созданного на основе HOC "HOC1()", будет перезаписано. Поэтому просто можно удалить
"beep={16}" из отрисованного компонента "WrappedComponent" и убрать Omit из контейнерного компонента
"ContainerComponent".

В итоге этот контейнерный компонент "ContainerComponent" возвращает отрисованный компонент "WrappedComponent", снабдив
его props, которые у него уже были, и дополнительно новыми данными "beep={16}".*/
function HOC1<WrappedProps extends { beep: number }>(WrappedComponent: ComponentType<WrappedProps>) {
    const ContainerComponent: React.FC<Omit<WrappedProps, 'beep'>> = (props) => {
        return <div>
            <WrappedComponent {...props as WrappedProps} beep={16}/>
        </div>;
    };

    // const ContainerComponent: React.FC<WrappedProps> = (props) => {
    //     return <div>
    //         <WrappedComponent beep={16} {...props as WrappedProps}/> {/*Ошибка.*/}
    //     </div>;
    // };

    // const ContainerComponent: React.FC<WrappedProps> = (props) => {
    //     return <div>
    //         <WrappedComponent {...props as WrappedProps}/>
    //     </div>;
    // };

    return ContainerComponent;
};

/*Создаем HOC "HOC2()" аналогичный HOC "HOC1()", изменив в нем свойство "beep" на "bop".*/
function HOC2<WrappedProps extends { bop: number }>(WrappedComponent: ComponentType<WrappedProps>) {
    const ContainerComponent: React.FC<Omit<WrappedProps, 'bop'>> = (props) => {
        return <div>
            <WrappedComponent {...props as WrappedProps} bop={64}/>
        </div>;
    };

    return ContainerComponent;
};

/*Создаем тип для props компонента "C1". Если уберем одно из свойств, то будет ошибка.

Если убрать свойства "title", то будет ошибка в самом компоненте "C1", так как в нем самом используется "props.title".
Также будет ошибка в компонентах "App1" и "App2", так как мы передаем свойство "title" как атрибут в контейнерные
компоненты "C1Container" (создан при помощи HOC "HOC1()") и "C1Container2" (создан при помощи HOC "HOC2()")
соответственно, которые были созданы над компонентами "C1" и "C1Container" соответственно, и ни HOC "HOC1()", ни HOC
"HOC2()" не передают это свойство "title" в компонент "C1" и "C1Container" соответственно.

Если убрать свойство "beep", то будет ошибка в том месте, где мы передаем компонент "C1" в HOC "HOC1()", так как в
реализации HOC "HOC1()" мы передаем в переданный в него компонент данные "beep={16}" и указываем, что props этого
компонента должны "extends {beep: number}", то есть подходить под это свойство "beep", а значит быть похожими на объект,
содержащий свойство "beep".

Если убрать свойство "bop", то будет ошибка в том месте, где мы передаем контейнерный компонент "C1Container" в HOC
"HOC2()", так как в реализации HOC "HOC2()" мы передаем в переданный в него компонент данные "bop={64}" и указываем, что
props этого компонента должны "extends {bop: number}", то есть подходить под это свойство "bop", а значит быть похожими
на объект, содержащий свойство "bop".*/
type C1PropsType = {
    title: string
    beep: number
    bop: number
};

/*Создаем простой функциональный компонент "C1", указав, что его props имеют тип "C1PropsType". Внутри используется
свойство "title". Планируется использовать этот компонент в HOC "HOC1()" для передачи в этот компонент свойства
"beep".*/
const C1: React.FC<C1PropsType> = (props) => {
    return <div>
        {props.title}
    </div>;
};

/*Передаем компонент "C1" в HOC "HOC1()" и получаем контейнерный компонент "C1Container". Планируется использовать этот
компонент в HOC "HOC2()" для передачи в компонент "C1" свойства "bop".*/
const C1Container = HOC1(C1);

/*Передаем контейнерный компонент "C1Container" в HOC "HOC2()" и получаем контейнерный компонент "C1Container2".*/
const C1Container2 = HOC2(C1Container);

/*Создаем компонент "App", в который передаем контейнерный компонент "C1Container".*/
const App = () => {
    /*Если здесь не передадим свойства "title" и "bop", то будет ошибка, так как они указаны в типе props компонента
    "C1", и HOC "HOC1" внутри себя эти свойства не передает в этот компонент "C1".

    Если не передадим свойство "beep", то ошибки не будет, так как задача передать это свойство выполняется самим HOC
    "HOC1()".*/
    return <C1Container title={'boop'} bop={128}/>;
};

/*Создаем компонент "App2", в который передаем контейнерный компонент "C1Container2". Мы делаем два контейнерных
компонента, чтобы снабдить компонент "C1" и свойством "beep", и свойством "bop".*/
const App2 = () => {
    /*Если здесь не передадим свойство "title", то будет ошибка, так как это свойство указано в типе props компонента
    "C1", и ни HOC "HOC1()", ни "HOC2()" внутри себя это свойство не передают в этот компонент "C1".

    Если не передадим свойство "bop", то ошибки не будет, так как задача передать это свойство выполняется самим HOC
    "HOC2()".

    Если не передадим свойство "beep", то ошибки не будет, так как задача передать это свойство выполняется самим HOC
    "HOC1()", который сработал в компоненте "App" выше.*/
    return <C1Container2 title={'boop'}/>;
};

/*--------------------------------------------------------------------------------------------------------------------*/

/*Создаем простой функциональный компонент "C2" аналогичный компоненту "C1".*/
const C2: React.FC<C1PropsType> = (props) => {
    return <div>
        {props.title}
    </div>;
};

/*Отдельно создаем тип для props компонентов, которые возвращаются из HOC "HOC1()". Используем для того, чтобы
типизировать компоненты, которые возвращаются из HOC "HOC1()" и HOC "HOC2()" дальше.*/
type PropsOfWhatIsReturnedFromHOC1Type = Omit<C1PropsType, 'beep'>;

/*Создаем тип для компонентов, которые возвращается из HOC "HOC1()". Там возвращаются компоненты со всеми props, что
ожидались в типе props компонента "С1", кроме свойства "beep", а такой тип props мы уже определили в типе
"PropsOfWhatIsReturnedFromHOC1Type".*/
type WhatIsReturnedFromHOC1Type = ComponentType<PropsOfWhatIsReturnedFromHOC1Type>;

/*Отдельно создаем тип для props компонентов, которые возвращаются из HOC "HOC2()". Используем для того, чтобы
типизировать компоненты, который возвращаются из HOC "HOC2()" дальше.*/
type PropsOfWhatIsReturnedFromHOC2Type = Omit<PropsOfWhatIsReturnedFromHOC1Type, 'bop'>;

/*Создаем тип для компонентов, которые возвращается из HOC "HOC2()". Там возвращаются компоненты со всеми props, что
ожидались в типе props того компонента, который возвращается из HOC "HOC1()", кроме свойства "bop", а такой тип props мы
уже определили в типе "PropsOfWhatIsReturnedFromHOC2Type".*/
type WhatIsReturnedFromHOC2Type = ComponentType<PropsOfWhatIsReturnedFromHOC2Type>;

/*При помощи функции "compose()" из библиотеки Redux объединяем в одном месте то, что делают HOC "HOC1()" и HOC
"HOC2()". Результат работы этой функции "compose()" сохраняем в HOC "SuperHOC()".

Наш компонент "C2" на входе ждет три свойства "title", "beep" и "bop".
HOC "HOC1()" позаботится о передаче свойства "beep" в компонент "C2".
HOC "HOC2()" позаботится о передаче свойства "bop" в "HOC1" и, соответственно, в компонент "C2".
Свойство "title" попадает в компонент "C2" уже извне, то есть через атрибут (например, "title={'boop'}").

Первым параметром в уточнении типов должны указать то, что возвращает HOC "HOC1()", то есть тип
"WhatIsReturnedFromHOC1Type", который мы создали выше.

Вторым параметром в уточнении типов должны указать, что принимает HOC "HOC1()", то есть тип компонента "C1" со своим
типом props - "ComponentType<C1PropsType>".

Третьим параметром в уточнении типов должны указать то, что возвращает HOC "HOC2()", то есть тип
"WhatIsReturnedFromHOC2Type", который мы создали выше.

То есть функция "compose()" принимает типы в обратном порядке переданных внутрь HOC-ов.

Эти уточнения мы нашли в файле декларации "compose()" (конкретно в описании "compose" с двумя функциями).*/
const SuperHOC = compose<
    /*Это "A" из файла декларации функции "compose()".*/
    WhatIsReturnedFromHOC1Type,
    /*Это "T1" из файла декларации функции "compose()".*/
    ComponentType<C1PropsType>,
    /*Это "R" из файла декларации функции "compose()".*/
    WhatIsReturnedFromHOC2Type
>(
    HOC2,
    HOC1
);

/*Передаем компонент "C2" в HOC "SuperHOC()" и получаем контейнерный компонент "C2Container".*/
const C2Container = SuperHOC(C2);

/*Создаем компонент "App3", в который передаем контейнерный компонент "C2Container". Компонент "App3" это аналог
компонента "App2" с использованием функции "compose()" для объединения работы HOC "HOC1()" и HOC "HOC2()".*/
const App3 = () => {
    /*Здесь все работает так же как и в компоненте "App2" выше.*/
    return <C2Container title={'boop'}/>;
};

/*--------------------------------------------------------------------------------------------------------------------*/

/*Создаем тип для props для компонента "C3".*/
type C3PropsType = {
    title: string
    age: number
};

/*Создаем отдельный тип для объекта "params" из объекта "match" из HOC "withRouter()" из библиотеки React Router DOM.
Указываем string, так как все, что находится в этом объекте "params", является строкой, так устроен HOC
"withRouter()".*/
type C3ParamsTypes = {
    userID: string
};

/*Создаем функцию "mapStateToProps()" для использования функции "connect()" из библиотеки React Redux ниже.*/
const mapStateToProps = (state: any) => {
    return {
        beep: 256,
        bop: 512
    }
};

/*Создаем тип для того, что возвращает функция "mapStateToProps()".*/
type MapStateToPropsType = {
    beep: number
    bop: number
};

/*Создаем тип для всего компонента "C3". Здесь используются:
1. Тип собственных props компонента "C3" - тип "C3PropsType".
2. Тип того, что возвращает функция "mapStateToProps()" для функции "connect()" - тип "MapStateToPropsType".
3. Тип "RouteComponentProps" из библиотеки React Router Dom. Этот тип мы указываем, так как по нашей задумке компонент
"C3" хочет получить объект "match" из HOC "withRouter()". "RouteComponentProps" это тип для отдельного вида props из HOC
"withRouter()". В этом типе "RouteComponentProps" мы уточняем какие свойства объекта "params" из объекта "match" из HOC
"withRouter()" должны содержаться внутри при помощи типа "C3ParamsTypes", который создаем выше.*/
type C3Type = React.FC<C3PropsType & MapStateToPropsType & RouteComponentProps<C3ParamsTypes>>;

/*Создаем простой функциональный компонент "C3", указав его тип как "C3Type", который мы создаем выше. */
const C3: C3Type = (props) => {
    /*Благодаря типизации можем здесь обратиться к объекту "match" из HOC "withRouter()".*/
    console.log(props.match.params.userID);

    return <div>
        {props.title}
    </div>;
};

/*Оборачиваем компонент "C3" функцией "connect()", чтобы передать этому компоненту то, что возвращается функцией
"mapStateToProps()", что в свою очередь содержат свойства "beep" и "bop".*/
const C3ConnectContainer = connect(mapStateToProps)(C3);

/*Оборачиваем компонент "C3ConnectContainer" HOC-ом "withRouter()", чтобы передать этому компоненту, а соответственно и
компоненту "C3", объект "match" из HOC "withRouter()".*/
const C3ConnectAndWithRouterContainer = withRouter(C3ConnectContainer);

/*Объединяем работу функции "connect()" и HOC "withRouter()" функцией "compose()", создав тем самым аналог работы двух
контейнерных компонентов "C3ConnectContainer" и "C3ConnectAndWithRouterContainer" выше.

Здесь, в отличие от HOC "SuperHOC" выше, мы уточняем тип только одним параметром, так как согласно файлу декларации
функции "compose()" (раздел "rest"), нам нужно уточнить только такой компонент, свойства props которого не передаются в
этот компонент функциями, переданными внутрь функции "compose()", то есть функцией "connect()" и HOC "withRouter()", а
это свойства "title" и "age", которые уже указаны в типе "C3PropsType".

Если бы мы хотели добавить сюда еще, например, HOC "HOC1()", то нужно было бы перенести свойство "beep" из того, что
возвращает функция "mapStateToProps()" в компонент "C3" (не забыв про изменения соответствующих типов), а в уточнении
типов функции "compose()" нужно было бы вместо "C3PropsType" написать "Omit<C3PropsType, 'beep'>", следуя логике работы
HOC "HOC1()" и HOC "SuperHOC()".*/
const C3ComposeContainer = compose<ComponentType<C3PropsType>>(
    withRouter,
    connect(mapStateToProps)
)(C3);

/*Создаем компонент "App4", в который передаем контейнерный компонент "C3ComposeContainer". Здесь в итоге мы передаем в
компонент "C3" свойства "title" и "age" как атрибуты, свойства "beep" и "bop" при помощи функции "connect()", и объект
"match" (это внутренний объект HOC-a "WithRouter()" с различным параметрами "params", смотри файл
"ProfileContainer.tsx") при помощи HOC "WithRouter()". Работу функции "connect()" и HOC "withRouter()" мы объединяем при
помощи функции "compose()" выше.*/
const App4 = () => {
    return <C3ComposeContainer title={'boop'} age={69}/>;
};

/*--------------------------------------------------------------------------------------------------------------------*/

/*Дополнительно:

1. По поводу конструкции {...props as WP} в HOC: это вроде баг Typescript.
Note: A type cast (props as P) is required here from TypeScript v3.2 onwards, due to a likely bug in TypeScript.
Источник: https://medium.com/@jrwebdev/react-higher-order-component-patterns-in-typescript-42278f7590fb.
Ссылка GitHub на issue: https://github.com/Microsoft/TypeScript/issues/28938.

2. Возможно, при уточнении типа в функции "compose()" будет хватать просто "<ComponentType>".*/