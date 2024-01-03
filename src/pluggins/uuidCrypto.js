import {v4 as uuidv4} from uuid

export const randomCrypto = () => {
  const uuidRandom = uuidv4()
  return uuidRandom
}