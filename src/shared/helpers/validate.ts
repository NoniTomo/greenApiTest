export function validateMask(value: string, props?: string[]) {
  if (value.includes('_') || props?.some(char => value.includes(char)))
    return false
  return true
}
