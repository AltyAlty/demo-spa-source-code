import React from 'react';
import styles from './Friends.module.css';

type PropsType = {};

/*"Friends" это функциональный компонент, который создан в виде стрелочной функции. "Friends" является компонентом,
который отображает друзей пользователя. Но в данный момент этот компонент используется для рассмотрения работы хука
"useState()" из React.

Компонент "Friends" импортируется в файле "App.tsx".*/
export const Friends: React.FC<PropsType> = (props) => {
    return (
        <div>
            Friends
        </div>
    );
};