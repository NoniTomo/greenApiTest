import type { DeleteNotificationRequestConfig } from '../requests'

import { useMutation } from '@tanstack/react-query'
import { deleteNotification } from '../requests'

export function useDeleteNotificationMutation(
  settings?: MutationSettings<DeleteNotificationRequestConfig, typeof deleteNotification>
) {
  return useMutation({
    mutationKey: ['deleteNotification'],
    mutationFn: (params) =>
      deleteNotification({ params: { ...params?.params }, config: { ...params?.config } }),
    ...settings?.options
  })
}
