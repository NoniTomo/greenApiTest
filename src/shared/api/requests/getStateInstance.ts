// получение состояния инстанса
// {{apiUrl}}/waInstance{{idInstance}}/getStateInstance/{{apiTokenInstance}}

import { instance } from '@/shared/api/instance'

export interface GetStateInstanceParams {
  apiUrl: string
  idInstance: string
  apiTokenInstance: string
}

export type GetStateInstanceRequestConfig = RequestConfig<GetStateInstanceParams>

export async function getStateInstance({ params, config }: GetStateInstanceRequestConfig) {
  return instance.get<GetStateInstanceResponse>(
    `${params.apiUrl}/waInstance${params.idInstance}/getStateInstance/${params.apiTokenInstance}`,
    config
  )
}
