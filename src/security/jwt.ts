import jwt from 'jsonwebtoken'
import config from 'config'
import { v4 as uuidv4 } from 'uuid'

type PayloadToken = {
  userId: string
}
type Decoded = {
  userId: string
}
type VerifiedToken = [null | Error, null | Decoded]

export class JWT {
  private static JWT_SECRET: string = config.get('jwt.secret')
  private static EXPIRES_IN: string = config.get('jwt.expiresIn')

  public static async generateToken(userId: string): Promise<string> {
    const payload: PayloadToken = { userId }
    const options = {
      expiresIn: this.EXPIRES_IN,
      jwtid: uuidv4(),
      subject: userId,
    }
    return jwt.sign(payload, this.JWT_SECRET, options)
  }

  public static async verifyToken(token: string): Promise<VerifiedToken> {
    try {
      const decoded: Decoded = jwt.verify(token, this.JWT_SECRET) as Decoded
      return [null, decoded]
    } catch (err) {
      return [err, null]
    }
  }
}
