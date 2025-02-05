import { getWaInstance } from '../requests'

import type { GetWaInstanceRequestConfig } from '../requests'

import { useMutation } from '@tanstack/react-query'

export function useGetWaInstanceMutation(
  settings?: MutationSettings<GetWaInstanceRequestConfig, typeof getWaInstance>
) {
  return useMutation({
    mutationKey: ['getWaInstance'],
    mutationFn: (params) =>
      getWaInstance({ params: { ...params?.params }, config: { ...params?.config } }),
    ...settings?.options
  })
}
