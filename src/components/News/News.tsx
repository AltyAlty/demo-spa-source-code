import React from 'react';
import styles from './News.module.css';

type PropsType = {};

/*"News" это функциональный компонент, который создан в виде стрелочной функции. "News" является компонентом, который
отображает новости пользователя.

Компонент "News" импортируется в файле "App.tsx".*/
export const News: React.FC<PropsType> = (props) => {
    return (
        <div>
            News
        </div>
    );
};