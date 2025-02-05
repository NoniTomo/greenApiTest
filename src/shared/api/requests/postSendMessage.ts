// Отправка запроса
// {{apiUrl}}/waInstance{{idInstance}}/sendMessage/{{apiTokenInstance}}

import { instance } from '../instance'

export type PostSendMessageParams = {
  apiUrl: string
  idInstance: string
  apiTokenInstance: string
} & SendMessageRequest

export type PostSendMessageRequestConfig = RequestConfig<PostSendMessageParams>

export async function postSendMessage({ params, config }: PostSendMessageRequestConfig) {
  const { apiUrl, idInstance, apiTokenInstance, ...otherParams } = params
  return instance.post<SendMessageResponse>(
    `${apiUrl}/waInstance${idInstance}/sendMessage/${apiTokenInstance}`,
    otherParams,
    config
  )
}
