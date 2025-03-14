import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
/*Импортируем TC "sendChatMessage()".*/
import {sendChatMessage} from '../../../../redux/chat-reducer';
/*Импортируем селектор "getWSStatus()".*/
import {getWSStatus} from '../../../../redux/chat-selectors';

/*"AddChatMessageForm" это функциональный компонент, который создан в виде стрелочной функции. "AddChatMessageForm"
является компонентом, который отвечает за отображение формы для добавления сообщения в чат.

Компонент "AddChatMessageForm" импортируется в файле "Chat.tsx".*/
export const AddChatMessageForm: React.FC = () => {
    /*При помощи деструктуризирующего присваивания создали две переменные. Первая переменная будет хранить первый
    элемент из хука "useState()", этот элемент будет означать введенный текст сообщения для чата (изначально пустой).
    Вторая переменная будет хранить функцию из хука "useState()", которая будет изменять первый элемент (то есть
    указывать текст сообщения для чата).*/
    const [chatMessage, setChatMessage] = useState('');
    /*При помощи хука "useSelector()", передав в него селектор "getWSStatus()", получаем статус готовности
    WebSocket-канала для отправки информации по нему.*/
    const WSStatus = useSelector(getWSStatus);
    const dispatch = useDispatch();

    /*Создаем специальную callback-функцию "addChatMessage()", которая будет вызываться при нажатии на кнопку для
    отправки сообщения в чат, проверять есть ли введенный текст, и если есть, то будет отправлять этот текст в
    WebSocket-канал (если таковой имеется) при помощи TC "sendChatMessage()", а после отправки будет занулять введенный
    текст сообщения в форме.*/
    const addChatMessage = () => {
        if (!chatMessage) return;
        dispatch(sendChatMessage(chatMessage));
        setChatMessage('');
    };

    return (
        <div>
            <div>
                {/*Отрисовываем элемент "textarea" для ввода текста сообщения для чата.*/}
                <textarea
                    placeholder={'Enter your message'}
                    /*При изменении этого поля будет вызываться функция "setChatMessage()" из хука "useState()" выше для
                    получения введенного текста в поле.*/
                    onChange={(e) => setChatMessage(e.currentTarget.value)}
                    /*Используя атрибут "value", указываем, что в этом поле отображается текст, введенный нами и
                    прошедший через FLUX-круговорот, благодаря хуку "useState()" (то есть текст в поле меняется в ответ
                    на изменения переменной "chatMessage", меняющейся функцией "setChatMessage()", которая в свою
                    очередь вызывается каждый раз, когда мы что-то меняем в поле для ввода текста).*/
                    value={chatMessage}>
                </textarea>
            </div>

            <div>
                {/*Отрисовываем элемент "button". При нажатии на кнопку будет срабатывать функция "addChatMessage()",
                которую мы создали выше, с целью отправки введенного сообщения в WebSocket-канал, и для дальнейшей
                очистки этого текста сообщения после отправки этого сообщения. Также поскольку есть вероятность того,
                что мы попробуем отправить сообщение раньше, чем установится WebSocket-канал, то мы отключаем кнопку на
                случай если этот канал еще не в готовом состоянии для отправки информации по нему.*/}
                <button onClick={addChatMessage} disabled={WSStatus !== 'ready'}>
                    Send
                </button>
            </div>
        </div>
    )
};