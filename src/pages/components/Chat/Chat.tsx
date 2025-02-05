import SendIcon from '@/assets/icons/send.svg'

import { Button, TextField } from '@/shared/components'
import { useChatComponent } from './hooks/useChat'

export const Chat = () => {
  const { state, functions } = useChatComponent()

  return (
    <div className="flex flex-col justify-center w-screen h-screen">
      <header className="p-5 flex gap-2 text-xl bg-[#1a2329] text-background">
        <div className="h-8 w-8 rounded-full bg-white" />
        <p>{state.chatContext.value?.phone}</p>
      </header>
      <div className="w-full h-full overflow-auto flex flex-col-reverse gap-3 p-5 bg-[url('/public/images/chatBackground.png')] bg-no-repeat bg-cover">
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
        className="w-full h-min flex flex-nowrap gap-5 p-5 border-t-2 border-solid border-secondary bg-[#1a2329]"
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
          classNameInput="bg-zinc-700"
        />
        <Button
          type="submit"
          disabled={!state.form.formState.isDirty}
          className="h-full rounded-full flex items-center justify-center bg-transparent text-background m-0 p-0"
        >
          <SendIcon />
        </Button>
      </form>
    </div>
  )
}
