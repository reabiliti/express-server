import bcrypt from 'bcrypt'

export const generatePasswordHash = async (
  password: string
): Promise<string> => {
  const salt = await bcrypt.genSalt(12)
  return bcrypt.hash(password, salt)
}

export const comparePasswords = async (
  password: string,
  passwordHash: string
): Promise<boolean> => bcrypt.compare(password, passwordHash)
