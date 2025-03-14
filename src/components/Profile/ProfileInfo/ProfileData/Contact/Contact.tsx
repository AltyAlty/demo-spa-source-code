import React from 'react';
import styles from '../../ProfileInfo.module.css';

/*Создаем тип для props компонента "ContactPropsType".*/
type ContactPropsType = {
    /*Текст заголовка контакта должен быть строкой.*/
    contactTitle: string
    /*Значение контакта должен быть строкой.*/
    contactValue: string
};

/*"Contact" это функциональный компонент, который создан в виде стрелочной функции. "Contact" является компонентом,
который содержит заготовку для полей контактов пользователя, используемых в маппинге для отрисовки однотипного JSX.

Компонент "Contact" импортируется в файле "ProfileData.tsx".

При помощи деструктуризации props указываем какие именно props мы получаем:
1. "contactTitle" - текст заголовка контакта.
2. "contactValue" - значение контакта.*/
export const Contact: React.FC<ContactPropsType> = ({contactTitle, contactValue}) => {
    /*Внутри этого элемента "div" будет следующее отображение:
    "Текст заголовка поля контакта": "Текст со значением самого контакта".*/
    return <div className={styles.contact}><b>{contactTitle}</b>: {contactValue}</div>
};