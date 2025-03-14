import React from 'react';
/*Импортируем компонент "Chat".*/
import {Chat} from './Chat/Chat';
/*Импортируем созданный нами HOC "withAuthRedirect()".*/
import {withAuthRedirect} from '../../hoc/WithAuthRedirect';

/*"ChatPage" это функциональный компонент, который создан в виде стрелочной функции. "ChatPage" является компонентом,
который собирает компоненты для реализации чата в нашем приложении.

Внутри компонента "ChatPage" используются следующие компоненты:
1. "Chat" - компонент, который содержит в себе компоненты, отвечающие за вывод сообщений из чата и формы для добавления
сообщения в чат. Импортирован.

Компонент "ChatPage" оборачивается HOC-ом "withAuthRedirect()" в этом же файле.*/
const ChatPage: React.FC = () => {
    return (
        <div>
            {/*Отрисовываем компонент "Chat".*/}
            <Chat/>
        </div>
    )
};

/*При помощи HOC "withAuthRedirect()" оборачиваем компонент "ChatPage" и добавляем ему логику по редиректу.

Этот компонент экспортируется по default и используется в нашем приложении под именем "ChatPage". Компонент
"ChatPage" импортируется в файле "App.tsx".*/
export default withAuthRedirect(ChatPage);