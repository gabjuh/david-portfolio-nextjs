const convertStringToUrlFriendly = (str: string) => {
  return str.replace(/ /g, '_')
}

export default convertStringToUrlFriendly;