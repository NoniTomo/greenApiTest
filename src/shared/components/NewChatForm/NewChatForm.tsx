import { Button } from '@/shared/components/ui/button'
import { TextField } from '@/shared/components'
import { validateMask } from '@/shared/helpers'
import { useNewChatForm } from './hooks/useNewChatForm'
import { CountryCombobox } from './components/CountryCombobox'
import { COUNTRY_NUMBERS } from './constants/country'
import { Countries } from './types/types'

export interface NewChatFormProps {
  onSubmitAction: ({ phone }: { phone: string }) => void
}

export const NewChatForm = ({ onSubmitAction }: NewChatFormProps) => {
  const { state, functions } = useNewChatForm({ onSubmitAction })
  return (
    <>
      <form className="flex flex-col gap-5" onSubmit={state.form.handleSubmit(functions.onSubmit)}>
        <h4>Добавьте новый контакт</h4>
        <div className="relative">
          <TextField
            id="phone"
            register={state.form.register(
              'phone',
              `+${COUNTRY_NUMBERS[state.countryValue].code} ${COUNTRY_NUMBERS[state.countryValue].templatePhone}`,
              {
                required: 'required',
                validate: (value) => (validateMask(value) ? true : 'is Mobile Phone')
              }
            )}
            type="email"
            placeholder={`+${COUNTRY_NUMBERS[state.countryValue].code} ${COUNTRY_NUMBERS[state.countryValue].templatePhone}`}
            error={state.form.formState.errors.phone?.message}
            isDisabled={false}
            isRequired={true}
            classNameInput="pl-14"
          />
          <CountryCombobox
            value={state.countryValue}
            setValue={(value: Countries) => functions.setCountryValue(value)}
            className="absolute top-2 left-2 w-12"
          />
        </div>
        <Button className="p-5 w-full rounded-xl bg-green-700 hover:bg-green-800  text-background">
          Добавить
        </Button>
      </form>
    </>
  )
}
