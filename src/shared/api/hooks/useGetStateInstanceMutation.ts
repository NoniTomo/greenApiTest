import { getStateInstance } from '../requests'

import type { GetStateInstanceRequestConfig } from '../requests'

import { useMutation } from '@tanstack/react-query'

export function useGetStateInstanceMutation(
  settings?: MutationSettings<GetStateInstanceRequestConfig, typeof getStateInstance>
) {
  return useMutation({
    mutationKey: ['getStateInstance'],
    mutationFn: (params) =>
      getStateInstance({ params: { ...params?.params }, config: { ...params?.config } }),
    ...settings?.options
  })
}
