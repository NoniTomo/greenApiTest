import { useMutation } from '@tanstack/react-query'
import { postSendMessage, PostSendMessageRequestConfig } from '../requests'

export const usePostSendMessageMutation = (
  settings?: MutationSettings<PostSendMessageRequestConfig, typeof postSendMessage>
) =>
  useMutation({
    mutationKey: ['postSendMessage'],
    mutationFn: ({ params, config }) =>
      postSendMessage({ params, config: { ...settings?.config, ...config } }),
    ...settings?.options
  })
