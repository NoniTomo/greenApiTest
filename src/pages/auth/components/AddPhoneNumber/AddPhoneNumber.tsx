import { Button } from '@/shared/components/ui/button'
import { useStage } from '../../contexts'
import { TextField } from '@/shared/components'
import { validateMask } from '@/shared/helpers'
import { useAddPhoneNumber } from './hooks/useAddPhoneNumber'
import { CountryCombobox } from './components/CountryCombobox'
import { COUNTRY_NUMBERS } from './constants/country'
import { Countries } from './types/types'

export const AddPhoneNumber = () => {
  const { state, functions } = useAddPhoneNumber()
  const stage = useStage()
  return (
    <>
      <form className="flex flex-col gap-5" onSubmit={state.form.handleSubmit(functions.onSubmit)}>
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
        <Button>Submit</Button>
        <Button onClick={() => stage.set('tokens')} type="submit" variant="outline">
          Back
        </Button>
      </form>
    </>
  )
}
