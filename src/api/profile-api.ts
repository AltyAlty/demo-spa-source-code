/*
Этот файл специально создан, чтобы в одном месте описать все AJAX-запросы на сервер, касающиеся страницы профиля, чтобы
компоненты не создавали "side effects" такого типа. Этот файл отвечает за "DAL" - "Data Access Layer".
*/

import {instance, ResponseWithDataType} from './api'; /*Импортируем "instance" для более быстрого создания запросов.
Также импортируем "ResultCodeEnum" - список кодов ответа от сервера, которые используются в TC "getAuthUserData" и в TC
"login" в "auth-reducer.ts", для осуществления типизации. В добавок импортируем общий тип "ResponseWithDataType" для
некоторых ответов от сервера со схожей структурой ответа.*/

import {PhotosType, ProfileType} from '../types/types'; /*Подключаем типы.*/


type SaveUserPhotoResponseDataType = { /*Создали отдельный тип для "data" для запроса "saveUserPhoto" из "profileAPI".
Используется для уточнения в типе "ResponseType". Этот объект "data" должен содержать информацию о фото пользователя.*/
    photos: PhotosType /*Объект с фото пользователя должно быть типа "PhotosType", который мы создали ниже.*/
    small: string | null /*Путь к уменьшенной версии фото пользователя должен быть строкой или "null" (то есть
        быть пустым). Это свойство видимо добавлено на сервере ошибочно, так как дублирует часть объекта "photos".*/
    large: string | null /*Путь к увеличенной версии фото пользователя должен быть строкой или "null" (то есть
        быть пустым). Это свойство видимо добавлено на сервере ошибочно, так как дублирует часть объекта "photos".*/
};


