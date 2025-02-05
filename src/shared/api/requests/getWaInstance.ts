import { instance } from '@/shared/api/instance'

export interface GetWaInstanceParams {
  apiUrl: string
  idInstance: string
  apiTokenInstance: string
}

export type GetWaInstanceRequestConfig = RequestConfig<GetWaInstanceParams>

export async function getWaInstance({ params, config }: GetWaInstanceRequestConfig) {
  return instance.get<GetWaInstanceResponse>(
    `${params.apiUrl}/waInstance${params.idInstance}/getWaSettings/${params.apiTokenInstance}`,
    config
  )
}
