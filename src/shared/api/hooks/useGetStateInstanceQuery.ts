import { useQuery } from '@tanstack/react-query'

import { getStateInstance, GetStateInstanceParams } from '../requests'

export function useGetStateInstanceQuery(
  params: GetStateInstanceParams,
  settings?: QuerySettings<typeof getStateInstance>
) {
  return useQuery({
    queryKey: ['getStateInstance', params],
    queryFn: () => getStateInstance({ params, config: settings?.config }),
    ...settings?.options
  })
}
