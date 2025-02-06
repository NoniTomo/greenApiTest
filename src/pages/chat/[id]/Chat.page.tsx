import SendIcon from '@/assets/icons/send.svg?react'

import { Button, TextField } from '@/shared/components'
import { useChat } from './hooks/useChat'
import clsx from 'clsx'

export const Chat = () => {
  const { state, functions } = useChat()

  return (
    <div className="flex flex-col w-full justify-center h-screen">
      <header className="p-5 flex gap-2 border-b-[1px]">
        <p className="my-auto text-lg">{state.chat.phone}</p>
      </header>
      <div className="w-full h-full overflow-auto flex flex-col justify-end gap-3 p-5 bg-[url('/public/images/chatBackground.png')] bg-no-repeat bg-cover">
        {state.messages.map((message) => (
          <div
            key={message.idMessage}
            className={clsx(
              'w-full flex',
              message.sender !== state.user?.sender ? 'justify-start ' : 'justify-end sm:justify-start'
            )}
          >
            <div
              className={clsx(
                'h-max static p-2 rounded-xl max-w-[80%] sm:max-w-sm text-balance',
                message.sender === state.user?.sender ? 'bg-green-300 ' : 'bg-blue-300'
              )}
            >
              <p>{message.message}</p>
            </div>
          </div>
        ))}
      </div>
      <form
        className="w-full h-min flex flex-nowrap gap-5 p-5 border-t-2"
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
          classNameInput="bg-zinc-700 text-background"
        />
        <Button
          type="submit"
          disabled={!state.form.formState.isDirty}
          className="h-full bg-transparent w-10"
        >
          <SendIcon className="scale-[2]" />
        </Button>
      </form>
    </div>
  )
}
