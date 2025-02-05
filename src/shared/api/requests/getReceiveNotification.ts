// Получение уведомлений
// {{apiUrl}}/waInstance{{idInstance}}/receiveNotification/{{apiTokenInstance}}?receiveTimeout=5

import { instance } from '@/shared/api/instance'

export interface GetReceiveNotificationParams {
  apiUrl: string
  idInstance: string
  apiTokenInstance: string
  receiveTimeout: number
}

export type GetReceiveNotificationRequestConfig = RequestConfig<GetReceiveNotificationParams>

export async function getReceiveNotification(params?: GetReceiveNotificationRequestConfig) {
  return instance.get<GetReceiveNotificationResponse>(
    `${params?.params.apiUrl}/waInstance${params?.params.idInstance}/receiveNotification/${params?.params.apiTokenInstance}?receiveTimeout=${params?.params.receiveTimeout}`,
    params?.config
  )
}
