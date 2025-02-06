import { Button, TextField } from '@/shared/components'
import { useAddTokens } from './hooks/useAddTokens'

export const AddTokens = () => {
  const { state, functions } = useAddTokens()

  return (
    <>
      <form className="flex flex-col gap-5" onSubmit={state.form.handleSubmit(functions.onSubmit)}>
        <TextField
          id="apiUrl"
          register={state.form.register('apiUrl', {
            required: 'Поле  обязательное!'
          })}
          label="API url"
          error={state.form.formState.errors.apiUrl?.message}
          isDisabled={false}
          isRequired={true}
          classNameInput="bg-zinc-700 "
        />
        <TextField
          id="idInstance"
          register={state.form.register('idInstance', {
            required: 'Поле  обязательное!'
          })}
          label="ID Instance"
          error={state.form.formState.errors.idInstance?.message}
          isDisabled={false}
          isRequired={true}
          classNameInput="bg-zinc-700"
          type="password"
        />
        <TextField
          id="apiTokenInstance"
          register={state.form.register('apiTokenInstance', {
            required: 'Поле  обязательное!'
          })}
          label="API Token Instance"
          error={state.form.formState.errors.apiTokenInstance?.message}
          isDisabled={false}
          isRequired={true}
          classNameInput="bg-zinc-700 "
          type="password"
        />
        <Button className="p-5 rounded-xl bg-green-700 hover:bg-green-800" type="submit">
          Далее
        </Button>
      </form>
    </>
  )
}
