import React from 'react';
import styles from './Music.module.css';

type PropsType = {};

/*"Music" это функциональный компонент, который создан в виде стрелочной функции. "Music" является компонентом, который
отображает музыку пользователя.

Компонент "Music" импортируется в файле "App.tsx".*/
export const Music: React.FC<PropsType> = (props) => {
    return (
        <div>
            Music
        </div>
    );
};