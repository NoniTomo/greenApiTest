import type { InputHTMLAttributes } from 'react'
import type { UseFormRegisterReturn } from 'react-hook-form'

export type TextFieldProps = {
  label?: string
  id: string
  register?: UseFormRegisterReturn
  isDisabled?: boolean
  isRequired?: boolean
  placeholder?: string
  error?: string
  classNameInput?: string
} & InputHTMLAttributes<HTMLInputElement>

export function TextField({
  label,
  id,
  register,
  isDisabled = false,
  isRequired = false,
  className,
  classNameInput,
  placeholder,
  error,
  ...props
}: TextFieldProps) {
  return (
    <div className={`relative flex flex-col gap-1 ${className}`}>
      {label && (
        <label htmlFor={id} className="mb-1">
          {label}
          <span>{isRequired ? '*' : ''}</span>
        </label>
      )}
      <input
        placeholder={placeholder}
        autoComplete="off"
        disabled={isDisabled}
        id={id}
        type="text"
        className={`rounded-xl border-2 bg-transparent border-solid border-secondary p-3 pr-2 outline-none transition-all focus:m-0 focus:border-[#4C94FF] ${isDisabled && 'border-secondary bg-text'} ${error && 'm-0 mb-7 border-[#F64C4C] hover:bg-secondary-destructive-light focus:mb-7 focus:border-[#F64C4C] focus:bg-secondary-destructive-light'} ${classNameInput}`}
        {...register}
        {...props}
      />
      <span className="absolute bottom-0 left-2 text-[#F64C4C]">{error}</span>
    </div>
  )
}
