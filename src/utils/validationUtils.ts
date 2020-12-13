export const isBlank = (text: string): boolean => {
  return text === null || text === undefined || text === ""
}
export const isNotBlank = (text: string): boolean => {
  return !isBlank(text)
}
