import SendIcon from '@/assets/icons/send.svg?react'

import { Button, TextField } from '@/shared/components'
import { useChatComponent } from './hooks/useChat'

export const Chat = () => {
  const { state, functions } = useChatComponent()

  return (
    <div className="flex flex-col w-screen h-screen">
      <div className="w-full h-full overflow-auto flex flex-col-reverse gap-3 p-5">
        {state.messages.map((message) => (
          <div
            key={message.idMessage}
            className={`w-full flex ${message.sender !== state.userContext.value?.phone ? 'justify-start ' : 'justify-end sm:justify-start'}`}
          >
            <div
              className={`h-max static p-2 rounded-xl max-w-[80%] sm:max-w-sm text-balance ${message.sender !== state.userContext.value?.phone ? 'bg-green-300 ' : 'bg-blue-300'}`}
            >
              <p>{message.message}</p>
            </div>
          </div>
        ))}
      </div>
      <form
        className="w-full h-min flex flex-nowrap gap-5 p-5 border-t-2 border-solid border-secondary"
        onSubmit={state.form.handleSubmit(functions.onSubmit)}
      >
        <TextField
          className="w-full"
          register={state.form.register('message', {
            required: 'required'
          })}
          id="apiUrl"
          isDisabled={false}
          isRequired={true}
        />
        <Button
          type="submit"
          variant="outline"
          disabled={!state.form.watch('message').length}
          className="h-full rounded-full flex items-center justify-center"
        >
          <SendIcon />
        </Button>
      </form>
    </div>
  )
}
