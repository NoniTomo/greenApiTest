import type { GetReceiveNotificationParams } from '../requests'

import { useQuery } from '@tanstack/react-query'
import { getReceiveNotification } from '../requests'

export function useGetReceiveNotificationQuery(
  params: GetReceiveNotificationParams,
  settings?: QuerySettings<typeof getReceiveNotification>
) {
  return useQuery({
    queryKey: ['getStateInstance', params],
    queryFn: () => getReceiveNotification({ params, config: settings?.config }),
    ...settings?.options
  })
}
