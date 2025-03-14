import React from 'react';
/*Импортируем стили из CSS-модуля.*/
import styles from './Preloader.module.css';
/*Импортируем из ассетов анимированное изображение, изображающее загрузку.*/
import preloader from '../../../assets/images/preloader.gif';

/*Создаем тип для props.*/
type PropsType = {};

/*"Preloader" это функциональный компонент, который создан в виде стрелочной функции. "Preloader" является
компонентом-заглушкой, который используется, чтобы воспроизводить анимацию загрузки в других компонентах, пока идет
какой-то фоновой процесс (например, AJAX-запрос).

Компонент "Preloader" импортируется в файлах "App.tsx", "ProfileInfo.tsx", "Users.tsx", "SearchUsersAreaResults.tsx",
"UserInfo.tsx" и "WithSuspense.tsx".

При взаимодействии с функциональным компонентом React не хранит его постоянно в памяти. React вызывает функциональный
компонент, компонент делает свою работу (например, возвращает JSX), после чего компонент удаляется из памяти.
Функциональный компонент можно создать еще и таким образом: function Preloader(props) {тело}.

Указываем при помощи "React.FC<>", что props в этом функциональном компоненте имеют тип "PropsType". Также указываем,
что экспортируем этот компонент не по default.*/
export const Preloader: React.FC<PropsType> = (props) => {
    return (
        <div className={styles.preloader}>
            {/*Отрисовываем элемент "img" с изображением анимации загрузки.*/}
            <img alt='' src={preloader}/>
        </div>
    )
};