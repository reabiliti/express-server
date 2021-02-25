import { JSONSchemaType } from 'ajv'

import ajv from '../utils/ajv'

type SignInData = {
  email: string
  password: string
}

const schema: JSONSchemaType<SignInData, true> = {
  type: 'object',
  properties: {
    email: { type: 'string', format: 'email', nullable: true },
    password: { type: 'string', nullable: true },
  },
  required: ['email', 'password'],
  additionalProperties: false,
}

const signInValidator = ajv.compile(schema)

export default signInValidator
