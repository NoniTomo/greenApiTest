import axios from 'axios'

export const instance = axios.create({})

// получение состояния инстанса
// {{apiUrl}}/waInstance{{idInstance}}/getStateInstance/{{apiTokenInstance}}

// Получение уведомлений
// {{apiUrl}}/waInstance{{idInstance}}/receiveNotification/{{apiTokenInstance}}?receiveTimeout=5

// Удаление уведомлений
// {{apiUrl}}/waInstance{{idInstance}}/deleteNotification/{{apiTokenInstance}}/{{receiptId}}

// Отправка запроса
// {{apiUrl}}/waInstance{{idInstance}}/sendMessage/{{apiTokenInstance}}
