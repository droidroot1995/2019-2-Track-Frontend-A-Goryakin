export const getMinutes = (date) => {
  const minutes = date.getMinutes().toString()

  if (minutes < 10) {
    return `0${date.getMinutes()}`
  }

  return `${date.getMinutes()}`
}
