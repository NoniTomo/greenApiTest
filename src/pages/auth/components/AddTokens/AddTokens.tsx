import { Button } from '@/shared/components/ui/button'
import { TextField } from '@/shared/components'
import { useAddTokens } from './hooks/useAddTokens'

export const AddTokens = () => {
  const {state, functions} = useAddTokens()

  return (
    <>
      <form className="flex flex-col gap-5" onSubmit={state.form.handleSubmit(functions.onSubmit)}>
        <TextField
          id="apiUrl"
          register={state.form.register('apiUrl', {
            required: "required",
          })}
          label='API url'
          error={state.form.formState.errors.apiUrl?.message}
          isDisabled={false}
          isRequired={true}
        />
        <TextField
          id="idInstance"
          register={state.form.register('idInstance', {
            required: "required",
          })}
          label='ID Instance'
          error={state.form.formState.errors.idInstance?.message}
          isDisabled={false}
          isRequired={true}
        />
        <TextField
          id="apiTokenInstance"
          register={state.form.register('apiTokenInstance', {
            required: "required",
          })}
          label='API Token Instance'
          error={state.form.formState.errors.apiTokenInstance?.message}
          isDisabled={false}
          isRequired={true}
        />
      <Button type='submit'>
        Next
      </Button>
      </form>
    </>
  )
}