export const profileAPI = { /*"usersAPI" содержит запросы, связанные со страницей профиля пользователя.*/
    getUserProfile(userID: number) { /*Эта функция является запросом на получение данных профиля пользователя для
    страницы профиля. Данная функция принимает один параметр в виде "ID" пользователя, который должен быть числом.*/
        return (
            instance.get<ProfileType>(`profile/${userID}`) /*Указываем, что добавляем к базовому URL, указанному в
            "instance", чтобы получить данные профиля пользователя. Указали, что этот запрос "GET" возвращает промис с
            типом "ProfileType", который был создан нами и импортирован сюда.*/
                .then(response => { /*"then" создает "promise". Какие-то данные придут от сервера и выполниться
                стрелочная функция "response". Данные придут от сервера и будут находиться внутри "response.data". Эта
                "data" создается самим запросом и туда помещается информация от сервера. Сама же структура данных в
                "data" определяется сервером. Согласно API сервера там находятся:
                    "aboutMe" - информация "обо мне" (на сайте API этого нет, но на самом деле на сервере это поле
                    имеется).
                    "contacts": - контакты.
                        "github"
                        "vk"
                        "facebook"
                        "instagram"
                        "twitter"
                        "website"
                        "youtube"
                        "mainLink".
                    "fullName" - полное имя.
                    "lookingForAJob" - ищет ли работу.
                    "lookingForAJobDescription" - какую ищет работу.
                    "photos": - фото.
                        "small"
                        "large".
                    "userId" - "ID" пользователя.*/
                    return response.data; /*Затем получив ответ от сервера в виде нужных данных, возвращаем их далее,
                    чтобы установить их в наш "state" при помощи TC "getUserProfile" в "profile-reducer.ts".*/
                })
        );
    },

    getUserStatus(userID: number) { /*Эта функция является запросом на получение данных статуса пользователя для
    страницы профиля. Данная функция принимает один параметр в виде "ID" пользователя, который должен быть числом.*/
        return (
            instance.get<string>(`profile/status/${userID}`) /*Указываем, что добавляем к базовому URL, указанному
            в "instance", чтобы получить данные статуса пользователя. Указали, что этот запрос "GET" возвращает промис
            с типом строки.*/
                .then(response => { /*"then" создает "promise". Какие-то данные придут от сервера и выполниться
                стрелочная функция "response". Данные придут от сервера и будут находиться внутри "response.data". Эта
                "data" создается самим запросом и туда помещается информация от сервера. Сама же структура данных в
                "data" определяется сервером. Согласно API сервера там находится текст статуса пользователя (хотя было
                бы лучше, чтобы данные приходили в формате JSON, то есть в данном случае не возвращается объект со
                свойствами, как это происходит в других запросах).*/
                    return response.data; /*Затем получив ответ от сервера в виде нужных данных, возвращаем их далее,
                    чтобы установить их в наш "state" при помощи TC "getUserStatus" в "profile-reducer.ts".*/
                })
        );
    },

    updateUserStatus(status: string) { /*Эта функция является запросом на изменение данных статуса пользователя для
    страницы профиля на сервере. Данная функция принимает один параметр в виде строки с информацией из статуса.
    Согласно API сервера максимальная длинна статуса 300 символов в формате JSON.*/
        return (
            instance.put<ResponseWithDataType>(`profile/status`, {status: status}) /*Указываем, что добавляем
            к базовому URL, указанному в "instance", чтобы отправить на сервер новые данные статуса пользователя.
            А также указываем объект с этими данными. Указали, что этот запрос "PUT" возвращает промис с типом
            "ResponseWithDataType".*/
                .then(response => {/*"then" создает "promise". Какие-то данные придут от сервера и выполниться
                стрелочная функция "response". В ответ на этот запрос к нам придут данные, которые будут находиться
                внутри "response.data". Эта "data" создается самим запросом и туда помещается информация от сервера.
                Сама же структура данных в "data" определяется сервером. Согласно API сервера там находятся:
                    - "resultCode" - код, означающий успешно ли прошло изменение статуса пользователя, "0" - все хорошо,
                    "1" - какая-то ошибка.
                    - "messages" - массив с информационными сообщениями от сервера (например, при какой-либо ошибке во
                    время обновления статуса пользователя).
                    - "data" - какие-то дополнительные данные (в данный момент не используется).*/
                    return response.data; /*Затем получив ответ от сервера в виде нужных данных, возвращаем их далее,
                    чтобы установить их в наш "state" при помощи TC "updateUserStatus" в "profile-reducer.ts".*/
                })
        );
    },

    saveUserPhoto(photoFile: File) { /*Эта функция является запросом на загрузку фото пользователя на сервер. Данная
    функция принимает один параметр в виде файла. Тип этого файла указан как "File" из "TypeScript".*/
        const formData = new FormData();
        formData.append('image', photoFile); /*Поскольку здесь мы передаем не просто JSON-данные, а изображение,
        то поэтому формируем специальный объект при помощи "FormData()". При помощи метода "append" добавляем в этот
        объект файл с фото. "image" - так указывается согласно API сервера. Третьим параметром отправляется объект
        со специфическими заголовками, но в данном случае и без них все работает.*/
        return (
            instance.put<ResponseWithDataType<SaveUserPhotoResponseDataType>>
            (`profile/photo`, formData/*, {headers: {'Content-Type': 'multipart/form-data'}}*/) /*Указываем, что
            добавляем к базовому URL, указанному в "instance", чтобы отправить на сервер фото пользователя. А также
            указываем объект с этим фото. Указали, что этот запрос "PUT" возвращает промис с типом
            "ResponseWithDataType<SaveUserPhotoResponseDataType>".*/
                .then(response => { /*"then" создает "promise". Какие-то данные придут от сервера и выполниться
                стрелочная функция "response". В ответ на этот запрос к нам придут данные, которые будут находиться
                внутри "response.data". Эта "data" создается самим запросом и туда помещается информация от сервера.
                Сама же структура данных в "data" определяется сервером. Согласно API сервера там находятся:
                    - "resultCode" - код, означающий успешно ли прошла загрузка фото пользователя, "0" - все хорошо,
                    другие числа - какая-то ошибка.
                    - "messages" - массив с информационными сообщениями от сервера (например, при какой-либо ошибке во
                    время загрузки фото).
                    - "data" - дополнительные данные, в которых содержится еще один объект "photos", который в свою
                    очередь имеет еще два свойства:
                        1) "small" - URL фото в маленьком размере, если отсутствует, то будет "NULL".
                        2) "large" - URL фото в большом размере, если отсутствует, то будет "NULL".
                    Помимо наличия объекта "photos", "data" имеет также свои свойства "small" и "large", копирующие
                    аналогичные свойства у объекта "photos". Предположительно это ошибочно добавили на сервере.*/
                    return response.data; /*Затем получив ответ от сервера в виде нужных данных, возвращаем их далее,
                    чтобы установить их в наш "state" при помощи TC "saveUserPhoto" в "profile-reducer.ts".*/
                })
        );
    },

    saveProfile(profile: ProfileType) { /*Эта функция является запросом на отправку новых данных профиля пользователя
    на сервер. Данная функция принимает один параметр в виде объекта с данными типа "ProfileType", который создан был
    нами и импортирован сюда. Согласно API сервера в этом объекте должно находится следующее:
            "aboutMe" - информация "обо мне" (на сайте API этого нет, но на самом деле на сервере это поле имеется).
            "contacts": - контакты.
                "github"
                "vk"
                "facebook"
                "instagram"
                "twitter"
                "website"
                "youtube"
                "mainLink".
            "fullName" - полное имя.
            "lookingForAJob" - ищет ли работу.
            "lookingForAJobDescription" - какую ищет работу.
            "photos": - фото.
                "small"
                "large".
            "userId" - "ID" пользователя.*/
        return (
            instance.put<ResponseWithDataType>(`profile`, profile) /*Указываем, что добавляем к базовому URL,
            указанному в "instance", чтобы отправить на сервер новые данные профиля пользователя. А также указываем
            объект с этими данными. Указали, что этот запрос "PUT" возвращает промис с типом "ResponseWithDataType".*/
                .then(response => {/*"then" создает "promise". Какие-то данные придут от сервера и выполниться
                стрелочная функция "response". В ответ на этот запрос к нам придут данные, которые будут находиться
                внутри "response.data". Эта "data" создается самим запросом и туда помещается информация от сервера.
                Сама же структура данных в "data" определяется сервером. Согласно API сервера там находятся:
                    - "resultCode" - код, означающий успешно ли прошла отправка новых данных профиля пользователя, "0" -
                    все хорошо, другие числа - какая-то ошибка.
                    - "messages" - массив с информационными сообщениями от сервера (например, при какой-либо ошибке во
                    время отправки новых данных профиля пользователя).
                    - "data" - какие-то дополнительные данные (в данный момент не используется).*/
                    return response.data; /*Затем получив ответ от сервера в виде нужных данных, возвращаем их далее,
                    чтобы установить их в наш "state" при помощи TC "saveProfile" в "profile-reducer.ts".*/
                })
        );
    }
};