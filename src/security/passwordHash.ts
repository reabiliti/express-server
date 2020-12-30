import bcrypt from 'bcrypt'

export class PasswordHash {
  public static async hashPassword(plainPassword: string): Promise<string> {
    const salt = await bcrypt.genSalt(12)

    return bcrypt.hash(plainPassword, salt)
  }

  public static async comparePasswords(
    password: string,
    passwordHash: string
  ): Promise<boolean> {
    return bcrypt.compare(password, passwordHash)
  }
}
