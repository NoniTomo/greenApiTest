import { instance } from './instance'
import { interceptor } from './interceptor'

instance.interceptors.request.use(interceptor)

export * from './hooks'
export * from './requests'
