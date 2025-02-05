// Удаление уведомлений
// {{apiUrl}}/waInstance{{idInstance}}/deleteNotification/{{apiTokenInstance}}/{{receiptId}}

import { instance } from '@/shared/api/instance'

export interface DeleteNotificationParams {
  apiUrl: string
  idInstance: string
  apiTokenInstance: string
  receiptId: number
}

export type DeleteNotificationRequestConfig = RequestConfig<DeleteNotificationParams>

export async function deleteNotification({ params, config }: DeleteNotificationRequestConfig) {
  return instance.delete<GetStateInstanceResponse>(
    `${params.apiUrl}/waInstance${params.idInstance}/deleteNotification/${params.apiTokenInstance}/${params.receiptId}`,
    config
  )
}
