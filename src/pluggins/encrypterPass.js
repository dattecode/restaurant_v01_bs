import bcrypt from "bcrypt"

export const encypterPassword = async (pass) =>{
  const saltRound = 12
  const salt = await bcrypt.genSalt(saltRound)
  return await bcrypt.hash(pass, salt)
}

export const verifyPassword = async (userPass, dbPass) =>{
  return await bcrypt.compare(userPass, dbPass)
}